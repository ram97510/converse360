/* collisions.js — find every selector that different source pages define with
   DIFFERENT declarations. Merging the per-page <style> blocks into one global
   sheet makes each of these a cross-page bug. */
const fs = require('fs');

function blocks(css) {
  const out = []; let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { out.push(css.slice(start, i + 1).trim()); start = i + 1 } }
  }
  return out.filter(Boolean);
}
const sel = (b) => b.slice(0, b.indexOf('{')).replace(/\s+/g, ' ').trim();
const body = (b) => b.slice(b.indexOf('{') + 1, b.lastIndexOf('}'));
const norm = (s) => s.replace(/\s+/g, ' ').replace(/;\s*}/g, ' }').replace(/;\s*$/, '').trim();

const SRC = process.env.DC_SRC || '../..';
const FILES = {
  landing: 'index',
  about: 'About',
  std: 'Contact',          // === FAQ === Pricing
  legal: 'Privacy',        // === Terms
  blog: 'Blog',
  post: 'Blog-ad-attribution',  // === Blog-first-reply === Blog-one-inbox
};
function readStyle(name) {
  const html = fs.readFileSync(SRC + '/' + name + '.html', 'utf8');
  const open = html.indexOf('<style>');
  return html.slice(open + 7, html.indexOf('</style>', open));
}

// selector (qualified by any enclosing @media) -> page -> normalized body
const table = new Map();
const keyframes = new Map();

function walk(page, css, mediaPrefix) {
  for (const b of blocks(css)) {
    const s = sel(b);
    if (s.startsWith('@media') || s.startsWith('@supports')) {
      walk(page, body(b), (mediaPrefix ? mediaPrefix + ' && ' : '') + s);
      continue;
    }
    if (s.startsWith('@keyframes')) {
      const name = s.split(/\s+/)[1];
      if (!keyframes.has(name)) keyframes.set(name, new Map());
      keyframes.get(name).set(page, norm(body(b)));
      continue;
    }
    const key = (mediaPrefix ? mediaPrefix + ' | ' : '') + s;
    if (!table.has(key)) table.set(key, new Map());
    // a page may repeat a selector; keep them all so order-within-page is kept
    const prev = table.get(key).get(page);
    table.get(key).set(page, prev ? prev + ' ;; ' + norm(body(b)) : norm(body(b)));
  }
}

for (const [page, file] of Object.entries(FILES)) walk(page, readStyle(file), '');

console.log('=== SELECTOR COLLISIONS (same selector, different declarations) ===');
let n = 0;
for (const [key, byPage] of table) {
  const distinct = new Set(byPage.values());
  if (distinct.size > 1) {
    n++;
    console.log('\n* ' + key);
    for (const [page, decl] of byPage) console.log('    [' + page + '] ' + decl.slice(0, 150));
  }
}
console.log('\ntotal colliding selectors: ' + n);

console.log('\n=== KEYFRAME COLLISIONS ===');
let k = 0;
for (const [name, byPage] of keyframes) {
  const distinct = new Set(byPage.values());
  if (distinct.size > 1) {
    k++;
    console.log('\n* @keyframes ' + name);
    for (const [page, decl] of byPage) console.log('    [' + page + '] ' + decl.slice(0, 120));
  }
}
console.log('\ntotal colliding keyframes: ' + k);
