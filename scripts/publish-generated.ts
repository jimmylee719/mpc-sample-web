/**
 * 把建置後才產生的檔案搬進 public/，讓 Vercel 收得到。
 *
 * 為什麼需要：Vercel 的 Next.js 建置器只發布 Next 自己產出的檔案加上 public/。
 * Pagefind 的索引與 offline-manifest.json 是 next build 之後才寫進 out/ 的，
 * 在本機一切正常，但正式站上一直是 404——站內搜尋從來沒有在正式站上運作過。
 *
 * 用法：
 *   tsx scripts/publish-generated.ts clean    prebuild 開頭：清掉上一次的，避免舊的索引被 next build 複製進 out/
 *   tsx scripts/publish-generated.ts copy     postbuild 結尾：把這一次的搬進 public/
 *
 * 這兩樣東西都不進版控（.gitignore），每次建置重新產生。
 */

import { cpSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = resolve(ROOT, 'out');
const PUB = resolve(ROOT, 'public');

const ITEMS = ['pagefind', 'offline-manifest.json'];

const mode = process.argv[2];

if (mode === 'clean') {
  for (const item of ITEMS) rmSync(resolve(PUB, item), { recursive: true, force: true });
  console.log('  ✓ 清掉 public/ 裡上一次產生的搜尋索引與離線清單');
} else if (mode === 'copy') {
  for (const item of ITEMS) {
    const from = resolve(OUT, item);
    if (!existsSync(from)) {
      console.error(`  ✗ 找不到 out/${item}，postbuild 前面的步驟可能失敗了`);
      process.exit(1);
    }
    cpSync(from, resolve(PUB, item), { recursive: true });
  }
  console.log('  ✓ 搜尋索引與離線清單已放進 public/，部署時會一起發布');
} else {
  console.error('用法：publish-generated.ts clean | copy');
  process.exit(1);
}
