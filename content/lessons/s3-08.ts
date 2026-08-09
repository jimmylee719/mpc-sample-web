import type { Lesson } from '@/types/lesson';

export const s3_08: Lesson = {
  id: 's3-08',
  slug: 'recording-automation',
  season: 3,
  index: 8,
  title: '錄製自動化',
  outcome: '一段旋鈕自己會動的循環',
  minutes: 25,
  chapters: ['自動化是什麼', '錄下來', '哪些參數可以自動化', '改掉與清除'],
  needsComputer: false,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-09',
  prerequisites: ['s3-07'],
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA)：自動化錄製四步驟、可自動化參數清單、SHIFT + −/UNDO 復原、按住 ERASE 加移動旋鈕或推桿清除並以 B3 確認',
    '操作流程為實機實測後自行撰寫',
  ],
  checkpoints: [
    '你錄下了一段會自己變化的參數',
    '你知道哪些參數可以自動化、哪些不行',
    '你用 SHIFT 加 − 復原過一次',
    '你清除過某一顆 pad 上的自動化',
  ],
  steps: [
    // ── 第 1 段 · 自動化是什麼 ──────────────────────────
    {
      ch: 0,
      say: '前面幾課你都是<b>手動轉旋鈕</b>。這一課讓機器把你轉的動作記下來。',
      targets: ['k1', 'k2', 'k3'],
      screen: { t1: 'AUTOMATION' },
      hear: '—',
    },
    {
      ch: 0,
      say: '記下來之後，<b>每次循環它都會自己重演一次</b>。你的手就空出來了。',
      targets: ['play'],
      screen: { t1: 'SEQ 01  ▶' },
      hear: '參數自己在動的循環',
      note: {
        kind: 'tip',
        title: '這解決了什麼問題',
        body: '演出時你只有兩隻手。會自己動的濾波掃動，讓你能同時做別的事。',
      },
    },
    {
      ch: 0,
      say: '重點先講：<b>自動化是綁在單一 pad 上的</b>，不是整段序列。',
      targets: ['pads'],
      screen: { t1: 'PER PAD' },
      hear: '—',
    },

    // ── 第 2 段 · 錄下來 ────────────────────────────────
    {
      ch: 1,
      say: '第一步，<b>敲一下你要自動化的那顆 pad</b> 把它選起來。',
      targets: ['p5'],
      screen: { t1: 'A05 Chord' },
      hear: '那顆 pad 的聲音',
    },
    {
      ch: 1,
      say: '第二步，按 <b>SEQ RECORD</b> 待命，再按 <b>PLAY</b> 開始錄。跟錄音符一樣。',
      targets: ['qrec', 'play'],
      screen: { t1: '● REC   AUTOMATION' },
      hear: '循環開始跑',
    },
    {
      ch: 1,
      say: '第三步，<b>轉 K1 到 K3，或移動推桿</b>。你轉的每一下都被記下來。',
      targets: ['k1', 'fader'],
      screen: { t1: '● REC   FILTER 64→110' },
      hear: '音色隨著你的手改變',
    },
    {
      ch: 1,
      say: '第四步，<b>再按一次 SEQ RECORD</b> 停止錄音但繼續播放。這樣可以馬上聽結果。',
      targets: ['qrec'],
      screen: { t1: 'SEQ 01  ▶' },
      hear: '剛剛的動作自己重演一次',
      note: {
        kind: 'tip',
        title: '或者按 STOP',
        body: '按 STOP 會同時停掉錄音與播放。想立刻聽差別就用 SEQ RECORD。',
      },
    },

    // ── 第 3 段 · 哪些參數可以自動化 ────────────────────
    {
      ch: 2,
      say: '官方列出的可自動化參數有六類。<b>音量、音高、聲相</b>是前三類。',
      targets: ['k1', 'k2', 'k3'],
      screen: { t1: 'VOL / TUNE / PAN' },
      hear: '—',
    },
    {
      ch: 2,
      say: '還有 <b>Amp 與 Filter 的包絡參數</b>、<b>力度感應</b>、以及 <b>Offset</b>。',
      targets: ['b3'],
      screen: { t1: 'ENV / VEL / OFFSET' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '有一個例外',
        body: '包絡參數裡的 Decay From 不能自動化。官方手冊明確排除了它。',
      },
    },
    {
      ch: 2,
      say: '推桿也能錄。<b>按住 SHIFT 再按 PAD 9</b> 先決定推桿要控制哪個參數。',
      targets: ['p9'],
      shift: true,
      screen: { t1: 'FADER   PAD FILTER' },
      hear: '—',
    },
    {
      ch: 2,
      say: '最實用的一個：<b>把濾波截止點錄成八小節慢慢打開</b>。段落感立刻出來。',
      targets: ['fader'],
      screen: { t1: 'FILTER CUTOFF  ↗' },
      hear: '八小節之內聲音逐漸打開',
    },

    // ── 第 4 段 · 改掉與清除 ────────────────────────────
    {
      ch: 3,
      say: '錄壞了？<b>按住 SHIFT 再按 −</b>。這會復原這次錄音期間的全部自動化。',
      targets: ['minus'],
      shift: true,
      screen: { t1: 'UNDO AUTOMATION' },
      hear: '參數回到沒有自動化的樣子',
      note: {
        kind: 'warn',
        title: '只回復這一次的',
        body: '它復原的是「上次開始錄音之後」的自動化。更早的不受影響。',
      },
    },
    {
      ch: 3,
      say: '要徹底清掉就先<b>選中那顆 pad</b>，再<b>按住 ERASE 並移動那個參數的旋鈕</b>。',
      targets: ['erase', 'k1'],
      screen: { t1: 'ERASE AUTOMATION?' },
      hear: '—',
    },
    {
      ch: 3,
      say: '如果那個參數是推桿在控制，<b>按住 ERASE 移動推桿</b>也可以。',
      targets: ['erase', 'fader'],
      screen: { t1: 'ERASE AUTOMATION?' },
      hear: '—',
    },
    {
      ch: 3,
      say: '螢幕會跳出確認。<b>按 B3 確定清除，按 B1 取消</b>。',
      targets: ['b3'],
      screen: { t1: 'ERASE AUTOMATION?', tabs: ['Cancel', '', 'Do It!'] },
      hear: '那顆 pad 的參數不再自己動',
      note: {
        kind: 'win',
        title: '第 8 課完成',
        body: '自動化是這台機器最被忽略的功能。一段濾波掃動，就能讓循環撐久一倍。',
      },
    },
  ],
};
