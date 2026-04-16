import { z } from 'zod';

/**
 * Revenue range options for the audit form dropdown.
 */
export const revenueOptions = [
  'sub-5000',
  '5000-10000',
  '10000-30000',
  '30000-100000',
  'peste-100000',
] as const;

/**
 * Ads budget range options for the audit form dropdown.
 */
export const adsBudgetOptions = [
  'sub-1000',
  '1000-3000',
  '3000-10000',
  '10000-30000',
  'peste-30000',
] as const;

/**
 * "What have you tried" options for the audit form dropdown.
 */
export const triedBeforeOptions = [
  'nimic',
  'facebook-ads',
  'google-ads',
  'tiktok-ads',
  'seo',
  'email-marketing',
  'agentie',
  'freelancer',
  'in-house',
] as const;

/**
 * Zod schema for the audit application form (main form on /growth).
 * Error messages are i18n keys — resolved at render time via useTranslations.
 */
export const auditFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'nameMinLength' })
    .max(100, { message: 'nameMaxLength' }),
  storeUrl: z
    .string()
    .min(1, { message: 'storeUrlRequired' })
    .url({ message: 'storeUrlInvalid' }),
  revenue: z.enum(revenueOptions, { message: 'revenueRequired' }),
  adsBudget: z.enum(adsBudgetOptions, { message: 'adsBudgetRequired' }),
  triedBefore: z.enum(triedBeforeOptions, { message: 'triedBeforeRequired' }),
  blocaj: z.string().max(1000, { message: 'blocajMaxLength' }).optional().or(z.literal('')),
  honeypot: z.string().max(0),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;

/**
 * Zod schema for the lead magnet form (mini form on /growth and /growth/checklist).
 * Error messages are i18n keys — resolved at render time via useTranslations.
 */
export const leadMagnetSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'nameMinLength' })
    .max(100, { message: 'nameMaxLength' }),
  email: z
    .string()
    .min(1, { message: 'emailRequired' })
    .email({ message: 'emailInvalid' }),
  phone: z
    .string()
    .min(1, { message: 'phoneRequired' })
    .regex(/^[\d\s+()-]{7,20}$/, { message: 'phoneInvalid' }),
  gdprConsent: z
    .string()
    .refine((val) => val === 'on' || val === 'true', { message: 'gdprRequired' }),
  honeypot: z.string().max(0),
});

export type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>;
