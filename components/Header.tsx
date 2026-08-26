'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Hx from './Hx';
import IndustryMenu from './IndustryMenu';
import { INK } from '@/lib/tokens';

/**
 * The sticky header, identical on every page.
 *
 * Which item is marked as current is derived from the URL rather than passed
 * in by each page: the pages were duplicating that knowledge, and a new route
 * under an existing section (a second blog post, another industry) then had to
 * remember to declare it. `isActive` matches the section, so
 * `/industries/finance` lights the Industries item and `/blog/whatsapp-for-event-management`
 * lights Blog.
 *
 * The Industries item is its own client component because it owns a hover mega
 * menu; it is absolutely positioned against this <header>, which is already a
 * positioned element by virtue of `position: sticky`.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuClass = menuOpen ? ' is-open' : '';
  const toggleMenu = () => setMenuOpen((o) => !o);

  // usePathname can be null in some rendering contexts, so fall back to a
  // string rather than letting startsWith throw.
  const pathname = usePathname() ?? '';
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const linkStyle = { color: 'var(--color-text-muted)', fontWeight: '500' };
  const linkHover = { color: 'var(--brand)' };
  const activeStyle = { color: 'var(--brand)', fontWeight: '600' };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const on = isActive(href);
    return (
      <Hx
        link
        href={href}
        className={`nav-link${on ? ' is-active' : ''}`}
        aria-current={on ? 'page' : undefined}
        style={on ? activeStyle : linkStyle}
        hoverStyle={on ? undefined : linkHover}
      >
        {children}
      </Hx>
    );
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: '0',
        zIndex: '40',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-divider)',
      }}
    >
      <nav
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '14px clamp(20px,4vw,32px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'clamp(14px,2.5vw,32px)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/converse360-logo.png"
            alt="Converse360"
            style={{ height: '32px', width: 'auto', maxWidth: 'none', display: 'block' }}
          />
        </Link>
        <Hx
          as="button"
          type="button"
          className="nav-toggle btn-fx"
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'var(--color-divider)',
            borderRadius: '999px',
            padding: '9px 10px',
            cursor: 'pointer',
            lineHeight: '0',
          }}
          hoverStyle={{ borderColor: 'var(--brand)' }}
        >
          {!menuOpen && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={INK}
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16"></path>
            </svg>
          )}
          {menuOpen && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={INK}
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18"></path>
            </svg>
          )}
        </Hx>
        <div
          className={`nav-links${menuClass}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            fontSize: '18px',
            color: 'var(--color-text-muted)',
          }}
        >
          <IndustryMenu active={isActive('/industries')} />
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About us</NavLink>
        </div>
        <Hx
          link
          href="/contact"
          className={`nav-cta${menuClass} btn-fx btn-fx-brand`}
          aria-current={isActive('/contact') ? 'page' : undefined}
          style={{
            background: isActive('/contact') ? 'var(--color-text)' : 'var(--brand)',
            color: 'var(--color-bg)',
            fontSize: '18px',
            fontWeight: '500',
            padding: '10px 20px',
            borderRadius: '999px',
          }}
          hoverStyle={{ background: 'var(--color-text)' }}
        >
          Contact
        </Hx>
      </nav>
    </header>
  );
}
