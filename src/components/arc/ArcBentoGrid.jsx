"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";
import ArcVideoPlaceholder from "./ArcVideoPlaceholder";

const ITEMS = [
  {
    title: "One ledger for every provider.",
    detail:
      "Every prompt, token, and cent across OpenAI, Anthropic, and Together — unified in a single searchable log.",
  },
  {
    title: "Semantic caching, built in.",
    detail:
      "Arc detects prompts that mean the same thing and serves them from memory. Latency drops to 20 ms, cost to zero.",
  },
  {
    title: "Shadow test without risk.",
    detail:
      "Route a copy of live traffic to a candidate model. Arc evaluates it in parallel. You see the win rate before you switch.",
  },
];

export default function ArcBentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            ...TYPE.displayL,
            color: T.textPrimary,
            margin: "0 auto 80px",
            maxWidth: 820,
          }}
        >
          One endpoint. Every model.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: 80 }}
        >
          <ArcVideoPlaceholder label="dashboard" />
        </motion.div>

        <div style={{ textAlign: "left", maxWidth: 760, margin: "0 auto" }}>
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              style={{
                padding: "36px 0",
                borderTop: `1px solid ${T.borderSubtle}`,
                borderBottom:
                  i === ITEMS.length - 1 ? `1px solid ${T.borderSubtle}` : "none",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 300,
                  letterSpacing: "-0.015em",
                  color: T.textPrimary,
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: T.textSecondary,
                  lineHeight: 1.55,
                  maxWidth: 620,
                }}
              >
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
