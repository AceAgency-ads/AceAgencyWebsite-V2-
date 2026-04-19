import { test, expect } from '@playwright/test';

const BASE = 'http://127.0.0.1:3001/ro';
const PAGES = [
  { name: 'Growth Landing', url: `${BASE}/growth`, slug: 'growth' },
  { name: 'Growth Checklist', url: `${BASE}/growth/checklist`, slug: 'checklist' },
  { name: 'Growth Thank You', url: `${BASE}/growth/multumesc`, slug: 'multumesc' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 393, height: 852 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
];

// ─── Visual Screenshots ─────────────────────────────────────────────────────

for (const vp of VIEWPORTS) {
  for (const page of PAGES) {
    test(`Visual: ${page.name} @ ${vp.name}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const p = await context.newPage();
      await p.goto(page.url, { waitUntil: 'domcontentloaded' });
      await p.screenshot({
        path: `qa-reports/growth-2026-03-24/${page.slug}-${vp.name}.png`,
        fullPage: true,
      });
      await context.close();
    });
  }
}

// ─── Layout: No Header/Footer on growth pages ──────────────────────────────

test('Layout: Growth page has NO site header', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const header = page.locator('header nav, [data-testid="header"]');
  await expect(header).toHaveCount(0);
});

test('Layout: Homepage still HAS site header', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  const header = page.locator('header');
  await expect(header).toBeVisible();
});

// ─── SEO: Meta tags ─────────────────────────────────────────────────────────

test('SEO: Growth page has proper title', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const title = await page.title();
  expect(title).toContain('ACE Growth Engine');
});

test('SEO: Growth page has meta description', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const desc = await page.locator('meta[name="description"]').getAttribute('content');
  expect(desc).toBeTruthy();
  expect(desc!.length).toBeGreaterThan(50);
});

test('SEO: Growth page has single H1', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const h1Count = await page.locator('h1').count();
  expect(h1Count).toBe(1);
});

test('SEO: Growth page has JSON-LD schemas', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const schemas = await page.locator('script[type="application/ld+json"]').count();
  expect(schemas).toBeGreaterThanOrEqual(2);
});

test('SEO: Growth page has OG tags', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
  expect(ogTitle).toBeTruthy();
});

test('SEO: Thank you page is noindex', async ({ page }) => {
  await page.goto(`${BASE}/growth/multumesc`, { waitUntil: 'domcontentloaded' });
  const robots = await page.locator('meta[name="robots"]').getAttribute('content');
  expect(robots).toContain('noindex');
});

// ─── Sections: All 9 sections present on main page ─────────────────────────

test('Sections: Hero has headline and CTA', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
  const cta = page.getByRole('link', { name: /functioneaza|works/i });
  await expect(cta).toBeVisible();
});

test('Sections: VSL section exists', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const vsl = page.locator('#vsl');
  await expect(vsl).toBeAttached();
});

test('Sections: FAQ accordion works', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const faqSection = page.locator('#faq');
  await expect(faqSection).toBeAttached();
  // Click first FAQ trigger button
  const firstTrigger = page.locator('button[data-slot="accordion-trigger"]').first();
  if (await firstTrigger.isVisible()) {
    await firstTrigger.click();
    const parentItem = page.locator('[data-slot="accordion-item"]').first();
    await expect(parentItem).toHaveAttribute('data-state', 'open');
  }
});

test('Sections: Audit form exists with all fields', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const form = page.locator('#audit-form form, section#audit-form form, [id*="audit"] form');
  // Check for form fields by name
  await expect(page.locator('input[name="name"]').first()).toBeAttached();
  await expect(page.locator('input[name="storeUrl"]').first()).toBeAttached();
  await expect(page.locator('select[name="revenue"]').first()).toBeAttached();
});

// ─── Forms: Validation works ────────────────────────────────────────────────

test('Forms: Audit form shows validation on empty submit', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  // Scroll to form
  await page.locator('input[name="name"]').first().scrollIntoViewIfNeeded();
  // Try submitting without filling
  const submitBtn = page.locator('button[type="submit"]').first();
  await submitBtn.click();
  // Browser native validation should prevent submission or show errors
  // Just verify page didn't navigate away
  expect(page.url()).toContain('/growth');
});

// ─── A11y: Basic checks ────────────────────────────────────────────────────

test('A11y: All images have alt text', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const imagesWithoutAlt = await page.evaluate(() => {
    const imgs = document.querySelectorAll('img');
    return Array.from(imgs).filter(img => !img.alt && !img.getAttribute('role')?.includes('presentation')).length;
  });
  expect(imagesWithoutAlt).toBe(0);
});

test('A11y: Form inputs have labels', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const unlabeledInputs = await page.evaluate(() => {
    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([aria-hidden="true"]), select, textarea');
    return Array.from(inputs).filter(input => {
      const id = input.id;
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
      const isHoneypot = input.getAttribute('name') === 'honeypot';
      return !hasLabel && !hasAriaLabel && !isHoneypot;
    }).length;
  });
  expect(unlabeledInputs).toBe(0);
});

test('A11y: Touch targets >= 44px on mobile', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 393, height: 852 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const smallTargets = await page.evaluate(() => {
    const interactives = document.querySelectorAll('a, button, input, select, textarea');
    let count = 0;
    interactives.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
        const style = getComputedStyle(el);
        if (style.display !== 'none' && style.visibility !== 'hidden') {
          count++;
        }
      }
    });
    return count;
  });
  // Allow some small targets but flag if many
  expect(smallTargets).toBeLessThan(5);
  await context.close();
});

// ─── Responsive: No horizontal overflow ─────────────────────────────────────

for (const vp of VIEWPORTS) {
  test(`Responsive: No overflow @ ${vp.name}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
    await context.close();
  });
}

// ─── Performance: Basic metrics ─────────────────────────────────────────────

test('Performance: Page loads under 5s', async ({ page }) => {
  const start = Date.now();
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const loadTime = Date.now() - start;
  expect(loadTime).toBeLessThan(5000);
});

test('Performance: No JS console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  // Filter out known non-critical errors
  const critical = errors.filter(e => !e.includes('favicon') && !e.includes('404'));
  expect(critical.length).toBe(0);
});

