'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

interface ScrollRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /** Distance in pixels to animate from below. Default: 40 */
  readonly yOffset?: number;
  /** Animation duration in seconds. Default: 0.8 */
  readonly duration?: number;
  /** ScrollTrigger start position. Default: 'top 85%' */
  readonly start?: string;
}

export function ScrollReveal({
  children,
  className,
  yOffset = 40,
  duration = 0.8,
  start = 'top 85%',
}: ScrollRevealProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(containerRef.current, {
        opacity: 0,
        y: yOffset,
        duration,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: 'play none none none',
        },
      });

      // Refresh ScrollTrigger after fonts load to avoid off-position triggers.
      // See RESEARCH.md Pitfall 3 for context.
      const onLoad = (): void => {
        ScrollTrigger.refresh();
      };

      if (document.readyState === 'complete') {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener('load', onLoad, { once: true });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
