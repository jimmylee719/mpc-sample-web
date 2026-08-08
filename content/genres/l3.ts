import type { Genre } from '@/types/genre';

/** L3：需要 3 次以上 resample，pad 預算會吃緊，一定要先規劃再動手。 */

const COMMON = {
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA)：效果名稱、參數、16 Levels 的 Tune 型式',
    'Pad 配置與 resample 規劃為本站編排建議',
  ],
};

export const edm: Genre = {
  ...COMMON,
  slug: 'edm',
  title: 'EDM 電子舞曲',
  titleEn: 'EDM',
  level: 'L3',
  tagline: '層數多、動態大。這台機器做得出來，但你要很會分配 pad。',
  intro: {
    body: 'EDM 的難處不是節奏，是層數。一個 drop 可能同時有六七層聲音。這台機器一次只有 16 顆 pad，所以要靠 resample 一層一層收起來。',
  },
  tempo: { bpmMin: 126, bpmMax: 130, grid: '1/16' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Clap', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Hi-hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '和弦層', source: '自錄合成音或電鋼琴' },
    { bank: 'A', pad: 'p9', role: '主旋律', source: '自錄' },
    { bank: 'B', pad: 'p1', role: '第一次 resample：鼓組', source: 'Resample 產物' },
    { bank: 'B', pad: 'p2', role: '第二次 resample：和弦加旋律', source: 'Resample 產物' },
    { bank: 'B', pad: 'p3', role: '第三次 resample：完整 drop', source: 'Resample 產物' },
    { bank: 'B', pad: 'p9', role: 'Build-up 素材', source: '自錄 riser 或用濾波做' },
  ],
  drums: [
    { name: 'Kick', timing: '每一拍', character: '長、飽滿、低頻多' },
    { name: 'Clap', timing: '第 2、4 拍', character: '寬、有殘響' },
    { name: 'Hi-hat', timing: '反拍', character: '亮' },
    { name: 'Crash', timing: '每八小節的第一拍', character: '長尾巴', tip: '段落交接處一定要有，不然聽起來會斷掉' },
  ],
  samples: [
    { kind: 'self-record', what: '和弦與旋律', how: '自己彈進去最快，也不會有授權問題' },
    { kind: 'self-record', what: 'Riser 上升音', how: '哼一個往上的長音，再用 Warp 拉長' },
    { kind: 'paid-pack', what: '專業鼓組', how: '確認授權涵蓋商業發行再買' },
  ],
  resamples: [
    { pass: 1, what: '鼓組三顆收成一顆', frees: '空出 13 顆做和弦與旋律' },
    { pass: 2, what: '和弦加主旋律收成一顆', frees: '空出 pad 做 build-up 與效果層' },
    { pass: 3, what: '整段 drop 收成一顆', frees: '空出整個 Bank 做副歌與收尾' },
  ],
  fx: [
    { engine: 'knobfx', name: 'HP Filter', setting: 'Build-up 時 K1 Frequency 一路往上', why: 'EDM 的 build-up 就是這一顆旋鈕' },
    { engine: 'knobfx', name: 'Reverb Large', setting: 'Build-up 尾端加重', why: '製造空間被撐開的錯覺' },
    { engine: 'knobfx', name: 'Limiter', setting: 'Drop 段落壓緊', why: '層數多的時候一定會頂爆' },
    { engine: 'knobfx', name: 'Pumper', setting: 'K1 Speed 對到 1/4', why: '沒有側鏈，用它做大鼓推壓效果' },
  ],
  checkpoints: [
    '你在動手前就寫好了 pad 分配',
    '三次 resample 之後 pad 還有剩',
    'Build-up 有明顯的上升感',
    'Drop 進來的瞬間音量沒有爆掉',
  ],
};

