import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import { SiteHeader } from '@/components/site/SiteHeader';
import { BottomNav } from '@/components/site/BottomNav';
import { SiteFooter } from '@/components/site/SiteFooter';
import { RegisterSW } from '@/components/site/RegisterSW';

const SITE_NAME = '敲敲取樣 · 一台就夠';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — MPC Sample 中文教學`,
    template: `%s ｜ ${SITE_NAME}`,
  },
  description:
    '繁體中文的 Akai 取樣機完整教學。把一台手持取樣機變成能上台表演、也能獨立完成整首歌的樂器，全程不需要電腦。',
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
