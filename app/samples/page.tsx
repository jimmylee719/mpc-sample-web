import type { Metadata } from 'next';
import Link from 'next/link';
import { RecordCrate } from '@/components/site/Deco';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '素材庫 — 自錄與 CC0',
  description:
    '本站提供的免費取樣素材，一律自錄或 CC0，並保留原始檔佐證。不提供他人音樂素材下載。',
});

const CATEGORIES = [
  {
    id: 'percussion',
    title: '生活打擊',
    what: '鑰匙、原子筆、玻璃杯、紙箱、椅子',
    why: '權利完全乾淨，而且音色比素材包更獨特',
    genres: 'Tech House、Afrobeats、Techno',
  },
  {
    id: 'ambience',
    title: '環境音',
    what: '雨聲、街道、咖啡店、風扇、車流',
    why: '鋪在整首下面，可以把不同來源的素材黏在一起',
    genres: 'Lo-fi Hip Hop、Techno',
  },
  {
    id: 'texture',
    title: '質感層',
    what: '黑膠雜訊、卡帶底噪、房間空氣聲',
    why: '讓數位的乾淨感消失，是復古曲風的基礎',
    genres: 'Boom Bap、Lo-fi Hip Hop',
  },
  {
    id: 'shaker',
    title: '手作沙鈴',
    what: '米粒、豆子裝進罐子搖出來的聲音',
    why: '零成本，而且力度變化比合成音自然',
    genres: 'Afrobeats、Amapiano',
  },
];

const READY = Boolean(process.env.NEXT_PUBLIC_R2_BASE);

export default function SamplesPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 grid items-center gap-6 border-b border-[#2C3036] pb-6 split:grid-cols-[1fr_auto]">
        <div>
          <p className="label-mono font-bold text-akai">SAMPLES · 自錄與 CC0</p>
          <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
            素材庫
          </h1>
          <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-[#8D9299]">
            每一個檔案都是自己錄的，或是 CC0 授權，可以商業使用。
          </p>
        </div>
        <RecordCrate className="mx-auto w-[190px] shrink-0 split:w-[210px]" />
      </header>

      <section className="rounded-[14px] border-l-[3px] border-l-akai bg-[rgba(214,52,44,.07)] px-4 py-4">
        <p className="label-mono font-bold text-akai">本站的素材政策</p>
        <ul className="mt-2 space-y-1 text-sm leading-[1.75] text-[#D9D4CB]">
          <li>· 一律自錄或 CC0，原始檔全部保留佐證</li>
          <li>· 不提供他人音樂素材下載</li>
          <li>· 不把串流平台指名為取樣來源</li>
          <li>
            · 素材能不能用的完整判斷標準，看{' '}
            <Link href="/learn/s2/sampling-copyright-basics" className="underline hover:text-white">
              2-2 這段素材可以用嗎
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="label-mono text-akai">目前狀態</h2>
        {READY ? (
          <p className="mt-2 text-sm leading-relaxed text-[#B7BDC4]">素材檔案已上線，可直接下載。</p>
        ) : (
          <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-[#B7BDC4]">
            檔案還沒上架，錄音完成後才會開放。下面是規劃中的分類，你可以照著自己先錄。
          </p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="label-mono text-akai">規劃中的分類</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <li key={c.id} className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <span className="label-mono text-muted">尚未上架</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#B7BDC4]">內容：{c.what}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#8D9299]">為什麼好用：{c.why}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">常用於：{c.genres}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-[#2C3036] pt-4">
        <h2 className="label-mono text-muted">自己錄更快</h2>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-[#8D9299]">
          上面每一類都可以用機器的內建麥克風直接錄，權利完全是你的。做法看{' '}
          <Link href="/learn/s1/make-your-first-beat" className="underline hover:text-white">
            1-2 你的第一個 30 分鐘
          </Link>
          。
        </p>
      </section>
    </main>
  );
}
