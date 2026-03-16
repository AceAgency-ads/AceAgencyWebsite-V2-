'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';
import type { CaseStudyMeta } from '@/types/content';

interface CaseStudyResultsProps {
  readonly caseStudies: readonly (CaseStudyMeta & { readonly readingTime: number })[];
}

/**
 * Horizontal scroll carousel of case study result cards.
 * Shows primary metric with CountUp animation, hero image, and CTAs.
 */
export function CaseStudyResults({ caseStudies }: CaseStudyResultsProps): React.JSX.Element | null {
  const t = useTranslations('services');
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 600;
    const gap = 24;
    const distance = cardWidth + gap;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  }, []);

  // Don't render section if no case studies available
  if (caseStudies.length === 0) return null;

  return (
    <SectionWrapper theme="dark" id="case-study-results">
      <div className="flex items-end justify-between">
        <SectionHeader
          overline={t('caseStudyResults.overline')}
          heading={t('caseStudyResults.heading')}
          align="left"
          className="mb-8 md:mb-10"
        />

        {/* Navigation arrows */}
        <ScrollReveal className="mb-8 flex gap-3 md:mb-10">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--section-border)] bg-[var(--section-card-bg)] text-[var(--section-text-muted)] transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)]"
            aria-label="Previous case study"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--section-border)] bg-[var(--section-card-bg)] text-[var(--section-text-muted)] transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)]"
            aria-label="Next case study"
          >
            <ChevronRight className="size-5" />
          </button>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-hide"
        role="region"
        aria-label="Case studies carousel"
        tabIndex={0}
      >
        {caseStudies.map((cs) => {
          const primaryMetric = cs.metrics[0];
          const metricValue = primaryMetric
            ? parseInt(primaryMetric.value, 10) || 0
            : 0;

          return (
            <article
              key={cs.slug}
              className="w-[85vw] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-[var(--section-border)] bg-[var(--section-card-bg)] sm:w-[600px] lg:w-[800px]"
            >
              {/* Mobile: stacked layout / Desktop: side-by-side */}
              <div className="flex flex-col lg:flex-row">
                {/* Hero image — aspect-[4/3] on mobile, fixed height on desktop */}
                <div className="relative aspect-[4/3] w-full flex-shrink-0 bg-[var(--section-border)] lg:aspect-auto lg:h-auto lg:w-1/2">
                  <Image
                    src={cs.heroImage}
                    alt={cs.heroImageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 600px, 400px"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between gap-6 p-6 lg:w-1/2 lg:p-8">
                  <div className="flex flex-col gap-4">
                    {/* Industry badge */}
                    <span className="w-fit rounded-full border border-[var(--section-accent)]/30 px-3 py-1 text-xs font-medium text-[var(--section-accent)]">
                      {cs.industry}
                    </span>

                    {/* Primary metric */}
                    {primaryMetric && (
                      <div>
                        <p className="text-4xl font-bold text-[var(--section-text)] lg:text-5xl">
                          {primaryMetric.prefix}
                          <CountUp end={metricValue} suffix={primaryMetric.suffix} />
                        </p>
                        <p className="mt-1 text-sm text-[var(--section-text-muted)]">
                          {primaryMetric.label}
                        </p>
                      </div>
                    )}

                    {/* Client name */}
                    <p className="text-base font-semibold text-[var(--section-text)]">
                      {cs.client}
                    </p>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/${locale}/studii-de-caz/${cs.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--section-accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      {t('caseStudyResults.viewCaseStudy')}
                    </Link>
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center justify-center rounded-full border border-[var(--section-border)] px-5 py-2.5 text-sm font-medium text-[var(--section-text)] transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)]"
                    >
                      {t('caseStudyResults.bookCall')}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
