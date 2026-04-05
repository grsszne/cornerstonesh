"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";

const MODELS = ["gpt-4o", "sonnet-4", "haiku-4.5", "gpt-4o-mini"];

const TASKS = [
  { name: "Summarization",    scores: [1580, 1620, 1595, 1510], best: 1 },
  { name: "Classification",   scores: [1540, 1530, 1570, 1555], best: 2 },
  { name: "Code Generation",  scores: [1610, 1640, 1480, 1520], best: 1 },
  { name: "Customer Support", scores: [1550, 1580, 1600, 1490], best: 2 },
  { name: "Data Extraction",  scores: [1590, 1560, 1550, 1570], best: 0 },
  { name: "Translation",      scores: [1530, 1570, 1520, 1545], best: 1 },
];

export default function ArcBenchmarks() {
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
            marginBottom: 40,
            maxWidth: 900,
          }}
        >
          Model rankings, updated weekly.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ ...TYPE.bodyLg, margin: 0, marginBottom: 72, maxWidth: 620 }}
        >
          Arc runs its own task-specific evaluations across every major model.
        </motion.p>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: "'Ronzino', Georgia, serif",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(200px, 1.4fr) repeat(4, minmax(0, 1fr))",
              padding: "18px 0",
              borderBottom: `1px solid ${T.borderDefault}`,
            }}
          >
            <div style={{ fontSize: 13, color: T.textTertiary }}>Task</div>
            {MODELS.map((m) => (
              <div
                key={m}
                style={{
                  fontSize: 13,
                  color: T.textTertiary,
                  textAlign: "right",
                  paddingLeft: 8,
                }}
              >
                {m}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {TASKS.map((task, rowIdx) => (
            <motion.div
              key={task.name}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + rowIdx * 0.06 }}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(200px, 1.4fr) repeat(4, minmax(0, 1fr))",
                padding: "22px 0",
                borderBottom: `1px solid ${T.borderSubtle}`,
              }}
            >
              <div style={{ fontSize: 17, color: T.textPrimary, letterSpacing: "-0.005em" }}>
                {task.name}
              </div>
              {task.scores.map((score, i) => {
                const isBest = i === task.best;
                return (
                  <div
                    key={i}
                    style={{
                      fontSize: 17,
                      color: isBest ? T.textPrimary : T.textTertiary,
                      fontWeight: isBest ? 500 : 400,
                      textAlign: "right",
                      paddingLeft: 8,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {score.toLocaleString()}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
