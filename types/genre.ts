/**
 * 曲風配方卡資料契約。對應 docs/PROJECT-PLAN.md §4.3。
 *
 * 曲風頁是「邊做邊瞄」的參考，不是線性學習，所以不用步驟播放器，用固定八段式配方卡。
 * 例外：每個曲風可嵌入一個迷你播放器，只處理該曲風最難的單一環節。
 */

import type { PadId, Step, VideoRef } from './lesson';

/** 難度分級（PROJECT-PLAN §4.3） */
export type GenreLevel =
  | 'L1'  // 機上直接完成，0–1 次 resample
  | 'L2'  // 1–2 次 resample
  | 'L3'  // 3 次以上，pad 預算吃緊
  | 'L4'; // 機上難以完整實現，頁首必須明說做不完整

export type PadBank = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

/** ① 這個曲風長什麼樣 */
export interface GenreIntro {
  /** 30 秒說明，白話，不用行話 */
  body: string;
  /** 示範音檔（R2 路徑）。一律自錄或 CC0 */
  audio?: string;
}

/** ② BPM 範圍與節拍網格 */
export interface GenreTempo {
  bpmMin: number;
  bpmMax: number;
  /** 例：'1/16'、'1/16 triplet' */
  grid: string;
  /** Swing 建議或其他節奏備註 */
  note?: string;
}

/** ③ Pad 配置圖（含 Bank 分配） */
export interface PadAssignment {
  bank: PadBank;
  pad: PadId;
  /** 這顆 pad 放什麼，例：'Kick'、'疊層後的旋律循環' */
  role: string;
  /** 素材從哪來，例：'自錄'、'機器內建 kit'、'第 3 次 resample 產物' */
  source: string;
}

/** ④ 鼓組結構拆解 */
export interface DrumLayer {
  /** 例：'Kick'、'Clap'、'Open Hat' */
  name: string;
  /** 落在哪些拍點，例：'每小節第 1、3 拍' */
  timing: string;
  /** 音色特徵描述 */
  character: string;
  tip?: string;
}

/** ⑤ 取樣素材建議 — 一律指向乾淨來源 */
export type CleanSourceKind = 'self-record' | 'built-in' | 'cc0' | 'paid-pack';

export interface SampleAdvice {
  kind: CleanSourceKind;
  /** 要找什麼樣的聲音 */
  what: string;
  /** 怎麼取得 */
  how: string;
}

/** ⑥ 需要幾次 Resample、每次做什麼 */
export interface ResamplePass {
  /** 第幾次，從 1 起算 */
  pass: number;
  /** 這一次把什麼收成一顆 pad */
  what: string;
  /** 收完之後空出哪些 pad、拿去做什麼 */
  frees: string;
}

/** ⑦ 效果配方（四引擎具體設定） */
export type FxEngine = 'padfx' | 'knobfx' | 'flexbeat' | 'compressor';

export interface FxRecipe {
  engine: FxEngine;
  /** 效果名稱，例：'Pumper' */
  name: string;
  /** 具體設定值 */
  setting: string;
  /** 為什麼這樣設 */
  why: string;
}

export interface Genre {
  /** URL slug，全小寫英文與連字號，例：'boom-bap' */
  slug: string;
  /** 中文標題 */
  title: string;
  /** 英文曲風名 */
  titleEn: string;
  level: GenreLevel;
  /** 一句話定位 */
  tagline: string;

  /** ① */ intro: GenreIntro;
  /** ② */ tempo: GenreTempo;
  /** ③ */ padPlan: PadAssignment[];
  /** ④ */ drums: DrumLayer[];
  /** ⑤ */ samples: SampleAdvice[];
  /** ⑥ */ resamples: ResamplePass[];
  /** ⑦ */ fx: FxRecipe[];
  /** ⑧ */ checkpoints: string[];

  /**
   * L4 必填：機上做不到哪裡、做到哪裡為止、之後怎麼接。
   * 驗證腳本會強制 level === 'L4' 時此欄非空。
   */
  limitation?: string;

  /** 可選的迷你播放器，只處理該曲風最難的單一環節 */
  miniPlayer?: {
    title: string;
    steps: Step[];
  };

  /**
   * 延伸觀看。曲風頁最需要影片，因為律動與音色用文字講不清楚。
   * 但配方卡的八段式內容不可以因為有影片就寫得草率。
   */
  videos?: VideoRef[];

  firmwareVerified: string;
  verifiedDate: string;
  sources: string[];
}
