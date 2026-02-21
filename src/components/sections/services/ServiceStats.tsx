'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CountUp } from '@/components/animations/CountUp';

interface ServiceStatsProps {
  readonly serviceKey: string;
}

/**
 * Service-specific metrics/stats section.
 * 4 stat items with CountUp animation in a responsive grid.
 */
export function ServiceStats({ serviceKey }: ServiceStatsProps): React.JSX.Element {
  const t = useTranslations('services');

  const items = t.raw(`${serviceKey}.stats.items`) as ReadonlyArray<{
    value: string;
    suffix: string;
    label: string;
  }>;

  return (
    <SectionWrapper theme="dark" id="service-stats">
      <SectionHeader
        overline={t(`${serviceKey}.stats.overline`)}
        heading={t(`${serviceKey}.stats.heading`)}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <CountUp
              end={Number(item.value)}
              suffix={item.suffix}
              className="text-4xl font-bold text-[#56151A] md:text-5xl"
            />
            <p className="mt-3 text-sm text-[var(--section-text-muted)]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
