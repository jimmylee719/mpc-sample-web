import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '課程地圖',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">LEARN · 五個 SEASON</p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        課程地圖
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
        從開機到上台，34 課的完整路線圖。P1 起填入 Season 1 四課。
      </p>
    </main>
  );
}
