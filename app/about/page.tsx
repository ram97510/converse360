import type { Metadata } from 'next';
import Hx from '@/components/Hx';
import { WHITE } from '@/lib/tokens';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import StatAnimator from '@/components/StatAnimator';

export const metadata: Metadata = {
  title: 'About — Converse360',
  description: 'Agency-made, product-driven. Why businesses choose Converse360.',
};

/**
 * The three things the agency heritage buys you, listed beside the story.
 *
 * Each was a stat tile in the old layout ("Meta Official Business Partner",
 * "24/7 always-on chat assistant", "3 channels, one unified inbox"); the row
 * form says what the number meant. The first icon fills its disc, the rest
 * sit on a tint — one accent, then supporting detail.
 */
const AGENCY_POINTS: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: 'Meta Official Partner',
    desc: 'Official WhatsApp Cloud API access, direct from Meta.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 11.2V12a8.5 8.5 0 1 1-5-7.8" />
        <path d="M21 4.4 12 13.5l-2.8-2.8" />
      </svg>
    ),
  },
  {
    title: 'Always-On Assistant',
    desc: 'A 24/7 chat assistant that answers the moment a customer writes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9.2" />
        <path d="M12 7.2V12l3.4 2" />
      </svg>
    ),
  },
  {
    title: 'One Unified Inbox',
    desc: 'WhatsApp, Instagram and your website in a single place for the team.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.8 13.4h4l1.4 2.6h7.6l1.4-2.6h4" />
        <path d="M4.6 5.4h14.8l2 8v4a1.6 1.6 0 0 1-1.6 1.6H4.2a1.6 1.6 0 0 1-1.6-1.6v-4z" />
      </svg>
    ),
  },
];

/**
 * The five things we do, as they appear in the What We Do row.
 *
 * Each card carries its own colour: `ink` is the glyph and `tint` the card it
 * sits on, handed to CSS as custom properties so one rule paints the card, its
 * border and its hover glow from the same hue. The icons are filled brand
 * glyphs drawn on a 24-unit box — one CSS size governs all five — and they draw
 * in `currentColor`, which the card sets to its own ink.
 */
const WHAT_WE_DO: {
  title: string;
  desc: string;
  ink: string;
  tint: string;
  icon: React.ReactNode;
}[] = [
    {
      title: 'WhatsApp Chat Automation',
      desc: 'Automate customer replies, order updates, appointment reminders, and support on WhatsApp Business.',
      ink: '#0F9D4F',
      tint: '#F1FAF4',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11.4" fill="currentColor" />
          <g transform="translate(5.15 5.15) scale(0.57)" fill={WHITE}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.057-.371-.03-.52-.086-.148-.66-1.59-.905-2.174-.234-.556-.47-.48-.646-.487-.174-.007-.373-.008-.572-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </g>
        </svg>
      ),
    },
    {
      title: 'Website Chat Automation',
      desc: 'A smart chat assistant embedded on your website to capture leads and answer visitor questions in real time.',
      ink: '#2C7BE5',
      tint: '#F1F6FE',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.4 3h15.2A2.4 2.4 0 0 1 22 5.4v9.2a2.4 2.4 0 0 1-2.4 2.4h-8.3l-4.6 3.7A1 1 0 0 1 5.1 20v-3H4.4A2.4 2.4 0 0 1 2 14.6V5.4A2.4 2.4 0 0 1 4.4 3Z" fill="currentColor" />
          <g fill={WHITE}>
            <circle cx="8.1" cy="10" r="1.35" />
            <circle cx="12" cy="10" r="1.35" />
            <circle cx="15.9" cy="10" r="1.35" />
          </g>
        </svg>
      ),
    },
    {
      title: 'Custom Conversation Flows',
      desc: 'Tailored chat journeys built around your business — from FAQs to lead qualification to post-sale support.',
      ink: '#7C5CE0',
      tint: '#F5F3FE',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 7.6v3.1M5.2 16.2v-3.2h13.6v3.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <g fill="currentColor">
            <rect x="8.6" y="2.2" width="6.8" height="5.6" rx="1.9" />
            <rect x="1.8" y="16.2" width="6.8" height="5.6" rx="1.9" />
            <rect x="15.4" y="16.2" width="6.8" height="5.6" rx="1.9" />
          </g>
        </svg>
      ),
    },
    {
      title: 'Seamless Handover',
      desc: 'Smooth escalation to a human team member whenever a conversation needs a personal touch.',
      ink: '#D6336C',
      tint: '#FEF2F6',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.4 4.2a7.6 7.6 0 0 1 15.2 0v4.3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" fill="none" />
          <g fill="currentColor">
            <rect x="1.7" y="4.4" width="3.5" height="5.4" rx="1.7" />
            <rect x="18.8" y="4.4" width="3.5" height="5.4" rx="1.7" />
            <circle cx="12" cy="9.6" r="3.7" />
            <path d="M4.6 22c0-3.7 3.3-6.6 7.4-6.6s7.4 2.9 7.4 6.6z" />
          </g>
        </svg>
      ),
    },
    {
      title: 'Marketing Broadcasts',
      desc: 'Send bulk WhatsApp campaigns, offers, product launches, and updates with delivery and read tracking.',
      ink: '#E1830B',
      tint: '#FFF7EA',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g fill="currentColor">
            <path d="M2.6 10.1 14.4 4.3v11.9L2.6 13.9z" />
            <path d="M5.2 14.5l4 .8-.9 4.6a1.3 1.3 0 0 1-1.6 1l-1-.2a1.3 1.3 0 0 1-1-1.5z" />
          </g>
          <path d="M17.6 5.6l2.6-1.7M18.6 10.2h3.1M17.6 14.8l2.6 1.7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
  ];

