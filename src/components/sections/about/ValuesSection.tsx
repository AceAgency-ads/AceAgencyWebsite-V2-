'use client';

import { useTranslations } from 'next-intl';
import {
  Target,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Heart,
  type LucideIcon,
} from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { BentoGrid } from '@/components/sections/BentoGrid';

/** Icon mapping from i18n icon key to Lucide component. */
const ICON_MAP: Readonly<Record<string, LucideIcon>> = {
  Target,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Heart,
} as const;

interface ValueItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

/**
 * Values section with 6 value cards in a 3-column bento grid.
 * Each card has an icon, title, and description with hover lift effect.
 */
export function ValuesSection(): React.JSX.Element {
  const t = useTranslations('about');
  const items = t.raw('values.items') as readonly ValueItem[];

  return (
    <SectionWrapper theme="dark" id="values">
      <SectionHeader
        overline={t('values.overline')}
        heading={t('values.heading')}
        align="center"
      />

      <BentoGrid columns={3}>
        {items.map((item, index) => {
          const IconComponent = ICON_MAP[item.icon];

          return (
            <div
              key={index}
              data-animate="card"
              className="rounded-xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--section-accent)]"
            >
              {IconComponent && (
                <IconComponent
                  size={32}
                  className="mb-4 text-[var(--section-text-muted)]"
                  aria-hidden="true"
                />
              )}
              <h4 className="mb-2 text-lg font-bold">{item.title}</h4>
              <p className="text-sm text-[var(--section-text-muted)]">
                {item.description}
              </p>
            </div>
          );
        })}
      </BentoGrid>
    </SectionWrapper>
  );
}
