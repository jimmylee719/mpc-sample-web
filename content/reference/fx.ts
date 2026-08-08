/**
 * 效果字典。
 *
 * 效果名稱、pad 對應、參數名稱與數值範圍引用自官方使用手冊 v1.3.0 (RevA)——這些是事實。
 * 「做什麼用」「什麼時候用」是自己寫的白話說明，沒有翻譯官方描述。
 *
 * Knob FX 共 28 種，已逐一與手冊表格核對，數量與官方宣稱一致。
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
  { id: 'padfx', label: 'Pad FX', note: '用 pad 觸發，按越用力效果越重，套用在整段序列上。同時最多四個' },
  { id: 'knobfx', label: 'Knob FX', note: '用 K1–K3 控制，一次只能開一個，但可以套在任意數量的 pad 上' },
  { id: 'flexbeat', label: 'Flex Beat', note: 'PAD 1 是 EMPTY 不做事，效果在 PAD 2–16，套用在整段序列' },
  { id: 'compressor', label: 'Compressor', note: '讓音量忽大忽小的地方變平均，替聲音加一點推力' },
];

/** Pad FX：16 顆 pad 對應 16 種效果 */
export const padFx: FxEntry[] = [
  { id: 'half-speed', pad: 1, name: 'Half Speed', engine: 'padfx', category: '時間', what: '把聲音放慢播放', when: '想做出下沉、拖慢的轉場', params: [{ knob: 'K1', name: 'Speed', range: 'x1.5, x2, x4' }, { knob: 'K2', name: 'Mix', range: '0–100%' }], status: 'verified' },
  { id: 'chorus', pad: 2, name: 'Chorus', engine: 'padfx', category: '調變', what: '讓聲音聽起來像有好幾層疊在一起', when: '想把單薄的旋律變厚', params: [{ knob: 'K1', name: 'Rate', range: '0.40–3.20 Hz' }, { knob: 'K2', name: 'Depth', range: '0–100%' }, { knob: 'K3', name: 'Feedback', range: '0–100%' }], status: 'verified' },
  { id: 'flanger', pad: 3, name: 'Flanger', engine: 'padfx', category: '調變', what: '製造像噴射機掠過的呼嘯感', when: '過門或段落交接', params: [{ knob: 'K1', name: 'Rate', range: '0.02–10.00 Hz' }, { knob: 'K2', name: 'Depth', range: '0–100%' }, { knob: 'K3', name: 'Feedback', range: '0–100%' }], status: 'verified' },
  { id: 'phaser-pad', pad: 4, name: 'Phaser', engine: 'padfx', category: '調變', what: '讓聲音來回掃動，比 Flanger 溫和', when: '想要持續的律動感', params: [{ knob: 'K1', name: 'Feedback', range: '0–100%' }, { knob: 'K2', name: 'Speed', range: '2 bars, 1 bar, 1/2 … 1/64' }, { knob: 'K3', name: 'Range', range: '0–100%' }], status: 'verified' },
  { id: 'comb-filter', pad: 5, name: 'Comb Filter', engine: 'padfx', category: '濾波', what: '在頻率上挖出一排凹槽，聲音變金屬感', when: '想把素材弄得不像原本的東西', params: [{ knob: 'K1', name: 'Speed', range: '2 bars, 1 bar, 1/2 … 1/64' }], status: 'verified' },
  { id: 'lp-filter-pad', pad: 6, name: 'LP Filter', engine: 'padfx', category: '濾波', what: '低通：留下低頻，砍掉高頻', when: '做 build-up，或把段落推到背景', status: 'verified' },
  { id: 'hp-filter-pad', pad: 7, name: 'HP Filter', engine: 'padfx', category: '濾波', what: '高通：留下高頻，砍掉低頻', when: '想讓大鼓暫時消失', status: 'verified' },
  { id: 'bp-filter-pad', pad: 8, name: 'BP Filter', engine: 'padfx', category: '濾波', what: '帶通：只留中間一段頻率', when: '模擬電話或收音機的音色', status: 'verified' },
  { id: 'ring-mod', pad: 9, name: 'Ring Mod', engine: 'padfx', category: '調變', what: '把聲音變成金屬、鈴聲般的怪音', when: '想要明顯的破壞感', status: 'verified' },
  { id: 'lofi', pad: 10, name: 'LoFi', engine: 'padfx', category: '破壞', what: '降低位元與取樣率，聲音變粗糙', when: 'Lo-fi Hip Hop 的招牌音色', status: 'verified' },
  { id: 'color', pad: 11, name: 'Color', engine: 'padfx', category: '破壞', what: '改變音色的整體染色', when: '想快速換一種氣氛', status: 'verified' },
  { id: 'granulator', pad: 12, name: 'Granulator', engine: 'padfx', category: '破壞', what: '把聲音切成極小顆粒再重組', when: '做氛圍或碎裂效果', status: 'verified' },
  { id: 'beat-repeat', pad: 13, name: 'Beat Repeat', engine: 'padfx', category: '時間', what: '把當下這一小段不斷重複', when: '段落結尾的結巴式過門', status: 'verified' },
  { id: 'rev-stepper', pad: 14, name: 'Rev Stepper', engine: 'padfx', category: '時間', what: '一段一段倒著播', when: '想製造往回捲的感覺', status: 'verified' },
  { id: 'delay-pad', pad: 15, name: 'Delay', engine: 'padfx', category: '空間', what: '加上回聲', when: '幾乎所有轉場都用得到', params: [{ knob: 'K1', name: 'Time', range: '1/1, 1/2, 1/4d, 1/4, 1/4t, 1/8d, 1/8, 1/8t, 1/16d, 1/16…' }], status: 'verified' },
  { id: 'reverb-pad', pad: 16, name: 'Reverb', engine: 'padfx', category: '空間', what: '加上空間殘響', when: '想讓聲音退到遠處', status: 'verified' },
];