export const drumAndBass: Genre = {
  ...COMMON,
  slug: 'drum-and-bass',
  title: 'Drum & Bass',
  titleEn: 'Drum & Bass',
  level: 'L3',
  tagline: '極快的鼓，極慢的低音。兩件事同時發生。',
  intro: {
    body: 'Drum and Bass 的鼓跑得很快，低音卻慢得像另一首歌。這種對比就是它的核心。鼓通常來自一段被切碎再重組的循環。',
  },
  tempo: { bpmMin: 170, bpmMax: 176, grid: '1/16', note: '低音的感覺是速度的一半' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: '鼓循環切片 1–8', source: '自錄打擊樂器，用 Chop 切成八塊' },
    { bank: 'A', pad: 'p9', role: 'Sub 低音', source: '自錄長低音，或把切片大幅調低' },
    { bank: 'A', pad: 'p13', role: '氛圍層', source: '自錄環境音' },
    { bank: 'B', pad: 'p1', role: '第一次 resample：重組後的鼓', source: 'Resample 產物' },
    { bank: 'B', pad: 'p2', role: '第二次 resample：鼓加低音', source: 'Resample 產物' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1 拍與第 3 拍附近，位置刻意偏移', character: '短、緊' },
    { name: 'Snare', timing: '第 3 拍', character: '亮、有殘響', tip: '小鼓落在第三拍，這是 DnB 最好認的特徵' },
    { name: 'Hi-hat / Ghost', timing: '十六分音符，力度很小', character: '細碎', tip: '這些小音符是速度感的來源' },
    { name: 'Sub 低音', timing: '兩小節一個音', character: '極低、極長' },
  ],
  samples: [
    { kind: 'self-record', what: '一段自己打的鼓', how: '拍手加敲桌子錄四小節，用 Chop 切成八塊再重排' },
    { kind: 'self-record', what: '低音長音', how: '哼一個最低的音，用 Warp 拉長' },
    { kind: 'cc0', what: '氛圍墊', how: 'CC0 素材，保留授權頁面' },
  ],
  resamples: [
    { pass: 1, what: '重組後的鼓循環收成一顆', frees: '空出切片用的八顆 pad' },
    { pass: 2, what: '鼓加低音收成一顆', frees: '空出 pad 做氛圍與段落變化' },
    { pass: 3, what: '整段收成一顆', frees: '空出整個 Bank 做第二段落' },
  ],
  fx: [
    { engine: 'knobfx', name: 'LP Filter', setting: '低音上壓掉高頻', why: 'Sub 只需要低頻，其他都是雜訊' },
    { engine: 'knobfx', name: 'Transient', setting: 'K1 Attack 往正', why: '快速度下每一下都要聽得清楚' },
    { engine: 'padfx', name: 'Beat Repeat', setting: '過門時踩', why: '鼓的結巴是 DnB 的常用手法' },
    { engine: 'knobfx', name: 'Reverb Medium', setting: '只給小鼓', why: '小鼓要有空間，鼓的其他部分要乾' },
  ],
  checkpoints: [
    '小鼓落在第三拍',
    '低音的速度感明顯比鼓慢',
    '鼓的順序跟原始錄音不一樣',
    '有細碎的小音符在中間填縫',
  ],
};

