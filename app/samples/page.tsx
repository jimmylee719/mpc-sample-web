import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '素材庫',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">SAMPLES · 免費下載</p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        素材庫
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
        一律自錄或 CC0，保留原始檔佐證。不提供他人音樂素材。P6 交付。
      </p>
    </main>
  );
}
