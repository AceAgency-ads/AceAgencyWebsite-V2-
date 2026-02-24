/**
 * Push a custom event to the GTM dataLayer.
 * GTM Consent Mode v2 handles gating -- events always push,
 * but GA4 only processes them when consent is granted.
 *
 * Window.dataLayer type augmentation is in src/lib/gtm.ts.
 */
export function trackEvent(eventName: string, params?: Record<string, string | number>): void {
  if (typeof window === 'undefined') return;
  if (!window.dataLayer) return;
  window.dataLayer.push({ event: eventName, ...params });
}
