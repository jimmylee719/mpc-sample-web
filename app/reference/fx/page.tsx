import type { Metadata } from 'next';
import { FxDictionary } from '@/components/reference/FxDictionary';
import { SiteSearch } from '@/components/reference/SiteSearch';
import { KNOB_FX_TOTAL, KNOB_FX_DOCUMENTED } from '@/content/reference/fx';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '效果字典 — Akai 取樣機',
  description:
    'MPC Sample 的四套效果引擎：Pad FX 16 種、Knob FX、Flex Beat 與內建壓縮器。每一種都寫清楚做什麼用、什麼時候用。Pad FX 套整段序列，能指定單一 pad 的是 Knob FX。',
});

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · FX</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          效果字典
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          四個效果引擎分工不同。Pad FX 套整段序列，能指定單一 pad 的是 Knob FX。
        </p>
      </header>
      <SiteSearch />
      <FxDictionary />
      <p className="label-mono mt-8 text-muted">
        Knob FX 官方共 {KNOB_FX_TOTAL} 種，本站已核對 {KNOB_FX_DOCUMENTED} 種
      </p>
    </main>
  );
}
