import { Resend } from 'resend';

/**
 * Resend email client singleton.
 *
 * In production: throws if RESEND_API_KEY is missing.
 * In development without key: exports a mock that logs instead of sending.
 */

const apiKey = process.env.RESEND_API_KEY;

function createResendClient(): Resend {
  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY environment variable is required in production');
    }

    // Development mock — log instead of sending
    console.warn('[resend] RESEND_API_KEY not set — using development mock');

    return {
      emails: {
        send: async (payload: unknown) => {
          console.log('[resend-mock] Would send email:', JSON.stringify(payload, null, 2));
          return { data: { id: 'mock-id' }, error: null };
        },
      },
    } as unknown as Resend;
  }

  return new Resend(apiKey);
}

export const resend = createResendClient();
