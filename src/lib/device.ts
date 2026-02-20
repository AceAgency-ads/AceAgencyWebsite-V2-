/**
 * Detects whether the current device supports touch input.
 * Returns false on the server (SSR safe).
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    window.matchMedia('(hover: none)').matches
  );
}
