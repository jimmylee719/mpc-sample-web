import type { ControlId } from '@/types/lesson';
import type { Shape } from './panel-layout';
import { FRONT_PANEL, REAR_PANEL, COL } from './panel-layout';

/**
 * 把面板上的單一控制項裁切成一個可以塞進課文裡的小圖示。
 *
 * 為什麼不另外畫一套：課文裡的 <b>CHOP</b> 如果長得跟面板上的 CHOP 不一樣，
 * 那就是在教錯的東西。這裡直接從 panel-layout 的同一份資料裁下來，
 * 顏色、圓角、絲印字體全部繼承，永遠不會跟面板走鐘。
 */

export interface KeyArt {
  viewBox: string;
  parts: Shape[];
  /** 寬 ÷ 高。前台用它換算行內寬度 */
  ratio: number;
  /** 圓形控制項（旋鈕）要用不同的行內對齊 */
  round: boolean;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

function capBox(cap: Shape): Box | null {
  if (cap.s === 'rect') return { x: cap.x, y: cap.y, w: cap.w, h: cap.h };
  if (cap.s === 'circle') {
    return { x: cap.cx - cap.r, y: cap.cy - cap.r, w: cap.r * 2, h: cap.r * 2 };
  }
  return null;
}

/** 這個形狀是否整個落在框裡（用來決定要不要一起畫進小圖示） */
function inside(s: Shape, b: Box): boolean {
  const pad = 1;
  const within = (x: number, y: number) =>
    x >= b.x - pad && x <= b.x + b.w + pad && y >= b.y - pad && y <= b.y + b.h + pad;
  switch (s.s) {
    case 'rect':
      return within(s.x, s.y) && within(s.x + s.w, s.y + s.h);
    case 'circle':
      return within(s.cx - s.r, s.cy - s.r) && within(s.cx + s.r, s.cy + s.r);
    case 'line':
      return within(s.x1, s.y1) && within(s.x2, s.y2);
    case 'text':
      return within(s.x, s.y);
    case 'path':
      return false;
  }
}

const ALL_CONTROLS = [...FRONT_PANEL.controls, ...REAR_PANEL.controls];

/** 打擊墊編號：面板上印在 pad 外面，小圖示要改印在正中間才看得懂 */
function padNumber(id: ControlId): string | null {
  const m = /^p(\d{1,2})$/.exec(id);
  return m ? m[1]! : null;
}

export function keyArtFor(id: ControlId): KeyArt | null {
  const spec = ALL_CONTROLS.find((c) => c.id === id);
  if (!spec) return null;

  const cap = spec.parts.find((p) => p.cls === 'cap');
  if (!cap) return null;
  const box = capBox(cap);
  if (!box) return null;

  // 留一點邊，描邊才不會被切掉
  const pad = 2;
  const vb: Box = { x: box.x - pad, y: box.y - pad, w: box.w + pad * 2, h: box.h + pad * 2 };

  const parts = spec.parts.filter((p) => {
    if (p.cls === 'cap' || p.cls === 'lbl') return true;
    // 絲印（第二功能字、pad 編號）印在控制項外面，小圖示不要
    if (p.cls === 'sfx' || p.cls === 'sfx-dark') return false;
    return inside(p, box);
  });

  const num = padNumber(id);
  if (num) {
    parts.push({
      s: 'text',
      x: box.x + box.w / 2,
      y: box.y + box.h / 2 + 5,
      t: num,
      anchor: 'middle',
      fill: COL.silk,
      family: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
      size: 13,
      weight: '700',
    });
  }

  return {
    viewBox: `${vb.x} ${vb.y} ${vb.w} ${vb.h}`,
    parts,
    ratio: vb.w / vb.h,
    round: cap.s === 'circle',
  };
}
