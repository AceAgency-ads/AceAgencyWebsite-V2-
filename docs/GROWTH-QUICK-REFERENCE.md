# ACE Growth Engine — Quick Reference Guide

**Last Updated:** March 26, 2026
**For:** Developers implementing or maintaining the growth funnel

---

## URLs

| Route | Purpose | Status |
|-------|---------|--------|
| `/growth` | Main landing page (11 sections) | Production |
| `/growth/checklist` | Lead magnet page (12-item checklist) | Production |
| `/growth/multumesc` | Thank you page | Production |

---

## Component Imports

All 11 components in one import block:

```tsx
import { GrowthHero } from '@/components/sections/growth/GrowthHero';
import { GrowthProofBar } from '@/components/sections/growth/GrowthProofBar';
import { GrowthVSL } from '@/components/sections/growth/GrowthVSL';
import { GrowthClientLogos } from '@/components/sections/growth/GrowthClientLogos';
import { GrowthServices } from '@/components/sections/growth/GrowthServices';
import { GrowthCaseStudies } from '@/components/sections/growth/GrowthCaseStudies';
import { GrowthProcess } from '@/components/sections/growth/GrowthProcess';
import { GrowthFAQ } from '@/components/sections/growth/GrowthFAQ';
import { GrowthAuditForm } from '@/components/sections/growth/GrowthAuditForm';
import { GrowthLeadMagnetCTA } from '@/components/sections/growth/GrowthLeadMagnetCTA';
import { GrowthFooter } from '@/components/sections/growth/GrowthFooter';
```

---

## Form Server Actions

```tsx
// Audit form (main CTA)
import { submitAuditForm, type GrowthFormState } from '@/lib/actions/growth';

// Lead magnet form (secondary CTA)
import { submitLeadMagnet, type GrowthFormState } from '@/lib/actions/growth';
```

**Usage with useActionState:**

```tsx
const [state, formAction, pending] = useActionState(submitAuditForm, initialState);

return (
  <form action={formAction}>
    {/* fields */}
    <button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Submit'}
    </button>
  </form>
);
```

---

## Validation Schemas

```tsx
import {
  auditFormSchema,
  leadMagnetSchema,
  revenueOptions,
  adsBudgetOptions,
  triedBeforeOptions,
  type AuditFormData,
  type LeadMagnetFormData,
} from '@/lib/validations/growth-schema';

// Client-side validation
const result = auditFormSchema.safeParse(formData);

// Dropdown options
revenueOptions.forEach(option => {
  // 'sub-5000', '5000-10000', etc.
});
```

---

## i18n Keys (Growth Namespace)

```tsx
const t = useTranslations('growth');

// Sections
t('hero.headline')
t('proofBar.items.0.value')
t('vsl.heading')
t('clientLogos.label')
t('services.heading')
t('services.items.0.title')
t('caseStudies.heading')
t('caseStudies.items.0.client')
t('process.heading')
t('process.steps.0.title')
t('faq.heading')
t('faq.items.0.question')

// Forms
t('auditForm.heading')
t('auditForm.fields.name')
t('auditForm.validation.nameMinLength')
t('leadMagnet.heading')
t('leadMagnet.fields.email')
t('leadMagnet.validation.emailInvalid')

// Meta
t('meta.title')
t('meta.description')
```

---

## SectionWrapper Usage

```tsx
// Standard (no compact)
<SectionWrapper theme="dark">
  {/* Normal padding */}
</SectionWrapper>

// Compact (for funnel)
<SectionWrapper theme="dark" compact>
  {/* Tighter padding */}
</SectionWrapper>
```

**Compact Prop Effect:**
- Reduces top/bottom padding
- Improves conversion velocity on funnel pages
- Default: `false`

---

## Email Templates (Resend)

### Audit Form Email

**To:** cretualin@aceagency.ro
**Subject:** 🔥 Aplicatie Audit Growth Engine - {name}

**Fields in email:**
- name
- storeUrl (as link)
- revenue
- adsBudget
- triedBefore
- blocaj (optional)

### Lead Magnet Email

**To:** cretualin@aceagency.ro
**Subject:** 📥 Lead Magnet Download - {name}

**Fields in email:**
- name
- email
- storeUrl (as link)

---

## Calendly Integration

**Current implementation:**
```tsx
const CALENDLY_URL = 'https://calendly.com/aceagency/audit-gratuit';

// On audit form success:
window.location.href = CALENDLY_URL;
```

**Future:** Replace with dynamic booking widget or embed.

---

## Analytics Tracking

```tsx
import { trackEvent } from '@/lib/analytics';

trackEvent('generate_lead', {
  event_category: 'growth',
  event_label: 'audit_form',
});
```

**Trigger:** After successful audit form submission and Calendly redirect.

---

## Error Messages (i18n Keys)

### Audit Form Validation

```
growth.auditForm.validation.nameMinLength
growth.auditForm.validation.nameMaxLength
growth.auditForm.validation.storeUrlRequired
growth.auditForm.validation.storeUrlInvalid
growth.auditForm.validation.revenueRequired
growth.auditForm.validation.adsBudgetRequired
growth.auditForm.validation.triedBeforeRequired
growth.auditForm.validation.blocajMaxLength
growth.auditForm.error.emailSendFailed
```

### Lead Magnet Validation

```
growth.leadMagnet.validation.nameMinLength
growth.leadMagnet.validation.nameMaxLength
growth.leadMagnet.validation.emailRequired
growth.leadMagnet.validation.emailInvalid
growth.leadMagnet.validation.storeUrlRequired
growth.leadMagnet.validation.storeUrlInvalid
growth.leadMagnet.error.emailSendFailed
```

---

