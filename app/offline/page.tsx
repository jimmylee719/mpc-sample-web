import type { Metadata } from 'next';
import Link from 'next/link';
import { PadGrid } from '@/components/site/Deco';
import { CachedPages, type CandidatePage } from '@/components/site/CachedPages';
import { lessons, lessonHref } from '@/content/lessons';
import { genres } from '@/content/genres';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '沒有網路',
  description: '目前連不上網路。已經看過的頁面仍然打得開。',
  robots: { index: false, follow: false },
});

/** 有可能被存進快取的頁面。實際列出哪幾頁由瀏覽器端比對快取決定。 */
const CANDIDATES: CandidatePage[] = [
  { href: '/', label: '首頁', group: '主要頁面' },
  { href: '/start', label: '開始之前', group: '主要頁面' },
  { href: '/learn', label: '課程地圖', group: '主要頁面' },
  { href: '/genre', label: '曲風工廠', group: '主要頁面' },
  { href: '/reference', label: '查詢區', group: '主要頁面' },
  { href: '/reference/shortcuts', label: '快捷鍵總表', group: '查詢' },
  { href: '/reference/knobs', label: '旋鈕矩陣', group: '查詢' },
  { href: '/reference/fx', label: '效果字典', group: '查詢' },
  { href: '/reference/glossary', label: '名詞對照', group: '查詢' },
  { href: '/reference/troubleshoot', label: '疑難排解', group: '查詢' },
  { href: '/reference/specs', label: '規格總表', group: '查詢' },
  { href: '/reference/techniques', label: '延伸技巧', group: '查詢' },
  ...lessons.map((l) => ({
    href: lessonHref(l),
    label: `${l.season}-${l.index} ${l.title}`,
    group: '課程',
  })),
  ...genres.map((g) => ({ href: `/genre/${g.slug}`, label: g.title, group: '曲風' })),
];

export default function OfflinePage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <div className="mx-auto max-w-[56ch] pt-10 text-center">
        <div className="mx-auto w-[120px] opacity-40">
          <PadGrid lit={[]} />
        </div>

        <p className="label-mono mt-8 font-bold text-akai">OFFLINE</p>
        <h1 className="mt-2 text-[clamp(22px,5vw,30px)] leading-tight text-white">
          目前連不上網路
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#8D9299]">
          你之前開過的頁面還在，可以照常看。沒開過的要等網路回來。
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-[9px]">
          <Link
            href="/learn"
            className="border-2 border-[#4A5057] px-4 py-[10px] text-sm font-semibold text-paper transition-colors hover:border-akai hover:bg-akai"
          >
            回課程地圖
          </Link>
          <Link
            href="/"
            className="border-2 border-[#4A5057] px-4 py-[10px] text-sm font-semibold text-paper transition-colors hover:border-akai hover:bg-akai"
          >
            回首頁
          </Link>
        </div>

        <CachedPages candidates={CANDIDATES} />

        <p className="label-mono mt-8 text-muted">機器不用網路也能練，先去按幾下</p>
      </div>
    </main>
  );
}
