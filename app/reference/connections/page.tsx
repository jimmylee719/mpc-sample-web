import type { Metadata } from 'next';
import Link from 'next/link';
import {
  inputs,
  outputs,
  packingList,
  type Connection,
  type ConnStatus,
} from '@/content/reference/connections';
import { withShare } from '@/content/site';
import { OfflineDownload } from '@/components/site/OfflineDownload';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, faqPage } from '@/content/seo';

export const metadata: Metadata = withShare({
  title: '接線總表 — 手機、電腦、唱盤怎麼接 MPC Sample',
  description:
    'MPC Sample 的接線總表：手機（USB-C、Lightning、耳機孔）、電腦、唱盤、合成器、吉他、麥克風怎麼接進來取樣；耳機、音響、錄音介面怎麼接出去。每一列寫清楚要哪條線、Source 選什麼，並連到對應的課程步驟。',
});

const STATUS: Record<ConnStatus, { label: string; cls: string }> = {
  official: { label: '官方有寫', cls: 'bg-[#1E3226] text-live' },
  general: { label: '一般接線常識', cls: 'bg-[#2A2F35] text-[#B7BDC4]' },
  unverified: { label: '尚未驗證', cls: 'bg-[#3A2F1F] text-[#EFA043]' },
};

function Row({ c }: { c: Connection }) {
  const s = STATUS[c.status];
  return (
    <li className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-white">{c.device}</h3>
        <span className={`label-mono rounded-full px-[9px] py-[2px] ${s.cls}`}>{s.label}</span>
      </div>
      <dl className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[88px_1fr]">
        <dt className="label-mono text-muted">接到</dt>
        <dd className="text-[#D9D4CB]">{c.port}</dd>
        <dt className="label-mono text-muted">要什麼線</dt>
        <dd className="text-[#D9D4CB]">{c.cable}</dd>
        {c.source !== '—' && (
          <>
            <dt className="label-mono text-muted">Source</dt>
            <dd className="font-mono text-[13px] text-white">{c.source}</dd>
          </>
        )}
      </dl>
      <p className="mt-3 text-sm leading-relaxed text-[#8D9299]">{c.note}</p>
      {c.href && (
        <Link
          href={c.href}
          className="label-mono mt-3 inline-block text-akai underline transition-colors hover:text-white"
        >
          照著做 →
        </Link>
      )}
    </li>
  );
}

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      {/* 「手機怎麼接 MPC Sample」是很典型的提問，每一列就是一組問答 */}
      <JsonLd
        data={faqPage(
          [...inputs, ...outputs]
            .filter((c) => c.status !== 'unverified')
            .map((c) => ({
              question: `MPC Sample 要怎麼接${c.device}？`,
              answer: `接到${c.port}，需要${c.cable}。${c.source !== '—' ? `錄音來源選 ${c.source}。` : ''}${c.note}`,
            })),
        )}
      />
      <JsonLd
        data={breadcrumb([
          { name: '首頁', path: '/' },
          { name: '查詢區', path: '/reference' },
          { name: '接線總表', path: '/reference/connections' },
        ])}
      />

      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · CONNECTIONS</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          接線總表
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm leading-[1.6] text-[#8D9299]">
          找到你手上的東西，照那一列接。每一列都連到課程裡對應的那一步。
        </p>
      </header>

      <section className="rounded-[14px] bg-paper px-[18px] py-5 text-ink split:px-[26px]">
        <h2 className="label-mono font-bold text-akai">出門前帶齊</h2>
        <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {packingList.map((p) => (
            <li key={p.item} className="flex gap-3 text-[15px] leading-relaxed">
              <span aria-hidden className="text-akai">
                ✓
              </span>
              <span>
                <b className="font-semibold">{p.item}</b>
                <span className="block text-sm text-muted">{p.why}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4">
        <OfflineDownload compact />
      </div>

      <section className="mt-10">
        <h2 className="chan label-mono font-bold text-white">把聲音錄進來 · {inputs.length} 種</h2>
        <p className="mt-2 max-w-[62ch] pl-[13px] text-sm leading-relaxed text-[#8D9299]">
          先按住 SHIFT 再按 SAMPLE 打開 Input Config，Source 選下面寫的那一個。
          錄串流平台或影音網站的聲音之前，先看{' '}
          <Link href="/learn/s2/sampling-copyright-basics" className="underline hover:text-white">
            2-2 這段素材可以用嗎
          </Link>
          ：平台的服務條款本身就禁止錄製，那跟著作權是兩條各自獨立的責任線。
        </p>
        <ul className="mt-4 grid gap-3 split:grid-cols-2">
          {inputs.map((c) => (
            <Row key={c.id} c={c} />
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="chan label-mono font-bold text-white">把聲音送出去 · {outputs.length} 種</h2>
        <ul className="mt-4 grid gap-3 split:grid-cols-2">
          {outputs.map((c) => (
            <Row key={c.id} c={c} />
          ))}
        </ul>
      </section>
    </main>
  );
}
