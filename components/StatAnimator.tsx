'use client';

import { useEffect } from 'react';

/**
 * Count-up animator for the `.animate-stat` figures.
 *
 * A direct port of `initStatAnimation()` from the source pages' DCLogic class:
 * each element carries `data-val` (or `data-val1` / `data-val2`), an optional
 * `data-decimals`, and a `data-format` string with `{val}` / `{val1}` / `{val2}`
 * placeholders. The number counts up over 2000 ms on a 1 - (1-p)³ ease the first
 * time the element scrolls into view, then the observer releases it.
 *
 * Render once per page that contains `.animate-stat` elements; the markup itself
 * is unchanged from the source.
 */
export default function StatAnimator() {
  useEffect(() => {
    const stats = document.querySelectorAll('.animate-stat');
    if (!stats.length) return;

    const animate = (el: Element) => {
      const duration = 2000;
      const startTime = performance.now();

      const val = parseFloat(el.getAttribute('data-val') ?? '');
      const val1 = parseFloat(el.getAttribute('data-val1') ?? '');
      const val2 = parseFloat(el.getAttribute('data-val2') ?? '');
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const format = el.getAttribute('data-format') ?? '';

      const update = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        let text = format;
        if (!isNaN(val)) {
          const current = (ease * val).toFixed(decimals);
          text = text.replace('{val}', current);
        }
        if (!isNaN(val1) && !isNaN(val2)) {
          const current1 = Math.floor(ease * val1);
          const current2 = Math.floor(ease * val2);
          text = text.replace('{val1}', String(current1)).replace('{val2}', String(current2));
        }

        el.textContent = text;

        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    if (!window.IntersectionObserver) {
      stats.forEach((stat) => animate(stat));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    stats.forEach((stat) => observer.observe(stat));
    return () => observer.disconnect();
  }, []);

  return null;
}
