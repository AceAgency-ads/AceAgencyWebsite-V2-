# Growth Funnel Quick Reference (Updated Mar 26)

**Last Updated:** March 26, 2026
**For:** Developers working on growth funnel
**Status:** 10 sections, visual redesign complete

---

## Section Order (10 total)

```
1. GrowthHero          — Full viewport hero + VSL video thumbnail
2. GrowthClientLogos   — Client marquee
3. GrowthServices      — 8-card grid (shine effects on CTAs)
4. GrowthCaseStudies   — 3-card grid + CTA
5. GrowthProcess       — 3-step flow (gradient numbers)
6. GrowthGuarantee     — Money-back guarantee card (NEW)
7. GrowthFAQ           — 7-item accordion + CTA
8. GrowthAuditForm     — Main form (6 fields, shine effect submit)
9. GrowthLeadMagnetCTA — Two-column: ebook cover + form
10. GrowthFooter       — Dark footer
```

---

## Key Component Changes (Mar 26)

### GrowthHero (MERGED)
**File:** `src/components/sections/growth/GrowthHero.tsx`

**What Changed:**
- Now includes VSL video thumbnail (16:9 aspect)
- Full viewport hero section
- Grid pattern overlay for depth
- Radial violet glow background

**Key Elements:**
```tsx
<section className="relative flex min-h-screen flex-col items-center justify-center">
  {/* Grid pattern overlay */}
  <div className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px), ...'
    }}
  />

  {/* Video thumbnail */}
  <Image src="/images/growth/vsl-thumb.webp" alt="..." fill priority />

  {/* Shine effect CTA */}
  <a href="#audit-form" className="...">
    <span style={{ animation: 'shine 3s ease-in-out infinite' }} />
  </a>
</section>
```

### GrowthGuarantee (NEW)
**File:** `src/components/sections/growth/GrowthGuarantee.tsx`

**What It Does:**
- Money-back guarantee risk reversal
- Centered card with shield icon
- Violet gradient border glow
- CTA scrolls to audit form

**Key Elements:**
```tsx
<div className="rounded-2xl border border-[#650CBE]/40 bg-[#1a1917] p-8"
  style={{ boxShadow: '0 0 40px rgba(101, 12, 190, 0.2)' }}>
  <ShieldCheck className="text-[#66F3A6]" />
  <h2>{t('guarantee.heading')}</h2>
  <p>{t('guarantee.description')}</p>
</div>
```

### GrowthLeadMagnetCTA (TWO-COLUMN)
**File:** `src/components/sections/growth/GrowthLeadMagnetCTA.tsx`

**What Changed:**
- Two-column layout: ebook cover (left) + form (right)
- Ebook cover: `/public/images/growth/ebook-cover.webp`
- Responsive: stacks on mobile

**Key Elements:**
```tsx
<div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
  <Image src="/images/growth/ebook-cover.webp" alt="..." width={400} height={500} />
  {/* Form on right */}
  <form>...</form>
</div>
```

---

## Visual Effects Used

### Shine Effect (on all CTAs)
```css
@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Applied to button overlay */
<span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
  <span className="absolute inset-0 -translate-x-full"
    style={{
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
      animation: 'shine 3s ease-in-out infinite'
    }} />
</span>
```

### Radial Violet Glow
```css
radial-gradient(ellipse 60% 50% at 50% 50%, rgba(101, 12, 190, 0.12) 0%, transparent 70%)
```

### Grid Pattern (Hero only)
```css
repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px),
repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px)
```

### Pulsing Glow (video, buttons)
```css
animate-pulse on bg-[#650CBE]/20
```

---

## i18n Keys (New Mar 26)

### Process Overline + Description
```json
{
  "growth": {
    "process": {
      "overline": "TRANSFORMARE",
      "description": "3 etape clare pentru a creste vanzarile..."
    }
  }
}
```

### Guarantee Section
```json
{
  "growth": {
    "guarantee": {
      "overline": "GARANTIE",
      "heading": "Garantie 30 de zile, bani inapoi",
      "description": "Risk-reversal copy here...",
      "reinforcement": "Trust line here...",
      "cta": "Cere Audit Gratuit"
    }
  }
}
```

