'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

/**
 * Mission and Vision side-by-side section.
 * Two card-like columns with light-muted background,
 * vertical divider on desktop, stacked on mobile.
 * Left (Mission) fades up first, right (Vision) follows with 200ms delay.
 */
export function MissionVision(): React.JSX.Element {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!missionRef.current || !visionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Mission column fades up first
        gsap.from(missionRef.current!, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        // Vision column follows with 200ms delay
        gsap.from(visionRef.current!, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        return () => {
          ScrollTrigger.getAll()
            .filter((st) => st.trigger === sectionRef.current)
            .forEach((st) => st.kill());
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([missionRef.current!, visionRef.current!], {
          opacity: 1,
          y: 0,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <SectionWrapper theme="light" id="mission-vision">
      <div
        ref={sectionRef}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        {/* Mission */}
        <div
          ref={missionRef}
          className="rounded-xl bg-[var(--section-card-bg)] p-8 lg:border-r lg:border-[var(--section-border)]"
        >
          <span
            className="mb-3 inline-block text-xs font-medium uppercase"
            style={{
              letterSpacing: '0.12em',
              color: 'var(--ds-color-accent)',
            }}
          >
            {t('mission.overline')}
          </span>
          <h3 className="mb-4 text-2xl font-bold">{t('mission.heading')}</h3>
          <p className="text-lg text-[var(--section-text-muted)]">
            {t('mission.description')}
          </p>
        </div>

        {/* Vision */}
        <div
          ref={visionRef}
          className="rounded-xl bg-[var(--section-card-bg)] p-8"
        >
          <span
            className="mb-3 inline-block text-xs font-medium uppercase"
            style={{
              letterSpacing: '0.12em',
              color: 'var(--ds-color-accent)',
            }}
          >
            {t('vision.overline')}
          </span>
          <h3 className="mb-4 text-2xl font-bold">{t('vision.heading')}</h3>
          <p className="text-lg text-[var(--section-text-muted)]">
            {t('vision.description')}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
