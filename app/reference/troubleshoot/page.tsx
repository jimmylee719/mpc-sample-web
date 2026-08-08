import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '疑難排解',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">REFERENCE · TROUBLESHOOT</p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        疑難排解
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
        現象、原因、解法三欄矩陣。P2 交付。
      </p>
    </main>
  );
}
