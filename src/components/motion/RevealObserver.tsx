"use client";

import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every `[data-reveal]` element.
 * Reveals play once. Content is only hidden while `html.js` is set and the
 * user has not asked for reduced motion (see base.css), so nothing essential
 * depends on this script running.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-revealed");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => io.observe(el));
    scan();

    // Pick up elements rendered after navigation or state changes.
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
