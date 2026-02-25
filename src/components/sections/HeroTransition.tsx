'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLHRElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Set initial states
        gsap.set(separatorRef.current, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(labelRef.current, { opacity: 0, y: 30 });
        gsap.set(headingRef.current, { opacity: 0, y: 40 });

        // Separator line grows from left
        gsap.to(separatorRef.current, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: separatorRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        // Label fades in + slides up
        gsap.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: labelRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        // Heading fades in + slides up (slight delay feel via later trigger)
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Reduced motion: ensure everything is visible
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([separatorRef.current, labelRef.current, headingRef.current], {
          opacity: 1,
          y: 0,
          scaleX: 1,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <SectionWrapper theme="dark" rounded={false} className="-mt-4 pt-0 md:-mt-6">
      <div ref={containerRef}>
      {/* Thin separator line */}
      <hr ref={separatorRef} className="mb-8 border-[var(--section-text-muted)]/20 md:mb-10" />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: label + heading */}
        <div>
          <span
            ref={labelRef}
            className="mb-4 inline-block text-xs uppercase text-[var(--section-text-muted)]"
            style={{ letterSpacing: '0.12em' }}
          >
            {t(`${i18nPrefix}.label`)}
          </span>
          <h2
            ref={headingRef}
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
            as="div"
          >
            {t(`${i18nPrefix}.description`)}
          </ScrubReveal>
        </div>
      </div>
      </div>
    </SectionWrapper>
  );
}
