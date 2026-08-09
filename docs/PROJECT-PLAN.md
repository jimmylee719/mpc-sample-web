# 敲敲取樣 · 一台就夠 — 網站建置企劃書

> **MPC Sample 中文教學**
> 版本 v1.0 ｜ 2026-08-02 ｜ 狀態：可執行
> 本文件是專案的唯一真相來源。`CLAUDE.md` 是給 Claude Code 的作業指令，兩者不一致時以本文件為準。

---

## 1. 專案定義

### 1.1 品牌

| 項目 | 內容 |
|---|---|
| 品牌名 | 敲敲取樣 |
| 標語 | 一台就夠 |
| 完整標題 | 敲敲取樣 · 一台就夠 — MPC Sample 中文教學 |
| 英文代號 | knock-sample |
| Repo 名 | `mpc-sample-web` |

### 1.2 定位敘述

> 全球第一個繁體中文的 Akai MPC Sample 完整教學系統。把一台 US$399 的手持取樣機，變成使用者「能上台表演、也能獨立完成整首歌」的樂器 —— 全程不需要電腦。

### 1.3 成功標準

| 層級 | 目標 | 可驗證標準 |
|---|---|---|
| 產品 | 零基礎者能獨立產出完整歌曲 | 10 位讀者回傳「完全照網站步驟、未用電腦編曲」的作品音檔 |
| 產品 | 能進行 10 分鐘以上現場演出 | 3 位讀者回傳演出影片 |
| 內容 | 涵蓋官方手冊全部功能 | 對照手冊 26 個功能章節，覆蓋率 100% |
| 流量 | 取得繁中取樣機關鍵字入口 | 上線 6 個月內自然搜尋佔比 > 40% |

### 1.4 最高設計原則

| 編號 | 原則 | 落實 |
|---|---|---|
| **P-01** | **一課 = 一個完成的作品**，不是一課一個功能 | 每課 `outcome` 欄位必填，且必須是名詞（手上有什麼），不是動詞 |
| **P-02** | **DAWless First** — 預設答案永遠是「在機器上怎麼做」 | 每課 `needsComputer` 必填；為 true 時前台顯示警示標籤 |
| **P-03** | **每一步只做三件事**：按哪裡／看到什麼／聽到什麼 | `targets` + `screen` + `hear` 三欄缺一不可，CI 檢查 |
| **P-04** | **面板動畫 100% 資料驅動** | 課程作者只寫控制項 ID，絕不手刻 SVG |
| **P-05** | **教「讀懂面板」，不是背組合鍵** | 需要 SHIFT 時全面板紅字一起亮 |
| **P-06** | 所有操作說明必須實測後自行撰寫 | 嚴禁改寫官方手冊，見 §12 |

### 1.5 商業模式

**第一階段全部免費。** 不做付費牆、不做帳號、不收個資。等 P4 有實際流量與讀者回饋後再評估（候選方向：自製素材包、系統課程；蝦皮因缺乏數位交付機制與外流風險，暫不列為首選）。

---

## 2. 讀者與語言規範

### 2.1 讀者

| 類型 | 描述 | 優先章節 |
|---|---|---|
| A 完全零基礎 | 剛買機器、沒做過音樂、看不懂英文面板 | Season 1–2 |
| B 有聽沒做過 | 知道曲風名稱，不懂怎麼做出來 | Season 3、曲風工廠 |
| C 其他設備轉入 | 用過 DAW，卡在單 kit 限制 | 3-1、3-2 |
| D 想上台 | 街頭或小場地演出 | Season 5 |

### 2.2 寫作規範（CI 可檢查的部分標註 ✅）

| 編號 | 規則 |
|---|---|
| L-01 | ✅ 單句不超過 40 字 |
| L-02 | 英文介面名詞首次出現須「英文＋中文＋做什麼用」三件套 |
| L-03 | 禁止未定義的行話。「側鏈」→「讓大鼓響的時候其他聲音自動變小聲」 |
| L-04 | ✅ 每課必須有 `outcome`（做完你會有什麼） |
| L-05 | ✅ 每課必須有 `checkpoints`（自我驗證） |
| L-06 | 一課最多一個比喻 |
| L-07 | ✅ 每步 `say` 中至少一個 `<b>` 標記實際按鍵名稱 |

---

## 3. 硬體事實基準

