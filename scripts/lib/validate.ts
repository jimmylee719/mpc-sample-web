/**
 * 內容驗證核心。純函式、不做 I/O、輸入一律當成 unknown。
 *
 * 「輸入當成 unknown」是刻意的：驗證器必須能檢查連型別都不對的資料，
 * 否則刻意寫錯的測試資料會先被 TypeScript 擋下來，驗證器本身反而沒被測到。
 */

import { CONTROL_IDS } from '../../types/lesson';
import { fxEntries } from '../../content/reference/fx';

export type IssueCode =
  | 'BAD_SHAPE'           // 資料結構根本不對
  | 'MISSING_FIELD'       // 必填欄位缺漏或空值
  | 'BAD_CONTROL_ID'      // targets 用了不存在的控制項 ID
  | 'MISSING_SCREEN'      // 步驟缺 screen
  | 'MISSING_HEAR'        // 步驟缺 hear
  | 'SAY_NO_BOLD'         // say 沒有任何 <b>
  | 'SENTENCE_TOO_LONG'   // 單句超過 40 字
  | 'BAD_PREREQUISITE'    // prerequisites 指向不存在的課
  | 'CH_OUT_OF_RANGE'     // ch 索引超出 chapters 範圍
  | 'DUPLICATE_ID'        // lesson id 重複
  | 'BAD_SLUG'            // 網址 slug 格式不合 SEO 規範或重複
  | 'UNKNOWN_FX'          // 曲風配方引用了效果字典裡沒有的效果
  | 'BAD_VIDEO';          // 延伸觀看的影片資料不合規範

export interface Issue {
  code: IssueCode;
  /** 出問題的位置，例：'s1-01 · step 12' */
  where: string;
  detail: string;
}

/** 單句字數上限（PROJECT-PLAN §2.2 L-01） */
export const MAX_SENTENCE_LENGTH = 40;

/**
 * 影片中文摘要的字數上限。
 * 這個數字就是「摘要」與「重製」之間那條線 —— 摘要必須明顯短於原片。
 */
export const MAX_VIDEO_SUMMARY = 200;

const LEGAL_CONTROL_IDS = new Set<string>(CONTROL_IDS as readonly string[]);

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0;

const isNonEmptyStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.length > 0 && v.every(isNonEmptyString);

/** 剝掉 HTML 標籤，只留可讀文字 */
export function stripTags(text: string): string {
  return text.replace(/<[^>]*>/g, '');
}

