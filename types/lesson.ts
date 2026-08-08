/**
 * 全站核心資料契約。對應 docs/PROJECT-PLAN.md §6 與 CLAUDE.md §4。
 *
 * 這裡把控制項清單寫成 `as const` 陣列再推導出型別，而不是直接手寫聯集。
 * 型別結果與規格書完全相同，但多一個好處：驗證腳本在執行期也拿得到同一份清單，
 * 不會發生「型別改了、驗證器沒改」的漂移。
 */

/** 上面板：非打擊墊的控制項 */
export const TOP_CONTROL_IDS = [
  'vol', 'b1', 'b2', 'b3', 'k1', 'k2', 'k3', 'enc', 'mic',
  'minus', 'plus', 'shift', 'bank', 'ssel', 'tap',
  'sample', 'seq', 'padfx', 'knobfx',
  'chop', 'loop', 'mute', 'lev16',
  'srec', 'qrec', 'play', 'stop', 'erase', 'nrep', 'fader',
] as const;

/** 打擊墊編號 1–16 */
export const PAD_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
] as const;

export type PadNumber = (typeof PAD_NUMBERS)[number];
export type PadId = `p${PadNumber}`;

export const PAD_IDS = PAD_NUMBERS.map((n) => `p${n}` as PadId);

/** 背板 I/O。以 `r_` 開頭者會讓面板自動切換到背板視圖 */
export const REAR_CONTROL_IDS = [
  'r_phones', 'r_sync', 'r_midiout', 'r_midiin',
  'r_out2', 'r_out1', 'r_in2', 'r_in1',
  'r_gain', 'r_usb', 'r_power',
] as const;

export type TopControlId = (typeof TOP_CONTROL_IDS)[number];
export type RearControlId = (typeof REAR_CONTROL_IDS)[number];

/** `pads` 是虛擬 ID，代表 16 顆打擊墊全部高亮，僅供 targets 使用 */
export type ControlId = TopControlId | PadId | 'pads' | RearControlId;

/** 執行期用的完整合法 ID 清單（驗證腳本使用） */
export const CONTROL_IDS: readonly ControlId[] = [
  ...TOP_CONTROL_IDS,
  ...PAD_IDS,
  'pads',
  ...REAR_CONTROL_IDS,
];

/** 打擊墊上方絲印的 SHIFT 第二功能（PROJECT-PLAN §15.2） */
export const PAD_SHIFT_LABELS: Readonly<Record<PadId, string>> = {
  p1: 'FULL LEVEL', p2: 'HALF SEQ', p3: 'DOUBLE SEQ', p4: 'COUNT-IN',
  p5: 'COMPRESSOR', p6: 'HALF SPEED', p7: 'DOUBLE SPEED', p8: 'MIDI CONFIG',
  p9: 'FADER', p10: 'REC QUANTIZE', p11: 'RESAMPLE', p12: 'SONG',
  p13: 'TRIM SAMPLE', p14: 'TIME CORRECT', p15: 'WARP', p16: 'PROJECT',
};

/** 螢幕上排三標籤預設值（對應 B1/B2/B3） */
export const DEFAULT_TABS: readonly [string, string, string] = ['Trim', 'Tune', 'Filter'];
/** 螢幕下排三標籤預設值（對應 K1/K2/K3） */
export const DEFAULT_BOTS: readonly [string, string, string] = ['Start', 'End', 'Loop'];

export interface ScreenState {
  /** 主標題行 */
  t1?: string;
  /** 上排三標籤，對應 B1/B2/B3。省略時用 DEFAULT_TABS */
  tabs?: [string, string, string];
  /** 下排三標籤，對應 K1/K2/K3。省略時用 DEFAULT_BOTS */
  bots?: [string, string, string];
  /** 波形種子。同一個值必須每次渲染結果相同；0 或省略 = 波形以 12% 透明度顯示 */
  wave?: number;
}

export type NoteKind = 'tip' | 'warn' | 'win';

export interface StepNote {
  kind: NoteKind;
  title: string;
  body: string;
}

export interface Step {
  /** 章節索引，必須落在該課 chapters 陣列範圍內 */
  ch: number;
  /** 教學句。可含 <b>，至少要有一個 <b> 標記實際按鍵名稱 */
  say: string;
  /** 驅動面板高亮。含 r_ 開頭會自動切換背板視圖 */
  targets: ControlId[];
  /** 是否按住 SHIFT。true 時全面板紅色第二功能字一起亮 */
  shift?: boolean;
  screen: ScreenState;
  /** 必填。無聲寫 '—' */
  hear: string;
  /** R2 音檔路徑，可選 */
  audio?: string;
  note?: StepNote;
}

export type SeasonNumber = 1 | 2 | 3 | 4 | 5;

export interface Lesson {
  /** 例：'s1-01' */
  id: string;
  season: SeasonNumber;
  index: number;
  title: string;
  /** 必填。名詞句：做完你手上有什麼 */
  outcome: string;
  minutes: number;
  chapters: string[];
  /** 必填。true 時前台顯示需要電腦的警示標籤 */
  needsComputer: boolean;
  /** 必填。例：'1.3.0' */
  firmwareVerified: string;
  /** 必填。ISO 日期，例：'2026-08-08' */
  verifiedDate: string;
  /** 前置課程的 lesson id，必須指向存在的課 */
  prerequisites: string[];
  steps: Step[];
  /** 必填。讀者的自我驗證清單 */
  checkpoints: string[];
  /** 官方來源標記 */
  sources: string[];
}
