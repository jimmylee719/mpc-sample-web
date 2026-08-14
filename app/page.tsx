import Link from 'next/link';
import { lessons, lessonHref, SEASONS } from '@/content/lessons';
import { genres } from '@/content/genres';
import { allVideos } from '@/content/videos';
import { PadGrid, Vinyl, WaveRule, LevelMeter } from '@/components/site/Deco';
import { MpcPanel } from '@/components/mpc/MpcPanel';

const totalSteps = lessons.reduce((n, l) => n + l.steps.length, 0);
const first = lessons[0]!;

// 同一支影片可能被兩課引用，算不重複的支數才誠實
const uniqueVideos = new Set([
  ...allVideos.map((v) => v.youtubeId),
  ...lessons.flatMap((l) => (l.videos ?? []).map((v) => v.youtubeId)),
]).size;

const SECTIONS = [
  {
    href: '/learn',
    tag: `${SEASONS.length} 個 SEASON · ${lessons.length} 課`,
    label: '課程地圖',
    note: '一課等於一個完成的作品，不是一課一個功能。做完手上就多一樣東西。',
  },
  {
    href: '/genre',
    tag: `${genres.length} 張配方卡`,
    label: '曲風工廠',
    note: 'BPM、pad 配置、鼓組拆解、效果配方。做到一半忘記了就翻這裡。',
  },
  {
    href: '/reference',
    tag: '六張速查表',
    label: '查詢區',
    note: '快捷鍵、旋鈕矩陣、效果字典、名詞、疑難排解、尚未驗證清單。',
  },
  {
    href: '/samples',
    tag: '自錄與 CC0',
    label: '素材庫',
    note: '只放自己錄的跟 CC0 的。不提供他人音樂，這條線不會鬆。',
  },
];

