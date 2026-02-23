'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

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
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <div className="space-y-6">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <Icon className="size-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white transition-colors hover:text-[var(--ds-color-burgundy)]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white">{item.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Social links placeholder */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="mb-4 text-sm text-gray-400">{t('info.social')}</p>
          <div className="flex gap-3">
            {(['linkedin', 'instagram', 'facebook'] as const).map((platform) => (
              <a
                key={platform}
                href="#"
                className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={platform}
              >
                <span className="text-xs font-medium uppercase">{platform.slice(0, 2)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