**所有教學內容以 Akai 官方使用手冊 v1.3.0 (RevA) 為唯一權威。** 以下為影響教學設計的邊界條件。

### 3.1 能力

| 項目 | 事實 |
|---|---|
| 打擊墊 | 16 顆 RGB 力度感應，支援 Poly Aftertouch |
| 容量 | 每專案 16 樣本 × 8 Bank、16 序列 × 8 Bank；專案數無上限 |
| 複音 | 32 stereo voices，含磁碟串流 |
| 記憶體 | 2 GB RAM、8 GB 內建（含約 2 GB 原廠資料）、microSD 擴充 |
| 錄音 | 24-bit / 44.1 kHz；處理 44.1 kHz / 32-bit float |
| 單一樣本最長 | 20 分鐘 |
| 匯入格式 | .wav .mp3 .aif/.aiff .snd .s1s .s3s .flac .ogg（16/24-bit，44.1/48/96 kHz） |
| 效果 | 4 引擎、60+ 種。Pad FX 16（同時 4 個，響應 Poly AT）／Knob FX 28（一次 1 個）／Flex Beat／Compressor |
| 序列解析度 | 960 PPQN，含 Real-Time Swing |
| 電池 | 約 5 小時連續播放 |

### 3.2 限制（教學必須誠實說明）

| 限制 | 說明 | 對應課程 |
|---|---|---|
| **單 kit / 單軌** | 無法在既有 kit 外再載入第二組 | 3-1、3-2 整章為此而設 |
| 無 stem separation | 不能自動分離人聲與伴奏 | 2-3~2-5 教傳統取樣法替代 |
| 無 piano roll | 音符編輯靠 Step Edit | 3-7 |
| 無 plugin / AIR 擴充 | MPC Store 多數商品不適用 | 1-1 明說 |
| Chop 無一鍵轉 kit | 需逐一 Extract | 2-7 |
| 切片編輯無法 Undo | 動手前先存檔 | 2-6 強制警示 |
| 旋鈕為 270° 絕對位置 | 需 Takeover 機制 | 1-2 必教 |
| Knob FX 一次僅 1 個 | 影響混音策略 | 4-4 |
| Song Mode 無分軌 | 只能整首混音或轉序列 | 3-9 |

### 3.3 突破單 kit 限制的三把鑰匙

1. **Resample 疊層法**（SHIFT + PAD 11）— 核心，課程 3-2
2. **Pad Link**（Play 頁 SHIFT + K2）— 免 resample 疊層，課程 3-5
3. **Load Kit 單獨載入**（Project → Kits → B3）— 換音色不換編曲，課程 3-10

---

## 4. 課程架構

### 4.1 五個 Season（35 課）

| Season | 主題 | 課數 | 學完手上有什麼 |
|---|---|---|---|
| S1 | 起步 | 4 | 一段自己錄、切、彈的循環 |
| S2 | 取樣工藝 | 8 | 一組乾淨可用的素材庫 |
| S3 | 編曲 | 10 | **一首完整的歌，匯出成音檔** |
| S4 | 聲音設計 | 7 | 同一段素材的五種面貌 |
| S5 | 現場演出 | 6 | 一段 10 分鐘的 live set |

### 4.2 完整課程清單

**Season 1 · 起步**

| ID | 標題 | 核心 |
|---|---|---|
| 1-1 | 你的第一個 30 分鐘 | 開機→錄音→切片→序列→存檔（原型已完成） |
| 1-2 | 讀懂面板：紅字的世界 | SHIFT 邏輯、LED 語言、旋鈕絕對位置與 Takeover |
| 1-3 | 開機第一件事：韌體更新 | ⚠️ 唯一需要電腦的課；Windows 10 例外 |
| 1-4 | 專案、樣本、記憶卡 | 背景自動存檔 ≠ 備份 |

**Season 2 · 取樣工藝**

| ID | 標題 | 核心 |
|---|---|---|
| 2-1 | 從手機把聲音抓進來 | USB 數位 vs 類比線路兩條路徑 |
| 2-2 | 這段素材可以用嗎 | 三種情境的界線＋四種乾淨來源 |
| 2-3 | 找到「只有鼓」的那四小節 | ★傳統取樣法：前奏、間奏、breakdown |
| 2-4 | 低通濾波留下鼓與貝斯 | LPF Cutoff / Reso 實作 |
| 2-5 | 高通濾波讓人聲浮出來 | HPF；誠實說明殘留＝lo-fi 味道來源 |
| 2-6 | Chop 四種切法 | Threshold / Regions 4-8-16 / Manual |
| 2-7 | Extract 與 Mute Group | 獨立切片、避免低頻相位打架 |
| 2-8 | 建立你自己的素材庫 | 命名規範、microSD 目錄、備份 |

