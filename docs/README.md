# Laboratorul de Conversii Documentation

**Last Updated:** March 18, 2026
**Status:** Phase 4 v2 Complete — Homepage with 13 sections + 1 overlay

---

## Quick Navigation

### For a Quick Overview (5 min read)
Start here: `/docs/PHASE-4-V2-DOCUMENTATION-SUMMARY.md`

### For Developers (10 min reference)
Jump to: `/docs/HOMEPAGE-QUICK-REFERENCE.md`
- API quick guide
- Common modifications
- Troubleshooting

### For Architects/Tech Leads (15 min)
Read: `/docs/CODEMAPS-INDEX.md`
- Homepage architecture diagram
- Component registry
- Data flow

### For Designers
Review: `/design-system/pages/home.md`
- Complete page specifications
- Section-by-section design
- Animation timeline
- Responsive layouts

### For Detailed API Reference
Check: `/docs/DOCUMENTATION-INDEX.md`
- Component APIs
- i18n structure
- File locations
- Quality checklist

### For Design Decisions & Context
See: `/docs/PHASE-4-V2-CHANGELOG.md`
- Why sections were added/removed
- Design rationale
- Analytics tracking plan
- Rollback procedure

---

## Documentation Files

| File | Audience | Purpose | Last Updated |
|------|----------|---------|--------------|
| `PHASE-4-V2-DOCUMENTATION-SUMMARY.md` | Everyone | Overview of all changes + next steps | Mar 18, 2026 |
| `HOMEPAGE-QUICK-REFERENCE.md` | Developers | Quick API reference + troubleshooting | Mar 18, 2026 |
| `CODEMAPS-INDEX.md` | Architects | Architecture diagrams + component registry | Mar 18, 2026 |
| `DOCUMENTATION-INDEX.md` | Developers | Comprehensive API reference | Mar 18, 2026 |
| `PHASE-4-V2-CHANGELOG.md` | Tech Leads | Detailed changelog + design decisions | Mar 18, 2026 |
| `PHASE-4-HOMEPAGE-REDESIGN.md` | Reference | Original Phase 4 v1 documentation | Mar 16, 2026 |
| `design-system/pages/home.md` | Designers | Complete page specification | Mar 18, 2026 |
| `design-system/MASTER.md` | Everyone | Design tokens + visual language | Reference |
| `design-system/components.md` | Designers | Component patterns + API | Reference |
| `GEO-INDEX.md` | Content | AI crawler optimization strategy | Reference |
| `GEO-IMPLEMENTATION.md` | Content | GEO rules + citability guidelines | Reference |
| `GEO-CHANGELOG.md` | Content | GEO implementation history | Reference |

---

## Homepage Architecture (Phase 4 v2)

```
┌─────────────────────────────────────────────────────────┐
│ HERO SECTION (Trust Anchor)                             │
├─────────────────────────────────────────────────────────┤
│ 1. Hero                                     [dark]       │
│ 2. HeroTransition                           [dark]       │
├─────────────────────────────────────────────────────────┤
│ SOCIAL PROOF FOUNDATION                                 │
├─────────────────────────────────────────────────────────┤
│ 3. ClientLogoBar (customer logos)           [dark]       │
│ 4. CertificationBadges (partner certs)      [dark]       │
├─────────────────────────────────────────────────────────┤
│ METHODOLOGY & OFFERING                                  │
├─────────────────────────────────────────────────────────┤
│ 5. ConversionProcess (how we work)          [dark]       │
│ 6. ServicesPreview (what we offer)       [light-warm]    │
├─────────────────────────────────────────────────────────┤
│ RESULTS PROOF                                           │
├─────────────────────────────────────────────────────────┤
│ 7. BeforeAfterPreview (concrete metrics)    [light]      │
│ 8. StatsSection (aggregate numbers)         [dark]       │
├─────────────────────────────────────────────────────────┤
│ BRAND & ENGAGEMENT                                      │
├─────────────────────────────────────────────────────────┤
│ 9. AboutPreview (who we are)                [dark]       │
│ 10. Testimonials (customer voices)       [light-warm]    │
│ 11. HomeFAQ (questions answered)            [light]      │
├─────────────────────────────────────────────────────────┤
│ FINAL CONVERSION                                        │
├─────────────────────────────────────────────────────────┤
│ 12. CTASection                              [violet]     │
└─────────────────────────────────────────────────────────┘
    + ExitIntentPopup (desktop overlay)
```

**Total:** 12 sections + 1 overlay = 13 interactive elements

---

## Phase 4 v2 Changes Summary

### Added (4 new sections)
1. **CertificationBadges** — Partner certifications with hover effect
2. **BeforeAfterPreview** — Concrete client results with metrics
3. **HomeFAQ** — FAQ accordion for engagement
4. **ExitIntentPopup** — Desktop exit-intent recovery modal

### Removed (2 sections)
1. **VideoTestimonials** — Replaced by BeforeAfterPreview (more concrete)
2. **LeadMagnet** — Replaced by HomeFAQ + dedicated FAQ page

### New Hook
1. **useExitIntent** — Desktop exit detection with session/storage caching

### Result
- **Homepage sections:** 10 → 12 (+ 1 overlay)
- **Components added:** 4 new components
- **i18n keys:** 60+ new keys
- **New hook:** 1 custom React hook

