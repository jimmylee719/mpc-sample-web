'use client';

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

/**
 * 首頁那組 4×4 pad，真的敲得出聲音。
 *
 * 為什麼要做：原本這裡是一張靜態圖，有錄音紅點、有進度條，長得就像播放器，
 * 但按下去完全沒反應。網站叫「敲敲取樣」，第一個動作就是敲 pad，敲了沒聲音，
 * 使用者只會以為網站壞了。
 *
 * 聲音從哪來：全部用瀏覽器的 Web Audio 當場合成，沒有任何音檔、沒有下載、
 * 也就沒有任何版權問題。代價是它們不是機器的原廠音色，畫面上照實寫出來。
 *
 * 兩個刻意的設計，剛好對應課程：
 * - PAD 3 閉鈸與 PAD 4 開鈸放在同一個 Mute Group：先敲開鈸再敲閉鈸，開鈸會被掐掉（2-7）
 * - PAD 9–16 是同一個音色的不同音高，就是 16 Levels 的 Tune 型式（3-4）
 *
 * 不自動發聲。AudioContext 只在第一次敲下去時才建立，這是瀏覽器的規定，也是禮貌。
 */

type Voice = (ctx: AudioContext, at: number, vel: number, out: AudioNode) => AudioScheduledSourceNode[];

/** 白噪音緩衝區，鈸、小鼓、拍手共用 */
function noiseBuffer(ctx: AudioContext): AudioBuffer {
  const len = ctx.sampleRate;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  // 固定種子，每次聽起來一樣
  let s = 12345;
  for (let i = 0; i < len; i++) {
    s = (s * 9301 + 49297) % 233280;
    d[i] = (s / 233280) * 2 - 1;
  }
  return buf;
}

let NOISE: AudioBuffer | null = null;

function env(ctx: AudioContext, at: number, peak: number, decay: number, out: AudioNode): GainNode {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), at + 0.003);
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  g.connect(out);
  return g;
}

function noise(ctx: AudioContext, at: number, dur: number): AudioBufferSourceNode {
  NOISE ??= noiseBuffer(ctx);
  const src = ctx.createBufferSource();
  src.buffer = NOISE;
  src.start(at);
  src.stop(at + dur);
  return src;
}

function filtered(ctx: AudioContext, type: BiquadFilterType, freq: number, q = 0.8): BiquadFilterNode {
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
}

const kick: Voice = (ctx, at, vel, out) => {
  const o = ctx.createOscillator();
  o.frequency.setValueAtTime(150, at);
  o.frequency.exponentialRampToValueAtTime(45, at + 0.12);
  // 低頻在手機喇叭上幾乎聽不到，主體要推大一點
  o.connect(env(ctx, at, vel * 1.6, 0.45, out));
  o.start(at);
  o.stop(at + 0.5);
  // 開頭加一下很短的「喀」，手機喇叭才聽得出大鼓的位置
  const click = ctx.createOscillator();
  click.frequency.value = 1200;
  click.connect(env(ctx, at, vel * 0.35, 0.012, out));
  click.start(at);
  click.stop(at + 0.02);
  return [o, click];
};

const snare: Voice = (ctx, at, vel, out) => {
  const n = noise(ctx, at, 0.22);
  const bp = filtered(ctx, 'bandpass', 1800, 0.7);
  n.connect(bp).connect(env(ctx, at, vel * 0.7, 0.2, out));
  const o = ctx.createOscillator();
  o.type = 'triangle';
  o.frequency.setValueAtTime(190, at);
  o.connect(env(ctx, at, vel * 0.5, 0.1, out));
  o.start(at);
  o.stop(at + 0.12);
  return [n, o];
};

const hat =
  (decay: number): Voice =>
  (ctx, at, vel, out) => {
    const n = noise(ctx, at, decay + 0.02);
    n.connect(filtered(ctx, 'highpass', 7000)).connect(env(ctx, at, vel * 0.45, decay, out));
    return [n];
  };

const clap: Voice = (ctx, at, vel, out) => {
  // 真的拍手是好幾個手指先後碰到，三下很短的雜音疊出來
  return [0, 0.012, 0.024].map((d, i) => {
    const n = noise(ctx, at + d, i === 2 ? 0.2 : 0.02);
    n.connect(filtered(ctx, 'bandpass', 1200, 1.2)).connect(env(ctx, at + d, vel * 0.6, i === 2 ? 0.18 : 0.02, out));
    return n;
  });
};

const rim: Voice = (ctx, at, vel, out) => {
  const o = ctx.createOscillator();
  o.type = 'square';
  o.frequency.value = 1700;
  o.connect(filtered(ctx, 'bandpass', 1700, 4)).connect(env(ctx, at, vel * 0.5, 0.04, out));
  o.start(at);
  o.stop(at + 0.06);
  return [o];
};

const tom =
  (from: number, to: number): Voice =>
  (ctx, at, vel, out) => {
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(from, at);
    o.frequency.exponentialRampToValueAtTime(to, at + 0.25);
    o.connect(env(ctx, at, vel * 0.8, 0.35, out));
    o.start(at);
    o.stop(at + 0.4);
    return [o];
  };

