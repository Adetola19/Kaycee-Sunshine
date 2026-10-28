import Image from "next/image";
import type { Visual as VisualData } from "@/content/media";

type VisualProps = {
  visual: VisualData;
  /** next/image sizes attribute. */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Override the aspect ratio set by the placeholder spec. */
  ratio?: string;
  dark?: boolean;
};

/**
 * Renders a genuine photograph when one is supplied, otherwise a clearly
 * labelled ImagePlaceholder (design/components/ImagePlaceholder.md).
 */
export function Visual({ visual, sizes, priority, className, ratio, dark }: VisualProps) {
  const aspect = ratio ?? visual.placeholder.ratio;
  const cls = ["media", className].filter(Boolean).join(" ");

  if (visual.image) {
    const { src, alt, width, height } = visual.image;
    return (
      <div className={cls} style={{ aspectRatio: aspect }}>
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} />
      </div>
    );
  }

  return (
    <div className={cls} style={{ aspectRatio: aspect }}>
      <Placeholder shot={visual.placeholder.shot} ratio={aspect} dark={dark} />
    </div>
  );
}

export function Placeholder({ shot, ratio, dark }: { shot: string; ratio: string; dark?: boolean }) {
  const label = `${shot}, ${ratio.replace(/\s/g, "")}`;
  return (
    <div className={dark ? "kc-ph kc-ph--dark" : "kc-ph"} role="img" aria-label={`Placeholder for a photograph: ${shot}`}>
      <span>Replace · {label}</span>
    </div>
  );
}
