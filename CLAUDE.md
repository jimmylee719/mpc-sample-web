# CLAUDE.md — 敲敲取樣 · 一台就夠

MPC Sample 中文教學網站。本檔是你的作業指令。詳細規格見 `docs/PROJECT-PLAN.md`，兩者衝突時以 PROJECT-PLAN 為準。

---

## 0. 開工前必讀

1. 先讀 `docs/PROJECT-PLAN.md` 全文。
2. 視覺真相來源是 `reference/prototype-v2.html`（可運作原型）。**面板 SVG 直接從它移植，不要重畫。**
3. 使用者是非工程師，用繁體中文回報，說結果不說過程。
4. **一個 Phase 一個 commit**，格式 `P0: 階段名稱`。過驗證閘門才 commit。

---

## 1. 五條鐵則

| # | 鐵則 | 違反的後果 |
|---|---|---|
| 1 | **一課 = 一個完成的作品**，不是一課一個功能 | 網站退化成參考書，失去全部差異化 |
| 2 | **每一步只做三件事**：按哪裡（`targets`）／看到什麼（`screen`）／聽到什麼（`hear`） | 缺一項就不是這個網站 |
| 3 | **面板動畫 100% 資料驅動**。課程作者只寫控制項 ID | 手刻 SVG 到第五課就會崩潰 |
| 4 | **教「讀懂面板」，不是背組合鍵**。需要 SHIFT 時全面板紅字一起亮 | 這是本站的教學哲學 |
| 5 | **DAWless First**。預設答案永遠是「在機器上怎麼做」 | 需要電腦的課必須標 `needsComputer: true` |

---

## 2. 技術棧（開工前必須重新查證版本）

```bash
npm show next version        # 預期 16.3.x
npm show react version       # 預期 19.x
npm show tailwindcss version # 預期 4.3.x
```

- Next.js **16.3.x** App Router + Turbopack
- React **19.x**
- TypeScript **strict**
- Tailwind CSS **4.3.x**
- Pagefind（建置期靜態搜尋索引）
- 部署 Vercel Pro；靜態資產 Cloudflare R2

⚠️ Vercel 於 2026-08 發布一批安全性修補（App Router DoS、middleware/proxy bypass、SSRF、Image Optimization SVG DoS）。**務必安裝當前最新 patch，不可沿用文件中的版本號。**

### 不使用（明確禁止）

- ❌ 任何動畫函式庫（GSAP、Framer Motion、Motion One）— 面板動畫只是 CSS class 切換
- ❌ 任何 webfont，包含 Google Fonts — 全部系統字體堆疊
- ❌ **Inter 字體**
- ❌ shadcn/ui — 本站元件高度客製，引入反而是負擔
- ❌ Supabase、任何資料庫、任何 CMS
- ❌ 帳號系統、登入、任何個資蒐集
- ❌ 課程內容寫成 MDX（必須是 typed TS data）

---

## 3. 目錄結構

```
/
├─ CLAUDE.md
├─ docs/PROJECT-PLAN.md
├─ reference/prototype-v2.html      # 視覺真相來源，勿修改
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                      # 首頁
│  ├─ learn/page.tsx                # 課程地圖
│  ├─ learn/[season]/[lesson]/page.tsx
│  ├─ genre/page.tsx
│  ├─ genre/[slug]/page.tsx
│  ├─ reference/{shortcuts,knobs,fx,glossary,troubleshoot,firmware}/page.tsx
│  ├─ samples/page.tsx
│  └─ about/page.tsx
├─ components/
│  ├─ mpc/MpcPanel.tsx              # ★核心
│  ├─ mpc/MpcScreen.tsx
│  ├─ mpc/panel-layout.ts           # 所有控制項座標定義
│  ├─ lesson/LessonPlayer.tsx
│  ├─ lesson/NoteBox.tsx
│  ├─ lesson/ChapterRail.tsx
│  ├─ badges/{FirmwareBadge,NeedsComputerBadge}.tsx
│  └─ reference/{ShortcutTable,KnobMatrix,FxDictionary}.tsx
├─ content/
│  ├─ lessons/s1-01.ts … s5-06.ts
│  ├─ genres/*.ts
│  └─ reference/{shortcuts,knobs,fx,glossary,troubleshoot}.ts
├─ types/{lesson,genre}.ts
└─ styles/globals.css               # 設計 token
```

