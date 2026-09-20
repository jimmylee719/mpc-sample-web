import type { Metadata } from 'next';
import Link from 'next/link';
import { PadGrid } from '@/components/site/Deco';

/**
 * 找不到頁面。
 *
 * 沒有這個檔案的話，Next 會端出它內建的英文頁（「This page could not be found.」），
 * 整站繁體中文只有這一頁是英文，而且不給任何去處。
 * 走到這裡的人多半是點到舊連結或自己打錯網址，所以重點是**立刻給路**。
 */

export const metadata: Metadata = {
  title: '找不到這一頁',
  description: '這個網址上沒有東西。回課程地圖或用全站搜尋找找看。',
  robots: { index: false, follow: true },
};

const WAYS: Array<{ href: string; label: string; note: string }> = [
  { href: '/learn', label: '課程地圖', note: '36 課，從開機開始' },
  { href: '/genre', label: '曲風工廠', note: '24 張配方卡' },
  { href: '/reference', label: '查詢區', note: '快捷鍵、旋鈕、名詞、疑難排解' },
  { href: '/start', label: '開始之前', note: '機器剛到手先看這個' },
];

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <div className="mx-auto max-w-[46ch] pt-8 text-center">
        <div className="mx-auto w-[120px] opacity-40">
          <PadGrid lit={[]} />
        </div>

        <p className="label-mono mt-8 font-bold text-akai">404</p>
        <h1 className="mt-2 text-[clamp(22px,5vw,30px)] leading-tight text-white">
          這個網址上沒有東西
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#8D9299]">
          可能是連結過期，或是網址打錯了。下面四個地方是整個網站的入口。
        </p>
        <p className="label-mono mt-4 text-muted">
          知道名字的話，按頂列的搜尋，或直接按鍵盤的斜線
        </p>
      </div>

      <ul className="mx-auto mt-8 grid max-w-[620px] gap-3 sm:grid-cols-2">
        {WAYS.map((w) => (
          <li key={w.href}>
            <Link href={w.href} className="card h-full p-4">
              <span className="block text-lg text-white">{w.label}</span>
              <span className="mt-1 block text-sm text-[#8D9299]">{w.note}</span>
            </Link>
          </li>
        ))}
      </ul>

    </main>
  );
}
