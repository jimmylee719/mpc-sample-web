/**
 * 用 YouTube 官方 oEmbed 端點確認影片存在，並取回官方標題與頻道名稱。
 *
 * 為什麼要有這支：影片網址是從搜尋結果來的，不逐一驗證就寫進網站，
 * 等於在賭。這支跑一次，死連結與寫錯的標題會當場現形。
 *
 * 注意：oEmbed 只回標題、頻道、縮圖。**不會**、也不可以取回影片內容。
 *
 * 全部檢查：  npm run videos:verify
 * 檢查候選：  npx tsx scripts/verify-videos.ts <id> <id> ...
 */

import { lessons } from '../content/lessons/index';
import { officialVideos, communityVideos } from '../content/videos';

interface OEmbed {
  title: string;
  author_name: string;
}

async function check(id: string): Promise<{ id: string; ok: boolean; title?: string; channel?: string }> {
  const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${id}`,
  )}&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return { id, ok: false };
    const data = (await res.json()) as OEmbed;
    return { id, ok: true, title: data.title, channel: data.author_name };
  } catch {
    return { id, ok: false };
  }
}

const argv = process.argv.slice(2);

const targets: Array<{ id: string; expect?: string; where: string }> = argv.length
  ? argv.map((id) => ({ id, where: '候選' }))
  : [
      ...Object.entries(officialVideos).flatMap(([key, list]) =>
        list.map((v) => ({ id: v.youtubeId, expect: v.title, where: key })),
      ),
      ...Object.entries(communityVideos).flatMap(([key, list]) =>
        list.map((v) => ({ id: v.youtubeId, expect: v.title, where: key })),
      ),
      ...lessons.flatMap((l) =>
        (l.videos ?? []).map((v) => ({ id: v.youtubeId, expect: v.title, where: l.id })),
      ),
    ];

async function main(): Promise<void> {
  let dead = 0;
  for (const t of targets) {
    const r = await check(t.id);
    if (!r.ok) {
      dead++;
      console.log(`✗ ${t.id}  [${t.where}]  取不到，可能已下架或設為私人`);
      continue;
    }
    console.log(`✓ ${t.id}  [${t.where}]`);
    console.log(`    ${r.channel} — ${r.title}`);
  }

  console.log('');
  console.log(`共 ${targets.length} 支，取不到 ${dead} 支`);
  if (dead > 0 && argv.length === 0) process.exitCode = 1;
}

void main();
