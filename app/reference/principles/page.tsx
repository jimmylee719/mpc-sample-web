import type { Metadata } from 'next';
import Link from 'next/link';
import { principleGroups, allPrinciples } from '@/content/reference/principles';
import { getLesson, lessonHref } from '@/content/lessons';
import { withShare } from '@/content/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, faqPage } from '@/content/seo';

export const metadata: Metadata = withShare({
  title: '原理 — MPC Sample 每個操作背後的為什麼',
  description:
    'MPC Sample 操作背後的原理：Resample 為什麼能空出聲音、Warp 的 Stretch 與 Pitch 差在哪、Threshold 切片怎麼找切點、Swing 把什麼往後推、Takeover 在解決什麼問題。機器行為對照官方手冊，一般音訊原理另外標示。',
});

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <JsonLd
        data={faqPage(
          allPrinciples.map((p) => ({
            question: `MPC Sample：${p.question}`,
            answer: `${p.short}${p.how}`,
          })),
        )}
      />
      <JsonLd
        data={breadcrumb([
          { name: '首頁', path: '/' },
          { name: '查詢區', path: '/reference' },
          { name: '原理', path: '/reference/principles' },
        ])}
      />

      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · PRINCIPLES</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          原理
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm leading-[1.6] text-[#8D9299]">
          課程教你按哪裡，這一頁講為什麼。懂了原理，遇到課程沒寫到的狀況也推得出下一步。
        </p>
        <nav aria-label="分類" className="mt-4 flex flex-wrap gap-2">
          {principleGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="label-mono rounded-full bg-[#2A2F35] px-[10px] py-1 text-[#B7BDC4] transition-colors hover:bg-akai hover:text-white"
            >
              {g.title} · {g.items.length}
            </a>
          ))}
        </nav>
      </header>

      <div className="space-y-12">
        {principleGroups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-24">
            <h2 className="chan label-mono font-bold text-white">{g.title}</h2>
            <ul className="mt-4 space-y-4">
              {g.items.map((p) => {
                const lesson = p.lesson ? getLesson(p.lesson) : undefined;
                return (
                  <li
                    key={p.id}
                    id={p.id}
                    className="scroll-mt-24 rounded-[14px] bg-paper px-[18px] py-5 text-ink split:px-[26px]"
                  >
                    <h3 className="text-[17px] font-bold leading-snug">{p.question}</h3>
                    <p className="mt-2 text-[15px] font-semibold leading-[1.7] text-akai">{p.short}</p>

                    <div className="mt-4 grid gap-4 split:grid-cols-2 split:gap-8">
                      <div>
                        <p className="label-mono text-muted">為什麼</p>
                        <p className="mt-1 text-[15px] leading-[1.75]">{p.how}</p>
                      </div>
                      <div>
                        <p className="label-mono text-muted">所以你該</p>
                        <p className="mt-1 text-[15px] leading-[1.75]">{p.forYou}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1 border-t border-rule pt-3 text-[13px] leading-relaxed text-muted">
                      {p.manual && (
                        <p>
                          <span className="label-mono mr-2 text-ink">官方手冊</span>
                          {p.manual}
                        </p>
                      )}
                      {p.general && (
                        <p>
                          <span className="label-mono mr-2 text-ink">一般音訊原理</span>
                          {p.general}
                        </p>
                      )}
                    </div>

                    {lesson && (
                      <Link
                        href={lessonHref(lesson)}
                        className="label-mono mt-3 inline-block text-akai underline hover:text-ink"
                      >
                        在 {lesson.season}-{lesson.index} {lesson.title} 實際操作 →
                      </Link>
                    )}
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
