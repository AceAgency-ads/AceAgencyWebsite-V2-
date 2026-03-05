'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

interface ServiceProcessProps {
  readonly serviceKey: string;
  readonly processImage?: string;
}

/**
 * Service-specific process steps section.
 * Vertical timeline layout with connecting line and numbered steps.
 */
export function ServiceProcess({ serviceKey, processImage }: ServiceProcessProps): React.JSX.Element {
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

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
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
      });

      // Reduced motion: make all process steps immediately visible
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(items, { opacity: 1, x: 0 });
      });
    },
    { scope: stepsRef }
  );

  return (
    <SectionWrapper theme="dark" id="service-process">
      <SectionHeader
        overline={t(`${serviceKey}.process.overline`)}
        heading={t(`${serviceKey}.process.heading`)}
      />

      {/* Mobile photo */}
      {processImage && (
        <div className="mb-8 overflow-hidden rounded-xl lg:hidden">
          <Image
            src={processImage}
            alt=""
            width={800}
            height={1000}
            className="h-auto max-h-[300px] w-full object-cover"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Process steps - left column */}
        <div className="lg:col-span-3">
          <div ref={stepsRef} className="relative ml-4 border-l border-white/20 pl-8 md:ml-8 md:pl-12">
            {steps.map((step, index) => (
              <div
                key={index}
                data-process-step
                className="relative pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[calc(2rem+0.375rem)] top-1 size-3 rounded-full bg-[#650CBE] md:-left-[calc(3rem+0.375rem)]"
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
        </div>

        {/* Process photo - right column (desktop only) */}
        {processImage && (
          <div className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={processImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 40vw"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
