/* textdiff.js — extract normalized visible text from an HTML file or URL.
   Used to confirm the ported pages carry the same copy as the .html sources. */
const fs = require('fs');

const ENTITIES = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
  '&nbsp;': ' ', '&middot;': '·', '&mdash;': '—', '&ndash;': '–', '&rsquo;': '’',
  '&times;': '×', '&copy;': '©', '&hellip;': '…', '&x27;': "'", '&#x27;': "'",
};

function stripTags(html) {
  // drop script and style bodies entirely
  let s = html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ');
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
  s = s.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
  for (const [k, v] of Object.entries(ENTITIES)) s = s.split(k).join(v);
  return s;
}

function words(html) {
  return stripTags(html)
    .replace(/\{\{[^}]*\}\}/g, ' ')   // unresolved canvas bindings in the source
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

async function load(src) {
  if (/^https?:/.test(src)) {
    const res = await fetch(src);
    return await res.text();
  }
  return fs.readFileSync(src, 'utf8');
}

(async () => {
  const [a, b] = process.argv.slice(2);
  const wa = words(await load(a));
  const wb = words(await load(b));

  // multiset difference, so ordering noise does not swamp the signal
  const count = (ws) => ws.reduce((m, w) => m.set(w, (m.get(w) || 0) + 1), new Map());
  const ca = count(wa), cb = count(wb);
  const onlyA = [], onlyB = [];
  for (const [w, n] of ca) { const d = n - (cb.get(w) || 0); if (d > 0) onlyA.push(`${w} x${d}`); }
  for (const [w, n] of cb) { const d = n - (ca.get(w) || 0); if (d > 0) onlyB.push(`${w} x${d}`); }

  console.log(`words: source=${wa.length} ported=${wb.length}`);
  if (onlyA.length) console.log('ONLY IN SOURCE: ' + onlyA.slice(0, 60).join(' | '));
  if (onlyB.length) console.log('ONLY IN PORTED: ' + onlyB.slice(0, 60).join(' | '));
  if (!onlyA.length && !onlyB.length) console.log('TEXT IDENTICAL');
})();
