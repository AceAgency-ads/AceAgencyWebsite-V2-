'use client';

import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import { updateGtagConsent } from '@/lib/gtm';

interface CookieConsentBannerProps {
  readonly locale: string;
}

/**
 * GDPR cookie consent banner with granular category toggles.
 * Uses vanilla-cookieconsent v3 which manages its own DOM — this component
 * returns null and configures the library via useEffect.
 *
 * Categories: necessary (always on), analytics, marketing, functionality.
 * Integrates with GTM Consent Mode v2 via updateGtagConsent callbacks.
 */
export function CookieConsentBanner({ locale }: CookieConsentBannerProps): null {
  useEffect(() => {
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: '_gid' }],
          },
        },
        marketing: {
          autoClear: {
            cookies: [{ name: /^_gcl/ }, { name: '_fbp' }],
          },
        },
        functionality: {},
      },

      guiOptions: {
        consentModal: {
          layout: 'bar',
          position: 'bottom',
        },
      },

      onFirstConsent: () => {
        updateGtagConsent();
      },
      onConsent: () => {
        updateGtagConsent();
      },
      onChange: () => {
        updateGtagConsent();
      },

      language: {
        default: locale,
        translations: {
          ro: {
            consentModal: {
              title: 'Folosim cookie-uri',
              description:
                'Acest site foloseste cookie-uri pentru a imbunatati experienta de navigare, a analiza traficul si a personaliza continutul. Poti alege ce categorii de cookie-uri accepti.',
              acceptAllBtn: 'Accepta toate',
              acceptNecessaryBtn: 'Doar necesare',
              showPreferencesBtn: 'Gestioneaza preferintele',
            },
            preferencesModal: {
              title: 'Preferinte cookie-uri',
              acceptAllBtn: 'Accepta toate',
              acceptNecessaryBtn: 'Doar necesare',
              savePreferencesBtn: 'Salveaza preferintele',
              sections: [
                {
                  title: 'Despre cookie-uri',
                  description:
                    'Cookie-urile sunt fisiere mici stocate pe dispozitivul tau. Le folosim pentru a asigura functionarea site-ului, a analiza traficul si a imbunatati serviciile noastre.',
                },
                {
                  title: 'Cookie-uri necesare',
                  description:
                    'Aceste cookie-uri sunt esentiale pentru functionarea site-ului. Nu pot fi dezactivate.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Cookie-uri analitice',
                  description:
                    'Ne ajuta sa intelegem cum este utilizat site-ul prin colectarea de date anonime (Google Analytics).',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Cookie-uri de marketing',
                  description:
                    'Folosite pentru a afisa reclame relevante si a masura eficienta campaniilor publicitare (Google Ads, Facebook Ads).',
                  linkedCategory: 'marketing',
                },
                {
                  title: 'Cookie-uri functionale',
                  description:
                    'Permit functionarea hartilor Google Maps si a altor servicii integrate pe site.',
                  linkedCategory: 'functionality',
                },
              ],
            },
          },
          en: {
            consentModal: {
              title: 'We use cookies',
              description:
                'This site uses cookies to enhance your browsing experience, analyze traffic, and personalize content. You can choose which cookie categories to accept.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Necessary only',
              showPreferencesBtn: 'Manage preferences',
            },
            preferencesModal: {
              title: 'Cookie preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Necessary only',
              savePreferencesBtn: 'Save preferences',
              sections: [
                {
                  title: 'About cookies',
                  description:
                    'Cookies are small files stored on your device. We use them to ensure the site works properly, analyze traffic, and improve our services.',
                },
                {
                  title: 'Necessary cookies',
                  description:
                    'These cookies are essential for the site to function. They cannot be disabled.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Analytics cookies',
                  description:
                    'Help us understand how the site is used by collecting anonymous data (Google Analytics).',
                  linkedCategory: 'analytics',
                },
                {
                  title: 'Marketing cookies',
                  description:
                    'Used to display relevant ads and measure advertising campaign effectiveness (Google Ads, Facebook Ads).',
                  linkedCategory: 'marketing',
                },
                {
                  title: 'Functional cookies',
                  description:
                    'Enable Google Maps and other integrated services on the site.',
                  linkedCategory: 'functionality',
                },
              ],
            },
          },
        },
      },
    });
  }, [locale]);

  return null;
}
