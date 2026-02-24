import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { HeroTransition } from '@/components/sections/HeroTransition';
import { ServicesPreview } from '@/components/sections/home/ServicesPreview';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { AboutPreview } from '@/components/sections/home/AboutPreview';
import { Testimonials } from '@/components/sections/home/Testimonials';
import { CTASection } from '@/components/sections/home/CTASection';
import { Newsletter } from '@/components/sections/home/Newsletter';
import {
  organizationSchema,
  localBusinessSchema,
  renderJsonLd,
} from '@/lib/seo/schemas';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: '',
    locale,
  });
}

export default async function HomePage({
  params,
}: HomePageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(localBusinessSchema()) }}
      />
      <HeroSection />
      <HeroTransition namespace="home" i18nPrefix="heroTransition" />
      <ServicesPreview />
      <StatsSection />
      <AboutPreview />
      <Testimonials />
      <CTASection />
      <Newsletter />
    </>
  );
}
