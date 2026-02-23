'use server';

import { resend } from '@/lib/resend';
import { contactFormSchema } from '@/lib/validations/contact-schema';

export type ContactFormState = {
  readonly success: boolean;
  readonly errors?: Readonly<Record<string, readonly string[]>>;
  readonly message?: string;
};

/**
 * Contact form Server Action.
 * Validates with Zod, checks honeypot, sends email via Resend.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot check — silent success to fool bots
  const honeypot = formData.get('honeypot') as string;
  if (honeypot) {
    return { success: true };
  }

  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: (formData.get('phone') as string) || '',
    service: (formData.get('service') as string) || '',
    message: formData.get('message') as string,
    honeypot: (formData.get('honeypot') as string) ?? '',
  };

  const result = contactFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, phone, service, message } = result.data;

  // Use onboarding@resend.dev as fallback in dev (unverified domain)
  const fromAddress =
    process.env.NODE_ENV === 'production'
      ? 'AceAgency Contact <noreply@aceagency.ro>'
      : 'AceAgency Contact <onboarding@resend.dev>';

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: ['cretualin@aceagency.ro'],
      replyTo: email,
      subject: `Nou mesaj de contact - ${name}`,
      html: `
        <h2>Mesaj nou de pe aceagency.ro</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${service ? `<p><strong>Serviciu:</strong> ${service}</p>` : ''}
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">Trimis de pe formularul de contact aceagency.ro</p>
      `,
    });

    if (error) {
      console.error('[contact-action] Resend error:', error);
      return { success: false, message: 'emailSendFailed' };
    }

    return { success: true };
  } catch (err) {
    console.error('[contact-action] Unexpected error:', err);
    return { success: false, message: 'emailSendFailed' };
  }
}
