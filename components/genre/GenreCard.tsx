import type { Genre } from '@/types/genre';
import { MpcPanel } from '@/components/mpc/MpcPanel';
import { AudioClip } from '@/components/lesson/AudioClip';
import { GenreMiniPlayer } from './GenreMiniPlayer';
import { VideoList } from '@/components/video/VideoList';

/**
 * 曲風配方卡，固定八段式（PROJECT-PLAN §4.3）。
 * 順序不可調動，段落不可省略——讀者是「邊做邊瞄」，位置固定才找得到。
 */

const KIND_LABEL: Record<string, string> = {
  'self-record': '自錄',
  'built-in': '機器內建',
  cc0: 'CC0',
  'paid-pack': '付費素材包',
};

const ENGINE_LABEL: Record<string, string> = {
  padfx: 'Pad FX',
  knobfx: 'Knob FX',
  flexbeat: 'Flex Beat',
  compressor: 'Compressor',
};

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="flex items-baseline gap-2">
        <span className="label-mono text-akai">{String(n).padStart(2, '0')}</span>
        <span className="text-lg text-white">{title}</span>
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function GenreCard({ genre }: { genre: Genre }) {
  // 面板一次只看得到一個 Bank，所以只亮 Bank A。
  // 全部高亮會讓人以為 Bank B 的 pad 也在同一個畫面上，那是錯的。
  const bankAPads = genre.padPlan.filter((p) => p.bank === 'A').map((p) => p.pad);
  const hasOtherBanks = genre.padPlan.some((p) => p.bank !== 'A');

  return (
    <div>
      {genre.level === 'L4' && genre.limitation && (
        <div className="rounded-[14px] border-l-[3px] border-l-akai bg-[rgba(214,52,44,.09)] px-4 py-4">
          <p className="label-mono font-bold text-akai">先說清楚：這個曲風機上做不完整</p>
          <p className="mt-2 text-sm leading-[1.75] text-[#D9D4CB]">{genre.limitation}</p>
        </div>
      )}

      <Section n={1} title="這個曲風長什麼樣">
        <p className="text-[15px] leading-[1.8] text-[#B7BDC4]">{genre.intro.body}</p>
        {genre.intro.audio && <AudioClip path={genre.intro.audio} label="聽一段範例" />}
      </Section>

      <Section n={2} title="BPM 範圍與節拍網格">
        <dl className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-[#2C3036] bg-stage-2 p-3">
            <dt className="label-mono text-muted">BPM</dt>
            <dd className="mt-1 text-lg text-white">
              {genre.tempo.bpmMin}–{genre.tempo.bpmMax}
            </dd>
          </div>
          <div className="rounded-lg border border-[#2C3036] bg-stage-2 p-3">
            <dt className="label-mono text-muted">節拍網格</dt>
            <dd className="mt-1 text-lg text-white">{genre.tempo.grid}</dd>
          </div>
          {genre.tempo.note && (
            <div className="rounded-lg border border-[#2C3036] bg-stage-2 p-3">
              <dt className="label-mono text-muted">備註</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[#B7BDC4]">{genre.tempo.note}</dd>
            </div>
          )}
        </dl>
      </Section>

      <Section n={3} title="Pad 配置圖">
        <div className="grid gap-4 split:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-[14px] border border-[#2C3036] bg-stage-2 p-4">
            <MpcPanel targets={bankAPads} screen={{ t1: `${genre.titleEn.toUpperCase()}  BANK A` }} />
            <p className="label-mono mt-[10px] text-[#6B7178]">
              面板顯示 Bank A
              {hasOtherBanks && '，其他 Bank 見右邊清單'}
            </p>
          </div>
          <ul className="divide-y divide-[#2C3036] border-y border-[#2C3036]">
            {genre.padPlan.map((p) => (
              <li key={`${p.bank}-${p.pad}`} className="grid grid-cols-[86px_1fr] gap-3 py-2">
                <span className="font-mono text-[12px] font-bold text-akai">
                  {p.bank} · {p.pad.toUpperCase()}
                </span>
                <span className="text-sm leading-relaxed text-[#B7BDC4]">
                  <span className="text-white">{p.role}</span>
                  <span className="mt-[2px] block text-[13px] text-[#8D9299]">{p.source}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section n={4} title="鼓組結構拆解">
        <ul className="grid gap-3 sm:grid-cols-2">
          {genre.drums.map((d) => (
            <li key={d.name} className="rounded-lg border border-[#2C3036] bg-stage-2 p-3">
              <p className="text-base text-white">{d.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#B7BDC4]">落點：{d.timing}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#B7BDC4]">音色：{d.character}</p>
              {d.tip && <p className="mt-2 text-[13px] leading-relaxed text-akai">{d.tip}</p>}
            </li>
          ))}
        </ul>
      </Section>

      <Section n={5} title="取樣素材建議">
        <p className="mb-3 text-sm text-[#8D9299]">
          一律指向自錄或授權素材。不確定能不能用，先看 2-2。
        </p>
        <ul className="divide-y divide-[#2C3036] border-y border-[#2C3036]">
          {genre.samples.map((s) => (
            <li key={s.what} className="grid gap-1 py-3 split:grid-cols-[110px_1fr] split:gap-4">
              <span className="label-mono text-akai">{KIND_LABEL[s.kind] ?? s.kind}</span>
              <span className="text-sm leading-relaxed text-[#B7BDC4]">
                <span className="text-white">{s.what}</span>
                <span className="mt-[2px] block text-[#8D9299]">{s.how}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section n={6} title="需要幾次 Resample">
        {genre.resamples.length === 0 ? (
          <p className="text-sm text-[#B7BDC4]">這個曲風不需要 resample，直接做完。</p>
        ) : (
          <ol className="grid gap-2">
            {genre.resamples.map((r) => (
              <li key={r.pass} className="rounded-lg border border-[#2C3036] bg-stage-2 p-3">
                <p className="label-mono text-akai">第 {r.pass} 次</p>
                <p className="mt-1 text-sm leading-relaxed text-white">{r.what}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#8D9299]">收完之後：{r.frees}</p>
              </li>
            ))}
          </ol>
        )}
      </Section>

      <Section n={7} title="效果配方">
        <ul className="divide-y divide-[#2C3036] border-y border-[#2C3036]">
          {genre.fx.map((f) => (
            <li key={`${f.engine}-${f.name}`} className="grid gap-1 py-3 split:grid-cols-[110px_150px_1fr] split:gap-4">
              <span className="label-mono text-muted">{ENGINE_LABEL[f.engine] ?? f.engine}</span>
              <span className="font-mono text-[13px] font-bold text-white">{f.name}</span>
              <span className="text-sm leading-relaxed text-[#B7BDC4]">
                {f.setting}
                <span className="mt-[2px] block text-[#8D9299]">為什麼：{f.why}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section n={8} title="完成檢查點">
        <ul className="space-y-2">
          {genre.checkpoints.map((c) => (
            <li key={c} className="flex gap-3 text-sm leading-relaxed text-[#B7BDC4]">
              <span aria-hidden className="text-akai">
                ✓
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      {genre.miniPlayer && (
        <div className="mt-10">
          <GenreMiniPlayer title={genre.miniPlayer.title} steps={genre.miniPlayer.steps} />
        </div>
      )}

      {genre.videos && <VideoList videos={genre.videos} />}

      <section className="mt-10 border-t border-[#2C3036] pt-4">
        <h2 className="label-mono text-muted">資料來源</h2>
        <ul className="mt-2 space-y-1">
          {genre.sources.map((s) => (
            <li key={s} className="text-[13px] leading-relaxed text-muted">
              {s}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
