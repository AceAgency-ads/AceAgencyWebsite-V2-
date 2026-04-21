'use client';

import { useActionState, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { submitLeadMagnet, type GrowthFormState } from '@/lib/actions/growth';
import { leadMagnetSchema } from '@/lib/validations/growth-schema';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SectionWrapper } from '@/components/sections/SectionWrapper';

const initialState: GrowthFormState = { success: false };

const defaultBullets = [
  '\u2713 Ce am facut concret ca sa ducem Amora de la ROAS 3x la 8x',
  '\u2713 Strategia de TikTok Ads care a scazut CPA-ul cu 36%',
  '\u2713 Cum am crescut revenue-ul Trady cu 691%',
];

/**
 * Secondary lead magnet CTA with mini form (name, email, storeUrl).
 * Two-column layout: ebook cover + form on desktop, stacked on mobile.
 * Shows success message on completion instead of redirecting.
 */
export function GrowthLeadMagnetCTA(): React.JSX.Element {
  const t = useTranslations('growth');
  const [state, formAction, pending] = useActionState(submitLeadMagnet, initialState);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const showSuccess = state.success;

  // On-blur field validation
  const validateField = useCallback(
    (fieldName: string, value: string) => {
      const testData: Record<string, string> = {
        name: '',
        email: '',
        phone: '',
        gdprConsent: 'on',
        honeypot: '',
        [fieldName]: value,
      };

      const result = leadMagnetSchema.safeParse(testData);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        const errors = fieldErrors[fieldName as keyof typeof fieldErrors];
        if (errors && errors.length > 0) {
          const errorKey = errors[0] ?? '';
          const translated = t.has(`leadMagnet.validation.${errorKey}`)
            ? t(`leadMagnet.validation.${errorKey}`)
            : errorKey;
          setClientErrors((prev) => ({ ...prev, [fieldName]: translated }));
          return;
        }
      }

      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    },
    [t]
  );

  const handleBlur =
    (fieldName: string) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value) {
        validateField(fieldName, value);
      }
    };

  const getServerError = (fieldName: string): string | undefined => {
    if (!state.errors) return undefined;
    const errors = state.errors[fieldName];
    if (!errors || errors.length === 0) return undefined;
    const key = errors[0] ?? '';
    return t.has(`leadMagnet.validation.${key}`) ? t(`leadMagnet.validation.${key}`) : key;
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return clientErrors[fieldName] ?? getServerError(fieldName);
  };

  const inputClasses =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[var(--section-text)] placeholder:text-[var(--section-text-muted)]/60 transition-all focus:border-[#650CBE]/50 focus:outline-none focus:ring-1 focus:ring-[#650CBE]/40 focus:shadow-[0_0_12px_rgba(101,12,190,0.3)] disabled:opacity-50';

  const errorClasses = 'mt-1.5 text-sm text-red-400';

  // Get bullets from i18n or use defaults
  const bullets: string[] = t.has('leadMagnet.bullets')
    ? (Object.values(t.raw('leadMagnet.bullets') as Record<string, string>))
    : defaultBullets;

  return (
    <SectionWrapper theme="dark" id="lead-magnet" compact>
      <div className="relative mx-auto max-w-5xl">
        {/* Radial violet glow behind section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#650CBE]/10 blur-[120px]"
        />

        <ScrollReveal className="mb-10 text-center">
          <h3 className="font-[family-name:var(--font-glacial)] text-2xl font-bold text-[var(--section-text)] md:text-3xl">
            {t('leadMagnet.heading')}
          </h3>
          <p className="mt-3 text-base text-[var(--section-text-muted)]">
            {t('leadMagnet.subheading')}
          </p>
          <p className="mt-2 text-sm font-medium text-[#650CBE]">
            {t('leadMagnet.title')}
          </p>
        </ScrollReveal>

        {showSuccess ? (
          <ScrollReveal className="text-center">
            <div className="rounded-xl border border-[#66F3A6]/20 bg-[#66F3A6]/10 px-6 py-8">
              <p className="text-lg font-semibold text-[#66F3A6]">
                {t('leadMagnet.success')}
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left column: Ebook cover + bullets */}
              <div className="flex flex-col items-center gap-6">
                <Image
                  src="/images/growth/ebook-cover.webp"
                  alt="Ghidul de Scalare pentru Magazine Online"
                  width={400}
                  height={566}
                  className="mx-auto rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                />
                <ul className="space-y-2 text-sm text-[#D9D9D9]/80">
                  {bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Right column: Form */}
              <div>
                <form action={formAction} className="space-y-5">
                  {/* Server error */}
                  {state.message && !state.success && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {t.has(`leadMagnet.error.${state.message}`)
                        ? t(`leadMagnet.error.${state.message}`)
                        : state.message}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
                    >
                      {t('leadMagnet.fields.name')} *
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={t('leadMagnet.fields.namePlaceholder')}
                      onBlur={handleBlur('name')}
                      disabled={pending}
                      className={inputClasses}
                    />
                    {getFieldError('name') && (
                      <p className={errorClasses}>{getFieldError('name')}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
                    >
                      {t('leadMagnet.fields.email')} *
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={t('leadMagnet.fields.emailPlaceholder')}
                      onBlur={handleBlur('email')}
                      disabled={pending}
                      className={inputClasses}
                    />
                    {getFieldError('email') && (
                      <p className={errorClasses}>{getFieldError('email')}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
                    >
                      {t('leadMagnet.fields.phone')} *
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={t('leadMagnet.fields.phonePlaceholder')}
                      onBlur={handleBlur('phone')}
                      disabled={pending}
                      className={inputClasses}
                    />
                    {getFieldError('phone') && (
                      <p className={errorClasses}>{getFieldError('phone')}</p>
                    )}
                  </div>

                  {/* GDPR Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      id="lead-gdprConsent"
                      name="gdprConsent"
                      type="checkbox"
                      required
                      disabled={pending}
                      className="mt-1 size-4 shrink-0 rounded border-white/20 bg-white/[0.03] accent-[#650CBE]"
                    />
                    <label
                      htmlFor="lead-gdprConsent"
                      className="text-sm text-[var(--section-text-muted)]/80"
                    >
                      {t('leadMagnet.gdprConsent')}
                    </label>
                  </div>
                  {getFieldError('gdprConsent') && (
                    <p className={errorClasses}>{getFieldError('gdprConsent')}</p>
                  )}

                  {/* Honeypot */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] opacity-0"
                    style={{ position: 'absolute', left: '-9999px' }}
                  >
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#650CBE] bg-transparent px-6 py-3 text-sm font-semibold text-[#650CBE] transition-colors hover:bg-[#650CBE]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {t('leadMagnet.submitting')}
                      </>
                    ) : (
                      t('leadMagnet.submit')
                    )}
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </SectionWrapper>
  );
}
