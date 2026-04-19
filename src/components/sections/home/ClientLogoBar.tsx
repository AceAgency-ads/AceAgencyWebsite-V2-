'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

/** Real client logos. */
const CLIENT_LOGOS = [
  { name: 'Amora', src: '/images/clients/amora.png' },
  { name: 'Trady', src: '/images/clients/trady.png' },
  { name: 'DoSense', src: '/images/clients/dosense.svg' },
  { name: 'ITMAR', src: '/images/clients/itmar.webp' },
  { name: 'Leonor Institute', src: '/images/clients/leonor.png' },
  { name: 'Tutti Brasserie', src: '/images/clients/tutti.svg' },
] as const;

/**
 * Client logo marquee bar.
 * Dark section with infinite CSS marquee of client logos.
 * Logos are grayscale by default, color on hover.
 * Uses fixed-size containers with object-contain for uniform display.
 * Respects prefers-reduced-motion: shows static grid instead of marquee.
 */
export function ClientLogoBar(): React.JSX.Element {
  const t = useTranslations('home');

  const logoImage = (logo: (typeof CLIENT_LOGOS)[number], hideAlt?: boolean) => (
    <div className="relative h-14 w-40 flex-shrink-0 md:h-16 md:w-48">
      <Image
        src={logo.src}
        alt={hideAlt ? '' : logo.name}
        fill
        className="object-contain grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );

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
            <div key={logo.name}>{logoImage(logo)}</div>
          ))}
          {/* Duplicated set for seamless loop */}
          {CLIENT_LOGOS.map((logo) => (
            <div key={`dup-${logo.name}`} aria-hidden="true">
              {logoImage(logo, true)}
            </div>
          ))}
        </div>
      </div>

      {/* Static grid fallback for reduced motion — hidden by default, shown via CSS */}
      <div className="hidden motion-reduce:grid motion-reduce:grid-cols-2 motion-reduce:gap-6 sm:motion-reduce:grid-cols-3">
        {CLIENT_LOGOS.map((logo) => (
          <div
            key={`static-${logo.name}`}
            className="flex items-center justify-center"
          >
            {logoImage(logo)}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
