'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

/** Client logo definitions. Replace placeholder SVGs with real logos. */
const CLIENT_LOGOS = [
  { name: 'TechStart', src: '/images/clients/techstart.svg' },
  { name: 'Digital Commerce', src: '/images/clients/digitalcommerce.svg' },
  { name: 'StartUp Hub', src: '/images/clients/startup-hub.svg' },
  { name: 'FashionRo', src: '/images/clients/fashionro.svg' },
  { name: 'AutoService Pro', src: '/images/clients/autoservice-pro.svg' },
  { name: 'E-Shop Romania', src: '/images/clients/eshop-romania.svg' },
  { name: 'Beauty Brand', src: '/images/clients/beauty-brand.svg' },
  { name: 'Logistics Pro', src: '/images/clients/logistics-pro.svg' },
] as const;

/**
 * Client logo marquee bar.
 * Dark section with infinite CSS marquee of client logos.
 * Logos are grayscale by default, color on hover.
 * Respects prefers-reduced-motion: shows static grid instead of marquee.
 */
export function ClientLogoBar(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="dark" id="client-logos" className="overflow-hidden">
      <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.12em] text-[var(--section-text-muted)]">
        {t('clientLogos.heading')}
      </p>

      {/* Marquee track — duplicated logos for seamless loop */}
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-12 md:gap-16">
          {/* First set */}
          {CLIENT_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex-shrink-0 grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto md:h-10"
              />
            </div>
          ))}
          {/* Duplicated set for seamless loop */}
          {CLIENT_LOGOS.map((logo) => (
            <div
              key={`dup-${logo.name}`}
              className="flex-shrink-0 grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              aria-hidden="true"
            >
              <Image
                src={logo.src}
                alt=""
                width={120}
                height={40}
                className="h-8 w-auto md:h-10"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Static grid fallback for reduced motion — hidden by default, shown via CSS */}
      <div className="hidden motion-reduce:grid motion-reduce:grid-cols-2 motion-reduce:gap-6 sm:motion-reduce:grid-cols-4">
        {CLIENT_LOGOS.map((logo) => (
          <div
            key={`static-${logo.name}`}
            className="flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={120}
              height={40}
              className="h-8 w-auto md:h-10"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
