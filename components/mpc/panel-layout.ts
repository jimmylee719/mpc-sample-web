/**
 * 面板座標定義 —— 全站唯一的一份。
 *
 * 座標直接移植自 reference/prototype-v2.html（可運作原型，視覺真相來源），
 * 不是重畫的。MpcPanel.tsx 只負責把這裡的資料畫出來，本身不得出現任何座標。
 *
 * 色票對應 styles/globals.css 的設計 token。SVG 屬性用字面 hex，
 * 因為 presentation attribute 吃 CSS 變數的瀏覽器支援度不一致，
 * 而面板必須在任何環境下都長得一樣。
 */

import type { ControlId, PadId } from '@/types/lesson';
import { PAD_NUMBERS, PAD_SHIFT_LABELS } from '@/types/lesson';

export const COL = {
  body: '#E7E5E0',
  bodyEdge: '#C9C6BF',
  dark: '#1B1D20',
  darkEdge: '#34383D',
  pad: '#3D4854',
  padEdge: '#5A6774',
  blue: '#7FC7E0',
  orange: '#EFA043',
  red: '#E2483F',
  green: '#4FAF5A',
  white: '#F6F5F2',
  shift: '#4C5157',
  ink: '#22252A',
  silk: '#8A8780',
  screenBg: '#0C130F',
  wave: '#E8C93A',
  akai: '#D6342C',
  live: '#22C55E',
} as const;

const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
const SANS = 'system-ui, sans-serif';

/* ============================================================
   繪圖原語
   ============================================================ */

export type Shape =
  | { s: 'rect'; x: number; y: number; w: number; h: number; rx?: number; fill?: string; stroke?: string; sw?: number; opacity?: number; cls?: string }
  | { s: 'circle'; cx: number; cy: number; r: number; fill?: string; stroke?: string; sw?: number; cls?: string }
  | { s: 'line'; x1: number; y1: number; x2: number; y2: number; stroke: string; sw: number; cap?: 'round' | 'butt'; cls?: string }
  | { s: 'path'; d: string; fill?: string; stroke?: string; sw?: number; cls?: string }
  | { s: 'text'; x: number; y: number; t: string; anchor?: 'start' | 'middle' | 'end'; fill?: string; family?: string; size?: number; weight?: string; ls?: string; style?: string; cls?: string };

/** 一個控制項：外層 <g class="ctl">，內含一個 .halo 與若干 .cap／裝飾 */
export interface ControlSpec {
  id: ControlId;
  halo: Shape;
  parts: Shape[];
}

export interface PanelLayout {
  viewBox: string;
  /** 機殼、絲印等不會被高亮的裝飾 */
  chrome: Shape[];
  controls: ControlSpec[];
}

const HALO_STROKE = COL.live;
const HALO_SW = 3;

/* ============================================================
   建構器 —— 與原型的 btn() / knob() 逐行對應
   ============================================================ */

interface BtnOptions {
  id: ControlId;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  fill: string;
  text: string;
  /** SHIFT 第二功能絲印，印在按鍵下方 */
  sub?: string;
  /** 絲印落在深色面板上時用較暗的底色 */
  subDark?: boolean;
}

function btn(o: BtnOptions): ControlSpec {
  const parts: Shape[] = [
    { s: 'rect', cls: 'cap', x: o.x, y: o.y, w: o.w, h: o.h, rx: 4, fill: o.fill, stroke: 'rgba(0,0,0,.28)', sw: 1 },
    {
      s: 'text', cls: 'lbl', x: o.x + o.w / 2, y: o.y + o.h / 2 + 3.2, t: o.label,
      anchor: 'middle', fill: o.text, family: MONO, size: 7.6, weight: '700', ls: '.04em',
    },
  ];
  if (o.sub) {
    parts.push({
      s: 'text', cls: o.subDark ? 'sfx-dark' : 'sfx', x: o.x + o.w / 2, y: o.y + o.h + 8.5,
      t: o.sub, anchor: 'middle',
    });
  }
  return {
    id: o.id,
    halo: { s: 'rect', cls: 'halo', x: o.x - 5, y: o.y - 5, w: o.w + 10, h: o.h + 10, rx: 8, fill: 'none', stroke: HALO_STROKE, sw: HALO_SW },
    parts,
  };
}

interface KnobOptions {
  id: ControlId;
  cx: number;
  cy: number;
  r: number;
  label?: string;
  face: string;
  ring: string;
  labelFill?: string;
}

