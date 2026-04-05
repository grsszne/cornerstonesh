"use client";

import { T } from "./arcTokens";

/**
 * Placeholder for a future product screen recording.
 * Renders a 16:9 bordered box with a subtle label.
 *
 * Props:
 *  - label: short caption ("Dashboard", "Auto-tune", etc.)
 *  - maxWidth: override max width (default 980)
 *  - aspectRatio: "16 / 9" (default) or e.g. "16 / 10"
 */
export default function ArcVideoPlaceholder({
  label = "Video",
  src = null,
  maxWidth = 980,
  aspectRatio = "16 / 9",
}) {
  return (
    <div
      style={{
        maxWidth,
        margin: "0 auto",
        width: "100%",
        aspectRatio,
        background: T.surfaceCard,
        border: `1px solid ${T.borderSubtle}`,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Ronzino', Georgia, serif",
        fontSize: 13,
        letterSpacing: "0.02em",
        color: T.textTertiary,
        textTransform: "lowercase",
        overflow: "hidden",
        position: "relative",
        boxShadow: src ? "0 20px 50px rgba(0,0,0,0.2)" : "none",
      }}
    >
      {src ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        label
      )}
    </div>
  );
}
