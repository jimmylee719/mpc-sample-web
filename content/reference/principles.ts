/**
 * 原理：每個操作背後的「為什麼」。
 *
 * 課程教你按哪裡，這一頁講為什麼這樣按會有這個結果。
 * 一個人在戶外、沒有人可以問、也沒辦法上 YouTube 的時候，
 * 懂原理的人遇到課程沒寫到的狀況，自己推得出下一步；只會照按的人會卡住。
 *
 * 寫作規則：
 * - 機器本身的行為一律落到官方手冊，寫在 manual 欄位
 * - 跟機器無關也成立的音訊原理，寫在 general 欄位，前台標「一般音訊原理」
 * - 兩者混在一起的，兩欄都填
 * - 不確定的不寫成肯定語氣
 */

export interface Principle {
  id: string;
  /** 讀者會怎麼問 */
  question: string;
  /** 一句話答案 */
  short: string;
  /** 為什麼：機制本身 */
  how: string;
  /** 所以你該怎麼做 */
  forYou: string;
  /** 官方手冊依據；沒有就省略 */
  manual?: string;
  /** 一般音訊原理的部分；沒有就省略 */
  general?: string;
  /** 對應課程的 lesson id */
  lesson?: string;
}

export interface PrincipleGroup {
  id: string;
  title: string;
  items: Principle[];
}

