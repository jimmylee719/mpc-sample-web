import type { Metadata } from 'next';
import { ShortcutTable } from '@/components/reference/ShortcutTable';
import { SiteSearch } from '@/components/reference/SiteSearch';

export const metadata: Metadata = {
  title: '快捷鍵總表 — Akai 取樣機',
  description: 'SHIFT 加打擊墊、SHIFT 加按鍵的完整組合，含面板上沒有印出來的隱藏功能。可搜尋、可篩選。',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · SHORTCUTS</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          快捷鍵總表
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          面板上的紅字就是第二功能。這一頁把它們全部列出來，包含面板沒印的那幾組。
        </p>
      </header>
      <SiteSearch />
      <ShortcutTable />
    </main>
  );
}
