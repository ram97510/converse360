/* interact.js — exercise every interactive behaviour the DCLogic classes
   provided, on BOTH the original .html sources and the ported app, and report
   whether the two agree.

     npx http-server -p 3399 ../..     # the .html sources
     npm run start -- -p 3311          # the port
     node tools/verify/interact.js

   Each check runs the same script against the same page on both sides and
   compares the results, so a check cannot pass by asserting something that is
   also broken in the source. */
const { chromium } = require('playwright-core');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ORIG = process.env.ORIG || 'http://localhost:3399';
const PORT = process.env.PORT_BASE || 'http://localhost:3311';

/** page → [source file, ported route] */
const PAGES = {
  landing: ['/index.html', '/'],
  about: ['/About.html', '/about'],
  blog: ['/Blog.html', '/blog'],
  post: ['/Blog-first-reply.html', '/blog/first-reply'],
  faq: ['/FAQ.html', '/faq'],
  pricing: ['/Pricing.html', '/pricing'],
  contact: ['/Contact.html', '/contact'],
};

let failures = 0;
const report = (name, a, b, note = '') => {
  const ok = JSON.stringify(a) === JSON.stringify(b);
  if (!ok) failures++;
  console.log(
    (ok ? 'PASS  ' : 'FAIL  ') + name.padEnd(46) +
    (ok ? JSON.stringify(a) : `orig ${JSON.stringify(a)}  !=  new ${JSON.stringify(b)}`) +
    (note ? '   ' + note : '')
  );
};

