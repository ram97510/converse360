'use client';

import { useEffect } from 'react';

/**
 * Scroll-reveal for the `[data-reveal]` elements on the landing page.
 *
 * A direct port of `initRevealAnimation()` from the source page's DCLogic
 * class, including its three layers of defence — the elements are only hidden
 * once this has run, so a script failure can never leave content invisible:
 *
 *  1. an IntersectionObserver at threshold 0.12 with a -6% bottom margin,
 *  2. a scroll sweep that shows anything already above the viewport top (a deep
 *     link, a restored scroll position, the End key, a fast flick — all land
 *     past an element before the observer ever samples it),
 *  3. a 1500 ms interval backstop that shows anything at or above the viewport
 *     bottom, whatever else went wrong.
 *
 * What gets observed is a *unit*, not always the marked element:
 *
 *  - `data-reveal` and `data-reveal="rise"` observe the element itself. `rise`
 *    animates its children, but as one choreographed group — the flow rail's
 *    four steps are meant to come up together, and the rail's own CSS keys its
 *    card/disc/number timings off `.is-in` on the container.
 *  - `data-reveal="stagger"` observes each direct child separately. A 2×2 grid
 *    of tall cards is taller than the viewport, so observing the container
 *    would fire every card the moment row 1 appeared — rows below the fold
 *    would finish animating unseen and sit there static by the time you
 *    scrolled to them. Per-child units mean each row animates as it arrives.
 *
 * Delays come from `--reveal-d`, stamped on by stampStagger at reveal time so
 * the cascade follows the rows the layout actually produced at this width.
 *
 * Render once, on a page whose markup carries `data-reveal`.
 */

/** seconds added per step across a row, and per row down the container */
const COL_STEP = 0.09;
const ROW_STEP = 0.16;

const kids = (el: HTMLElement) =>
  Array.prototype.slice.call(el.children) as HTMLElement[];

/**
 * Stamp `--reveal-d` on each direct child of a stagger/rise container.
 *
 * Children are bucketed into rows by their measured offsetTop — a wrapping grid
 * puts four cards on one row at desktop width and two on each of two rows
 * further down, and the cascade should follow that, not the DOM index. A row
 * cascades along its own children; each row starts one ROW_STEP after the row
 * above it, which only shows when several rows enter the viewport together.
 * Measured on reveal, so the row map is the one actually on screen.
 */
function stampStagger(container: HTMLElement) {
  let row = -1;
  let rowTop = -Infinity;
  let col = 0;
  kids(container).forEach((kid) => {
    const top = kid.offsetTop;
    // 8px of slack absorbs sub-pixel differences between cards on one row
    if (top > rowTop + 8) {
      row += 1;
      rowTop = top;
      col = 0;
    } else {
      col += 1;
    }
    kid.style.setProperty(
      '--reveal-d',
      `${(row * ROW_STEP + col * COL_STEP).toFixed(3)}s`
    );
  });
}

/**
 * The elements to observe, and what to reveal when each one arrives.
 *
 * A stagger container contributes one unit per child; everything else is a
 * single unit that is its own target. `parent` is re-measured at reveal time
 * rather than stamped up front, so a resize between load and scroll still
 * cascades along the rows on screen.
 */
type Unit = { el: HTMLElement; parent: HTMLElement | null };

function units(els: HTMLElement[]): Unit[] {
  const out: Unit[] = [];
  els.forEach((el) => {
    if (el.getAttribute('data-reveal') === 'stagger') {
      kids(el).forEach((kid) => out.push({ el: kid, parent: el }));
    } else {
      out.push({ el, parent: null });
    }
  });
  return out;
}

export default function RevealAnimator() {
  useEffect(() => {
    const marked = Array.prototype.slice.call(
      document.querySelectorAll('[data-reveal]')
    ) as HTMLElement[];
    if (!marked.length) return;

    // only now hide them, so a script failure can never leave content invisible
    document.documentElement.classList.add('reveal-on');

    const all = units(marked);
    const reveal = (unit: Unit) => {
      if (unit.parent) stampStagger(unit.parent);
      else if (unit.el.getAttribute('data-reveal') === 'rise') {
        stampStagger(unit.el);
      }
      unit.el.classList.add('is-in');
    };

    if (!window.IntersectionObserver) {
      all.forEach(reveal);
      return () => document.documentElement.classList.remove('reveal-on');
    }

    let pending = all.slice();
    const byEl = new Map(all.map((u) => [u.el, u]));
    const show = (el: HTMLElement) => {
      const unit = byEl.get(el);
      if (!unit) return;
      reveal(unit);
      observer.unobserve(el);
      byEl.delete(el);
      pending = pending.filter((x) => x !== unit);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    all.forEach((unit) => observer.observe(unit.el));

    const sweep = () => {
      if (!pending.length) {
        window.removeEventListener('scroll', onScroll);
        return;
      }
      pending.slice().forEach((unit) => {
        if (unit.el.getBoundingClientRect().top < 0) show(unit.el);
      });
    };
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        sweep();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(sweep);

    const backstop = setInterval(() => {
      if (!pending.length) {
        clearInterval(backstop);
        return;
      }
      pending.slice().forEach((unit) => {
        if (unit.el.getBoundingClientRect().top < window.innerHeight) {
          show(unit.el);
        }
      });
    }, 1500);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      clearInterval(backstop);
      document.documentElement.classList.remove('reveal-on');
    };
  }, []);

  return null;
}
