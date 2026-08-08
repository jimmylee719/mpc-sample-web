'use client';

import { useMemo, useState } from 'react';
import { shortcuts, SHORTCUT_GROUPS, type ShortcutGroup } from '@/content/reference/shortcuts';

export function ShortcutTable() {
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<ShortcutGroup | 'all'>('all');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return shortcuts.filter((s) => {
      if (group !== 'all' && s.group !== group) return false;
      if (!needle) return true;
      return (
        s.combo.toLowerCase().includes(needle) ||
        s.label.toLowerCase().includes(needle) ||
        s.what.includes(needle)
      );
    });
  }, [q, group]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="shortcut-search">
          搜尋快捷鍵
        </label>
        <input
          id="shortcut-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋：RESAMPLE、存檔、undo…"
          className="min-w-[220px] flex-1 rounded-lg border border-[#2C3036] bg-stage-2 px-3 py-2 text-sm text-paper placeholder:text-[#6B7178]"
        />
        <div className="flex flex-wrap gap-1">
          {[{ id: 'all' as const, label: '全部' }, ...SHORTCUT_GROUPS].map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroup(g.id)}
              aria-pressed={group === g.id}
              className={`label-mono rounded-full px-[9px] py-1 transition-colors ${
                group === g.id ? 'bg-akai text-white' : 'bg-[#2A2F35] text-[#B7BDC4] hover:text-white'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <p className="label-mono mt-3 text-muted">{rows.length} 組</p>

      <ul className="mt-3 divide-y divide-[#2C3036] border-y border-[#2C3036]">
        {rows.map((s) => (
          <li key={s.combo} className="grid gap-1 py-3 split:grid-cols-[210px_150px_1fr] split:items-baseline split:gap-4">
            <span className="font-mono text-[13px] font-bold tracking-[.06em] text-white">{s.combo}</span>
            <span className="font-mono text-[11px] uppercase tracking-[.14em] text-akai">
              {s.label}
              {s.hidden && <span className="ml-2 text-[#8D9299]">面板沒印</span>}
            </span>
            <span className="text-sm leading-relaxed text-[#B7BDC4]">{s.what}</span>
          </li>
        ))}
      </ul>

      {rows.length === 0 && <p className="mt-6 text-sm text-muted">找不到符合的快捷鍵。</p>}
    </div>
  );
}
