"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/content/media";
import { Placeholder } from "./Visual";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";

type GalleryProps = {
  items: GalleryItem[];
  label: string;
};

/**
 * Horizontal conference gallery: native touch scrolling with snap, on its own
 * axis (overscroll contained), keyboard-scrollable, with prev/next controls.
 * Real photographs open in a lightbox; placeholders do not.
 */
export function Gallery({ items, label }: GalleryProps) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByItem = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(".gallery__item");
    const step = item ? item.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const openLightbox = (index: number, from: HTMLElement) => {
    opener.current = from;
    setLightbox(index);
    dialog.current?.showModal();
  };

  const active = lightbox !== null ? items[lightbox] : undefined;

  return (
    <div className="gallery">
      <ul
        ref={track}
        className="gallery__track"
        role="list"
        tabIndex={0}
        aria-label={`${label} — scroll horizontally`}
      >
        {items.map((item, i) => (
          <li key={i} className={item.wide ? "gallery__item gallery__item--wide" : "gallery__item"}>
            <figure data-reveal="mask" style={{ ["--i" as string]: Math.min(i, 5) }}>
              <div className="gallery__frame">
                {item.image ? (
                  <button type="button" onClick={(e) => openLightbox(i, e.currentTarget)} aria-label={`Enlarge: ${item.image.alt}`}>
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      sizes="(min-width: 1024px) 33vw, 82vw"
                    />
                  </button>
                ) : (
                  <Placeholder shot={item.placeholder.shot} ratio={item.placeholder.ratio} />
                )}
              </div>
              <figcaption className="t-meta">
                {item.caption ?? <Pending>event name, city and year</Pending>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="container gallery__controls">
        <p className="t-meta" aria-hidden="true">
          Swipe or use the arrows
        </p>
        <div className="gallery__buttons">
          <button type="button" className="icon-btn" onClick={() => scrollByItem(-1)} disabled={edges.start} aria-label="Previous images">
            <Icon name="chevron-left" className="kc-icon--lg" />
          </button>
          <button type="button" className="icon-btn" onClick={() => scrollByItem(1)} disabled={edges.end} aria-label="Next images">
            <Icon name="chevron-right" className="kc-icon--lg" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="kc-modal on-ground"
        aria-label={active?.image?.alt ?? "Image"}
        onClose={() => {
          setLightbox(null);
          opener.current?.focus({ preventScroll: true });
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="kc-modal__bar">
          <p>{active?.caption ?? active?.image?.alt}</p>
          <button type="button" className="icon-btn" onClick={() => dialog.current?.close()} aria-label="Close image">
            <Icon name="close" className="kc-icon--lg" />
          </button>
        </div>
        {active?.image && (
          <Image
            className="kc-modal__img"
            src={active.image.src}
            alt={active.image.alt}
            width={active.image.width}
            height={active.image.height}
            sizes="100vw"
          />
        )}
      </dialog>
    </div>
  );
}
