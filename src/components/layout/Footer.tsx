'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Container } from '@/components/layout/Container';

/** Division badge data */
const DIVISIONS = ['web', 'ads', 'ai', 'media'] as const;

/** Navigation links (same as MenuOverlay) */
const NAV_LINKS = [
  { key: 'home', href: '/' as const },
  { key: 'about', href: '/despre-noi' as const },
  { key: 'services', href: '/servicii' as const },
  { key: 'contact', href: '/contact' as const },
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
 * Full-width footer with logo, divisions, contact info, quick nav,
 * newsletter form UI, social links, copyright, and legal links.
 * Always rendered on dark background.
 */
export function Footer(): React.JSX.Element {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const tSocial = useTranslations('social');

  return (
    <footer className="bg-[#262523] py-16 text-white lg:py-24">
      <Container>
        {/* Row 1: Logo, tagline, division badges */}
        <ScrollReveal className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-4">
            <span className="font-heading text-2xl font-bold tracking-tight">
              ACE
            </span>
            <p className="max-w-md text-sm text-grey">{t('tagline')}</p>
            <div className="flex flex-wrap gap-2">
              {DIVISIONS.map((div) => (
                <span
                  key={div}
                  className="rounded-full border border-[oklch(0.28_0.005_80)] px-3 py-1 text-xs font-medium text-grey"
                >
                  {t(`divisions.${div}`)}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Row 2: 4-column grid */}
        <ScrollReveal className="mb-12 lg:mb-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Contact info */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-grey">
                Contact
              </h3>
              <address className="flex flex-col gap-2 text-sm not-italic text-grey">
                <span>{t('address')}</span>
                <a
                  href={`tel:${t('phone')}`}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {t('phone')}
                </a>
                <a
                  href={`mailto:${t('email')}`}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {t('email')}
                </a>
              </address>
            </div>

            {/* Column 2: Quick nav */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-grey">
                {tNav('home').charAt(0).toUpperCase() + tNav('home').slice(1) === tNav('home') ? 'Pagini' : 'Pages'}
              </h3>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    locale={locale}
                    className="text-sm text-grey transition-colors duration-200 hover:text-burgundy"
                  >
                    {tNav(link.key)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Newsletter */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-grey">
                {t('newsletter.title')}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Phase 5 wiring — form does nothing yet
                }}
                className="flex flex-col gap-3"
              >
                <div className="flex">
                  <input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    required
                    className="h-12 flex-1 rounded-l-md border border-[oklch(0.28_0.005_80)] bg-[oklch(0.22_0.005_80)] px-4 text-sm text-white placeholder:text-grey/60 focus:outline-none focus:ring-1 focus:ring-burgundy"
                    aria-label={t('newsletter.placeholder')}
                  />
                  <button
                    type="submit"
                    className="h-12 rounded-r-md bg-grey px-4 text-sm font-semibold text-[#262523] transition-all duration-200 hover:brightness-95"
                  >
                    {t('newsletter.submit')}
                  </button>
                </div>
                <label className="flex items-start gap-2 text-xs text-grey/80">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-grey/30 bg-transparent"
                  />
                  <span>{t('newsletter.gdpr')}</span>
                </label>
              </form>
            </div>

            {/* Column 4: Social links */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-grey">
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
                    className="flex h-12 w-12 items-center justify-center text-grey transition-all duration-200 hover:scale-110 hover:text-white"
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
          <div className="border-t border-[oklch(0.28_0.005_80)] pt-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-grey">{t('copyright')}</p>
              <nav className="flex gap-4">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href as '/'}
                    locale={locale}
                    className="text-xs text-grey transition-colors duration-200 hover:text-white"
                  >
                    {t(`legal.${link.key}`)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </footer>
  );
}
