"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION, SWATCH } from "./arcTokens";

const ITEMS = [
  {
    eyebrow: "Privacy",
    title: "Your prompts never touch our database.",
    detail: "Arc logs metadata only — tokens, latency, cost, route. Never message bodies.",
    color: "pine",
  },
  {
    eyebrow: "Security",
    title: "Provider keys encrypted at rest.",
    detail: "AES-256-GCM. Keys are decrypted only in memory for the duration of a request.",
    color: "slate",
  },
  {
    eyebrow: "Reliability",
    title: "Automatic failover across providers.",
    detail: "When OpenAI goes down, Arc reroutes to Anthropic silently. Zero dropped requests.",
    color: "moss",
  },
];

export default function ArcReliability() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        {/* Header */}
        <div style={{ maxWidth: 720, marginBottom: 72 }}>
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
                background: T.statusHealthy,
              }}
            />
            <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>Trust</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ ...TYPE.displayL, color: T.textPrimary, margin: 0 }}
          >
            Built to stay
            <br />
            <span style={{ color: T.textSecondary, fontStyle: "italic" }}>
              out of your way.
            </span>
          </motion.h2>
        </div>

        {/* Items — stacked rows with hairline dividers (like an Arc settings page) */}
        <div
          style={{
            border: `1px solid ${T.borderDefault}`,
            borderRadius: 6,
            background: T.surfaceCard,
            overflow: "hidden",
          }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 180px) minmax(0, 1fr)",
                gap: "clamp(20px, 4vw, 56px)",
                padding: "32px clamp(24px, 4vw, 40px)",
                borderBottom: i === ITEMS.length - 1 ? "none" : `1px solid ${T.borderSubtle}`,
                alignItems: "start",
              }}
              className="arc-reliability-row"
            >
              {/* Left: eyebrow + dot */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: SWATCH[item.color].fg,
                  }}
                />
                <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>{item.eyebrow}</span>
              </div>

              {/* Right: title + detail */}
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 400,
                    letterSpacing: "-0.012em",
                    color: T.textPrimary,
                    marginBottom: 10,
                    lineHeight: 1.35,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: T.textSecondary,
                    lineHeight: 1.55,
                    maxWidth: 640,
                  }}
                >
                  {item.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .arc-reliability-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