/** 以全形句號、問號、驚嘆號斷句 */
export function splitSentences(text: string): string[] {
  return stripTags(text)
    .split(/(?<=[。？！])/u)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** 計算單句字數：不計空白，不計句尾標點 */
export function sentenceLength(sentence: string): number {
  const cleaned = sentence.replace(/[。？！]+$/u, '').replace(/\s+/gu, '');
  return [...cleaned].length;
}

const LEGAL_LANGS = new Set(['zh-Hant', 'zh-Hans', 'en', 'ja', 'other']);

/**
 * 檢查延伸觀看的影片資料。
 * 影片只能嵌入或連結，內容絕對不可以轉錄成文字，所以這裡不接受任何逐字稿欄位。
 */
function checkVideos(value: unknown, where: string, issues: Issue[]): void {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    issues.push({ code: 'BAD_VIDEO', where, detail: 'videos 必須是陣列' });
    return;
  }
  const seen = new Set<string>();
  for (const raw of value) {
    if (!isObject(raw)) {
      issues.push({ code: 'BAD_VIDEO', where, detail: '影片資料不是物件' });
      continue;
    }
    const id = typeof raw.youtubeId === 'string' ? raw.youtubeId : '';
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) {
      issues.push({ code: 'BAD_VIDEO', where, detail: `youtubeId「${id}」不是合法的 11 碼影片 ID` });
    }
    if (seen.has(id)) {
      issues.push({ code: 'BAD_VIDEO', where, detail: `同一支影片「${id}」重複列出` });
    }
    seen.add(id);

    for (const field of ['title', 'channel', 'why']) {
      if (!isNonEmptyString(raw[field])) {
        issues.push({ code: 'BAD_VIDEO', where, detail: `影片「${id}」缺少 ${field}` });
      }
    }
    if (!LEGAL_LANGS.has(String(raw.lang))) {
      issues.push({ code: 'BAD_VIDEO', where, detail: `影片「${id}」的 lang 不合法` });
    }
    if (typeof raw.reviewed !== 'boolean') {
      issues.push({
        code: 'BAD_VIDEO',
        where,
        detail: `影片「${id}」必須明確標示 reviewed，沒看過就寫 false`,
      });
    }
    /**
     * summary：2026-08-10 開放的中文摘要。兩條規則都是硬性的。
     *
     * 1. 上限 200 字。摘要必須明顯短於原片，長到接近文字版就變成重製了。
     * 2. 有摘要就必須 reviewed: true。沒看過影片的人寫不出摘要，硬寫就是編造，
     *    而本站的整個信用建立在「不確定就說不確定」。
     */
    if ('summary' in raw && raw.summary !== undefined) {
      if (!isNonEmptyString(raw.summary)) {
        issues.push({ code: 'BAD_VIDEO', where, detail: `影片「${id}」的 summary 不是非空字串` });
      } else {
        const len = [...raw.summary.replace(/\s/g, '')].length;
        if (len > MAX_VIDEO_SUMMARY) {
          issues.push({
            code: 'BAD_VIDEO',
            where,
            detail: `影片「${id}」的 summary 有 ${len} 字，超過 ${MAX_VIDEO_SUMMARY} 字上限。摘要要明顯短於原片，不是文字版`,
          });
        }
        if (raw.reviewed !== true) {
          issues.push({
            code: 'BAD_VIDEO',
            where,
            detail: `影片「${id}」有 summary 但 reviewed 不是 true。沒看過影片寫不出摘要，這是編造`,
          });
        }
      }
    }

    // 防呆：摘要可以，逐字稿與整份字幕不行。那是重製與改作。
    for (const banned of ['transcript', 'subtitles', 'captions', 'fullText']) {
      if (banned in raw) {
        issues.push({
          code: 'BAD_VIDEO',
          where,
          detail: `影片「${id}」出現 ${banned} 欄位。逐字稿與完整字幕是重製，紅線未解除；要寫請用 summary（自己的話，${MAX_VIDEO_SUMMARY} 字內）`,
        });
      }
    }
  }
}

/** 檢查一段文字裡有沒有超長句 */
function checkSentences(text: string, where: string, field: string, issues: Issue[]): void {
  for (const sentence of splitSentences(text)) {
    const len = sentenceLength(sentence);
    if (len > MAX_SENTENCE_LENGTH) {
      issues.push({
        code: 'SENTENCE_TOO_LONG',
        where,
        detail: `${field} 有一句 ${len} 字（上限 ${MAX_SENTENCE_LENGTH}）：「${sentence.slice(0, 24)}…」`,
      });
    }
  }
}

/**
 * 驗證單一課程。
 * @param input 未經型別檢查的課程資料
 * @param knownLessonIds 全站已知的 lesson id，用來檢查 prerequisites
 */
