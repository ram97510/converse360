'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IndustryIcon from './industries/IndustryIcon';
import { INDUSTRY_LINKS } from '@/lib/industries-data';
import { WHITE } from '@/lib/tokens';

/**
 * The header's "Industries" item and its drop-down menu.
 *
 * Desktop: the panel is absolutely positioned against the sticky <header>, so
 * it lines up with the header's own container regardless of where the trigger
 * sits in the nav row. It opens on hover and on keyboard focus, and closes on a
 * short delay so the pointer can cross the gap between the trigger and the
 * panel without it snapping shut. Escape closes it and returns focus to the
 * trigger.
 *
 * Mobile (<=760px, the same breakpoint the burger nav uses): the panel drops
 * out of absolute positioning and becomes an accordion inside the open nav
 * drawer, toggled by tap rather than hover. `ind-mega` in globals.css carries
 * that switch.
 */
export default function IndustryMenu({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  // A navigation inside the panel must not leave it hanging open over the new
  // page — the panel is not unmounted by the client-side transition.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  // Focus leaving the whole group by keyboard should close it; a click inside
  // is handled by the pathname effect above.
  const onBlurCapture = (e: React.FocusEvent) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`ind-mega${open ? ' is-open' : ''}`}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onKeyDown={onKeyDown}
      onBlurCapture={onBlurCapture}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`ind-mega-trigger${active ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        onFocus={openNow}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: '0',
          padding: '0',
          font: 'inherit',
          fontSize: '14.5px',
          cursor: 'pointer',
          color: active || open ? 'var(--brand)' : 'var(--color-text-muted)',
          fontWeight: active ? 600 : 400,
        }}
      >
        Industries
        <svg
          className="ind-mega-chevron"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div id={panelId} className="ind-mega-panel" role="group" aria-label="Industries" hidden={!open}>
        <div className="ind-mega-inner">
          <div className="ind-mega-card">
            <div className="ind-mega-grid">
              <div>
                <div className="ind-mega-eyebrow">Industries</div>

                <div className="ind-mega-items">
                  {INDUSTRY_LINKS.map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      className={`ind-mega-item${pathname === item.href ? ' is-current' : ''}`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      <span className="ind-mega-tile" style={{ background: item.tintSoft, color: item.tint }}>
                        <IndustryIcon name={item.icon} size={19} />
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </div>

                <Link href="/industries" className="ind-mega-all">
                  View all industries
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h13m-5.5-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>

              <aside className="ind-mega-promo">
                <span aria-hidden="true" className="ind-mega-promo-orb" />
                <p className="ind-mega-promo-title">Book a one-to-one meeting with our product expert</p>
                <p className="ind-mega-promo-body">
                  Twenty minutes, mapped to how enquiries reach you today.
                </p>
                <Link href="/book-a-demo" className="ind-mega-promo-cta">
                  Book your demo
                  <span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={WHITE}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h13m-5.5-6 6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
