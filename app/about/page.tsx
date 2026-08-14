import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPANY, SITE, TRADEMARK_NOTICE } from '@/content/site';
import { MANUAL_REVISION, FIRMWARE_BASELINE, openQuestions } from '@/content/reference/firmware';
import { lessons } from '@/content/lessons';
import { genres } from '@/content/genres';
import { PadGrid, WaveRule } from '@/components/site/Deco';

export const metadata: Metadata = {
  title: '關於本站',
  description:
    '敲敲取樣由凡圖有限公司營運。這一頁說清楚我們是誰、事實從哪裡來、哪些還沒驗證，以及本站與 Akai 沒有任何隸屬關係。',
};

const totalSteps = lessons.reduce((n, l) => n + l.steps.length, 0);

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-6">
        <p className="label-mono font-bold text-akai">ABOUT</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          關於本站
        </h1>
        <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.75] text-[#A7ADB4]">
          一個繁體中文的取樣機教學網站。目標很單純：讓一台手持取樣機在你手上真的變成樂器，
          而不是一台你搞不懂的機器。
        </p>
      </header>

      {/* ── 數字 ── */}
      <section className="grid grid-cols-2 gap-3 split:grid-cols-4">
        {[
          { n: String(lessons.length), u: '課', note: `共 ${totalSteps} 步` },
          { n: String(genres.length), u: '曲風', note: '八段式配方卡' },
          { n: FIRMWARE_BASELINE, u: '', note: '事實查核基準韌體' },
          { n: String(openQuestions.length), u: '項', note: '公開列出的未驗證項目' },
        ].map((s) => (
          <div key={s.note} className="rounded-xl border border-[#2C3036] bg-stage-2 px-4 py-[14px]">
            <p className="font-mono text-[22px] leading-none tracking-[-0.02em] text-white">
              {s.n}
              {s.u && <span className="ml-1 text-[13px] text-[#8D9299]">{s.u}</span>}
            </p>
            <p className="label-mono mt-2 text-[#6B7178]">{s.note}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 text-[#262B32]">
        <WaveRule seed={19} bars={120} />
      </div>

      {/* ── 正文 ── */}
      <div className="mt-8 rounded-[14px] bg-paper px-[18px] py-6 text-ink split:px-[30px] split:py-8">
        <section>
          <h2 className="text-lg font-bold">誰做的</h2>
          <p className="mt-2 max-w-[64ch] text-[15px] leading-[1.75]">
            本站由 <b>{COMPANY.nameZh}</b>（{COMPANY.nameEn}）營運。
            我們平常做的是中小企業的營運系統，用自動化把重複的事情消化掉，
            讓人把時間花在真正想做的事上。這個網站是同一件事的另一種形式。
          </p>
          <dl className="mt-4 space-y-1 text-[15px] leading-[1.8]">
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted">統一編號</dt>
              <dd className="font-mono">{COMPANY.taxId}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted">地址</dt>
              <dd>{COMPANY.address}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted">聯絡信箱</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`} className="underline hover:text-akai">
                  {COMPANY.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted">公司網站</dt>
              <dd>
                <a
                  href={COMPANY.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-akai"
                >
                  {COMPANY.site.replace('https://', '')}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-9">
          <h2 className="text-lg font-bold">這個網站的三個立場</h2>
          <dl className="mt-3 space-y-4">
            <div>
              <dt className="font-semibold">一課等於一個完成的作品</dt>
              <dd className="mt-1 max-w-[64ch] text-[15px] leading-[1.75] text-muted">
                不是一課教一個功能。學完十個功能卻做不出東西，是最常見的失敗方式。
                每一課做完，你手上都會多一樣真的可以播出來的東西。
              </dd>
            </div>
            <div>
              <dt className="font-semibold">教你讀懂面板，不是背組合鍵</dt>
              <dd className="mt-1 max-w-[64ch] text-[15px] leading-[1.75] text-muted">
                機器上的紅字就是第二功能。按住 SHIFT 的時候，本站的面板圖會讓整台機器的紅字
                一起亮起來 —— 你看懂一次，以後不用再查表。
              </dd>
            </div>
            <div>
              <dt className="font-semibold">不確定就說不確定</dt>
              <dd className="mt-1 max-w-[64ch] text-[15px] leading-[1.75] text-muted">
                官方文件也會自相矛盾。遇到查不清楚的，我們不猜、不寫成肯定語氣，
                而是把它列在公開的清單上，連同「官方到底怎麼寫」一起給你看。
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-9">
          <h2 className="text-lg font-bold">事實從哪裡來</h2>
          <p className="mt-2 max-w-[64ch] text-[15px] leading-[1.75]">
            唯一權威是 <b>Akai 官方使用手冊 {MANUAL_REVISION}</b>。來源優先序是：
            官方手冊規格 → 官方支援知識庫 → 官方 FAQ → 媒體評測（僅限使用感受）→
            社群與影片（只用來交叉比對與延伸觀看，不能單獨當作依據）。
          </p>
          <p className="mt-2 max-w-[64ch] text-[15px] leading-[1.75]">
            影片與官方衝突時一律以官方為準。只有社群支持、官方沒寫的，一律標「尚未驗證」。
            每一課都標明依據的韌體版本與查核日期。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            想知道我們目前還不確定什麼，以及已經查清楚的項目是憑什麼下的結論，看{' '}
            <Link href="/reference/firmware" className="underline hover:text-akai">
              韌體與尚未驗證清單
            </Link>
            。規格數字逐行對照見{' '}
            <Link href="/reference/specs" className="underline hover:text-akai">
              規格總表
            </Link>
            。
          </p>
        </section>

        <section className="mt-9">
          <h2 className="text-lg font-bold">免責聲明</h2>
          <ul className="mt-2 max-w-[64ch] space-y-2 text-[15px] leading-[1.75]">
            <li>
              <b>不是法律意見。</b>課程 2-2 談取樣的著作權，那是整理過的公開資訊，
              不能代替律師。真的要商業發行，請找專業人士。
            </li>
            <li>
              <b>照做的風險自負。</b>操作步驟已盡力查證，但機器韌體會更新，
              你手上的版本也可能不同。動到切片或覆蓋樣本之前，請先存檔。
            </li>
            <li>
              <b>外部連結不代表背書。</b>延伸觀看的影片是外部內容，
              本站沒有能力也沒有立場保證其正確性，因此全部標示是否經人工確認。
            </li>
          </ul>
        </section>

        <section className="mt-9 border-t border-rule pt-6">
          <h2 className="text-lg font-bold">商標</h2>
          <p className="mt-2 max-w-[64ch] text-[15px] leading-[1.75] text-muted">{TRADEMARK_NOTICE}</p>
        </section>

        <section className="mt-9">
          <h2 className="text-lg font-bold">著作權與素材</h2>
          <p className="mt-2 max-w-[64ch] text-[15px] leading-[1.75] text-muted">
            本站的教學文字、面板圖與插畫都是自己做的。素材庫一律自錄或 CC0，
            不提供他人音樂下載。我們不轉錄影片逐字稿，也不做整份翻譯字幕。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            資料怎麼被處理，見{' '}
            <Link href="/privacy" className="underline hover:text-akai">
              隱私權政策
            </Link>
            。簡短版：本站沒有帳號、沒有追蹤、沒有廣告。
          </p>
        </section>
      </div>

      {/* ── 想做一個這樣的網站 ── */}
      <section className="mt-8 overflow-hidden rounded-[14px] border border-[#2C3036] bg-stage-2">
        <div className="h-[3px] w-full bg-gradient-to-r from-akai via-[#EFA043] to-live" aria-hidden />
        <div className="p-[22px] split:p-8">
          <p className="label-mono font-bold text-akai">給同樣在做東西的人</p>
          <h2 className="mt-2 max-w-[24ch] text-[clamp(19px,3.4vw,26px)] font-bold leading-snug tracking-[-0.01em] text-white">
            這個網站本身，就是我們的作品集
          </h2>
          <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.75] text-[#A7ADB4]">
            {lessons.length} 課、{totalSteps} 個步驟、一台機器的互動式向量面板、
            建置期就擋掉錯誤資料的驗證流程、可以裝成 App 而且離線能用。
            這些不是套版做得出來的東西。
          </p>
          <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.75] text-[#A7ADB4]">
            如果你也有一套只有你懂的東西 —— 教學、課程、預約、租賃、工作室排程 ——
            想把它變成一個真的能用的網站或系統，
            <b className="font-semibold text-white">{COMPANY.nameZh}</b>就是做這個的。
          </p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-3">
            {[
              { t: '教學與課程網站', d: '像這個站：互動、可離線、內容有驗證' },
              { t: '預約與租賃系統', d: '行事曆、合約簽名、自動通知信' },
              { t: '雲端 ERP', d: '庫存、訂單、報表，住在 LINE 裡' },
            ].map((x) => (
              <li key={x.t} className="rounded-xl border border-[#2C3036] bg-stage px-4 py-3">
                <p className="text-sm font-semibold text-white">{x.t}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#8D9299]">{x.d}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-[10px]">
            <a
              href={COMPANY.site}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-akai bg-akai px-5 py-[12px] text-sm font-bold text-white transition-colors hover:border-white hover:bg-transparent"
            >
              前往{COMPANY.nameZh}官網 →
            </a>
            <a
              href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('網站開發詢問（來自敲敲取樣）')}`}
              className="border-2 border-[#4A5057] px-5 py-[12px] text-sm font-semibold text-paper transition-colors hover:border-white"
            >
              直接寄信聊聊
            </a>
          </div>

          <p className="label-mono mt-4 text-[#6B7178]">
            {COMPANY.nameEn} · 統編 {COMPANY.taxId} · {COMPANY.address}
          </p>
        </div>
      </section>

      {/* ── 收尾 ── */}
      <section className="mt-8 flex flex-col items-center gap-5 rounded-[14px] border border-[#2C3036] bg-stage-2 px-5 py-8 text-center split:flex-row split:justify-center split:text-left">
        <div className="w-[104px] shrink-0">
          <PadGrid lit={[1, 6, 11, 16]} />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">還沒開始的話，從第一課開始</p>
          <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-[#8D9299]">
            三十分鐘，做出一段自己錄、自己切、自己彈出來的循環。不需要電腦。
          </p>
          <Link
            href="/learn"
            className="mt-4 inline-block border-2 border-akai bg-akai px-5 py-[11px] text-sm font-bold text-white transition-colors hover:border-white hover:bg-transparent"
          >
            看課程地圖 →
          </Link>
        </div>
      </section>

      <p className="label-mono mt-8 text-center text-[#6B7178]">
        {SITE.name} · {COMPANY.nameZh}
      </p>
    </main>
  );
}
