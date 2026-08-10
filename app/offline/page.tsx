import type { Metadata } from 'next';
import Link from 'next/link';
import { PadGrid } from '@/components/site/Deco';

export const metadata: Metadata = {
  title: '沒有網路',
  description: '目前連不上網路。已經看過的頁面仍然打得開。',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <div className="mx-auto max-w-[42ch] pt-10 text-center">
        <div className="mx-auto w-[120px] opacity-40">
          <PadGrid lit={[]} />
        </div>

        <p className="label-mono mt-8 font-bold text-akai">OFFLINE</p>
        <h1 className="mt-2 text-[clamp(22px,5vw,30px)] leading-tight text-white">
          目前連不上網路
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#8D9299]">
          你之前開過的頁面還在，可以照常看。沒開過的要等網路回來。
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-[9px]">
          <Link
            href="/learn"
            className="border-2 border-[#4A5057] px-4 py-[10px] text-sm font-semibold text-paper transition-colors hover:border-akai hover:bg-akai"
          >
            回課程地圖
          </Link>
          <Link
            href="/"
            className="border-2 border-[#4A5057] px-4 py-[10px] text-sm font-semibold text-paper transition-colors hover:border-akai hover:bg-akai"
          >
            回首頁
          </Link>
        </div>

        <p className="label-mono mt-8 text-muted">機器不用網路也能練，先去按幾下</p>
      </div>
    </main>
  );
}
