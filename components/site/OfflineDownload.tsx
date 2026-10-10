'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';

/**
 * 整站下載：按一次，把全部課程、查詢區、曲風、站內搜尋存進這台裝置。
 *
 * 為什麼需要：Service Worker 平常只存你開過的頁。帶機器去戶外的人
 * 不可能事先把 36 課一課一課點開，到了沒訊號的地方才發現打不開就來不及了。
 *
 * 做法：讀建置時產生的 offline-manifest.json，逐一抓檔放進快取。
 * 快取名稱必須跟 public/sw.js 一致（pages、assets），頁面的 key 也要用同一套規則，
 * Service Worker 離線時才找得到。
 *
 * 只在瀏覽器端執行。伺服器產出的 HTML 一律是「還沒下載」，避免 hydration 對不上。
 */

const PAGES = 'pages';
const ASSETS = 'assets';
const STORE = 'mpc-sample:offline';

interface Manifest {
  version: string;
  builtAt: string;
  bytes: number;
  pages: string[];
  assets: string[];
}

interface Saved {
  version: string;
  date: string;
  pages: number;
}

type Phase =
  | { kind: 'checking' }
  | { kind: 'unsupported' }
  | { kind: 'idle'; manifest: Manifest; saved: Saved | null }
  | { kind: 'running'; manifest: Manifest; done: number; total: number }
  | { kind: 'done'; manifest: Manifest; failed: number }
  | { kind: 'error'; message: string };

