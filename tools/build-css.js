/* build-css.js — assemble app/globals.css from the eleven .html canvas sources.
 *
 * Each source page carries its own <style> block. Merging them into one sheet by
 * deduplicating rules does NOT work: pages declare the same selector with
 * different declarations (.wa-stats>div), and — more subtly — they order their
 * @media blocks differently, so a merged sheet silently changes which rule wins
 * (a max-width:760px block landing after a max-width:560px block reverses the
 * footer's column count at 375px).
 *
 * So instead: emit every page's page-local CSS IN ITS ORIGINAL ORDER, scoped
 * under that page's wrapper class. Cascade inside a page is preserved exactly,
 * and no page can reach another. Since every page-local rule gains the same one
 * class of specificity, their relative precedence is unchanged.
 *
 * Only the parts that really are global stay unscoped: the design-system layer,
 * the design tokens, the shared reset, and @keyframes (which cannot be scoped —
 * colliding names are renamed instead).
 */
const fs = require('fs');

function blocks(css) {
  const out = []; let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    // a comment may contain braces — mobile.css quotes the rule
    // html,body{height:100%} in its prose — so step over comments rather than
    // counting brace depth through them
    if (css.startsWith('/*', i)) {
      const end = css.indexOf('*/', i + 2);
      i = (end < 0 ? css.length : end + 1);
      continue;
    }
    const c = css[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { out.push(css.slice(start, i + 1).trim()); start = i + 1 } }
  }
  return out.filter(Boolean);
}
/** a block may open with a standalone comment; split it off so the selector
 *  (or at-rule) can be recognised */
function splitLeadingComments(block) {
  let i = 0;
  for (;;) {
    const rest = block.slice(i);
    const m = /^\s*\/\*[\s\S]*?\*\//.exec(rest);
    if (!m) break;
    i += m[0].length;
  }
  return [block.slice(0, i), block.slice(i)];
}
const sel = (b) => {
  const rule = splitLeadingComments(b)[1];
  return rule.slice(0, rule.indexOf('{')).replace(/\s+/g, ' ').trim();
};
const norm = (b) => b.replace(/\s+/g, ' ').replace(/;\s*}/g, ' }').trim();
const dedent = (b) => b.split('\n').map((l) => l.replace(/^ {8}/, '')).join('\n');
const SRC = process.env.DC_SRC || '..' + '/..';
/** pull the page-local <style> block straight out of a .html source */
function read(name) {
  const html = fs.readFileSync(SRC + '/' + name + '.html', 'utf8');
  const open = html.indexOf('<style>');
  const close = html.indexOf('</style>', open);
  if (open < 0 || close < 0) throw new Error('no <style> block in ' + name);
  return blocks(html.slice(open + '<style>'.length, close));
}

/**
 * Selectors that start ABOVE the page wrapper, and so cannot simply be
 * prefixed with it:
 *
 *   html, body, :root  — the wrapper's ancestors
 *   .reveal-on         — the landing page's scroll-reveal switch, which
 *                        initRevealAnimation() puts on documentElement
 *
 * `body { overflow-x: hidden }` prefixed to `.page-landing body` matches
 * nothing, and `.page-landing .reveal-on [data-reveal]` looks for a .reveal-on
 * INSIDE the wrapper, which never exists — that one silently disabled the whole
 * scroll-reveal. Anchor first, wrapper second: `.reveal-on .page-landing …`.
 */
const ABOVE_WRAPPER = /^(html|body|:root|\.reveal-on)(?![\w-])/;

/** prefix one complete selector with the page wrapper class */
function scopeOne(selector, prefix) {
  const s = selector.trim();
  const m = ABOVE_WRAPPER.exec(s);
  if (!m) return prefix + ' ' + s;
  const rest = s.slice(m[0].length).trim();
  // a bare html/body/:root rule stays as it is — its only competition is the
  // unscoped reset above it, which it already outranks by order
  if (!rest) return s;
  // otherwise the anchor keeps its place and the wrapper goes after it, so the
  // rule still gains exactly one class of specificity like every other
  return m[0] + ' ' + prefix + ' ' + rest;
}

