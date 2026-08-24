'use client';

import { useState } from 'react';
import Hx from '@/components/Hx';
import { INDUSTRIES } from '@/lib/industries-data';
import { BRAND_600, BRAND_700 } from '@/lib/tokens';

/**
 * The Book a Free Demo page body.
 *
 * Client-side only, in step with ContactBody: submitting does not post
 * anywhere, it swaps the form for the confirmation panel. Wire `submit` to a
 * real endpoint when one exists.
 */

/** The three trust lines under the hero headline. */
const ASSURANCES = [
  '20 minutes, on a call or over WhatsApp',
  'No setup fee, no obligation to buy',
  'A live walkthrough on your own enquiries',
];

/** What the twenty minutes covers, shown beside the form. */
const AGENDA = [
  {
    title: 'Your enquiries today',
    body: 'Where they land now — WhatsApp, calls, Instagram DMs, the website form — and which ones eat the most of your team’s day.',
  },
  {
    title: 'A live flow, on your questions',
    body: 'We take a real enquiry you get every week and build the reply flow for it while you watch.',
  },
  {
    title: 'Handover to your team',
    body: 'How a conversation moves to a person with the full context attached, and what your team sees when it arrives.',
  },
  {
    title: 'Numbers and next steps',
    body: 'Plan, per-message costs, what onboarding needs from you, and a straight answer on timelines.',
  },
];

/** Preferred slots, in IST. */
const SLOTS = [
  'Morning (9am – 12pm IST)',
  'Afternoon (12pm – 4pm IST)',
  'Evening (4pm – 7pm IST)',
  'Any time works',
];

const FIELD: React.CSSProperties = {
  font: 'inherit',
  fontSize: '15.5px',
  color: 'var(--color-text)',
  background: 'var(--color-bg)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-divider)',
  borderRadius: '9px',
  padding: '13px 14px',
  width: '100%',
};

const FIELD_FOCUS: React.CSSProperties = { borderColor: 'var(--brand)', outline: 'none' };

const ROW: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))',
  gap: '18px',
};

const CARD: React.CSSProperties = {
  border: '1px solid var(--color-divider)',
  borderRadius: '16px',
  padding: 'clamp(24px,3vw,34px)',
};

const ICON_TILE: React.CSSProperties = {
  width: '38px',
  height: '38px',
  borderRadius: '9px',
  background: 'rgba(0,171,86,0.10)',
  display: 'grid',
  placeItems: 'center',
  flex: 'none',
};

const PILL: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-divider)',
  borderRadius: '999px',
  padding: '10px 18px',
  fontSize: '14.5px',
  fontWeight: '500',
  color: 'var(--color-text)',
  background: 'var(--color-bg)',
};

const PILL_HOVER: React.CSSProperties = { borderColor: 'var(--brand)', color: 'var(--brand)' };

