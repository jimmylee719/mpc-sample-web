import type { Lesson } from '@/types/lesson';

export const s1_04: Lesson = {
  id: 's1-04',
  slug: 'firmware-update',
  season: 1,
  index: 4,
  title: '開機第一件事：韌體更新',
  outcome: '一台跑在官方最新韌體上的機器',
  minutes: 25,
  chapters: ['為什麼先做', '更新前的準備', '更新中', '更新之後'],
  needsComputer: true,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  prerequisites: ['s1-02'],
  sources: [
    'Akai 官方支援：MPC Sample Firmware Update（更新方式、Windows 10 例外、Update Mode 組合鍵）',
    'Akai 官方使用手冊 v1.3.0 (RevA)',
  ],
  checkpoints: [
    '機器已經更新到官方最新韌體',
    '更新之前的專案已經先存過一次',
    '你知道只用官方韌體，不碰第三方韌體',
    '你知道自己的系統要走瀏覽器還是走桌面程式',
  ],
  steps: [
    // ── 第 1 段 · 為什麼先做 ────────────────────────────
    {
      ch: 0,
      say: '這是全站唯一需要電腦的一課。<b>先更新韌體，再開始學</b>。舊韌體會讓後面的課對不上。好消息是幾乎不用裝東西。',
      targets: ['r_power'],
      screen: { t1: 'POWER' },
      hear: '—',
    },
    {
      ch: 0,
      say: '背板那個 <b>USB-C</b> 孔就是更新用的。它同時負責充電、音訊、MIDI。',
      targets: ['r_usb'],
      screen: { t1: 'USB' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '不要用只能充電的線',
        body: '有些 USB-C 線只有電源腳位。用不能傳資料的線，電腦不會看到機器。',
      },
    },

    // ── 第 2 段 · 更新前的準備 ──────────────────────────
    {
      ch: 1,
      say: '更新前先把電充飽。<b>更新中途沒電</b>是最容易出事的狀況。',
      targets: ['r_power', 'r_usb'],
      screen: { t1: 'POWER' },
      hear: '—',
    },
    {
      ch: 1,
      say: '<b>按住 SHIFT 再按 PAD 16</b> 打開 Project 選單。先把手上的專案存起來。',
      targets: ['p16'],
      shift: true,
      screen: { t1: 'SAVE PROJECT' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '尚未驗證',
        body: '更新會不會影響既有專案，我們還沒實測。先存一次比較保險。',
      },
    },

    // ── 第 3 段 · 更新中 ────────────────────────────────
    {
      ch: 2,
      say: '把機器用 <b>USB-C</b> 接上電腦，開機。更新是<b>用瀏覽器</b>做的，不必裝軟體。',
      targets: ['r_usb'],
      screen: { t1: 'USB' },
      hear: '—',
      note: {
        kind: 'tip',
        title: '所以不挑系統',
        body: 'Mac、Linux 都可以。有 USB-C 埠的 iOS 裝置也行，官方明說支援。',
      },
    },
    {
      ch: 2,
      say: '在瀏覽器網址列輸入 <b>mpc-sample.local</b>。連不上就改用 <b>192.168.155.1</b>。',
      targets: ['r_usb'],
      screen: { t1: 'UPDATING' },
      hear: '—',
      note: {
        kind: 'tip',
        title: '本站不轉寫官方步驟',
        body: '畫面上要按哪裡以官方頁面為準。我們不改寫也不翻譯，避免官方改版就過期。',
      },
    },
    {
      ch: 2,
      say: 'Windows 10 是唯一的例外。要到官方下載頁抓 <b>MPC Sample Updater</b> 桌面程式。',
      targets: ['r_usb'],
      screen: { t1: 'UPDATING' },
      hear: '—',
    },
    {
      ch: 2,
      say: 'Windows 10 還要進 Update Mode。<b>開機同時按住 CHOP、MUTE、SAMPLE SELECT</b>。',
      targets: ['chop', 'mute', 'ssel'],
      screen: { t1: 'UPDATE MODE' },
      hear: '—',
    },
    {
      ch: 2,
      say: '更新跑起來之後<b>不要拔線</b>，不要關電源，不要按任何鍵。等它自己跑完。',
      targets: ['r_usb', 'r_power'],
      screen: { t1: 'UPDATING' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '官方唯一的明確警告',
        body: '官方支援頁只強調一件事：更新進行中不要拔線。跑完機器會自己重開。',
      },
    },

    // ── 第 4 段 · 更新之後 ──────────────────────────────
    {
      ch: 3,
      say: '更新完成後重新開機。<b>再按一次 POWER</b>，讓機器用新韌體啟動。',
      targets: ['r_power'],
      screen: { t1: 'BOOTING…', tabs: ['', '', ''], bots: ['', '', ''] },
      hear: '—',
    },
    {
      ch: 3,
      say: '回到 <b>PROJECT</b> 選單確認版本。本站所有課程以韌體 <b>1.3.0</b> 為基準。',
      targets: ['p16'],
      shift: true,
      screen: { t1: 'PROJECT' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '尚未驗證',
        body: '版本號顯示在哪個畫面，我們還沒實測。確認之後這一課會更新。',
      },
    },
    {
      ch: 3,
      say: '按 <b>PLAY</b> 確認機器一切正常。接下來的課都可以放心跟做了。',
      targets: ['play'],
      screen: { t1: 'SEQ 01  ▶  90 BPM' },
      hear: '示範節奏正常播放',
      note: {
        kind: 'win',
        title: '第 3 課完成',
        body: '你的機器現在跑在官方韌體上。之後每次官方更新，記得回來看韌體對照頁。',
      },
    },
  ],
};
