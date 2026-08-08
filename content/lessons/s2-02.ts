import type { Lesson } from '@/types/lesson';

export const s2_02: Lesson = {
  id: 's2-02',
  slug: 'sampling-copyright-basics',
  season: 2,
  index: 2,
  title: '這段素材可以用嗎',
  outcome: '一套你自己判斷得出來的素材可用標準',
  minutes: 15,
  chapters: ['兩層權利', '唯一的例外', '平台條款是另一條線', '三種情境', '四種乾淨來源'],
  needsComputer: false,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  prerequisites: ['s2-01'],
  sources: [
    '歐盟法院 C-476/17 Pelham v. Hütter 判決，2019-07-29',
    'Akai 官方使用手冊 v1.3.0 (RevA)：Input Config 來源選項',
    '本站不提供法律意見，內容僅供教學參考',
  ],
  checkpoints: [
    '你能說出一段錄音上面有哪兩層權利',
    '你知道改編幅度不影響是否構成重製',
    '你能分辨著作權與平台服務條款是兩條不同的責任線',
    '你手上的素材全部來自四種乾淨來源之一',
  ],
  steps: [
    // ── 第 1 段 · 兩層權利 ──────────────────────────────
    {
      ch: 0,
      say: '一段錄音其實有<b>兩層權利</b>。一層是錄音本身，一層是底下的曲子。',
      targets: ['pads'],
      screen: { t1: 'SAMPLE', wave: 31 },
      hear: '—',
      note: {
        kind: 'tip',
        title: '兩層都要處理',
        body: '拿到其中一層的授權，不代表另一層也拿到了。這兩層是分開的。',
      },
    },
    {
      ch: 0,
      say: '很多人以為改多一點就沒事。<b>改編幅度不影響是否構成重製</b>。這是最常見的誤解。',
      targets: ['k1', 'k2'],
      screen: { t1: 'TRIM', wave: 31 },
      hear: '—',
      note: {
        kind: 'warn',
        title: '不要相信這句話',
        body: '網路上很流行「改超過三成就沒問題」。那個說法沒有法律依據。',
      },
    },

    // ── 第 2 段 · 唯一的例外 ────────────────────────────
    {
      ch: 1,
      say: '國際上被承認的例外只有一個門檻。<b>修改到聽不出來源</b>。',
      targets: ['padfx'],
      screen: { t1: 'PAD FX' },
      hear: '—',
    },
    {
      ch: 1,
      say: '這來自歐盟法院 2019 年的 <b>Pelham 案</b>。爭議的是兩秒的鼓組取樣。',
      targets: ['p11'],
      shift: true,
      screen: { t1: 'RESAMPLE' },
      hear: '—',
      note: {
        kind: 'tip',
        title: '判決怎麼說',
        body: '就算只有兩秒也算重製。除非改到耳朵聽不出原本是誰。',
      },
    },
    {
      ch: 1,
      say: '「聽不出來源」的標準比你想的嚴格。<b>只要能認出來就算重製</b>。',
      targets: ['knobfx'],
      screen: { t1: 'KNOB FX' },
      hear: '—',
    },

    // ── 第 3 段 · 平台條款是另一條線 ────────────────────
    {
      ch: 2,
      say: '還有第二條責任線。<b>串流平台的服務條款本身就禁止錄製</b>。',
      targets: ['r_usb'],
      screen: { t1: 'USB' },
      hear: '—',
    },
    {
      ch: 2,
      say: '這跟著作權是兩件事。<b>就算你取得授權，違反條款還是違反條款</b>。',
      targets: ['r_usb'],
      screen: { t1: 'USB' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '兩條線分開算',
        body: '著作權看的是權利人。服務條款看的是你跟平台之間的約定。',
      },
    },

    // ── 第 4 段 · 三種情境 ──────────────────────────────
    {
      ch: 3,
      say: '第一種：<b>自己在家練習</b>，不外流。風險最低，但不是零。',
      targets: ['pads'],
      screen: { t1: 'PRACTICE' },
      hear: '—',
    },
    {
      ch: 3,
      say: '第二種：<b>上傳社群平台</b>。可能被自動比對系統下架，或被抽走廣告收益。',
      targets: ['r_usb'],
      screen: { t1: 'UPLOAD' },
      hear: '—',
    },
    {
      ch: 3,
      say: '第三種：<b>商業發行</b>。發行商與經銷平台通常會要求你證明素材來源。',
      targets: ['p12'],
      shift: true,
      screen: { t1: 'SONG' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '這是分水嶺',
        body: '前兩種是風險，第三種是責任。要發行就一定要先處理授權。',
      },
    },

    // ── 第 5 段 · 四種乾淨來源 ──────────────────────────
    {
      ch: 4,
      say: '第一種乾淨來源：<b>自己錄</b>。用內建麥克風或背板輸入，權利 100% 是你的。',
      targets: ['mic'],
      screen: { t1: 'SOURCE   MIC' },
      hear: '你自己錄的聲音',
    },
    {
      ch: 4,
      say: '第二種：<b>機器內建的音色</b>。原廠資料本來就是給你用的。',
      targets: ['pads'],
      screen: { t1: 'FACTORY KIT' },
      hear: '內建 kit 的聲音',
    },
    {
      ch: 4,
      say: '第三種：<b>CC0 素材</b>。作者放棄權利，可以自由使用。下載時把授權頁面存下來。',
      targets: ['r_usb'],
      screen: { t1: 'USB' },
      hear: '—',
      note: {
        kind: 'tip',
        title: '存證的習慣',
        body: '把授權頁面截圖，跟素材放在同一個資料夾。三年後你不會記得從哪抓的。',
      },
    },
    {
      ch: 4,
      say: '第四種：<b>付費素材包</b>。買的時候看清楚授權範圍，商業用途通常要另外確認。',
      targets: ['r_usb'],
      screen: { t1: 'USB' },
      hear: '—',
    },
    {
      ch: 4,
      say: '最後一句話。<b>本站不提供法律意見</b>。真的要發行，找律師，不要問論壇。',
      targets: ['p16'],
      shift: true,
      screen: { t1: 'PROJECT' },
      hear: '—',
      note: {
        kind: 'win',
        title: '第 2 課完成',
        body: '你現在有一套自己的判斷流程。素材乾淨，後面做什麼都不用回頭擔心。',
      },
    },
  ],
};
