import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';

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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-stage text-paper font-sans">{children}</body>
    </html>
  );
}
