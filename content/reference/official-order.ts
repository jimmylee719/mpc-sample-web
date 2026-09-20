/**
 * 官方順序對照。
 *
 * 為什麼需要這一頁：
 * 本站的課程順序是依「一課做完一個作品」排的，跟官方手冊的章節順序不一樣。
 * 那是刻意的設計（CLAUDE.md 鐵則 1），但讀者有權知道兩者的差別在哪，
 * 也有權選擇照官方順序走。
 *
 * 這一頁把官方的兩種順序完整列出來，每一項都連到本站對應的課：
 *   A. 手冊第 6–14 頁的 Tutorial —— 手冊自己寫「建議照這個順序做」
 *   B. 手冊的完整章節順序 —— 參考書式的功能排列
 *
 * 全部頁碼與章節名稱對照官方使用手冊 v1.3.0 (RevA) 的目錄。
 */

export interface OfficialEntry {
  /** 官方章節英文名 */
  en: string;
  /** 中文說明 */
  zh: string;
  /** 手冊頁碼 */
  page: number;
  /** 本站對應課程 id，空陣列代表本站還沒有專門教 */
  lessons: string[];
  /** 對應到非課程頁面時填這裡 */
  hrefs?: Array<{ href: string; label: string }>;
  /** 差異說明。只有在本站做法與官方明顯不同時才填 */
  note?: string;
}

export interface OfficialSection {
  id: string;
  title: string;
  intro: string;
  entries: OfficialEntry[];
}

/**
 * A. 官方 Tutorial（手冊 p.6–14）
 * 手冊原文：「This tutorial walks you through the basics of making beats with MPC Sample.
 * We recommend following the steps in this chapter in order.」
 */
export const officialTutorial: OfficialSection = {
  id: 'tutorial',
  title: '官方 Tutorial 的六步',
  intro:
    '手冊第 6 頁的 Tutorial 章節，原文明講「建議照這個順序做」。這是官方唯一一份有明確順序的教學。',
  entries: [
    {
      en: 'Exploring Samples',
      zh: '先聽過原廠素材',
      page: 7,
      lessons: [],
      note: '本站目前沒有專門的一課。第 1 課直接從錄自己的聲音開始，官方則是先讓你把內建的幾百個素材翻過一遍。',
    },
    {
      en: 'Playing Sequences',
      zh: '播放原廠序列',
      page: 8,
      lessons: [],
      note: '同上，本站沒有專門一課。官方的用意是先讓你聽見「完成品長什麼樣」再動手。',
    },
    {
      en: 'Recording a Sequence',
      zh: '錄一段自己的序列',
      page: 9,
      lessons: ['s1-01'],
      note: '本站 1-1 的第 4 段就是這件事。',
    },
    {
      en: 'Recording a Sample',
      zh: '用內建麥克風錄樣本',
      page: 11,
      lessons: ['s1-01', 's2-01'],
      note: '官方排在序列之後，本站 1-1 排在序列之前。理由是取樣是這台機器的靈魂，先做它比較有感。',
    },
    { en: 'Using FX', zh: 'Pad FX', page: 13, lessons: ['s4-01', 's4-02'] },
    { en: 'Flex Beat', zh: 'Flex Beat 節奏切割', page: 14, lessons: ['s4-03'] },
  ],
};

/** B. 手冊完整章節順序 */
export const officialChapters: OfficialSection[] = [
  {
    id: 'setup',
    title: 'Setup 設定',
    intro: '手冊 p.4–5。開箱之後的第一件事。',
    entries: [
      {
        en: 'Firmware Updates',
        zh: '韌體更新',
        page: 4,
        lessons: ['s1-03'],
      },
      {
        en: 'Connection Diagram',
        zh: '連接圖',
        page: 5,
        lessons: ['s2-01'],
        hrefs: [{ href: '/start', label: '開始之前' }],
      },
    ],
  },
  {
    id: 'features',
    title: 'Features 面板',
    intro: '手冊 p.15–23。每一顆控制項的名稱與功能。',
    entries: [
      {
        en: 'Top Panel / Rear Panel',
        zh: '上面板與背板',
        page: 15,
        lessons: ['s1-02'],
      },
    ],
  },
  {
    id: 'operation',
    title: 'Operation 操作',
    intro: '手冊 p.24–45。這是手冊的主體。',
    entries: [
      {
        en: 'Sample Mode',
        zh: '樣本模式：修剪、調音、濾波',
        page: 24,
        lessons: ['s1-01', 's2-04', 's2-05'],
      },
      {
        en: 'Pad Play',
        zh: 'Pad 演奏，含 Chop 模式',
        page: 31,
        lessons: ['s2-06', 's2-07', 's3-04', 's5-04'],
        note: '手冊把 Chop 的控制項說明放在 Pad Play 章節底下，不是獨立章節。',
      },
      {
        en: 'Loading and Saving Samples',
        zh: '載入與儲存樣本',
        page: 36,
        lessons: ['s2-08', 's3-10'],
      },
      { en: 'Sample Record Mode', zh: '取樣錄音', page: 37, lessons: ['s2-01', 's3-02'] },
      { en: 'Sequence Mode', zh: '序列模式', page: 39, lessons: ['s5-02'] },
      { en: 'Recording Sequences', zh: '錄製序列', page: 41, lessons: ['s1-01'] },
      { en: 'Editing Sequences', zh: '編輯序列', page: 42, lessons: ['s3-06', 's3-08'] },
      { en: 'Step Edit', zh: '逐格編輯', page: 43, lessons: ['s3-07'] },
      { en: 'Song Mode', zh: '歌曲模式', page: 44, lessons: ['s3-09'] },
    ],
  },
  {
    id: 'effects',
    title: 'Effects 效果',
    intro: '手冊 p.46–56。四套引擎各自獨立。',
    entries: [
      { en: 'Effects 總覽', zh: '四套引擎的分工', page: 46, lessons: ['s4-01'] },
      { en: 'Pad FX', zh: 'Pad FX 16 種', page: 47, lessons: ['s4-02'] },
      { en: 'Flex Beat', zh: 'Flex Beat', page: 50, lessons: ['s4-03'] },
      { en: 'Knob FX', zh: 'Knob FX 28 種', page: 51, lessons: ['s4-04', 's4-06'] },
      { en: 'Compressor', zh: 'Color-Compressor', page: 56, lessons: ['s4-05', 's4-07'] },
    ],
  },
  {
    id: 'menus',
    title: 'Menus 選單',
    intro: '手冊 p.57–63。全機只有這五個選單，沒有第六個。',
    entries: [
      { en: 'Input Configuration', zh: '輸入設定', page: 57, lessons: ['s2-01'] },
      { en: 'Fader', zh: '推桿指派', page: 58, lessons: ['s3-07'] },
      { en: 'Time Correct', zh: '量化與 Swing', page: 59, lessons: ['s3-07'] },
      {
        en: 'MIDI Configuration',
        zh: 'MIDI、CV/Sync、Takeover、回復原廠',
        page: 60,
        lessons: ['s1-02', 's5-06'],
        note: '三組 Takeover 設定藏在這個選單裡，不在 Fader 選單。這是最多人找不到的一項。',
      },
      { en: 'Project', zh: '專案存取與 SD Card Access', page: 62, lessons: ['s1-04', 's3-10'] },
    ],
  },
  {
    id: 'appendix',
    title: 'Appendix 附錄',
    intro: '手冊 p.64–66。',
    entries: [
      {
        en: 'Technical Specifications',
        zh: '技術規格',
        page: 64,
        lessons: [],
        hrefs: [{ href: '/reference/specs', label: '規格總表' }],
      },
    ],
  },
];
