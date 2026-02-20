'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CountUp } from '@/components/animations/CountUp';

/** Stat item shape from i18n. */
interface StatItem {
  readonly value: string;
  readonly suffix: string;
  readonly label: string;
}

/** Stat keys matching the i18n object. */
const STAT_KEYS = ['0', '1', '2', '3'] as const;

/**
 * Stats section with animated count-up numbers triggered on scroll.
 * Shows 4 stats (150+, 50+, 98%, 5 yrs) in a responsive grid.
 * Light theme with optional vertical dividers on desktop.
 */
export function StatsSection(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="light" id="stats">
      <SectionHeader
        overline={t('stats.overline')}
        heading={t('stats.heading')}
        align="center"
      />

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
        {STAT_KEYS.map((key, index) => {
          const item = t.raw(`stats.items.${key}`) as StatItem;
          const isLast = index === STAT_KEYS.length - 1;

          return (
            <div
              key={key}
              className={`flex flex-col items-center text-center ${
                !isLast ? 'lg:border-r lg:border-[var(--section-border)]' : ''
              }`}
            >
              <CountUp
                end={Number(item.value)}
                suffix={item.suffix}
                className="text-4xl font-bold text-burgundy md:text-5xl lg:text-6xl"
              />
              <span className="mt-2 text-sm text-[var(--section-text-muted)]">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