---

## 4. 資料契約

```ts
// types/lesson.ts — 這是全站的核心契約，不可任意更動
export type ControlId =
  | 'vol' | 'b1' | 'b2' | 'b3' | 'k1' | 'k2' | 'k3' | 'enc' | 'mic'
  | 'minus' | 'plus' | 'shift' | 'bank' | 'ssel' | 'tap'
  | 'sample' | 'seq' | 'padfx' | 'knobfx'
  | 'chop' | 'loop' | 'mute' | 'lev16'
  | 'srec' | 'qrec' | 'play' | 'stop' | 'erase' | 'nrep' | 'fader'
  | `p${number}`      // p1–p16，執行期以 zod 或 assert 限制範圍
  | 'pads'
  | 'r_phones' | 'r_sync' | 'r_midiout' | 'r_midiin'
  | 'r_out2' | 'r_out1' | 'r_in2' | 'r_in1'
  | 'r_gain' | 'r_usb' | 'r_power';

export interface ScreenState {
  t1?: string;
  tabs?: [string, string, string];   // 預設 ['Trim','Tune','Filter']
  bots?: [string, string, string];   // 預設 ['Start','End','Loop']
  wave?: number;                     // 波形種子；0/省略 = 不顯示
}

export interface Step {
  ch: number;
  say: string;                       // 可含 <b>，至少一個 <b> 標記實際按鍵
  targets: ControlId[];
  shift?: boolean;
  screen: ScreenState;
  hear: string;                      // 必填，無聲寫 '—'
  audio?: string;
  note?: { kind: 'tip' | 'warn' | 'win'; title: string; body: string };
}

export interface Lesson {
  id: string;            // 's1-01'
  season: 1 | 2 | 3 | 4 | 5;
  index: number;
  title: string;
  outcome: string;       // 必填。名詞句：「做完你手上有什麼」
  minutes: number;
  chapters: string[];
  needsComputer: boolean;
  firmwareVerified: string;   // '1.3.0'
  verifiedDate: string;       // ISO
  prerequisites: string[];
  steps: Step[];
  checkpoints: string[];
  sources: string[];
}
```

### 建置期驗證（P0 必須實作）

`scripts/validate-content.ts`，`npm run build` 前執行，任一項失敗即中止：

- 所有 `targets` 皆為合法 ControlId
- 每個 Step 都有 `screen` 與 `hear`
- 每個 Step 的 `say` 至少含一個 `<b>`
- 每課 `outcome` / `checkpoints` / `firmwareVerified` / `verifiedDate` / `needsComputer` 非空
- `prerequisites` 指向存在的 lesson id
- `ch` 索引在 `chapters` 範圍內
- 單句不超過 40 字（以全形句號、問號、驚嘆號斷句）

---

## 5. MpcPanel 元件規格

### Props

```ts
interface MpcPanelProps {
  targets: ControlId[];
  shift?: boolean;
  screen?: ScreenState;
  view?: 'auto' | 'front' | 'rear';   // 預設 auto
}
```

### 行為

| 情境 | 行為 |
|---|---|
| `targets` 含 `r_` 前綴 | **自動切換到背板視圖**，viewBox 改為 `0 0 700 560` |
| 其他 | 上面板，viewBox `0 0 700 800` |
| `targets` 含 `'pads'` | 16 顆 pad 全部高亮 |
| `shift: true` | SHIFT 鍵轉紅並填滿；**整個面板所有紅色第二功能字同步亮起加粗** |
| 目標控制項 | 綠色描邊 + 綠色光暈脈動 1.45s ease-in-out infinite |
| `prefers-reduced-motion` | 光暈不動，固定 45% 透明度 |

### 實作要求

