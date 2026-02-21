'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  Code,
  Target,
  Share2,
  Play,
  Search,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface ServiceDefinition {
  readonly icon: LucideIcon;
  readonly key: string;
  readonly href: string;
}

const SERVICES: readonly ServiceDefinition[] = [
  { icon: Code, key: '0', href: '/servicii' },
  { icon: Target, key: '1', href: '/servicii/google-ads' },
  { icon: Share2, key: '2', href: '/servicii/facebook-ads' },
  { icon: Play, key: '3', href: '/servicii/tiktok-ads' },
  { icon: Search, key: '4', href: '/servicii/seo' },
  { icon: Lightbulb, key: '5', href: '/servicii/consultanta-marketing' },
] as const;

/**
 * Homepage Services Preview — addifico style.
 * Desktop: Section pins, vertical scroll drives cards horizontally right-to-left.
 * Mobile: CSS overflow horizontal scroll (touch-friendly).
 * Semi-transparent dark bg, icon top-left, arrow top-right, title bottom.
 * Description reveals on hover via max-height transition.
 */
export function ServicesPreview(): React.JSX.Element {
  const t = useTranslations('home');
  const sectionRef = useRef<HTMLElement>(null);
  const cardRowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: GSAP horizontal scroll-on-scroll with pinning
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current;
      const cardRow = cardRowRef.current;
      if (!section || !cardRow) return;

      const totalScroll = cardRow.scrollWidth - cardRow.offsetWidth;

      const trigger = ScrollTrigger.create({
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
        animation: gsap.fromTo(cardRow,
          { x: 0 },
          { x: -totalScroll, ease: 'none' },
        ),
      });

      return () => {
        trigger.kill();
      };
    });
  });

  return (
    <SectionWrapper theme="dark" id="services-preview" ref={sectionRef}>
      <SectionHeader
        overline={t('services.overline')}
        heading={t('services.heading')}
        align="left"
      />

      {/* Card row wrapper — clips overflow on desktop */}
      <div className="lg:overflow-hidden">
        {/* Card row — CSS scroll on mobile, GSAP-driven on desktop */}
        <div
          ref={cardRowRef}
          className="-mx-2 flex gap-5 overflow-x-auto px-2 pb-4 snap-x snap-mandatory scrollbar-hide lg:overflow-visible lg:snap-none lg:pb-0 lg:will-change-transform"
        >
          {SERVICES.map(({ icon: Icon, key, href }) => (
            <Link
              key={key}
              href={href}
              data-animate="card"
              className="group flex h-[280px] w-[260px] flex-shrink-0 snap-start flex-col justify-between rounded-2xl border border-[#4a464380] bg-[#3a383680] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#56151A]/40 hover:shadow-[0_4px_20px_rgba(86,21,26,0.12)] sm:h-[300px] sm:w-[280px] lg:snap-align-none md:p-8"
            >
              {/* Top row: icon left, arrow right */}
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#56151A]/20 bg-[#56151A]/10">
                  <Icon
                    className="size-8 text-[#56151A]"
                    strokeWidth={1.5}
                  />
                </div>
                <ArrowUpRight className="size-5 text-[var(--section-text-muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#56151A]" />
              </div>

              {/* Title + description at bottom */}
              <div>
                <h4 className="text-lg font-semibold text-[var(--section-text)] md:text-xl">
                  {t(`services.items.${key}.title`)}
                </h4>
                {/* Description slides in on hover */}
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-20 group-hover:opacity-100">
                  <p className="text-sm text-[var(--section-text-muted)]">
                    {t(`services.items.${key}.description`)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA below cards */}
      <ScrollReveal className="mt-10 text-center">
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="border border-[var(--section-border)] text-[var(--section-text-muted)] hover:text-[var(--section-text)]"
        >
          <Link href="/servicii">
            {t('services.cta')}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </ScrollReveal>
    </SectionWrapper>
  );
}
