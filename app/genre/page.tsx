import type { Metadata } from 'next';
import Link from 'next/link';
import { GENRE_LEVELS, genresByLevel, genreHref, genres } from '@/content/genres';
import { Turntable } from '@/components/site/Deco';

export const metadata: Metadata = {
  title: '曲風工廠 — 取樣機配方卡',
  description:
    '每個曲風一張八段式配方卡：BPM、pad 配置、鼓組拆解、素材建議、resample 次數、效果配方與完成檢查點。依機上實現難度分成 L1 到 L4。',
};

export default function GenreIndexPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 grid items-center gap-6 border-b border-[#2C3036] pb-6 split:grid-cols-[1fr_auto]">
        <div>
          <p className="label-mono font-bold text-akai">GENRE · {genres.length} 張配方卡</p>
          <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
            曲風工廠
          </h1>
          <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
            這裡不是課程，是配方卡。做到一半忘記 BPM 或效果怎麼設，翻到這裡瞄一眼就回去繼續。
            分級看的是機上做得多完整，不是好不好聽。
          </p>
        </div>
        <Turntable className="mx-auto w-[132px] shrink-0 split:w-[150px]" />
      </header>

      <div className="space-y-10">
        {GENRE_LEVELS.map((level) => {
          const items = genresByLevel(level.id);
          if (items.length === 0) return null;
          return (
            <section key={level.id}>
              <h2 className="chan label-mono font-bold text-white">{level.label}</h2>
              <p className="mt-1 pl-[13px] text-sm text-[#8D9299]">{level.note}</p>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2 split:grid-cols-3">
                {items.map((g) => (
                  <li key={g.slug}>
                    <Link href={genreHref(g)} className="card h-full p-4">
                      <span className="label-mono text-muted">
                        {g.tempo.bpmMin}–{g.tempo.bpmMax} BPM
                        {g.resamples.length > 0 && ` · resample ×${g.resamples.length}`}
                      </span>
                      <span className="mt-1 block text-lg text-white">{g.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-[#8D9299]">
                        {g.tagline}
                      </span>
                      {g.miniPlayer && (
                        <span className="label-mono mt-2 inline-block rounded-full bg-akai px-[9px] py-[2px] text-white">
                          含迷你播放器
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
