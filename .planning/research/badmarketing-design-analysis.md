# BAD Marketing — Design Analysis

**URL**: https://www.badmarketing.com
**Analyzed**: 2026-03-06
**Purpose**: Extract photo-integration and section patterns for Laboratorul de Conversii

## Key Design Patterns to Adapt

### 1. Image Integration

- **Hero**: Logo-centric with bold statement text, dark background. No hero photo — purely typographic impact.
- **Product Gallery Carousel**: ~25+ client product images in a rotating horizontal carousel. Creates visual proof of portfolio without a dedicated portfolio page.
- **Service Graphics**: Custom illustrated WebP graphics per service (e.g., "Paid Ads v2 ECOM Graphic Transparent.webp"). Not stock photos — branded illustrations.
- **Full-bleed image sections** break up text-heavy content blocks.

### 2. Layout Patterns

- **3-column service grid**: Paid Ads | Amazon | Email & SMS — each with icon, title, description
- **Container system**: `.container-medium`, `.container-small`, `.container-large` with auto margins
- **Bento-style service cards**: Consistent grid with icons/images above text
- **Full-width sections** alternate with contained sections for rhythm

### 3. Stats/Results Display

- **Massive numbers**: $1,300,000,000 / $250,000,000 / 150+
- **CounterUp animation**: Numbers animate on scroll (2.3s duration)
- **Currency formatting** with symbols for visual weight
- Large typography + high contrast on dark background

### 4. Typography

- **Montserrat** (100-900) for headlines
- **Poppins** (300-700) for body
- **Droid Sans** for accents
- `.text-style-2lines` / `.text-style-3lines` — line-clamp truncation

### 5. Animations

- **Typed.js**: Cycling words in hero ("Higher ROI", etc.) — typeSpeed: 75ms, backSpeed: 50ms
- **CounterUp**: Scroll-triggered number animation
- **Custom blinking cursor** on typed text

### 6. CTA Strategy

- Primary CTA "Click Here To Go BAD" appears **4+ times** throughout page
- Links use `color: inherit` to blend with typography
- "Learn More" secondary CTAs per service section
- Aggressive repetition reduces friction

### 7. Conversion Infrastructure

- **UTM parameter persistence**: JS captures utm_source/medium/campaign → stored in cookies → auto-populates form fields
- Extensive tracking: GA, Facebook Pixel, Twitter, TikTok, Clarity

---

## Patterns to Adopt for Laboratorul de Conversii

| Pattern | Adaptation |
|---------|-----------|
| Product gallery carousel | Client results carousel (screenshots of dashboards, ads, websites we built) |
| Massive stat numbers with CounterUp | Already have StatsSection — enhance with CounterUp animation |
| Typed.js hero text | Consider for hero: "Conversii prin {Google Ads / SEO / Email / Facebook}" |
| 4x CTA repetition | Add more CTA touchpoints throughout homepage |
| UTM persistence | Add to contact/audit forms for lead source tracking |
| Custom service illustrations | Commission or create branded illustrations per service (not stock photos) |