/** run `fn` on the same page of both builds and compare what it returns */
async function both(browser, key, name, fn, { width = 1440, settle = 1200 } = {}) {
  const [srcPath, route] = PAGES[key];
  const run = async (url) => {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(settle);
      return await fn(page);
    } finally {
      await page.close();
    }
  };
  report(name, await run(ORIG + srcPath), await run(PORT + route));
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });

  // ---- the mobile menu, on every page --------------------------------------
  for (const key of Object.keys(PAGES)) {
    await both(browser, key, `mobile menu toggles (${key})`, async (page) => {
      const display = () => page.locator('.nav-links').evaluate((e) => getComputedStyle(e).display);
      const before = await display();
      await page.locator('.nav-toggle').click();
      await page.waitForTimeout(300);
      const open = await display();
      await page.locator('.nav-toggle').click();
      await page.waitForTimeout(300);
      return [before, open, await display()];
    }, { width: 700 });
  }

  // ---- landing: the hero typewriter ----------------------------------------
  await both(browser, 'landing', 'hero rotator types', async (page) => {
    const read = () => page.locator('.hero-rotator').textContent();
    const seen = new Set();
    for (let i = 0; i < 12; i++) {
      seen.add((await read()).trim());
      await page.waitForTimeout(200);
    }
    // it should have shown several different prefixes, all of one phrase list
    return { grew: seen.size > 3, allPrefixes: [...seen].every((s) =>
      ['More sales.', 'More revenue.', 'More Profits.'].some((p) => p.startsWith(s)) || s === '') };
  }, { settle: 100 });

  // ---- landing: the platform tab strip -------------------------------------
  await both(browser, 'landing', 'platform tabs switch the panel', async (page) => {
    const tabs = page.locator('.plat-tab');
    const shot = () => page.locator('.plat-panel img').getAttribute('src');
    const n = await tabs.count();
    const first = await shot();
    await tabs.nth(2).click();
    await page.waitForTimeout(400);
    const third = await shot();
    return {
      tabs: n,
      changed: first !== third,
      selected: await tabs.nth(2).getAttribute('aria-selected'),
      // the file name is the identity — the port serves it from /assets
      panel: (third || '').split('/').pop(),
    };
  });

  await both(browser, 'landing', 'platform tabs auto-advance', async (page) => {
    const sel = () => page.locator('.plat-tab[aria-selected="true"] .plat-tab-label').textContent();
    const a = await sel();
    await page.waitForTimeout(5400);
    return { moved: a !== (await sel()) };
  }, { settle: 300 });

  // ---- landing: the everyday-features rail ---------------------------------
  await both(browser, 'landing', 'everyday rail switches the showcase', async (page) => {
    const items = page.locator('.daily-nav-item');
    const n = await items.count();
    // each panel is a different tree; its whole text is the cheapest identity
    const panel = () => page.locator('.daily-showcase').innerText();
    await items.nth(0).click();
    await page.waitForTimeout(500);
    const first = await panel();
    await items.nth(4).click();
    await page.waitForTimeout(500);
    const fifth = await panel();
    return {
      items: n,
      panelHasText: first.length > 0,
      changed: first !== fifth,
      active: await items.nth(4).evaluate((e) => e.classList.contains('is-active')),
      // the fifth rail item is Official WhatsApp Setup
      railTitle: (await items.nth(4).locator('.daily-nav-title').textContent()).trim(),
    };
  });

  // ---- landing: the industry picker and its chat thread --------------------
  await both(browser, 'landing', 'industry pills switch the panel', async (page) => {
    const pills = page.locator('.ind-tabs button');
    const heading = () => page.locator('.ind-copy h3').textContent();
    const before = await heading();
    await pills.nth(0).click();
    await page.waitForTimeout(400);
    return { pills: await pills.count(), before: before.trim(), after: (await heading()).trim(),
      selected: await pills.nth(0).getAttribute('aria-selected') };
  });

  await both(browser, 'landing', 'chat thread plays itself out', async (page) => {
    const bubbles = () => page.locator('.ind-thread > div').count();
    const early = await bubbles();
    // Real Estate's six messages take 500 + 1250x5 = 6750 ms; sample well past
    // that or the two sides land on either side of the last one.
    await page.waitForTimeout(9000);
    const late = await bubbles();
    // six bubbles plus the always-on typing indicator
    return { grew: late > early, settled: late };
  }, { settle: 700 });

  // ---- landing: the count-up stats -----------------------------------------
  await both(browser, 'landing', 'stats count up when scrolled to', async (page) => {
    const el = page.locator('.animate-stat').first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2600);
    const text = (await el.textContent()).trim();
    const format = await el.getAttribute('data-format');
    // the placeholder must be gone and the final value must be in place
    return { resolved: !text.includes('{val'), matchesFormat: text.length > 0 && text !== format };
  }, { settle: 300 });

  // ---- landing: scroll reveal ----------------------------------------------
  await both(browser, 'landing', 'scroll reveal arms and releases', async (page) => {
    const armed = await page.evaluate(() => document.documentElement.classList.contains('reveal-on'));
    const first = page.locator('[data-reveal]').first();
    await first.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    return { armed, shown: await first.evaluate((e) => e.classList.contains('is-in')) };
  }, { settle: 600 });

  // ---- pricing: the monthly / yearly toggle --------------------------------
  await both(browser, 'pricing', 'pricing toggle switches the prices', async (page) => {
    const prices = () => page.locator('.price-amt, [class*=price] strong, h3 + div span').first().textContent();
    const tabs = page.locator('[role="tab"]');
    const monthly = await page.locator('body').innerText();
    await tabs.nth(1).click();
    await page.waitForTimeout(400);
    const yearly = await page.locator('body').innerText();
    return {
      changed: monthly !== yearly,
      billedYearly: yearly.includes('Billed yearly'),
      billedMonthly: monthly.includes('Billed monthly'),
      hasDiscount: yearly.includes('1,350') || yearly.includes('₹1,350'),
      _: await prices().catch(() => null) && undefined,
    };
  });

  // ---- contact: the form ---------------------------------------------------
  await both(browser, 'contact', 'contact form reveals its confirmation', async (page) => {
    const body = () => page.locator('form').innerText();
    const before = await body();
    await page.locator('form button[type="submit"], form button').first().click();
    await page.waitForTimeout(400);
    const after = await body();
    return { changed: before !== after, longer: after.length > before.length };
  });

  // ---- blog: the topic filter ----------------------------------------------
  await both(browser, 'blog', 'blog topic chips filter the cards', async (page) => {
    const chips = page.locator('.blog-chip');
    const cards = () => page.locator('.blog-card').count();
    const count = () => page.locator('.blog-count').textContent();
    const all = await cards();
    const allLabel = (await count()).trim();
    await chips.nth(1).click();
    await page.waitForTimeout(400);
    const filtered = await cards();
    const filteredLabel = (await count()).trim();
    await chips.nth(0).click();
    await page.waitForTimeout(400);
    return { chips: await chips.count(), all, allLabel, filtered, filteredLabel, restored: await cards() };
  });

  // ---- faq / post: the native accordions -----------------------------------
  await both(browser, 'faq', 'FAQ accordion opens', async (page) => {
    const d = page.locator('details').first();
    const before = await d.evaluate((e) => e.open);
    await d.locator('summary').click();
    await page.waitForTimeout(300);
    return { before, after: await d.evaluate((e) => e.open), total: await page.locator('details').count() };
  });

  await browser.close();
  console.log(failures ? `\n${failures} check(s) differ from the source.` : '\nAll checks agree with the source.');
  process.exit(failures ? 1 : 0);
})();
