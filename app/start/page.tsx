import type { Metadata } from 'next';
import Link from 'next/link';
import { lessons, lessonHref } from '@/content/lessons';
import { VERIFIED_FACTS } from '@/content/reference/firmware';
import { PadGrid, WaveRule } from '@/components/site/Deco';

export const metadata: Metadata = {
  title: '開始之前 — 開箱、接線、第一次充電',
  description:
    '盒子裡有什麼、缺什麼要自己買、第一次要不要充電、聲音從哪裡出來、音量開多大不會傷耳朵。第一課之前先看這一頁，五分鐘。',
};

const first = lessons[0]!;

/**
 * 開始之前。
 *
 * 為什麼不做成一課：本站的鐵則是「一課等於一個完成的作品」，
 * 而開箱做不出作品。做成獨立頁面，就不用為了它把 35 課重新編號。
 *
 * 為什麼需要它：課程從「按下 POWER」開始，但真正的新手在那之前
 * 還有一堆問題 —— 哪條線是哪條、要不要先充電、聲音怎麼不出來。
 * 卡在這裡的人根本走不到第一課。
 */

const IN_BOX = [
  { item: '機器本體', yes: true, note: '' },
  { item: 'USB-C 線', yes: true, note: '官方指定用這一條充電，效果最好' },
  { item: '變壓器（充電頭）', yes: false, note: '要自己準備，至少 5V 2A' },
  { item: 'microSD 記憶卡', yes: false, note: '沒有卡就沒辦法把作品傳到電腦' },
  { item: 'MIDI 轉接線', yes: false, note: '要接合成器才需要，認明 TRS Type A' },
  { item: '耳機', yes: false, note: '練習強烈建議用，理由見下面' },
];

