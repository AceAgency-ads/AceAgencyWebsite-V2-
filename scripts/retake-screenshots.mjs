import { chromium } from 'playwright';
import { execSync } from 'child_process';
import { mkdirSync } from 'fs';

const sites = [
  { name: 'trady', url: 'https://trady.ro' },
  { name: 'leonor', url: 'https://leonorinstitute.ro' },
  { name: 'amora', url: 'https://amora.ro' },
  { name: 'itmar', url: 'https://itmar.ro' },
  { name: 'tutti', url: 'https://tuttiresto.ro' },
];

const OUTPUT_DIR = '/Users/mihaigrigore/workspace/AceAgencyWebsite-V2-/public/images/studii-de-caz';

async function acceptCookies(page) {
  // Wait a bit for cookie banners to appear
  await page.waitForTimeout(2000);

  // Try multiple common cookie consent selectors
  const selectors = [
    // Text-based buttons (Romanian + English)
    'button:has-text("Accept")',
    'button:has-text("Accepta")',
    'button:has-text("Acceptă")',
    'button:has-text("Accept All")',
    'button:has-text("Accepta toate")',
    'button:has-text("Acceptă toate")',
    'button:has-text("Accept cookies")',
    'button:has-text("Agree")',
    'button:has-text("OK")',
    'button:has-text("Da, sunt de acord")',
    'button:has-text("Sunt de acord")',
    'a:has-text("Accept")',
    'a:has-text("Accepta")',
    'a:has-text("Acceptă")',

    // CookieScript specific (used by trady.ro)
    '#cookiescript_accept',
    '#cookiescript_close',
    '.cookiescript_accept',
    '[data-cs-action="accept"]',
    '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',

    // Common cookie consent frameworks
    '.cc-accept',
    '.cc-btn.cc-dismiss',
    '.cookie-consent-accept',
    '.cookie-accept',
    '.cookie-consent__accept',
    '[data-action="accept"]',
    '[data-cookieconsent="accept"]',
    '#accept-cookies',
    '#cookie-accept',
    '.accept-cookies',
    '.btn-accept-cookies',

    // Generic cookie banner buttons
    '[class*="cookie"] button',
    '[id*="cookie"] button',
    '[class*="consent"] button',
    '[id*="consent"] button',
    '[class*="gdpr"] button',
  ];

  for (const selector of selectors) {
    try {
      const el = page.locator(selector).first();
      if (await el.isVisible({ timeout: 500 })) {
        console.log(`  Found cookie button: ${selector}`);
        await el.click();
        await page.waitForTimeout(1000);
        return true;
      }
    } catch {
      // Try next selector
    }
  }

  // Also try clicking any visible cookie icon/gear button (like on leonor)
  try {
    const cookieIcon = page.locator('[class*="cookie-script"], [id*="cookie-script"], .cky-btn-accept, #cky-btn-accept').first();
    if (await cookieIcon.isVisible({ timeout: 500 })) {
      console.log('  Found cookie script icon, clicking...');
      await cookieIcon.click();
      await page.waitForTimeout(500);

      // After clicking icon, look for accept button in the opened panel
      for (const sel of selectors) {
        try {
          const btn = page.locator(sel).first();
          if (await btn.isVisible({ timeout: 500 })) {
            console.log(`  Found accept in panel: ${sel}`);
            await btn.click();
            await page.waitForTimeout(1000);
            return true;
          }
        } catch { /* continue */ }
      }
    }
  } catch { /* continue */ }

  // Last resort: try to hide cookie elements via JS
  console.log('  No cookie button found, hiding cookie elements via JS...');
  await page.evaluate(() => {
    const keywords = ['cookie', 'consent', 'gdpr', 'cc-', 'cookiescript'];
    document.querySelectorAll('div, section, aside, footer, header').forEach(el => {
      const id = (el.id || '').toLowerCase();
      const cls = (el.className || '').toString().toLowerCase();
      if (keywords.some(k => id.includes(k) || cls.includes(k))) {
        el.style.display = 'none';
      }
    });
    // Also hide fixed/sticky bottom elements that look like cookie bars
    document.querySelectorAll('[style*="fixed"], [style*="sticky"]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > window.innerHeight - 100 && rect.height < 200) {
        const text = el.textContent.toLowerCase();
        if (keywords.some(k => text.includes(k))) {
          el.style.display = 'none';
        }
      }
    });
  });
  await page.waitForTimeout(500);
  return false;
}

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const site of sites) {
    console.log(`\nProcessing: ${site.name} (${site.url})`);
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      locale: 'ro-RO',
    });
    const page = await context.newPage();

    try {
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      console.log('  Page loaded');

      // Accept cookies
      await acceptCookies(page);

      // Extra wait for any animations after cookie dismissal
      await page.waitForTimeout(1500);

      // Second pass - sometimes cookie banners reappear or there's a second layer
      await acceptCookies(page);
      await page.waitForTimeout(500);

      // Take screenshot
      const pngPath = `/tmp/${site.name}-hero-clean.png`;
      await page.screenshot({ path: pngPath });
      console.log(`  Screenshot saved: ${pngPath}`);

      // Convert to WebP
      const webpPath = `${OUTPUT_DIR}/${site.name}/hero.webp`;
      execSync(`cwebp -q 85 "${pngPath}" -o "${webpPath}"`, { stdio: 'pipe' });
      console.log(`  Converted to WebP: ${webpPath}`);

    } catch (err) {
      console.error(`  Error for ${site.name}: ${err.message}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone!');
}

main();
