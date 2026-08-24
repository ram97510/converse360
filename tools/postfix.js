/* postfix.js — the handful of edits that cannot be expressed as generic
   conversion rules. Run after every regeneration. */
const fs = require('fs');
const W = require('path').join(__dirname, '..');

const edit = (rel, fn) => {
  const p = W + '/' + rel;
  const before = fs.readFileSync(p, 'utf8');
  const after = fn(before);
  if (after !== before) {
    fs.writeFileSync(p, after);
    console.log('patched ' + rel);
  } else {
    console.log('NO-OP (check!) ' + rel);
  }
};

// Footer: the `id="about"` anchor is on the landing page, FAQ, Pricing and the
// four blog pages, but not on About, Contact, Privacy or Terms — so it is a prop.
edit('components/Footer.tsx', (s) => s.replace('<footer id="about"', '<footer id={id}'));

// (The two About fixes that used to live here — renaming its float1 keyframe in
// the markup, and dropping the `open` the canvas runtime stripped off the first
// accordion item — are gone with the sections they patched. About's style block
// still declares its own float1, so build-css.js still renames it, but nothing
// on the page animates with it any more.)

// Contact: rows is a number in JSX.
edit('components/contact/ContactBody.tsx', (s) => s.replace('rows="4"', 'rows={4}'));
