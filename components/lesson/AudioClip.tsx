'use client';

/**
 * 課程音檔播放器。
 *
 * 音檔放在 Cloudflare R2，網址前綴由環境變數 NEXT_PUBLIC_R2_BASE 提供，
 * 憑證與 bucket 設定不進版控（見 .env.example）。
 *
 * 效能要求（PROJECT-PLAN §10）：preload="none"，點了才載，不影響 LCP。
 * 沒設定 R2 時不渲染壞掉的播放器，而是誠實說明音檔還沒上線。
 */

const R2_BASE = process.env.NEXT_PUBLIC_R2_BASE ?? '';

/** 把 Step.audio 的相對路徑轉成完整網址；沒設定 R2 時回 null */
export function audioUrl(path: string): string | null {
  if (!R2_BASE) return null;
  const base = R2_BASE.replace(/\/$/, '');
  const rel = path.replace(/^\//, '');
  return `${base}/${rel}`;
}

export function AudioClip({ path, label = '聽這一步的聲音' }: { path: string; label?: string }) {
  const url = audioUrl(path);

  if (!url) {
    return (
      <p className="label-mono mt-3 text-muted">音檔尚未上線（{path}）</p>
    );
  }

  return (
    <figure className="mt-3">
      <figcaption className="label-mono mb-1 text-muted">{label}</figcaption>
      <audio controls preload="none" src={url} className="w-full">
        你的瀏覽器不支援音訊播放。
      </audio>
    </figure>
  );
}
