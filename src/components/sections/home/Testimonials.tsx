'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { BentoGrid } from '@/components/sections/BentoGrid';

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
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-grey/30'}
        />
      ))}
    </div>
  );
}

/**
 * Testimonials section with a bento grid layout.
 * Shows 6 testimonial cards with star ratings, hover interactions,
 * and stagger animation. First 2 cards span taller rows on desktop
 * for visual variety. Dark theme.
 */
export function Testimonials(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="dark" id="testimonials">
      <SectionHeader
        overline={t('testimonials.overline')}
        heading={t('testimonials.heading')}
        align="center"
      />

      <BentoGrid columns={3}>
        {TESTIMONIAL_KEYS.map((key, index) => {
          const item = t.raw(`testimonials.items.${key}`) as TestimonialItem;
          // First 2 cards span 2 rows on desktop for bento variety
          const isTall = index < 2;

          return (
            <div
              key={key}
              data-animate="card"
              className={`flex flex-col justify-between rounded-xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--section-accent)] md:p-8 ${
                isTall ? 'lg:row-span-2' : ''
              }`}
            >
              {/* Quote */}
              <p className="mb-6 text-sm italic text-[var(--section-text)] md:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author info + rating */}
              <div className="flex flex-col gap-2">
                <StarRating rating={Number(item.rating)} />
                <span className="text-sm font-semibold text-[var(--section-text)]">
                  {item.author}
                </span>
                <span className="text-xs text-[var(--section-text-muted)]">
                  {item.company}
                </span>
              </div>
            </div>
          );
        })}
      </BentoGrid>
    </SectionWrapper>
  );
}
