'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface ParallaxLayerProps {
  readonly children: React.ReactNode;
  /** Parallax speed factor. Default: 0.3 */
  readonly speed?: number;
  readonly className?: string;
}

/**
 * GSAP ScrollTrigger scrub parallax wrapper.
 * Only animates on desktop (min-width: 1024px) with no reduced-motion preference.
 * Uses scrub: 1 for smooth position-linked scrolling.
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: ParallaxLayerProps): React.JSX.Element {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!layerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.to(layerRef.current!, {
            y: () => window.innerHeight * speed * -1,
            ease: 'none',
            scrollTrigger: {
              trigger: layerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });

          return () => {
            ScrollTrigger.getAll()
              .filter((st) => st.trigger === layerRef.current)
              .forEach((st) => st.kill());
          };
        }
      );
    },
    { scope: layerRef }
  );

  return (
    <div ref={layerRef} className={cn('pointer-events-none', className)}>
      {children}
    </div>
  );
}
