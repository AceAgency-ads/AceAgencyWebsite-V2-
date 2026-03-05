'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

interface WhyUsItem {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

/**
 * Why Choose Us section with numbered differentiator list.
 * Each item has a decorative large number, title, and description.
 * Items stagger fade up from left using GSAP ScrollTrigger.
 */
export function WhyChooseUs(): React.JSX.Element {
  const t = useTranslations('about');
  const listRef = useRef<HTMLDivElement>(null);
  const items = t.raw('whyUs.items') as readonly WhyUsItem[];

  useGSAP(
    () => {
      if (!listRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const listItems =
          listRef.current!.querySelectorAll('[data-animate="item"]');
        if (listItems.length === 0) return;

        gsap.from(listItems, {
          x: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        return () => {
          ScrollTrigger.getAll()
            .filter((st) => st.trigger === listRef.current)
            .forEach((st) => st.kill());
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const listItems =
          listRef.current!.querySelectorAll('[data-animate="item"]');
        gsap.set(listItems, { opacity: 1, x: 0 });
      });
    },
    { scope: listRef }
  );

  return (
    <SectionWrapper theme="light-warm" id="why-choose-us">
      <SectionHeader
        overline={t('whyUs.overline')}
        heading={t('whyUs.heading')}
      />

      <div ref={listRef} className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-8 overflow-hidden rounded-xl lg:hidden">
            <Image
              src="/images/about/why-choose-us.webp"
              alt="Profesioniști creativi analizând rezultate pe ecran"
              width={800}
              height={1000}
              className="h-auto max-h-[300px] w-full object-cover"
              sizes="100vw"
            />
          </div>
          {items.map((item) => (
            <div
              key={item.number}
              data-animate="item"
              className="flex flex-col gap-4 border-b border-[var(--section-border)] py-6 md:flex-row md:items-start md:gap-8"
            >
              {/* Decorative number */}
              <span
                className="shrink-0 text-5xl font-bold opacity-30 md:text-6xl"
                style={{ color: 'var(--section-text-muted)' }}
                aria-hidden="true"
              >
                {item.number}
              </span>

              {/* Content */}
              <div>
                <h3 className="mb-2 text-lg font-bold text-[var(--section-text)]">
                  {item.title}
                </h3>
                <p className="text-[var(--section-text-muted)]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:col-span-2 lg:block">
          <div className="sticky top-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="/images/about/why-choose-us.webp"
                alt="Profesioniști creativi analizând rezultate pe ecran"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
