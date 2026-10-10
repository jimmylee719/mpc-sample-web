import type { Shape } from './panel-layout';
import { n2 } from '@/components/svg-num';

/**
 * 把一個 Shape 畫成 SVG 元素。
 *
 * 抽出來是為了讓 KeyCap 也能用同一套繪製邏輯 ——
 * 課文裡的小按鍵圖示跟大面板必須長得一模一樣，
 * 兩邊各寫一份遲早會走鐘。
 */
export function renderShape(s: Shape, key: string) {
  switch (s.s) {
    case 'rect':
      return (
        <rect
          key={key}
          className={s.cls}
          x={n2(s.x)}
          y={n2(s.y)}
          width={n2(s.w)}
          height={n2(s.h)}
          rx={n2(s.rx)}
          fill={s.fill}
          stroke={s.stroke}
          strokeWidth={n2(s.sw)}
          opacity={n2(s.opacity)}
        />
      );
    case 'circle':
      return (
        <circle
          key={key}
          className={s.cls}
          cx={n2(s.cx)}
          cy={n2(s.cy)}
          r={n2(s.r)}
          fill={s.fill}
          stroke={s.stroke}
          strokeWidth={n2(s.sw)}
        />
      );
    case 'line':
      return (
        <line
          key={key}
          className={s.cls}
          x1={n2(s.x1)}
          y1={n2(s.y1)}
          x2={n2(s.x2)}
          y2={n2(s.y2)}
          stroke={s.stroke}
          strokeWidth={n2(s.sw)}
          strokeLinecap={s.cap}
        />
      );
    case 'path':
      return (
        <path key={key} className={s.cls} d={s.d} fill={s.fill} stroke={s.stroke} strokeWidth={n2(s.sw)} />
      );
    case 'text':
      return (
        <text
          key={key}
          className={s.cls}
          x={n2(s.x)}
          y={n2(s.y)}
          textAnchor={s.anchor}
          fill={s.fill}
          fontFamily={s.family}
          fontSize={n2(s.size)}
          fontWeight={s.weight}
          fontStyle={s.style}
          letterSpacing={s.ls}
        >
          {s.t}
        </text>
      );
  }
}
