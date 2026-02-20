# Contact Page Spec

> Route: `/contact`
> Theme: Dark-dominant
> Priority: Must-have (lead capture)

---

## Page Structure

```
┌──────────────────────────────────────────────┐
│  [Header]                                    │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 1: Hero                    [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 2: Contact Form + Info     [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 3: Map                     [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 4: Book a Meeting          [light]  │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 5: FAQ                     [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│  [Footer]                                    │
└──────────────────────────────────────────────┘
```

---

## SEO

- **H1:** "Contacteaza-ne — AceAgency Bucuresti" (RO) / "Contact Us — AceAgency Bucharest" (EN)
- **Title tag:** "Contact | AceAgency - Agentie Digitala Bucuresti" (49 chars)
- **Meta description:** "Contacteaza AceAgency pentru servicii de marketing digital. Formular contact, programare consultatie, adresa si telefon. Raspundem in 24 de ore." (143 chars)
- **Schema:** Organization + LocalBusiness + BreadcrumbList JSON-LD
- **Breadcrumb:** Acasa > Contact

---

## Section 1: Hero

**Theme:** dark
**Layout:** Left-aligned, shorter inner page hero
**Padding:** `py-24` desktop, `py-16` mobile

### Content

```
CONTACT

Hai sa Vorbim
despre Proiectul Tau

Completeaza formularul sau programeaza
o consultatie gratuita. Raspundem in 24h.
```

### Specifications

- **Overline:** "CONTACT" — Electric Mint
- **Headline:** `display-lg`, Glacial Indifference Bold, White
- **Subheading:** `subtitle`, Grey
- Animation: Word stagger on headline, fade-up on subheading

---

## Section 2: Contact Form + Info

**Theme:** dark
**Layout:** Two-column (form left 60%, contact info right 40%)

### Left Column — Contact Form

```
┌──────────────────────────────────────────────┐
│  Nume Complet *                              │
│  [________________________________]          │
│                                              │
│  Email *                                     │
│  [________________________________]          │
│                                              │
│  Telefon                                     │
│  [________________________________]          │
│                                              │
│  Serviciu de Interes                         │
│  [▼ Selecteaza un serviciu      ]            │
│                                              │
│  Mesajul Tau *                               │
│  [________________________________]          │
│  [________________________________]          │
│  [________________________________]          │
│                                              │
│  [Honeypot hidden field]                     │
│                                              │
│  [Trimite Mesajul →]                         │
└──────────────────────────────────────────────┘
```

### Form Fields

| Field | Type | Label (RO) | Required | Validation |
|-------|------|-----------|----------|------------|
| name | text | Nume Complet | Yes | min 2 chars, max 100 |
| email | email | Email | Yes | Valid email format |
| phone | tel | Telefon | No | Romanian phone pattern (optional) |
| service | select | Serviciu de Interes | No | Enum: web, google-ads, facebook-ads, tiktok-ads, seo, email-marketing, consultanta, altele |
| message | textarea | Mesajul Tau | Yes | min 10 chars, max 2000 |
| honeypot | hidden | — | No | Must be empty (anti-spam) |

### Form Specifications

- Validation: Zod schema, client-side + server-side
- Submission: Server Action (`lib/actions/contact.ts`)
- Email delivery: Resend API
- Success state: Form replaced with success message + Electric Mint checkmark animation
- Error state: Field-level red borders + error messages below each field
- Loading state: Button shows spinner, form disabled
- Rate limiting: Max 3 submissions per IP per hour (server-side)

### Right Column — Contact Info

```
┌──────────────────────────┐
│                          │
│  📍 Adresa              │
│  Bucuresti, Romania      │
│                          │
│  📧 Email               │
│  contact@aceagency.ro    │
│                          │
│  📱 Telefon             │
│  +40 XXX XXX XXX        │
│                          │
│  🕐 Program             │
│  Luni - Vineri           │
│  09:00 - 18:00           │
│                          │
│  ── Social ──           │
│  [Li] [Ig] [Fb]         │
│                          │
└──────────────────────────┘
```

### Contact Info Specifications

- Card component (glass variant) with contact details
- Each item: Lucide icon (24px, Electric Mint) + label (caption, muted) + value (body, White)
- Email: `mailto:` link
- Phone: `tel:` link (GA4 `click_phone` event)
- WhatsApp: Optional, `wa.me` link (GA4 `click_whatsapp` event)
- Social: SocialLinks component
- Mobile: Stacked below form
- Animation: Card fades in from right, delayed 200ms after form

