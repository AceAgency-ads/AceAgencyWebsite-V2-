'use client';

import { useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/** Testimonial item shape from i18n. */
interface TestimonialItem {
  readonly quote: string;
  readonly author: string;
  readonly company: string;
  readonly rating: string;
}

/** Testimonial keys matching the i18n object. */
const TESTIMONIAL_KEYS = ['0', '1', '2', '3', '4', '5'] as const;

/** Star rating component. Renders filled stars up to the rating count. */
function StarRating({ rating }: { readonly rating: number }): React.JSX.Element {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-[#56151A] text-[#56151A]' : 'text-[#262523]/30'}
        />
      ))}
    </div>
  );
}

/**
 * Testimonials section — addifico style.
 * Dark bg, large heading left-aligned, horizontal card carousel.
 * Cards use off-white bg (#F5F5F5), rounded-3xl.
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
    <SectionWrapper theme="dark" id="testimonials">
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
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4a464380] bg-[#3a3836] text-[#D9D9D9] transition-colors hover:border-[#56151A] hover:text-[#56151A]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4a464380] bg-[#3a3836] text-[#D9D9D9] transition-colors hover:border-[#56151A] hover:text-[#56151A]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-4 scrollbar-hide"
        role="region"
        aria-label="Testimonials carousel"
      >
        {TESTIMONIAL_KEYS.map((key) => {
          const item = t.raw(`testimonials.items.${key}`) as TestimonialItem;

          return (
            <article
              key={key}
              data-animate="card"
              className="w-[85vw] flex-shrink-0 snap-start rounded-3xl bg-[#F5F5F5] p-10 sm:w-[400px] md:p-12 lg:w-[468px]"
            >
              {/* Decorative quote mark */}
              <span className="mb-4 block select-none text-6xl font-bold leading-none text-[#56151A]/40">
                &ldquo;
              </span>

              {/* Quote */}
              <p className="mb-8 text-base text-[#262523] md:text-lg">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author info + rating */}
              <div className="flex flex-col gap-2">
                <StarRating rating={Number(item.rating)} />
                <span className="text-sm font-semibold text-[#262523]">
                  {item.author}
                </span>
                <span className="text-xs text-[#666666]">
                  {item.company}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
