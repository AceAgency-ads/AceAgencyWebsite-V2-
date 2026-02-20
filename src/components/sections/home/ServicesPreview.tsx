'use client';

import { useTranslations } from 'next-intl';
import {
  Code,
  Target,
  Share2,
  Play,
  Search,
  Lightbulb,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { BentoGrid } from '@/components/sections/BentoGrid';

interface ServiceDefinition {
  readonly icon: LucideIcon;
  readonly key: string;
  readonly href: string;
}

const SERVICES: readonly ServiceDefinition[] = [
  { icon: Code, key: '0', href: '/servicii' },
  { icon: Target, key: '1', href: '/servicii/google-ads' },
  { icon: Share2, key: '2', href: '/servicii/facebook-ads' },
  { icon: Play, key: '3', href: '/servicii/tiktok-ads' },
  { icon: Search, key: '4', href: '/servicii/seo' },
  { icon: Lightbulb, key: '5', href: '/servicii/consultanta-marketing' },
] as const;

/**
 * Homepage Services Preview section.
 * Displays 6 service cards in a 3-column bento grid with
 * stagger animation and hover micro-interactions.
 */
export function ServicesPreview(): React.JSX.Element {
  const t = useTranslations('home');

  return (
    <SectionWrapper theme="dark" id="services-preview">
      <SectionHeader
        overline={t('services.overline')}
        heading={t('services.heading')}
        description={t('services.description')}
        align="left"
      />

      <BentoGrid columns={3}>
        {SERVICES.map(({ icon: Icon, key, href }) => (
          <Link
            key={key}
            href={href}
            data-animate="card"
            className="group flex flex-col rounded-xl border border-[var(--section-border)] bg-[var(--section-card-bg)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_oklch(0.30_0.10_25/0.15)] md:p-8"
          >
            <Icon
              className="mb-4 size-12 text-[var(--section-text-muted)]"
              strokeWidth={1.5}
            />
            <h4 className="mb-2 text-lg font-bold text-[var(--section-text)]">
              {t(`services.items.${key}.title`)}
            </h4>
            <p className="mb-4 flex-1 text-sm text-[var(--section-text-muted)]">
              {t(`services.items.${key}.description`)}
            </p>
            <ArrowRight className="size-5 text-[var(--section-text-muted)] transition-colors duration-300 group-hover:text-[var(--color-burgundy-light,#7A2025)]" />
          </Link>
        ))}
      </BentoGrid>

      {/* CTA below grid */}
      <div className="mt-10 text-center">
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="border border-[var(--section-border)] text-[var(--section-text-muted)] hover:text-[var(--section-text)]"
        >
          <Link href="/servicii">
            {t('services.cta')}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
