'use client';

import { useState } from 'react';
import Hx from '@/components/Hx';
import { BRAND, WHITE, WHATSAPP } from '@/lib/tokens';

/**
 * The pricing page body.
 *
 * Ported from the source page's renderVals(): a monthly/yearly toggle where the
 * yearly price is the monthly one less 10%, rounded, formatted en-IN.
 */
export default function PricingBody() {
  const [yearly, setYearly] = useState(false);

  const y = yearly;
  const rupee = (n: number) => '\u20B9' + n.toLocaleString('en-IN');
  const monthly = [0, 1500, 3200, 9100];
  const price = (i: number) => (i === 0 ? '\u20B90' : rupee(Math.round(monthly[i] * (y ? 0.9 : 1))));

  const on = { bg: 'var(--color-bg)', fg: 'var(--color-text)', shadow: '0 2px 6px rgba(24,24,24,0.10)' };
  const off = { bg: 'transparent', fg: 'var(--color-text-muted)', shadow: 'none' };
  const m = y ? off : on;
  const yr = y ? on : off;

  const isMonthly = !y;
  const isYearly = y;
  const pickMonthly = () => setYearly(false);
  const pickYearly = () => setYearly(true);
  const mBg = m.bg, mFg = m.fg, mShadow = m.shadow;
  const yBg = yr.bg, yFg = yr.fg, yShadow = yr.shadow;

  // price(0) / 'Forever' / 'No card required' went with the free tier; the
  // source's renderVals() still computes them, but no card reads them now.
  const p1 = price(1);
  const p2 = price(2);
  const p3 = price(3);
  const u1 = y ? '/ month, billed yearly' : '/ month';
  const u2 = u1;
  const u3 = u1;
  const n1 = y ? 'Billed yearly' : 'Billed monthly';
  const n2 = n1;
  const n3 = n1;

  return (
    <>
      <section style={{ background: "var(--color-surface)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,7vw,84px) clamp(20px,4vw,32px)", textAlign: "center" }}>
          <h1 style={{ fontSize: "var(--fs-hero)", fontWeight: "var(--fw-hero)", letterSpacing: "-0.04em", lineHeight: "1.06", marginBottom: "20px", maxWidth: "18em", marginLeft: "auto", marginRight: "auto", textWrap: "balance" }}>
            {' '}Plans That Automate Your Business.</h1>
          <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.65", color: "var(--color-text-muted)", maxWidth: "42em", marginLeft: "auto", marginRight: "auto" }}>
            {' '}Pick the plan that
            fits how much you talk to customers. Every plan includes the unified inbox, the AI agent and official
            WhatsApp setup.</p>
        </div>
      </section>

      <section id="pricing" style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,8vw,84px) clamp(20px,4vw,32px)" }}>
          {/* <p style={{ fontSize: "14.5px", color: "var(--color-text-muted)", marginBottom: "28px", textAlign: "center" }}>Prices exclude WhatsApp&#39;s
            own per-message charges from Meta, billed at actual cost.</p> */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(30px,4vw,44px)" }}>
            <div role="tablist" aria-label="Billing period" style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "5px" }}>
              <button type="button" role="tab" aria-selected={isMonthly} onClick={pickMonthly} style={{ font: "inherit", cursor: "pointer", border: "0", borderRadius: "999px", padding: "10px 22px", fontSize: "14.5px", fontWeight: "600", background: mBg, color: mFg, boxShadow: mShadow }}>Monthly</button>
              <button type="button" role="tab" aria-selected={isYearly} onClick={pickYearly} style={{ font: "inherit", cursor: "pointer", border: "0", borderRadius: "999px", padding: "10px 22px", fontSize: "14.5px", fontWeight: "600", background: yBg, color: yFg, boxShadow: yShadow, display: "inline-flex", alignItems: "center", gap: "9px" }}>Yearly{' '}
                <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase", color: "#15803d", background: "#dcfce7", padding: "3px 7px", borderRadius: "4px", lineHeight: "1" }}>Save 10%</span></button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: "20px", alignItems: "stretch" }}>
            <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "14px", padding: "30px 26px", position: "relative", display: "flex", flexDirection: "column" }}>

              <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "700", marginBottom: "6px" }}>Basic</h3>
              <p style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-accent-600)", marginBottom: "20px" }}>Perfect for getting started{' '}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "clamp(26px,3vw,32px)", fontWeight: "800", letterSpacing: "-0.03em", fontFamily: "var(--font-heading)" }}>{p1}</span>
                <span style={{ fontSize: "13.5px", color: "var(--color-text-muted)" }}>{u1}</span>
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", marginTop: "8px", marginBottom: "22px" }}>{n1}</div>
              <Hx link className="btn-fx btn-fx-brand" href="/contact" style={{ display: "block", textAlign: "center", background: "var(--brand)", color: "var(--color-bg)", fontSize: "15px", fontWeight: "700", padding: "14px 18px", borderRadius: "999px", marginBottom: "24px" }} hoverStyle={{ background: "var(--color-text)" }}>Start for free</Hx>
              <div style={{ fontFamily: "Manrope, sans-serif", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "10px", padding: "14px 15px", marginBottom: "24px" }}>
                <div style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-600)", marginBottom: "12px" }}>
                  {' '}Per template message</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Marketing</span><span style={{ fontWeight: "600" }}>₹1.09</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Utility</span><span style={{ fontWeight: "600" }}>₹0.145</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Authentication</span><span style={{ fontWeight: "600" }}>₹0.145</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Service</span><span style={{ fontWeight: "600", color: "var(--color-accent-600)" }}>Free</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "14px" }}>
                {' '}Features</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text)", fontWeight: "600" }}>Everything to start
                    selling on WhatsApp</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Messaging speed: 40
                    messages/sec</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>1 owner + 5 free agents
                    included</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Smart audience
                    segregation</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Broadcasting &amp;
                    retargeting</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Smart campaign
                    manager</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Template message
                    APIs</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Multi-agent live
                    chat</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Agent transfer &amp;
                    monitoring</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Shopify &amp; WooCommerce
                    integrations</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Shared team inbox</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Create 2 audience
                    segments</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Free WhatsApp Business
                    API</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Free blue tick
                    application</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Click-to-WhatsApp ads
                    manager</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Unlimited contacts &amp;
                    unlimited service conversations</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Website chat
                    widget</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Delivery &amp; read
                    reports</span>
                </div>
              </div>
            </div>
            <div style={{ background: "var(--color-bg)", border: "2px solid var(--brand)", borderRadius: "14px", padding: "30px 26px", position: "relative", display: "flex", flexDirection: "column", boxShadow: "0 18px 44px rgba(0,171,86,0.14)" }}>
              <span style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: "var(--brand)", color: "var(--color-bg)", fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "999px", whiteSpace: "nowrap" }}>★
                Most popular</span>
              <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "700", marginBottom: "6px" }}>Pro</h3>
              <p style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-accent-600)", marginBottom: "20px" }}>Built for growing businesses{' '}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "clamp(26px,3vw,32px)", fontWeight: "800", letterSpacing: "-0.03em", fontFamily: "var(--font-heading)" }}>{p2}</span>
                <span style={{ fontSize: "13.5px", color: "var(--color-text-muted)" }}>{u2}</span>
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", marginTop: "8px", marginBottom: "22px" }}>{n2}</div>
              <Hx link className="btn-fx btn-fx-dark" href="/contact" style={{ display: "block", textAlign: "center", background: "var(--brand)", color: "var(--color-bg)", fontSize: "15px", fontWeight: "700", padding: "14px 18px", borderRadius: "999px", marginBottom: "24px" }} hoverStyle={{ background: "#000" }}>Start for free</Hx>
              <div style={{ fontFamily: "Manrope, sans-serif", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "10px", padding: "14px 15px", marginBottom: "24px" }}>
                <div style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-600)", marginBottom: "12px" }}>
                  {' '}Per template message</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Marketing</span><span style={{ fontWeight: "600" }}>₹1.09</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Utility</span><span style={{ fontWeight: "600" }}>₹0.145</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Authentication</span><span style={{ fontWeight: "600" }}>₹0.145</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Service</span><span style={{ fontWeight: "600", color: "var(--color-accent-600)" }}>Free</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "14px" }}>
                {' '}Features</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text)", fontWeight: "600" }}>All Basic features,
                    plus:</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Up to 100 tags &amp; 20
                    custom attributes</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Create 10 audience
                    segments</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Campaign scheduler</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Campaign click
                    tracking</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Smart agent
                    routing</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Campaign budget &amp;
                    analytics</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Project APIs</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Custom agent rules</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Carousel template click
                    tracking</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>CSV campaign
                    scheduler</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>User access
                    control</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Automatic failed message
                    retry</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Add time delay in
                    chatflow</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Add timeout in
                    chatflow</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>No-code chatbot
                    builder</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>WhatsApp catalog &amp;
                    in-chat payments</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Instagram DMs in the same
                    inbox</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Sales pipeline with deal
                    stages</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Ad-to-sale
                    attribution</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Team performance
                    reports</span>
                </div>
              </div>
            </div>
            <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "14px", padding: "30px 26px", position: "relative", display: "flex", flexDirection: "column" }}>

              <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "700", marginBottom: "6px" }}>Premium</h3>
              <p style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-accent-600)", marginBottom: "20px" }}>Built for businesses ready
                to scale</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "clamp(26px,3vw,32px)", fontWeight: "800", letterSpacing: "-0.03em", fontFamily: "var(--font-heading)" }}>{p3}</span>
                <span style={{ fontSize: "13.5px", color: "var(--color-text-muted)" }}>{u3}</span>
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", marginTop: "8px", marginBottom: "22px" }}>{n3}</div>
              <Hx link className="btn-fx btn-fx-brand" href="/contact" style={{ display: "block", textAlign: "center", background: "var(--brand)", color: "var(--color-bg)", fontSize: "15px", fontWeight: "700", padding: "14px 18px", borderRadius: "999px", marginBottom: "24px" }} hoverStyle={{ background: "var(--color-text)" }}>Start for free</Hx>
              <div style={{ fontFamily: "Manrope, sans-serif", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "10px", padding: "14px 15px", marginBottom: "24px" }}>
                <div style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-600)", marginBottom: "12px" }}>
                  {' '}Per template message</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Marketing</span><span style={{ fontWeight: "600" }}>₹1.09</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Utility</span><span style={{ fontWeight: "600" }}>₹0.145</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Authentication</span><span style={{ fontWeight: "600" }}>₹0.145</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--color-text-muted)" }}>Service</span><span style={{ fontWeight: "600", color: "var(--color-accent-600)" }}>Free</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "10.5px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "14px" }}>
                {' '}Features</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text)", fontWeight: "600" }}>All Pro features,
                    plus:</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Priority support</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Higher speed: 250
                    messages/sec</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>1 owner + 9 agents
                    included</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Number masking</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>250 tags &amp; 50
                    attributes</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Create 50 audience
                    segments</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Download reports</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Template TTL</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Turbo onboarding</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>1 webhook</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Message duplicate
                    contacts in CSV</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Multiple Meta-ad chatflow
                    trigger</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>AI Chat Agent —
                    ₹3,500/month, charged separately</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Dedicated onboarding
                    manager</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Custom conversation flows
                    built for you</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Multi-number &amp;
                    multi-brand support</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Data export on
                    request</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Uptime &amp; response
                    SLA</span>
                </div>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--color-text-muted)", fontWeight: "400" }}>Quarterly account
                    review</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(20px,4vw,32px) clamp(56px,8vw,84px)" }}>
          <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.035em", marginBottom: "14px", textAlign: "center" }}>
            {' '}Add only what you actually need</h2>
          <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.55", color: "var(--color-text-muted)", maxWidth: "40em", marginBottom: "32px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            {' '}Every add-on is a one-time purchase that never expires — no recurring charge, no forced upgrade. Buy them
            any time from your dashboard.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: "28px", marginBottom: "44px" }}>

            {/* ADD-ON 1: WHATSAPP NUMBER */}
            <Hx as="div" className="btn-fx" style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "20px", padding: "32px", position: "relative", display: "flex", flexDirection: "column", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", transition: "box-shadow .24s ease,transform .24s ease" }} hoverStyle={{ boxShadow: "0 20px 38px rgba(24,24,24,0.08)", transform: "translateY(-4px)" }}>



              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "linear-gradient(135deg,#ECFDF5 0%,#D1FAE5 100%)", border: "1px solid #A7F3D0", display: "grid", placeItems: "center", flex: "none" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2c-9 0-16.8-7.8-16.8-16.8a2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.27 1 .7 1.9 1.2 2.75a2 2 0 0 1-.5 2.15L8.25 10.4a15 15 0 0 0 5.4 5.4l1.2-1.2a2 2 0 0 1 2.15-.5c.85.5 1.75.93 2.75 1.2a2 2 0 0 1 1.7 2z">
                    </path>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "800", letterSpacing: "-0.02em", color: "var(--color-text)", marginBottom: "4px" }}>
                    {' '}Additional WhatsApp number</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "26px", fontWeight: "800", fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>₹2,299</span>
                    <span style={{ fontSize: "12.5px", color: "var(--color-text-dim)", fontWeight: "500" }}>/ number</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.6", color: "var(--color-text-soft)", marginBottom: "24px", flex: "1" }}>Add a separate WhatsApp
                Business identity to your account — useful for multiple brands, locations, or departments.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Connect any Indian or international number</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>No SIM card required after setup</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Available on every plan</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Each number is fully independent</span>
                </div>
              </div>

              <Hx link className="btn-fx btn-fx-brand btn-fx-arrow" href="/contact" style={{ background: "var(--brand)", color: "var(--color-bg)", fontSize: "15px", fontWeight: "700", padding: "14px", borderRadius: "999px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }} hoverStyle={{ background: "var(--color-text)" }}>Add number{' '}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </Hx>
            </Hx>

            {/* ADD-ON 2: EXTRA TEAM MEMBER */}
            <Hx as="div" className="btn-fx" style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "20px", padding: "32px", position: "relative", display: "flex", flexDirection: "column", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", transition: "box-shadow .24s ease,transform .24s ease" }} hoverStyle={{ boxShadow: "0 20px 38px rgba(24,24,24,0.08)", transform: "translateY(-4px)" }}>



              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)", border: "1px solid #93C5FD", display: "grid", placeItems: "center", flex: "none" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B5FD4" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "800", letterSpacing: "-0.02em", color: "var(--color-text)", marginBottom: "4px" }}>
                    {' '}Extra team member</h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "26px", fontWeight: "800", fontFamily: "var(--font-heading)", color: "var(--color-text)" }}>₹300</span>
                    <span style={{ fontSize: "12.5px", color: "var(--color-text-dim)", fontWeight: "500" }}>/ member</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.6", color: "var(--color-text-soft)", marginBottom: "24px", flex: "1" }}>Give another teammate
                their own seat in the shared inbox, with their own assignments and reply stats.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B5FD4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Full shared-inbox access for the seat</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B5FD4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Assign chats and track replies per agent</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B5FD4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Available on every plan</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "var(--color-text-muted)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1B5FD4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>Yours forever — no monthly renewal</span>
                </div>
              </div>

              <Hx link className="btn-fx btn-fx-brand btn-fx-arrow" href="/contact" style={{ background: "var(--brand)", color: "var(--color-bg)", fontSize: "15px", fontWeight: "700", padding: "14px", borderRadius: "999px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }} hoverStyle={{ background: "var(--color-text)" }}>Add members{' '}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </Hx>
            </Hx>

          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
            <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "700", letterSpacing: "-0.02em" }}>Message credits</h3>
            <span style={{ fontSize: "11.5px", color: "var(--color-accent-600)", background: "rgba(0,171,86,0.10)", borderRadius: "999px", padding: "5px 12px", whiteSpace: "nowrap" }}>never
              expires</span>
          </div>
          <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.55", color: "var(--color-text-muted)", maxWidth: "40em", marginBottom: "28px" }}>Top up your
            message allowance whenever you need it. Buy once — credits never expire.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(180px,100%),1fr))", gap: "18px" }}>

            {/* CARD 1: 50K */}
            <Hx as="div" className="btn-fx" style={{ position: "relative", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "16px", padding: "28px 18px 24px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", transition: "box-shadow .24s ease,transform .24s ease" }} hoverStyle={{ boxShadow: "0 12px 28px rgba(24,24,24,0.08)", transform: "translateY(-4px)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.035em", color: "var(--color-text)", lineHeight: "1" }}>
                {' '}50K</div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-dim)", marginTop: "5px", fontWeight: "500" }}>messages</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: "800", color: "var(--brand)", marginTop: "16px", lineHeight: "1" }}>
                {' '}₹999{' '}
              </div>
              <div style={{ fontFamily: "Manrope, sans-serif", display: "inline-block", fontSize: "11px", fontWeight: "600", color: "var(--color-text-soft)", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "4px 10px", marginTop: "12px", whiteSpace: "nowrap" }}>
                {' '}₹19.98 / 1K</div>
            </Hx>

            {/* CARD 2: 100K */}
            <Hx as="div" className="btn-fx" style={{ position: "relative", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "16px", padding: "28px 18px 24px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", transition: "box-shadow .24s ease,transform .24s ease" }} hoverStyle={{ boxShadow: "0 12px 28px rgba(24,24,24,0.08)", transform: "translateY(-4px)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.035em", color: "var(--color-text)", lineHeight: "1" }}>
                {' '}100K</div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-dim)", marginTop: "5px", fontWeight: "500" }}>messages</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: "800", color: "var(--brand)", marginTop: "16px", lineHeight: "1" }}>
                {' '}₹1,499</div>
              <div style={{ fontFamily: "Manrope, sans-serif", display: "inline-block", fontSize: "11px", fontWeight: "600", color: "var(--color-text-soft)", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "4px 10px", marginTop: "12px", whiteSpace: "nowrap" }}>
                {' '}₹14.99 / 1K</div>
            </Hx>

            {/* CARD 3: 250K (Popular) */}
            <Hx as="div" className="btn-fx" style={{ position: "relative", background: "var(--color-bg)", border: "2px solid var(--brand)", borderRadius: "16px", padding: "28px 18px 24px", textAlign: "center", boxShadow: "0 8px 24px rgba(0,171,86,0.08)", transition: "box-shadow .24s ease,transform .24s ease" }} hoverStyle={{ boxShadow: "0 16px 36px rgba(0,171,86,0.18)", transform: "translateY(-4px)" }}>
              <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "var(--brand)", color: "var(--color-bg)", fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "999px", whiteSpace: "nowrap", boxShadow: "0 4px 10px rgba(0,171,86,0.22)" }}>Popular</span>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.035em", color: "var(--color-text)", lineHeight: "1" }}>
                {' '}250K</div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-dim)", marginTop: "5px", fontWeight: "500" }}>messages</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: "800", color: "var(--brand)", marginTop: "16px", lineHeight: "1" }}>
                {' '}₹3,499</div>
              <div style={{ fontFamily: "Manrope, sans-serif", display: "inline-block", fontSize: "11px", fontWeight: "600", color: "#059669", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: "999px", padding: "4px 10px", marginTop: "12px", whiteSpace: "nowrap" }}>
                {' '}₹14.00 / 1K</div>
            </Hx>

            {/* CARD 4: 500K */}
            <Hx as="div" className="btn-fx" style={{ position: "relative", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "16px", padding: "28px 18px 24px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", transition: "box-shadow .24s ease,transform .24s ease" }} hoverStyle={{ boxShadow: "0 12px 28px rgba(24,24,24,0.08)", transform: "translateY(-4px)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.035em", color: "var(--color-text)", lineHeight: "1" }}>
                {' '}500K</div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-dim)", marginTop: "5px", fontWeight: "500" }}>messages</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: "800", color: "var(--brand)", marginTop: "16px", lineHeight: "1" }}>
                {' '}₹5,999</div>
              <div style={{ fontFamily: "Manrope, sans-serif", display: "inline-block", fontSize: "11px", fontWeight: "600", color: "var(--color-text-soft)", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "4px 10px", marginTop: "12px", whiteSpace: "nowrap" }}>
                {' '}₹12.00 / 1K</div>
            </Hx>

            {/* CARD 5: 1M */}
            <Hx as="div" className="btn-fx" style={{ position: "relative", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "16px", padding: "28px 18px 24px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", transition: "box-shadow .24s ease,transform .24s ease" }} hoverStyle={{ boxShadow: "0 12px 28px rgba(24,24,24,0.08)", transform: "translateY(-4px)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.035em", color: "var(--color-text)", lineHeight: "1" }}>
                {' '}1M</div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-dim)", marginTop: "5px", fontWeight: "500" }}>messages</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "20px", fontWeight: "800", color: "var(--brand)", marginTop: "16px", lineHeight: "1" }}>
                {' '}₹9,999</div>
              <div style={{ fontFamily: "Manrope, sans-serif", display: "inline-block", fontSize: "11px", fontWeight: "600", color: "var(--color-text-soft)", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "4px 10px", marginTop: "12px", whiteSpace: "nowrap" }}>
                {' '}₹10.00 / 1K</div>
            </Hx>

          </div>
        </div>
      </section>

      <section style={{ background: "var(--brand)", color: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,6.5vw,76px) clamp(20px,4vw,32px)", display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", gap: "24px", textAlign: "center" }}>
          <div>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "10px" }}>Not
              sure which plan fits?</h2>
            <p style={{ fontSize: "var(--fs-lede)", color: "rgba(255,255,255,0.85)" }}>Tell us how many customers you talk to and we will
              point you to the right one.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Hx link className="btn-fx btn-fx-dark" href="/contact" style={{ background: "var(--color-bg)", color: "var(--color-text)", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "var(--color-surface)" }}>Contact us</Hx>
            <Hx link className="btn-fx" href="/book-a-demo" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "500", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "rgba(255,255,255,0.12)" }}>Book a demo</Hx>
          </div>
        </div>
      </section>
    </>
  );
}
