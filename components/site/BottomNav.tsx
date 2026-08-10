'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, isActive } from './nav';
import { NavIcon } from './NavIcon';

/**
 * 行動裝置底列導覽。960px 以上不顯示（桌機用頂列）。
 *
 * 裝成 App 之後，底列是唯一直覺的切換方式 —— 手機使用者的拇指在下面，
 * 不在螢幕頂端。安全區內距是給有 home indicator 的機型用的。
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav split:hidden" aria-label="主導覽">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`bottom-nav-item ${active ? 'is-active' : ''}`}
          >
            <NavIcon id={item.icon} />
            <span className="label-mono">{item.short}</span>
          </Link>
        );
      })}
    </nav>
  );
}
