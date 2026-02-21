'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Lenis smooth scroll wrapper with GSAP ScrollTrigger integration.
 * Provides buttery inertia scrolling and syncs with GSAP ticker.
 * Wraps page content — placed after Header in layout.
 */
export function SmoothScroll({
  children,
}: {
  readonly children: React.ReactNode;
}): React.JSX.Element {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false, // We drive Lenis from GSAP ticker — prevent double RAF
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP ticker for frame-perfect sync
    const tickerCallback = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Prevent GSAP lag compensation from fighting Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
