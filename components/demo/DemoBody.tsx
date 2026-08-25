'use client';

import { useEffect, useMemo, useState } from 'react';
import Hx from '@/components/Hx';
import { INDUSTRIES } from '@/lib/industries-data';
import { BRAND, BRAND_600, BRAND_700 } from '@/lib/tokens';

/**
 * The Book a Free Demo page body — a three-step booking flow.
 *
 *   1. Pick a date on the calendar, then a slot from that day's times.
 *   2. Fill in the details.
 *   3. Confirmation, with the chosen slot read back.
 *
 * Client-side only, in step with ContactBody: submitting does not post
 * anywhere. Wire `submit` to a real endpoint when one exists — the slot lives
 * in `date` / `time`, the rest in the form fields.
 *
 * Availability is a static rule for now (weekdays and Saturdays, 10:00–18:30
 * IST, half-hour slots, nothing inside the next two hours). Replace
 * `isDayOpen` / `slotOpen` when a real calendar backs this.
 */

/** The three trust lines under the hero headline. */
const ASSURANCES = [
  '20 minutes, on a call or over WhatsApp',
  'No setup fee, no obligation to buy',
  'A live walkthrough on your own enquiries',
];

/** What the twenty minutes covers, shown beside the flow. */
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

const STEPS = ['Date & time', 'Your details', 'Confirmed'];

const DAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/** Booking window, in IST. Half-hour slots from 10:00 up to and including 18:30. */
const OPEN_HOUR = 10;
const CLOSE_HOUR = 19;

/** Slots at least this far out, so nobody books a call starting in ten minutes. */
const LEAD_MINUTES = 120;

/** '10:00', '10:30', … '18:30'. */
const TIME_SLOTS: string[] = [];
for (let m = OPEN_HOUR * 60; m < CLOSE_HOUR * 60; m += 30) {
  TIME_SLOTS.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
}

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

const BTN_BRAND: React.CSSProperties = {
  font: 'inherit',
  cursor: 'pointer',
  background: 'var(--brand)',
  color: 'var(--color-bg)',
  border: '0',
  fontSize: '16px',
  fontWeight: '700',
  padding: '15px 30px',
  borderRadius: '999px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  transition: 'background .2s ease, opacity .2s ease',
};

const BTN_GHOST: React.CSSProperties = {
  font: 'inherit',
  cursor: 'pointer',
  background: 'var(--color-bg)',
  color: 'var(--color-text)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-divider)',
  fontSize: '15.5px',
  fontWeight: '500',
  padding: '14px 24px',
  borderRadius: '999px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  transition: 'border-color .2s ease, color .2s ease',
};

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

const Check = ({ size = 16, colour = BRAND_600, width = 2.4 }: { size?: number; colour?: string; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* --- dates ---------------------------------------------------------------- */

/** Midnight-anchored day key, so two Dates for the same day compare equal. */
const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Sundays are closed; nothing in the past. */
const isDayOpen = (day: Date, today: Date) => day >= startOfDay(today) && day.getDay() !== 0;

const monthLabel = (d: Date) => d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

const longDate = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

const shortDate = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });

/* --- the booking ---------------------------------------------------------- */

type Booking = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  question: string;
};

/** How long the demo runs, in minutes. */
const DURATION = 20;

/** IST is UTC+05:30 — the offset the slot labels are quoted in. */
const IST_OFFSET_MINUTES = 330;

/**
 * The slot as a real instant.
 *
 * The labels are IST wall-clock, but the visitor's browser may sit in any zone,
 * so the offset is applied explicitly rather than leaning on the local one.
 */
const slotInstant = (day: Date, slot: string) => {
  const [h, m] = slot.split(':').map(Number);
  return new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate(), h, m) - IST_OFFSET_MINUTES * 60_000);
};