> **2-3 排在 2-4 之前是刻意的。** 先教「找到本來就分離的段落」（效果最好），再教濾波（效果次之）。不要讓讀者以為濾波是萬能的。

**Season 3 · 編曲**

| ID | 標題 | 核心 |
|---|---|---|
| 3-1 | 單 kit 的天花板 | 誠實說明限制，介紹四種破解法 |
| 3-2 | **Resample 疊層法** | ★★全站最重要一課 |
| 3-3 | Pad 預算規劃 | 鼓 6–10／貝斯 3–5／旋律 3–5／氛圍 2–4 |
| 3-4 | 用 16 Levels 彈貝斯與旋律 | Tune 型式，原始音高在 PAD 4 |
| 3-5 | Pad Link：免 resample 疊層 | Play 頁 SHIFT + K2 |
| 3-6 | 段落結構：Half / Double | SHIFT + PAD 2/3/6/7 |
| 3-7 | Step Edit 與 Swing | Fader 推移事件＝人味來源 |
| 3-8 | **錄製自動化** | 旋鈕與推桿動作錄進序列；ERASE 清除（2026-08-09 新增） |
| 3-9 | Song Mode 串接 | 插入、刪除、播放 |
| 3-10 | 匯出、備份、換音色 | 音訊混音／轉序列／Load Kit |

**Season 4 · 聲音設計**

| ID | 標題 | 核心 |
|---|---|---|
| 4-1 | 四套效果系統的分工 | ★釐清：Pad FX 套整段，Knob FX 可指定 pad |
| 4-2 | Pad FX 16 種實戰 | 同時最多 4 個；Latch |
| 4-3 | Flex Beat | One Shot vs Loop；Quantize |
| 4-4 | Knob FX 28 種導覽 | 七大類；一次僅一個的取捨 |
| 4-5 | 動態四件組 | Compressor／Bus Compressor／Limiter／Pumper |
| 4-6 | 復古模擬 | MPC3000／MPC60／SP1200／Vinyl／Tape |
| 4-7 | 機上母帶能做到哪裡 | 有 Limiter，無專用母帶 EQ |

**Season 5 · 現場演出**

| ID | 標題 | 核心 |
|---|---|---|
| 5-1 | 表演思維 | 製作是「決定」，演出是「執行＋即興」 |
| 5-2 | Sequence Mode 當骨架 | 排隊切換、pad 位置記憶法 |
| 5-3 | Mute 即興編排 | 任何模式可用；長按暫時啟用 |
| 5-4 | Finger Drumming 基本功 | 四週練習表 |
| 5-5 | 轉場技巧 | 濾波 build-up、Flex Beat、轉場序列 |
| 5-6 | 同步外部設備與上台檢查表 | MIDI Port 二選一；電力備援 |

### 4.3 曲風工廠（24 頁，配方卡格式）

> **2026-08-09 修訂**：原標題寫「16 頁」但下表只列出 15 個曲風，屬筆誤。
> 現已擴充到 **24 個**，級別分配如下表。

**介面決策：配方卡，不用步驟播放器。** 曲風頁是「邊做邊瞄」的參考，不是線性學習。
**例外：** 每個曲風可嵌入**一個**迷你播放器，只處理該曲風最難的單一環節（例如 Amapiano 的 log drum 調音）。

| 級別 | 數量 | 曲風 |
|---|---|---|
| L1 | 5 | Boom Bap、Lo-fi Hip Hop、Trap、**Phonk**、**Reggaeton** |
| L2 | 9 | House、Tech House、Techno、Jersey Club、Footwork、Afrobeats、**UK Garage**、**Dancehall**、**Dub** |
| L3 | 6 | EDM、Drum & Bass、Amapiano、**Jungle**、**Dubstep**、**Hardstyle** |
| L4 | 4 | R&B、Neo Soul、Pop、**City Pop** |

**L4 頁面必須在開頭明說做不完整，並告訴讀者做到哪裡、之後怎麼接。**

