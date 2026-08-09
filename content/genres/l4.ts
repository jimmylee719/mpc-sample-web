import type { Genre } from '@/types/genre';

/**
 * L4：機上難以完整實現。
 *
 * 這一級的頁面開頭一定要先講清楚做不完整，並說明做到哪裡為止、之後怎麼接。
 * 驗證腳本會強制 level 為 L4 時 limitation 必填。
 */

const COMMON = {
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA)：效果名稱與參數、單 kit 限制',
    'Pad 配置與 resample 規劃為本站編排建議',
  ],
};

export const rnb: Genre = {
  ...COMMON,
  slug: 'rnb',
  title: 'R&B',
  titleEn: 'R&B',
  level: 'L4',
  tagline: '和聲層次多、人聲是主角。機上只能做到伴奏骨架。',
  limitation:
    '這台機器沒辦法在同一個專案裡好好處理多軌人聲。R&B 的重點是主唱加上多層和聲，那需要分軌錄音與逐軌處理，這台做不到。你在機上能完成的是完整的伴奏：鼓、貝斯、和弦、氛圍。人聲請另外處理，之後再把兩邊合起來。',
  intro: {
    body: 'R&B 的靈魂在人聲與和聲。這台機器可以把伴奏做到很完整，但人聲多軌處理超出它的能力。先把伴奏做好，這件事它做得非常好。',
  },
  tempo: { bpmMin: 60, bpmMax: 90, grid: '1/16', note: '大量使用 swing 與細微的時間推移' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Snare', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Hi-hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '和弦 1–4', source: '自錄電鋼琴，一個 pad 一個和弦' },
    { bank: 'A', pad: 'p9', role: 'Bass', source: '自錄' },
    { bank: 'A', pad: 'p13', role: '氛圍層', source: '自錄環境音或長音' },
  ],
  drums: [
    { name: 'Kick', timing: '疏，留很多空間', character: '圓、低' },
    { name: 'Snare', timing: '第 2、4 拍，稍微晚一點點', character: '厚、有房間感', tip: '用 Step Edit 的推桿把小鼓往後推一點，人味就出來了' },
    { name: 'Hi-hat', timing: '十六分，力度變化大', character: '柔' },
    { name: 'Ghost note', timing: '小鼓前後的極輕音', character: '幾乎聽不見', tip: '這些聽不見的音才是 R&B 的律動來源' },
  ],
  samples: [
    { kind: 'self-record', what: '電鋼琴和弦', how: '一個 pad 錄一個和弦，之後用序列排出進行' },
    { kind: 'self-record', what: '貝斯', how: '哼或彈都行，重點是要有滑音的感覺' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit' },
  ],
  resamples: [
    { pass: 1, what: '鼓組收成一顆', frees: '空出 pad 給和弦與貝斯' },
    { pass: 2, what: '和弦進行收成一顆', frees: '空出 pad 做段落變化' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Reverb Medium', setting: '給小鼓與和弦', why: 'R&B 需要空間，但不要太大' },
    { engine: 'knobfx', name: 'Bus Compressor', setting: 'Attack 慢', why: '保住鼓的衝擊，同時把整體黏住' },
    { engine: 'knobfx', name: 'LP Filter', setting: '氛圍層上壓高頻', why: '讓氛圍退到後面去' },
    { engine: 'compressor', name: '內建壓縮器', setting: '輕壓', why: '整體動態收一點' },
  ],
  checkpoints: [
    '伴奏本身聽起來就完整',
    '小鼓有刻意的時間推移',
    '有聽得出來的 ghost note',
    '你清楚人聲要在哪裡另外處理',
  ],
};

export const neoSoul: Genre = {
  ...COMMON,
  slug: 'neo-soul',
  title: 'Neo Soul',
  titleEn: 'Neo Soul',
  level: 'L4',
  tagline: '複雜和聲加上鬆散的鼓。機上能做骨架，和聲的細節會受限。',
  limitation:
    'Neo Soul 的和弦通常有五到七個音，而且會不斷變化。這台機器一個 pad 一個和弦，換和弦就要多一顆 pad，四個和弦就吃掉四顆。真正的 Neo Soul 一段可能有八到十二個和弦，pad 會不夠用。你可以做到四到六個和弦的版本，那已經很完整了。要更多層次就得靠 resample，或另外處理。',
  intro: {
    body: 'Neo Soul 的和弦很厚，鼓卻很鬆。兩者的拉扯就是這個曲風的味道。在這台機器上，和弦數量是主要限制。',
  },
  tempo: { bpmMin: 70, bpmMax: 90, grid: '1/16', note: 'Swing 開得多，鼓刻意不對齊' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Snare', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Hi-hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '和弦 1–6', source: '自錄電鋼琴，一個 pad 一個和弦' },
    { bank: 'A', pad: 'p13', role: 'Bass', source: '自錄' },
    { bank: 'B', pad: 'p1', role: '第一次 resample：鼓組', source: 'Resample 產物' },
  ],
  drums: [
    { name: 'Kick', timing: '刻意不對齊格子', character: '悶、圓' },
    { name: 'Snare', timing: '第 2、4 拍，明顯偏晚', character: '厚、鬆', tip: '把量化關掉，直接手彈，錯位就是味道' },
    { name: 'Hi-hat', timing: '十六分，力度起伏大', character: '柔' },
  ],
  samples: [
    { kind: 'self-record', what: '電鋼琴和弦', how: '每個和弦錄成一個 pad，先規劃好要用幾個' },
    { kind: 'self-record', what: '貝斯', how: '要有滑音與空隙，不要每一拍都彈' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit' },
  ],
  resamples: [
    { pass: 1, what: '鼓組收成一顆', frees: '空出 pad 給更多和弦' },
    { pass: 2, what: '前半段和弦進行收成一顆', frees: '空出 pad 給後半段的和弦' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Tape Emulator', setting: 'Wow 開一點', why: '讓和弦有微微的不穩，像真的樂器' },
    { engine: 'knobfx', name: 'Reverb Small', setting: '短殘響', why: '房間感，不是大廳' },
    { engine: 'knobfx', name: 'Transient', setting: 'K3 Sustain 拉長', why: '讓和弦的尾巴留久一點' },
    { engine: 'knobfx', name: 'Bus Compressor', setting: '輕', why: '不要壓掉動態，這個曲風靠動態說話' },
  ],
  checkpoints: [
    '鼓明顯沒有對齊格子',
    '至少有四個不同的和弦',
    '貝斯有留白，不是每拍都彈',
    '你知道 pad 用完之後要怎麼 resample',
  ],
};

export const pop: Genre = {
  ...COMMON,
  slug: 'pop',
  title: 'Pop 流行',
  titleEn: 'Pop',
  level: 'L4',
  tagline: '層數多、段落多、人聲是核心。機上做 demo 很好，做成品會卡。',
  limitation:
    '完整的流行歌通常有主歌、副歌、橋段，每一段的配器都不一樣，還要加上多軌人聲。這台機器 Song Mode 沒有分軌，只能整首混音或轉成序列，所以做到最後很難再回頭修改個別樂器。它非常適合把想法快速做成 demo，之後要做成成品，建議把各段落分別匯出再另外處理。',
  intro: {
    body: '流行歌的重點是段落之間的對比與人聲。這台機器做 demo 非常快，一個下午就能把想法變成聽得懂的東西。但要做到發行等級，段落與人聲的處理會超出它的範圍。',
  },
  tempo: { bpmMin: 100, bpmMax: 120, grid: '1/16' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Clap', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Hi-hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '和弦 1–4', source: '自錄' },
    { bank: 'A', pad: 'p9', role: '主旋律動機', source: '自錄' },
    { bank: 'A', pad: 'p13', role: 'Bass', source: '自錄' },
    { bank: 'B', pad: 'p1', role: '主歌 resample', source: 'Resample 產物' },
    { bank: 'B', pad: 'p2', role: '副歌 resample', source: 'Resample 產物' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1、3 拍為主', character: '飽滿' },
    { name: 'Clap', timing: '第 2、4 拍', character: '寬', tip: '副歌時再加一層讓它變大' },
    { name: 'Hi-hat', timing: '八分或十六分', character: '亮' },
  ],
  samples: [
    { kind: 'self-record', what: '和弦與旋律動機', how: '四個和弦加一句旋律，就足以撐起一首 demo' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit' },
    { kind: 'paid-pack', what: '進階音色', how: '要發行的話，買之前確認授權涵蓋商業用途' },
  ],
  resamples: [
    { pass: 1, what: '鼓組收成一顆', frees: '空出 pad 給和弦與旋律' },
    { pass: 2, what: '主歌整段收成一顆', frees: '空出 pad 做副歌' },
    { pass: 3, what: '副歌整段收成一顆', frees: '空出 pad 做橋段與收尾' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Reverb Medium', setting: '副歌加重', why: '副歌要比主歌寬，這是最簡單的做法' },
    { engine: 'knobfx', name: 'HP Filter', setting: '主歌壓掉一點低頻', why: '副歌把低頻放回來，落差就出來了' },
    { engine: 'knobfx', name: 'Limiter', setting: '最後一道', why: '整體音量拉齊' },
    { engine: 'knobfx', name: 'Multi-Chorus', setting: '和弦上輕加', why: '讓和弦更寬，襯托旋律' },
  ],
  checkpoints: [
    '主歌與副歌聽得出明顯落差',
    '整首有至少三個段落',
    '你知道這是 demo，不是成品',
    '各段落已經分別匯出備份',
  ],
};

export const cityPop: Genre = {
  ...COMMON,
  slug: 'city-pop',
  title: 'City Pop',
  titleEn: 'City Pop',
  level: 'L4',
  tagline: '和弦厚、樂器多、編曲滿。機上能做骨架，滿編做不出來。',
  limitation:
    'City Pop 的特色是編曲很滿：厚和弦、貝斯獨立走線、電鋼琴、吉他、銅管、合成器主奏，還有多層和聲。這台機器一個 pad 一個聲音，光和弦就會吃掉四到六顆，再加上其他樂器根本不夠。你在機上能做出很完整的骨架：鼓、貝斯、四到六個和弦、一段主旋律。銅管與多層和聲請另外處理。做完記得把各段落分別匯出，之後才好接。',
  intro: {
    body: 'City Pop 聽起來輕鬆，做起來很滿。它的和弦比一般流行歌複雜，樂器也多。這台機器適合把它的骨架快速做出來，但要做到原汁原味的滿編，pad 會先用完。',
  },
  tempo: { bpmMin: 95, bpmMax: 120, grid: '1/16', note: '節奏乾淨俐落，Swing 不要開太多' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Snare', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Closed Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p4', role: 'Open Hat 或 Ride', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '和弦 1–6', source: '自錄電鋼琴，一個 pad 一個和弦' },
    { bank: 'A', pad: 'p13', role: 'Bass', source: '自錄，要有走動感' },
    { bank: 'B', pad: 'p1', role: '第一次 resample：鼓組', source: 'Resample 產物' },
    { bank: 'B', pad: 'p2', role: '第二次 resample：和弦進行', source: 'Resample 產物' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1、3 拍為主', character: '緊、乾淨' },
    { name: 'Snare', timing: '第 2、4 拍，位置準', character: '亮、有房間感', tip: '這個曲風的鼓要準，不要刻意推移' },
    { name: 'Hi-hat / Ride', timing: '八分音符持續', character: '亮、細' },
    { name: 'Bass', timing: '一直在走，很少停', character: '圓潤、有滑音', tip: '貝斯是 City Pop 的第二主角，不要只放根音' },
  ],
  samples: [
    { kind: 'self-record', what: '電鋼琴和弦', how: '一個和弦錄成一個 pad，先決定要用幾個再開始' },
    { kind: 'self-record', what: '貝斯走線', how: '要有經過音與滑音，不能只彈根音' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit，選乾淨明亮的' },
  ],
  resamples: [
    { pass: 1, what: '鼓組四顆收成一顆', frees: '空出 pad 給更多和弦' },
    { pass: 2, what: '和弦進行收成一顆', frees: '空出 pad 給主旋律與變化' },
    { pass: 3, what: '整段收成一顆', frees: '空出整個 Bank 做副歌' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Multi-Chorus', setting: '給電鋼琴，K1 Rate 慢', why: '八零年代的厚度就是靠這個' },
    { engine: 'knobfx', name: 'Reverb Medium', setting: '給小鼓與和弦', why: '空間要開，但不能糊' },
    { engine: 'knobfx', name: 'Tape Emulator', setting: 'K1 Wow 開一點點', why: '一點點類比的不穩，年代感就出來了' },
    { engine: 'knobfx', name: 'Bus Compressor', setting: '輕壓', why: '把層次黏起來但保住動態' },
  ],
  checkpoints: [
    '貝斯有走動，不是只放根音',
    '和弦至少四個，聽得出色彩變化',
    '鼓的位置準，沒有刻意推移',
    '你清楚哪些樂器要另外處理',
  ],
};

export const l4Genres: Genre[] = [rnb, neoSoul, pop, cityPop];
