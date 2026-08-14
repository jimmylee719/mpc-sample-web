'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BackButton } from './BackButton';
import { SearchButton } from './SearchButton';
import { NAV, isActive } from './nav';

/**
 * 全站頂列。
 *
 * 高度固定 54px，sticky。底下那條三色線是全站的招牌：
 * 紅（AKAI）→ 橘（FX）→ 綠（PLAY），機器上就是這三個顏色。
 */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 site-header">
      <div className="mx-auto flex h-[54px] max-w-[1240px] items-center gap-2 px-[10px] split:px-4">
        <BackButton />

        <Link
          href="/"
          className="flex min-w-0 items-center gap-[9px] rounded-lg px-1 py-1 transition-opacity hover:opacity-80"
        >
          <span className="rec-dot" aria-hidden />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-bold leading-none tracking-[-0.01em] text-white">
              敲敲取樣
            </span>
            <span className="label-mono mt-[3px] hidden text-[#6B7178] split:block">
              一台就夠 · MPC SAMPLE
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 split:flex">
          <Link
            href="/start"
            className="label-mono rounded-lg px-[11px] py-[9px] text-[#8D9299] transition-colors hover:bg-[#23272D] hover:text-white"
          >
            開始之前
          </Link>
          {NAV.filter((n) => n.href !== '/').map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`label-mono rounded-lg px-[11px] py-[9px] transition-colors ${
                  active ? 'bg-[#2A2F35] text-white' : 'text-[#8D9299] hover:bg-[#23272D] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 搜尋在每一頁都要有。卡住的人不會自己想到要去查詢區。 */}
        <div className="ml-auto flex items-center gap-1 split:ml-1">
          <SearchButton />
        </div>
      </div>
      <div className="site-header-rule" aria-hidden />
    </header>
  );
}
