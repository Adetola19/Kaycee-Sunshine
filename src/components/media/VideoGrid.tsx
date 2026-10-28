import type { Video } from "@/content/media";
import { Reveal } from "@/components/motion/Reveal";
import { VideoCard, VideoPlaceholderCard } from "./VideoCard";

type VideoGridProps = {
  videos: Video[];
  /** Slots shown as labelled placeholders when there are no verified videos yet. */
  placeholderSlots: string[];
  limit?: number;
};

export function VideoGrid({ videos, placeholderSlots, limit }: VideoGridProps) {
  const list = limit ? videos.slice(0, limit) : videos;
  return (
    <ul className="card-grid card-grid--3" role="list">
      {list.length > 0
        ? list.map((video, i) => (
            <Reveal as="li" key={video.id} index={i}>
              <VideoCard video={video} />
            </Reveal>
          ))
        : placeholderSlots.map((slot, i) => (
            <Reveal as="li" key={slot} index={i}>
              <VideoPlaceholderCard slot={slot} />
            </Reveal>
          ))}
    </ul>
  );
}