export function validateLesson(input: unknown, knownLessonIds: ReadonlySet<string>): Issue[] {
  const issues: Issue[] = [];

  if (!isObject(input)) {
    return [{ code: 'BAD_SHAPE', where: '(unknown)', detail: '課程資料不是物件' }];
  }

  const id = isNonEmptyString(input.id) ? input.id : '(缺 id)';
  const at = (suffix = ''): string => (suffix ? `${id} · ${suffix}` : id);

  // ---- 課程層必填欄位 ----
  if (!isNonEmptyString(input.id)) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'id 必填' });
  }
  if (!isNonEmptyString(input.title)) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'title 必填' });
  }

  // slug：SEO 規範（PROJECT-PLAN §13）
  if (!isNonEmptyString(input.slug)) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'slug 必填（網址用英文 slug）' });
  } else {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) {
      issues.push({
        code: 'BAD_SLUG',
        where: at(),
        detail: `slug「${input.slug}」必須是全小寫英數與連字號`,
      });
    }
    if (/(^|-)mpc(-|$)/.test(input.slug)) {
      issues.push({
        code: 'BAD_SLUG',
        where: at(),
        detail: 'slug 不得單獨使用「mpc」（會撞上 MPC-HC 播放器的搜尋結果）',
      });
    }
    if (/^\d{4}(-\d{2})?/.test(input.slug)) {
      issues.push({ code: 'BAD_SLUG', where: at(), detail: 'slug 不得含日期前綴' });
    }
  }
  if (!isNonEmptyString(input.outcome)) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'outcome 必填（做完手上有什麼）' });
  }
  if (!isNonEmptyString(input.firmwareVerified)) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'firmwareVerified 必填' });
  }
  if (!isNonEmptyString(input.verifiedDate)) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'verifiedDate 必填' });
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(input.verifiedDate)) {
    issues.push({
      code: 'MISSING_FIELD',
      where: at(),
      detail: `verifiedDate 必須是 ISO 日期（YYYY-MM-DD），目前是「${input.verifiedDate}」`,
    });
  }
  if (typeof input.needsComputer !== 'boolean') {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'needsComputer 必填，且必須是 true / false' });
  }
  if (!isNonEmptyStringArray(input.checkpoints)) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'checkpoints 必填，至少一項' });
  } else {
    input.checkpoints.forEach((c, i) => checkSentences(c, at(`checkpoint ${i + 1}`), 'checkpoint', issues));
  }
  if (isNonEmptyString(input.outcome)) {
    checkSentences(input.outcome, at(), 'outcome', issues);
  }

  // ---- chapters ----
  const chapters = isNonEmptyStringArray(input.chapters) ? input.chapters : null;
  if (!chapters) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'chapters 必填，至少一段' });
  }

  // ---- prerequisites ----
  if (!Array.isArray(input.prerequisites)) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'prerequisites 必須是陣列（沒有前置課寫 []）' });
  } else {
    for (const pre of input.prerequisites) {
      if (typeof pre !== 'string' || !knownLessonIds.has(pre)) {
        issues.push({
          code: 'BAD_PREREQUISITE',
          where: at(),
          detail: `prerequisites 指向不存在的課程「${String(pre)}」`,
        });
      }
    }
  }

  checkVideos(input.videos, at(), issues);

  // ---- steps ----
  if (!Array.isArray(input.steps) || input.steps.length === 0) {
    issues.push({ code: 'MISSING_FIELD', where: at(), detail: 'steps 必填，至少一步' });
    return issues;
  }

  input.steps.forEach((rawStep, i) => {
    const where = at(`step ${i + 1}`);

    if (!isObject(rawStep)) {
      issues.push({ code: 'BAD_SHAPE', where, detail: '步驟不是物件' });
      return;
    }

    // say：必填，且至少一個 <b>
    if (!isNonEmptyString(rawStep.say)) {
      issues.push({ code: 'MISSING_FIELD', where, detail: 'say 必填' });
    } else {
      if (!/<b>[\s\S]*?<\/b>/i.test(rawStep.say)) {
        issues.push({
          code: 'SAY_NO_BOLD',
          where,
          detail: 'say 至少要有一個 <b> 標記實際按鍵名稱',
        });
      }
      checkSentences(rawStep.say, where, 'say', issues);
    }

    // screen：必填
    if (!isObject(rawStep.screen)) {
      issues.push({ code: 'MISSING_SCREEN', where, detail: 'screen 必填（這一步螢幕顯示什麼）' });
    }

    // hear：必填，無聲寫 '—'
    if (!isNonEmptyString(rawStep.hear)) {
      issues.push({ code: 'MISSING_HEAR', where, detail: "hear 必填（無聲寫 '—'）" });
    }

    // targets：必填，且每個都要是合法 ControlId
    if (!Array.isArray(rawStep.targets) || rawStep.targets.length === 0) {
      issues.push({ code: 'MISSING_FIELD', where, detail: 'targets 必填，至少一個控制項' });
    } else {
      for (const t of rawStep.targets) {
        if (typeof t !== 'string' || !LEGAL_CONTROL_IDS.has(t)) {
          issues.push({
            code: 'BAD_CONTROL_ID',
            where,
            detail: `targets 含不存在的控制項 ID「${String(t)}」`,
          });
        }
      }
    }

    // ch：必須落在 chapters 範圍內
    if (typeof rawStep.ch !== 'number' || !Number.isInteger(rawStep.ch)) {
      issues.push({ code: 'MISSING_FIELD', where, detail: 'ch 必填，且必須是整數' });
    } else if (chapters && (rawStep.ch < 0 || rawStep.ch >= chapters.length)) {
      issues.push({
        code: 'CH_OUT_OF_RANGE',
        where,
        detail: `ch = ${rawStep.ch}，但這一課只有 ${chapters.length} 段（合法範圍 0–${chapters.length - 1}）`,
      });
    }

    // note 內文也要守 40 字規則
    if (isObject(rawStep.note) && isNonEmptyString(rawStep.note.body)) {
      checkSentences(rawStep.note.body, where, 'note.body', issues);
    }
  });

  return issues;
}

