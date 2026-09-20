import type { Metadata } from 'next';
import Link from 'next/link';
import { specGroups, MANUAL_REVISION } from '@/content/reference/firmware';
import { SiteSearch } from '@/components/reference/SiteSearch';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '規格總表 — Akai 取樣機',
  description:
    '複音數、可匯入格式、取樣位元與取樣率、序列器解析度、每個專案能放多少樣本與序列。全部對照官方使用手冊 v1.3.0 (RevA) 附錄。',
});

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · SPECS</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          規格總表
        </h1>
        <p className="mt-2 max-w-[62ch] text-sm leading-[1.6] text-[#8D9299]">
          全部逐行對照官方使用手冊 {MANUAL_REVISION} 的附錄。只放官方白紙黑字寫過的東西，
          推論與社群說法不進這一頁。
        </p>
      </header>

      <SiteSearch />

      <div className="mt-8 space-y-8">
        {specGroups.map((group) => (
          <section key={group.title}>
            <h2 className="chan label-mono font-bold text-white">{group.title}</h2>
            <dl className="mt-3 divide-y divide-[#2C3036] border-y border-[#2C3036]">
              {group.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 py-[13px] split:grid-cols-[180px_1fr] split:gap-5"
                >
                  <dt className="label-mono pt-[3px] text-[#8D9299]">{row.label}</dt>
                  <dd>
                    <p className="text-[15px] leading-relaxed text-white">{row.value}</p>
                    {row.note && (
                      <p className="mt-1 text-[13px] leading-relaxed text-[#8D9299]">{row.note}</p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <p className="mt-8 text-[13px] leading-relaxed text-[#6B7178]">
        官方附註規格得隨時變更，恕不另行通知。有疑問或發現與你手上的機器不符，
        請以最新版官方手冊為準，並到{' '}
        <Link href="/reference/firmware" className="underline hover:text-white">
          韌體與尚未驗證清單
        </Link>{' '}
        看我們還有哪些沒確認。
      </p>
    </main>
  );
}
