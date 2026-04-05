"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { T, TYPE } from "./arcTokens";

export default function ArcFooterCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      style={{
        background: T.surfacePage,
        color: T.textPrimary,
        fontFamily: "'Ronzino', Georgia, serif",
        borderTop: `1px solid ${T.borderSubtle}`,
        padding: "clamp(120px, 16vw, 220px) clamp(24px, 5vw, 56px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background hairline grid — subtle texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${T.borderSubtle} 1px, transparent 1px),
                             linear-gradient(to bottom, ${T.borderSubtle} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.5,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 40,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.statusHealthy,
              animation: "arc-pulse 2s ease-in-out infinite",
            }}
          />
          <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>
            Ready in under five minutes
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            ...TYPE.displayXL,
            color: T.textPrimary,
            margin: 0,
            marginBottom: 28,
          }}
        >
          Your first insight
          <br />
          <span style={{ color: T.textSecondary, fontStyle: "italic" }}>
            is free.
          </span>
        </motion.h2>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            ...TYPE.bodyLg,
            color: T.textSecondary,
            margin: 0,
            marginBottom: 48,
            maxWidth: 540,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Swap one line in your OpenAI client. Watch Arc find your first win within an hour.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <Link
            href="https://arc.cornerstone.sh"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 26px",
              background: T.textPrimary,
              color: T.surfacePage,
              border: "none",
              borderRadius: 4,
              fontFamily: "'Ronzino', Georgia, serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 120ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start free
            <span style={{ opacity: 0.6 }}>→</span>
          </Link>

          <Link
            href="mailto:hi@cornerstone.sh"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "15px 24px",
              background: "transparent",
              color: T.textPrimary,
              border: `1px solid ${T.borderDefault}`,
              borderRadius: 4,
              fontFamily: "'Ronzino', Georgia, serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "border-color 120ms ease, background 120ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--arc-text-secondary)";
              e.currentTarget.style.background = T.surfaceRaised;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--arc-border-default)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Talk to us
          </Link>
        </motion.div>

        {/* Promise strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 18px",
            border: `1px solid ${T.borderSubtle}`,
            borderRadius: 999,
            background: T.surfaceCard,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: T.textTertiary,
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: T.textTertiary,
              fontStyle: "italic",
              letterSpacing: 0,
            }}
          >
            If Arc doesn&apos;t find something worth acting on in your first week, it probably wasn&apos;t there.
          </span>
        </motion.div>
      </div>

      <style>{`
        @keyframes arc-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </section>
  );
}