function readSaved(): Saved | null {
  try {
    const raw = window.localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function writeSaved(s: Saved): void {
  try {
    window.localStorage.setItem(STORE, JSON.stringify(s));
  } catch {
    // 寫不進去只是下次不會顯示「已下載」，不影響快取本身
  }
}

const mb = (b: number) => `${(b / 1024 / 1024).toFixed(0)} MB`;

export function OfflineDownload({ compact = false }: { compact?: boolean }) {
  const [phase, setPhase] = useState<Phase>({ kind: 'checking' });

  useEffect(() => {
    if (typeof caches === 'undefined' || !('serviceWorker' in navigator)) {
      setPhase({ kind: 'unsupported' });
      return;
    }
    let alive = true;
    fetch('/offline-manifest.json', { cache: 'no-store' })
      .then((r) => (r.ok ? (r.json() as Promise<Manifest>) : Promise.reject(new Error(String(r.status)))))
      .then((manifest) => {
        if (alive) setPhase({ kind: 'idle', manifest, saved: readSaved() });
      })
      .catch(() => {
        // 沒網路時拿不到清單。若之前下載過，照樣顯示「已下載」
        const saved = readSaved();
        if (!alive) return;
        if (saved) {
          setPhase({
            kind: 'idle',
            manifest: { version: saved.version, builtAt: saved.date, bytes: 0, pages: [], assets: [] },
            saved,
          });
        } else {
          setPhase({ kind: 'error', message: '現在連不上網路，等有網路時再按。' });
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  const run = useCallback(async (manifest: Manifest) => {
    const total = manifest.pages.length + manifest.assets.length;
    setPhase({ kind: 'running', manifest, done: 0, total });

    // 請瀏覽器把這份資料視為重要、空間不足時不要先清掉
    try {
      await navigator.storage?.persist?.();
    } catch {
      // 不支援就算了
    }

    const pages = await caches.open(PAGES);
    const assets = await caches.open(ASSETS);
    const jobs: Array<{ url: string; cache: Cache; key: string }> = [
      ...manifest.pages.map((p) => ({ url: p, cache: pages, key: location.origin + p })),
      ...manifest.assets.map((a) => ({ url: a, cache: assets, key: location.origin + a })),
    ];

    let done = 0;
    let failed = 0;
    let next = 0;
    // 一次六個，手機網路不會塞爆，也不會慢到等不完
    const worker = async () => {
      while (next < jobs.length) {
        const job = jobs[next++]!;
        try {
          const res = await fetch(job.url, { cache: 'no-cache' });
          if (res.ok) await job.cache.put(job.key, res);
          else failed++;
        } catch {
          failed++;
        }
        done++;
        if (done % 5 === 0 || done === total) setPhase({ kind: 'running', manifest, done, total });
      }
    };
    await Promise.all(Array.from({ length: 6 }, worker));

    if (failed < total) {
      writeSaved({ version: manifest.version, date: new Date().toISOString().slice(0, 10), pages: manifest.pages.length });
    }
    setPhase({ kind: 'done', manifest, failed });
  }, []);

  const shell = (children: ReactNode) => (
    <section
      className={`rounded-[14px] border border-[#2C3036] bg-stage-2 ${compact ? 'p-4' : 'p-[18px]'}`}
      aria-live="polite"
    >
      <p className="label-mono font-bold text-live">整站下載 · 離線也能上課</p>
      {children}
    </section>
  );

  if (phase.kind === 'checking') return shell(<p className="label-mono mt-2 text-muted">檢查中…</p>);

  if (phase.kind === 'unsupported') {
    return shell(
      <p className="mt-2 text-sm leading-relaxed text-[#8D9299]">
        這個瀏覽器不支援離線儲存。換成 Safari 或 Chrome 再試一次。
      </p>,
    );
  }

  if (phase.kind === 'error') {
    return shell(<p className="mt-2 text-sm leading-relaxed text-[#8D9299]">{phase.message}</p>);
  }

  if (phase.kind === 'running') {
    const pct = Math.round((phase.done / phase.total) * 100);
    return shell(
      <>
        <p className="mt-2 text-sm text-white">
          下載中 {phase.done} / {phase.total}，請不要關掉這一頁
        </p>
        <div
          className="mt-3 h-[6px] overflow-hidden rounded-full bg-[#2C3036]"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-live" style={{ width: `${pct}%` }} />
        </div>
      </>,
    );
  }

  if (phase.kind === 'done') {
    const ok = phase.failed === 0;
    return shell(
      <>
        <p className={`mt-2 text-sm ${ok ? 'text-white' : 'text-[#EFA043]'}`}>
          {ok
            ? `完成。${phase.manifest.pages.length} 頁全部存在這台裝置上，沒有網路也打得開。`
            : `大部分完成，有 ${phase.failed} 個檔案沒抓到。換個網路好一點的地方再按一次就會補齊。`}
        </p>
        {!ok && (
          <button
            type="button"
            onClick={() => void run(phase.manifest)}
            className="mt-3 border-2 border-live px-4 py-[9px] text-[13px] font-bold text-live transition-colors hover:bg-live hover:text-stage"
          >
            再試一次
          </button>
        )}
      </>,
    );
  }

  // idle
  const { manifest, saved } = phase;
  const upToDate = saved?.version === manifest.version;
  const offlineNow = manifest.pages.length === 0; // 沒網路、只拿得到上次的紀錄

  return shell(
    <>
      {saved && (
        <p className="mt-2 text-sm text-white">
          {upToDate || offlineNow
            ? `已下載 ${saved.pages} 頁（${saved.date}）。沒有網路也打得開。`
            : `你在 ${saved.date} 下載過，之後網站有更新。建議重新下載一次。`}
        </p>
      )}
      {!saved && (
        <p className="mt-2 text-sm leading-relaxed text-[#B7BDC4]">
          出門前按一次，36 課、查詢區、曲風配方卡和站內搜尋全部存進這台裝置。
          到了沒訊號的地方照樣能上課。
        </p>
      )}
      {!offlineNow && !upToDate && (
        <button
          type="button"
          onClick={() => void run(manifest)}
          className="mt-3 border-2 border-live bg-live px-4 py-[10px] text-[13px] font-bold text-stage transition-colors hover:bg-transparent hover:text-live"
        >
          {saved ? '更新離線內容' : '下載整站'}（約 {mb(manifest.bytes)}，建議用 Wi-Fi）
        </button>
      )}
      {!compact && (
        <p className="label-mono mt-3 text-[#6B7178]">影片要連網才能看。課程文字、面板圖、查詢區都不需要。</p>
      )}
    </>,
  );
}
