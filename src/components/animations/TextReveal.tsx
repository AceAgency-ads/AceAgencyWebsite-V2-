'use client';

import { useRef, type ElementType } from 'react';
import { gsap, useGSAP, ScrollTrigger, SplitText } from '@/lib/gsap';

interface TextRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /** HTML element to render. Default: 'div' */
  readonly as?: ElementType;
  /** Delay between each character in seconds. Default: 0.025 */
  readonly stagger?: number;
  /** Animation duration in seconds. Default: 0.5 */
  readonly duration?: number;
  /** ScrollTrigger start position. Default: 'top 85%' */
  readonly triggerStart?: string;
}

/**
 * SplitText character-level stagger animation wrapper.
 * Splits text into characters and animates them on scroll.
 * Wrapped in prefers-reduced-motion check — falls back to simple fade.
 */
export function TextReveal({
  children,
  className,
  as: Tag = 'div',
  stagger = 0.025,
  duration = 0.5,
  triggerStart = 'top 85%',
}: TextRevealProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      // Only animate when user has no reduced-motion preference
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        SplitText.create(containerRef.current!, {
          type: 'chars',
          autoSplit: true,
          onSplit(self) {
            gsap.from(self.chars, {
              y: '130%',
              opacity: 0,
              duration,
              stagger,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: triggerStart,
                toggleActions: 'play none none none',
              },
            });
          },
        });

        return () => {
          // Cleanup: kill ScrollTriggers scoped to this element
          ScrollTrigger.getAll()
            .filter((st) => st.trigger === containerRef.current)
            .forEach((st) => st.kill());
        };
      });

      // Reduced motion: simple instant reveal (no split animation)
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(containerRef.current!, { opacity: 1 });
      });
    },
    { scope: containerRef }
  );

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
}
