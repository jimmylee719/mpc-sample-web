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
  return lessons.map((l) => ({ season: `s${l.season}`, lesson: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { season, lesson: slug } = await params;
  const lesson = findLesson(season, slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — MPC Sample 取樣機教學`,
    description: lesson.outcome,
  };
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { season, lesson: slug } = await params;
  const lesson = findLesson(season, slug);
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

      {/*
        完整步驟清單。播放器一次只顯示一步，那些文字不會進到 HTML，
        搜尋引擎與站內搜尋都吃不到。這一段把全部步驟攤開，
        對讀者也有用：可以直接印出來擺在機器旁邊照著做。
      */}
      <section className="mt-10 rounded-[14px] bg-paper px-[18px] py-6 text-ink split:px-[26px]">
        <h2 className="label-mono font-bold text-akai">本課完整步驟</h2>
        <p className="mt-1 text-sm text-muted">共 {lesson.steps.length} 步。想印出來擺在機器旁邊就用這一份。</p>

        {lesson.chapters.map((chapter, ci) => (
          <div key={chapter} className="mt-6">
            <h3 className="text-base font-semibold">
              第 {ci + 1} 段 · {chapter}
            </h3>
            <ol className="mt-2 border-t border-rule">
              {lesson.steps.map((s, i) => ({ s, i })).filter(({ s }) => s.ch === ci).map(({ s, i }) => (
                <li key={i} className="border-b border-rule py-3">
                  <span className="label-mono text-muted">STEP {String(i + 1).padStart(2, '0')}</span>
                  <p
                    className="mt-1 text-[15px] leading-[1.7] [&_b]:font-bold"
                    dangerouslySetInnerHTML={{ __html: s.say }}
                  />
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">
                    螢幕：{s.screen.t1 || '—'}　｜　你會聽到：{s.hear}
                  </p>
                  {s.note && (
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">
                      {s.note.title}：{s.note.body}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}

        <h3 className="mt-8 text-base font-semibold">做完了嗎？自己對一次</h3>
        <ul className="mt-2 space-y-2">
          {lesson.checkpoints.map((c) => (
            <li key={c} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden className="text-akai">
                ✓
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-base font-semibold">資料來源</h3>
        <ul className="mt-2 space-y-1">
          {lesson.sources.map((s) => (
            <li key={s} className="text-[13px] leading-relaxed text-muted">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <nav className="mt-8 border-t border-[#2C3036] pt-4">
        <Link href="/learn" className="label-mono text-[#8D9299] hover:text-white">
          ← 回課程地圖
        </Link>
      </nav>
    </main>
  );
}
