import type { Metadata } from 'next';
import Link from 'next/link';
import Hx from '@/components/Hx';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageShell from '@/components/PageShell';
import IndustryIcon from '@/components/industries/IndustryIcon';
import { BRAND, WHITE } from '@/lib/tokens';
import { INDUSTRIES, getIndustryBlurb } from '@/lib/industries-data';

export const metadata: Metadata = {
  title: 'Industries — Converse360',
  description:
    'How retail, education, real estate, healthcare, finance and logistics teams turn WhatsApp conversations into booked visits, confirmed orders and closed files.',
  alternates: { canonical: '/industries' },
};

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

export default function IndustriesPage() {
  return (
    <PageShell scope="industry">
      <AnnouncementBar />
      <Header />

      <section style={{ background: 'linear-gradient(180deg,#F5FAF7 0%,var(--color-bg) 74%)' }}>
        <div className="ind-wrap" style={{ padding: 'clamp(44px,6vw,80px) clamp(20px,4vw,32px) clamp(30px,4vw,44px)' }}>
          <div style={{ maxWidth: '58em' }}>
            <span className="ind-eyebrow" style={{ paddingLeft: '14px' }}>
              Industries
            </span>
            <h1 className="ind-h1">
              The same inbox. Six very different <span style={{ color: 'var(--brand)' }}>conversations</span>.
            </h1>
            <p className="ind-lede">
              A parent asking about a fee structure and a customer asking where their parcel is need completely
              different answers — but the same thing has to happen: a reply within seconds, at any hour, that moves the
              conversation forward. Here is what that looks like in each industry we work in.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-bg)', padding: '0 0 clamp(48px,6.5vw,84px)' }}>
        <div className="ind-wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))',
              gap: 'clamp(16px,2vw,22px)',
            }}
          >
            {INDUSTRIES.map((ind) => {
              const blurb = getIndustryBlurb(ind);
              return (
                <Link key={ind.slug} href={`/industries/${ind.slug}`} className="ind-tile">
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: '0 0 auto',
                      height: '3px',
                      background: `linear-gradient(90deg, ${ind.tint}, transparent)`,
                    }}
                  />
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '42px',
                      height: '42px',
                      borderRadius: '13px',
                      background: ind.tintSoft,
                      color: ind.tint,
                    }}
                  >
                    <IndustryIcon name={ind.icon} size={21} />
                  </span>
                  <h2
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      margin: '15px 0 8px',
                      color: 'black'
                    }}
                  >
                    {ind.menuLabel}
                  </h2>
                  <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>
                    {blurb}
                  </p>
                  <span className="ind-tile-go">
                    Explore {ind.menuLabel}
                    <Arrow color={BRAND} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--brand)', color: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(48px,6.5vw,76px) clamp(20px,4vw,32px)', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center', gap: '24px', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(24px,3.2vw,36px)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '10px' }}>
              Not sure which one fits you?
            </h2>
            <p style={{ fontSize: '16.5px', color: 'rgba(255,255,255,0.9)', maxWidth: '42em', margin: '0 auto' }}>
              Most businesses sit across two or three of these. Tell us how enquiries reach you today and we will map
              the flow to your own process in a twenty-minute session.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <Hx link className="btn-fx btn-fx-dark" href="/book-a-demo" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '16px', fontWeight: '700', padding: '16px 30px', borderRadius: '999px' }} hoverStyle={{ background: 'var(--color-surface)' }}>
              Book a one-to-one meeting
            </Hx>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
