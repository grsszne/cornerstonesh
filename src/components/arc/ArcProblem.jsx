"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";

const LINES = [
  { text: "You picked a model.", strong: false },
  { text: "Wrote a prompt.", strong: false },
  { text: "Shipped it.", strong: false },
  { text: null },
  { text: "Maybe it's working.", strong: false },
  { text: "Maybe you're paying 4x what you should be.", strong: false },
  { text: "Maybe a faster model would do the job just as well.", strong: false },
  { text: null },
  { text: "You don't know, because you have no data.", strong: true },
];

export default function ArcProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: T.statusError,
              }}
            />
            <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>
              The problem
            </span>
            <span
              style={{
                flex: 1,
                height: 1,
                background: T.borderSubtle,
                marginLeft: 8,
              }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              ...TYPE.displayL,
              color: T.textPrimary,
              margin: 0,
              marginBottom: 56,
            }}
          >
            You&apos;re flying blind.
          </motion.h2>

          {/* Lines */}
          <div>
            {LINES.map((line, i) => {
              if (line.text === null) {
                return <div key={`gap-${i}`} style={{ height: 22 }} />;
              }
              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.25 + i * 0.07 }}
                  style={{
                    margin: 0,
                    marginBottom: 6,
                    fontSize: line.strong ? 22 : 18,
                    fontWeight: line.strong ? 400 : 400,
                    letterSpacing: line.strong ? "-0.012em" : 0,
                    lineHeight: 1.5,
                    color: line.strong ? T.textPrimary : T.textSecondary,
                    fontStyle: line.strong ? "italic" : "normal",
                  }}
                >
                  {line.text}
                </motion.p>
              );
            })}
          </div>

          {/* Bottom meta strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{
              marginTop: 56,
              paddingTop: 24,
              borderTop: `1px solid ${T.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>
              Most teams find out
            </span>
            <span
              style={{
                fontSize: 13,
                color: T.textSecondary,
                fontStyle: "italic",
              }}
            >
              when a bill lands — or a user complains.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
