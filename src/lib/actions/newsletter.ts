'use server';

import { resend } from '@/lib/resend';
import { newsletterSchema } from '@/lib/validations/newsletter-schema';

export type NewsletterState = {
  readonly success: boolean;
  readonly error?: string;
};

/**
 * Newsletter signup Server Action.
 * Validates email, checks honeypot, notifies agency via Resend.
 */
export async function submitNewsletter(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  // Honeypot check — silent success to fool bots
  const honeypot = formData.get('honeypot') as string;
  if (honeypot) {
    return { success: true };
  }

  const rawData = {
    email: formData.get('email') as string,
    honeypot: (formData.get('honeypot') as string) ?? '',
  };

  const result = newsletterSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      error: 'emailInvalid',
    };
  }

  const { email } = result.data;

  const fromAddress =
    process.env.NODE_ENV === 'production'
      ? 'Laboratorul de Conversii Newsletter <noreply@aceagency.ro>'
      : 'Laboratorul de Conversii Newsletter <onboarding@resend.dev>';

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: ['cretualin@aceagency.ro'],
      subject: `Newsletter: ${email}`,
      html: `
        <h2>Nou abonat newsletter</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>Adaugat de pe site</p>
      `,
    });

    if (error) {
      console.error('[newsletter-action] Resend error:', error);
      return { success: false, error: 'emailSendFailed' };
    }

    return { success: true };
  } catch (err) {
    console.error('[newsletter-action] Unexpected error:', err);
    return { success: false, error: 'emailSendFailed' };
  }
}
