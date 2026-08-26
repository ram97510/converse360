'use client';

import { useEffect, useMemo, useState } from 'react';
import Hx from '@/components/Hx';
import { BRAND, BRAND_600, BRAND_700 } from '@/lib/tokens';

/**
 * The Book a Demo page body — a single-screen booking panel.
 *
 *   Left card    : pick a date, then a slot for that day, then the three
 *                  details we need. One screen, no stepper.
 *   Right column : why the demo is worth the twenty minutes, and who runs it.
 *   On submit    : the whole page is replaced by the confirmation.
 *
 * Client-side only, in step with ContactBody: submitting does not post
 * anywhere. Wire `submit` to a real endpoint when one exists — the slot lives
 * in `date` / `time`, the rest in the form fields.
 *
 * Availability is a static rule for now (Monday to Saturday, 10:00–18:30 IST,
 * half-hour slots, nothing inside the next two hours). Replace `isDayOpen` /
 * `slotOpen` when a real calendar backs this.
 */

/** The three reasons in the sidebar, each with the glyph for its badge. */
const REASONS = [
  {
    title: 'Personalized AI Walkthrough',
    body: 'See how Converse360 adapts to your specific industry use cases.',
    icon: (
      <>
        <path d="M12 5a3 3 0 1 0-6 .1 4 4 0 0 0-2.5 5.8 4 4 0 0 0 .5 6.6A4 4 0 1 0 12 18z" />
        <path d="M12 5a3 3 0 1 1 6 .1 4 4 0 0 1 2.5 5.8 4 4 0 0 1-.5 6.6A4 4 0 1 1 12 18z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      </>
    ),
  },
  {
    title: 'ROI Analysis',
    body: 'Get a custom breakdown of expected cost savings and efficiency gains.',
    icon: (
      <>
        <path d="M22 7l-8.5 8.5-5-5L2 17" />
        <path d="M16 7h6v6" />
      </>
    ),
  },
  {
    title: 'Integration Roadmap',
    body: 'Learn how quickly you can deploy alongside your existing tech stack.',
    icon: (
      <>
        <path d="m9 8-4 4 4 4" />
        <path d="m15 8 4 4-4 4" />
        <path d="m13.4 6.5-2.8 11" />
      </>
    ),
  },
];

/** The specialist card under the reasons. Placeholder — swap for a real name. */
const SPECIALIST = {
  name: 'Sarah Jenkins',
  role: 'Enterprise Solutions Architect',
  quote: 'I look forward to showing you how we can streamline your customer interactions.',
};

/** Options for the volume select. */
const VOLUMES = ['Under 10,000', '10,000 – 50,000', '50,000 – 200,000', 'Over 200,000'];

const DAY_INITIALS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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

/** How the slot grid is measured: two rows of them show, the rest scroll. */
const SLOT_HEIGHT = 46;
const SLOT_GAP = 10;
const SLOT_ROWS = 2;

/** '13:00' → '01:00 PM'. Slots are stored 24-hour and shown 12-hour. */
const label12 = (slot: string) => {
  const [h, m] = slot.split(':').map(Number);
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

/* --- shared styling ------------------------------------------------------- */

/** A white panel: the booking card and both sidebar cards share this. */
const CARD: React.CSSProperties = {
  background: 'var(--color-bg)',
  border: '1px solid var(--color-divider)',
  borderRadius: '20px',
  boxShadow: '0 1px 2px rgba(24,24,24,0.03), 0 14px 34px -24px rgba(24,24,24,0.20)',
};

const LABEL: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--color-text-subtle)',
};

const FIELD: React.CSSProperties = {
  font: 'inherit',
  fontSize: '14.5px',
  color: 'var(--color-text)',
  background: 'var(--color-bg)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-divider)',
  borderRadius: '9px',
  padding: '12px 13px',
  width: '100%',
};

const FIELD_FOCUS: React.CSSProperties = { borderColor: 'var(--brand)', outline: 'none' };

/** The two panel headings inside the booking card. */
const PANEL_TITLE: React.CSSProperties = {
  fontSize: 'clamp(24px,2.6vw,30px)',
  fontWeight: '700',
  letterSpacing: '-0.03em',
  lineHeight: '1.12',
  margin: '0 0 18px',
};

