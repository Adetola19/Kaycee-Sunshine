"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { videoKindLabel, type Video } from "@/content/media";
import { Icon } from "@/components/ui/Icon";

/**
 * VideoCard — design/components/VideoCard.md.
 * A preview card; the youtube-nocookie player loads only when the visitor
 * chooses to play, inside a modal. Never autoplays on page load.
 */
export function VideoCard({ video }: { video: Video }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const card = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        ref={card}
        type="button"
        className="kc-video"
        aria-haspopup="dialog"
        aria-label={`Play video: ${video.title}`}
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        <div className="kc-thumb">
          <Image
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <span className="kc-play">
            <i aria-hidden="true" />
            Watch{video.duration ? ` · ${video.duration}` : ""}
          </span>
        </div>
        <h3>{video.title}</h3>
        <p className="t-meta">
          {videoKindLabel[video.kind]} · YouTube
        </p>
      </button>

      <dialog
        ref={dialog}
        className="kc-modal on-ground"
        aria-label={video.title}
        onClose={() => {
          setOpen(false);
          card.current?.focus({ preventScroll: true });
        }}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="kc-modal__bar">
          <p>{video.title}</p>
          <button type="button" className="icon-btn" onClick={() => dialog.current?.close()} aria-label="Close video">
            <Icon name="close" className="kc-icon--lg" />
          </button>
        </div>
        <div className="kc-modal__frame">
          {open && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>
      </dialog>
    </>
  );
}

/** Stand-in for a video slot until a verified video is supplied. Not interactive. */
export function VideoPlaceholderCard({ slot }: { slot: string }) {
  return (
    <div className="kc-video kc-video--static">
      <div className="kc-thumb">
        <div className="kc-ph kc-ph--dark" role="img" aria-label={`Placeholder for a YouTube video: ${slot}`}>
          <span>Replace · YouTube video, 16:9</span>
        </div>
        <span className="kc-play" aria-hidden="true">
          <i />
          Watch · [mm:ss]
        </span>
      </div>
      <h3>
        <span className="pending">[OWNER TO CONFIRM: {slot} — exact title and video link]</span>
      </h3>
      <p className="t-meta">YouTube · @coachkayceesunshine</p>
    </div>
  );
}
