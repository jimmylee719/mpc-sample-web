import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { genres, getGenre } from '@/content/genres';
import { GenreCard } from '@/components/genre/GenreCard';
import { VideoList } from '@/components/video/VideoList';
import { videosFor } from '@/content/videos';
import { withShare } from '@/content/site';

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

  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
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
