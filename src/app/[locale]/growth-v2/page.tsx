import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { GrowthV2Page } from '@/components/sections/growth-v2/GrowthV2Page';

interface GrowthV2RouteProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: GrowthV2RouteProps): Promise<Metadata> {
  const { locale } = await params;
  const isRo = locale === 'ro';

  return generatePageMetadata({
    title: isRo
      ? 'Growth V2 | Creștere pentru Magazine Online'
      : 'Growth V2 | Growth for Ecommerce Brands',
    description: isRo
      ? 'Varianta V2 a paginii de creștere pentru magazine online, inspirată din design handoff-ul AceAgency.'
      : 'V2 growth landing page for ecommerce brands, implemented from the AceAgency design handoff.',
    path: 'growth-v2',
    locale,
    ogImage: '/images/growth/og-image.webp',
  });
}

export default async function GrowthV2Route({
  params,
}: GrowthV2RouteProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GrowthV2Page locale={locale} />;
}
