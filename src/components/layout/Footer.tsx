'use client';

import Image from 'next/image';
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
 * Full-width footer — AceAgency burgundy palette.
 * Dark bg (#262523), burgundy accent highlights.
 */
export function Footer(): React.JSX.Element {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tNav = useTranslations('navigation');
  const tSocial = useTranslations('social');

  return (
    <footer className="bg-[#262523] py-16 text-[#D9D9D9] lg:py-24">
      <Container>
        {/* Row 1: Logo, tagline, division badges */}
        <ScrollReveal className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-4">
            <Link href="/" locale={locale} aria-label="AceAgency">
              <Image
                src="/ace-agency-logo.webp"
                alt="AceAgency"
                width={120}
                height={38}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-md text-sm text-[#a0a0a0]">{t('tagline')}</p>
            <div className="flex flex-wrap gap-2">
              {DIVISIONS.map((div) => (
                <span
                  key={div}
                  className="rounded-full border border-[#4a464380] px-3 py-1 text-xs font-medium text-[#a0a0a0]"
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
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#a0a0a0]">
                Contact
              </h3>
              <address className="flex flex-col gap-2 text-sm not-italic text-[#a0a0a0]">
                <span>{t('address')}</span>
                <a
                  href={`tel:${t('phone')}`}
                  className="transition-colors duration-200 hover:text-[#D9D9D9]"
                >
                  {t('phone')}
                </a>
                <a
                  href={`mailto:${t('email')}`}
                  className="transition-colors duration-200 hover:text-[#D9D9D9]"
                >
                  {t('email')}
                </a>
              </address>
            </div>

            {/* Column 2: Quick nav */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#a0a0a0]">
                {tNav('home').charAt(0).toUpperCase() + tNav('home').slice(1) === tNav('home') ? 'Pagini' : 'Pages'}
              </h3>
              <nav className="flex flex-col gap-2">
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
            </div>

            {/* Column 3: Newsletter */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#a0a0a0]">
                {t('newsletter.title')}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="flex flex-col gap-3"
              >
                <div className="flex">
                  <input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    required
                    className="h-12 flex-1 rounded-l-md border border-[#4a464380] bg-[#3a3836] px-4 text-sm text-[#D9D9D9] placeholder:text-[#a0a0a0]/60 focus:outline-none focus:ring-1 focus:ring-[#56151A]"
                    aria-label={t('newsletter.placeholder')}
                  />
                  <button
                    type="submit"
                    className="h-12 rounded-r-md bg-[#56151A] px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#7A2025]"
                  >
                    {t('newsletter.submit')}
                  </button>
                </div>
                <label className="flex items-start gap-2 text-xs text-[#a0a0a0]/80">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-[#4a464380] bg-transparent accent-[#56151A]"
                  />
                  <span>{t('newsletter.gdpr')}</span>
                </label>
              </form>
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
              <nav className="flex gap-4">
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
              </nav>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </footer>
  );
}
