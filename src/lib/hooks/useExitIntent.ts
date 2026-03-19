'use client';

import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'exit-intent-dismissed';
const SESSION_KEY = 'exit-intent-shown';
const DISMISS_DAYS = 7;
const DELAY_MS = 30_000;

/**
 * Detects exit intent on desktop (mouse leaves viewport top).
 * - Delays trigger for 30 seconds after mount.
 * - Shows once per session (sessionStorage).
 * - Skips for 7 days after dismiss (localStorage).
 * - Desktop only — no-op on touch devices.
 */
export function useExitIntent(): {
  isVisible: boolean;
  dismiss: () => void;
} {
  const [isVisible, setIsVisible] = useState(false);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
      localStorage.setItem(
        STORAGE_KEY,
        String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000)
      );
    } catch {
      // Storage unavailable — silently degrade
    }
  }, []);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    // Skip if already shown this session
    try {
      if (sessionStorage.getItem(SESSION_KEY) === 'true') return;

      const dismissedUntil = localStorage.getItem(STORAGE_KEY);
      if (dismissedUntil && Date.now() < Number(dismissedUntil)) return;
    } catch {
      // Storage unavailable — allow popup
    }

    let ready = false;
    const delayTimer = setTimeout(() => {
      ready = true;
    }, DELAY_MS);

    const handleMouseLeave = (e: MouseEvent): void => {
      if (!ready) return;
      if (e.clientY <= 0) {
        setIsVisible(true);
        try {
          sessionStorage.setItem(SESSION_KEY, 'true');
        } catch {
          // Storage unavailable
        }
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(delayTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { isVisible, dismiss };
}
