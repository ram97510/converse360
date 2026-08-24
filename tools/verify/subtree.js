/* subtree.js <urlA> <urlB> <selector> [width] — walk the two pages' matching
   subtrees in parallel and print the first node whose height diverges. */
const { chromium } = require('playwright-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const probe = async (browser, url, selector, width) => {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const out = await page.evaluate((sel) => {
    const root = document.querySelectorAll(sel);
    const rows = [];
    const walk = (el, path, depth) => {
      const r = el.getBoundingClientRect();
      const c = getComputedStyle(el);
      rows.push({
        path,
        depth,
        tag: el.tagName.toLowerCase() +
             (el.className && typeof el.className === 'string' && el.className.trim()
               ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
        h: Math.round(r.height),
        w: Math.round(r.width),
        display: c.display,
        cols: c.gridTemplateColumns,
        gap: c.gap,
        flexWrap: c.flexWrap,
      });
      if (depth < 5) [...el.children].forEach((k, i) => walk(k, path + '/' + i, depth + 1));
    };
    root.forEach((el, i) => walk(el, String(i), 0));
    return rows;
  }, selector);
  await page.close();
  return out;
};

(async () => {
  const [a, b, sel, w] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: CHROME });
  const [A, B] = [await probe(browser, a, sel, Number(w || 900)), await probe(browser, b, sel, Number(w || 900))];
  await browser.close();
  const byPath = new Map(B.map((r) => [r.path, r]));
  for (const x of A) {
    const y = byPath.get(x.path);
    if (!y) { console.log(`${x.path} MISSING in new: ${x.tag}`); continue; }
    if (x.h !== y.h || x.w !== y.w) {
      console.log(
        `${x.path.padEnd(14)} ${x.tag.slice(0, 42).padEnd(44)} ` +
        `orig ${x.w}x${x.h}  new ${y.w}x${y.h}`
      );
      if (x.display !== y.display || x.cols !== y.cols || x.gap !== y.gap || x.flexWrap !== y.flexWrap) {
        console.log(`               orig  display:${x.display} cols:${x.cols} gap:${x.gap} wrap:${x.flexWrap}`);
        console.log(`               new   display:${y.display} cols:${y.cols} gap:${y.gap} wrap:${y.flexWrap}`);
      }
    }
  }
})();