- 控制項座標集中在 `components/mpc/panel-layout.ts`，**面板元件本身不得出現硬編碼座標**
- 每個控制項渲染為 `<g class="ctl" id={'c-'+id}>`，內含 `.halo`（光暈）與 `.cap`（本體）
- SVG inline，不得走網路請求
- 全部狀態靠 CSS class 切換，不用 JS 動畫

### 控制項 ID 與絲印

完整對照表見 `docs/PROJECT-PLAN.md` §15。重點：

| Pad | SHIFT 功能 | Pad | SHIFT 功能 |
|---|---|---|---|
| 1 FULL LEVEL | 5 COMPRESSOR | 9 FADER | 13 TRIM SAMPLE |
| 2 HALF SEQ | 6 HALF SPEED | 10 REC QUANTIZE | 14 TIME CORRECT |
| 3 DOUBLE SEQ | 7 DOUBLE SPEED | 11 **RESAMPLE** | 15 WARP |
| 4 COUNT-IN | 8 MIDI CONFIG | 12 SONG | 16 PROJECT |

### MpcScreen

- 上排三標籤 = B1/B2/B3，預設 `Trim` `Tune` `Filter`
- 下排三標籤 = K1/K2/K3，預設 `Start` `End` `Loop`
- 波形以固定種子的偽隨機產生（同一 `wave` 值必須每次渲染結果相同）
- `wave` 為 0 或省略時，波形以 12% 透明度顯示

---

## 6. 設計 Token

寫進 `styles/globals.css` 的 `@theme`：

```css
/* 頁面 */
--color-stage:      #14161A;
--color-stage-2:    #1C1F24;
--color-paper:      #F5F3EE;
--color-ink:        #191B1E;
--color-muted:      #6F6C65;
--color-rule:       #D8D4CB;
--color-akai:       #D6342C;
--color-live:       #22C55E;

/* 機器 */
--color-dev-body:      #E7E5E0;
--color-dev-body-edge: #C9C6BF;
--color-dev-dark:      #1B1D20;
--color-dev-dark-edge: #34383D;
--color-dev-pad:       #3D4854;
--color-dev-pad-edge:  #5A6774;
--color-dev-blue:      #7FC7E0;   /* MODE / PAD PLAY */
--color-dev-orange:    #EFA043;   /* PAD FX / KNOB FX */
--color-dev-red:       #E2483F;   /* 錄音鍵 */
--color-dev-green:     #4FAF5A;   /* PLAY */
--color-dev-white:     #F6F5F2;
--color-dev-shift:     #4C5157;
--color-dev-screen:    #0C130F;
--color-dev-wave:      #E8C93A;
--color-dev-silk:      #8A8780;

/* 字體 */
--font-sans: "PingFang TC","Microsoft JhengHei","Noto Sans TC","Hiragino Sans",system-ui,sans-serif;
--font-mono: ui-monospace,"SF Mono",Menlo,Consolas,monospace;
```

### 版面

- 左右分屏：深色舞台（機器，sticky）＋ 淺色紙頁（教學文字）
- 桌機 `1.05fr / 1fr`，gap 26px
- < 960px 上下堆疊，機器在上，取消 sticky
- 教學句 18.5px / line-height 1.74
- 標籤與代號一律 mono、大寫、letter-spacing .14–.24em

### 四個招牌元素（不可簡化或省略）

1. 目標控制項綠色脈動光暈
2. **按住 SHIFT 時全面板紅字一起亮**
3. 機器小螢幕隨步驟同步變化
4. 背板視圖依 target 前綴自動切換

---

## 7. 內容撰寫規範

| 規則 | 說明 |
|---|---|
| 單句 ≤ 40 字，單段 ≤ 3 句 | CI 檢查 |
| 英文名詞三件套 | 首次出現：英文＋中文＋做什麼用 |
| 禁止行話 | 「側鏈」→「讓大鼓響的時候其他聲音自動變小聲」 |
| 每步一個動作 | 不要在同一步塞兩個獨立操作 |
| `hear` 必填 | 無聲寫 `'—'`，不可省略 |
| 一課最多一個比喻 | — |

