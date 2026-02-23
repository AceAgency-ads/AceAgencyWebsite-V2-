/**
 * GTM Consent Mode v2 helpers.
 *
 * - GTM_CONSENT_DEFAULT_SCRIPT: inline script that sets default consent to 'denied'
 *   for all storage types. Must execute BEFORE the GTM container script.
 * - updateGtagConsent(): reads vanilla-cookieconsent accepted categories and calls
 *   gtag('consent', 'update', {...}) with the appropriate granted/denied values.
 */

/* ------------------------------------------------------------------ */
/*  Type augmentation for window.gtag                                  */
/* ------------------------------------------------------------------ */
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

/* ------------------------------------------------------------------ */
/*  Default consent script (inline, before GTM container)              */
/* ------------------------------------------------------------------ */
export const GTM_CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'wait_for_update': 500
});
`;

/* ------------------------------------------------------------------ */
/*  Consent update (called from cookie consent callbacks)              */
/* ------------------------------------------------------------------ */
export function updateGtagConsent(): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  // Lazy import avoids bundling vanilla-cookieconsent in server context
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const CookieConsent = require('vanilla-cookieconsent') as typeof import('vanilla-cookieconsent');

  const analyticsGranted = CookieConsent.acceptedCategory('analytics');
  const marketingGranted = CookieConsent.acceptedCategory('marketing');
  const functionalityGranted = CookieConsent.acceptedCategory('functionality');

  window.gtag('consent', 'update', {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: marketingGranted ? 'granted' : 'denied',
    ad_user_data: marketingGranted ? 'granted' : 'denied',
    ad_personalization: marketingGranted ? 'granted' : 'denied',
    functionality_storage: functionalityGranted ? 'granted' : 'denied',
  });
}
