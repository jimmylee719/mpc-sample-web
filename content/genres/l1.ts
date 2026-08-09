import type { Genre } from '@/types/genre';

/**
 * L1：機上直接完成，0–1 次 resample。
 *
 * 效果名稱與參數引用自官方使用手冊 v1.3.0 (RevA)，驗證腳本會比對效果字典。
 * Pad 配置、resample 規劃與檢查點是本站自己的編排建議，不是官方資料。
 */

const COMMON = {
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA)：效果名稱與參數',
    'Pad 配置與 resample 規劃為本站編排建議',
  ],
};

export const boomBap: Genre = {
  ...COMMON,
  slug: 'boom-bap',
  title: 'Boom Bap 經典嘻哈',
  titleEn: 'Boom Bap',
  level: 'L1',
  tagline: '一段切片，加上很重的大鼓與小鼓。這是取樣音樂的原點。',
  intro: {
    body: 'Boom Bap 的名字就是聲音本身。Boom 是大鼓，Bap 是小鼓。速度不快，但每一下都很重。整首歌通常只有一段循環，靠切片的順序製造變化。',
  },
  tempo: { bpmMin: 85, bpmMax: 95, grid: '1/16', note: 'Swing 稍微開一點，拍子拖一點才有味道' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '自錄或內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Snare', source: '自錄或內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Closed Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p4', role: 'Open Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '切片 1–8：主旋律段落', source: '自錄樂器或 CC0 素材，用 Chop 切開' },
    { bank: 'A', pad: 'p13', role: 'Bass', source: '自錄貝斯，或把切片調低八度' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1 拍一定有，第 3 拍前後再補一下', character: '低頻紮實，尾巴短', tip: '不要塞滿。空隙就是 Boom Bap 的呼吸' },
    { name: 'Snare', timing: '第 2 拍與第 4 拍', character: '中頻厚、有房間感', tip: '小鼓比大鼓大聲一點點，這是這個曲風的招牌' },
    { name: 'Closed Hat', timing: '八分音符，帶 swing', character: '短促、不刺耳' },
    { name: 'Open Hat', timing: '每兩小節放一次，做為過門', character: '略長，尾巴自然收' },
  ],
  samples: [
    { kind: 'self-record', what: '一段自己彈的鋼琴或吉他和弦', how: '用內建麥克風錄四小節，速度不用準，之後用 Warp 對齊' },
    { kind: 'built-in', what: '鼓組', how: '原廠 kit 裡的 kick 與 snare 已經夠用，先不要花時間找' },
    { kind: 'cc0', what: '黑膠雜訊墊底', how: '找 CC0 的 vinyl noise，鋪在整首下面，把不同素材黏在一起' },
  ],
  resamples: [
    { pass: 1, what: '把鼓組四顆與切片彈成的兩小節循環收成一顆 pad', frees: '空出 10 顆以上，拿去放貝斯與過門' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Vintage Emulator', setting: 'K1 Type 選 MPC3000 或 MPC60', why: '把數位的乾淨感磨掉，這是這個曲風的核心音色' },
    { engine: 'padfx', name: 'LoFi', setting: '輕壓，不要踩到底', why: '增加顆粒感，但踩太重會糊掉' },
    { engine: 'knobfx', name: 'Bus Compressor', setting: 'K1 Attack 中間偏慢', why: 'Attack 慢一點，鼓的衝擊才留得住' },
    { engine: 'knobfx', name: 'LP Filter', setting: 'K1 Frequency 在副歌前往下掃', why: '做段落之間的落差' },
  ],
  checkpoints: [
    '循環聽起來像在點頭，不是在跑步',
    '小鼓的存在感比大鼓明顯',
    '切片的順序跟原曲不一樣',
    '整段有留白，不是每一格都塞滿',
  ],
};

export const lofiHipHop: Genre = {
  ...COMMON,
  slug: 'lofi-hip-hop',
  title: 'Lo-fi Hip Hop 讀書電台',
  titleEn: 'Lo-fi Hip Hop',
  level: 'L1',
  tagline: '故意讓聲音變舊、變糊、變不準。缺陷就是這個曲風的重點。',
  intro: {
    body: 'Lo-fi 的重點不是把東西做好，是把東西做舊。音色要糊，拍子要鬆，音量不用很大。做這個曲風最常見的錯誤，是把聲音修得太乾淨。',
  },
  tempo: { bpmMin: 70, bpmMax: 85, grid: '1/16', note: 'Swing 開得比 Boom Bap 更多，拖得越明顯越好' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit，選悶一點的' },
    { bank: 'A', pad: 'p2', role: 'Snare 或 Rimshot', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Closed Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '和弦切片', source: '自錄鋼琴或電鋼琴' },
    { bank: 'A', pad: 'p9', role: '環境音', source: '自錄：雨聲、翻書、街道' },
    { bank: 'A', pad: 'p13', role: 'Bass', source: '把和弦切片調低，或自錄貝斯' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1 拍，第 3 拍後半', character: '低頻但不緊，有一點鬆', tip: '刻意不要對齊格子，晚個一點點' },
    { name: 'Snare', timing: '第 2、4 拍', character: '薄、帶雜訊', tip: '用 Rimshot 代替小鼓會更貼近這個曲風' },
    { name: 'Closed Hat', timing: '八分音符，力度忽大忽小', character: '很輕' },
    { name: '環境音', timing: '整首鋪底', character: '雨聲、黑膠雜訊、遠處人聲' },
  ],
  samples: [
    { kind: 'self-record', what: '電鋼琴或鋼琴的四小節和弦', how: '彈慢一點，彈錯一兩個音也沒關係，那正好' },
    { kind: 'self-record', what: '生活環境音', how: '用內建麥克風錄雨聲、咖啡店、翻書聲，這是最好用也最安全的素材' },
    { kind: 'cc0', what: '黑膠與卡帶雜訊', how: 'CC0 素材庫都有，下載時把授權頁面一起存下來' },
  ],
  resamples: [
    { pass: 1, what: '鼓組加和弦收成一顆 pad', frees: '空出 pad 放環境音與過門' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Vinyl Emulator', setting: 'K2 Crackle 開到聽得見但不吵', why: '黑膠雜訊是這個曲風最快的識別記號' },
    { engine: 'knobfx', name: 'Tape Emulator', setting: 'K1 Wow 開一點，讓音高微微飄', why: '音高不穩才像老卡帶' },
    { engine: 'knobfx', name: 'LP Filter', setting: 'K1 Frequency 壓掉高頻', why: '把刺耳的部分砍掉，聽久不累' },
    { engine: 'padfx', name: 'LoFi', setting: '中等力度', why: '降低位元感，跟濾波搭配使用' },
  ],
  checkpoints: [
    '聽三十秒不會覺得吵',
    '有至少一種雜訊鋪在整首下面',
    '拍子明顯是鬆的，不是機械的',
    '高頻被壓掉了，聲音不刺耳',
  ],
};

export const trap: Genre = {
  ...COMMON,
  slug: 'trap',
  title: 'Trap 陷阱節奏',
  titleEn: 'Trap',
  level: 'L1',
  tagline: '808 低音撐全場，Hi-hat 用連打做出速度感。',
  intro: {
    body: 'Trap 的骨架很簡單。一顆很長的低音，一個落在第三拍的小鼓，加上密集的 Hi-hat。難的地方不是音符多，是低音的調音與長度。',
  },
  tempo: { bpmMin: 130, bpmMax: 150, grid: '1/16，Hi-hat 連打時到 1/32', note: '聽起來像慢歌，因為小鼓只落在每小節第三拍' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: '808 低音', source: '內建 kit 的 808，或自錄低音後調音' },
    { bank: 'A', pad: 'p2', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Snare 或 Clap', source: '內建 kit' },
    { bank: 'A', pad: 'p4', role: 'Closed Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: 'Open Hat', source: '內建 kit' },
    { bank: 'A', pad: 'p9', role: '旋律', source: '自錄鐘琴、笛或合成音' },
  ],
  drums: [
    { name: '808 低音', timing: '跟著旋律走，一小節一到兩個音', character: '很長、很低，尾巴要拖', tip: '用 16 Levels 的 Tune 型式彈音高，原始音高在 PAD 4' },
    { name: 'Kick', timing: '跟 808 同時或稍早', character: '短而尖，補足 808 缺少的衝擊' },
    { name: 'Snare / Clap', timing: '每小節第 3 拍', character: '乾、短' },
    { name: 'Hi-hat', timing: '八分或十六分，過門時連打', character: '很短', tip: '用 NOTE REPEAT，需要三連音時加 SHIFT' },
  ],
  samples: [
    { kind: 'built-in', what: '808 與鼓組', how: '原廠 kit 就有，先用內建把架構做出來再換音色' },
    { kind: 'self-record', what: '旋律動機', how: '哼一段四個音的旋律錄進去，比找素材快' },
    { kind: 'paid-pack', what: '進階 808 音色', how: '買之前確認授權範圍，商業發行通常要另外確認' },
  ],
  resamples: [
    { pass: 1, what: '鼓組三顆收成一顆 pad', frees: '空出 pad 給 808 的不同音高與旋律' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Limiter', setting: 'K2 Ceiling 稍微壓下來', why: '808 很容易把整體音量頂爆' },
    { engine: 'knobfx', name: 'Transient', setting: 'K1 Attack 往正的方向', why: '把 Kick 的衝擊拉回來，不然會被 808 蓋掉' },
    { engine: 'knobfx', name: 'Pumper', setting: 'K1 Speed 對到 1/4', why: '這台沒有側鏈，用它做出大鼓一響其他變小聲的效果' },
    { engine: 'padfx', name: 'Beat Repeat', setting: '過門時輕點', why: '段落收尾時的結巴效果' },
  ],
  checkpoints: [
    '低音的長度撐得住整個小節',
    '小鼓只落在每小節第三拍',
    'Hi-hat 有至少一次連打過門',
    '整體音量沒有爆掉',
  ],
};

export const phonk: Genre = {
  ...COMMON,
  slug: 'phonk',
  title: 'Phonk',
  titleEn: 'Phonk',
  level: 'L1',
  tagline: '牛鈴當旋律，低音刻意推爆。髒是這個曲風的目標。',
  intro: {
    body: 'Phonk 的兩個記號很好認：牛鈴敲出來的旋律，還有推到失真的低音。它速度不慢，但小鼓落在第三拍，所以聽起來像慢歌。做這個曲風不要修得太乾淨。',
  },
  tempo: { bpmMin: 130, bpmMax: 150, grid: '1/16', note: '小鼓只落在第三拍，所以聽感是速度的一半' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: '808 低音', source: '內建 kit，之後推失真' },
    { bank: 'A', pad: 'p3', role: 'Snare 或 Clap', source: '內建 kit' },
    { bank: 'A', pad: 'p4', role: 'Hi-hat', source: '內建 kit' },
    { bank: 'A', pad: 'p5', role: '牛鈴', source: '自錄：敲玻璃杯或金屬罐' },
    { bank: 'A', pad: 'p9', role: '人聲碎片', source: '自錄，壓低後切碎' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1 拍與切分位置', character: '短、悶', tip: '不要太乾淨，一點糊反而對' },
    { name: 'Snare', timing: '每小節第 3 拍', character: '乾、薄' },
    { name: 'Hi-hat', timing: '八分或十六分，過門連打', character: '很短' },
    { name: '牛鈴旋律', timing: '一小節四到六個音，音高會動', character: '金屬、穿透', tip: '用 16 Levels 的 Tune 型式彈音高，原始音高在 PAD 4' },
  ],
  samples: [
    { kind: 'self-record', what: '金屬敲擊當牛鈴', how: '玻璃杯、鐵罐、湯匙敲一下，修剪成極短的一點' },
    { kind: 'built-in', what: '鼓組與 808', how: '原廠 kit 直接用，重點在後面的失真' },
    { kind: 'self-record', what: '自己的人聲', how: '講一句話錄下來，調低音高再切碎' },
  ],
  resamples: [
    { pass: 1, what: '鼓組加 808 收成一顆', frees: '空出 pad 給牛鈴的各種音高' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Tube Drive', setting: 'K1 Drive 開大', why: '低音要推到失真，這是 Phonk 的核心音色' },
    { engine: 'knobfx', name: 'Vintage Emulator', setting: 'K1 Type 選 SP1200', why: '降低解析度，做出翻錄卡帶的質地' },
    { engine: 'padfx', name: 'LoFi', setting: '中等力度', why: '再加一層粗糙感' },
    { engine: 'knobfx', name: 'Limiter', setting: 'K2 Ceiling 壓住', why: '失真之後尖峰很容易爆' },
  ],
  checkpoints: [
    '牛鈴是一條會動的旋律，不是同一個音重複',
    '低音明顯帶失真，不乾淨',
    '小鼓只落在第三拍',
    '整體音量沒有爆掉',
  ],
};

export const reggaeton: Genre = {
  ...COMMON,
  slug: 'reggaeton',
  title: 'Reggaeton',
  titleEn: 'Reggaeton',
  level: 'L1',
  tagline: '一個固定的鼓組節奏撐全場，其他都是配菜。',
  intro: {
    body: 'Reggaeton 的核心是一個固定的鼓組節奏，幾乎每首歌都一樣。學會那個節奏，這個曲風就通了一半。剩下的是找到對的音色與一段簡單的和弦。',
  },
  tempo: { bpmMin: 90, bpmMax: 100, grid: '1/16', note: '節奏本身有一點搖擺，不要完全對齊' },
  padPlan: [
    { bank: 'A', pad: 'p1', role: 'Kick', source: '內建 kit' },
    { bank: 'A', pad: 'p2', role: 'Snare 或 Rim', source: '內建 kit' },
    { bank: 'A', pad: 'p3', role: 'Hi-hat', source: '內建 kit' },
    { bank: 'A', pad: 'p4', role: 'Shaker', source: '自錄：米粒罐' },
    { bank: 'A', pad: 'p5', role: '和弦', source: '自錄鋼琴或吉他' },
    { bank: 'A', pad: 'p13', role: 'Bass', source: '自錄' },
  ],
  drums: [
    { name: 'Kick', timing: '第 1 拍與第 3 拍', character: '飽滿、圓', tip: '這兩下是地基，不要動' },
    { name: 'Snare', timing: '固定落在大鼓之間的切分位置', character: '乾、短', tip: '這個切分就是整個曲風的識別記號' },
    { name: 'Hi-hat', timing: '八分音符持續', character: '輕' },
    { name: 'Shaker', timing: '十六分音符，力度有起伏', character: '細碎' },
  ],
  samples: [
    { kind: 'built-in', what: '鼓組', how: '原廠 kit 的 kick 與 rim 就夠' },
    { kind: 'self-record', what: '和弦', how: '四個和弦錄成四顆 pad，簡單就好' },
    { kind: 'self-record', what: 'Shaker', how: '米粒裝罐搖，零成本' },
  ],
  resamples: [
    { pass: 1, what: '鼓組四顆收成一顆', frees: '空出 pad 給和弦與變化' },
  ],
  fx: [
    { engine: 'knobfx', name: 'Reverb Small', setting: '短殘響給 Rim', why: '打擊樂器要一點房間感，但不能糊' },
    { engine: 'knobfx', name: 'Bus Compressor', setting: '中等', why: '把固定節奏黏成一塊，推力才出得來' },
    { engine: 'knobfx', name: 'Transient', setting: 'K1 Attack 往正', why: '大鼓的衝擊要清楚' },
    { engine: 'padfx', name: 'HP Filter', setting: '過門時踩', why: '抽掉低頻做段落交接' },
  ],
  checkpoints: [
    '鼓組節奏固定，整首不太變',
    '切分的那一下位置抓得準',
    '和弦只用四個以內',
    'Shaker 的力度有起伏',
  ],
};

export const l1Genres: Genre[] = [boomBap, lofiHipHop, trap, phonk, reggaeton];
