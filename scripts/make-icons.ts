/**
 * 產生 PWA 圖示。
 *
 * 為什麼自己寫 PNG 編碼器：本專案禁止為了畫圖示裝任何影像處理套件，
 * 而 PWA 安裝畫面（Android 與 iOS）都只吃 PNG，不吃 SVG。
 * 所以這裡用 Node 內建的 zlib 直接輸出 PNG，不引入任何相依套件。
 *
 * 圖案就是機器本身最好認的東西：4×4 pad 矩陣，PAD 1 亮紅。
 *
 * 執行：npm run icons
 */

import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// ── 最小 PNG 編碼器 ────────────────────────────────────────
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf: Buffer): number {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]!) & 0xff]! ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

/** rgba 為 width*height*4 的位元組陣列 */
function encodePng(width: number, height: number, rgba: Buffer): Buffer {
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const dst = y * (width * 4 + 1);
    raw[dst] = 0; // filter: none
    rgba.copy(raw, dst + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── 畫布 ──────────────────────────────────────────────────
type Rgb = [number, number, number];

function hex(h: string): Rgb {
  return [
    Number.parseInt(h.slice(1, 3), 16),
    Number.parseInt(h.slice(3, 5), 16),
    Number.parseInt(h.slice(5, 7), 16),
  ];
}

class Canvas {
  readonly px: Buffer;

  constructor(readonly size: number) {
    this.px = Buffer.alloc(size * size * 4);
  }

  fill(color: Rgb): void {
    for (let i = 0; i < this.size * this.size; i++) {
      this.px[i * 4] = color[0];
      this.px[i * 4 + 1] = color[1];
      this.px[i * 4 + 2] = color[2];
      this.px[i * 4 + 3] = 255;
    }
  }

  /** 圓角矩形，邊緣做 4×4 超取樣，不然小尺寸會很鋸齒 */
  roundRect(x: number, y: number, w: number, h: number, r: number, color: Rgb): void {
    const x0 = Math.max(0, Math.floor(x));
    const y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(this.size, Math.ceil(x + w));
    const y1 = Math.min(this.size, Math.ceil(y + h));
    const S = 4;

    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        let hits = 0;
        for (let sy = 0; sy < S; sy++) {
          for (let sx = 0; sx < S; sx++) {
            const fx = px + (sx + 0.5) / S;
            const fy = py + (sy + 0.5) / S;
            if (fx < x || fx > x + w || fy < y || fy > y + h) continue;
            // 只有四個角落要做圓角判定
            const cx = fx < x + r ? x + r : fx > x + w - r ? x + w - r : fx;
            const cy = fy < y + r ? y + r : fy > y + h - r ? y + h - r : fy;
            const dx = fx - cx;
            const dy = fy - cy;
            if (dx * dx + dy * dy <= r * r) hits++;
          }
        }
        if (hits === 0) continue;
        const a = hits / (S * S);
        const i = (py * this.size + px) * 4;
        this.px[i] = Math.round(this.px[i]! * (1 - a) + color[0] * a);
        this.px[i + 1] = Math.round(this.px[i + 1]! * (1 - a) + color[1] * a);
        this.px[i + 2] = Math.round(this.px[i + 2]! * (1 - a) + color[2] * a);
        this.px[i + 3] = 255;
      }
    }
  }
}

// ── 圖案 ──────────────────────────────────────────────────
const BG = hex('#14161A');
const PAD = hex('#3D4854');
const PAD_EDGE = hex('#5A6774');
const AKAI = hex('#D6342C');
const LIVE = hex('#4FAF5A');

/**
 * @param inset 圖案佔畫布的內縮比例。maskable 需要留出安全區。
 */
function draw(size: number, inset: number): Buffer {
  const c = new Canvas(size);
  c.fill(BG);

  const pad = size * inset;
  const grid = size - pad * 2;
  const gap = grid * 0.075;
  const cell = (grid - gap * 3) / 4;
  const r = cell * 0.22;

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const x = pad + col * (cell + gap);
      const y = pad + row * (cell + gap);
      // PAD 1 在左下角，機器上就是這樣排的
      const isPad1 = row === 3 && col === 0;
      const isLive = row === 0 && col === 3;
      const color = isPad1 ? AKAI : isLive ? LIVE : PAD;
      // 先畫大一點的邊，再疊本體，做出立體感
      c.roundRect(x, y, cell, cell, r, isPad1 || isLive ? color : PAD_EDGE);
      c.roundRect(x, y, cell, cell * 0.9, r, color);
    }
  }

  return encodePng(size, size, c.px);
}

const outDir = resolve(import.meta.dirname, '..', 'public');

const jobs: Array<[string, number, number]> = [
  // [檔名, 尺寸, 內縮比例]
  ['icon-192.png', 192, 0.14],
  ['icon-512.png', 512, 0.14],
  ['icon-maskable-512.png', 512, 0.22], // 安全區：中央 80%
  ['apple-touch-icon.png', 180, 0.16],
  ['favicon-32.png', 32, 0.09],
];

for (const [name, size, inset] of jobs) {
  writeFileSync(resolve(outDir, name), draw(size, inset));
  console.log(`  ✓ public/${name}  ${size}×${size}`);
}

console.log('圖示產生完成');
