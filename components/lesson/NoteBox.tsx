import type { StepNote } from '@/types/lesson';

const STYLES: Record<StepNote['kind'], { box: string; title: string }> = {
  tip: {
    box: 'border-l-[3px] border-l-[#8A8780] bg-[rgba(25,27,30,.05)]',
    title: 'text-muted',
  },
  warn: {
    box: 'border-l-[3px] border-l-akai bg-[rgba(214,52,44,.07)]',
    title: 'text-akai',
  },
  win: {
    box: 'border-l-[3px] border-l-[#2E7D4F] bg-[rgba(46,125,79,.09)]',
    title: 'text-[#2E7D4F]',
  },
};

export function NoteBox({ note }: { note: StepNote }) {
  const style = STYLES[note.kind];
  return (
    <div className={`mt-[18px] px-[15px] py-[13px] text-sm leading-[1.66] ${style.box}`}>
      <strong className={`label-mono mb-[5px] block font-bold ${style.title}`}>{note.title}</strong>
      {note.body}
    </div>
  );
}