每個曲風頁固定八段式：
1. 這個曲風長什麼樣（音檔 + 30 秒說明）
2. BPM 範圍與節拍網格
3. Pad 配置圖（含 Bank 分配）
4. 鼓組結構拆解
5. 取樣素材建議（一律指向自錄或授權素材）
6. 需要幾次 Resample、每次做什麼
7. 效果配方（四引擎具體設定）
8. 完成檢查點

### 4.4 查詢區（6 頁）

| 頁面 | 內容 | 互動性 |
|---|---|---|
| 快捷鍵總表 | SHIFT + PAD 16 組、SHIFT + 按鍵 22 組 | 可搜尋、可篩選 |
| **旋鈕矩陣** | K1/K2/K3 在 13 種畫面下的功能 | ★選畫面 → 面板同步顯示 |
| 效果字典 | Pad FX 16 + Knob FX 28 + Flex Beat + Compressor | 可搜尋 |
| 名詞對照 | 27 組英中對照 | 可搜尋 |
| 疑難排解 | 現象 → 原因 → 解法 三欄矩陣 | 可搜尋 |
| 韌體對照 | 版本更新紀錄與受影響頁面 | 靜態 |

---

## 5. 網站地圖

```
/                              首頁：可玩的迷你面板 + Season 入口
/learn                         課程地圖（五個 Season 視覺化）
/learn/[season]/[lesson]       ★課程播放器
/genre                         曲風工廠總覽（含難度分級）
/genre/[slug]                  單一曲風配方卡
/reference/shortcuts           快捷鍵
/reference/knobs               ★互動式旋鈕矩陣
/reference/fx                  效果字典
/reference/glossary            名詞對照
/reference/troubleshoot        疑難排解
/reference/firmware            韌體對照
/samples                       免費素材庫（自錄、CC0）
/about                         關於、免責聲明、來源說明
```

---

## 6. 資料模型

課程內容為 **typed TypeScript data**，不是 MDX。原因：面板動畫需要結構化資料驅動。
散文型頁面（/about 等）用 MDX。

```ts
// types/lesson.ts
export type ControlId =
  | 'vol' | 'b1' | 'b2' | 'b3' | 'k1' | 'k2' | 'k3' | 'enc' | 'mic'
  | 'minus' | 'plus' | 'shift' | 'bank' | 'ssel' | 'tap'
  | 'sample' | 'seq' | 'padfx' | 'knobfx'
  | 'chop' | 'loop' | 'mute' | 'lev16'
  | 'srec' | 'qrec' | 'play' | 'stop' | 'erase' | 'nrep' | 'fader'
  | `p${1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16}`
  | 'pads'                                    // 全部 16 顆
  | 'r_phones' | 'r_sync' | 'r_midiout' | 'r_midiin'
  | 'r_out2' | 'r_out1' | 'r_in2' | 'r_in1'
  | 'r_gain' | 'r_usb' | 'r_power';

export interface ScreenState {
  t1?: string;              // 主標題行
  tabs?: [string,string,string];   // 對應 B1/B2/B3，預設 ['Trim','Tune','Filter']
  bots?: [string,string,string];   // 對應 K1/K2/K3，預設 ['Start','End','Loop']
  wave?: number;            // 波形種子；0 或省略 = 不顯示波形
}

export interface Step {
  ch: number;               // 章節索引
  say: string;              // 教學句，可含 <b>
  targets: ControlId[];     // 驅動面板高亮；含 r_ 開頭自動切背板
  shift?: boolean;          // 是否按住 SHIFT
  screen: ScreenState;
  hear: string;             // 必填，無聲寫 '—'
  audio?: string;           // R2 路徑，可選
  note?: { kind: 'tip'|'warn'|'win'; title: string; body: string };
}

export interface Lesson {
  id: string;               // 's1-01'
  season: 1|2|3|4|5;
  index: number;
  title: string;
  outcome: string;          // ★必填：做完手上有什麼（名詞）
  minutes: number;
  chapters: string[];
  needsComputer: boolean;   // ★必填
  firmwareVerified: string; // ★必填 '1.3.0'
  verifiedDate: string;     // ★必填 ISO 日期
  prerequisites: string[];  // lesson id
  steps: Step[];
  checkpoints: string[];    // ★必填
  sources: string[];        // 官方來源標記
}
```

---