export const amapiano: Genre = {
  ...COMMON,
  slug: 'amapiano',
  title: 'Amapiano',
  titleEn: 'Amapiano',
  level: 'L3',
  tagline: 'Log drum 的滑音低音線，加上大量沙鈴與寬鬆的空間。',
  intro: {
    body: 'Amapiano 最好認的是 log drum。那是一條會滑動的低音旋律，不是單純打拍子。其餘部分很空，靠沙鈴與人聲碎片填。',
  },
  tempo: { bpmMin: 110, bpmMax: 115, grid: '1/16', note: '速度不快，但打擊層很密' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Clap', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Shaker', source: '自錄：米粒罐' },
    { bank: 'A', pad: 'p4', role: 'Rim', source: '自錄' },
    { bank: 'A', pad: 'p5', role: 'Log drum 原始音', source: '自錄低音，或用內建低音音色' },
    { bank: 'A', pad: 'p9', role: '和弦', source: '自錄電鋼琴' },
    { bank: 'B', pad: 'p1', role: '第一次 resample：打擊層', source: 'Resample 產物' },
    { bank: 'B', pad: 'p2', role: '第二次 resample：log drum 樂句', source: 'Resample 產物' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1 拍，加一個切分', character: '圓、不刺' },
    { name: 'Shaker', timing: '十六分音符持續', character: '細碎', tip: '力度起伏是這個曲風的呼吸' },
    { name: 'Rim / Clap', timing: '錯開正拍', character: '乾、短' },
    { name: 'Log drum', timing: '一小節兩到四個音，音高會滑動', character: '很低、有彈性', tip: '這是整首歌的旋律，不是打擊樂器' },
  ],
  samples: [
    { kind: 'self-record', what: '低音音源', how: '哼一個低音，或錄空紙箱的悶響，之後靠調音變成旋律' },
    { kind: 'self-record', what: 'Shaker', how: '米粒裝罐搖，最省事也最乾淨' },
    { kind: 'self-record', what: '電鋼琴和弦', how: '彈四個和弦錄下來' },
  ],
  resamples: [
    { pass: 1, what: '打擊層四顆收成一顆', frees: '空出 12 顆給 log drum 的音高' },
    { pass: 2, what: 'Log drum 樂句收成一顆', frees: '空出 pad 給和弦與人聲' },
    { pass: 3, what: '整段收成一顆', frees: '空出整個 Bank 做段落變化' },
  ],
  fx: [
    { engine: 'knobfx', name: 'LP Filter', setting: 'Log drum 上壓掉高頻', why: '低音要圓，不要有咬耳朵的高頻' },
    { engine: 'knobfx', name: 'Reverb Medium', setting: '給和弦與 Rim', why: 'Amapiano 的空間感很重要' },
    { engine: 'knobfx', name: 'Auto-Pan', setting: 'Shaker 上慢速', why: '讓密集的沙鈴在左右流動' },
    { engine: 'knobfx', name: 'Bus Compressor', setting: '中等', why: '把打擊層黏成一塊' },
  ],
  checkpoints: [
    'Log drum 是一條會動的旋律，不是同一個音重複',
    '沙鈴的力度有明顯起伏',
    '整體聽起來是空的，不是滿的',
    '三次 resample 之後 pad 還有剩',
  ],
  miniPlayer: {
    title: '最難的一步：把 log drum 調成一條旋律',
    steps: [
      {
        ch: 0,
        say: '先敲你放低音的那顆 <b>pad</b>，確認聲音夠低、尾巴夠長。',
        targets: ['p5'],
        screen: { t1: 'A05 Log Drum', wave: 44 },
        hear: '一個低沉的音',
      },
      {
        ch: 0,
        say: '按 <b>16 LEVELS</b>。現在 16 顆 pad 變成同一個聲音的 16 種變化。',
        targets: ['lev16'],
        screen: { t1: '16 LEVELS', tabs: ['Type', '', ''], bots: ['Tune', '', ''] },
        hear: '—',
      },
      {
        ch: 0,
        say: '<b>按住 SHIFT 再按 16 LEVELS</b> 選 Type，把型式切成 <b>Tune</b>。',
        targets: ['lev16'],
        shift: true,
        screen: { t1: 'TYPE   TUNE', tabs: ['Type', '', ''], bots: ['Tune', '', ''] },
        hear: '—',
      },
      {
        ch: 0,
        say: '記住一件事：<b>原始音高在 PAD 4</b>。比它低的在下面，比它高的在上面。',
        targets: ['p4'],
        screen: { t1: 'TUNE   PAD 4 = 原音' },
        hear: '原本的音高',
      },
      {
        ch: 0,
        say: '從 <b>PAD 4</b> 出發，往上下各試幾顆，找出四個好聽的音。',
        targets: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
        screen: { t1: 'TUNE' },
        hear: '同一個聲音的不同音高',
      },
      {
        ch: 0,
        say: '按 <b>SEQ RECORD</b> 再按 <b>PLAY</b>，把那四個音彈成一小節的樂句。',
        targets: ['qrec', 'play'],
        screen: { t1: '● REC   LOG DRUM' },
        hear: '一條會滑動的低音旋律',
        note: {
          kind: 'win',
          title: '這就是 log drum',
          body: '它是旋律，不是節奏。彈的時候想著唱歌，不要想著打拍子。',
        },
      },
    ],
  },
};

export const l3Genres: Genre[] = [edm, drumAndBass, amapiano];
