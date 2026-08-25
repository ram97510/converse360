import type { Metadata } from 'next';
import Hx from '@/components/Hx';
import { BRAND } from '@/lib/tokens';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import StatAnimator from '@/components/StatAnimator';

export const metadata: Metadata = {
  title: 'About — Converse360',
  description: 'Agency-made, product-driven. Why businesses choose Converse360.',
};

export default function AboutPage() {
  return (
    <PageShell scope="about">
      <StatAnimator />
      <AnnouncementBar />
      <Header />
      <section style={{ background: "linear-gradient(180deg,#F5FAF7 0%,var(--color-bg) 72%)", color: "var(--color-text)", position: "relative", overflow: "hidden" }}>
        {/* Decorative elements */}
        <span aria-hidden="true" style={{ position: "absolute", right: "6%", top: "22%", width: "64px", height: "64px", backgroundImage: "radial-gradient(#A5D8BC 1.2px,transparent 1.2px)", backgroundSize: "10px 10px", opacity: "0.55" }}></span>
        <span aria-hidden="true" style={{ position: "absolute", left: "6%", bottom: "18%", width: "52px", height: "52px", backgroundImage: "radial-gradient(#BFD6F7 1.2px,transparent 1.2px)", backgroundSize: "10px 10px", opacity: "0.45" }}></span>

        <div style={{ position: "relative", maxWidth: "1440px", margin: "0 auto", padding: "clamp(52px,7.5vw,96px) clamp(20px,4vw,32px) clamp(52px,7vw,86px)" }}>
          <div className="ab-hero" style={{ maxWidth: "920px", margin: "0 auto", textAlign: "center" }}>

            <h1 style={{ fontSize: "var(--fs-hero)", fontWeight: "var(--fw-hero)", letterSpacing: "-0.04em", lineHeight: "1.06", color: "var(--color-text)", marginBottom: "22px", textWrap: "balance" }}>
              {' '}We help businesses turn <span style={{ color: "var(--brand)" }}>everyday conversations</span> into real
              growth.{' '}
            </h1>

            <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.65", color: "var(--color-text-muted)", maxWidth: "54em", margin: "0 auto 16px", textWrap: "pretty" }}>
              {' '}We build smart WhatsApp and website chat automation that lets companies respond to customers instantly,
              around the clock — without adding to their support workload.</p>
            <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.65", color: "var(--color-text-muted)", maxWidth: "54em", margin: "0 auto 16px", textWrap: "pretty" }}>
              {' '}FAQs, lead qualification, orders, updates, or guiding a customer through a purchase — Converse360 puts an
              always-on, intelligent chat assistant to work so no message ever goes unanswered.</p>

            {/* Badge row */}
            <div className="ab-hero-badges" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <span className="ab-chip">
                <img src="/assets/meta-mark.png" alt="" style={{ height: "18px", width: "auto" }} /> Meta Tech Provider{' '}
              </span>
              <span className="ab-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg> 24/7 AI Automation{' '}
              </span>
              <span className="ab-chip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg> Enterprise Security{' '}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* OUR ROOTS & AGENCY FOUNDATION WITH METRICS & IMAGE */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(20px,4vw,32px) clamp(50px,7vw,90px)" }}>
          <div className="ab-roots-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,64px)", alignItems: "center", paddingBottom: "clamp(32px,4vw,48px)" }}>
            <div>
              <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "800", letterSpacing: "-0.035em", lineHeight: "1.15", textWrap: "balance", marginBottom: "20px", textAlign: "left" }}>
                {' '}Agency-Made, Product-Driven.</h2>
              <div style={{ borderLeft: "3px solid var(--brand)", paddingLeft: "clamp(16px,2vw,22px)" }}>
                <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.7", color: "var(--color-text-muted)" }}><img src="/assets/converse360-logo.png" alt="Converse360" style={{ height: "22px", width: "auto", display: "inline-block", verticalAlign: "-4px", marginRight: "4px" }} /> operates
                  under <strong>Conceps Media Works</strong>, a Coimbatore-based branding, advertising, and digital
                  media agency with 18+ years of experience helping brands grow through creative strategy and
                  technology.</p>
                <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.7", color: "var(--color-text-muted)", marginTop: "12px" }}>That
                  heritage shapes how we build Converse360 solutions that aren't just technically sound, but designed
                  with the same brand-first thinking that has powered 100+ businesses we've worked with over the years.{' '}
                </p>
              </div>
            </div>

            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "20px", padding: "clamp(24px,3vw,36px)", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "14px", padding: "14px 18px", marginBottom: "24px", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
                <img src="/assets/meta-tech-provider.png" alt="Meta Tech Provider" style={{ height: "38px", width: "auto", display: "block" }} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--color-text)" }}>Meta Official Business Partner</div>
                  <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)" }}>Official WhatsApp Cloud API Access</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,3.5vw,42px)", fontWeight: "800", color: "var(--brand)", lineHeight: "1" }}>
                    {' '}18+</div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "8px", fontWeight: "500" }}>Years of agency experience{' '}
                  </div>
                </div>
                <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,3.5vw,42px)", fontWeight: "800", color: "var(--color-text)", lineHeight: "1" }}>
                    {' '}100+</div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "8px", fontWeight: "500" }}>Businesses worked with</div>
                </div>
                <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,3.5vw,42px)", fontWeight: "800", color: "var(--color-text)", lineHeight: "1" }}>
                    {' '}24/7</div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "8px", fontWeight: "500" }}>Always-on chat assistant{' '}
                  </div>
                </div>
                <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,3.5vw,42px)", fontWeight: "800", color: "var(--brand)", lineHeight: "1" }}>
                    {' '}3</div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "8px", fontWeight: "500" }}>Channels, one unified inbox{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO SECTION — PREMIUM CARD GRID */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(20px,4vw,32px)" }}>

          <div style={{ maxWidth: "52em", margin: "0 auto clamp(36px,5vw,56px)", textAlign: "center" }}>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "800", letterSpacing: "-0.035em", lineHeight: "1.15", marginBottom: "14px", color: "var(--color-text)" }}>
              {' '}What We Do</h2>
            <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.7", color: "var(--color-text-muted)", margin: "0" }}>
              {' '}Five ways we put conversations to work for your business — designed for maximum conversion and engagement.{' '}
            </p>
          </div>

          <div className="what-we-do-grid">
            {/* Card 1: WhatsApp Chat Automation (spans 3 columns = 50% width) */}
            <div className="what-we-do-card col-span-3">
              <div className="what-we-do-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <span className="what-we-do-tag">WhatsApp Official API</span>
              <h3 className="what-we-do-title">WhatsApp Chat Automation</h3>
              <p className="what-we-do-desc">Automate customer replies, order updates, appointment reminders, and support on
                WhatsApp Business safely and reliably.</p>

            </div>

            {/* Card 2: Website Chat Automation (spans 3 columns = 50% width) */}
            <div className="what-we-do-card col-span-3">
              <div className="what-we-do-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <span className="what-we-do-tag">Website Widget</span>
              <h3 className="what-we-do-title">Website Chat Automation</h3>
              <p className="what-we-do-desc">A smart chat assistant embedded on your website to capture leads and answer
                visitor questions in real time 24/7.</p>

            </div>

            {/* Card 3: Custom Conversation Flows (spans 2 columns = 33.3% width) */}
            <div className="what-we-do-card col-span-2">
              <div className="what-we-do-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.5" y1="10.5" x2="15.5" y2="6.5"></line>
                  <line x1="8.5" y1="13.5" x2="15.5" y2="17.5"></line>
                </svg>
              </div>
              <span className="what-we-do-tag">Custom Flows</span>
              <h3 className="what-we-do-title">Custom Conversation Flows</h3>
              <p className="what-we-do-desc">Tailored chat journeys built around your business — from FAQs to lead
                qualification, stock check, and post-sale support.</p>

            </div>

            {/* Card 4: Seamless Handover (spans 2 columns = 33.3% width) */}
            <div className="what-we-do-card col-span-2">
              <div className="what-we-do-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span className="what-we-do-tag">Human Handover</span>
              <h3 className="what-we-do-title">Seamless Handover</h3>
              <p className="what-we-do-desc">Smooth escalation to a human team member whenever a conversation needs personal
                attention or custom closing.</p>

            </div>

            {/* Card 5: Marketing Broadcasts (spans 2 columns = 33.3% width, and full-width on tablet) */}
            <div className="what-we-do-card col-span-2 col-span-last-tablet">
              <div className="what-we-do-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </div>
              <span className="what-we-do-tag">Bulk Messaging &amp; Analytics</span>
              <h3 className="what-we-do-title">Marketing Broadcasts</h3>
              <p className="what-we-do-desc">Send bulk WhatsApp campaigns, offers, product launches, and updates to your
                customer list in one go, with real-time tracking.</p>

            </div>
          </div>

        </div>
      </section>

      {/* OUR APPROACH SECTION */}
      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(20px,4vw,32px)" }}>
          <div className="approach-layout">
            {/* Left side: Image */}
            <div className="approach-image-box">
              <img src="/assets/our-approach.jpg" alt="Converse360 Creative Design Session" />
            </div>

            {/* Right side: Content */}
            <div className="approach-content">
              <h2 className="approach-title">Our Approach</h2>
              <p className="approach-text">
                {' '}We believe automation should feel <span style={{ color: "var(--brand)", fontWeight: "700" }}>human, not
                  robotic</span>. Every chat flow we build starts with understanding your customers, your tone of voice,
                and your business goals — then we design around that, backed by the creative and strategic expertise of
                the Conceps Media Works team.{' '}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BUSINESSES CHOOSE CONVERSE360 & FEATURE SHOWCASE */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(20px,4vw,32px)" }}>

          <div style={{ marginBottom: "clamp(36px,5vw,56px)", textAlign: "center" }}>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "800", letterSpacing: "-0.035em", color: "var(--color-text)" }}>
              {' '}Why Businesses Choose Converse360</h2>
          </div>

          <div className="why-choose-grid">
            {/* Left Column: Two stacked cards */}
            <div className="why-choose-col why-choose-left">
              {/* Real-time Analytics */}
              <div className="why-choose-card">
                <div className="why-choose-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <h3 className="why-choose-card-title">Real-time Analytics</h3>
                <p className="why-choose-card-text">Get clear insights and analytics to make better and faster decisions for
                  your brand.</p>
              </div>

              {/* Customizable Reports */}
              <div className="why-choose-card">
                <div className="why-choose-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="why-choose-card-title">Customizable Reports</h3>
                <p className="why-choose-card-text">Create automated reports adapted to your specific business needs and
                  timelines.</p>
              </div>
            </div>

            {/* Middle Column: Tall image showcase */}
            <div className="why-choose-col why-choose-middle">
              <div className="why-choose-image-container">
                <img src="/assets/why-choose-us.jpg" alt="Converse360 Dashboard and Business Analysis" />
              </div>
            </div>

            {/* Right Column: Two stacked cards */}
            <div className="why-choose-col why-choose-right">
              {/* Accessible Everywhere */}
              <div className="why-choose-card">
                <div className="why-choose-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <h3 className="why-choose-card-title">Accessible Everywhere</h3>
                <p className="why-choose-card-text">Manage your activity and chat with customers easily from either your
                  computer or mobile device.</p>
              </div>

              {/* Advanced Security */}
              <div className="why-choose-card">
                <div className="why-choose-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 11 11 13 15 9"></polyline>
                  </svg>
                </div>
                <h3 className="why-choose-card-title">Advanced Security</h3>
                <p className="why-choose-card-text">Your critical customer data is protected with the highest enterprise-level
                  standards.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section style={{ background: "var(--brand)", color: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,6.5vw,76px) clamp(20px,4vw,32px)", display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", gap: "24px", textAlign: "center" }}>
          <div>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "10px" }}>Your
              next reply could be automatic.</h2>
            <p style={{ fontSize: "var(--fs-lede)", color: "rgba(255,255,255,0.9)" }}>Fifteen minutes, your questions answered, no
              slides.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Hx link className="btn-fx btn-fx-dark" href="/book-a-demo" style={{ background: "var(--color-bg)", color: "var(--color-text)", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "var(--color-surface)" }}>Book a Free Demo</Hx>
            <Hx link className="btn-fx" href="/pricing" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "500", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "rgba(255,255,255,0.12)" }}>Pricing</Hx>
          </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
