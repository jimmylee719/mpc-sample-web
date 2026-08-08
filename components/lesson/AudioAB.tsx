'use client';

import { useRef, useState } from 'react';
import { audioUrl } from './AudioClip';

/**
 * 前後對照播放器。同一段素材處理前與處理後，一次只播一個。
 * 教濾波、壓縮、復古模擬時，聽差別比讀文字有用得多。
 */
export function AudioAB({
  before,
  after,
  beforeLabel = '處理前',
  afterLabel = '處理後',
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [side, setSide] = useState<'before' | 'after'>('before');
  const ref = useRef<HTMLAudioElement>(null);

  const beforeUrl = audioUrl(before);
  const afterUrl = audioUrl(after);
  const url = side === 'before' ? beforeUrl : afterUrl;

  if (!beforeUrl || !afterUrl) {
    return <p className="label-mono mt-3 text-muted">前後對照音檔尚未上線</p>;
  }

  const swap = (next: 'before' | 'after') => {
    const wasPlaying = ref.current !== null && !ref.current.paused;
    setSide(next);
    if (wasPlaying) {
      // 換邊之後保持播放，才聽得出差別
      requestAnimationFrame(() => void ref.current?.play());
    }
  };

  return (
    <div className="mt-3">
      <div className="flex gap-1">
        {(
          [
            ['before', beforeLabel],
            ['after', afterLabel],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => swap(id)}
            aria-pressed={side === id}
            className={`label-mono rounded-full px-[9px] py-1 transition-colors ${
              side === id ? 'bg-akai text-white' : 'bg-[#2A2F35] text-[#B7BDC4] hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <audio ref={ref} controls preload="none" src={url ?? undefined} className="mt-2 w-full">
        你的瀏覽器不支援音訊播放。
      </audio>
    </div>
  );
}
