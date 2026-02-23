# Phase 5: Contact and Lead Capture - Research

**Researched:** 2026-02-23
**Domain:** Forms, email delivery, booking embeds, lead capture
**Confidence:** HIGH

## Summary

Phase 5 implements the Contact page, contact form with Resend email delivery, Cal.com booking widget, Google Maps embed, and newsletter capture. The tech stack is well-established: Next.js Server Actions with `useActionState` for form state management, Zod for validation, Resend SDK for email delivery, and `@calcom/embed-react` for the booking widget.

The contact form uses the `useActionState` pattern (React 19) with Zod server-side validation and a honeypot field for spam protection. Resend handles email delivery via a Server Action. The Cal.com embed React 19 peer dependency issue (GitHub #20814) has been resolved and the package published with React 19 support. Google Maps uses a simple iframe embed with CSS filter for dark-mode styling.

**Primary recommendation:** Use `useActionState` + Zod Server Actions for both contact form and newsletter. Install `resend` and `@calcom/embed-react` as new dependencies. No React Hook Form needed — native `<form action={}>` with `useActionState` is simpler and sufficient for these forms.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Contact form fields: Name (required), Email (required), Phone (optional), Message (required) + Service select (optional) + Honeypot hidden field
- On-blur validation — validate each field when user leaves it, show errors immediately
- Honeypot field for spam protection — no reCAPTCHA, no third-party dependency
- On successful submission, redirect to `/multumim` thank-you page (trackable in GA4)
- Server Action with Zod validation + Resend delivery
- Cal.com inline embed rendered directly in a contact page section — no modal, no extra clicks
- Single meeting type (e.g., 30-min consultation)
- Dark-themed Cal.com to match AceAgency's design system (dark background, Electric Violet accents)
- Cal.com account is ready — user will provide embed link/username
- Use `@calcom/embed-react` with fallback to inline script per roadmap plan
- Contact information: email cretualin@aceagency.ro, phone 0750465757, address Bulevardul Aviatorilor 106, Bucharest
- Social media links: TBD — build with configurable data
- Google Maps embed with dark theme styling to match site aesthetic
- Newsletter: email-only field + submit button — lowest friction
- Newsletter placement: global footer (all pages) + dedicated section on contact page
- Newsletter Server Action via Resend for email capture

### Claude's Discretion
- Contact page section order and visual hierarchy
- Hero section treatment (minimal, full, or none)
- Newsletter success state (inline confirmation vs redirect to /multumim)
- Newsletter CTA copy and value proposition
- Exact spacing, typography, and animation choices
- Loading and error states design

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-10 | Contact page with form, Google Maps embed, Cal.com booking widget — implemented via `/frontend-design` against `design-system/pages/contact.md` | Full page spec exists in design-system; SectionWrapper, Accordion, ScrollReveal components ready; i18n key structure defined |
| FUNC-01 | Contact form with Zod validation, honeypot anti-spam, email delivery via Resend (Server Action) | useActionState + Zod safeParse pattern documented; Resend SDK v4.x verified; honeypot is a hidden field checked server-side |
| FUNC-02 | Newsletter signup with email collection via Resend and GDPR opt-in checkbox | Same Server Action pattern; existing Newsletter component (UI-only) and Footer newsletter form need wiring to server action |
| FUNC-03 | Cal.com booking embed on contact page (with React 19 fallback if needed) | @calcom/embed-react React 19 issue resolved; Cal component with calLink + config={{ theme: "dark" }} verified |
| FUNC-06 | Google Maps embed on contact page | iframe embed with CSS invert filter for dark mode; lazy loading with loading="lazy" attribute |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| resend | ^4.x | Email delivery API | Official SDK, first-class Next.js support, Server Action compatible |
| zod | ^3.24 | Form schema validation | Already implied by project (CLAUDE.md lists Zod), TypeScript-first, works server+client |
| @calcom/embed-react | ^1.5.3+ | Booking widget embed | Official React component, React 19 peer dep resolved (GitHub #20814 closed) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react (useActionState) | 19.2.3 | Form state management | Already installed — built-in hook replaces useFormState |
| react-dom (useFormStatus) | 19.2.3 | Pending state in submit button | Already installed — for loading indicator on submit |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| useActionState | React Hook Form | RHF adds 8KB+ bundle; useActionState is built-in to React 19 and sufficient for simple forms |
| Honeypot | reCAPTCHA v3 | User explicitly chose honeypot — no third-party dependency, no UX friction |
| @calcom/embed-react | Inline script embed | React component is cleaner; fallback to script only if npm install fails |

**Installation:**
```bash
npm install resend zod @calcom/embed-react
```

Note: Zod may already be installed if React Hook Form + Zod was set up earlier. Check `package.json` first.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   ├── actions/
│   │   ├── contact.ts          # Contact form Server Action
│   │   └── newsletter.ts       # Newsletter Server Action
│   ├── resend.ts               # Resend client singleton
│   └── validations/
│       ├── contact-schema.ts   # Zod schema for contact form
│       └── newsletter-schema.ts # Zod schema for newsletter
├── app/[locale]/
│   ├── contact/
│   │   └── page.tsx            # Contact page (server component)
│   └── multumim/
│       └── page.tsx            # Thank-you page (server component)
├── components/
│   └── sections/
│       └── contact/
│           ├── ContactHero.tsx
│           ├── ContactForm.tsx       # 'use client' — useActionState
│           ├── ContactInfo.tsx
│           ├── GoogleMap.tsx
│           ├── BookingSection.tsx     # 'use client' — Cal embed
│           └── ContactFAQ.tsx
```

### Pattern 1: Server Action with useActionState + Zod
**What:** Server Action receives `(prevState, formData)`, validates with Zod, returns typed state object.
**When to use:** Any form that needs server-side validation + async operation (email send).
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/forms
// lib/actions/contact.ts
'use server';

import { z } from 'zod';
import { resend } from '@/lib/resend';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.enum(['web', 'google-ads', 'facebook-ads', 'tiktok-ads', 'seo', 'email-marketing', 'consultanta', 'altele']).optional(),
  message: z.string().min(10).max(2000),
  honeypot: z.string().max(0), // Must be empty
});

export type ContactFormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Check honeypot
  const honeypot = formData.get('honeypot');
  if (honeypot) {
    // Silent success to fool bots
    return { success: true };
  }

  const result = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    service: formData.get('service') || undefined,
    message: formData.get('message'),
    honeypot: formData.get('honeypot') ?? '',
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { error } = await resend.emails.send({
    from: 'AceAgency Contact <noreply@aceagency.ro>',
    to: ['cretualin@aceagency.ro'],
    replyTo: result.data.email,
    subject: `Contact: ${result.data.name}`,
    html: `...`, // Build HTML from validated data
  });

  if (error) {
    return { success: false, message: 'Email sending failed' };
  }

  return { success: true };
}
```

```typescript
// Source: https://nextjs.org/docs/app/guides/forms
// components/sections/contact/ContactForm.tsx
'use client';

import { useActionState } from 'react';
import { submitContactForm, type ContactFormState } from '@/lib/actions/contact';

const initialState: ContactFormState = { success: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.success) {
    // Redirect to /multumim or show inline success
  }

  return (
    <form action={formAction}>
      <input name="name" required />
      {state.errors?.name && <p>{state.errors.name[0]}</p>}
      {/* ... other fields ... */}
      <input name="honeypot" type="hidden" value="" aria-hidden="true" tabIndex={-1} />
      <button type="submit" disabled={pending}>
        {pending ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
```

### Pattern 2: Cal.com React Embed (Dark Theme)
**What:** Cal.com inline embed using `@calcom/embed-react` with dark theme config.
**When to use:** Booking section on contact page.
**Example:**
```typescript
// Source: https://medium.com/@hamzabhf00/integrating-cal-com-into-your-website-using-react
// components/sections/contact/BookingSection.tsx
'use client';

import Cal from '@calcom/embed-react';

export function BookingSection({ calLink }: { calLink: string }) {
  return (
    <Cal
      calLink={calLink}
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
      config={{
        theme: 'dark',
        hideEventTypeDetails: false,
      }}
    />
  );
}
```

### Pattern 3: Google Maps Dark Embed (CSS Filter)
**What:** Google Maps iframe with CSS filter to achieve dark mode appearance.
**When to use:** Map section on contact page.
**Example:**
```typescript
// components/sections/contact/GoogleMap.tsx
export function GoogleMap() {
  return (
    <div className="relative h-[300px] w-full md:h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!...Bulevardul+Aviatorilor+106+Bucharest"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="invert grayscale-[0.8] contrast-[1.1] hue-rotate-[200deg] saturate-[0.3]"
        title="AceAgency Office Location"
      />
    </div>
  );
}
```

### Pattern 4: Resend Client Singleton
**What:** Single Resend instance created from env var.
**When to use:** Any server-side file that sends email.
**Example:**
```typescript
// Source: https://resend.com/nextjs
// lib/resend.ts
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required');
}

export const resend = new Resend(process.env.RESEND_API_KEY);
```

### Anti-Patterns to Avoid
- **Client-side email sending:** Never expose Resend API key to client. Always use Server Actions.
- **Mutation in useActionState callback:** The server action must return a new state object; never mutate prevState.
- **Skipping honeypot check:** Always validate honeypot server-side, even though bots could bypass client-side checks.
- **Inline Resend instantiation:** Create singleton; don't `new Resend()` in every action call.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email delivery | Custom SMTP transport | Resend SDK | DKIM, bounce handling, deliverability monitoring built-in |
| Form state management | Custom useState + fetch | useActionState | Built-in pending state, progressive enhancement, server-side by default |
| Booking widget | Custom calendar picker | Cal.com embed | Timezone handling, availability, confirmations — enormous complexity |
| Spam protection | Custom ML classifier | Honeypot hidden field | Zero complexity, effective against most bots, user decided this |
| Dark Google Maps | Google Maps JS API with style array | CSS filter on iframe embed | JS API requires API key + billing; CSS filter on embed iframe is free and sufficient |

**Key insight:** All three main features (email, booking, maps) are solved by existing services. The implementation work is wiring them together with good UX, not building the underlying features.

## Common Pitfalls

### Pitfall 1: Missing RESEND_API_KEY in Production
**What goes wrong:** Server Action silently fails or throws a runtime error when sending email.
**Why it happens:** Env var set locally but not in Vercel project settings.
**How to avoid:** Validate env var at module load time (`if (!process.env.RESEND_API_KEY) throw`). Add to `.env.example`. Set in Vercel dashboard before deploying.
**Warning signs:** Form submits but no email arrives; no error shown to user.

### Pitfall 2: Resend Domain Verification
**What goes wrong:** Emails rejected or land in spam because sending domain not verified.
**Why it happens:** Resend requires domain verification (DNS records) before sending from custom domains.
**How to avoid:** During development, use `onboarding@resend.dev` as the from address (Resend's sandbox). For production, verify `aceagency.ro` domain in Resend dashboard and add DKIM/SPF records.
**Warning signs:** Resend returns `{error: {name: 'validation_error'}}`.

### Pitfall 3: Cal.com Embed Theme Flickering
**What goes wrong:** Cal.com embed flashes between light and dark theme on load.
**Why it happens:** The embed loads with default (light) theme before config propagates. Known Cal.com issue (#15922, #16806).
**How to avoid:** Set a dark background container around the Cal embed. Use a loading skeleton that matches the dark theme until the embed is ready. The Cal component should be wrapped in a div with `bg-[#262523]` minimum height.
**Warning signs:** Brief white flash inside the booking section on page load.

### Pitfall 4: useActionState prevState Signature
**What goes wrong:** Server Action receives wrong arguments; formData is undefined.
**Why it happens:** When using `useActionState`, the Server Action signature changes from `(formData)` to `(prevState, formData)`. Forgetting prevState as first argument is a common mistake.
**How to avoid:** Always define Server Action as `async function action(prevState: State, formData: FormData)` when used with useActionState.
**Warning signs:** TypeScript error on function signature, or `formData.get()` returning null.

### Pitfall 5: On-Blur Validation + Server Action Conflict
**What goes wrong:** Client-side on-blur validation and server-side Zod validation show different error messages or fight each other.
**Why it happens:** Two validation layers with different logic or messages.
**How to avoid:** Share the same Zod schema between client and server. On-blur, run `schema.pick({fieldName: true}).safeParse()` on the individual field. On submit, the Server Action validates the full schema. Use the same error message keys from i18n.
**Warning signs:** Different error messages for the same field, or errors disappearing/reappearing.

### Pitfall 6: Newsletter Form in Footer (Global State)
**What goes wrong:** Newsletter form in footer needs `useActionState`, but footer is rendered on every page. Form submission from any page should work.
**Why it happens:** Footer newsletter is a global component, not scoped to the contact page.
**How to avoid:** The newsletter Server Action is independent of the contact form. The Footer newsletter form gets its own `useActionState` hook. Success state can be an inline message (not redirect to /multumim — keep redirect only for contact form as decided).
**Warning signs:** Newsletter form state leaking across page navigations.

### Pitfall 7: Google Maps Embed and Cookie Consent
**What goes wrong:** Design spec says Google Maps should be gated behind functional cookie consent.
**Why it happens:** Google Maps iframe sets cookies; GDPR requires consent for non-essential cookies.
**How to avoid:** The design spec (contact.md Section 3) explicitly calls for a cookie consent gate: show a static placeholder with message when no functional cookie consent given. However, cookie consent infrastructure is Phase 6 (CMPL-01). For now, implement the map with a placeholder mechanism that can be wired to consent in Phase 6.
**Warning signs:** Map showing without consent; no placeholder state built.

## Code Examples

### Resend Email with HTML Template
```typescript
// Source: Context7 /resend/resend-node
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'AceAgency <noreply@aceagency.ro>',
  to: ['cretualin@aceagency.ro'],
  replyTo: 'visitor@example.com',
  subject: 'Nou mesaj de contact - AceAgency',
  html: `
    <h2>Mesaj nou de pe site</h2>
    <p><strong>Nume:</strong> John Doe</p>
    <p><strong>Email:</strong> visitor@example.com</p>
    <p><strong>Telefon:</strong> 0740123456</p>
    <p><strong>Serviciu:</strong> Google Ads</p>
    <p><strong>Mesaj:</strong> Lorem ipsum...</p>
  `,
});
```

### Zod Schema with Custom Error Messages (i18n-ready)
```typescript
// Source: Context7 /websites/v3_zod_dev
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'nameMinLength' })
    .max(100, { message: 'nameMaxLength' }),
  email: z.string()
    .email({ message: 'emailInvalid' }),
  phone: z.string()
    .regex(/^(\+40|0)[0-9]{9}$/, { message: 'phoneInvalid' })
    .optional()
    .or(z.literal('')),
  service: z.enum([
    'web', 'google-ads', 'facebook-ads', 'tiktok-ads',
    'seo', 'email-marketing', 'consultanta', 'altele'
  ]).optional(),
  message: z.string()
    .min(10, { message: 'messageMinLength' })
    .max(2000, { message: 'messageMaxLength' }),
  honeypot: z.string().max(0),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### useActionState with Redirect on Success
```typescript
// Source: https://nextjs.org/docs/app/guides/forms
'use client';

import { useActionState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';

export function ContactForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(submitContactForm, { success: false });

  useEffect(() => {
    if (state.success) {
      router.push('/multumim');
    }
  }, [state.success, router]);

  // ... form JSX
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| useFormState (next/form) | useActionState (react) | React 19 | Hook moved from react-dom to react; API unchanged but renamed |
| API routes for forms | Server Actions | Next.js 14+ | No separate API route needed; action is co-located or in lib/actions |
| SMTP (nodemailer) | Email API (Resend) | 2023+ | No SMTP config, better deliverability, simpler API |
| Google reCAPTCHA | Honeypot + rate limiting | User decision | Zero third-party JS, better UX, GDPR-friendly |
| @calcom/embed-react pinned React 18 | React 19 support published | Late 2025 | Peer dep issue resolved; npm install works without --force |

**Deprecated/outdated:**
- `useFormState` from `react-dom`: Renamed to `useActionState` in React 19. Import from `react`, not `react-dom`.
- Resend `resend.sendEmail()`: Replaced by `resend.emails.send()` in v2+.

## Open Questions

1. **Cal.com embed link/username**
   - What we know: User said "Cal.com account is ready — user will provide embed link/username"
   - What's unclear: Exact calLink value (e.g., "aceagency/consultatie-30min")
   - Recommendation: Use a placeholder calLink in code (e.g., `"aceagency/consultatie"`), mark as TODO for user to provide. Make it configurable via env var or constant.

2. **Resend domain verification status**
   - What we know: Resend requires domain verification for custom "from" addresses
   - What's unclear: Whether aceagency.ro is already verified in Resend
   - Recommendation: Use `onboarding@resend.dev` during dev/testing. Document the domain verification step as a pre-deployment requirement.

3. **Google Maps embed URL**
   - What we know: Address is Bulevardul Aviatorilor 106, Bucharest
   - What's unclear: Exact embed URL from Google Maps (needs to be generated from Google Maps share feature)
   - Recommendation: Generate the embed URL from Google Maps for the exact address. Use a configurable constant.

4. **Rate limiting for contact form**
   - What we know: Design spec mentions "max 3 submissions per IP per hour (server-side)"
   - What's unclear: No rate limiting library is currently installed; implementing proper IP-based rate limiting in serverless (Vercel) requires external store (KV/Redis)
   - Recommendation: Defer server-side rate limiting to a later phase or use Vercel's built-in rate limiting features. The honeypot provides first-line spam defense. Note this as a gap.

## Sources

### Primary (HIGH confidence)
- Context7 `/resend/resend-node` — Resend SDK API, send email patterns, error handling
- Context7 `/websites/v3_zod_dev` — Zod v3 string validations, custom error messages, enum, optional fields
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms) — useActionState, Server Actions, Zod validation, pending states (v16.1.6 docs)

### Secondary (MEDIUM confidence)
- [Cal.com GitHub #20814](https://github.com/calcom/cal.com/issues/20814) — React 19 peer dep resolved, package published
- [Cal.com embed integration guide](https://medium.com/@hamzabhf00/integrating-cal-com-into-your-website-using-react) — Cal component usage with calLink, config, theme: "dark"
- [Google Maps embed dark mode community](https://support.google.com/maps/thread/298254786) — CSS filter approach for dark iframe embed
- [Resend Next.js integration](https://resend.com/nextjs) — Official Server Action pattern

### Tertiary (LOW confidence)
- Cal.com embed theme flickering (#15922, #16806) — known issue, dark background wrapper as mitigation. Not officially resolved but widely worked around.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Resend, Zod, Cal.com embed all verified via official sources and Context7
- Architecture: HIGH — useActionState pattern is documented in Next.js 16 official docs; project already uses the established component patterns (SectionWrapper, ScrollReveal)
- Pitfalls: MEDIUM — Cal.com flickering and rate limiting gaps are based on community reports, not official acknowledgment

**Research date:** 2026-02-23
**Valid until:** 2026-03-23 (stable libraries, 30-day validity)
