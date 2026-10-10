/**
 * SVG 數字只留兩位小數。
 *
 * 為什麼：座標與透明度多半是算出來的，像 152.73839377572017 這種十六位小數，
 * 一張面板就多出六、七 KB。Next 會把同一份 SVG 再存一次在頁面資料裡，等於算兩次。
 * 螢幕上 0.01 個單位根本看不出差別，所以只在「畫出來」的那一刻四捨五入，
 * 座標資料本身不動——面板與原型的比對檢查用的仍是原始數字。
 */
export function n2(v: number): number;
export function n2(v: number | undefined): number | undefined;
export function n2(v: number | undefined): number | undefined {
  return v === undefined ? undefined : Math.round(v * 100) / 100;
}
