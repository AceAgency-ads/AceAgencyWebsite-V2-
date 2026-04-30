import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CTAButton } from '@/components/ui/CTAButton';
import { Overline } from '@/components/ui/Overline';
import { BurgundyGlow } from '@/components/ui/BurgundyGlow';
import { Breadcrumb } from '@/components/sections/Breadcrumb';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ContactPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  // Channel cards
  const channels = [
    {
      key: 'email' as const,
      href: `mailto:${t('channels.email.value')}`,
    },
    { key: 'calendar' as const, href: '#form' },
    { key: 'office' as const, href: undefined },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#262523] px-4 pt-28 pb-16 text-white sm:px-6 md:pt-32 lg:px-8 lg:pt-40 lg:pb-20">
        <BurgundyGlow style={{ top: -200, right: -180 }} size={700} />
        <BurgundyGlow
          variant="bright"
          style={{ bottom: -180, left: -120 }}
          size={480}
        />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
          />
          <Overline dark className="mt-2 mb-6">
            {t('hero.overline')}
          </Overline>
          <h1 className="max-w-[20ch] font-heading text-[clamp(2rem,4.5vw+1rem,4rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
            {t.rich('hero.h1', {
              accent: (chunks: ReactNode) => (
                <span className="text-[#C4394A]">{chunks}</span>
              ),
            })}
          </h1>
          <p className="mt-7 max-w-[60ch] font-subheading text-[17px] leading-[1.55] text-[#D9D9D9] sm:text-[18px]">
            {t('hero.body')}
          </p>
        </div>
      </section>

      {/* Channel cards */}
      <section className="bg-white px-4 py-16 text-[#262523] sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <Overline className="mb-6">{t('channels.overline')}</Overline>
          <ul className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {channels.map((ch) => (
              <li key={ch.key}>
                <article className="h-full rounded-2xl border border-[#E8E6E3] bg-[#FAF9F7] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#56151A]/40">
                  <div className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[#71706E]">
                    {t(`channels.${ch.key}.label`)}
                  </div>
                  <div className="mt-2 font-heading text-[24px] font-bold leading-tight text-[#56151A]">
                    {ch.href ? (
                      <a
                        href={ch.href}
                        className="underline-offset-4 hover:underline"
                      >
                        {t(`channels.${ch.key}.value`)}
                      </a>
                    ) : (
                      t(`channels.${ch.key}.value`)
                    )}
                  </div>
                  <p className="mt-3 font-body text-[14px] leading-[1.6] text-[#71706E]">
                    {t(`channels.${ch.key}.note`)}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form (placeholder — Resend wiring in Phase 5) */}
      <section
        id="form"
        className="bg-[#FAF9F7] px-4 py-16 text-[#262523] sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-[820px]">
          <Overline className="mb-4">{t('form.overline')}</Overline>
          <h2 className="font-heading text-[clamp(1.5rem,3vw+0.5rem,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em]">
            {t('form.h2')}
          </h2>

          <form
            action="#"
            method="post"
            className="mt-9 grid gap-5 rounded-2xl border border-[#E8E6E3] bg-white p-6 sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="font-body text-[13px] font-semibold text-[#262523]">
                  {t('form.fields.name')}
                </span>
                <input
                  type="text"
                  required
                  name="name"
                  placeholder={t('form.fields.namePlaceholder')}
                  className="mt-2 h-12 w-full rounded-lg border border-[#E8E6E3] bg-white px-4 font-body text-[14px] text-[#262523] placeholder:text-[#71706E]/60 focus:border-[#56151A] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="font-body text-[13px] font-semibold text-[#262523]">
                  {t('form.fields.email')}
                </span>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder={t('form.fields.emailPlaceholder')}
                  className="mt-2 h-12 w-full rounded-lg border border-[#E8E6E3] bg-white px-4 font-body text-[14px] text-[#262523] placeholder:text-[#71706E]/60 focus:border-[#56151A] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="font-body text-[13px] font-semibold text-[#262523]">
                  {t('form.fields.company')}
                </span>
                <input
                  type="text"
                  name="company"
                  placeholder={t('form.fields.companyPlaceholder')}
                  className="mt-2 h-12 w-full rounded-lg border border-[#E8E6E3] bg-white px-4 font-body text-[14px] text-[#262523] placeholder:text-[#71706E]/60 focus:border-[#56151A] focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="font-body text-[13px] font-semibold text-[#262523]">
                  {t('form.fields.website')}
                </span>
                <input
                  type="url"
                  name="website"
                  placeholder={t('form.fields.websitePlaceholder')}
                  className="mt-2 h-12 w-full rounded-lg border border-[#E8E6E3] bg-white px-4 font-body text-[14px] text-[#262523] placeholder:text-[#71706E]/60 focus:border-[#56151A] focus:outline-none"
                />
              </label>
            </div>

            <label className="block">
              <span className="font-body text-[13px] font-semibold text-[#262523]">
                {t('form.fields.message')}
              </span>
              <textarea
                required
                name="message"
                rows={5}
                placeholder={t('form.fields.messagePlaceholder')}
                className="mt-2 w-full rounded-lg border border-[#E8E6E3] bg-white px-4 py-3 font-body text-[14px] text-[#262523] placeholder:text-[#71706E]/60 focus:border-[#56151A] focus:outline-none"
              />
            </label>

            <label className="flex items-start gap-3 font-body text-[13px] leading-[1.5] text-[#71706E]">
              <input
                type="checkbox"
                required
                name="gdpr"
                className="mt-0.5 h-4 w-4 rounded border-[#E8E6E3] accent-[#56151A]"
              />
              <span>{t('form.fields.gdpr')}</span>
            </label>

            <div className="flex justify-end">
              <CTAButton type="submit">{t('form.fields.submit')}</CTAButton>
            </div>
          </form>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[#262523] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
        <BurgundyGlow style={{ top: '20%', right: '-10%' }} size={520} />

        <div className="relative z-10 mx-auto max-w-[820px] text-center">
          <h2 className="font-heading text-[clamp(1.75rem,3.5vw+0.5rem,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
            {t('finalCta.h2')}
          </h2>
          <p className="mx-auto mt-5 max-w-[55ch] font-subheading text-[16px] leading-[1.55] text-[#D9D9D9] sm:text-[17px]">
            {t('finalCta.body')}
          </p>
          <div className="mt-7 flex justify-center">
            <CTAButton asChild>
              <Link href="#form">{t('finalCta.primaryCta')}</Link>
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
