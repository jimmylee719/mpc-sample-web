import { notFound } from 'next/navigation';
import { genres, getGenre } from '@/content/genres';

export const dynamicParams = false;

export function generateStaticParams() {
  return genres.map((g) => ({ slug: g.slug }));
}

export default async function GenrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const genre = getGenre(slug);
  if (!genre) notFound();

  // P6：改用 <GenreCard genre={genre} />
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">
        {genre.level} · {genre.titleEn}
      </p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        {genre.title}
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">{genre.tagline}</p>
    </main>
  );
}