/** Knob FX：官方手冊表格共 28 種，以下已全數核對 */
export const knobFx: FxEntry[] = [
  // ── 延遲 ──
  { id: 'kf-delay', name: 'Delay', engine: 'knobfx', category: '延遲', what: '基本回聲，可以跟著速度對拍', params: [{ knob: 'K1', name: 'Time', range: 'Sync 開：1/32 … 8/4；Sync 關：1 ms–2.00 s' }, { knob: 'K2', name: 'Feedback', range: '0–100%' }, { knob: 'K3', name: 'Mix', range: '0–100%' }, { knob: 'SHIFT+K1', name: 'Sync', range: 'Off, On' }, { knob: 'SHIFT+K2', name: 'Damping', range: '1.00–20.0 kHz' }, { knob: 'SHIFT+K3', name: 'Width', range: '0–100%' }], status: 'verified' },
  { id: 'kf-diff-delay', name: 'Diff Delay', engine: 'knobfx', category: '延遲', what: '回聲會擴散開，像在有殘響的房間裡', params: [{ knob: 'K1', name: 'Time', range: 'Sync 開：1/64 … 4/4；Sync 關：1–1000 ms' }, { knob: 'K2', name: 'Feedback', range: '0–100%' }, { knob: 'K3', name: 'Mix', range: '0–100%' }, { knob: 'SHIFT+K1', name: 'Sync', range: 'Off, On' }, { knob: 'SHIFT+K2', name: 'Diffusion', range: '0–100%' }, { knob: 'SHIFT+K3', name: 'High Damp', range: '0–100%' }], status: 'verified' },
  { id: 'kf-tape-delay', name: 'Tape Delay', engine: 'knobfx', category: '延遲', what: '模擬盤帶回聲，帶有抖動與老化感', params: [{ knob: 'K1', name: 'Time', range: '1, 1/2, 1/2., 1/4, 1/4., 1/8, 1/8., 1/16, 1/16.' }, { knob: 'K2', name: 'Feedback', range: '0–100' }, { knob: 'K3', name: 'Mix', range: '0–100' }, { knob: 'SHIFT+K1', name: 'Wow/Flut', range: '0–100' }, { knob: 'SHIFT+K2', name: 'Ramp', range: '0–100' }, { knob: 'SHIFT+K3', name: 'Spread', range: '0–100' }], status: 'verified' },
  { id: 'kf-sample-delay', name: 'Sample Delay', engine: 'knobfx', category: '延遲', what: '左右聲道各延遲一點點，讓聲音變寬', when: '打擊樂器聽起來太集中在正中間時', params: [{ knob: 'K1', name: 'Left', range: '0.0–250.0 ms' }, { knob: 'K2', name: 'Right', range: '0.0–250.0 ms' }], status: 'verified' },

  // ── 調變 ──
  { id: 'kf-phaser', name: 'Phaser', engine: 'knobfx', category: '調變', what: '讓聲音來回掃動，有四種經典機型可選', params: [{ knob: 'K1', name: 'Rate', range: '0.10–10.00 Hz' }, { knob: 'SHIFT+K1', name: 'Type', range: 'Vibe, Stone, Ninety, Tron' }, { knob: 'SHIFT+K2', name: 'Feedback', range: '0–100%' }], status: 'verified' },
  { id: 'kf-flanger', name: 'Flanger', engine: 'knobfx', category: '調變', what: '短延遲造成的呼嘯感', params: [{ knob: 'K1', name: 'Rate', range: '0.02–10.00 Hz' }], status: 'verified' },
  { id: 'kf-ensemble', name: 'Ensemble', engine: 'knobfx', category: '調變', what: '流動、閃爍的調變，比 Chorus 更綿密', params: [{ knob: 'K1', name: 'Rate', range: '0.1–10.0 Hz' }, { knob: 'SHIFT+K1', name: 'Delay', range: '0.00–24.00 ms' }, { knob: 'SHIFT+K2', name: 'Shimmer', range: '0–100%' }, { knob: 'SHIFT+K3', name: 'Width', range: '0–100%' }], status: 'verified' },
  { id: 'kf-multi-chorus', name: 'Multi-Chorus', engine: 'knobfx', category: '調變', what: '厚重的多層 chorus，可選三、四或六層', params: [{ knob: 'K1', name: 'Rate', range: '0.1–10.0 Hz' }, { knob: 'K2', name: 'Depth', range: '0.00–24.00 ms' }, { knob: 'K3', name: 'Mix', range: '0–100%' }, { knob: 'SHIFT+K1', name: 'Voices', range: '3, 4, 6' }, { knob: 'SHIFT+K2', name: 'Delay', range: '0.00–24.00 ms' }], status: 'verified' },
  { id: 'kf-auto-wah', name: 'Auto-Wah', engine: 'knobfx', category: '濾波', what: '會自己哇哇叫的低通濾波，由音量大小觸發', when: '想要放克味的律動', params: [{ knob: 'K1', name: 'Sens', range: '0–100' }, { knob: 'SHIFT+K2', name: 'Attack', range: '0–100' }, { knob: 'SHIFT+K3', name: 'Release', range: '0–100' }], status: 'verified' },
  { id: 'kf-auto-pan', name: 'Auto-Pan', engine: 'knobfx', category: '空間', what: '聲音自動在左右之間來回移動', params: [{ knob: 'K1', name: 'Rate', range: '0–100' }, { knob: 'K3', name: 'Mix', range: '0–100' }], status: 'verified' },

  // ── 復古模擬 ──
  { id: 'kf-vintage', name: 'Vintage Emulator', engine: 'knobfx', category: '復古', what: '模擬四台經典取樣機的音色', when: '想要 boom bap 或 SP1200 的顆粒感', params: [{ knob: 'K1', name: 'Type', range: 'MPC3000, MPC60, SP1200, SP1200Ring' }], status: 'verified' },
  { id: 'kf-vinyl', name: 'Vinyl Emulator', engine: 'knobfx', category: '復古', what: '模擬黑膠唱片的音色與雜訊', when: 'Lo-fi 曲風幾乎必用', params: [{ knob: 'K1', name: 'Tone', range: '0–100' }, { knob: 'K2', name: 'Crackle', range: '0–100%' }, { knob: 'K3', name: 'Pitch', range: '10–100%' }], status: 'verified' },
  { id: 'kf-tape', name: 'Tape Emulator', engine: 'knobfx', category: '復古', what: '模擬卡帶的抖動與底噪', params: [{ knob: 'K1', name: 'Wow', range: '10–100%' }, { knob: 'K2', name: 'Noise', range: '10–100%' }, { knob: 'K3', name: 'Pitch', range: '20–100%' }], status: 'verified' },

  // ── 破壞與飽和 ──
  { id: 'kf-amp-sim', name: 'Amp Sim', engine: 'knobfx', category: '破壞', what: '模擬吉他與貝斯音箱，附箱體選擇與三段等化', params: [{ knob: 'K1', name: 'Cab Model', range: 'D.I., Brit, 1x8", 1x12", 2x10"…' }, { knob: 'SHIFT+K1', name: 'Bass', range: '−12.0–12.0 dB' }, { knob: 'SHIFT+K2', name: 'Mid', range: '−12.0–12.0 dB' }, { knob: 'SHIFT+K3', name: 'Treble', range: '−12.0–12.0 dB' }], status: 'verified' },
  { id: 'kf-tube-drive', name: 'Tube Drive', engine: 'knobfx', category: '破壞', what: '真空管式的溫暖過載', params: [{ knob: 'K1', name: 'Drive', range: '0–100%' }, { knob: 'K2', name: 'Headroom', range: '−30.0–0.0 dB' }, { knob: 'K3', name: 'Saturation', range: '0–100%' }], status: 'verified' },
  { id: 'kf-soft-clipper', name: 'Soft Clipper', engine: 'knobfx', category: '破壞', what: '從輕微溫暖到粗暴破音的一整條光譜', params: [{ knob: 'K1', name: 'Drive', range: '1.0–10000.0%' }, { knob: 'SHIFT+K1', name: 'Peak', range: 'Off, On' }, { knob: 'SHIFT+K2', name: 'Rel Time', range: '0.1–100.0 ms' }, { knob: 'SHIFT+K3', name: 'Post Lvl', range: '−Inf, −80.0–0.0 dB' }], status: 'verified' },

  // ── 空間 ──
  { id: 'kf-reverb-small', name: 'Reverb Small', engine: 'knobfx', category: '空間', what: '小空間殘響，像在一間小房間裡', params: [{ knob: 'K1', name: 'Pre-Delay', range: '0–250 ms' }, { knob: 'SHIFT+K1', name: 'ER/Tail Mix', range: '0–100%' }, { knob: 'SHIFT+K2', name: 'Density', range: '0–100%' }, { knob: 'SHIFT+K3', name: 'Low Cut', range: '1–1000 Hz' }], status: 'verified' },
  { id: 'kf-reverb-medium', name: 'Reverb Medium', engine: 'knobfx', category: '空間', what: '中等空間殘響。三種 Reverb 的參數完全相同，差別在空間大小', params: [{ knob: 'K1', name: 'Pre-Delay', range: '0–250 ms' }, { knob: 'SHIFT+K1', name: 'ER/Tail Mix', range: '0–100%' }, { knob: 'SHIFT+K2', name: 'Density', range: '0–100%' }, { knob: 'SHIFT+K3', name: 'Low Cut', range: '1–1000 Hz' }], status: 'verified' },
  { id: 'kf-reverb-large', name: 'Reverb Large', engine: 'knobfx', category: '空間', what: '大空間殘響，像在演奏廳裡', params: [{ knob: 'K1', name: 'Pre-Delay', range: '0–250 ms' }, { knob: 'SHIFT+K1', name: 'ER/Tail Mix', range: '0–100%' }, { knob: 'SHIFT+K2', name: 'Density', range: '0–100%' }, { knob: 'SHIFT+K3', name: 'Low Cut', range: '1–1000 Hz' }], status: 'verified' },
  { id: 'kf-spring-reverb', name: 'Spring Reverb', engine: 'knobfx', category: '空間', what: '模擬彈簧殘響，有金屬彈跳的味道', params: [{ knob: 'K1', name: 'Pre-Delay', range: '0–250 ms' }, { knob: 'SHIFT+K2', name: 'Diffusion', range: '0–100%' }, { knob: 'SHIFT+K3', name: 'Low Cut', range: '20.0 Hz–1.00 kHz' }], status: 'verified' },

  // ── 濾波 ──
  { id: 'kf-hp-filter', name: 'HP Filter', engine: 'knobfx', category: '濾波', what: '高通：砍掉截止點以下的低頻', params: [{ knob: 'K1', name: 'Frequency', range: '10–19999 Hz' }, { knob: 'K2', name: 'Resonance', range: '0–100' }], status: 'verified' },
  { id: 'kf-lp-filter', name: 'LP Filter', engine: 'knobfx', category: '濾波', what: '低通：砍掉截止點以上的高頻', params: [{ knob: 'K1', name: 'Frequency', range: '22–19999 Hz' }, { knob: 'K2', name: 'Resonance', range: '0–100' }], status: 'verified' },
  { id: 'kf-bp-filter', name: 'BP Filter', engine: 'knobfx', category: '濾波', what: '帶通：只留中間一段，上下都砍掉', params: [{ knob: 'K1', name: 'Frequency', range: '55.0 Hz–20.0 kHz' }, { knob: 'K2', name: 'Resonance', range: '0.7–20.0' }], status: 'verified' },

  // ── 動態 ──
  { id: 'kf-transient', name: 'Transient', engine: 'knobfx', category: '動態', what: '調整聲音開頭的衝擊力與尾巴的長度', when: '大鼓不夠有力，或小鼓尾巴太長', params: [{ knob: 'K1', name: 'Attack', range: '−100–+100%' }, { knob: 'K2', name: 'Shape', range: '0–100%' }, { knob: 'K3', name: 'Sustain', range: '−100–+100%' }], status: 'verified' },
  { id: 'kf-noise-gate', name: 'Noise Gate', engine: 'knobfx', category: '動態', what: '音量低於門檻的部分自動壓下去', when: '想清掉錄音裡的環境底噪', params: [{ knob: 'K1', name: 'Threshold', range: '−120.0–0.0 dB' }, { knob: 'SHIFT+K3', name: 'Release', range: '1.00–3000.00 ms' }], status: 'verified' },
  { id: 'kf-bus-compressor', name: 'Bus Compressor', engine: 'knobfx', category: '動態', what: '透明的壓縮器，大幅調整音量也不容易出怪聲', params: [{ knob: 'K1', name: 'Attack', range: '0–100' }, { knob: 'SHIFT+K2', name: 'Output', range: '−6–24' }, { knob: 'SHIFT+K3', name: 'Mix', range: '0–100' }], status: 'verified' },
  { id: 'kf-limiter', name: 'Limiter', engine: 'knobfx', category: '動態', what: '整體推大聲，但尖峰被壓在天花板下', when: '機上母帶的最後一道', params: [{ knob: 'K1', name: 'Gain', range: '−12.0–36.0 dB' }, { knob: 'K2', name: 'Ceiling', range: '−24.0–0.0 dB' }, { knob: 'K3', name: 'Release', range: '10.0 ms–10.0 s' }], status: 'verified' },
  { id: 'kf-pumper', name: 'Pumper', engine: 'knobfx', category: '動態', what: '做出規律的抽吸感，效果類似側鏈壓縮', when: '這台機器沒有側鏈，想要大鼓一響其他變小聲就用它', params: [{ knob: 'K1', name: 'Speed', range: 'Bar, 1/2, 1/2T, 1/4, 1/4T, 1/8…' }], status: 'verified' },
];

export const fxEntries: FxEntry[] = [...padFx, ...knobFx];

/** 官方手冊列出 28 種 Knob FX，本站已全數核對 */
export const KNOB_FX_TOTAL = 28;
export const KNOB_FX_DOCUMENTED = knobFx.length;
