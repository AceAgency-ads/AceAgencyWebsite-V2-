# Homepage Page Spec

> Route: `/` (redirects to `/ro/`)
> Theme: Dark-dominant with alternating light sections, trust-first social proof flow
> Priority: Must-have (flagship page)
> Last Updated: March 16, 2026 (Phase 4 Redesign)

---

## Page Structure

```
┌──────────────────────────────────────────────┐
│  [Header]                                    │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 1: Hero                    [dark]   │ Trust anchor: brand promise
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 2: HeroTransition          [dark]   │ Context: what we do
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 3: Client Logo Bar         [dark]   │ Social proof: who trusts us
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 4: Video Testimonials      [dark]   │ Social proof: customer voices (video)
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 5: Conversion Process      [dark]   │ Methodology: how we work (Metoda LAB)
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 6: Services Preview    [light-warm] │ Offering: what we provide
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 7: Stats / Track Record    [dark]   │ Social proof: numbers
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 8: Case Study Preview      [light]  │ Social proof: concrete results
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 9: About Preview           [dark]   │ Brand: who we are
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 10: Lead Magnet            [dark]   │ Engagement: ebook + email capture
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 11: Testimonials       [light-warm] │ Social proof: text testimonials
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 12: CTA                   [violet]  │ Conversion: call-to-action
│                                              │
├──────────────────────────────────────────────┤
│  [Footer]                                    │
└──────────────────────────────────────────────┘
```

**Design Principle:** Trust-first flow prioritizes social proof (logos, video testimonials, stats, case studies) before asking for engagement or conversion.

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

## Section 3: Client Logo Bar

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

## Section 4: Video Testimonials

**Theme:** dark
**Layout:** Desktop 3-column featured grid (1 large + 2 stacked), mobile carousel with navigation

### Content

- **Overline:** "TESTIMONIALE VIDEO"
- **Heading:** "Ce Spun Clientii Nostri (Video Proof)"
- **Video cards:** 3 video testimonials with play button overlay

### Card Specifications

- **Video Testimonial Card:**
  - Rounded-3xl, dark card bg, border
  - Thumbnail + play button overlay (violet circle with white play icon)
  - On click → video autoplays with controls
  - Bottom 40%: stars + quote (truncated) + author info
  - Dimensions: Desktop featured (variable), mobile fixed width (280px)

### Layout Responsive

- **Desktop:** 3-column grid layout (first card featured larger)
- **Mobile/Tablet:** Horizontal scroll carousel with left/right navigation arrows
- **Navigation:** Circular arrow buttons (ChevronLeft, ChevronRight) for mobile/tablet
- **Animation:** Cards fade-up on section entrance (ScrollReveal)

### Data Structure (i18n)

- `home.videoTestimonials.overline`
- `home.videoTestimonials.heading`
- `home.videoTestimonials.items[0-2].quote`
- `home.videoTestimonials.items[0-2].author`
- `home.videoTestimonials.items[0-2].company`
- `home.videoTestimonials.items[0-2].rating`
- `home.videoTestimonials.items[0-2].thumbnailSrc`
- `home.videoTestimonials.items[0-2].videoSrc`

---

## Section 5: Conversion Process ("Metoda LAB")

**Theme:** dark
**Layout:** 5-step horizontal process flow (1-5 columns desktop, responsive grid mobile)
**Position Note:** Section 5 in new order; formerly Section 3

### Content

- **Overline:** "METODA LAB"
- **Heading:** "5 Pasi Catre Conversii Masurabile"
- **Description:** "Un proces testat si repetat care transforma traficul in clienti si clientii in ambasadori ai brandului tau."

### Steps (5 items)

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 01 | Search | Audit | Analizam prezenta digitala actuala, datele existente si palniile de conversie pentru a identifica oportunitatile de crestere. |
| 02 | Target | Strategie | Construim un plan de crestere personalizat bazat pe datele din audit, cu obiective clare si KPI-uri masurabile. |
| 03 | Rocket | Implementare | Executam strategia pe toate canalele relevante — ads, SEO, email marketing, web — cu precizie si coerenta. |
| 04 | RefreshCw | Optimizare | Testam A/B, iteram si imbunatatim continuu fiecare element al sistemului pentru conversii mai bune. |
| 05 | TrendingUp | Scalare | Scalam ce functioneaza, extindem pe canale noi si crestem bugetele acolo unde ROI-ul este dovedit. |

### Specifications

