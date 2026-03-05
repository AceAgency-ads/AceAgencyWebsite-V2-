'use client';

import { useActionState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Container } from '@/components/layout/Container';
import { submitNewsletter } from '@/lib/actions/newsletter';
import { trackEvent } from '@/lib/analytics';

/** Navigation links (same as MenuOverlay) */
const NAV_LINKS = [
  { key: 'home', href: '/' as const },
  { key: 'about', href: '/despre-noi' as const },
  { key: 'services', href: '/servicii' as const },
  { key: 'contact', href: '/contact' as const },
  { key: 'faq', href: '/intrebari-frecvente' as const },
] as const;

/** Service links for footer */
const SERVICE_LINKS = [
  { key: 'googleAds', href: '/servicii/google-ads' as const },
  { key: 'facebookAds', href: '/servicii/facebook-ads' as const },
  { key: 'tiktokAds', href: '/servicii/tiktok-ads' as const },
  { key: 'seo', href: '/servicii/seo' as const },
  { key: 'emailMarketing', href: '/servicii/email-marketing' as const },
  { key: 'consultanta', href: '/servicii/consultanta-marketing' as const },
] as const;

/** Social link data */
const SOCIAL_LINKS = [
  { key: 'linkedin', Icon: Linkedin, url: 'https://linkedin.com/company/aceagency' },
  { key: 'instagram', Icon: Instagram, url: 'https://instagram.com/aceagency' },
  { key: 'facebook', Icon: Facebook, url: 'https://facebook.com/aceagency' },
] as const;

/** Legal page links (placeholder hrefs for now — actual pages built in Phase 6) */
const LEGAL_LINKS = [
  { key: 'privacy', href: '/politica-confidentialitate' },
  { key: 'cookies', href: '/politica-cookies' },
  { key: 'terms', href: '/termeni-si-conditii' },
] as const;

/**
 * Full-width footer — dark palette.
 * Dark bg (#262523), accent highlights.
 */
export function Footer(): React.JSX.Element {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const tSocial = useTranslations('social');
  const tServices = useTranslations('footer.services');
  const [newsletterState, newsletterAction, newsletterPending] = useActionState(
    submitNewsletter,
    { success: false }
  );

  return (
    <footer className="bg-[#262523] py-16 text-[#D9D9D9] lg:py-24">
      <Container>
        {/* Row 1: Logo, tagline, division badges */}
        <ScrollReveal className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-4">
            <Link href="/" locale={locale} aria-label="Laboratorul de Conversii">
              <Image
                src="/ace-agency-logo.webp"
                alt="Laboratorul de Conversii"
                width={120}
                height={38}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-md text-sm text-[#a0a0a0]">{t('tagline')}</p>
          </div>
        </ScrollReveal>

        {/* Row 2: 4-column grid */}
        <ScrollReveal className="mb-12 lg:mb-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Contact info */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#a0a0a0]">
                Contact
              </h3>
              <address className="flex flex-col gap-2 text-sm not-italic text-[#a0a0a0]">
                <span>{t('address')}</span>
                <a
                  href={`tel:${t('phone')}`}
                  className="transition-colors duration-200 hover:text-[#D9D9D9]"
                  onClick={() => trackEvent('click_phone', { event_category: 'contact', event_label: 'footer' })}
                >
                  {t('phone')}
                </a>
                <a
                  href={`mailto:${t('email')}`}
                  className="transition-colors duration-200 hover:text-[#D9D9D9]"
                  onClick={() => trackEvent('click_email', { event_category: 'contact', event_label: 'footer' })}
                >
                  {t('email')}
                </a>
              </address>
            </div>

            {/* Column 2: Quick nav + Services */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#a0a0a0]">
                {locale === 'ro' ? 'Pagini' : 'Pages'}
              </h3>
              <nav aria-label="Footer navigation" className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    locale={locale}
                    className="text-sm text-[#a0a0a0] transition-colors duration-200 hover:text-[#D9D9D9]"
                  >
                    {tNav(link.key)}
                  </Link>
                ))}
              </nav>

              <h3 className="mt-4 font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#a0a0a0]">
                {locale === 'ro' ? 'Servicii' : 'Services'}
              </h3>
              <nav aria-label="Footer services" className="flex flex-col gap-2">
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    locale={locale}
                    className="text-sm text-[#a0a0a0] transition-colors duration-200 hover:text-[#D9D9D9]"
                  >
                    {tServices(link.key)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Newsletter */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#a0a0a0]">
                {t('newsletter.title')}
              </h3>

              {newsletterState.success ? (
                <p className="text-sm text-[#66F3A6]">
                  {t('newsletter.success')}
                </p>
              ) : (
                <form
                  action={(formData) => {
                    trackEvent('newsletter_signup', { event_category: 'engagement', event_label: 'footer' });
                    newsletterAction(formData);
                  }}
                  className="flex flex-col gap-3"
                >
                  {/* Honeypot — hidden from humans */}
                  <input
                    type="text"
                    name="honeypot"
                    autoComplete="off"
                    tabIndex={-1}
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    aria-hidden="true"
                  />

                  <div className="flex">
                    <input
                      type="email"
                      name="email"
                      placeholder={t('newsletter.placeholder')}
                      required
                      disabled={newsletterPending}
                      className="h-12 flex-1 rounded-l-md border border-[#4a464380] bg-[#3a3836] px-4 text-sm text-[#D9D9D9] placeholder:text-[#a0a0a0]/60 focus:outline-none focus:ring-1 focus:ring-[#650CBE] disabled:opacity-50"
                      aria-label={t('newsletter.placeholder')}
                    />
                    <button
                      type="submit"
                      disabled={newsletterPending}
                      className="h-12 rounded-r-md bg-[#650CBE] px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#7A1FD8] disabled:opacity-50"
                    >
                      {newsletterPending ? '...' : t('newsletter.submit')}
                    </button>
                  </div>

                  {newsletterState.error && (
                    <p className="text-xs text-red-400">
                      {t('newsletter.error')}
                    </p>
                  )}

                  <label className="flex items-start gap-2 text-xs text-[#a0a0a0]/80">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-[#4a464380] bg-transparent accent-[#650CBE]"
                    />
                    <span>{t('newsletter.gdpr')}</span>
                  </label>
                </form>
              )}
            </div>

            {/* Column 4: Social links */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#a0a0a0]">
                Social
              </h3>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ key, Icon, url }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tSocial(key)}
                    className="flex h-12 w-12 items-center justify-center text-[#a0a0a0] transition-all duration-200 hover:scale-110 hover:text-[#D9D9D9]"
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Row 3: Bottom bar — copyright + legal links */}
        <ScrollReveal>
          <div className="border-t border-[#4a464380] pt-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-[#a0a0a0]">{t('copyright')}</p>
              <nav aria-label="Legal links" className="flex flex-wrap gap-4">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href as '/'}
                    locale={locale}
                    className="text-xs text-[#a0a0a0] transition-colors duration-200 hover:text-[#D9D9D9]"
                  >
                    {t(`legal.${link.key}`)}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    const CC = require('vanilla-cookieconsent') as typeof import('vanilla-cookieconsent');
                    CC.showPreferences();
                  }}
                  className="text-xs text-[#a0a0a0] transition-colors duration-200 hover:text-[#D9D9D9]"
                >
                  {t('legal.cookieSettings')}
                </button>
              </nav>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </footer>
  );
}
