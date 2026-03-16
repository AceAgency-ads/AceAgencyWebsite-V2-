'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';
import type { CaseStudyMetric } from '@/types/content';

interface CaseStudyMetricsProps {
  readonly metrics: readonly CaseStudyMetric[];
}

/**
 * Horizontal bar showing all case study metrics with CountUp animations.
 * Each metric: prefix + CountUp(value) + suffix on first line, label below.
 * Client component due to CountUp GSAP dependency.
 */
export function CaseStudyMetrics({ metrics }: CaseStudyMetricsProps): React.JSX.Element {
  return (
    <ScrollReveal>
      <div className="flex flex-wrap justify-center gap-8 rounded-2xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-8 md:gap-12">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col items-center text-center">
            <div className="text-3xl font-bold text-[#650CBE] md:text-4xl">
              {metric.prefix}
              <CountUp
                end={Number(metric.value)}
                suffix={metric.suffix}
                className="text-3xl font-bold text-[#650CBE] md:text-4xl"
              />
            </div>
            <p className="mt-1 max-w-[140px] text-xs font-medium uppercase tracking-wide text-[var(--section-text-muted)]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