### 法律紅線（絕對不可違反）

- ❌ 改寫或翻譯官方手冊 → 規格數字可引用，操作說明必須實測後自行撰寫
- ❌ 轉貼論壇貼文原文
- ❌ **轉錄任何影片的逐字稿或翻譯其內容成文字** → 這是著作權問題，不是專案偏好，永遠不開放
- ❌ 提供他人音樂素材下載 → 素材庫一律自錄或 CC0
- ❌ 下載影片、抽取影片音訊當素材
- ❌ 教導破解或第三方韌體
- ❌ **叫讀者去 YouTube / Spotify 錄音當取樣素材**

### ✅ YouTube 的正當用途（2026-08 開放）

| 可以 | 不可以 |
|---|---|
| 用官方 embed 或連結，把影片放在課程頁與曲風頁 | 轉錄逐字稿、翻譯字幕、把影片內容改寫成教學文字 |
| 蒐集多支影片交叉比對，找出說法不一致的功能 | 把影片說法直接當成事實寫進課程 |
| 用影片作為「延伸觀看」，補足文字教不了的東西（手感、律動、音色） | 讓影片取代本站自己的教學內容 |
| 記錄影片的頻道、標題、網址、為什麼選它 | 宣稱影片內容正確而未經官方或實測佐證 |

**交叉比對的處理原則**：多支影片一致但官方沒寫 → 標「社群普遍做法，尚未驗證」。影片彼此矛盾 → 列出分歧，標「尚未驗證」。影片與官方手冊衝突 → **以官方為準**，並在疑難排解記錄這個常見誤解。

**嵌入方式**：一律 `youtube-nocookie.com`，且必須是點擊才載入的預覽卡，不可自動載入 iframe。理由是效能門檻（LCP < 1.5s）與不蒐集個資的立場。

### 取樣法律章節（Lesson 2-2）的正確寫法

**不可寫「改編過就沒問題」。** 必須包含：
- 取樣同時涉及錄音著作與音樂著作兩層權利，改編幅度不影響是否構成重製
- 國際上唯一被承認的例外門檻是修改到**聽不出來源**（歐盟法院 Pelham 案，2019）
- 串流平台服務條款本身即禁止錄製，與著作權是兩條獨立責任線
- 三種情境的風險分級：私下練習 / 上傳社群 / 商業發行
- 四種乾淨來源：自錄、機器內建、CC0、付費素材包
- 明確聲明本站不提供法律意見

---

## 8. 事實準確性規範

**唯一權威：Akai 官方使用手冊 v1.3.0 (RevA)。**

來源優先序：官方手冊技術規格 > 官方支援知識庫 > 官方 FAQ > 媒體評測（僅限使用感受）> 社群與影片（**可用於交叉比對與延伸觀看，不可單獨作為事實依據**）。

**社群與影片的三種用法**（2026-08 修訂）：

1. **發現問題** — 找出官方沒寫、或大家都在問的功能
2. **交叉比對** — 多支影片對同一功能的說法拿來互相對照，找出分歧
3. **延伸觀看** — 手感、律動、音色這類文字教不了的東西，直接連影片

**但事實仍必須落到官方或實測。** 只有影片支持、官方沒寫的內容，一律標「社群普遍做法，尚未驗證」，不可寫成肯定語氣。

### 常見錯誤（外部資料經常寫錯，絕不可照抄）

| 錯誤說法 | 正確事實 |
|---|---|
| K1–K3 是無限旋轉旋鈕 | **270° 絕對位置**，需 Takeover |
| Pad FX 可針對單一 pad 施加效果 | **相反**。Pad FX 套整段序列；能指定 pad 的是 Knob FX |
| 有 Mother Ducker 側鏈 | **不支援 plugin/AIR**。用 Knob FX 的 Pumper |
| Zoom 是 SHIFT + Encoder | **SHIFT + K1/K2/K3** |
| Chop 模式叫 Transient | **Threshold** |
| 有 Preferences / Showroom Mode | 全機只有五個選單：Input Config、Fader、Time Correct、MIDI Config、Project |
| 電池 5–6 小時 | 手冊為**約 5 小時** |
| 可用 .xpj / Audio Mixdown / Explode Tracks | 那是 MPC 桌面軟體，本機沒有 |
| Track Mute、Q-Link、EXIT 鍵 | 本機沒有這些 |

