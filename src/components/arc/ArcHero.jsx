"use client";

import Link from "next/link";
import { T, TYPE, BUTTON } from "./arcTokens";

export default function ArcHero() {
  return (
    <section
      style={{
        background: T.surfacePage,
        color: T.textPrimary,
        fontFamily: "'Ronzino', Georgia, serif",
        padding: "200px clamp(24px, 5vw, 56px) clamp(120px, 16vw, 180px)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <h1
          style={{
            ...TYPE.displayXL,
            color: T.textPrimary,
            margin: 0,
            marginBottom: 40,
            maxWidth: 900,
          }}
        >
          Your AI stack, observed.
        </h1>

        <p
          style={{
            ...TYPE.bodyLg,
            margin: 0,
            marginBottom: 56,
            maxWidth: 620,
          }}
        >
          Arc sits between your app and your AI providers. One endpoint for every model.
          Every request logged, routed, and tuned.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="https://arc.cornerstone.sh"
            style={BUTTON.primary}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start free
          </Link>
          <Link
            href="#how-it-works"
            style={BUTTON.ghost}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.textSecondary)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.borderDefault)}
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
