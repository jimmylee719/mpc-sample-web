import { renderToStaticMarkup } from 'react-dom/server';
import { MpcPanel } from '../components/mpc/MpcPanel';
import { FRONT_PANEL, REAR_PANEL } from '../components/mpc/panel-layout';
import { s1_01 } from '../content/lessons/s1-01';
import { CONTROL_IDS } from '../types/lesson';

let failed = false;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`  ${ok ? '✅' : '❌'} ${name}${detail ? `  ${detail}` : ''}`);
  if (!ok) failed = true;
};

const hotIds = (html: string): string[] =>
  [...html.matchAll(/id="c-([a-z0-9_]+)" class="ctl hot/g)].map((m) => m[1]!);

console.log('面板行為檢查\n');

// 1. 每一個合法 ControlId 都真的畫得出來（'pads' 是虛擬 ID 除外）
const drawn = new Set([...FRONT_PANEL.controls, ...REAR_PANEL.controls].map((x) => x.id));
const undrawnIds = CONTROL_IDS.filter((id) => id !== 'pads' && !drawn.has(id));
check('每個 ControlId 都有對應圖形', undrawnIds.length === 0, `缺 ${undrawnIds.join('、') || '無'}`);
check('上面板 30 顆控制項 + 16 顆 pad', FRONT_PANEL.controls.length === 46, `實際 ${FRONT_PANEL.controls.length}`);
check('背板控制項 11 個', REAR_PANEL.controls.length === 11, `實際 ${REAR_PANEL.controls.length}`);

// 2. 背板自動切換
const rear = renderToStaticMarkup(<MpcPanel targets={['r_power', 'r_usb']} />);
check('r_ 前綴自動切背板', rear.includes('viewBox="0 0 700 560"'));
check('背板高亮正確', JSON.stringify(hotIds(rear).sort()) === JSON.stringify(['r_power', 'r_usb']));

const front = renderToStaticMarkup(<MpcPanel targets={['play']} />);
check('其他情況維持上面板', front.includes('viewBox="0 0 700 800"'));

// 3. pads 展開成 16 顆
const allPads = renderToStaticMarkup(<MpcPanel targets={['pads']} />);
check('targets 含 pads 時 16 顆全亮', hotIds(allPads).length === 16, `實際 ${hotIds(allPads).length}`);

// 4. SHIFT
const shifted = renderToStaticMarkup(<MpcPanel targets={['p11']} shift />);
check('shift 時整個 svg 帶 shift-on', shifted.includes('shift-on'));
check('SHIFT 鍵本身為 held', shifted.includes('id="c-shift" class="ctl held"'));

// 5. 波形決定性：同一 seed 必須每次相同
const a = renderToStaticMarkup(<MpcPanel targets={[]} screen={{ wave: 31 }} />);
const b = renderToStaticMarkup(<MpcPanel targets={[]} screen={{ wave: 31 }} />);
const c = renderToStaticMarkup(<MpcPanel targets={[]} screen={{ wave: 52 }} />);
check('同一 wave 種子輸出相同', a === b);
check('不同 wave 種子輸出不同', a !== c);

// 6. 螢幕預設標籤
const def = renderToStaticMarkup(<MpcPanel targets={[]} screen={{ t1: 'X' }} />);
check('螢幕上排預設 Trim/Tune/Filter', def.includes('Trim') && def.includes('Tune') && def.includes('Filter'));
check('螢幕下排預設 Start/End/Loop', def.includes('Start') && def.includes('End') && def.includes('Loop'));

// 7. 課程每一步的 targets 都真的畫得出來
const known = new Set([...FRONT_PANEL.controls, ...REAR_PANEL.controls].map((x) => x.id));
let missing = 0;
s1_01.steps.forEach((s) => {
  s.targets.forEach((t) => {
    if (t !== 'pads' && !known.has(t)) missing++;
  });
});
check('1-1 全部 targets 都在面板上存在', missing === 0, `缺 ${missing} 個`);
check('1-1 共 27 步', s1_01.steps.length === 27, `實際 ${s1_01.steps.length}`);

console.log(failed ? '\n面板檢查失敗' : '\n面板檢查全數通過');
process.exit(failed ? 1 : 0);
