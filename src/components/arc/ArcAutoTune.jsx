"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION, SWATCH, pillStyle, dotStyle } from "./arcTokens";

const SUGGESTIONS = [
  {
    route: { name: "summarize", color: "ochre" },
    title: "Switch to claude-haiku-4.5",
    detail: "71% win rate over 847 comparisons",
    impact: "-$318/mo",
    confidence: 94,
    applyLabel: "Apply",
  },
  {
    route: { name: "classify", color: "clay" },
    title: "Enable semantic cache",
    detail: "Low variance responses, high repeat rate",
    impact: "-$142/mo",
    confidence: 87,
    applyLabel: "Apply",
  },
  {
    route: { name: "search", color: "mauve" },
    title: "Add Anthropic fallback",
    detail: "Error rate 2.3% — above threshold",
    impact: "99.9% SLA",
    confidence: 91,
    applyLabel: "Apply",
  },
];

function SuggestionCard({ s, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.25 + index * 0.12 }}
      style={{
        background: T.surfaceCard,
        border: `1px solid ${T.borderDefault}`,
        borderRadius: 6,
        padding: "20px 22px",
        fontFamily: "'Ronzino', Georgia, serif",
        transition: "border-color 140ms ease, transform 140ms ease",
      }}
      whileHover={{ y: -2 }}
    >
      {/* top row: route pill + impact */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={pillStyle(s.route.color, "md")}>
          <span style={dotStyle(s.route.color, 5)} />
          {s.route.name}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: s.impact.startsWith("-") ? T.statusHealthy : T.textSecondary,
          }}
        >
          {s.impact}
        </span>
      </div>

      {/* title */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 400,
          letterSpacing: "-0.008em",
          color: T.textPrimary,
          marginBottom: 6,
          lineHeight: 1.35,
        }}
      >
        {s.title}
      </div>
      <div style={{ fontSize: 12.5, color: T.textTertiary, marginBottom: 20, lineHeight: 1.5 }}>
        {s.detail}
      </div>

      {/* Confidence meter */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>Confidence</span>
          <span style={{ fontSize: 11, color: T.textSecondary }}>{s.confidence}%</span>
        </div>
        <div
          style={{
            height: 3,
            background: T.surfaceRaised,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${s.confidence}%` } : {}}
            transition={{ duration: 0.9, delay: 0.5 + index * 0.12, ease: [0.23, 1, 0.32, 1] }}
            style={{
              height: "100%",
              background: T.textPrimary,
            }}
          />
        </div>
      </div>

      {/* actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "7px 14px",
            background: T.textPrimary,
            color: T.surfacePage,
            border: "none",
            borderRadius: 3,
            cursor: "pointer",
            fontFamily: "'Ronzino', Georgia, serif",
          }}
        >
          {s.applyLabel}
        </button>
        <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>Dismiss</span>
      </div>
    </motion.div>
  );
}

export default function ArcAutoTune() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        {/* Header row */}
        <div style={{ maxWidth: 760, marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: SWATCH.moss.fg,
              }}
            />
            <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>Auto-tune</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ ...TYPE.displayL, color: T.textPrimary, margin: 0, marginBottom: 24 }}
          >
            Arc reads your traffic.
            <br />
            <span style={{ color: T.textSecondary, fontStyle: "italic" }}>
              Then tells you what to change.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ ...TYPE.bodyLg, color: T.textSecondary, margin: 0, maxWidth: 600 }}
          >
            Every suggestion is grounded in your own requests — never generic best practices.
            Apply with one click, or roll back if it doesn&apos;t stick.
          </motion.p>
        </div>

        {/* Suggestion cards */}
        <div
          className="arc-autotune-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {SUGGESTIONS.map((s, i) => (
            <SuggestionCard key={i} s={s} index={i} isInView={isInView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .arc-autotune-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
