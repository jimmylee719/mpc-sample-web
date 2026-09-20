import type { ControlId } from '@/types/lesson';

/**
 * 課文裡寫出來的按鍵名稱 → 面板控制項 ID。
 *
 * 為什麼要一份人工對照表，而不是直接拿面板絲印去比：
 * 面板上印的是 `SAMPLE SEL`、`NOTE RPT`，課文裡寫的是
 * `SAMPLE SELECT`、`NOTE REPEAT`。兩邊本來就不會完全一樣，
 * 硬比會漏掉一半。
 *
 * 只收「明確指某一個實體控制項」的詞。像 Threshold、Regions 這種
 * 參數名稱不收 —— 它們不是按鍵，畫成按鍵反而是錯的。
 */
export const KEY_ALIASES: Record<string, ControlId> = {
  // ── 功能鍵 ──
  SHIFT: 'shift',
  CHOP: 'chop',
  MUTE: 'mute',
  LOOP: 'loop',
  '16 LEVELS': 'lev16',
  'PAD BANK': 'bank',
  ERASE: 'erase',
  'NOTE REPEAT': 'nrep',
  'NOTE RPT': 'nrep',
  'TAP TEMPO': 'tap',
  'SAMPLE SELECT': 'ssel',
  'SAMPLE SEL': 'ssel',

  // ── 模式鍵 ──
  SAMPLE: 'sample',
  SEQ: 'seq',
  'PAD FX': 'padfx',
  'KNOB FX': 'knobfx',

  // ── 走帶 ──
  'SAMPLE RECORD': 'srec',
  'SAMPLE REC': 'srec',
  'SEQ RECORD': 'qrec',
  'SEQ REC': 'qrec',
  PLAY: 'play',
  STOP: 'stop',

  // ── 旋鈕與推桿 ──
  K1: 'k1',
  K2: 'k2',
  K3: 'k3',
  B1: 'b1',
  B2: 'b2',
  B3: 'b3',
  ENCODER: 'enc',
  'MAIN VOLUME': 'vol',
  FADER: 'fader',

  // ── 背板 ──
  'MIDI IN': 'r_midiin',
  'MIDI OUT': 'r_midiout',
  'SYNC OUT': 'r_sync',
  'REC GAIN': 'r_gain',
  'USB-C': 'r_usb',
  POWER: 'r_power',
  PHONES: 'r_phones',
};

/** 長的排前面，才不會讓 SEQ 先咬掉 SEQ RECORD */
const TOKENS = Object.keys(KEY_ALIASES).sort((a, b) => b.length - a.length);

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
}

/**
 * 比對用的正規表示式。
 *
 * 前後都加上界限判斷，否則 `RESAMPLE` 會被咬掉尾巴變成 RE + SAMPLE，
 * 那是最糟的一種錯 —— 看起來還很像對的。
 */
export const KEY_PATTERN = new RegExp(
  `(?<![A-Z0-9])(PAD\\s\\d{1,2}|${TOKENS.map(escape).join('|')})(?![A-Z0-9])`,
  'g',
);

/** 把比對到的字串換成控制項 ID，比不到回 null */
export function controlIdFor(token: string): ControlId | null {
  const pad = /^PAD\s(\d{1,2})$/.exec(token);
  if (pad) {
    const n = Number.parseInt(pad[1]!, 10);
    return n >= 1 && n <= 16 ? (`p${n}` as ControlId) : null;
  }
  return KEY_ALIASES[token] ?? null;
}
