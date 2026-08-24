import type { Metadata } from 'next';
import Link from 'next/link';
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

              <span className="ind-eyebrow">
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    background: ind.tintSoft,
                    color: ind.tint,
                  }}
                >
                  <IndustryIcon name={ind.icon} size={15} />
                </span>
                {ind.heroEyebrow}
              </span>

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
                this vertical, rendered here in full. */}
            <div className="ind-chat">
              <div className="ind-chat-head">
                <span className="ind-chat-avatar">C3</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Converse360 Agent</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--brand)' }}>online · replies in seconds</div>
                </div>
              </div>
              <div className="ind-chat-body">
                {thread.map((m, i) => {
                  const [dir, text, file, meta] = m as [string, string, string?, string?];
                  return (
                    <div key={i} className={`ind-bubble ind-bubble-${dir === 'in' ? 'in' : 'out'}`}>
                      {text}
                      {file && (
                        <span className="ind-bubble-file">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={BRAND}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M14 3v5h5" />
                            <path d="M6 3h8l5 5v13H6z" />
                          </svg>
                          <span>
                            <strong style={{ display: 'block', fontWeight: 600 }}>{file}</strong>
                            <span style={{ color: 'var(--color-text-subtle)' }}>{meta}</span>
                          </span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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
          <h2 className="ind-h2">What gets in the way today</h2>
          <p className="ind-sub">{base.blurb}</p>

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
          <h2 className="ind-h2">What Converse360 does for {ind.name.toLowerCase()}</h2>
          <p className="ind-sub">{extra.note}</p>

          <ul className="ind-points">
            {base.points.map((point) => (
              <li key={point}>
                <Check color={ind.tint} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--color-bg)', padding: 'clamp(48px,6.5vw,84px) 0' }}>
        <div className="ind-wrap">
          <h2 className="ind-h2">From first message to finished outcome</h2>
          <p className="ind-sub">
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

      {/* BAND CTA */}
      <section style={{ background: 'var(--color-bg)', padding: '0 0 clamp(48px,6.5vw,84px)' }}>
        <div className="ind-wrap">
          <div className="ind-band">
            <span aria-hidden="true" className="ind-band-dots" />
            <div style={{ position: 'relative', maxWidth: '46em' }}>
              <h2
                style={{
                  fontSize: 'clamp(24px,3.4vw,38px)',
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.15,
                  margin: '0 0 14px',
                  textWrap: 'balance',
                }}
              >
                See it running on your own {ind.name.toLowerCase()} enquiries.
              </h2>
              <p style={{ fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                Bring us a real conversation your team handles every week. In twenty minutes we will show you the exact
                flow that answers it automatically — and what it takes to go live.
              </p>
              <div className="ind-cta-row">
                <Link
                  href="/contact"
                  className="ind-btn"
                  style={{ background: 'var(--color-bg)', color: 'var(--color-accent-deep)', fontWeight: 600 }}
                >
                  Book your demo
                  <Arrow color="#0F7A3D" />
                </Link>
                <Link
                  href="/industries"
                  className="ind-btn"
                  style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff' }}
                >
                  Other industries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--color-bg)', padding: '0 0 clamp(48px,6.5vw,84px)' }}>
        <div className="ind-wrap">
          <h2 className="ind-h2">Questions {ind.name.toLowerCase()} teams ask</h2>
          <div className="ind-faq" style={{ marginTop: '22px' }}>
            {ind.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER INDUSTRIES */}
      <section style={{ background: 'var(--color-surface-2)', padding: 'clamp(44px,5.5vw,72px) 0' }}>
        <div className="ind-wrap">
          <h2 className="ind-h2" style={{ fontSize: 'clamp(21px,2.6vw,28px)' }}>
            Explore other industries
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))',
              gap: '14px',
              marginTop: '22px',
            }}
          >
            {others.map((o) => (
              <Link key={o.slug} href={`/industries/${o.slug}`} className="ind-tile" style={{ padding: '18px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '11px',
                    background: o.tintSoft,
                    color: o.tint,
                  }}
                >
                  <IndustryIcon name={o.icon} size={18} />
                </span>
                <div style={{ fontSize: '15.5px', fontWeight: 600, marginTop: '12px' }}>{o.menuLabel}</div>
                <span className="ind-tile-go">
                  View
                  <Arrow color={BRAND} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
