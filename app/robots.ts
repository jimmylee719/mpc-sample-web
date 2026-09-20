import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

// output: 'export' 之下必須明說這支是靜態的，否則 Next 會把它當成需要伺服器的路由
export const dynamic = 'force-static';

/**
 * robots.txt。
 *
 * 全站開放。沒有帳號、沒有後台、沒有要藏的東西，所以沒有 disallow。
 * 唯一擋掉的是離線備援頁——那頁只有在沒網路時才有意義，
 * 被搜尋引擎收錄進去對任何人都沒有好處。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/offline'] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
