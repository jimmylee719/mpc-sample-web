/**
 * ⚠️ 這是刻意寫錯的測試資料，不是教學內容。
 *
 * 用途：證明 scripts/validate-content.ts 真的擋得住錯誤，而不是只有我口頭保證。
 * 由 `npm run validate:selftest` 讀取，**不會**進入 content/lessons/index.ts 的註冊表，
 * 所以不影響正式建置。
 *
 * 這裡刻意不加型別註記。加了的話 TypeScript 會先報錯，
 * 驗證腳本反而測不到 —— 而驗證腳本才是這一支要測的東西。
 */
export const brokenLesson = {
  id: 's9-99',
  slug: 'broken-fixture',
  season: 1,
  index: 99,
  title: '故意寫錯的測試課',
  outcome: '一份用來證明驗證腳本有效的錯誤資料',
  minutes: 1,
  chapters: ['測試'],
  needsComputer: false,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  prerequisites: [],
  checkpoints: ['驗證腳本必須攔下這一課的五種錯誤'],
  sources: ['內部測試用，非教學內容'],
  steps: [
    // 錯誤 ①：targets 用了不存在的控制項 ID
    {
      ch: 0,
      say: '按住 <b>SHIFT</b> 不放。',
      targets: ['shift', 'turbo_button'],
      screen: { t1: 'TEST' },
      hear: '—',
    },
    // 錯誤 ②：缺 hear
    {
      ch: 0,
      say: '按 <b>PLAY</b>。',
      targets: ['play'],
      screen: { t1: 'TEST' },
    },
    // 錯誤 ③：缺 screen
    {
      ch: 0,
      say: '按 <b>STOP</b>。',
      targets: ['stop'],
      hear: '—',
    },
    // 錯誤 ④：say 沒有任何 <b>
    {
      ch: 0,
      say: '這一句沒有粗體標記。',
      targets: ['sample'],
      screen: { t1: 'TEST' },
      hear: '—',
    },
    // 錯誤 ⑤：單句超過 40 字
    {
      ch: 0,
      say: '按下 <b>SAMPLE</b> 之後，螢幕會回到主畫面，你會看到目前選到的樣本名稱、波形，還有下方三個對應 K1 K2 K3 的參數標籤。',
      targets: ['sample'],
      screen: { t1: 'TEST' },
      hear: '—',
    },
  ],
};
