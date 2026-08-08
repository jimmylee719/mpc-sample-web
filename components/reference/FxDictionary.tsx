'use client';

import { useMemo, useState } from 'react';
import { fxEntries, FX_ENGINES, type FxEngineId } from '@/content/reference/fx';

export function FxDictionary() {
  const [q, setQ] = useState('');
  const [engine, setEngine] = useState<FxEngineId | 'all'>('all');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return fxEntries.filter((f) => {
      if (engine !== 'all' && f.engine !== engine) return false;
      if (!needle) return true;
      return (
        f.name.toLowerCase().includes(needle) ||
        f.category.includes(needle) ||
        f.what.includes(needle) ||
        (f.when ?? '').includes(needle)
      );
    });
  }, [q, engine]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="fx-search">
          搜尋效果
        </label>
        <input
          id="fx-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋：Delay、濾波、轉場…"
          className="min-w-[220px] flex-1 rounded-lg border border-[#2C3036] bg-stage-2 px-3 py-2 text-sm text-paper placeholder:text-[#6B7178]"
        />
        <div className="flex flex-wrap gap-1">
          {[{ id: 'all' as const, label: '全部' }, ...FX_ENGINES].map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setEngine(e.id)}
              aria-pressed={engine === e.id}
              className={`label-mono rounded-full px-[9px] py-1 transition-colors ${
                engine === e.id ? 'bg-akai text-white' : 'bg-[#2A2F35] text-[#B7BDC4] hover:text-white'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <p className="label-mono mt-3 text-muted">{rows.length} 種</p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map((f) => (
          <li key={f.id} className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-base font-semibold text-white">{f.name}</h3>
              {f.pad !== undefined && (
                <span className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-[2px] text-[#B7BDC4]">
                  PAD {f.pad}
                </span>
              )}
              <span className="label-mono text-akai">{f.category}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#B7BDC4]">{f.what}</p>
            {f.when && <p className="mt-1 text-sm leading-relaxed text-[#8D9299]">什麼時候用：{f.when}</p>}
            {f.params && f.params.length > 0 && (
              <dl className="mt-3 border-t border-[#2C3036] pt-2">
                {f.params.map((p) => (
                  <div key={p.knob} className="grid grid-cols-[76px_1fr] gap-2 py-1">
                    <dt className="label-mono text-muted">{p.knob}</dt>
                    <dd className="text-[13px] leading-relaxed text-[#B7BDC4]">
                      {p.name}
                      {p.range && <span className="ml-2 text-[#6F6C65]">{p.range}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </li>
        ))}
      </ul>

      {rows.length === 0 && <p className="mt-6 text-sm text-muted">找不到符合的效果。</p>}
    </div>
  );
}
