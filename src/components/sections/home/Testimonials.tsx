'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { VideoTestimonialCard } from '@/components/sections/home/VideoTestimonialCard';

/** Testimonial item shape from i18n (text type). */
interface TextTestimonialItem {
  readonly quote: string;
  readonly author: string;
  readonly company: string;
  readonly rating: string;
  readonly avatarSrc?: string;
  readonly type?: undefined;
}

/** Video testimonial item shape from i18n. */
interface VideoTestimonialItem {
  readonly type: 'video';
  readonly quote: string;
  readonly author: string;
  readonly company: string;
  readonly rating: string;
  readonly thumbnailSrc: string;
  readonly videoSrc: string;
}

type TestimonialItem = TextTestimonialItem | VideoTestimonialItem;

/** Testimonial keys matching the i18n object — text + video items. */
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

/**
 * Testimonials section with mixed text + video cards.
 * Light-warm bg, large heading left-aligned, horizontal card carousel.
 * Text cards: quote + author. Video cards: thumbnail with play button.
 * Circular prev/next navigation buttons.
 */
export function Testimonials(): React.JSX.Element {
  const t = useTranslations('home');
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

  return (
    <SectionWrapper theme="light-warm" id="testimonials">
      <div className="flex items-end justify-between">
        <SectionHeader
          overline={t('testimonials.overline')}
          heading={t('testimonials.heading')}
          align="left"
          className="mb-8 md:mb-10"
        />

        {/* Navigation arrows — circular buttons */}
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
        {TESTIMONIAL_KEYS.map((key) => {
          const item = t.raw(`testimonials.items.${key}`) as TestimonialItem;

          // Video testimonial card
          if (item.type === 'video') {
            return (
              <VideoTestimonialCard
                key={key}
                quote={item.quote}
                author={item.author}
                company={item.company}
                rating={Number(item.rating)}
                thumbnailSrc={item.thumbnailSrc}
                videoSrc={item.videoSrc}
              />
            );
          }

          // Text testimonial card
          return (
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
          );
        })}
      </div>
    </SectionWrapper>
  );
}
