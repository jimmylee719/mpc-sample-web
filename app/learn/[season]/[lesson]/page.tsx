import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { lessons, findLesson, lessonHref, getLesson } from '@/content/lessons';
import { LessonPlayer } from '@/components/lesson/LessonPlayer';
import { PrintButton } from '@/components/lesson/PrintButton';
import { SayText } from '@/components/lesson/SayText';
import { FirmwareBadge } from '@/components/badges/FirmwareBadge';
import { NeedsComputerBadge } from '@/components/badges/NeedsComputerBadge';
import { VideoList } from '@/components/video/VideoList';
import { videosFor } from '@/content/videos';
import { termsUsedIn } from '@/content/reference/glossary';
import { withShare } from '@/content/site';

export const dynamicParams = false;

type Params = { season: string; lesson: string };

export function generateStaticParams(): Params[] {
  return lessons.map((l) => ({ season: `s${l.season}`, lesson: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { season, lesson: slug } = await params;
  const lesson = findLesson(season, slug);
  if (!lesson) return {};
  return withShare({
    title: `${lesson.title} — MPC Sample 取樣機教學`,
    description: lesson.outcome,
  });
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { season, lesson: slug } = await params;
  const lesson = findLesson(season, slug);
  if (!lesson) notFound();

  const prerequisites = lesson.prerequisites
    .map((id) => getLesson(id))
    .filter((l) => l !== undefined);

  // 這一課的全部文字，拿去比對名詞表
  const lessonText = lesson.steps
    .map((s) => `${s.say} ${s.hear} ${s.screen.t1 ?? ''} ${s.note?.body ?? ''}`)
    .join(' ')
    .replace(/<[^>]*>/g, '');
  const terms = termsUsedIn(lessonText);

  // 課程註冊表本身就是排好的順序，直接拿前後兩課
  const pos = lessons.findIndex((l) => l.id === lesson.id);
  const prev = pos > 0 ? lessons[pos - 1] : undefined;
  const next = pos >= 0 && pos < lessons.length - 1 ? lessons[pos + 1] : undefined;

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

      <div className="no-print">
        <LessonPlayer lesson={lesson} />
      </div>

      {/* 機器上的字全是英文。卡在單字上的人不會自己想到要去翻查詢區。 */}
      {terms.length > 0 && (
        <section className="mt-8 rounded-[14px] border border-[#2C3036] bg-stage-2 p-[18px]">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="chan label-mono font-bold text-white">這一課會用到的名詞</h2>
            <Link href="/reference/glossary" className="label-mono text-[#8D9299] hover:text-white">
              看完整對照表 →
            </Link>
          </div>
          <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {terms.map((t) => (
              <div key={t.en} className="border-l-2 border-[#3D4854] pl-3">
                <dt className="text-sm font-semibold text-white">
                  {t.en}
                  <span className="ml-2 font-normal text-[#8D9299]">{t.zh}</span>
                </dt>
                <dd className="mt-[2px] text-[13px] leading-relaxed text-[#8D9299]">{t.what}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/*
        完整步驟清單。播放器一次只顯示一步，那些文字不會進到 HTML，
        搜尋引擎與站內搜尋都吃不到。這一段把全部步驟攤開，
        對讀者也有用：可以直接印出來擺在機器旁邊照著做。
      */}
      <section className="mt-10 rounded-[14px] bg-paper px-[18px] py-6 text-ink split:px-[26px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="label-mono font-bold text-akai">本課完整步驟</h2>
          <PrintButton />
        </div>
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
                  <SayText html={s.say} className="mt-1 block text-[15px] leading-[1.7] [&_b]:font-bold" />
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

      {/* 官方系列影片在前，第三方補充在後 */}
      <div className="no-print">
      <VideoList videos={[...videosFor(lesson.id), ...(lesson.videos ?? [])]} />
      </div>

      {/* 上下課直接跳，不用先退回課程地圖再點一次 */}
      <nav className="no-print mt-8 grid gap-3 border-t border-[#2C3036] pt-5 sm:grid-cols-2">
        {prev ? (
          <Link href={lessonHref(prev)} className="card p-4">
            <span className="label-mono text-[#6B7178]">← 上一課</span>
            <span className="mt-1 block text-[15px] font-semibold text-white">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={lessonHref(next)} className="card p-4 sm:text-right">
            <span className="label-mono text-akai">下一課 →</span>
            <span className="mt-1 block text-[15px] font-semibold text-white">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <p className="mt-5 text-center">
        <Link href="/learn" className="label-mono text-[#8D9299] hover:text-white">
          回課程地圖
        </Link>
      </p>
    </main>
  );
}
