/**
 * 產生 out/offline-manifest.json：整站離線下載要抓哪些檔案。
 *
 * 為什麼要在建置後產生：Service Worker 原本只存「你開過的頁」。
 * 一個人帶著機器去戶外，事先不可能把 36 課一課一課點開。
 * 這份清單讓「整站下載」按鈕一次抓齊：所有頁面、所有 JS／CSS、站內搜尋的索引。
 *
 * 不抓的東西：
 * - __next.*.txt：那是站內換頁用的資料。離線時換頁失敗，Next 會改成整頁載入，
 *   Service Worker 就會從快取拿 HTML，所以不需要。抓了反而多一倍容量。
 * - 404 與離線頁本身（離線頁在 Service Worker 安裝時就存了）
 * - og.png：分享縮圖，網站本身用不到
 *
 * 執行：postbuild 自動跑，在 pagefind 之後
 */

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const OUT = resolve(import.meta.dirname, '..', 'out');

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const all = walk(OUT).map((p) => ({ abs: p, rel: '/' + relative(OUT, p).replace(/\\/g, '/') }));

const SKIP_PAGES = new Set(['/404.html', '/_not-found.html', '/offline.html']);

const pages = all
  .filter((f) => f.rel.endsWith('.html') && !SKIP_PAGES.has(f.rel))
  .map((f) => ({ ...f, url: f.rel === '/index.html' ? '/' : f.rel.replace(/\.html$/, '') }));

const assets = all.filter(
  (f) =>
    f.rel.startsWith('/_next/static/') ||
    f.rel.startsWith('/pagefind/') ||
    ['/manifest.webmanifest', '/favicon.svg', '/icon-192.png', '/icon-512.png'].includes(f.rel),
);

const hash = createHash('sha256');
let bytes = 0;
for (const f of [...pages, ...assets]) {
  const buf = readFileSync(f.abs);
  bytes += buf.length;
  hash.update(f.rel).update(buf);
}

const manifest = {
  // 內容一變版本就變，前台據此判斷「你下載的是不是最新的」
  version: hash.digest('hex').slice(0, 12),
  builtAt: new Date().toISOString().slice(0, 10),
  bytes,
  pages: pages.map((p) => p.url).sort(),
  assets: assets.map((a) => a.rel).sort(),
};

writeFileSync(join(OUT, 'offline-manifest.json'), JSON.stringify(manifest));
console.log(
  `  ✓ offline-manifest.json  ${manifest.pages.length} 頁、${manifest.assets.length} 個資源、` +
    `${(bytes / 1024 / 1024).toFixed(1)} MB，版本 ${manifest.version}`,
);
