import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Overline } from '@/components/ui/Overline';

interface ResultItem {
  before: string;
  after: string;
  label: string;
  delta: string;
}

interface ChartBar {
  month: string;
  roas: string;
}

interface ResultsSectionProps {
  namespace: string;
}

/**
 * Case-study results section. Two stacked blocks:
 *
 *  1. Four before/after rows (label + before crossed-out + arrow + after).
 *  2. Optional monthly bar chart — pure CSS bars sized by parsing the
 *     numeric portion of the `roas` string ("8.11×" -> 8.11). Bar values
 *     are used for relative widths only; the displayed label is verbatim.
 *
 * If the i18n source lacks a `chart`, the chart block is skipped silently.
 */
export function ResultsSection({
  namespace,
}: ResultsSectionProps): React.JSX.Element {
  const t = useTranslations(`${namespace}.results`);
  const items = t.raw('items') as readonly ResultItem[];
  // `t.raw('chart')` throws on missing — we want to silently skip the chart
  // for case studies that don't ship one. Read the parent and pluck instead.
  const tParent = useTranslations(namespace);
  const resultsRaw = tParent.raw('results') as
    | { chart?: { label: string; bars: readonly ChartBar[] } | null }
    | undefined;
  const chart = resultsRaw?.chart ?? undefined;
  const chartLabel = chart?.label;
  const bars = chart?.bars;

  const numericValues = (bars ?? []).map((b) => parseFloat(b.roas) || 0);
  const max = numericValues.length ? Math.max(...numericValues) : 1;

  return (
    <section
      id="results"
      className="bg-white px-4 py-20 text-[#262523] sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-3xl">
          <Overline className="mb-4">{t('overline')}</Overline>
          <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            {t.rich('h2', {
              accent: (chunks: ReactNode) => (
                <span className="text-[#56151A]">{chunks}</span>
              ),
            })}
          </h2>
        </div>

        {/* Before -> After grid */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {items.map((it, i) => (
            <li
              key={i}
              className="flex items-center gap-5 rounded-2xl border border-[#E8E6E3] bg-[#FAF9F7] p-6 transition-colors hover:border-[#56151A]/40 sm:p-7"
            >
              <div className="flex flex-1 items-baseline gap-3">
                <span className="font-heading text-[28px] font-bold leading-none text-[#262523]/45 line-through decoration-2">
                  {it.before}
                </span>
                <span aria-hidden="true" className="text-[#56151A]/60">
                  →
                </span>
                <span className="font-heading text-[36px] font-bold leading-none text-[#56151A]">
                  {it.after}
                </span>
              </div>
              <div className="text-right">
                <div className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[#71706E]">
                  {it.label}
                </div>
                <div className="mt-1 font-body text-[13px] font-semibold text-[#56151A]">
                  {it.delta}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Monthly bar chart */}
        {bars && bars.length > 0 ? (
          <div className="mt-14 rounded-2xl border border-[#E8E6E3] bg-[#FAF9F7] p-7 sm:p-10">
            <div className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#71706E]">
              {chartLabel}
            </div>
            <div className="mt-8 grid grid-cols-4 gap-4 sm:gap-8">
              {bars.map((bar, i) => {
                const v = numericValues[i] ?? 0;
                const heightPct = max > 0 ? Math.max(8, (v / max) * 100) : 0;
                return (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="flex h-[160px] w-full items-end">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-[#56151A] to-[#C4394A] transition-all duration-700"
                        style={{ height: `${heightPct}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="font-heading text-[18px] font-bold leading-none text-[#56151A]">
                      {bar.roas}
                    </div>
                    <div className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#71706E]">
                      {bar.month}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
