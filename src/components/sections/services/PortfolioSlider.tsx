'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/** Portfolio item shape from i18n. */
interface PortfolioItem {
  readonly src: string;
  readonly alt: string;
  readonly client: string;
  readonly url: string;
  readonly services: readonly string[];
}

const PORTFOLIO_KEYS = ['0', '1', '2'] as const;

interface PortfolioSliderProps {
  readonly serviceSlug: string;
}

/**
 * Horizontal scroll carousel showing portfolio screenshots filtered by service.
 * CSS scroll-snap, prev/next navigation buttons.
 */
export function PortfolioSlider({ serviceSlug }: PortfolioSliderProps): React.JSX.Element {
  const t = useTranslations('services');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 500;
    const gap = 24;
    const distance = cardWidth + gap;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  }, []);

  // Collect filtered items
  const filteredItems = PORTFOLIO_KEYS
    .map((key) => ({ key, item: t.raw(`portfolio.items.${key}`) as PortfolioItem }))
    .filter(({ item }) => item.services.includes(serviceSlug));

  // Fall back to all items if none match
  const displayItems = filteredItems.length > 0
    ? filteredItems
    : PORTFOLIO_KEYS.map((key) => ({ key, item: t.raw(`portfolio.items.${key}`) as PortfolioItem }));

  return (
    <SectionWrapper theme="light" id="portfolio-slider">
      <div className="flex items-end justify-between">
        <SectionHeader
          overline={t('portfolio.overline')}
          heading={t('portfolio.heading')}
          align="left"
          className="mb-8 md:mb-10"
        />

        {/* Navigation arrows */}
        <ScrollReveal className="mb-8 flex gap-3 md:mb-10">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--section-border)] bg-[var(--section-card-bg)] text-[var(--section-text-muted)] transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)]"
            aria-label="Previous portfolio item"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--section-border)] bg-[var(--section-card-bg)] text-[var(--section-text-muted)] transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)]"
            aria-label="Next portfolio item"
          >
            <ChevronRight className="size-5" />
          </button>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-hide"
        role="region"
        aria-label="Portfolio carousel"
        tabIndex={0}
      >
        {displayItems.map(({ key, item }) => (
          <article
            key={key}
            className="w-[85vw] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-[var(--section-border)] bg-[var(--section-card-bg)] shadow-sm sm:w-[500px] lg:w-[600px]"
          >
            {/* 16:9 screenshot */}
            <div className="relative aspect-video w-full bg-[var(--section-border)]">
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 500px, 600px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--section-accent)]/20 to-[var(--section-accent)]/5" />
              )}

              {/* Client name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm font-semibold text-white">{item.client}</p>
              </div>
            </div>

            {/* Visit site button — only when url is non-empty */}
            {item.url && (
              <div className="px-6 py-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--section-accent)] transition-opacity hover:opacity-80"
                >
                  <ExternalLink className="size-4" />
                  {t('portfolio.visitSite')}
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
