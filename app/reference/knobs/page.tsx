import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '旋鈕矩陣',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">REFERENCE · KNOBS</p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        旋鈕矩陣
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
        K1／K2／K3 在 13 種畫面下的功能。選畫面，面板同步高亮。P2 交付。
      </p>
    </main>
  );
}