## 7. 元件清單

| 元件 | 職責 | 優先級 |
|---|---|---|
| `<MpcPanel>` | ★核心。SVG 面板，props: `targets` / `shift` / `screen` / `view` | P1 |
| `<MpcScreen>` | 機器小螢幕（tabs / 主行 / 底標 / 波形） | P1 |
| `<LessonPlayer>` | 步驟導覽、章節進度、鍵盤操作、localStorage 進度 | P1 |
| `<NoteBox>` | tip / warn / win 三型 | P1 |
| `<FirmwareBadge>` | 版本標籤 + 過期警示 | P1 |
| `<NeedsComputerBadge>` | DAWless 原則的視覺化 | P1 |
| `<ShortcutTable>` | 可搜尋篩選 | P2 |
| `<KnobMatrix>` | 選畫面 → 面板同步顯示 | P2 |
| `<FxDictionary>` | 60 種效果查詢 | P2 |
| `<GenreCard>` | 曲風配方卡（八段式） | P6 |
| `<AudioAB>` | 前後對照播放器 | P3 |

---

## 8. 設計系統

### 8.1 版面

**左右分屏：深色舞台（機器）＋ 淺色紙頁（教學文字）。**
- 桌機：左 1.05fr 右 1fr，左側 sticky
- 手機（< 960px）：上下堆疊，機器在上

### 8.2 色票

**頁面**

| Token | Hex | 用途 |
|---|---|---|
| `--stage` | `#14161A` | 頁面底色 |
| `--stage-2` | `#1C1F24` | 機器舞台卡片 |
| `--paper` | `#F5F3EE` | 教學紙頁 |
| `--ink` | `#191B1E` | 內文 |
| `--muted` | `#6F6C65` | 次要文字 |
| `--rule` | `#D8D4CB` | 分隔線 |
| `--akai` | `#D6342C` | 強調色（取自機器 logo） |
| `--live` | `#22C55E` | 高亮光暈 |

**機器**

| Token | Hex | 用途 |
|---|---|---|
| `--dev-body` | `#E7E5E0` | 白色機身 |
| `--dev-body-edge` | `#C9C6BF` | 機身外緣 |
| `--dev-dark` | `#1B1D20` | 上方深色面板 |
| `--dev-dark-edge` | `#34383D` | 深色面板描邊 |
| `--dev-pad` | `#3D4854` | 打擊墊 |
| `--dev-pad-edge` | `#5A6774` | 打擊墊描邊 |
| `--dev-blue` | `#7FC7E0` | MODE / PAD PLAY 按鍵 |
| `--dev-orange` | `#EFA043` | PAD FX / KNOB FX |
| `--dev-red` | `#E2483F` | 錄音鍵 |
| `--dev-green` | `#4FAF5A` | PLAY |
| `--dev-white` | `#F6F5F2` | 一般白鍵 |
| `--dev-shift` | `#4C5157` | SHIFT |
| `--dev-screen` | `#0C130F` | 螢幕底 |
| `--dev-wave` | `#E8C93A` | 波形 |
| `--dev-silk` | `#8A8780` | 深色面板上的絲印文字 |

### 8.3 字體

**不使用任何 webfont，全部系統堆疊**（零載入成本、CJK 顯示最佳）。
⚠️ **禁用 Inter。**

```css
--font-sans: "PingFang TC","Microsoft JhengHei","Noto Sans TC","Hiragino Sans",system-ui,sans-serif;
--font-mono: ui-monospace,"SF Mono",Menlo,Consolas,monospace;
```

- 教學句：18.5px / line-height 1.74
- 標籤與代號：mono、9–11px、letter-spacing .14–.24em、大寫
- 標題：clamp(23px, 4vw, 34px)、letter-spacing -.02em

### 8.4 招牌元素（不可簡化）

1. **目標控制項綠色脈動光暈**（1.45s ease-in-out infinite）
2. **按住 SHIFT 時全面板紅色第二功能字一起亮** — 這是本站的教學哲學實體化
3. **機器小螢幕隨步驟同步變化**（tabs / 底標 / 波形）
4. **背板視圖依 target 前綴自動切換**

### 8.5 動態

- 純 CSS + SVG，**不安裝任何動畫函式庫**
- 必須尊重 `prefers-reduced-motion`：關閉脈動，改為靜態 45% 透明度光暈
- 頁面轉場使用 Next.js 內建 View Transitions

