'use client';

import Hx from './Hx';
import Link from 'next/link';
import { BRAND_LIGHT, WHITE } from '@/lib/tokens';

/** The two-slide green announcement bar. Both slides are always rendered; the
 *  annA / annB keyframes in globals.css cross-fade them. */
export default function AnnouncementBar() {
  return (
    <div role="region" aria-label="Announcements" style={{ position: "relative", overflow: "hidden", background: "var(--color-accent-bar)", minHeight: "58px", display: "flex", alignItems: "center", padding: "9px clamp(16px,3vw,28px)" }}>
      <span aria-hidden="true" style={{ position: "absolute", right: "180px", top: "0", bottom: "0", width: "120px", backgroundImage: "repeating-linear-gradient(115deg,rgba(255,255,255,0.16) 0 1.5px,transparent 1.5px 12px)" }}></span>
      <span aria-hidden="true" style={{ position: "absolute", right: "-40px", top: "-40px", width: "150px", height: "150px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.14)" }}></span>
      <span aria-hidden="true" style={{ position: "absolute", right: "22px", top: "0", bottom: "0", width: "120px", backgroundImage: "radial-gradient(rgba(255,255,255,0.22) 1.2px,transparent 1.2px)", backgroundSize: "11px 11px" }}></span>
      <div style={{ position: "relative", display: "grid", width: "100%", maxWidth: "1440px", margin: "0 auto", alignItems: "center" }}>
        <div style={{ gridArea: "1/1", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px 14px", animation: "annA 11s ease-in-out infinite" }}>
          <span style={{ border: "1.5px solid rgba(255,255,255,0.75)", color: "var(--color-bg)", borderRadius: "999px", padding: "5px 15px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.11em", textTransform: "uppercase", whiteSpace: "nowrap", flex: "none" }}>Coming
            soon</span>
          <span aria-hidden="true" className="ann-rule" style={{ width: "1px", height: "22px", background: "rgba(255,255,255,0.28)", flex: "none" }}></span>
          <Hx link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "11px", color: "var(--color-bg)", fontSize: "clamp(12.5px,1.4vw,15px)", fontWeight: "700", letterSpacing: "-0.01em", position: "relative", overflow: "hidden" }} hoverStyle={{ color: "var(--color-accent-pale)" }}><span aria-hidden="true" className="ann-sweep"><span className="ann-slash ann-slash-1"></span><span className="ann-slash ann-slash-2"></span></span>Meta Ads
            Manager inside Converse360{' '}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND_LIGHT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg></Hx>
        </div>
        <div style={{ gridArea: "1/1", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px 14px", animation: "annB 11s ease-in-out infinite", opacity: "0" }}>
          <span style={{ border: "1.5px solid rgba(255,255,255,0.75)", color: "var(--color-bg)", borderRadius: "999px", padding: "5px 15px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.11em", textTransform: "uppercase", whiteSpace: "nowrap", flex: "none" }}>New</span>
          <span aria-hidden="true" className="ann-rule" style={{ width: "1px", height: "22px", background: "rgba(255,255,255,0.28)", flex: "none" }}></span>
          <Hx link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "11px", color: "var(--color-bg)", fontSize: "clamp(12.5px,1.4vw,15px)", fontWeight: "700", letterSpacing: "-0.01em", position: "relative", overflow: "hidden" }} hoverStyle={{ color: "var(--color-accent-pale)" }}><span aria-hidden="true" className="ann-sweep"><span className="ann-slash ann-slash-1"></span><span className="ann-slash ann-slash-2"></span></span>Build AI Agents
            on WhatsApp that qualify &amp; convert 24/7{' '}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND_LIGHT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg></Hx>
        </div>
      </div>
    </div>
  );
}
