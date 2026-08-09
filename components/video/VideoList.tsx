'use client';

import { useState } from 'react';
import type { VideoRef } from '@/types/lesson';

/**
 * 延伸觀看清單。
 *
 * 兩個硬性設計決策：
 * 1. **點擊才載入**。在你按下去之前，頁面不會對 YouTube 發出任何請求。
 *    這同時保護 LCP < 1.5s 的效能門檻，也符合本站不蒐集個資的立場。
 * 2. **一律用 youtube-nocookie.com**。
 *
 * 另外：沒有人實際看過的影片會標「尚未人工確認」。
 * 沒看過就說推薦是不誠實的。
 */

const LANG_LABEL: Record<VideoRef['lang'], string> = {
  'zh-Hant': '繁中',
  'zh-Hans': '簡中',
  en: '英文',
  ja: '日文',
  other: '其他語言',
};

function VideoItem({ video }: { video: VideoRef }) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <li className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {video.official && (
          <span className="label-mono rounded-full bg-akai px-[9px] py-[2px] text-white">Akai 官方</span>
        )}
        <span className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-[2px] text-[#B7BDC4]">
          {LANG_LABEL[video.lang]}
        </span>
        {!video.reviewed && (
          <span className="label-mono rounded-full bg-[#3A2F1F] px-[9px] py-[2px] text-[#EFA043]">
            尚未人工確認
          </span>
        )}
      </div>

      <h3 className="mt-2 text-base font-semibold text-white">{video.title}</h3>
      <p className="label-mono mt-[2px] text-muted">{video.channel}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#B7BDC4]">{video.why}</p>

      {playing ? (
        <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="border-2 border-[#4A5057] px-3 py-2 text-[13px] font-semibold text-paper transition-colors hover:border-akai hover:bg-akai"
          >
            ▶ 在這裡播放
          </button>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono text-[#8D9299] underline hover:text-white"
          >
            在 YouTube 開啟
          </a>
        </div>
      )}
    </li>
  );
}

export function VideoList({ videos }: { videos: VideoRef[] }) {
  if (videos.length === 0) return null;

  return (
    <section className="mt-10 border-t border-[#2C3036] pt-6">
      <h2 className="label-mono font-bold text-akai">延伸觀看</h2>
      <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-[#8D9299]">
        以下是外部影片，不是本站內容。手感、律動、音色這些東西文字講不清楚，用看的比較快。
        按下播放之前，本頁不會對 YouTube 發出任何請求。
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {videos.map((v) => (
          <VideoItem key={v.youtubeId} video={v} />
        ))}
      </ul>
    </section>
  );
}