---

## Section 3: Map

**Theme:** dark
**Layout:** Full-width Google Maps embed

### Specifications

- Google Maps embed (iframe) showing AceAgency office location
- Height: 400px desktop, 300px mobile
- Styled: Dark mode map theme (matches site aesthetic)
- Loading: Lazy loaded, gated behind cookie consent (functional cookies)
- Border-radius: none (full-width bleed)
- If no cookie consent for functional cookies: Show static placeholder with "Accepta cookies functionale pentru a vedea harta" + button

---

## Section 4: Book a Meeting

**Theme:** light
**Layout:** Centered content with Cal.com embed

### Content

- **Overline:** "PROGRAMEAZA"
- **Heading:** "Rezerva o Consultatie Gratuita"
- **Description:** "Alege un slot disponibil si vom discuta despre cum putem ajuta afacerea ta sa creasca digital."

### Cal.com Embed

- Cal.com inline embed widget
- Shows available time slots
- Primary: `@calcom/embed-react` (if React 19 peer dep resolved)
- Fallback: Inline `<script>` embed (per STATE.md decision)
- Width: max 800px, centered
- Height: auto (adapts to content)

### Specifications

- Animation: Section fades up on scroll
- Mobile: Full-width embed, may need reduced view
- Loading: Skeleton placeholder while embed loads

---

## Section 5: FAQ

**Theme:** dark
**Layout:** Single column, narrow content (max 800px)

### Content

- **Overline:** "INTREBARI FRECVENTE"
- **Heading:** "Raspunsuri Rapide"

### FAQ Items (Accordion component)

| Question | Answer |
|----------|--------|
| Cat dureaza un proiect web? | Durata variaza in functie de complexitate. Un site corporate standard dureaza 4-6 saptamani, un proiect complex 8-12 saptamani. |
| Care sunt costurile serviciilor? | Fiecare proiect este unic. Oferim consultatie gratuita pentru a evalua nevoile si a propune un buget personalizat. |
| Oferiti suport dupa lansare? | Da, oferim pachete de mentenanta si suport post-lansare. Suntem alaturi de clientii nostri pe termen lung. |
| Cum masurati rezultatele? | Folosim Google Analytics, Google Ads, Facebook Ads Manager si alte platforme pentru rapoarte lunare detaliate cu KPI-uri clare. |
| Lucrati cu companii mici? | Absolut! Lucram cu afaceri de toate dimensiunile, de la startup-uri la companii mari. Solutiile noastre sunt scalabile. |

### Specifications

- Accordion component (shadcn-based)
- Max-width: 800px, centered
- Animation: Accordion items stagger fade-up on scroll
- Schema: FAQPage JSON-LD markup

---

## Animations Summary

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Hero headline | Word stagger | Load/scroll | 600ms |
| Form fields | Stagger fade up | Scroll (85%) | 500ms, 50ms stagger |
| Contact info card | Fade in from right | Scroll (85%) | 500ms, 200ms delay |
| Map | Fade in | Scroll (85%) | 500ms |
| Cal.com section | Fade up | Scroll (85%) | 500ms |
| FAQ items | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |

---

## Content Keys (i18n)

```
contact.hero.overline
contact.hero.headline
contact.hero.subheading
contact.form.name.label
contact.form.name.placeholder
contact.form.email.label
contact.form.email.placeholder
contact.form.phone.label
contact.form.phone.placeholder
contact.form.service.label
contact.form.service.placeholder
contact.form.service.options[]
contact.form.message.label
contact.form.message.placeholder
contact.form.submit
contact.form.success.title
contact.form.success.description
contact.form.error.generic
contact.form.validation.nameRequired
contact.form.validation.emailRequired
contact.form.validation.emailInvalid
contact.form.validation.messageRequired
contact.form.validation.messageMinLength
contact.info.address.label
contact.info.address.value
contact.info.email.label
contact.info.email.value
contact.info.phone.label
contact.info.phone.value
contact.info.hours.label
contact.info.hours.value
contact.map.cookieRequired
contact.booking.overline
contact.booking.heading
contact.booking.description
contact.faq.overline
contact.faq.heading
contact.faq.items[].question
contact.faq.items[].answer
```

---

## GA4 Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| `generate_lead` | Form submitted successfully | service, method: "form" |
| `click_phone` | Phone number clicked | — |
| `click_whatsapp` | WhatsApp link clicked | — |
| `click_email` | Email link clicked | — |
| `book_meeting` | Cal.com slot selected | — |
