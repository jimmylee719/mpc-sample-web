import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import { SiteHeader } from '@/components/site/SiteHeader';
import { BottomNav } from '@/components/site/BottomNav';
import { SiteFooter } from '@/components/site/SiteFooter';
import { RegisterSW } from '@/components/site/RegisterSW';
import { SITE, COMPANY } from '@/content/site';
import { KEYWORDS, webSite } from '@/content/seo';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_NAME = SITE.name;
const DESCRIPTION =
  '繁體中文的 Akai 取樣機完整教學。把一台手持取樣機變成能上台表演、也能獨立完成整首歌的樂器，全程不需要電腦。';

export const metadata: Metadata = {
  // 有了這個，各頁的 canonical 與 og:image 才能用相對路徑寫，輸出時會補成絕對網址
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE_NAME} — MPC Sample 中文教學`,
    template: `%s ｜ ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  // './' 代表「這一頁自己」，每頁都會得到指向自己的 canonical
  alternates: { canonical: './' },
  // 中英文一起放。英文不是為了給人讀，是讓英語系的搜尋也對得上這台機器
  keywords: KEYWORDS,
  authors: [{ name: COMPANY.nameZh, url: COMPANY.site }],
  creator: COMPANY.nameZh,
  publisher: COMPANY.nameZh,
  category: '音樂製作教學',
  robots: {
    index: true,
    follow: true,
    // 讓 Google 的摘要與圖片預覽不要被自動裁短，內容本來就是要給人看的
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  /**
   * 分享卡片。這個站是要貼到社群去的，沒有這一段，
   * 貼出去只會是一條白底連結，沒人會點。
   */
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: SITE_NAME,
    // 跟 title 一樣用樣板，各頁才會分享出自己的標題，而不是全站同一句
    title: {
      default: `${SITE_NAME} — MPC Sample 中文教學`,
      template: `%s ｜ ${SITE_NAME}`,
    },
    description: DESCRIPTION,
    url: './',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '取樣機面板：螢幕、波形、三顆旋鈕與 16 顆打擊墊' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — MPC Sample 中文教學`,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
  applicationName: SITE_NAME,
  formatDetection: { telephone: false },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  // 裝成 App 之後的標題列名稱，短一點才不會被切掉
  appleWebApp: {
    capable: true,
    title: '敲敲取樣',
    statusBarStyle: 'black-translucent',
  },
  // Next 只輸出新標準的 mobile-web-app-capable。
  // iOS 16.4 以前只認舊的那個名字，所以這裡手動補上，不然舊 iPhone 裝起來還是開瀏覽器。
  other: { 'apple-mobile-web-app-capable': 'yes' },
};

export const viewport: Viewport = {
  themeColor: '#14161A',
  width: 'device-width',
  initialScale: 1,
  // 有瀏海與 home indicator 的機型，內容要能鋪到邊，安全區另外用 env() 補
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-stage text-paper font-sans">
        {/* 全站只需要一份：這是什麼網站、誰做的 */}
        <JsonLd data={webSite()} />
        <SiteHeader />

        {/* 行動裝置底部有導覽列，內容要讓出高度，不然最後一行會被蓋住 */}
        <div className="pb-[calc(68px+env(safe-area-inset-bottom))] split:pb-0">
          {children}
          <SiteFooter />
        </div>

        <BottomNav />
        <RegisterSW />
      </body>
    </html>
  );
}
