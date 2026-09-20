import type { ControlId, PadId, ScreenState } from '@/types/lesson';
import { PAD_NUMBERS } from '@/types/lesson';
import type { PanelLayout } from './panel-layout';
import { FRONT_PANEL, REAR_PANEL, needsRearView } from './panel-layout';
import { MpcScreen } from './MpcScreen';
import { renderShape } from './render-shape';

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
