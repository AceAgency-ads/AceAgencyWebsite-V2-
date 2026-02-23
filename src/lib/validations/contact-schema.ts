import { z } from 'zod';

/**
 * Zod schema for the contact form.
 * Error messages are i18n keys — resolved at render time via useTranslations.
 */
export const contactFormSchema = z.object({
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
    .regex(/^(\+40|0)[0-9]{9}$/, { message: 'phoneInvalid' })
    .optional()
    .or(z.literal('')),
  service: z
    .enum([
      'web',
      'google-ads',
      'facebook-ads',
      'tiktok-ads',
      'seo',
      'email-marketing',
      'consultanta',
      'altele',
    ])
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, { message: 'messageMinLength' })
    .max(2000, { message: 'messageMaxLength' }),
  honeypot: z.string().max(0),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