export default function StartPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 grid items-center gap-6 border-b border-[#2C3036] pb-6 split:grid-cols-[1fr_auto]">
        <div>
          <p className="label-mono font-bold text-akai">START HERE · 約 5 分鐘</p>
          <h1 className="mt-[7px] text-[clamp(24px,5vw,36px)] leading-tight tracking-[-0.02em] text-white">
            開始之前
          </h1>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.75] text-[#A7ADB4]">
            機器剛到手，先看這一頁。第一課是從按下電源開始的，
            但在那之前你會遇到的問題其實更多。
          </p>
        </div>
        <div className="mx-auto w-[112px] shrink-0">
          <PadGrid lit={[1]} />
        </div>
      </header>

      {/* ── 盒子裡有什麼 ── */}
      <section>
        <h2 className="chan label-mono font-bold text-white">一、盒子裡有什麼，沒有什麼</h2>
        <p className="mt-2 pl-[13px] text-sm leading-relaxed text-[#8D9299]">
          很多人開箱第一個念頭是「是不是少寄了東西」。沒有，本來就沒附。
        </p>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {IN_BOX.map((x) => (
            <li
              key={x.item}
              className="flex items-start gap-3 rounded-xl border border-[#2C3036] bg-stage-2 px-4 py-[13px]"
            >
              <span
                aria-hidden
                className={`mt-[2px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                  x.yes ? 'bg-[#1E3226] text-live' : 'bg-[#3A2F1F] text-[#EFA043]'
                }`}
              >
                {x.yes ? '✓' : '—'}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold text-white">
                  {x.item}
                  <span className="label-mono ml-2 text-[#6B7178]">{x.yes ? '有附' : '沒附'}</span>
                </span>
                {x.note && (
                  <span className="mt-[3px] block text-[13px] leading-relaxed text-[#8D9299]">
                    {x.note}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-4 rounded-lg bg-[#241E14] px-4 py-3 text-[13px] leading-relaxed text-[#E0B36B]">
          <b className="font-bold">先買一張 microSD 卡。</b>
          沒有卡，你做完的歌拿不出來 —— 傳到電腦的時候，掛載的是記憶卡，
          不是機器內建的 8 GB。這是最多人事後才發現的一件事。
        </p>
      </section>

      <div className="my-9 text-[#262B32]">
        <WaveRule seed={5} bars={120} />
      </div>

      {/* ── 充電 ── */}
      <section>
        <h2 className="chan label-mono font-bold text-white">二、第一次充電</h2>
        <div className="mt-4 space-y-3">
          <p className="max-w-[62ch] text-[15px] leading-[1.75] text-[#B7BDC4]">
            電源孔是機身背面的 <b className="text-white">USB-C</b>。用盒裝那條線，
            接到至少 <b className="text-white">5V 2A</b> 的充電頭。充電中機器上面板會亮起充電圖示。
          </p>
          <p className="max-w-[62ch] rounded-lg bg-[#241E14] px-4 py-3 text-[14px] leading-[1.75] text-[#E0B36B]">
            <b className="font-bold">充不進去不一定是壞掉。</b>
            官方明講：視線材與電源而定，充電可能<b className="font-bold">只有在關機時才有效</b>。
            插著沒反應就先關機再試一次。
          </p>
          <p className="max-w-[62ch] text-[15px] leading-[1.75] text-[#B7BDC4]">
            電池滿電大約可以連續播放 {VERIFIED_FACTS.batteryHours.replace('約 ', '')}。
            在家練習可以一邊插著電一邊用。
          </p>
        </div>
      </section>

      {/* ── 聲音 ── */}
      <section className="mt-9">
        <h2 className="chan label-mono font-bold text-white">三、聲音要從哪裡出來</h2>
        <div className="mt-4 grid gap-3 split:grid-cols-3">
          {[
            {
              t: '內建喇叭',
              d: '機器自己有一個 3 瓦喇叭。開箱直接按 pad 就有聲音，不用接任何東西。',
              tag: '最方便',
            },
            {
              t: '耳機',
              d: '插上耳機，內建喇叭會自動關掉。這是設計，不是故障。練習建議用耳機，聽得清楚很多。',
              tag: '最推薦',
            },
            {
              t: '喇叭或音響',
              d: '用背板的 1/4 吋輸出接出去。一樣會讓內建喇叭自動停用。',
              tag: '表演用',
            },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
              <span className="label-mono rounded-full bg-[#2A2F35] px-[9px] py-[2px] text-[#B7BDC4]">
                {x.tag}
              </span>
              <p className="mt-2 text-[16px] font-semibold text-white">{x.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#8D9299]">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border-l-[3px] border-l-akai bg-[rgba(214,52,44,.07)] px-4 py-4">
          <p className="label-mono font-bold text-akai">耳朵只有一對，這段請看完</p>
          <ul className="mt-2 space-y-[6px] text-[14px] leading-[1.75] text-[#D9D4CB]">
            <li>· 戴耳機之前，先把 MAIN VOLUME 轉到最小，戴上去之後再慢慢轉大。</li>
            <li>· 取樣的時候常常會突然出現很大聲的東西，音量開著不動很危險。</li>
            <li>· 音量開到你還能聽見旁邊有人叫你的程度就夠了。</li>
            <li>· 練一小時休息十分鐘。耳朵累了會聽不出差別，練下去也沒用。</li>
          </ul>
          <p className="label-mono mt-3 text-[#6B7178]">以上為本站建議，非官方規格</p>
        </div>
      </section>

      {/* ── 練習環境 ── */}
      <section className="mt-9">
        <h2 className="chan label-mono font-bold text-white">四、在哪裡練</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
            <p className="text-[16px] font-semibold text-white">找一張穩的桌子</p>
            <p className="mt-1 text-sm leading-relaxed text-[#8D9299]">
              打擊墊要用力敲，放在腿上或床上會晃，打起來完全不準。
            </p>
          </div>
          <div className="rounded-xl border border-[#2C3036] bg-stage-2 p-4">
            <p className="text-[16px] font-semibold text-white">用內建麥克風錄音時要安靜</p>
            <p className="mt-1 text-sm leading-relaxed text-[#8D9299]">
              麥克風收的是整個房間。電風扇、冷氣、電視都會一起錄進去。
            </p>
          </div>
        </div>
      </section>

      {/* ── 檢查表 ── */}
      <section className="mt-9 rounded-[14px] bg-paper px-[18px] py-6 text-ink split:px-[26px]">
        <h2 className="label-mono font-bold text-akai">都準備好了嗎</h2>
        <ul className="mt-3 space-y-2">
          {[
            '機器有電，或正插著電',
            '耳機或喇叭已經接好，MAIN VOLUME 轉到最小',
            '放在一張不會晃的桌子上',
            '（可以之後再買）一張 microSD 記憶卡',
          ].map((c) => (
            <li key={c} className="flex gap-3 text-[15px] leading-relaxed">
              <span aria-hidden className="text-akai">
                ✓
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-rule pt-5">
          <p className="text-[15px] leading-relaxed">
            接下來就是第一課。三十分鐘，做出一段自己錄、自己切、自己彈出來的循環。
          </p>
          <Link
            href={lessonHref(first)}
            className="mt-4 inline-block border-2 border-ink bg-ink px-5 py-[12px] text-sm font-bold text-paper transition-colors hover:border-akai hover:bg-akai"
          >
            開始第 1 課 · {first.title} →
          </Link>
        </div>
      </section>

      <p className="mt-6 text-center text-[13px] leading-relaxed text-[#6B7178]">
        機器上的按鍵全是英文，看不懂沒關係。
        <Link href="/learn/s1/panel-and-shift-functions" className="underline hover:text-white">
          第 2 課專門教你讀面板
        </Link>
        ，也可以先翻{' '}
        <Link href="/reference/glossary" className="underline hover:text-white">
          名詞對照
        </Link>
        。
      </p>
    </main>
  );
}
