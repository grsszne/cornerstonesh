"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";

const ITEMS = [
  {
    title: "Your prompts never touch our database.",
    detail: "Arc logs metadata only — tokens, latency, cost, route. Never message bodies.",
  },
  {
    title: "Provider keys encrypted at rest.",
    detail: "AES-256-GCM. Keys are decrypted only in memory for the duration of a request.",
  },
  {
    title: "Automatic failover across providers.",
    detail: "When OpenAI goes down, Arc reroutes to Anthropic silently. Zero dropped requests.",
  },
];

export default function ArcReliability() {
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
            margin: 0,
            marginBottom: 80,
            maxWidth: 820,
          }}
        >
          Built to stay out of your way.
        </motion.h2>

        <div>
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              style={{
                padding: "36px 0",
                borderTop: `1px solid ${T.borderSubtle}`,
                borderBottom: i === ITEMS.length - 1 ? `1px solid ${T.borderSubtle}` : "none",
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
                  maxWidth: 640,
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
