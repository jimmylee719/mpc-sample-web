import type { VideoRef } from '@/types/lesson';

/**
 * 官方教學影片對照表。
 *
 * 來源：Akai Professional 官方頻道的「Getting Started with MPC Sample」系列，共 30 集。
 *
 * ⚠️ 對應方式的誠實說明：
 * 這份對照是**依影片標題**判斷主題後配到對應課程的。標題與頻道都已用 YouTube 官方
 * oEmbed 端點逐一驗證存在。但本站尚未有人實際觀看影片內容，
 * 所以每一支都標 `reviewed: false`，前台會顯示「尚未人工確認」。
 *
 * 逐字稿與整份翻譯字幕仍然不可以存在（那是重製與改作）。
 * 2026-08-10 起開放 `summary`：看過影片的人可以用**自己的話**寫 200 字內的中文重點，
 * 而且必須同時把 `reviewed` 設成 true。沒看過就寫摘要等於編造，驗證腳本會擋。
 */

const OFFICIAL = {
  channel: 'Akai Professional',
  lang: 'en' as const,
  official: true,
  reviewed: false,
};

const v = (youtubeId: string, title: string, why: string): VideoRef => ({
  youtubeId,
  title: `Getting Started with MPC Sample | ${title}`,
  why,
  ...OFFICIAL,
});

/** key 是 lesson id 或 genre slug */
export const officialVideos: Record<string, VideoRef[]> = {
  // ── Season 1 ────────────────────────────────────────
  's1-02': [
    v('Q3DzJ2t6p68', 'Navigation and Sounds', '官方版的面板導覽。本課教你讀懂面板，這支讓你看到實際操作的樣子。'),
  ],
  's1-01': [
    v('iOEawVwkI8Y', 'Recording with the Built-in Microphone', '本課第 2 段用內建麥克風錄音，這支是官方示範。'),
    v('SojM-PAZ8iY', 'Editing Samples', '對應本課第 3 段的修剪與 Normalize。'),
    v('1vMGz735pe8', 'Using the Sequencer', '對應本課第 4 段的序列錄音。'),
  ],
  's1-03': [
    v('L8g18bvb7Sw', 'How to Update MPC Sample', '官方版的韌體更新示範。本課刻意不轉寫官方步驟，直接看這支最準。'),
  ],
  's1-04': [
    v('CwHIOyGUOYU', 'Load and Save Projects', '對應本課的專案存檔與載入。'),
    v('CYXo4-L4Cgk', 'Never Miss a Beat with Sample Recall', '本課提到 Recall 的秒數官方自相矛盾，這支是官方自己的示範。'),
  ],

  // ── Season 2 ────────────────────────────────────────
  's2-01': [
    v('YPvWi6L0o6s', 'Sampling with Smart Device using USB-C', '本課的手機取樣有幾項尚未驗證，這支是官方示範，優先看它。'),
    v('0AFQVjzrGCc', 'Using USB-C Audio and MIDI', 'USB-C 同時走音訊與 MIDI 的官方說明。'),
  ],
  's2-02': [
    v('0lGotNt39W4', 'Using Splice with MPC Sample', '官方唯一的 Splice 說明。手冊完全沒提 Splice，實際流程以這支為準。'),
  ],
  's2-03': [
    v('yCWCuo6OZX0', 'Sampling From Vinyl', '從黑膠取樣的官方示範。本課教怎麼找乾淨段落，這支示範怎麼把它收進來。'),
    v('k3yKwSJjKfw', 'Chopping Drum Breaks and Loops', '找到鼓段落之後怎麼切，官方版示範。'),
    v('oyPESIIH4B0', 'Using Timestretch and Repitch', '對應本課第 4 段的 Warp 對速度。'),
  ],
  's2-06': [
    v('-_KNPLI-JVc', 'Using Chop Mode', 'Chop 模式的官方示範。四種切法的實際手感用看的最快。'),
  ],
  's2-08': [
    v('z4tGpU32qR4', 'Load and Save Samples', '對應本課的單獨存樣本。'),
    v('gIUTHUtuoGE', 'Transferring Sounds from Mac and PC', '把素材傳進傳出的官方示範。'),
  ],

  // ── Season 3 ────────────────────────────────────────
  's3-02': [
    v('ofs27Qq0Plw', 'Resampling', '★ 全站最重要一課的官方示範。做之前先看一遍。'),
  ],
  's3-04': [
    v('5QFrfAPDDN4', 'Using 16 Levels', '16 Levels 的官方示範，含 Tune 與 Filter 兩種型式。'),
  ],
  's3-05': [
    v('7KOFZfAhIZ0', 'Layering Samples using Pad Link', 'Pad Link 疊層的官方示範，標題直接點明用途。'),
  ],
  's3-07': [
    v('wUOQ_pbrAVE', 'How to Step Edit', '對應本課第 1 段的逐格編輯。'),
    v('A7hU4e67_F8', 'Using Swing and Quantize', '對應本課第 3 段的 Swing 與量化。'),
    v('dqMew85jKsk', 'Using The Legacy Fader', '對應本課第 4 段的推桿選單。'),
  ],
  's3-08': [
    v('MlQfZ2H284o', 'Recording Automation', '本課的官方示範。自動化的實際效果用聽的最快。'),
  ],
  's3-09': [
    v('oqpx53UpylY', 'How to use Song Mode', 'Song Mode 串接的官方示範。'),
  ],
  's3-10': [
    v('icD6d6H79cM', 'Loading Kits and Samples', '對應本課的 Load Kit 換音色不換編曲。'),
  ],

  // ── Season 4 ────────────────────────────────────────
  's4-01': [
    v('uqjp_6x7E_8', 'Using Effects', '四套效果引擎的官方導覽。'),
  ],
  's4-05': [
    v('c-PhoOEnSVc', 'Sidechain Effect using Pumper', '官方標題直接寫明 Pumper 就是拿來做側鏈效果的，佐證本課說法。'),
  ],

  // ── Season 5 ────────────────────────────────────────
  's5-06': [
    v('t2Y5IgRbfMY', 'Using External MIDI and Synths', '接外部合成器的官方示範，對應本課的 MIDI 設定。'),
  ],

  // ── 曲風 ────────────────────────────────────────────
  'boom-bap': [
    v('YAKswgIC1LY', 'Making a Hip Hop Beat', '官方從零做一首嘻哈的完整示範，跟這張配方卡同一個曲風。'),
  ],
  house: [
    v('4gsiz4aobfI', 'Making a House Track', '官方從零做一首 House 的完整示範，跟這張配方卡同一個曲風。'),
  ],
};