/** 驗證整份課程清單，包含跨課檢查（id 重複、prerequisites） */
export function validateLessons(lessons: readonly unknown[]): Issue[] {
  const issues: Issue[] = [];
  const seen = new Set<string>();
  const seenSlugs = new Set<string>();
  const knownIds = new Set<string>();

  for (const l of lessons) {
    if (isObject(l) && isNonEmptyString(l.id)) knownIds.add(l.id);
  }

  for (const l of lessons) {
    if (isObject(l) && isNonEmptyString(l.id)) {
      if (seen.has(l.id)) {
        issues.push({ code: 'DUPLICATE_ID', where: l.id, detail: `lesson id「${l.id}」重複` });
      }
      seen.add(l.id);

      if (isNonEmptyString(l.slug)) {
        // 同一 Season 內 slug 不可重複，否則兩課會搶同一個網址
        const key = `s${String(l.season)}/${l.slug}`;
        if (seenSlugs.has(key)) {
          issues.push({ code: 'BAD_SLUG', where: l.id, detail: `網址「${key}」與其他課程重複` });
        }
        seenSlugs.add(key);
      }
    }
    issues.push(...validateLesson(l, knownIds));
  }

  return issues;
}

/** 驗證單一曲風配方卡：八段齊全、L4 必須說明做不完整 */
export function validateGenre(input: unknown): Issue[] {
  const issues: Issue[] = [];

  if (!isObject(input)) {
    return [{ code: 'BAD_SHAPE', where: '(unknown)', detail: '曲風資料不是物件' }];
  }

  const slug = isNonEmptyString(input.slug) ? input.slug : '(缺 slug)';

  for (const field of ['slug', 'title', 'titleEn', 'tagline', 'firmwareVerified', 'verifiedDate']) {
    if (!isNonEmptyString(input[field])) {
      issues.push({ code: 'MISSING_FIELD', where: slug, detail: `${field} 必填` });
    }
  }

  if (!isObject(input.intro) || !isNonEmptyString(input.intro.body)) {
    issues.push({ code: 'MISSING_FIELD', where: slug, detail: '第 ① 段 intro.body 必填' });
  }
  if (!isObject(input.tempo)) {
    issues.push({ code: 'MISSING_FIELD', where: slug, detail: '第 ② 段 tempo 必填' });
  }

  const sections: ReadonlyArray<[string, string]> = [
    ['padPlan', '第 ③ 段 Pad 配置'],
    ['drums', '第 ④ 段 鼓組結構'],
    ['samples', '第 ⑤ 段 素材建議'],
    ['resamples', '第 ⑥ 段 Resample 次數'],
    ['fx', '第 ⑦ 段 效果配方'],
    ['checkpoints', '第 ⑧ 段 完成檢查點'],
  ];

  for (const [field, label] of sections) {
    const value = input[field];
    // L1 有可能 0 次 resample，允許空陣列但不允許缺欄位
    const allowEmpty = field === 'resamples';
    if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) {
      issues.push({ code: 'MISSING_FIELD', where: slug, detail: `${label} 必填` });
    }
  }

  if (isNonEmptyStringArray(input.checkpoints)) {
    input.checkpoints.forEach((c, i) =>
      checkSentences(c, `${slug} · checkpoint ${i + 1}`, 'checkpoint', issues),
    );
  }
  if (isObject(input.intro) && isNonEmptyString(input.intro.body)) {
    checkSentences(input.intro.body, slug, 'intro.body', issues);
  }

  // 效果配方只能引用效果字典裡真的存在的效果，避免自己編出不存在的效果名
  if (Array.isArray(input.fx)) {
    for (const raw of input.fx) {
      if (!isObject(raw)) continue;
      const name = String(raw.name ?? '');
      const engine = String(raw.engine ?? '');
      // Flex Beat 與內建 Compressor 不是逐一命名的效果，不做名稱比對
      if (engine === 'flexbeat' || engine === 'compressor') continue;
      const known = fxEntries.some((f) => f.engine === engine && f.name === name);
      if (!known) {
        issues.push({
          code: 'UNKNOWN_FX',
          where: slug,
          detail: `效果配方引用了「${engine} · ${name}」，但效果字典裡沒有這一個`,
        });
      }
    }
  }

  checkVideos(input.videos, slug, issues);

  if (input.level === 'L4' && !isNonEmptyString(input.limitation)) {
    issues.push({
      code: 'MISSING_FIELD',
      where: slug,
      detail: 'L4 曲風必須在 limitation 說明機上做不完整、做到哪裡為止',
    });
  }
  if (!['L1', 'L2', 'L3', 'L4'].includes(String(input.level))) {
    issues.push({ code: 'MISSING_FIELD', where: slug, detail: 'level 必須是 L1 / L2 / L3 / L4' });
  }

  return issues;
}