/** 同一個音色、不同音高：16 Levels 的 Tune 型式就是這個意思 */
const bass =
  (semitone: number): Voice =>
  (ctx, at, vel, out) => {
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = 65.41 * 2 ** (semitone / 12); // C2 起算
    const lp = filtered(ctx, 'lowpass', 900, 2);
    lp.frequency.setValueAtTime(1600, at);
    lp.frequency.exponentialRampToValueAtTime(300, at + 0.3);
    o.connect(lp).connect(env(ctx, at, vel * 0.45, 0.5, out));
    o.start(at);
    o.stop(at + 0.55);
    return [o];
  };

/** PAD 1–16。mute 相同的 pad 會互相掐掉 */
const PADS: Array<{ name: string; voice: Voice; mute?: number }> = [
  { name: '大鼓', voice: kick },
  { name: '小鼓', voice: snare },
  { name: '閉鈸', voice: hat(0.05), mute: 1 },
  { name: '開鈸', voice: hat(0.45), mute: 1 },
  { name: '拍手', voice: clap },
  { name: '邊擊', voice: rim },
  { name: '低筒', voice: tom(120, 75) },
  { name: '高筒', voice: tom(190, 120) },
  // C 小調五聲音階：怎麼按都不會難聽
  ...[0, 3, 5, 7, 10, 12, 15, 17].map((st, i) => ({
    name: ['C', 'E♭', 'F', 'G', 'B♭', 'C', 'E♭', 'F'][i]!,
    voice: bass(st),
  })),
];

/** 鍵盤對應：最下面一排是 PAD 1–4，跟機器一樣由下往上 */
const KEYS: Record<string, number> = {
  z: 1, x: 2, c: 3, v: 4,
  a: 5, s: 6, d: 7, f: 8,
  q: 9, w: 10, e: 11, r: 12,
  '1': 13, '2': 14, '3': 15, '4': 16,
};

export function PlayablePads({ className = '' }: { className?: string }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const outRef = useRef<GainNode | null>(null);
  const muteRef = useRef(new Map<number, AudioScheduledSourceNode[]>());
  const [lit, setLit] = useState<Set<number>>(new Set());
  const [started, setStarted] = useState(false);

  const hit = useCallback((num: number, vel = 0.9) => {
    const pad = PADS[num - 1];
    if (!pad) return;
    try {
      if (!ctxRef.current) {
        const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctxRef.current = new Ctx();
        const master = ctxRef.current.createGain();
        master.gain.value = 0.8;
        // 簡單的限制器，連續快速敲也不會爆音
        const comp = ctxRef.current.createDynamicsCompressor();
        comp.threshold.value = -6;
        master.connect(comp).connect(ctxRef.current.destination);
        outRef.current = master;
        setStarted(true);
      }
      const ctx = ctxRef.current;
      void ctx.resume();
      const at = ctx.currentTime + 0.005;

      // Mute Group：同組上一下還在響就掐掉
      if (pad.mute) {
        for (const src of muteRef.current.get(pad.mute) ?? []) {
          try {
            src.stop(at);
          } catch {
            // 已經停了
          }
        }
      }
      const sources = pad.voice(ctx, at, vel, outRef.current!);
      if (pad.mute) muteRef.current.set(pad.mute, sources);
    } catch {
      // 瀏覽器不支援 Web Audio 就安靜，不要讓整頁壞掉
    }

    setLit((s) => new Set(s).add(num));
    window.setTimeout(() => {
      setLit((s) => {
        const n = new Set(s);
        n.delete(num);
        return n;
      });
    }, 130);
  }, []);

  const onPointerDown = (num: number) => (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 有壓力感應的裝置就照力道，沒有就固定
    const v = e.pressure && e.pressure !== 0.5 ? 0.35 + e.pressure * 0.65 : 0.9;
    hit(num, v);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    const num = KEYS[e.key.toLowerCase()];
    if (num) {
      e.preventDefault();
      hit(num);
    }
  };

  return (
    <div className={className}>
      <div
        className="pad-grid"
        role="group"
        aria-label="可以敲的 16 顆 pad。電腦鍵盤 Z X C V 是最下面一排"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {Array.from({ length: 16 }, (_, i) => {
          // 顯示順序是左上到右下，編號是左下到右上，跟機器一致
          const row = Math.floor(i / 4);
          const col = i % 4;
          const num = (3 - row) * 4 + col + 1;
          const p = PADS[num - 1]!;
          return (
            <button
              key={num}
              type="button"
              tabIndex={-1}
              onPointerDown={onPointerDown(num)}
              // 鍵盤使用者按 Enter／空白鍵也要能敲
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  hit(num);
                }
              }}
              aria-label={`PAD ${num} ${p.name}`}
              className={`pad pad-btn ${lit.has(num) ? 'is-hit' : ''}`}
            >
              <span className="pad-name">{p.name}</span>
            </button>
          );
        })}
      </div>
      <p className="label-mono mt-2 text-[#6B7178]">
        {started ? '瀏覽器合成的示意聲音，不是機器的原廠音色' : '敲敲看。先敲開鈸再敲閉鈸，開鈸會被掐掉'}
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-[#5A6067]">iPhone 側邊的靜音開關打開時不會有聲音。</p>
    </div>
  );
}
