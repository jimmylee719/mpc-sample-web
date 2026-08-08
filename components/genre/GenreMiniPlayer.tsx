'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Step } from '@/types/lesson';
import { MpcPanel } from '@/components/mpc/MpcPanel';
import { NoteBox } from '@/components/lesson/NoteBox';

/**
 * 曲風頁的迷你播放器。
 *
 * 曲風頁是配方卡，不是線性課程，所以只處理該曲風最難的單一環節。
 * 跟 LessonPlayer 的差別：沒有章節、沒有進度儲存、不吃鍵盤事件，
 * 因為它是頁面裡的一個區塊，不是整頁的主角。
 */
export function GenreMiniPlayer({ title, steps }: { title: string; steps: Step[] }) {
  const [i, setI] = useState(0);
  const step = steps[i] ?? steps[0]!;
  const total = steps.length;

  const go = useCallback(
    (d: number) => setI((cur) => Math.min(total - 1, Math.max(0, cur + d))),
    [total],
  );

  // 步驟換了就把索引拉回合法範圍
  useEffect(() => {
    if (i > total - 1) setI(0);
  }, [i, total]);

  return (
    <section className="rounded-[14px] border border-akai bg-stage-2 p-4">
      <p className="label-mono font-bold text-akai">最難的一步</p>
      <h2 className="mt-1 text-lg text-white">{title}</h2>

      <div className="mt-4 grid gap-4 split:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <MpcPanel targets={step.targets} shift={step.shift} screen={step.screen} />

        <div className="rounded-[10px] bg-paper px-4 py-4 text-ink">
          <p className="label-mono text-muted">
            STEP {String(i + 1).padStart(2, '0')} / {total}
          </p>
          <p className="say mt-2 text-[16px]" dangerouslySetInnerHTML={{ __html: step.say }} />

          <dl className="mt-3 border-t border-rule">
            <div className="grid grid-cols-[70px_1fr] items-baseline gap-2 border-b border-rule py-2">
              <dt className="label-mono text-muted">螢幕</dt>
              <dd className="text-[13px] leading-relaxed">{step.screen.t1 || '—'}</dd>
            </div>
            <div className="grid grid-cols-[70px_1fr] items-baseline gap-2 border-b border-rule py-2">
              <dt className="label-mono text-muted">聽到</dt>
              <dd className="text-[13px] leading-relaxed">{step.hear}</dd>
            </div>
          </dl>

          {step.note && <NoteBox note={step.note} />}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={i === 0}
              className="border-2 border-ink px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
            >
              ← 上一步
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={i === total - 1}
              className="border-2 border-ink bg-ink px-3 py-2 text-[13px] font-semibold text-paper transition-colors hover:border-akai hover:bg-akai disabled:opacity-30"
            >
              {i === total - 1 ? '完成' : '下一步 →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
