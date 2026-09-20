/**
 * 按鍵比對稽核。
 *
 * 課文裡的 <b> 內容會被換成面板上的小按鍵圖示。這支把整份課程跑一遍，
 * 印出每一個會被換掉的詞、以及換不到面板的詞，讓人用眼睛確認有沒有誤判。
 *
 * 誤判的代價很高：把 RESAMPLE 咬成 RE + SAMPLE 這種錯，看起來還很像對的。
 *
 * 執行：npm run keys
 */

import { lessons } from '../content/lessons/index';
import { KEY_PATTERN, controlIdFor } from '../components/mpc/key-alias';
import { keyArtFor } from '../components/mpc/key-art';

const matched = new Map<string, number>();
const noArt = new Map<string, number>();
const boldNoKey = new Map<string, number>();

let boldTotal = 0;
let boldWithKey = 0;

for (const lesson of lessons) {
  for (const step of lesson.steps) {
    for (const m of step.say.matchAll(/<b>([\s\S]*?)<\/b>/g)) {
      const inner = m[1]!;
      boldTotal++;
      const hits = [...inner.matchAll(new RegExp(KEY_PATTERN.source, 'g'))];
      if (hits.length === 0) {
        boldNoKey.set(inner, (boldNoKey.get(inner) ?? 0) + 1);
        continue;
      }
      boldWithKey++;
      for (const h of hits) {
        const token = h[1]!;
        const id = controlIdFor(token);
        if (id === null || keyArtFor(id) === null) {
          noArt.set(token, (noArt.get(token) ?? 0) + 1);
        } else {
          matched.set(token, (matched.get(token) ?? 0) + 1);
        }
      }
    }
  }
}

const sort = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]);

console.log(`bold 共 ${boldTotal} 段，其中 ${boldWithKey} 段含可視覺化的按鍵`);
console.log('');
console.log('── 會被換成按鍵圖示的詞 ──');
for (const [t, n] of sort(matched)) console.log(`  ${String(n).padStart(4)}  ${t}`);

if (noArt.size > 0) {
  console.log('');
  console.log('── ⚠️ 比對到但畫不出來（面板上沒有這個控制項）──');
  for (const [t, n] of sort(noArt)) console.log(`  ${String(n).padStart(4)}  ${t}`);
}

console.log('');
console.log(`── 沒有比對到按鍵的 bold（前 25 個，共 ${boldNoKey.size} 種）──`);
for (const [t, n] of sort(boldNoKey).slice(0, 25)) {
  console.log(`  ${String(n).padStart(4)}  ${t.slice(0, 40)}`);
}

if (noArt.size > 0) process.exitCode = 1;

// ── 額外檢查：按鍵名稱出現在 <b> 外面 ──
// 本站慣例是實際按鍵一律加粗。沒加粗的按鍵不會變成圖示，
// 讀者也少了一個視覺提示，所以這裡列出來讓人決定要不要補。
const outside = new Map<string, string[]>();
for (const lesson of lessons) {
  lesson.steps.forEach((step, idx) => {
    const bare = step.say.replace(/<b>[\s\S]*?<\/b>/g, '');
    for (const m of bare.matchAll(new RegExp(KEY_PATTERN.source, 'g'))) {
      const token = m[1]!;
      if (!controlIdFor(token)) continue;
      const list = outside.get(token) ?? [];
      list.push(`${lesson.id}#${idx + 1}`);
      outside.set(token, list);
    }
  });
}

console.log('');
const outCount = [...outside.values()].reduce((n, v) => n + v.length, 0);
console.log(`── 沒有加粗的按鍵名稱：${outCount} 處 ──`);
for (const [t, where] of [...outside.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(where.length).padStart(3)}  ${t.padEnd(16)} ${where.slice(0, 6).join(' ')}`);
}
