"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION, SWATCH } from "./arcTokens";

const MODELS = [
  { name: "gpt-4o",        provider: "openai",    dot: T.providerOpenai    },
  { name: "sonnet-4",      provider: "anthropic", dot: T.providerAnthropic },
  { name: "haiku-4.5",     provider: "anthropic", dot: T.providerAnthropic },
  { name: "gpt-4o-mini",   provider: "openai",    dot: T.providerOpenai    },
];

const TASKS = [
  { name: "Summarization",    color: "ochre", scores: [1580, 1620, 1595, 1510], best: 1 },
  { name: "Classification",   color: "clay",  scores: [1540, 1530, 1570, 1555], best: 2 },
  { name: "Code Generation",  color: "slate", scores: [1610, 1640, 1480, 1520], best: 1 },
  { name: "Customer Support", color: "moss",  scores: [1550, 1580, 1600, 1490], best: 2 },
  { name: "Data Extraction",  color: "mauve", scores: [1590, 1560, 1550, 1570], best: 0 },
  { name: "Translation",      color: "pine",  scores: [1530, 1570, 1520, 1545], best: 1 },
];

export default function ArcBenchmarks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        {/* Header */}
        <div style={{ maxWidth: 720, marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: SWATCH.sand.fg }} />
            <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>Benchmarks</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ ...TYPE.displayL, color: T.textPrimary, margin: 0, marginBottom: 20 }}
          >
            Model rankings,
            <br />
            <span style={{ color: T.textSecondary, fontStyle: "italic" }}>
              updated weekly.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ ...TYPE.bodyLg, color: T.textSecondary, margin: 0, maxWidth: 560 }}
          >
            Arc runs its own task-specific evaluations across every major model.
            No vanity scores — just the metrics that matter for your use case.
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            background: T.surfaceCard,
            border: `1px solid ${T.borderDefault}`,
            borderRadius: 6,
            overflow: "hidden",
            fontFamily: "'Ronzino', Georgia, serif",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(180px, 1.4fr) repeat(4, minmax(0, 1fr))",
              borderBottom: `1px solid ${T.borderDefault}`,
              background: T.surfaceCard,
            }}
          >
            <div style={{ padding: "14px 18px" }}>
              <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>Task</span>
            </div>
            {MODELS.map((m) => (
              <div
                key={m.name}
                style={{
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: "flex-end",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: m.dot }} />
                <span style={{ ...TYPE.metaLabel, color: T.textSecondary }}>{m.name}</span>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {TASKS.map((task, rowIdx) => (
            <motion.div
              key={task.name}
              initial={{ opacity: 0, x: -6 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + rowIdx * 0.07 }}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(180px, 1.4fr) repeat(4, minmax(0, 1fr))",
                borderBottom:
                  rowIdx === TASKS.length - 1
                    ? "none"
                    : `1px solid ${T.borderSubtle}`,
              }}
            >
              {/* Task pill */}
              <div
                style={{
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: SWATCH[task.color].fg,
                  }}
                />
                <span style={{ fontSize: 13, color: T.textPrimary, letterSpacing: "-0.005em" }}>
                  {task.name}
                </span>
              </div>

              {/* Scores */}
              {task.scores.map((score, i) => {
                const isBest = i === task.best;
                return (
                  <div
                    key={i}
                    style={{
                      padding: "16px 18px",
                      textAlign: "right",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 6,
                    }}
                  >
                    {isBest && (
                      <span
                        style={{
                          fontSize: 8.5,
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: T.statusHealthy,
                          padding: "2px 5px",
                          border: `1px solid color-mix(in srgb, var(--arc-status-healthy) 35%, transparent)`,
                          borderRadius: 3,
                        }}
                      >
                        best
                      </span>
                    )}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + rowIdx * 0.07 + i * 0.04 }}
                      style={{
                        fontSize: 13,
                        color: isBest ? T.textPrimary : T.textSecondary,
                        fontWeight: isBest ? 500 : 400,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {score.toLocaleString()}
                    </motion.span>
                  </div>
                );
              })}
            </motion.div>
          ))}

          {/* Footer strip */}
          <div
            style={{
              padding: "12px 18px",
              background: T.surfaceRaised,
              borderTop: `1px solid ${T.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>
              Arc Elo · updated 2 days ago
            </span>
            <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>
              12,400 evaluations
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
