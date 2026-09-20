import type { Lesson } from '@/types/lesson';

export const s1_05: Lesson = {
  id: 's1-05',
  slug: 'projects-samples-microsd',
  season: 1,
  index: 5,
  title: '專案、樣本、記憶卡',
  outcome: '一份你自己命名、自己存過的專案備份',
  minutes: 20,
  chapters: ['專案裝了什麼', '背景存檔不是備份', '記憶卡', '命名習慣'],
  needsComputer: false,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  prerequisites: ['s1-02'],
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA)：容量規格、Project 選單、SD Card Access、Song 匯出',
    '操作流程為實機實測後自行撰寫',
  ],
  checkpoints: [
    '你手上有一份自己命名、自己存過的專案',
    '你知道背景自動存檔不等於備份',
    '你知道這一課有哪些事情標示為尚未驗證',
  ],
  steps: [
    // ── 第 1 段 · 專案裝了什麼 ──────────────────────────
    {
      ch: 0,
      say: '<b>按住 SHIFT 再按 PAD 16</b> 打開 Project。一個專案裝著你的樣本、序列和設定。',
      targets: ['p16'],
      shift: true,
      screen: { t1: 'PROJECT' },
      hear: '—',
    },
    {
      ch: 0,
      say: '每個專案放得下 <b>16 個樣本乘以 8 個 Bank</b>。序列也是 16 乘以 8。按 <b>PAD BANK</b> 換 Bank。',
      targets: ['bank'],
      screen: { t1: 'BANK A' },
      hear: '—',
    },
    {
      ch: 0,
      say: '<b>SAMPLE SEL</b> 用來選樣本。要換聲音的時候按它。',
      targets: ['ssel'],
      screen: { t1: 'SAMPLE SELECT' },
      hear: '—',
    },
    {
      ch: 0,
      say: '<b>按住 SHIFT 再按 SAMPLE SEL</b> 是 SAVE SAMPLE。可以單獨存下一個樣本。',
      targets: ['ssel'],
      shift: true,
      screen: { t1: 'SAVE SAMPLE' },
      hear: '—',
    },

    // ── 第 2 段 · 背景存檔不是備份 ──────────────────────
    {
      ch: 1,
      say: '機器會在背景自動存檔。<b>但那只是暫存，不是備份</b>。真正的備份要你自己動手。',
      targets: ['p16'],
      shift: true,
      screen: { t1: 'AUTO SAVE' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '這一條害過很多人',
        body: '背景存檔只保住當下狀態。專案毀了、卡拔錯了，它救不回來。',
      },
    },
    {
      ch: 1,
      say: '養成習慣：<b>每做完一個段落就存一次</b>。在 Project 選單裡選 Save Project。',
      targets: ['p16'],
      shift: true,
      screen: { t1: 'SAVE PROJECT' },
      hear: '—',
    },
    {
      ch: 1,
      say: '<b>按住 SHIFT 再按 SAMPLE RECORD</b> 是 RECALL。它會把剛剛過去的聲音撈回來。',
      targets: ['srec'],
      shift: true,
      screen: { t1: 'RECALL' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '尚未驗證',
        body: '官方手冊規格表寫 30 秒，內文兩處寫 25 秒。同一份手冊自己不一致，實測前不寫死。',
      },
    },

    // ── 第 3 段 · 記憶卡 ────────────────────────────────
    {
      ch: 2,
      say: '機器內建 8 GB，原廠資料大約佔掉 2 GB。<b>microSD 卡</b>可以再擴充。',
      targets: ['r_usb'],
      screen: { t1: 'STORAGE' },
      hear: '—',
    },
    {
      ch: 2,
      say: '<b>記憶卡不含在盒裝內</b>，官方手冊寫得很清楚。買機器時記得一起買一張。',
      targets: ['r_usb'],
      screen: { t1: 'STORAGE' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '尚未驗證',
        body: 'microSD 的容量上限與檔案系統格式，官方手冊與 FAQ 都沒寫。買大容量卡前先問官方。',
      },
    },
    {
      ch: 2,
      say: '<b>作品要拿得出來</b>才算數。歌做完在 Song 頁按 <b>B1</b> 匯出，再按 <b>B2</b> 存成音檔。',
      targets: ['b1', 'b2'],
      screen: { t1: 'EXPORT AUDIO MIXDOWN' },
      hear: '—',
    },
    {
      ch: 2,
      say: '傳到電腦走 Project 選單的 <b>SD Card Access</b>。記憶卡會變成電腦上的一個外接磁碟。',
      targets: ['p16'],
      shift: true,
      screen: { t1: 'SD CARD ACCESS' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '尚未驗證',
        body: '沒插卡能不能取出作品，官方手冊兩處說法不一致。這是我們最想確認的一項。',
      },
    },

    // ── 第 4 段 · 命名習慣 ──────────────────────────────
    {
      ch: 3,
      say: '用 <b>ENCODER</b> 逐字打名字。名字亂取，三個月後你自己找不到。',
      targets: ['enc'],
      screen: { t1: 'NAME' },
      hear: '—',
    },
    {
      ch: 3,
      say: '建議格式：<b>日期加內容加版本</b>。例如 0808_kick_loop_v2。',
      targets: ['enc', 'p16'],
      shift: true,
      screen: { t1: 'SAVE  0808_KICK_LOOP_V2' },
      hear: '—',
      note: {
        kind: 'win',
        title: '第 4 課完成',
        body: '你現在知道專案裝了什麼，也知道背景存檔救不了你。下一季開始正式做素材。',
      },
    },
  ],
};
