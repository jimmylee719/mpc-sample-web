/**
 * 名詞對照。每一筆都遵守「英文＋中文＋做什麼用」三件套，不准只給翻譯。
 */

export interface GlossaryEntry {
  en: string;
  zh: string;
  /** 做什麼用，白話 */
  what: string;
  /** 哪一課會用到 */
  lesson?: string;
}

export const glossary: GlossaryEntry[] = [
  { en: 'Sample', zh: '樣本', what: '一段被錄進機器裡的聲音，放在一顆 pad 上', lesson: 's1-02' },
  { en: 'Sequence', zh: '序列', what: '一段錄好的演奏，會不斷循環播放', lesson: 's1-02' },
  { en: 'Project', zh: '專案', what: '裝著你所有樣本、序列和設定的一個檔案', lesson: 's1-05' },
  { en: 'Kit', zh: '音色組', what: '一整組配好在 16 顆 pad 上的聲音' },
  { en: 'Bank', zh: '音色庫', what: '16 顆 pad 為一組，總共八組，用 PAD BANK 切換', lesson: 's1-05' },
  { en: 'Pad', zh: '打擊墊', what: '敲的那 16 個方塊，越用力越大聲', lesson: 's1-02' },
  { en: 'Trim', zh: '修剪', what: '把樣本頭尾多餘的部分切掉', lesson: 's1-02' },
  { en: 'Start / End', zh: '起點／終點', what: '樣本從哪裡開始播、播到哪裡停', lesson: 's1-02' },
  { en: 'Loop', zh: '循環', what: '播到底之後從指定的點再接回去' },
  { en: 'Normalize', zh: '正規化', what: '把音量推到最大而不破音', lesson: 's1-02' },
  { en: 'Chop', zh: '切片', what: '把一段長聲音切成好幾塊，分配到 pad 上', lesson: 's1-02' },
  { en: 'Threshold', zh: '門檻', what: '音量超過這個值才開始動作，Chop 的一種切法', lesson: 's1-02' },
  { en: 'Regions', zh: '等分', what: '不管內容，把聲音平均切成 4、8 或 16 塊', lesson: 's1-02' },
  { en: 'Extract', zh: '抽出', what: '把某一塊切片變成獨立樣本，跑到新的 pad', lesson: 's1-02' },
  { en: 'Resample', zh: '重新取樣', what: '把整段循環收成一個新聲音，空出其他 pad', lesson: 's1-02' },
  { en: 'Overdub', zh: '疊錄', what: '循環跑第二輪時繼續往上加東西', lesson: 's1-02' },
  { en: 'Quantize', zh: '量化', what: '把敲歪的音自動貼到節奏格子上', lesson: 's1-02' },
  { en: 'Swing', zh: '搖擺', what: '刻意讓某些音晚一點點進來，做出律動' },
  { en: 'Step Edit', zh: '逐格編輯', what: '一格一格檢查與修改已經錄好的音符' },
  { en: 'BPM', zh: '每分鐘拍數', what: '速度。數字越大越快' },
  { en: 'Velocity', zh: '力度', what: '你敲多用力，決定這一下多大聲' },
  { en: 'Poly Aftertouch', zh: '複音觸後', what: '按住 pad 之後再加壓，可以繼續改變聲音' },
  { en: 'Takeover', zh: '接手', what: '旋鈕或推桿實際位置和螢幕數值對不上時怎麼處理，分 Pickup、Scaled、Instant 三種', lesson: 's1-03' },
  { en: 'Mute Group', zh: '互斥組', what: '同一組裡的聲音一次只能響一個，避免打架' },
  { en: 'Pad Link', zh: '打擊墊連動', what: '一顆 pad 同時觸發另一顆，不用 resample 就疊層' },
  { en: 'Pad FX', zh: '打擊墊效果', what: '用 pad 觸發，套在整段序列上，同時最多四個', lesson: 's1-03' },
  { en: 'Knob FX', zh: '旋鈕效果', what: '用旋鈕控制，一次一個，但可以指定單一 pad', lesson: 's1-03' },
  { en: 'Flex Beat', zh: '節奏切割', what: 'PAD 2 到 16 對整段序列做即時節奏變化' },
  { en: 'Compressor', zh: '壓縮器', what: '讓音量忽大忽小的地方變平均' },
  { en: 'Limiter', zh: '限幅器', what: '壓住尖峰，不讓音量爆掉' },
  { en: 'LPF / HPF', zh: '低通／高通濾波', what: '低通留低音砍高音，高通反過來' },
  { en: 'Cutoff', zh: '截止頻率', what: '濾波從哪個頻率開始砍' },
  { en: 'Resonance', zh: '共振', what: '在截止點附近加一個尖峰，聲音變有個性' },
  { en: 'Audio Mixdown', zh: '音訊混音', what: '把整首歌匯出成一個音檔', lesson: 's1-05' },
  { en: 'SD Card Access', zh: '記憶卡存取', what: '讓電腦把 microSD 當成外接磁碟讀取', lesson: 's1-05' },
  { en: 'Recall', zh: '回溯錄音', what: '把剛剛已經過去、沒錄到的聲音撈回來', lesson: 's1-05' },
  { en: 'Loop Lock', zh: '循環鎖', what: '開著的時候循環起點被鎖在樣本起點，關掉才能各自獨立設定' },
  { en: 'DAWless', zh: '不用電腦', what: '全程在機器上完成，不開電腦軟體' },
];

/**
 * 從一段文字裡找出用到的名詞。
 *
 * 用途：課程頁自動列出「這一課會用到的名詞」。
 *
 * 為什麼需要：機器上的字全是英文，新手看到 Threshold、Normalize 只能猜。
 * 名詞對照表原本躺在查詢區，卡住的人不會自己想到要去翻。
 *
 * 比對規則刻意保守：英文用單字邊界比對，中文用完整字串比對。
 * 寧可漏掉，也不要把「Loop」比到「Looper」上面去。
 */
export function termsUsedIn(text: string, limit = 10): GlossaryEntry[] {
  const hay = text.toLowerCase();
  const hits = glossary.filter((g) => {
    if (g.zh && text.includes(g.zh)) return true;
    const en = g.en.toLowerCase();
    // 名詞裡本身含有 / 或空白（例如 LPF / HPF、Pad FX），直接用字串比對
    if (/[^a-z0-9]/.test(en)) return hay.includes(en);
    return new RegExp(`\b${en}\b`).test(hay);
  });
  // 長的名詞比較specific，排前面；同長度維持原本順序
  return hits.sort((a, b) => b.en.length - a.en.length).slice(0, limit);
}
