# About Page Spec (Despre Noi)

> Route: `/despre-noi`
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
│  SECTION 3: Story / About       [light-warm] │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 4: Values              [light-warm] │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 5: Divisions               [light]  │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 6: Mission & Vision       [dark]    │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 7: Why Choose Us       [light-warm] │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 8: Team                    [dark]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  SECTION 9: CTA                    [violet]  │
│                                              │
├──────────────────────────────────────────────┤
│  [Footer]                                    │
└──────────────────────────────────────────────┘
```

---

## SEO

- **H1:** "Despre AceAgency — Agentie Digitala din Bucuresti" (RO) / "About AceAgency — Digital Agency in Bucharest" (EN)
- **Title tag:** "Despre Noi | AceAgency - Agentie Digitala Bucuresti" (52 chars)
- **Meta description:** "Descopera povestea AceAgency - echipa de profesionisti din Bucuresti dedicata performantei digitale. Web, Ads, AI, Media sub un singur acoperis." (144 chars)
- **Schema:** Organization + BreadcrumbList JSON-LD
- **Breadcrumb:** Acasa > Despre Noi

---

## Section 1: Hero

**Theme:** dark
**Layout:** Left-aligned content, full-width background
**Padding:** `py-32` desktop, `py-20` mobile

### Content

```
DESPRE NOI

Disciplina. Viziune.
Rezultate.

