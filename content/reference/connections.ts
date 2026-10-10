/**
 * 接線總表：手上有這個東西，要怎麼接進來／接出去。
 *
 * 為什麼要有這一頁：戶外或身邊沒有人可以問的時候，
 * 最常卡住的不是怎麼按，而是「我手上這條線對不對」。
 * 課程 2-1 一步一步教，這一頁是查的：找到你的設備，照著那一列接。
 *
 * status 的意思：
 * - official  官方手冊或支援文件有寫
 * - general   一般音訊常識，跟這台機器無關也成立
 * - unverified 合理但還沒實測，前台會標「尚未驗證」
 */

export type ConnStatus = 'official' | 'general' | 'unverified';

export interface Connection {
  id: string;
  /** 你手上的東西 */
  device: string;
  /** 接到機器哪裡 */
  port: string;
  /** 需要的線或轉接器 */
  cable: string;
  /** 錄音來源要選什麼；接出去的設備寫「—」 */
  source: string;
  /** 一句話注意事項 */
  note: string;
  status: ConnStatus;
  /** 對應課程與步驟，形如 /learn/s2/record-external-audio?step=7 */
  href?: string;
}

const S21 = '/learn/s2/record-external-audio';
const S310 = '/learn/s3/export-backup-load-kit';

/** 把聲音錄進來 */
export const inputs: Connection[] = [
  {
    id: 'mic',
    device: '內建麥克風',
    port: '機身上的麥克風',
    cable: '不用線',
    source: 'Mic',
    note: '選 Mic 時內建喇叭會自動關掉，這是防回授。要監聽請插耳機。戶外有風時，用身體或手掌擋在麥克風的上風處，風切聲會小很多。',
    status: 'official',
    href: '/learn/s1/make-your-first-beat',
  },
  {
    id: 'phone-usbc',
    device: 'USB-C 接頭的手機或平板',
    port: '背板 USB-C',
    cable: 'USB-C 對 USB-C 資料線（只能充電的線不行）',
    source: 'USB',
    note: '手機上播什麼就錄什麼，連通知聲也會錄進去，先開勿擾模式。',
    status: 'official',
    href: `${S21}?step=7`,
  },
  {
    id: 'phone-lightning',
    device: 'Lightning 接頭的舊 iPhone',
    port: '背板 USB-C',
    cable: 'Apple Lightning 對 USB 3 相機轉接器，加一條 USB 對 USB-C 資料線',
    source: 'USB',
    note: '官方在韌體更新說明提過這個轉接器，拿來取樣還沒實測。',
    status: 'unverified',
    href: `${S21}?step=8`,
  },
  {
    id: 'phone-jack',
    device: '有耳機孔的手機、平板、隨身聽',
    port: '背板 AUDIO IN 1/L 與 2/R',
    cable: '3.5 mm 立體聲 轉 兩個 6.3 mm 單聲道插頭',
    source: 'Rear',
    note: '手機音量固定在七、八成，大小交給 REC GAIN 調。',
    status: 'general',
    href: `${S21}?step=11`,
  },
  {
    id: 'phone-dongle',
    device: '沒有耳機孔的手機',
    port: '背板 AUDIO IN 1/L 與 2/R',
    cable: 'USB-C 轉 3.5 mm 轉接頭，加上一列那條線',
    source: 'Rear',
    note: '這條路是類比的，比 USB 多一點底噪，但幾乎每支手機都接得上。',
    status: 'general',
    href: `${S21}?step=12`,
  },
  {
    id: 'computer',
    device: '電腦（Mac 或 Windows）',
    port: '背板 USB-C',
    cable: 'USB-C 資料線（電腦只有 USB-A 就用 USB-A 對 USB-C）',
    source: 'USB',
    note: '在電腦的音效設定把輸出裝置選成 MPC Sample。需不需要驅動官方沒寫。',
    status: 'unverified',
    href: `${S21}?step=15`,
  },
  {
    id: 'turntable',
    device: '黑膠唱盤',
    port: '背板 AUDIO IN 1/L 與 2/R',
    cable: '先過唱頭放大器（或唱盤本身切到 LINE），再用 RCA 轉 6.3 mm 的線',
    source: 'Rear',
    note: '唱盤直接接一定又小又悶。這是最多人卡住的一種。',
    status: 'general',
    href: `${S21}?step=16`,
  },
  {
    id: 'synth',
    device: '合成器、鼓機、混音器、效果器',
    port: '背板 AUDIO IN 1/L 與 2/R',
    cable: '6.3 mm 導線兩條（單聲道設備接一條到 1/L 就好）',
    source: 'Rear，單聲道選 Rear L',
    note: '官方手冊明列這幾類設備可以直接接。',
    status: 'official',
    href: `${S21}?step=18`,
  },
  {
    id: 'guitar',
    device: '電吉他、電貝斯',
    port: '背板 AUDIO IN 1/L',
    cable: '一條 6.3 mm 樂器導線',
    source: 'Rear L',
    note: '官方手冊寫 AUDIO IN 可以接樂器。訊號偏小時 REC GAIN 往上轉。',
    status: 'official',
    href: `${S21}?step=18`,
  },
  {
    id: 'ext-mic',
    device: '外接麥克風',
    port: '背板 AUDIO IN 1/L',
    cable: '麥克風線轉 6.3 mm 插頭',
    source: 'Rear L',
    note: '官方寫可以接麥克風，但有沒有幻象電源沒寫。需要供電的電容式麥克風可能沒聲音。',
    status: 'unverified',
    href: `${S21}?step=19`,
  },
  {
    id: 'bluetooth',
    device: '藍牙喇叭、藍牙耳機、手機藍牙',
    port: '無',
    cable: '接不了',
    source: '—',
    note: '這台機器沒有藍牙也沒有 Wi-Fi，官方手冊全文沒有出現這兩個字。',
    status: 'official',
  },
];

