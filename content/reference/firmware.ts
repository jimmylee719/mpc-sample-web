/**
 * 韌體版本治理。
 * 全站基準版本高於某一課的 firmwareVerified 時，該課自動顯示「以較舊韌體撰寫」標籤。
 */

/** 全站事實查核所依據的官方手冊／韌體版本 */
export const FIRMWARE_BASELINE = '1.3.0';

/** 官方手冊修訂版 */
export const MANUAL_REVISION = 'v1.3.0 (RevA)';

function parts(version: string): number[] {
  return version.split('.').map((n) => Number.parseInt(n, 10) || 0);
}

/** a 比 b 新回傳正數，相同回傳 0，較舊回傳負數 */
export function compareFirmware(a: string, b: string): number {
  const pa = parts(a);
  const pb = parts(b);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/** 這一課是否以比全站基準更舊的韌體撰寫 */
export function isOutdated(lessonFirmware: string): boolean {
  return compareFirmware(lessonFirmware, FIRMWARE_BASELINE) < 0;
}