const BTN_BRAND: React.CSSProperties = {
  font: 'inherit',
  cursor: 'pointer',
  background: 'var(--brand)',
  color: 'var(--color-bg)',
  border: '0',
  fontSize: '15px',
  fontWeight: '700',
  padding: '14px 26px',
  borderRadius: '999px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  transition: 'background .2s ease',
};

const BTN_GHOST: React.CSSProperties = {
  font: 'inherit',
  cursor: 'pointer',
  background: 'var(--color-bg)',
  color: 'var(--color-text)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--color-divider)',
  fontSize: '15px',
  fontWeight: '500',
  padding: '13px 22px',
  borderRadius: '999px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  transition: 'border-color .2s ease, color .2s ease',
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
    <label htmlFor={htmlFor} style={LABEL}>
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

const shortDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

/* --- the booking ---------------------------------------------------------- */

type Booking = {
  name: string;
  email: string;
  volume: string;
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
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  /** What the form collected, kept so the confirmation can read it back. */
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
    if (!date || !time) return;
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? '').trim();
    setBooked({ name: get('name'), email: get('email'), volume: get('volume') });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setDate(null);
    setTime(null);
    setBooked(null);
    setCopied(false);
  };

  /* --- the picker --------------------------------------------------------- */

  const calendar = (
    <div style={{ padding: 'clamp(22px,2.6vw,32px)', minWidth: '0' }}>
      <h2 style={PANEL_TITLE}>Select Date &amp; Time</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        {[-1, 1].map((by) => {
          const disabled = (by === -1 && atFirstMonth) || !cursor;
          return (
            <Hx
              key={by}
              as="button"
              type="button"
              aria-label={by === -1 ? 'Previous month' : 'Next month'}
              disabled={disabled}
              onClick={() => shiftMonth(by)}
              style={{
                order: by === -1 ? 0 : 2,
                font: 'inherit',
                width: '28px',
                height: '28px',
                display: 'grid',
                placeItems: 'center',
                border: '0',
                borderRadius: '8px',
                background: 'transparent',
                color: disabled ? 'var(--color-text-fainter)' : 'var(--color-text-subtle)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                flex: 'none',
              }}
              hoverStyle={disabled ? undefined : { color: BRAND_700, background: 'rgba(0,171,86,0.08)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={by === -1 ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'} />
              </svg>
            </Hx>
          );
        })}
        <div style={{ order: 1, flex: '1', textAlign: 'center', fontSize: '14.5px', fontWeight: '700', letterSpacing: '-0.01em' }}>
          {cursor ? monthLabel(new Date(cursor.y, cursor.m, 1)) : ' '}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
        {DAY_INITIALS.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: '11.5px', fontWeight: '500', color: 'var(--color-text-subtle)', padding: '6px 0' }}>
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
                position: 'relative',
                aspectRatio: '1',
                width: '100%',
                display: 'grid',
                placeItems: 'center',
                border: '0',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: selected || isToday ? '700' : '500',
                background: selected ? BRAND : 'transparent',
                color: selected ? '#fff' : !open ? 'var(--color-text-fainter)' : isToday ? BRAND_700 : 'var(--color-text)',
                cursor: open ? 'pointer' : 'default',
                transition: 'background .18s ease, color .18s ease',
              }}
              hoverStyle={open && !selected ? { background: 'rgba(0,171,86,0.10)' } : undefined}
            >
              {cell.getDate()}
              {isToday && !selected && (
                <span
                  style={{ position: 'absolute', bottom: '3px', width: '3px', height: '3px', borderRadius: '999px', background: BRAND }}
                  aria-hidden="true"
                />
              )}
            </Hx>
          );
        })}
      </div>

      <div style={{ fontSize: '12.5px', fontWeight: '500', color: 'var(--color-text-subtle)', margin: '22px 0 10px' }}>
        {date ? `Available Times for ${shortDate(date)}` : 'Available times'}
      </div>

      {/* Two rows — four slots — then scroll. The height is fixed either way,
          so the card does not jump when a day is picked. */}
      <div
        className="demo-slots"
        style={{ height: `${SLOT_ROWS * SLOT_HEIGHT + (SLOT_ROWS - 1) * SLOT_GAP}px`, overflowY: 'auto', paddingRight: '8px' }}
      >
        {date ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: `${SLOT_GAP}px` }}>
            {TIME_SLOTS.map((slot) => {
              const open = slotOpen(slot);
              const selected = time === slot;
              return (
                <Hx
                  key={slot}
                  as="button"
                  type="button"
                  disabled={!open}
                  aria-pressed={selected}
                  onClick={() => setTime(slot)}
                  style={{
                    font: 'inherit',
                    width: '100%',
                    height: `${SLOT_HEIGHT}px`,
                    display: 'grid',
                    placeItems: 'center',
                    padding: '0 8px',
                    borderRadius: '9px',
                    fontSize: '13.5px',
                    fontWeight: selected ? '700' : '500',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: selected ? BRAND : 'var(--color-divider)',
                    background: selected ? BRAND : 'var(--color-bg)',
                    color: selected ? '#fff' : open ? 'var(--color-text)' : 'var(--color-text-fainter)',
                    cursor: open ? 'pointer' : 'not-allowed',
                    transition: 'background .18s ease, border-color .18s ease, color .18s ease',
                  }}
                  hoverStyle={open && !selected ? { borderColor: BRAND, color: BRAND_700 } : undefined}
                >
                  {label12(slot)}
                </Hx>
              );
            })}
          </div>
        ) : (
          <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--color-text-muted)', margin: '0' }}>
            Choose a day on the calendar and its open slots will show up here.
          </p>
        )}
      </div>
    </div>
  );

  /* --- the details form --------------------------------------------------- */

  const details = (
    <div
      className="demo-details"
      style={{
        background: 'var(--color-surface-2)',
        borderLeft: '1px solid var(--color-divider)',
        padding: 'clamp(22px,2.6vw,32px)',
        minWidth: '0',
      }}
    >
      <h2 style={PANEL_TITLE}>Your Details</h2>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Field htmlFor="demo-name" label="Full name">
          <Hx as="input" id="demo-name" name="name" type="text" required placeholder="Jane Doe" style={FIELD} focusStyle={FIELD_FOCUS} />
        </Field>

        <Field htmlFor="demo-email" label="Company email">
          <Hx as="input" id="demo-email" name="email" type="email" required placeholder="jane@company.com" style={FIELD} focusStyle={FIELD_FOCUS} />
        </Field>

        <Field htmlFor="demo-volume" label="Expected monthly conversations">
          <Hx as="select" id="demo-volume" name="volume" style={FIELD} focusStyle={FIELD_FOCUS}>
            {VOLUMES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Hx>
        </Field>

        <Hx
          as="button"
          type="submit"
          disabled={!date || !time}
          style={{
            ...BTN_BRAND,
            width: '100%',
            marginTop: '6px',
            ...(!date || !time ? { background: 'var(--color-divider)', color: 'var(--color-text-subtle)', cursor: 'not-allowed' } : {}),
          }}
          hoverStyle={date && time ? { background: 'var(--color-text)' } : undefined}
        >
          Confirm Demo Booking
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </Hx>

        <p style={{ fontSize: '11.5px', lineHeight: '1.6', color: 'var(--color-text-subtle)', textAlign: 'center', margin: '0' }}>
          {date && time ? (
            <>
              By booking, you agree to our{' '}
              <Hx link href="/terms" style={{ color: 'var(--color-text-subtle)', fontWeight: '500' }} hoverStyle={{ color: 'var(--brand)' }}>
                terms of service
              </Hx>
              .
            </>
          ) : (
            'Select a date and a time to confirm your booking.'
          )}
        </p>
      </form>
    </div>
  );

  /* --- the sidebar -------------------------------------------------------- */

  const sidebar = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,1.8vw,20px)', minWidth: '0' }}>
      <div style={{ ...CARD, padding: 'clamp(20px,2.2vw,26px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={BRAND_600} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9.2" />
            <path d="m8.4 12.2 2.5 2.5 4.7-4.9" />
          </svg>
          <h3 style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.01em', margin: '0' }}>Why Demo Converse360?</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {REASONS.map((r) => (
            <div key={r.title} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '999px',
                  background: BRAND,
                  display: 'grid',
                  placeItems: 'center',
                  flex: 'none',
                  marginTop: '1px',
                }}
                aria-hidden="true"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {r.icon}
                </svg>
              </span>
              <div style={{ minWidth: '0' }}>
                <div style={{ fontSize: '13.5px', fontWeight: '700', letterSpacing: '-0.01em', marginBottom: '3px' }}>{r.title}</div>
                <div style={{ fontSize: '12.5px', lineHeight: '1.55', color: 'var(--color-text-muted)' }}>{r.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* `flex: 1` takes up the slack, so the sidebar bottoms out level with
          the booking card beside it. */}
      <div
        style={{
          ...CARD,
          padding: 'clamp(22px,2.4vw,28px)',
          textAlign: 'center',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '999px',
            background: `linear-gradient(150deg, ${BRAND_700} 0%, #1F8A4C 46%, #4FB870 100%)`,
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 12px',
            fontSize: '18px',
            fontWeight: '700',
            letterSpacing: '0.02em',
          }}
          aria-hidden="true"
        >
          {SPECIALIST.name.split(' ').map((w) => w[0]).join('')}
        </span>
        <div style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '-0.01em' }}>{SPECIALIST.name}</div>
        <div style={{ fontSize: '11.5px', color: 'var(--color-text-subtle)', marginTop: '3px' }}>{SPECIALIST.role}</div>
        <p style={{ fontSize: '12.5px', lineHeight: '1.6', color: 'var(--color-text-muted)', fontStyle: 'italic', margin: '14px 0 0' }}>
          &ldquo;{SPECIALIST.quote}&rdquo;
        </p>
      </div>
    </div>
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
      ? `My Converse360 demo is booked — ${longDate(date)} at ${label12(time)} IST, ${DURATION} minutes. Reference ${ref}.`
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

  /** The booked slot and whatever the form collected, read back as a list. */
  const row = (k: string, v: React.ReactNode): [string, React.ReactNode] => [k, v];

  const bookedRows: [string, React.ReactNode][] = [
    row('Reference', <span style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{ref}</span>),
    row('When', date && time ? `${longDate(date)}, ${label12(time)} IST` : ''),
    row('Where', 'A video call or a phone call — your pick'),
    row('Who you’ll meet', 'Someone from our product team, start to finish'),
    ...(booked?.name ? [row('Name', booked.name)] : []),
    ...(booked?.email ? [row('Email', booked.email)] : []),
    ...(booked?.volume ? [row('Monthly conversations', booked.volume)] : []),
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
            maxWidth: '1200px',
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
            {booked?.name ? `Thanks, ${booked.name.split(' ')[0]} — the` : 'The'} confirmation and the joining link
            are on their way to your inbox.
          </p>
        </div>
      </section>

      {/* The booking itself, then the ways to keep it and pass it on. */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,6vw,72px) clamp(20px,4vw,32px)' }}>
        {/* `stretch` so the share column ends level with the booking card. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(330px,100%),1fr))', gap: 'clamp(20px,3vw,28px)', alignItems: 'stretch' }}>

          <div style={{ ...CARD, padding: 'clamp(24px,3vw,34px)', minWidth: '0' }}>
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

          <div style={{ minWidth: '0', display: 'flex', flexDirection: 'column', gap: 'clamp(20px,3vw,28px)' }}>
            <div style={{ ...CARD, padding: 'clamp(24px,3vw,34px)' }}>
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
            <div style={{ ...CARD, padding: 'clamp(24px,3vw,34px)', flex: '1' }}>
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

  /* The confirmation owns the whole page — the booking panel has nothing left
     to say once the slot is taken. */
  if (booked) return success;

  return (
    <section style={{ background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(44px,6vw,80px) clamp(20px,4vw,32px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px,3.4vw,44px)' }}>
          <h1
            style={{
              fontSize: 'var(--fs-hero)',
              fontWeight: 'var(--fw-hero)',
              letterSpacing: '-0.04em',
              lineHeight: '1.06',
              margin: '0 0 16px',
              textWrap: 'balance',
            }}
          >
            Book a Personalized Demo
          </h1>
          <p
            style={{
              fontSize: 'var(--fs-body)',
              lineHeight: '1.65',
              color: 'var(--color-text-muted)',
              maxWidth: '40em',
              margin: '0 auto',
              textWrap: 'balance',
            }}
          >
            Experience how Converse360 can transform your customer engagement. Select a time below to connect with
            our product specialists.
          </p>
        </div>

        <div
          className="demo-shell"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,330px)',
            gap: 'clamp(16px,1.8vw,20px)',
            alignItems: 'stretch',
          }}
        >
          <div
            className="demo-picker"
            style={{ ...CARD, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}
          >
            {calendar}
            {details}
          </div>

          {sidebar}
        </div>
      </div>
    </section>
  );
}
