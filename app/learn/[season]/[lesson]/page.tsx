import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { lessons, findLesson, lessonHref, getLesson } from '@/content/lessons';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { FirmwareBadge } from '@/components/badges/FirmwareBadge';
import { NeedsComputerBadge } from '@/components/badges/NeedsComputerBadge';

export const dynamicParams = false;

type Params = { season: string; lesson: string };

export function generateStaticParams(): Params[] {
  return lessons.map((l) => ({
    season: `s${l.season}`,
    lesson: String(l.index).padStart(2, '0'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { season, lesson: index } = await params;
  const lesson = findLesson(season, index);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — MPC Sample 取樣機教學`,
    description: lesson.outcome,
  };
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { season, lesson: index } = await params;
  const lesson = findLesson(season, index);
  if (!lesson) notFound();

  const prerequisites = lesson.prerequisites
    .map((id) => getLesson(id))
    .filter((l) => l !== undefined);

  // HowTo 結構化資料（PROJECT-PLAN §13）
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: lesson.title,
    description: lesson.outcome,
    totalTime: `PT${lesson.minutes}M`,
    inLanguage: 'zh-Hant',
    step: lesson.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: s.say.replace(/<[^>]*>/g, ''),
    })),
  };

  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />

      <header className="mb-6 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">
          SEASON {lesson.season} · LESSON {String(lesson.index).padStart(2, '0')}
        </p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-[1.15] tracking-[-0.02em] text-white">
          {lesson.title}
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          做完你手上會有：{lesson.outcome}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <NeedsComputerBadge needsComputer={lesson.needsComputer} />
          <FirmwareBadge version={lesson.firmwareVerified} />
          <span className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-1 text-[#B7BDC4]">
            約 {lesson.minutes} 分鐘
          </span>
          {prerequisites.map((p) => (
            <Link
              key={p.id}
              href={lessonHref(p)}
              className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-1 text-[#B7BDC4] hover:text-white"
            >
              先修 · {p.title}
            </Link>
          ))}
        </div>
      </header>

      <LessonPlayer lesson={lesson} />

      <nav className="mt-8 border-t border-[#2C3036] pt-4">
        <Link href="/learn" className="label-mono text-[#8D9299] hover:text-white">
          ← 回課程地圖
        </Link>
      </nav>
    </main>
  );
}