---

## 9. 技術棧

| 層 | 選擇 | 版本（2026-08-02 查證） |
|---|---|---|
| 框架 | Next.js App Router，Turbopack | **16.3.x**（Active LTS） |
| React | React / React DOM | **19.x** |
| 語言 | TypeScript strict | 最新穩定 |
| 樣式 | Tailwind CSS | **4.3.x** |
| 內容 | 課程 = TS data；散文 = MDX | — |
| 搜尋 | Pagefind（建置期靜態索引） | 最新 |
| 部署 | **Vercel Pro** | — |
| 靜態資產 | Cloudflare R2（音檔、圖片） | — |
| 進度 | localStorage | — |
| 分析 | Vercel Analytics 或無 Cookie 方案 | — |

⚠️ **安全性**：Vercel 於 2026 年 8 月發布一批安全性修補（App Router DoS、middleware/proxy bypass、SSRF、Image Optimization SVG DoS、Server Function 端點洩漏等）。**建置時務必 `npm show next version` 取當前最新 patch，不可沿用本文件的版本號。**

**不使用**：Supabase、任何 CMS、任何帳號系統、任何動畫函式庫、任何 webfont、shadcn/ui（本站元件高度客製，引入反而增加負擔）。

---

## 10. 效能與品質門檻

| 項目 | 門檻 |
|---|---|
| 課程頁 | 全部 SSG，零 runtime 運算 |
| LCP | < 1.5s |
| CLS | ≈ 0 |
| 面板 SVG | inline，不走網路請求 |
| 音檔 | `preload="none"`，點擊才載 |
| 圖片 | AVIF，quality 85 |
| 鍵盤 | 全站可鍵盤操作，focus 可見 |
| 動態 | 尊重 `prefers-reduced-motion` |
| 行動裝置 | 375px 寬可正常使用 |

---

## 11. 分期交付與驗證閘門

| 階段 | 交付 | 通過條件 |
|---|---|---|
| **P0** | 專案初始化、設計 token、型別定義 | `npm run build` 通過、TypeScript 零錯誤 |
| **P1** | `<MpcPanel>` + `<MpcScreen>` + `<LessonPlayer>` + Season 1 四課 | 面板與實機一致、28 步流程可完整操作 |
| **P2** | 查詢區六頁 + Pagefind 搜尋 | 搜尋可用、旋鈕矩陣互動正常 |
| **P3** | Season 2 八課 + 音檔管線（R2） | 有讀者回報做出乾淨素材 |
| **P4** | Season 3 九課 | ★有人純機上完成一首歌 |
| **P5** | Season 4 + Season 5 十三課 | — |
| **P6** | 曲風工廠 16 頁 + 素材庫 | 曲風頁流量超越基礎課程頁 |

**每個 Phase 一個 commit，格式 `P0: 階段名稱`。過閘門才 commit。**

---

## 12. 內容製作 SOP 與法律紅線

### 12.1 單頁生產流程

1. **蒐集** — 從官方手冊、論壇、影片找出該功能的已知問題
2. **實測** — 在實體機器上操作，錄下過程與音檔
3. **撰寫** — 依模板與語言規範
4. **驗證** — 由未接觸過該功能的人照做一次
5. **發布** — 填齊所有必填欄位
6. **複查** — 每次韌體更新後重驗標示為舊版的頁面

### 12.2 法律紅線（不可違反）

| 紅線 | 正確做法 |
|---|---|
| 不得改寫或翻譯官方手冊 | 規格數字（事實）可引用；操作說明必須實測後自行撰寫並附官方連結 |
| 不得轉貼論壇貼文原文 | 論壇作為「發現問題」與「交叉比對」來源，答案自行實測重寫 |
| **不得轉錄任何影片為文字，也不得翻譯字幕** | 這是著作權限制，永遠不開放。可以 embed、可以連結、可以標註頻道與標題 |
| 不得下載影片或抽取其音訊當素材 | 素材一律自錄或 CC0 |
| 不得提供他人音樂素材下載 | 素材庫一律自錄或 CC0，保留原始檔佐證 |
| 不得教導破解或第三方韌體 | 僅教官方韌體 |
| **不得將串流平台指名為取樣來源** | 陳述 USB 取樣的技術事實，範例一律用自錄或授權素材，頁首連結至 2-2 |

