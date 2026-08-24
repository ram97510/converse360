'use client';

import { useState } from 'react';
import Hx from '@/components/Hx';
import { BRAND_600, BRAND_700 } from '@/lib/tokens';

/**
 * The contact page body.
 *
 * Client-side only, exactly as the source: submitting the form does not post
 * anywhere, it just reveals the confirmation line beneath the button.
 */
export default function ContactBody() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section style={{ background: "var(--color-surface)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,32px)", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.06", marginBottom: "20px", maxWidth: "18em", marginLeft: "auto", marginRight: "auto", textWrap: "balance" }}>
            {' '}We'd love to hear from you.</h1>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: "1.65", color: "var(--color-text-muted)", maxWidth: "44em", marginLeft: "auto", marginRight: "auto" }}>
            {' '}We'd love to hear
            from you. Whether you're exploring WhatsApp automation for the first time or looking to upgrade your
            existing chat setup, our team is here to help.</p>
        </div>
      </section>

      <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,6.5vw,80px) clamp(20px,4vw,32px)" }}>
        <div style={{ marginBottom: "clamp(28px,3.4vw,40px)", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px,3.2vw,32px)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "14px" }}>Tell
            us what you want to automate</h2>
          <p style={{ fontSize: "16.5px", lineHeight: "1.65", color: "var(--color-text-muted)", maxWidth: "44em", marginBottom: "30px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            {' '}Have a question, want a demo, or need a custom quote? Fill out the form below or reach out directly — we
            typically respond within one business day.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "stretch" }}>

          <div>


            <form onSubmit={submit} style={{ flex: "1", display: "flex", flexDirection: "column", gap: "18px", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "16px", padding: "clamp(22px,3vw,32px)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: "18px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="name" style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-text)" }}>Name</label>
                  <Hx as="input" id="name" name="name" type="text" placeholder="Your full name" style={{ font: "inherit", fontSize: "15.5px", color: "var(--color-text)", background: "var(--color-bg)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--color-divider)", borderRadius: "9px", padding: "13px 14px", width: "100%" }} focusStyle={{ borderColor: "var(--brand)", outline: "none" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="company" style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-text)" }}>Business/Company
                    Name</label>
                  <Hx as="input" id="company" name="company" type="text" placeholder="Company name" style={{ font: "inherit", fontSize: "15.5px", color: "var(--color-text)", background: "var(--color-bg)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--color-divider)", borderRadius: "9px", padding: "13px 14px", width: "100%" }} focusStyle={{ borderColor: "var(--brand)", outline: "none" }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: "18px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="whatsapp" style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-text)" }}>WhatsApp Number</label>
                  <Hx as="input" id="whatsapp" name="whatsapp" type="tel" placeholder="+91 00000 00000" style={{ font: "inherit", fontSize: "15.5px", color: "var(--color-text)", background: "var(--color-bg)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--color-divider)", borderRadius: "9px", padding: "13px 14px", width: "100%" }} focusStyle={{ borderColor: "var(--brand)", outline: "none" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="email" style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-text)" }}>Email Address</label>
                  <Hx as="input" id="email" name="email" type="email" placeholder="you@company.com" style={{ font: "inherit", fontSize: "15.5px", color: "var(--color-text)", background: "var(--color-bg)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--color-divider)", borderRadius: "9px", padding: "13px 14px", width: "100%" }} focusStyle={{ borderColor: "var(--brand)", outline: "none" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="goal" style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-text)" }}>What are you looking to
                  automate?</label>
                <Hx as="select" id="goal" name="goal" style={{ font: "inherit", fontSize: "15.5px", color: "var(--color-text)", background: "var(--color-bg)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--color-divider)", borderRadius: "9px", padding: "13px 14px", width: "100%" }} focusStyle={{ borderColor: "var(--brand)", outline: "none" }}>
                  <option>WhatsApp Chat</option>
                  <option>Website Chat</option>
                  <option>Both</option>
                  <option>Not Sure Yet</option>
                </Hx>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="message" style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--color-text)" }}>Message</label>
                <Hx as="textarea" id="message" name="message" rows={4} placeholder="Tell us a little about your business" style={{ font: "inherit", fontSize: "15.5px", color: "var(--color-text)", background: "var(--color-bg)", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--color-divider)", borderRadius: "9px", padding: "13px 14px", width: "100%", resize: "vertical" }} focusStyle={{ borderColor: "var(--brand)", outline: "none" }}></Hx>
              </div>
              <Hx as="button" className="btn-fx btn-fx-brand" type="submit" style={{ font: "inherit", cursor: "pointer", background: "var(--brand)", color: "var(--color-bg)", border: "0", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px", alignSelf: "flex-start" }} hoverStyle={{ background: "var(--color-text)" }}>Submit</Hx>
              {sent && (<>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(0,171,86,0.10)", borderRadius: "9px", padding: "13px 15px", fontSize: "14.5px", color: "var(--color-accent-700)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={BRAND_700} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>Thanks — we'll reply within one business day.{' '}
                </div>
              </>)}
            </form>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ border: "1px solid var(--color-divider)", borderRadius: "16px", padding: "clamp(24px,3vw,34px)" }}>
              <div style={{ fontSize: "15px", color: "var(--color-text)", marginBottom: "14px", lineHeight: "1.4", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <img src="/assets/converse360-logo.png" alt="Converse360" style={{ height: "30px", width: "auto", display: "block", flex: "none" }} />
                <span style={{ color: "var(--color-text-muted)", marginTop: "10px" }}>operated by <strong>Conceps Media Works</strong></span>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px 0", borderTop: "1px solid var(--color-divider)", lineHeight: "1.6" }}>
                <span style={{ width: "38px", height: "38px", borderRadius: "9px", background: "rgba(0,171,86,0.10)", display: "grid", placeItems: "center", flex: "none" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={BRAND_600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
                    <circle cx="12" cy="10" r="2.8"></circle>
                  </svg></span>
                <div style={{ minWidth: "0" }}>
                  <div style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", fontWeight: "500", marginBottom: "6px" }}>
                    {' '}Address</div>
                  <div style={{ fontSize: "16.5px", fontWeight: "500", lineHeight: "1.6", overflowWrap: "break-word" }}>2nd Floor,
                    38/4, opp. Hindustan College Road, Paul Harris Nagar, Coimbatore, Tamil Nadu 641028</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px 0", borderTop: "1px solid var(--color-divider)", lineHeight: "1.6" }}>
                <span style={{ width: "38px", height: "38px", borderRadius: "9px", background: "rgba(0,171,86,0.10)", display: "grid", placeItems: "center", flex: "none" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={BRAND_600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z">
                    </path>
                  </svg></span>
                <div style={{ minWidth: "0" }}>
                  <div style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", fontWeight: "500", marginBottom: "6px" }}>
                    {' '}Phone</div>
                  <Hx as="a" href="tel:7338855082" style={{ display: "block", fontSize: "16.5px", fontWeight: "500", lineHeight: "1.6", color: "var(--color-text)", whiteSpace: "nowrap" }} hoverStyle={{ color: "var(--brand)" }}>7338855082</Hx>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "20px 0", borderTop: "1px solid var(--color-divider)", lineHeight: "1.6" }}>
                <span style={{ width: "38px", height: "38px", borderRadius: "9px", background: "rgba(0,171,86,0.10)", display: "grid", placeItems: "center", flex: "none" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={BRAND_600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5"></rect>
                    <path d="m3 6.5 9 6.5 9-6.5"></path>
                  </svg></span>
                <div style={{ minWidth: "0" }}>
                  <div style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)", fontWeight: "500", marginBottom: "6px" }}>
                    {' '}Email</div>
                  <Hx as="a" href="mailto:hello@converse360.in" style={{ display: "block", fontSize: "16.5px", fontWeight: "500", lineHeight: "1.6", color: "var(--color-text)", overflowWrap: "break-word" }} hoverStyle={{ color: "var(--brand)" }}>hello@converse360.in</Hx>
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid var(--color-divider)", borderRadius: "16px", padding: "clamp(24px,3vw,34px)", marginTop: "20px", flex: "1", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "-0.02em", marginBottom: "16px" }}>Follow Us</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Hx as="a" className="btn-fx btn-fx-dark" href="https://www.instagram.com/converse.360/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--color-divider)", borderRadius: "999px", padding: "10px 18px", fontSize: "14.5px", fontWeight: "500", color: "var(--color-text)", background: "var(--color-bg)" }} hoverStyle={{ borderColor: "var(--brand)", color: "var(--brand)" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5"></rect>
                    <circle cx="12" cy="12" r="4"></circle>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle>
                  </svg>Instagram</Hx><Hx as="a" className="btn-fx btn-fx-dark" href="https://www.facebook.com/converse360/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", borderWidth: "1px", borderStyle: "solid", borderColor: "var(--color-divider)", borderRadius: "999px", padding: "10px 18px", fontSize: "14.5px", fontWeight: "500", color: "var(--color-text)", background: "var(--color-bg)" }} hoverStyle={{ borderColor: "var(--brand)", color: "var(--brand)" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 22v-8h2.9l.4-3.4h-3.3V8.4c0-1 .3-1.7 1.7-1.7h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.8H7.3V14h2.9v8z">
                    </path>
                  </svg>Facebook</Hx>
              </div>
            </div>


          </div>

        </div>
      </section>
    </>
  );
}