// ══════════════════════════════════════════════════════════
// 社群影片
// ══════════════════════════════════════════════════════════

/**
 * 非官方頻道的延伸觀看影片。
 *
 * 三條規則：
 * 1. 每一支都用 YouTube oEmbed 端點驗證過存在，標題與頻道名稱照官方回傳的寫。
 *    重跑驗證：`npm run videos:verify`
 * 2. **不是 MPC Sample 的影片一定要填 `device`。** MPC One、MPC Live、MPC 軟體
 *    有 Track Mute、觸控螢幕、外掛效果這些本機沒有的東西，不標清楚會害人。
 * 3. 一樣全部 `reviewed: false`。沒有人看過就說推薦是不誠實的。
 *
 * 依 CLAUDE.md §8：這些影片是「交叉比對」與「延伸觀看」用的，
 * 不可以單獨作為事實依據。課程內文的事實仍然只認官方手冊與實測。
 */

interface CommunityInput {
  id: string;
  title: string;
  channel: string;
  why: string;
  /** 非 MPC Sample 才填 */
  device?: string;
  lang?: VideoRef['lang'];
  /**
   * 看過影片的人用自己的話寫的中文重點，200 字內。
   * 填了這一欄就必須同時填 `reviewed: true`，驗證腳本會擋。
   */
  summary?: string;
  /** 只有實際看過的人可以設成 true */
  reviewed?: boolean;
}

