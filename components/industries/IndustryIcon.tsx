import type { IndustryIconKey } from '@/lib/industries-data';

/**
 * The six line-art industry marks, drawn on a 24-grid so they sit optically
 * level with the existing lucide-style icons used elsewhere in the header.
 *
 * `stroke` is passed as an attribute rather than a CSS variable because these
 * are also rendered inside inline styles, where a `var()` fed from a JS string
 * does not resolve reliably.
 */
const PATHS: Record<IndustryIconKey, React.ReactNode> = {
  retail: (
    <>
      <path d="M3 9h18l-1.2 10.2a2 2 0 0 1-2 1.8H6.2a2 2 0 0 1-2-1.8Z" />
      <path d="M3 9 5.2 4.4A1.6 1.6 0 0 1 6.7 3.5h10.6a1.6 1.6 0 0 1 1.5.9L21 9" />
      <path d="M9 13a3 3 0 0 0 6 0" />
    </>
  ),
  education: (
    <>
      <path d="M12 3.6 22 8.4l-10 4.8L2 8.4Z" />
      <path d="M6.2 10.9v4.9c0 1.7 2.6 3.1 5.8 3.1s5.8-1.4 5.8-3.1v-4.9" />
      <path d="M21 9.1v5.3" />
    </>
  ),
  realestate: (
    <>
      <path d="M3 20.5V9.7l6.2-4.2 6.2 4.2v10.8" />
      <path d="M15.4 20.5H21V12l-5.6-2.3" />
      <path d="M7.3 20.5v-4.4h3.8v4.4" />
      <path d="M7.4 11.6h3.6" />
    </>
  ),
  healthcare: (
    <>
      <path d="M12 20.6S3.8 15.9 3.8 10.2A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 8.2 3.2c0 5.7-8.2 10.4-8.2 10.4Z" />
      <path d="M3.9 13.2h3.6l1.6-2.7 2 4.8 1.7-3.2h3.3" />
    </>
  ),
  finance: (
    <>
      <path d="M3.5 7.6A2 2 0 0 1 5.5 5.6h11a2 2 0 0 1 2 2v1.1" />
      <path d="M3.5 7.6v9.1a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6.3a1.4 1.4 0 0 0-1.4-1.4H5.3a1.8 1.8 0 0 1-1.8-1.8Z" />
      <circle cx="16.4" cy="13.6" r="1.15" />
    </>
  ),
  logistics: (
    <>
      <path d="M2.6 6.6h10.2v9.9H2.6z" />
      <path d="M12.8 10.1h3.6l3 3v3.4h-6.6z" />
      <circle cx="7" cy="18.4" r="1.9" />
      <circle cx="17" cy="18.4" r="1.9" />
    </>
  ),
};

export default function IndustryIcon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.6,
}: {
  name: IndustryIconKey;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {PATHS[name]}
    </svg>
  );
}
