'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface CountUpProps {
  readonly end: number;
  readonly suffix?: string;
  readonly duration?: number;
  readonly className?: string;
}

/**
 * GSAP-powered number count-up animation triggered on scroll.
 * Respects prefers-reduced-motion — shows final value immediately.
 */
export function CountUp({
  end,
  suffix = '',
  duration = 2,
  className,
}: CountUpProps): React.JSX.Element {
  const spanRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ value: 0 });

  useGSAP(
    () => {
      if (!spanRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Reset counter for re-entry
        counterRef.current = { value: 0 };

        gsap.to(counterRef.current, {
          value: end,
          duration,
          ease: 'power2.out',
          snap: { value: 1 },
          scrollTrigger: {
            trigger: spanRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate() {
            if (spanRef.current) {
              spanRef.current.textContent = `${counterRef.current.value}${suffix}`;
            }
          },
        });

        return () => {
          ScrollTrigger.getAll()
            .filter((st) => st.trigger === spanRef.current)
            .forEach((st) => st.kill());
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (spanRef.current) {
          spanRef.current.textContent = `${end}${suffix}`;
        }
      });
    },
    { scope: spanRef }
  );

  return (
    <span ref={spanRef} className={cn(className)}>
      0{suffix}
    </span>
  );
}