/** A labelled form control. `htmlFor` ties the label to the control's id. */
const Field = ({
  htmlFor,
  label,
  children,
}: {
  htmlFor: string;
  label: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <label htmlFor={htmlFor} style={{ fontSize: '13.5px', fontWeight: '500', color: 'var(--color-text)' }}>
      {label}
    </label>
    {children}
  </div>
);

export default function DemoBody() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section style={{ background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(48px,7vw,88px) clamp(20px,4vw,32px)', textAlign: 'center' }}>

          <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: '700', letterSpacing: '-0.04em', lineHeight: '1.06', marginBottom: '20px', maxWidth: '18em', marginLeft: 'auto', marginRight: 'auto', textWrap: 'balance' }}>
            See Converse360 answer your own enquiries.
          </h1>
          <p style={{ fontSize: 'clamp(16px,1.8vw,19px)', lineHeight: '1.65', color: 'var(--color-text-muted)', maxWidth: '44em', marginLeft: 'auto', marginRight: 'auto' }}>
            Bring one question your customers ask every week. In twenty minutes we&apos;ll build the flow that
            handles it, show you the handover to your team, and give you the numbers — no slide deck, no
            commitment.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 24px', marginTop: '28px' }}>
            {ASSURANCES.map((a) => (
              <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', fontSize: '14.5px', color: 'var(--color-text-muted)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND_600} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(48px,6.5vw,80px) clamp(20px,4vw,32px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 'clamp(32px,5vw,64px)', alignItems: 'stretch' }}>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: 'clamp(24px,3.2vw,32px)', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '14px' }}>
              Pick a time that suits you
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.65', color: 'var(--color-text-muted)', marginBottom: '26px' }}>
              Tell us a little about your business and when you&apos;re free. We&apos;ll confirm the slot on
              WhatsApp within one business day.
            </p>

            {sent ? (
              <div style={{ ...CARD, background: 'var(--color-surface)', flex: '1' }}>
                <span style={{ ...ICON_TILE, width: '44px', height: '44px', borderRadius: '11px', marginBottom: '18px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND_700} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  Your demo request is in.
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.65', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                  We&apos;ll message you on WhatsApp within one business day to confirm the slot. If you&apos;d
                  rather sort it out now, call us on{' '}
                  <Hx as="a" href="tel:7338855082" style={{ color: 'var(--brand)', fontWeight: '500' }} hoverStyle={{ color: 'var(--color-text)' }}>
                    7338855082
                  </Hx>
                  .
                </p>
                <Hx
                  as="button"
                  type="button"
                  className="btn-fx btn-fx-dark"
                  onClick={() => setSent(false)}
                  style={{ ...PILL, font: 'inherit', cursor: 'pointer' }}
                  hoverStyle={PILL_HOVER}
                >
                  Book another demo
                </Hx>
              </div>
            ) : (
              <form onSubmit={submit} style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '18px', background: 'var(--color-surface)', border: '1px solid var(--color-divider)', borderRadius: '16px', padding: 'clamp(22px,3vw,32px)' }}>
                <div style={ROW}>
                  <Field htmlFor="demo-name" label="Name">
                    <Hx as="input" id="demo-name" name="name" type="text" required placeholder="Your full name" style={FIELD} focusStyle={FIELD_FOCUS} />
                  </Field>
                  <Field htmlFor="demo-company" label="Business/Company Name">
                    <Hx as="input" id="demo-company" name="company" type="text" required placeholder="Company name" style={FIELD} focusStyle={FIELD_FOCUS} />
                  </Field>
                </div>
                <div style={ROW}>
                  <Field htmlFor="demo-whatsapp" label="WhatsApp Number">
                    <Hx as="input" id="demo-whatsapp" name="whatsapp" type="tel" required placeholder="+91 00000 00000" style={FIELD} focusStyle={FIELD_FOCUS} />
                  </Field>
                  <Field htmlFor="demo-email" label="Email Address">
                    <Hx as="input" id="demo-email" name="email" type="email" required placeholder="you@company.com" style={FIELD} focusStyle={FIELD_FOCUS} />
                  </Field>
                </div>
                <div style={ROW}>
                  <Field htmlFor="demo-industry" label="Industry">
                    <Hx as="select" id="demo-industry" name="industry" defaultValue="" style={FIELD} focusStyle={FIELD_FOCUS}>
                      <option value="" disabled>Select your industry</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i.slug} value={i.slug}>{i.name}</option>
                      ))}
                      <option value="other">Something else</option>
                    </Hx>
                  </Field>
                  <Field htmlFor="demo-channel" label="Where do enquiries reach you?">
                    <Hx as="select" id="demo-channel" name="channel" style={FIELD} focusStyle={FIELD_FOCUS}>
                      <option>WhatsApp</option>
                      <option>Website chat</option>
                      <option>Instagram / Facebook DMs</option>
                      <option>Phone calls</option>
                      <option>A bit of everything</option>
                    </Hx>
                  </Field>
                </div>
                <div style={ROW}>
                  <Field htmlFor="demo-date" label="Preferred date">
                    <Hx as="input" id="demo-date" name="date" type="date" style={FIELD} focusStyle={FIELD_FOCUS} />
                  </Field>
                  <Field htmlFor="demo-slot" label="Preferred time">
                    <Hx as="select" id="demo-slot" name="slot" style={FIELD} focusStyle={FIELD_FOCUS}>
                      {SLOTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Hx>
                  </Field>
                </div>
                <Field htmlFor="demo-question" label={<>The enquiry you&rsquo;d like us to demo</>}>
                  <Hx
                    as="textarea"
                    id="demo-question"
                    name="question"
                    rows={4}
                    placeholder={'e.g. “Do you have this in size M?” or “What are the fees for the 2026 batch?”'}
                    style={{ ...FIELD, resize: 'vertical' }}
                    focusStyle={FIELD_FOCUS}
                  />
                </Field>
                <Hx
                  as="button"
                  className="btn-fx btn-fx-brand"
                  type="submit"
                  style={{ font: 'inherit', cursor: 'pointer', background: 'var(--brand)', color: 'var(--color-bg)', border: '0', fontSize: '16px', fontWeight: '700', padding: '16px 30px', borderRadius: '999px', alignSelf: 'center' }}
                  hoverStyle={{ background: 'var(--color-text)' }}
                >
                  Book my free demo
                </Hx>
                <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--color-text-subtle)' }}>
                  We use these details only to set up your demo — nothing else. See our{' '}
                  <Hx link href="/privacy" style={{ color: 'var(--brand)', fontWeight: '500' }} hoverStyle={{ color: 'var(--color-text)' }}>
                    privacy policy
                  </Hx>
                  .
                </p>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={CARD}>
              <h3 style={{ fontSize: '17px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                What the twenty minutes covers
              </h3>
              <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                One of our product team, start to finish — no sales handoff.
              </p>
              {AGENDA.map((step, i) => (
                <div
                  key={step.title}
                  style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '20px 0', borderTop: '1px solid var(--color-divider)', marginTop: i === 0 ? '18px' : '0', lineHeight: '1.6' }}
                >
                  <span style={{ ...ICON_TILE, borderRadius: '999px', fontSize: '14px', fontWeight: '700', color: 'var(--color-accent-700)' }}>
                    {i + 1}
                  </span>
                  <div style={{ minWidth: '0' }}>
                    <div style={{ fontSize: '16.5px', fontWeight: '500', marginBottom: '4px' }}>{step.title}</div>
                    <div style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>{step.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...CARD, marginTop: '20px', flex: '1', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                Rather not wait?
              </h3>
              <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
                Message or call us and we&apos;ll find a slot on the spot.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Hx as="a" className="btn-fx btn-fx-dark" href="https://wa.me/917338855082" target="_blank" rel="noopener noreferrer" style={PILL} hoverStyle={PILL_HOVER}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.8A8.5 8.5 0 1 1 21 11.5z" />
                    <path d="M8.8 9c.3 2.6 2.6 4.9 5.2 5.2l1-1.4 1.7.7a4.6 4.6 0 0 1-6-1.2 4.6 4.6 0 0 1-1.2-6l.7 1.7z" />
                  </svg>
                  WhatsApp us
                </Hx>
                <Hx as="a" className="btn-fx btn-fx-dark" href="tel:7338855082" style={{ ...PILL, whiteSpace: 'nowrap' }} hoverStyle={PILL_HOVER}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z" />
                  </svg>
                  7338855082
                </Hx>
                <Hx as="a" className="btn-fx btn-fx-dark" href="mailto:hello@converse360.in" style={{ ...PILL, overflowWrap: 'break-word' }} hoverStyle={PILL_HOVER}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                    <path d="m3 6.5 9 6.5 9-6.5" />
                  </svg>
                  hello@converse360.in
                </Hx>
              </div>
              <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: 'var(--color-text-muted)', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-divider)' }}>
                Want the numbers first? See{' '}
                <Hx link href="/pricing" style={{ color: 'var(--brand)', fontWeight: '500' }} hoverStyle={{ color: 'var(--color-text)' }}>
                  plans and per-message costs
                </Hx>
                , or read the{' '}
                <Hx link href="/faq" style={{ color: 'var(--brand)', fontWeight: '500' }} hoverStyle={{ color: 'var(--color-text)' }}>
                  FAQ
                </Hx>
                .
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
