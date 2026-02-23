# Phase 6: Compliance and Legal - Research

**Researched:** 2026-02-23
**Domain:** GDPR cookie consent, legal pages, FAQ page, GTM Consent Mode v2
**Confidence:** HIGH

## Summary

Phase 6 covers four deliverables: (1) a granular GDPR cookie consent banner with persistent state and GTM Consent Mode v2 gating, (2) three legal content pages (Privacy Policy, Cookie Policy, Terms of Service) in both RO and EN, (3) a FAQ page with accordion UI and FAQPage schema, and (4) wiring the existing Google Maps consent gate to the cookie consent state.

The project already has strong foundations: shadcn Accordion component, FAQ pattern (ServiceFAQ/ContactFAQ), SectionWrapper theming, next-intl i18n routing, and footer legal links pointing to the correct slugs. The main new work is the cookie consent system and writing bilingual legal content.

**Primary recommendation:** Use `vanilla-cookieconsent` v3.x for the granular consent banner (it supports categories, i18n, and has documented GTM Consent Mode v2 integration), build a custom React wrapper as a client component, and gate GTM/GA4 script injection behind consent state. Legal pages are static content pages using the established next-intl pattern.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-11 | FAQ page (`/intrebari-frecvente`) with FAQPage schema markup | Existing FAQ accordion pattern (ServiceFAQ, ContactFAQ) + shadcn Accordion component can be directly reused. New route + i18n namespace needed. |
| PAGE-12 | Privacy Policy page (`/politica-confidentialitate`) in RO and EN | Static content page following despre-noi page pattern. Full bilingual i18n content in messages/*.json. Footer links already point to this slug. |
| PAGE-13 | Cookie Policy page (`/politica-cookies`) in RO and EN | Same pattern as PAGE-12. Content explains cookie categories matching consent banner configuration. |
| PAGE-14 | Terms of Service page (`/termeni-si-conditii`) in RO and EN | Same pattern as PAGE-12. Standard agency ToS content. |
| CMPL-01 | Cookie consent banner with granular GDPR consent (analytics, marketing, functional) | `vanilla-cookieconsent` v3.x provides category-based consent with toggles, persistent cookie storage, and callbacks for consent state changes. |
| CMPL-02 | GA4 + GTM loading gated behind cookie consent (GTM Consent Mode v2) | Google Consent Mode v2 `gtag('consent', 'default/update', {...})` pattern. Default all denied, update on consent callback. GTM script only loads after consent. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vanilla-cookieconsent | ^3.1.0 | Granular GDPR cookie consent banner with categories, i18n, GTM integration | 2M+ downloads, actively maintained, built-in Google Consent Mode v2 support, framework-agnostic with React examples, multilingual support |
| next-intl | ^4.8.3 (existing) | i18n for legal pages and FAQ | Already in project, all content pages use this pattern |
| shadcn/ui Accordion | existing | FAQ page accordion UI | Already installed and used by ServiceFAQ and ContactFAQ |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @next/third-parties | ^16.x | GTM script injection with consent gating | If available for Next.js 16; otherwise use next/script with strategy="afterInteractive" |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| vanilla-cookieconsent | shadcn-cookie-consent (r2hu1) | shadcn-cookie-consent is binary accept/decline only - no granular category toggles. Would require significant custom work to add categories. |
| vanilla-cookieconsent | react-cookie-consent | Popular but no built-in granular categories or Google Consent Mode integration. Would need manual implementation. |
| Custom consent banner | Build from scratch with shadcn | Full control but significant effort for cookie storage, persistence, category management, GTM integration. Don't hand-roll. |

**Installation:**
```bash
npm install vanilla-cookieconsent
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/[locale]/
│   ├── intrebari-frecvente/
│   │   └── page.tsx              # FAQ page
│   ├── politica-confidentialitate/
│   │   └── page.tsx              # Privacy Policy page
│   ├── politica-cookies/
│   │   └── page.tsx              # Cookie Policy page
│   └── termeni-si-conditii/
│       └── page.tsx              # Terms of Service page
├── components/
│   ├── layout/
│   │   └── CookieConsent.tsx     # Client component wrapping vanilla-cookieconsent
│   └── sections/
│       ├── faq/
│       │   └── FAQPage.tsx       # FAQ accordion with FAQPage schema
│       └── legal/
│           └── LegalContent.tsx  # Reusable legal page content renderer
├── lib/
│   └── gtm.ts                   # GTM/GA4 consent mode helpers
└── messages/
    ├── ro.json                   # +faq, +privacy, +cookies, +terms namespaces
    └── en.json                   # +faq, +privacy, +cookies, +terms namespaces
```

### Pattern 1: Cookie Consent Provider (Client Component)
**What:** A `"use client"` component that wraps `vanilla-cookieconsent` in a React `useEffect`, configures categories and i18n, and provides consent state via callbacks.
**When to use:** Mount once in `[locale]/layout.tsx` body, after all other providers.
**Example:**
```typescript
// Source: https://cookieconsent.orestbida.com/essential/getting-started.html
'use client';

import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

export function CookieConsentBanner({ locale }: { locale: string }) {
  useEffect(() => {
    CookieConsent.run({
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
        marketing: {},
        functionality: {},
      },
      language: {
        default: locale,
        translations: {
          ro: { /* Romanian strings */ },
          en: { /* English strings */ },
        },
      },
      onFirstConsent: () => updateGtagConsent(),
      onConsent: () => updateGtagConsent(),
      onChange: () => updateGtagConsent(),
    });
  }, [locale]);

  return null; // vanilla-cookieconsent manages its own DOM
}
```

### Pattern 2: GTM Consent Mode v2 Default + Update
**What:** Set default consent denied before GTM loads, then update on user interaction.
**When to use:** In the HTML head (via layout.tsx script tag) for defaults, and in cookie consent callbacks for updates.
**Example:**
```typescript
// Source: https://developers.google.com/tag-platform/security/guides/consent
// Default consent — inject as inline script in <head> BEFORE GTM
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'wait_for_update': 500,
});

