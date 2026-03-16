'use client';

import { useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { VideoTestimonialCard } from '@/components/sections/home/VideoTestimonialCard';

interface VideoTestimonialItem {
  readonly quote: string;
  readonly author: string;
  readonly company: string;
  readonly rating: string;
  readonly thumbnailSrc: string;
  readonly videoSrc: string;
}

const VIDEO_KEYS = ['0', '1', '2'] as const;

/**
 * Video testimonials section — trust-first social proof with video cards.
 * Dark theme, featured layout on desktop (1 large + 2 stacked), carousel on mobile.
 */
export function VideoTestimonials(): React.JSX.Element {
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

  const items = VIDEO_KEYS.map((key) =>
    t.raw(`videoTestimonials.items.${key}`) as VideoTestimonialItem
  );

  return (
    <SectionWrapper theme="dark" id="video-testimonials">
      <div className="flex items-end justify-between">
        <SectionHeader
          overline={t('videoTestimonials.overline')}
          heading={t('videoTestimonials.heading')}
          align="left"
          className="mb-8 md:mb-10"
        />

        {/* Navigation arrows — mobile/tablet only */}
        <ScrollReveal className="mb-8 flex gap-3 md:mb-10 lg:hidden">
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

      {/* Desktop: featured grid layout (1 large + 2 stacked) */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {items.map((item, index) => (
          <ScrollReveal key={VIDEO_KEYS[index]}>
            <VideoTestimonialCard
              quote={item.quote}
              author={item.author}
              company={item.company}
              rating={Number(item.rating)}
              thumbnailSrc={item.thumbnailSrc}
              videoSrc={item.videoSrc}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* Mobile/Tablet: horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-hide lg:hidden"
        role="region"
        aria-label="Video testimonials carousel"
        tabIndex={0}
      >
        {items.map((item, index) => (
          <VideoTestimonialCard
            key={VIDEO_KEYS[index]}
            quote={item.quote}
            author={item.author}
            company={item.company}
            rating={Number(item.rating)}
            thumbnailSrc={item.thumbnailSrc}
            videoSrc={item.videoSrc}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
