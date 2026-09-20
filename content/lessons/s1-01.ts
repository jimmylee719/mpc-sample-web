import type { Lesson } from '@/types/lesson';

/**
 * 官方 Tutorial 的前三步（手冊 p.6–8）：Playing Sounds、Exploring Samples、Playing Sequences。
 *
 * 2026-09-20 新增。原本本站第 1 課就叫人錄自己的聲音，但官方的順序是
 * 先讓你把機器裡本來就有的東西玩過一輪，聽見「完成品長什麼樣」再動手。
 * 對完全沒碰過的人來說，這一步省不得。
 */
export const s1_01: Lesson = {
  id: 's1-01',
  slug: 'play-the-factory-project',
  season: 1,
  index: 1,
  title: '先把機器裡的東西玩過一遍',
  outcome: '一段你換過音色、也自己排過順序的原廠循環',
  minutes: 20,
  chapters: ['開機就有聲音', '換掉一個音色', '把序列排起來'],
  needsComputer: false,
  firmwareVerified: '1.3.0',
  verifiedDate: '2026-09-20',
  prerequisites: [],
  sources: [
    'Akai 官方使用手冊 v1.3.0 (RevA) p.6 Playing Sounds：開機會自動載入示範專案；轉 MAIN VOLUME 調整內建喇叭、PHONES 或 AUDIO OUT 的音量；按 PLAY 播放起始專案的序列，播放時 pad 會隨著每個聲音亮起；按 STOP 停止，快速連按兩下 STOP 可停掉所有聲音',
    'Akai 官方使用手冊 v1.3.0 (RevA) p.7 Exploring Samples：敲 pad 後按 SAMPLE SELECT；轉 ENCODER 瀏覽素材資料夾；按下 ENCODER 開啟資料夾後再轉動瀏覽，每選到一個樣本就會先試聽；按 ENCODER 載入到該 pad；再按一次 SAMPLE SELECT 回到 Sample Mode',
    'Akai 官方使用手冊 v1.3.0 (RevA) p.8 Playing Sequences：按 SEQ 進入 Sequence Mode，此時 pad 用來選擇與觸發序列；播放中敲另一顆 pad 會排隊並閃爍，等目前序列結束才切換，切換後該 pad 恆亮',
  ],
  checkpoints: [
    '你聽過機器內建的那段示範循環',
    '你把其中一顆 pad 的聲音換成別的',
    '你讓兩段以上的序列照自己排的順序接著播',
    '你知道快速連按兩下 STOP 可以全部消音',
  ],
  steps: [
    // ── 第 1 段 · 開機就有聲音 ──────────────────────────
    {
      ch: 0,
      say: '電源鍵在機器<b>背面最右邊</b>。按一下 <b>POWER</b> 開機。',
      targets: ['r_power'],
      screen: { t1: 'BOOTING…' },
      hear: '—',
      note: {
        kind: 'tip',
        title: '開機就有東西可以玩',
        body: '官方在出廠時就放了一個示範專案，開機會自動載入。你不用先做任何設定。',
      },
    },
    {
      ch: 0,
      say: '先把 <b>MAIN VOLUME</b> 轉到最小，等一下再慢慢加上去。',
      targets: ['vol'],
      screen: { t1: 'MAIN VOLUME' },
      hear: '—',
      note: {
        kind: 'warn',
        title: '戴耳機的人特別注意',
        body: '音量沒有歸零就戴上耳機，突然出現的聲音會直接衝進耳朵。這個習慣要養成。',
      },
    },
    {
      ch: 0,
      say: '按 <b>PLAY</b>。機器裡本來就有一段做好的循環會開始播。',
      targets: ['play'],
      screen: { t1: 'SEQ 01   PLAYING', wave: 18 },
      hear: '一整段鼓組循環',
    },
    {
      ch: 0,
      say: '一邊聽一邊<b>看 pad</b>。哪個聲音在響，對應的 pad 就會亮。',
      targets: ['pads'],
      screen: { t1: 'SEQ 01   PLAYING', wave: 18 },
      hear: '循環繼續播',
      note: {
        kind: 'tip',
        title: '這是最快的拆解方式',
        body: '看哪顆亮，就知道那一下是誰發出來的。整段節奏由哪些聲音組成，眼睛看得出來。',
      },
    },
    {
      ch: 0,
      say: '慢慢把 <b>MAIN VOLUME</b> 加到你聽得舒服的位置。',
      targets: ['vol'],
      screen: { t1: 'MAIN VOLUME' },
      hear: '音量變大',
    },
    {
      ch: 0,
      say: '按 <b>STOP</b> 讓它停下來。',
      targets: ['stop'],
      screen: { t1: 'STOPPED' },
      hear: '安靜',
      note: {
        kind: 'warn',
        title: '現在就把這招記起來',
        body: '快速連按兩下 STOP，所有聲音會立刻全部消失。之後上台出事就靠它。',
      },
    },

    // ── 第 2 段 · 換掉一個音色 ──────────────────────────
    {
      ch: 1,
      say: '敲一下 <b>PAD 2</b>，先聽聽它原本是什麼聲音。',
      targets: ['p2'],
      screen: { t1: 'PAD 2' },
      hear: 'PAD 2 現在的聲音',
    },
    {
      ch: 1,
      say: '按 <b>SAMPLE SEL</b> 打開素材瀏覽。這顆就是換音色用的。',
      targets: ['ssel'],
      screen: { t1: 'SAMPLE SELECT' },
      hear: '—',
    },
    {
      ch: 1,
      say: '轉 <b>ENCODER</b> 找資料夾。先找到 <b>Snares</b> 這一個。',
      targets: ['enc'],
      screen: { t1: 'FOLDER   Snares' },
      hear: '—',
      note: {
        kind: 'tip',
        title: '機器裡有幾百個素材',
        body: '從單一鼓點、樂器單音，到整段鼓循環與旋律樂句都有，分門別類放在資料夾裡。',
      },
    },
    {
      ch: 1,
      say: '<b>按下 ENCODER</b> 把資料夾打開。',
      targets: ['enc'],
      screen: { t1: 'Snares' },
      hear: '—',
    },
    {
      ch: 1,
      say: '再<b>轉 ENCODER</b> 瀏覽。每選到一個，機器就會先播給你聽。',
      targets: ['enc'],
      screen: { t1: 'Snares   02', wave: 31 },
      hear: '每轉一格就聽到一個不同的小鼓',
      note: {
        kind: 'tip',
        title: '不用載入就聽得到',
        body: '這是試聽，不會動到你的 pad。慢慢轉，聽到喜歡的再決定。',
      },
    },
    {
      ch: 1,
      say: '選到喜歡的那個，<b>按下 ENCODER</b> 載入到剛剛那顆 pad。',
      targets: ['enc'],
      screen: { t1: 'LOADED   PAD 2' },
      hear: '—',
    },
    {
      ch: 1,
      say: '再按一次 <b>SAMPLE SEL</b> 回到原本的畫面。',
      targets: ['ssel'],
      screen: { t1: 'SAMPLE MODE' },
      hear: '—',
    },
    {
      ch: 1,
      say: '按 <b>PLAY</b> 再聽一次。同一段循環，小鼓已經不一樣了。',
      targets: ['play'],
      screen: { t1: 'SEQ 01   PLAYING', wave: 18 },
      hear: '同一段節奏，但小鼓換了',
      note: {
        kind: 'win',
        title: '你已經改了這台機器裡的東西',
        body: '還沒錄任何東西，你就已經在做自己的版本了。這就是這台機器的工作方式。',
      },
    },

    // ── 第 3 段 · 把序列排起來 ──────────────────────────
    {
      ch: 2,
      say: '按 <b>SEQ</b> 進入序列模式。這時 16 顆 pad 代表 16 段序列。',
      targets: ['seq'],
      screen: { t1: 'SEQUENCE MODE' },
      hear: '—',
    },
    {
      ch: 2,
      say: '<b>PAD 1</b> 是第一段。按 <b>PLAY</b> 開始播。',
      targets: ['p1', 'play'],
      screen: { t1: 'SEQ 01   PLAYING', wave: 18 },
      hear: '第一段開始循環',
    },
    {
      ch: 2,
      say: '播放中敲 <b>PAD 2</b>。它會開始閃，表示<b>排隊等著上場</b>。',
      targets: ['p2'],
      screen: { t1: 'SEQ 02   QUEUED' },
      hear: '第一段還在播，沒有斷掉',
      note: {
        kind: 'tip',
        title: '排隊是刻意的設計',
        body: '它會等這一輪跑完才換過去，所以你可以提早按，不用抓在正拍上。現場演出全靠這個。',
      },
    },
    {
      ch: 2,
      say: '等這一輪跑完，就會換過去，<b>PAD 2</b> 也從閃爍變成恆亮。',
      targets: ['p2'],
      screen: { t1: 'SEQ 02   PLAYING', wave: 44 },
      hear: '換成第二段，接得很順',
    },
    {
      ch: 2,
      say: '再試著敲<b>別的 pad</b>，用你想要的順序把它們接起來。',
      targets: ['pads'],
      screen: { t1: 'SEQ 04   QUEUED' },
      hear: '一段接一段',
      note: {
        kind: 'tip',
        title: '這就是一首歌的雛形',
        body: '把不同段落照順序接起來，長度就拉長了。之後的 Song Mode 是把這件事記下來。',
      },
    },
    {
      ch: 2,
      say: '玩夠了按 <b>STOP</b> 結束。',
      targets: ['stop'],
      screen: { t1: 'STOPPED' },
      hear: '安靜',
      note: {
        kind: 'win',
        title: '第 1 課完成',
        body: '你已經會開機、換音色、排序列。下一課開始錄你自己的聲音進去。',
      },
    },
  ],
};
