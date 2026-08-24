/* wrap.js <head> <body> <tail> <out> [indent]
   Concatenates a hand-written component head, converter output (re-indented)
   and a tail into a finished .tsx file.

   A line reading `// @imports` in the head file is replaced by the import
   statements the converted body actually needs (Hx, Link, Fragment and any
   token constants). */
const fs = require('fs');
const [, , headFile, bodyFile, tailFile, outFile, indentArg] = process.argv;
const indent = parseInt(indentArg || '6', 10);

let head = fs.readFileSync(headFile, 'utf8');
const tail = fs.readFileSync(tailFile, 'utf8');
let body = fs.readFileSync(bodyFile, 'utf8');

// the source markup is indented inside <x-dc>; re-indent to `indent`
const lines = body.split('\n');
const base = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
body = lines.map((l) => (l.trim() ? ' '.repeat(indent) + l.slice(base) : '')).join('\n');

const TOKEN_NAMES = [
  'BRAND', 'BRAND_600', 'BRAND_700', 'BRAND_BAR', 'BRAND_DEEP', 'BRAND_LIGHT',
  'BRAND_PALE', 'INK', 'MUTED', 'SOFT', 'SUBTLE', 'DIM', 'FAINT', 'FAINTER',
  'WHITE', 'SURFACE', 'SURFACE_2', 'SURFACE_3', 'DIVIDER', 'META_BLUE',
  'WHATSAPP', 'WHATSAPP_BUBBLE', 'INSTAGRAM',
];

if (head.includes('// @imports')) {
  const imports = [];
  // Fragment folds into the head's own react import where there is one — a
  // client component's head already pulls in its hooks — rather than emitting a
  // second `from 'react'` line next to it.
  const react = /^import \{ ([^}]+) \} from 'react';$/m.exec(head);
  if (/<Fragment[ >]/.test(body)) {
    if (react) {
      const names = ['Fragment', ...react[1].split(',').map((n) => n.trim())];
      head = head.replace(react[0], `import { ${names.join(', ')} } from 'react';`);
    } else {
      imports.push("import { Fragment } from 'react';");
    }
  }
  if (/<Link[ >]/.test(body)) imports.push("import Link from 'next/link';");
  if (/<Hx[ >]/.test(body)) imports.push("import Hx from '@/components/Hx';");
  const used = TOKEN_NAMES.filter((n) => new RegExp('[={ ]' + n + '[}, ]').test(body));
  if (used.length) imports.push(`import { ${used.join(', ')} } from '@/lib/tokens';`);
  head = head.replace(/^.*\/\/ @imports.*$/m, imports.join('\n'));
}

fs.writeFileSync(outFile, head.replace(/\n$/, '') + '\n' + body.replace(/^\n+|\n+$/g, '') + '\n' + tail);
console.log('wrote ' + outFile);
