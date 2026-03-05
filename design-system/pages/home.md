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
│  SECTION 2: HeroTransition          [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 3: Services Preview    [light-warm] │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 4: Stats / Track Record    [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 5: Client Logo Bar         [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 6: About Preview           [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 7: Testimonials        [light-warm] │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 8: CTA                     [violet] │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 9: Newsletter              [dark]   │
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

- **Overline:** "WEB . ADS . AI . MEDIA" — `overline` style, Grey, letter-spacing 0.12em
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

## Section 2: HeroTransition

**Theme:** dark
**Layout:** Split two-column (heading left, scrub-reveal paragraph right)

### Content

- **Label (overline):** "AGENTIE FULL-SERVICE"
- **Heading:** "Web. Ads. AI. Media. Timp real."
- **Paragraph (ScrubReveal):** Word-by-word opacity reveal tied to scroll position. Contains service definition.

### Specifications

- Left column: Overline + large heading (h2), enters with fade-up animation
- Separator line: Animates scaleX from left
- Right column: ScrubReveal paragraph that brightens as user scrolls
- Reduces visual "landing" impact between hero and first content section

---

## Section 3: Services Preview

**Theme:** light-warm (NEW Phase 3)
**Layout:** SectionHeader + horizontal scroll carousel (desktop pin + scrub, mobile CSS snap)

### Content

- **Overline:** "SERVICII"
- **Heading:** "Solutii Complete pentru Afacerea Ta"

### Service Cards (6 horizontal scroll cards)

| Service | Icon | Link |
|---------|------|------|
| Dezvoltare Web | Code lucide | /servicii |
| Google Ads | Google FA icon | /servicii/google-ads |
| Facebook & Instagram Ads | Facebook FA icon | /servicii/facebook-ads |
| TikTok Ads | TikTok FA icon | /servicii/tiktok-ads |
| Optimizare SEO | Search lucide | /servicii/seo |
| Consultanta Marketing | Lightbulb lucide | /servicii/consultanta-marketing |

### Specifications

- **Card style:** 260-280px width, 280-300px height, rounded-2xl border, white card on light-warm bg
- **Layout:** Icon + arrow top, title + description bottom (hidden until hover)
- **Desktop animation:** Section pins, scroll drives card row left horizontally
- **Mobile animation:** CSS overflow-x snap scroll (touch-friendly)
- **Description reveal:** Max-height 0 → 80px on hover with smooth transition
- **CTA below:** Ghost button "Vezi toate serviciile →" linking to `/servicii`

---

## Section 4: Stats / Track Record

**Theme:** dark
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
- Numbers: `display-lg`, Glacial Indifference Bold, Violet
- Labels: `body-sm`, muted text
- Grid: 4 columns desktop, 2x2 tablet, 2x2 mobile
- Dividers: Vertical 1px border between stats on desktop (optional)
- Animation: CountUp fires when section enters viewport at 85%

---

## Section 5: Client Logo Bar

**Theme:** dark
**Layout:** Marquee track with horizontal infinite scroll

### Content

- **Heading (overline):** "PARTENERI DIN INDUSTRIA ROMANEASCA"
- **Logos:** 8 client company logos in infinite marquee loop

### Specifications

- **Desktop:** Logo width ~120px, gap 16px, marquee speed 20s
- **Mobile:** Logo width 120px, gap 12px, marquee speed 20s
- **Hover:** Logos transition from grayscale opacity-60 → full color opacity-100
- **Reduced motion fallback:** Static 2-col (mobile) / 4-col (desktop) grid instead of marquee
- **Duplicated logos:** Array duplicated for seamless infinite loop
- **Implementation:** CSS `@keyframes marquee` with `animation: marquee 20s linear infinite`

### Data Structure

Replace placeholder SVG logos with real client logos:
- Location: `/public/images/clients/`
- Format: SVG or PNG (SVG preferred for crisp scaling)
- Dimensions: Width ~120px, height ~40px max
- Naming: `clientname.svg` (e.g., `techstart.svg`)

---

## Section 6: About Preview

**Theme:** dark
**Layout:** Two-column (text left, visual right)

### Content

- **Overline:** "DESPRE NOI"
- **Heading:** "Disciplina. Viziune. Rezultate."
- **Description:** "Suntem o echipa de profesionisti care crede ca fiecare brand merita o prezenta digitala de exceptie. De la strategie la executie, de la idea la rezultat."
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

## Section 7: Testimonials

**Theme:** light-warm (NEW Phase 3)
**Layout:** Horizontal snap-scroll carousel with mixed text + video cards, left-aligned SectionHeader

### Content

- **Overline:** "TESTIMONIALE"
- **Heading:** "Ce Spun Clientii Nostri"

### Testimonials (8 items, mix of text + video)

| Type | Quote | Author | Company | Rating | Video? |
|------|-------|--------|---------|--------|--------|
| text | "AceAgency a transformat prezenta noastra online. Rezultatele au depasit asteptarile." | Maria Popescu | TechStart SRL | 5 | — |
| text | "Profesionalism, creativitate si rezultate masurabile. Recomand cu incredere." | Alexandru Ionescu | Digital Commerce | 5 | — |
| video | "Campaniile Google Ads au generat ROI de 340% in primele 3 luni." | Andrei Gheorghe | E-Shop Romania | 5 | /videos/client-testimonial-1.mp4 |
| text | "Echipa intelege nevoile de business si livreaza solutii care functioneaza." | Elena Dumitrescu | StartUp Hub | 5 | — |
| text | "Site-ul creat de AceAgency este cel mai bun investiment digital pe care l-am facut." | Ioana Marinescu | Beauty Brand | 5 | — |
| video | "Suport excelent si comunicare transparenta pe tot parcursul." | Mihai Stanescu | Logistics Pro | 5 | /videos/client-testimonial-2.mp4 |
| text | "Rezultate stabile. Echipa reactiva. Recomand cu incredere." | George Marius | Auto Service Pro | 5 | — |
| video | "AceAgency a crescut ROI-ul nostru cu 280% in 6 luni." | Claudia Florescu | Fashion Romania | 5 | /videos/client-testimonial-3.mp4 |

### Card Specifications

**Text Testimonial Card:**
- Rounded-3xl, white bg, border
- 400px width (mobile: 85vw)
- Decorative quote mark top-left
- Quote text + star rating + author + company

**Video Testimonial Card:** (NEW)
- Rounded-3xl, white bg, border
- 400px width, 16:9 video aspect
- Thumbnail + play button overlay (violet circle with white play icon)
- On click → video autoplays with controls
- Bottom 40%: stars + quote + author info

**Navigation:** Left/Right circular arrow buttons (prev/next card)

### Specifications

- Carousel: Horizontal snap-scroll with CSS `snap-x snap-mandatory`
- Desktop: GSAP smooth scroll support (optional)
- Mobile: Native scroll + snap (smooth: true)
- Cards: Mixed text + video (pull video type from i18n)
- Animation: Cards fade-up on carousel entrance

---

## Section 8: CTA

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
- Primary CTA: accent variant (Grey bg, Black text) → `/contact`
- Secondary CTA: ghost variant (White border) → `/portofoliu` (or disabled if V2)
- Background: `--ds-gradient-brand-primary` (Violet gradient) or solid Violet
- Optional: Subtle radial glow of Violet-light at center
- Padding: `py-24` desktop, `py-16` mobile
- Animation: Heading TextReveal on scroll, buttons fade up

---

## Section 9: Newsletter

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
- Success: "Multumim! Te-ai abonat cu succes." in Violet
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