---

## Getting Started

### 1. Understand the Architecture
```
docs/CODEMAPS-INDEX.md
└─ ASCII diagram of 13-section flow
└─ Component registry with file paths
```

### 2. Review Design Details
```
design-system/pages/home.md
└─ Section-by-section specifications
└─ Animation timeline
└─ Responsive layout details
```

### 3. Check Component APIs
```
docs/DOCUMENTATION-INDEX.md
└─ Component prop specs (though most props come from i18n)
└─ i18n key structure
└─ File paths (absolute)
```

### 4. Quick Reference for Daily Work
```
docs/HOMEPAGE-QUICK-REFERENCE.md
└─ Component API cheat sheet
└─ i18n key examples
└─ Common modifications
└─ Troubleshooting guide
```

### 5. Understand Design Decisions
```
docs/PHASE-4-V2-CHANGELOG.md
└─ Why each section was added/removed
└─ Analytics tracking opportunities
└─ Rollback procedure
```

---

## Key Files at a Glance

### Components
- `src/components/sections/home/CertificationBadges.tsx` — 5 partner badges
- `src/components/sections/home/BeforeAfterPreview.tsx` — Before/after metrics
- `src/components/sections/home/HomeFAQ.tsx` — FAQ accordion
- `src/components/sections/home/ExitIntentPopup.tsx` — Exit modal

### Hook
- `src/lib/hooks/useExitIntent.ts` — Exit intent detection

### Page
- `src/app/[locale]/page.tsx` — 12-section homepage + overlay

### Translations
- `src/messages/ro.json` — 60+ new i18n keys
- `src/messages/en.json` — 60+ new i18n keys

### Design System
- `design-system/pages/home.md` — Complete page spec

### Assets
- `public/images/certifications/` — 5 badge placeholder images

---

## Documentation Quality Checklist

- ✅ All file paths verified (absolute paths)
- ✅ All i18n keys documented
- ✅ All component APIs documented
- ✅ Architecture diagram created
- ✅ Animation timeline updated
- ✅ Design decisions documented
- ✅ Troubleshooting guide included
- ✅ Quick reference created
- ✅ Responsive layouts defined
- ✅ Theme specifications complete

---

## Contributing to Documentation

When you update the homepage:

1. **Update code** → Test locally
2. **Update component specs** → `design-system/pages/home.md`
3. **Update codemaps** → `docs/CODEMAPS-INDEX.md`
4. **Update APIs** → `docs/DOCUMENTATION-INDEX.md`
5. **Document decisions** → `docs/PHASE-4-V2-CHANGELOG.md` (if major change)
6. **Test docs** → Verify file paths, links, i18n keys

---

## FAQ

**Q: Where do I find component API specs?**
A: `docs/HOMEPAGE-QUICK-REFERENCE.md` (quick) or `docs/DOCUMENTATION-INDEX.md` (detailed)

**Q: How do I add a new FAQ item?**
A: Edit `src/messages/ro.json` + `src/messages/en.json` under `home.faq.items[]`

**Q: How do I update certification badges?**
A: 1) Add image to `/public/images/certifications/`, 2) Update i18n keys, 3) Restart dev server

**Q: How do I test the exit intent popup?**
A: Desktop Chrome/Safari/Firefox → wait 30s → move mouse to top of window

**Q: Where are all the files?**
A: All paths are absolute. See `docs/HOMEPAGE-QUICK-REFERENCE.md` "File Locations" section

**Q: What changed from Phase 4 v1?**
A: See `docs/PHASE-4-V2-CHANGELOG.md` — 4 sections added, 2 removed

**Q: How do I troubleshoot?**
A: See `docs/HOMEPAGE-QUICK-REFERENCE.md` "Troubleshooting" section

---

## Related Documentation

- **Brand & Design:** `/design-system/MASTER.md`
- **Component Library:** `/design-system/components.md`
- **GEO Strategy:** `/docs/GEO-INDEX.md`
- **SEO Specs:** `/docs/Specificatii-Tehnice-SEO.md`
- **About Page:** `/design-system/pages/despre-noi.md`
- **Services Page:** `/design-system/pages/servicii.md`

---

## Key Dates

| Date | Event |
|------|-------|
| March 16, 2026 | Phase 4 v1: Homepage redesign + AdPilot legal pages |
| March 18, 2026 | Phase 4 v2: CertificationBadges, BeforeAfter, FAQ, ExitIntent |
| Today | Documentation complete + verified |

---

## Next Steps

### Immediate (Post-Deploy)
- Run test suite: `npm run build && npm run lint && npm run type-check`
- Test responsive layouts
- Verify all i18n keys resolve

### Short-term (2 weeks)
- Replace placeholder certification badges with real images
- Add real before/after metrics
- Populate FAQ with actual questions/answers

### Medium-term (1 month)
- Monitor exit intent popup performance
- A/B test section positioning
- Track email capture rate impact

### Long-term (Ongoing)
- Monitor analytics for engagement changes
- Adjust timing/copy based on performance
- Maintain documentation as content changes

---

**Created:** March 18, 2026
**Status:** Complete and Ready
**Questions?** Start with `HOMEPAGE-QUICK-REFERENCE.md`
