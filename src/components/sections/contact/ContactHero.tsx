'use client';

import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { gsap, useGSAP } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { TextReveal } from '@/components/animations/TextReveal';
import { Breadcrumb, type BreadcrumbItem } from '@/components/sections/Breadcrumb';

interface ContactHeroProps {
  readonly breadcrumbItems: readonly BreadcrumbItem[];
}

/**
 * Contact page hero section.
 * Renders the single H1 with primary keyword.
 * Left-aligned layout, shorter than homepage hero.
 */
export function ContactHero({ breadcrumbItems }: ContactHeroProps): React.JSX.Element {
  const locale = useLocale();
  const t = useTranslations('contact');
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
    <SectionWrapper theme="dark" id="contact-hero" className="py-16 md:py-24">
      <div className="max-w-3xl">
        <Breadcrumb items={breadcrumbItems} locale={locale} />

        <span
          ref={overlineRef}
          className="mb-4 inline-block text-xs uppercase text-[var(--section-text-muted)]"
          style={{ letterSpacing: '0.12em' }}
        >
          {t('hero.overline')}
        </span>

        <TextReveal
          as="h1"
          variant="word"
          trigger="scroll"
          triggerStart="top 85%"
          className="mb-6 text-[2.25rem] font-bold leading-[1.05] md:text-[3rem] lg:text-[4rem]"
        >
          {t('hero.headline')}
        </TextReveal>

        <p
          ref={descRef}
          className="max-w-2xl text-lg text-[var(--section-text-muted)] md:text-xl"
          style={{ fontFamily: 'var(--font-subheading)' }}
        >
          {t('hero.subheading')}
        </p>
      </div>
    </SectionWrapper>
  );
}
