/* sections.js <urlA> <urlB> [width] — line up the two pages' top-level blocks.
   Reports each section's tag/id/class, its y-offset and its height, side by
   side, so a divergence can be traced to the section that introduces it. */
const { chromium } = require('playwright-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const probe = async (browser, url, width) => {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const out = await page.evaluate(() => {
    // whichever element actually holds the <header> is the page wrapper: the
    // source nests it under #dc-root and a --brand div, the port under PageShell
    const wrap = document.querySelector('header').parentElement;
    const kids = [...wrap.children].filter((el) => el.getBoundingClientRect().height > 0);
    return kids.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
             (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''),
        top: Math.round(r.top + window.scrollY),
        h: Math.round(r.height),
      };
    });
  });
  await page.close();
  return out;
};

(async () => {
  const [a, b, w] = process.argv.slice(2);
  const width = Number(w || 1440);
  const browser = await chromium.launch({ executablePath: CHROME });
  const [A, B] = [await probe(browser, a, width), await probe(browser, b, width)];
  await browser.close();
  const n = Math.max(A.length, B.length);
  console.log('idx  orig                            top     h   |  new                             top     h   | Δh');
  for (let i = 0; i < n; i++) {
    const x = A[i] || { tag: '—', top: 0, h: 0 };
    const y = B[i] || { tag: '—', top: 0, h: 0 };
    const d = y.h - x.h;
    console.log(
      String(i).padStart(3) + '  ' +
      x.tag.padEnd(30).slice(0, 30) + String(x.top).padStart(6) + String(x.h).padStart(6) + '   |  ' +
      y.tag.padEnd(30).slice(0, 30) + String(y.top).padStart(6) + String(y.h).padStart(6) + '   | ' +
      (d === 0 ? '' : (d > 0 ? '+' : '') + d)
    );
  }
})();
