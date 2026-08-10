/**
 * 裝飾元件：波形、pad 矩陣、黑膠、電平表。
 *
 * 三個限制：
 * 1. 全部是純 SVG 加 CSS，沒有任何動畫函式庫（CLAUDE.md §2 明令禁止）。
 * 2. 波形用固定種子的偽亂數，同一個 seed 每次算出來都一樣，
 *    靜態產出的 HTML 才會跟瀏覽器端對得起來。
 * 3. 一律 aria-hidden。這些東西是氣氛，不是資訊，讀螢幕的人不需要聽到。
 */

/** 跟 MpcScreen 同一套線性同餘產生器，波形長相才會是同一家人 */
function seeded(seed: number): () => number {
  let s = (seed || 1) * 7919;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** 波形分隔線。拿來取代普通的一條 border。 */
export function WaveRule({
  seed = 7,
  bars = 96,
  className = '',
}: {
  seed?: number;
  bars?: number;
  className?: string;
}) {
  const rand = seeded(seed);
  const heights = Array.from({ length: bars }, (_, i) => {
    // 中段起伏大、兩端收斂，看起來才像一段真的音訊
    const envelope = Math.sin((i / (bars - 1)) * Math.PI);
    return 0.14 + rand() * 0.86 * envelope;
  });

  return (
    <svg
      viewBox={`0 0 ${bars * 3} 40`}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={`h-[26px] w-full ${className}`}
    >
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 3}
          y={20 - (h * 36) / 2}
          width="1.6"
          height={h * 36}
          rx="0.8"
          fill="currentColor"
          opacity={0.25 + h * 0.5}
        />
      ))}
    </svg>
  );
}

/** 4×4 pad 矩陣。`lit` 是要亮起來的 pad 編號（1 在左下，跟機器一致）。 */
export function PadGrid({
  lit = [1, 6, 11, 16],
  className = '',
}: {
  lit?: number[];
  className?: string;
}) {
  const on = new Set(lit);
  return (
    <div className={`pad-grid ${className}`} aria-hidden>
      {Array.from({ length: 16 }, (_, i) => {
        // 顯示順序是左上到右下，但編號是左下到右上
        const row = Math.floor(i / 4);
        const col = i % 4;
        const num = (3 - row) * 4 + col + 1;
        return <span key={num} className={on.has(num) ? 'pad is-lit' : 'pad'} />;
      })}
    </div>
  );
}

/** 黑膠。會轉，但 prefers-reduced-motion 之下停住。 */
export function Vinyl({ className = '' }: { className?: string }) {
  return (
    <span className={`vinyl ${className}`} aria-hidden>
      <span className="vinyl-label" />
    </span>
  );
}

/** 電平表。純裝飾，不代表任何真實音量。 */
export function LevelMeter({ className = '' }: { className?: string }) {
  return (
    <span className={`eq-bars ${className}`} aria-hidden>
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
