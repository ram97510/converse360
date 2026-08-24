import type { Metadata } from 'next';
import Hx from '@/components/Hx';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'FAQ — Converse360',
  description: 'Ten things business owners ask us most about Converse360.',
};

export default function FaqPage() {
  return (
    <PageShell scope="standard">
      <AnnouncementBar />
      <Header />
      <section style={{ background: "var(--color-surface)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,7vw,84px) clamp(20px,4vw,32px)", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.06", marginBottom: "20px", maxWidth: "22em", marginLeft: "auto", marginRight: "auto", textWrap: "balance" }}>
            {' '}Everything You Need to Know, Before You Start</h1>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: "1.65", color: "var(--color-text-muted)", maxWidth: "42em", marginLeft: "auto", marginRight: "auto" }}>
            {' '}Find clear answers to common questions about WhatsApp Business, AI agents, customer conversations, team
            inboxes, Meta integration, data security, and getting started with Converse360.{' '}
          </p>
        </div>
      </section>

      <section id="faq" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,6.5vw,80px) clamp(20px,4vw,32px)" }}>
        <div style={{ borderTop: "1px solid var(--color-divider)", maxWidth: "60em", margin: "0 auto" }}>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>Is Converse360 an official WhatsApp API provider?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Yes. We set you
              up on the official WhatsApp Business Platform through Meta. Your number stays safe and your account stays
              compliant.</p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>Do I need a developer to set this up?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>No. Our team
              handles the setup and verification. After that, everything — flows, replies, broadcasts — is built by
              clicking, not coding.</p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>Is the AI agent included, or billed separately?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>The AI agent is
              part of the Growth and Scale plans. On Starter it can be added on. WhatsApp&#39;s own per-message charges
              from Meta are billed at actual cost.</p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>Can I use this for Instagram and my website too?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Yes. Instagram
              DMs and your website chat land in the same inbox, with the same AI agent and the same pipeline.</p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>How is ad spend connected to real sales?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Every chat that
              starts from an ad carries that ad&#39;s name with it. When the deal is won, you can see which ad brought
              it in.</p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>How long does it take to go live?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Most businesses
              are live within a few days. The wait is usually Meta&#39;s number verification, not the setup on our side.{' '}
            </p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>Can I keep my existing WhatsApp number?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>In most cases
              yes. If the number is already on the WhatsApp Business app, we help you migrate it so your chat history
              stays with your customers.</p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>What happens when the AI cannot answer?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>It hands the
              conversation to your team with the full history attached. You decide which topics it should never answer
              on its own.</p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>Can more than one person reply from the same number?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Yes. Your whole
              team works from one inbox, chats can be assigned, and two people never end up replying to the same
              customer.</p>
          </details>
          <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
            <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "17.5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ flex: "1" }}>Is my customer data safe?</span>
              <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
            </summary>
            <p style={{ fontSize: "15.5px", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Your
              conversations and contacts stay in your account. We do not sell data, and you can request deletion at any
              time.</p>
          </details>
        </div>
      </section>

      <section style={{ background: "var(--brand)", color: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,6.5vw,76px) clamp(20px,4vw,32px)", display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", gap: "24px", textAlign: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(24px,3.2vw,34px)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "10px" }}>
              {' '}Still have a question?</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)" }}>Ask us directly. We usually reply within one
              business day.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Hx link className="btn-fx btn-fx-dark" href="/contact" style={{ background: "var(--color-bg)", color: "var(--color-text)", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "var(--color-surface)" }}>Contact us</Hx>
            <Hx link className="btn-fx" href="/pricing" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "500", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "rgba(255,255,255,0.12)" }}>See pricing</Hx>
          </div>
        </div>
      </section>
      <Footer id="about" />
    </PageShell>
  );
}
