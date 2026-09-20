import type { Metadata } from 'next';
import Link from 'next/link';
import { SEASONS, lessonsBySeason, lessonHref, lessons } from '@/content/lessons';
import { LessonMap, type SeasonSummary } from '@/components/lesson/LessonMap';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '課程地圖 — Akai 取樣機教學',
  description: '五個 Season、36 課。從開機到上台，一課做完一個作品，全程不需要電腦。',
});

const totalSteps = lessons.reduce((n, l) => n + l.steps.length, 0);

/** 只把前台真的用得到的欄位送進客戶端元件，不要整包課程資料都丟過去 */
const seasons: SeasonSummary[] = SEASONS.map((season) => ({
  n: season.n,
  title: season.title,
  outcome: season.outcome,
  items: lessonsBySeason(season.n).map((l) => ({
    id: l.id,
    href: lessonHref(l),
    title: l.title,
    outcome: l.outcome,
    season: l.season,
    index: l.index,
    minutes: l.minutes,
    steps: l.steps.length,
    needsComputer: l.needsComputer,
  })),
}));

export default function LearnPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-6 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">
          LEARN · {SEASONS.length} 個 SEASON · {lessons.length} 課 · {totalSteps} 步
        </p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          課程地圖
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          一課等於一個完成的作品，不是一課一個功能。做完每一課，你手上都會多一樣東西。
        </p>
        <p className="mt-3 text-sm text-[#8D9299]">
          機器剛到手？先看{' '}
          <Link href="/start" className="font-semibold text-akai underline hover:text-white">
            開始之前
          </Link>
          ，五分鐘搞定開箱、接線與音量。
        </p>
      </header>

      <LessonMap seasons={seasons} />
    </main>
  );
}
