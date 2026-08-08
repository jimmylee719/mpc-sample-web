import type { Lesson } from '../../types/lesson';

/**
 * 全站課程註冊表。P1 起逐課加入（s1-01 … s5-06，共 34 課）。
 * 加課只要 import 進來、push 到這個陣列，`npm run build` 會自動驗證。
 */
export const lessons: Lesson[] = [];

export const lessonById = new Map<string, Lesson>(lessons.map((l) => [l.id, l]));

export function getLesson(id: string): Lesson | undefined {
  return lessonById.get(id);
}
