import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FIRMWARE_BASELINE,
  MANUAL_REVISION,
  firmwareLog,
  openQuestions,
  resolvedQuestions,
} from '@/content/reference/firmware';
import { lessons, lessonHref } from '@/content/lessons';
import { FirmwareBadge } from '@/components/badges/FirmwareBadge';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '韌體對照 — Akai 取樣機',
  description: '全站事實查核所依據的韌體與手冊版本，以及尚未驗證的項目清單。',
});

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · FIRMWARE</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          韌體對照
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          這一頁說清楚本站的事實從哪來、哪些還沒驗證。看到「尚未驗證」就代表我們還沒實測，不要當成定論。
        </p>
      </header>
      <section>
        <h2 className="label-mono text-akai">目前基準</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#B7BDC4]">
          韌體 {FIRMWARE_BASELINE}｜官方使用手冊 {MANUAL_REVISION}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="label-mono text-akai">各課依據的版本</h2>
        <ul className="mt-3 divide-y divide-[#2C3036] border-y border-[#2C3036]">
          {lessons.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center gap-3 py-3">
              <Link href={lessonHref(l)} className="text-sm text-white hover:text-akai">
                {l.season}-{l.index} {l.title}
              </Link>
              <FirmwareBadge version={l.firmwareVerified} />
              <span className="label-mono text-muted">查核於 {l.verifiedDate}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="label-mono text-akai">尚未驗證的項目</h2>
        <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
          以下項目在官方資料中查不到，或官方自己前後不一致。實測確認之前，本站不會寫成肯定語氣。
        </p>
        <ul className="mt-3 divide-y divide-[#2C3036] border-y border-[#2C3036]">
          {openQuestions.map((q) => (
            <li key={q.id} className="py-3">
              <p className="text-sm font-semibold text-white">{q.question}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#B7BDC4]">{q.status}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="label-mono text-akai">已排除的疑問 · {resolvedQuestions.length} 項</h2>
        <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[#8D9299]">
          這些原本也在上面那份清單裡，後來查清楚了。過程留在這裡，是因為好幾項是
          <b className="font-semibold text-white">官方自己前後不一致</b>，
          你在別的地方看到不同數字時，可以直接對照我們是憑什麼下的結論。
        </p>
        <ul className="mt-3 space-y-3">
          {resolvedQuestions.map((q) => (
            <li key={q.id} className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="label-mono rounded-full bg-[#1E3226] px-[9px] py-[2px] text-live">
                  已釐清
                </span>
                <span className="label-mono text-muted">{q.resolvedDate}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{q.question}</p>
              <p className="mt-1 text-sm leading-relaxed text-live">{q.answer}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#8D9299]">
                <span className="label-mono text-[#6B7178]">依據　</span>
                {q.evidence}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="label-mono text-akai">更新紀錄</h2>
        <ul className="mt-3 divide-y divide-[#2C3036] border-y border-[#2C3036]">
          {firmwareLog.map((e) => (
            <li key={e.version} className="grid gap-1 py-3 split:grid-cols-[110px_1fr] split:gap-4">
              <span className="font-mono text-[13px] font-bold text-white">{e.version}</span>
              <span className="text-sm leading-relaxed text-[#B7BDC4]">{e.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
