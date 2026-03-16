'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MapPin, Mail, Phone, Clock, Linkedin, Instagram, Facebook } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { trackEvent } from '@/lib/analytics';

/**
 * Contact info glass card with address, email, phone, hours, and social links.
 * Fades in from right with 200ms delay.
 */
export function ContactInfo(): React.JSX.Element {
  const t = useTranslations('contact');

  const contactItems = [
    {
      icon: MapPin,
      label: t('info.address.label'),
      value: t('info.address.value'),
      href: undefined,
    },
    {
      icon: Mail,
      label: t('info.email.label'),
      value: t('info.email.value'),
      href: `mailto:${t('info.email.value')}`,
    },
    {
      icon: Phone,
      label: t('info.phone.label'),
      value: t('info.phone.value'),
      href: `tel:${t('info.phone.value').replace(/\s/g, '')}`,
    },
    {
      icon: Clock,
      label: t('info.hours.label'),
      value: t('info.hours.value'),
      href: undefined,
    },
  ] as const;

  return (
    <ScrollReveal yOffset={0} duration={0.5} start="top 85%">
      <div className="rounded-2xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-8 shadow-sm">
        <div className="space-y-6">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--section-bg)]">
                  <Icon className="size-5 text-[var(--section-text-muted)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--section-text-muted)]">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[var(--section-text)] transition-colors hover:text-[var(--ds-color-violet)]"
                      onClick={() => {
                        const type = item.href!.startsWith('mailto:') ? 'email' : 'phone';
                        trackEvent(`click_${type}`, { event_category: 'contact', event_label: item.value });
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[var(--section-text)]">{item.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Social links */}
        <div className="mt-8 border-t border-[var(--section-border)] pt-6">
          <p className="mb-4 text-sm text-[var(--section-text-muted)]">{t('info.social')}</p>
          <div className="flex gap-3">
            {([
              { key: 'linkedin', Icon: Linkedin, url: 'https://linkedin.com/company/aceagency' },
              { key: 'instagram', Icon: Instagram, url: 'https://instagram.com/aceagency' },
              { key: 'facebook', Icon: Facebook, url: 'https://facebook.com/aceagency' },
            ] as const).map(({ key, Icon, url }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-lg bg-[var(--section-bg)] text-[var(--section-text-muted)] transition-colors hover:bg-[var(--section-border)] hover:text-[var(--section-text)]"
                aria-label={key}
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Office location photo */}
      <div className="mt-6 overflow-hidden rounded-xl">
        <Image
          src="/images/contact/office-location.webp"
          alt="Locația biroului Laboratorul de Conversii din București"
          width={1400}
          height={500}
          className="h-auto max-h-[300px] w-full object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
    </ScrollReveal>
  );
}
