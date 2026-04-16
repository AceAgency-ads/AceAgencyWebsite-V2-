import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { GrowthLeadMagnetCTA } from '@/components/sections/growth/GrowthLeadMagnetCTA';
import { GrowthFooter } from '@/components/sections/growth/GrowthFooter';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface ChecklistPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ChecklistPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'growth' });

  return generatePageMetadata({
    title: t('checklist.meta.title'),
    description: t('checklist.meta.description'),
    path: 'growth/checklist',
    locale,
  });
}

export default async function ChecklistPage({
  params,
}: ChecklistPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'growth' });

  const bullets = t.raw('checklist.bullets') as Record<string, string>;
  const bulletItems = Object.values(bullets);

  return (
    <>
      {/* Hero section */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-[#262523] px-4 py-20 text-center">
        <ScrollReveal className="mx-auto max-w-2xl">
          <h1 className="mb-6 font-[family-name:var(--font-glacial)] text-4xl font-bold text-white md:text-5xl">
            {t('checklist.headline')}
          </h1>
          <p className="mb-10 font-[family-name:var(--font-red-hat)] text-lg text-[#D9D9D9] md:text-xl">
            {t('checklist.subheadline')}
          </p>

          <Image
            src="/images/growth/checklist-poster.webp"
            alt="Ghidul de Scalare pentru Magazine Online"
            width={400}
            height={566}
            className="mx-auto rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          />

          {/* Bullet preview */}
          <ul className="mx-auto mb-12 max-w-lg space-y-4 text-left">
            {bulletItems.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-[#D9D9D9]"
              >
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-[#66F3A6]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      {/* Lead magnet form — reuses same component */}
      <GrowthLeadMagnetCTA />

      <GrowthFooter />
    </>
  );
}
