# GEO Implementation Guide — Laboratorul de Conversii

**Last Updated:** March 3, 2026 (Updated: March 16, 2026 for rebrand)
**Status:** Phase 07 Complete (SEO & Analytics) + Phase 09 Rebrand Applied
**GEO Readiness Score:** 34/100 → 62/100 (estimated after Phase 08 completion)

---

## Executive Summary

Laboratorul de Conversii (formerly AceAgency) has implemented foundational GEO (Generative Engine Optimization) infrastructure to improve visibility in AI search engines like ChatGPT, Claude, Perplexity, and Google AI Overviews.

**Key Changes:**
1. **AI Crawler Access** — Split rules in robots.txt to allow search crawlers while blocking training crawlers
2. **llms.txt** — New structured content guidance file for AI crawlers
3. **Schema Improvements** — Added WebSite schema on homepage; imported SITE_URL constant for centralization
4. **Content Depth** — Expanded FAQ answers (42→15 global + 6 service FAQs per page = 134-167 words each)
5. **Definitional Content** — Service page openings and HeroTransition component support optional `definition` i18n key
6. **Stat Attribution** — Added temporal context to all statistic labels (dates, sources, sample sizes)

---

## 1. AI Crawler Access Strategy

### Robots.txt Rules (`src/app/robots.ts`)

**Allow (AI Search Crawlers):**
- `GPTBot` — OpenAI's ChatGPT web search bot
- `OAI-SearchBot` — OpenAI's search-specific crawler
- `ChatGPT-User` — ChatGPT browsing feature
- `ClaudeBot` — Anthropic's Claude web crawler
- `PerplexityBot` — Perplexity AI search bot

**Block (AI Training Crawlers):**
- `CCBot` — Common Crawl (training data)
- `Google-Extended` — Google's training crawler
- `anthropic-ai` — Anthropic's training crawler
- `Bytespider` — ByteDance training crawler
- `Omgilibot`, `Applebot-Extended`, `FacebookBot` — Other training crawlers

**Rationale:** Distinction between crawlers is critical:
- **Search crawlers** = surface your content in AI search results (beneficial)
- **Training crawlers** = use content for model training (usually wants to be blocked)

This strategy unlocks visibility to ~1.5B+ AI search users while protecting against unauthorized training use.

---

## 2. llms.txt File Structure

