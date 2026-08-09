import type { Lesson } from '@/types/lesson';

export const s3_02: Lesson = {
  id: 's3-02',
  slug: 'resample-layering',
  season: 3,
  index: 2,
  title: 'Resample 疊層法',
  outcome: '一段三層厚、但只佔一顆 pad 的循環',
  minutes: 40,
  chapters: ['先想清楚順序', '做第一層：鼓', '收起來', '疊第二層：貝斯', '疊第三層：旋律'],
  needsComputer: false,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  prerequisites: ['s3-01'],
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA)：SHIFT + PAD 11 RESAMPLE 會把目前序列的全部聲音錄成新樣本',
    '操作流程為實機實測後自行撰寫',
  ],
  videos: [
    {
      youtubeId: 'JyncB9xaQ0k',
      title: 'AKAI MPC SAMPLE Video 8 - Resample & Recall',
      channel: 'Daddy Long Les',
      why: '系列教學第 8 集，主題正是 Resample 與 Recall，與本課直接對應。',
      lang: 'en',
      reviewed: false,
    },
    {
      youtubeId: 'pp6q9iHLZSo',
      title: 'Akai MPC Sample Part 8 - Resampling and Automation Tip!',
      channel: 'DnC Music',
      why: '同樣講 Resample，另外帶到自動化。想看第二種做法可以比對。',
      lang: 'en',
      reviewed: false,
    },
  ],
  checkpoints: [
    '你手上有一段至少三層的循環',
    '那三層只佔掉一到三顆 pad',
    '每一次 resample 之前你都先存過檔',
    '你能說出每一層收起來之後空出了什麼',
  ],
  steps: [
    // ── 第 1 段 · 先想清楚順序 ──────────────────────────
    {
      ch: 0,
      say: '這一課是全站最重要的一招。做之前先講一件事：<b>順序不能改</b>。',
      targets: ['p11'],
      shift: true,
      screen: { t1: 'RESAMPLE' },
      hear: '—',
    },
    {
      ch: 0,
      say: '收起來的東西<b>不能再拆開</b>。所以永遠先做最確定的那一層。',
      targets: ['p11'],
      shift: true,
      screen: { t1: 'RESAMPLE' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '順序建議',
        body: '鼓先做，因為鼓最不會改。旋律最後做，因為旋律最常改。',
      },
    },
    {
      ch: 0,
      say: '<b>按住 SHIFT 再按 PAD 16</b> 先存一次專案。每一次 resample 之前都要存。',
      targets: ['p16'],
      shift: true,
      screen: { t1: 'SAVE PROJECT' },
      hear: '—',
    },

    // ── 第 2 段 · 做第一層：鼓 ──────────────────────────
    {
      ch: 1,
      say: '按 <b>SEQ</b>，轉 <b>K1</b> 把長度設成 <b>2 小節</b>。整首歌都用這個長度。',
      targets: ['seq', 'k1'],
      screen: { t1: 'SEQ 01  LENGTH 2', tabs: ['Seq', 'BPM', 'Rec Q'], bots: ['2 bars', '90.0', 'ON'] },
      hear: '—',
    },
    {
      ch: 1,
      say: '按 <b>SEQ RECORD</b> 再按 <b>PLAY</b>，把鼓組彈進去。四到六顆 pad 就夠。',
      targets: ['qrec', 'play'],
      screen: { t1: '● REC   BAR 1/2' },
      hear: '節拍器與你敲的鼓',
    },
    {
      ch: 1,
      say: '按 <b>STOP</b>，再按 <b>PLAY</b> 聽一次。<b>現在就要滿意</b>，收起來就改不了了。',
      targets: ['stop', 'play'],
      screen: { t1: 'SEQ 01  ▶  2 bars' },
      hear: '兩小節的鼓組循環',
    },

    // ── 第 3 段 · 收起來 ────────────────────────────────
    {
      ch: 2,
      say: '<b>按住 SHIFT 再按 PAD 11</b>。這就是 RESAMPLE，面板紅字上寫著。',
      targets: ['p11'],
      shift: true,
      screen: { t1: 'RESAMPLE SEQ → pad?' },
      hear: '—',
    },
    {
      ch: 2,
      say: '機器會問你要放進哪一顆。<b>敲一顆空的 pad</b>，例如 PAD 13。',
      targets: ['p13'],
      screen: { t1: 'RESAMPLE → PAD 13', wave: 52 },
      hear: '整段循環被錄成一個聲音',
      note: {
        kind: 'win',
        title: '關鍵時刻',
        body: '剛剛用掉的那幾顆鼓 pad，現在可以拿去做別的了。這就是疊層的原理。',
      },
    },
    {
      ch: 2,
      say: '按 <b>SEQ</b> 開一段<b>新的序列</b>，長度一樣設 2 小節。舊的那段先放著。',
      targets: ['seq', 'k1'],
      screen: { t1: 'SEQ 02  EMPTY', tabs: ['Seq', 'BPM', 'Rec Q'], bots: ['2 bars', '90.0', 'ON'] },
      hear: '—',
    },

    // ── 第 4 段 · 疊第二層：貝斯 ────────────────────────
    {
      ch: 3,
      say: '按 <b>SEQ RECORD</b> 再按 <b>PLAY</b>。先敲 <b>PAD 13</b>，把鼓那一層放進新序列。',
      targets: ['qrec', 'p13'],
      screen: { t1: '● REC   DRUMS IN' },
      hear: '鼓的循環',
    },
    {
      ch: 3,
      say: '鼓在跑的同時，敲你的貝斯 <b>pad</b> 彈進去。<b>邊聽鼓邊彈</b>，這樣才會合。',
      targets: ['p1', 'p2', 'p3', 'p4'],
      screen: { t1: '● REC   OVERDUB' },
      hear: '鼓加貝斯',
    },
    {
      ch: 3,
      say: '按 <b>STOP</b>。滿意了就<b>再存一次專案</b>，然後 SHIFT 加 PAD 11 收成第二層。',
      targets: ['stop', 'p11'],
      shift: true,
      screen: { t1: 'RESAMPLE SEQ → pad?' },
      hear: '鼓加貝斯的循環',
    },
    {
      ch: 3,
      say: '敲另一顆空 pad，例如 <b>PAD 14</b>。現在鼓與貝斯只佔一顆。',
      targets: ['p14'],
      screen: { t1: 'RESAMPLE → PAD 14', wave: 77 },
      hear: '兩層合成一個聲音',
    },

    // ── 第 5 段 · 疊第三層：旋律 ────────────────────────
    {
      ch: 4,
      say: '開第三段序列。錄的時候先敲 <b>PAD 14</b> 放底，再彈旋律上去。',
      targets: ['p14'],
      screen: { t1: '● REC   SEQ 03' },
      hear: '鼓加貝斯的底',
    },
    {
      ch: 4,
      say: '這一層<b>先不要 resample</b>。旋律最常改，留著才好調。',
      targets: ['p9', 'p10'],
      screen: { t1: 'SEQ 03  ■  2 bars' },
      hear: '三層一起響',
      note: {
        kind: 'tip',
        title: '什麼時候該停手',
        body: '每收一次就少一次反悔的機會。留最後一層不收，是給自己留退路。',
      },
    },
    {
      ch: 4,
      say: '按 <b>PLAY</b> 從頭聽。三層厚度，但 pad 只用掉三顆。',
      targets: ['play'],
      screen: { t1: 'SEQ 03  ▶  2 bars', wave: 77 },
      hear: '鼓、貝斯、旋律三層',
      note: {
        kind: 'win',
        title: '第 2 課完成',
        body: '這一招學會，這台機器對你就不再有天花板。剩下的都是規劃問題。',
      },
    },
  ],
};
