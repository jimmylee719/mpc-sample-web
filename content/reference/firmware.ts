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
    id: 'microsd-limit',
    question: 'microSD 容量上限是多少？要格式化成哪一種格式？',
    status:
      '2026-09-20 重新查過官方手冊、MPC Sample 的 FAQ 與 Akai 通用的「Reformatting Storage Devices」支援文件，三份都沒有寫上限，那份格式文件也沒有點名 MPC Sample。在官方給答案之前，本站的建議是：先用 32 GB 以內的卡，格式化成 FAT32，這是各家裝置都吃得下的組合。要用更大的卡就照 Akai 通用建議格式化成 exFAT，並且先傳一兩個檔案測試再放正式素材。',
  },
  {
    id: 'speaker-mono',
    question: '內建喇叭是單聲道嗎？',
    status:
      '官方從頭到尾沒有寫過 mono 這個字。手冊規格寫「3-watt speaker」，內文也一律用單數，數量欄位只有一個；MusicRadar 的評測直接寫「3-watt mono built-in speaker」。單聲道的可能性很高，但官方沒明講，所以不寫死。可以確定的是行為：接上 PHONES 或 AUDIO OUT 時喇叭自動停用，選內建麥克風當錄音來源時也會自動停用以防回授。',
  },
  {
    id: 'internal-storage-type',
    question: '內建 8 GB 儲存是不是 eMMC？',
    status:
      '官方只寫「8 GB Internal Drive, including ~2 GB Factory Data」，沒有寫顆粒型式，手冊全文沒有出現 eMMC。網路上找得到「8 GB eMMC」的說法，本站 2026-09-20 回頭追來源，找不到官方文件也找不到任何拆機報告支持，所以不採用。這一項不影響任何操作，列出來只是為了誠實。',
  },
  {
    id: 'update-project-safety',
    question: '韌體更新會不會影響既有專案？',
    status:
      '官方的 MPC Sample 韌體更新說明整篇沒有提到既有資料，也沒有叫人先備份；1.2.0、1.2.1、1.3.0 三次更新的公開說明同樣沒有提到資料遺失。沒有寫不等於不會發生，所以本站的建議不變：更新前自己先按 SHIFT + PAD 16 存一次，重要專案先用 SD Card Access 複製一份到電腦。',
  },
  {
    id: 'auto-snapping',
    question: 'auto-snapping 到底是哪一個功能？',
    status:
      '官方功能列表的三個詞裡，lazy-chopping 與 fixed-length sampling 已經查出對應的功能（見下方已排除的疑問）。剩下 auto-snapping 仍然只出現在 Advanced Sample Editing 那一行，手冊內文從頭到尾沒有任何一段說明。合理的猜測是切點或循環點會自動對齊，但官方沒有寫，本站不寫成肯定語氣。',
  },
];

/**
 * 已排除的疑問。
 *
 * 為什麼要留著而不是直接刪掉：讀者有權看到我們是怎麼把一件事查清楚的，
 * 尤其是那些「官方自己前後不一致」的項目。把過程留在檯面上，
 * 下次有人翻到舊資料時才知道我們已經比對過了。
 */
export interface ResolvedQuestion {
  id: string;
  question: string;
  /** 結論 */
  answer: string;
  /** 依據：講清楚是哪一份文件的哪一句話 */
  evidence: string;
  /** ISO 日期 */
  resolvedDate: string;
}

