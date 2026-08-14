'use client';

/**
 * 列印這一課的步驟表。
 *
 * 為什麼需要：機器不在電腦旁邊的人（多數人）沒辦法一邊看螢幕一邊敲 pad。
 * 列印樣式會把導覽、播放器與影片藏掉，只留白底黑字的步驟清單。
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print label-mono rounded-full border border-rule px-3 py-[6px] text-muted transition-colors hover:border-ink hover:text-ink"
    >
      列印這一份
    </button>
  );
}
