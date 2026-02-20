'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { isTouchDevice } from '@/lib/device';

/**
 * Interactive selectors for hover scale effect.
 * Used with event delegation on document for performance.
 */
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"]';

/** Cursor circle diameter in pixels. */
const CURSOR_SIZE = 32;

/** Scale factor on hover over interactive elements (32px -> 64px). */
const HOVER_SCALE = 2;

/** Smooth interpolation duration for position tracking. */
const POSITION_DURATION = 0.2;

/** Smooth interpolation ease for position tracking. */
const POSITION_EASE = 'power3';

/**
 * CustomCursor — Premium cursor replacement for desktop.
 *
 * Renders a white circle with mix-blend-mode: difference that
 * follows the mouse via GSAP quickTo (GPU-accelerated transforms).
 * Completely absent on touch devices — no DOM, no listeners.
 * Respects prefers-reduced-motion.
 */
export function CustomCursor(): React.JSX.Element | null {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef<boolean>(false);

  useGSAP(() => {
    // Bail entirely on touch devices — no listeners, no cursor.
    if (isTouchDevice()) {
      isTouch.current = true;
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Wrap all setup in matchMedia so reduced-motion users get default cursor.
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Add class to hide default cursor on desktop.
      document.body.classList.add('custom-cursor-active');

      // quickTo creates a reusable tween for high-frequency updates (mousemove).
      // Uses x/y transforms (GPU composited) — never left/top.
      const xTo = gsap.quickTo(cursor, 'x', {
        duration: POSITION_DURATION,
        ease: POSITION_EASE,
      });
      const yTo = gsap.quickTo(cursor, 'y', {
        duration: POSITION_DURATION,
        ease: POSITION_EASE,
      });

      const handleMouseMove = (e: MouseEvent): void => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const handleMouseEnter = (): void => {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      };

      const handleMouseLeave = (): void => {
        gsap.to(cursor, { opacity: 0, duration: 0.3 });
      };

      // Event delegation for hover scale on interactive elements.
      const handleMouseOver = (e: MouseEvent): void => {
        const target = e.target as HTMLElement | null;
        if (target?.closest(INTERACTIVE_SELECTOR)) {
          gsap.to(cursor, { scale: HOVER_SCALE, duration: 0.2 });
        }
      };

      const handleMouseOut = (e: MouseEvent): void => {
        const target = e.target as HTMLElement | null;
        if (target?.closest(INTERACTIVE_SELECTOR)) {
          gsap.to(cursor, { scale: 1, duration: 0.2 });
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);

      // Cleanup: remove class and listeners when component unmounts
      // or matchMedia condition changes.
      return () => {
        document.body.classList.remove('custom-cursor-active');
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
      };
    });

    // matchMedia cleanup handled by useGSAP's revert.
    return () => {
      mm.revert();
    };
  }, []);

  // Touch device: render nothing at all.
  if (typeof window !== 'undefined' && isTouchDevice()) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 mix-blend-difference"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
      }}
    />
  );
}
