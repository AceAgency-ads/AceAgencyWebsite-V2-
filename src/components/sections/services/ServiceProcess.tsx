'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

interface ServiceProcessProps {
  readonly serviceKey: string;
}

/**
 * Service-specific process steps section.
 * Vertical timeline layout with connecting line and numbered steps.
 */
export function ServiceProcess({ serviceKey }: ServiceProcessProps): React.JSX.Element {
  const t = useTranslations('services');
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = t.raw(`${serviceKey}.process.steps`) as ReadonlyArray<{
    title: string;
    description: string;
  }>;

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const items = stepsRef.current.querySelectorAll('[data-process-step]');
      if (items.length === 0) return;

      gsap.from(items, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === stepsRef.current)
          .forEach((st) => st.kill());
      };
    },
    { scope: stepsRef }
  );

  return (
    <SectionWrapper theme="dark" id="service-process">
      <SectionHeader
        overline={t(`${serviceKey}.process.overline`)}
        heading={t(`${serviceKey}.process.heading`)}
      />

      <div ref={stepsRef} className="relative ml-4 border-l border-white/20 pl-8 md:ml-8 md:pl-12">
        {steps.map((step, index) => (
          <div
            key={index}
            data-process-step
            className="relative pb-12 last:pb-0"
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-[calc(2rem+0.375rem)] top-1 size-3 rounded-full bg-[#56151A] md:-left-[calc(3rem+0.375rem)]"
              aria-hidden="true"
            />

            {/* Large decorative number */}
            <span
              className="mb-2 block text-5xl font-bold text-white/10 md:text-6xl"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
            <p className="max-w-xl text-sm text-[var(--section-text-muted)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
