import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 鎖定專案根目錄，避免 Turbopack 往上抓到家目錄的 package-lock.json
  turbopack: { root: import.meta.dirname },

  /**
   * 全站靜態輸出。整個站沒有任何 runtime 運算，
   * 而且 Pagefind 需要一個真實的 HTML 目錄才能建索引。
   */
  output: 'export',
  images: {
    formats: ['image/avif'],
    qualities: [85],
    // 靜態輸出沒有圖片最佳化伺服器
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
