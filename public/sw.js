/**
 * 敲敲取樣 Service Worker
 *
 * 目的只有一個：裝成 App 之後，沒有網路時不要出現瀏覽器的錯誤頁。
 *
 * 兩條原則，刻意保守：
 * 1. 頁面一律 network-first。有網路就永遠拿到最新內容，快取只是離線時的備援。
 *    這樣才不會發生「內容更新了但使用者永遠看到舊的」。
 * 2. 靜態資產（/_next/static 底下檔名帶雜湊）才用 cache-first。
 *
 * 不做背景同步、不做推播、不蒐集任何資料。
 */

const VERSION = 'v4';
const PAGES = `pages-${VERSION}`;
const ASSETS = `assets-${VERSION}`;
const OFFLINE_URL = '/offline';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PAGES);
      // 只預存離線備援頁與首頁，其餘等使用者實際走過再存
      await cache.addAll([OFFLINE_URL, '/']).catch(() => undefined);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== PAGES && k !== ASSETS).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // 只處理自己站上的請求。YouTube、R2 一律不碰。
  if (url.origin !== self.location.origin) return;

  // ── 頁面：network-first ──
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          // 只存成功的頁面。把 404 存起來，離線時會變成假的「找不到」。
          if (fresh.ok) {
            const cache = await caches.open(PAGES);
            cache.put(request, fresh.clone());
          }
          return fresh;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;
          const offline = await caches.match(OFFLINE_URL);
          return offline ?? Response.error();
        }
      })(),
    );
    return;
  }

  // ── 靜態資產：cache-first（檔名帶雜湊，不會有舊版問題）──
  const isHashed = url.pathname.startsWith('/_next/static/');
  const isIcon = /\.(png|svg|webmanifest|woff2?)$/.test(url.pathname);
  if (!isHashed && !isIcon) return;

  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const fresh = await fetch(request);
        if (fresh.ok) {
          const cache = await caches.open(ASSETS);
          cache.put(request, fresh.clone());
        }
        return fresh;
      } catch {
        return Response.error();
      }
    })(),
  );
});