// Update consent — called from cookie consent callbacks
function updateGtagConsent() {
  gtag('consent', 'update', {
    'analytics_storage': CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
    'ad_storage': CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    'ad_user_data': CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    'ad_personalization': CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    'functionality_storage': CookieConsent.acceptedCategory('functionality') ? 'granted' : 'denied',
  });
}
```

### Pattern 3: Legal Content Pages (Static i18n)
**What:** Simple server components that render bilingual legal content from next-intl messages.
**When to use:** For privacy, cookies, and terms pages.
**Example:**
```typescript
// Follows existing page pattern (e.g., despre-noi/page.tsx)
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <>
      <LegalHero breadcrumbItems={[...]} />
      <SectionWrapper theme="light">
        <LegalContent namespace="privacy" />
      </SectionWrapper>
    </>
  );
}
```

### Pattern 4: FAQ Page (Reuse Existing Accordion)
**What:** Standalone FAQ page following ContactFAQ pattern with FAQPage JSON-LD schema.
**When to use:** For `/intrebari-frecvente` route.
**Example:**
```typescript
// Reuses exact pattern from ContactFAQ.tsx and ServiceFAQ.tsx
// FAQ items from messages/ro.json faq.items array
// FAQPage JSON-LD schema identical to existing implementations
```

### Anti-Patterns to Avoid
- **Loading GTM before consent defaults:** The `gtag('consent', 'default', {...})` MUST execute before the GTM container script. If ordered wrong, consent defaults don't work.
- **Using `gtag('consent', 'update')` inside GTM templates:** Within GTM, use the template APIs (`setDefaultConsentState`, `updateConsentState`). Outside GTM (our case - direct script injection), use `gtag()`.
- **Blocking necessary cookies on consent:** Necessary/essential cookies (session, CSRF, locale preference) must always be enabled and `readOnly: true`.
- **Hardcoding legal content in components:** All legal text belongs in `messages/*.json` for i18n, not in TSX files.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cookie consent banner | Custom React cookie banner with localStorage | vanilla-cookieconsent v3 | Handles cookie storage, expiry, re-consent, DOM injection, category management, i18n, accessibility |
| Consent state persistence | Custom cookie read/write utilities | vanilla-cookieconsent's built-in cookie management | Handles edge cases: cookie expiry, consent versioning, re-consent triggers |
| GTM consent integration | Manual dataLayer event tracking | vanilla-cookieconsent callbacks + gtag consent API | Official Google pattern, well-documented, handles the consent-before-load ordering |
| FAQ accordion | Custom collapsible component | shadcn Accordion (already installed) | Radix-based, accessible, keyboard navigable, already used in 2 places |

**Key insight:** Cookie consent is deceptively complex -- consent versioning, re-consent triggers, cross-session persistence, and the GTM consent ordering constraint make hand-rolling risky. Use the library.

## Common Pitfalls

### Pitfall 1: GTM Script Loading Order
**What goes wrong:** GA4/GTM events fire before consent is checked, violating GDPR.
**Why it happens:** GTM script loads before `gtag('consent', 'default', {...})` executes.
**How to avoid:** Inject the consent default script as an inline `<script>` in `<head>` BEFORE the GTM container script. Use `next/script` with `strategy="beforeInteractive"` for defaults and `strategy="afterInteractive"` for GTM container.
**Warning signs:** Network tab shows gtag requests on first page load before banner interaction.

### Pitfall 2: vanilla-cookieconsent CSS Conflicts with Tailwind
**What goes wrong:** The library's default CSS clashes with Tailwind's reset or project styles.
**Why it happens:** vanilla-cookieconsent ships its own CSS that may conflict with Tailwind's preflight.
**How to avoid:** Import the library CSS, then override with project-specific Tailwind classes. The library supports custom class names and theming. Consider using the library's dark mode support to match section themes.
**Warning signs:** Banner looks unstyled or has visual glitches.

### Pitfall 3: Google Maps Consent Gate Not Wired
**What goes wrong:** Google Maps iframe loads without consent, embedding tracking cookies.
**Why it happens:** The existing `GoogleMap.tsx` has `consentGranted = true` hardcoded (Phase 6 placeholder).
**How to avoid:** Wire `consentGranted` to the cookie consent state for the "functionality" category. Use `CookieConsent.acceptedCategory('functionality')` in the component.
**Warning signs:** Google Maps loads on contact page without consent banner interaction.

### Pitfall 4: Legal Content Not Actually Bilingual
**What goes wrong:** Legal pages show Romanian text for English users or vice versa.
**Why it happens:** Content added to only one locale file, or wrong namespace referenced.
**How to avoid:** Always add content to BOTH `ro.json` and `en.json` simultaneously. Test both `/ro/` and `/en/` routes.
**Warning signs:** Empty pages or 404s on the non-primary locale.

### Pitfall 5: Cookie Consent Not Persisting Across Sessions
**What goes wrong:** Banner reappears on every visit despite user already consenting.
**Why it happens:** Cookie expiry too short, or cookie deleted by browser privacy settings.
**How to avoid:** vanilla-cookieconsent handles this automatically with sensible defaults (182 days). Verify cookie is set after consent with browser DevTools.
**Warning signs:** Banner shows on every page load even after accepting.

### Pitfall 6: Missing FAQPage Schema on FAQ Page
**What goes wrong:** FAQ page doesn't get rich results in Google.
**Why it happens:** JSON-LD script tag omitted or malformed.
**How to avoid:** Follow the exact pattern from ServiceFAQ.tsx -- `<script type="application/ld+json">` with `@type: "FAQPage"` and `mainEntity` array of Question/Answer pairs.
**Warning signs:** Google Search Console shows no FAQ rich results.

## Code Examples

Verified patterns from official sources and existing codebase:

### GTM Consent Default Script (for layout.tsx head)
```typescript
// Source: https://developers.google.com/tag-platform/security/guides/consent
// Place in layout.tsx as <Script strategy="beforeInteractive">
import Script from 'next/script';

<Script id="gtm-consent-default" strategy="beforeInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'wait_for_update': 500
    });
  `}
</Script>
```

### GTM Container Script (conditional on env var)
```typescript
// Only inject GTM if NEXT_PUBLIC_GTM_ID is set
{process.env.NEXT_PUBLIC_GTM_ID && (
  <Script
    id="gtm-script"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
    }}
  />
)}
```

### vanilla-cookieconsent Categories Config
```typescript
// Source: https://cookieconsent.orestbida.com/essential/getting-started.html
categories: {
  necessary: {
    enabled: true,
    readOnly: true, // cannot be disabled
  },
  analytics: {
    autoClear: {
      cookies: [{ name: /^_ga/ }, { name: '_gid' }],
    },
  },
  marketing: {
    autoClear: {
      cookies: [{ name: /^_gcl/ }, { name: '_fbp' }],
    },
  },
  functionality: {},
},
```

### Consent Update Function
```typescript
// Source: https://cookieconsent.orestbida.com/advanced/google-consent-mode.html
function updateGtagConsent(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('consent', 'update', {
    analytics_storage: CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
    ad_storage: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    ad_user_data: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    ad_personalization: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    functionality_storage: CookieConsent.acceptedCategory('functionality') ? 'granted' : 'denied',
  });
}
```

### Google Maps Consent Gate (wiring existing placeholder)
```typescript
// Source: Existing src/components/sections/contact/GoogleMap.tsx
// Replace: const consentGranted = true;
// With:
import * as CookieConsent from 'vanilla-cookieconsent';

const [consentGranted, setConsentGranted] = useState(
  CookieConsent.acceptedCategory('functionality')
);

// Listen for consent changes
useEffect(() => {
  const handler = () => setConsentGranted(CookieConsent.acceptedCategory('functionality'));
  window.addEventListener('cc:onChange', handler);
  return () => window.removeEventListener('cc:onChange', handler);
}, []);
```

### Reusable Legal Content Component
```typescript
// Pattern for rendering structured legal content from i18n
'use client';
import { useTranslations } from 'next-intl';

interface LegalContentProps {
  readonly namespace: 'privacy' | 'cookies' | 'terms';
}

export function LegalContent({ namespace }: LegalContentProps) {
  const t = useTranslations(namespace);
  const sections = t.raw('sections') as ReadonlyArray<{
    heading: string;
    content: string; // may contain paragraphs separated by \n\n
  }>;

  return (
    <div className="prose prose-lg mx-auto max-w-3xl">
      <h1>{t('title')}</h1>
      <p className="text-sm text-muted-foreground">{t('lastUpdated')}</p>
      {sections.map((section, i) => (
        <section key={i}>
          <h2>{section.heading}</h2>
          {section.content.split('\n\n').map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| GTM Consent Mode v1 (2 signals) | Consent Mode v2 (4+ signals: ad_storage, analytics_storage, ad_user_data, ad_personalization) | March 2024 | Required for EU compliance; Google mandates v2 for new implementations |
| Binary accept/reject banners | Granular category-based consent (GDPR standard) | 2023+ | EU regulators enforce granular consent; binary banners no longer considered compliant |
| Cookie walls (no access without consent) | Consent + option to continue without non-essential cookies | GDPR enforcement | Cookie walls are illegal in most EU jurisdictions |

**Deprecated/outdated:**
- GTM Consent Mode v1: Superseded by v2; missing ad_user_data and ad_personalization signals
- `@next/third-parties` GoogleTagManager component: May not support consent gating natively; manual script injection with `next/script` gives more control over loading order

## Open Questions

1. **vanilla-cookieconsent TypeScript types**
   - What we know: The library is written in JS but provides type definitions
   - What's unclear: Whether the v3 types are complete for all APIs (acceptedCategory, run config)
   - Recommendation: Check types after install; if incomplete, add local type augmentations

2. **vanilla-cookieconsent CSS theming to match project brand**
   - What we know: The library supports CSS custom properties and dark mode
   - What's unclear: How much CSS override is needed to match the Burgundy/Black/Grey brand palette
   - Recommendation: Override CSS variables in globals.css after importing library CSS; test visually

3. **Legal content completeness**
   - What we know: Content must cover Romanian GDPR (ANSPDCP) requirements + EU ePrivacy
   - What's unclear: Whether the content needs legal review before launch
   - Recommendation: Write comprehensive content covering standard sections (data collection, processing, rights, cookies used, contact info), flag for legal review in verification

## Sources

### Primary (HIGH confidence)
- Google Consent Mode v2 official docs: https://developers.google.com/tag-platform/security/guides/consent - consent default/update patterns, consent type parameters
- vanilla-cookieconsent official docs: https://cookieconsent.orestbida.com/essential/getting-started.html - installation, categories, callbacks
- vanilla-cookieconsent Google Consent Mode guide: https://cookieconsent.orestbida.com/advanced/google-consent-mode.html - GTM integration pattern

### Secondary (MEDIUM confidence)
- shadcn-cookie-consent GitHub (r2hu1): https://github.com/r2hu1/shadcn-cookie-consent - evaluated but rejected (binary only, no granular categories)
- Existing codebase patterns: ServiceFAQ.tsx, ContactFAQ.tsx, GoogleMap.tsx, Footer.tsx legal links - verified directly in codebase

### Tertiary (LOW confidence)
- vanilla-cookieconsent CSS theming compatibility with Tailwind 4 - needs hands-on testing

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - vanilla-cookieconsent is well-documented with official GTM Consent Mode guide
- Architecture: HIGH - follows established project patterns (i18n pages, FAQ accordion, SectionWrapper)
- Pitfalls: HIGH - GTM ordering constraint is well-documented; other pitfalls from direct codebase analysis

**Research date:** 2026-02-23
**Valid until:** 2026-03-23 (stable domain, no fast-moving dependencies)
