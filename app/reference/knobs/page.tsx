import type { Metadata } from 'next';
import { KnobMatrix } from '@/components/reference/KnobMatrix';
import { verifiedCount } from '@/content/reference/knobs';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '旋鈕矩陣 — Akai 取樣機',
  description: 'K1、K2、K3 在各個畫面下分別管什麼。選畫面，面板與小螢幕同步顯示。',
});

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · KNOBS</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          旋鈕矩陣
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          同樣三顆旋鈕，換一個畫面就換一組功能。選左邊的畫面，右邊的機器會同步變成那個樣子。
        </p>
      </header>
      <KnobMatrix />
      <p className="label-mono mt-8 text-muted">已查證 {verifiedCount} 個畫面，其餘標示為資料待補</p>
    </main>
  );
}
