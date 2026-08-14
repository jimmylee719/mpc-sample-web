'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NeedsComputerBadge } from '@/components/badges/NeedsComputerBadge';

const STORAGE_PREFIX = 'mpc-sample:progress:';

/**
 * 課程地圖。
 *
 * 為什麼要顯示進度：35 課、434 步，對一個剛拿到機器的人來說是壓力不是誘因。
 * 看得到「我完成了 3 課」跟看不到，是兩件完全不同的事。
 *
 * 進度來自 localStorage，跟課程播放器同一組 key。伺服器產出的 HTML 一律是
 * 「還沒開始」，讀回進度只在瀏覽器端做，避免 hydration 對不起來。
 */

export interface LessonSummary {
  id: string;
  href: string;
  title: string;
  outcome: string;
  season: number;
  index: number;
  minutes: number;
  steps: number;
  needsComputer: boolean;
}

export interface SeasonSummary {
  n: number;
  title: string;
  outcome: string;
  items: LessonSummary[];
}

type ProgressMap = Record<string, number>;

function readProgress(all: LessonSummary[]): ProgressMap {
  const out: ProgressMap = {};
  for (const l of all) {
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + l.id);
      if (raw === null) continue;
      const n = Number.parseInt(raw, 10);
      if (Number.isInteger(n) && n > 0) out[l.id] = n;
    } catch {
      return out; // localStorage 被關掉就整組放棄，不影響上課
    }
  }
  return out;
}

/** 走到最後一步就算完成 */
function isDone(l: LessonSummary, p: ProgressMap): boolean {
  return (p[l.id] ?? 0) >= l.steps - 1;
}

export function LessonMap({ seasons }: { seasons: SeasonSummary[] }) {
  const all = seasons.flatMap((s) => s.items);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    setProgress(readProgress(all));
    setRestored(true);
    // all 來自 props，內容在這一頁不會變
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = all.filter((l) => isDone(l, progress));
  const started = all.filter((l) => (progress[l.id] ?? 0) > 0 && !isDone(l, progress));
  // 接著上哪一課：優先接沒做完的，否則接第一堂還沒開始的
  const next = started[0] ?? all.find((l) => (progress[l.id] ?? 0) === 0);
  const pct = all.length === 0 ? 0 : Math.round((done.length / all.length) * 100);

  return (
    <>
      {/* ── 總進度 ── */}
      <section className="mb-8 rounded-[14px] border border-[#2C3036] bg-stage-2 p-[18px]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="label-mono font-bold text-akai">你的進度</p>
            <p className="mt-1 text-[15px] text-white">
              {!restored ? (
                <span className="text-[#8D9299]">讀取中…</span>
              ) : done.length === 0 && started.length === 0 ? (
                <span className="text-[#8D9299]">還沒開始。從第 1 課走一遍就有東西了。</span>
              ) : (
                <>
                  完成 <b className="font-mono text-akai">{done.length}</b> / {all.length} 課
                  {started.length > 0 && (
                    <span className="ml-2 text-sm text-[#8D9299]">
                      另有 {started.length} 課進行中
                    </span>
                  )}
                </>
              )}
            </p>
          </div>

          {restored && next && (
            <Link
              href={next.href}
              className="border-2 border-akai bg-akai px-4 py-[10px] text-[13px] font-bold text-white transition-colors hover:border-white hover:bg-transparent"
            >
              {started.length > 0 ? '繼續' : '開始'} {next.season}-{next.index} {next.title} →
            </Link>
          )}
        </div>

        <div className="mt-4 h-[6px] overflow-hidden rounded-full bg-[#2C3036]">
          <div
            className="h-full rounded-full bg-live transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="label-mono mt-2 text-[#6B7178]">
          進度只存在這台裝置上，換裝置不會同步
        </p>
      </section>

      {/* ── 各季 ── */}
      <div className="space-y-10">
        {seasons.map((season) => {
          const seasonDone = season.items.filter((l) => isDone(l, progress)).length;
          return (
            <section key={season.n}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-akai font-mono text-[15px] font-bold text-white">
                  {season.n}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="label-mono font-bold text-white">
                    SEASON {season.n} · {season.title}
                  </h2>
                  <p className="mt-[3px] text-sm text-[#8D9299]">學完手上有：{season.outcome}</p>
                </div>
                {restored && seasonDone > 0 && (
                  <span className="label-mono shrink-0 rounded-full bg-[#1E3226] px-[9px] py-[3px] text-live">
                    {seasonDone}/{season.items.length}
                  </span>
                )}
              </div>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {season.items.map((lesson) => {
                  const at = progress[lesson.id] ?? 0;
                  const complete = isDone(lesson, progress);
                  const inProgress = at > 0 && !complete;
                  return (
                    <li key={lesson.id}>
                      <Link href={lesson.href} className="card h-full p-4">
                        <span className="flex items-center gap-2">
                          <span className="label-mono text-muted">
                            {lesson.season}-{lesson.index} · 約 {lesson.minutes} 分鐘 ·{' '}
                            {lesson.steps} 步
                          </span>
                          {restored && complete && (
                            <span className="label-mono rounded-full bg-[#1E3226] px-[7px] py-[2px] text-live">
                              ✓ 完成
                            </span>
                          )}
                          {restored && inProgress && (
                            <span className="label-mono rounded-full bg-[#2A2F35] px-[7px] py-[2px] text-[#B7BDC4]">
                              第 {at + 1} 步
                            </span>
                          )}
                        </span>

                        <span className="mt-1 block text-lg text-white">{lesson.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-[#8D9299]">
                          {lesson.outcome}
                        </span>

                        {restored && inProgress && (
                          <span className="mt-3 block h-[3px] overflow-hidden rounded-full bg-[#2C3036]">
                            <span
                              className="block h-full rounded-full bg-akai"
                              style={{ width: `${Math.round(((at + 1) / lesson.steps) * 100)}%` }}
                            />
                          </span>
                        )}

                        {lesson.needsComputer && (
                          <span className="mt-2 inline-block">
                            <NeedsComputerBadge needsComputer />
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
