'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Hx from '@/components/Hx';
import { ALL, POSTS } from '@/lib/blog-data';

/**
 * The blog index body.
 *
 * A direct port of the source page's renderVals(): a topic filter whose chips
 * are the distinct post tags with "All topics" in front, and one boolean per
 * card telling it whether the current filter keeps it.
 *
 * The cards are written out in the markup rather than looped, exactly as in the
 * source — so the real image URLs and copy are in the HTML, nothing 404s before
 * hydration, and the articles stay readable to crawlers. POSTS therefore only
 * drives the filter, not the rendering.
 */
export default function BlogBody() {
  const [topic, setTopic] = useState(ALL);

  const topics = [ALL].concat(POSTS.map((p) => p.tag).filter((t, i, a) => a.indexOf(t) === i));
  const shown = topic === ALL ? POSTS : POSTS.filter((p) => p.tag === topic);

  const chips = topics.map((t) => {
    const on = t === topic;
    return {
      name: t,
      selected: on,
      bg: on ? 'var(--brand)' : 'var(--color-bg)',
      fg: on ? 'var(--color-bg)' : 'var(--color-text-muted)',
      border: on ? 'var(--brand)' : 'var(--color-divider)',
      select: () => setTopic(t),
    };
  });

  // one flag per card, in the order they appear in the markup
  const show1 = shown.indexOf(POSTS[0]) !== -1;
  const show2 = shown.indexOf(POSTS[1]) !== -1;
  const show3 = shown.indexOf(POSTS[2]) !== -1;
  const isEmpty = shown.length === 0;
  const countLabel = shown.length === 1 ? '1 article' : shown.length + ' articles';

  return (
    <>
      <section style={{ background: "var(--color-surface)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,7vw,84px) clamp(20px,4vw,32px)", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.06", marginBottom: "20px", maxWidth: "18em", marginLeft: "auto", marginRight: "auto", textWrap: "balance" }}>
            {' '}Turn Conversations Into Growth</h1>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", lineHeight: "1.65", color: "var(--color-text-muted)", maxWidth: "42em", marginLeft: "auto", marginRight: "auto" }}>
            {' '}Practical insights on WhatsApp, AI agents, conversational sales, and smarter ways to turn everyday customer
            conversations into real business results.</p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(40px,5.5vw,64px) clamp(20px,4vw,32px) clamp(48px,6.5vw,80px)" }}>

          <div className="blog-toolbar">
            <div className="blog-filters" role="tablist" aria-label="Filter articles by topic">
              {chips.map((c, i) => (<Fragment key={i}>
                <button type="button" className="blog-chip" role="tab" aria-selected={c.selected} onClick={c.select} style={{ border: `1px solid ${c.border}`, background: c.bg, color: c.fg }}>{c.name}</button>
              </Fragment>))}
            </div>
            <span className="blog-count">{countLabel}</span>
          </div>

          {/* Cards are written out rather than looped, so the real image URLs and
               copy are in the HTML source: nothing 404s before the runtime hydrates,
               and the articles are still readable to crawlers. sc-if leaves no
               wrapper element, so each card stays a direct grid child. */}
          <div className="blog-index-grid">

            {show1 && (<>
              <Link className="blog-card" href="/blog/first-reply">
                <div className="blog-shot">
                  <img src="/assets/blog-whatsapp-essential.jpg" alt="WhatsApp on mobile screen representing business conversation and customer engagement" />
                </div>
                <div className="blog-body">
                  <h2 className="blog-title">Why WhatsApp Is Essential for Business in 2026: Benefits, Use Cases & Customer
                    Engagement</h2>
                  <p className="blog-excerpt">The rise of WhatsApp has been so quiet and understated that it has emerged as
                    one of the most powerful business communication tools of the decade.</p>
                  <div className="blog-foot">
                    <span className="blog-author">
                      <span className="blog-avatar" aria-hidden="true">AM</span>
                      <span>
                        <span className="blog-author-name">Arjun</span>
                        <span className="blog-author-role">Content Writer</span>
                      </span>
                    </span>
                    <span className="blog-date">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="5" width="17" height="16" rx="3"></rect>
                        <path d="M8 3.5v3M16 3.5v3M3.5 10h17"></path>
                      </svg>Aug 22, 2026{' '}
                    </span>
                  </div>
                </div>
              </Link>
            </>)}

            {show2 && (<>
              <Link className="blog-card" href="/blog/one-inbox">
                <div className="blog-shot">
                  <img src="/assets/blog-event-management.jpg" alt="Event details and chats handled seamlessly inside WhatsApp" />
                </div>
                <div className="blog-body">
                  <h2 className="blog-title">How to Use WhatsApp for Event Management: A Complete Guide for Event Organisers{' '}
                  </h2>
                  <p className="blog-excerpt">In the organisation of any event, there are a lot of things to do, like guest
                    list management, coordination with vendors, booking of tickets and much more in one go.</p>
                  <div className="blog-foot">
                    <span className="blog-author">
                      <span className="blog-avatar" aria-hidden="true">PS</span>
                      <span>
                        <span className="blog-author-name">Priya</span>
                        <span className="blog-author-role">Content Writer</span>
                      </span>
                    </span>
                    <span className="blog-date">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="5" width="17" height="16" rx="3"></rect>
                        <path d="M8 3.5v3M16 3.5v3M3.5 10h17"></path>
                      </svg>Aug 22, 2026{' '}
                    </span>
                  </div>
                </div>
              </Link>
            </>)}

            {show3 && (<>
              <Link className="blog-card" href="/blog/ad-attribution">
                <div className="blog-shot">
                  <img src="/assets/blog-conversational-sales.jpg" alt="Conversational sales flow on screen representing automated engagement and team conversion" />
                </div>
                <div className="blog-body">
                  <h2 className="blog-title">Conversational Sales Strategy: How to Engage Customers and Increase Conversions{' '}
                  </h2>
                  <p className="blog-excerpt">The traditional sales funnel is fast becoming irrelevant compared to something
                    much more efficient: conversation. The buyers of today do not want to go through the trouble of
                    filling out forms and waiting for follow-ups.</p>
                  <div className="blog-foot">
                    <span className="blog-author">
                      <span className="blog-avatar" aria-hidden="true">RD</span>
                      <span>
                        <span className="blog-author-name">Arjun</span>
                        <span className="blog-author-role">Content Writer</span>
                      </span>
                    </span>
                    <span className="blog-date">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3.5" y="5" width="17" height="16" rx="3"></rect>
                        <path d="M8 3.5v3M16 3.5v3M3.5 10h17"></path>
                      </svg>Aug 22, 2026{' '}
                    </span>
                  </div>
                </div>
              </Link>
            </>)}

          </div>

          {isEmpty && (<>
            <div className="blog-empty">
              <p style={{ fontSize: "16.5px", fontWeight: "600", color: "var(--color-text)", marginBottom: "8px" }}>Nothing here yet</p>
              <p style={{ fontSize: "15px", color: "var(--color-text-subtle)" }}>No articles under this topic. Pick another one above.</p>
            </div>
          </>)}

        </div>
      </section>

      <section style={{ background: "var(--brand)", color: "var(--color-bg)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,6.5vw,76px) clamp(20px,4vw,32px)", display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", gap: "24px", textAlign: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(24px,3.2vw,34px)", fontWeight: "700", letterSpacing: "-0.03em", marginBottom: "10px" }}>
              {' '}Want this working for your business?</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", maxWidth: "32em", margin: "0 auto" }}>See Converse360 on your
              own channels. We will walk you through it — no setup fee, live in days.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
            <Hx link className="btn-fx btn-fx-dark" href="/contact" style={{ background: "var(--color-bg)", color: "var(--color-text)", fontSize: "16px", fontWeight: "700", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "var(--color-surface)" }}>Book a Free Demo</Hx>
            <Hx link className="btn-fx" href="/pricing" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "var(--color-bg)", fontSize: "16px", fontWeight: "500", padding: "16px 30px", borderRadius: "999px" }} hoverStyle={{ background: "rgba(255,255,255,0.12)" }}>See pricing</Hx>
          </div>
        </div>
      </section>
    </>
  );
}
