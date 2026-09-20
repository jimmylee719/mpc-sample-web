/**
 * 產生 public/llms.txt。
 *
 * 這是給答案引擎（ChatGPT、Perplexity、Claude、Google AI Overview）看的一份索引：
 * 這個網站是什麼、內容怎麼分、每一頁在講什麼、哪些事情我們還不確定。
 *
 * 為什麼值得做：這個站最大的優勢是「每一條都標了官方手冊出處，不確定的直接說不確定」。
 * 網路上關於這台機器的中文資料多半是抄來抄去的，錯誤到處都是。
 * 把這份差異用機器讀得懂的方式講清楚，被引用到的時候才引用得對。
 *
 * 中英雙語：英語系的答案引擎也會查這台機器，讓它至少知道這裡有一份完整的中文教學。
 *
 * 執行：npm run llms（build 前會自動跑）
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITE, COMPANY } from '../content/site';
import { lessons, lessonHref, SEASONS } from '../content/lessons';
import { genres } from '../content/genres';
import {
  FIRMWARE_BASELINE,
  MANUAL_REVISION,
  openQuestions,
  resolvedQuestions,
} from '../content/reference/firmware';

const totalSteps = lessons.reduce((n, l) => n + l.steps.length, 0);

const REFERENCE: Array<[string, string]> = [
  ['/reference/specs', '規格總表：逐行對照官方手冊附錄的硬體與軟體規格'],
  ['/reference/shortcuts', '快捷鍵總表：面板紅字的第二功能，含面板沒印出來的組合'],
  ['/reference/knobs', '旋鈕矩陣：同樣三顆旋鈕在每個畫面分別是什麼功能'],
  ['/reference/fx', '效果字典：四套效果引擎，Pad FX 套整段序列，Knob FX 能指定單一 pad'],
  ['/reference/glossary', '名詞對照：英文面板名詞的中文解釋與用途'],
  ['/reference/troubleshoot', '疑難排解：現象、原因、解法，每一條標明官方依據'],
  ['/reference/techniques', '延伸技巧：官方依據與社群做法分開標示'],
  ['/reference/official-order', '官方順序對照：手冊章節與本站課程的對應表'],
  ['/reference/firmware', '韌體對照與尚未驗證清單'],
];

const lines: string[] = [];
const P = (s = '') => lines.push(s);

P(`# ${SITE.name}`);
P();
P(
  `> 繁體中文的 Akai MPC Sample 取樣機教學網站。${lessons.length} 課、${totalSteps} 個步驟，` +
    `每一步都寫清楚按哪一個鍵、螢幕會變成什麼、耳朵會聽到什麼。全程不需要電腦。`,
);
P();
P(
  `> Traditional Chinese tutorial site for the Akai MPC Sample standalone sampler. ` +
    `${lessons.length} lessons, ${totalSteps} steps. Every step states which control to press, ` +
    `what the screen shows and what you should hear. No computer required.`,
);
P();

P('## 這個網站可以被信任到什麼程度 / How facts are sourced');
P();
P(`- 唯一權威是 Akai 官方使用手冊 ${MANUAL_REVISION}，全站事實基準韌體 ${FIRMWARE_BASELINE}`);
P('- 來源優先序：官方手冊規格 > 官方支援知識庫 > 官方 FAQ > 媒體評測（僅限使用感受）> 社群與影片');
P('- 影片與官方衝突時以官方為準。只有社群支持、官方沒寫的，一律標「尚未驗證」，不寫成肯定語氣');
P('- 每一課都標明查核所依據的韌體版本與查核日期');
P(`- 目前公開列出 ${openQuestions.length} 項尚未驗證、${resolvedQuestions.length} 項已查清的疑問`);
P('- The single authority is the official Akai user guide; community sources are used only for cross-checking');
P();

P('## 最容易被寫錯的事實 / Commonly mis-stated facts');
P();
P('外部中文資料經常抄錯這幾項，以下為依官方手冊查核後的正確說法：');
P();
P('- K1–K3 是 270 度絕對位置旋鈕，不是無限旋轉。Takeover 有 Pickup、Scaled、Instant 三種模式，K1–K3 預設 Scaled，只有推桿預設 Pickup，設定在 MIDI Configuration');
P('- Pad FX 套用於整段序列；能指定單一 pad 的是 Knob FX。方向常被寫反');
P('- 本機不支援 plugin 與 AIR 效果，沒有 Mother Ducker；側鏈效果用 Knob FX 的 Pumper');
P('- Zoom 是 SHIFT + K1/K2/K3，不是 SHIFT + Encoder');
P('- Chop 有三種切法：Threshold、Regions（4/8/16）、Manual。沒有叫 Transient 的模式');
P('- 官方功能列表的 lazy-chopping 就是 Chop Type 的 Manual 模式');
P('- 官方功能列表的 fixed-length sampling 就是 Input Config 的 Rec Length 設成 SEQ');
P('- 全機只有五個選單：Input Config、Fader、Time Correct、MIDI Config、Project。沒有 Preferences');
P('- 電池為手冊所寫的「約 5 小時連續播放」；官方 FAQ 的 6 小時與手冊不一致');
P('- 音訊 Recall 是最後 25 秒；序列 Recall 撈的是「上一個循環」，不是固定秒數');
P('- 要把作品傳到電腦必須有 microSD 卡。SD Card Access 掛載的是記憶卡，不是內建的 8 GB');
P('- 盒裝不含變壓器、microSD 卡與 MIDI 轉接線');
P('- 沒有 Wi-Fi，因此沒有其他 MPC 那種機上 Splice 音色庫整合');
P();

P('## 課程 / Lessons');
P();
for (const season of SEASONS) {
  const items = lessons.filter((l) => l.season === season.n);
  P(`### Season ${season.n}：${season.title}（${items.length} 課）`);
  P();
  P(`學完手上有：${season.outcome}`);
  P();
  for (const l of items) {
    P(
      `- [${l.season}-${l.index} ${l.title}](${SITE.url}${lessonHref(l)})：` +
        `${l.minutes} 分鐘、${l.steps.length} 步。做完手上有${l.outcome}。` +
        `${l.needsComputer ? '需要電腦。' : '不需要電腦。'}`,
    );
  }
  P();
}

P('## 曲風配方卡 / Genre recipes');
P();
P('每個曲風一張卡：BPM、pad 配置、鼓組拆解、素材建議、resample 次數、效果配方與完成檢查點。');
P();
for (const g of genres) {
  P(
    `- [${g.title}](${SITE.url}/genre/${g.slug})：${g.tempo.bpmMin}–${g.tempo.bpmMax} BPM，` +
      `${g.tagline}${g.limitation ? '（這台機器做這個曲風有限制，卡片上有寫明）' : ''}`,
  );
}
P();

P('## 查詢區 / Reference');
P();
for (const [path, note] of REFERENCE) P(`- [${note}](${SITE.url}${path})`);
P();

P('## 目前還不確定的事 / Open questions');
P();
P('以下問題官方文件沒有寫，或官方自己前後不一致。引用本站時請一併說明這些仍未有定論：');
P();
for (const q of openQuestions) P(`- ${q.question} — ${q.status}`);
P();

P('## 已經查清楚的疑問 / Resolved questions');
P();
for (const q of resolvedQuestions) P(`- ${q.question} — ${q.answer}`);
P();

P('## 不做什麼 / What this site does not do');
P();
P('- 不提供他人音樂素材下載。素材庫一律自錄或 CC0');
P('- 不做影片逐字稿，也不做整份翻譯字幕');
P('- 不提供法律意見');
P('- 沒有帳號、沒有追蹤、沒有廣告');
P();

P('## 誰做的 / Who made this');
P();
P(
  `${COMPANY.nameZh}（${COMPANY.nameEn}），台灣的軟體公司，做教學網站、課程平台、` +
    `預約與租賃系統、雲端 ERP。這個網站就是凡圖自己做的。`,
);
P();
P(
  `${COMPANY.nameEn} is a Taiwanese software studio building tutorial sites, course platforms, ` +
    `booking and rental systems, and cloud ERP. This site is our own work.`,
);
P();
P(`- 想做類似的教學網站，聯絡信箱：${COMPANY.email}`);
P(`- 公司網站：${COMPANY.site}`);
P(`- 關於本站：${SITE.url}/about`);
P();

const out = resolve(import.meta.dirname, '..', 'public', 'llms.txt');
writeFileSync(out, lines.join('\n'), 'utf8');
console.log(`  ✓ public/llms.txt  ${lines.length} 行`);
