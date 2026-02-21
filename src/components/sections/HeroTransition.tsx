'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { ScrubReveal } from '@/components/animations/ScrubReveal';

interface HeroTransitionProps {
  /** i18n namespace, e.g. 'home', 'about', 'services' */
  readonly namespace: string;
  /** Key prefix within namespace, e.g. 'heroTransition' or 'googleAds.heroTransition' */
  readonly i18nPrefix: string;
}

/**
 * Split section placed between hero and first content section.
 * Left: small label + large heading. Right: word-by-word scroll-scrubbed paragraph.
 * Follows the addifico.com pattern of scroll-driven text reveal.
 */
export function HeroTransition({
  namespace,
  i18nPrefix,
}: HeroTransitionProps): React.JSX.Element {
  const t = useTranslations(namespace);

  return (
    <SectionWrapper theme="dark" rounded={false} className="-mt-4 pt-0 md:-mt-6">
      {/* Thin separator line */}
      <hr className="mb-8 border-[var(--section-text-muted)]/20 md:mb-10" />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: label + heading */}
        <div>
          <span
            className="mb-4 inline-block text-xs uppercase text-[var(--section-text-muted)]"
            style={{ letterSpacing: '0.12em' }}
          >
            {t(`${i18nPrefix}.label`)}
          </span>
          <h2
            className="text-[2rem] font-bold leading-[1.1] md:text-[2.5rem] lg:text-[3.5rem]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t(`${i18nPrefix}.heading`)}
          </h2>
        </div>

        {/* Right: word-by-word scrub reveal */}
        <div className="flex items-end">
          <ScrubReveal
            variant="word"
            className="text-xl text-[var(--section-text-muted)] md:text-2xl lg:text-3xl"
            as="p"
          >
            {t(`${i18nPrefix}.description`)}
          </ScrubReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
