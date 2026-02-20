# Services Index Page Spec (Servicii)

> Route: `/servicii`
> Theme: Dark-dominant with light accent sections
> Priority: Must-have

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
│  SECTION 2: All Services Grid       [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 3: Process / How We Work   [light]  │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 4: Why Choose AceAgency    [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 5: CTA                     [burgundy] │
│                                              │
├──────────────────────────────────────────────┤
│  [Footer]                                    │
└──────────────────────────────────────────────┘
```

---

## SEO

- **H1:** "Servicii de Marketing Digital — AceAgency" (RO) / "Digital Marketing Services — AceAgency" (EN)
- **Title tag:** "Servicii Marketing Digital | AceAgency Bucuresti" (49 chars)
- **Meta description:** "Servicii complete de marketing digital: web development, Google Ads, Facebook Ads, TikTok Ads, SEO, email marketing. Solutii personalizate de la AceAgency." (155 chars)
- **Schema:** Service (aggregate) + BreadcrumbList JSON-LD
- **Breadcrumb:** Acasa > Servicii

---

## Section 1: Hero

**Theme:** dark
**Layout:** Left-aligned content
**Padding:** `py-24` desktop, `py-16` mobile

### Content

```
SERVICII

Solutii Digitale
Complete

De la strategie la executie, acoperim
tot spectrul marketing-ului digital.
```

### Specifications

- **Overline:** "SERVICII" — Grey
- **Headline:** `display-lg`, Glacial Indifference Bold, White
- **Subheading:** `subtitle`, Grey
- Inner page hero (shorter than homepage hero)
- Animation: Word-level stagger on headline, fade-up on subheading

---

## Section 2: All Services Grid

**Theme:** dark
**Layout:** 3-column bento grid (Pattern B), SectionHeader centered

### Content

- **Overline:** "CE OFERIM"
- **Heading:** "Servicii Specializate pentru Fiecare Nevoie"

### Service Cards (Feature Card variant, 6 cards + 1 consultanta)

| Service | Icon | Division | Link | Short Description |
|---------|------|----------|------|-------------------|
| Dezvoltare Web | Browser code | AceWeb | `/servicii/dezvoltare-web` | Site-uri corporate, landing pages, aplicatii web, e-commerce |
| Google Ads | Target | AceAds | `/servicii/google-ads` | Search, Display, Shopping, YouTube, Performance Max |
| Facebook & Instagram Ads | Social | AceAds | `/servicii/facebook-ads` | Awareness, Traffic, Conversii, Retargeting |
| TikTok Ads | Play | AceAds | `/servicii/tiktok-ads` | In-Feed, TopView, Spark Ads, Brand Effects |
| Optimizare SEO | Search | AceWeb | `/servicii/seo` | SEO tehnic, On-page, Off-page, Local SEO |
| Email Marketing | Mail | AceAds | `/servicii/email-marketing` | Campanii email, Automatizari, Newsletter |
| Consultanta Marketing | Lightbulb | AceAI | `/servicii/consultanta-marketing` | Strategie, Audit, Plan de marketing digital |

### Specifications

- Feature Card: icon (48px, Grey), service name (h3), division badge (caption, Burgundy bg pill), description (body-sm, muted), arrow link
- Bento grid: First 2 cards larger (span 2 rows), remaining cards standard size
- Hover: Card lifts + burgundy glow + arrow slides right
- Mobile: Single column stack
- Animation: Cards stagger fade up, 80ms delay

---

## Section 3: Process / How We Work

**Theme:** light
**Layout:** Horizontal steps (desktop), vertical steps (mobile)

### Content

- **Overline:** "PROCESUL NOSTRU"
- **Heading:** "Cum Lucram"
- **Description:** "Un proces structurat in 4 pasi, transparent si orientat catre rezultate."

### Steps

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 01 | MessageSquare | Analiza & Strategie | Intelegem afacerea ta, publicul tinta si obiectivele. Cream o strategie personalizata. |
| 02 | PenTool | Design & Dezvoltare | Transformam strategia in solutii vizuale si tehnice de nivel premium. |
| 03 | Rocket | Implementare & Lansare | Lansam campaniile si solutiile cu atentie la fiecare detaliu. |
| 04 | BarChart3 | Monitorizare & Optimizare | Masuram performanta si optimizam continuu pentru rezultate maxime. |

### Specifications

- Desktop: 4 steps in horizontal row connected by lines/arrows
- Each step: Number (display-lg, Burgundy, opacity 0.2), icon (32px), title (h4), description (body-sm, muted)
- Connecting line: 1px dotted border between steps on desktop
- Mobile: Vertical timeline (line on left, content on right)
- Animation: Steps stagger slide-in from left, 150ms delay each
- Active/hover: Step number opacity increases, icon color shifts to Burgundy

---

## Section 4: Why Choose AceAgency

**Theme:** dark
**Layout:** Two-column (stats left, differentiators right)

### Content

- **Overline:** "DE CE ACEAGENCY"
- **Heading:** "Partenerul Tau Digital de Incredere"

### Left Column — Stats

| Number | Suffix | Label |
|--------|--------|-------|
| 150 | + | Proiecte |
| 50 | + | Clienti |
| 340 | % | ROI Mediu |
| 24 | /7 | Suport |

### Right Column — Differentiators (bullet list)

- Full-service digital: Web + Ads + AI + Media sub un singur acoperis
- Echipa dedicata fiecarui client
- Rapoarte lunare detaliate cu KPI-uri clare
- Fara contracte pe termen lung — lucram pe rezultate
- Comunicare transparenta si proactiva

### Specifications

- Left: 2x2 grid of Stat Cards with CountUp animation
- Right: Numbered list with check icons, body text
- Mobile: Stacked (stats first, then differentiators)
- Animation: Stats CountUp on scroll, list items fade up with stagger

---

## Section 5: CTA

**Theme:** burgundy
**Layout:** Same CTA section pattern (reusable)

### Content

```
Hai sa Incepem un Proiect

Spune-ne despre afacerea ta si vom reveni cu o
strategie personalizata in maximum 24 de ore.

[Solicita o Oferta]  [Programeaza un Call]
```

- Primary CTA → `/contact`
- Secondary CTA → `/contact` (with Calendly anchor)

---

## Service Sub-Page Template

All 6 individual service pages follow the same template structure:

```
┌──────────────────────────────────────────────┐
│  [Header]                                    │
├──────────────────────────────────────────────┤
│  SECTION 1: ServiceHero              [dark]  │
│  (Service name, tagline, description)        │
├──────────────────────────────────────────────┤
│  SECTION 2: ServiceFeatures          [light] │
│  (Key benefits/features grid)                │
├──────────────────────────────────────────────┤
│  SECTION 3: ServiceProcess           [dark]  │
│  (How this service works, 3-5 steps)         │
├──────────────────────────────────────────────┤
│  SECTION 4: ServiceStats             [dark]  │
│  (Service-specific metrics/results)          │
├──────────────────────────────────────────────┤
│  SECTION 5: ServiceFAQ               [light] │
│  (5-8 FAQ items in Accordion)                │
├──────────────────────────────────────────────┤
│  SECTION 6: ServiceCTA               [burgundy]│
│  (Service-specific CTA)                      │
├──────────────────────────────────────────────┤
│  [Footer]                                    │
└──────────────────────────────────────────────┘
```

### Reusable Section Components (built in Phase 4)

- `ServiceHero` — Accepts title, tagline, description, icon
- `ServiceFeatures` — Accepts features array (icon, title, description)
- `ServiceProcess` — Accepts steps array (number, title, description)
- `ServiceStats` — Accepts stats array (number, suffix, label)
- `ServiceFAQ` — Accepts FAQ items array (question, answer), renders Accordion
- `ServiceCTA` — Accepts heading, description, primaryCTA, secondaryCTA

---

## Animations Summary

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Hero headline | Word stagger | Load/scroll | 600ms |
| Service cards | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| Process steps | Stagger slide left | Scroll (85%) | 500ms, 150ms stagger |
| Stats numbers | CountUp | Scroll (85%) | 2000ms |
| Differentiator items | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| CTA heading | TextReveal word | Scroll (85%) | 600ms |

---

## Content Keys (i18n)

```
services.hero.overline
services.hero.headline
services.hero.subheading
services.grid.overline
services.grid.heading
services.grid.items[].title
services.grid.items[].division
services.grid.items[].description
services.grid.items[].link
services.process.overline
services.process.heading
services.process.description
services.process.steps[].number
services.process.steps[].title
services.process.steps[].description
services.whyUs.overline
services.whyUs.heading
services.whyUs.stats[].value
services.whyUs.stats[].suffix
services.whyUs.stats[].label
services.whyUs.differentiators[]
services.cta.heading
services.cta.description
services.cta.primary
services.cta.secondary
```
