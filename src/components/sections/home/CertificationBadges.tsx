'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

const BADGE_KEYS = ['0', '1', '2', '3', '4'] as const;

/**
 * Certification badges grid — dark section with grayscale → color on hover.
 * Follows ClientLogoBar pattern. Displays partner certification logos.
 */
export function CertificationBadges(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="dark" id="certifications" rounded={false}>
      <div className="text-center">
        <span
          className="mb-4 inline-block text-xs uppercase text-[var(--section-text-muted)]"
          style={{ letterSpacing: '0.12em' }}
        >
          {t('certifications.overline')}
        </span>
        <h2 className="mb-10 text-2xl font-bold md:text-3xl">
          {t('certifications.heading')}
        </h2>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {BADGE_KEYS.map((key) => {
          const badge = t.raw(`certifications.badges.${key}`) as {
            name: string;
            src: string;
          };

          return (
            <div
              key={key}
              className="flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={badge.src}
                alt={badge.name}
                width={140}
                height={60}
                className="h-12 w-auto md:h-14"
              />
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
