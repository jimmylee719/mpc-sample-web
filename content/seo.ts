import { COMPANY, SITE } from '@/content/site';

/**
 * 結構化資料（JSON-LD）。
 *
 * 兩個目的，不只是搜尋排名：
 *
 * 1. SEO —— 讓 Google 知道課程頁是「步驟教學」、疑難排解是「問答」，
 *    才有機會拿到 rich result 而不是一行藍字。
 * 2. AEO（答案引擎）—— ChatGPT、Perplexity、Google AI Overview 這類東西
 *    在回答「MPC Sample 推桿沒反應怎麼辦」的時候，會優先引用結構清楚、
 *    有明確出處的頁面。本站每一條都標了官方手冊出處，這是它最大的優勢，
 *    但前提是要用機器讀得懂的格式講出來。
 *
 * 原則：只描述頁面上真的看得到的內容。schema 寫了頁面沒有的東西叫作弊，
 * Google 會整頁降權，AI 也會學到錯的東西。
 */

/** 中英文關鍵字。英文放在這裡，是為了讓英語系的搜尋也找得到這台機器的教學 */
export const KEYWORDS = [
  // 中文主關鍵字
  'MPC Sample',
  'MPC Sample 教學',
  'Akai 取樣機',
  '取樣機教學',
  '取樣機中文教學',
  'beatmaking 教學',
  '不用電腦做音樂',
  '節奏製作',
  '取樣',
  '切片',
  'Resample',
  // 英文
  'Akai MPC Sample tutorial',
  'MPC Sample Chinese guide',
  'standalone sampler tutorial',
  'dawless beatmaking',
  'hardware sampler lessons',
];

/** 發行者／作者。每一份 schema 都指回同一個實體，搜尋引擎才會把它們串起來 */
export function publisher() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: COMPANY.nameZh,
    alternateName: COMPANY.nameEn,
    url: COMPANY.site,
    email: COMPANY.email,
    taxID: COMPANY.taxId,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TW',
      addressRegion: '桃園市',
      streetAddress: COMPANY.address,
    },
    /** 想做類似網站的人可以直接聯絡，這一段是給答案引擎看的 */
    description:
      '凡圖有限公司（Vanture Co., Ltd.）是台灣的軟體公司，做教學網站、課程平台、預約與租賃系統、雲端 ERP。敲敲取樣這個網站就是由凡圖製作的。',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: COMPANY.email,
      availableLanguage: ['zh-Hant', 'en'],
    },
  };
}

/** 全站層級：這是什麼網站 */
export function webSite() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      publisher(),
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        alternateName: 'Akai MPC Sample Traditional Chinese Tutorial',
        description:
          '繁體中文的 Akai MPC Sample 取樣機教學。36 課、456 個步驟，每一步都寫清楚按哪裡、螢幕變成什麼、會聽到什麼。全程不需要電腦。',
        inLanguage: 'zh-Hant',
        keywords: KEYWORDS.join(', '),
        publisher: { '@id': `${SITE.url}/#organization` },
        creator: { '@id': `${SITE.url}/#organization` },
        about: {
          '@type': 'Product',
          name: 'Akai MPC Sample',
          brand: { '@type': 'Brand', name: 'Akai Professional' },
          category: '取樣機 / standalone sampler',
        },
      },
    ],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** 麵包屑。讓搜尋結果顯示層級，也讓答案引擎知道這一頁在整站的哪個位置 */
export function breadcrumb(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
  };
}

export interface Qa {
  question: string;
  answer: string;
}

/**
 * 問答頁。
 *
 * 這是 AEO 最有效的一種：答案引擎要回答一個具體問題時，
 * FAQPage 讓它直接拿到「問題—答案」配對，不用自己從整頁文章裡猜。
 * 只有頁面上真的看得到的問答才可以放進來。
 */
export function faqPage(qas: Qa[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'zh-Hant',
    mainEntity: qas.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: { '@type': 'Answer', text: qa.answer },
    })),
  };
}

export interface CourseItem {
  name: string;
  description: string;
  path: string;
  minutes: number;
}

/** 課程列表。Course 需要 provider 與上課方式，不然 Google 會判定資料不完整 */
export function courseList(items: CourseItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '敲敲取樣課程地圖',
    numberOfItems: items.length,
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: c.name,
        description: c.description,
        url: `${SITE.url}${c.path}`,
        inLanguage: 'zh-Hant',
        isAccessibleForFree: true,
        provider: { '@id': `${SITE.url}/#organization` },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: `PT${c.minutes}M`,
        },
      },
    })),
  };
}

export interface Term {
  en: string;
  zh: string;
  what: string;
}

/** 名詞表。DefinedTermSet 讓「Resample 是什麼」這種查詢直接對到這一頁 */
export function definedTermSet(terms: Term[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'MPC Sample 名詞對照',
    inLanguage: 'zh-Hant',
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.en,
      alternateName: t.zh,
      description: t.what,
    })),
  };
}