### FAQ + AuditForm Overlines
```json
{
  "growth": {
    "faq": {
      "overline": "INTREBARI FRECVENTE"
    },
    "auditForm": {
      "overline": "APLICATIE",
      "description": "Form intro copy..."
    }
  }
}
```

---

## Common Tasks

### Add a New CTA with Shine Effect
```tsx
<a href="#target" className="inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#650CBE] px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#7A1FD8] hover:shadow-[0_0_40px_rgba(101,12,190,0.4)]">
  {t('key.cta')}
  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
    <span
      className="absolute inset-0 -translate-x-full"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
        animation: 'shine 3s ease-in-out infinite',
      }}
    />
  </span>
</a>
```

### Update i18n Keys
Edit `src/messages/ro.json` and `src/messages/en.json`:
```json
{
  "growth": {
    "yourSection": {
      "overline": "OVERLINE TEXT",
      "heading": "Main heading",
      "description": "Optional description",
      "cta": "Button text"
    }
  }
}
```

### Change Component Order
Edit `src/app/[locale]/growth/page.tsx`:
```tsx
export default async function GrowthPage({...}) {
  return (
    <>
      <GrowthHero />
      <GrowthClientLogos />
      {/* Add/remove/reorder here */}
      <GrowthGuarantee /> {/* NEW - order 6 */}
      <GrowthFAQ />
      {/* etc */}
    </>
  );
}
```

### Customize Section Colors/Spacing
Use `SectionWrapper` props:
```tsx
<SectionWrapper theme="dark" id="section-id" compact rounded={false}>
  {/* Content */}
</SectionWrapper>
```

Props:
- `theme`: 'dark' | 'light' | 'light-warm' | 'violet'
- `compact`: boolean (tighter padding for funnels)
- `rounded`: boolean (rounded corners)
- `id`: string (for scroll targets)

---

## Testing Quick Checks

### Dev Server
```bash
npm run dev
# Open http://localhost:3000/growth
```

### Build Check
```bash
npm run build
npm run lint
```

### i18n Keys Check
Look for console warnings about missing translations:
```bash
grep -r "growth\." src/messages/ro.json | wc -l
grep -r "growth\." src/messages/en.json | wc -l
```

### Image Check
Verify assets exist:
```bash
ls -la public/images/growth/
# Should see: vsl-thumb.webp, ebook-cover.webp, og-image.webp, checklist-poster.webp
```

---

## Removed Components (Still Exist, Not Used)

**GrowthProofBar**
- Location: `src/components/sections/growth/GrowthProofBar.tsx`
- Status: Exists but not imported in /growth page
- Reason: Replaced by visual design flourishes + guarantee section
- Can be restored if needed for other pages

**GrowthVSL** (as separate section)
- Location: Still exists as GrowthVSL.tsx
- Status: Merged into GrowthHero
- Reason: Streamlined hero section for faster engagement
- Keep component for reference

---

## Troubleshooting

### "GrowthGuarantee is not defined"
→ Check `/src/app/[locale]/growth/page.tsx` has import:
```tsx
import { GrowthGuarantee } from '@/components/sections/growth/GrowthGuarantee';
```

### Missing i18n key warning
→ Add to `src/messages/ro.json` and `src/messages/en.json`:
```json
{
  "growth": {
    "yourKey": "Your value"
  }
}
```

### Video thumbnail not showing in Hero
→ Check path: `public/images/growth/vsl-thumb.webp` exists
→ Restart dev server if just added

### LeadMagnetCTA ebook cover not responsive
→ Ensure `<Image>` has `width` and `height` props
→ Check tailwind responsive classes: `grid grid-cols-1 md:grid-cols-2`

### Shine animation not visible on button
→ Ensure button has `overflow-hidden` wrapper
→ Check animation CSS applied correctly:
```tsx
style={{
  animation: 'shine 3s ease-in-out infinite'
}}
```

---

## Performance Notes

- VSL thumbnail is 16:9 WebP (optimized)
- Ebook cover is WebP (optimized)
- Grid pattern uses CSS (no JS overhead)
- Shine animation uses transform (GPU accelerated)
- Images use Next.js Image component (automatic optimization)

---

**Quick Links:**
- Full Details: `docs/GROWTH-VISUAL-REDESIGN-MARCH26.md`
- Architecture: `docs/GROWTH-FUNNEL-CODEMAP.md`
- Design System: `design-system/MASTER.md`