/** prefix every selector in a rule (recursing into @media) with `prefix` */
function scope(block, prefix) {
  const [comments, rule] = splitLeadingComments(block);
  if (comments.trim()) return comments.trim() + '\n' + scope(rule, prefix);
  const s = sel(rule);
  const body = rule.slice(rule.indexOf('{'));
  if (s.startsWith('@media') || s.startsWith('@supports')) {
    const inner = blocks(body.slice(1, body.lastIndexOf('}')))
      .map((x) => scope(x, prefix))
      .join('\n\n');
    return s + ' {\n' + inner.replace(/^(?=.)/gm, '  ') + '\n}';
  }
  const scoped = s.split(',').map((p) => scopeOne(p, prefix)).join(',\n');
  return scoped + ' ' + body;
}

// ---------------------------------------------------------------------------
// page groups. Contact === FAQ === Pricing, Privacy === Terms, and the three
// blog articles all share one style block, so one representative file covers
// each group.
// ---------------------------------------------------------------------------
const GROUPS = [
  { name: 'Landing page', file: 'index', scope: '.page-landing', base: 11 },
  { name: 'About page', file: 'About', scope: '.page-about', base: 11 },
  { name: 'Contact, FAQ and Pricing pages', file: 'Contact', scope: '.page-std', base: 11 },
  { name: 'Privacy and Terms pages', file: 'Privacy', scope: '.legal-page', base: 6 },
  { name: 'Blog index', file: 'Blog', scope: '.page-blog', base: 11 },
  { name: 'Blog article pages', file: 'Blog-ad-attribution', scope: '.page-post', base: 11 },
];

// ---------------------------------------------------------------------------
// keyframes: global by nature. Collect once, and rename where two pages define
// the same name with different frames.
// ---------------------------------------------------------------------------
const keyframeRenames = {};   // group scope -> { oldName: newName }
const emittedKeyframes = new Map(); // name -> normalized body
const keyframeBlocks = [];

function collectKeyframes(group, list) {
  const renames = {};
  for (const b of list) {
    const s = sel(b);
    if (!s.startsWith('@keyframes')) continue;
    const name = s.split(/\s+/)[1];
    const bodyNorm = norm(b.slice(b.indexOf('{')));
    if (!emittedKeyframes.has(name)) {
      emittedKeyframes.set(name, bodyNorm);
      keyframeBlocks.push(dedent(b));
    } else if (emittedKeyframes.get(name) !== bodyNorm) {
      // same name, different frames — give this page its own copy
      const suffix = group.scope.replace(/^\.page-|^\./, '');
      const newName = name + '-' + suffix;
      if (!emittedKeyframes.has(newName)) {
        emittedKeyframes.set(newName, bodyNorm);
        keyframeBlocks.push(dedent(b).replace(name, newName));
      }
      renames[name] = newName;
      console.error(`keyframe collision: @keyframes ${name} -> ${newName} for ${group.scope}`);
    }
  }
  keyframeRenames[group.scope] = renames;
}

/**
 * Selectors that match on href have to follow the links the port actually
 * renders. The only one in any source is
 *
 *   .foot-grid div:has(>a[href$=".html"]) { gap: 2px !important }
 *
 * which picks out the footer's two columns that are lists of page links, so it
 * can drop the stacking gap once the links carry their own touch padding. Those
 * hrefs are routes here, not file names — `/about`, `/pricing`, … — and
 * `[href^="/"]` selects exactly the same two columns: the logo column has no
 * direct <a> child at all, and "Get in touch" wraps each of its links in a div
 * with the icon, so neither is a direct child match either way.
 */
const hrefSelectors = (css) => css.replace(/\[href\$="\.html"\]/g, '[href^="/"]');

// ---------------------------------------------------------------------------
// token substitution
// ---------------------------------------------------------------------------
const TOKENS = [
  ['#00AB56', '--brand'], ['#008F48', '--color-accent-600'], ['#00773c', '--color-accent-700'],
  ['#00A651', '--color-accent-bar'], ['#0F7A3D', '--color-accent-deep'],
  ['#3FD07E', '--color-accent-light'], ['#8FE3B4', '--color-accent-pale'],
  ['#181818', '--color-text'], ['#4A4A4A', '--color-text-muted'], ['#5A635E', '--color-text-soft'],
  ['#6B736E', '--color-text-subtle'], ['#7A8580', '--color-text-dim'],
  ['#8B948F', '--color-text-faint'], ['#98A19C', '--color-text-fainter'],
  ['#4A524D', '--color-text-legal'], ['#F5F7F6', '--color-surface'],
  ['#F8FAF9', '--color-surface-2'], ['#F9FAFA', '--color-surface-3'],
  ['#E5E8E6', '--color-divider'], ['#1A73E8', '--color-meta-blue'],
  ['#25D366', '--color-whatsapp'], ['#DCF8C6', '--color-whatsapp-bubble'],
  ['#E1306C', '--color-instagram'], ['#FFFFFF', '--color-bg'], ['#FFF', '--color-bg'],
];