### 12.2.1 影片的正當用途（2026-08-09 修訂）

影片開放作為三種用途：**發現問題**、**交叉比對多方說法**、**延伸觀看**（手感、律動、音色這類文字教不了的東西）。

| 可以 | 不可以 |
|---|---|
| 在課程頁與曲風頁嵌入或連結影片 | 轉錄逐字稿、翻譯字幕、改寫成教學文字 |
| 多支影片交叉比對，找出說法分歧 | 把影片說法直接當事實寫進課程 |
| 記錄頻道、標題、網址、選它的理由 | 宣稱影片內容正確而未經官方或實測佐證 |

**衝突處理**：影片與官方手冊不一致時**一律以官方為準**，並把該誤解記入疑難排解。
只有影片支持、官方沒寫的內容，標「社群普遍做法，尚未驗證」。

**嵌入規範**：一律使用 `youtube-nocookie.com`，且必須是**點擊才載入**的預覽卡。
不可自動載入 iframe，理由是 §10 的 LCP < 1.5s 門檻與本站不蒐集個資的立場。

### 12.3 取樣法律教學的正確寫法

不可寫「改編過就沒問題」。正確內容：
- 取樣同時涉及**錄音著作**與**音樂著作**兩層權利，改編幅度不影響是否構成重製
- 國際上唯一被承認的例外門檻是修改到**聽不出來源**（歐盟法院 Pelham 案，2019）
- 串流平台**服務條款本身即禁止錄製**，與著作權是兩條獨立責任線
- 分三種情境說明風險：私下練習 / 上傳社群 / 商業發行
- 提供四種乾淨來源：自錄、機器內建、CC0、付費素材包
- 必須聲明本站不提供法律意見

---

## 13. SEO 規範

⚠️ **實測發現**：繁中「MPC 教學」搜尋結果前十筆幾乎全是 MPC-HC 影片播放器。

| 規範 | 內容 |
|---|---|
| **禁用** | 標題、H1、URL 一律禁止使用單獨的「MPC」 |
| 主關鍵字 | 「MPC Sample」「Akai 取樣機」「取樣機教學」「beatmaking 教學」「不用電腦做音樂」 |
| 標題格式 | 〈動詞〉＋〈功能英文名〉＋「MPC Sample」 |
| URL | 全小寫英文、連字號、不含日期與分類前綴 |
| 結構化資料 | 課程頁 HowTo / Course；FAQ 頁 FAQPage |
| 高流量預期頁 | 1-3 韌體更新、2-6 Chop、疑難排解、3-2 Resample、快捷鍵總表 |

---

## 14. 待實測清單（16 項，未驗證前不得寫成肯定語氣）

| 編號 | 項目 | 影響 |
|---|---|---|
| V-8 | Recall 擷取長度：手冊內文 25 秒 vs 規格表 30 秒 | 1-4 |
| V-9 | 手機 USB 取樣是否需 OTG / Host 模式 | 2-1 |
| V-10 | 電腦 USB 音訊是否 class-compliant；Windows 是否需驅動 | 2-1 |
| V-11 | 背板 AUDIO IN 是否供幻象電源 | 2-1、配件建議 |
| **V-12** | **★匯出檔案存在哪裡；未插 microSD 能否取出作品** | **3-9、配件必買清單、DAWless 主張成立與否** |
| V-13 | 手機能否使用 SD Card Access 或接收 USB 音訊 | 3-9 |
| V-14 | 單一專案檔案大小與 8 GB 可容納專案數 | 1-4 |
| V-15 | Flex Beat 效果數：FAQ 稱 16 vs 手冊 PAD 2–16（15 種） | 4-3 |
| V-16 | 盒裝是否附 MIDI 轉接線（手冊未列，FAQ 提及 Type-A） | 1-1 |
| V-17 | 官方 YouTube 頻道 MPC Sample 影片完整清單 | 選題參考 |
| V-18 | microSD 容量上限與檔案系統格式 | 配件建議（錯誤會害讀者買錯） |
| V-19 | 內建儲存是否為 eMMC | 1-4 |
| V-20 | USB MIDI 同步時 Flex Beat 是否產生爆音 | 疑難排解 |
| V-21 | 內建 3W 喇叭是否為單聲道 | 1-2 |
| V-7 | 與 MPC3 桌面軟體互通：手冊稱不支援 vs FAQ 稱可開啟 | 3-9 備援路線 |
| V-22 | 16 Levels Tune 型式的音程間隔 | 3-4 |

