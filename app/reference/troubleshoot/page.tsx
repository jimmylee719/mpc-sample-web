import type { Metadata } from 'next';
import { troubles } from '@/content/reference/troubleshoot';
import { SiteSearch } from '@/components/reference/SiteSearch';
import { withShare } from '@/content/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, faqPage } from '@/content/seo';

export const metadata: Metadata = withShare({
  title: '疑難排解 — Akai 取樣機',
  description:
    'MPC Sample 常見問題排解：推桿沒反應、旋鈕數值對不上、選麥克風後沒聲音、充不進電等。現象、原因、解法三欄對照，每一條標明官方手冊出處。',
});

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      {/*
        現象＝問題、原因加解法＝答案，本來就是問答結構。
        標成 FAQPage，答案引擎在回答「推桿沒反應怎麼辦」時才拿得到配對好的答案，
        而且會一起看到我們附的官方手冊出處。
      */}
      <JsonLd
        data={faqPage(
          troubles.map((t) => ({
            question: `MPC Sample：${t.symptom}`,
            answer: `${t.cause} ${t.fix}（依據：${t.source}）`,
          })),
        )}
      />
      <JsonLd
        data={breadcrumb([
          { name: '首頁', path: '/' },
          { name: '查詢區', path: '/reference' },
          { name: '疑難排解', path: '/reference/troubleshoot' },
        ])}
      />

      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · TROUBLESHOOT</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          疑難排解
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          只收有依據的項目。純社群回報、沒有實測過的不收。
        </p>
      </header>
      <SiteSearch />
      <ul className="grid gap-3">
        {troubles.map((t) => (
          <li key={t.id} className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
            <h2 className="text-base font-semibold text-white">{t.symptom}</h2>
            <div className="mt-3 grid gap-2 split:grid-cols-2 split:gap-4">
              <p className="text-sm leading-relaxed text-[#B7BDC4]">
                <span className="label-mono mb-1 block text-muted">為什麼</span>
                {t.cause}
              </p>
              <p className="text-sm leading-relaxed text-[#B7BDC4]">
                <span className="label-mono mb-1 block text-akai">怎麼解</span>
                {t.fix}
              </p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">依據：{t.source}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
