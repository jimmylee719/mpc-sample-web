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
    id: 'knob-no-response',
    symptom: '轉旋鈕沒反應，轉了半天數值都不動',
    cause: 'K1–K3 是 270 度絕對位置旋鈕，需要 Takeover。旋鈕實際位置和螢幕上的值還沒對上。',
    fix: '慢慢往兩邊轉，轉到和螢幕數值對上時就會突然接上。',
    source: '官方手冊 v1.3.0 (RevA)：3 個 270° 旋鈕',
  },
  {
    id: 'cant-undo-chop',
    symptom: '切片切壞了，按 UNDO 救不回來',
    cause: '切片編輯不支援復原。',
    fix: '動手切之前先存一次專案。這是唯一的保險。',
    source: '本站 1-1 課程警示',
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
    id: 'all-sound-stuck',
    symptom: '有聲音卡住不停，關不掉',
    cause: '可能有 pad 停在持續發聲狀態。',
    fix: '快速連按兩下 STOP，所有聲音會立刻消失。',
    source: '本站 1-1 課程',
  },
];
