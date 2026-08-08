/**
 * 效果字典。
 *
 * 效果名稱、pad 對應、參數名稱與數值範圍引用自官方手冊 v1.3.0 (RevA)——這些是事實。
 * 「做什麼用」「什麼時候用」是自己寫的白話說明，沒有翻譯官方描述。
 */

export type FxEngineId = 'padfx' | 'knobfx' | 'flexbeat' | 'compressor';

export interface FxParam {
  knob: 'K1' | 'K2' | 'K3' | 'SHIFT+K1' | 'SHIFT+K2' | 'SHIFT+K3';
  name: string;
  /** 官方手冊列出的數值範圍 */
  range?: string;
}

export interface FxEntry {
  id: string;
  name: string;
  engine: FxEngineId;
  /** Pad FX 專用：印在哪一顆 pad 上 */
  pad?: number;
  category: string;
  /** 白話說明：這東西做什麼 */
  what: string;
  /** 什麼時候會想用它 */
  when?: string;
  params?: FxParam[];
  status: 'verified' | 'pending';
}

export const FX_ENGINES: ReadonlyArray<{ id: FxEngineId; label: string; note: string }> = [
  { id: 'padfx', label: 'Pad FX', note: '用 pad 觸發，套用在整段序列上。同時最多四個' },
  { id: 'knobfx', label: 'Knob FX', note: '用旋鈕控制，一次只能開一個，但可以指定單一 pad' },
  { id: 'flexbeat', label: 'Flex Beat', note: 'PAD 1 是 EMPTY 不做事，效果在 PAD 2–16，套用在整段序列' },
  { id: 'compressor', label: 'Compressor', note: '讓音量忽大忽小的地方變平均' },
];

/** Pad FX：16 顆 pad 對應 16 種效果，名稱與 pad 對應來自官方手冊 */
export const padFx: FxEntry[] = [
  { id: 'half-speed', pad: 1, name: 'Half Speed', engine: 'padfx', category: '時間', what: '把聲音放慢播放', when: '想做出下沉、拖慢的轉場', params: [{ knob: 'K1', name: 'Speed', range: 'x1.5, x2, x4' }, { knob: 'K2', name: 'Mix', range: '0–100%' }], status: 'verified' },
  { id: 'chorus', pad: 2, name: 'Chorus', engine: 'padfx', category: '調變', what: '讓聲音聽起來像有好幾層疊在一起', when: '想把單薄的旋律變厚', params: [{ knob: 'K1', name: 'Rate', range: '0.40–3.20 Hz' }, { knob: 'K2', name: 'Depth', range: '0–100%' }, { knob: 'K3', name: 'Feedback', range: '0–100%' }], status: 'verified' },
  { id: 'flanger', pad: 3, name: 'Flanger', engine: 'padfx', category: '調變', what: '製造像噴射機掠過的呼嘯感', when: '過門或段落交接', params: [{ knob: 'K1', name: 'Rate', range: '0.02–10.00 Hz' }, { knob: 'K2', name: 'Depth', range: '0–100%' }, { knob: 'K3', name: 'Feedback', range: '0–100%' }], status: 'verified' },
  { id: 'phaser', pad: 4, name: 'Phaser', engine: 'padfx', category: '調變', what: '讓聲音來回掃動，比 Flanger 溫和', when: '想要持續的律動感', params: [{ knob: 'K1', name: 'Feedback', range: '0–100%' }, { knob: 'K2', name: 'Speed', range: '2 bars … 1/64' }, { knob: 'K3', name: 'Range', range: '0–100%' }], status: 'verified' },
  { id: 'comb-filter', pad: 5, name: 'Comb Filter', engine: 'padfx', category: '濾波', what: '在頻率上挖出一排凹槽，聲音變金屬感', when: '想把素材弄得不像原本的東西', params: [{ knob: 'K1', name: 'Speed', range: '2 bars … 1/64' }], status: 'verified' },
  { id: 'lp-filter', pad: 6, name: 'LP Filter', engine: 'padfx', category: '濾波', what: '低通：留下低頻，砍掉高頻', when: '做 build-up，或把段落推到背景', status: 'verified' },
  { id: 'hp-filter', pad: 7, name: 'HP Filter', engine: 'padfx', category: '濾波', what: '高通：留下高頻，砍掉低頻', when: '想讓大鼓暫時消失', status: 'verified' },
  { id: 'bp-filter', pad: 8, name: 'BP Filter', engine: 'padfx', category: '濾波', what: '帶通：只留中間一段頻率', when: '模擬電話或收音機的音色', status: 'verified' },
  { id: 'ring-mod', pad: 9, name: 'Ring Mod', engine: 'padfx', category: '調變', what: '把聲音變成金屬、鈴聲般的怪音', when: '想要明顯的破壞感', status: 'verified' },
  { id: 'lofi', pad: 10, name: 'LoFi', engine: 'padfx', category: '破壞', what: '降低位元與取樣率，聲音變粗糙', when: 'Lo-fi Hip Hop 的招牌音色', status: 'verified' },
  { id: 'color', pad: 11, name: 'Color', engine: 'padfx', category: '破壞', what: '改變音色的整體染色', when: '想快速換一種氣氛', status: 'verified' },
  { id: 'granulator', pad: 12, name: 'Granulator', engine: 'padfx', category: '破壞', what: '把聲音切成極小顆粒再重組', when: '做氛圍或碎裂效果', status: 'verified' },
  { id: 'beat-repeat', pad: 13, name: 'Beat Repeat', engine: 'padfx', category: '時間', what: '把當下這一小段不斷重複', when: '段落結尾的結巴式過門', status: 'verified' },
  { id: 'rev-stepper', pad: 14, name: 'Rev Stepper', engine: 'padfx', category: '時間', what: '一段一段倒著播', when: '想製造往回捲的感覺', status: 'verified' },
  { id: 'delay-pad', pad: 15, name: 'Delay', engine: 'padfx', category: '空間', what: '加上回聲', when: '幾乎所有轉場都用得到', status: 'verified' },
  { id: 'reverb-pad', pad: 16, name: 'Reverb', engine: 'padfx', category: '空間', what: '加上空間殘響', when: '想讓聲音退到遠處', status: 'verified' },
];

