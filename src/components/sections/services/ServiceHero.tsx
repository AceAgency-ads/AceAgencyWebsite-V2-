'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP } from '@/lib/gsap';
import { getServiceIcon } from '@/lib/service-icons';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { TextReveal } from '@/components/animations/TextReveal';

interface ServiceHeroProps {
  readonly serviceKey: string;
  readonly iconName: string;
}

/**
 * Service sub-page hero section.
 * Renders the ONLY h1 on the sub-page with the primary keyword.
 * Follows AboutHero pattern with service icon decorative element.
 */
export function ServiceHero({ serviceKey, iconName }: ServiceHeroProps): React.JSX.Element {
  const Icon = getServiceIcon(iconName);
  const t = useTranslations('services');
  const overlineRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (overlineRef.current) {
        gsap.from(overlineRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      if (descRef.current) {
        gsap.from(descRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          ease: 'power2.out',
        });
      }
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      const elements = [overlineRef.current, descRef.current].filter(Boolean);
      gsap.set(elements, { opacity: 1, y: 0 });
    });
  });

  return (
    <SectionWrapper
      theme="dark"
      id="service-hero"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Brand glow -- top-right decorative */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-25"
        style={{ background: 'var(--ds-gradient-brand-glow)' }}
        aria-hidden="true"
      />

      {/* Service icon -- top-right decorative */}
      <Icon
        className="pointer-events-none absolute right-8 top-8 size-16 text-[var(--section-text-muted)] opacity-20 md:right-16 md:top-16 md:size-24"
        strokeWidth={1}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl">
        {/* Overline */}
        <span
          ref={overlineRef}
          className="mb-4 inline-block text-xs uppercase text-[var(--section-text-muted)]"
          style={{ letterSpacing: '0.12em' }}
        >
          {t(`${serviceKey}.hero.overline`)}
        </span>

        {/* Headline with word-level TextReveal -- contains primary keyword */}
        <TextReveal
          as="h1"
          variant="word"
          trigger="scroll"
          triggerStart="top 85%"
          className="mb-6 text-[2.25rem] font-bold leading-[1.05] md:text-[3rem] lg:text-[4rem]"
        >
          {t(`${serviceKey}.hero.headline`)}
        </TextReveal>

        {/* Description */}
        <p
          ref={descRef}
          className="max-w-2xl text-lg text-[var(--section-text-muted)] md:text-xl"
          style={{ fontFamily: 'var(--font-subheading)' }}
        >
          {t(`${serviceKey}.hero.description`)}
        </p>
      </div>
    </SectionWrapper>
  );
}
