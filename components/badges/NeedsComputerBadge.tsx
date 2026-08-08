/**
 * DAWless First 的視覺化。預設答案永遠是「在機器上怎麼做」，
 * 所以需要電腦的課必須自己說出來。
 */
export function NeedsComputerBadge({ needsComputer }: { needsComputer: boolean }) {
  if (!needsComputer) {
    return (
      <span className="label-mono inline-flex items-center rounded-full bg-[#1F3A28] px-[9px] py-1 text-[#7FE08A]">
        不用電腦
      </span>
    );
  }
  return (
    <span className="label-mono inline-flex items-center rounded-full bg-akai px-[9px] py-1 text-white">
      這一課需要電腦
    </span>
  );
}
