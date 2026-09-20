import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { genres, getGenre } from '@/content/genres';
import { GenreCard } from '@/components/genre/GenreCard';
import { VideoList } from '@/components/video/VideoList';
import { videosFor } from '@/content/videos';
import { withShare, SITE } from '@/content/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb } from '@/content/seo';

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return genres.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const genre = getGenre(slug);
  if (!genre) return {};
  return withShare({
    title: `${genre.titleEn} 怎麼做 — 取樣機配方卡`,
    description: `${genre.tagline} BPM ${genre.tempo.bpmMin}–${genre.tempo.bpmMax}，含 pad 配置、鼓組拆解、resample 規劃與效果配方。`,
  });
}

export default async function GenrePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const genre = getGenre(slug);
  if (!genre) notFound();

  const videos = videosFor(genre.slug);

  /**
   * 配方卡是一份「在這台機器上做這個曲風」的操作指引，所以標 HowTo 而不是文章。
   * 步驟就是 resample 的次數規劃，那是這張卡真正的骨架。
   */
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `在 MPC Sample 上做 ${genre.titleEn}`,
    description: genre.tagline,
    inLanguage: 'zh-Hant',
    isAccessibleForFree: true,
    author: { '@id': `${SITE.url}/#organization` },
    supply: [{ '@type': 'HowToSupply', name: 'Akai MPC Sample' }],
    step: genre.resamples.map((r, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `第 ${r.pass} 次 resample`,
      text: `${r.what}，${r.frees}`,
    })),
  };

  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      {genre.resamples.length > 0 && <JsonLd data={howTo} />}
      <JsonLd
        data={breadcrumb([
          { name: '首頁', path: '/' },
          { name: '曲風工廠', path: '/genre' },
          { name: genre.title, path: `/genre/${genre.slug}` },
        ])}
      />

      <header className="mb-6 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">
          {genre.level} · {genre.titleEn}
        </p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-[1.15] tracking-[-0.02em] text-white">
          {genre.title}
        </h1>
        <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">{genre.tagline}</p>
      </header>

      <GenreCard genre={genre} />

      {videos.length > 0 ? (
        <VideoList videos={videos} />
      ) : (
        /* 找不到就說找不到。硬塞一支不相干的影片比沒有還糟。 */
        <section className="mt-10 border-t border-[#2C3036] pt-6">
          <h2 className="chan label-mono font-bold text-white">延伸觀看</h2>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-[#8D9299]">
            這個曲風目前找不到用取樣機做的影片教學。找到了會補上，不會拿不相干的影片湊數。
          </p>
        </section>
      )}

      <nav className="mt-8 border-t border-[#2C3036] pt-4">
        <Link href="/genre" className="label-mono text-[#8D9299] hover:text-white">
          ← 回曲風工廠
        </Link>
      </nav>
    </main>
  );
}
