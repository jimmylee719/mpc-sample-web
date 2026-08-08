import type { ControlId, ScreenState } from '@/types/lesson';

/**
 * 旋鈕矩陣：K1／K2／K3 在各個畫面下分別管什麼。
 *
 * 這一頁的教學目的是「你不用背，看螢幕下排就知道」，
 * 所以每一筆都帶一個 ScreenState，選畫面時右邊面板與小螢幕會同步變成那個樣子。
 *
 * status 欄位是誠實標記：
 *   'verified'  已有依據（官方手冊或原型實測畫面）
 *   'pending'   還沒查證，不寫內容，只列出畫面名稱
 */

export interface KnobRow {
  id: string;
  /** 畫面名稱 */
  screenName: string;
  /** 怎麼進到這個畫面 */
  howTo: string;
  /** 進入這個畫面要按的鍵，用來驅動面板高亮 */
  enter: ControlId[];
  enterShift?: boolean;
  k1: string;
  k2: string;
  k3: string;
  /** 按住 SHIFT 再轉時的功能，沒有就省略 */
  shifted?: [string, string, string];
  /** 這個畫面在機器小螢幕上長什麼樣 */
  screen: ScreenState;
  status: 'verified' | 'pending';
  source?: string;
}

export const knobRows: KnobRow[] = [
  {
    id: 'sample-trim',
    screenName: 'Sample · Trim',
    howTo: '按 SAMPLE，預設就是這一頁',
    enter: ['sample'],
    k1: 'Start　樣本從哪裡開始',
    k2: 'End　樣本到哪裡結束',
    k3: 'Loop　循環點',
    shifted: ['Zoom 起點', 'Zoom 終點', 'Zoom 循環點'],
    screen: { t1: 'A01 Kick 02', tabs: ['Trim', 'Tune', 'Filter'], bots: ['Start', 'End', 'Loop'], wave: 31 },
    status: 'verified',
    source: '原型 v2 實測畫面；Zoom 為面板未印出的隱藏功能',
  },
  {
    id: 'input-config',
    screenName: 'Input Config',
    howTo: '按住 SHIFT 再按 SAMPLE',
    enter: ['sample'],
    enterShift: true,
    k1: 'Source　錄哪一路：麥克風或背板輸入',
    k2: 'Monitor　要不要即時聽到自己',
    k3: 'Threshold　音量超過多少才開始錄',
    screen: { t1: 'INPUT CONFIG', tabs: ['Source', 'Monitor', 'Thresh'], bots: ['Mic', 'Auto', 'Off'] },
    status: 'verified',
    source: '原型 v2 實測畫面；Threshold 觸發錄音見官方手冊',
  },
  {
    id: 'sample-record',
    screenName: 'Sample Record',
    howTo: '按 SAMPLE RECORD',
    enter: ['srec'],
    k1: 'Source　錄音來源',
    k2: 'Length　錄多長，選 Free 就是想錄多久都行',
    k3: 'Threshold　自動開始錄音的音量門檻',
    screen: { t1: 'REC READY', tabs: ['Source', 'Length', 'Thresh'], bots: ['Mic', 'Free', 'Off'] },
    status: 'verified',
    source: '原型 v2 實測畫面',
  },
  {
    id: 'chop',
    screenName: 'Chop',
    howTo: '按 CHOP',
    enter: ['chop'],
    k1: 'Start　這一塊從哪裡開始',
    k2: 'End　這一塊到哪裡結束',
    k3: 'Type　用哪一種切法',
    screen: { t1: 'CHOP  8 slices', tabs: ['Chop', 'Tune', 'Filter'], bots: ['Start', 'End', 'Type'], wave: 52 },
    status: 'verified',
    source: '原型 v2 實測畫面。注意下排第三個從 Loop 變成 Type',
  },
  {
    id: 'seq',
    screenName: 'Sequence',
    howTo: '按 SEQ',
    enter: ['seq'],
    k1: 'Length　這段序列幾小節',
    k2: 'BPM　速度',
    k3: 'Rec Quantize　錄音時要不要自動對齊格子',
    screen: { t1: 'SEQ 02  EMPTY', tabs: ['Seq', 'BPM', 'Rec Q'], bots: ['2 bars', '90.0', 'ON'] },
    status: 'verified',
    source: '原型 v2 實測畫面',
  },
  {
    id: 'pad-fx',
    screenName: 'Pad FX',
    howTo: '按 PAD FX',
    enter: ['padfx'],
    k1: '跟著你踩的那個效果變，例如 Half Speed 的 Speed',
    k2: '同上，例如 Mix 混合比例',
    k3: '同上，例如 Feedback 回授量',
    screen: { t1: 'PAD FX', tabs: ['Pad FX', '', ''], bots: ['', '', ''] },
    status: 'verified',
    source: '官方手冊 v1.3.0 (RevA)：Pad FX 參數隨效果不同，逐一列在效果字典',
  },
  {
    id: 'knob-fx',
    screenName: 'Knob FX',
    howTo: '按 KNOB FX；按住 SHIFT 再按可以選效果',
    enter: ['knobfx'],
    k1: '目前效果的第一參數，例如 Delay 的 Time',
    k2: '第二參數，例如 Feedback',
    k3: '第三參數，例如 Mix',
    shifted: ['第四參數，例如 Sync', '第五參數，例如 Damping', '第六參數，例如 Width'],
    screen: { t1: 'KNOB FX  DELAY', tabs: ['FX', '', ''], bots: ['Time', 'Fdbk', 'Mix'] },
    status: 'verified',
    source: '官方手冊 v1.3.0 (RevA)：Knob FX 表格，每個效果有 K1–K3 與 SHIFT+K1–K3 共六個參數',
  },
  { id: 'tune', screenName: 'Sample · Tune', howTo: '在 SAMPLE 頁按 B2', enter: ['b2'], k1: '', k2: '', k3: '', screen: { t1: 'TUNE', tabs: ['Trim', 'Tune', 'Filter'], bots: ['', '', ''], wave: 31 }, status: 'pending' },
  { id: 'filter', screenName: 'Sample · Filter', howTo: '在 SAMPLE 頁按 B3', enter: ['b3'], k1: '', k2: '', k3: '', screen: { t1: 'FILTER', tabs: ['Trim', 'Tune', 'Filter'], bots: ['', '', ''], wave: 31 }, status: 'pending' },
  { id: 'flex-beat', screenName: 'Flex Beat', howTo: '按住 SHIFT 再按 PAD FX', enter: ['padfx'], enterShift: true, k1: '', k2: '', k3: '', screen: { t1: 'FLEX BEAT' }, status: 'pending' },
  { id: 'step-edit', screenName: 'Step Edit', howTo: '按住 SHIFT 再按 SEQ', enter: ['seq'], enterShift: true, k1: '', k2: '', k3: '', screen: { t1: 'STEP EDIT' }, status: 'pending' },
  { id: 'song', screenName: 'Song', howTo: '按住 SHIFT 再按 PAD 12', enter: ['p12'], enterShift: true, k1: '', k2: '', k3: '', screen: { t1: 'SONG' }, status: 'pending' },
  { id: 'project', screenName: 'Project', howTo: '按住 SHIFT 再按 PAD 16', enter: ['p16'], enterShift: true, k1: '', k2: '', k3: '', screen: { t1: 'PROJECT' }, status: 'pending' },
];

export const verifiedCount = knobRows.filter((r) => r.status === 'verified').length;
