import type { Metadata } from 'next';
import Link from 'next/link';
import { COMPANY, SITE } from '@/content/site';

export const metadata: Metadata = {
  title: '隱私權政策',
  description:
    '本站沒有帳號系統、沒有廣告追蹤、不使用分析工具。學習進度只存在你自己的裝置上。這一頁說清楚每一項資料去了哪裡。',
};

/**
 * 隱私權政策。
 *
 * 寫作原則：只寫這個網站**實際上**會發生的事。
 * 不寫「我們可能會蒐集…」這種保留空間的萬用句 —— 那等於什麼都沒說。
 * 程式碼變了，這一頁就要跟著改。
 */

const SECTIONS = [
  {
    id: 'summary',
    title: '一句話版本',
    body: [
      '本站沒有帳號、沒有登入、沒有廣告、沒有分析工具，也沒有任何追蹤程式碼。我們不會拿到你的姓名、信箱或任何可以認出你是誰的資料。',
    ],
  },
  {
    id: 'no-account',
    title: '我們不蒐集什麼',
    body: [
      '沒有註冊或登入功能，所以沒有帳號資料。',
      '沒有聯絡表單，所以不會拿到你的信箱或電話。',
      '沒有安裝 Google Analytics、Meta Pixel 或任何同類的分析與廣告工具。',
      '我們自己不寫入任何 Cookie。',
    ],
  },
  {
    id: 'local',
    title: '存在你裝置上的東西',
    body: [
      '課程播放器會把你看到第幾步記在瀏覽器的 localStorage，鍵名開頭是 mpc-sample:progress:。這樣你關掉分頁再回來，可以從原地繼續。',
      '這筆資料從頭到尾沒有離開你的裝置，我們讀不到。清除瀏覽器資料就會消失，關掉 localStorage 也不影響上課，只是不會記進度。',
      '本站可安裝成 App，會註冊一個 Service Worker，把你開過的頁面暫存在裝置上，讓你沒網路時還能看。那份快取同樣只在你的裝置裡。',
    ],
  },
  {
    id: 'search',
    title: '站內搜尋',
    body: [
      '搜尋用的是 Pagefind，索引在建置時就做好，跟著網頁一起下載到你的瀏覽器。你打的關鍵字在本機比對，不會送到任何伺服器，我們也不會知道你搜了什麼。',
    ],
  },
  {
    id: 'youtube',
    title: 'YouTube 影片',
    body: [
      '課程頁的延伸觀看影片是預覽卡，不是自動載入的播放器。在你按下播放之前，本頁不會對 YouTube 或 Google 發出任何請求。',
      '嵌入一律走 youtube-nocookie.com。這是 Google 的加強隱私模式，在你實際播放之前不會寫入用來追蹤觀看行為的 Cookie。',
      '但要講清楚：你一旦按下播放，就是在跟 Google 的伺服器互動，之後的資料處理適用 Google 自己的隱私權政策，不在本站控制範圍內。不想要就用「在 YouTube 開啟」在別的分頁看，或乾脆不看。',
    ],
  },
  {
    id: 'hosting',
    title: '主機與伺服器紀錄',
    body: [
      '本站部署在 Vercel。跟所有網站一樣，伺服器在把網頁送給你的時候會產生存取紀錄，可能包含 IP 位址、瀏覽器版本與請求的網址。那是把網站送到你面前的必要技術過程，由 Vercel 依其政策處理與保存。',
      '我們不會另外把這些紀錄拿去分析個別使用者的行為，也不會與任何第三方交換。',
      '音檔上線後會放在 Cloudflare R2，播放音檔時會向該網域請求檔案，同樣會產生技術性的存取紀錄。',
    ],
  },
  {
    id: 'children',
    title: '兒童',
    body: [
      '本站是樂器操作教學，沒有年齡限制，也不會針對任何年齡層蒐集資料。因為我們根本沒有蒐集個人資料的機制。',
    ],
  },
  {
    id: 'rights',
    title: '你的權利',
    body: [
      '依個人資料保護法，你有查詢、閱覽、複製、補充、更正、停止蒐集處理利用及刪除個人資料的權利。',
      '不過就本站而言：我們手上沒有你的個人資料可以給你看或刪掉。唯一跟你有關的資料是存在你自己瀏覽器裡的學習進度，你隨時可以自己清掉。',
    ],
  },
  {
    id: 'changes',
    title: '政策變更',
    body: [
      '網站功能改變時，這一頁會跟著改，並更新最後修訂日期。我們不會偷偷加上追蹤工具而不改這一頁 —— 那是這份政策存在的意義。',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-[14px] pb-[60px] pt-[18px]">
      <header className="mb-8 border-b border-[#2C3036] pb-4">
        <p className="label-mono font-bold text-akai">PRIVACY</p>
        <h1 className="mt-[7px] text-[clamp(23px,4vw,34px)] leading-tight tracking-[-0.02em] text-white">
          隱私權政策
        </h1>
        <p className="mt-2 max-w-[58ch] text-sm leading-[1.6] text-[#8D9299]">
          最後更新 {SITE.policyUpdated}。這一頁只寫本站實際上會發生的事，
          不寫「我們可能會蒐集」這種保留空間的萬用句。
        </p>
      </header>

      <div className="rounded-[14px] bg-paper px-[18px] py-6 text-ink split:px-[30px] split:py-8">
        {SECTIONS.map((s, i) => (
          <section key={s.id} className={i === 0 ? '' : 'mt-8'}>
            <h2 className="text-lg font-bold leading-snug">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-2 max-w-[64ch] text-[15px] leading-[1.75]">
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10 border-t border-rule pt-6">
          <h2 className="text-lg font-bold">聯絡我們</h2>
          <p className="mt-2 text-[15px] leading-[1.75]">
            對這份政策有疑問，或發現本站的實際行為與這裡寫的不符，請告訴我們。
          </p>
          <dl className="mt-3 space-y-1 text-[15px] leading-[1.8]">
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted">營運者</dt>
              <dd className="font-semibold">
                {COMPANY.nameZh}（{COMPANY.nameEn}）
              </dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted">統一編號</dt>
              <dd className="font-mono">{COMPANY.taxId}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted">地址</dt>
              <dd>{COMPANY.address}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-muted">電子郵件</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`} className="underline hover:text-akai">
                  {COMPANY.email}
                </a>
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            關於本站的立場、事實查核方式與免責聲明，見{' '}
            <Link href="/about" className="underline hover:text-akai">
              關於本站
            </Link>
            。
          </p>
        </section>
      </div>
    </main>
  );
}
