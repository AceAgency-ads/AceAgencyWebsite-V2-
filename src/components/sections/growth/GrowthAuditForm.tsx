'use client';

import { useActionState, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { submitAuditForm, type GrowthFormState } from '@/lib/actions/growth';
import {
  auditFormSchema,
  revenueOptions,
  adsBudgetOptions,
  triedBeforeOptions,
} from '@/lib/validations/growth-schema';
import { trackEvent } from '@/lib/analytics';
import { SectionWrapper } from '@/components/sections/SectionWrapper';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const initialState: GrowthFormState = { success: false };

/**
 * Audit application form with useActionState, on-blur validation, and honeypot.
 * Redirects to Calendly on success.
 */
export function GrowthAuditForm(): React.JSX.Element {
  const t = useTranslations('growth');
  const [state, formAction, pending] = useActionState(submitAuditForm, initialState);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  // Track event and redirect on success
  useEffect(() => {
    if (state.success && state.redirectUrl) {
      trackEvent('generate_lead', {
        event_category: 'growth',
        event_label: 'audit_form',
      });
      window.location.href = state.redirectUrl;
    }
  }, [state.success, state.redirectUrl]);

  // On-blur field validation
  const validateField = useCallback(
    (fieldName: string, value: string) => {
      const testData: Record<string, string> = {
        name: '',
        storeUrl: '',
        revenue: '',
        adsBudget: '',
        triedBefore: '',
        blocaj: '',
        honeypot: '',
        [fieldName]: value,
      };

      const result = auditFormSchema.safeParse(testData);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        const errors = fieldErrors[fieldName as keyof typeof fieldErrors];
        if (errors && errors.length > 0) {
          const errorKey = errors[0] ?? '';
          const translated = t.has(`auditForm.validation.${errorKey}`)
            ? t(`auditForm.validation.${errorKey}`)
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
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    return t.has(`auditForm.validation.${key}`) ? t(`auditForm.validation.${key}`) : key;
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return clientErrors[fieldName] ?? getServerError(fieldName);
  };

  const inputClasses =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[var(--section-text)] placeholder:text-[var(--section-text-muted)]/60 transition-all focus:border-[#650CBE]/50 focus:outline-none focus:ring-1 focus:ring-[#650CBE]/40 focus:shadow-[0_0_12px_rgba(101,12,190,0.3)] disabled:opacity-50';

  const errorClasses = 'mt-1.5 text-sm text-red-400';

  return (
    <SectionWrapper theme="dark" id="audit-form" compact>
      <SectionHeader
        overline={t('auditForm.overline')}
        heading={t('auditForm.heading')}
        description={t('auditForm.description')}
        align="center"
      />

      <ScrollReveal className="relative mx-auto max-w-2xl">
        {/* Radial violet glow behind card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#650CBE]/15 blur-[120px]"
        />

        {/* Card container with violet border glow */}
        <div className="border border-[#650CBE]/30 rounded-2xl bg-white/[0.02] p-8 md:p-10 shadow-[0_0_40px_rgba(101,12,190,0.15)]">
          <form action={formAction} className="space-y-6">
            {/* Server error */}
            {state.message && !state.success && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {t.has(`auditForm.error.${state.message}`)
                  ? t(`auditForm.error.${state.message}`)
                  : state.message}
              </div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="audit-name"
                className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
              >
                {t('auditForm.fields.name')} *
              </label>
              <input
                id="audit-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={t('auditForm.fields.namePlaceholder')}
                onBlur={handleBlur('name')}
                disabled={pending}
                className={inputClasses}
              />
              {getFieldError('name') && (
                <p className={errorClasses}>{getFieldError('name')}</p>
              )}
            </div>

            {/* Store URL */}
            <div>
              <label
                htmlFor="audit-storeUrl"
                className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
              >
                {t('auditForm.fields.storeUrl')} *
              </label>
              <input
                id="audit-storeUrl"
                name="storeUrl"
                type="url"
                required
                autoComplete="url"
                placeholder={t('auditForm.fields.storeUrlPlaceholder')}
                onBlur={handleBlur('storeUrl')}
                disabled={pending}
                className={inputClasses}
              />
              {getFieldError('storeUrl') && (
                <p className={errorClasses}>{getFieldError('storeUrl')}</p>
              )}
            </div>

            {/* Revenue */}
            <div>
              <label
                htmlFor="audit-revenue"
                className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
              >
                {t('auditForm.fields.revenue')} *
              </label>
              <select
                id="audit-revenue"
                name="revenue"
                required
                defaultValue=""
                onBlur={handleBlur('revenue')}
                disabled={pending}
                className={`${inputClasses} appearance-none`}
              >
                <option value="" disabled>
                  {t('auditForm.fields.revenuePlaceholder')}
                </option>
                {revenueOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-[var(--section-bg)] text-[var(--section-text)]"
                  >
                    {t(`auditForm.fields.revenueOptions.${option}`)}
                  </option>
                ))}
              </select>
              {getFieldError('revenue') && (
                <p className={errorClasses}>{getFieldError('revenue')}</p>
              )}
            </div>

            {/* Ads Budget */}
            <div>
              <label
                htmlFor="audit-adsBudget"
                className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
              >
                {t('auditForm.fields.adsBudget')} *
              </label>
              <select
                id="audit-adsBudget"
                name="adsBudget"
                required
                defaultValue=""
                onBlur={handleBlur('adsBudget')}
                disabled={pending}
                className={`${inputClasses} appearance-none`}
              >
                <option value="" disabled>
                  {t('auditForm.fields.adsBudgetPlaceholder')}
                </option>
                {adsBudgetOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-[var(--section-bg)] text-[var(--section-text)]"
                  >
                    {t(`auditForm.fields.adsBudgetOptions.${option}`)}
                  </option>
                ))}
              </select>
              {getFieldError('adsBudget') && (
                <p className={errorClasses}>{getFieldError('adsBudget')}</p>
              )}
            </div>

            {/* Tried Before */}
            <div>
              <label
                htmlFor="audit-triedBefore"
                className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
              >
                {t('auditForm.fields.triedBefore')} *
              </label>
              <select
                id="audit-triedBefore"
                name="triedBefore"
                required
                defaultValue=""
                onBlur={handleBlur('triedBefore')}
                disabled={pending}
                className={`${inputClasses} appearance-none`}
              >
                <option value="" disabled>
                  {t('auditForm.fields.triedBeforePlaceholder')}
                </option>
                {triedBeforeOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-[var(--section-bg)] text-[var(--section-text)]"
                  >
                    {t(`auditForm.fields.triedBeforeOptions.${option}`)}
                  </option>
                ))}
              </select>
              {getFieldError('triedBefore') && (
                <p className={errorClasses}>{getFieldError('triedBefore')}</p>
              )}
            </div>

            {/* Blocaj (optional) */}
            <div>
              <label
                htmlFor="audit-blocaj"
                className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]"
              >
                {t('auditForm.fields.blocaj')}
              </label>
              <textarea
                id="audit-blocaj"
                name="blocaj"
                rows={4}
                placeholder={t('auditForm.fields.blocajPlaceholder')}
                onBlur={handleBlur('blocaj')}
                disabled={pending}
                className={`${inputClasses} resize-none`}
              />
              {getFieldError('blocaj') && (
                <p className={errorClasses}>{getFieldError('blocaj')}</p>
              )}
            </div>

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

            {/* Submit with shine effect */}
            <button
              type="submit"
              disabled={pending}
              className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#650CBE] px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 -translate-x-full animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </span>
              <span className="relative z-10 inline-flex items-center gap-2">
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {t('auditForm.submitting')}
                  </>
                ) : (
                  t('auditForm.submit')
                )}
              </span>
            </button>

            {/* Social proof micro-copy */}
            <p className="mt-3 text-center text-xs text-[#D9D9D9]/50">
              {t.has('auditForm.socialProof')
                ? t('auditForm.socialProof')
                : '150+ magazine online auditate'}
            </p>
          </form>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
