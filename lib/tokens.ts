/**
 * Design tokens.
 *
 * These mirror the CSS custom properties declared in `app/globals.css` and exist
 * for the places a value has to reach JavaScript: the selection logic that swaps
 * colours (feature tabs, industry pills, testimonial cards, the dark rail) and
 * SVG `fill` / `stroke` attributes, which do not reliably accept a `var()` fed
 * from a JS string.
 *
 * Keep this file and the `:root` block in `globals.css` in step.
 */

// brand
export const BRAND = '#00AB56';
export const BRAND_600 = '#008F48';
export const BRAND_700 = '#00773c';
export const BRAND_BAR = '#00A651';
export const BRAND_DEEP = '#0F7A3D';
export const BRAND_LIGHT = '#3FD07E';
export const BRAND_PALE = '#8FE3B4';

// ink
export const INK = '#181818';
export const MUTED = '#4A4A4A';
export const SOFT = '#5A635E';
export const SUBTLE = '#6B736E';
export const DIM = '#7A8580';
export const FAINT = '#8B948F';
export const FAINTER = '#98A19C';

// ground
export const WHITE = '#FFFFFF';
export const SURFACE = '#F5F7F6';
export const SURFACE_2 = '#F8FAF9';
export const SURFACE_3 = '#F9FAFA';
export const DIVIDER = '#E5E8E6';

// channel colours
export const META_BLUE = '#1A73E8';
export const WHATSAPP = '#25D366';
export const WHATSAPP_BUBBLE = '#DCF8C6';
export const INSTAGRAM = '#E1306C';

// css-variable references, for use inside inline styles
export const V = {
  brand: 'var(--brand)',
  brand600: 'var(--color-accent-600)',
  ink: 'var(--color-text)',
  muted: 'var(--color-text-muted)',
  subtle: 'var(--color-text-subtle)',
  divider: 'var(--color-divider)',
  surface: 'var(--color-surface)',
  surface2: 'var(--color-surface-2)',
  bg: 'var(--color-bg)',
} as const;
