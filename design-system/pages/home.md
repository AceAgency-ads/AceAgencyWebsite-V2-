# Homepage Page Spec

> Route: `/` (redirects to `/ro/`)
> Theme: Dark-dominant with alternating light sections
> Priority: Must-have (flagship page)

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
│  SECTION 2: Services Preview        [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 3: Stats / Track Record    [light]  │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 4: About Preview           [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 5: Testimonials            [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 6: CTA                     [violet] │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 7: Newsletter              [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│  [Footer]                                    │
└──────────────────────────────────────────────┘
```

---

## SEO

- **H1:** "Agentie Digitala Full-Service din Bucuresti" (RO) / "Full-Service Digital Agency in Bucharest" (EN)
- **Title tag:** "AceAgency | Agentie Digitala Full-Service Bucuresti" (59 chars)
- **Meta description:** "AceAgency - agentie digitala premium din Bucuresti. Servicii web, publicitate, AI si media. Rezultate masurabile pentru afacerea ta. Contacteaza-ne!" (149 chars)
- **Schema:** Organization + LocalBusiness JSON-LD

---

## Section 1: Hero

**Theme:** dark
**Layout:** Full viewport height (100vh), centered content
**Padding:** `py-32` desktop, `py-20` mobile

### Content

```
                    Agentie Digitala
                    Full-Service
                    din Bucuresti

        Transformam viziunea ta in rezultate digitale
        masurabile. Web. Ads. AI. Media.

              [Descopera Serviciile →]  [Contacteaza-ne]
```

### Specifications

- **Overline:** "WEB . ADS . AI . MEDIA" — `overline` style, Electric Mint, letter-spacing 0.12em
- **Headline:** `display-xl` size, Glacial Indifference Bold, White
  - Animation: Character-level stagger (SplitText or word-level fallback)
  - Trigger: On page load
  - Duration: 800ms, 30ms stagger per char (or 80ms per word)
- **Subheading:** `subtitle` size, Red Hat Display, Grey (#D9D9D9)
  - Animation: Fade up after headline completes (200ms delay)
- **CTAs:** Two buttons side by side
  - Primary: "Descopera Serviciile" with arrow-right icon → links to `/servicii`
  - Secondary (outline): "Contacteaza-ne" → links to `/contact`
  - Animation: Fade up after subheading (400ms delay)
- **Background:** Solid `--ds-color-black` with subtle radial glow (`--ds-gradient-brand-glow`) positioned top-center
- **Scroll indicator:** Small animated chevron-down at bottom of hero section

### Responsive

- Desktop: `display-xl` headline, horizontal CTA buttons
- Tablet: `display-lg` headline, horizontal CTA buttons
- Mobile: `h1` headline, stacked CTA buttons (full width)

---

## Section 2: Services Preview

**Theme:** dark
**Layout:** Bento grid Pattern B (masonry 3-col), SectionHeader left-aligned

### Content

- **Overline:** "SERVICII"
- **Heading:** "Solutii Complete pentru Afacerea Ta"
- **Description:** "De la dezvoltare web la publicitate platita, de la inteligenta artificiala la productie media — acoperim tot ce ai nevoie."

### Service Cards (Feature Card variant, 6 cards)

| Service | Icon | Description |
|---------|------|-------------|
| Dezvoltare Web | Browser code | Site-uri si aplicatii web performante, responsive si optimizate SEO |
| Google Ads | Target bullseye | Campanii Google Ads optimizate pentru ROI maxim si cost pe conversie minim |
| Facebook & Instagram Ads | Social nodes | Strategii de publicitate pe social media cu targetare precisa |
| TikTok Ads | Play musical | Publicitate creativa pe TikTok pentru audienta noua generatie |
| Optimizare SEO | Search chart | Pozitionare organica in Google prin strategii SEO avansate |
| Consultanta Marketing | Lightbulb | Strategie digitala personalizata bazata pe date si experienta |

### Specifications

- Each card: Feature Card component with icon (48px, Electric Mint), heading (h4), description (body-sm, muted), and link arrow
- Cards link to respective service pages
- Grid: 3 columns on desktop (varied heights for bento feel), 2 on tablet, 1 on mobile
- Animation: Cards fade up with 80ms stagger on scroll trigger
- CTA below grid: "Vezi toate serviciile →" ghost button linking to `/servicii`

---

## Section 3: Stats / Track Record

**Theme:** light
**Layout:** 4-column equal grid (Pattern C), centered SectionHeader

### Content

- **Overline:** "REZULTATE"
- **Heading:** "Performanta Dovedita"

### Stats (Stat Card variant)

| Number | Suffix | Label |
|--------|--------|-------|
| 150 | + | Proiecte Livrate |
| 50 | + | Clienti Multumiti |
| 98 | % | Rata de Retentie |
| 5 | ani | Experienta |

### Specifications

- Each stat: CountUp animation triggered on scroll
- Numbers: `display-lg`, Glacial Indifference Bold, Electric Violet
- Labels: `body-sm`, muted text
- Grid: 4 columns desktop, 2x2 tablet, 2x2 mobile
- Dividers: Vertical 1px border between stats on desktop (optional)
- Animation: CountUp fires when section enters viewport at 85%

---

## Section 4: About Preview

**Theme:** dark
**Layout:** Two-column (text left, visual right)

### Content

- **Overline:** "DESPRE NOI"
- **Heading:** "Disciplina. Viziune. Rezultate."
- **Description:** "Suntem o echipa de profesionisti care crede ca fiecare brand merita o prezenta digitala de exceptie. De la strategie la executie, de la idee la rezultat."
- **CTA:** "Afla mai multe →" secondary button → links to `/despre-noi`

### Right Column

- Abstract visual element (could be a styled component/graphic, NOT a photo)
- Options: Animated grid of brand color blocks, or a stylized "Ace" symbol with subtle animation
- Alternative: Division badges (AceWeb, AceAds, AceAI, AceMedia) in a 2x2 bento mini-grid

### Specifications

- Left column: 55% width on desktop
- Right column: 45% width on desktop
- Mobile: Stacked (text first, visual below)
- Animation: Text fades up from left, visual fades up from right

---

## Section 5: Testimonials

**Theme:** dark
**Layout:** Bento grid (Pattern A or B), centered SectionHeader

### Content

- **Overline:** "TESTIMONIALE"
- **Heading:** "Ce Spun Clientii Nostri"

### Testimonials (minimum 5)

| Quote | Author | Company | Rating |
|-------|--------|---------|--------|
| "AceAgency a transformat complet prezenta noastra online. Rezultatele au depasit asteptarile." | Maria Popescu | TechStart SRL | 5/5 |
| "Profesionalism, creativitate si rezultate masurabile. Recomand cu incredere." | Alexandru Ionescu | Digital Commerce | 5/5 |
| "Echipa AceAgency intelege nevoile de business si livreaza solutii care functioneaza." | Elena Dumitrescu | StartUp Hub | 5/5 |
| "Campaniile Google Ads au generat un ROI de 340% in primele 3 luni." | Andrei Gheorghe | E-Shop Romania | 5/5 |
| "Site-ul creat de AceAgency este cel mai bun investiment digital pe care l-am facut." | Ioana Marinescu | Beauty Brand | 5/5 |
| "Suport excelent si comunicare transparenta pe tot parcursul proiectului." | Mihai Stanescu | Logistics Pro | 5/5 |

### Specifications

- Testimonial Card components in bento grid (varied sizes)
- 2-3 larger cards, 3-4 smaller cards for visual variety
- No carousel — all visible simultaneously
- Grid: 3 columns desktop (bento), 2 tablet, 1 mobile
- Animation: Cards stagger fade-up on scroll, 80ms delay between cards

---

## Section 6: CTA

**Theme:** violet
**Layout:** Centered content, full-width violet background

### Content

```
        Gata sa Cresti Digital?

    Hai sa discutam despre cum putem transforma
    afacerea ta intr-un succes digital.

    [Programeaza o Consultatie]  [Vezi Portofoliul]
```

### Specifications

- Heading: `h2`, White, Glacial Indifference Bold
- Description: `body-lg`, White with slight opacity (0.9)
- Primary CTA: accent variant (Electric Mint bg, Black text) → `/contact`
- Secondary CTA: ghost variant (White border) → `/portofoliu` (or disabled if V2)
- Background: `--ds-gradient-brand-primary` or solid Electric Violet
- Optional: Subtle radial glow of Electric Mint at center
- Padding: `py-24` desktop, `py-16` mobile
- Animation: Heading TextReveal on scroll, buttons fade up

---

## Section 7: Newsletter

**Theme:** dark
**Layout:** Centered content, narrow width (max 640px)

### Content

- **Overline:** "NEWSLETTER"
- **Heading:** "Ramai la Curent"
- **Description:** "Primeste sfaturi de marketing digital, studii de caz si noutati direct in inbox."
- **Form:** NewsletterForm component (email input + submit)

### Specifications

- Center-aligned section
- Form max-width: 480px, centered
- Input: Email placeholder "Adresa ta de email"
- Button: "Aboneaza-te" accent variant
- Success: "Multumim! Te-ai abonat cu succes." in Electric Mint
- Animation: Section fades up on scroll

---

## Animations Summary

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Hero headline | Character/word stagger | Page load | 800ms |
| Hero subheading | Fade up | After headline | 500ms |
| Hero CTAs | Fade up | After subheading | 500ms |
| Service cards | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| Stats numbers | CountUp | Scroll (85%) | 2000ms |
| About text | Fade up | Scroll (85%) | 500ms |
| About visual | Fade up (slight delay) | Scroll (85%) | 500ms |
| Testimonial cards | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| CTA heading | TextReveal word | Scroll (85%) | 600ms |
| Newsletter | Fade up | Scroll (85%) | 500ms |

---

## Content Keys (i18n)

All content stored in `messages/ro.json` and `messages/en.json` under the `home` namespace:

```
home.hero.overline
home.hero.headline
home.hero.subheading
home.hero.cta.primary
home.hero.cta.secondary
home.services.overline
home.services.heading
home.services.description
home.services.items[].title
home.services.items[].description
home.services.cta
home.stats.overline
home.stats.heading
home.stats.items[].value
home.stats.items[].suffix
home.stats.items[].label
home.about.overline
home.about.heading
home.about.description
home.about.cta
home.testimonials.overline
home.testimonials.heading
home.testimonials.items[].quote
home.testimonials.items[].author
home.testimonials.items[].company
home.testimonials.items[].rating
home.cta.heading
home.cta.description
home.cta.primary
home.cta.secondary
home.newsletter.overline
home.newsletter.heading
home.newsletter.description
home.newsletter.placeholder
home.newsletter.submit
home.newsletter.success
```
