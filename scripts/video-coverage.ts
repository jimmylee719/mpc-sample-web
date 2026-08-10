/**
 * 影片覆蓋率報告：哪些課還沒有任何延伸觀看影片。
 * 執行：npm run videos
 */

import { lessons } from '../content/lessons/index';
import { genres } from '../content/genres/index';
import { videosFor, allVideos } from '../content/videos';

function count(key: string, extra = 0): number {
  return videosFor(key).length + extra;
}

const gaps: string[] = [];
console.log('── 課程 ──');
for (const l of lessons) {
  const n = count(l.id, l.videos?.length ?? 0);
  if (n === 0) {
    gaps.push(l.id);
    console.log(`  ✗ ${l.id}  ${l.title}  ｜ ${l.outcome}`);
  }
}

const genreGaps: string[] = [];
console.log('── 曲風 ──');
for (const g of genres) {
  if (count(g.slug) === 0) {
    genreGaps.push(g.slug);
    console.log(`  ✗ ${g.slug}  ${g.title}`);
  }
}

const lessonExtra = lessons.reduce((n, l) => n + (l.videos?.length ?? 0), 0);

console.log('');
console.log(`影片總數 ${allVideos.length + lessonExtra}（含重複引用）`);
console.log(`課程覆蓋 ${lessons.length - gaps.length}/${lessons.length}`);
console.log(`曲風覆蓋 ${genres.length - genreGaps.length}/${genres.length}`);
