import type { Lesson } from '../../types/lesson';

/**
 * 對照組：一份完全合法的最小課程。
 *
 * 用途：證明驗證腳本不會誤報。只有「壞資料被抓到」而沒有「好資料能通過」，
 * 那可能只是驗證器對什麼都報錯，不算真的有效。
 * 這一支同樣不進註冊表，不是教學內容。
 */
export const validLesson: Lesson = {
  id: 's0-00',
  slug: 'validator-control-fixture',
  season: 1,
  index: 0,
  title: '驗證腳本對照組',
  outcome: '一份可以通過全部檢查的最小課程資料',
  minutes: 1,
  chapters: ['測試'],
  needsComputer: false,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  prerequisites: [],
  checkpoints: ['驗證腳本對這一課回報零錯誤'],
  sources: ['內部測試用，非教學內容'],
  // 對照組：一段合法的摘要 —— 自己的話、夠短、而且填表的人確實看過
  videos: [
    {
      youtubeId: 'ccccccccccc',
      title: '合法的摘要對照組',
      channel: '測試頻道',
      why: '用來確認合法的 summary 不會被誤報',
      summary: '看過之後用自己的話寫的重點，明顯短於原片，也沒有逐字照抄。',
      lang: 'en',
      reviewed: true,
    },
  ],
  steps: [
    {
      ch: 0,
      say: '按 <b>PLAY</b>。',
      targets: ['play'],
      screen: { t1: 'SEQ 01' },
      hear: '一段鼓組節奏',
    },
    {
      ch: 0,
      say: '按住 <b>SHIFT</b> 再按 <b>PAD 11</b>。',
      targets: ['p11'],
      shift: true,
      screen: { t1: 'RESAMPLE SEQ', wave: 31 },
      hear: '—',
      note: {
        kind: 'tip',
        title: '測試用註解',
        body: '這一段只是用來確認 note 也會被檢查。',
      },
    },
  ],
};
