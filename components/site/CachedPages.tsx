'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * 離線時列出「這台裝置上還打得開哪幾頁」。
 *
 * 為什麼需要這個：Service Worker 是 network-first，只有你實際開過的頁面才會留在快取裡。
 * 但使用者無從得知自己開過哪些。只跟他說「開過的還在」等於沒說——
 * 他還是只能一頁一頁試，而且每試一次錯的就回到這一頁。
 *
 * 所以這裡直接把快取翻出來比對，能開的才列。列不出來就退回原本那句話，不會壞。
 */

export interface CandidatePage {
  href: string;
  label: string;
  group: string;
}

type State = { ready: false } | { ready: true; pages: CandidatePage[] };

async function readCache(candidates: CandidatePage[]): Promise<CandidatePage[]> {
  if (typeof caches === 'undefined') return [];
  const names = await caches.keys();
  const available = new Set<string>();

  for (const name of names) {
    if (!name.startsWith('pages-')) continue;
    const cache = await caches.open(name);
    for (const req of await cache.keys()) {
      // 快取的 key 是完整網址，這裡只比對路徑，而且忽略結尾斜線的差別
      const path = new URL(req.url).pathname.replace(/\/$/, '');
      available.add(path === '' ? '/' : path);
    }
  }

  return candidates.filter((c) => available.has(c.href.replace(/\/$/, '') || '/'));
}

export function CachedPages({ candidates }: { candidates: CandidatePage[] }) {
  const [state, setState] = useState<State>({ ready: false });

  useEffect(() => {
    let alive = true;
    readCache(candidates)
      .then((pages) => {
        if (alive) setState({ ready: true, pages });
      })
      .catch(() => {
        if (alive) setState({ ready: true, pages: [] });
      });
    return () => {
      alive = false;
    };
    // candidates 來自 props，這一頁不會變
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.ready) {
    return <p className="label-mono mt-8 text-muted">正在看這台裝置上還留著哪幾頁…</p>;
  }

  if (state.pages.length === 0) {
    return (
      <p className="mt-8 text-sm leading-relaxed text-[#8D9299]">
        這台裝置上目前沒有存到任何課程頁。下次有網路的時候，先把要上的課點開一次，
        之後沒網路也讀得到。
      </p>
    );
  }

  const groups = [...new Set(state.pages.map((p) => p.group))];

  return (
    <div className="mt-8 text-left">
      <h2 className="label-mono font-bold text-live">現在就打得開 · {state.pages.length} 頁</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#8D9299]">
        這些是你之前開過、已經留在這台裝置上的頁面。
      </p>

      {groups.map((g) => (
        <section key={g} className="mt-4">
          <p className="label-mono text-muted">{g}</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {state.pages
              .filter((p) => p.group === g)
              .map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="block rounded-lg border border-[#2C3036] bg-stage-2 px-3 py-[9px] text-sm text-white transition-colors hover:border-akai"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
