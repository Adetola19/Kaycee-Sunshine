"use client";

import { useEffect, useRef } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Max translate as a fraction of the frame height. Capped at 0.08 by the brand rules. */
  strength?: number;
};

/**
 * Restrained parallax for at most two large photographs per page.
 * Only listens to scroll while the frame is on screen; off under reduced motion.
 */
export function Parallax({ children, className, style, strength = 0.06 }: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    const layer = inner.current;
    if (!el || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const amount = Math.min(strength, 0.08);
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      layer.style.transform = `translate3d(0, ${(clamped * amount * rect.height).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={outer} className={["parallax", className].filter(Boolean).join(" ")} style={style}>
      <div ref={inner} className="parallax-inner">
        {children}
      </div>
    </div>
  );
}
