import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '韌體對照',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">REFERENCE · FIRMWARE</p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        韌體對照
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
        版本更新紀錄與受影響頁面。目前全站基準為 1.3.0（RevA）。P2 交付。
      </p>
    </main>
  );
}
