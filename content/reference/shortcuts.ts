import type { ControlId, PadId } from '@/types/lesson';
import { PAD_NUMBERS, PAD_SHIFT_LABELS } from '@/types/lesson';

/**
 * 快捷鍵總表。
 *
 * 絲印文字不在這裡手打，一律從 components/mpc/panel-layout.ts 取，
 * 這樣面板改了、表也跟著改，不會出現「表寫 A、面板印 B」。
 * 中文說明是自己寫的。
 */

export type ShortcutGroup = 'pad' | 'mode' | 'transport' | 'edit' | 'knob';

export interface Shortcut {
  /** 驅動面板高亮 */
  control: ControlId;
  /** 顯示用的組合鍵 */
  combo: string;
  /** 面板上印的第二功能英文 */
  label: string;
  group: ShortcutGroup;
  /** 這招做什麼（中文，自己寫） */
  what: string;
  /** 面板上沒有印出來的隱藏功能 */
  hidden?: boolean;
}

const PAD_WHAT: Record<PadId, string> = {
  p1: '把力度固定在最大，每一下都一樣大聲',
  p2: '把目前序列的長度砍成一半',
  p3: '把目前序列的長度變成兩倍',
  p4: '錄音前先給一小節空拍讓你抓拍子',
  p5: '打開壓縮器，讓音量忽大忽小的地方變平均',
  p6: '整段用一半速度播放',
  p7: '整段用兩倍速度播放',
  p8: '打開 MIDI 設定選單',
  p9: '設定推桿要控制哪個參數',
  p10: '設定錄音時把音自動貼到哪一種格子',
  p11: '把整段循環收成一個新樣本，這是突破單 kit 的關鍵',
  p12: '打開 Song 模式，把段落串成一首歌',
  p13: '修剪樣本的頭尾',
  p14: '調整已經錄好的音符的對齊方式',
  p15: '改變樣本長度而不改音高',
  p16: '打開專案選單：存檔、載入、記憶卡',
};

const PAD_SHORTCUTS: Shortcut[] = PAD_NUMBERS.map((n) => {
  const id = `p${n}` as PadId;
  return {
    control: id,
    combo: `SHIFT + PAD ${n}`,
    label: PAD_SHIFT_LABELS[id],
    group: 'pad' as const,
    what: PAD_WHAT[id],
  };
});

const BUTTON_SHORTCUTS: Shortcut[] = [
  { control: 'sample', combo: 'SHIFT + SAMPLE', label: 'INPUT CONFIG', group: 'mode', what: '設定錄音要收哪一路訊號：麥克風或背板輸入' },
  { control: 'seq', combo: 'SHIFT + SEQ', label: 'STEP EDIT', group: 'mode', what: '一格一格檢查與修改已經錄好的音符' },
  { control: 'padfx', combo: 'SHIFT + PAD FX', label: 'FLEX BEAT', group: 'mode', what: '打開 Flex Beat，用 pad 對整段序列做節奏切割' },
  { control: 'knobfx', combo: 'SHIFT + KNOB FX', label: 'FX SELECT', group: 'mode', what: '選擇 Knob FX 要用哪一個效果' },
  { control: 'chop', combo: 'SHIFT + CHOP', label: 'NOTE ON', group: 'mode', what: '切換 pad 是持續發聲還是按一下響一次' },
  { control: 'mute', combo: 'SHIFT + MUTE', label: 'UNMUTE ALL', group: 'mode', what: '一次解除全部靜音' },
  { control: 'loop', combo: 'SHIFT + LOOP', label: 'REVERSE', group: 'mode', what: '把樣本倒著播' },
  { control: 'lev16', combo: 'SHIFT + 16 LEVELS', label: 'TYPE', group: 'mode', what: '選 16 Levels 要控制哪一種參數，例如音高或力度' },
  { control: 'ssel', combo: 'SHIFT + SAMPLE SEL', label: 'SAVE SAMPLE', group: 'edit', what: '單獨存下目前這一個樣本' },
  { control: 'tap', combo: 'SHIFT + TAP TEMPO', label: 'METRO', group: 'edit', what: '打開或關掉節拍器' },
  { control: 'erase', combo: 'SHIFT + ERASE', label: 'COPY', group: 'edit', what: '複製目前選到的東西' },
  { control: 'nrep', combo: 'SHIFT + NOTE RPT', label: 'TRIPLET', group: 'edit', what: '把連打切換成三連音' },
  { control: 'minus', combo: 'SHIFT + −', label: 'UNDO', group: 'edit', what: '復原上一步（切片編輯不適用）' },
  { control: 'plus', combo: 'SHIFT + +', label: 'REDO', group: 'edit', what: '重做剛剛復原掉的那一步' },
  { control: 'bank', combo: 'SHIFT + PAD BANK', label: '上一個 BANK', group: 'edit', what: '往回切換 pad 的 Bank' },
  { control: 'srec', combo: 'SHIFT + SAMPLE REC', label: 'RECALL', group: 'transport', what: '把剛剛已經過去、沒錄到的聲音撈回來' },
  { control: 'qrec', combo: 'SHIFT + SEQ REC', label: 'RECALL', group: 'transport', what: '把剛剛彈過但沒錄到的 pad 演奏撈回序列' },
  { control: 'play', combo: 'SHIFT + PLAY', label: 'CONTINUE', group: 'transport', what: '從上次停下來的地方繼續播，不回到開頭' },
  // 面板上沒印的
  { control: 'k1', combo: 'SHIFT + K1', label: 'ZOOM START', group: 'knob', what: '放大波形的起點，切不準的時候一定要用', hidden: true },
  { control: 'k2', combo: 'SHIFT + K2', label: 'ZOOM END', group: 'knob', what: '放大波形的終點', hidden: true },
  { control: 'k3', combo: 'SHIFT + K3', label: 'ZOOM LOOP', group: 'knob', what: '放大循環點', hidden: true },
  { control: 'enc', combo: 'SHIFT + ENCODER', label: 'REVERSE SCROLL', group: 'knob', what: '反方向循環目前的參數選項', hidden: true },
];

export const shortcuts: Shortcut[] = [...BUTTON_SHORTCUTS, ...PAD_SHORTCUTS];

export const SHORTCUT_GROUPS: ReadonlyArray<{ id: ShortcutGroup; label: string }> = [
  { id: 'pad', label: '打擊墊' },
  { id: 'mode', label: '模式鍵' },
  { id: 'transport', label: '走帶與錄音' },
  { id: 'edit', label: '編輯' },
  { id: 'knob', label: '旋鈕（面板沒印）' },
];
