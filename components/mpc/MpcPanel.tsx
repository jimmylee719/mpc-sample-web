import type { ControlId, PadId, ScreenState } from '@/types/lesson';
import { PAD_NUMBERS } from '@/types/lesson';
import type { PanelLayout, Shape } from './panel-layout';
import { FRONT_PANEL, REAR_PANEL, needsRearView } from './panel-layout';
import { MpcScreen } from './MpcScreen';

/**
 * ★核心元件。面板全部由 panel-layout.ts 的資料畫出來，
 * 這個檔案本身沒有任何座標 —— 改面板只改 layout，不改這裡。
 *
 * 所有狀態靠 CSS class 切換，不用 JS 動畫。
 */
export interface MpcPanelProps {
  /** 要高亮的控制項。含 r_ 前綴時自動切換到背板 */
  targets?: ControlId[];
  /** 按住 SHIFT：SHIFT 鍵轉紅，全面板紅色第二功能字同步亮起 */
  shift?: boolean;
  screen?: ScreenState;
  view?: 'auto' | 'front' | 'rear';
}

export function MpcPanel({ targets = [], shift = false, screen, view = 'auto' }: MpcPanelProps) {
  const isRear = view === 'rear' || (view === 'auto' && needsRearView(targets));
  const layout: PanelLayout = isRear ? REAR_PANEL : FRONT_PANEL;

  // 'pads' 是虛擬 ID，展開成 16 顆
  const hot = new Set<string>();
  for (const t of targets) {
    if (t === 'pads') {
      for (const n of PAD_NUMBERS) hot.add(`p${n}` as PadId);
    } else {
      hot.add(t);
    }
  }

  return (
    <svg
      viewBox={layout.viewBox}
      className={`block h-auto w-full${shift ? ' shift-on' : ''}`}
      role="img"
      aria-label={isRear ? '取樣機背板' : '取樣機上面板'}
    >
      {layout.chrome.map((s, i) => renderShape(s, `chrome-${i}`))}

      {!isRear && <MpcScreen screen={screen} />}

      {layout.controls.map((c) => {
        const classes = ['ctl'];
        if (hot.has(c.id)) classes.push('hot');
        if (shift && c.id === 'shift') classes.push('held');
        return (
          <g key={c.id} id={`c-${c.id}`} className={classes.join(' ')}>
            {renderShape(c.halo, `${c.id}-halo`)}
            {c.parts.map((p, i) => renderShape(p, `${c.id}-${i}`))}
          </g>
        );
      })}
    </svg>
  );
}

function renderShape(s: Shape, key: string) {
  switch (s.s) {
    case 'rect':
      return (
        <rect
          key={key}
          className={s.cls}
          x={s.x}
          y={s.y}
          width={s.w}
          height={s.h}
          rx={s.rx}
          fill={s.fill}
          stroke={s.stroke}
          strokeWidth={s.sw}
          opacity={s.opacity}
        />
      );
    case 'circle':
      return (
        <circle
          key={key}
          className={s.cls}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill={s.fill}
          stroke={s.stroke}
          strokeWidth={s.sw}
        />
      );
    case 'line':
      return (
        <line
          key={key}
          className={s.cls}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke={s.stroke}
          strokeWidth={s.sw}
          strokeLinecap={s.cap}
        />
      );
    case 'path':
      return (
        <path key={key} className={s.cls} d={s.d} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} />
      );
    case 'text':
      return (
        <text
          key={key}
          className={s.cls}
          x={s.x}
          y={s.y}
          textAnchor={s.anchor}
          fill={s.fill}
          fontFamily={s.family}
          fontSize={s.size}
          fontWeight={s.weight}
          fontStyle={s.style}
          letterSpacing={s.ls}
        >
          {s.t}
        </text>
      );
  }
}
