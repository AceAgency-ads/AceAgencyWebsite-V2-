'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';

interface CaseStudyItem {
  readonly client: string;
  readonly industry: string;
  readonly metric: string;
  readonly metricPrefix: string;
  readonly metricSuffix: string;
  readonly metricLabel: string;
  readonly summary: string;
}

const CASE_STUDY_KEYS = ['0', '1', '2'] as const;

/**
 * Case study preview section — concrete results with animated metrics.
 * Light theme, 3-card grid with CountUp animations and industry pills.
 */
export function CaseStudyPreview(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="light" id="case-studies">
      <SectionHeader
        overline={t('caseStudies.overline')}
        heading={t('caseStudies.heading')}
        description={t('caseStudies.description')}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CASE_STUDY_KEYS.map((key) => {
          const item = t.raw(`caseStudies.items.${key}`) as CaseStudyItem;

          return (
            <ScrollReveal key={key}>
              <article className="flex h-full flex-col rounded-3xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-10">
                {/* Industry pill */}
                <span className="mb-6 inline-block w-fit rounded-full bg-[#650CBE]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#650CBE]">
                  {item.industry}
                </span>

                {/* Large animated metric */}
                <div className="mb-2">
                  <span className="text-4xl font-bold text-[#650CBE] md:text-5xl">
                    {item.metricPrefix}
                    <CountUp
                      end={Number(item.metric)}
                      suffix={item.metricSuffix}
                      className="text-4xl font-bold text-[#650CBE] md:text-5xl"
                    />
                  </span>
                </div>

                {/* Metric label */}
                <p className="mb-4 text-sm font-medium uppercase tracking-wide text-[var(--section-text-muted)]">
                  {item.metricLabel}
                </p>

                {/* Client name */}
                <h3 className="mb-2 text-lg font-bold text-[var(--section-text)]">
                  {item.client}
                </h3>

                {/* Summary */}
                <p className="mb-6 flex-1 text-sm text-[var(--section-text-muted)]">
                  {item.summary}
                </p>

                {/* Arrow link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-[#650CBE] transition-colors hover:text-[#7A1FD8]">
                  <ArrowRight className="size-4" />
                </div>
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
          {t('caseStudies.cta')}
          <ArrowRight className="size-5" />
        </Link>
      </ScrollReveal>
    </SectionWrapper>
  );
}
