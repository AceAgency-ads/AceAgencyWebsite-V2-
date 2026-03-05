'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import * as CookieConsent from 'vanilla-cookieconsent';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

/**
 * Google Maps embed with dark styling via CSS filter.
 * Full-width section (no container rounding -- map bleeds edge-to-edge).
 * Gated behind functionality cookie consent via vanilla-cookieconsent.
 */
export function GoogleMap(): React.JSX.Element {
  const t = useTranslations('contact');

  const [consentGranted, setConsentGranted] = useState(() => {
    try {
      return CookieConsent.acceptedCategory('functionality');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleConsentChange = (): void => {
      setConsentGranted(CookieConsent.acceptedCategory('functionality'));
    };

    window.addEventListener('cc:onChange', handleConsentChange);
    window.addEventListener('cc:onConsent', handleConsentChange);

    return () => {
      window.removeEventListener('cc:onChange', handleConsentChange);
      window.removeEventListener('cc:onConsent', handleConsentChange);
    };
  }, []);

  if (!consentGranted) {
    return (
      <SectionWrapper theme="dark" rounded={false}>
        <div className="flex h-[300px] items-center justify-center text-center md:h-[400px]">
          <p className="text-[var(--section-text-muted)]">
            {t('map.cookieRequired')}
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <section className="bg-[var(--color-black)]">
      <div className="relative h-[300px] w-full md:h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8851529799253!2d26.0849!3d44.4613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4b6f1b9e5d%3A0x0!2sBulevardul%20Aviatorilor%20106%2C%20Bucure%C8%99ti!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="invert grayscale-[0.8] contrast-[1.1] hue-rotate-[200deg] saturate-[0.3]"
          title="Laboratorul de Conversii Office Location - Bulevardul Aviatorilor 106, Bucuresti"
        />
      </div>
    </section>
  );
}