/**
 * Knob FX：官方手冊列出 28 種。
 * 以下 15 種的名稱已從手冊確認，四種 Delay 連參數與範圍都已核對。
 * 其餘 13 種尚未逐一核對，不列出以免寫錯。
 */
export const knobFx: FxEntry[] = [
  { id: 'kf-delay', name: 'Delay', engine: 'knobfx', category: '延遲', what: '基本回聲，可以跟著速度對拍', params: [{ knob: 'K1', name: 'Time', range: 'Sync 開：1/32 … 8/4；Sync 關：1 ms–2.00 s' }, { knob: 'K2', name: 'Feedback', range: '0–100%' }, { knob: 'K3', name: 'Mix', range: '0–100%' }, { knob: 'SHIFT+K1', name: 'Sync', range: 'Off, On' }, { knob: 'SHIFT+K2', name: 'Damping', range: '1.00–20.0 kHz' }, { knob: 'SHIFT+K3', name: 'Width', range: '0–100%' }], status: 'verified' },
  { id: 'kf-diff-delay', name: 'Diff Delay', engine: 'knobfx', category: '延遲', what: '回聲會擴散開，像在有殘響的房間裡', params: [{ knob: 'K1', name: 'Time', range: 'Sync 開：1/64 … 4/4；Sync 關：1–1000 ms' }, { knob: 'K2', name: 'Feedback', range: '0–100%' }, { knob: 'K3', name: 'Mix', range: '0–100%' }, { knob: 'SHIFT+K1', name: 'Sync', range: 'Off, On' }, { knob: 'SHIFT+K2', name: 'Diffusion', range: '0–100%' }, { knob: 'SHIFT+K3', name: 'High Damp', range: '0–100%' }], status: 'verified' },
  { id: 'kf-tape-delay', name: 'Tape Delay', engine: 'knobfx', category: '延遲', what: '模擬盤帶回聲，帶有抖動與老化感', params: [{ knob: 'K1', name: 'Time', range: '1, 1/2, 1/2., 1/4, 1/4., 1/8, 1/8., 1/16, 1/16.' }, { knob: 'K2', name: 'Feedback', range: '0–100' }, { knob: 'K3', name: 'Mix', range: '0–100' }, { knob: 'SHIFT+K1', name: 'Wow/Flut', range: '0–100' }, { knob: 'SHIFT+K2', name: 'Ramp', range: '0–100' }, { knob: 'SHIFT+K3', name: 'Spread', range: '0–100' }], status: 'verified' },
  { id: 'kf-sample-delay', name: 'Sample Delay', engine: 'knobfx', category: '延遲', what: '左右聲道各延遲一點點，讓聲音變寬', params: [{ knob: 'K1', name: 'Left', range: '0.0–250.0 ms' }, { knob: 'K2', name: 'Right', range: '0.0–250.0 ms' }], status: 'verified' },
  { id: 'kf-auto-wah', name: 'Auto-Wah', engine: 'knobfx', category: '濾波', what: '會自己哇哇叫的濾波', status: 'verified' },
  { id: 'kf-auto-pan', name: 'Auto-Pan', engine: 'knobfx', category: '空間', what: '聲音自動在左右之間來回', status: 'verified' },
  { id: 'kf-lp-filter', name: 'LP Filter', engine: 'knobfx', category: '濾波', what: '低通濾波，可指定單一 pad', status: 'verified' },
  { id: 'kf-hp-filter', name: 'HP Filter', engine: 'knobfx', category: '濾波', what: '高通濾波，可指定單一 pad', status: 'verified' },
  { id: 'kf-bp-filter', name: 'BP Filter', engine: 'knobfx', category: '濾波', what: '帶通濾波，可指定單一 pad', status: 'verified' },
  { id: 'kf-vinyl', name: 'Vinyl Emulator', engine: 'knobfx', category: '復古', what: '模擬黑膠的雜訊與音色', status: 'verified' },
  { id: 'kf-tape', name: 'Tape Emulator', engine: 'knobfx', category: '復古', what: '模擬盤帶的飽和與壓縮', status: 'verified' },
  { id: 'kf-tube-drive', name: 'Tube Drive', engine: 'knobfx', category: '破壞', what: '真空管式的溫暖過載', status: 'verified' },
  { id: 'kf-transient', name: 'Transient', engine: 'knobfx', category: '動態', what: '調整聲音開頭的衝擊力', status: 'verified' },
  { id: 'kf-limiter', name: 'Limiter', engine: 'knobfx', category: '動態', what: '壓住尖峰，不讓音量爆掉', status: 'verified' },
  { id: 'kf-bus', name: 'Bus Compressor', engine: 'knobfx', category: '動態', what: '把整體音量壓得更黏、更有推力', status: 'verified' },
];

export const fxEntries: FxEntry[] = [...padFx, ...knobFx];

/** 官方手冊寫 Knob FX 共 28 種，本站已核對的數量 */
export const KNOB_FX_TOTAL = 28;
export const KNOB_FX_DOCUMENTED = knobFx.length;
