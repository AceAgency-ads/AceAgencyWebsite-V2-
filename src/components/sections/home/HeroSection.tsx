'use client';

import { useRef, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { TextReveal } from '@/components/animations/TextReveal';
import { ParallaxLayer } from '@/components/animations/ParallaxLayer';

/**
 * Homepage Hero section — addifico style.
 * Full viewport, dark bg with dramatic burgundy radial gradient glow (left side),
 * massive centered headline with accent-colored keywords, subtitle above.
 * Pinned for one viewport height with scroll-driven exit animations.
 *
 * All scroll-driven animations use fromTo() with scrub for full reversibility.
 */
export function HeroSection(): React.JSX.Element {
  const t = useTranslations('home');
  const sectionRef = useRef<HTMLElement>(null);
  const overlineRef = useRef<HTMLSpanElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current;
      if (!section) return;

      // --- Initial state: hide elements before entry animation ---
      const entryElements = [
        overlineRef.current,
        subheadingRef.current,
        ctaRef.current,
      ].filter(Boolean);

      gsap.set(entryElements, { opacity: 0, y: 20 });

      // --- Entry animations (play once on mount) ---
      // Use gsap.to() so final state is explicitly { opacity: 1, y: 0 }
      if (overlineRef.current) {
        gsap.to(overlineRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        });
      }

      if (subheadingRef.current) {
        gsap.to(subheadingRef.current, {
          opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out',
        });
      }

      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power2.out',
        });
      }

      if (scrollIndicatorRef.current) {
        gsap.set(scrollIndicatorRef.current, { opacity: 1 });
        gsap.to(scrollIndicatorRef.current, {
          y: 10, repeat: -1, yoyo: true, duration: 1.5, ease: 'power1.inOut',
        });
      }

      // --- Pinned scroll-driven exit animations ---
      // All use fromTo() with explicit start/end values for full reversibility.

      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
      });

      const scrollConfig: ScrollTrigger.Vars = {
        trigger: section,
        start: 'top top',
        end: '+=100%',
        scrub: 0.5,
      };

      // Overline exits first
      if (overlineRef.current) {
        gsap.fromTo(overlineRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -60, scrollTrigger: scrollConfig },
        );
      }

      // Headline words split left/right
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.split-text-word');
        if (words.length > 0) {
          const mid = Math.ceil(words.length / 2);
          const leftWords = Array.from(words).slice(0, mid);
          const rightWords = Array.from(words).slice(mid);

          gsap.fromTo(leftWords,
            { x: 0, y: 0, opacity: 1 },
            { x: -120, y: -50, opacity: 0, scrollTrigger: scrollConfig },
          );

          gsap.fromTo(rightWords,
            { x: 0, y: 0, opacity: 1 },
            { x: 120, y: 50, opacity: 0, scrollTrigger: scrollConfig },
          );
        }
      }

      // CTAs exit
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: 60, scrollTrigger: scrollConfig },
        );
      }

      // Subheading exits LAST — delayed start via timeline position offset.
      // Uses a timeline so the subheading only begins fading at ~30% scroll progress.
      if (subheadingRef.current) {
        const subheadingTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            scrub: 0.5,
          },
        });

        // Hold subheading visible for first 30% of scroll, then fade out over remaining 70%
        subheadingTl.fromTo(subheadingRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -40, duration: 0.7 },
          0.3, // start at 30% of timeline
        );
      }

      // Glow scales up
      if (glowRef.current) {
        gsap.fromTo(glowRef.current,
          { scale: 1 },
          { scale: 1.6, scrollTrigger: scrollConfig },
        );
      }

      // Scroll indicator fades out early
      if (scrollIndicatorRef.current) {
        gsap.fromTo(scrollIndicatorRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=20%',
              scrub: 0.5,
            },
          },
        );
      }

      return () => {
        pinTrigger.kill();
      };
    });

    // --- Mobile: reduce parallax distances ---
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current;
      if (!section || !headlineRef.current) return;

      const words = headlineRef.current.querySelectorAll('.split-text-word');
      if (words.length > 0) {
        const mid = Math.ceil(words.length / 2);
        const leftWords = Array.from(words).slice(0, mid);
        const rightWords = Array.from(words).slice(mid);

        const mobileConfig: ScrollTrigger.Vars = {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          scrub: 0.5,
        };

        gsap.fromTo(leftWords,
          { x: 0, y: 0, opacity: 1 },
          { x: -60, y: -25, opacity: 0, scrollTrigger: mobileConfig },
        );

        gsap.fromTo(rightWords,
          { x: 0, y: 0, opacity: 1 },
          { x: 60, y: 25, opacity: 0, scrollTrigger: mobileConfig },
        );
      }
    });

    // Reduced motion: no pinning, no animations
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
    <SectionWrapper
      theme="dark"
      hero
      rounded={false}
      className="relative min-h-screen overflow-hidden"
      ref={sectionRef}
    >
      {/* Dramatic burgundy radial gradient glow — left side */}
      <ParallaxLayer speed={0.3} className="absolute inset-0">
        <div
          ref={glowRef}
          className="absolute -left-[10%] top-1/4 h-[800px] w-[800px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(86, 21, 26, 0.40), rgba(86, 21, 26, 0.10) 40%, transparent 70%)',
          }}
        />
        {/* Secondary subtle glow — right side */}
        <div
          className="absolute -right-[15%] bottom-[10%] h-[400px] w-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(86, 21, 26, 0.30), transparent 70%)',
          }}
        />
      </ParallaxLayer>

      {/* Hero content — centered */}
      <div className="relative z-10 flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
        {/* Overline */}
        <span
          ref={overlineRef}
          className="mb-8 inline-block text-xs uppercase tracking-[0.18em] text-[var(--section-text-muted)]"
        >
          {t('hero.overline')}
        </span>

        {/* Massive headline with accent-colored keywords */}
        <div ref={headlineRef}>
          <TextReveal
            as="h1"
            variant="word"
            trigger="load"
            className="mb-8 max-w-5xl text-[3rem] font-bold leading-[0.94] md:text-[5rem] lg:text-[6rem]"
          >
            {t.rich('hero.headline', {
              accent: (chunks: ReactNode) => (
                <span className="text-[#7A2025]">{chunks}</span>
              ),
            })}
          </TextReveal>
        </div>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="mb-12 max-w-2xl text-lg text-[var(--section-text-muted)] md:text-xl"
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
            className="min-h-[3rem] rounded-full bg-[#56151A] px-8 font-semibold text-white hover:bg-[#7A2025]"
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
            className="min-h-[3rem] rounded-full border-[#D9D9D9]/30 px-8 text-[#D9D9D9] hover:bg-[#D9D9D9]/10 hover:text-white"
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
