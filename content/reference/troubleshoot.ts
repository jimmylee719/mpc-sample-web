/**
 * 疑難排解：現象 → 原因 → 解法。
 *
 * 只收「有官方依據」或「本站課程中已寫明」的項目。
 * 純社群回報而未經實測的不放進來，那會變成散播錯誤資訊。
 */

export interface TroubleEntry {
  id: string;
  /** 現象：使用者會怎麼描述 */
  symptom: string;
  /** 原因 */
  cause: string;
  /** 解法 */
  fix: string;
  source: string;
}

export const troubles: TroubleEntry[] = [
  {
    id: 'no-sound-mic',
    symptom: '選了麥克風之後，內建喇叭就沒聲音了',
    cause: '不是故障。選 Mic 當錄音來源時，機器會自動關掉喇叭。',
    fix: '這是防止回授的設計。要監聽請插耳機。',
    source: '官方手冊 v1.3.0 (RevA)：喇叭在接上耳機或 1/4" 輸出時會自動停用',
  },
  {
    id: 'fader-no-response',
    symptom: '推推桿完全沒反應，數值動都不動',
    cause: '推桿的 Fader Takeover 預設是 Pickup。位置沒對上之前，它真的不會動。',
    fix: '把推桿慢慢推到跟螢幕上的值同一個位置，對上就接手了。不想每次都這樣，可以到 MIDI Config 把 Fader Takeover 改成 Instant。',
    source:
      '官方手冊 v1.3.0 (RevA) p.61：「Pickup: Parameters are not editable until the hardware control position matches the parameter position. This is the default behavior for Fader Takeover.」',
  },
  {
    id: 'knob-scaled-feel',
    symptom: '轉旋鈕有反應，但數值變化跟手感對不上',
    cause:
      '這是正常的。K1–K3 預設是 Scaled：值會往你轉的方向走，但速率經過縮放，目的是讓兩邊最後合在一起。',
    fix: '繼續轉，值會逐漸追上旋鈕的實際位置。想要一轉就跳到底，到 MIDI Config 把 Parameter Takeover 改成 Instant。',
    source:
      '官方手冊 v1.3.0 (RevA) p.61：「Scaled: … This is the default behavior for Parameter Takeover and Knob FX Takeover.」',
  },
  {
    id: 'takeover-where',
    symptom: '想改 Takeover 行為，但找不到設定在哪',
    cause: '它不在 Fader 選單裡，而是在 MIDI Config。位置不直覺。',
    fix: '按住 SHIFT 再按 PAD 8 打開 MIDI Config，用 ENCODER 往下捲，會看到 Parameter、Knob FX、Fader 三組 Takeover。',
    source: '官方手冊 v1.3.0 (RevA) p.60–61：Takeover 設定列於 MIDI Configuration 選單',
  },
  {
    id: 'cant-undo-chop',
    symptom: '切片切壞了，按 UNDO 救不回來',
    cause: '切片編輯不支援復原。',
    fix: '動手切之前先存一次專案。這是唯一的保險。',
    source: '本站 1-2 課程警示',
  },
  {
    id: 'pad-fx-single-pad',
    symptom: '想只對一顆 pad 加效果，但 Pad FX 整段都變了',
    cause: 'Pad FX 是套用在整段序列上的，不能只套一顆。',
    fix: '要指定單一 pad，改用 Knob FX。',
    source: '官方手冊 v1.3.0 (RevA)：Effects Routes 為 Main Output、Input、Per-Pad；Per-Pad 屬於 Knob FX',
  },
  {
    id: 'computer-cant-see',
    symptom: '用 USB-C 接電腦，電腦看不到機器',
    cause: '有些 USB-C 線只有電源腳位，不能傳資料。',
    fix: '換一條確定能傳資料的 USB-C 線。盒裝內附的那條可以。',
    source: '官方手冊 v1.3.0 (RevA)：盒裝含 USB-C 線',
  },
  {
    id: 'update-windows10',
    symptom: 'Windows 10 打不開 mpc-sample.local',
    cause: '不是壞掉。Windows 10 不走瀏覽器更新這條路。',
    fix: '到官方下載頁抓 MPC Sample Updater 桌面程式。開機同時按住 CHOP、MUTE、SAMPLE SELECT 進入 Update Mode。',
    source: 'Akai 官方支援：MPC Sample Firmware Update',
  },
  {
    id: 'no-microsd',
    symptom: '做完的歌不知道怎麼拿到電腦上',
    cause: '傳檔要透過 Project 選單的 SD Card Access，而 microSD 卡不含在盒裝內。',
    fix: '先在 Song 頁匯出成音檔，再插上 microSD 卡走 SD Card Access。',
    source: '官方手冊 v1.3.0 (RevA)：SD Card Access 說明「microSD card (not included)」',
  },
  {
    id: 'turntable-too-quiet',
    symptom: '唱盤接進背板，聲音超小而且很悶',
    cause: '唱盤輸出的是 phono 訊號，電平遠低於線路電平，而且頻率響應還沒被還原。',
    fix: '中間要接唱頭放大器，或改用內建放大器的唱盤。先進混音器再拉線進來也可以。',
    source:
      'Akai 官方使用手冊 v1.3.0 (RevA)：AUDIO IN 為 2 個 1/4" TRS 輸入，規格寫明 Mic/Line-Level，適用麥克風、樂器、混音器、合成器、鼓機。唱盤的 phono 訊號比這兩種都低',
  },
  {
    id: 'no-card-no-transfer',
    symptom: '想把做好的音檔傳到電腦，但沒有記憶卡',
    cause: '傳檔掛載到電腦上的是 microSD 卡，不是內建的 8 GB 儲存。沒有卡就沒有東西可以掛。',
    fix: '買一張 microSD 卡。已經存在內建儲存的樣本，要先在存檔時把目的地改成記憶卡，再走 SD Card Access。',
    source:
      'Akai 官方使用手冊 v1.3.0 (RevA)：SD Card Access 存取「插在卡槽裡的 microSD（不含在盒裝內）」，且「The microSD card will mount as an external drive on your computer」',
  },
  {
    id: 'midi-adapter-missing',
    symptom: '想接五針 MIDI 的合成器，盒裝裡找不到轉接線',
    cause: '轉接線本來就沒有附。',
    fix: '自己買一條 1/8" TRS Type A 轉五針 MIDI DIN 的轉接線。認明 Type A，Type B 接上不會壞但不會動。',
    source:
      'Akai 官方使用手冊 v1.3.0 (RevA)：「1/8" TRS (Type A) to 5-Pin MIDI DIN connectors (not included)」',
  },
  {
    id: 'automation-stuck',
    symptom: '某顆 pad 的參數會自己亂動，關不掉',
    cause: '那顆 pad 上錄了自動化。',
    fix: '選中該 pad，按住 ERASE 並移動那個參數的旋鈕或推桿，畫面出現確認後按 B3。',
    source: '官方手冊 v1.3.0 (RevA)：清除自動化的步驟',
  },
  {
    id: 'all-sound-stuck',
    symptom: '有聲音卡住不停，關不掉',
    cause: '可能有 pad 停在持續發聲狀態。',
    fix: '快速連按兩下 STOP，所有聲音會立刻消失。',
    source: '本站 1-2 課程',
  },
];