export default function AboutPage() {
  return (
    <PageShell scope="about">
      <StatAnimator />
      <AnnouncementBar />
      <Header />
      {/* HERO — copy on the left, a WhatsApp conversation on the right */}
      <section className="abh">
        <div className="abh-inner">

          <div className="abh-copy">
            <h1 className="abh-title">
              Conversations<br />That <span>Drive Growth</span>
            </h1>
            <p className="abh-lede">At Converse360, we help businesses turn everyday conversations into
              real growth. We build smart <strong>WhatsApp</strong> and <strong>website chat automation</strong>{' '}
              solutions that let companies respond to customers instantly, around the clock — without adding
              to their support workload.</p>
            <p className="abh-lede">Whether it’s answering FAQs, qualifying leads, taking orders, sending
              updates, or guiding a customer through a purchase, Converse360 puts an always-on, intelligent
              chat assistant to work on your website and WhatsApp — so no message ever goes unanswered, and
              no opportunity slips through the cracks.</p>
            {/* the site's pill CTAs — brand fill then dark, as on the landing hero */}
            <div className="abh-cta">
              <Hx link className="btn-fx btn-fx-brand abh-btn" href="/book-a-demo" style={{ background: "var(--brand)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "var(--color-text)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4.5" width="18" height="16" rx="2.5"></rect>
                  <path d="M3 9.5h18M8 2.5v4M16 2.5v4"></path>
                </svg>
                Book a Demo
              </Hx>
              <Hx link className="btn-fx btn-fx-dark btn-fx-arrow abh-btn" href="/industries" style={{ background: "var(--color-bg)", color: "var(--color-text)", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px", border: "1.5px solid var(--brand)" }} hoverStyle={{ background: "var(--brand)", color: "var(--color-bg)", border: "1.5px solid var(--brand)" }}>
                Explore Solutions
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </Hx>
            </div>
          </div>

          {/* The art is illustration only — everything it says, the copy says too,
              so it is hidden from assistive tech rather than read out as a chat. */}
          <div className="abh-art" aria-hidden="true">
            <img src="/assets/about-hero-art.png" alt="" loading="eager" decoding="async" />
          </div>

        </div>
      </section>

      {/* AGENCY-MADE, PRODUCT-DRIVEN — photo composition beside the story */}
      <section className="ab-agency">
        <div className="ab-agency-inner">

          <div className="ab-agency-art">
            <figure className="ab-agency-shot ab-agency-main">
              <img src="/assets/whatsapp_business_interaction.jpg" alt="A Conceps Media Works team member answering a customer on WhatsApp Business" loading="lazy" decoding="async" />
            </figure>
            <figure className="ab-agency-shot ab-agency-inset">
              <img src="/assets/whatsapp_business_dashboard.jpg" alt="The Converse360 inbox open on a laptop, with response times and tickets solved beside the conversation" loading="lazy" decoding="async" />
            </figure>
            <div className="ab-agency-badge">
              <strong>100+</strong>
              <span>Businesses served</span>
            </div>
          </div>

          <div className="ab-agency-copy">
            {/* <span className="ab-agency-eyebrow">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9.2" />
                <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
              </svg>
              About Company
            </span> */}

            <h2 className="ab-agency-title">Agency-Made, Product-Driven.</h2>

            <p className="ab-agency-text">
              <img
                src="/assets/converse360-logo.png"
                alt="Converse360"
                style={{
                  height: "30px",
                  width: "auto",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: "8px",
                  position: "relative",

                }}
              /> operates under <strong>Conceps Media Works</strong>, a
              Coimbatore-based branding, advertising, and digital media agency with 18+ years of experience helping
              brands grow through creative strategy and technology. That heritage shapes how we build Converse360:
              solutions that aren’t just technically sound, but designed with the same brand-first thinking that has
              powered 100+ businesses we’ve worked with over the years.</p>

            <ul className="ab-agency-list">
              {AGENCY_POINTS.map((pt, i) => (
                <li className="ab-agency-item" key={pt.title}>
                  <span className={`ab-agency-ico${i === 0 ? ' is-solid' : ''}`} aria-hidden="true">{pt.icon}</span>
                  <div className="ab-agency-item-copy">
                    <h3 className="ab-agency-item-title">{pt.title}</h3>
                    <p className="ab-agency-item-text">{pt.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* WHAT WE DO — five equal cards, icon over centred copy */}
      <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(60px,8vw,100px) clamp(20px,4vw,32px)" }}>

          <div style={{ maxWidth: "52em", margin: "0 auto clamp(36px,5vw,56px)", textAlign: "center" }}>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "800", letterSpacing: "-0.035em", lineHeight: "1.15", marginBottom: "14px", color: "var(--color-text)" }}>
              {' '}What We Do</h2>
            {/* <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.7", color: "var(--color-text-muted)", margin: "0" }}>
              {' '}Five ways we put conversations to work for your business — designed for maximum conversion and engagement.{' '}
            </p> */}
          </div>

          <div className="what-we-do-grid">
            {WHAT_WE_DO.map((item) => (
              <div
                className="what-we-do-card"
                key={item.title}
                style={{ '--wwd-ink': item.ink, '--wwd-tint': item.tint } as React.CSSProperties}
              >
                <span className="what-we-do-icon" aria-hidden="true">{item.icon}</span>
                <h3 className="what-we-do-title">{item.title}</h3>
                <p className="what-we-do-desc">{item.desc}</p>
              </div>
            ))}
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
            <Hx link className="btn-fx" href="/pricing" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "500", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "rgba(255,255,255,0.12)" }}>See Pricing</Hx>
          </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
