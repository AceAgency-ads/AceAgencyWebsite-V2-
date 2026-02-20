'use client';

import { useRef, type ElementType } from 'react';
import { gsap, useGSAP, ScrollTrigger, SplitText } from '@/lib/gsap';

interface TextRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /** HTML element to render. Default: 'div' */
  readonly as?: ElementType;
  /** Split variant: 'char' for character-level, 'word' for word-level stagger. Default: 'char' */
  readonly variant?: 'char' | 'word';
  /** Trigger mode: 'scroll' for ScrollTrigger, 'load' for immediate on mount. Default: 'scroll' */
  readonly trigger?: 'scroll' | 'load';
  /** Delay between each unit in seconds. Default: 0.025 for chars, 0.08 for words */
  readonly stagger?: number;
  /** Animation duration in seconds. Default: 0.5 */
  readonly duration?: number;
  /** ScrollTrigger start position (only used when trigger='scroll'). Default: 'top 85%' */
  readonly triggerStart?: string;
}

const DEFAULT_STAGGER_CHAR = 0.025;
const DEFAULT_STAGGER_WORD = 0.08;

/**
 * SplitText stagger animation wrapper.
 * Supports character-level and word-level split variants.
 * Supports scroll-triggered and load-triggered animation modes.
 * Wrapped in prefers-reduced-motion check -- falls back to instant reveal.
 */
export function TextReveal({
  children,
  className,
  as: Tag = 'div',
  variant = 'char',
  trigger = 'scroll',
  stagger,
  duration = 0.5,
  triggerStart = 'top 85%',
}: TextRevealProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const resolvedStagger =
    stagger ?? (variant === 'word' ? DEFAULT_STAGGER_WORD : DEFAULT_STAGGER_CHAR);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const splitType = variant === 'word' ? 'words' : 'chars';

        SplitText.create(containerRef.current!, {
          type: splitType,
          autoSplit: true,
          onSplit(self) {
            const targets = variant === 'word' ? self.words : self.chars;

            const animationConfig: gsap.TweenVars = {
              y: '130%',
              opacity: 0,
              duration,
              stagger: resolvedStagger,
              ease: 'power1.inOut',
            };

            // Only add ScrollTrigger when trigger mode is 'scroll'
            if (trigger === 'scroll') {
              animationConfig.scrollTrigger = {
                trigger: containerRef.current,
                start: triggerStart,
                toggleActions: 'play none none none',
              };
            }

            gsap.from(targets, animationConfig);
          },
        });

        return () => {
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
