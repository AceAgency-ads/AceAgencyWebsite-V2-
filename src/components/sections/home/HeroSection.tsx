'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { TextReveal } from '@/components/animations/TextReveal';
import { ParallaxLayer } from '@/components/animations/ParallaxLayer';

/**
 * Homepage Hero section with kinetic word-level typography,
 * dual CTAs, scroll indicator, and brand glow parallax effect.
 * Full viewport height, dark theme.
 */
export function HeroSection(): React.JSX.Element {
  const t = useTranslations('home');
  const overlineRef = useRef<HTMLSpanElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Overline fade-up on mount
      if (overlineRef.current) {
        gsap.from(overlineRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Subheading fade-up with 200ms delay after mount
      if (subheadingRef.current) {
        gsap.from(subheadingRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
        });
      }

      // CTAs fade-up with 400ms delay after mount
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
        });
      }

      // Scroll indicator infinite bounce
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: 'power1.inOut',
        });
      }
    });

    // Reduced motion: ensure everything is visible immediately
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const elements = [
        overlineRef.current,
        subheadingRef.current,
        ctaRef.current,
      ].filter(Boolean);
      gsap.set(elements, { opacity: 1, y: 0 });
    });
  });

  return (
    <SectionWrapper theme="dark" hero className="relative min-h-screen overflow-hidden">
      {/* Brand glow parallax background (desktop only) */}
      <ParallaxLayer speed={0.3} className="absolute inset-0 flex items-start justify-center">
        <div
          className="mt-[-100px] h-[600px] w-[600px] rounded-full opacity-30"
          style={{ background: 'var(--ds-gradient-brand-glow)' }}
        />
      </ParallaxLayer>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center lg:items-start lg:text-left">
        {/* Overline */}
        <span
          ref={overlineRef}
          className="mb-6 inline-block text-xs uppercase text-[var(--section-text-muted)]"
          style={{ letterSpacing: '0.12em' }}
        >
          {t('hero.overline')}
        </span>

        {/* Headline with word-level kinetic typography */}
        <TextReveal
          as="h1"
          variant="word"
          trigger="load"
          className="mb-6 max-w-4xl text-[2.75rem] font-bold leading-[1.05] md:text-[4rem] lg:text-[5rem]"
        >
          {t('hero.headline')}
        </TextReveal>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="mb-10 max-w-2xl text-lg text-[var(--section-text-muted)] md:text-xl"
          style={{ fontFamily: 'var(--font-subheading)' }}
        >
          {t('hero.subheading')}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="min-h-[3rem] bg-grey px-8 font-semibold text-black hover:bg-grey/90"
          >
            <Link href="/servicii">
              {t('hero.cta.primary')}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-h-[3rem] border-white/30 px-8 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/contact">{t('hero.cta.secondary')}</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div ref={scrollIndicatorRef}>
          <ChevronDown className="size-6 text-[var(--section-text-muted)]" />
        </div>
      </div>
    </SectionWrapper>
  );
}