/** 把聲音送出去 */
export const outputs: Connection[] = [
  {
    id: 'phones',
    device: '耳機',
    port: '背板 PHONES（3.5 mm）',
    cable: '一般耳機直接插',
    source: '—',
    note: '插上後內建喇叭自動關掉。戴上之前先把 MAIN VOLUME 轉到最小。',
    status: 'official',
    href: '/start',
  },
  {
    id: 'speakers',
    device: '主動式喇叭、音響、混音器',
    port: '背板 AUDIO OUT 1/L 與 2/R',
    cable: '6.3 mm 導線兩條（音響只有 RCA 就用 6.3 mm 轉 RCA）',
    source: '—',
    note: '接上後內建喇叭自動關掉。音量由 MAIN VOLUME 控制。',
    status: 'official',
    href: '/learn/s5/sync-and-stage-checklist',
  },
  {
    id: 'computer-record',
    device: '電腦（要把整首歌錄下來）',
    port: '背板 USB-C',
    cable: 'USB-C 資料線',
    source: '—',
    note: '在電腦錄音程式把輸入裝置選成 MPC Sample，按 PLAY 播完整首。不管匯出的檔案存在哪裡都行得通。',
    status: 'unverified',
    href: `${S310}?step=9`,
  },
  {
    id: 'recorder',
    device: '錄音介面、錄音機',
    port: '背板 AUDIO OUT 1/L 與 2/R',
    cable: '6.3 mm 導線兩條',
    source: '—',
    note: 'USB 用不了的時候的備援。錄音機那端調輸入音量，避免破音。',
    status: 'general',
    href: `${S310}?step=16`,
  },
  {
    id: 'card',
    device: '電腦（要傳檔案）',
    port: 'microSD 卡槽 + USB-C',
    cable: 'microSD 卡（盒裝不含）＋ USB-C 資料線',
    source: '—',
    note: 'Project 選單選 SD Card Access，記憶卡會變成電腦上的外接磁碟。電腦看不到內建的 8 GB。',
    status: 'official',
    href: `${S310}?step=7`,
  },
  {
    id: 'midi',
    device: '五針 MIDI 的合成器或鼓機',
    port: '背板 MIDI IN／OUT（3.5 mm）',
    cable: '3.5 mm TRS Type A 轉五針 MIDI 轉接線（盒裝不含）',
    source: '—',
    note: '一定要 Type A。買錯成 Type B 會完全沒反應。',
    status: 'official',
    href: '/learn/s5/sync-and-stage-checklist',
  },
];

/** 出門前要帶的東西。戶外沒地方買，忘了就是整天白跑 */
export const packingList: Array<{ item: string; why: string }> = [
  { item: '充飽電的機器', why: '電池約 5 小時連續播放。插著行動電源也能用，至少 5V 2A。' },
  { item: '盒裝那條 USB-C 線', why: '充電、接手機、接電腦都靠它，而且確定能傳資料。' },
  { item: '耳機', why: '戶外風大又吵，喇叭聽不清楚，錄音時也沒辦法用喇叭監聽。' },
  { item: 'microSD 卡', why: '要把作品帶回電腦就需要它。' },
  { item: '3.5 mm 轉兩個 6.3 mm 的線', why: '別人的手機、隨身聽、任何有耳機孔的東西都接得上。' },
  { item: '網站已經整站下載', why: '在 Wi-Fi 下按一次「整站下載」，36 課與查詢區全部存進手機。' },
];
