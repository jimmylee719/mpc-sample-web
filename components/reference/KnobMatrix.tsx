'use client';

import { useState } from 'react';
import { MpcPanel } from '@/components/mpc/MpcPanel';
import { knobRows } from '@/content/reference/knobs';

/**
 * ★ 互動式旋鈕矩陣。選一個畫面，右邊的面板與小螢幕同步變成那個樣子。
 *
 * 這一頁不是要你背，是要你看懂：螢幕下排那三個字就是 K1／K2／K3 現在管什麼。
 */
export function KnobMatrix() {
  const [activeId, setActiveId] = useState(knobRows[0]!.id);
  const row = knobRows.find((r) => r.id === activeId) ?? knobRows[0]!;

  return (
    <div className="grid items-start gap-[18px] split:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] split:gap-[26px]">
      {/* 左：畫面清單 */}
      <div>
        <h2 className="label-mono mb-3 text-muted">選一個畫面</h2>
        <ul className="grid gap-2">
          {knobRows.map((r) => {
            const on = r.id === activeId;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(r.id)}
                  aria-pressed={on}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                    on
                      ? 'border-akai bg-[rgba(214,52,44,.12)] text-white'
                      : 'border-[#2C3036] bg-stage-2 text-[#B7BDC4] hover:border-[#4A5057]'
                  }`}
                >
                  <span className="block text-sm font-semibold">{r.screenName}</span>
                  <span className="label-mono mt-[2px] block text-muted">
                    {r.status === 'pending' ? '資料待補' : r.howTo}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 右：面板同步 + 三顆旋鈕的功能 */}
      <div className="split:sticky split:top-[14px]">
        <div className="rounded-[14px] border border-[#2C3036] bg-stage-2 p-4">
          <MpcPanel targets={row.enter} shift={row.enterShift} screen={row.screen} />
        </div>

        <div className="mt-4 rounded-[14px] bg-paper px-[18px] py-5 text-ink split:px-[26px]">
          <p className="label-mono font-bold text-akai">{row.screenName}</p>
          <p className="mt-1 text-sm leading-relaxed">{row.howTo}</p>

          {row.status === 'pending' ? (
            <p className="mt-4 border-l-[3px] border-l-akai bg-[rgba(214,52,44,.07)] px-[15px] py-[13px] text-sm leading-relaxed">
              這個畫面的三顆旋鈕分別管什麼，我們還沒查證完成。
              寧可空著，也不寫可能是錯的內容。
            </p>
          ) : (
            <>
              <dl className="mt-4 border-t border-rule">
                {(['K1', 'K2', 'K3'] as const).map((k, i) => (
                  <div
                    key={k}
                    className="grid grid-cols-[46px_1fr] items-baseline gap-3 border-b border-rule py-[10px]"
                  >
                    <dt className="label-mono text-akai">{k}</dt>
                    <dd className="text-sm leading-relaxed">{[row.k1, row.k2, row.k3][i]}</dd>
                  </div>
                ))}
              </dl>

              {row.shifted && (
                <dl className="mt-4">
                  <p className="label-mono mb-2 text-muted">按住 SHIFT 再轉</p>
                  {(['SHIFT + K1', 'SHIFT + K2', 'SHIFT + K3'] as const).map((k, i) => (
                    <div
                      key={k}
                      className="grid grid-cols-[92px_1fr] items-baseline gap-3 border-b border-rule py-[10px]"
                    >
                      <dt className="label-mono text-akai">{k}</dt>
                      <dd className="text-sm leading-relaxed">{row.shifted![i]}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {row.source && (
                <p className="mt-4 text-xs leading-relaxed text-muted">依據：{row.source}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
