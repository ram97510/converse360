/* html -> jsx converter for the Converse360 .html canvas sources.
   Applies exactly the mechanical rules in the plan. */
const fs = require('fs');

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', colspan: 'colSpan',
  rowspan: 'rowSpan', maxlength: 'maxLength', autocomplete: 'autoComplete',
  readonly: 'readOnly', contenteditable: 'contentEditable', crossorigin: 'crossOrigin',
  srcset: 'srcSet', usemap: 'useMap', novalidate: 'noValidate', enctype: 'encType',
  autofocus: 'autoFocus', spellcheck: 'spellCheck', datetime: 'dateTime',
  viewbox: 'viewBox', preserveaspectratio: 'preserveAspectRatio',
};

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function mapAttrName(name) {
  const lower = name.toLowerCase();
  if (ATTR_MAP[lower]) return ATTR_MAP[lower];
  if (/^(data|aria)-/.test(name)) return name;
  if (name.includes('-')) return camel(name);
  return name;
}

/** split "a:b; c:d" on top-level semicolons (not inside parens or quotes) */
// ---- token substitution -----------------------------------------------------
const CSS_TOKENS = [
  ['#00AB56', 'var(--brand)'],
  ['#008F48', 'var(--color-accent-600)'],
  ['#00773c', 'var(--color-accent-700)'],
  ['#00A651', 'var(--color-accent-bar)'],
  ['#0F7A3D', 'var(--color-accent-deep)'],
  ['#3FD07E', 'var(--color-accent-light)'],
  ['#8FE3B4', 'var(--color-accent-pale)'],
  ['#181818', 'var(--color-text)'],
  ['#4A4A4A', 'var(--color-text-muted)'],
  ['#5A635E', 'var(--color-text-soft)'],
  ['#6B736E', 'var(--color-text-subtle)'],
  ['#7A8580', 'var(--color-text-dim)'],
  ['#8B948F', 'var(--color-text-faint)'],
  ['#98A19C', 'var(--color-text-fainter)'],
  ['#4A524D', 'var(--color-text-legal)'],
  ['#F5F7F6', 'var(--color-surface)'],
  ['#F8FAF9', 'var(--color-surface-2)'],
  ['#F9FAFA', 'var(--color-surface-3)'],
  ['#E5E8E6', 'var(--color-divider)'],
  ['#1A73E8', 'var(--color-meta-blue)'],
  ['#25D366', 'var(--color-whatsapp)'],
  ['#DCF8C6', 'var(--color-whatsapp-bubble)'],
  ['#E1306C', 'var(--color-instagram)'],
  ['#FFFFFF', 'var(--color-bg)'],
  ['#FFF', 'var(--color-bg)'],
];
// SVG presentation attributes take a JS constant instead of a var()
const JS_TOKENS = {
  '#00AB56': 'BRAND', '#008F48': 'BRAND_600', '#00773c': 'BRAND_700',
  '#00A651': 'BRAND_BAR', '#0F7A3D': 'BRAND_DEEP', '#3FD07E': 'BRAND_LIGHT',
  '#8FE3B4': 'BRAND_PALE', '#181818': 'INK', '#4A4A4A': 'MUTED',
  '#5A635E': 'SOFT', '#6B736E': 'SUBTLE', '#7A8580': 'DIM',
  '#8B948F': 'FAINT', '#98A19C': 'FAINTER', '#F5F7F6': 'SURFACE',
  '#F8FAF9': 'SURFACE_2', '#F9FAFA': 'SURFACE_3', '#E5E8E6': 'DIVIDER',
  '#1A73E8': 'META_BLUE', '#25D366': 'WHATSAPP', '#DCF8C6': 'WHATSAPP_BUBBLE',
  '#E1306C': 'INSTAGRAM', '#FFFFFF': 'WHITE', '#FFF': 'WHITE',
};
const usedConstants = new Set();

