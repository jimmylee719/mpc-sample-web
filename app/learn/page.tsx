import type { Metadata } from 'next';
import Link from 'next/link';
import { SEASONS, lessonsBySeason, lessonHref } from '@/content/lessons';
import { NeedsComputerBadge } from '@/components/badges/NeedsComputerBadge';

export const metadata: Metadata = {
  title: '課程地圖 — Akai 取樣機教學',
  description: '五個 Season、34 課。從開機到上台，一課做完一個作品，全程不需要電腦。',
};

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">LEARN · 五個 SEASON</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          課程地圖
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          一課等於一個完成的作品，不是一課一個功能。做完每一課，你手上都會多一樣東西。
        </p>
      </header>

      <div className="space-y-10">
        {SEASONS.map((season) => {
          const items = lessonsBySeason(season.n);
          return (
            <section key={season.n}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-akai font-mono text-[15px] font-bold text-white">
                  {season.n}
                </span>
                <div className="min-w-0">
                  <h2 className="label-mono font-bold text-white">
                    SEASON {season.n} · {season.title}
                  </h2>
                  <p className="mt-[3px] text-sm text-[#8D9299]">學完手上有：{season.outcome}</p>
                </div>
              </div>

              {items.length === 0 ? (
                <p className="label-mono mt-3 text-muted">尚未開放</p>
              ) : (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {items.map((lesson) => (
                    <li key={lesson.id}>
                      <Link href={lessonHref(lesson)} className="card h-full p-4">
                        <span className="label-mono text-muted">
                          {lesson.season}-{lesson.index} · 約 {lesson.minutes} 分鐘 ·{' '}
                          {lesson.steps.length} 步
                        </span>
                        <span className="mt-1 block text-lg text-white">{lesson.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-[#8D9299]">
                          {lesson.outcome}
                        </span>
                        {lesson.needsComputer && (
                          <span className="mt-2 inline-block">
                            <NeedsComputerBadge needsComputer />
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
