'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/** Testimonial item shape from i18n (text type). */
interface TestimonialItem {
  readonly quote: string;
  readonly author: string;
  readonly company: string;
  readonly rating: string;
  readonly avatarSrc?: string;
  readonly services?: readonly string[];
  readonly type?: string;
}

const TESTIMONIAL_KEYS = ['0', '1', '2', '3', '4', '5'] as const;

/** Star rating component. Renders filled stars up to the rating count. */
function StarRating({ rating }: { readonly rating: number }): React.JSX.Element {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-[var(--section-accent)] text-[var(--section-accent)]' : 'text-[var(--section-text)]/30'}
        />
      ))}
    </div>
  );
}

interface ServiceTestimonialsProps {
  readonly serviceSlug: string;
}

/**
 * Horizontal scroll carousel of text testimonials filtered by service slug.
 * Falls back to showing all testimonials if no matches found.
 */
export function ServiceTestimonials({ serviceSlug }: ServiceTestimonialsProps): React.JSX.Element {
  const t = useTranslations('home');
  const tServices = useTranslations('services');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 400;
    const gap = 24;
    const distance = cardWidth + gap;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  }, []);

  // Collect all text testimonials (skip video type)
  const allItems = TESTIMONIAL_KEYS
    .map((key) => ({ key, item: t.raw(`testimonials.items.${key}`) as TestimonialItem }))
    .filter(({ item }) => item.type !== 'video');

  // Filter by service; fall back to all if none match
  const filtered = allItems.filter(({ item }) =>
    item.services?.includes(serviceSlug) ?? false
  );
  const displayItems = filtered.length > 0 ? filtered : allItems;

  return (
    <SectionWrapper theme="light-warm" id="service-testimonials">
      <div className="flex items-end justify-between">
        <SectionHeader
          overline={tServices('serviceTestimonials.overline')}
          heading={tServices('serviceTestimonials.heading')}
          align="left"
          className="mb-8 md:mb-10"
        />

        {/* Navigation arrows */}
        <ScrollReveal className="mb-8 flex gap-3 md:mb-10">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--section-border)] bg-[var(--section-card-bg)] text-[var(--section-text-muted)] transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--section-border)] bg-[var(--section-card-bg)] text-[var(--section-text-muted)] transition-colors hover:border-[var(--section-accent)] hover:text-[var(--section-accent)]"
            aria-label="Next testimonial"
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
        aria-label="Testimonials carousel"
        tabIndex={0}
      >
        {displayItems.map(({ key, item }) => (
          <article
            key={key}
            data-animate="card"
            className="w-[85vw] flex-shrink-0 snap-start rounded-3xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-10 shadow-sm sm:w-[400px] md:p-12 lg:w-[468px]"
          >
            {/* Decorative quote mark */}
            <span className="mb-4 block select-none text-6xl font-bold leading-none text-[var(--section-accent)]/40">
              &ldquo;
            </span>

            {/* Quote */}
            <p className="mb-8 text-base text-[var(--section-text)] md:text-lg">
              &ldquo;{item.quote}&rdquo;
            </p>

            {/* Author info + rating */}
            <div className="flex items-center gap-3">
              {item.avatarSrc && (
                <Image
                  src={item.avatarSrc}
                  alt={item.author}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              )}
              <div className="flex flex-col gap-1">
                <StarRating rating={Number(item.rating)} />
                <span className="text-sm font-semibold text-[var(--section-text)]">
                  {item.author}
                </span>
                <span className="text-xs text-[var(--section-text-muted)]">
                  {item.company}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
