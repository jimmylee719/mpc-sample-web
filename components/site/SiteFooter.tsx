import Link from 'next/link';
import { WaveRule } from './Deco';

const LINKS = [
  { href: '/learn', label: '課程地圖' },
  { href: '/genre', label: '曲風工廠' },
  { href: '/reference', label: '查詢區' },
  { href: '/samples', label: '素材庫' },
  { href: '/reference/firmware', label: '尚未驗證清單' },
  { href: '/about', label: '關於本站' },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#2C3036]">
      <div className="mx-auto max-w-[1240px] px-[14px] py-8">
        <div className="text-[#2C3036]">
          <WaveRule seed={31} bars={120} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label-mono text-[#8D9299] transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <p className="mt-5 max-w-[62ch] text-[13px] leading-relaxed text-[#6B7178]">
          事實依據為 Akai 官方使用手冊 v1.3.0 (RevA)。尚未實測的項目一律標示「尚未驗證」，
          不寫成肯定語氣。本站不提供法律意見，也不提供他人音樂素材。
        </p>
      </div>
    </footer>
  );
}
