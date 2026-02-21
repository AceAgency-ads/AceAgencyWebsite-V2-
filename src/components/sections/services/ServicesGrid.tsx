'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { getServiceIcon } from '@/lib/service-icons';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SERVICE_DEFINITIONS } from '@/lib/services';

interface GridService {
  readonly slug: string;
  readonly i18nKey: string;
  readonly iconName: string;
  readonly isIndex?: boolean;
}

/**
 * Build the 7-item grid: Dezvoltare Web (index link) + 6 service definitions.
 * Immutable array construction.
 */
const GRID_SERVICES: readonly GridService[] = [
  { slug: '', i18nKey: 'web', iconName: 'Code', isIndex: true },
  ...SERVICE_DEFINITIONS.map((s) => ({
    slug: s.slug,
    i18nKey: s.i18nKey,
    iconName: s.iconName,
  })),
] as const;

/**
 * Services grid section for the index page.
 * 7 service cards in a bento grid layout with GSAP stagger animation.
 */
export function ServicesGrid(): React.JSX.Element {
  const t = useTranslations('services');
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('[data-card]');
      if (cards.length === 0) return;

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === gridRef.current)
          .forEach((st) => st.kill());
      };
    },
    { scope: gridRef }
  );

  return (
    <SectionWrapper theme="dark" id="services-grid">
      <SectionHeader
        overline={t('index.grid.overline')}
        heading={t('index.grid.heading')}
      />

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {GRID_SERVICES.map((service, index) => {
          const Icon = getServiceIcon(service.iconName);
          const href = service.isIndex ? '/servicii' : `/servicii/${service.slug}`;

          return (
            <Link
              key={service.i18nKey}
              href={href}
              className={`group block ${
                index < 2 ? 'lg:row-span-2' : ''
              }`}
              data-card
            >
              <SpotlightCard
                className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 transition-transform duration-300 group-hover:-translate-y-1"
              >
                {/* Icon */}
                <Icon
                  className="mb-4 size-12 text-[var(--section-text-muted)] transition-colors duration-300 group-hover:text-[#56151A]"
                  strokeWidth={1.5}
                />

                {/* Service name */}
                <h3 className="mb-2 text-xl font-bold">
                  {t(`index.grid.items.${index}.title`)}
                </h3>

                {/* Division badge */}
                <span className="mb-3 inline-block rounded-full bg-[#56151A]/20 px-3 py-0.5 text-xs text-[#56151A]">
                  {t(`index.grid.items.${index}.division`)}
                </span>

                {/* Description */}
                <p className="mb-4 text-sm text-[var(--section-text-muted)]">
                  {t(`index.grid.items.${index}.description`)}
                </p>

                {/* Arrow link indicator */}
                <ArrowRight className="size-5 text-[var(--section-text-muted)] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#56151A]" />
              </SpotlightCard>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
