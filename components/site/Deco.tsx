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

/**
 * 唱盤，俯視。
 *
 * 全部是自己畫的路徑。Akai 或任何廠牌的產品照都不能用（著作權），
 * 而且點陣圖會拖垮 LCP，所以本站的機器插畫一律走向量。
 */
export function Turntable({ className = '' }: { className?: string }) {
  // 唱片溝紋：半徑遞減的同心圓，疏密不均才像真的
  const grooves = [86, 81, 77, 74, 70, 65, 61, 58, 54, 49, 45, 42];

  return (
    <svg viewBox="0 0 240 240" aria-hidden focusable="false" className={className}>
      {/* 機身 */}
      <rect x="8" y="8" width="224" height="224" rx="16" fill="#1B1D20" />
      <rect
        x="8.75"
        y="8.75"
        width="222.5"
        height="222.5"
        rx="15.25"
        fill="none"
        stroke="#34383D"
        strokeWidth="1.5"
      />

      {/* 轉盤 */}
      <circle cx="108" cy="120" r="92" fill="#101215" />
      <circle cx="108" cy="120" r="92" fill="none" stroke="#2C3036" strokeWidth="1.5" />
      {grooves.map((r) => (
        <circle
          key={r}
          cx="108"
          cy="120"
          r={r}
          fill="none"
          stroke="#22262B"
          strokeWidth={r % 3 === 0 ? 1.4 : 0.8}
        />
      ))}

      {/* 中心標籤 */}
      <circle cx="108" cy="120" r="34" fill="var(--color-akai)" />
      <circle cx="108" cy="120" r="34" fill="none" stroke="#A82820" strokeWidth="2" />
      <circle cx="108" cy="120" r="16" fill="none" stroke="#F3B3AE" strokeWidth="1" opacity="0.5" />
      <circle cx="108" cy="120" r="4.5" fill="#101215" />

      {/* 唱臂 */}
      <circle cx="205" cy="52" r="13" fill="#2A2E33" stroke="#4A5057" strokeWidth="1.5" />
      <circle cx="205" cy="52" r="4" fill="#5A6774" />
      <path
        d="M205 52 L196 104 L166 142"
        fill="none"
        stroke="#8A8780"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 唱頭 */}
      <rect
        x="156"
        y="136"
        width="18"
        height="12"
        rx="2.5"
        fill="#E7E5E0"
        transform="rotate(-38 165 142)"
      />

      {/* 速度推桿 */}
      <rect x="196" y="150" width="10" height="62" rx="5" fill="#101215" stroke="#34383D" />
      <rect x="193" y="176" width="16" height="8" rx="3" fill="#C9C6BF" />

      {/* 啟動鍵 */}
      <circle cx="30" cy="206" r="9" fill="var(--color-live)" opacity="0.9" />
      <circle cx="54" cy="206" r="9" fill="#2A2E33" stroke="#4A5057" />
    </svg>
  );
}

/**
 * 唱片箱。挖唱片的那個箱子，本站素材庫的視覺象徵。
 */
export function RecordCrate({ className = '' }: { className?: string }) {
  // 每一張唱片露出來的顏色與角度都不同，才像真的翻過
  const sleeves: Array<[number, string, number]> = [
    [0, '#3D4854', -3],
    [12, '#5A6774', 1.5],
    [24, '#8A8780', -1],
    [36, 'var(--color-akai)', 2.5],
    [48, '#C9C6BF', -2],
    [60, '#4FAF5A', 1],
    [72, '#EFA043', -2.5],
  ];

  return (
    <svg viewBox="0 0 260 180" aria-hidden focusable="false" className={className}>
      {/* 箱子後緣 */}
      <path d="M24 44 H236 V162 a8 8 0 0 1 -8 8 H32 a8 8 0 0 1 -8 -8 Z" fill="#15171A" />

      {/* 唱片封套 */}
      {sleeves.map(([offset, color, tilt], i) => (
        <g key={offset} transform={`rotate(${tilt} ${52 + offset} 100)`}>
          <rect
            x={36 + offset * 2.2}
            y={30 + Math.abs(tilt) * 2}
            width="118"
            height="118"
            rx="3"
            fill={color}
            opacity={0.35 + i * 0.09}
          />
          <circle
            cx={95 + offset * 2.2}
            cy={89 + Math.abs(tilt) * 2}
            r="26"
            fill="#0E1013"
            opacity="0.55"
          />
          <circle
            cx={95 + offset * 2.2}
            cy={89 + Math.abs(tilt) * 2}
            r="8"
            fill={color}
            opacity="0.8"
          />
        </g>
      ))}

      {/* 箱子前緣 */}
      <path
        d="M18 96 H242 a6 6 0 0 1 6 6 V166 a10 10 0 0 1 -10 10 H22 a10 10 0 0 1 -10 -10 V102 a6 6 0 0 1 6 -6 Z"
        fill="#1B1D20"
        stroke="#34383D"
        strokeWidth="1.5"
      />
      {/* 提把 */}
      <rect x="104" y="126" width="52" height="12" rx="6" fill="#0E1013" stroke="#34383D" />
    </svg>
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
