import type { Lesson, SeasonNumber } from '../../types/lesson';
import { s1_01 } from './s1-01';
import { s1_02 } from './s1-02';
import { s1_03 } from './s1-03';
import { s1_04 } from './s1-04';
import { s2_01 } from './s2-01';
import { s2_02 } from './s2-02';
import { s2_03 } from './s2-03';
import { s2_04 } from './s2-04';
import { s2_05 } from './s2-05';
import { s2_06 } from './s2-06';
import { s2_07 } from './s2-07';
import { s2_08 } from './s2-08';
import { s3_01 } from './s3-01';
import { s3_02 } from './s3-02';
import { s3_03 } from './s3-03';
import { s3_04 } from './s3-04';
import { s3_05 } from './s3-05';
import { s3_06 } from './s3-06';
import { s3_07 } from './s3-07';
import { s3_08 } from './s3-08';
import { s3_09 } from './s3-09';
import { s4_01 } from './s4-01';
import { s4_02 } from './s4-02';
import { s4_03 } from './s4-03';
import { s4_04 } from './s4-04';
import { s4_05 } from './s4-05';
import { s4_06 } from './s4-06';
import { s4_07 } from './s4-07';
import { s5_01 } from './s5-01';
import { s5_02 } from './s5-02';
import { s5_03 } from './s5-03';
import { s5_04 } from './s5-04';
import { s5_05 } from './s5-05';
import { s5_06 } from './s5-06';

/**
 * 全站課程註冊表。加課只要 import 進來、放進這個陣列，
 * `npm run build` 會自動驗證，有錯就中止建置。
 */
export const lessons: Lesson[] = [
  s1_01, s1_02, s1_03, s1_04,
  s2_01, s2_02, s2_03, s2_04, s2_05, s2_06, s2_07, s2_08,
  s3_01, s3_02, s3_03, s3_04, s3_05, s3_06, s3_07, s3_08, s3_09,
  s4_01, s4_02, s4_03, s4_04, s4_05, s4_06, s4_07,
  s5_01, s5_02, s5_03, s5_04, s5_05, s5_06,
];

export const lessonById = new Map<string, Lesson>(lessons.map((l) => [l.id, l]));

export function getLesson(id: string): Lesson | undefined {
  return lessonById.get(id);
}

/** 課程頁網址：/learn/s1/make-your-first-beat */
export function lessonHref(lesson: Lesson): string {
  return `/learn/s${lesson.season}/${lesson.slug}`;
}

export function lessonsBySeason(season: SeasonNumber): Lesson[] {
  return lessons.filter((l) => l.season === season).sort((a, b) => a.index - b.index);
}

/** 依網址參數找課，找不到回 undefined */
export function findLesson(season: string, slug: string): Lesson | undefined {
  return lessons.find((l) => `s${l.season}` === season && l.slug === slug);
}

export const SEASONS: ReadonlyArray<{ n: SeasonNumber; title: string; outcome: string }> = [
  { n: 1, title: '起步', outcome: '一段自己錄、切、彈的循環' },
  { n: 2, title: '取樣工藝', outcome: '一組乾淨可用的素材庫' },
  { n: 3, title: '編曲', outcome: '一首完整的歌，匯出成音檔' },
  { n: 4, title: '聲音設計', outcome: '同一段素材的五種面貌' },
  { n: 5, title: '現場演出', outcome: '一段 10 分鐘的 live set' },
];