const STATS = [
  { n: String(lessons.length), unit: '課', note: '五個 Season' },
  { n: String(totalSteps), unit: '步', note: '每步都寫清楚按哪裡' },
  { n: String(genres.length), unit: '曲風', note: '八段式配方卡' },
  { n: String(uniqueVideos), unit: '影片', note: '官方與社群延伸觀看' },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pt-[18px]">
      {/* ── 主視覺 ───────────────────────────────── */}
      <section className="grid items-center gap-8 py-6 split:grid-cols-[1.15fr_1fr] split:gap-12 split:py-10">
        <div>
          <p className="label-mono flex items-center gap-[10px] font-bold text-akai">
            敲敲取樣 · 一台就夠
            <LevelMeter />
          </p>

          <h1 className="mt-3 text-[clamp(28px,6.2vw,50px)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            一台手持取樣機
            <br />
            <span className="text-akai">整首歌自己做完</span>
          </h1>

          <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.75] text-[#A7ADB4]">
            繁體中文的 Akai 取樣機教學。按哪裡、螢幕變成什麼、耳朵會聽到什麼，
            每一步都寫清楚。全程不需要電腦。
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-[10px]">
            <Link
              href={lessonHref(first)}
              className="border-2 border-akai bg-akai px-5 py-[13px] text-sm font-bold text-white transition-colors hover:border-white hover:bg-transparent"
            >
              從第 1 課開始 →
            </Link>
            <Link
              href="/start"
              className="border-2 border-[#4A5057] px-5 py-[13px] text-sm font-semibold text-paper transition-colors hover:border-white"
            >
              機器剛到手？先看開箱
            </Link>
          </div>

          <p className="mt-4 text-sm text-[#8D9299]">
            <Link href="/learn" className="underline hover:text-white">
              看完整課程地圖
            </Link>
            ．完全沒碰過音樂也可以，第一課從開機開始教。
          </p>

          <p className="label-mono mt-5 text-[#6B7178]">
            事實基準 · AKAI 官方手冊 V1.3.0 REVA
          </p>
        </div>

        {/* 機器的兩個象徵：轉盤與 pad。純 CSS，沒有圖檔要下載。 */}
        <div className="relative mx-auto flex w-full max-w-[400px] items-center justify-center gap-5 split:max-w-none">
          <Vinyl className="w-[38%] shrink-0" />
          <div className="w-[52%] rounded-[18px] border border-[#2C3036] bg-stage-2 p-4 shadow-[0_18px_40px_rgb(0_0_0/0.45)]">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[#6B7178]">PADS</span>
              <span className="rec-dot" />
            </div>
            <PadGrid className="mt-3" lit={[1, 3, 6, 9, 12, 16]} />
            <div className="mt-3 h-[3px] rounded-full bg-[#2C3036]">
              <div className="h-full w-[62%] rounded-full bg-live" />
            </div>
          </div>
        </div>
      </section>

      <div className="text-[#262B32]">
        <WaveRule seed={11} bars={140} />
      </div>

      {/* ── 數字 ─────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-3 py-8 split:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.unit} className="rounded-xl border border-[#2C3036] bg-stage-2 px-4 py-[14px]">
            <p className="font-mono text-[26px] leading-none tracking-[-0.02em] text-white">
              {s.n}
              <span className="ml-1 text-[13px] text-[#8D9299]">{s.unit}</span>
            </p>
            <p className="label-mono mt-2 text-[#6B7178]">{s.note}</p>
          </div>
        ))}
      </section>

      {/* ── 這就是那台機器 ───────────────────────── */}
      <section className="mt-4 grid items-center gap-7 pb-4 split:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] split:gap-10">
        <div>
          <h2 className="chan label-mono font-bold text-white">這就是那台機器</h2>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.75] text-[#A7ADB4]">
            全站的面板圖都是這一張向量圖，不是照片。它會跟著課程一步一步變：
            該按的地方亮綠光，按住 SHIFT 的時候，
            <b className="font-semibold text-white">整台機器的紅色第二功能字會一起亮起來</b>。
          </p>
          <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.75] text-[#A7ADB4]">
            接背板的步驟會自動翻到背面。你不用一邊看螢幕一邊猜自己的手在哪裡。
          </p>
          <Link
            href="/learn/s1/panel-and-shift-functions"
            className="mt-5 inline-block border-2 border-[#4A5057] px-5 py-[11px] text-sm font-semibold text-paper transition-colors hover:border-akai hover:bg-akai"
          >
            先學會讀面板 →
          </Link>
        </div>

        <div className="rounded-[18px] border border-[#2C3036] bg-stage-2 p-4 shadow-[0_18px_44px_rgb(0_0_0/0.4)]">
          <MpcPanel targets={['pads']} screen={{ t1: '敲敲取樣', wave: 24 }} />
          <p className="label-mono mt-[10px] text-center text-[#6B7178]">
            本站自繪向量面板 · 非產品照片
          </p>
        </div>
      </section>

      {/* ── 四個區塊 ─────────────────────────────── */}
      <section className="pb-4">
        <h2 className="chan label-mono font-bold text-white">全站四個地方</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="card h-full p-[18px]">
                <span className="label-mono text-akai">{s.tag}</span>
                <span className="mt-[6px] block text-xl font-semibold text-white">{s.label}</span>
                <span className="mt-2 block text-sm leading-relaxed text-[#8D9299]">{s.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 五個 Season ──────────────────────────── */}
      <section className="pt-10">
        <h2 className="chan label-mono font-bold text-white">走完這五段，你就會了</h2>
        <ol className="mt-4 space-y-[6px]">
          {SEASONS.map((season) => (
            <li key={season.n}>
              <Link
                href="/learn"
                className="flex items-center gap-4 rounded-xl border border-[#2C3036] bg-stage-2 px-4 py-[13px] transition-colors hover:border-akai"
              >
                <span className="font-mono text-[20px] leading-none text-[#3D4854]">
                  {String(season.n).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-white">{season.title}</span>
                  <span className="block truncate text-[13px] text-[#8D9299]">
                    學完手上有：{season.outcome}
                  </span>
                </span>
                <span className="label-mono shrink-0 text-[#6B7178]">
                  {lessons.filter((l) => l.season === season.n).length} 課
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 立場 ─────────────────────────────────── */}
      <section className="mt-12 rounded-[14px] bg-paper px-[18px] py-6 text-ink split:px-[26px]">
        <h2 className="label-mono font-bold text-akai">這個網站的三個立場</h2>
        <dl className="mt-4 grid gap-5 split:grid-cols-3">
          <div>
            <dt className="text-base font-semibold">先做出東西</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              一課做完一個作品。不是先學十個功能，最後才發現不知道要幹嘛。
            </dd>
          </div>
          <div>
            <dt className="text-base font-semibold">教讀懂面板</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              不是背組合鍵。按住 SHIFT 時，整台機器的紅字會一起亮給你看。
            </dd>
          </div>
          <div>
            <dt className="text-base font-semibold">不確定就說不確定</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              沒實測過的一律標「尚未驗證」，全部公開列在查詢區，不寫成肯定語氣。
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
