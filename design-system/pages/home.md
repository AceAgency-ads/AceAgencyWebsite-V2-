# Homepage Page Spec

> Route: `/` (redirects to `/ro/`)
> Theme: Dark-dominant with alternating light sections, trust-first social proof flow
> Priority: Must-have (flagship page)
> Last Updated: March 18, 2026 (Phase 4 v2 — Certifications, Before/After, FAQ, Exit Intent)

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
│  SECTION 4: Certification Badges    [dark]   │ Social proof: partner certifications
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
│  SECTION 7: Before/After Results    [light]  │ Results proof: concrete before→after metrics
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 8: Stats / Track Record    [dark]   │ Social proof: aggregate numbers
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 9: About Preview           [dark]   │ Brand: who we are
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 10: Testimonials       [light-warm] │ Social proof: text testimonials
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 11: FAQ                    [light]  │ Engagement: FAQ accordion
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 12: CTA                   [violet]  │ Conversion: call-to-action
│                                              │
├──────────────────────────────────────────────┤
│  [Footer]                                    │
│                                              │
│  [Exit Intent Popup] — overlay on exit       │ Recovery: desktop exit-intent modal
│  └─ (desktop-only, 30s delay, once/session) │
└──────────────────────────────────────────────┘
```

**Design Principle:** Enhanced trust-first flow with concrete before/after proof + FAQ for engagement + exit-intent recovery. Total 12 sections + 1 overlay (13 interactive elements).

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

## Section 4: Certification Badges

**Theme:** dark
**Layout:** Grid responsive: 2 columns (mobile), 3 columns (tablet), 5 columns (desktop)

### Content

- **Overline:** "PARTENERI CERTIFICATI"
- **Heading:** "Certificari & Parteneriate Globale"
- **Badges:** 5 partner certification logos

### Badge Specifications

- **Visual style:**
  - Grayscale + 60% opacity by default
  - On hover: Full color + 100% opacity
  - Smooth 300ms transition
  - Centered in container, flexible sizing
  - Images: 140px width, 60px height (h-auto for responsive)

### Grid Layout

- **Desktop (lg):** 5 columns, max-width-4xl centered, gap 32px
- **Tablet (sm):** 3 columns, gap 24px
- **Mobile:** 2 columns, gap 16px
- **Accessibility:** Keyboard accessible, focus indicators on borders

### Data Structure (i18n)

- `home.certifications.overline`
- `home.certifications.heading`
- `home.certifications.badges[0-4].name`
- `home.certifications.badges[0-4].src` (absolute image path)

### Implementation Notes

- Badges sourced from `/public/images/certifications/`
- Maps over array of 5 badge objects
- Alt text uses badge name for screen readers
- No animation on scroll (decorative but persistent)

---

## Section 5: Conversion Process ("Metoda LAB")

**Theme:** dark
**Layout:** 5-step horizontal process flow (1-5 columns desktop, responsive grid mobile)

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

## Section 7: Before/After Results Preview

**Theme:** light
**Layout:** 3-column card grid with before/after comparison and improvement badges

### Content

- **Overline:** "REZULTATE INAINTE SI DUPA"
- **Heading:** "Transformari Masurabile cu Sistem LAB"
- **Description:** (optional, from i18n)

### Before/After Cards (3 items)

| Client | Industry | Before | After | Improvement | Summary |
|--------|----------|--------|-------|-------------|---------|
| E-Shop Romania | E-commerce | 2.5% | 8.2% | +228% | Restructurare landing page + A/B testing incrementaux, conversion rate tripled. |
| SaaS Startup | SaaS | 150 leads/mo | 520 leads/mo | +247% | System integrat email + retargeting campaigns pentru nurture-ul lead-urilor calitate. |
| Digital Agency | Services | 32% ROI | 152% ROI | +375% | Optimizarea workflow-ului intern + landing page redesign impulsionata de data. |

### Card Specifications

- **Theme:** Light background with violet accents
- **Industry pill:** Rounded-full, violet-10% background (e.g., #650CBE/10), uppercase 10px, violet text
- **Client name:** Bold `h3`, black text
- **Metric display:**
  - **Before (left):** Muted text + strikethrough decoration, 2xl size
  - **Arrow icon:** Small chevron-right between before/after
  - **After (right):** Violet color, 3xl-4xl size, CountUp animated
  - **Improvement badge:** Green background (#0a8a3e/20), green text, rounded-full
- **Summary:** Muted text at bottom (2-3 lines)
- **Grid:** 3 columns desktop, 1 column mobile, gap 24px
- **Animation:**
  - Cards fade-up on scroll (ScrollReveal)
  - CountUp triggers at 80% scroll position
  - 2000ms duration per metric
- **Hover:** Shadow elevation on card

### Data Structure (i18n)

- `home.beforeAfter.overline`
- `home.beforeAfter.heading`
- `home.beforeAfter.labelBefore` (e.g., "Inainte")
- `home.beforeAfter.labelAfter` (e.g., "Dupa")
- `home.beforeAfter.items[0-2].client`
- `home.beforeAfter.items[0-2].industry`
- `home.beforeAfter.items[0-2].metricBefore` (string number)
- `home.beforeAfter.items[0-2].metricAfter` (string number)
- `home.beforeAfter.items[0-2].metricSuffix` (e.g., "%", "leads/mo")
- `home.beforeAfter.items[0-2].metricLabel` (e.g., "Conversion Rate")
- `home.beforeAfter.items[0-2].improvement` (e.g., "+228%")
- `home.beforeAfter.items[0-2].summary`
- `home.beforeAfter.cta` (e.g., "Vezi Toate Studiile →")

### CTA Link

- **Text:** `home.beforeAfter.cta`
- **Target:** `/studii-de-caz` (case studies/portfolio page)
- **Style:** Inline centered link with arrow icon

---

## Section 8: Stats / Track Record

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

### Specifications

- Left column: 55% width on desktop
- Right column: 45% width on desktop
- Mobile: Stacked (text first, visual below)
- Animation: Text fades up from left, visual fades up from right

---

## Section 10: Testimonials

**Theme:** light-warm
**Layout:** Snap-scroll horizontal carousel

### Content

- **Overline:** "PARERI CLIENTI"
- **Heading:** (from i18n `home.testimonials.heading`)
- **Description:** (optional)

### Testimonial Cards

- **Theme:** Light background white card
- **Content:** Quote + author + company + rating (stars)
- **Grid:** Single row horizontal scroll with snap points
- **Mobile:** Vertical stack with CSS snap scrolling

### Data Structure (i18n)

- `home.testimonials.overline`
- `home.testimonials.heading`
- `home.testimonials.items[].quote`
- `home.testimonials.items[].author`
- `home.testimonials.items[].company`
- `home.testimonials.items[].rating`

---

## Section 11: FAQ

**Theme:** light
**Layout:** Accordion centered, max-width 768px

### Content

- **Overline:** "INTREBARI FRECVENTE"
- **Heading:** "Intrebari si Raspunsuri"
- **Description:** (optional)
- **FAQ items:** 8-10 accordion items with expand/collapse

### Accordion Specifications

- **Component:** shadcn Accordion (Radix UI)
- **Items:** Each has question (trigger) + answer (content)
- **Answer styling:** Muted text color, prose-friendly formatting
- **Animation:** Smooth expand/collapse (Radix default)
- **Schema:** FAQPage JSON-LD generated from items
- **CTA below:** Link to full FAQ page `/intrebari-frecvente`

### Data Structure (i18n)

- `home.faq.overline`
- `home.faq.heading`
- `home.faq.items[].question`
- `home.faq.items[].answer`
- `home.faq.cta` (e.g., "Vezi Toate Intrebarile →")

---

## Section 12: CTA (Call-to-Action)

**Theme:** violet
**Layout:** Centered content with two CTAs

### Content

- **Overline:** (optional)
- **Heading:** "Gata sa Cresti Digital?"
- **Description:** "Contacteaza-ne pentru o consultatie gratuita."
- **CTAs:**
  - Primary: "Contacteaza-ne" → `/contact`
  - Secondary: "Descopera Portofoliu" → `/studii-de-caz`

### Specifications

- Centered layout, full-width section
- Buttons side-by-side on desktop, stacked on mobile
- Violet gradient background with subtle animation

---

## Overlay: Exit Intent Popup

**Type:** Desktop-only overlay (not a section)
**Trigger:** Mouseleave at top of viewport
**Timing:** 30-second delay after page load, once per session, skip 7 days after dismiss

### Content

- **Overline:** "URMARESTI SAS NE PLECI?"
- **Heading:** "O Propunere Speciala pentru Tine"
- **Description:** (from i18n)
- **CTA:** "Descopera Oferta Noastra →" → `/contact`
- **Dismiss:** "Nu, Multumesc" (subtle button)

### Visual Specifications

- **Background:** Full-screen dark overlay with backdrop blur
- **Card:** Dark (#262523) with rounded-3xl corners, shadow-2xl
- **Accent:** Violet gradient glow effect (top-right, subtle)
- **Close button:** X icon (top-right corner)
- **Theme colors:** White text, violet accents
- **Animation:** Backdrop fade-in + card scale-in (0.3s duration)

### Behavior

- **Desktop only:** No-op on touch devices (mobile/tablet)
- **Delay:** 30 seconds after mount
- **Session storage:** Shows once per session max
- **Persistent storage:** 7-day dismiss cache via localStorage
- **Dismissal:** Via X button, "No thanks" button, or clicking overlay backdrop
- **Hook:** `useExitIntent()` returns `{ isVisible, dismiss }`

### Data Structure (i18n)

- `home.exitIntent.overline`
- `home.exitIntent.heading`
- `home.exitIntent.description`
- `home.exitIntent.cta`
- `home.exitIntent.dismiss`

### Implementation

- **Component:** `src/components/sections/home/ExitIntentPopup.tsx`
- **Hook:** `src/lib/hooks/useExitIntent.ts`
- **Animation:** Framer Motion (`motion/react`)


---

## Animations Summary

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Hero headline | Character/word stagger | Page load | 800ms |
| Hero subheading | Fade up | After headline | 500ms |
| Hero CTAs | Fade up | After subheading | 500ms |
| Client logos | Marquee infinite | Continuous | 20s linear |
| Certification badges | Grayscale → color | Hover | 300ms transition |
| Conversion steps | Stagger fade up | Scroll (85%) | 600ms, 120ms stagger |
| Service cards | Pin + scrub scroll | Scroll | GSAP scrub |
| Before/After metrics | CountUp (after) | Scroll (80%) | 2000ms |
| Before/After cards | Fade up | Scroll (85%) | 500ms, 80ms stagger |
| Stats numbers | CountUp | Scroll (85%) | 2000ms |
| About text | Fade up (left) | Scroll (85%) | 500ms |
| About visual | Fade up (right) | Scroll (85%) | 500ms |
| Text testimonial cards | Snap scroll carousel | Scroll | CSS snap |
| FAQ accordion | Expand/collapse | Click | Radix default |
| Exit intent popup | Scale-in + fade | Exit intent trigger | 300ms, 100ms delay |

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

home.certifications.overline
home.certifications.heading
home.certifications.badges[0-4].name
home.certifications.badges[0-4].src

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

home.beforeAfter.overline
home.beforeAfter.heading
home.beforeAfter.labelBefore
home.beforeAfter.labelAfter
home.beforeAfter.items[0-2].client
home.beforeAfter.items[0-2].industry
home.beforeAfter.items[0-2].metricBefore
home.beforeAfter.items[0-2].metricAfter
home.beforeAfter.items[0-2].metricSuffix
home.beforeAfter.items[0-2].metricLabel
home.beforeAfter.items[0-2].improvement
home.beforeAfter.items[0-2].summary
home.beforeAfter.cta

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

home.faq.overline
home.faq.heading
home.faq.items[].question
home.faq.items[].answer
home.faq.cta

home.exitIntent.overline
home.exitIntent.heading
home.exitIntent.description
home.exitIntent.cta
home.exitIntent.dismiss

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
