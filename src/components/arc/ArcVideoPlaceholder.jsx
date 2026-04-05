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
      }}
    >
      {label}
    </div>
  );
}