## Form Field Options (Dropdowns)

### Revenue Options
- `sub-5000` → "Sub 5,000 EUR"
- `5000-10000` → "5,000 — 10,000 EUR"
- `10000-30000` → "10,000 — 30,000 EUR"
- `30000-100000` → "30,000 — 100,000 EUR"
- `peste-100000` → "Peste 100,000 EUR"

### Ads Budget Options
- `sub-1000` → "Sub 1,000 EUR"
- `1000-3000` → "1,000 — 3,000 EUR"
- `3000-10000` → "3,000 — 10,000 EUR"
- `10000-30000` → "10,000 — 30,000 EUR"
- `peste-30000` → "Peste 30,000 EUR"

### Tried Before Options
- `nimic` → "Nimic — sunt la inceput"
- `facebook-ads` → "Facebook / Instagram Ads"
- `google-ads` → "Google Ads"
- `tiktok-ads` → "TikTok Ads"
- `seo` → "SEO"
- `email-marketing` → "Email Marketing"
- `agentie` → "Am lucrat cu o agentie"
- `freelancer` → "Am lucrat cu un freelancer"
- `in-house` → "Am echipa in-house"

---

## Honeypot Implementation

```tsx
// Hidden field to catch bots
<div aria-hidden="true" className="absolute -left-[9999px] opacity-0">
  <input
    type="text"
    name="honeypot"
    tabIndex={-1}
    autoComplete="off"
    defaultValue=""
  />
</div>

// Server-side check
const honeypot = formData.get('honeypot') as string;
if (honeypot) {
  return { success: true, redirectUrl: CALENDLY_URL }; // Silent success
}
```

---

## Client-Side Validation Example

```tsx
const validateField = useCallback(
  (fieldName: string, value: string) => {
    const testData = {
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
      }
    } else {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  },
  [t]
);
```

---

## Form State Type

```tsx
type GrowthFormState = {
  readonly success: boolean;
  readonly errors?: Readonly<Record<string, readonly string[]>>;
  readonly message?: string;
  readonly redirectUrl?: string;
};
```

**Success Case:**
```tsx
{ success: true, redirectUrl: 'https://calendly.com/...' }
```

**Error Case:**
```tsx
{
  success: false,
  errors: {
    fieldName: ['errorKey1', 'errorKey2']
  }
}
```

**Message Error (e.g., email failed):**
```tsx
{
  success: false,
  message: 'emailSendFailed'
}
```

---

## Meta Tags (SEO)

**Page metadata auto-generated via:**

```tsx
export async function generateMetadata({
  params,
}: GrowthPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'growth' });

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    path: 'growth',
    locale,
  });
}
```

**Output:**
- Title: "ACE Growth Engine — Sistem complet de crestere pentru magazine online"
- Description: "Reclame pe Meta, TikTok si Google + creative incluse..."
- Canonical URL: Auto-set
- OG Tags: Auto-set

---

## JSON-LD Schemas

**Rendered on page:**

1. Organization Schema
2. Service Schema (ACE Growth Engine)
3. FAQ Schema (7 items)

---

## Common Tasks

### Add a new section to /growth

1. Create new component in `/src/components/sections/growth/GrowthNewSection.tsx`
2. Export function component with `'use client'` directive
3. Add import to `/src/app/[locale]/growth/page.tsx`
4. Add component to JSX in render
5. Add i18n keys to `growth` namespace in `ro.json` and `en.json`

### Update form fields

1. Modify validation schema in `growth-schema.ts`
2. Update form component JSX
3. Update i18n keys (`growth.auditForm.fields.*`)
4. Update email template in server action

### Change Calendly URL

1. Update `CALENDLY_URL` constant in `/src/lib/actions/growth.ts`
2. Test redirect flow

### Debug form validation

1. Check client-side validation via browser console (onBlur events)
2. Check server-side validation via server logs (submitAuditForm)
3. Verify error message keys are in i18n namespace
4. Test with honeypot filled to verify bot detection

---

## Testing Scenarios

### Audit Form
- [ ] Submit with valid data → Calendly redirect
- [ ] Submit with invalid email → Error message
- [ ] Honeypot filled → Silent Calendly redirect
- [ ] Network error during email send → Error message
- [ ] RO/EN translation works

### Lead Magnet Form
- [ ] Submit with valid data → Success state
- [ ] Submit with invalid email → Error message
- [ ] Empty required field → Error on submit
- [ ] Navigation: /growth → form → /growth/multumesc

### Mobile
- [ ] Form fits 320px viewport
- [ ] Touch targets 48x48px minimum
- [ ] Keyboard navigation works
- [ ] No interstitial popups

---

## Performance Checklist

- [ ] VSL video loads externally (YouTube/Vimeo)
- [ ] Client logos marquee uses CSS animation
- [ ] Form validation doesn't block UI
- [ ] Email delivery is async
- [ ] No unused components or imports
- [ ] Images optimized (WebP)
- [ ] Page Speed Insights > 90 mobile

---

## Deployment

**Before deploying:**
1. Run `npm run build` — verify no errors
2. Run `npm run lint` — verify no style issues
3. Test form submissions (dev → production email)
4. Verify Calendly URL is correct
5. Test i18n switching (RO → EN)
6. Test on mobile device
7. Verify analytics tracking fires

---

## Related Codemaps

- **GROWTH-FUNNEL-CODEMAP.md** — Detailed technical reference
- **GROWTH-FUNNEL-UPDATE-SUMMARY.md** — Change log and overview
- **CODEMAPS-INDEX.md** — Master documentation index
- **CLAUDE.md** — Project configuration

---

**Document Version:** 1.0
**Generated:** March 26, 2026
**Maintainer:** Development Team