Suntem o echipa care crede ca fiecare brand merita
o prezenta digitala de exceptie.
```

### Specifications

- **Overline:** "DESPRE NOI" — overline style, Grey
- **Headline:** `display-lg` size, Glacial Indifference Bold, White
  - Animation: Word-level stagger on scroll/load
- **Subheading:** `subtitle`, Red Hat Display, Grey
  - Animation: Fade up after headline
- **Background:** Dark with subtle brand glow (top-right position)
- **No CTAs in hero** — scroll to explore pattern
- Padding: Less than homepage hero (`py-24` desktop, `py-16` mobile) — this is an inner page

---

## Section 2: HeroTransition

**Theme:** dark
**Layout:** Split two-column (heading left, scrub-reveal paragraph right)

### Content

- **Label (overline):** "AGENTIE FULL-SERVICE"
- **Heading:** "Echipa. Experienta. Rezultate."
- **Paragraph (ScrubReveal):** Word-by-word opacity reveal tied to scroll position. About mission definition.

### Specifications

- Left column: Overline + large heading (h2), enters with fade-up animation
- Separator line: Animates scaleX from left
- Right column: ScrubReveal paragraph that brightens as user scrolls
- Creates bridge between hero and story section

---

## Section 3: Story / About

**Theme:** light-warm (NEW Phase 3)
**Layout:** Two-column (text left 60%, visual right 40%)

### Content

- **Overline:** "POVESTEA NOASTRA"
- **Heading:** "De la Pasiune la Performanta"
- **Body text (2-3 paragraphs):**
  - Paragraph 1: Origin story — how AceAgency started, the founding vision
  - Paragraph 2: Growth journey — from small team to full-service agency
  - Paragraph 3: Present day — what drives the team, commitment to results
- **Right column:** Abstract visual element or stylized timeline graphic

### Specifications

- Body text: `body-lg`, multiple paragraphs with `space-6` gap between
- Max-width on paragraphs: 65ch
- Right column: Decorative component (not a photo) — possibly an animated brand symbol or abstract geometry using brand colors
- Mobile: Stacked (text first, visual below or hidden)
- Animation: Text paragraphs stagger fade up, visual fades in from right

---

## Section 4: Values

**Theme:** light-warm (NEW Phase 3)
**Layout:** 3-column grid (equal), centered SectionHeader

### Content

- **Overline:** "VALORILE NOASTRE"
- **Heading:** "Principiile Care Ne Ghideaza"

### Values (Default Cards, 6 values in 3x2 grid)

| Icon | Value | Description |
|------|-------|-------------|
| Target | Excelenta | Ne dedicam calitatii in fiecare proiect, de la concept la livrare |
| Shield | Integritate | Comunicare transparenta si onesta cu fiecare client si partener |
| Zap | Inovatie | Adoptam cele mai noi tehnologii si strategii pentru rezultate superioare |
| Users | Colaborare | Lucram impreuna cu clientii nostri ca o echipa unita |
| TrendingUp | Performanta | Fiecare actiune este masurata si optimizata pentru rezultate maxime |
| Heart | Pasiune | Iubim ceea ce facem si asta se vede in fiecare proiect livrat |

### Specifications

- Default Card variant with icon (32px, Violet), heading (h4), description (body-sm, muted)
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Card bg: White on light-warm section
- Animation: Cards stagger fade up, 80ms delay

---

## Section 5: Divisions

**Theme:** dark (slightly different shade — dark-elevated background)
**Layout:** 4-column grid or 2x2 bento

### Content

- **Overline:** "DIVIZIILE NOASTRE"
- **Heading:** "Expertiza Sub Un Singur Acoperis"
- **Description:** "Patru divizii specializate, un singur obiectiv: succesul digital al clientilor nostri."

### Division Cards (Feature Card variant)

| Division | Icon | Focus | Description |
|----------|------|-------|-------------|
| AceWeb | Code browser | Dezvoltare Web | Site-uri si aplicatii web performante, de la landing pages la platforme complexe |
| AceAds | Target bullseye | Publicitate Digitala | Campanii Google, Facebook, TikTok si Instagram optimizate pentru conversii |
| AceAI | Brain circuit | Inteligenta Artificiala | Solutii AI pentru automatizare, chatbots si analiza predictiva |
| AceMedia | Camera aperture | Productie Media | Continut video, foto si grafic pentru branduri care vor sa iasa in evidenta |

### Specifications

- Feature Card variant: icon (48px, Grey), division name (h3), focus area (body-sm, Violet), description (body-sm, muted)
- Grid: 4 columns desktop (equal width), 2x2 tablet, 1 mobile
- Hover: Card lifts + violet glow shadow
- Animation: Cards stagger fade up
- Each card links to the respective services sub-page

---

## Section 6: Mission & Vision

**Theme:** dark
**Layout:** Two-column side by side

### Content

**Left Column — Mission:**
- **Overline:** "MISIUNEA NOASTRA"
- **Heading:** "Rezultate Digitale Masurabile"
- **Description:** "Sa ajutam afacerile din Romania sa creasca prin strategii digitale integrate, creative si orientate catre performanta. Fiecare proiect este o oportunitate de a demonstra ca marketingul digital bine facut genereaza rezultate reale."

**Right Column — Vision:**
- **Overline:** "VIZIUNEA NOASTRA"
- **Heading:** "Lider in Digital din Romania"
- **Description:** "Sa devenim agentia digitala de referinta din Romania, recunoscuta pentru excelenta in design, publicitate si inovatie tehnologica. Un partener strategic pentru branduri care vor sa conduca in era digitala."

### Specifications

- Two equal columns on desktop, stacked on mobile
- Each column: Card-like container with light-muted background, padding `space-8`
- Overline: Violet
- Heading: h3 size
- Description: body-lg, muted
- Divider between columns: 1px vertical border on desktop
- Animation: Left column fades up first, right follows with 200ms delay

---

## Section 7: Why Choose Us

**Theme:** light-warm (NEW Phase 3)
**Layout:** Left-aligned list with alternating icons

### Content

- **Overline:** "DE CE SA NE ALEGI"
- **Heading:** "Avantajul AceAgency"

### Differentiators (list items, not cards)

| # | Title | Description |
|---|-------|-------------|
| 01 | Full-Service Digital | Web, Ads, AI, Media — totul sub un singur acoperis, o singura strategie coerenta |
| 02 | Design de Nivel Premium | Fiecare pixel conteaza. Design inspirat de cele mai bune agentii europene |
| 03 | Rezultate Masurabile | Nu promitem — livram. Fiecare campanie vine cu rapoarte clare si KPI-uri |
| 04 | Parteneriate, Nu Proiecte | Construim relatii pe termen lung bazate pe incredere si transparenta |
| 05 | Tehnologie de Varf | Adoptam cele mai noi tools si platforme pentru avantaj competitiv |

### Specifications

- Layout: Numbered list with large number (display-lg, muted), title (h4, dark text), description (body, muted)
- Each item separated by bottom border (light-warm border color)
- Padding: `space-6` vertical per item
- Number: Left-aligned, large and faded as decorative element
- Animation: Items stagger fade up from left, 100ms delay each
- Mobile: Same layout, slightly tighter spacing

---

## Section 8: Team

**Theme:** dark (NEW Phase 3)
**Layout:** 4-column grid of team member photo cards

### Content

- **Overline:** "ECHIPA NOASTRA"
- **Heading:** "Oameni Pasionati de Digital"

### Team Members

Team member data pulled from i18n (`team.members` array):
- Name (string)
- Role (string, e.g., "Co-Founder & Creative Director")
- Image (URL, 3:4 aspect ratio)

### Specifications

- Card layout: Rounded-2xl, 3:4 aspect ratio photo + name/role info below
- Grid: 4 columns desktop, 2 tablet, 1 mobile
- Photo: Responsive lazy loading, object-cover crop
- Hover: Image scale-105 + card lift (-translate-y-1) + shadow increase
- Info area: Name (font-bold, section-text) + role (muted text, smaller)
- Animation: GSAP stagger fade-up on scroll (0.1s delay per card)
- Reduced motion: No entrance animation, hover transforms disabled

### Data

Currently uses Unsplash placeholder images in i18n. Replace with:
- Real team member photos in `/public/images/team/`
- 3:4 aspect ratio (e.g., 300x400px per photo)
- Update i18n `team.members` array with real names/roles

---

## Section 9: CTA

**Theme:** violet
**Layout:** Same as homepage CTA section

### Content

```
Hai sa Construim Impreuna

