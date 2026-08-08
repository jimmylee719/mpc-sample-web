/**
 * 韌體版本治理。
 * 全站基準版本高於某一課的 firmwareVerified 時，該課自動顯示「以較舊韌體撰寫」標籤。
 */

/** 全站事實查核所依據的官方手冊／韌體版本 */
export const FIRMWARE_BASELINE = '1.3.0';

/** 官方手冊修訂版 */
export const MANUAL_REVISION = 'v1.3.0 (RevA)';

function parts(version: string): number[] {
  return version.split('.').map((n) => Number.parseInt(n, 10) || 0);
}

/** a 比 b 新回傳正數，相同回傳 0，較舊回傳負數 */
export function compareFirmware(a: string, b: string): number {
  const pa = parts(a);
  const pb = parts(b);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/** 這一課是否以比全站基準更舊的韌體撰寫 */
export function isOutdated(lessonFirmware: string): boolean {
  return compareFirmware(lessonFirmware, FIRMWARE_BASELINE) < 0;
}

export interface FirmwareLogEntry {
  version: string;
  note: string;
}

export const firmwareLog: FirmwareLogEntry[] = [
  {
    version: '1.3.0 (RevA)',
    note: '本站目前的事實基準。全部課程依這一版官方使用手冊查核。',
  },
  {
    version: '1.0 (RevB / RevC)',
    note: '早期手冊版本。本站不採用，若你手上是舊版手冊請以 1.3.0 為準。',
  },
];

/**
 * 尚未驗證清單。前台會直接列出來，因為讀者有權知道哪些事情我們還不確定。
 * 每一項寫清楚「官方怎麼說」，而不是只寫「不知道」。
 */
export interface OpenQuestion {
  id: string;
  question: string;
  status: string;
}

export const openQuestions: OpenQuestion[] = [
  {
    id: 'recall-length',
    question: 'Recall 到底能撈回幾秒？',
    status: '官方手冊自己不一致：規格表寫 30 秒，內文兩處寫 25 秒。實測前不寫死。',
  },
  {
    id: 'export-without-sd',
    question: '沒插 microSD 卡，能不能把作品拿出來？',
    status:
      '手冊詳細章節寫 SD Card Access 是存取「插在卡槽裡的 microSD（不含在盒裝內）」，但概述又寫成「internal microSD Card Storage」。兩處說法不一致，這是本站最想確認的一項。',
  },
  {
    id: 'microsd-limit',
    question: 'microSD 容量上限與檔案系統格式是什麼？',
    status: '官方手冊與 FAQ 都沒寫。買大容量卡之前建議先問官方，買錯會白花錢。',
  },
  {
    id: 'speaker-mono',
    question: '內建喇叭是單聲道嗎？',
    status: '手冊規格寫「3-watt speaker」，用的是單數，內文也一律用單數。但官方沒有明寫 mono。',
  },
  {
    id: 'internal-storage-type',
    question: '內建 8 GB 儲存是不是 eMMC？',
    status: '官方只寫「8 GB Internal Drive, including ~2 GB Factory Data」，沒有寫顆粒型式。',
  },
  {
    id: 'battery-hours',
    question: '電池到底幾小時？',
    status:
      '官方手冊寫「Approximately 5 hours of continuous playback」，官方 FAQ 寫「Up to 6 hours」。依來源優先序，本站採手冊的約 5 小時。',
  },
  {
    id: 'update-project-safety',
    question: '韌體更新會不會影響既有專案？',
    status: '官方更新說明只強調「更新中不要拔線」，沒有提到專案。更新前請務必自己先存一次。',
  },
];

/** 已經查證確認的事實，寫在這裡供各頁引用，避免各處各寫一套 */
export const VERIFIED_FACTS = {
  batteryHours: '約 5 小時連續播放',
  storage: '8 GB 內建，含約 2 GB 原廠資料',
  maxSampleLength: '單一樣本最長 20 分鐘',
  speaker: '內建 3 瓦喇叭與麥克風',
  knobs: '3 顆 270 度旋鈕，1 顆可按壓的 360 度 ENCODER',
  fader: '1 支 30 mm 推桿',
  buttons: '11 顆雙色 LED 按鍵、8 顆單色 LED 按鍵、4 顆無燈按鍵',
  flexBeat: 'PAD 1 是 EMPTY 不做事，效果在 PAD 2–16',
  padFxSimultaneous: 'Pad FX 同時最多四個，超過會從最早開啟的開始被暫停',
  exportPath: 'Song 頁按 B1 匯出，B2 存成音檔，用 ENCODER 命名後按 B3 執行',
  transferPath: 'Project 選單的 SD Card Access 會把 microSD 掛載成電腦的外接磁碟',
  microSdIncluded: 'microSD 卡不含在盒裝內',
} as const;
