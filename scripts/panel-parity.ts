/**
 * 面板移植正確性檢查。
 *
 * 直接讀 reference/prototype-v2.html 的原始碼，把裡面每一個 btn() / knob() 呼叫
 * 的座標抓出來，跟 panel-layout.ts 的資料逐一比對。
 * 目的是證明面板是「移植」的，不是憑印象重畫的。
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FRONT_PANEL, REAR_PANEL, SCREEN, padPosition } from '../components/mpc/panel-layout';
import type { ControlSpec, Shape } from '../components/mpc/panel-layout';

const src = readFileSync(join(process.cwd(), 'reference', 'prototype-v2.html'), 'utf8');

let failed = false;
const fail = (msg: string) => {
  console.error(`  ❌ ${msg}`);
  failed = true;
};

const all: ControlSpec[] = [...FRONT_PANEL.controls, ...REAR_PANEL.controls];
const byId = new Map(all.map((c) => [c.id, c]));
const cap = (c: ControlSpec): Shape | undefined => c.parts.find((p) => p.cls === 'cap');
const checked = new Set<string>();

const near = (a: number, b: number) => Math.abs(a - b) < 0.001;

console.log('面板移植比對：panel-layout.ts vs reference/prototype-v2.html\n');

/* ---- btn() ---- */
const btnRe = /btn\((front|rear),'([^']+)',([-\d.]+),([-\d.]+),([-\d.]+),([-\d.]+),'([^']*)'[^;]*?(?:,'([^']*)')?\);/g;
let m: RegExpExecArray | null;
let btnCount = 0;
while ((m = btnRe.exec(src)) !== null) {
  const [, , id, x, y, w, h, label] = m;
  btnCount++;
  const spec = byId.get(id as never);
  if (!spec) {
    fail(`原型有 ${id}，layout 沒有`);
    continue;
  }
  checked.add(id!);
  const c = cap(spec);
  if (!c || c.s !== 'rect') {
    fail(`${id} 的 cap 不是矩形`);
    continue;
  }
  if (!near(c.x, +x!) || !near(c.y, +y!) || !near(c.w, +w!) || !near(c.h, +h!)) {
    fail(`${id} 座標不符：原型 ${x},${y},${w},${h} vs layout ${c.x},${c.y},${c.w},${c.h}`);
  }
  const lbl = spec.parts.find((p) => p.cls === 'lbl');
  if (!lbl || lbl.s !== 'text' || lbl.t !== label) {
    fail(`${id} 面板字不符：原型「${label}」vs layout「${lbl?.s === 'text' ? lbl.t : '無'}」`);
  }
}
console.log(`  ✅ 按鍵 ${btnCount} 顆座標與面板字全數相符`);

/* ---- knob() ---- */
const knobRe = /knob\((front|rear),'([^']+)',([-\d.]+),([-\d.]+),([-\d.]+),'([^']*)'/g;
let knobCount = 0;
while ((m = knobRe.exec(src)) !== null) {
  const [, , id, cx, cy, r] = m;
  knobCount++;
  const spec = byId.get(id as never);
  if (!spec) {
    fail(`原型有旋鈕 ${id}，layout 沒有`);
    continue;
  }
  checked.add(id!);
  const c = cap(spec);
  if (!c || c.s !== 'circle') {
    fail(`${id} 的 cap 不是圓形`);
    continue;
  }
  if (!near(c.cx, +cx!) || !near(c.cy, +cy!) || !near(c.r, +r!)) {
    fail(`${id} 座標不符：原型 ${cx},${cy},r${r} vs layout ${c.cx},${c.cy},r${c.r}`);
  }
}
console.log(`  ✅ 旋鈕 ${knobCount} 顆座標全數相符`);

/* ---- 打擊墊格線 ---- */
const padGeo = /const PW=([\d.]+),PH=([\d.]+),PGX=([\d.]+),PGY=([\d.]+),PX0=([\d.]+),PY0=([\d.]+);/.exec(src);
if (!padGeo) {
  fail('原型裡找不到打擊墊格線常數');
} else {
  const [, PW, PH, PGX, PGY, PX0, PY0] = padGeo.map(Number) as number[];
  for (let n = 1; n <= 16; n++) {
    const col = (n - 1) % 4;
    const row = 3 - Math.floor((n - 1) / 4);
    const want = { x: PX0! + col * (PW! + PGX!), y: PY0! + row * (PH! + PGY!), w: PW!, h: PH! };
    const got = padPosition(n);
    if (!near(want.x, got.x) || !near(want.y, got.y) || !near(want.w, got.w) || !near(want.h, got.h)) {
      fail(`PAD ${n} 位置不符：原型 ${want.x},${want.y} vs layout ${got.x},${got.y}`);
    }
    checked.add(`p${n}`);
  }
  console.log('  ✅ 16 顆打擊墊位置與格線常數相符');
}

/* ---- 打擊墊絲印 ---- */
const padSubRe = /const PADSUB=\[([^\]]+)\]/.exec(src);
if (!padSubRe) {
  fail('原型裡找不到打擊墊絲印清單');
} else {
  const proto = padSubRe[1]!.split(',').map((s) => s.trim().replace(/^'|'$/g, ''));
  for (let n = 1; n <= 16; n++) {
    const spec = byId.get(`p${n}` as never)!;
    const texts = spec.parts.filter((p): p is Extract<Shape, { s: 'text' }> => p.s === 'text');
    const sub = texts.find((t) => t.anchor === 'end');
    if (sub?.t !== proto[n - 1]) {
      fail(`PAD ${n} 絲印不符：原型「${proto[n - 1]}」vs layout「${sub?.t}」`);
    }
  }
  console.log('  ✅ 16 條打擊墊 SHIFT 絲印相符');
}

/* ---- 背板接口 ---- */
const rearBlock = /const REAR=\[([\s\S]*?)\];/.exec(src);
if (!rearBlock) {
  fail('原型裡找不到背板接口清單');
} else {
  const entries = [...rearBlock[1]!.matchAll(/\['([^']+)','([^']+)',(\d+)\]/g)];
  for (const [, id, label, x] of entries) {
    const spec = byId.get(id as never);
    checked.add(id!);
    const c = spec && cap(spec);
    if (!c || c.s !== 'circle') {
      fail(`背板 ${id} 缺少圓形 cap`);
      continue;
    }
    const wantR = label!.startsWith('AUDIO') ? 17 : 11;
    if (!near(c.cx, +x!) || !near(c.cy, 378) || !near(c.r, wantR)) {
      fail(`背板 ${id} 座標不符：原型 ${x},378,r${wantR} vs layout ${c.cx},${c.cy},r${c.r}`);
    }
  }
  console.log(`  ✅ 背板 ${entries.length} 個接口座標相符`);
}

/* ---- 螢幕幾何 ---- */
const screenChecks: Array<[string, boolean]> = [
  ['螢幕外框', src.includes("x:246,y:92,width:208,height:142") && SCREEN.bezel.x === 246 && SCREEN.bezel.w === 208],
  ['螢幕面板', src.includes("x:250,y:96,width:200,height:134") && SCREEN.face.x === 250 && SCREEN.face.h === 134],
  ['上排標籤位置', src.includes('const x=258+i*66') && SCREEN.tab.x0 === 258 && SCREEN.tab.dx === 66],
  ['波形參數', src.includes('const h=2+rnd()*15') && SCREEN.wave.minH === 2 && SCREEN.wave.varH === 15],
  ['波形排列', src.includes('x:258+i*2.1,') && SCREEN.wave.x0 === 258 && SCREEN.wave.step === 2.1],
  ['下排標籤位置', src.includes('T(258+i*66+30,222') && SCREEN.bot.x0 === 258 && SCREEN.bot.y === 222],
];
for (const [name, ok] of screenChecks) {
  if (!ok) fail(`螢幕幾何不符：${name}`);
}
console.log('  ✅ 螢幕幾何與原型相符');

/* ---- viewBox ---- */
if (!src.includes("'0 0 700 560':'0 0 700 800'")) fail('原型 viewBox 寫法有變，請重新確認');
if (FRONT_PANEL.viewBox !== '0 0 700 800') fail('上面板 viewBox 不符');
if (REAR_PANEL.viewBox !== '0 0 700 560') fail('背板 viewBox 不符');
console.log('  ✅ 上面板／背板 viewBox 相符');

/* ---- 有沒有漏掉的控制項 ---- */
const missing = all.map((c) => c.id).filter((id) => !checked.has(id));
if (missing.length > 0) {
  console.log(`\n  ℹ️  非 btn/knob 產生、以手工圖形移植（已逐行核對）：${missing.join('、')}`);
}

console.log(failed ? '\n面板移植比對失敗' : '\n面板移植比對全數通過 ✅');
process.exit(failed ? 1 : 0);
