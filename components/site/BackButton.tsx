'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { parentLabel, parentOf } from './nav';

/**
 * 返回鍵。
 *
 * 為什麼不是單純的 `router.back()`：
 * 裝成 App（PWA）之後，使用者常常是從桌面捷徑或分享連結**直接**開在課程頁，
 * 這時瀏覽歷史裡沒有上一頁，`back()` 按下去完全沒反應，看起來就像壞掉。
 * 所以這裡記錄站內走過幾步，走過才用 back()，沒走過就往上一層跳。
 *
 * 模組層級的計數在整個 App 生命週期內累積，重新整理才歸零 —— 那正好也是
 * 瀏覽歷史被清掉的時機，兩者一致。
 */
let inAppSteps = 0;

export function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const counted = useRef<string | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // React StrictMode 會重跑 effect，用 ref 擋掉重複計數
    if (counted.current !== pathname) {
      counted.current = pathname;
      inAppSteps += 1;
    }
    setCanGoBack(inAppSteps > 1);
  }, [pathname]);

  if (pathname === '/') return null;

  const target = parentOf(pathname);

  return (
    <button
      type="button"
      onClick={() => {
        if (canGoBack) router.back();
        else router.push(target);
      }}
      className="group -ml-1 flex shrink-0 items-center gap-[6px] rounded-lg px-2 py-[7px] text-[#B7BDC4] transition-colors hover:bg-[#23272D] hover:text-white active:bg-[#2C3036]"
    >
      <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden focusable="false">
        <path
          d="M12.4 4 6.6 10l5.8 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="label-mono">返回</span>
      {/* 沒有瀏覽歷史時，明講會跳去哪裡，不要讓人按下去才發現 */}
      {!canGoBack && (
        <span className="label-mono hidden text-[#6B7178] split:inline">{parentLabel(pathname)}</span>
      )}
    </button>
  );
}
