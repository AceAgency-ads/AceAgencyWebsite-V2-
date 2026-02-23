import { z } from 'zod';

/**
 * Zod schema for the newsletter signup form.
 * Error messages are i18n keys — resolved at render time.
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'emailRequired' })
    .email({ message: 'emailInvalid' }),
  honeypot: z.string().max(0),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
