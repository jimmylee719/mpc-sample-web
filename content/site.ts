/**
 * 站方與公司資訊。集中一處，隱私權政策、關於、頁尾都引用這裡，
 * 避免哪天地址改了卻只改到其中一頁。
 */

export const COMPANY = {
  nameZh: '凡圖有限公司',
  nameEn: 'Vanture Co., Ltd.',
  taxId: '62073421',
  address: '桃園市中壢區青峰路一段 49 號 5 樓',
  email: 'skadoosh.ai.lab@gmail.com',
  site: 'https://getvanture.com',
} as const;

export const SITE = {
  name: '敲敲取樣 · 一台就夠',
  url: 'https://mpc-sample-web.vercel.app',
  /** 政策最後更新日 */
  policyUpdated: '2026-08-10',
} as const;

/**
 * 每一頁的 metadata。
 *
 * 為什麼要有這支：Next 不會自動把頁面的 title 與 description 帶進 og: 標籤。
 * 只寫 title 的話，分享出去每一頁都長得一樣——貼二十課到社群，
 * 二十張卡片會是同一句話。所以這裡一次把三組（HTML、Open Graph、Twitter）填齊。
 *
 * 分享縮圖沿用全站那一張，各頁不另外做圖。
 */
export function withShare<T extends { title?: unknown; description?: unknown }>(meta: T): T {
  return {
    ...meta,
    openGraph: { title: meta.title, description: meta.description },
    twitter: { title: meta.title, description: meta.description },
  };
}

/**
 * 商標聲明。這一段每一個引用到 Akai 或 MPC 的地方都可能用得到，
 * 寫一次就好。
 */
export const TRADEMARK_NOTICE =
  'Akai、Akai Professional、MPC 為 inMusic Brands, Inc. 及其關係企業的商標或註冊商標。本站為獨立的第三方教學網站，與 Akai Professional、inMusic Brands 沒有任何隸屬、代理或合作關係，也未經其認可或贊助。';
