/**
 * 延伸技巧。
 *
 * 這一頁跟課程不同：課程是「照著做完會有一個作品」，這裡是「你已經會操作了，
 * 這些組合會讓你快很多」。
 *
 * 兩種來源分得很清楚：
 * - `verified`：官方使用手冊 v1.3.0 (RevA) 白紙黑字寫過的功能，`source` 附上依據
 * - `community`：社群普遍這樣做，但官方沒寫。前台會標示，不可以寫成肯定語氣
 *
 * 依 CLAUDE.md §8，只有影片或論壇支持的內容一律標「尚未驗證」。
 */

export type TechniqueStatus = 'verified' | 'community';

export interface Technique {
  id: string;
  /** 一句話講完這招在幹嘛 */
  title: string;
  /** 什麼時候會想用它 */
  when: string;
  /** 怎麼做。每一步都要能對到面板上的實體控制項 */
  how: string;
  status: TechniqueStatus;
  /** 依據。verified 必填官方出處；community 寫清楚是誰在講 */
  source: string;
  /** 相關課程 id，前台會連過去 */
  lesson?: string;
}

export interface TechniqueGroup {
  id: string;
  title: string;
  note: string;
  items: Technique[];
}

export const techniqueGroups: TechniqueGroup[] = [
  {
    id: 'recording',
    title: '錄音',
    note: '取樣的成敗多半在按下錄音之前就決定了。',
    items: [
      {
        id: 'rec-length-seq',
        title: '把 Rec Length 設成 SEQ，錄出來的循環永遠對齊',
        when: '你要錄一段拿來當底的循環，而且受不了每次都要手動修頭尾。',
        how: '在 Sample Record 頁把 Rec Length 從 FREE 改成 SEQ，錄音長度就會鎖成目前序列的長度。如果按下錄音時序列正在播，錄音會等到這一輪跑完才開始。',
        status: 'verified',
        source:
          '官方手冊 v1.3.0 (RevA)：「When set to SEQ, the recording length is locked to the Sequence length. If SEQ is selected and playback is active, recording begins at the end of the current loop.」',
        lesson: 's2-01',
      },
      {
        id: 'threshold-autostart',
        title: '用 Threshold 讓機器自己等訊號進來才開錄',
        when: '手要去操作唱盤或手機，沒有第三隻手按錄音鍵。',
        how: 'Sample Record 頁把 Threshold 設在 -96 到 0 dB 之間的某個值。輸入音量超過那條線，錄音就自動開始。',
        status: 'verified',
        source:
          '官方手冊 v1.3.0 (RevA)：「This setting determines the minimum audio level (-96 – 0 dB) from the selected audio input Source that must be reached to automatically trigger recording.」',
        lesson: 's2-01',
      },
      {
        id: 'rec-input-fx',
        title: 'Rec Input Effects 決定效果要不要烤進樣本裡',
        when: '你想錄一段「已經有味道」的素材，或反過來，想留一份乾淨的以後再加工。',
        how: '設成 ON，錄音當下觸發的 Knob FX 會變成樣本的一部分，之後拿不掉。設成 Off，效果只是監聽用，錄進去的是乾的。',
        status: 'verified',
        source:
          '官方手冊 v1.3.0 (RevA)：「This setting determines whether Knob FX triggered during recording are recorded as part of the audio sample (ON) or are excluded from the recording (Off).」',
        lesson: 's2-01',
      },
      {
        id: 'live-fx-box',
        title: '把整台當成外接效果器',
        when: '手邊有合成器或鼓機，想借這台的效果，但不想真的取樣。',
        how: '訊號從 AUDIO IN 進來，效果路由本來就支援 Input，也就是即時處理外部輸入。不按錄音就只是過音。',
        status: 'verified',
        source:
          '官方手冊 v1.3.0 (RevA) 規格表：Effects Routes 含 Input，並明列「Real-time processing of External Inputs」',
        lesson: 's4-01',
      },
    ],
  },
  {
    id: 'chopping',
    title: '切片',
    note: '切完才是開始。這三個鍵是切片編輯的全部。',
    items: [
      {
        id: 'extract-slice',
        title: 'Extract：把一片獨立出來，而且不動到原檔',
        when: '整段裡只有那一下鼓點好用，你想單獨留著。',
        how: '在 Chop 模式選好切片，按住 SHIFT 再按 B1。那一片會匯出成新樣本，自動放到下一個空 pad。原始樣本完全不受影響。',
        status: 'verified',
        source:
          '官方手冊 v1.3.0 (RevA)：「The selected area is exported as a new sample and automatically added to the next available pad. This is a non-destructive edit, so the original sample remains fully intact.」',
        lesson: 's2-07',
      },
      {
        id: 'split-slice',
        title: 'Split：把一片對半切成兩片',
        when: '自動切出來的那一片包了兩個音，你只要後面那個。',
        how: '選好切片，按住 SHIFT 再按 B2。那一片會從正中間切成兩片，後面所有切片的編號各加一。',
        status: 'verified',
        source: '官方手冊 v1.3.0 (RevA)：「This automatically cuts the selected area in half, creating two slices in place of one.」',
        lesson: 's2-06',
      },
      {
        id: 'merge-slice',
        title: 'Merge：把一片併回前一片',
        when: '切得太碎，兩片其實是同一個音。',
        how: '選好切片，按住 SHIFT 再按 B3。它會併進前一片，後面的編號各減一。八片的樣本併掉第 2 片就剩七片，原本的第 3 片變成第 2 片。',
        status: 'verified',
        source: '官方手冊 v1.3.0 (RevA)：Merge 的說明與八片併第 2 片的例子',
        lesson: 's2-06',
      },
      {
        id: 'erase-slice',
        title: '按住 ERASE 敲 pad 直接刪掉一片',
        when: '那一片完全不要。',
        how: '按住 ERASE，敲那片對應的 pad。效果跟 Merge 一樣：它會併進前一片，後面編號往前遞補。',
        status: 'verified',
        source: '官方手冊 v1.3.0 (RevA)：「Press and hold the ERASE button and tap a PAD to remove a slice.」',
        lesson: 's2-06',
      },
      {
        id: 'chop-undo-warning',
        title: '動切片之前一定要先存檔',
        when: '每一次。沒有例外。',
        how: '按住 SHIFT 再按 PAD 16 存專案。切片編輯不吃 UNDO 也不吃 REDO，切壞了只能重新載入專案。另外只要你動手改過切點，Chop Type 就會自動變成 Manual。',
        status: 'verified',
        source:
          '官方手冊 v1.3.0 (RevA)：「Editing slices automatically sets the Chop Type to Manual. Editing slices also cannot be undone or redone using the UNDO/REDO functions.」',
        lesson: 's2-06',
      },
    ],
  },
  {
    id: 'performance',
    title: '演出',
    note: '台上沒有第二次機會，這幾個要練到不用想。',
    items: [
      {
        id: 'double-stop',
        title: '連按兩下 STOP 讓全部聲音立刻消失',
        when: '出事的時候。這是你唯一必須記住的動作。',
        how: '快速連按兩下 STOP。所有還在響的東西會立刻停掉，包含卡住的 pad。',
        status: 'verified',
        source: '官方手冊 v1.3.0 (RevA)：連按兩下 STOP 為 All Sound Off',
        lesson: 's5-05',
      },
      {
        id: 'queued-sequence',
        title: '序列切換是排隊的，不會切在半拍',
        when: '現場換段落。',
        how: '播放中按另一顆序列 pad，那顆會閃綠燈排隊，等目前這輪跑完才真的切過去。所以可以提早按，不用抓在正拍上。',
        status: 'verified',
        source: '官方手冊 v1.3.0 (RevA)：序列切換於目前循環結束時生效，等待中的序列閃爍',
        lesson: 's5-02',
      },
      {
        id: 'knobfx-per-pad',
        title: '只有 Knob FX 能指定單一 pad',
        when: '你想讓某一顆聲音變，其他不動。',
        how: '用 Knob FX，它的路由支援 Per-Pad。Pad FX 做不到，它是套在整段序列上的，這是最多人搞反的一件事。',
        status: 'verified',
        source: '官方手冊 v1.3.0 (RevA) 規格表：Effects Routes 為 Main Output、Input、Per-Pad，Per-Pad 屬於 Knob FX',
        lesson: 's4-04',
      },
      {
        id: 'padfx-velocity',
        title: '用力度控制 Pad FX 的強度',
        when: '想讓效果有呼吸，不是開關兩段。',
        how: '社群的說法是：輕壓效果比較收斂，重壓比較誇張。官方手冊沒有寫 Pad FX 會吃力度，動手前先自己試一次。',
        status: 'community',
        source: '社群普遍做法（論壇與影片），官方手冊未記載，尚未驗證',
        lesson: 's4-02',
      },
      {
        id: 'chop-variations',
        title: '同一段先切出好幾個版本，再挑最好的 resample',
        when: '你不確定哪一種切法適合這首。',
        how: '社群常見做法：把同一段素材用不同切法各做一版，聽過再把最好的那版 resample 收成一顆 pad。這是工作流程建議，不是機器功能。',
        status: 'community',
        source: '社群普遍做法（論壇與影片），非機器功能，尚未驗證',
        lesson: 's3-02',
      },
    ],
  },
];

export const allTechniques: Technique[] = techniqueGroups.flatMap((g) => g.items);
export const verifiedTechniqueCount = allTechniques.filter((t) => t.status === 'verified').length;
