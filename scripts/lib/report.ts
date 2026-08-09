import type { Issue, IssueCode } from './validate';

const LABEL: Record<IssueCode, string> = {
  BAD_SHAPE: '資料結構錯誤',
  MISSING_FIELD: '必填欄位缺漏',
  BAD_CONTROL_ID: '不存在的控制項 ID',
  MISSING_SCREEN: '缺 screen',
  MISSING_HEAR: '缺 hear',
  SAY_NO_BOLD: 'say 沒有 <b>',
  SENTENCE_TOO_LONG: '單句超過 40 字',
  BAD_PREREQUISITE: '前置課程不存在',
  CH_OUT_OF_RANGE: 'ch 超出章節範圍',
  DUPLICATE_ID: 'lesson id 重複',
  BAD_SLUG: '網址 slug 不合規範',
  UNKNOWN_FX: '引用了不存在的效果',
  BAD_VIDEO: '影片資料不合規範',
};

export function labelOf(code: IssueCode): string {
  return LABEL[code];
}

export function printIssues(issues: readonly Issue[]): void {
  for (const issue of issues) {
    console.error(`  ✗ [${labelOf(issue.code)}] ${issue.where}\n      ${issue.detail}`);
  }
}
