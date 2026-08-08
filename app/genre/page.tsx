import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '曲風工廠',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">GENRE · 16 張配方卡</p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        曲風工廠
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
        每個曲風一張八段式配方卡，含難度分級 L1–L4。P6 交付。
      </p>
    </main>
  );
}