function knob(o: KnobOptions): ControlSpec {
  const parts: Shape[] = [
    { s: 'circle', cls: 'cap', cx: o.cx, cy: o.cy, r: o.r, fill: o.face, stroke: o.ring, sw: 2 },
    { s: 'circle', cx: o.cx, cy: o.cy, r: o.r * 0.62, fill: 'none', stroke: 'rgba(0,0,0,.18)', sw: 1 },
    { s: 'line', x1: o.cx, y1: o.cy - o.r + 3, x2: o.cx, y2: o.cy - o.r * 0.55, stroke: 'rgba(0,0,0,.55)', sw: 2.2, cap: 'round' },
  ];
  if (o.label) {
    parts.push({
      s: 'text', x: o.cx, y: o.cy + o.r + 11, t: o.label, anchor: 'middle',
      fill: o.labelFill ?? COL.silk, family: MONO, size: 7.5, ls: '.1em',
    });
  }
  return {
    id: o.id,
    halo: { s: 'circle', cls: 'halo', cx: o.cx, cy: o.cy, r: o.r + 7, fill: 'none', stroke: HALO_STROKE, sw: HALO_SW },
    parts,
  };
}

/* ============================================================
   機器小螢幕的幾何 —— MpcScreen 專用
   ============================================================ */

export const SCREEN = {
  bezel: { x: 246, y: 92, w: 208, h: 142, rx: 5, fill: '#0A0C0D' },
  face: { x: 250, y: 96, w: 200, h: 134, rx: 3, fill: COL.screenBg },
  /** 上排三標籤，對應 B1／B2／B3 */
  tab: { x0: 258, dx: 66, y: 102, w: 60, h: 15, rx: 2, textY: 113, size: 8.4, fill: '#7FE08A', activeBg: 'rgba(127,224,138,.16)' },
  title: { x: 258, y: 132, size: 8.6, fill: '#EDE7C8' },
  wave: { x0: 258, step: 2.1, barW: 1.3, count: 92, rows: 2, cy0: 155, rowGap: 33, minH: 2, varH: 15, fill: COL.wave, barOpacity: 0.9, dimOpacity: 0.12 },
  /** 下排三標籤，對應 K1／K2／K3 */
  bot: { x0: 258, dx: 66, y: 222, size: 8, fill: '#9AD6A4' },
} as const;

/* ============================================================
   上面板
   ============================================================ */

function frontChrome(): Shape[] {
  const chrome: Shape[] = [
    // 機殼
    { s: 'rect', x: 14, y: 12, w: 672, h: 776, rx: 16, fill: COL.bodyEdge },
    { s: 'rect', x: 20, y: 18, w: 660, h: 752, rx: 13, fill: COL.body },
    // 上方深色面板
    { s: 'rect', x: 30, y: 26, w: 640, h: 270, rx: 9, fill: COL.dark },
    { s: 'rect', x: 34, y: 30, w: 632, h: 262, rx: 7, fill: 'none', stroke: COL.darkEdge },
    // 品牌絲印
    { s: 'text', x: 60, y: 68, t: 'AKAI', fill: COL.akai, family: SANS, size: 23, weight: '800', ls: '-.01em' },
    { s: 'text', x: 61, y: 80, t: 'professional', fill: COL.akai, family: SANS, size: 9, style: 'italic' },
    { s: 'text', x: 648, y: 66, t: 'MPC SAMPLE', anchor: 'end', fill: COL.akai, family: SANS, size: 17, weight: '800', ls: '.02em' },
    // MAIN VOLUME 旁的 A 標與電源指示
    { s: 'text', x: 166, y: 164, t: 'A', fill: '#E8E4DC', family: SANS, size: 15, weight: '700' },
    { s: 'rect', x: 146, y: 196, w: 15, h: 7, rx: 3, fill: '#4FE07A' },
    // 分組絲印
    { s: 'text', x: 105, y: 318, t: 'M O D E', anchor: 'middle', fill: COL.silk, family: MONO, size: 7, ls: '.2em' },
    { s: 'text', x: 605, y: 318, t: 'P A D   P L A Y', anchor: 'middle', fill: COL.silk, family: MONO, size: 7, ls: '.16em' },
  ];

  // 音量表：兩欄各六格，上兩格紅、中兩格橘、下兩格綠
  for (let c = 0; c < 2; c++) {
    for (let r = 0; r < 6; r++) {
      const fill = r < 2 ? COL.red : r < 4 ? COL.orange : COL.green;
      chrome.push({ s: 'rect', x: 468 + c * 13, y: 104 + r * 22, w: 8, h: 15, rx: 1.5, fill, opacity: r < 2 ? 0.45 : 0.9 });
    }
  }

  // 內建喇叭：9 × 9 網點
  chrome.push({ s: 'rect', x: 506, y: 96, w: 132, h: 134, rx: 7, fill: '#2A2E33' });
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      chrome.push({ s: 'circle', cx: 518 + c * 14, cy: 108 + r * 14, r: 2.6, fill: '#15171A' });
    }
  }

  return chrome;
}

