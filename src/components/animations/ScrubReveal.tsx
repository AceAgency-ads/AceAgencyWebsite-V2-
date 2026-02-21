'use client';

import { useRef, type ElementType } from 'react';
import { gsap, useGSAP, SplitText } from '@/lib/gsap';

interface ScrubRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /** HTML element to render. Default: 'p' */
  readonly as?: ElementType;
  /** Starting opacity for each unit. Default: 0.15 */
  readonly startOpacity?: number;
  /** Split by characters or words. Default: 'char' */
  readonly variant?: 'char' | 'word';
}

/**
 * Scroll-scrubbed opacity reveal.
 * Each character (or word) starts at low opacity and fades to 1.0
 * tied to scroll position (reversible scrub animation).
 *
 * Key difference from TextReveal: scrub ties animation to scroll position
 * (bidirectional), TextReveal plays once on enter.
 */
export function ScrubReveal({
  children,
  className,
  as: Tag = 'p',
  startOpacity = 0.15,
  variant = 'char',
}: ScrubRevealProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const isWord = variant === 'word';
      const splitType = isWord ? 'words' : 'chars';
      const staggerAmount = isWord ? 0.06 : 0.03;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        SplitText.create(containerRef.current!, {
          type: splitType,
          autoSplit: true,
          onSplit(self) {
            const targets = isWord ? self.words : self.chars;

            // Set initial state
            gsap.set(targets, { opacity: startOpacity });

            // Scrub animation tied to scroll position
            gsap.to(targets, {
              opacity: 1,
              stagger: staggerAmount,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom 30%',
                scrub: 0.5,
              },
            });
          },
        });
      });

      // Reduced motion: show all at full opacity
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
