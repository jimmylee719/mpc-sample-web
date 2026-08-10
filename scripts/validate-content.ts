/**
 * 建置期內容驗證。掛在 package.json 的 prebuild，`npm run build` 之前自動執行。
 * 任何一項失敗即 exit 1，建置中止。
 */

import { lessons } from '../content/lessons/index';
import { genres } from '../content/genres/index';
import { officialVideos, communityVideos } from '../content/videos';
import { validateLessons, validateGenres, validateVideoRegistry } from './lib/validate';
import { printIssues } from './lib/report';

function main(): void {
  console.log('內容驗證開始…');
  console.log(`  課程 ${lessons.length} 課、曲風 ${genres.length} 個`);

  const knownKeys = new Set([...lessons.map((l) => l.id), ...genres.map((g) => g.slug)]);
  const issues = [
    ...validateLessons(lessons),
    ...validateGenres(genres),
    ...validateVideoRegistry(officialVideos, knownKeys, { label: 'officialVideos' }),
    // 社群影片同一支可以合理對到多課，所以放行跨頁重複，其餘規則一樣嚴
    ...validateVideoRegistry(communityVideos, knownKeys, {
      label: 'communityVideos',
      allowCrossKeyReuse: true,
    }),
  ];

  if (issues.length > 0) {
    console.error(`\n內容驗證失敗，共 ${issues.length} 個問題：\n`);
    printIssues(issues);
    console.error('\n建置中止。修好上面的問題再跑一次。');
    process.exit(1);
  }

  if (lessons.length === 0 && genres.length === 0) {
    console.log('  （目前還沒有內容。P1 起會逐課加入。）');
  }

  console.log('內容驗證通過 ✅');
}

main();