Esti gata sa transformi prezenta digitala a brandului tau?
Echipa noastra te asteapta.

[Contacteaza-ne]  [Vezi Serviciile]
```

### Specifications

- Same CTA section pattern as homepage (reusable component)
- Primary CTA: accent variant → `/contact`
- Secondary CTA: ghost variant → `/servicii`
- Animation: Heading TextReveal, buttons fade up

---

## Animations Summary

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Hero headline | Word stagger | Load/scroll | 600ms |
| Hero subheading | Fade up | After headline | 500ms |
| Story paragraphs | Stagger fade up | Scroll (85%) | 500ms, 100ms stagger |
| Story visual | Fade in from right | Scroll (85%) | 600ms |
| Value cards | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| Division cards | Stagger fade up | Scroll (85%) | 500ms, 80ms stagger |
| Mission column | Fade up | Scroll (85%) | 500ms |
| Vision column | Fade up (delayed) | Scroll (85%) | 500ms, 200ms delay |
| Why-us items | Stagger slide left | Scroll (85%) | 500ms, 100ms stagger |
| CTA heading | TextReveal word | Scroll (85%) | 600ms |

---

## Content Keys (i18n)

All content stored under the `about` namespace:

```
about.hero.overline
about.hero.headline
about.hero.subheading
about.story.overline
about.story.heading
about.story.paragraphs[]
about.values.overline
about.values.heading
about.values.items[].icon
about.values.items[].title
about.values.items[].description
about.divisions.overline
about.divisions.heading
about.divisions.description
about.divisions.items[].name
about.divisions.items[].focus
about.divisions.items[].description
about.mission.overline
about.mission.heading
about.mission.description
about.vision.overline
about.vision.heading
about.vision.description
about.whyUs.overline
about.whyUs.heading
about.whyUs.items[].number
about.whyUs.items[].title
about.whyUs.items[].description
about.cta.heading
about.cta.description
about.cta.primary
about.cta.secondary
```