function tokenizeCss(value) {
  // the canvas emitted var(--brand,#00AB56); --brand is now always defined
  let v = value.replace(/var\(--brand\s*,\s*#00AB56\)/gi, 'var(--brand)');
  for (const [hex, tok] of CSS_TOKENS) {
    v = v.replace(new RegExp(hex + '(?![0-9A-Fa-f])', 'gi'), tok);
  }
  v = v.replace(/'DM Sans',\s*sans-serif/g, 'var(--font-body)');
  v = v.replace(/'Manrope',\s*sans-serif/g, 'var(--font-heading)');
  v = v.replace(/ui-monospace,\s*SFMono-Regular,\s*Menlo,\s*monospace/g, 'var(--font-mono)');
  return v;
}

function tokenizeAttr(value) {
  // SVG presentation attributes are sometimes written as var(--brand,#00AB56);
  // resolve the fallback so they tokenize like a plain hex
  const v = value.replace(/^var\(--brand\s*,\s*(#[0-9A-Fa-f]{3,6})\)$/i, '$1');
  const hit = Object.keys(JS_TOKENS).find((h) => h.toLowerCase() === v.toLowerCase());
  if (!hit) return null;
  usedConstants.add(JS_TOKENS[hit]);
  return JS_TOKENS[hit];
}

function splitDecls(css) {
  const out = [];
  let depth = 0, q = null, buf = '';
  for (const ch of css) {
    if (q) { buf += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; buf += ch; continue; }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { out.push(buf); buf = ''; continue; }
    buf += ch;
  }
  out.push(buf);
  return out.map((s) => s.trim()).filter(Boolean);
}

function styleObject(css) {
  const parts = splitDecls(css).map((d) => {
    const i = d.indexOf(':');
    if (i < 0) return null;
    const prop = d.slice(0, i).trim();
    const val = tokenizeCss(d.slice(i + 1).trim().replace(/\s+/g, ' '));
    const key = prop.startsWith('--') ? JSON.stringify(prop) : camel(prop);
    // a style value may itself carry bindings: "2px solid {{ ft.rule }}"
    if (/\{\{/.test(val)) {
      const only = binding(val);
      // a value that is nothing but one binding passes the value through
      if (only !== null) return key + ': ' + only;
      return key + ': ' + interpolate(val);
    }
    return key + ': ' + JSON.stringify(val);
  }).filter(Boolean);
  return '{ ' + parts.join(', ') + ' }';
}

/** "{{ expr }}" -> "expr"; null when there is no binding */
function binding(v) {
  const m = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/.exec(v);
  return m ? m[1] : null;
}

/** attribute values mixing text and bindings: nav-links{{ menuClass }} */
function interpolate(v) {
  if (!/\{\{/.test(v)) return null;
  const body = v.replace(/`/g, '\\`').replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, e) => '${' + e + '}');
  return '`' + body + '`';
}

function parseAttrs(src) {
  const attrs = [];
  const re = /([a-zA-Z_][-:a-zA-Z0-9_]*)(\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m;
  while ((m = re.exec(src))) {
    const value = m[2] === undefined ? null : (m[4] !== undefined ? m[4] : m[5] !== undefined ? m[5] : m[6]);
    attrs.push([m[1], value]);
  }
  return attrs;
}

const HREF_MAP = {
  'index.html': '/',
  'About.html': '/about',
  'Blog.html': '/blog',
  'Blog-ad-attribution.html': '/blog/ad-attribution',
  'Blog-first-reply.html': '/blog/first-reply',
  'Blog-one-inbox.html': '/blog/one-inbox',
  'Contact.html': '/contact',
  'FAQ.html': '/faq',
  'Pricing.html': '/pricing',
  'Privacy.html': '/privacy',
  'Terms.html': '/terms',
};

function mapHref(v) {
  const hashAt = v.indexOf('#');
  const file = hashAt < 0 ? v : v.slice(0, hashAt);
  const hash = hashAt < 0 ? '' : v.slice(hashAt + 1);
  if (Object.prototype.hasOwnProperty.call(HREF_MAP, file)) {
    const base = HREF_MAP[file];
    if (!hash) return base;
    return base === '/' ? '/#' + hash : base + '#' + hash;
  }
  if (v.startsWith('assets/')) return '/' + v;
  return v;
}

function findTagEnd(html, i) {
  let q = null;
  for (let j = i + 1; j < html.length; j++) {
    const c = html[j];
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === '>') return j;
  }
  return html.length - 1;
}

/**
 * HTML collapses a whitespace run that spans a newline into one rendered space.
 * JSX instead DELETES such a run when it sits between text and an element, so
 * `email\n  <a>support@…</a>` renders as `emailsupport@…` and rewraps the
 * paragraph. Any leading/trailing whitespace that crosses a newline therefore
 * has to be re-stated explicitly as {' '}.
 *
 * Whitespace-only text nodes are safe to leave alone: per the flexbox/grid spec
 * an anonymous item containing only white space is not rendered, so this cannot
 * introduce stray flex items.
 */
function text(t) {
  let s = t.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, e) => '{' + e + '}');
  if (!/\S/.test(s)) return s;

  const lead = /^\s*/.exec(s)[0];
  const trail = /\s*$/.exec(s)[0];
  const core = s.slice(lead.length, s.length - trail.length);

  // HTML collapses a whitespace run spanning a newline to one rendered space;
  // JSX deletes it. That changes layout in two ways: `email\n<a>…` renders as
  // `emailsupport@…` and rewraps the paragraph, and a trailing space before
  // `</span>` inside an inline-flex badge is real width (~2px) that decides
  // whether a badge row wraps. So restate every such space explicitly.
  //
  // Safe to do unconditionally: inside a block box a leading/trailing space
  // collapses away at the line edge, and in a flex/grid container a text run
  // holding only white space is not rendered at all. (No source page uses
  // white-space: pre, where this would not hold.)
  const leadOut = lead.includes('\n') ? lead + "{' '}" : lead;
  const trailOut = trail.includes('\n') ? "{' '}" + trail : trail;
  return leadOut + core + trailOut;
}

/** internal anchors become next/link so navigation stays client-side */
function isInternalLink(name, attrs) {
  if (name !== 'a') return false;
  const href = attrs.find((a) => a[0] === 'href');
  if (!href || href[1] === null) return false;
  const mapped = mapHref(href[1]);
  return mapped.startsWith('/') && !mapped.startsWith('/assets');
}

function renderTag(name, attrs, selfClosed) {
  const hover = attrs.find((a) => a[0] === 'style-hover');
  const focus = attrs.find((a) => a[0] === 'style-focus');
  const isHx = !!(hover || focus);
  const link = isInternalLink(name, attrs);
  const parts = [];
  if (isHx) parts.push(link ? 'link' : 'as="' + name + '"');

  for (const [k, v] of attrs) {
    if (k === 'style-hover' || k === 'style-focus') continue;
    if (v === null) { parts.push(mapAttrName(k)); continue; }

    if (k === 'style') { parts.push('style={' + styleObject(v) + '}'); continue; }
    if (/^on[A-Za-z]/.test(k)) {
      const b = binding(v);
      const ev = 'on' + k.slice(2, 3).toUpperCase() + k.slice(3);
      parts.push(ev + '={' + (b || v) + '}');
      continue;
    }
    const b = binding(v);
    if (b !== null) { parts.push(mapAttrName(k) + '={' + b + '}'); continue; }
    const interp = interpolate(v);
    if (interp !== null) { parts.push(mapAttrName(k) + '={' + interp + '}'); continue; }
    if (k === 'fill' || k === 'stroke' || k === 'stop-color' || k === 'stopColor' || k === 'color') {
      const c = tokenizeAttr(v);
      if (c) { parts.push(mapAttrName(k) + '={' + c + '}'); continue; }
    }
    const value = (k === 'href' || k === 'src') ? mapHref(v) : v;
    parts.push(mapAttrName(k) + '=' + JSON.stringify(value));
  }
  if (hover) parts.push('hoverStyle={' + styleObject(hover[1]) + '}');
  if (focus) parts.push('focusStyle={' + styleObject(focus[1]) + '}');

  const tag = isHx ? 'Hx' : link ? 'Link' : name;
  // an SVG <stop …/> is not in the HTML void set but is still self-closing
  const isVoid = VOID.has(name.toLowerCase()) || selfClosed;
  return { jsx: '<' + tag + (parts.length ? ' ' + parts.join(' ') : '') + (isVoid ? ' />' : '>'), isHx, link };
}

function convert(html) {
  let out = '';
  let i = 0;
  const stack = [];
  while (i < html.length) {
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i);
      out += '{/*' + html.slice(i + 4, end).replace(/\*\//g, '*\\/') + '*/}';
      i = end + 3;
      continue;
    }
    if (html[i] === '<') {
      const end = findTagEnd(html, i);
      const raw = html.slice(i, end + 1);
      i = end + 1;

      if (raw[1] === '/') {
        const name = raw.slice(2, -1).trim();
        // An HTML parser discards a closing tag that matches nothing still open
        // — index.html carries a stray second `</section>` after the
        // testimonials — and the rendered design is what the source means. JSX
        // has no such tolerance, so drop it here too rather than popping some
        // unrelated ancestor and corrupting every tag after it.
        if (!stack.some((f) => f.name === name)) {
          console.error('WARN dropped stray </' + name + '>');
          continue;
        }
        out += stack.pop().close;
        continue;
      }

      const selfClosed = /\/>$/.test(raw);
      const m = /^<\s*([a-zA-Z][-a-zA-Z0-9]*)/.exec(raw);
      const name = m[1];
      const attrSrc = raw.slice(m[0].length, selfClosed ? -2 : -1);
      const attrs = parseAttrs(attrSrc);

      if (name === 'sc-if') {
        const cond = binding(attrs.find((a) => a[0] === 'value')[1]);
        out += '{' + cond + ' && (<>';
        stack.push({ name, close: '</>)}' });
        continue;
      }
      if (name === 'sc-for') {
        const list = binding(attrs.find((a) => a[0] === 'list')[1]);
        const as = attrs.find((a) => a[0] === 'as')[1];
        out += '{' + list + '.map((' + as + ', i) => (<Fragment key={i}>';
        stack.push({ name, close: '</Fragment>))}' });
        continue;
      }

      const { jsx, isHx, link } = renderTag(name, attrs, selfClosed);
      out += jsx;
      const isVoid = VOID.has(name.toLowerCase()) || selfClosed;
      if (!isVoid) stack.push({ name, close: '</' + (isHx ? 'Hx' : link ? 'Link' : name) + '>' });
      continue;
    }

    let next = html.indexOf('<', i);
    if (next < 0) next = html.length;
    out += text(html.slice(i, next));
    i = next;
  }
  if (stack.length) console.error('WARN unclosed tags: ' + stack.map((s) => s.name).join(', '));
  return out;
}

const file = process.argv[2];
const from = parseInt(process.argv[3], 10);
const to = parseInt(process.argv[4], 10);
const lines = fs.readFileSync(file, 'utf8').split('\n');
process.stdout.write(convert(lines.slice(from - 1, to).join('\n')));
if (usedConstants.size) {
  console.error('IMPORT { ' + [...usedConstants].sort().join(', ') + " } from '@/lib/tokens'");
}
