interface ChapterRailProps {
  chapters: string[];
  /** 每一段的完成比例，0–1 */
  progress: number[];
  activeIndex: number;
}

export function ChapterRail({ chapters, progress, activeIndex }: ChapterRailProps) {
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
        {chapters.map((c, i) => (
          <li
            key={c}
            className={`flex-1 font-mono text-[9px] uppercase tracking-[.08em] ${
              i === activeIndex ? 'font-bold text-akai' : 'text-muted'
            }`}
          >
            {i + 1}. {c}
          </li>
        ))}
      </ol>
    </div>
  );
}