function tokenize(css) {
  let out = css.replace(/var\(--brand\s*,\s*#00AB56\)/gi, 'var(--brand)');
  for (const [hex, name] of TOKENS) {
    out = out.replace(new RegExp(hex + '(?![0-9A-Fa-f])', 'gi'), `var(${name})`);
  }
  out = out.replace(/'DM Sans',\s*sans-serif/g, 'var(--font-body)');
  out = out.replace(/'Manrope',\s*sans-serif/g, 'var(--font-heading)');
  return hrefSelectors(out);
}

// ---------------------------------------------------------------------------
// assemble
// ---------------------------------------------------------------------------
const banner = (title, note) =>
  '/* ---------------------------------------------------------------------------\n   ' +
  title + (note ? '\n\n   ' + note.split('\n').join('\n   ') : '') +
  '\n   --------------------------------------------------------------------------- */';

const parts = [fs.readFileSync(__dirname + '/globals.head.css', 'utf8')];

// keyframes first, so every page's animation names resolve
for (const g of GROUPS) collectKeyframes(g, read(g.file).slice(g.base));
parts.push(banner('Keyframes', 'Global by nature — @keyframes cannot be scoped. Where two pages\ndefined the same name with different frames, the later one is renamed.'));
parts.push(...keyframeBlocks.map(tokenize));

for (const g of GROUPS) {
  const rules = read(g.file).slice(g.base).filter((b) => !sel(b).startsWith('@keyframes'));
  const renames = keyframeRenames[g.scope];
  parts.push(banner(g.name, 'Scoped to ' + g.scope + ', in the source file\'s own order.'));
  for (const b of rules) {
    let text = scope(dedent(b), g.scope);
    for (const [oldName, newName] of Object.entries(renames)) {
      text = text.replace(new RegExp('\\b' + oldName + '\\b', 'g'), newName);
    }
    parts.push(tokenize(text));
  }
  console.error(`${g.scope}: ${rules.length} rules`);
}

// ---------------------------------------------------------------------------
// assets/mobile.css — the responsive layer every source page links AFTER its
// own <style> block, so its equal-specificity rules win without !important.
//
// Scoping the page blocks gave each of their selectors one extra class of
// specificity, so an unscoped copy of this sheet would now LOSE those ties.
// Prefixing it with :is(<every page scope>) — specificity of one class — gives
// it exactly the same +1, restoring every relative precedence, and one copy
// still covers all six page groups. Selectors rooted at html/body/:root are
// left alone: those elements sit outside the scoped wrapper, and their only
// competition is the unscoped reset above, which they already outrank by order.
// ---------------------------------------------------------------------------
const ALL_SCOPES = ':is(' + GROUPS.map((g) => g.scope).join(',') + ')';

function scopeMobile(block) {
  const [comments, rule] = splitLeadingComments(block);
  if (comments.trim()) return comments.trim() + '\n' + scopeMobile(rule);
  const s = sel(rule);
  const body = rule.slice(rule.indexOf('{'));
  if (s.startsWith('@media') || s.startsWith('@supports')) {
    const inner = blocks(body.slice(1, body.lastIndexOf('}')))
      .map(scopeMobile)
      .join('\n\n');
    return s + ' {\n' + inner.replace(/^(?=.)/gm, '  ') + '\n}';
  }
  const scoped = s.split(',').map((p) => scopeOne(p, ALL_SCOPES)).join(',\n');
  return scoped + ' ' + body;
}

const mobileRules = blocks(fs.readFileSync(SRC + '/assets/mobile.css', 'utf8'));
parts.push(banner(
  'Responsive layer',
  'assets/mobile.css, which every source page links after its own <style>.\n' +
  'Scoped to every page wrapper at once so it keeps the specificity ties it\n' +
  'was written to win.'
));
for (const b of mobileRules) parts.push(tokenize(scopeMobile(b)));
console.error(`mobile.css: ${mobileRules.length} rules`);

parts.push('');
fs.writeFileSync(__dirname + '/../app/globals.css', parts.join('\n\n'));
