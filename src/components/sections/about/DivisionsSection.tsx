'use client';

import { useTranslations } from 'next-intl';
import { Code, Target, Brain, Camera, type LucideIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { BentoGrid } from '@/components/sections/BentoGrid';

/** Icon mapping from division name to Lucide component. */
const DIVISION_ICONS: Readonly<Record<string, LucideIcon>> = {
  Code,
  Target,
  Brain,
  Camera,
} as const;

/** Links from division to corresponding service page. */
const DIVISION_LINKS: Readonly<Record<string, string>> = {
  AceWeb: '/servicii',
  AceAds: '/servicii/google-ads',
  AceAI: '/servicii/consultanta-marketing',
  AceMedia: '/servicii/email-marketing',
} as const;

interface DivisionItem {
  readonly icon: string;
  readonly name: string;
  readonly focus: string;
  readonly description: string;
}

/**
 * Divisions section with 4 feature cards in a 4-column bento grid.
 * Each card links to the respective service page.
 * Uses dark-elevated background to differentiate from adjacent dark sections.
 */
export function DivisionsSection(): React.JSX.Element {
  const t = useTranslations('about');
  const items = t.raw('divisions.items') as readonly DivisionItem[];

  return (
    <SectionWrapper
      theme="dark"
      id="divisions"
      className="bg-[var(--ds-color-dark-elevated)]"
    >
      <SectionHeader
        overline={t('divisions.overline')}
        heading={t('divisions.heading')}
        description={t('divisions.description')}
      />

      <BentoGrid columns={4}>
        {items.map((item, index) => {
          const IconComponent = DIVISION_ICONS[item.icon];
          const href = DIVISION_LINKS[item.name] ?? '/servicii';

          return (
            <Link
              key={index}
              href={href}
              data-animate="card"
              className="group block rounded-xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--ds-shadow-burgundy)] md:p-8"
            >
              {IconComponent && (
                <IconComponent
                  size={48}
                  className="mb-4 text-[var(--section-text-muted)] transition-colors duration-300 group-hover:text-[var(--section-accent)]"
                  aria-hidden="true"
                />
              )}
              <h3 className="mb-1 text-xl font-bold">{item.name}</h3>
              <p
                className="mb-3 text-sm font-medium"
                style={{ color: 'var(--ds-color-burgundy-light)' }}
              >
                {item.focus}
              </p>
              <p className="text-sm text-[var(--section-text-muted)]">
                {item.description}
              </p>
            </Link>
          );
        })}
      </BentoGrid>
    </SectionWrapper>
  );
}
