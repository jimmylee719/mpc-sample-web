import type { Genre, GenreLevel } from '../../types/genre';
import { l1Genres } from './l1';
import { l2Genres } from './l2';
import { l3Genres } from './l3';
import { l4Genres } from './l4';

/**
 * 曲風配方卡註冊表。依難度分級，L1 最容易在機上完成，L4 機上做不完整。
 * 檔案按分級拆成四支，加新曲風只要放進對應的分級檔再 import 進來。
 */
export const genres: Genre[] = [...l1Genres, ...l2Genres, ...l3Genres, ...l4Genres];

export const genreBySlug = new Map<string, Genre>(genres.map((g) => [g.slug, g]));

export function getGenre(slug: string): Genre | undefined {
  return genreBySlug.get(slug);
}

export function genreHref(genre: Genre): string {
  return `/genre/${genre.slug}`;
}

export const GENRE_LEVELS: ReadonlyArray<{ id: GenreLevel; label: string; note: string }> = [
  { id: 'L1', label: 'L1 · 機上直接完成', note: '0 到 1 次 resample，pad 綽綽有餘' },
  { id: 'L2', label: 'L2 · 需要疊層', note: '1 到 2 次 resample，開始要規劃 pad' },
  { id: 'L3', label: 'L3 · pad 預算吃緊', note: '3 次以上 resample，動手前一定要先規劃' },
  { id: 'L4', label: 'L4 · 機上做不完整', note: '能做到骨架或 demo，成品需要另外處理' },
];

export function genresByLevel(level: GenreLevel): Genre[] {
  return genres.filter((g) => g.level === level);
}
