# Phase 3: Warm Light Visual Refresh

**Date:** March 2024
**Status:** Complete and documented

---

## Overview

Phase 3 implements a "Warm Light" visual refresh across the Laboratorul de Conversii website. The new `light-warm` theme (#FAF9F7 background with warm greige text #71706E) creates a premium, inviting aesthetic for customer-facing sections while maintaining the dark-dominant design philosophy.

### Key Additions

1. **New Design Theme:** `light-warm` token with warm off-white background
2. **3 New Components:** VideoTestimonialCard, ClientLogoBar, TeamSection
3. **Section Theme Updates:** 8 sections reassigned to new `light-warm` theme
4. **CSS Enhancements:** Header glass morphism, marquee animation, reduced motion support

---

## Design Tokens Changes

### New `light-warm` Theme

Added to `design-system/tokens.css`:

```css
[data-theme="light-warm"] {
  --section-bg: #FAF9F7;              /* Warm off-white */
  --section-text: #262523;             /* Dark text */
  --section-text-muted: #71706E;       /* Warm greige for secondary text */
  --section-accent: #56151A;           /* Burgundy accent */
  --section-border: #E8E6E3;           /* Warm grey border */
  --section-card-bg: #FFFFFF;          /* White cards */
}
```

**Usage:** Customer-facing sections (Services, Testimonials, Story, Values, Why Choose Us)

**Rationale:** Lighter than pure white, warmer than standard light grey. Creates premium, welcoming feel while maintaining dark section contrast.

---

## Section Theme Flips

### Homepage

| Section | Before | After | Notes |
|---------|--------|-------|-------|
| ServicesPreview | dark | **light-warm** | Showcase services with premium feel |
| Testimonials | dark | **light-warm** | Mixed text + video cards |
| ClientLogoBar | — | **dark** | NEW: Marquee of client logos |

### About Page

| Section | Before | After | Notes |
|---------|--------|-------|-------|
| StorySection | light | **light-warm** | Company narrative |
| ValuesSection | dark | **light-warm** | Core values + icons |
| MissionVision | light | **dark** | Strategic focus |
| WhyChooseUs | dark | **light-warm** | Differentiators list |
| TeamSection | — | **dark** | NEW: Team member photos |

### Service Pages

| Section | Before | After | Notes |
|---------|--------|-------|-------|
| ServiceFeatures | light | **light-warm** | Feature grid |
| ServiceStats | dark | **light-warm** | Key metrics |
| ServiceFAQ | — | **dark** | Accordion |

### Contact Page

| Section | Before | After | Notes |
|---------|--------|-------|-------|
| ContactForm | dark | **light-warm** | Form section |
| ContactFAQ | dark | **light-warm** | FAQ items |

---

## New Components

### 1. VideoTestimonialCard (`src/components/sections/home/VideoTestimonialCard.tsx`)

**Purpose:** Click-to-play video testimonial with thumbnail.

**Layout:**
- Top 60%: 16:9 video area with thumbnail + play button overlay
- Bottom 40%: Star rating + quote + author info

**Props:**
```ts
interface VideoTestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  rating: number;
  thumbnailSrc: string;
  videoSrc: string;
}
```

**Features:**
- Click play button → replaces thumbnail with `<video autoplay controls>`
- Responsive sizing: 85vw (mobile), 400px (tablet), 468px (desktop)
- Uses CSS variables for theme colors (border, text, accent)
- Hover effect: Play button scales, overlay opacity increases
- Accessibility: ARIA labels, star rating as image role

**Current Status:** UI-only. `videoSrc` is empty placeholder string; wire real URLs in future.

---

### 2. ClientLogoBar (`src/components/sections/home/ClientLogoBar.tsx`)

**Purpose:** Infinite CSS marquee of client company logos.

**Layout:**
- Dark section with uppercase heading
- Marquee track with duplicated logo array for seamless loop
- Static grid fallback for `prefers-reduced-motion: reduce`

**Features:**
- **Desktop:** 20-second linear infinite marquee
- **Mobile:** Gap 12px, responsive logo sizing
- **Hover:** Grayscale → color + opacity increase
- **Reduced motion:** Shows static 2-col (mobile) / 4-col (desktop) grid
- **Duplicated logos:** Array repeated for seamless loop

**Animation:**
Uses `@keyframes marquee` defined in `globals.css`:
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-1 * var(--marquee-width))); }
}
```

**Current Status:** Placeholder SVG logos in `/public/images/clients/`. Replace with real logos.

**Data Structure:**
```ts
const CLIENT_LOGOS = [
  { name: 'TechStart', src: '/images/clients/techstart.svg' },
  // ... 8 total
];
```

---

### 3. TeamSection (`src/components/sections/about/TeamSection.tsx`)

**Purpose:** Team member photo grid with GSAP entrance animation.

**Layout:**
- 4-column grid (desktop), 2 (tablet), 1 (mobile)
- Each card: 3:4 aspect ratio photo + name/role text

**Props:**
Reads from i18n (`useTranslations('about')`):
```ts
interface TeamMember {
  name: string;
  role: string;
  image: string;
}
```

**Features:**
- **Photo:** Next.js Image with lazy loading, object-cover crop
- **Hover:** Image scale-105 + card lift (-translate-y-1) + shadow
- **Animation:** GSAP from y:40 opacity:0 with 0.1s stagger
- **Reduced motion:** Instant entrance, no hover transforms

**Current Status:** Placeholder Unsplash URLs in i18n. Replace with real photos.

**Data Structure:**
```json
"team": {
  "overline": "ECHIPA NOASTRA",
  "heading": "Oameni Pasionati de Digital",
  "members": [
    {
      "name": "John Doe",
      "role": "Co-Founder & Creative Director",
      "image": "/images/team/john.jpg"
    }
  ]
}
```

---

## CSS Enhancements

### Header Glass Morphism

Added to `globals.css`:

```css
.header-scrolled {
  background: rgba(38, 37, 35, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-over-light.header-scrolled {
  background: rgba(255, 255, 255, 0.8);
  border-bottom-color: rgba(38, 37, 35, 0.1);
}

.header-over-light-warm.header-scrolled {
  background: rgba(250, 249, 247, 0.8);
  border-bottom-color: rgba(232, 230, 227, 0.5);
}
```

**Purpose:** Smooth header appearance over different section backgrounds.

---

### Marquee Animation

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-1 * var(--marquee-width))); }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

**Purpose:** Infinite logo scroll with reduced motion support.

---

## SectionWrapper Type Update

Updated `src/components/sections/SectionWrapper.tsx`:

```ts
type SectionTheme = 'dark' | 'light' | 'light-warm' | 'light-muted' | 'accent' | 'burgundy';
```

**Before:** 3 themes (dark, light, burgundy)
**After:** 6 themes (added light-warm, light-muted, accent)

---

## i18n Updates

Added translation keys for new components and sections:

### ClientLogoBar
```json
"clientLogos": {
  "heading": "PARTENERI DIN INDUSTRIA ROMANEASCA"
}
```

### TeamSection
```json
"team": {
  "overline": "ECHIPA NOASTRA",
  "heading": "Oameni Pasionati de Digital",
  "members": [...]
}
```

### Testimonials (mixed text + video)
```json
"testimonials": {
  "items": {
    "0": { "quote": "...", "author": "...", ... },
    "2": { "type": "video", "videoSrc": "", ... }
  }
}
```

Added translations in both `src/messages/ro.json` and `src/messages/en.json`.

---

## Documentation Updates

### Updated Files

1. **`design-system/MASTER.md`**
   - Added `light-warm` theme to color palette section
   - Updated Section Color Schemes table with 5 themes
   - Added theme guide in Section Theming System
   - Updated Homepage Sections with new theme assignments
   - Updated About Page Sections with new theme assignments

2. **`design-system/components.md`**
   - Updated SectionWrapper props to include `'light-warm'` + other themes
   - Added CSS variables reference (`--section-card-bg`, `--section-accent`)
   - Added 3 new component specs (VideoTestimonialCard, ClientLogoBar, TeamSection)

3. **`design-system/pages/home.md`**
   - Updated page structure diagram with 9 sections (was 7)
   - Added HeroTransition section (new)
   - Updated Services Preview to `light-warm` with detailed carousel spec
   - Added Client Logo Bar section (new)
   - Updated Testimonials to `light-warm` with mixed text + video card details
   - Renumbered CTA + Newsletter sections

4. **`design-system/pages/despre-noi.md`**
   - Updated page structure diagram with 9 sections (was 7)
   - Added HeroTransition section (new)
   - Updated Story, Values, WhyChooseUs to `light-warm`
   - Changed MissionVision to `dark`
   - Added Team Section (new) with photo grid spec
   - Renumbered CTA section

5. **`design-system/tokens.css`**
   - Added update comment referencing Phase 3

---

## File Paths (Absolute)

### Component Files
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/VideoTestimonialCard.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/home/ClientLogoBar.tsx`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/about/TeamSection.tsx`

### Design System Docs
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/MASTER.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/components.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/tokens.css`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/home.md`
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/design-system/pages/despre-noi.md`

### CSS Assets
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/styles/globals.css` (header glass morphism, marquee animation)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/components/sections/SectionWrapper.tsx` (type definition)

### Assets (Placeholders)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/public/images/clients/` (SVG logos)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/public/images/team/` (3:4 team photos)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/public/images/testimonials/` (video thumbnails)

### i18n
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/ro.json` (Romanian translations)
- `/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/src/messages/en.json` (English translations)

---

## Not Yet Implemented

1. **Real video URLs** — `videoSrc` is empty placeholder; wire Resend video storage or CDN URLs
2. **Real client logos** — Replace placeholder SVGs in `/public/images/clients/`
3. **Real team photos** — Replace placeholder Unsplash URLs in i18n with actual team member photos
4. **Real testimonial thumbnails** — Add video thumbnail images to `/public/images/testimonials/`
5. **ServicePhotoBlock component** — Planned but not built

---

## Testing Checklist

- [ ] `light-warm` theme renders correctly across all assigned sections
- [ ] VideoTestimonialCard click-to-play interaction works (UI verified, no real videos yet)
- [ ] ClientLogoBar marquee animates smoothly (prefers-reduced-motion fallback tested)
- [ ] TeamSection photos display at correct 3:4 aspect ratio (placeholder images)
- [ ] Header glass morphism appears over light-warm sections
- [ ] All section themes apply correct CSS variables (colors, text, borders)
- [ ] Mobile responsive: all grids collapse to appropriate column counts
- [ ] GSAP animations fire on scroll (stagger, fade, scale)
- [ ] Hover effects work (play button scale, team card lift, logo grayscale)
- [ ] Accessibility: ARIA labels, reduced motion, keyboard nav

---

## Next Steps (Phase 4+)

1. Replace placeholder assets (logos, photos, video URLs)
2. Wire Testimonials section with real client testimonial videos
3. Build ServicePhotoBlock component (planned)
4. Implement video hosting solution for testimonials
5. Add real team member photos and bios
6. Integrate client company logos from portfolio
