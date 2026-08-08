import type { Lesson } from '@/types/lesson';

export const s2_01: Lesson = {
  id: 's2-01',
  slug: 'record-from-your-phone',
  season: 2,
  index: 1,
  title: '從手機把聲音抓進來',
  outcome: '一段從外部裝置錄進 pad 的乾淨素材',
  minutes: 20,
  chapters: ['先認識八個來源', '數位那條路', '類比那條路', '錄之前先試音'],
  needsComputer: false,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-08-08',
  prerequisites: ['s1-01', 's1-02'],
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA)：Input Configuration 的 Source 與 Monitor 選項',
    '操作流程為實機實測後自行撰寫',
  ],
  checkpoints: [
    '你知道 Input Config 一共有八個錄音來源',
    '你知道 USB 是數位、背板輸入是類比，兩條路不一樣',
    '你已經用其中一條路錄進一段聲音',
    '錄之前你有先看音量表確認沒有破音',
  ],
  steps: [
    // ── 第 1 段 · 先認識八個來源 ────────────────────────
    {
      ch: 0,
      say: '<b>按住 SHIFT 再按 SAMPLE</b> 打開 Input Config。所有錄音來源都在這裡選。',
      targets: ['sample'],
      shift: true,
      screen: { t1: 'INPUT CONFIG', tabs: ['Source', 'Monitor', 'Thresh'], bots: ['Mic', 'Auto', 'Off'] },
      hear: '—',
    },
    {
      ch: 0,
      say: '轉 <b>K1</b> 看一遍，來源一共八個。<b>Mic</b>、<b>Rear</b>、Rear L、Rear R。還有 <b>Resample</b>、<b>USB</b>、USB L、USB R。',
      targets: ['k1'],
      screen: { t1: 'SOURCE', tabs: ['Source', 'Monitor', 'Thresh'], bots: ['Mic', 'Auto', 'Off'] },
      hear: '—',
      note: {
        kind: 'tip',
        title: '八個來源分三類',
        body: 'Mic 是內建麥克風。Rear 三個是背板類比輸入。USB 三個是數位。Resample 是錄機器自己。',
      },
    },
    {
      ch: 0,
      say: '選 <b>Rear</b> 或 <b>USB</b> 時是立體聲。<b>加 L 或 R</b> 就只錄那一邊。',
      targets: ['k1'],
      screen: { t1: 'SOURCE   USB', tabs: ['Source', 'Monitor', 'Thresh'], bots: ['USB', 'Auto', 'Off'] },
      hear: '—',
    },

    // ── 第 2 段 · 數位那條路 ────────────────────────────
    {
      ch: 1,
      say: '數位這條路走背板的 <b>USB-C</b>。訊號不經過空氣，也不經過類比線路。',
      targets: ['r_usb'],
      screen: { t1: 'SOURCE   USB' },
      hear: '—',
      note: {
        kind: 'tip',
        title: '為什麼優先選數位',
        body: '沒有環境噪音，也沒有線路底噪。同一段素材，數位錄出來就是比較乾淨。',
      },
    },
    {
      ch: 1,
      say: '把播放裝置接上 <b>USB-C</b>，再把 Source 轉到 <b>USB</b>。',
      targets: ['r_usb'],
      screen: { t1: 'SOURCE   USB' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '尚未驗證',
        body: '手機需不需要 OTG 或轉接器、電腦要不要裝驅動，我們還沒實測。接不上時先換一條能傳資料的線。',
      },
    },

    // ── 第 3 段 · 類比那條路 ────────────────────────────
    {
      ch: 2,
      say: '類比這條路走背板的 <b>AUDIO IN 1/L</b> 與 <b>2/R</b>。用線把耳機孔接進來。',
      targets: ['r_in1', 'r_in2'],
      screen: { t1: 'SOURCE   REAR' },
      hear: '—',
    },
    {
      ch: 2,
      say: '轉背板的 <b>REC GAIN</b> 調整進來的音量。這一顆決定會不會破音。',
      targets: ['r_gain'],
      screen: { t1: 'SOURCE   REAR' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '尚未驗證',
        body: '背板輸入是否提供幻象電源，官方手冊沒有寫。要接需要供電的麥克風前請先確認。',
      },
    },

    // ── 第 4 段 · 錄之前先試音 ──────────────────────────
    {
      ch: 3,
      say: '轉 <b>K2</b> 打開 <b>Monitor</b>，先聽聽進來的聲音。這一步省不得。',
      targets: ['k2'],
      screen: { t1: 'MONITOR   ON', tabs: ['Source', 'Monitor', 'Thresh'], bots: ['USB', 'On', 'Off'] },
      hear: '從機器聽到播放裝置的聲音',
    },
    {
      ch: 3,
      say: '看螢幕右邊的音量表。<b>紅色那兩格不要一直亮</b>，亮了就是太大聲。',
      targets: ['vol'],
      screen: { t1: 'LEVEL OK' },
      hear: '播放裝置的聲音',
      note: {
        kind: 'warn',
        title: '破音救不回來',
        body: '錄進去才發現破音，只能重錄。寧可先錄小聲，之後再用 Normalize 推上去。',
      },
    },
    {
      ch: 3,
      say: '按 <b>SAMPLE RECORD</b>，再敲一顆空 <b>pad</b> 開始錄。再敲一次結束。',
      targets: ['srec'],
      screen: { t1: '● RECORDING', tabs: ['', '', ''], bots: ['', '', ''] },
      hear: '你要取樣的那段聲音',
      note: {
        kind: 'win',
        title: '第 2 季開始了',
        body: '素材進來了，但先別急著用。下一課決定這段素材到底能不能用。',
      },
    },
  ],
};