/** 打擊墊格線：4 × 4，PAD 1 在左下角 */
const PAD_GEO = { w: 79, h: 60, gapX: 8, gapY: 10, x0: 194, y0: 452 } as const;

export function padPosition(n: number): { x: number; y: number; w: number; h: number } {
  const col = (n - 1) % 4;
  const row = 3 - Math.floor((n - 1) / 4);
  return {
    x: PAD_GEO.x0 + col * (PAD_GEO.w + PAD_GEO.gapX),
    y: PAD_GEO.y0 + row * (PAD_GEO.h + PAD_GEO.gapY),
    w: PAD_GEO.w,
    h: PAD_GEO.h,
  };
}

function pads(): ControlSpec[] {
  return PAD_NUMBERS.map((n) => {
    const { x, y, w, h } = padPosition(n);
    const id = `p${n}` as PadId;
    return {
      id,
      halo: { s: 'rect', cls: 'halo', x: x - 5, y: y - 5, w: w + 10, h: h + 10, rx: 9, fill: 'none', stroke: HALO_STROKE, sw: HALO_SW },
      parts: [
        { s: 'rect', cls: 'cap', x, y, w, h, rx: 6, fill: COL.pad, stroke: COL.padEdge, sw: 1.4 },
        { s: 'rect', x: x + 5, y: y + 4, w: w - 10, h: h * 0.4, rx: 4, fill: 'rgba(255,255,255,.05)' },
        { s: 'text', cls: 'sfx', x, y: y - 4, t: String(n), fill: '#57544D', weight: '700' },
        { s: 'text', cls: 'sfx', x: x + w, y: y - 4, t: PAD_SHIFT_LABELS[id], anchor: 'end' },
      ],
    };
  });
}

function fader(): ControlSpec {
  return {
    id: 'fader',
    halo: { s: 'rect', cls: 'halo', x: 57, y: 493, w: 44, h: 166, rx: 12, fill: 'none', stroke: HALO_STROKE, sw: HALO_SW },
    parts: [
      { s: 'rect', cls: 'cap', x: 64, y: 500, w: 30, h: 152, rx: 6, fill: '#D5D2CC', stroke: '#B7B3AB', sw: 1 },
      { s: 'rect', x: 77, y: 508, w: 4, h: 136, rx: 2, fill: '#8E8A83' },
      { s: 'rect', x: 66, y: 558, w: 26, h: 26, rx: 4, fill: '#F3F1EC', stroke: '#A9A59D' },
      { s: 'rect', x: 107, y: 566, w: 8, h: 11, rx: 2, fill: '#E040A0' },
    ],
  };
}

function mic(): ControlSpec {
  return {
    id: 'mic',
    halo: { s: 'circle', cls: 'halo', cx: 650, cy: 486, r: 14, fill: 'none', stroke: HALO_STROKE, sw: HALO_SW },
    parts: [
      { s: 'rect', cls: 'cap', x: 645, y: 478, w: 10, h: 15, rx: 5, fill: '#3A3E44', stroke: '#3A3E44' },
      { s: 'path', d: 'M641 490a9 9 0 0 0 18 0', fill: 'none', stroke: '#3A3E44', sw: 2 },
      { s: 'line', x1: 650, y1: 499, x2: 650, y2: 505, stroke: '#3A3E44', sw: 2 },
    ],
  };
}