const c = (v: CommunityInput): VideoRef => ({
  youtubeId: v.id,
  title: v.title,
  channel: v.channel,
  why: v.why,
  device: v.device,
  summary: v.summary,
  lang: v.lang ?? 'en',
  // 預設沒看過。要改成 true 必須是真的有人看過那支影片。
  reviewed: v.reviewed ?? false,
});

// NervousCook$ 的 MPC Sample 專門系列，是目前唯一逐項拆解本機功能的第三方教學
const nc = (id: string, title: string, why: string): VideoRef =>
  c({ id, title: `MPC Sample ${title} - Tutorial by NervousCook$`, channel: 'NervousCook$', why });

export const communityVideos: Record<string, VideoRef[]> = {
  // ── Season 1 ────────────────────────────────────────
  's1-01': [
    c({
      id: 'SoEmA-JMa10',
      title: 'How MPC Sample Actually Works (Full Beat Tutorial)',
      channel: 'Masta Kraft',
      why: '從頭做完一首的完整示範。本課走完之後看它，可以對照別人怎麼安排順序。',
    }),
    c({
      id: 'b6uyqzjX0Ys',
      title: 'MPC SAMPLE - How to Make your First Beat',
      channel: 'Ave Mcree',
      why: '同樣是第一顆節奏，另一個人的做法。兩邊對照就知道哪些步驟是必要的。',
    }),
  ],
  's1-02': [
    nc('NPyfCGaPN6w', 'EP-05 - Layout Overview', '逐一走過面板每一個控制項，跟本課的面板地圖直接對照。'),
    c({
      id: '_s3X2KtTHgc',
      title: 'The New AKAI MPC Sample - Andy Mac Presents',
      channel: 'sonicstate',
      why: 'Akai 創意總監親自示範。想知道設計者原本預期你怎麼用這台，看這支。',
    }),
  ],
  's1-04': [
    nc('eutkUTlRBj0', 'EP-06 - Load & Save Projects', '存檔與載入的第三方示範，可以跟官方那支交叉比對。'),
    nc('rIaTl9tInPs', 'EP-36 - Recall Functions', 'Recall 的秒數官方自己前後不一致，多看一支別人的實測比較保險。'),
  ],

  // ── Season 2 ────────────────────────────────────────
  's2-01': [
    c({
      id: 'RZkIOZmxPJk',
      title: 'How To Record on MPC Sample',
      channel: 'Damian Lemar Hudson',
      why: '錄音流程的第三方示範。本課的來源選擇與電平設定可以拿它對照。',
    }),
    c({
      id: '6EJ5u1IP9rk',
      title: 'The Ultimate Guide to Sampling into the MPC Sample: Vinyl, iPhone, PC & More!',
      channel: 'Sarah2ill',
      why: '標題涵蓋黑膠、手機、電腦三種來源，正好對應本課列的八個來源。',
    }),
  ],
  's2-04': [
    nc('It8tP5MPdIY', 'EP-16 - Filters & Filter Envelope', '本機濾波器的逐項拆解，含濾波包絡。這是本課最直接的第三方對照。'),
    c({
      id: 'i-Hi4uNlD8Q',
      title:
        'Akai MPC Tutorials. OLD SCHOOL Boom Bap Low Pass Filter technique used by Dilla, Preemo, Madlib, etc',
      channel: 'The Crates Motel',
      why: '低通濾波在嘻哈裡實際怎麼用。手法用聽的比用讀的快。',
      device: '其他 MPC 機型',
    }),
  ],
  's2-05': [
    nc('It8tP5MPdIY', 'EP-16 - Filters & Filter Envelope', '同一支影片也涵蓋高通。低通與高通是同一組參數的兩端。'),
    c({
      id: 'GvkXHDjl_gg',
      title: "HOW TO USE HIGH & LOW PASS FILTERS: AKAI MPC STUDIO | BEGINNER'S TUTORIAL",
      channel: 'Groovebox',
      why: '把高通與低通放在一起講的入門示範。概念一樣，但選單位置跟本機不同。',
      device: 'MPC Studio',
    }),
  ],
  's2-06': [
    nc(
      'Q7hj6NLBTB8',
      'EP-39 - Sample Chopping/Mute Groups Deep Dive',
      '切片的深入拆解，也帶到 Mute Group。看完再回來做本課的四種切法。',
    ),
  ],
  's2-07': [
    nc(
      'Q7hj6NLBTB8',
      'EP-39 - Sample Chopping/Mute Groups Deep Dive',
      'Mute Group 的深入示範，正是本課後半段的主題。',
    ),
    c({
      id: '8Ra5DH0BV3E',
      title: 'MPC Sample - Mute Group/Choke (Tutorial) 2026',
      channel: 'Jay’s Tutorials & Production Help',
      why: '短片，只講 Mute Group 一件事。忘記怎麼設的時候看這支最快。',
    }),
  ],

  // ── Season 3 ────────────────────────────────────────
  's3-01': [
    nc('nxqwFWJQIg4', 'EP-10 - Playback Modes', '播放模式是突破單一 kit 的第一招：同一個樣本換模式就是另一個角色。'),
    nc('uXVwtGdsugg', 'EP-13 - Amp Envelope', '包絡是第二招。把同一段素材削成短促或拉長，聽起來就是不同的東西。'),
  ],
  's3-03': [
    nc('ZqNavqlHxlw', 'EP-07 - Load Samples', '把樣本放上 pad 的實際流程，對應本課的分配表怎麼落地。'),
    nc('sBeokGjC_qE', 'EP-12 - Sample Mix', 'pad 之間的音量與聲相配置。分配表寫完之後就是做這件事。'),
  ],
  's3-04': [
    nc('uC6ANHWPL4U', 'EP-22 - 16 Levels Overview', '16 Levels 的完整導覽，跟官方那支可以互相補。'),
    nc('w9_y5wBSgTQ', 'EP-23 - 16 Levels Mono vs Poly', '單音與複音的差別。彈貝斯線要選單音，這支講清楚為什麼。'),
  ],
  's3-06': [
    nc('ZLWeZskAoZc', 'EP-17 - Sequence Settings', '序列長度與設定都在這裡。Half 與 Double 改的就是這一組參數。'),
    c({
      id: 'fKCJhaBQ7A0',
      title: 'AKAI MPC 2.0 TUTORIAL | HALF SPEED & DOUBLE SPEED',
      channel: 'Groovebox',
      why: '半速與倍速在編曲上的實際用法。觀念相通，但操作位置跟本機不同。',
      device: 'MPC 2.0 軟體',
    }),
  ],
  's3-07': [
    nc('Nv73ERljLsI', 'EP-41 - Step Edit', '逐格編輯的第三方示範，跟官方那支交叉比對。'),
    nc('DMe5hE404is', 'EP-19 - Editing A Sequence', '序列編輯的整體流程，含刪修與複製。'),
    nc('Gq9NBQ-MqOc', 'EP-21 - Note Repeat', 'Note Repeat 打出來的律動，文字寫不出手感，直接看。'),
  ],
  's3-09': [
    nc('CKi_Sc91IUA', 'EP-40 - Song Mode', 'Song Mode 串接的第三方示範，跟官方那支互相驗證。'),
  ],

  // ── Season 4 ────────────────────────────────────────
  's4-02': [
    c({
      id: 'gr2d83eiwRw',
      title: 'AKAI MPC SAMPLE Video 4 - FX (PAD, KNOB, FLEX BEAT & COMPRESSOR) Deep Dive!',
      channel: 'Daddy Long Les',
      why: '四套效果引擎一次講完的深入拆解。本課只做 Pad FX，這支給你全貌。',
    }),
  ],
  's4-03': [
    nc('a3ZFPfNC5eU', 'EP-30 - Flex Beat', 'Flex Beat 的專門一集。哪一顆 pad 做什麼，看畫面比看文字快。'),
  ],
  's4-04': [
    nc('NO4A35Vp5Rc', 'EP-28 - Knob FX', '28 種 Knob FX 的專門一集。本課列的短名單可以拿它逐一試聽。'),
    c({
      id: 'gr2d83eiwRw',
      title: 'AKAI MPC SAMPLE Video 4 - FX (PAD, KNOB, FLEX BEAT & COMPRESSOR) Deep Dive!',
      channel: 'Daddy Long Les',
      why: 'Knob FX 與 Pad FX 放在一起比較，最容易搞懂兩者的分工。',
    }),
  ],
  's4-06': [
    c({
      id: 'cUOp00wlFQA',
      title: 'MPC Beats Masterclass | Adding Lo-Fi FX and Tape Stop',
      channel: 'Akai Professional',
      why: '復古味道怎麼加、加到哪裡算夠。觀念可以直接搬過來用。',
      device: 'MPC Beats 軟體',
    }),
  ],
  's4-07': [
    nc('PcrN3PynxJA', 'EP-04 - Audio Out', '輸出端的設定。母帶做完要送出去，這一段不能出錯。'),
    nc('sBeokGjC_qE', 'EP-12 - Sample Mix', '母帶之前先把各層音量調對。這支講的就是那一步。'),
  ],

  // ── Season 5 ────────────────────────────────────────
  's5-01': [
    c({
      id: 'CMX21Grvuuc',
      title: 'NEW Akai Professional MPC Sample | Demo and Overview with DIBIA$E',
      channel: 'Guitar Center',
      why: '職業選手實際彈這台的樣子。演出的手感與節奏感，文字教不了。',
    }),
  ],
  's5-02': [
    nc('ZLWeZskAoZc', 'EP-17 - Sequence Settings', '序列設定的專門一集，對應本課的骨架配置。'),
    nc('DMe5hE404is', 'EP-19 - Editing A Sequence', '序列之間怎麼複製與修改，配置表就是這樣長出來的。'),
  ],
  's5-03': [
    nc('FTd0qp-EMvM', 'EP-20 - Basic Mute Functions', 'Mute 的基本操作。本課的四種編排都建立在這一組動作上。'),
  ],
  's5-04': [
    c({
      id: '33c_suYZV-A',
      title: 'weird approach to finger drumming with MPC Sample',
      channel: 'T.J. Guardino',
      why: '就是這台機器上的手指打擊。短片，直接看手怎麼放。',
    }),
    c({
      id: 'C5b4PCBU00U',
      title: 'Akai MPC LIVE - Finger Drumming Basics - Lifted Noise',
      channel: 'RAUL',
      why: '基本功的完整說明，含 16 顆 pad 怎麼分配給手指。',
      device: 'MPC Live',
    }),
    c({
      id: 'q4f5F8UTMFo',
      title: 'How to Assign Pads on MPC for Finger Drumming (Step-by-Step)',
      channel: 'Masta Kraft',
      why: '練之前先把 pad 排對。這支專講排法，跟本課第 1 段對應。',
      device: '其他 MPC 機型',
    }),
  ],
  's5-05': [
    c({
      id: 'ZJnWuqAMgNA',
      title: 'How To Transition Between Tracks And Sequences On A Live Set',
      channel: 'Analog Kitchen',
      why: '轉場的實際做法。觀念通用，但影片機型有本機沒有的 Track Mute，別照抄按鍵。',
      device: '其他 MPC 機型',
    }),
  ],

  // ══════════════════════════════════════════════════
  // 曲風
  // ══════════════════════════════════════════════════
  'boom-bap': [
    c({
      id: 'oyuTi3qv8zk',
      title: 'MPC SAMPLE = BOOM BAP MACHINE!',
      channel: 'Datsunn',
      why: '就是這台機器做 boom bap。標題直接講明它適合這個曲風。',
    }),
    c({
      id: 'VSV6T0hQ3zc',
      title: 'MPC Sample + Free Sample Pack! (Making a Boom Bap Beat!)',
      channel: 'Datsunn',
      why: '從素材到成品的完整示範，跟這張配方卡同一個曲風。',
    }),
  ],
  house: [
    c({
      id: '954dJC7n_fM',
      title: 'How To Make A Garage & House Beat on Akai MPC (Jeremy Sylvester)',
      channel: 'URBAN DUBZ',
      why: 'UK Garage 老將示範 house 的鼓組排法。配方卡的鼓組拆解可以拿它對照。',
      device: '其他 MPC 機型',
    }),
  ],
  'lofi-hip-hop': [
    c({
      id: 'Oe5jEWdvXnA',
      title: 'Making a sample based LOFI beat from vinyl on the MPC ONE!',
      channel: 'RYAN MAKES BEATS',
      why: '從黑膠取樣做 lo-fi 的完整流程，跟本站 2-3 加這張配方卡是同一條路。',
      device: 'MPC One',
    }),
    c({
      id: 'vHjYWvNEkbU',
      title: 'MPC Beats Masterclass | Making A Lo-Fi Beat',
      channel: 'Akai Professional',
      why: '官方版的 lo-fi 製作流程。觀念可以直接搬到機器上。',
      device: 'MPC Beats 軟體',
    }),
  ],
  trap: [
    c({
      id: 'ttVpxO2feCU',
      title: 'AKAI Pro MPC One: Making a Trap Beat in 10 Minutes',
      channel: 'pointblank music school',
      why: '十分鐘做完一段 trap。速度感與取捨標準值得看。',
      device: 'MPC One',
    }),
    c({
      id: 'iTarLRQxlAc',
      title: 'MPC One / Live Ultimate Beat Tutorial - (Modern Sample Chopping with Trap Drums)',
      channel: 'Lab & Legacy by @iamsight',
      why: '切片配 trap 鼓組的完整流程，正好是這張配方卡的核心。',
      device: 'MPC One / MPC Live',
    }),
    c({
      id: 'Mdz-EJEENPM',
      title: 'How I Make Modern Trap Bangers on the Akai MPC',
      channel: 'Doswell Beats',
      why: '現代 trap 的編排習慣。hi-hat 的碎拍密度用聽的最清楚。',
      device: '其他 MPC 機型',
    }),
  ],
  techno: [
    c({
      id: 'SdYIq4yAeWM',
      title: 'Akai MPC Sample | Song Mode - Acid Techno',
      channel: 'Sonic Scholar',
      why: '★ 完全在這台機器上做完的 acid techno，還用了 Song Mode 串成整首。',
    }),
    c({
      id: 'LobWYxgnA9E',
      title: 'Making MORE Techno on the MPC One',
      channel: 'Gabe Miller Music',
      why: 'techno 的排列邏輯與段落堆疊，觀念可以整套搬過來。',
      device: 'MPC One',
    }),
  ],
  'tech-house': [
    c({
      id: '954dJC7n_fM',
      title: 'How To Make A Garage & House Beat on Akai MPC (Jeremy Sylvester)',
      channel: 'URBAN DUBZ',
      why: '目前找不到 MPC 上的 tech house 專門教學。這支的 house 鼓組排法最接近。',
      device: '其他 MPC 機型',
    }),
  ],
  edm: [
    c({
      id: '4gsiz4aobfI',
      title: 'Getting Started with MPC Sample | Making a House Track',
      channel: 'Akai Professional',
      why: '目前沒有這台機器做 EDM 的專門影片。這支官方 House 是最接近的四四拍示範。',
    }),
  ],
  'drum-and-bass': [
    c({
      id: 'esgLkcwAqGg',
      title: 'How to Produce Jungle & Drum and Bass on MPC Sample',
      channel: 'Sappo',
      why: '★ 標題直接寫明是這台機器上的 jungle 與 drum and bass。',
    }),
    c({
      id: 'lbsiFoGVRyQ',
      title: 'MPC Jungle | Drum and Bass | Drumfunk | Amen Break',
      channel: 'Tubedigga',
      why: 'Amen break 的切法與重排。這張配方卡的核心就是這件事。',
      device: '其他 MPC 機型',
    }),
  ],
  jungle: [
    c({
      id: 'esgLkcwAqGg',
      title: 'How to Produce Jungle & Drum and Bass on MPC Sample',
      channel: 'Sappo',
      why: '★ 就是這台機器上的 jungle 製作流程。',
    }),
    c({
      id: 'gCgoZl1GPvI',
      title: "AKAI MPC5000 'JUNGLE' AMEN BREAK STANDALONE CHALLENGE",
      channel: 'Tubedigga',
      why: '只用一台機器把 amen break 做成 jungle 的挑戰，跟本站 DAWless 的立場一致。',
      device: 'MPC5000',
    }),
  ],
  'uk-garage': [
    c({
      id: 'Q8UZKuNuLmY',
      title: 'HOW TO MAKE 2-STEP UK GARAGE BEAT | MPC LIVE (Jeremy Sylvester)',
      channel: 'URBAN DUBZ',
      why: 'UK Garage 老將親自示範 2-step 的鼓組。搖擺的位置用聽的最準。',
      device: 'MPC Live',
    }),
  ],
  dub: [
    c({
      id: 'PZGNJR3kIMc',
      title: 'Watch Me Dub! Reggae Session on MPC One Plus',
      channel: 'How To Play Reggae',
      why: 'dub 的即時混音手法。推桿與效果怎麼推，看畫面比看文字快。',
      device: 'MPC One Plus',
    }),
    c({
      id: 'pkUts1JzBBE',
      title: 'AKAI MPC X - Créez un instru Reggae Dub avec Manu Digital',
      channel: 'La Boite Noire du Musicien',
      why: 'reggae dub 的完整編曲示範。法語發音，但操作看畫面就懂。',
      device: 'MPC X',
      lang: 'other',
    }),
  ],
  dancehall: [
    c({
      id: 'efXkdjSMBw0',
      title: 'Akai MPC LIVE Beatmaking - Reggaeton Dancehall Inspired Beat - Standalone',
      channel: 'RAUL',
      why: 'dancehall 的鼓組骨架示範，而且全程只用一台機器沒接電腦。',
      device: 'MPC Live',
    }),
  ],
  reggaeton: [
    c({
      id: 'efXkdjSMBw0',
      title: 'Akai MPC LIVE Beatmaking - Reggaeton Dancehall Inspired Beat - Standalone',
      channel: 'RAUL',
      why: 'dembow 節奏的實際排法。這張配方卡的鼓組拆解可以拿它對照。',
      device: 'MPC Live',
    }),
  ],
  dubstep: [
    c({
      id: 'a_1-WS0V43I',
      title: 'How To Make a Dubstep Beat On the Akai Mpc One (LFO Automation)',
      channel: 'NUraver Beatz',
      why: 'dubstep 的低音擺動怎麼做。本機沒有 LFO，要改用 Knob FX 加自動化，別照抄。',
      device: 'MPC One',
    }),
  ],
  hardstyle: [
    c({
      id: '1Kt0UFIhixk',
      title: 'Play Hardstyle beat on akai mpc one',
      channel: 'Neskajuhin',
      why: '不是教學，是演奏。hardstyle 的大鼓怎麼踩、密度多高，聽一次就有概念。',
      device: 'MPC One',
    }),
  ],
  'city-pop': [
    c({
      id: 'YzcAqX7ldjs',
      title: 'Making a Hard Beat on the Akai Mpc X Sampling Japanese Record',
      channel: 'Marlow Digs',
      why: '取樣日本唱片做節奏的完整流程。city pop 的素材來源與挑段標準就是這樣找的。',
      device: 'MPC X',
    }),
  ],
  'neo-soul': [
    c({
      id: 'gya_GrpoE5k',
      title: 'FREE NEO SOUL CHORD PROGRESSIONS For MPC One/MPC X/Live I,II/AKAI Force and Ripchord',
      channel: 'Musician Paradise',
      why: 'neo soul 的和弦走向。本機沒有和弦功能，但走向可以自己彈進 pad。',
      device: '其他 MPC 機型',
    }),
  ],
};

/** 取得某一課或某一個曲風的延伸觀看影片。官方在前，社群在後。 */
export function videosFor(key: string): VideoRef[] {
  return [...(officialVideos[key] ?? []), ...(communityVideos[key] ?? [])];
}

/** 全部官方影片，供驗證與統計使用 */
export const allOfficialVideos: VideoRef[] = Object.values(officialVideos).flat();

/** 全部影片（官方＋社群），供統計使用 */
export const allVideos: VideoRef[] = [...allOfficialVideos, ...Object.values(communityVideos).flat()];
