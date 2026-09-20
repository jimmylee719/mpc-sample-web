import type { Metadata } from 'next';
import Link from 'next/link';
import {
  officialTutorial,
  officialChapters,
  type OfficialEntry,
} from '@/content/reference/official-order';
import { getLesson, lessonHref } from '@/content/lessons';
import { MANUAL_REVISION } from '@/content/reference/firmware';
import { withShare } from '@/content/site';

export const metadata: Metadata = withShare({
  title: '官方順序對照 — 手冊章節與本站課程',
  description:
    '官方使用手冊的 Tutorial 六步與完整章節順序，每一項都連到本站對應的課。想照官方順序學的人看這一頁。',
});

function LessonLinks({ entry }: { entry: OfficialEntry }) {
  const lessons = entry.lessons.map((id) => getLesson(id)).filter((l) => l !== undefined);

  if (lessons.length === 0 && !entry.hrefs) {
    return (
      <span className="label-mono rounded-full bg-[#3A2F1F] px-[9px] py-[3px] text-[#EFA043]">
        本站尚無專門課程
      </span>
    );
  }

  return (
    <span className="flex flex-wrap gap-[6px]">
      {lessons.map((l) => (
        <Link
          key={l.id}
          href={lessonHref(l)}
          className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-[3px] text-[#B7BDC4] transition-colors hover:bg-akai hover:text-white"
        >
          {l.season}-{l.index} {l.title}
        </Link>
      ))}
      {entry.hrefs?.map((h) => (
        <Link
          key={h.href}
          href={h.href}
          className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-[3px] text-[#B7BDC4] transition-colors hover:bg-akai hover:text-white"
        >
          {h.label}
        </Link>
      ))}
    </span>
  );
}

function EntryRow({ entry, n }: { entry: OfficialEntry; n?: number }) {
  return (
    <li className="border-b border-[#2C3036] py-[14px] last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {n !== undefined && (
          <span className="font-mono text-[15px] font-bold text-akai">{n}.</span>
        )}
        <span className="text-[15px] font-semibold text-white">{entry.en}</span>
        <span className="text-sm text-[#8D9299]">{entry.zh}</span>
        <span className="label-mono ml-auto shrink-0 text-[#6B7178]">p.{entry.page}</span>
      </div>

      <div className="mt-2">
        <LessonLinks entry={entry} />
      </div>

      {entry.note && (
        <p className="mt-2 text-[13px] leading-relaxed text-[#8D9299]">{entry.note}</p>
      )}
    </li>
  );
}

export default function Page() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">REFERENCE · OFFICIAL ORDER</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          官方順序對照
        </h1>
        <p className="mt-2 max-w-[62ch] text-sm leading-[1.6] text-[#8D9299]">
          官方使用手冊 {MANUAL_REVISION} 的章節順序，每一項都連到本站對應的課。
          想完全照官方的路線走，照這一頁的順序點下去就是了。
        </p>
      </header>

      {/* ── 為什麼本站順序不一樣 ── */}
      <section className="rounded-[14px] border-l-[3px] border-l-akai bg-[rgba(214,52,44,.07)] px-5 py-4">
        <h2 className="label-mono font-bold text-akai">先說清楚：本站的順序跟手冊不一樣</h2>
        <p className="mt-2 max-w-[64ch] text-sm leading-[1.75] text-[#D9D4CB]">
          手冊是<b className="font-semibold text-white">參考書</b>，一章講一個功能，
          查得快但照著讀做不出東西。本站是<b className="font-semibold text-white">課程</b>，
          一課做完會有一個能播出來的作品，所以會把好幾個功能混在同一課裡。
        </p>
        <p className="mt-2 max-w-[64ch] text-sm leading-[1.75] text-[#D9D4CB]">
          兩種都合理，但功能與按鍵必須完全一致。這一頁存在的目的就是讓你自己核對：
          官方教的每一項，本站有沒有教到、教在哪一課。
        </p>
      </section>

      {/* ── A. 官方 Tutorial ── */}
      <section className="mt-10">
        <h2 className="chan label-mono font-bold text-white">
          A · {officialTutorial.title}
        </h2>
        <p className="mt-2 max-w-[64ch] pl-[13px] text-sm leading-relaxed text-[#8D9299]">
          {officialTutorial.intro}
        </p>
        <ul className="mt-4 rounded-xl border border-[#2C3036] bg-stage-2 px-[18px]">
          {officialTutorial.entries.map((e, i) => (
            <EntryRow key={e.en} entry={e} n={i + 1} />
          ))}
        </ul>
        <p className="mt-3 max-w-[64ch] text-[13px] leading-relaxed text-[#6B7178]">
          2026-09-20 起七步全部有對應課程。前三步原本是缺口——本站第 1 課直接叫人錄自己的聲音，
          跳過了官方「先把機器裡的東西玩過一輪」那一段。現在補成新的第 1 課，
          原本的四課依序往後移，網址沒有變動。
        </p>
      </section>

      {/* ── B. 完整章節 ── */}
      <section className="mt-12">
        <h2 className="chan label-mono font-bold text-white">B · 手冊完整章節順序</h2>
        <p className="mt-2 max-w-[64ch] pl-[13px] text-sm leading-relaxed text-[#8D9299]">
          參考書式的排列。查功能用這個，學習用上面那個。
        </p>

        <div className="mt-5 space-y-7">
          {officialChapters.map((sec) => (
            <div key={sec.id}>
              <h3 className="text-[17px] font-semibold text-white">{sec.title}</h3>
              <p className="mt-1 text-sm text-[#8D9299]">{sec.intro}</p>
              <ul className="mt-3 rounded-xl border border-[#2C3036] bg-stage-2 px-[18px]">
                {sec.entries.map((e) => (
                  <EntryRow key={e.en} entry={e} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 text-center text-[13px] leading-relaxed text-[#6B7178]">
        頁碼依官方使用手冊 {MANUAL_REVISION}。官方改版時這一頁要跟著重新核對。
      </p>
    </main>
  );
}
