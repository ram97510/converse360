import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Converse360 — One inbox. Every customer. More sales.',
  description:
    'Stop switching between apps and missing important conversations. Manage WhatsApp, Instagram, and website leads from one AI-powered inbox built for faster conversions.',
  icons: { icon: '/assets/converse360-logo.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are loaded through the exact stylesheet URL the source pages use,
          rather than next/font, because the two are not interchangeable here.

          Google serves this request as FOUR font-face instances (300/400/500/700),
          each variable only along the optical-size axis. Nothing declares 600, so
          every `font-weight: 600` in the design resolves by CSS font matching to
          700 — which is what the approved design actually looks like.

          next/font cannot reproduce that: it accepts either a fixed weight list
          (losing the opsz axis, which shifts glyph widths enough to rewrap
          paragraphs at the narrow breakpoints) or a continuous variable range
          (where 600 renders as a real 600 and every 600-weight element comes out
          ~2px narrower, enough to stop the About hero's badge row from wrapping).
          Requesting both together is rejected.

          Trade-off: this costs a render-blocking request to Google's CDN instead
          of self-hosted, preloaded font files. Fidelity was the requirement.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Manrope:wght@600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
