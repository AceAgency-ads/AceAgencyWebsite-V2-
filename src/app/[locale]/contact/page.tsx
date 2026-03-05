import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { GoogleMap } from '@/components/sections/contact/GoogleMap';
import { ContactFAQ } from '@/components/sections/contact/ContactFAQ';
import { BookingSection } from '@/components/sections/contact/BookingSection';
import { ContactNewsletter } from '@/components/sections/contact/ContactNewsletter';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { organizationSchema, renderJsonLd } from '@/lib/seo/schemas';
import Image from 'next/image';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'contact',
    locale,
  });
}

export default async function ContactPage({
  params,
}: ContactPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderJsonLd(organizationSchema()) }}
      />
      <ContactHero
        breadcrumbItems={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.contact') },
        ]}
      />

      {/* Form + Info two-column section */}
      <SectionWrapper theme="light-warm" id="contact-form">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:gap-16">
          <div>
            <div className="mb-8 overflow-hidden rounded-xl">
              <Image
                src="/images/contact/contact-team.webp"
                alt="Membrii echipei Laboratorul de Conversii gata să vă ajute"
                width={800}
                height={1000}
                className="h-auto max-h-[300px] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </SectionWrapper>

      <GoogleMap />

      <BookingSection />

      <ContactNewsletter />

      <ContactFAQ />
    </>
  );
}
