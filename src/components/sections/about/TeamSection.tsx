'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';

interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly image: string;
}

/**
 * Team section with photo cards for each team member.
 * Dark section on About page. Grid layout with hover zoom effect.
 * Photos: 3:4 aspect ratio, GSAP stagger animation.
 */
export function TeamSection(): React.JSX.Element {
  const t = useTranslations('about');
  const gridRef = useRef<HTMLDivElement>(null);
  const members = t.raw('team.members') as readonly TeamMember[];

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('[data-animate="team-card"]');
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
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
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cards, { opacity: 1, y: 0 });
      });
    },
    { scope: gridRef }
  );

  return (
    <SectionWrapper theme="dark" id="team">
      <SectionHeader
        overline={t('team.overline')}
        heading={t('team.heading')}
        align="center"
      />

      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {members.map((member) => (
          <div
            key={member.name}
            data-animate="team-card"
            className="group overflow-hidden rounded-2xl border border-[var(--section-border)] bg-[var(--section-card-bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Photo — 3:4 aspect */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-[var(--section-text)]">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--section-text-muted)]">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
