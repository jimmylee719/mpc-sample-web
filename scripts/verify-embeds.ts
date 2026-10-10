/**
 * 檢查每一支影片「能不能在別的網站上播」。
 *
 * 為什麼 oEmbed 驗證不夠：oEmbed 只能確認影片存在。有些上傳者會關掉
 * 「允許在其他網站嵌入」，或因為音樂版權被限制只能在 YouTube 本站播放。
 * 這種影片在本站按「在這裡播放」，播放器會打開但只顯示一行錯誤訊息，
 * 使用者看起來就是「按了沒反應」。
 *
 * 讀的是 YouTube 觀看頁本身公開的 playabilityStatus，不碰影片內容。
 *
 * 執行：npm run videos:embed
 */

import { lessons } from '../content/lessons/index';
import { officialVideos, communityVideos } from '../content/videos';

interface Result {
  id: string;
  where: string;
  status: string;
  embeddable: boolean | null;
}

async function check(id: string): Promise<{ status: string; embeddable: boolean | null }> {
  const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36',
      'accept-language': 'en',
    },
  });
  const html = await res.text();
  const m = /"playabilityStatus":\{"status":"([A-Z_]+)"(?:[^{}]|\{[^{}]*\})*?"playableInEmbed":(true|false)/.exec(html);
  if (m) return { status: m[1]!, embeddable: m[2] === 'true' };
  const s = /"playabilityStatus":\{"status":"([A-Z_]+)"/.exec(html);
  return { status: s?.[1] ?? 'UNKNOWN', embeddable: null };
}

const seen = new Map<string, string>();
for (const [key, list] of [...Object.entries(officialVideos), ...Object.entries(communityVideos)]) {
  for (const v of list) if (!seen.has(v.youtubeId)) seen.set(v.youtubeId, key);
}
for (const l of lessons) for (const v of l.videos ?? []) if (!seen.has(v.youtubeId)) seen.set(v.youtubeId, l.id);

async function main(): Promise<void> {
  const bad: Result[] = [];
  const unknown: Result[] = [];
  const ids = [...seen];
  // 一次四支，不要對 YouTube 一口氣打一百多個請求
  for (let i = 0; i < ids.length; i += 4) {
    const batch = await Promise.all(
      ids.slice(i, i + 4).map(async ([id, where]) => ({ id, where, ...(await check(id)) })),
    );
    for (const r of batch) {
      if (r.embeddable === false || (r.status !== 'OK' && r.status !== 'UNKNOWN')) bad.push(r);
      else if (r.embeddable === null) unknown.push(r);
    }
  }
  console.log(`檢查 ${ids.length} 支不重複的影片`);
  console.log(`\n── 不能在本站播放 ${bad.length} ──`);
  for (const r of bad) console.log(`  ✗ ${r.id}  [${r.where}]  ${r.status} embeddable=${r.embeddable}`);
  console.log(`\n── 判斷不出來 ${unknown.length} ──`);
  for (const r of unknown) console.log(`  ? ${r.id}  [${r.where}]  ${r.status}`);
  if (bad.length) process.exitCode = 1;
}

void main();
