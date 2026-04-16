'use server';

import { resend } from '@/lib/resend';
import { auditFormSchema, leadMagnetSchema } from '@/lib/validations/growth-schema';

// TODO: Replace with actual Calendly URL
const CALENDLY_URL = 'https://calendly.com/aceagency/audit-gratuit';

export type GrowthFormState = {
  readonly success: boolean;
  readonly errors?: Readonly<Record<string, readonly string[]>>;
  readonly message?: string;
  readonly redirectUrl?: string;
};

/**
 * Audit application form Server Action (/growth main form).
 * Validates with Zod, checks honeypot, sends notification email via Resend.
 * Returns Calendly redirect URL on success.
 */
export async function submitAuditForm(
  _prevState: GrowthFormState,
  formData: FormData
): Promise<GrowthFormState> {
  // Honeypot check — silent success to fool bots
  const honeypot = formData.get('honeypot') as string;
  if (honeypot) {
    return { success: true, redirectUrl: CALENDLY_URL };
  }

  const rawData = {
    name: formData.get('name') as string,
    storeUrl: formData.get('storeUrl') as string,
    revenue: formData.get('revenue') as string,
    adsBudget: formData.get('adsBudget') as string,
    triedBefore: formData.get('triedBefore') as string,
    blocaj: (formData.get('blocaj') as string) || '',
    honeypot: (formData.get('honeypot') as string) ?? '',
  };

  const result = auditFormSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, storeUrl, revenue, adsBudget, triedBefore, blocaj } = result.data;

  const fromAddress =
    process.env.NODE_ENV === 'production'
      ? 'ACE Growth Engine <noreply@aceagency.ro>'
      : 'ACE Growth Engine <onboarding@resend.dev>';

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: ['cretualin@aceagency.ro'],
      subject: `🔥 Aplicatie Audit Growth Engine - ${name}`,
      html: `
        <h2>Aplicatie noua pentru Audit Growth Engine</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Magazin:</strong> <a href="${storeUrl}">${storeUrl}</a></p>
        <p><strong>Revenue lunar:</strong> ${revenue}</p>
        <p><strong>Buget ads:</strong> ${adsBudget}</p>
        <p><strong>Ce a incercat:</strong> ${triedBefore}</p>
        ${blocaj ? `<p><strong>Blocaj principal:</strong> ${blocaj}</p>` : ''}
        <hr />
        <p style="color: #666; font-size: 12px;">Trimis de pe formularul ACE Growth Engine — aceagency.ro/growth</p>
      `,
    });

    // TODO: TheMarketer integration
    // await addSubscriber({ email, name, tags: ['aplicat-audit'], listName: 'Leads Noi' });

    if (error) {
      console.error('[growth-audit-action] Resend error:', error);
      return { success: false, message: 'emailSendFailed' };
    }

    return { success: true, redirectUrl: CALENDLY_URL };
  } catch (err) {
    console.error('[growth-audit-action] Unexpected error:', err);
    return { success: false, message: 'emailSendFailed' };
  }
}

/**
 * Lead magnet form Server Action (/growth secondary CTA + /growth/checklist).
 * Validates with Zod, checks honeypot, sends notification email via Resend.
 */
export async function submitLeadMagnet(
  _prevState: GrowthFormState,
  formData: FormData
): Promise<GrowthFormState> {
  // Honeypot check — silent success to fool bots
  const honeypot = formData.get('honeypot') as string;
  if (honeypot) {
    return { success: true };
  }

  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    gdprConsent: formData.get('gdprConsent') ? 'on' : '',
    honeypot: (formData.get('honeypot') as string) ?? '',
  };

  const result = leadMagnetSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, phone } = result.data;

  const fromAddress =
    process.env.NODE_ENV === 'production'
      ? 'ACE Growth Engine <noreply@aceagency.ro>'
      : 'ACE Growth Engine <onboarding@resend.dev>';

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: ['cretualin@aceagency.ro'],
      subject: `📥 Ghid Scalare Download - ${name}`,
      html: `
        <h2>Download Ghid de Scalare — Magazine Online</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>GDPR:</strong> Consimtamant acordat</p>
        <hr />
        <p style="color: #666; font-size: 12px;">Trimis de pe formularul lead magnet — aceagency.ro/growth</p>
      `,
    });

    // TODO: TheMarketer integration
    // await addSubscriber({ email, name, tags: ['lead-magnet-checklist'], listName: 'Leads Noi' });
    // Start nurturing sequence (7 emails, 30 days)

    if (error) {
      console.error('[growth-leadmagnet-action] Resend error:', error);
      return { success: false, message: 'emailSendFailed' };
    }

    return { success: true };
  } catch (err) {
    console.error('[growth-leadmagnet-action] Unexpected error:', err);
    return { success: false, message: 'emailSendFailed' };
  }
}
