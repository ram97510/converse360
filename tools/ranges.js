/* ranges.js — print the announcement-bar / body / footer line ranges of every
   source page, in the order regenerate.sh's PAGES table wants them.

     node ranges.js            # relative to ../.. , or set DC_SRC

   The source pages all have the same shape:

     </helmet>
     [<div style="--brand:…">]     the page wrapper, which PageShell replaces
       <div role="region" aria-label="Announcements">  …  </div>
       <header> … </header>
       … the page body …
       <footer> … </footer>

   so each section can be found rather than counted. Run this after any edit
   that moves lines in a source file and paste the result into regenerate.sh. */
const fs = require('fs');
const path = require('path');

// resolved from this file, not the cwd, so it works from anywhere
const SRC = process.env.DC_SRC || path.join(__dirname, '..', '..');
const FILES = [
  'index', 'About', 'Blog', 'Blog-ad-attribution', 'Blog-first-reply',
  'Blog-one-inbox', 'Contact', 'FAQ', 'Pricing', 'Privacy', 'Terms',
];

/** blank lines and standalone HTML comments are not part of a section */
const junk = (l) => !l.trim() || /^<!--.*-->$/.test(l.trim());

for (const f of FILES) {
  const lines = fs.readFileSync(`${SRC}/${f}.html`, 'utf8').split('\n');
  const at = (n) => lines[n - 1];
  const find = (re, from = 1) => {
    for (let i = from; i <= lines.length; i++) if (re.test(at(i))) return i;
    throw new Error(`${f}.html: no match for ${re}`);
  };

  const ann = find(/aria-label="Announcements"/);
  const header = find(/^\s*<header/);
  const headerEnd = find(/<\/header>/, header);
  const footer = find(/^\s*<footer/, header);
  const footerEnd = find(/<\/footer>/, footer);

  let annEnd = header - 1;
  while (junk(at(annEnd))) annEnd--;
  let body = headerEnd + 1;
  while (junk(at(body))) body++;
  let bodyEnd = footer - 1;
  while (junk(at(bodyEnd))) bodyEnd--;

  console.log(
    `${f.padEnd(21)} ann ${ann}-${annEnd}   body ${body}-${bodyEnd}   footer ${footer}-${footerEnd}`
  );
}
