import type { Genre } from '../../types/genre';

/** 曲風配方卡註冊表。P6 起加入（16 個曲風）。 */
export const genres: Genre[] = [];

export const genreBySlug = new Map<string, Genre>(genres.map((g) => [g.slug, g]));

export function getGenre(slug: string): Genre | undefined {
  return genreBySlug.get(slug);
}
