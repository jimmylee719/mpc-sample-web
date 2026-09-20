import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteSearch } from '@/components/reference/SiteSearch';
import { shortcuts } from '@/content/reference/shortcuts';
import { knobRows } from '@/content/reference/knobs';
import { glossary } from '@/content/reference/glossary';
import { troubles } from '@/content/reference/troubleshoot';
import { openQuestions, specGroups } from '@/content/reference/firmware';
import { allTechniques, verifiedTechniqueCount } from '@/content/reference/techniques';
import { officialTutorial, officialChapters } from '@/content/reference/official-order';
import { KNOB_FX_TOTAL } from '@/content/reference/fx';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '查詢區 — Akai 取樣機速查',
  description:
    '規格總表、延伸技巧、快捷鍵、旋鈕矩陣、效果字典、名詞對照、疑難排解、韌體與尚未驗證清單。做到一半卡住就翻這裡。',
});

const PAGES = [
  {
    href: '/reference/specs',
    tag: 'SPECS',
    title: '規格總表',
    note: '複音數、可匯入格式、位元與取樣率、每個專案放得下多少東西。逐行對照官方手冊。',
    count: () => `${specGroups.reduce((n, g) => n + g.rows.length, 0)} 項規格`,
  },
  {
    href: '/reference/official-order',
    tag: 'OFFICIAL ORDER',
    title: '官方順序對照',
    note: '官方手冊的章節順序，每一項連到本站對應的課。想照官方路線走就看這頁。',
    count: () =>
      `${
        officialTutorial.entries.length +
        officialChapters.reduce((n, s) => n + s.entries.length, 0)
      } 個官方章節`,
  },
  {
    href: '/reference/techniques',
    tag: 'TECHNIQUES',
    title: '延伸技巧',
    note: '已經會操作之後，讓你快很多的組合技。官方依據與社群做法分開標。',
    count: () => `${allTechniques.length} 招 · ${verifiedTechniqueCount} 招有官方依據`,
  },
  {
    href: '/reference/shortcuts',
    tag: 'SHORTCUTS',
    title: '快捷鍵總表',
    note: '面板上的紅字就是第二功能，包含沒印出來的那幾組。',
    count: () => `${shortcuts.length} 組`,
  },
  {
    href: '/reference/knobs',
    tag: 'KNOBS',
    title: '旋鈕矩陣',
    note: '同樣三顆旋鈕，換一個畫面就換一組功能。選畫面，機器同步變。',
    count: () => `${knobRows.length} 個畫面`,
  },
  {
    href: '/reference/fx',
    tag: 'FX',
    title: '效果字典',
    note: 'Pad FX 套整段序列，能指定單一 pad 的是 Knob FX。最常搞錯的一件事。',
    count: () => `Pad FX 16 種 · Knob FX ${KNOB_FX_TOTAL} 種`,
  },
  {
    href: '/reference/glossary',
    tag: 'GLOSSARY',
    title: '名詞對照',
    note: '英文、中文、拿來做什麼。只給翻譯沒有用。',
    count: () => `${glossary.length} 個名詞`,
  },
  {
    href: '/reference/troubleshoot',
    tag: 'TROUBLESHOOT',
    title: '疑難排解',
    note: '現象、原因、解法三欄對照。只收有依據的項目。',
    count: () => `${troubles.length} 個症狀`,
  },
  {
    href: '/reference/firmware',
    tag: 'FIRMWARE',
    title: '韌體與尚未驗證清單',
    note: '我們還不確定的事情全部列在這裡。你有權知道哪些是猜的。',
    count: () => `${openQuestions.length} 項待驗證`,
  },
];

export default function ReferenceIndexPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · 九張速查表</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          查詢區
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
          這裡不教東西，只回答「那個到底怎麼按」。做到一半卡住，翻一眼就回去繼續。
        </p>
      </header>

      <SiteSearch />

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {PAGES.map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="card h-full p-4">
              <span className="label-mono text-akai">{p.tag}</span>
              <span className="mt-1 block text-lg text-white">{p.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-[#8D9299]">{p.note}</span>
              <span className="label-mono mt-3 inline-block rounded-full bg-[#2A2F35] px-[9px] py-[3px] text-[#B7BDC4]">
                {p.count()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
