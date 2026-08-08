import type { Genre } from '@/types/genre';

/** L2：需要 1–2 次 resample。Pad 還夠用，但要開始規劃。 */

const COMMON = {
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA)：效果名稱與參數',
    'Pad 配置與 resample 規劃為本站編排建議',
  ],
};

export const house: Genre = {
  ...COMMON,
  slug: 'house',
  title: 'House 浩室',
  titleEn: 'House',
  level: 'L2',
  tagline: '每一拍都有大鼓，重點在大鼓之間塞什麼。',
  intro: {
    body: 'House 的大鼓落在每一拍，這件事從頭到尾不變。真正決定好不好聽的，是大鼓之間的 Hi-hat 與 Clap。段落靠濾波推上去，不靠加音符。',
  },
  tempo: { bpmMin: 120, bpmMax: 128, grid: '1/16', note: '不加 swing，或只加一點點' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Clap', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Closed Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p4', role: 'Open Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '和弦 Stab', source: '自錄電鋼琴，短促地彈' },
    { bank: 'A', pad: 'p9', role: 'Bass', source: '自錄或把和弦調低八度' },
    { bank: 'B', pad: 'p1', role: '第一次 resample 的鼓組', source: 'Resample 產物' },
  ],
  drums: [
    { name: 'Kick', timing: '每一拍都有，共四下', character: '緊、短、低頻集中', tip: '這是 House 的地基，不要動它' },
    { name: 'Clap', timing: '第 2 拍與第 4 拍', character: '寬、有空間感' },
    { name: 'Open Hat', timing: '每一拍的後半，也就是反拍', character: '略長', tip: '這一顆是 House 的靈魂，比 Clap 還重要' },
    { name: 'Closed Hat', timing: '十六分音符，力度做出強弱', character: '很短' },
  ],
  samples: [
    { kind: 'self-record', what: '短促的和弦 stab', how: '彈下去馬上放開，用 Trim 把尾巴切掉' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit 的 kick 與 clap 直接可用' },
    { kind: 'cc0', what: '人聲片段', how: '一律用 CC0 或自己錄，不要從串流平台錄' },
  ],
  resamples: [
    { pass: 1, what: '鼓組四顆收成一顆 pad', frees: '空出 12 顆給和弦、貝斯、過門' },
    { pass: 2, what: '和弦加貝斯收成一顆 pad', frees: '空出 pad 做第二段落與人聲' },
  ],
  fx: [
    { engine: 'knobfx', name: 'HP Filter', setting: 'K1 Frequency 在 build-up 時往上掃', why: '低頻抽掉再放回來，是 House 最有效的段落手法' },
    { engine: 'knobfx', name: 'Reverb Medium', setting: 'K1 Pre-Delay 給一點', why: '讓 Clap 有空間感，不要貼在臉上' },
    { engine: 'knobfx', name: 'Bus Compressor', setting: 'K1 Attack 偏快', why: '把整體黏成一塊，推力才出得來' },
    { engine: 'padfx', name: 'Delay', setting: '過門時輕點', why: '段落交接處丟一個回聲' },
  ],
  checkpoints: [
    '大鼓每一拍都有，沒有漏',
    'Open Hat 落在反拍上',
    '有一段用濾波做出來的 build-up',
    'Resample 之後 pad 還有剩',
  ],
};

export const techHouse: Genre = {
  ...COMMON,
  slug: 'tech-house',
  title: 'Tech House',
  titleEn: 'Tech House',
  level: 'L2',
  tagline: 'House 的骨架，Techno 的冷。重點全在打擊樂器的縫隙。',
  intro: {
    body: 'Tech House 比 House 更乾、更少東西。旋律很少，甚至沒有。好聽與否取決於打擊樂器的位置，還有低音的律動。',
  },
  tempo: { bpmMin: 122, bpmMax: 128, grid: '1/16' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Clap', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Closed Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p4', role: 'Shaker 或 Rim', source: '自錄：鑰匙、筆敲桌子' },
    { bank: 'A', pad: 'p5', role: 'Bass 律動', source: '自錄貝斯，短促斷奏' },
    { bank: 'A', pad: 'p9', role: '人聲碎片', source: '自錄一個字，切成兩三塊' },
  ],
  drums: [
    { name: 'Kick', timing: '每一拍', character: '比 House 更短更乾' },
    { name: 'Clap', timing: '第 2、4 拍', character: '薄' },
    { name: 'Shaker', timing: '十六分音符，力度變化大', character: '高頻、細碎', tip: '自錄鑰匙串就很好用，而且權利乾淨' },
    { name: 'Bass', timing: '跟大鼓錯開，填空隙', character: '短、有彈性', tip: '低音不要跟大鼓同時響，會打架' },
  ],
  samples: [
    { kind: 'self-record', what: '生活裡的高頻打擊音', how: '鑰匙、原子筆、玻璃杯，用內建麥克風錄' },
    { kind: 'self-record', what: '一個字的人聲', how: '自己講一個字，切片後散在 pad 上' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit' },
  ],
  resamples: [
    { pass: 1, what: '鼓組加 Shaker 收成一顆', frees: '空出 pad 給低音變化與人聲碎片' },
  ],
  fx: [
    { engine: 'knobfx', name: 'BP Filter', setting: 'K1 Frequency 掃中頻', why: '做出像廣播的過門段' },
    { engine: 'knobfx', name: 'Pumper', setting: 'K1 Speed 對到 1/4', why: '整體跟著大鼓呼吸' },
    { engine: 'knobfx', name: 'Sample Delay', setting: 'K1 與 K2 給不同的毫秒數', why: '把 Shaker 推寬，不要都擠在中間' },
    { engine: 'padfx', name: 'HP Filter', setting: '過門時踩重一點', why: '瞬間抽掉低頻' },
  ],
  checkpoints: [
    '低音跟大鼓沒有撞在同一格',
    '打擊樂器有明顯的力度變化',
    '整首沒有長旋律也成立',
    '至少有一個自錄的打擊音',
  ],
};

export const techno: Genre = {
  ...COMMON,
  slug: 'techno',
  title: 'Techno 鐵克諾',
  titleEn: 'Techno',
  level: 'L2',
  tagline: '重複、推進、不解釋。變化靠音色，不靠音符。',
  intro: {
    body: 'Techno 的循環可能八小節都一樣。變化來自濾波、殘響與失真的緩慢移動。做這個曲風要忍得住不加東西。',
  },
  tempo: { bpmMin: 130, bpmMax: 145, grid: '1/16' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit，選最乾的' },
    { bank: 'A', pad: 'p2', role: 'Clap 或 Snare', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Closed Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p4', role: '金屬打擊', source: '自錄：鍋子、鐵架' },
    { bank: 'A', pad: 'p5', role: '低音 drone', source: '自錄長音，或把切片拉長' },
    { bank: 'A', pad: 'p9', role: '氛圍層', source: '自錄環境音經過大量效果' },
  ],
  drums: [
    { name: 'Kick', timing: '每一拍，從頭到尾', character: '短、硬、低頻集中' },
    { name: 'Clap', timing: '第 2、4 拍，有時只留第 4 拍', character: '乾' },
    { name: 'Hi-hat', timing: '反拍或十六分', character: '很短' },
    { name: '金屬打擊', timing: '每兩到四小節出現一次', character: '尖銳、有殘響', tip: '自錄鍋子敲擊，加大殘響就是很好的 Techno 音色' },
  ],
  samples: [
    { kind: 'self-record', what: '金屬敲擊', how: '鍋子、鐵門、腳踏車，錄下來加殘響' },
    { kind: 'self-record', what: '環境長音', how: '冷氣、風扇、車流，是最好的氛圍層來源' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit' },
  ],
  resamples: [
    { pass: 1, what: '鼓組收成一顆', frees: '空出 pad 做氛圍與音色變化' },
    { pass: 2, what: '氛圍層加效果之後收成一顆', frees: '空出 pad 做結尾段落' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Reverb Large', setting: 'K1 Pre-Delay 拉長', why: '把金屬打擊丟進大空間' },
    { engine: 'knobfx', name: 'Tube Drive', setting: 'K1 Drive 中間', why: '讓整體有推力，不要太乾淨' },
    { engine: 'knobfx', name: 'LP Filter', setting: '整段慢慢往上開', why: 'Techno 的變化就是這一顆旋鈕' },
    { engine: 'knobfx', name: 'Delay', setting: 'SHIFT+K1 打開 Sync，對到 1/8', why: '回聲對拍才不會亂' },
  ],
  checkpoints: [
    '循環八小節不加東西也不無聊',
    '有一顆旋鈕的移動貫穿整首',
    '至少有一個自錄的金屬音',
    '大鼓從頭到尾沒有停',
  ],
};

export const jerseyClub: Genre = {
  ...COMMON,
  slug: 'jersey-club',
  title: 'Jersey Club',
  titleEn: 'Jersey Club',
  level: 'L2',
  tagline: '三連的大鼓組合加上人聲碎片，密集又跳。',
  intro: {
    body: 'Jersey Club 最好認的是大鼓的排法：連續幾下擠在一起，形成一個固定的組合。人聲被切得很碎，重複到變成打擊樂器。',
  },
  tempo: { bpmMin: 130, bpmMax: 140, grid: '1/16 與三連音混用' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Snare', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: '床墊吱聲或替代打擊', source: '自錄：椅子、門' },
    { bank: 'A', pad: 'p5', role: '人聲切片 1–8', source: '自錄人聲，用 Chop 切成八塊' },
    { bank: 'A', pad: 'p13', role: 'Bass', source: '自錄' },
  ],
  drums: [
    { name: 'Kick 組合', timing: '每小節固定的擠壓組合，中間留一個空', character: '短、密', tip: '先把組合彈熟，其他都好辦' },
    { name: 'Snare', timing: '組合結束處', character: '乾' },
    { name: '人聲碎片', timing: '十六分音符連打', character: '極短', tip: '用 NOTE REPEAT 打人聲切片，效率最高' },
  ],
  samples: [
    { kind: 'self-record', what: '自己的人聲', how: '講一句話錄進去，用 Chop 切成八塊，這是最安全的做法' },
    { kind: 'self-record', what: '生活音效', how: '椅子聲、關門聲，用來代替傳統的床墊吱聲' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit' },
  ],
  resamples: [
    { pass: 1, what: '大鼓組合收成一顆', frees: '空出 pad 給人聲切片' },
  ],
  fx: [
    { engine: 'padfx', name: 'Beat Repeat', setting: '副歌前踩重', why: '把碎片再切得更碎' },
    { engine: 'knobfx', name: 'HP Filter', setting: '過門時往上掃', why: '製造上升感' },
    { engine: 'knobfx', name: 'Limiter', setting: 'K2 Ceiling 壓下來', why: '密集的鼓很容易頂爆' },
    { engine: 'padfx', name: 'Reverb', setting: '人聲切片上輕點', why: '讓碎片不會太乾' },
  ],
  checkpoints: [
    '大鼓組合每小節重複且抓得住',
    '人聲被切成至少八塊',
    '有一段連打過門',
    '整體音量沒有爆掉',
  ],
};

export const footwork: Genre = {
  ...COMMON,
  slug: 'footwork',
  title: 'Footwork',
  titleEn: 'Footwork',
  level: 'L2',
  tagline: '快、空、三連。音符很少，但每一個都在跑。',
  intro: {
    body: 'Footwork 速度很快，但聽起來不擠，因為音符其實不多。它靠三連音與大量留白製造緊張感。人聲通常被切成極短的碎片反覆丟出來。',
  },
  tempo: { bpmMin: 155, bpmMax: 165, grid: '1/16 三連音為主' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Clap', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Rim 或 Conga', source: '自錄敲擊' },
    { bank: 'A', pad: 'p5', role: '人聲切片 1–8', source: '自錄人聲切片' },
    { bank: 'A', pad: 'p13', role: '低音', source: '自錄，長音' },
  ],
  drums: [
    { name: 'Kick', timing: '三連音位置，不落在正拍', character: '短', tip: 'NOTE REPEAT 加 SHIFT 切到三連音' },
    { name: 'Clap', timing: '疏，每兩小節一次', character: '乾' },
    { name: 'Conga / Rim', timing: '填三連音的縫', character: '木質、短' },
    { name: '低音', timing: '長音鋪底，一小節一個', character: '很低、很長' },
  ],
  samples: [
    { kind: 'self-record', what: '極短人聲', how: '錄一個字，切成八塊，只用其中兩三塊' },
    { kind: 'self-record', what: '手拍與敲擊', how: '拍手、敲桌子，加上房間殘響' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit' },
  ],
  resamples: [
    { pass: 1, what: '鼓組收成一顆', frees: '空出 pad 給人聲碎片與低音' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Reverb Small', setting: '短殘響', why: '讓碎片有一點空間但不糊' },
    { engine: 'knobfx', name: 'Transient', setting: 'K1 Attack 往正', why: '快速度下衝擊要清楚' },
    { engine: 'padfx', name: 'Half Speed', setting: '段落交接時踩', why: '瞬間掉速再拉回來' },
    { engine: 'knobfx', name: 'Limiter', setting: '輕壓', why: '控制尖峰' },
  ],
  checkpoints: [
    '節奏是三連音，不是平均的十六分',
    '有明顯留白，不是塞滿',
    '低音長音鋪在下面',
    '人聲碎片短到聽不出原本說什麼',
  ],
};

export const afrobeats: Genre = {
  ...COMMON,
  slug: 'afrobeats',
  title: 'Afrobeats',
  titleEn: 'Afrobeats',
  level: 'L2',
  tagline: '打擊樂器層層交錯，速度不快但一直在動。',
  intro: {
    body: 'Afrobeats 的重點在打擊樂器的交錯。單獨聽每一層都很簡單，疊在一起才產生律動。速度不快，但沒有一刻是靜止的。',
  },
  tempo: { bpmMin: 100, bpmMax: 115, grid: '1/16', note: '重音位置刻意錯開正拍' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Snare 或 Rim', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Shaker', source: '自錄：裝豆子的罐子' },
    { bank: 'A', pad: 'p4', role: 'Conga 高音', source: '自錄手拍或敲擊' },
    { bank: 'A', pad: 'p5', role: 'Conga 低音', source: '自錄' },
    { bank: 'A', pad: 'p9', role: '和弦或吉他 riff', source: '自錄吉他，短促' },
    { bank: 'A', pad: 'p13', role: 'Bass', source: '自錄' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1 拍加上一個切分位置', character: '圓潤，不刺' },
    { name: 'Shaker', timing: '十六分音符持續', character: '細碎', tip: '力度做出波浪起伏，整首就活了' },
    { name: 'Conga', timing: '兩層錯開，一高一低', character: '手鼓質感' },
    { name: 'Rim', timing: '第 3 拍附近', character: '清脆' },
  ],
  samples: [
    { kind: 'self-record', what: '手拍與手鼓', how: '直接用手拍桌子或大腿，錄下來就是最真的打擊音' },
    { kind: 'self-record', what: 'Shaker', how: '米粒裝進罐子搖，效果好又零成本' },
    { kind: 'cc0', what: '傳統打擊樂器', how: '找 CC0 素材，保留授權頁面' },
  ],
  resamples: [
    { pass: 1, what: '打擊層四顆收成一顆', frees: '空出 pad 給和弦與貝斯' },
    { pass: 2, what: '和弦加貝斯收成一顆', frees: '空出 pad 做第二段落' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Auto-Pan', setting: 'K1 Rate 慢', why: '讓 Shaker 在左右之間移動，空間感立刻出來' },
    { engine: 'knobfx', name: 'Reverb Small', setting: '短殘響', why: '打擊樂器需要一點房間感' },
    { engine: 'knobfx', name: 'Bus Compressor', setting: '中等', why: '把多層打擊黏在一起' },
    { engine: 'knobfx', name: 'Transient', setting: 'K3 Sustain 收短', why: '層數多的時候要各自乾淨' },
  ],
  checkpoints: [
    '至少有三層打擊樂器同時在動',
    '重音沒有全部落在正拍',
    'Shaker 的力度有起伏',
    '至少有一層是自己拍出來的',
  ],
};

export const l2Genres: Genre[] = [house, techHouse, techno, jerseyClub, footwork, afrobeats];
