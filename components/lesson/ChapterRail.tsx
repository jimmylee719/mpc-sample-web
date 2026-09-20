interface ChapterRailProps {
  chapters: string[];
  /** 每一段的完成比例，0–1 */
  progress: number[];
  activeIndex: number;
  /**
   * 點某一段時跳到那一段的第一步。
   *
   * 沒有這個的話，1-2 那種 27 步的課要看第 20 步就得按 19 次下一步。
   * 教練帶學生複習某一段、或自己回頭確認某個動作時，那個體驗是不能接受的。
   */
  onJump?: (chapterIndex: number) => void;
}

export function ChapterRail({ chapters, progress, activeIndex, onJump }: ChapterRailProps) {
  return (
    <div>
      <div className="mb-[9px] flex gap-[5px]">
        {chapters.map((c, i) => (
          <div key={c} className="h-[3px] flex-1 overflow-hidden bg-rule">
            <i
              className="block h-full origin-left bg-ink transition-transform duration-[350ms] ease-out"
              style={{ transform: `scaleX(${progress[i] ?? 0})` }}
            />
          </div>
        ))}
      </div>

      <ol className="mb-[22px] flex gap-[5px]">
        {chapters.map((c, i) => {
          const label = `${i + 1}. ${c}`;
          const active = i === activeIndex;
          return (
            <li key={c} className="flex-1">
              {onJump ? (
                <button
                  type="button"
                  onClick={() => onJump(i)}
                  aria-current={active ? 'step' : undefined}
                  title={`跳到第 ${i + 1} 段：${c}`}
                  className={`w-full rounded px-[3px] py-[2px] text-left font-mono text-[9px] uppercase leading-snug tracking-[.08em] transition-colors hover:bg-rule ${
                    active ? 'font-bold text-akai' : 'text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ) : (
                <span
                  className={`block px-[3px] font-mono text-[9px] uppercase leading-snug tracking-[.08em] ${
                    active ? 'font-bold text-akai' : 'text-muted'
                  }`}
                >
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