export const FRONT_PANEL: PanelLayout = {
  viewBox: '0 0 700 800',
  chrome: frontChrome(),
  controls: [
    // 螢幕上方三鍵
    btn({ id: 'b1', x: 262, y: 44, w: 44, h: 17, label: 'B1', fill: '#2A2E33', text: '#E8E4DC' }),
    btn({ id: 'b2', x: 322, y: 44, w: 44, h: 17, label: 'B2', fill: '#2A2E33', text: '#E8E4DC' }),
    btn({ id: 'b3', x: 382, y: 44, w: 44, h: 17, label: 'B3', fill: '#2A2E33', text: '#E8E4DC' }),
    knob({ id: 'vol', cx: 108, cy: 158, r: 33, label: 'MAIN VOLUME', face: '#D9D6D0', ring: '#F0EEE9', labelFill: '#9AA0A6' }),

    // MODE 群組
    btn({ id: 'sample', x: 46, y: 326, w: 60, h: 25, label: 'SAMPLE', fill: COL.blue, text: COL.ink, sub: 'INPUT CONFIG' }),
    btn({ id: 'seq', x: 112, y: 326, w: 60, h: 25, label: 'SEQ', fill: COL.blue, text: COL.ink, sub: 'STEP EDIT' }),
    btn({ id: 'padfx', x: 46, y: 372, w: 60, h: 25, label: 'PAD FX', fill: COL.orange, text: COL.ink, sub: 'FLEX BEAT' }),
    btn({ id: 'knobfx', x: 112, y: 372, w: 60, h: 25, label: 'KNOB FX', fill: COL.orange, text: COL.ink, sub: 'FX SELECT' }),

    // 中央三顆旋鈕（270° 絕對位置）
    knob({ id: 'k1', cx: 252, cy: 368, r: 32, label: 'K1', face: '#DEDBD5', ring: '#F2F0EC', labelFill: '#7A776F' }),
    knob({ id: 'k2', cx: 362, cy: 368, r: 32, label: 'K2', face: '#DEDBD5', ring: '#F2F0EC', labelFill: '#7A776F' }),
    knob({ id: 'k3', cx: 472, cy: 368, r: 32, label: 'K3', face: '#DEDBD5', ring: '#F2F0EC', labelFill: '#7A776F' }),

    // PAD PLAY 群組
    btn({ id: 'chop', x: 545, y: 326, w: 58, h: 25, label: 'CHOP', fill: COL.blue, text: COL.ink, sub: 'NOTE ON' }),
    btn({ id: 'mute', x: 609, y: 326, w: 58, h: 25, label: 'MUTE', fill: COL.blue, text: COL.ink, sub: 'UNMUTE ALL' }),
    btn({ id: 'loop', x: 545, y: 372, w: 58, h: 25, label: 'LOOP', fill: COL.blue, text: COL.ink, sub: 'REVERSE' }),
    btn({ id: 'lev16', x: 609, y: 372, w: 58, h: 25, label: '16 LEVELS', fill: COL.blue, text: COL.ink, sub: 'TYPE' }),

    // SHIFT 與 PAD BANK
    btn({ id: 'shift', x: 46, y: 424, w: 60, h: 29, label: 'SHIFT', fill: COL.shift, text: '#F1EFEA' }),
    btn({ id: 'bank', x: 112, y: 426, w: 60, h: 25, label: 'PAD BANK', fill: COL.white, text: COL.ink }),

    fader(),
    btn({ id: 'erase', x: 46, y: 686, w: 60, h: 25, label: 'ERASE', fill: COL.white, text: COL.ink, sub: 'COPY' }),
    btn({ id: 'nrep', x: 112, y: 686, w: 60, h: 25, label: 'NOTE RPT', fill: COL.white, text: COL.ink, sub: 'TRIPLET' }),

    // 右欄
    btn({ id: 'ssel', x: 545, y: 424, w: 58, h: 25, label: 'SAMPLE SEL', fill: COL.white, text: COL.ink, sub: 'SAVE SAMPLE' }),
    btn({ id: 'tap', x: 609, y: 424, w: 58, h: 25, label: 'TAP TEMPO', fill: COL.white, text: COL.ink, sub: 'METRO' }),
    knob({ id: 'enc', cx: 578, cy: 516, r: 37, face: '#F4F2ED', ring: '#FFFFFF' }),
    mic(),
    btn({ id: 'minus', x: 545, y: 574, w: 58, h: 23, label: '—', fill: COL.white, text: COL.ink, sub: 'UNDO' }),
    btn({ id: 'plus', x: 609, y: 574, w: 58, h: 23, label: '+', fill: COL.white, text: COL.ink, sub: 'REDO' }),
    btn({ id: 'srec', x: 545, y: 618, w: 58, h: 27, label: 'SAMPLE REC', fill: COL.red, text: '#fff', sub: 'RECALL' }),
    btn({ id: 'qrec', x: 609, y: 618, w: 58, h: 27, label: 'SEQ REC', fill: COL.red, text: '#fff', sub: 'RECALL' }),
    btn({ id: 'stop', x: 545, y: 662, w: 58, h: 27, label: '■', fill: COL.white, text: COL.ink }),
    btn({ id: 'play', x: 609, y: 662, w: 58, h: 27, label: '▶', fill: COL.green, text: '#fff', sub: 'CONTINUE' }),

    ...pads(),
  ],
};

