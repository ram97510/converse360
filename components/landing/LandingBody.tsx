'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import Hx from '@/components/Hx';
import DailyShowcase from '@/components/landing/DailyShowcase';
import { BRAND, INK, MUTED, WHITE, WHATSAPP, INSTAGRAM } from '@/lib/tokens';
import {
  DATA,
  DAILY_DATA,
  EXTRA,
  FEATURE_ICON_OFF,
  FEATURE_TABS,
  HERO_PHRASES,
} from '@/lib/landing-data';
import { INDUSTRIES } from '@/lib/industries-data';

/**
 * A phone snap-carousel: the scroller ref, which slide is in view, a way to
 * jump to one, and optional auto-advance.
 *
 * `index` is read back from scrollLeft rather than driving the scroll, so a
 * native swipe stays the source of truth and the dots only follow it. The step
 * is measured from the first slide (width + gap) so it stays right whatever
 * width the stylesheet gives a slide.
 *
 * Auto-advance follows the rule the desktop platform strip already uses: it
 * only runs while the carousel is on screen, and the first touch of it — a
 * swipe or a dot — holds it for good, so nothing moves under the visitor who
 * has taken over. Scrolling the section out of view releases that hold, so
 * coming back to it plays on from the slide they left it on.
 *
 * Telling our own smooth scroll apart from a swipe is what `autoScroll` is for:
 * a programmatic scroll emits the same scroll events a finger does, so the flag
 * is raised before the call and lowered only once the events stop arriving.
 */
function useCarousel(count: number, autoMs?: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const autoScroll = useRef(false);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = (el: HTMLDivElement) => {
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return el.clientWidth;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    return first.offsetWidth + gap;
  };

  const scrollToSlide = (k: number, auto: boolean) => {
    const el = ref.current;
    if (!el) return;
    if (auto) autoScroll.current = true;
    el.scrollTo({ left: step(el) * k, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const k = Math.round(el.scrollLeft / step(el));
    setIndex(Math.max(0, Math.min(count - 1, k)));

    if (autoScroll.current) {
      // still our own scroll: keep the flag up until the events stop
      if (settle.current) clearTimeout(settle.current);
      settle.current = setTimeout(() => {
        autoScroll.current = false;
      }, 160);
      return;
    }
    setHeld(true);
  };

  const go = (k: number) => {
    setHeld(true);
    scrollToSlide(k, false);
  };

  // only auto-advance while the carousel is actually on screen
  useEffect(() => {
    const el = ref.current;
    if (!autoMs || !el) return;
    if (!window.IntersectionObserver) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
          if (!entry.isIntersecting) setHeld(false);
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoMs]);

  useEffect(() => {
    if (!autoMs || !inView || held) return;
    // the rest of the page drops its motion under prefers-reduced-motion; a
    // carousel that scrolls itself has to honour that too
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      scrollToSlide((Math.round(el.scrollLeft / step(el)) + 1) % count, true);
    }, autoMs);
    return () => clearInterval(t);
  }, [autoMs, inView, held, count]);

  return { ref, index, onScroll, go };
}

/** The screenshot for each platform tab, index-aligned with FEATURE_TABS.
 *
 * These were five near-identical inline <figure> blocks, one per `feature === n`
 * guard. Indexed here so both layouts can reach them: the desktop card shows
 * the active tab's shot, the phone carousel shows every one.
 */
const PLAT_SHOTS: { src: string; alt: string }[] = [
  { src: '/assets/unified_inbox_showcase.jpg', alt: 'Converse360 unified inbox — WhatsApp, Instagram and website chats on one screen, with customer details and deals beside the conversation' },
  { src: '/assets/chatbot_builder_showcase.jpg', alt: 'No-code chatbot builder — steps dragged onto a canvas: trigger, question, send catalog, book a call, assign to a person' },
  { src: '/assets/whatsapp_catalog_showcase.jpg', alt: 'WhatsApp catalog and store — products, prices and pay in chat, without leaving WhatsApp' },
  { src: '/assets/whatsapp_store_showcase.jpg', alt: 'WhatsApp Commerce — seamless product checkout, catalog browsing, and automated transactions directly inside WhatsApp' },
  { src: '/assets/converse_agent_showcase.jpg', alt: 'Converse360 Agent — AI agents answering enquiries day and night, and handing a conversation to the team when it matters' },
];

/** One platform screenshot, framed the way every tab panel frames it. */
function PlatShot({ index }: { index: number }) {
  const shot = PLAT_SHOTS[index];
  return (
    <figure className="plat-shot" style={{ borderRadius: '16px', overflow: 'hidden' }}>
      <img src={shot.src} width="1920" height="1080" loading="lazy" decoding="async" alt={shot.alt} />
    </figure>
  );
}

/** One ticked bullet under an everyday-feature heading, in either layout. */
function DailyBullet({ text }: { text: string }) {
  return (
    <div className="daily-nav-bullet">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5"></path>
      </svg>
      <span>{text}</span>
    </div>
  );
}

/**
 * The landing page body.
 *
 * A direct port of the source page's DCLogic class. Five independent pieces of
 * state — the hero typewriter, the platform-feature tabs, the everyday-features
 * rail, and the industry picker with its self-playing chat thread — plus the
 * derived values its renderVals() produced.
 *
 * Every timing below is the source's: 120 ms per typed character, 1800 ms held
 * at the end of a phrase, 60 ms per deleted character, 400 ms before the next
 * phrase; 5000 ms per feature tab, 6000 ms per rail item; 500 ms to the first
 * chat message and 1250 ms to each one after it.
 */
