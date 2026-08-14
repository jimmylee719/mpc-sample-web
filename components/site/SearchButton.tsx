'use client';

import { useCallback, useEffect, useState } from 'react';
import { SiteSearch } from '@/components/reference/SiteSearch';

/**
 * 頂列的搜尋。
 *
 * 為什麼要放在頂列：搜尋原本只在查詢區的六頁上。也就是說，
 * 一個卡在第 2-4 課的人想查「Threshold 是什麼」，得先自己想到要去查詢區。
 * 卡住的人不會想到這件事，他只會關掉網頁。
 *
 * Pagefind 的索引只有在真的要搜尋時才會載入（SiteSearch 內部處理），
 * 所以放在每一頁也不會拖慢首屏。
 */
export function SearchButton() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      // 斜線開啟搜尋，但正在打字的時候不要攔
      const el = document.activeElement;
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // 開著的時候鎖住背景捲動，不然手機上會捲到後面的內容
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="搜尋全站"
        className="flex shrink-0 items-center gap-[6px] rounded-lg px-2 py-[7px] text-[#8D9299] transition-colors hover:bg-[#23272D] hover:text-white"
      >
        <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden focusable="false">
          <circle
            cx="9"
            cy="9"
            r="5.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M13.2 13.2 17 17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="label-mono hidden split:inline">搜尋</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="全站搜尋"
          className="fixed inset-0 z-50 flex justify-center bg-[rgba(10,11,13,.82)] px-4 pt-[14vh] backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="w-full max-w-[560px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-[14px] border border-[#2C3036] bg-stage p-4 shadow-[0_24px_60px_rgb(0_0_0/.55)]">
              <div className="mb-3 flex items-center justify-between">
                <p className="label-mono font-bold text-akai">搜尋全站</p>
                <button
                  type="button"
                  onClick={close}
                  className="label-mono rounded px-2 py-1 text-[#8D9299] hover:bg-[#23272D] hover:text-white"
                >
                  ESC 關閉
                </button>
              </div>

              <SiteSearch id="site-search-overlay" autoFocus className="" />

              <p className="label-mono mt-3 text-[#6B7178]">
                試試：RESAMPLE、切片、CHOP、韌體、側鏈
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
