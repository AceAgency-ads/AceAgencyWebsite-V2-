'use client';

import { useActionState, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Loader2 } from 'lucide-react';
import { submitContactForm, type ContactFormState } from '@/lib/actions/contact';
import { contactFormSchema } from '@/lib/validations/contact-schema';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { trackEvent } from '@/lib/analytics';

const SERVICE_OPTIONS = [
  'web',
  'google-ads',
  'facebook-ads',
  'tiktok-ads',
  'seo',
  'email-marketing',
  'consultanta',
  'altele',
] as const;

const initialState: ContactFormState = { success: false };

/**
 * Contact form with useActionState, on-blur validation, and honeypot.
 * Redirects to /multumim on success.
 */
export function ContactForm(): React.JSX.Element {
  const t = useTranslations('contact');
  const router = useRouter();
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  // Track generate_lead event and redirect on success
  useEffect(() => {
    if (state.success) {
      trackEvent('generate_lead', { event_category: 'contact', event_label: 'contact_form' });
      router.push('/multumim');
    }
  }, [state.success, router]);

  // On-blur field validation using full schema parse and extracting field errors
  const validateField = useCallback(
    (fieldName: string, value: string) => {
      // Build a minimal object for the full schema (only the field we care about)
      const testData: Record<string, string> = {
        name: '',
        email: '',
        message: '',
        honeypot: '',
        [fieldName]: value,
      };

      const result = contactFormSchema.safeParse(testData);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        const errors = fieldErrors[fieldName as keyof typeof fieldErrors];
        if (errors && errors.length > 0) {
          const errorKey = errors[0] ?? '';
          const translated = t.has(`form.validation.${errorKey}`)
            ? t(`form.validation.${errorKey}`)
            : errorKey;
          setClientErrors((prev) => ({ ...prev, [fieldName]: translated }));
          return;
        }
      }

      // No error for this field — clear it
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    },
    [t]
  );

  const handleBlur = (fieldName: string) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      validateField(fieldName, value);
    }
  };

  // Get server-side error for a field
  const getServerError = (fieldName: string): string | undefined => {
    if (!state.errors) return undefined;
    const errors = state.errors[fieldName];
    if (!errors || errors.length === 0) return undefined;
    const key = errors[0] ?? '';
    return t.has(`form.validation.${key}`) ? t(`form.validation.${key}`) : key;
  };

  // Combined error for a field (client takes priority)
  const getFieldError = (fieldName: string): string | undefined => {
    return clientErrors[fieldName] ?? getServerError(fieldName);
  };

  const inputClasses =
    'w-full rounded-xl border border-[var(--section-border)] bg-[var(--section-card-bg)] px-4 py-3 text-[var(--section-text)] placeholder:text-[var(--section-text-muted)]/60 transition-colors focus:border-[var(--ds-color-violet)] focus:outline-none focus:ring-1 focus:ring-[var(--ds-color-violet)] disabled:opacity-50';

  const errorClasses = 'mt-1.5 text-sm text-red-400';

  return (
    <form action={formAction} className="space-y-6">
      {/* Server error message */}
      {state.message && !state.success && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {t.has(`form.error.generic`) ? t('form.error.generic') : state.message}
        </div>
      )}

      <ScrollReveal>
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]">
              {t('form.name.label')} *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={t('form.name.placeholder')}
              onBlur={handleBlur('name')}
              disabled={pending}
              className={inputClasses}
            />
            {getFieldError('name') && <p className={errorClasses}>{getFieldError('name')}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]">
              {t('form.email.label')} *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t('form.email.placeholder')}
              onBlur={handleBlur('email')}
              disabled={pending}
              className={inputClasses}
            />
            {getFieldError('email') && <p className={errorClasses}>{getFieldError('email')}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]">
              {t('form.phone.label')}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={t('form.phone.placeholder')}
              onBlur={handleBlur('phone')}
              disabled={pending}
              className={inputClasses}
            />
            {getFieldError('phone') && <p className={errorClasses}>{getFieldError('phone')}</p>}
          </div>

          {/* Service */}
          <div>
            <label htmlFor="contact-service" className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]">
              {t('form.service.label')}
            </label>
            <select
              id="contact-service"
              name="service"
              disabled={pending}
              defaultValue=""
              onBlur={handleBlur('service')}
              className={`${inputClasses} appearance-none`}
            >
              <option value="" disabled>
                {t('form.service.placeholder')}
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-[var(--section-bg)] text-[var(--section-text)]">
                  {t(`form.service.options.${option}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-[var(--section-text-muted)]">
              {t('form.message.label')} *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder={t('form.message.placeholder')}
              onBlur={handleBlur('message')}
              disabled={pending}
              className={`${inputClasses} resize-none`}
            />
            {getFieldError('message') && <p className={errorClasses}>{getFieldError('message')}</p>}
          </div>
        </div>
      </ScrollReveal>

      {/* Honeypot -- hidden from real users */}
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
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ds-color-violet)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t('form.submitting')}
          </>
        ) : (
          t('form.submit')
        )}
      </button>
    </form>
  );
}
