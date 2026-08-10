import { lessons } from '../content/lessons/index';
import { genres } from '../content/genres/index';
import { shortcuts } from '../content/reference/shortcuts';
import { glossary } from '../content/reference/glossary';
import { troubles } from '../content/reference/troubleshoot';
import { knobRows } from '../content/reference/knobs';
import { fxEntries, padFx, knobFx } from '../content/reference/fx';
import { openQuestions } from '../content/reference/firmware';
import { officialVideos, communityVideos } from '../content/videos';

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

// 延伸觀看：待人工確認的影片要看得見，否則會一直躺在那裡沒人處理
const allVideos = [
  ...Object.entries(officialVideos).flatMap(([k, vs]) => vs.map((v) => ({ where: k, v }))),
  ...Object.entries(communityVideos).flatMap(([k, vs]) => vs.map((v) => ({ where: k, v }))),
  ...lessons.flatMap((l) => (l.videos ?? []).map((v) => ({ where: l.id, v }))),
  ...genres.flatMap((g) => (g.videos ?? []).map((v) => ({ where: g.slug, v }))),
];
const uniqueIds = new Set(allVideos.map((x) => x.v.youtubeId)).size;
console.log(`官方系列影片 ${Object.values(officialVideos).flat().length} 支，對應到 ${Object.keys(officialVideos).length} 個頁面`);
console.log(`社群影片 ${Object.values(communityVideos).flat().length} 則引用，對應到 ${Object.keys(communityVideos).length} 個頁面`);
const unreviewed = allVideos.filter((x) => !x.v.reviewed);
console.log(`延伸觀看共 ${allVideos.length} 則引用（不重複 ${uniqueIds} 支），其中 ${unreviewed.length} 則尚未人工確認`);
const noVideo = genres.filter((g) => (officialVideos[g.slug]?.length ?? 0) + (communityVideos[g.slug]?.length ?? 0) === 0);
console.log(`尚無影片的曲風 ${noVideo.length}：${noVideo.map((g) => g.slug).join(', ') || '無'}`);

// 中文摘要只有看過影片的人能寫，這裡把進度攤開來，不然會一直是 0 也沒人發現
const withSummary = new Set(allVideos.filter((x) => x.v.summary).map((x) => x.v.youtubeId));
console.log(`已寫中文摘要 ${withSummary.size}/${uniqueIds} 支`);
for (const { where, v } of unreviewed) {
  console.log(`  待確認  ${where.padEnd(10)} [${v.channel}] ${v.title}`);
}
