'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  readonly children: React.ReactNode;
  readonly columns?: 2 | 3 | 4;
  readonly className?: string;
}

const columnMap = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
} as const;

/**
 * Asymmetric CSS Grid layout for bento-style card arrangements.
 * Children should include `data-animate="card"` for stagger animation targeting.
 * Animates cards with fade-up stagger on scroll, respects reduced motion.
 */
export function BentoGrid({
  children,
  columns = 3,
  className,
}: BentoGridProps): React.JSX.Element {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('[data-animate="card"]');
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
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
    <div
      ref={gridRef}
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2',
        columnMap[columns],
        className
      )}
    >
      {children}
    </div>
  );
}
