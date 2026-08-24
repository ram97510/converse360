# Converse360 — Next.js site

The Converse360 site, ported from the eleven canvas HTML files in the parent
directory (`../*.html`) to Next.js 16 (App Router) + TypeScript + Tailwind v4.

The port is **visually identical** to the design. Every page is compared against
its source with full-page screenshots at 1440 / 1024 / 900 / 760 / 640 / 375 px,
and the behaviour of every interactive piece is compared against the source too.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Routes

| Route | Source |
| --- | --- |
| `/` | `index.html` |
| `/about` | `About.html` |
| `/blog` | `Blog.html` |
| `/blog/first-reply` | `Blog-first-reply.html` |
| `/blog/one-inbox` | `Blog-one-inbox.html` |
| `/blog/ad-attribution` | `Blog-ad-attribution.html` |
| `/contact` | `Contact.html` |
| `/faq` | `FAQ.html` |
| `/pricing` | `Pricing.html` |
| `/privacy` | `Privacy.html` |
| `/terms` | `Terms.html` |

All eleven prerender as static content.

## Generated files — do not hand-edit

The `.html` files remain the source of truth. These are produced from them by
`tools/regenerate.sh` and any manual edit is lost on the next run:

- `app/globals.css`
- `app/{faq,terms,privacy,about}/page.tsx`
- `app/blog/{first-reply,one-inbox,ad-attribution}/page.tsx`
- `components/{Footer,AnnouncementBar}.tsx`
- `components/landing/LandingBody.tsx`
- `components/pricing/PricingBody.tsx`
- `components/contact/ContactBody.tsx`
- `components/blog/BlogBody.tsx`

To change the design, edit the `.html` source (or, for the surrounding component
code, the templates in `tools/heads/`) and re-run:

```bash
cd tools && bash regenerate.sh
```

Hand-written files — `app/layout.tsx`, `app/page.tsx`, `app/blog/page.tsx`,
`app/{contact,pricing}/page.tsx`, `components/{Header,Hx,PageShell,StatAnimator,
RevealAnimator}.tsx`, `lib/*` — are safe to edit.

`regenerate.sh` slices each source page by line number. After any edit that
moves lines in a source file, re-derive the ranges with `node tools/ranges.js`
and paste them back into the `PAGES` table.

## Design tokens

Colours, fonts, radii and shadows are declared once:

- `app/globals.css` `:root` — the CSS custom properties every rule and inline
  style resolves through (`var(--brand)`, `var(--color-text)`, …)
- `lib/tokens.ts` — the same values as TS constants, for the places a value must
  reach JavaScript: SVG `fill`/`stroke` attributes and the selection logic that
  swaps colours
- the `@theme` block in `globals.css` — the same palette exposed to Tailwind

No component contains a raw brand hex. Changing `--brand` in `:root` restyles
every accent across all eleven pages.

## How the port works

The canvas files are not plain HTML — they depend on a runtime (`support.js`)
that interprets `{{ bindings }}`, `<sc-if>`, `<sc-for>`, `style-hover=""` and a
trailing `class Component extends DCLogic`. `tools/h2jsx.js` converts that markup
to JSX mechanically, so every style value is copied character-for-character
rather than retyped. The DCLogic state was ported by hand into the `*Body`
components and the `tools/heads/head.*.txt` templates they are built from.

Notes worth knowing:

- **The `_ds/` design system is inlined into `globals.css`.** None of its
  component classes are used, but every source page links it, so its *element*
  base layer is live — `body { font-size: 15px; line-height: 1.55 }`, the h1–h6
  sizes, and `img { display: block; max-width: 100% }` all come from there.
- **Each page's CSS is scoped** to `.page-landing` / `.page-about` / `.page-std`
  / `.legal-page` / `.page-blog` / `.page-post` via `components/PageShell.tsx`.
  The pages declare conflicting rules and order their `@media` blocks
  differently, so a flat merged sheet silently changed which rule won.
  `tools/collisions.js` lists the conflicts.
  Selectors that start *above* the wrapper — `html`, `body`, `:root`, and the
  landing page's `.reveal-on`, which its script puts on `documentElement` — are
  anchored first and scoped second (`.reveal-on .page-landing [data-reveal]`),
  because prefixing them outright matches nothing.
- **`assets/mobile.css`**, which every source page links *after* its own
  `<style>`, is appended last and scoped to all six wrappers at once with
  `:is(…)`. That is one class of specificity, the same amount every page rule
  gained, so the ties it was written to win it still wins.
- **Tailwind ships its theme but not its utilities.** Tailwind derives utilities
  by scanning source text, and this design's own class vocabulary collides with
  it — `col-span-2`, `col-span-3`, `container`, `transition`, `filter`,
  `shadow`, `border`, `uppercase`, `relative`, `grid`, `flex` were all emitted
  as real rules. Layer order hid most of it, but only where a page rule existed:
  About declares `.what-we-do-card.col-span-3` solely inside
  `@media (min-width: 992px)`, so below that width Tailwind's `.col-span-3` was
  the only rule left and the "What we do" grid grew a third column. The design
  uses no Tailwind utility anywhere; see the comment at the top of
  `tools/globals.head.css` before turning them back on.
- **Fonts load from the same Google Fonts URL the sources use**, not `next/font`.
  Google serves that request as four instances (300/400/500/700) variable only
  along the optical-size axis, so `font-weight: 600` resolves to 700 — which is
  what the approved design looks like. `next/font` can express a fixed weight
  list or a continuous variable range, but not both, and either choice shifts
  glyph widths enough to rewrap text. See the comment in `app/layout.tsx`.
- **`Hx`** (`components/Hx.tsx`) reproduces the runtime's `style-hover` /
  `style-focus` attributes.
- **`StatAnimator`** is a direct port of the source's `initStatAnimation()`
  count-up (2000 ms, cubic ease-out, IntersectionObserver at threshold 0.1).
- **`RevealAnimator`** is a direct port of `initRevealAnimation()` — the
  IntersectionObserver, the scroll sweep for anything already scrolled past, and
  the 1500 ms interval backstop. Landing page only; it is the one page with
  `data-reveal` markup.
- **The landing page's hero typewriter, feature tabs and everyday-features rail**
  are ported with the source's own timings: 120 ms per typed character, 1800 ms
  held, 60 ms per deleted character, 400 ms between phrases; 5000 ms per feature
  tab and 6000 ms per rail item, both restarting when the visitor picks one.
- **`index.html` carries a stray second `</section>`** after the testimonials.
  An HTML parser discards a closing tag that matches nothing open, so the design
  as rendered is unaffected; `h2jsx.js` drops it the same way and warns.
- The contact form is client-side only, exactly as in the source: submitting
  reveals the confirmation and posts nowhere.

## Verifying a change

`tools/verify/` holds the harness used to validate the port. It needs
`playwright-core`, `pngjs` and `pixelmatch`, and a static server for the
originals:

```bash
npx http-server -p 3399 ..     # serves the .html sources
npm run build && npx next start -p 3311

node tools/verify/interact.js               # behaviour, orig vs port
bash tools/verify/compare-all.sh            # screenshot + pixel-diff every page
node tools/verify/probe.js <url> <selector> # box + computed styles for one element
```

`interact.js` runs each check against both the source page and the ported route
and compares the two, so a check cannot pass by asserting something that is also
broken in the source.

Note: `next start` serves the build that was on disk when it started. Stop it
before rebuilding, or it keeps serving prerendered HTML that points at chunk
names the new build no longer has.
