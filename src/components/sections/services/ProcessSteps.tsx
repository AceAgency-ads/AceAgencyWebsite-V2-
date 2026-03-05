'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  MessageSquare,
  PenTool,
  Rocket,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

const STEP_ICONS: readonly LucideIcon[] = [
  MessageSquare,
  PenTool,
  Rocket,
  BarChart3,
] as const;

/**
 * "Cum Lucram" / "How We Work" section for the services index page.
 * 4 numbered steps with icons, connected by dotted lines on desktop.
 * Vertical timeline on mobile.
 */
export function ProcessSteps(): React.JSX.Element {
  const t = useTranslations('services');
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll('[data-step]');
      if (steps.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(steps, {
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
        gsap.set(steps, { opacity: 1, x: 0 });
      });
    },
    { scope: stepsRef }
  );

  return (
    <SectionWrapper theme="light" id="process">
      <SectionHeader
        overline={t('index.process.overline')}
        heading={t('index.process.heading')}
        description={t('index.process.description')}
      />

      {/* Process overview photo */}
      <div className="mb-10 overflow-hidden rounded-xl">
        <Image
          src="/images/services/process-overview.webp"
          alt=""
          width={1400}
          height={500}
          className="h-auto max-h-[280px] w-full object-cover"
          sizes="(max-width: 768px) 100vw, 90vw"
          aria-hidden="true"
        />
      </div>

      <div
        ref={stepsRef}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        {STEP_ICONS.map((Icon, index) => (
          <div
            key={index}
            data-step
            className="group relative flex flex-col items-start gap-4 pl-8 lg:items-center lg:pl-0 lg:text-center"
          >
            {/* Vertical line on mobile */}
            {index < STEP_ICONS.length - 1 && (
              <div
                className="absolute left-3 top-16 h-full w-px border-l border-dashed border-[var(--section-text-muted)]/30 lg:hidden"
                aria-hidden="true"
              />
            )}

            {/* Horizontal connector on desktop */}
            {index < STEP_ICONS.length - 1 && (
              <div
                className="absolute right-0 top-8 hidden h-px w-full border-t border-dashed border-[var(--section-text-muted)]/30 lg:block"
                style={{ left: '60%', width: '80%' }}
                aria-hidden="true"
              />
            )}

            {/* Large decorative number */}
            <span className="text-6xl font-bold text-[#650CBE]/20 transition-opacity duration-300 group-hover:text-[#650CBE]/40 lg:text-7xl">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Icon */}
            <Icon
              className="size-8 text-[var(--section-text-muted)] transition-colors duration-300 group-hover:text-[#650CBE]"
              strokeWidth={1.5}
            />

            {/* Title */}
            <h3 className="text-lg font-bold">
              {t(`index.process.steps.${index}.title`)}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--section-text-muted)]">
              {t(`index.process.steps.${index}.description`)}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