export function validateGenres(genres: readonly unknown[]): Issue[] {
  return genres.flatMap((g) => validateGenre(g));
}

/**
 * 驗證官方影片對照表。
 * 重點是兩件事：對照的 key 必須真的存在，同一支影片不可以掛在多個地方。
 * 影片重複掛會讓讀者以為有 30 支不同的內容，其實是同一支。
 */
export function validateVideoRegistry(
  registry: unknown,
  knownKeys: ReadonlySet<string>,
  opts: {
    /** 對照表名稱，錯誤訊息用 */
    label?: string;
    /**
     * 允許同一支影片掛在多個頁面。
     *
     * 官方系列是一集對一個主題，重複掛通常是貼錯，所以預設不允許。
     * 社群影片相反：一支「Filters & Filter Envelope」本來就同時對得上低通與高通兩課，
     * 硬要一支只掛一處反而是假的。
     */
    allowCrossKeyReuse?: boolean;
  } = {},
): Issue[] {
  const label = opts.label ?? 'videos';
  const issues: Issue[] = [];
  if (!isObject(registry)) {
    return [{ code: 'BAD_VIDEO', where: label, detail: '影片對照表不是物件' }];
  }

  const seenIds = new Map<string, string>();

  for (const [key, list] of Object.entries(registry)) {
    if (!knownKeys.has(key)) {
      issues.push({
        code: 'BAD_VIDEO',
        where: `${label} · ${key}`,
        detail: `對照到不存在的課程或曲風「${key}」`,
      });
    }
    checkVideos(list, `${label} · ${key}`, issues);

    if (!opts.allowCrossKeyReuse && Array.isArray(list)) {
      for (const raw of list) {
        if (!isObject(raw)) continue;
        const id = String(raw.youtubeId ?? '');
        const prev = seenIds.get(id);
        if (prev !== undefined) {
          issues.push({
            code: 'BAD_VIDEO',
            where: `${label} · ${key}`,
            detail: `影片「${id}」已經掛在「${prev}」，不要重複掛`,
          });
        }
        seenIds.set(id, key);
      }
    }
  }

  return issues;
}
