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
 * Render once, on a page whose markup carries `data-reveal`.
 */
export default function RevealAnimator() {
  useEffect(() => {
    const els = Array.prototype.slice.call(
      document.querySelectorAll('[data-reveal]')
    ) as HTMLElement[];
    if (!els.length) return;

    // only now hide them, so a script failure can never leave content invisible
    document.documentElement.classList.add('reveal-on');

    if (!window.IntersectionObserver) {
      els.forEach((el) => el.classList.add('is-in'));
      return () => document.documentElement.classList.remove('reveal-on');
    }

    let pending = els.slice();
    const show = (el: HTMLElement) => {
      el.classList.add('is-in');
      observer.unobserve(el);
      pending = pending.filter((x) => x !== el);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => observer.observe(el));

    const sweep = () => {
      if (!pending.length) {
        window.removeEventListener('scroll', onScroll);
        return;
      }
      pending.slice().forEach((el) => {
        if (el.getBoundingClientRect().top < 0) show(el);
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
      pending.slice().forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) show(el);
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