export const resolvedQuestions: ResolvedQuestion[] = [
  {
    id: 'recall-length',
    question: 'Recall 到底能撈回幾秒？',
    answer:
      '音訊 Recall 是 25 秒。序列 Recall 根本不是用秒算的，它撈的是「上一個循環」裡彈過的東西。',
    evidence:
      '手冊內文兩處都寫「retrieve the last 25 seconds of audio input」；序列 Recall 寫的是「events played during the last loop of sequence playback」。只有規格表那一行寫成「30 seconds of audio or pad performance to sequence」，把兩種不同的 Recall 併成一句，數字與內文對不上。MusicRadar 的評測也寫 25 秒。本站採內文。',
    resolvedDate: '2026-08-10',
  },
  {
    id: 'export-without-sd',
    question: '沒插 microSD 卡，能不能把作品拿出來？',
    answer: '不行。沒有記憶卡就沒辦法把檔案傳到電腦。',
    evidence:
      '手冊 SD Card Access 章節寫得很明確：這個功能是存取「插在卡槽裡的 microSD（不含在盒裝內）」，而且「The microSD card will mount as an external drive on your computer」——掛載到電腦上的是記憶卡，不是內建的 8 GB。背板說明也寫 microSD 卡槽在機身左側，是「external file storage」。之前的疑問來自概述段落一句寫得比較鬆的話，詳細章節沒有模稜兩可。',
    resolvedDate: '2026-08-10',
  },
  {
    id: 'midi-adapter-included',
    question: 'MIDI 轉接線到底有沒有含在盒裝內？',
    answer: '沒有附。要接五針 MIDI 設備，轉接線要自己買，認明 TRS Type A。',
    evidence:
      '手冊寫「1/8" TRS (Type A) to 5-Pin MIDI DIN connectors (not included)」。官方 FAQ 那句「The adaptor provided with the MPC Sample is of Type-A configuration」講的是規格是哪一型，不是說盒裝有附。兩邊其實沒有衝突。',
    resolvedDate: '2026-08-10',
  },
  {
    id: 'battery-hours',
    question: '電池到底幾小時？',
    answer: '約 5 小時。',
    evidence:
      '手冊寫「Approximately 5 hours of continuous playback」，官方 FAQ 寫「Up to 6 hours」。MusicRadar 實際使用後寫「around 5 hours of operation」。依來源優先序手冊優先，獨立評測也站在同一邊，FAQ 的 6 小時視為行銷用語。',
    resolvedDate: '2026-08-10',
  },
  {
    id: 'splice-workflow',
    question: 'Splice 到底怎麼跟這台機器搭配？是機上整合還是要先下載再傳？',
    answer: '沒有機上整合。要先在電腦或手機下載，再傳進 microSD 卡。',
    evidence:
      '其他 MPC 的 Splice 整合是靠 Wi-Fi：機器產生一組代碼，到 Splice 網站綁定帳號，之後直接在機器上瀏覽自己的音色庫。這台沒有 Wi-Fi——官方手冊 v1.3.0 全文沒有出現 Wi-Fi、wireless、Bluetooth 任何一個字，也沒有出現 Splice。Splice 官方的 Akai 合作頁只列 Force 與 MPC 標準款，沒有 MPC Sample。官方那支「Using Splice with MPC Sample」影片本站還沒有人看過；看過之後若與這裡的結論不符，以影片為準，我們會回來更正。',
    resolvedDate: '2026-09-20',
  },
  {
    id: 'lazy-chopping',
    question: '官方功能列表寫的 lazy-chopping 是哪一個功能？',
    answer: '就是 Chop Type 的 Manual 模式。本站 2-6 第 4 段教的就是它。',
    evidence:
      '手冊的 Manual 模式寫得很清楚：敲 PAD 1 開始播放並放下第一個起點，樣本一邊播，你一邊敲 pad 加切點，一個樣本最多 16 個切片。這正是 MPC 圈子講的 lazy chop——邊聽邊點，不是先算好位置再下刀。功能列表用行銷詞，內文用功能名，兩邊指的是同一件事。',
    resolvedDate: '2026-09-20',
  },
  {
    id: 'fixed-length-sampling',
    question: '官方功能列表寫的 fixed-length sampling 是哪一個功能？',
    answer: '就是 Input Config 選單裡的 Rec Length 設成 SEQ。',
    evidence:
      '手冊功能列表那一行把兩件事並列：「Threshold-controlled sampling」與「Fixed-length sampling to ensure accurate loops」。Input Configuration 選單裡剛好也是相鄰的兩個設定：Threshold 與 Rec Length。Rec Length 設 FREE 是不限長度，設 SEQ 則「錄音長度鎖定為序列長度」，而且播放中會等這一輪跑完才開始錄，正是為了讓循環準。手冊內文沒有出現「fixed-length sampling」這個詞，這個對應是本站依兩處文字推出來的。',
    resolvedDate: '2026-09-20',
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
  microSdIncluded: 'microSD 卡不含在盒裝內，卡槽在機身左側',
  audioInLevel: 'AUDIO IN 為兩個 1/4" TRS 輸入，可吃麥克風或線路電平；唱盤需先經唱頭放大器',
  charging: '視線材與電源而定，充電可能只在關機時有效；官方建議至少 5V 2A',
  recallAudio: '音訊 Recall 撈回最後 25 秒',
  recallSequence: '序列 Recall 撈回「上一個循環」彈過的內容，不是固定秒數',
  midiAdapter: '接五針 MIDI 需要 1/8" TRS Type A 轉接線，盒裝不含，要自己買',
  chopTypes: 'Chop Type 三種：Threshold、Regions（4／8／16）、Manual',
  lazyChop: '官方功能列表的 lazy-chopping 就是 Chop Type 的 Manual 模式',
  fixedLengthSampling: '官方功能列表的 fixed-length sampling 就是 Rec Length 設成 SEQ',
  spliceRoute: '沒有機上 Splice 整合（本機無 Wi-Fi），要在電腦或手機下載再傳進 microSD',
  polyphony: '32 個立體聲複音，磁碟串流同樣上限 32 個聲音',
  perProject: '每個專案 16 個樣本 × 8 個 bank、16 個序列 × 8 個 bank；專案數量本身沒有上限',
  importFormats: '可匯入 .wav、.mp3、.aif／.aiff、.snd、.s1s、.s3s、.flac、.ogg',
  sampleRates: '錄音 24-bit／44.1 kHz；匯入支援 16 或 24-bit，44.1／48／96 kHz；內部處理 44.1 kHz／32-bit 浮點',
  ppq: '序列器解析度 960 PPQ（每四分音符 960 格）',
  fxTotal: '四套引擎合計 60 種以上效果，路由為 Main Output、Input、Per-Pad',
  display: '2.4 吋全彩 LCD',
  padsSpec: '16 顆 RGB 背光、感應力度的 MPC pad，支援 aftertouch',
  mpc3Support: '目前不支援與 MPC3 互轉專案；官方說未來韌體會讓 MPC 3.8 以上開得起 MPC Sample 專案',
} as const;

/**
 * 官方規格表。全部逐字對照 Akai 官方使用手冊 v1.3.0 (RevA) 附錄。
 * 這一份只放官方白紙黑字寫過的東西，推論與社群說法一律不進來。
 */
export interface SpecRow {
  label: string;
  value: string;
  /** 補充說明，非官方原文的部分寫在這裡 */
  note?: string;
}

export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

export const specGroups: SpecGroup[] = [
  {
    title: '聲音與容量',
    rows: [
      { label: '複音數', value: '32 個立體聲聲音' },
      { label: '磁碟串流', value: '機上快速串流，同樣上限 32 個聲音' },
      { label: '單一樣本最長', value: '20 分鐘' },
      {
        label: '每個專案',
        value: '16 樣本 × 8 bank，16 序列 × 8 bank',
        note: '也就是 128 個樣本、128 個序列。專案本身數量沒有上限。',
      },
      { label: '內建儲存', value: '8 GB，內含約 2 GB 原廠資料' },
      { label: '記憶體', value: '2 GB' },
      {
        label: '擴充',
        value: 'microSD 卡槽（機身左側）',
        note: '卡片不含在盒裝內。要把檔案傳到電腦一定要有卡，內建儲存不會掛載。',
      },
    ],
  },
  {
    title: '取樣與檔案',
    rows: [
      { label: '錄音規格', value: '24-bit／44.1 kHz' },
      { label: '內部處理', value: '44.1 kHz／32-bit 浮點' },
      { label: '匯入支援', value: '16 或 24-bit；44.1、48 或 96 kHz' },
      {
        label: '可匯入格式',
        value: '.wav、.mp3、.aif／.aiff、.snd、.s1s、.s3s、.flac、.ogg',
      },
      { label: '取樣來源', value: '麥克風、AUDIO IN、USB（Mac／Win／iOS／Android）、Resample' },
      {
        label: '音訊 Recall',
        value: '最後 25 秒',
        note: '規格表那一行寫 30 秒，與內文兩處不符，本站採內文。詳見已排除的疑問。',
      },
      { label: '序列 Recall', value: '上一個循環彈過的內容' },
    ],
  },
  {
    title: '序列與效果',
    rows: [
      { label: '序列器解析度', value: '960 PPQ' },
      { label: '效果總數', value: '四套引擎合計 60 種以上' },
      { label: '四套引擎', value: 'Pad FX、Knob FX、Flex Beat、Color-Compressor' },
      {
        label: '效果路由',
        value: 'Main Output、Input、Per-Pad',
        note: 'Per-Pad 屬於 Knob FX。Pad FX 是套整段序列，不能只套一顆 pad。',
      },
      { label: 'Chop', value: 'Threshold、Regions 4／8／16、Manual' },
      { label: '樣本編輯', value: 'Chop、lazy-chopping、auto-snapping、即時 looping、warping' },
    ],
  },
  {
    title: '硬體',
    rows: [
      { label: '打擊墊', value: '16 顆 RGB 背光、感應力度，支援 aftertouch' },
      { label: '螢幕', value: '2.4 吋（6.1 cm）全彩 LCD' },
      { label: '輸入', value: '2 個 1/4"（6.35 mm）TRS，麥克風或線路電平' },
      { label: '喇叭', value: '內建 3 瓦喇叭與麥克風', note: '接上耳機或 1/4" 輸出時自動停用。' },
      { label: '旋鈕與推桿', value: '3 顆 270° 旋鈕、1 顆可按壓 360° ENCODER、1 支 30 mm 推桿' },
      { label: '電池', value: '約 5 小時連續播放' },
      { label: 'MIDI', value: '1/8" TRS Type A，External 與 USB 二選一', note: '轉接線不含在盒裝內。' },
    ],
  },
  {
    title: '與其他 MPC 的關係',
    rows: [
      {
        label: '專案互轉',
        value: '目前不支援',
        note: '官方說未來韌體會讓 MPC 3.8 以上的硬體與桌面軟體開得起 MPC Sample 專案。',
      },
      {
        label: '本機沒有的東西',
        value: '觸控螢幕、Wi-Fi、外掛效果、Track Mute、Q-Link、EXIT 鍵',
        note: '看其他 MPC 機型的教學影片時要特別注意，那些按鍵這台沒有。',
      },
    ],
  },
];
