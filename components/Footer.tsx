'use client';

import Hx from './Hx';
import Link from 'next/link';
import { BRAND } from '@/lib/tokens';

/**
 * The site footer, identical on every page. FAQ and Pricing anchor `#about`
 * at it, which is the `id` prop.
 */
export default function Footer({ id }: { id?: string }) {
  return (
    <footer id={id} style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg,#F7FAF8 0%,var(--color-bg) 78%)", color: "var(--color-text)" }}>
      <span aria-hidden="true" style={{ position: "absolute", top: "-120px", right: "-80px", width: "520px", height: "420px", background: "radial-gradient(50% 50% at 50% 50%, rgba(0,171,86,0.07) 0%, transparent 70%)", pointerEvents: "none" }}></span>
      <div className="foot-inner" style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "clamp(44px,6vw,56px) clamp(20px,4vw,32px) 24px" }}>
        <div className="foot-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) repeat(auto-fit,minmax(min(175px,100%),1fr))", gap: "clamp(28px,3.4vw,44px)", paddingBottom: "38px" }}>

          <div>
            <img src="/assets/converse360-logo.png" alt="Converse360" style={{ width: "100%", maxWidth: "186px", height: "auto", display: "block" }} />
            <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--color-text-muted)", maxWidth: "24em", marginTop: "18px" }}>One AI-powered
              inbox for WhatsApp, Instagram, and your website. Built for businesses that sell in conversations.</p>
            <div style={{ marginTop: "24px" }}>
              <img src="/assets/meta-tech-provider.png" alt="Meta Tech Provider" style={{ width: "100%", maxWidth: "170px", height: "auto", display: "block" }} />
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "11.5px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-faint)", marginBottom: "18px" }}>
              {' '}Quick links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              <Hx link href="/about" style={{ fontSize: "15px", color: "var(--color-text-muted)", width: "fit-content" }} hoverStyle={{ color: "var(--brand)" }}>About us</Hx>
              <Hx link href="/book-a-demo" style={{ fontSize: "15px", color: "var(--color-text-muted)", width: "fit-content" }} hoverStyle={{ color: "var(--brand)" }}>Book a free demo</Hx>
              <Hx link href="/contact" style={{ fontSize: "15px", color: "var(--color-text-muted)", width: "fit-content" }} hoverStyle={{ color: "var(--brand)" }}>Contact us</Hx>
              {/* <a href="#industries" style="font-size:15px;color:#4A4A4A;width:fit-content;"
                style-hover="color:#00AB56">Industries</a> */}
              <Hx link href="/faq" style={{ fontSize: "15px", color: "var(--color-text-muted)", width: "fit-content" }} hoverStyle={{ color: "var(--brand)" }}>FAQ</Hx>
              <Hx link href="/blog" style={{ fontSize: "15px", color: "var(--color-text-muted)", width: "fit-content" }} hoverStyle={{ color: "var(--brand)" }}>Blog</Hx>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "11.5px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-faint)", marginBottom: "18px" }}>
              {' '}Legal &amp; support</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              <Hx link href="/pricing" style={{ fontSize: "15px", color: "var(--color-text-muted)", width: "fit-content" }} hoverStyle={{ color: "var(--brand)" }}>Pricing</Hx>
              <Hx link href="/privacy" style={{ fontSize: "15px", color: "var(--color-text-muted)", width: "fit-content" }} hoverStyle={{ color: "var(--brand)" }}>Privacy policy</Hx>
              <Hx link href="/terms" style={{ fontSize: "15px", color: "var(--color-text-muted)", width: "fit-content" }} hoverStyle={{ color: "var(--brand)" }}>Terms &amp; conditions</Hx>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "11.5px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-faint)", marginBottom: "18px" }}>
              {' '}Get in touch</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                  <path d="M20 10.5c0 5.4-8 12-8 12s-8-6.6-8-12a8 8 0 0 1 16 0z"></path>
                  <circle cx="12" cy="10.3" r="2.8"></circle>
                </svg>
                <span style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--color-text-muted)" }}>2nd Floor, 38/4, opp. Hindustan College
                  Road, Paul Harris Nagar, Coimbatore, Tamil Nadu 641028</span>
              </div>
              <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                  <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6.5 3z">
                  </path>
                </svg>
                <Hx as="a" href="tel:7338855082" style={{ fontSize: "15px", fontWeight: "500", color: "var(--color-text-muted)", whiteSpace: "nowrap" }} hoverStyle={{ color: "var(--brand)" }}>7338855082</Hx>
              </div>
              <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                  <rect x="3" y="5" width="18" height="14" rx="2.5"></rect>
                  <path d="m3.5 6.5 8.5 6 8.5-6"></path>
                </svg>
                <Hx as="a" href="mailto:hello@converse360.in" style={{ fontSize: "15px", fontWeight: "500", color: "var(--color-text-muted)", overflowWrap: "break-word" }} hoverStyle={{ color: "var(--brand)" }}>hello@converse360.in</Hx>
              </div>
            </div>
          </div>

        </div>

        <div className="foot-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", paddingTop: "20px", borderTop: "1px solid var(--color-divider)" }}>
          <div style={{ fontSize: "15px", color: "var(--color-text-muted)" }}>© 2026 Converse360. All rights reserved.</div>
          <div className="foot-follow" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontSize: "15px", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>Follow us</span>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <a href="https://www.instagram.com/converse.360/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: "inline-flex", transition: "transform .2s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                  <defs>
                    <linearGradient id="instagram-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#instagram-grad)"></rect>
                  <circle cx="12" cy="12" r="4" stroke="url(#instagram-grad)"></circle>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#instagram-grad)" strokeWidth="3"></line>
                </svg>
              </a>

              <a href="https://www.facebook.com/converse360/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ display: "inline-flex", transition: "transform .2s ease" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" style={{ display: "block" }}>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
