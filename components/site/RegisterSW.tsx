'use client';

import { useEffect } from 'react';

/**
 * 註冊 Service Worker。
 *
 * 唯一目的是讓裝成 App 的人在沒網路時看到本站自己的離線頁，
 * 而不是瀏覽器的錯誤畫面。頁面一律 network-first，有網路永遠拿最新的。
 */
export function RegisterSW() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') return;

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // 註冊失敗不影響任何功能，網站照常運作
      });
    };

    // 等頁面載完再註冊，不要跟首屏搶頻寬（LCP < 1.5s）
    if (document.readyState === 'complete') register();
    else {
      window.addEventListener('load', register);
      return () => window.removeEventListener('load', register);
    }
  }, []);

  return null;
}