### 未驗證項目處理

`docs/PROJECT-PLAN.md` §14 列有 16 項待實測。**未驗證前一律標示為「尚未驗證」，不可寫成肯定語氣。** 特別是 V-12（匯出檔案存在哪裡）尚未確認，`3-9` 相關內容須加註警語。

### 韌體版本治理

- 每課 `firmwareVerified` 必填
- 當全站基準版本高於某課時，前台自動顯示「本課以較舊韌體撰寫」標籤
- 每次官方釋出新韌體，重跑事實查核並更新受影響課程

---

## 9. 效能與品質門檻

| 項目 | 門檻 |
|---|---|
| 課程頁 | 全部 SSG，零 runtime 運算 |
| LCP / CLS | < 1.5s / ≈ 0 |
| 面板 SVG | inline |
| 音檔 | `preload="none"` |
| 圖片 | AVIF quality 85 |
| 鍵盤 | 全站可操作，focus 可見；← → 切換步驟 |
| 動態 | 尊重 `prefers-reduced-motion` |
| 行動裝置 | 375px 寬可正常使用 |
| TypeScript | strict，零錯誤 |

---

## 10. SEO 規範

⚠️ 繁中「MPC 教學」搜尋結果前十筆幾乎全是 MPC-HC 影片播放器。

- ❌ **標題、H1、URL 一律禁止使用單獨的「MPC」**
- ✅ 主關鍵字：「MPC Sample」「Akai 取樣機」「取樣機教學」「beatmaking 教學」「不用電腦做音樂」
- URL 全小寫英文、連字號、不含日期與分類前綴
- 課程頁加 HowTo / Course schema；FAQ 頁加 FAQPage schema

---

## 11. 版本控制

- GitHub **private** repo，名稱 `mpc-sample-web`
- 一個 Phase 一個 commit，格式 `P0: 階段名稱`
- 過驗證閘門才 commit，回報須含 commit hash
- **絕不進版控**：`.env.local`、任何 API key、R2 憑證
- 金鑰若誤入版控須立即輪替，不可只刪 commit
- Vercel 連 GitHub 自動部署，環境變數在 Vercel 後台設定

---

## 12. 執行計畫

| Phase | 交付 | 驗證閘門 |
|---|---|---|
| **P0** | 專案初始化、設計 token、型別、`validate-content.ts` | `npm run build` 通過、TS 零錯誤、驗證腳本可攔截錯誤資料 |
| **P1** | `MpcPanel` + `MpcScreen` + `LessonPlayer` + Season 1 四課 | 面板與 `reference/prototype-v2.html` 視覺一致；1-1 的 28 步可完整操作；行動裝置正常 |
| **P2** | 查詢區六頁 + Pagefind | 搜尋可用；旋鈕矩陣選畫面時面板同步高亮 |
| **P3** | Season 2 八課 + R2 音檔管線 | 音檔可播放且不影響 LCP |
| **P4** | Season 3 九課 | Resample 疊層課程流程完整可跟做 |
| **P5** | Season 4 + Season 5 十三課 | — |
| **P6** | 曲風工廠 16 頁 + 素材庫 | 配方卡八段式結構齊全 |

**P1 是關鍵閘門。** 面板元件做對，後面 33 課只是填資料；做錯則全部重來。

---

## 13. 回報格式

每個 Phase 完成時，用繁體中文回報：

```
P1 完成
- 做了什麼：（三行以內）
- 驗證結果：build ✅ / TS ✅ / 行動裝置 ✅ / prototype 視覺比對 ✅
- commit: <hash>
- 需要決定的事：（若有）
- 下一步：P2
```

不要貼大段程式碼，不要解釋實作細節，除非被問。
