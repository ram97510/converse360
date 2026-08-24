import type { Metadata } from 'next';
import Link from 'next/link';
import Hx from '@/components/Hx';
import IndustryChat from '@/components/industries/IndustryChat';
import { notFound } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import IndustryIcon from '@/components/industries/IndustryIcon';
import { BRAND, WHITE } from '@/lib/tokens';
import { INDUSTRIES, getIndustry, getIndustryContent } from '@/lib/industries-data';

type Params = { slug: string };

/** All six pages are known at build time, so they prerender as static HTML. */
export function generateStaticParams(): Params[] {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  const { base } = getIndustryContent(ind);
  return {
    title: `${ind.name} — WhatsApp automation | Converse360`,
    description: base.blurb,
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

const Check = ({ color = BRAND }: { color?: string }) => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ marginTop: '2px', flex: 'none' }}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Arrow = ({ color = WHITE }: { color?: string }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h13m-5.5-6 6 6-6 6" />
  </svg>
);

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  const { base, extra, thread } = getIndustryContent(ind);
  const others = INDUSTRIES.filter((i) => i.slug !== ind.slug);

  return (
    <PageShell scope="industry">
      <AnnouncementBar />
      <Header />

      {/* HERO */}
      <section
        style={{
          background: `linear-gradient(180deg, ${ind.tintSoft} 0%, var(--color-bg) 78%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '5%',
            top: '18%',
            width: '70px',
            height: '70px',
            backgroundImage: `radial-gradient(${ind.tint} 1.2px,transparent 1.2px)`,
            backgroundSize: '11px 11px',
            opacity: 0.28,
          }}
        />
        <div className="ind-wrap">
          <div className="ind-hero-grid">
            <div>
              <nav
                aria-label="Breadcrumb"
                style={{ fontSize: '13px', color: 'var(--color-text-subtle)', marginBottom: '20px' }}
              >
                <Link href="/industries" style={{ color: 'var(--color-text-subtle)' }}>
                  Industries
                </Link>
                <span aria-hidden="true" style={{ margin: '0 8px' }}>
                  /
                </span>
                <span style={{ color: 'var(--color-text)' }}>{ind.name}</span>
              </nav>

              <h1 className="ind-h1">
                {ind.heroTitle} <span style={{ color: ind.tint }}>{ind.heroTitleAccent}</span>
                {ind.heroTitleTail.startsWith('.') ? '' : ' '}
                {ind.heroTitleTail}
              </h1>

              <p className="ind-lede">{ind.heroBody}</p>

              <div className="ind-cta-row">
                <Link href="/contact" className="ind-btn ind-btn-primary">
                  Book a demo
                  <Arrow />
                </Link>
                <Link href="/pricing" className="ind-btn ind-btn-ghost">
                  See pricing
                </Link>
              </div>
            </div>

            {/* Sample conversation — the same thread the landing page plays for
                this vertical, rendered dynamically. */}
            <IndustryChat thread={thread} tint={ind.tint} />
          </div>

          {/* METRICS */}
          <div className="ind-metrics">
            {extra.metrics.map(([value, label]) => (
              <div className="ind-metric" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT GETS IN THE WAY */}
      <section style={{ background: 'var(--color-bg)', padding: 'clamp(48px,6.5vw,84px) 0' }}>
        <div className="ind-wrap">
          <h2 className="ind-h2" style={{ textAlign: 'center' }}>What gets in the way today</h2>
          <p className="ind-sub" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>{base.blurb}</p>

          <div className="ind-cards">
            {ind.problems.map((p) => (
              <div className="ind-card" key={p.title}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: ind.tintSoft,
                    color: ind.tint,
                  }}
                >
                  <IndustryIcon name={ind.icon} size={19} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section style={{ background: 'var(--color-surface-2)', padding: 'clamp(48px,6.5vw,84px) 0' }}>
        <div className="ind-wrap">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center'
          }}>
            <div>
              <h2 className="ind-h2" style={{ margin: '0 0 16px', textAlign: 'left' }}>What Converse360 does for {ind.name.toLowerCase()}</h2>
              <p className="ind-sub" style={{ margin: '0 0 32px', textAlign: 'left', maxWidth: '100%' }}>{extra.note}</p>

              <ul className="ind-points">
                {base.points.map((point) => (
                  <li key={point}>
                    <Check color={ind.tint} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(16, 43, 30, 0.05)',
              border: '1px solid var(--color-divider)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '4/3'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/ind-${ind.slug}.jpg`}
                alt={`Converse360 ${ind.name} features dashboard illustration`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--color-bg)', padding: 'clamp(48px,6.5vw,84px) 0' }}>
        <div className="ind-wrap">
          <h2 className="ind-h2" style={{ textAlign: 'center' }}>From first message to finished outcome</h2>
          <p className="ind-sub" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            Four steps, all of them inside one conversation your customer never has to leave.
          </p>

          <div className="ind-cards">
            {ind.workflow.map((step, i) => (
              <div className="ind-card" key={step.title}>
                <span className="ind-num" style={{ background: ind.tintSoft, color: ind.tint }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(20px,4vw,32px) clamp(56px,8vw,84px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 'clamp(32px,5vw,56px)', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(30px,4.5vw,42px)', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '12px', textAlign: 'left' }}>Questions {ind.name.toLowerCase()} teams ask</h2>
            <p style={{ fontSize: '15.5px', lineHeight: '1.55', color: 'var(--color-text-muted)', textAlign: 'left' }}>Still unsure? <Link href="/contact" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: '500' }}>Book a demo</Link> and we'll walk you through it.</p>
          </div>
          <div style={{ borderTop: '1px solid var(--color-divider)' }}>
            {ind.faqs.map((f) => (
              <details key={f.q} style={{ borderBottom: '1px solid var(--color-divider)' }}>
                <summary style={{ cursor: 'pointer', padding: '22px 0', fontSize: '17.5px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ flex: '1' }}>{f.q}</span>
                  <span style={{ fontSize: '22px', color: 'var(--brand)', lineHeight: '1' }}>+</span>
                </summary>
                <p style={{ fontSize: '15.5px', lineHeight: '1.6', color: 'var(--color-text-muted)', padding: '0 0 22px', maxWidth: '44em' }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BAND CTA */}
      <section style={{ background: 'var(--brand)', color: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(48px,6.5vw,76px) clamp(20px,4vw,32px)', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center', gap: '24px', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(24px,3.2vw,36px)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '10px' }}>
              See it running on your own {ind.name.toLowerCase()} enquiries.
            </h2>
            <p style={{ fontSize: '16.5px', color: 'rgba(255,255,255,0.9)', maxWidth: '42em', margin: '0 auto' }}>
              Bring us a real conversation your team handles every week. In twenty minutes we will show you the exact
              flow that answers it automatically — and what it takes to go live.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <Hx link className="btn-fx btn-fx-dark" href="/contact" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '16px', fontWeight: '700', padding: '16px 30px', borderRadius: '999px' }} hoverStyle={{ background: 'var(--color-surface)' }}>
              Book a Free Demo
            </Hx>
            <Hx link className="btn-fx" href="/industries" style={{ border: '1px solid rgba(255,255,255,0.5)', color: 'var(--color-bg)', fontSize: '16px', fontWeight: '500', padding: '16px 30px', borderRadius: '999px' }} hoverStyle={{ background: 'rgba(255,255,255,0.12)' }}>
              Other industries
            </Hx>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
