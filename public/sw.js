/**
 * 敲敲取樣 Service Worker
 *
 * 目的：裝成 App、或按過「整站下載」之後，沒有網路也能完整上課。
 *
 * 原則：
 * 1. 頁面一律 network-first。有網路就拿最新的並順手更新快取；沒網路才用快取。
 *    所以內容更新了不會卡在舊版。
 * 2. /_next/static 底下檔名帶雜湊，cache-first，永遠不會過期。
 * 3. 站內搜尋的索引（/pagefind/）network-first，離線時用快取，搜尋照樣能用。
 *
 * 快取名稱刻意固定、不帶版本號。帶版本號的話每次部署都會把整份快取刪掉，
 * 戶外下載好的課程一上線就消失——這正是使用者最不想要的事。
 * 新版本的檔案會在下次有網路時自然覆蓋舊的。
 *
 * 不做背景同步、不做推播、不蒐集任何資料。
 */

const PAGES = 'pages';
const ASSETS = 'assets';
const OFFLINE_URL = '/offline';
const KEEP = [PAGES, ASSETS];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PAGES);
      // 只預存離線備援頁與首頁，其餘等使用者實際走過，或按「整站下載」
      await cache.addAll([OFFLINE_URL, '/']).catch(() => undefined);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // 只清掉舊版那些帶版本號的快取（pages-v4 之類），固定名稱的留著
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});

/** 頁面快取的 key 一律不帶查詢字串與結尾斜線，?step=7 與 /learn/ 才找得到同一份 */
function pageKey(url) {
  const u = new URL(url);
  let path = u.pathname;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return u.origin + path;
}

async function cachedPage(request) {
  const cache = await caches.open(PAGES);
  return (
    (await cache.match(pageKey(request.url))) ??
    (await cache.match(request, { ignoreSearch: true })) ??
    null
  );
}

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
            cache.put(pageKey(request.url), fresh.clone());
          }
          return fresh;
        } catch {
          const cached = await cachedPage(request);
          if (cached) return cached;
          const offline = await caches.match(OFFLINE_URL);
          return offline ?? Response.error();
        }
      })(),
    );
    return;
  }

  // ── 站內搜尋索引：network-first，離線用快取 ──
  // Pagefind 會在網址後面加 ?ts=時間戳 防快取，所以存與找都只看路徑，不看查詢字串。
  // 少了這一步，離線時搜尋會整個失效（實測過）。
  if (url.pathname.startsWith('/pagefind/')) {
    const key = url.origin + url.pathname;
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          if (fresh.ok) {
            const cache = await caches.open(ASSETS);
            cache.put(key, fresh.clone());
          }
          return fresh;
        } catch {
          const cache = await caches.open(ASSETS);
          return (await cache.match(key)) ?? Response.error();
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
