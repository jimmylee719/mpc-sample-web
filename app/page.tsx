import Link from 'next/link';

const SECTIONS = [
  { href: '/learn', label: '課程地圖', note: '五個 Season，34 課' },
  { href: '/genre', label: '曲風工廠', note: '16 張配方卡' },
  { href: '/reference/shortcuts', label: '查詢區', note: '快捷鍵、旋鈕、效果、名詞' },
  { href: '/samples', label: '素材庫', note: '自錄與 CC0' },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-10">
      <p className="label-mono font-bold text-akai">敲敲取樣 · 一台就夠</p>
      <h1 className="mt-2 text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
        Akai 取樣機中文教學
      </h1>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#8D9299]">
        把一台手持取樣機，變成你能上台表演、也能獨立完成整首歌的樂器。全程不需要電腦。
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="block rounded-xl border border-[#2C3036] bg-stage-2 p-4 transition-colors hover:border-akai"
            >
              <span className="label-mono text-akai">{s.note}</span>
              <span className="mt-1 block text-lg text-white">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="label-mono mt-10 text-muted">P0 骨架 · 內容自 P1 起填入</p>
    </main>
  );
}
