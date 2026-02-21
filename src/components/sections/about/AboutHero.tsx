'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { TextReveal } from '@/components/animations/TextReveal';
import { Breadcrumb, type BreadcrumbItem } from '@/components/sections/Breadcrumb';

interface AboutHeroProps {
  readonly breadcrumbItems?: readonly BreadcrumbItem[];
}

/**
 * About page hero section with word-level TextReveal headline,
 * brand glow positioned top-right, and fade-up subheading.
 * Inner page hero — smaller padding than homepage.
 */
export function AboutHero({ breadcrumbItems }: AboutHeroProps): React.JSX.Element {
  const t = useTranslations('about');
  const overlineRef = useRef<HTMLSpanElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

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

      if (subheadingRef.current) {
        gsap.from(subheadingRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          ease: 'power2.out',
        });
      }
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      const elements = [overlineRef.current, subheadingRef.current].filter(
        Boolean
      );
      gsap.set(elements, { opacity: 1, y: 0 });
    });
  });

  return (
    <SectionWrapper
      theme="dark"
      id="about-hero"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Brand glow — top-right position (different from homepage center) */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-25"
        style={{ background: 'var(--ds-gradient-brand-glow)' }}
        aria-hidden="true"
      />

      {/* Left-aligned content */}
      <div className="relative z-10 max-w-3xl">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}

        {/* Overline */}
        <span
          ref={overlineRef}
          className="mb-4 inline-block text-xs uppercase text-[var(--section-text-muted)]"
          style={{ letterSpacing: '0.12em' }}
        >
          {t('hero.overline')}
        </span>

        {/* Headline with word-level TextReveal */}
        <TextReveal
          as="h1"
          variant="word"
          trigger="scroll"
          triggerStart="top 85%"
          className="mb-6 text-[2.25rem] font-bold leading-[1.05] md:text-[3rem] lg:text-[4rem]"
        >
          {t('hero.headline')}
        </TextReveal>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="max-w-2xl text-lg text-[var(--section-text-muted)] md:text-xl"
          style={{ fontFamily: 'var(--font-subheading)' }}
        >
          {t('hero.subheading')}
        </p>
      </div>
    </SectionWrapper>
  );
}
