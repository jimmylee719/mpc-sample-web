import type { ScreenState } from '@/types/lesson';
import { DEFAULT_TABS, DEFAULT_BOTS } from '@/types/lesson';
import { SCREEN } from './panel-layout';

/**
 * 機器小螢幕。是 MpcPanel 內部的一個 <g>，不是獨立的 SVG。
 *
 * 上排三標籤 = B1／B2／B3，下排三標籤 = K1／K2／K3。
 * 這件事本身就是本站最重要的教學槓桿：螢幕在教面板邏輯。
 */

/**
 * 固定種子的偽隨機波形。同一個 seed 必須每次都畫出一模一樣的結果，
 * 否則 SSG 產出的 HTML 與客戶端 hydration 會對不起來。
 */
function waveHeights(seed: number): number[] {
  const { count, rows, minH, varH } = SCREEN.wave;
  let s = seed || 7;
  const rnd = (): number => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: number[] = [];
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < count; i++) out.push(minH + rnd() * varH);
  }
  return out;
}

export function MpcScreen({ screen }: { screen?: ScreenState }) {
  const tabs = screen?.tabs ?? DEFAULT_TABS;
  const bots = screen?.bots ?? DEFAULT_BOTS;
  const title = screen?.t1 ?? '';
  const seed = screen?.wave ?? 0;

  const heights = waveHeights(seed);
  const { x0, step, barW, count, rows, cy0, rowGap, fill, barOpacity, dimOpacity } = SCREEN.wave;

  return (
    <g>
      <rect {...rectProps(SCREEN.bezel)} />
      <rect {...rectProps(SCREEN.face)} />

      {/* 上排：B1 / B2 / B3 */}
      {tabs.map((label, i) => {
        const x = SCREEN.tab.x0 + i * SCREEN.tab.dx;
        return (
          <g key={`tab-${i}`}>
            <rect
              x={x}
              y={SCREEN.tab.y}
              width={SCREEN.tab.w}
              height={SCREEN.tab.h}
              rx={SCREEN.tab.rx}
              fill={i === 0 && label ? SCREEN.tab.activeBg : 'none'}
            />
            <text
              x={x + SCREEN.tab.w / 2}
              y={SCREEN.tab.textY}
              textAnchor="middle"
              fill={SCREEN.tab.fill}
              fontFamily="ui-monospace, monospace"
              fontSize={SCREEN.tab.size}
            >
              {label}
            </text>
          </g>
        );
      })}

      <text
        x={SCREEN.title.x}
        y={SCREEN.title.y}
        fill={SCREEN.title.fill}
        fontFamily="ui-monospace, monospace"
        fontSize={SCREEN.title.size}
      >
        {title}
      </text>

      {/* 波形。wave 為 0 或省略時以 12% 透明度顯示 */}
      <g opacity={seed ? 1 : dimOpacity}>
        {Array.from({ length: rows * count }, (_, k) => {
          const row = Math.floor(k / count);
          const i = k % count;
          const h = heights[k] ?? 0;
          const cy = cy0 + row * rowGap;
          return (
            <rect
              key={`w-${k}`}
              x={x0 + i * step}
              y={cy - h / 2}
              width={barW}
              height={h}
              fill={fill}
              opacity={barOpacity}
            />
          );
        })}
      </g>

      {/* 下排：K1 / K2 / K3 */}
      {bots.map((label, i) => (
        <text
          key={`bot-${i}`}
          x={SCREEN.bot.x0 + i * SCREEN.bot.dx + SCREEN.tab.w / 2}
          y={SCREEN.bot.y}
          textAnchor="middle"
          fill={SCREEN.bot.fill}
          fontFamily="ui-monospace, monospace"
          fontSize={SCREEN.bot.size}
        >
          {label}
        </text>
      ))}
    </g>
  );
}

function rectProps(r: { x: number; y: number; w: number; h: number; rx: number; fill: string }) {
  return { x: r.x, y: r.y, width: r.w, height: r.h, rx: r.rx, fill: r.fill };
}
