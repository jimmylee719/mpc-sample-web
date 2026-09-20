import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';
import { lessons, lessonHref } from '@/content/lessons';
import { genres } from '@/content/genres';

// output: 'export' 之下必須明說這支是靜態的，否則 Next 會把它當成需要伺服器的路由
export const dynamic = 'force-static';

/**
 * sitemap.xml。
 *
 * 靜態輸出時 Next 會在建置期把這支跑完，產出一個真的檔案，不需要伺服器。
 *
 * priority 的排法對應這個站真正的重心：課程 > 曲風 > 查詢。
 * lastModified 一律用課程自己的查核日期，不用建置時間——
 * 建置時間會讓每次部署都看起來像全站更新，那是在騙搜尋引擎。
 */

const STATIC: Array<[string, number]> = [
  ['/', 1],
  ['/start', 0.9],
  ['/learn', 0.9],
  ['/genre', 0.8],
  ['/reference', 0.7],
  ['/reference/shortcuts', 0.6],
  ['/reference/knobs', 0.6],
  ['/reference/fx', 0.6],
  ['/reference/glossary', 0.6],
  ['/reference/troubleshoot', 0.6],
  ['/reference/firmware', 0.5],
  ['/reference/specs', 0.6],
  ['/reference/techniques', 0.6],
  ['/reference/official-order', 0.5],
  ['/samples', 0.5],
  ['/about', 0.4],
  ['/privacy', 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const newest = lessons
    .map((l) => l.verifiedDate)
    .sort()
    .at(-1);

  return [
    ...STATIC.map(([path, priority]) => ({
      url: `${SITE.url}${path}`,
      lastModified: newest,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...lessons.map((l) => ({
      url: `${SITE.url}${lessonHref(l)}`,
      lastModified: l.verifiedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...genres.map((g) => ({
      url: `${SITE.url}/genre/${g.slug}`,
      lastModified: newest,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
