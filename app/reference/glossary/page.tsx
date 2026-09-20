import type { Metadata } from 'next';
import { glossary } from '@/content/reference/glossary';
import { SiteSearch } from '@/components/reference/SiteSearch';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '名詞對照 — Akai 取樣機',
  description: '英文面板名詞的中文對照，每一個都寫清楚拿來做什麼用，不只是翻譯。',
});

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · GLOSSARY</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          名詞對照
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          每一個名詞都給你三件事：英文、中文、拿來做什麼。只給翻譯沒有用。
        </p>
      </header>
      <SiteSearch />
      <dl className="divide-y divide-[#2C3036] border-y border-[#2C3036]">
        {glossary.map((g) => (
          <div key={g.en} className="grid gap-1 py-3 split:grid-cols-[180px_120px_1fr] split:items-baseline split:gap-4">
            <dt className="font-mono text-[13px] font-bold tracking-[.06em] text-white">{g.en}</dt>
            <dd className="text-sm text-akai">{g.zh}</dd>
            <dd className="text-sm leading-relaxed text-[#B7BDC4]">{g.what}</dd>
          </div>
        ))}
      </dl>
      <p className="label-mono mt-8 text-muted">共 {glossary.length} 組</p>
    </main>
  );
}