- **Step card layout:** Flex column with:
  - Large decorative number (01-05) in Violet 20% opacity, transitions to 40% on hover
  - Icon: 32px, muted text, transitions to Violet on hover
  - Title: `h3` size, bold text
  - Description: `body-sm`, muted text
- **Mobile:** Vertical stack with dashed left border connector between steps
- **Desktop:** 5-column horizontal grid with dashed top border connector between steps (hidden on mobile)
- **Desktop animation:** Fade-up stagger on scroll entry (80% trigger)
- **Hover:** Icon + number color transitions to Violet (#650CBE)
- **Accessibility:** Respects `prefers-reduced-motion: reduce` (animations disabled)

---

## Section 6: Services Preview

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

## Section 7: Stats / Track Record

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

## Section 8: Case Study Preview

**Theme:** light
**Layout:** 3-column card grid with animated metrics

### Content

- **Overline:** "STUDII DE CAZ"
- **Heading:** "Rezultate Concrete de la Clienti Reali"
- **Description:** "Citeste cum am ajutat branduri sa-si dubleze ROI-ul si sa isi accelereze cresterea digitala."

### Case Study Cards (3 items)

| Client | Industry | Metric | Label | Summary |
|--------|----------|--------|-------|---------|
| E-Shop Romania | E-commerce | 340% | ROI Growth (3 months) | Campaniile Google Ads au generat venituri suplimentare de 245k EUR in 3 luni. |
| TechStart SRL | SaaS | 280% | Lead Growth (6 months) | Sistem integrat de Facebook Ads + SEO a generat 450 leade calitate inalta/luna. |
| Beauty Brand | E-commerce | 150% | Revenue Growth (6 months) | Restructurare email marketing + automations a dus la ROI de 150% pe investitia initiala. |

### Card Specifications

- **Theme:** light background with violet accents
- **Industry pill:** Rounded-full, violet-10% background, small uppercase text
- **Metric:** Large CountUp animated number (triggered on scroll)
- **Client name:** Bold heading, black text
- **Summary:** Muted text, 2-3 lines
- **Grid:** 3 columns desktop, 1 column mobile, gap 24px
- **Animation:** Cards fade-up on scroll (ScrollReveal)
- **Hover:** Shadow elevation on card

### Data Structure (i18n)

- `home.caseStudies.overline`
- `home.caseStudies.heading`
- `home.caseStudies.description`
- `home.caseStudies.items[0-2].client`
- `home.caseStudies.items[0-2].industry`
- `home.caseStudies.items[0-2].metric` (number value)
- `home.caseStudies.items[0-2].metricPrefix` (e.g., "+")
- `home.caseStudies.items[0-2].metricSuffix` (e.g., "%")
- `home.caseStudies.items[0-2].metricLabel` (e.g., "ROI Growth")
- `home.caseStudies.items[0-2].summary`
- `home.caseStudies.cta` ("Vezi Toate Studiile →")

### CTA Link

- **Text:** `home.caseStudies.cta`
- **Target:** `/portofoliu` (portfolio page when available)
- **Style:** Inline link with arrow icon

---

## Section 9: About Preview

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

## Section 10: Lead Magnet (Ebook Download)

**Theme:** dark outer container, light card inner
**Layout:** Two-column (ebook cover left, content + form right), responsive stack on mobile

### Content

- **Overline:** "RESURSA GRATUITA"
- **Heading:** "27 Tactici Conversion Rate Optimization"
- **Description:** "Descarca ghidul complet cu strategiile pe care le folosim pentru a creste conversiile clientilor nostri cu 150-300%."
- **Bullet points:** 4 key benefits of the ebook (checked list)
- **CTA:** Email form with GDPR consent

### Card Specifications

**Left Column (Ebook Cover):**
- Gradient background (violet to cobalt)
- Icon: Download (lucide)
- Title: "27 Tactici"
- Subtitle: "Conversion Rate Optimization"
- Dimensions: 3:4 aspect ratio, max-height 420px

**Right Column (Content):**
- Heading, description, bullet points (checked list with violet checkmarks)
- Email form: input + submit button side-by-side
- Honeypot field for spam prevention
- GDPR consent checkbox
- Success message on submission

### Form Specifications

- **Email input:** Underlined style, dark border-bottom
- **Submit button:** "Descarcare" with arrow icon, violet background, rounded-full
- **GDPR checkbox:** Required, small text
- **Success state:** Green checkmark + confirmation message
- **Reuses:** `submitNewsletter` server action (same backend as old Newsletter)

### Data Structure (i18n)

- `home.leadMagnet.overline`
- `home.leadMagnet.heading`
- `home.leadMagnet.description`
- `home.leadMagnet.bullets[0-3]`
- `home.leadMagnet.placeholder` (email input)
- `home.leadMagnet.submit` (button text)
- `home.leadMagnet.gdpr` (checkbox label)
- `home.leadMagnet.success` (confirmation message)

### Animations

- Left cover: Fade-up from left (ScrollReveal)
- Right content: Fade-up from right (ScrollReveal), bullet points stagger

---

## Section 11: Testimonials

**Theme:** light-warm
**Layout:** Horizontal snap-scroll carousel with mixed text + video cards, left-aligned SectionHeader

### Content

- **Overline:** "PARERI CLIENTI"
- **Heading:** "Ce Spun Clientii Nostri (Text Testimonials)"

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

## Section 12: CTA (Final Conversion)

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

## Animations Summary

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Hero headline | Character/word stagger | Page load | 800ms |
| Hero subheading | Fade up | After headline | 500ms |
| Hero CTAs | Fade up | After subheading | 500ms |
| Client logos | Marquee infinite | Scroll (85%) | 20s linear |
| Video testimonial cards | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| Conversion steps | Stagger fade up | Scroll (85%) | 600ms, 120ms stagger |
| Service cards | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| Stats numbers | CountUp | Scroll (85%) | 2000ms |
| Case study metrics | CountUp | Scroll (80%) | 2000ms |
| About text | Fade up | Scroll (85%) | 500ms |
| About visual | Fade up (slight delay) | Scroll (85%) | 500ms |
| Lead magnet cover | Fade up (left) | Scroll (80%) | 500ms |
| Lead magnet content | Fade up (right) + stagger | Scroll (80%) | 500ms, 80ms stagger |
| Text testimonial cards | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| CTA heading | TextReveal word | Scroll (85%) | 600ms |

---

## Content Keys (i18n)

All content stored in `messages/ro.json` and `messages/en.json` under the `home` namespace:

```
home.meta.title
home.meta.description

home.hero.overline
home.hero.headline
home.hero.subheading
home.hero.cta.primary
home.hero.cta.secondary

home.heroTransition.label
home.heroTransition.heading
home.heroTransition.description
home.heroTransition.definition

home.clientLogos.heading

home.videoTestimonials.overline
home.videoTestimonials.heading
home.videoTestimonials.items[0-2].quote
home.videoTestimonials.items[0-2].author
home.videoTestimonials.items[0-2].company
home.videoTestimonials.items[0-2].rating
home.videoTestimonials.items[0-2].thumbnailSrc
home.videoTestimonials.items[0-2].videoSrc

home.conversionProcess.overline
home.conversionProcess.heading
home.conversionProcess.description
home.conversionProcess.steps[0-4].title
home.conversionProcess.steps[0-4].description

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

home.caseStudies.overline
home.caseStudies.heading
home.caseStudies.description
home.caseStudies.items[0-2].client
home.caseStudies.items[0-2].industry
home.caseStudies.items[0-2].metric
home.caseStudies.items[0-2].metricPrefix
home.caseStudies.items[0-2].metricSuffix
home.caseStudies.items[0-2].metricLabel
home.caseStudies.items[0-2].summary
home.caseStudies.cta

home.about.overline
home.about.heading
home.about.description
home.about.cta

home.leadMagnet.overline
home.leadMagnet.heading
home.leadMagnet.description
home.leadMagnet.bullets[0-3]
home.leadMagnet.placeholder
home.leadMagnet.submit
home.leadMagnet.gdpr
home.leadMagnet.success

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
```

### Additional Namespaces (New in Phase 4)

**AdPilot Privacy Policy:**
```
adpilotPrivacy.meta.title
adpilotPrivacy.meta.description
adpilotPrivacy.breadcrumb.home
adpilotPrivacy.breadcrumb.adpilot
adpilotPrivacy.breadcrumb.current
adpilotPrivacy.hero.heading
adpilotPrivacy.content[].title
adpilotPrivacy.content[].paragraphs[]
```

**AdPilot Terms of Service:**
```
adpilotTerms.meta.title
adpilotTerms.meta.description
adpilotTerms.breadcrumb.home
adpilotTerms.breadcrumb.adpilot
adpilotTerms.breadcrumb.current
adpilotTerms.hero.heading
adpilotTerms.content[].title
adpilotTerms.content[].paragraphs[]
```
