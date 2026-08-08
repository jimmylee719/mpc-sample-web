import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '關於本站',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">ABOUT</p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        關於本站
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
        來源說明、免責聲明、事實查核方式。本站不提供法律意見。
      </p>
    </main>
  );
}
