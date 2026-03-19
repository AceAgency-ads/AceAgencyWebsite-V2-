'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';

interface BeforeAfterItem {
  readonly client: string;
  readonly industry: string;
  readonly metricBefore: string;
  readonly metricAfter: string;
  readonly metricSuffix: string;
  readonly metricLabel: string;
  readonly improvement: string;
  readonly summary: string;
}

const ITEM_KEYS = ['0', '1', '2'] as const;

/**
 * Before/After preview section — concrete results with animated metrics.
 * Shows before (muted) → after (violet + CountUp) with improvement badge.
 */
export function BeforeAfterPreview(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="light" id="before-after">
      <SectionHeader
        overline={t('beforeAfter.overline')}
        heading={t('beforeAfter.heading')}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ITEM_KEYS.map((key) => {
          const item = t.raw(`beforeAfter.items.${key}`) as BeforeAfterItem;

          return (
            <ScrollReveal key={key}>
              <article className="flex h-full flex-col rounded-3xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-10">
                {/* Industry pill */}
                <span className="mb-6 inline-block w-fit rounded-full bg-[#650CBE]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#650CBE]">
                  {item.industry}
                </span>

                {/* Client name */}
                <h3 className="mb-4 text-lg font-bold text-[var(--section-text)]">
                  {item.client}
                </h3>

                {/* Metric label */}
                <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[var(--section-text-muted)]">
                  {item.metricLabel}
                </p>

                {/* Before → After metrics */}
                <div className="mb-4 flex flex-wrap items-end gap-3">
                  {/* Before (muted) */}
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-[var(--section-text-muted)]">
                      {t('beforeAfter.labelBefore')}
                    </span>
                    <span className="text-2xl font-bold text-[var(--section-text-muted)] line-through decoration-1">
                      {item.metricBefore}{item.metricSuffix}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="mb-1 size-5 text-[var(--section-text-muted)]" />

                  {/* After (violet + animated) */}
                  <div className="flex flex-col">
                    <span className="text-xs uppercase text-[#650CBE]">
                      {t('beforeAfter.labelAfter')}
                    </span>
                    <span className="text-3xl font-bold text-[#650CBE] md:text-4xl">
                      <CountUp
                        end={Number(item.metricAfter)}
                        suffix={item.metricSuffix}
                        className="text-3xl font-bold text-[#650CBE] md:text-4xl"
                      />
                    </span>
                  </div>

                  {/* Improvement badge */}
                  <span className="mb-1 rounded-full bg-[#66F3A6]/20 px-3 py-1 text-sm font-bold text-[#0a8a3e]">
                    {item.improvement}
                  </span>
                </div>

                {/* Summary */}
                <p className="mt-auto text-sm text-[var(--section-text-muted)]">
                  {item.summary}
                </p>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      {/* CTA link */}
      <ScrollReveal className="mt-12 text-center">
        <Link
          href="/studii-de-caz"
          className="inline-flex items-center gap-2 text-lg font-semibold text-[#650CBE] transition-colors hover:text-[#7A1FD8]"
        >
          {t('beforeAfter.cta')}
          <ArrowRight className="size-5" />
        </Link>
      </ScrollReveal>
    </SectionWrapper>
  );
}
