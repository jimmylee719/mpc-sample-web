import { isOutdated } from '@/content/reference/firmware';

export function FirmwareBadge({ version }: { version: string }) {
  const outdated = isOutdated(version);
  return (
    <span
      className={`label-mono inline-flex items-center gap-2 rounded-full px-[9px] py-1 ${
        outdated ? 'bg-akai text-white' : 'bg-[#2A2F35] text-[#B7BDC4]'
      }`}
    >
      韌體 {version}
      {outdated && <span>· 本課以較舊韌體撰寫</span>}
    </span>
  );
}
