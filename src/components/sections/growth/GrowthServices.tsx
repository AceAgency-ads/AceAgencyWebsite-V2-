'use client';

import { useTranslations } from 'next-intl';
import {
  Megaphone,
  Video,
  Search,
  Palette,
  Mail,
  BarChart3,
  Bot,
  FileBarChart,
} from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

/** Shape of a single service item from i18n. */
interface ServiceItem {
  readonly title: string;
  readonly description: string;
  readonly highlighted?: boolean;
}

/** Icons mapped by index to match the service order. */
const SERVICE_ICONS = [
  Megaphone,   // Meta Ads
  Video,       // TikTok Ads
  Search,      // Google Ads
  Palette,     // Creative
  Mail,        // Email Marketing
  BarChart3,   // CRO
  Bot,         // AdPilot AI
  FileBarChart, // Raportare
] as const;

const ITEM_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7'] as const;

/**
 * ACE Growth Engine — Services grid.
 * 8 service cards (1 col mobile, 2 tablet, 4 desktop).
 * The AdPilot AI card (index 6) gets a highlighted mint glow.
 * Dark luxury design with radial violet ambient glow.
 */
export function GrowthServices(): React.JSX.Element {
  const t = useTranslations('growth');

  return (
    <section className="relative bg-[#262523] px-6 py-10 md:py-14">
      {/* Radial violet ambient glow behind section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#650CBE]/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <h2 className="mb-3 font-[family-name:var(--font-glacial)] text-3xl font-bold text-white md:text-4xl">
              {t('services.heading')}
            </h2>
            <p className="mx-auto max-w-2xl font-[family-name:var(--font-red-hat)] text-[#D9D9D9]">
              {t('services.subheading')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEM_KEYS.map((key) => {
            const index = Number(key);
            const item = t.raw(`services.items.${key}`) as ServiceItem;
            const Icon = SERVICE_ICONS[index] as typeof Megaphone;
            const isHighlighted = item.highlighted === true;

            return (
              <ScrollReveal key={key}>
                <article
                  className={`flex flex-col rounded-2xl border p-6 backdrop-blur transition-all duration-300 hover:scale-[1.02] ${
                    isHighlighted
                      ? 'border-[#66F3A6]/50 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_25px_rgba(102,243,166,0.2)]'
                      : 'border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-[#650CBE]/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(101,12,190,0.15)]'
                  }`}
                >
                  <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#650CBE]/25 to-transparent">
                    <Icon className="size-7 text-[#66F3A6]" />
                  </div>

                  <h3 className="mb-2 font-[family-name:var(--font-glacial)] text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#D9D9D9]">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
