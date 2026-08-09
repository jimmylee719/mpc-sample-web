/**
 * 驗證腳本的自我測試。
 *
 * 回答一個問題：驗證腳本真的擋得住嗎？
 *   1. 拿刻意寫錯的資料去餵，五種指定錯誤必須全部被抓到（抓不到就 exit 1）
 *   2. 拿完全合法的資料去餵，必須零錯誤（會誤報也 exit 1）
 *
 * 這支不進建置流程，是給人手動確認用的：`npm run validate:selftest`
 */

import { brokenLesson } from '../content/__fixtures__/broken-lesson';
import { validLesson } from '../content/__fixtures__/valid-lesson';
import { validateLesson, type IssueCode } from './lib/validate';
import { labelOf, printIssues } from './lib/report';

/** P0 驗證閘門指定必須攔下的五種錯誤 */
const MUST_CATCH: readonly IssueCode[] = [
  'MISSING_HEAR',
  'MISSING_SCREEN',
  'SAY_NO_BOLD',
  'BAD_CONTROL_ID',
  'SENTENCE_TOO_LONG',
  // 影片相關：ID 格式錯誤，以及有人試圖把逐字稿存進資料
  'BAD_VIDEO',
];

function main(): void {
  let failed = false;

  // ---- 測試 1：壞資料必須被攔下 ----
  console.log('測試 1／2：刻意寫錯的資料，五種錯誤是否都被攔下\n');
  const brokenIssues = validateLesson(brokenLesson, new Set(['s9-99']));
  const caught = new Set(brokenIssues.map((i) => i.code));

  for (const code of MUST_CATCH) {
    const hit = brokenIssues.filter((i) => i.code === code);
    if (hit.length > 0) {
      console.log(`  ✅ ${labelOf(code)} — 攔下 ${hit.length} 處｜${hit[0]!.where}`);
    } else {
      console.error(`  ❌ ${labelOf(code)} — 沒攔到，驗證腳本失效`);
      failed = true;
    }
  }

  const extra = [...caught].filter((c) => !MUST_CATCH.includes(c));
  if (extra.length > 0) {
    console.log(`\n  （另外還抓到：${extra.map(labelOf).join('、')}）`);
  }

  // ---- 測試 2：好資料不能被誤報 ----
  console.log('\n測試 2／2：完全合法的資料，是否零誤報\n');
  const cleanIssues = validateLesson(validLesson, new Set(['s0-00']));
  if (cleanIssues.length === 0) {
    console.log('  ✅ 合法資料回報零錯誤');
  } else {
    console.error(`  ❌ 合法資料被誤報 ${cleanIssues.length} 個問題：`);
    printIssues(cleanIssues);
    failed = true;
  }

  if (failed) {
    console.error('\n自我測試失敗。驗證腳本不可信，不要 commit。');
    process.exit(1);
  }
  console.log('\n自我測試通過 ✅ 驗證腳本確實擋得住這五種錯誤。');
}

main();
