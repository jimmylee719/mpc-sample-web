import type { VideoRef } from '@/types/lesson';

/**
 * 官方教學影片對照表。
 *
 * 來源：Akai Professional 官方頻道的「Getting Started with MPC Sample」系列，共 30 集。
 *
 * ⚠️ 對應方式的誠實說明：
 * 這份對照是**依影片標題**判斷主題後配到對應課程的。標題與頻道都已用 YouTube 官方
 * oEmbed 端點逐一驗證存在。但本站尚未有人實際觀看影片內容，
 * 所以每一支都標 `reviewed: false`，前台會顯示「尚未人工確認」。
 *
 * 影片內容絕對不可以轉錄成文字（著作權），這裡只存標題、頻道與對應關係。
 */

const OFFICIAL = {
  channel: 'Akai Professional',
  lang: 'en' as const,
  official: true,
  reviewed: false,
};

const v = (youtubeId: string, title: string, why: string): VideoRef => ({
  youtubeId,
  title: `Getting Started with MPC Sample | ${title}`,
  why,
  ...OFFICIAL,
});

/** key 是 lesson id 或 genre slug */
export const officialVideos: Record<string, VideoRef[]> = {
  // ── Season 1 ────────────────────────────────────────
  's1-02': [
    v('Q3DzJ2t6p68', 'Navigation and Sounds', '官方版的面板導覽。本課教你讀懂面板，這支讓你看到實際操作的樣子。'),
  ],
  's1-01': [
    v('iOEawVwkI8Y', 'Recording with the Built-in Microphone', '本課第 2 段用內建麥克風錄音，這支是官方示範。'),
    v('SojM-PAZ8iY', 'Editing Samples', '對應本課第 3 段的修剪與 Normalize。'),
    v('1vMGz735pe8', 'Using the Sequencer', '對應本課第 4 段的序列錄音。'),
  ],
  's1-03': [
    v('L8g18bvb7Sw', 'How to Update MPC Sample', '官方版的韌體更新示範。本課刻意不轉寫官方步驟，直接看這支最準。'),
  ],
  's1-04': [
    v('CwHIOyGUOYU', 'Load and Save Projects', '對應本課的專案存檔與載入。'),
    v('CYXo4-L4Cgk', 'Never Miss a Beat with Sample Recall', '本課提到 Recall 的秒數官方自相矛盾，這支是官方自己的示範。'),
  ],

  // ── Season 2 ────────────────────────────────────────
  's2-01': [
    v('YPvWi6L0o6s', 'Sampling with Smart Device using USB-C', '本課的手機取樣有幾項尚未驗證，這支是官方示範，優先看它。'),
    v('0AFQVjzrGCc', 'Using USB-C Audio and MIDI', 'USB-C 同時走音訊與 MIDI 的官方說明。'),
  ],
  's2-02': [
    v('0lGotNt39W4', 'Using Splice with MPC Sample', '本課第四種乾淨來源是付費素材包。這支示範官方與 Splice 的整合。'),
  ],
  's2-03': [
    v('yCWCuo6OZX0', 'Sampling From Vinyl', '從黑膠取樣的官方示範。本課教怎麼找乾淨段落，這支示範怎麼把它收進來。'),
    v('k3yKwSJjKfw', 'Chopping Drum Breaks and Loops', '找到鼓段落之後怎麼切，官方版示範。'),
    v('oyPESIIH4B0', 'Using Timestretch and Repitch', '對應本課第 4 段的 Warp 對速度。'),
  ],
  's2-06': [
    v('-_KNPLI-JVc', 'Using Chop Mode', 'Chop 模式的官方示範。四種切法的實際手感用看的最快。'),
  ],
  's2-08': [
    v('z4tGpU32qR4', 'Load and Save Samples', '對應本課的單獨存樣本。'),
    v('gIUTHUtuoGE', 'Transferring Sounds from Mac and PC', '把素材傳進傳出的官方示範。'),
  ],

  // ── Season 3 ────────────────────────────────────────
  's3-02': [
    v('ofs27Qq0Plw', 'Resampling', '★ 全站最重要一課的官方示範。做之前先看一遍。'),
  ],
  's3-04': [
    v('5QFrfAPDDN4', 'Using 16 Levels', '16 Levels 的官方示範，含 Tune 與 Filter 兩種型式。'),
  ],
  's3-05': [
    v('7KOFZfAhIZ0', 'Layering Samples using Pad Link', 'Pad Link 疊層的官方示範，標題直接點明用途。'),
  ],
  's3-07': [
    v('wUOQ_pbrAVE', 'How to Step Edit', '對應本課第 1 段的逐格編輯。'),
    v('A7hU4e67_F8', 'Using Swing and Quantize', '對應本課第 3 段的 Swing 與量化。'),
    v('dqMew85jKsk', 'Using The Legacy Fader', '對應本課第 4 段的推桿選單。'),
    v('MlQfZ2H284o', 'Recording Automation', '⚠️ 自動化錄製本站目前沒有課，這支是唯一來源。'),
  ],
  's3-08': [
    v('oqpx53UpylY', 'How to use Song Mode', 'Song Mode 串接的官方示範。'),
  ],
  's3-09': [
    v('icD6d6H79cM', 'Loading Kits and Samples', '對應本課的 Load Kit 換音色不換編曲。'),
  ],

  // ── Season 4 ────────────────────────────────────────
  's4-01': [
    v('uqjp_6x7E_8', 'Using Effects', '四套效果引擎的官方導覽。'),
  ],
  's4-05': [
    v('c-PhoOEnSVc', 'Sidechain Effect using Pumper', '官方標題直接寫明 Pumper 就是拿來做側鏈效果的，佐證本課說法。'),
  ],

  // ── Season 5 ────────────────────────────────────────
  's5-06': [
    v('t2Y5IgRbfMY', 'Using External MIDI and Synths', '接外部合成器的官方示範，對應本課的 MIDI 設定。'),
  ],

  // ── 曲風 ────────────────────────────────────────────
  'boom-bap': [
    v('YAKswgIC1LY', 'Making a Hip Hop Beat', '官方從零做一首嘻哈的完整示範，跟這張配方卡同一個曲風。'),
  ],
  house: [
    v('4gsiz4aobfI', 'Making a House Track', '官方從零做一首 House 的完整示範，跟這張配方卡同一個曲風。'),
  ],
};

/** 取得某一課或某一個曲風的官方影片 */
export function videosFor(key: string): VideoRef[] {
  return officialVideos[key] ?? [];
}

/** 全部影片，供驗證與統計使用 */
export const allOfficialVideos: VideoRef[] = Object.values(officialVideos).flat();
