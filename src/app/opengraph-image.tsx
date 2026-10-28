import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.fullName} — ${site.titles.join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social preview. Typographic only, since no photography or logo has been supplied. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f7f4ed",
          color: "#252824",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.3 }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, letterSpacing: -1.6, maxWidth: 900 }}>{site.tagline}</div>
          <div style={{ display: "flex", width: 120, height: 2, background: "#24483b" }} />
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#7a6437" }}>
            {site.titles.join("  ·  ")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