export default function LandingBody({ defaultIndustry = 'Real Estate' }: { defaultIndustry?: string }) {
  const [industry, setIndustry] = useState(defaultIndustry);
  const [shown, setShown] = useState(0);
  const [feature, setFeature] = useState(0);
  const [daily, setDaily] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroCharIndex, setHeroCharIndex] = useState(0);
  const [heroTyping, setHeroTyping] = useState(true);

  // renderVals() also returned `brand`, which fed the `--brand` custom property
  // on the source's page wrapper. PageShell replaces that wrapper and :root
  // declares --brand, so nothing here reads it.
  const active = DATA.find((d) => d.name === industry) || DATA[2];
  const extra = EXTRA[active.name] || { metrics: [], note: '' };
  const activeSlug = INDUSTRIES.find((ind) => ind.name === active.name)?.slug || '';

  // The hero headline types a phrase out, holds it, deletes it and moves to the
  // next. The source re-armed a single timeout from each setState callback;
  // depending on this effect's own three state values does the same thing.
  useEffect(() => {
    const phrase = HERO_PHRASES[heroIndex];
    let t: ReturnType<typeof setTimeout>;
    if (heroTyping) {
      if (heroCharIndex < phrase.length) {
        t = setTimeout(() => setHeroCharIndex((c) => c + 1), 120);
      } else {
        t = setTimeout(() => setHeroTyping(false), 1800);
      }
    } else if (heroCharIndex > 0) {
      t = setTimeout(() => setHeroCharIndex((c) => c - 1), 60);
    } else {
      t = setTimeout(() => {
        setHeroIndex((i) => (i + 1) % HERO_PHRASES.length);
        setHeroCharIndex(0);
        setHeroTyping(true);
      }, 400);
    }
    return () => clearTimeout(t);
  }, [heroIndex, heroCharIndex, heroTyping]);

  // The platform strip only auto-advances while the "Everything in one place"
  // card is on screen, and a tab click holds it on that tab — the visitor has
  // taken over, so nothing moves under them. Moving off the section releases the
  // hold, so the next time it scrolls back into view it plays on from the tab
  // they left it on. The daily rail below still restarts from zero on a manual
  // pick, which is what the source's startDailyAutoPlay did; the nonce in its
  // dependency list is what re-arms that interval.
  const platRef = useRef<HTMLDivElement | null>(null);
  const [platIn, setPlatIn] = useState(false);
  const [platHeld, setPlatHeld] = useState(false);
  useEffect(() => {
    const el = platRef.current;
    if (!el) return;
    if (!window.IntersectionObserver) {
      setPlatIn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setPlatIn(entry.isIntersecting);
          if (!entry.isIntersecting) setPlatHeld(false);
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const platPlaying = platIn && !platHeld;

  // Clearing the interval is the whole of the pause. Re-arming it when
  // platPlaying turns back on starts a fresh 5000 ms, in step with the CSS bar,
  // which .plat-card[data-playing] restarts at that same moment. It has to be an
  // attribute, not a class: RevealAnimator adds .is-in to that same element by
  // hand, and a React-managed className would wipe it and leave the card at
  // opacity 0.
  useEffect(() => {
    if (!platPlaying) return;
    const t = setInterval(() => setFeature((f) => (f + 1) % FEATURE_TABS.length), 5000);
    return () => clearInterval(t);
  }, [platPlaying]);
  const selectFeature = useCallback((k: number) => {
    setFeature(k);
    setPlatHeld(true);
  }, []);

  const dailyRef = useRef<HTMLElement | null>(null);
  const [dailyIn, setDailyIn] = useState(false);
  const [dailyHeld, setDailyHeld] = useState(false);
  useEffect(() => {
    const el = dailyRef.current;
    if (!el) return;
    if (!window.IntersectionObserver) {
      setDailyIn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setDailyIn(entry.isIntersecting);
          if (!entry.isIntersecting) setDailyHeld(false);
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const dailyPlaying = dailyIn && !dailyHeld;

  const [dailyNonce, setDailyNonce] = useState(0);
  useEffect(() => {
    if (!dailyPlaying) return;
    const t = setInterval(() => setDaily((d) => (d + 1) % DAILY_DATA.length), 6000);
    return () => clearInterval(t);
  }, [dailyNonce, dailyPlaying]);
  const selectDaily = useCallback((k: number) => {
    setDaily(k);
    setDailyNonce((n) => n + 1);
    setDailyHeld(true);
  }, []);

  // The thread reveals one message at a time: the first after 500 ms, the rest
  // every 1250 ms, stopping once the thread is exhausted. Picking an industry
  // resets it to zero.
  useEffect(() => {
    if (shown >= active.thread.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 500 : 1250);
    return () => clearTimeout(t);
  }, [shown, active.thread.length]);

  const pick = useCallback((name: string) => {
    setIndustry(name);
    setShown(0);
  }, []);

  const shownCount = Math.min(shown, active.thread.length);
  const next = active.thread[shownCount];
  const threadDone = !next;

  // A no-break space while the phrase is empty, so the line never collapses.
  const heroPhrase = HERO_PHRASES[heroIndex].slice(0, heroCharIndex) || '\u00A0';

  const features = FEATURE_TABS.map((f, k) => ({
    name: f.name,
    iconFile: f.iconFile,
    iconFilter: k === feature ? f.filter : FEATURE_ICON_OFF,
    selected: k === feature,
    fg: k === feature ? 'var(--color-text)' : '#6E7370',
    weight: k === feature ? 700 : 500,
    select: () => selectFeature(k),
  }));
  const activeFeature = FEATURE_TABS[feature];

  // The two phone carousels on this page: the platform tabs and the everyday
  // features. Both replace a desktop picker that does not survive a phone width.
  // 5000 ms per slide — the same beat the desktop tab strip runs at
  const platCar = useCarousel(FEATURE_TABS.length, 5000);
  const dailyCar = useCarousel(DAILY_DATA.length);

  const dailyRail = DAILY_DATA.map((d, k) => {
    const on = k === daily;
    return {
      name: d.name,
      num: '0' + (k + 1),
      tagline: d.tagline,
      desc: d.desc,
      bullets: d.bullets.map((b) => ({ text: b })),
      selected: on,
      activeClass: on ? 'is-active' : '',
      titleFg: on ? 'var(--color-text)' : '#4A4A4D',
      weight: on ? 700 : 600,
      select: () => selectDaily(k),
    };
  });

  // The testimonial section is static markup in the source: three hard-coded
  // cards, no binding and no click handler. The source's renderVals() still
  // computed clients / quoteText / quoteName / quoteCompany and kept a `client`
  // index, but no markup ever reads them — leftovers from an earlier revision.
  // Not carried over.

  const industries = DATA.map((d) => ({
    name: d.name,
    selected: d.name === active.name,
    bg: d.name === active.name ? 'var(--color-text)' : 'var(--color-bg)',
    fg: d.name === active.name ? 'var(--color-bg)' : 'var(--color-text)',
    border: d.name === active.name ? 'var(--color-text)' : 'var(--color-divider)',
    select: () => pick(d.name),
  }));

  const activeName = active.name;
  const activeBlurb = active.blurb;
  const activePoints = active.points;
  const activeMetrics = extra.metrics.map(([value, label]) => ({ value, label }));
  const activeNote = extra.note;

  const typing = true;
  const typingAlign = threadDone || next[0] === 'in' ? 'flex-start' : 'flex-end';
  const typingBg = threadDone || next[0] === 'in' ? 'var(--color-bg)' : 'var(--color-whatsapp-bubble)';
  const typingBorder = threadDone || next[0] === 'in' ? 'var(--color-divider)' : 'var(--color-whatsapp-bubble)';

  const activeThread = active.thread.slice(0, shownCount).map(([dir, text, fileName, fileMeta]) => ({
    text,
    fileName: fileName || '',
    fileMeta: fileMeta || '',
    isFile: !!fileName,
    isText: !fileName,
    align: dir === 'in' ? 'flex-start' : 'flex-end',
    bg: dir === 'in' ? 'var(--color-bg)' : 'var(--color-whatsapp-bubble)',
    border: dir === 'in' ? 'var(--color-divider)' : 'var(--color-whatsapp-bubble)',
    radius: dir === 'in' ? '12px 12px 12px 2px' : '12px 12px 2px 12px',
  }));

  return (
    <>
      <section id="top" style={{ position: "relative", overflow: "hidden", padding: "clamp(56px,7vw,96px) clamp(20px,4vw,32px) clamp(56px,7vw,88px)" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: "0", pointerEvents: "none", backgroundImage: "linear-gradient(var(--color-divider) 1px,transparent 1px),linear-gradient(90deg,var(--color-divider) 1px,transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(120% 90% at 50% 0%,#000 35%,transparent 78%)", WebkitMaskImage: "radial-gradient(120% 90% at 50% 0%,#000 35%,transparent 78%)" }}>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: "-220px", transform: "translateX(-50%)", width: "min(1100px,120%)", height: "520px", pointerEvents: "none", background: "radial-gradient(50% 50% at 50% 50%,rgba(0,171,86,0.16) 0%,rgba(0,171,86,0.06) 45%,transparent 72%)" }}>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "1px", background: "var(--color-divider)", display: "none" }}>
        </div>
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", textAlign: "center", animation: "rise .7s ease both" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", justifyContent: "center", gap: "10px", marginBottom: "26px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "11px", border: "1.5px solid var(--brand)", background: "var(--color-bg)", borderRadius: "999px", padding: "10px 20px 10px 13px" }}>
              <img src="/assets/verified-icon.jpg" alt="Verified" style={{ width: "26px", height: "26px", objectFit: "contain", display: "block", borderRadius: "50%", flex: "none" }} />
              <span style={{ fontSize: "clamp(14px,1.5vw,16px)", fontWeight: "700", lineHeight: "1.25", color: "var(--color-text)", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>Official
                WhatsApp <span style={{ color: "var(--brand)" }}>Business Platform</span></span>
            </div>
            <span aria-hidden="true" style={{ width: "1px", alignSelf: "stretch", background: "var(--color-divider)", margin: "2px 4px", flex: "none" }}></span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "11px", border: "1.5px solid var(--color-meta-blue)", background: "var(--color-bg)", borderRadius: "999px", padding: "10px 20px" }}>
              <img src="/assets/meta-mark.png" alt="Meta" style={{ height: "22px", width: "auto", display: "block", flex: "none" }} />
              <span style={{ fontSize: "clamp(14px,1.5vw,16px)", fontWeight: "700", lineHeight: "1.25", letterSpacing: "-0.01em", color: "var(--color-text)", whiteSpace: "nowrap" }}>Meta{' '}
                <span style={{ color: "var(--color-meta-blue)" }}>Tech Provider</span></span>
            </div>
          </div>
          <h1 style={{ fontSize: "var(--fs-hero)", lineHeight: "1.05", fontWeight: "var(--fw-hero)", letterSpacing: "-0.035em", marginBottom: "22px", textWrap: "balance" }}>
            {' '}One inbox. Every customer.<br /><span className="hero-rotator" style={{ color: "var(--brand)" }}>{heroPhrase}</span></h1>
          <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.55", color: "var(--color-text-muted)", maxWidth: "60em", margin: "0 auto 30px", textWrap: "pretty" }}>
            {' '}Stop switching between apps and missing important conversations. Manage WhatsApp, Instagram, and website
            leads from one AI-powered inbox built for faster conversions.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "34px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "12px 24px", fontSize: "17px", fontWeight: "500", boxShadow: "0 2px 8px rgba(24,24,24,0.05)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill={WHATSAPP}>
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-4-2.4 10 10 0 0 1-2.1-3c-.2-.6-.3-1.2 0-1.7.2-.4.6-.9.9-1 .2-.2.6-.1.8.2l.8 1.4c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.3 0 .6.4.7 1 1.3 1.6 1.8.5.4 1 .6 1.3.7.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.3.7-.2l1.5.8c.3.1.4.4.3.7z">
              </path>
            </svg>WhatsApp</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "12px 24px", fontSize: "17px", fontWeight: "500", boxShadow: "0 2px 8px rgba(24,24,24,0.05)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={INSTAGRAM} strokeWidth="2" strokeLinecap="round">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle cx="17.5" cy="6.5" r="1" fill={INSTAGRAM} stroke="none"></circle>
            </svg>Instagram</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "12px 24px", fontSize: "17px", fontWeight: "500", boxShadow: "0 2px 8px rgba(24,24,24,0.05)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C5CE0" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="9.5"></circle>
              <path d="M2.5 12h19M12 2.5c2.6 3 2.6 16 0 19M12 2.5c-2.6 3-2.6 16 0 19"></path>
            </svg>AI Agent</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "12px 24px", fontSize: "17px", fontWeight: "500", boxShadow: "0 2px 8px rgba(24,24,24,0.05)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2C7BE5" strokeWidth="1.8" strokeLinecap="round">
              <rect x="2.5" y="4" width="19" height="14" rx="2.5"></rect>
              <path d="M2.5 8h19M6 14h6"></path>
              <circle cx="5.5" cy="6" r="0.6" fill="#2C7BE5"></circle>
            </svg>Web Assistant</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "999px", padding: "12px 24px", fontSize: "17px", fontWeight: "500", boxShadow: "0 2px 8px rgba(24,24,24,0.05)" }}><img src="/assets/meta-mark.png" alt="" style={{ height: "20px", width: "auto", display: "block", flex: "none" }} />Meta Ads
              Manager</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
            <Hx link className="btn-fx btn-fx-brand hero-cta-pulse" href="/book-a-demo" style={{ background: "var(--brand)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "var(--color-text)" }}>Book a Free Demo</Hx>
            <Hx link className="btn-fx btn-fx-dark" href="/pricing" style={{ background: "var(--color-text)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "500", padding: "16px 30px", borderRadius: "999px", border: "1px solid transparent" }} hoverStyle={{ background: "var(--color-bg)", color: "var(--color-text)", border: "1px solid var(--color-text)" }}>Pricing</Hx>
          </div>
          <div style={{ fontSize: "13.5px", color: "var(--color-text-muted)", paddingTop: "12px" }}>No setup fee · Live in days, not months</div>
        </div>
      </section>







      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(20px,4vw,32px)" }}>
          <div data-reveal style={{ maxWidth: "760px", margin: "0 auto clamp(32px,4vw,44px)" }}>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "12px", textAlign: "center" }}>
              {' '}Why
              WhatsApp comes first</h2>
            {/* <p style={{ fontSize: "clamp(15px,1.6vw,17.5px)", color: "var(--color-text-muted)", textAlign: "center" }}>It's the one app your
              customers already have
              open.</p> */}
          </div>
          <div className="wa-stats" data-reveal="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(228px,100%),1fr))", gap: "20px" }}>
            <Hx as="div" style={{ position: "relative", overflow: "hidden", border: "1px solid #E9EDEB", borderRadius: "16px", background: "linear-gradient(180deg,#F1FAF3 0%,var(--color-bg) 55%,var(--color-bg) 100%)", padding: "26px 20px 38px", textAlign: "center", boxShadow: "0 1px 2px rgba(24,24,24,0.04)", transition: "box-shadow .25s ease" }} hoverStyle={{ boxShadow: "0 12px 30px rgba(24,24,24,0.09)" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: "18px", left: "16px", width: "42px", height: "34px", backgroundImage: "radial-gradient(#A5D8BC 1.15px,transparent 1.15px)", backgroundSize: "8px 8px", opacity: "0.85" }}></span>
              <span aria-hidden="true" style={{ position: "absolute", top: "18px", right: "16px", width: "42px", height: "34px", backgroundImage: "radial-gradient(#A5D8BC 1.15px,transparent 1.15px)", backgroundSize: "8px 8px", opacity: "0.85" }}></span>
              <svg aria-hidden="true" viewBox="0 0 300 64" preserveAspectRatio="none" style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "58px", display: "block" }}>
                <path d="M0 30C46 6 92 50 150 32c58-18 104 20 150 2v30H0z" fill="#A9DCC1" opacity="0.5"></path>
                <path d="M0 44C48 24 96 58 150 44c54-14 102 12 150 0v20H0z" fill="#A9DCC1" opacity="0.85"></path>
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ width: "58px", height: "58px", borderRadius: "50%", background: "#bce4cf", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
                  <img src="/assets/icons/Openrates.svg" alt="Open Rates" style={{ width: "25px", height: "25px", display: "block", filter: "brightness(0) saturate(100%) invert(44%) sepia(98%) saturate(185%) hue-rotate(96deg) brightness(83%) contrast(180%)" }} />
                </div>
                <div className="animate-stat" data-val="98" data-format="{val}%" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px,3.4vw,40px)", fontWeight: "800", letterSpacing: "-0.035em", lineHeight: "1", whiteSpace: "nowrap", color: "#0B8043" }}>
                  {' '}98%</div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--color-text)", marginTop: "8px", textWrap: "balance" }}>Open Rates{' '}
                </div>
                <span style={{ display: "block", width: "28px", height: "3px", borderRadius: "99px", background: "#0B8043", opacity: "0.8", margin: "12px auto 14px" }}></span>
                <p style={{ fontSize: "12.5px", lineHeight: "1.6", color: "var(--color-text-muted)", textWrap: "pretty" }}>Messages on WhatsApp get
                  seen, not missed.</p>
              </div>
            </Hx>
            <Hx as="div" style={{ position: "relative", overflow: "hidden", border: "1px solid #E9EDEB", borderRadius: "16px", background: "linear-gradient(180deg,#F4F8FE 0%,var(--color-bg) 55%,var(--color-bg) 100%)", padding: "26px 20px 38px", textAlign: "center", boxShadow: "0 1px 2px rgba(24,24,24,0.04)", transition: "box-shadow .25s ease" }} hoverStyle={{ boxShadow: "0 12px 30px rgba(24,24,24,0.09)" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: "18px", left: "16px", width: "42px", height: "34px", backgroundImage: "radial-gradient(#BFD6F7 1.15px,transparent 1.15px)", backgroundSize: "8px 8px", opacity: "0.85" }}></span>
              <span aria-hidden="true" style={{ position: "absolute", top: "18px", right: "16px", width: "42px", height: "34px", backgroundImage: "radial-gradient(#BFD6F7 1.15px,transparent 1.15px)", backgroundSize: "8px 8px", opacity: "0.85" }}></span>
              <svg aria-hidden="true" viewBox="0 0 300 64" preserveAspectRatio="none" style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "58px", display: "block" }}>
                <path d="M0 30C46 6 92 50 150 32c58-18 104 20 150 2v30H0z" fill="#CBDEF9" opacity="0.5"></path>
                <path d="M0 44C48 24 96 58 150 44c54-14 102 12 150 0v20H0z" fill="#CBDEF9" opacity="0.85"></path>
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ width: "58px", height: "58px", borderRadius: "50%", background: "#C1D8F8", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
                  <img src="/assets/icons/Click.svg" alt="Click Rates" style={{ width: "25px", height: "25px", display: "block", filter: "brightness(0) saturate(100%) invert(32%) sepia(85%) saturate(2258%) hue-rotate(206deg) brightness(97%) contrast(92%)" }} />
                </div>
                <div className="animate-stat" data-val1="45" data-val2="60" data-format="{val1}–{val2}%" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px,3.4vw,40px)", fontWeight: "800", letterSpacing: "-0.035em", lineHeight: "1", whiteSpace: "nowrap", color: "#1B5FD4" }}>
                  {' '}45–60%</div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--color-text)", marginTop: "8px", textWrap: "balance" }}>Click Rates{' '}
                </div>
                <span style={{ display: "block", width: "28px", height: "3px", borderRadius: "99px", background: "#1B5FD4", opacity: "0.8", margin: "12px auto 14px" }}></span>
                <p style={{ fontSize: "12.5px", lineHeight: "1.6", color: "var(--color-text-muted)", textWrap: "pretty" }}>Higher click-through rates
                  than email and SMS.</p>
              </div>
            </Hx>
            <Hx as="div" style={{ position: "relative", overflow: "hidden", border: "1px solid #E9EDEB", borderRadius: "16px", background: "linear-gradient(180deg,#FEFAF0 0%,var(--color-bg) 55%,var(--color-bg) 100%)", padding: "26px 20px 38px", textAlign: "center", boxShadow: "0 1px 2px rgba(24,24,24,0.04)", transition: "box-shadow .25s ease" }} hoverStyle={{ boxShadow: "0 12px 30px rgba(24,24,24,0.09)" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "88%", height: "74px", backgroundImage: "radial-gradient(#EFCF8A 1.15px,transparent 1.15px)", backgroundSize: "9px 9px", opacity: "0.75" }}></span>
              <svg aria-hidden="true" viewBox="0 0 300 64" preserveAspectRatio="none" style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "58px", display: "block" }}>
                <path d="M0 30C46 6 92 50 150 32c58-18 104 20 150 2v30H0z" fill="#F9DFA6" opacity="0.5"></path>
                <path d="M0 44C48 24 96 58 150 44c54-14 102 12 150 0v20H0z" fill="#F9DFA6" opacity="0.85"></path>
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ width: "58px", height: "58px", borderRadius: "50%", background: "#F6C85B", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
                  <img src="/assets/icons/Users.svg" alt="Active Users Worldwide" style={{ width: "25px", height: "25px", display: "block", filter: "brightness(0) saturate(100%) invert(43%) sepia(58%) saturate(1210%) hue-rotate(11deg) brightness(94%) contrast(92%)" }} />
                </div>
                <div className="animate-stat" data-val="2.60" data-decimals="2" data-format="{val}Bn+" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px,3.4vw,40px)", fontWeight: "800", letterSpacing: "-0.035em", lineHeight: "1", whiteSpace: "nowrap", color: "#E8892B" }}>
                  {' '}2.60Bn+</div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--color-text)", marginTop: "8px", textWrap: "balance" }}>Active Users
                  Worldwide{' '}
                </div>
                <span style={{ display: "block", width: "28px", height: "3px", borderRadius: "99px", background: "#E8892B", opacity: "0.8", margin: "12px auto 14px" }}></span>
                <p style={{ fontSize: "12.5px", lineHeight: "1.6", color: "var(--color-text-muted)", textWrap: "pretty" }}>A massive global audience
                  you can reach instantly.</p>
              </div>
            </Hx>
            <Hx as="div" style={{ position: "relative", overflow: "hidden", border: "1px solid #E9EDEB", borderRadius: "16px", background: "linear-gradient(180deg,#FAF6FE 0%,var(--color-bg) 55%,var(--color-bg) 100%)", padding: "26px 20px 38px", textAlign: "center", boxShadow: "0 1px 2px rgba(24,24,24,0.04)", transition: "box-shadow .25s ease" }} hoverStyle={{ boxShadow: "0 12px 30px rgba(24,24,24,0.09)" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: "18px", left: "16px", width: "42px", height: "34px", backgroundImage: "radial-gradient(#DEC8F7 1.15px,transparent 1.15px)", backgroundSize: "8px 8px", opacity: "0.85" }}></span>
              <span aria-hidden="true" style={{ position: "absolute", top: "18px", right: "16px", width: "42px", height: "34px", backgroundImage: "radial-gradient(#DEC8F7 1.15px,transparent 1.15px)", backgroundSize: "8px 8px", opacity: "0.85" }}></span>
              <svg aria-hidden="true" viewBox="0 0 300 64" preserveAspectRatio="none" style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "58px", display: "block" }}>
                <path d="M0 30C46 6 92 50 150 32c58-18 104 20 150 2v30H0z" fill="#E2CFF8" opacity="0.5"></path>
                <path d="M0 44C48 24 96 58 150 44c54-14 102 12 150 0v20H0z" fill="#E2CFF8" opacity="0.85"></path>
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ width: "58px", height: "58px", borderRadius: "50%", background: "#DBC4F6", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
                  <img src="/assets/icons/Engagementrate.svg" alt="Engagement Rate" style={{ width: "25px", height: "25px", display: "block", filter: "brightness(0) saturate(100%) invert(32%) sepia(71%) saturate(2206%) hue-rotate(244deg) brightness(97%) contrast(98%)" }} />
                </div>
                <div className="animate-stat" data-val="70" data-format="{val}%" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px,3.4vw,40px)", fontWeight: "800", letterSpacing: "-0.035em", lineHeight: "1", whiteSpace: "nowrap", color: "#8B3FD9" }}>
                  {' '}70%</div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--color-text)", marginTop: "8px", textWrap: "balance" }}>Engagement
                  Rate{' '}
                </div>
                <span style={{ display: "block", width: "28px", height: "3px", borderRadius: "99px", background: "#8B3FD9", opacity: "0.8", margin: "12px auto 14px" }}></span>
                <p style={{ fontSize: "12.5px", lineHeight: "1.6", color: "var(--color-text-muted)", textWrap: "pretty" }}>Drive real conversations and
                  stronger connections.</p>
              </div>
            </Hx>
          </div>

          <div className="proof-shot" data-reveal style={{ maxWidth: "950px", margin: "22px auto 0" }}>
            <img src="/assets/new/why-whatsapp-comesfirst.webp" alt="A customer sees a WhatsApp ad for a backpack, asks about it in chat, gets the price and an offer code, and the order is confirmed — with result badges for higher conversions, more orders and customer satisfaction." style={{ width: "100%", height: "auto", display: "block" }} />
          </div>

        </div>
      </section>





      <section style={{ background: "var(--color-surface-2)", position: "relative", overflow: "hidden" }}>
        {/* Background Ambient Accents */}
        <span aria-hidden="true" style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "1000px", height: "500px", background: "radial-gradient(50% 50% at 50% 50%, rgba(229,72,77,0.04) 0%, transparent 70%)", pointerEvents: "none" }}></span>

        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(60px,8vw,96px) clamp(20px,4vw,32px)", position: "relative" }}>

          {/* SECTION HEADER */}
          <div data-reveal style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 48px" }}>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "800", letterSpacing: "-0.035em", color: "var(--color-text)", marginBottom: "14px", lineHeight: "1.15" }}>
              {' '}Where customers slip through{' '}
            </h2>
            {/* <p style={{ fontSize: "clamp(15.5px,1.7vw,18px)", lineHeight: "1.6", color: "#4A4A4D", margin: "0" }}>
              {' '}Most businesses do not lose customers because their product is wrong. They lose them in the gaps between
              apps, replies, and follow-ups.{' '}
            </p> */}
          </div>

          {/* 2x2 PROBLEM GRID */}
          <div className="problem-grid" data-reveal="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(500px,100%),1fr))", gap: "28px" }}>

            {/* CARD 1: SCATTERED CONVERSATIONS */}
            <div className="card-hover" style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "20px", padding: "clamp(24px,3.5vw,32px)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ position: "relative", zIndex: "2", display: "flex", flexDirection: "column", marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#F3EEFE", border: "1px solid #E2D9F9", display: "grid", placeItems: "center", flex: "none" }}>
                    <img src="/assets/icons/Scattered%20Conversations.svg" alt="Scattered Conversations" style={{ width: "24px", height: "24px", display: "block", filter: "brightness(0) saturate(100%) invert(27%) sepia(85%) saturate(2250%) hue-rotate(248deg) brightness(97%) contrast(93%)" }} />
                  </span>
                  <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "800", letterSpacing: "-0.025em", color: "var(--color-text)", margin: "0" }}>
                    {' '}Scattered Conversations</h3>
                </div>
                <p style={{ fontSize: "var(--fs-body)", fontWeight: "600", color: "#334155", marginBottom: "8px", lineHeight: "1.45" }}>
                  {' '}Three apps, three logins, one exhausted team.{' '}
                </p>
                <p style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#64748B", margin: "0" }}>
                  {' '}Your team jumps between WhatsApp, Instagram and Web all day. Context gets lost in the switch, and
                  the same customer gets asked the same question twice.{' '}
                </p>
              </div>

              {/* ARTWORK CONTAINER */}
              <div style={{ flex: "1", minHeight: "236px", border: "1px solid var(--color-divider)", borderRadius: "14px", overflow: "hidden" }}>
                <img src="/assets/problem-scattered-art-new.png" alt="Scattered Conversations" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
              </div>
            </div>

            {/* CARD 2: SLOW REPLIES */}
            <div className="card-hover" style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "20px", padding: "clamp(24px,3.5vw,32px)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ position: "relative", zIndex: "2", display: "flex", flexDirection: "column", marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#EEF6FF", border: "1px solid #D2E5FF", display: "grid", placeItems: "center", flex: "none" }}>
                    <img src="/assets/icons/Slow%20Replies.svg" alt="Slow Replies" style={{ width: "24px", height: "24px", display: "block", filter: "brightness(0) saturate(100%) invert(41%) sepia(85%) saturate(1915%) hue-rotate(182deg) brightness(96%) contrast(101%)" }} />
                  </span>
                  <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "800", letterSpacing: "-0.025em", color: "var(--color-text)", margin: "0" }}>
                    {' '}Slow Replies</h3>
                </div>
                <p style={{ fontSize: "var(--fs-body)", fontWeight: "600", color: "#334155", marginBottom: "8px", lineHeight: "1.45" }}>
                  {' '}Customers wait hours for an answer they needed in minutes.{' '}
                </p>
                <p style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#64748B", margin: "0" }}>
                  {' '}People buy from whoever replies first. By the time your team opens the message, the enquiry has
                  usually gone somewhere else.{' '}
                </p>
              </div>

              {/* ARTWORK CONTAINER */}
              <div style={{ flex: "1", minHeight: "236px", border: "1px solid var(--color-divider)", borderRadius: "14px", overflow: "hidden" }}>
                <img src="/assets/problem-slow-art-new.jpg" alt="Slow Replies" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
              </div>
            </div>

            {/* CARD 3: FORGOTTEN FOLLOW-UPS */}
            <div className="card-hover" style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "20px", padding: "clamp(24px,3.5vw,32px)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ position: "relative", zIndex: "2", display: "flex", flexDirection: "column", marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#FFF7ED", border: "1px solid #FFEDD5", display: "grid", placeItems: "center", flex: "none" }}>
                    <img src="/assets/icons/Forgotten%20Follow-ups.svg" alt="Forgotten Follow-ups" style={{ width: "24px", height: "24px", display: "block", filter: "brightness(0) saturate(100%) invert(47%) sepia(76%) saturate(2390%) hue-rotate(16deg) brightness(97%) contrast(96%)" }} />
                  </span>
                  <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "800", letterSpacing: "-0.025em", color: "var(--color-text)", margin: "0" }}>
                    {' '}Forgotten Follow-ups</h3>
                </div>
                <p style={{ fontSize: "var(--fs-body)", fontWeight: "600", color: "#334155", marginBottom: "8px", lineHeight: "1.45" }}>
                  {' '}A quiet customer today is a lost sale tomorrow.{' '}
                </p>
                <p style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#64748B", margin: "0" }}>
                  {' '}Interested buyers go quiet and stay that way. Without a reminder in front of someone, the conversation
                  simply ends.{' '}
                </p>
              </div>

              {/* ARTWORK CONTAINER */}
              <div style={{ flex: "1", minHeight: "236px", border: "1px solid var(--color-divider)", borderRadius: "14px", overflow: "hidden" }}>
                <img src="/assets/problem-followups-art-new.png" alt="Forgotten Follow-ups" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
              </div>
            </div>

            {/* CARD 4: WASTED AD SPEND */}
            <div className="card-hover" style={{ background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "20px", padding: "clamp(24px,3.5vw,32px)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ position: "relative", zIndex: "2", display: "flex", flexDirection: "column", marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                  <span style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#FDF0F6", border: "1px solid #FBCFE8", display: "grid", placeItems: "center", flex: "none" }}>
                    <img src="/assets/icons/Wasted%20Ad%20Spend.svg" alt="Wasted Ad Spend" style={{ width: "24px", height: "24px", display: "block", filter: "brightness(0) saturate(100%) invert(33%) sepia(65%) saturate(2238%) hue-rotate(303deg) brightness(92%) contrast(92%)" }} />
                  </span>
                  <h3 style={{ fontSize: "var(--fs-card-title)", fontWeight: "800", letterSpacing: "-0.025em", color: "var(--color-text)", margin: "0" }}>
                    {' '}Wasted Ad Spend</h3>
                </div>
                <p style={{ fontSize: "var(--fs-body)", fontWeight: "600", color: "#334155", marginBottom: "8px", lineHeight: "1.45" }}>
                  {' '}You can't tell which ads actually turned into sales.{' '}
                </p>
                <p style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "#64748B", margin: "0" }}>
                  {' '}Money keeps going into campaigns that never close, because nothing connects the chat that started from
                  an ad to the order that came out of it.{' '}
                </p>
              </div>

              {/* ARTWORK CONTAINER */}
              <div style={{ flex: "1", minHeight: "236px", border: "1px solid var(--color-divider)", borderRadius: "14px", overflow: "hidden" }}>
                <img src="/assets/problem-adspend-art-new.jpg" alt="Wasted Ad Spend" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
              </div>
            </div>

          </div>

        </div>
      </section>

      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,8vw,84px) clamp(20px,4vw,32px)" }}>
          <div data-reveal style={{ textAlign: "center", marginBottom: "clamp(40px,5vw,60px)" }}>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.035em", lineHeight: "1.06", maxWidth: "20em", marginLeft: "auto", marginRight: "auto" }}>
              {' '}One message. Start to finish.</h2>
          </div>

          <div className="flow" data-reveal="rise">

            <div className="flow-step">
              <div className="flow-head">
                <span className="flow-num">01</span>
                <span className="flow-disc">
                  <svg className="flow-icon" viewBox="0 0 96 96" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="flowG1a" x1="20" y1="14" x2="78" y2="62" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7FD9AC" />
                        <stop offset="1" stopColor="#4BC489" />
                      </linearGradient>
                      <linearGradient id="flowG1b" x1="14" y1="26" x2="68" y2="82" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#18BC67" />
                        <stop offset="1" stopColor="#00874A" />
                      </linearGradient>
                    </defs>
                    <path d="M40 12h30a12 12 0 0 1 12 12v20a12 12 0 0 1-12 12h-4v10l-11-10H40a12 12 0 0 1-12-12V24a12 12 0 0 1 12-12z" fill="url(#flowG1a)" />
                    <path d="M26 30h32a13 13 0 0 1 13 13v20a13 13 0 0 1-13 13H40L26 88V76a13 13 0 0 1-13-13V43a13 13 0 0 1 13-13z" fill="url(#flowG1b)" />
                    <circle cx="30" cy="53" r="4.4" fill={WHITE} />
                    <circle cx="44" cy="53" r="4.4" fill={WHITE} fillOpacity=".85" />
                    <circle cx="58" cy="53" r="4.4" fill={WHITE} fillOpacity=".68" />
                  </svg>
                </span>
                <span className="flow-rail" aria-hidden="true">
                  <span className="flow-chev">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="flow-card">
                <span className="flow-tab" aria-hidden="true"></span>
                <h3 className="flow-title">Message Arrives</h3>
                <p className="flow-text">A customer messages you on WhatsApp, Instagram, or your website. It lands in one
                  inbox — instantly, no matter which channel they used.</p>
              </div>
            </div>

            <div className="flow-step">
              <div className="flow-head">
                <span className="flow-num">02</span>
                <span className="flow-disc">
                  <svg className="flow-icon" viewBox="0 0 96 96" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="flowG2a" x1="18" y1="26" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor={WHITE} />
                        <stop offset="1" stopColor="#DCEFE5" />
                      </linearGradient>
                      <linearGradient id="flowG2b" x1="30" y1="40" x2="68" y2="62" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#123B28" />
                        <stop offset="1" stopColor="#06251A" />
                      </linearGradient>
                      <linearGradient id="flowG2c" x1="40" y1="6" x2="56" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#18BC67" />
                        <stop offset="1" stopColor="#00874A" />
                      </linearGradient>
                    </defs>
                    <path d="M48 18v10" stroke="#00A155" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="48" cy="12" r="7" fill="url(#flowG2c)" />
                    <rect x="10" y="42" width="10" height="18" rx="5" fill="#39C883" />
                    <rect x="76" y="42" width="10" height="18" rx="5" fill="#39C883" />
                    <rect x="18" y="26" width="60" height="52" rx="19" fill="url(#flowG2a)" />
                    <rect x="18" y="26" width="60" height="52" rx="19" stroke="#BFE4D2" strokeWidth="1.6" />
                    <rect x="28" y="38" width="40" height="26" rx="12" fill="url(#flowG2b)" />
                    <circle cx="39" cy="51" r="4.6" fill="#3BE38C" />
                    <circle cx="57" cy="51" r="4.6" fill="#3BE38C" />
                    <path d="M40 70h16" stroke="#9CCFB6" strokeWidth="3.4" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="flow-rail" aria-hidden="true">
                  <span className="flow-chev">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="flow-card">
                <span className="flow-tab" aria-hidden="true"></span>
                <h3 className="flow-title">AI Responds Immediately</h3>
                <p className="flow-text">Our AI agent answers common questions right away — stock, pricing, order status —
                  using the knowledge you've already given it.</p>
              </div>
            </div>

            <div className="flow-step">
              <div className="flow-head">
                <span className="flow-num">03</span>
                <span className="flow-disc">
                  <svg className="flow-icon" viewBox="0 0 96 96" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="flowG3a" x1="12" y1="20" x2="72" y2="44" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5FD09B" />
                        <stop offset="1" stopColor="#2CB878" />
                      </linearGradient>
                      <linearGradient id="flowG3b" x1="16" y1="40" x2="80" y2="84" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#12B863" />
                        <stop offset="1" stopColor="#007B43" />
                      </linearGradient>
                      <linearGradient id="flowG3c" x1="56" y1="58" x2="84" y2="86" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#18BC67" />
                        <stop offset="1" stopColor="#00713F" />
                      </linearGradient>
                    </defs>
                    <path d="M12 28a8 8 0 0 1 8-8h16l7 9h25a8 8 0 0 1 8 8v6H12V28z" fill="url(#flowG3a)" />
                    <rect x="26" y="30" width="44" height="34" rx="5" fill={WHITE} />
                    <path d="M35 41h26M35 50h18" stroke="#8FD3B2" strokeWidth="3.4" strokeLinecap="round" />
                    <path d="M12 41h64a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V41z" fill="url(#flowG3b)" />
                    <circle cx="70" cy="72" r="15" fill="url(#flowG3c)" stroke={WHITE} strokeWidth="3.4" />
                    <path d="M63.5 72.5l4.6 4.6 9-9.4" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="flow-rail" aria-hidden="true">
                  <span className="flow-chev">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="flow-card">
                <span className="flow-tab" aria-hidden="true"></span>
                <h3 className="flow-title">Deal Gets Tracked</h3>
                <p className="flow-text">The conversation becomes a deal card automatically. Nothing depends on memory.
                  Nothing gets forgotten. Everything stays connected.</p>
              </div>
            </div>

            <div className="flow-step">
              <div className="flow-head">
                <span className="flow-num">04</span>
                <span className="flow-disc">
                  <svg className="flow-icon" viewBox="0 0 96 96" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="flowG4a" x1="8" y1="30" x2="46" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7FD9AC" />
                        <stop offset="1" stopColor="#43C185" />
                      </linearGradient>
                      <linearGradient id="flowG4b" x1="52" y1="30" x2="90" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#7FD9AC" />
                        <stop offset="1" stopColor="#43C185" />
                      </linearGradient>
                      <linearGradient id="flowG4c" x1="28" y1="22" x2="70" y2="84" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#15BA65" />
                        <stop offset="1" stopColor="#007B43" />
                      </linearGradient>
                    </defs>
                    <circle cx="22" cy="38" r="11" fill="url(#flowG4a)" />
                    <path d="M2 76c0-11 9-19 20-19s20 8 20 19H2z" fill="url(#flowG4a)" />
                    <circle cx="74" cy="38" r="11" fill="url(#flowG4b)" />
                    <path d="M54 76c0-11 9-19 20-19s20 8 20 19H54z" fill="url(#flowG4b)" />
                    <circle cx="48" cy="32" r="15" fill="url(#flowG4c)" stroke={WHITE} strokeWidth="3.4" />
                    <path d="M20 82c0-15 12.5-26 28-26s28 11 28 26H20z" fill="url(#flowG4c)" stroke={WHITE} strokeWidth="3.4" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="flow-card">
                <span className="flow-tab" aria-hidden="true"></span>
                <h3 className="flow-title">Your Team Steps In When It Matters</h3>
                <p className="flow-text">When a conversation needs
                  a human touch, it’s routed
                  to the right person on your
                  team with full context.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="platform" style={{ backgroundColor: "var(--color-surface)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,8vw,84px) clamp(20px,4vw,32px)", backgroundColor: "var(--color-surface)" }}>
          <h2 data-reveal style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "clamp(28px,3.4vw,40px)", textAlign: "center" }}>
            {' '}One Platform. Endless Possibilities.</h2>
          <div className="plat-card" data-reveal data-playing={platPlaying ? '' : undefined} ref={platRef}>
            <div className="plat-tabbar" style={{ marginBottom: "clamp(18px,2.2vw,24px)" }}>
              <div role="tablist" aria-label="Platform features" className="plat-tabs">
                {features.map((ft, i) => (<Fragment key={i}>
                  <button type="button" role="tab" className="plat-tab" aria-selected={ft.selected} onClick={ft.select} style={{ font: "inherit", cursor: "pointer", textAlign: "center", color: ft.fg, fontSize: "clamp(15.5px, 1.25vw, 17.5px)", fontWeight: ft.weight }}>
                    {ft.selected && (<>
                      <span className="plat-tab-progress"></span>
                    </>)}
                    <img className="plat-tab-ico" src={ft.iconFile} alt="" aria-hidden="true" style={{ width: "24px", height: "24px", display: "block", filter: ft.iconFilter }} />
                    <span className="plat-tab-label">{ft.name}</span>
                  </button>
                </Fragment>))}
              </div>
            </div>

            {/* One block saying what the selected tab actually is, styled like the first reference image.
                Keyed on `feature` so the rise animation replays each time the row moves on. */}
            <div
              key={`plat-copy-${feature}`}
              style={{
                textAlign: "left",
                margin: "0 0 clamp(20px, 3.2vw, 28px)",
                padding: "0 6px",
                animation: "rise .45s cubic-bezier(0.16, 1, 0.3, 1) both"
              }}
            >
              <h3 style={{
                fontSize: "clamp(26px, 3vw, 32px)",
                fontWeight: "500",
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                marginBottom: "10px",
                lineHeight: "1.2"
              }}>
                {activeFeature.name}
              </h3>
              <p style={{
                fontSize: "clamp(15px, 1.6vw, 17.5px)",
                lineHeight: "1.6",
                color: "var(--color-text-muted)",
                margin: "0",
                textWrap: "pretty"
              }}>
                {activeFeature.blurb}
              </p>
            </div>

            {/* keyed on the tab so the panel's rise animation replays on each change */}
            <div key={`plat-panel-${feature}`} className="plat-panel" style={{ display: "flex", flexDirection: "column" }}>
              <PlatShot index={feature} />
            </div>
          </div>

          {/* Phone: the five-up tab row cannot hold at this width, so the tabs
              become a snap carousel — one feature, its line of copy and its
              screenshot per slide — with the dots below as the position and the
              way to jump between them. */}
          <div className="plat-stack" data-reveal ref={platCar.ref} onScroll={platCar.onScroll}>
            {features.map((ft, i) => (<Fragment key={i}>
              <div className="plat-slide">
                <div className="plat-slide-head">
                  <img className="plat-slide-ico" src={ft.iconFile} alt="" aria-hidden="true" style={{ filter: FEATURE_TABS[i].filter }} />
                  <h3 className="plat-slide-title">{ft.name}</h3>
                </div>
                <p className="plat-slide-blurb">{FEATURE_TABS[i].blurb}</p>
                <PlatShot index={i} />
              </div>
            </Fragment>))}
          </div>

          <div className="carousel-dots" role="tablist" aria-label="Platform features">
            {features.map((ft, i) => (<Fragment key={i}>
              <button
                type="button"
                role="tab"
                aria-selected={i === platCar.index}
                aria-label={ft.name}
                className={`carousel-dot${i === platCar.index ? ' is-active' : ''}`}
                onClick={() => platCar.go(i)}
              />
            </Fragment>))}
          </div>
        </div>
      </section>

      <section id="daily-features" className="daily-section" ref={dailyRef}>
        {/* Header */}
        <div className="daily-header" data-reveal>
          <h2 className="daily-title">More Tools. More Ways to Grow</h2>
          {/* <p className="daily-subtitle">Six things that quietly do the work while you get on with the business.</p> */}
        </div>

        {/* Desktop / tablet: the rail picks one example, shown alongside it */}
        <div className="daily-grid" data-reveal="stagger">

          {/* Left Column: Interactive Vertical Feature Selector (Matches Images 1, 2 & 3) */}
          <div className="daily-nav">
            {dailyRail.map((item, i) => (<Fragment key={i}>
              <div className={`daily-nav-item ${item.activeClass}`} onClick={item.select}>
                <div className="daily-nav-head">
                  <span className="daily-nav-num">{item.num}</span>
                  <h3 className="daily-nav-title" style={{ color: item.titleFg, fontWeight: item.weight }}>{item.name}</h3>
                </div>

                {item.selected && (<>
                  <div className="daily-nav-body">
                    <div className="daily-nav-bullets">
                      {item.bullets.map((b, j) => (<Fragment key={j}>
                        <DailyBullet text={b.text} />
                      </Fragment>))}
                    </div>
                  </div>
                </>)}
              </div>
            </Fragment>))}
          </div>

          {/* Right Column: Interactive Showcase Container (Matches Image 1, 2, 3) */}
          <div className="daily-showcase-wrap" data-playing={dailyPlaying ? '' : undefined}>

            {/* Top Auto-Play Loading Bar */}
            <div className="daily-progress-bar">
              <div className="daily-progress-fill"></div>
            </div>

            <DailyShowcase index={daily} />
          </div>
        </div>

        {/* Phone: one heading and its own example at a time. No rail and no
            auto-play — the six pairs are a snap carousel, so a swipe brings the
            next one fully into view. */}
        <div
          className="daily-stack"
          data-reveal
          ref={dailyCar.ref}
          onScroll={dailyCar.onScroll}
        >
          {dailyRail.map((item, i) => (<Fragment key={i}>
            <div className="daily-stack-item">
              <div className="daily-stack-head">
                <span className="daily-nav-num">{item.num}</span>
                <h3 className="daily-stack-title">{item.name}</h3>
              </div>
              <div className="daily-nav-bullets daily-stack-bullets">
                {item.bullets.map((b, j) => (<Fragment key={j}>
                  <DailyBullet text={b.text} />
                </Fragment>))}
              </div>
              <div className="daily-showcase-wrap daily-stack-showcase">
                <DailyShowcase index={i} />
              </div>
            </div>
          </Fragment>))}
        </div>

        {/* Which of the six is in view, and a tap target for each */}
        <div className="carousel-dots" role="tablist" aria-label="Everyday features">
          {dailyRail.map((item, i) => (<Fragment key={i}>
            <button
              type="button"
              role="tab"
              aria-selected={i === dailyCar.index}
              aria-label={item.name}
              className={`carousel-dot${i === dailyCar.index ? ' is-active' : ''}`}
              onClick={() => dailyCar.go(i)}
            />
          </Fragment>))}
        </div>
      </section>



      <section id="industries" style={{ position: "relative", zIndex: "7", background: "var(--color-bg)", maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,8vw,84px) clamp(20px,4vw,32px)" }}>
        <h2 data-reveal style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "40px", maxWidth: "22em", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
          {' '}Built for how your business actually sells</h2>
        <div role="tablist" aria-label="Industries" className="scroll-tabs ind-tabs" data-reveal style={{ display: "flex", flexWrap: "nowrap", gap: "12px", marginBottom: "clamp(18px, 2.1vw, 20px)", overflowX: "auto" }}>
          {industries.map((ind, i) => (<Fragment key={i}>
            <Hx as="button" type="button" role="tab" aria-selected={ind.selected} onClick={ind.select} style={{ font: "inherit", cursor: "pointer", whiteSpace: "nowrap", flex: "none", borderWidth: "1px", borderStyle: "solid", borderColor: ind.border, background: ind.bg, color: ind.fg, borderRadius: "999px", padding: "12px 24px", fontSize: "16px", fontWeight: "500" }} hoverStyle={{ borderColor: "var(--brand)" }}>{ind.name}</Hx>
          </Fragment>))}
        </div>
        <div className="ind-grid" data-reveal="stagger" style={{ columnGap: "clamp(36px,5vw,56px)", alignItems: "stretch" }}>
          <div className="ind-copy" style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: "700", letterSpacing: "-0.02em", marginBottom: "10px" }}>{activeName}</h3>
            <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.6", color: "var(--color-text-muted)", marginBottom: "20px" }}>{activeBlurb}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid var(--color-divider)", paddingTop: "20px" }}>
              {activePoints.map((pt, i) => (<Fragment key={i}>
                <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "var(--color-text)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "3px" }}>
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  <span>{pt}</span>
                </div>
              </Fragment>))}
            </div>
          </div>

          {/* The rest of the copy. Split from .ind-copy so the phone can sit
              between the two on a narrow screen — see .ind-grid grid-template-areas. */}
          <div className="ind-copy-rest" style={{ display: "flex", flexDirection: "column" }}>
            <div className="ind-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(150px,100%),1fr))", gap: "16px", borderTop: "1px solid var(--color-divider)", marginTop: "20px", paddingTop: "20px" }}>
              {activeMetrics.map((m, i) => (<Fragment key={i}>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1", color: m.value === '3 sec' ? 'var(--brand)' : 'var(--color-text)' }}>{m.value}</div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "7px", lineHeight: "1.35" }}>{m.label}</div>
                </div>
              </Fragment>))}
            </div>
            <p style={{ fontSize: "var(--fs-body-sm)", lineHeight: "1.6", color: "var(--color-text-muted)", marginTop: "20px" }}>{activeNote}</p>
            <div style={{ marginTop: "20px", border: "1px solid var(--color-divider)", borderRadius: "14px", background: "var(--color-surface-3)", padding: "15px 18px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", flex: "none" }}>
                <span title="WhatsApp" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-whatsapp)", border: "2px solid var(--color-surface-3)", display: "grid", placeItems: "center" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill={WHITE} aria-label="WhatsApp" role="img">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.057-.371-.03-.52-.086-.148-.66-1.59-.905-2.174-.234-.556-.47-.48-.646-.487-.174-.007-.373-.008-.572-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z">
                    </path>
                  </svg>
                </span>
                <span title="Instagram" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "radial-gradient(circle at 30% 107%,#FDF497 0%,#FDF497 5%,#FD5949 45%,#D6249F 60%,#285AEB 90%)", border: "2px solid var(--color-surface-3)", display: "grid", placeItems: "center", marginLeft: "-9px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-label="Instagram" role="img">
                    <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.2"></rect>
                    <circle cx="12" cy="12" r="4.1"></circle>
                    <circle cx="17.3" cy="6.7" r="1.05" fill={WHITE} stroke="none"></circle>
                  </svg>
                </span>
                <span title="Your website" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-text)", border: "2px solid var(--color-surface-3)", display: "grid", placeItems: "center", marginLeft: "-9px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" aria-label="Your website" role="img">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M3 12h18"></path>
                    <path d="M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18"></path>
                  </svg>
                </span>
              </div>
              <div style={{ minWidth: "0", flex: "1" }}>
                <div style={{ fontSize: "14.5px", fontWeight: "600", lineHeight: "1.3" }}>One inbox for every channel</div>
                <div style={{ fontSize: "12.5px", color: "var(--color-text-muted)", marginTop: "3px", lineHeight: "1.45" }}>WhatsApp, Instagram and
                  your
                  website — answered in seconds.</div>
              </div>
            </div>
            <div className="ind-cta" style={{ marginTop: "20px" }}>
              <Hx link className="btn-fx btn-fx-brand btn-fx-arrow" href={`/industries/${activeSlug}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "var(--brand)", color: "#fff", fontSize: "15px", fontWeight: "700", padding: "14px 24px", borderRadius: "999px" }} hoverStyle={{ background: "#181818" }}>
                See it for {activeName}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </Hx>
            </div>
          </div>

          <div className="ind-stage" style={{ position: "relative" }}>
            {/* Concentric premium glowing rings */}
            <div className="ind-ring" style={{ width: "clamp(260px, 42vw, 340px)", aspectRatio: "1", opacity: 1, animationDelay: "0s" }}></div>
            <div className="ind-ring" style={{ width: "clamp(340px, 56vw, 450px)", aspectRatio: "1", opacity: 0.75, animationDelay: "0.4s" }}></div>
            <div className="ind-ring" style={{ width: "clamp(420px, 70vw, 560px)", aspectRatio: "1", opacity: 0.5, animationDelay: "0.8s" }}></div>
            <div className="ind-ring" style={{ width: "clamp(500px, 84vw, 670px)", aspectRatio: "1", opacity: 0.25, animationDelay: "1.2s" }}></div>
            <div className="ind-phone" style={{ position: "relative", height: "620px", display: "flex", flexDirection: "column", width: "min(340px,100%)", maxWidth: "100%", border: "12px solid #1C1C1E", borderRadius: "48px", overflow: "hidden", background: "#1C1C1E", boxShadow: "0 24px 60px rgba(24,24,24,0.18)" }}>
              <div style={{ background: "#075E54", color: "var(--color-bg)", padding: "0 16px 12px" }}>
                {/* iOS status bar + dynamic island, so the handset reads like a real phone */}
                <div className="ind-statusbar" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", height: "42px", margin: "0 -16px", padding: "0 20px", fontSize: "12.5px", fontWeight: "600", letterSpacing: "-0.01em" }}>
                  <span>9:41</span>
                  <span className="ind-island" aria-hidden="true">
                    <span className="ind-island-cam"></span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <svg width="17" height="11" viewBox="0 0 17 11" fill={WHITE} aria-hidden="true">
                      <rect x="0" y="7.5" width="3" height="3.5" rx="1"></rect>
                      <rect x="4.6" y="5.5" width="3" height="5.5" rx="1"></rect>
                      <rect x="9.2" y="3" width="3" height="8" rx="1"></rect>
                      <rect x="13.8" y="0.5" width="3" height="10.5" rx="1"></rect>
                    </svg>
                    <svg width="15" height="11" viewBox="0 0 24 18" fill="none" stroke={WHITE} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M2.5 5.6a14 14 0 0 1 19 0"></path>
                      <path d="M6.4 9.9a8.6 8.6 0 0 1 11.2 0"></path>
                      <path d="M10.2 14.1a3.2 3.2 0 0 1 3.6 0"></path>
                    </svg>
                    <svg width="24" height="11" viewBox="0 0 26 12" fill="none" aria-hidden="true">
                      <rect x="0.75" y="0.75" width="21" height="10.5" rx="3" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2"></rect>
                      <rect x="2.4" y="2.4" width="17" height="7.2" rx="1.8" fill={WHITE}></rect>
                      <path d="M23.4 4.2v3.6a2.1 2.1 0 0 0 0-3.6z" fill="rgba(255,255,255,0.55)"></path>
                    </svg>
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "grid", placeItems: "center", fontSize: "11.5px", fontWeight: "700" }}>C3</span>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>{activeName}</div>
                    <div style={{ fontSize: "10.5px", opacity: ".8" }}>typically replies instantly</div>
                  </div>
                </div>
              </div>
              <div style={{ background: "var(--color-surface)", padding: "16px 14px 14px", display: "flex", flexDirection: "column", gap: "9px", flex: "1", minHeight: "0" }}>
                <div className="ind-thread" style={{ flex: "1", minHeight: "0", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "9px" }}>
                  {activeThread.map((msg, i) => (<Fragment key={i}>
                    {msg.isText && (<>
                      <div style={{ alignSelf: msg.align, maxWidth: "82%", background: msg.bg, border: `1px solid ${msg.border}`, borderRadius: msg.radius, padding: "9px 12px", fontSize: "13.5px", lineHeight: "1.45", animation: "rise .35s ease both" }}>
                        {' '}{msg.text}</div>
                    </>)}
                    {msg.isFile && (<>
                      <div style={{ alignSelf: msg.align, width: "82%", background: msg.bg, border: `1px solid ${msg.border}`, borderRadius: msg.radius, padding: "9px", animation: "rise .35s ease both" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.72)", borderRadius: "8px", padding: "9px 10px" }}>
                          <span style={{ width: "34px", height: "34px", borderRadius: "5px", background: "#E8443A", display: "grid", placeItems: "center", flex: "none" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"></path>
                              <path d="M14 2v5h5"></path>
                            </svg>
                          </span>
                          <span style={{ minWidth: "0", fontSize: "12.5px", fontWeight: "500", lineHeight: "1.3" }}>{msg.fileName}<span style={{ display: "block", fontSize: "11.5px", color: "var(--color-text-muted)", fontWeight: "400" }}>{msg.fileMeta}</span></span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto", flex: "none" }}>
                            <path d="M12 3v13M7 12l5 5 5-5M5 21h14"></path>
                          </svg>
                        </div>
                        <div style={{ fontSize: "13px", lineHeight: "1.45", padding: "8px 3px 1px" }}>{msg.text}</div>
                      </div>
                    </>)}
                  </Fragment>))}
                  {typing && (<>
                    <div style={{ alignSelf: typingAlign, background: typingBg, border: `1px solid ${typingBorder}`, borderRadius: "12px", padding: "11px 14px", display: "flex", gap: "5px", alignItems: "center", animation: "rise .3s ease both" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9AA5A0", animation: "float1 1.1s ease-in-out infinite" }}></span>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9AA5A0", animation: "float1 1.1s .18s ease-in-out infinite" }}></span>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9AA5A0", animation: "float1 1.1s .36s ease-in-out infinite" }}></span>
                    </div>
                  </>)}
                </div>
                <div style={{ flex: "none", display: "flex", alignItems: "center", gap: "8px", paddingTop: "10px" }}>
                  <span style={{ flex: "1", height: "36px", background: "var(--color-bg)", border: "1px solid var(--color-divider)", borderRadius: "999px", display: "flex", alignItems: "center", padding: "0 14px", fontSize: "12.5px", color: "var(--color-text-muted)" }}>Message</span>
                  <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--color-whatsapp)", display: "grid", placeItems: "center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section style={{ background: "var(--color-surface-2)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,8vw,84px) clamp(20px,4vw,32px)" }}>
          <h2 data-reveal style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "36px", textAlign: "center" }}>
            {' '}Not more
            staff. One platform.</h2>

          <div className="cmp-wrap" data-reveal="stagger">

            <div className="cmp-old">
              <div className="cmp-head" style={{ background: "#FBEBEB", borderBottom: "1px solid #F4D6D6" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#E5484D", display: "grid", placeItems: "center", flex: "none" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="3" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12"></path>
                  </svg>
                </span>
                <span style={{ fontSize: "var(--fs-card-title)", fontWeight: "700", color: "var(--color-text)" }}>The Old Way</span>
              </div>

              <div className="cmp-item" style={{ borderBottom: "1px solid #F4DEDE" }}>
                <div className="cmp-item-label">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E5484D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                    <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"></path>
                  </svg>
                  <span style={{ fontSize: "var(--fs-body)", fontWeight: "600", color: "#E5484D" }}>Manual channels</span>
                </div>
                <div className="cmp-item-text">Replies delayed, deals forgotten.</div>
              </div>

              <div className="cmp-item" style={{ borderBottom: "1px solid #F4DEDE", background: "#FEF8F8" }}>
                <div className="cmp-item-label">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E5484D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                    <rect x="4" y="8" width="16" height="12" rx="3.4"></rect>
                    <path d="M12 3.6V8"></path>
                    <circle cx="12" cy="3" r="1.1"></circle>
                    <path d="M2.4 12.6v3M21.6 12.6v3"></path>
                    <circle cx="9.2" cy="13.6" r="1.15"></circle>
                    <circle cx="14.8" cy="13.6" r="1.15"></circle>
                  </svg>
                  <span style={{ fontSize: "var(--fs-body)", fontWeight: "600", color: "#E5484D" }}>Generic chatbot</span>
                </div>
                <div className="cmp-item-text">Answers questions, but doesn’t unify your pipeline or ads.</div>
              </div>

              <div className="cmp-item">
                <div className="cmp-item-label">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E5484D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}>
                    <circle cx="9" cy="8.4" r="3.3"></circle>
                    <path d="M2.8 19.6c0-3.4 2.8-5.6 6.2-5.6s6.2 2.2 6.2 5.6"></path>
                    <path d="M16.4 5.6a3.3 3.3 0 0 1 0 6.2"></path>
                    <path d="M18.2 19.6c0-2.6-.9-4.4-2.4-5.3"></path>
                  </svg>
                  <span style={{ fontSize: "var(--fs-body)", fontWeight: "600", color: "#E5484D" }}>Hiring more staff</span>
                </div>
                <div className="cmp-item-text">Costs more every month, still offline after hours.</div>
              </div>
            </div>

            <div className="cmp-arrow" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "hiwNudge 2.4s ease-in-out infinite" }}>
                <path d="M4 12h14M13 6l6 6-6 6"></path>
              </svg>
            </div>

            <div className="cmp-new">
              <div className="cmp-head" style={{ background: "#EAF7F0", borderBottom: "1px solid #CDEBDA" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "var(--brand)", display: "grid", placeItems: "center", flex: "none" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                </span>
                <span style={{ fontSize: "var(--fs-card-title)", fontWeight: "700", color: "var(--brand)" }}>The Smarter Way</span>
              </div>

              <div className="cmp-new-body">
                <div className="cmp-brand">
                  <span className="cmp-brand-mark" aria-hidden="true" style={{ overflow: "hidden" }}>
                    <img src="/assets/new/bot.png" alt="AI Agent" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </span>
                  <img src="/assets/converse360-logo.png" alt="Converse360" style={{ height: "32px", width: "auto", display: "block", marginTop: "18px" }} />
                  <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.55", color: "var(--color-text-muted)", marginTop: "10px", maxWidth: "16em" }}>One inbox,
                    one
                    pipeline, one AI agent — every channel.</p>
                </div>

                <div className="cmp-wins">
                  <div className="cmp-win" style={{ borderBottom: "1px solid #E8F2EC" }}>
                    <span className="cmp-win-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 13h4l1.5 2.5h7L17 13h4"></path>
                        <path d="M3 13l2.2-6.4A2 2 0 0 1 7.1 5h9.8a2 2 0 0 1 1.9 1.6L21 13v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                        </path>
                      </svg>
                    </span>
                    <div style={{ minWidth: "0" }}>
                      <div className="cmp-win-title">Everything in one inbox</div>
                      <div className="cmp-win-sub">Never miss a message again.</div>
                    </div>
                  </div>

                  <div className="cmp-win" style={{ borderBottom: "1px solid #E8F2EC" }}>
                    <span className="cmp-win-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7h13M18.5 7H21"></path>
                        <circle cx="17.2" cy="7" r="1.6"></circle>
                        <path d="M3 12h5M10.5 12H21"></path>
                        <circle cx="9.2" cy="12" r="1.6"></circle>
                        <path d="M3 17h11M16.5 17H21"></path>
                        <circle cx="15.2" cy="17" r="1.6"></circle>
                      </svg>
                    </span>
                    <div style={{ minWidth: "0" }}>
                      <div className="cmp-win-title">One connected pipeline</div>
                      <div className="cmp-win-sub">From chat to deal, automatically.</div>
                    </div>
                  </div>

                  <div className="cmp-win" style={{ borderBottom: "1px solid #E8F2EC" }}>
                    <span className="cmp-win-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="8" width="16" height="12" rx="3.4"></rect>
                        <path d="M12 3.6V8"></path>
                        <circle cx="12" cy="3" r="1.1"></circle>
                        <path d="M2.4 12.6v3M21.6 12.6v3"></path>
                        <circle cx="9.2" cy="13.6" r="1.15"></circle>
                        <circle cx="14.8" cy="13.6" r="1.15"></circle>
                      </svg>
                    </span>
                    <div style={{ minWidth: "0" }}>
                      <div className="cmp-win-title">AI that works for you</div>
                      <div className="cmp-win-sub">Instant replies. Smarter conversations.</div>
                    </div>
                  </div>

                  <div className="cmp-win">
                    <span className="cmp-win-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 20V12M10 20V7M15 20v-5M20 20V4"></path>
                      </svg>
                    </span>
                    <div style={{ minWidth: "0" }}>
                      <div className="cmp-win-title">More speed, more sales</div>
                      <div className="cmp-win-sub">Less stress. Better results.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,8vw,84px) clamp(20px,4vw,32px)" }}>
          <h2 data-reveal style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "clamp(30px,3.6vw,44px)", textAlign: "center" }}>
            {' '}What our clients say</h2>
          <div className="tst-grid" data-reveal="stagger">

            <div className="tst-card">
              <div className="tst-bubble">
                <svg className="tst-mark" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 5C6.5 5 4 7.6 4 10.8c0 3 2.2 5.4 5 5.4.6 0 1.2-.1 1.7-.3-.5 1.7-2 3-3.8 3.4l.5 1.7c3.4-.7 6-3.8 6-8.2C13.4 7.7 11.8 5 9.5 5zm10 0C16.5 5 14 7.6 14 10.8c0 3 2.2 5.4 5 5.4.6 0 1.2-.1 1.7-.3-.5 1.7-2 3-3.8 3.4l.5 1.7c3.4-.7 6-3.8 6-8.2C23.4 7.7 21.8 5 19.5 5z">
                  </path>
                </svg>
                <p className="tst-quote">We used to lose enquiries between WhatsApp and Instagram. Now everything sits in
                  one place.</p>
              </div>
              <div className="tst-author">
                <span className="tst-avatar" aria-hidden="true">D</span>
                <span>
                  <span className="tst-name">Dffrnt</span>
                </span>
              </div>
            </div>

            <div className="tst-card">
              <div className="tst-bubble">
                <svg className="tst-mark" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 5C6.5 5 4 7.6 4 10.8c0 3 2.2 5.4 5 5.4.6 0 1.2-.1 1.7-.3-.5 1.7-2 3-3.8 3.4l.5 1.7c3.4-.7 6-3.8 6-8.2C13.4 7.7 11.8 5 9.5 5zm10 0C16.5 5 14 7.6 14 10.8c0 3 2.2 5.4 5 5.4.6 0 1.2-.1 1.7-.3-.5 1.7-2 3-3.8 3.4l.5 1.7c3.4-.7 6-3.8 6-8.2C23.4 7.7 21.8 5 19.5 5z">
                  </path>
                </svg>
                <p className="tst-quote">The AI answers the routine questions all day. My team only picks up the
                  conversations that actually need a person.</p>
              </div>
              <div className="tst-author">
                <span className="tst-avatar" aria-hidden="true">T</span>
                <span>
                  <span className="tst-name">TMR</span>
                </span>
              </div>
            </div>

            <div className="tst-card">
              <div className="tst-bubble">
                <svg className="tst-mark" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 5C6.5 5 4 7.6 4 10.8c0 3 2.2 5.4 5 5.4.6 0 1.2-.1 1.7-.3-.5 1.7-2 3-3.8 3.4l.5 1.7c3.4-.7 6-3.8 6-8.2C13.4 7.7 11.8 5 9.5 5zm10 0C16.5 5 14 7.6 14 10.8c0 3 2.2 5.4 5 5.4.6 0 1.2-.1 1.7-.3-.5 1.7-2 3-3.8 3.4l.5 1.7c3.4-.7 6-3.8 6-8.2C23.4 7.7 21.8 5 19.5 5z">
                  </path>
                </svg>
                <p className="tst-quote">For the first time we can see which ad brought which order. That alone changed how
                  we spend.</p>
              </div>
              <div className="tst-author">
                <span className="tst-avatar" aria-hidden="true">C</span>
                <span>
                  <span className="tst-name">Conceps</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section id="faq" style={{ maxWidth: "1440px", margin: "0 auto", padding: "30px clamp(20px,4vw,32px) clamp(56px,8vw,84px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: "clamp(32px,5vw,56px)", alignItems: "start" }}>
          <div data-reveal>
            <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "12px", textAlign: "left" }}>
              {' '}Questions, answered plainly</h2>
            <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.55", color: "var(--color-text-muted)", textAlign: "left" }}>Still unsure? <Link href="/book-a-demo">Book a
              demo</Link> and we'll walk you through it.</p>
          </div>
          <div data-reveal="stagger" style={{ borderTop: "1px solid var(--color-divider)" }}>
            <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "var(--fs-title-sm)", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ flex: "1" }}>Is Converse360 an official WhatsApp API provider?</span>
                <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
              </summary>
              <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Yes. We set you
                up on the official WhatsApp Business Platform through Meta. Your number stays safe and your account
                stays compliant.</p>
            </details>
            <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "var(--fs-title-sm)", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ flex: "1" }}>Do I need a developer to set this up?</span>
                <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
              </summary>
              <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>No. Our team
                handles the setup and verification. After that, everything — flows, replies, broadcasts — is built by
                clicking, not coding.</p>
            </details>
            <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "var(--fs-title-sm)", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ flex: "1" }}>Is the AI agent included, or billed separately?</span>
                <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
              </summary>
              <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>The AI agent is
                part of the Growth and Scale plans. On Starter it can be added on. WhatsApp's own per-message charges
                from Meta are billed at actual cost.</p>
            </details>
            <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "var(--fs-title-sm)", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ flex: "1" }}>Can I use this for Instagram and my website too?</span>
                <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
              </summary>
              <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Yes. Instagram
                DMs and your website chat land in the same inbox, with the same AI agent and the same pipeline.</p>
            </details>
            <details style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <summary style={{ cursor: "pointer", padding: "22px 0", fontSize: "var(--fs-title-sm)", fontWeight: "500", display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ flex: "1" }}>How is ad spend connected to real sales?</span>
                <span style={{ fontSize: "22px", color: "var(--brand)", lineHeight: "1" }}>+</span>
              </summary>
              <p style={{ fontSize: "var(--fs-body)", lineHeight: "1.6", color: "var(--color-text-muted)", padding: "0 0 22px", maxWidth: "44em" }}>Every chat that
                starts from an ad carries that ad's name with it. When the deal is won, you can see which ad brought it
                in.</p>
            </details>
          </div>
        </div>
      </section>

      <section id="cta" style={{ background: "var(--brand)", color: "var(--color-bg)" }}>
        <div data-reveal="stagger" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,8vw,88px) clamp(20px,4vw,32px)" }}>
          <h2 style={{ fontSize: "var(--fs-section)", fontWeight: "700", letterSpacing: "-0.035em", lineHeight: "1.05", marginBottom: "18px", maxWidth: "20em", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            {' '}Your next reply could be automatic.</h2>
          <p style={{ fontSize: "var(--fs-lede)", lineHeight: "1.5", color: "rgba(255,255,255,0.85)", maxWidth: "30em", marginBottom: "34px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            {' '}See it working on your own channels. Fifteen minutes, no slides.</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
            <Hx link className="btn-fx btn-fx-dark" href="/book-a-demo" style={{ background: "var(--color-bg)", color: "var(--color-text)", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "var(--color-surface)" }}>Book a Free Demo</Hx>
            <Hx link className="btn-fx" href="/pricing" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "500", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "rgba(255,255,255,0.12)" }}>See Pricing</Hx>
          </div>
        </div>
      </section>
    </>
  );
}
