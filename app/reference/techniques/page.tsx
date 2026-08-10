import type { Metadata } from 'next';
import Link from 'next/link';
import {
  techniqueGroups,
  allTechniques,
  verifiedTechniqueCount,
} from '@/content/reference/techniques';
import { getLesson, lessonHref } from '@/content/lessons';
import { SiteSearch } from '@/components/reference/SiteSearch';

export const metadata: Metadata = {
  title: '延伸技巧 — Akai 取樣機進階操作',
  description:
    '已經會操作之後，讓你快很多的組合技：鎖長度錄循環、Threshold 自動起錄、切片的 Extract／Split／Merge、只有 Knob FX 能指定單一 pad。官方依據與社群做法分開標示。',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · TECHNIQUES</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          延伸技巧
        </h1>
        <p className="mt-2 max-w-[62ch] text-sm leading-[1.6] text-[#8D9299]">
          課程教你做出一個作品，這一頁教你做得更快。共 {allTechniques.length} 招，
          其中 {verifiedTechniqueCount} 招有官方手冊依據，其餘標示為社群做法。
        </p>
        <p className="mt-3 max-w-[62ch] rounded-lg bg-[#241E14] px-3 py-2 text-[13px] leading-relaxed text-[#E0B36B]">
          標「社群做法」的沒有官方依據，也還沒實測。可以試，但不要當成規格。
        </p>
      </header>

      <SiteSearch />

      <div className="mt-8 space-y-10">
        {techniqueGroups.map((group) => (
          <section key={group.id}>
            <h2 className="chan label-mono font-bold text-white">{group.title}</h2>
            <p className="mt-1 pl-[13px] text-sm text-[#8D9299]">{group.note}</p>

            <ul className="mt-4 space-y-3">
              {group.items.map((t) => {
                const lesson = t.lesson ? getLesson(t.lesson) : undefined;
                return (
                  <li key={t.id} className="rounded-xl border border-[#2C3036] bg-stage-2 p-[18px]">
                    <div className="flex flex-wrap items-center gap-2">
                      {t.status === 'verified' ? (
                        <span className="label-mono rounded-full bg-[#1E3226] px-[9px] py-[2px] text-live">
                          官方依據
                        </span>
                      ) : (
                        <span className="label-mono rounded-full bg-[#3A2F1F] px-[9px] py-[2px] text-[#EFA043]">
                          社群做法 · 尚未驗證
                        </span>
                      )}
                      {lesson && (
                        <Link
                          href={lessonHref(lesson)}
                          className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-[2px] text-[#B7BDC4] hover:text-white"
                        >
                          {lesson.season}-{lesson.index} {lesson.title}
                        </Link>
                      )}
                    </div>

                    <h3 className="mt-[10px] text-[17px] font-semibold leading-snug text-white">
                      {t.title}
                    </h3>

                    <dl className="mt-3 space-y-2">
                      <div className="grid gap-1 split:grid-cols-[74px_1fr] split:gap-4">
                        <dt className="label-mono pt-[3px] text-[#6B7178]">什麼時候</dt>
                        <dd className="text-sm leading-relaxed text-[#B7BDC4]">{t.when}</dd>
                      </div>
                      <div className="grid gap-1 split:grid-cols-[74px_1fr] split:gap-4">
                        <dt className="label-mono pt-[3px] text-[#6B7178]">怎麼做</dt>
                        <dd className="text-sm leading-relaxed text-paper">{t.how}</dd>
                      </div>
                      <div className="grid gap-1 split:grid-cols-[74px_1fr] split:gap-4">
                        <dt className="label-mono pt-[3px] text-[#6B7178]">依據</dt>
                        <dd className="text-[13px] leading-relaxed text-[#8D9299]">{t.source}</dd>
                      </div>
                    </dl>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
