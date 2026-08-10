/** 全站導覽定義。桌機的頂列與行動裝置的底列共用同一份，不會兩邊不一致。 */

export type NavIconId = 'home' | 'learn' | 'genre' | 'reference' | 'samples';

export interface NavItem {
  href: string;
  /** 桌機頂列用 */
  label: string;
  /** 行動裝置底列用，最多三個字 */
  short: string;
  icon: NavIconId;
}

export const NAV: NavItem[] = [
  { href: '/', label: '首頁', short: '首頁', icon: 'home' },
  { href: '/learn', label: '課程地圖', short: '課程', icon: 'learn' },
  { href: '/genre', label: '曲風工廠', short: '曲風', icon: 'genre' },
  { href: '/reference', label: '查詢區', short: '查詢', icon: 'reference' },
  { href: '/samples', label: '素材庫', short: '素材', icon: 'samples' },
];

/** 這條路徑是否落在某個導覽項目底下 */
export function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * 返回鍵的備援目的地。
 *
 * 裝成 App 之後，使用者可能從桌面捷徑直接開在課程頁，
 * 這時瀏覽歷史是空的，`router.back()` 按了不會有任何事。
 * 所以每一頁都要有一個「往上一層」的明確答案。
 */
export function parentOf(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return '/';

  const seg = path.split('/').filter(Boolean);
  // /learn/s1/make-your-first-beat → /learn
  if (seg[0] === 'learn') return seg.length > 1 ? '/learn' : '/';
  if (seg[0] === 'genre') return seg.length > 1 ? '/genre' : '/';
  if (seg[0] === 'reference') return seg.length > 1 ? '/reference' : '/';
  return '/';
}

/** 給返回鍵顯示用的目的地名稱 */
export function parentLabel(pathname: string): string {
  const parent = parentOf(pathname);
  const item = NAV.find((n) => n.href === parent);
  return item ? item.label : '首頁';
}
