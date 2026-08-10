import type { NavIconId } from './nav';

/**
 * 導覽圖示。全部手繪路徑，不引入任何圖示套件。
 * 主題是機器本身：pad 矩陣、黑膠、推桿、波形。
 */

const PATHS: Record<NavIconId, React.ReactNode> = {
  // 房子
  home: <path d="M3 9.6 10 4l7 5.6V16a1 1 0 0 1-1 1h-3.4v-4.2H7.4V17H4a1 1 0 0 1-1-1Z" />,
  // 2×2 pad 矩陣，左下那顆亮著
  learn: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.4" />
      <rect x="11" y="3" width="6" height="6" rx="1.4" />
      <rect x="11" y="11" width="6" height="6" rx="1.4" />
      <rect x="3" y="11" width="6" height="6" rx="1.4" className="nav-icon-hot" />
    </>
  ),
  // 黑膠
  genre: (
    <>
      <circle cx="10" cy="10" r="7.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle
        cx="10"
        cy="10"
        r="3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.55"
      />
      <circle cx="10" cy="10" r="1.5" />
    </>
  ),
  // 混音台推桿
  reference: (
    <>
      <rect x="3" y="3" width="2.6" height="14" rx="1.3" />
      <rect x="8.7" y="3" width="2.6" height="14" rx="1.3" />
      <rect x="14.4" y="3" width="2.6" height="14" rx="1.3" />
      <rect x="2" y="12" width="4.6" height="2.4" rx="1.2" className="nav-icon-hot" />
      <rect x="7.7" y="5.4" width="4.6" height="2.4" rx="1.2" className="nav-icon-hot" />
      <rect x="13.4" y="9" width="4.6" height="2.4" rx="1.2" className="nav-icon-hot" />
    </>
  ),
  // 波形
  samples: (
    <>
      <rect x="2" y="8" width="2" height="4" rx="1" />
      <rect x="5.5" y="5" width="2" height="10" rx="1" />
      <rect x="9" y="2.5" width="2" height="15" rx="1" />
      <rect x="12.5" y="6" width="2" height="8" rx="1" />
      <rect x="16" y="8.5" width="2" height="3" rx="1" />
    </>
  ),
};

export function NavIcon({ id, className }: { id: NavIconId; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="20"
      height="20"
      aria-hidden
      focusable="false"
      className={className}
      fill="currentColor"
    >
      {PATHS[id]}
    </svg>
  );
}