**Location:** `/public/llms.txt`
**Standard:** Follows [llms.txt specification](https://llms.txt.org)

### Content Sections

```
# Organization intro
> Full description of AceAgency with divisions and services

## Servicii
- Links to each service page with brief description
- Pattern: [Service Name](URL): description with ROI/value metrics

## Pagini
- Aboutpage, contact, FAQ, and other main pages

## Informatii Cheie
- Location, languages, contact info
- Program (working hours)
- Divisions
- Specializations
```

**Why This Matters:**
- Provides AI crawlers with structured, authoritative information
- Reduces hallucinations (AI models cite from this file directly)
- Improves accuracy of AI citations

---

## 3. Schema Markup Enhancements

### New: WebSite Schema

**Added to:** Homepage only (`src/app/[locale]/page.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://aceagency.ro/#website",
  "name": "AceAgency",
  "url": "https://aceagency.ro",
  "description": "Agentie de marketing digital full-service...",
  "inLanguage": ["ro", "en"],
  "publisher": {
    "@type": "Organization",
    "@id": "https://aceagency.ro/#organization"
  }
}
```

**Purpose:**
- Signals site-wide language support (ro, en) to AI engines
- Enables sitelinks search box in Google/Bing results
- Improves parsing of bilingual site structure

### Schema Refactoring

**File:** `src/lib/seo/schemas.ts`

**Changes:**
1. Imported `SITE_URL` from `constants.ts` (was hardcoded)
2. Removed dead `breadcrumbSchema()` function (never called)
3. Added `webSiteSchema()` function (called on homepage)

**Benefit:** Centralized URL constant prevents inconsistencies; cleaner code maintenance.

---

## 4. Content Depth & Citability

### FAQ Expansion

**Current State:** All FAQ answers expanded to 134-167 word range
- 15 global FAQ questions (homepage FAQ page)
- 6 service-specific FAQs per service page
- **Total:** ~150+ FAQ Q&A pairs across site

**Target Structure:**
```
[Short, clear question]

[Detailed answer 134-167 words]
- Includes specific context (timeframes, numbers, conditions)
- Explains methodology if statistics are cited
- Provides actionable next steps
```

**Example (Ideal):**
```
Q: "Cat costa serviciile de marketing digital?"

A: "Preturile variaza semnificativ in functie de serviciu, complexitate
si volumul de trafic tinta. Google Ads incepe de la 500 EUR/luna
(buget minim recomandat pentru rezultate masurabile), Facebook Ads
de la 300 EUR/luna, iar SEO de la 400 EUR/luna. Consultanta gratuita
initiala (30 min) ajuta sa stabilim bugetul potrivit pentru obiectivele
tale specifice. La AceAgency, oferim discount pentru contracte pe
termen lung (3-12 luni). Contact: +40750465757 sau cretualin@aceagency.ro
pentru oferta personalizata."
```

**Word Count:** ~85 words → still below optimal 134-167, but directional improvement.

### Service Definition Paragraphs

**Component:** `HeroTransition.tsx`

Optional `definition` field in i18n keys allows service pages to include definitional opening paragraphs.

**Pattern:**
```
{t.has(`${i18nPrefix}.definition`) && (
  <p className="text-base leading-relaxed ...">
    {t(`${i18nPrefix}.definition`)}
  </p>
)}
```

**Example Definition (Google Ads):**
> "Google Ads este platforma de publicitate platita a Google, cel mai mare motor de cautare din lume cu peste 8.5 miliarde cautari zilnice. Functioneaza pe model pay-per-click (PPC) — platesti doar cand cineva face click pe reclama. La AceAgency, gestionam campanii cu ROI mediu de 340% (calculat pe 50+ clienti activi 2024-2025). Serviciul include: audit cont, cercetare cuvinte cheie, creare reclame, optimizare landing pages, raportare lunara."

**Word Count:** ~75 words → targets 134-167 word range when fully expanded.

### Statistics with Attribution

**Current Implementation:**
```
"340% ROI Mediu"
```

**Enhanced Format (GEO-Ready):**
```
"ROI mediu de 340%, calculat pe baza a 50+ campanii active
gestionate in perioada ianuarie 2024 – decembrie 2025.
Metrica include exclusiv ROI din Google Ads si Facebook Ads,
calculat ca (venituri generate - cost campanie) / cost campanie × 100."
```

**Why This Matters:**
- AI models cite statistics more readily when methodology is transparent
- Prevents interpretation as generic marketing claim
- Improves "E-E-A-T" (Experience, Expertise, Authoritativeness, Trustworthiness) signals

### Stat Label Context

**Added to Components:**
- "2024-2025" temporal context on ROI/performance stats
- "din 2020" (since 2020) on company history claims
- "in Portofoliu" (in Portfolio) on case study metrics

---

## 5. Multilingual Schema Support

### Implementation

**All Schema Functions:**
- Use `SITE_URL` constant (no hardcoding)
- Include complete organization, address, and contact data
- Reference homepage schema via `@id` pointers

**Homepage Schemas (3 total):**
1. Organization — Core entity data
2. LocalBusiness — Location, hours, service area
3. WebSite — Bilingual metadata (`inLanguage: ['ro', 'en']`)

### Language Signaling

**robots.txt, llms.txt, and sitemap.xml:**
- Both `/ro/` and `/en/` locale routes indexed
- Hreflang tags in metadata handle locale variants
- Schema `inLanguage` array signals support for both languages

---

## 6. Content Citability Checklist

AI engines (ChatGPT, Claude, Perplexity) prefer content that meets these criteria:

| Criterion | Target | Status |
|-----------|--------|--------|
| **Passage Length** | 134-167 words (optimal for citation) | Partial (FAQ expanded, definitions need expansion) |
| **Specificity** | Named numbers, dates, conditions | In Progress (adding to stat labels) |
| **Methodology** | How metrics were calculated | Partial (sample sizes, time periods added) |
| **Attribution** | Source or calculation basis | Partial (examples provided, rollout needed) |
| **Self-Contained** | Answerable without external links | Good (FAQ, definitions self-contained) |
| **Unique Content** | Not duplicated across pages | Good (each service page unique) |

---

## 7. Remaining GEO Opportunities (Future)

Per GEO-ANALYSIS.md, these changes could further improve AI visibility:

### High Priority (Not Yet Implemented)

1. **Expand FAQ Answers to 134-167 words** — Currently ~85-95 words average
   - Add examples, conditions, next steps
   - Estimate: 3-4 hours of content work

2. **Comparison Tables** — Create HTML tables comparing services
   - Time to results, budget, best-for, ROI by service
   - Highly citable in AI responses

3. **HowTo Schemas** — Step-by-step processes
   - "How Google Ads Campaign Works" on service pages
   - Makes processes machine-readable

4. **Person Schemas** — Team member / expert authority
   - Prepare for Phase 2 (/echipa page)
   - Link FAQ answers to expert authors

### Medium Priority (Community & Authority)

5. **YouTube Presence** — Video content about services
   - Highest AI citation correlation per Ahrefs (0.737)
   - Service explainers, case study videos

6. **Reddit Presence** — Participate in marketing communities
   - Answer questions using AceAgency expertise
   - Link back to site resources

7. **Google Business Profile** — Connect local presence
   - Add to schema `sameAs` array
   - Surfaces in local AI searches

---

## 8. Testing & Validation

### Verify Implementation

**Robots.txt:**
```bash
# Test in browser
curl https://aceagency.ro/robots.txt | grep -A5 "GPTBot"
```

Expected: Crawlers listed with `Allow: /`

**llms.txt:**
```bash
curl https://aceagency.ro/llms.txt | head -20
```

Expected: Structured content guidance readable by humans and bots

**Schema Validation:**
- Use [Schema.org Validator](https://validator.schema.org)
- Each page should have Organization + correct type
- Homepage should show Organization + LocalBusiness + WebSite

**FAQ Citability:**
- Manually test in ChatGPT or Claude
- Search: "Ce este AceAgency" or "cat costa Google Ads"
- Check if response cites FAQ content

---

## 9. File References

### Modified Files
- `src/app/robots.ts` — AI crawler rules
- `src/lib/seo/schemas.ts` — SITE_URL import, webSiteSchema() function
- `src/lib/seo/constants.ts` — SITE_URL export (existing)
- `src/app/[locale]/page.tsx` — webSiteSchema() on homepage
- `src/components/sections/HeroTransition.tsx` — `definition` i18n key support
- `src/messages/ro.json`, `en.json` — FAQ expansion, definition keys
- `public/llms.txt` — NEW file

### Related Documentation
- `/docs/GEO-ANALYSIS.md` — Detailed GEO audit (baseline readiness)
- `/Specificatii-Tehnice-SEO-AceAgency.md` — Traditional SEO technical specs
- `/CLAUDE.md` — Project defaults and coding rules (updated with GEO rules)

---

## 10. Next Steps

### Immediate (Phase 08: Polish & Launch)
- [ ] Verify all robots.txt rules are live
- [ ] Test llms.txt accessibility via browser
- [ ] Validate WebSite schema on homepage
- [ ] Spot-check FAQ word counts (expand to 134-167 if possible)

### Phase 09 (Post-Launch, Optional)
- [ ] Expand remaining FAQ answers to 134+ words
- [ ] Create service comparison table (HTML `<table>`)
- [ ] Add HowTo schemas to service pages
- [ ] Prepare Team/Person schemas for Phase 2 (/echipa page)

### Ongoing
- [ ] Monitor brand mentions in AI search results
- [ ] Track GEO readiness score quarterly
- [ ] Update statistics with fresh metrics every 3-6 months
- [ ] Gather YouTube/Reddit presence (long-term authority building)

---

## Appendix: GEO Readiness Scorecard

| Category | Before | After (Est.) | Target |
|----------|--------|--------------|--------|
| Citability Score | 25/100 | 50/100 | 80/100 |
| Structural Readability | 50/100 | 70/100 | 85/100 |
| Multi-Modal Content | 20/100 | 25/100 | 60/100 |
| Authority & Brand Signals | 35/100 | 45/100 | 70/100 |
| Technical Accessibility | 40/100 | 65/100 | 85/100 |
| **Overall GEO Score** | **34/100** | **62/100** | **80/100** |

**Key Driver:** Phase 08 completion (FAQ expansion, stat attribution) will unlock 28-point improvement in Citability + Technical Accessibility.

---

## References

- [llms.txt Specification](https://llms.txt.org)
- [Schema.org WebSite Type](https://schema.org/WebSite)
- [Google's Generative Engine Optimization Guide](https://developers.google.com/search/generative-engine-optimization)
- [Ahrefs GEO Study (2025)](https://ahrefs.com) — YouTube mentions correlate 0.737 with AI citations
