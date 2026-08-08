import { notFound } from 'next/navigation';
import { lessons, getLesson } from '@/content/lessons';

export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.map((l) => ({ season: `s${l.season}`, lesson: l.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ season: string; lesson: string }>;
}) {
  const { lesson: lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();

  // P1：改用 <LessonPlayer lesson={lesson} />
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">
        SEASON {lesson.season} · LESSON {String(lesson.index).padStart(2, '0')}
      </p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        {lesson.title}
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">{lesson.outcome}</p>
    </main>
  );
}
