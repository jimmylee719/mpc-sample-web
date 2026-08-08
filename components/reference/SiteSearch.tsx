'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * 全站搜尋。索引由 Pagefind 在建置期產生，不需要伺服器。
 * 開發模式下索引還不存在，這裡會誠實說出來，而不是假裝搜不到東西。
 */

interface PagefindResultData {
  url: string;
  meta?: { title?: string };
  excerpt: string;
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

interface PagefindApi {
  search: (term: string) => Promise<{ results: PagefindResult[] }>;
  options?: (o: Record<string, unknown>) => Promise<void>;
}

type State = 'idle' | 'loading' | 'ready' | 'unavailable';

function cleanUrl(url: string): string {
  return url.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
}

export function SiteSearch() {
  const [q, setQ] = useState('');
  const [state, setState] = useState<State>('idle');
  const [hits, setHits] = useState<PagefindResultData[]>([]);
  const apiRef = useRef<PagefindApi | null>(null);

  const load = useCallback(async (): Promise<PagefindApi | null> => {
    if (apiRef.current) return apiRef.current;
    setState('loading');
    try {
      // Pagefind 的 JS 在建置期才產生。用執行期動態 import，
      // 打包器與 TypeScript 都不該在編譯階段去解析這個路徑。
      const dynamicImport = new Function('p', 'return import(p)') as (
        p: string,
      ) => Promise<PagefindApi>;
      const mod = await dynamicImport('/pagefind/pagefind.js');
      apiRef.current = mod;
      setState('ready');
      return mod;
    } catch {
      setState('unavailable');
      return null;
    }
  }, []);

  const run = useCallback(
    async (term: string) => {
      setQ(term);
      if (term.trim().length < 2) {
        setHits([]);
        return;
      }
      const api = await load();
      if (!api) return;
      const res = await api.search(term.trim());
      const top = await Promise.all(res.results.slice(0, 8).map((r) => r.data()));
      setHits(top);
    },
    [load],
  );

  return (
    <div className="mb-8">
      <label className="sr-only" htmlFor="site-search">
        全站搜尋
      </label>
      <input
        id="site-search"
        type="search"
        value={q}
        onFocus={() => void load()}
        onChange={(e) => void run(e.target.value)}
        placeholder="全站搜尋：resample、切片、韌體…"
        className="w-full rounded-lg border border-[#2C3036] bg-stage-2 px-3 py-2 text-sm text-paper placeholder:text-[#6B7178]"
      />

      {state === 'unavailable' && q.trim().length >= 2 && (
        <p className="label-mono mt-2 text-muted">
          搜尋索引在建置時才會產生。開發模式下請直接用下面的分類與篩選。
        </p>
      )}

      {/* 靜態輸出的檔名是 xxx.html，顯示與連結都改回乾淨網址 */}
      {hits.length > 0 && (
        <ul className="mt-3 divide-y divide-[#2C3036] rounded-lg border border-[#2C3036] bg-stage-2">
          {hits.map((h) => (
            <li key={h.url}>
              <a href={cleanUrl(h.url)} className="block px-3 py-2 hover:bg-[#22262B]">
                <span className="block text-sm font-semibold text-white">{h.meta?.title ?? h.url}</span>
                <span
                  className="mt-[2px] block text-xs leading-relaxed text-[#8D9299]"
                  dangerouslySetInnerHTML={{ __html: h.excerpt }}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
