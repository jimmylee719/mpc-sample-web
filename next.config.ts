import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 圖片一律 AVIF，quality 85（PROJECT-PLAN §10）
  images: {
    formats: ['image/avif'],
    qualities: [85],
  },
  // 課程頁全部 SSG，不允許意外引入 runtime 運算
  reactStrictMode: true,
};

export default nextConfig;
