'use client';

import { useState } from 'react';
import type { VideoRef } from '@/types/lesson';

/**
 * 延伸觀看清單。
 *
 * 四個硬性設計決策：
 *
 * 1. **點擊才載入**。在你按下去之前，頁面不會對 YouTube 發出任何請求。
 *    這同時保護 LCP < 1.5s 的效能門檻，也符合本站不蒐集個資的立場。
 * 2. **一律用 youtube-nocookie.com**。
 * 3. **字幕交給 YouTube 自己處理**。嵌入時帶上 `cc_load_policy=1` 與
 *    `cc_lang_pref=zh-Hant`，播放器會自動開啟字幕並優先選繁體中文，
 *    包含 YouTube 自己的自動翻譯。
 *
 *    另外 2026-08-10 起開放 `summary`：看過影片的人可以用**自己的話**寫
 *    200 字內的中文重點。逐字稿與完整翻譯的字幕仍然是紅線（重製與改作）。
 * 4. **不是 MPC Sample 的影片一定要標機型**。MPC One、MPC Live 有本機沒有的功能，
 *    不標清楚讀者會照著影片找不存在的按鍵。
 *
 * 另外：沒有人實際看過的影片會標「尚未人工確認」。沒看過就說推薦是不誠實的。
 */

const LANG_LABEL: Record<VideoRef['lang'], string> = {
  'zh-Hant': '繁中',
  'zh-Hans': '簡中',
  en: '英文',
  ja: '日文',
  other: '其他語言',
};

/**
 * 開啟字幕，並優先套用繁體中文（含 YouTube 自動翻譯）。
 * 影片沒有字幕軌時這些參數不會有任何作用，也不會出錯。
 */
function embedSrc(id: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    cc_load_policy: '1',
    cc_lang_pref: 'zh-Hant',
    hl: 'zh-Hant',
    rel: '0',
    modestbranding: '1',
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

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
        {video.device && (
          <span className="label-mono rounded-full bg-[#3A2F1F] px-[9px] py-[2px] text-[#EFA043]">
            示範機型 {video.device}
          </span>
        )}
        {!video.reviewed && (
          <span className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-[2px] text-[#8D9299]">
            尚未人工確認
          </span>
        )}
      </div>

      <h3 className="mt-2 text-base font-semibold text-white">{video.title}</h3>
      <p className="label-mono mt-[2px] text-muted">{video.channel}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#B7BDC4]">{video.why}</p>

      {/* 中文摘要：看過的人用自己的話寫的。沒有就不顯示，不留空位。 */}
      {video.summary && (
        <div className="mt-3 rounded-lg border-l-2 border-live bg-[#1A211C] px-3 py-[10px]">
          <p className="label-mono text-live">中文重點</p>
          <p className="mt-[5px] text-sm leading-relaxed text-[#C6CCD2]">{video.summary}</p>
        </div>
      )}

      {video.device && (
        <p className="mt-2 rounded-lg bg-[#241E14] px-3 py-2 text-[13px] leading-relaxed text-[#E0B36B]">
          這支不是用 MPC Sample 拍的。觀念可以參考，<b className="font-bold">按鍵位置不要照抄</b>。
        </p>
      )}

      {playing ? (
        <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            src={embedSrc(video.youtubeId)}
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
      <h2 className="chan label-mono font-bold text-white">延伸觀看 · {videos.length} 支</h2>
      <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[#8D9299]">
        以下是外部影片，不是本站內容。手感、律動、音色這類東西用看的比較快。
        按下播放之前，本頁不會對 YouTube 發出任何請求。
      </p>
      <p className="mt-2 max-w-[62ch] text-[13px] leading-relaxed text-[#6B7178]">
        字幕已預設開啟並優先選繁體中文。影片本身沒有中文字幕時，可以在播放器右下角的
        設定 → 字幕 → 自動翻譯 裡選中文（繁體）。標了「中文重點」的是看過之後寫的摘要，
        本站不做逐字稿，也不做整份翻譯字幕。
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {videos.map((v) => (
          <VideoItem key={v.youtubeId} video={v} />
        ))}
      </ul>
    </section>
  );
}