---

## 15. 附錄：面板控制項 ID 對照表

### 15.1 上面板

| ID | 面板名稱 | SHIFT 第二功能 |
|---|---|---|
| `vol` | MAIN VOLUME | — |
| `b1` `b2` `b3` | 螢幕上方三鍵 | 各畫面不同 |
| `k1` `k2` `k3` | 中央三顆旋鈕（270° 絕對位置） | 各畫面不同 |
| `enc` | ENCODER（可按壓 360°） | 反向循環參數 |
| `mic` | 內建麥克風 | — |
| `minus` `plus` | – / + | UNDO / REDO |
| `shift` | SHIFT | — |
| `bank` | PAD BANK | 上一個 Bank |
| `ssel` | SAMPLE SELECT | SAVE SAMPLE |
| `tap` | TAP TEMPO | METRO |
| `sample` | SAMPLE（藍） | INPUT CONFIG |
| `seq` | SEQ（藍） | STEP EDIT |
| `padfx` | PAD FX（橘） | FLEX BEAT |
| `knobfx` | KNOB FX（橘） | FX SELECT |
| `chop` | CHOP（藍） | NOTE ON |
| `mute` | MUTE（藍） | UNMUTE ALL |
| `loop` | LOOP（藍） | REVERSE |
| `lev16` | 16 LEVELS（藍） | TYPE |
| `erase` | ERASE | COPY |
| `nrep` | NOTE REPEAT | TRIPLET |
| `fader` | 垂直推桿（30 mm） | — |
| `srec` | SAMPLE RECORD（紅） | RECALL |
| `qrec` | SEQ RECORD（紅） | RECALL |
| `play` | PLAY（綠） | CONTINUE |
| `stop` | STOP | — |
| `p1`–`p16` | 打擊墊 | 見 15.2 |
| `pads` | 全部 16 顆（僅供 targets 使用） | — |

### 15.2 打擊墊絲印（印在 pad 上方）

| Pad | 第二功能 | Pad | 第二功能 |
|---|---|---|---|
| 1 | FULL LEVEL | 9 | FADER |
| 2 | HALF SEQ | 10 | REC QUANTIZE |
| 3 | DOUBLE SEQ | 11 | **RESAMPLE** |
| 4 | COUNT-IN | 12 | SONG |
| 5 | COMPRESSOR | 13 | TRIM SAMPLE |
| 6 | HALF SPEED | 14 | TIME CORRECT |
| 7 | DOUBLE SPEED | 15 | WARP |
| 8 | MIDI CONFIG | 16 | PROJECT |

### 15.3 背板（由左至右）

| ID | 名稱 | 規格 |
|---|---|---|
| `r_phones` | PHONES | 1/8" TRS |
| `r_sync` | SYNC OUT | 1/8" TS，5V CV |
| `r_midiout` | MIDI OUT | 1/8" TRS Type A |
| `r_midiin` | MIDI IN | 1/8" TRS Type A |
| `r_out2` | AUDIO OUT 2/R | 1/4" TRS |
| `r_out1` | AUDIO OUT 1/L | 1/4" TRS |
| `r_in2` | AUDIO IN 2/R | 1/4" TRS |
| `r_in1` | AUDIO IN 1/L | 1/4" TRS |
| `r_gain` | REC GAIN | 旋鈕 |
| `r_usb` | USB | USB-C |
| `r_power` | POWER | 電源鍵 |

### 15.4 螢幕預設對應

- 上排三個標籤 = B1 / B2 / B3，預設 `Trim` `Tune` `Filter`
- 下排三個標籤 = K1 / K2 / K3，預設 `Start` `End` `Loop`
- 進 Chop 模式時下排變為 `Start` `End` `Type`

> **這是本站最重要的教學槓桿**：機器螢幕本身就在教面板邏輯，Lesson 1-1 第 7 步直接用這件事當教學點。

---

## 16. 版本紀錄

| 版本 | 日期 | 摘要 |
|---|---|---|
| v1.0 | 2026-08-02 | 定案：品牌「敲敲取樣 · 一台就夠」、34 課五 Season 架構、16 曲風配方卡、6 查詢頁、資料模型、設計系統、技術棧鎖版、P0–P6 分期 |
