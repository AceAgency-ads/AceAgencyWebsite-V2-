# Nu Reach Media — Design Analysis

**URL**: https://www.nureachmedia.com
**Analyzed**: 2026-03-06
**Purpose**: Extract photo-integration and section patterns for Laboratorul de Conversii

## Key Design Patterns to Adapt

### 1. Image Integration

- **Hero**: Full-bleed background imagery with text overlay. "We're your E-commerce Growth Partner" layered over visuals.
- **Logo Carousel**: Client logos in horizontal scrolling grid, repeated for seamless loop effect. WebP format.
- **Case Study Cards**: Product imagery paired with performance metrics ($70K monthly revenue, 2000% YTD growth). Visual proof + data together.
- **Testimonials**: Circular profile images with client quotes — personal connection through visual hierarchy.

### 2. Layout Patterns

- **4-column service grid**: Paid Traffic | Retention Marketing | CRO | UGC — icon + description structure
- **Bento-style stats**: Icon-text combos in horizontal flex ("Partners To 20+ Brands", "$2M+ Ad Spend Managed Monthly")
- **Full-bleed hero + service showcase** sections edge-to-edge with contained text overlays
- **Responsive breakpoints**: 991px (tablet), 767px (mobile landscape), 479px (mobile)

### 3. Stats/Results Display

- **Stat cards**: Icon + large number + description in horizontal row
- Examples: "$50M+ Total Revenue Generated", "3.51x Blended ROAS"
- **Case study metrics**: Largest value first, supporting stats descending in visual weight
- Haven Bag study: $70K monthly revenue, 2000% YTD growth — specific, credible numbers

### 4. Typography

- **Headlines**: Space Grotesk, Syne (weights 300-800)
- **Body**: Poppins (100-900)
- **Accent**: Montserrat, Varela
- Strong hierarchy between hero headline and body copy

### 5. Animations (GSAP-based — very relevant to our stack)

```javascript
// Character-level stagger animation
tl.from($(this).find(".char"), {
  yPercent: 100,
  duration: 0.2,
  stagger: { amount: 0.6 }
});
```

- **words-slide-up**: Text ascends with staggered timing
- **letters-slide-down**: Character-by-character descent
- **letters-fade-in-random**: Staggered opacity reveals
- **ScrollTrigger**: Animations tied to viewport position ("top 96%")
- **3D depth**: `transformPerspective: 1000` for parallax
- **Custom easing**: Bezier curves for organic motion
- **Page loader**: 4s initial, 1.5s subsequent visits

### 6. CTA Strategy

- **Primary**: "Schedule A Call" (Calendly link) in hero + repeated at section breaks
- **Secondary**: "Book Audit" links throughout service sections
- CTAs always paired with value propositions
- Multiple instances reduce friction

### 7. Unique Components

- **Modal/lightbox system** for image galleries ("See Examples" triggers)
- **Conditional rendering**: `.hide-tablet`, `.hide-mobile` classes
- **Touch detection**: JS adds `.w-mod-touch` for mobile-specific interactions
- **Utility class system**: Extensive spacing utilities (margin-0, padding-left, etc.)

---

## Patterns to Adopt for Laboratorul de Conversii

| Pattern | Adaptation |
|---------|-----------|
| Case study cards (image + metrics) | Create for testimonials page: client screenshot + revenue/ROAS numbers |
| GSAP character-level animations | We already use GSAP — add split-text animations to key headings |
| Full-bleed hero with photo overlay | Consider for service pages or about page hero |
| "Schedule A Call" CTA placement | Matches our Cal.com integration plan — add to multiple sections |
| Circular testimonial photos | Use on dedicated testimonials page |
| Logo carousel with seamless loop | Enhance existing ClientLogoBar with infinite scroll |
| Modal image galleries | Could use for portfolio/case study detail views |
| Stats as icon + number + description | Adapt StatsSection to include icons (currently just numbers) |
