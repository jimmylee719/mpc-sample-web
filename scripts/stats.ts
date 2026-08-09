import { lessons } from '../content/lessons/index';
import { genres } from '../content/genres/index';
import { shortcuts } from '../content/reference/shortcuts';
import { glossary } from '../content/reference/glossary';
import { troubles } from '../content/reference/troubleshoot';
import { knobRows } from '../content/reference/knobs';
import { fxEntries, padFx, knobFx } from '../content/reference/fx';
import { openQuestions } from '../content/reference/firmware';

const steps = lessons.reduce((a, l) => a + l.steps.length, 0);
console.log(`課程 ${lessons.length} 課，共 ${steps} 步`);
for (const s of [1, 2, 3, 4, 5] as const) {
  const ls = lessons.filter((l) => l.season === s);
  console.log(`  Season ${s}: ${ls.length} 課 / ${ls.reduce((a, l) => a + l.steps.length, 0)} 步`);
}
console.log('需要電腦：', lessons.filter((l) => l.needsComputer).map((l) => l.id).join(', ') || '無');
console.log(
  `曲風 ${genres.length}（L1 ${genres.filter((g) => g.level === 'L1').length} / L2 ${genres.filter((g) => g.level === 'L2').length} / L3 ${genres.filter((g) => g.level === 'L3').length} / L4 ${genres.filter((g) => g.level === 'L4').length}）`,
);
console.log('含迷你播放器：', genres.filter((g) => g.miniPlayer).map((g) => g.slug).join(', '));
console.log(`快捷鍵 ${shortcuts.length} / 名詞 ${glossary.length} / 疑難排解 ${troubles.length}`);
console.log(`旋鈕矩陣 ${knobRows.length} 畫面（已查證 ${knobRows.filter((r) => r.status === 'verified').length}）`);
console.log(`效果 ${fxEntries.length} = Pad FX ${padFx.length} + Knob FX ${knobFx.length}`);
console.log(`尚未驗證項目 ${openQuestions.length}`);
