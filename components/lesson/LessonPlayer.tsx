'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Lesson } from '@/types/lesson';
import { MpcPanel } from '@/components/mpc/MpcPanel';
import { needsRearView } from '@/components/mpc/panel-layout';
import { ChapterRail } from './ChapterRail';
import { NoteBox } from './NoteBox';
import { AudioClip } from './AudioClip';

const STORAGE_PREFIX = 'mpc-sample:progress:';

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [i, setI] = useState(0);
  // 進度讀回來之前絕對不能寫入，否則會先把舊進度蓋成 0，讀回功能等於沒有
  const [restored, setRestored] = useState(false);
  const total = lesson.steps.length;
  const step = lesson.steps[i] ?? lesson.steps[0]!;

  // 讀回上次進度。放在 effect 裡是為了讓伺服器產出的 HTML 永遠是第 1 步，
  // 避免 hydration 對不起來。
  useEffect(() => {
    // 網址帶 ?step=12 的話優先用它。
    // 這是給老師用的：可以把「第 12 步」直接丟給學生，而不是叫他自己按 11 次。
    const fromUrl = Number.parseInt(
      new URLSearchParams(window.location.search).get('step') ?? '',
      10,
    );
    if (Number.isInteger(fromUrl) && fromUrl >= 1 && fromUrl <= total) {
      setI(fromUrl - 1);
      setRestored(true);
      return;
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_PREFIX + lesson.id);
      const n = saved === null ? 0 : Number.parseInt(saved, 10);
      if (Number.isInteger(n) && n >= 0 && n < total) setI(n);
    } catch {
      // localStorage 被關掉就當作沒有進度，不影響上課
    } finally {
      setRestored(true);
    }
  }, [lesson.id, total]);

  // 讓網址跟著目前步驟走，複製網址就等於複製到這一步
  useEffect(() => {
    if (!restored) return;
    const url = i === 0 ? window.location.pathname : `${window.location.pathname}?step=${i + 1}`;
    window.history.replaceState(null, '', url);
  }, [restored, i]);

  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(STORAGE_PREFIX + lesson.id, String(i));
    } catch {
      // 同上
    }
  }, [restored, lesson.id, i]);

  const go = useCallback(
    (delta: number) => setI((cur) => Math.min(total - 1, Math.max(0, cur + delta))),
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  // 每一段章節的完成比例
  const progress = useMemo(
    () =>
      lesson.chapters.map((_, ci) => {
        const totalInCh = lesson.steps.filter((s) => s.ch === ci).length;
        if (totalInCh === 0) return 0;
        const done = lesson.steps.slice(0, i + 1).filter((s) => s.ch === ci).length;
        return done / totalInCh;
      }),
    [lesson.chapters, lesson.steps, i],
  );

  // 每一段的第一步在哪，點章節條就跳過去
  const chapterStart = useMemo(() => {
    const map = new Map<number, number>();
    lesson.steps.forEach((s, idx) => {
      if (!map.has(s.ch)) map.set(s.ch, idx);
    });
    return map;
  }, [lesson.steps]);

  const jumpToChapter = useCallback(
    (ci: number) => {
      const target = chapterStart.get(ci);
      if (target !== undefined) setI(target);
    },
    [chapterStart],
  );

  const isRear = needsRearView(step.targets);

  return (
    <div className="grid items-start gap-[18px] split:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] split:gap-[26px]">
      {/* 深色舞台：機器 */}
      <div className="rounded-[14px] border border-[#2C3036] bg-stage-2 p-4 pb-[10px] split:sticky split:top-[14px]">
        <MpcPanel targets={step.targets} shift={step.shift} screen={step.screen} />
        <div className="mt-[10px] flex items-center justify-between">
          <span className="font-mono text-[9.5px] uppercase tracking-[.14em] text-[#6B7178]">
            {isRear ? 'REAR PANEL' : 'TOP PANEL'}
          </span>
          <span
            className={`label-mono rounded-full px-[9px] py-1 ${
              isRear ? 'bg-akai text-white' : 'bg-[#2A2F35] text-[#B7BDC4]'
            }`}
          >
            {isRear ? '背面 I/O' : '上面板'}
          </span>
        </div>
      </div>

      {/* 淺色紙頁：教學文字 */}
      <div className="rounded-[14px] bg-paper px-[18px] py-5 text-ink split:px-[26px] split:pt-[26px] split:pb-[30px]">
        <ChapterRail
          chapters={lesson.chapters}
          progress={progress}
          activeIndex={step.ch}
          onJump={jumpToChapter}
        />

        <div aria-live="polite">
          <p className="label-mono font-bold text-akai">
            第 {step.ch + 1} 段 · {lesson.chapters[step.ch]}
          </p>
          <p className="mt-[3px] font-mono text-[10.5px] tracking-[.2em] text-muted">
            STEP {String(i + 1).padStart(2, '0')} / {total}
          </p>

          {/* say 是我們自己寫的 typed data，唯一允許的標記是 <b> */}
          <p className="say my-[14px] mb-5" dangerouslySetInnerHTML={{ __html: step.say }} />

          <dl className="border-t border-rule">
            <div className="grid grid-cols-[78px_1fr] items-baseline gap-3 border-b border-rule py-[10px]">
              <dt className="label-mono text-muted">螢幕顯示</dt>
              <dd className="text-sm leading-relaxed">{step.screen.t1 || '—'}</dd>
            </div>
            <div className="grid grid-cols-[78px_1fr] items-baseline gap-3 border-b border-rule py-[10px]">
              <dt className="label-mono text-muted">你會聽到</dt>
              <dd className="text-sm leading-relaxed">{step.hear}</dd>
            </div>
          </dl>

          {step.audio && <AudioClip path={step.audio} />}
          {step.note && <NoteBox note={step.note} />}
        </div>

        <div className="mt-[26px] flex flex-wrap items-center gap-[9px]">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={i === 0}
            className="border-2 border-ink px-[18px] py-[10px] text-sm font-semibold transition-colors hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            ← 上一步
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={i === total - 1}
            className="border-2 border-ink bg-ink px-[18px] py-[10px] text-sm font-semibold text-paper transition-colors hover:border-akai hover:bg-akai disabled:cursor-default disabled:opacity-30"
          >
            {i === total - 1 ? '已完成' : '下一步 →'}
          </button>
          <span className="ml-auto font-mono text-[9.5px] tracking-[.1em] text-muted">← → 方向鍵</span>
        </div>

        {i === total - 1 && (
          <div className="mt-[34px] border-t border-rule pt-4">
            <h2 className="label-mono mb-[10px] text-muted">做完了嗎？自己對一次</h2>
            <ul className="space-y-2">
              {lesson.checkpoints.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden className="text-akai">
                    ✓
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