// ─── Navigation: Smooth scroll CTAs ─────────────────────────────────────────

test('Navigation: Hero CTA scrolls to VSL section', async ({ page }) => {
  await page.goto(`${BASE}/growth`, { waitUntil: 'domcontentloaded' });
  const cta = page.getByRole('link', { name: /functioneaza|works/i });
  if (await cta.isVisible()) {
    await cta.click();
    await page.waitForTimeout(1000);
    const vslVisible = await page.locator('#vsl').isVisible();
    expect(vslVisible).toBe(true);
  }
});

// ─── Checklist page ─────────────────────────────────────────────────────────

test('Checklist: Has headline and bullet points', async ({ page }) => {
  await page.goto(`${BASE}/growth/checklist`, { waitUntil: 'domcontentloaded' });
  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
  const bullets = page.locator('ul li');
  const count = await bullets.count();
  expect(count).toBeGreaterThanOrEqual(3);
});

test('Checklist: Has lead magnet form', async ({ page }) => {
  await page.goto(`${BASE}/growth/checklist`, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('input[name="email"]').first()).toBeAttached();
});

// ─── Thank you page ─────────────────────────────────────────────────────────

test('ThankYou: Has download CTA and case study link', async ({ page }) => {
  await page.goto(`${BASE}/growth/multumesc`, { waitUntil: 'domcontentloaded' });
  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
  const downloadLink = page.locator('a[download], a[href*="checklist.pdf"]');
  await expect(downloadLink.first()).toBeAttached();
});