export const principleGroups: PrincipleGroup[] = [
  {
    id: 'recording',
    title: '錄音',
    items: [
      {
        id: 'feedback',
        question: '為什麼選了內建麥克風，喇叭就沒聲音？',
        short: '為了防止回授。喇叭的聲音被麥克風收進去，再從喇叭放出來，一圈一圈放大成刺耳的嘯叫。',
        how: '麥克風和喇叭裝在同一台機器上，距離只有幾公分。只要喇叭有聲音，麥克風就會收到；收到的聲音被放大後又從喇叭出來，形成一個不斷放大的迴圈。機器乾脆在用麥克風錄音時把喇叭關掉，從源頭切斷這個迴圈。',
        forYou: '要邊錄邊聽，就插耳機。耳機的聲音不會漏進麥克風。',
        manual: '「When recording using the built-in Microphone, the speaker is automatically deactivated to prevent feedback.」',
        lesson: 's1-02',
      },
      {
        id: 'bit-depth',
        question: '錄音為什麼不要錄到剛好最大聲？',
        short: '超過上限的部分會被直接削平，那種破音事後修不回來；錄小聲一點的代價卻很小。',
        how: '這台錄音是 24-bit／44.1 kHz。24-bit 能分出的音量層次非常細，錄得稍微小聲，聲音不會因為位元數不夠而變粗。但數位錄音有一條絕對的上限，超過的波形頂端會被整個削掉，聽起來是沙沙的破音。44.1 kHz 代表每秒量 44,100 次，能記錄到大約 22 kHz 的高頻，已經超過一般人聽得到的範圍。',
        forYou: '走背板時，用 REC GAIN 把最大聲的段落調到還留一點空間。真的錄太小聲，事後再用 Normalize 補。',
        manual: '規格表：錄音 24-bit／44.1 kHz，內部處理 44.1 kHz／32-bit 浮點。',
        general: '超過 0 dBFS 的數位削波無法還原；取樣率的一半是可記錄的最高頻率（奈奎斯特頻率）。',
        lesson: 's2-01',
      },
      {
        id: 'recall',
        question: 'Recall 為什麼撈得回「剛剛」的聲音？',
        short: '可以把它想成一台一直在錄、只保留最後 25 秒的錄音機。你按 Recall，它就把那 25 秒存成樣本。',
        how: '音訊 Recall 撈的是輸入來源最後 25 秒的聲音。序列的 Recall 不一樣，撈的是「上一個循環」裡你彈過的內容，不是固定秒數。所以忘了按錄音也沒關係，只要在 25 秒內按下去就來得及。',
        forYou: '即興的時候不用先按錄音，彈到喜歡的段落，馬上按 SHIFT 加 SAMPLE RECORD。',
        manual:
          '音訊：「retrieve the last 25 seconds of audio input」；序列：「events played during the last loop of sequence playback」。規格表寫 30 秒與內文不符，本站採內文。',
        lesson: 's2-01',
      },
      {
        id: 'autosave',
        question: '關機再開，剛剛做的東西還在嗎？',
        short: '在。機器會一邊做一邊在背景自動存檔，重新開機會回到最後存到的狀態。',
        how: '手冊說這台有自動存檔系統，你操作的同時進度就在背景存著。另外用 Project 選單的 Save Project，是把這份資料另存一份到內建或記憶卡，那才是你自己命名、可以帶走的版本。也因為一直在背景存，切很長的樣本時偶爾會慢一下。',
        forYou: '自動存檔救的是「這一份」。想留版本、想帶回電腦，還是要自己 Save Project。手冊只寫正常關機再開機，電池突然耗盡會保留到哪一刻沒有寫，所以電量見底前先自己存一次。',
        manual:
          '「MPC Sample contains an automatic saving system. As you work on your project, your progress is saved in the background, so if you turn MPC Sample off and on, your project reloads at the last saved state.」',
        lesson: 's1-05',
      },
    ],
  },
  {
    id: 'editing',
    title: '修剪與切片',
    items: [
      {
        id: 'trim-click',
        question: '為什麼樣本起點要修在聲音開始之前？',
        short: '從波形中間切下去，播放時會發出「喀」的一聲。',
        how: '聲音是一條連續上下擺動的線。從擺到一半的地方切斷，播放時喇叭會在一瞬間從靜止跳到那個位置，這個跳躍就是你聽到的喀聲。把起點放在聲音開始前的安靜處，線是從零慢慢出發的，就沒有跳躍。',
        forYou: '樣本開頭有喀聲，就把 Start 往前移到安靜的地方。看不清楚就按住 SHIFT 轉 K1 放大波形再修。',
        general: '在非零點截斷波形會產生不連續，聽起來是爆音或喀聲。',
        manual: '放大波形是 SHIFT＋K1／K2／K3。',
        lesson: 's1-02',
      },
      {
        id: 'normalize',
        question: 'Normalize 會讓聲音變好聽嗎？',
        short: '不會。它只是把整段一起放大，放到最大的那一點剛好碰到 0 dB。',
        how: 'Normalize 找出起點到終點之間最大聲的那一點，算出要放大多少倍才會碰到上限，再把整段用同一個倍數放大。大聲和小聲之間的差距不會變，原本的底噪也會跟著一起變大。',
        forYou: '錄太小聲時用它補救很方便；但一開始就錄到適當音量，聲音會比事後放大乾淨。',
        manual: '「adjusting the audio level between the sample start point and end point so that the maximum peak level is set to 0 dB」',
        lesson: 's1-02',
      },
      {
        id: 'threshold-chop',
        question: 'Threshold 切片是怎麼找切點的？',
        short: '它找的是音量突然往上衝的地方，也就是每一下打擊的開頭。',
        how: '鼓、鋼琴、吉他刷弦這種聲音，一敲下去音量瞬間衝到最高，開頭非常明顯。Threshold 就是在找這些衝上去的瞬間，數值調得越高，只有越明顯的衝擊才會被當成切點。弦樂、合成器長音這類慢慢浮出來的聲音沒有明顯的衝擊，切點就會亂跳。',
        forYou: '鼓組用 Threshold。長音或旋律改用 Regions 平均切，或用 Manual 邊聽邊敲。',
        manual: 'Chop 頁 SHIFT＋K3 調 Threshold 0–100%，「the higher the threshold, the fewer the resulting slices」。',
        lesson: 's2-06',
      },
      {
        id: 'warp',
        question: 'Warp 的 Stretch 和 Pitch 差在哪？',
        short: 'Stretch 只改長度不改音高；Pitch 長度和音高一起改，像黑膠唱盤調轉速。',
        how: 'Pitch 模式是用不同的速度去讀同一段聲音，讀快了就變短也變高，讀慢了就變長也變低，跟調唱盤轉速一模一樣。Stretch 模式則是把聲音拆成很短的小片段重新排列，長度改變了，每一片的音高卻不動。',
        forYou: '只想對齊速度、不想變調，用 Stretch。拉得太多會出現顆粒感或殘影，那是演算法的本質，不是故障。想要老取樣機那種變速變調的味道，用 Pitch。',
        manual:
          '「When set to Stretch, adjusting the Warp value changes the length (and tempo) of the sample, but keeps the pitch the same. When set to Pitch, … as well as adjusting the pitch.」',
        lesson: 's2-03',
      },
    ],
  },
  {
    id: 'playback',
    title: '播放與發聲',
    items: [
      {
        id: 'resample-voices',
        question: 'Resample 為什麼能空出聲音？',
        short: '機器同時最多只能發 32 個立體聲聲音，疊在一起的每一層都各佔一個。',
        how: '疊了四層的一下，按下去就是四個聲音同時在響。再加上鈸的長尾巴、還沒播完的切片，數量很快就上去。Resample 把整段收成一個新的樣本，之後播放只佔一個聲音、一顆 pad，原本那幾顆 pad 也空出來了。',
        forYou: '疊到後來聽到有聲音突然不見或尾巴被切掉，先懷疑是同時發聲數不夠。Resample 之後再繼續疊。',
        manual: '規格表：Polyphony 32 stereo voices；磁碟串流同樣上限 32 個聲音。',
        lesson: 's3-02',
      },
      {
        id: 'mono-poly',
        question: 'Polyphony 的 Mono 和 Poly 差在哪？',
        short: 'Mono 再敲一次會從頭重播，前一次被切掉；Poly 前一次會繼續響，新的一次疊上去。',
        how: '設成 Mono，每敲一下都會先停掉這顆 pad 正在播的聲音，再從起點重播。設成 Poly，每一下都是獨立的，舊的那一下會播完，所以同一顆 pad 可能同時有好幾個聲音在響。',
        forYou: '尾巴長的聲音，例如人聲或鈸，連敲時用 Mono 比較不會糊成一團。Poly 疊起來比較厚，但也會吃掉更多同時發聲數。',
        manual: 'Sample 模式 Play 頁 K1 Polyphony：Mono 或 Poly，行為描述見手冊 p.28。',
        general: 'Poly 模式下同一顆 pad 的重疊發聲會一起占用複音數。',
      },
      {
        id: 'mute-group',
        question: 'Mute Group 在模擬什麼？',
        short: '真實鼓組的開合鈸：踩下閉合，張開的那一聲就被掐掉。',
        how: '分在同一組的 pad，最後敲的那一顆會讓同組其他還在響的聲音停下來。真實的 hi-hat 也是這樣，張開的鈸還在響，一踩下去就閉合了。',
        forYou: '除了開合鈸，也可以把同一段切出來的片段放進同一組，就不會有兩片同時響成一團。',
        manual: 'Sample 模式 Play 頁 K2 Mute Group（Off、1–16），手冊以開合鈸為例。',
        lesson: 's2-07',
      },
      {
        id: 'takeover',
        question: '為什麼轉旋鈕時，數值有時候不會馬上跟著動？',
        short: '旋鈕停在一個實體位置，畫面上的數值可能是另一個；Takeover 決定兩邊對不上時怎麼辦。',
        how: 'K1 到 K3 是 270 度、有固定位置的旋鈕，不是轉不到底的那種。換頁或換 pad 之後，旋鈕停在原地，參數卻換成另一個值。Pickup 等你轉到同一個位置才接手；Scaled 邊轉邊慢慢合上；Instant 一轉就直接跳到旋鈕的位置。',
        forYou: 'K1 到 K3 預設 Scaled，推桿預設 Pickup。上台最怕數值突然跳，彩排時就到 MIDI Config 決定好。',
        manual: '手冊 p.60–61 MIDI Configuration：Parameter、Knob FX、Fader 三組 Takeover 各自設定 Pickup／Scaled／Instant。',
        lesson: 's1-03',
      },
    ],
  },
  {
    id: 'timing',
    title: '節奏',
    items: [
      {
        id: 'swing',
        question: 'Swing 到底是把什麼往後推？',
        short: '把每一對音裡的第二個往後推，讓平均的節奏帶一點三連音的晃動。',
        how: '這台的序列器一拍切成 960 格。平均的十六分音符，每 240 格一個；兩個十六分音符剛好是一個 480 格的八分音符。Swing 把每一對裡的第二個往後推，推到接近 320 格時，聽起來就像三連音。手冊的說法是讓節奏有「triplet-like feel」。',
        forYou: 'Swing 是全域設定。改了它，連 Note Repeat 打出來的節奏也會跟著晃。',
        manual:
          '序列器解析度 960 PPQ；Time Correct 頁 K3 Swing；「The Q and Swing values are global」「the current setting will also affect how Note Repeat functions」。',
        general: '320 格是八分音符內三連音的位置（480 的三分之二），屬於算術推導。',
        lesson: 's3-07',
      },
      {
        id: 'half-seq-vs-speed',
        question: 'HALF SEQ 和 HALF SPEED 差在哪？',
        short: 'HALF SEQ 是把序列剪短一半；HALF SPEED 是內容變慢一倍，佔掉兩倍的空間。',
        how: 'HALF SEQ 把長度砍半，例如四小節變兩小節。HALF SPEED 不動長度，而是讓每一個音的位置拉開成兩倍，八分音符的 hi-hat 會變成四分音符。DOUBLE 那兩顆則是反過來。',
        forYou: '想留前半段，用 HALF SEQ。想讓同一段聽起來慢一倍，用 HALF SPEED。',
        manual: 'SHIFT＋PAD 2／3／6／7 的說明，手冊以四小節與八分音符 hi-hat 為例。',
        lesson: 's3-06',
      },
    ],
  },
  {
    id: 'mixing',
    title: '混音與效果',
    items: [
      {
        id: 'pumper',
        question: 'Pumper 為什麼聽起來像側鏈？',
        short: '它照著固定的拍子把音量壓下再放開，結果很像「大鼓響的時候其他聲音讓開」。',
        how: '真正的側鏈是看著大鼓實際的音量來壓。Pumper 不看大鼓，而是照你設定的拍子規律地壓，Speed 可以從一整小節到三十二分音符。大鼓剛好也是規律的四拍時，兩者聽起來幾乎一樣。',
        forYou: '大鼓是規律四拍的曲風，Pumper 很好用。大鼓節奏不規則時，壓的位置會跟大鼓對不上，要自己調 Speed 與 Shape。',
        manual: 'Knob FX Pumper：「creates a rhythmic pumping effect, similar to that of sidechain compression」，K1 Speed、K2 Shape、K3 Depth、SHIFT＋K1 Attack、SHIFT＋K2 Hold。',
        general: '側鏈壓縮由另一個訊號（通常是大鼓）觸發增益衰減。',
        lesson: 's4-05',
      },
      {
        id: 'filter-masking',
        question: '為什麼切掉低頻，聲音反而更清楚？',
        short: '同一個頻段裡同時有好幾個聲音，它們會互相蓋住。讓出低頻，大鼓和貝斯才站得出來。',
        how: '人耳在同一個頻率範圍內，只會清楚聽到最大聲的那一個，其他的會被遮住。人聲、和弦、取樣素材都帶有不少低頻，疊在一起就跟大鼓、貝斯搶位子。用高通濾波把它們的低頻切掉，聽起來不會少什麼，低音卻一下子清楚了。',
        forYou: '除了大鼓和貝斯，其他聲音都可以試著切一點低頻，邊切邊聽，切到聲音開始變薄就往回一點。',
        general: '頻率遮蔽效應（frequency masking）。',
        lesson: 's2-05',
      },
    ],
  },
];

export const allPrinciples = principleGroups.flatMap((g) => g.items);