/* ============================================================
   背板
   ============================================================ */

const REAR_JACKS: ReadonlyArray<readonly [ControlId, string, number]> = [
  ['r_phones', 'PHONES', 72],
  ['r_sync', 'SYNC OUT', 128],
  ['r_midiout', 'MIDI OUT', 184],
  ['r_midiin', 'MIDI IN', 238],
  ['r_out2', 'AUDIO OUT 2/R', 300],
  ['r_out1', 'AUDIO OUT 1/L', 360],
  ['r_in2', 'AUDIO IN 2/R', 420],
  ['r_in1', 'AUDIO IN 1/L', 480],
];

const REAR_LABEL_Y = 342;
const REAR_JACK_CY = 378;

function rearLabel(x: number, t: string): Shape {
  return { s: 'text', x, y: REAR_LABEL_Y, t, anchor: 'middle', fill: COL.akai, family: MONO, size: 6.6, weight: '700' };
}

function jack(id: ControlId, label: string, cx: number): ControlSpec {
  const r = label.startsWith('AUDIO') ? 17 : 11;
  return {
    id,
    halo: { s: 'circle', cls: 'halo', cx, cy: REAR_JACK_CY, r: r + 11, fill: 'none', stroke: HALO_STROKE, sw: HALO_SW },
    parts: [
      { s: 'circle', cls: 'cap', cx, cy: REAR_JACK_CY, r, fill: '#2A2E33', stroke: '#8E8A83', sw: 2 },
      { s: 'circle', cx, cy: REAR_JACK_CY, r: r * 0.45, fill: '#0D0F11' },
    ],
  };
}

export const REAR_PANEL: PanelLayout = {
  viewBox: '0 0 700 560',
  chrome: [
    { s: 'rect', x: 14, y: 250, w: 672, h: 230, rx: 14, fill: COL.bodyEdge },
    { s: 'rect', x: 20, y: 256, w: 660, h: 212, rx: 11, fill: COL.body },
    { s: 'rect', x: 34, y: 268, w: 632, h: 44, rx: 6, fill: COL.dark },
    { s: 'text', x: 56, y: 297, t: 'AKAI professional', fill: COL.akai, family: SANS, size: 15, weight: '800' },
    { s: 'text', x: 644, y: 297, t: 'MPC SAMPLE', anchor: 'end', fill: COL.akai, family: SANS, size: 14, weight: '800' },
    ...REAR_JACKS.map(([, label, x]) => rearLabel(x, label)),
    rearLabel(548, 'REC GAIN'),
    rearLabel(602, 'USB'),
    rearLabel(646, 'POWER'),
  ],
  controls: [
    ...REAR_JACKS.map(([id, label, x]) => jack(id, label, x)),
    knob({ id: 'r_gain', cx: 548, cy: REAR_JACK_CY, r: 20, face: '#D9D6D0', ring: '#F0EEE9' }),
    {
      id: 'r_usb',
      halo: { s: 'rect', cls: 'halo', x: 583, y: 361, w: 38, h: 34, rx: 10, fill: 'none', stroke: HALO_STROKE, sw: HALO_SW },
      parts: [{ s: 'rect', cls: 'cap', x: 590, y: 370, w: 24, h: 14, rx: 7, fill: '#2A2E33', stroke: '#8E8A83', sw: 2 }],
    },
    knob({ id: 'r_power', cx: 646, cy: REAR_JACK_CY, r: 15, face: COL.body, ring: '#B7B3AB' }),
  ],
};

/** targets 含 r_ 前綴時自動切背板 */
export function needsRearView(targets: readonly ControlId[]): boolean {
  return targets.some((t) => t.startsWith('r_'));
}