/** '20260828T043000Z' — the stamp both .ics and Google Calendar want. */
const stampUTC = (d: Date) => `${d.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;

/** A stable booking reference, derived from the slot so it survives a rerender. */
const reference = (day: Date, slot: string, name: string) => {
  let h = 0;
  for (const ch of `${dayKey(day)}${slot}${name}`) h = (h * 31 + ch.charCodeAt(0)) % 1_679_616;
  return `C360-${h.toString(36).toUpperCase().padStart(4, '0')}`;
};

/** The 6×7 cells behind a month grid — leading blanks, then every day. */
const monthCells = (year: number, month: number): (Date | null)[] => {
  const first = new Date(year, month, 1);
  const cells: (Date | null)[] = Array(first.getDay()).fill(null);
  for (let d = 1; new Date(year, month, d).getMonth() === month; d++) cells.push(new Date(year, month, d));
  return cells;
};

export default function DemoBody() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  /** What step 2 collected, kept so the confirmation can read it back. */
  const [booked, setBooked] = useState<Booking | null>(null);

  /** Feedback for the copy button, cleared on a timer. */
  const [copied, setCopied] = useState(false);

  /* `now` lands after mount: the server and the browser can sit on different
     days, and rendering the calendar from either one alone mismatches. */
  const [now, setNow] = useState<Date | null>(null);
  const [cursor, setCursor] = useState<{ y: number; m: number } | null>(null);

  useEffect(() => {
    const t = new Date();
    setNow(t);
    setCursor({ y: t.getFullYear(), m: t.getMonth() });
  }, []);

  const cells = useMemo(() => (cursor ? monthCells(cursor.y, cursor.m) : []), [cursor]);

  /** True while the visible month is the current one — the back arrow is dead there. */
  const atFirstMonth = !!(now && cursor && cursor.y === now.getFullYear() && cursor.m === now.getMonth());

  const shiftMonth = (by: number) => {
    if (!cursor) return;
    const d = new Date(cursor.y, cursor.m + by, 1);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
  };

  /** A slot is closed if it falls inside the lead time on the selected day. */
  const slotOpen = (slot: string) => {
    if (!date || !now) return true;
    if (dayKey(date) !== dayKey(now)) return true;
    const [h, m] = slot.split(':').map(Number);
    return h * 60 + m >= now.getHours() * 60 + now.getMinutes() + LEAD_MINUTES;
  };

  const pickDate = (d: Date) => {
    setDate(d);
    setTime(null);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? '').trim();
    setBooked({
      name: get('name'),
      company: get('company'),
      whatsapp: get('whatsapp'),
      email: get('email'),
      question: get('question'),
    });
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setDate(null);
    setTime(null);
    setBooked(null);
    setCopied(false);
    setStep(1);
  };

  /* --- pieces ------------------------------------------------------------- */

  const stepper = (
    <ol
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px 14px',
        listStyle: 'none',
        margin: '0 0 clamp(24px,3vw,34px)',
        padding: '0',
      }}
    >
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <li key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '999px',
                  display: 'grid',
                  placeItems: 'center',
                  flex: 'none',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  border: `1px solid ${done || active ? BRAND : 'var(--color-divider)'}`,
                  background: done ? BRAND : active ? 'rgba(0,171,86,0.10)' : 'var(--color-bg)',
                  color: done ? '#fff' : active ? BRAND_700 : 'var(--color-text-subtle)',
                  transition: 'background .2s ease, border-color .2s ease, color .2s ease',
                }}
              >
                {done ? <Check size={14} colour="#fff" width={3} /> : n}
              </span>
              <span
                style={{
                  fontSize: '14.5px',
                  fontWeight: active ? '700' : '500',
                  color: done || active ? 'var(--color-text)' : 'var(--color-text-subtle)',
                }}
              >
                {label}
              </span>
            </div>
            {n < STEPS.length && (
              <span style={{ width: 'clamp(18px,4vw,54px)', height: '1px', background: done ? BRAND : 'var(--color-divider)' }} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );

  const calendar = (
    <div style={{ minWidth: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.02em' }}>
          {cursor ? monthLabel(new Date(cursor.y, cursor.m, 1)) : ' '}
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[-1, 1].map((by) => {
            const disabled = by === -1 && atFirstMonth;
            return (
              <Hx
                key={by}
                as="button"
                type="button"
                aria-label={by === -1 ? 'Previous month' : 'Next month'}
                disabled={disabled || !cursor}
                onClick={() => shiftMonth(by)}
                style={{
                  width: '34px',
                  height: '34px',
                  display: 'grid',
                  placeItems: 'center',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'var(--color-divider)',
                  borderRadius: '9px',
                  background: 'var(--color-bg)',
                  color: disabled ? 'var(--color-text-fainter)' : 'var(--color-text)',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
                hoverStyle={disabled ? undefined : { borderColor: BRAND, color: BRAND_700 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={by === -1 ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'} />
                </svg>
              </Hx>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px' }}>
        {DAY_INITIALS.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: '13px', fontWeight: '500', color: 'var(--color-text-subtle)', padding: '8px 0' }}>
            {d}
          </div>
        ))}
        {cells.map((cell, i) => {
          if (!cell) return <span key={`b${i}`} />;
          const open = !!now && isDayOpen(cell, now);
          const selected = !!date && dayKey(date) === dayKey(cell);
          const isToday = !!now && dayKey(cell) === dayKey(now);
          return (
            <Hx
              key={dayKey(cell)}
              as="button"
              type="button"
              disabled={!open}
              aria-pressed={selected}
              aria-label={longDate(cell)}
              onClick={() => pickDate(cell)}
              style={{
                font: 'inherit',
                aspectRatio: '1',
                width: '100%',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '999px',
                fontSize: '15.5px',
                fontWeight: selected ? '700' : '500',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: isToday && !selected ? 'var(--color-divider)' : 'transparent',
                background: selected ? BRAND_700 : open ? 'rgba(0,171,86,0.08)' : 'transparent',
                color: selected ? '#fff' : open ? BRAND_700 : 'var(--color-text-fainter)',
                cursor: open ? 'pointer' : 'default',
                transition: 'background .18s ease, color .18s ease',
              }}
              hoverStyle={open && !selected ? { background: 'rgba(0,171,86,0.18)' } : undefined}
            >
              {cell.getDate()}
            </Hx>
          );
        })}
      </div>

      <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--color-text-subtle)', marginTop: '16px' }}>
        All times IST. We&rsquo;re open Monday to Saturday, 10:00 – 19:00.
      </p>
    </div>
  );

  const times = (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '0', borderLeft: '1px solid var(--color-divider)', paddingLeft: 'clamp(18px,2.5vw,28px)' }}>
      <div style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '14px', minHeight: '34px', display: 'flex', alignItems: 'center' }}>
        {date ? shortDate(date) : 'Pick a date'}
      </div>

      {date ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: '360px',
            overflowY: 'auto',
            paddingRight: '6px',
          }}
        >
          {TIME_SLOTS.map((slot) => {
            const open = slotOpen(slot);
            const selected = time === slot;
            const noon = slot === '12:00';
            return (
              <div key={slot}>
                {noon && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0 14px' }}>
                    <span style={{ flex: '1', height: '1px', background: 'var(--color-divider)' }} />
                    <span style={{ fontSize: '11.5px', letterSpacing: '0.12em', color: 'var(--color-text-fainter)' }}>NOON</span>
                    <span style={{ flex: '1', height: '1px', background: 'var(--color-divider)' }} />
                  </div>
                )}
                <Hx
                  as="button"
                  type="button"
                  disabled={!open}
                  aria-pressed={selected}
                  onClick={() => setTime(slot)}
                  style={{
                    font: 'inherit',
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: selected ? '700' : '500',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: selected ? BRAND_700 : open ? 'rgba(0,171,86,0.45)' : 'var(--color-divider)',
                    background: selected ? BRAND_700 : 'var(--color-bg)',
                    color: selected ? '#fff' : open ? BRAND_700 : 'var(--color-text-fainter)',
                    cursor: open ? 'pointer' : 'not-allowed',
                    transition: 'background .18s ease, border-color .18s ease, color .18s ease',
                  }}
                  hoverStyle={open && !selected ? { background: 'rgba(0,171,86,0.10)', borderColor: BRAND_700 } : undefined}
                >
                  {slot}
                </Hx>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ fontSize: '15px', lineHeight: '1.65', color: 'var(--color-text-muted)' }}>
          Choose a day on the calendar and the open slots for it will show up here.
        </p>
      )}
    </div>
  );

  /** The chosen slot, read back above the form and on the confirmation. */
  const slotSummary = date && time && (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexWrap: 'wrap',
        border: '1px solid var(--color-divider)',
        background: 'var(--color-surface)',
        borderRadius: '12px',
        padding: '14px 18px',
      }}
    >
      <span style={{ ...ICON_TILE, width: '34px', height: '34px' }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={BRAND_700} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
          <path d="M3 9.5h18M8 3v3M16 3v3" />
        </svg>
      </span>
      <div style={{ minWidth: '0' }}>
        <div style={{ fontSize: '15.5px', fontWeight: '700' }}>
          {longDate(date)} at {time}
        </div>
        <div style={{ fontSize: '13.5px', color: 'var(--color-text-muted)' }}>20 minutes, IST</div>
      </div>
    </div>
  );

  const detailsForm = (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {slotSummary}
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <Hx as="button" type="button" onClick={() => setStep(1)} style={BTN_GHOST} hoverStyle={{ borderColor: BRAND, color: BRAND_700 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 6l-6 6 6 6" />
          </svg>
          Change slot
        </Hx>
        <Hx as="button" type="submit" style={BTN_BRAND} hoverStyle={{ background: 'var(--color-text)' }}>
          Confirm my free demo
        </Hx>
      </div>

      <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--color-text-subtle)' }}>
        We use these details only to set up your demo — nothing else. See our{' '}
        <Hx link href="/privacy" style={{ color: 'var(--brand)', fontWeight: '500' }} hoverStyle={{ color: 'var(--color-text)' }}>
          privacy policy
        </Hx>
        .
      </p>
    </form>
  );

  /* --- confirmation ------------------------------------------------------- */

  const slotStart = date && time ? slotInstant(date, time) : null;
  const slotEnd = slotStart ? new Date(slotStart.getTime() + DURATION * 60_000) : null;
  const ref = date && time && booked ? reference(date, time, booked.name) : '';

  const eventTitle = 'Converse360 demo';
  const eventBody = `A ${DURATION}-minute walkthrough of Converse360 on your own enquiries. Booking reference ${ref}. Questions before then: hello@converse360.in or WhatsApp 7338855082.`;

  const googleCalendarUrl =
    slotStart && slotEnd
      ? 'https://calendar.google.com/calendar/render?' +
        new URLSearchParams({
          action: 'TEMPLATE',
          text: eventTitle,
          dates: `${stampUTC(slotStart)}/${stampUTC(slotEnd)}`,
          details: eventBody,
        }).toString()
      : '';

  /** The plain-text version of the booking, for sharing and for the clipboard. */
  const shareText =
    date && time
      ? `My Converse360 demo is booked — ${longDate(date)} at ${time} IST, ${DURATION} minutes. Reference ${ref}.`
      : '';

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard permission refused — the text is on screen to copy by hand. */
    }
  };

  /** Share and save targets. Those without an `href` act on click. */
  const SHARE: { label: string; icon: React.ReactNode; href?: string; onClick?: () => void }[] = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.8A8.5 8.5 0 1 1 21 11.5z" />
          <path d="M8.8 9c.3 2.6 2.6 4.9 5.2 5.2l1-1.4 1.7.7a4.6 4.6 0 0 1-6-1.2 4.6 4.6 0 0 1-1.2-6l.7 1.7z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(shareText)}`,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path d="m3 6.5 9 6.5 9-6.5" />
        </svg>
      ),
    },
    {
      label: 'Google Calendar',
      href: googleCalendarUrl,
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
          <path d="M3 9.5h18M8 3v3M16 3v3M12 13v4M10 15h4" />
        </svg>
      ),
    },
    {
      label: copied ? 'Copied' : 'Copy details',
      onClick: copyDetails,
      icon: copied ? (
        <Check size={17} colour="currentColor" width={2.2} />
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="11.5" height="11.5" rx="2.5" />
          <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
        </svg>
      ),
    },
  ];

  /** The booked slot and whatever step 2 collected, read back as a list. */
  const row = (k: string, v: React.ReactNode): [string, React.ReactNode] => [k, v];

  const bookedRows: [string, React.ReactNode][] = [
    row('Reference', <span style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{ref}</span>),
    row('When', date && time ? `${longDate(date)}, ${time} IST` : ''),
    row('Where', 'WhatsApp video or a phone call — your pick'),
    row('Who you’ll meet', 'Someone from our product team, start to finish'),
    ...(booked?.name ? [row('Name', booked.name)] : []),
    ...(booked?.company ? [row('Business', booked.company)] : []),
    ...(booked?.whatsapp ? [row('WhatsApp', booked.whatsapp)] : []),
    ...(booked?.email ? [row('Email', booked.email)] : []),
    ...(booked?.question ? [row('The enquiry we’ll demo', booked.question)] : []),
  ];

  const success = (
    <>
      {/* The banner — a pale wash and the gradient tick. */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(105deg, #D6F3E1 0%, #E8F9EE 40%, #F4FCF7 72%, #FBFEFC 100%)',
        }}
      >
        <div
          style={{
            position: 'relative',
            maxWidth: '1440px',
            margin: '0 auto',
            padding: 'clamp(52px,7vw,92px) clamp(20px,4vw,32px)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              width: 'clamp(66px,7vw,84px)',
              height: 'clamp(66px,7vw,84px)',
              borderRadius: '26px',
              background: `linear-gradient(150deg, ${BRAND_700} 0%, #1F8A4C 46%, #4FB870 100%)`,
              boxShadow: '0 14px 30px -14px rgba(0,119,60,0.55)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto clamp(22px,3vw,32px)',
            }}
          >
            <Check size={38} colour="#fff" width={3} />
          </span>

          <h1
            style={{
              fontSize: 'var(--fs-hero)',
              fontWeight: 'var(--fw-hero)',
              letterSpacing: '-0.04em',
              lineHeight: '1.05',
              marginBottom: '16px',
              textWrap: 'balance',
            }}
          >
            Meeting scheduled successfully!
          </h1>
          <p style={{ fontSize: 'var(--fs-lede)', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
            {booked?.name ? `Thanks, ${booked.name.split(' ')[0]} — we` : 'We'}&rsquo;ll send the confirmation and
            the joining link on WhatsApp shortly.
          </p>
        </div>
      </section>

      {/* The booking itself, then the ways to keep it and pass it on. */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,4vw,32px)' }}>
        {/* `stretch` so the share column ends level with the booking card. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(330px,100%),1fr))', gap: 'clamp(24px,4vw,40px)', alignItems: 'stretch' }}>

          <div style={{ ...CARD, background: 'var(--color-surface)', minWidth: '0' }}>
            <h2 style={{ fontSize: 'var(--fs-card-title)', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              Your booking
            </h2>
            <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
              Quote the reference if you write in about this slot.
            </p>
            <dl style={{ margin: '18px 0 0' }}>
              {bookedRows.map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(96px,152px) 1fr',
                    gap: '14px',
                    padding: '13px 0',
                    borderTop: '1px solid var(--color-divider)',
                  }}
                >
                  <dt style={{ fontSize: '14px', color: 'var(--color-text-subtle)' }}>{k}</dt>
                  <dd style={{ fontSize: '15.5px', fontWeight: '500', lineHeight: '1.5', margin: '0', overflowWrap: 'break-word' }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div style={{ minWidth: '0', display: 'flex', flexDirection: 'column' }}>
            <div style={CARD}>
              <h2 style={{ fontSize: 'var(--fs-card-title)', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                Keep it or share it
              </h2>
              <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
                Put it on your calendar, or send it to whoever else should sit in.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {SHARE.map((s) =>
                  s.href ? (
                    <Hx key={s.label} as="a" href={s.href} target="_blank" rel="noopener noreferrer" style={PILL} hoverStyle={PILL_HOVER}>
                      {s.icon}
                      {s.label}
                    </Hx>
                  ) : (
                    <Hx
                      key={s.label}
                      as="button"
                      type="button"
                      onClick={s.onClick}
                      style={{ ...PILL, font: 'inherit', fontSize: '14.5px', fontWeight: '500', cursor: 'pointer' }}
                      hoverStyle={PILL_HOVER}
                    >
                      {s.icon}
                      {s.label}
                    </Hx>
                  ),
                )}
              </div>
            </div>

            {/* Takes up the slack, so the column bottoms out with the booking card. */}
            <div style={{ ...CARD, marginTop: '20px', flex: '1' }}>
              <h2 style={{ fontSize: 'var(--fs-card-title)', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                Need to change something?
              </h2>
              <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '18px' }}>
                Message or call us and we&apos;ll move the slot — no forms to fill in again.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <Hx as="a" href="https://wa.me/917338855082" target="_blank" rel="noopener noreferrer" style={BTN_BRAND} hoverStyle={{ background: 'var(--color-text)' }}>
                  Message us on WhatsApp
                </Hx>
                <Hx as="button" type="button" onClick={restart} style={BTN_GHOST} hoverStyle={{ borderColor: BRAND, color: BRAND_700 }}>
                  Book another demo
                </Hx>
              </div>
              <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.6', color: 'var(--color-text-muted)', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-divider)' }}>
                While you wait, look over{' '}
                <Hx link href="/pricing" style={{ color: 'var(--brand)', fontWeight: '500' }} hoverStyle={{ color: 'var(--color-text)' }}>
                  plans and per-message costs
                </Hx>{' '}
                or the{' '}
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

  const heading =
    step === 1
      ? { title: 'Pick a time that suits you', body: 'Choose a day, then a slot. Twenty minutes is all we need.' }
      : { title: 'Tell us about your business', body: 'So we walk in already knowing what to build for you.' };

  /* The confirmation owns the whole page — the sales hero and the stepper have
     nothing left to say once the slot is booked. */
  if (step === 3) return success;

  return (
    <>
      <section style={{ background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(48px,7vw,88px) clamp(20px,4vw,32px)', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'var(--fs-hero)', fontWeight: 'var(--fw-hero)', letterSpacing: '-0.04em', lineHeight: '1.06', marginBottom: '20px', maxWidth: '18em', marginLeft: 'auto', marginRight: 'auto', textWrap: 'balance' }}>
            See Converse360 answer your own enquiries.
          </h1>
          <p style={{ fontSize: 'var(--fs-lede)', lineHeight: '1.65', color: 'var(--color-text-muted)', maxWidth: '44em', marginLeft: 'auto', marginRight: 'auto' }}>
            Bring one question your customers ask every week. In twenty minutes we&apos;ll build the flow that
            handles it, show you the handover to your team, and give you the numbers — no slide deck, no
            commitment.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 24px', marginTop: '28px' }}>
            {ASSURANCES.map((a) => (
              <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', fontSize: '14.5px', color: 'var(--color-text-muted)' }}>
                <Check />
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(48px,6.5vw,80px) clamp(20px,4vw,32px)' }}>
        {stepper}

        <h2 style={{ fontSize: 'var(--fs-section)', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '12px' }}>
          {heading.title}
        </h2>
        <p style={{ fontSize: 'var(--fs-lede)', lineHeight: '1.65', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          {heading.body}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))',
            gap: 'clamp(32px,5vw,64px)',
            alignItems: 'stretch',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '0' }}>
            <div style={{ ...CARD, flex: 1, background: 'var(--color-surface)' }}>
              {step === 1 && (
                <>
                  <div className="demo-picker" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)', gap: 'clamp(18px,2.5vw,28px)' }}>
                    {calendar}
                    {times}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', marginTop: '24px', paddingTop: '22px', borderTop: '1px solid var(--color-divider)' }}>
                    <Hx
                      as="button"
                      type="button"
                      disabled={!date || !time}
                      onClick={() => setStep(2)}
                      style={{ ...BTN_BRAND, ...(!date || !time ? { background: 'var(--color-divider)', color: 'var(--color-text-subtle)', cursor: 'not-allowed' } : {}) }}
                      hoverStyle={date && time ? { background: 'var(--color-text)' } : undefined}
                    >
                      Continue
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M10 6l6 6-6 6" />
                      </svg>
                    </Hx>
                    <span style={{ fontSize: '14.5px', color: 'var(--color-text-muted)' }}>
                      {date && time ? `${shortDate(date)} at ${time} IST` : 'Select a date and a time to carry on.'}
                    </span>
                  </div>
                </>
              )}

              {step === 2 && detailsForm}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', minWidth: '0' }}>
            <div style={{ ...CARD, flex: 1 }}>
              <h3 style={{ fontSize: 'var(--fs-card-title)', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                What the twenty minutes covers
              </h3>
              <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                One of our product team, start to finish — no sales handoff.
              </p>
              {AGENDA.map((item, i) => (
                <div
                  key={item.title}
                  style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '20px 0', borderTop: '1px solid var(--color-divider)', marginTop: i === 0 ? '18px' : '0', lineHeight: '1.6' }}
                >
                  <span style={{ ...ICON_TILE, borderRadius: '999px', fontSize: '14px', fontWeight: '700', color: BRAND_700 }}>
                    {i + 1}
                  </span>
                  <div style={{ minWidth: '0' }}>
                    <div style={{ fontSize: '16.5px', fontWeight: '500', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--color-text-muted)' }}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
