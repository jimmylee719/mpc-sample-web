import type { ReactNode } from 'react';
import { KEY_PATTERN, controlIdFor } from '@/components/mpc/key-alias';
import { KeyCap } from '@/components/mpc/KeyCap';

/**
 * 把一句教學文字畫出來，並把裡面提到的按鍵換成面板上的實際按鍵圖示。
 *
 * 為什麼不再用 dangerouslySetInnerHTML：
 * 課文說「按 CHOP」，讀者得自己在面板上找哪一顆是 CHOP。
 * 直接把那顆按鍵長什麼樣子畫在句子裡，這一步就省掉了。
 *
 * 兩個刻意的限制：
 * 1. **只換 `<b>` 裡面的字**。本站的慣例是實際按鍵一律加粗，
 *    在粗體外面亂換會把「取樣」這種一般名詞也畫成按鍵。
 * 2. **只換明確指向實體控制項的詞**。Threshold、Regions 這種參數名稱不換，
 *    它們不是按鍵，畫成按鍵就是教錯。
 *
 * `say` 依資料契約只允許 `<b>`，所以這裡自己拆標籤是安全的，
 * 不需要也不應該把任意 HTML 丟進 DOM。
 */

const BOLD = /<b>([\s\S]*?)<\/b>/g;

/** 把粗體內容拆成「文字」與「按鍵圖示」交錯的片段 */
function withKeys(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  // split 帶捕捉群組，結果會是 文字, 按鍵, 文字, 按鍵…
  const pieces = text.split(new RegExp(KEY_PATTERN.source, 'g'));
  pieces.forEach((piece, i) => {
    if (piece === '') return;
    // 奇數索引是捕捉到的按鍵名稱
    if (i % 2 === 1) {
      const id = controlIdFor(piece);
      if (id) {
        out.push(<KeyCap key={`${keyPrefix}-k${i}`} id={id} label={piece} />);
        return;
      }
    }
    out.push(piece);
  });
  return out;
}

export function SayText({ html, className }: { html: string; className?: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let n = 0;

  // exec 會改動 lastIndex，所以每次都用新的 regex 實例
  const re = new RegExp(BOLD.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) nodes.push(html.slice(last, m.index));
    nodes.push(<b key={`b${n}`}>{withKeys(m[1] ?? '', `b${n}`)}</b>);
    n++;
    last = m.index + m[0].length;
  }
  if (last < html.length) nodes.push(html.slice(last));

  return <span className={className}>{nodes}</span>;
}
