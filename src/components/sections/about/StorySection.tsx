'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

/** Timeline milestone data for the decorative visual column. */
const MILESTONES = [
  { year: '2021', label: 'Fondare' },
  { year: '2023', label: 'Full-Service' },
  { year: '2025', label: 'AI Division' },
] as const;

/**
 * Agency story section with text paragraphs (left) and
 * abstract geometry + timeline visual (right).
 * Two-column layout on desktop, stacked on mobile.
 */
export function StorySection(): React.JSX.Element {
  const t = useTranslations('about');
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const paragraphs = t.raw('story.paragraphs') as readonly string[];

  useGSAP(
    () => {
      if (!paragraphsRef.current || !visualRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Paragraph stagger fade-up
        const pElements = paragraphsRef.current!.querySelectorAll(
          '[data-animate="paragraph"]'
        );
        if (pElements.length > 0) {
          gsap.from(pElements, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: paragraphsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }

        // Visual column fades in from right
        gsap.from(visualRef.current!, {
          x: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        // Floating geometric shapes
        const shapes =
          visualRef.current!.querySelectorAll('[data-animate="shape"]');
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: -10,
            yoyo: true,
            repeat: -1,
            duration: 3 + i * 0.7,
            ease: 'sine.inOut',
          });
        });

        // Timeline items stagger in
        const timelineItems = visualRef.current!.querySelectorAll(
          '[data-animate="milestone"]'
        );
        if (timelineItems.length > 0) {
          gsap.from(timelineItems, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }

        return () => {
          ScrollTrigger.getAll()
            .filter(
              (st) =>
                st.trigger === paragraphsRef.current ||
                st.trigger === visualRef.current
            )
            .forEach((st) => st.kill());
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const pElements = paragraphsRef.current!.querySelectorAll(
          '[data-animate="paragraph"]'
        );
        gsap.set(pElements, { opacity: 1, y: 0 });
        gsap.set(visualRef.current!, { opacity: 1, x: 0 });
      });
    },
    { scope: paragraphsRef }
  );

  return (
    <SectionWrapper theme="light" id="story">
      <SectionHeader
        overline={t('story.overline')}
        heading={t('story.heading')}
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Left column — text (60%) */}
        <div ref={paragraphsRef} className="lg:w-[60%]">
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                data-animate="paragraph"
                className="max-w-[65ch] text-lg text-[var(--section-text-muted)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right column — abstract geometry + timeline (40%) */}
        <div
          ref={visualRef}
          className="relative hidden min-h-[400px] lg:block lg:w-[40%]"
        >
          {/* Geometric shapes */}
          <div
            data-animate="shape"
            className="absolute left-8 top-4 h-[180px] w-[180px] rounded-full opacity-20"
            style={{ background: 'var(--ds-color-burgundy)' }}
            aria-hidden="true"
          />
          <div
            data-animate="shape"
            className="absolute right-4 top-24 h-[100px] w-[100px] rounded-lg opacity-30"
            style={{ background: 'var(--ds-color-grey)' }}
            aria-hidden="true"
          />
          <div
            data-animate="shape"
            className="absolute bottom-16 left-16 h-[80px] w-[80px] rounded-full opacity-25"
            style={{ background: 'var(--ds-color-black)' }}
            aria-hidden="true"
          />
          <div
            data-animate="shape"
            className="absolute bottom-32 right-12 h-[120px] w-[60px] rounded-lg opacity-15"
            style={{ background: 'var(--ds-color-burgundy)' }}
            aria-hidden="true"
          />

          {/* Timeline */}
          <div className="absolute left-1/2 top-12 flex h-[calc(100%-3rem)] -translate-x-1/2 flex-col items-center">
            {/* Vertical line */}
            <div
              className="absolute inset-y-0 w-px opacity-30"
              style={{ background: 'var(--ds-color-grey)' }}
              aria-hidden="true"
            />

            {/* Milestone labels */}
            <div className="relative flex h-full flex-col justify-around">
              {MILESTONES.map((milestone) => (
                <div
                  key={milestone.year}
                  data-animate="milestone"
                  className="flex items-center gap-3"
                >
                  {/* Dot */}
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: 'var(--ds-color-burgundy)' }}
                    aria-hidden="true"
                  />
                  <div className="whitespace-nowrap">
                    <span className="text-xs font-bold text-[var(--section-text)]">
                      {milestone.year}
                    </span>
                    <span className="ml-2 text-xs font-medium text-[var(--section-text-muted)]">
                      {milestone.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
