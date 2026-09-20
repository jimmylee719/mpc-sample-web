import type { ControlId } from '@/types/lesson';
import { keyArtFor } from './key-art';
import { renderShape } from './render-shape';

/**
 * 課文裡的單顆按鍵圖示。
 *
 * 圖直接從面板資料裁下來，所以課文裡看到的 CHOP
 * 跟你手上那台機器的 CHOP 是同一個形狀、同一個顏色。
 *
 * 無障礙與搜尋：SVG 標成 aria-hidden，旁邊放一份只有螢幕閱讀器
 * 與 Pagefind 看得到的文字。不這樣做的話，把文字換成圖等於
 * 讓「搜尋 CHOP」再也找不到這一課。
 */
export function KeyCap({ id, label }: { id: ControlId; label: string }) {
  const art = keyArtFor(id);
  if (!art) return <>{label}</>;

  return (
    <span className="keycap">
      <svg
        viewBox={art.viewBox}
        aria-hidden
        focusable="false"
        {...{ 'data-pagefind-ignore': '' }}
        className={art.round ? 'keycap-svg is-round' : 'keycap-svg'}
        style={{ width: `${(art.ratio * 1.5).toFixed(3)}em` }}
      >
        {art.parts.map((s, i) => renderShape(s, `k${i}`))}
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
