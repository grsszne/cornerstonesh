"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION, SWATCH, pillStyle, dotStyle } from "./arcTokens";

const QUESTION = "Why did costs spike on Tuesday?";
const ANSWER_PARTS = [
  "Route ",
  { pill: { name: "customer-support", color: "clay" } },
  " jumped from ",
  { em: "340" },
  " to ",
  { em: "890" },
  " requests between 2–6am. Average prompt tokens also increased from ",
  { em: "420" },
  " to ",
  { em: "1,840" },
  " — likely a context window change in your app.",
];

function typewriter(fullText, onUpdate, speed = 22) {
  let i = 0;
  let cancelled = false;
  const tick = () => {
    if (cancelled) return;
    i++;
    onUpdate(fullText.slice(0, i));
    if (i < fullText.length) setTimeout(tick, speed);
  };
  tick();
  return () => {
    cancelled = true;
  };
}

export default function ArcAskData() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [typedQ, setTypedQ] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const to1 = setTimeout(() => {
      const stop = typewriter(QUESTION, setTypedQ, 32);
      return stop;
    }, 600);
    const to2 = setTimeout(() => setShowAnswer(true), 600 + QUESTION.length * 32 + 400);
    return () => {
      clearTimeout(to1);
      clearTimeout(to2);
    };
  }, [isInView]);

  return (
    <section style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        <div
          className="arc-feature-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "center",
          }}
        >
          {/* LEFT — chat panel (put first for emphasis) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                background: T.surfaceCard,
                border: `1px solid ${T.borderDefault}`,
                borderRadius: 6,
                fontFamily: "'Ronzino', Georgia, serif",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: `1px solid ${T.borderSubtle}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={T.textSecondary} strokeWidth="1.4">
                    <circle cx="7" cy="7" r="5" />
                    <path d="M11 11l3 3" />
                  </svg>
                  <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>Ask your data</span>
                </div>
                <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>last 7 days</span>
              </div>

              {/* Question */}
              <div
                style={{
                  padding: "20px 18px 14px",
                  borderBottom: `1px solid ${T.borderSubtle}`,
                }}
              >
                <div style={{ ...TYPE.metaLabel, color: T.textTertiary, marginBottom: 8 }}>
                  You
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    letterSpacing: "-0.008em",
                    color: T.textPrimary,
                    minHeight: 28,
                  }}
                >
                  {typedQ}
                  {typedQ.length < QUESTION.length && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: "0.95em",
                        background: T.textPrimary,
                        marginLeft: 2,
                        verticalAlign: "middle",
                        animation: "arc-blink 1s steps(2) infinite",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Answer */}
              <div style={{ padding: "20px 18px 22px", minHeight: 170 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: T.textPrimary,
                      opacity: showAnswer ? 1 : 0.3,
                      animation: showAnswer ? "none" : "arc-pulse 1.4s ease-in-out infinite",
                    }}
                  />
                  <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>Arc</span>
                </div>

                {showAnswer ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: T.textSecondary,
                    }}
                  >
                    {ANSWER_PARTS.map((part, i) => {
                      if (typeof part === "string") return <span key={i}>{part}</span>;
                      if (part.pill) {
                        return (
                          <span key={i} style={{ margin: "0 2px", verticalAlign: "middle" }}>
                            <span style={pillStyle(part.pill.color)}>
                              <span style={dotStyle(part.pill.color)} />
                              {part.pill.name}
                            </span>
                          </span>
                        );
                      }
                      if (part.em)
                        return (
                          <span key={i} style={{ color: T.textPrimary, fontWeight: 500 }}>
                            {part.em}
                          </span>
                        );
                      return null;
                    })}
                  </motion.div>
                ) : (
                  <div style={{ fontSize: 13, color: T.textTertiary, fontStyle: "italic" }}>
                    analyzing 14,293 requests…
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: "10px 18px",
                  background: T.surfaceRaised,
                  borderTop: `1px solid ${T.borderSubtle}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>
                  grounded in your traffic
                </span>
                <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>2.4s</span>
              </div>
            </div>

            <style>{`
              @keyframes arc-blink {
                50% { opacity: 0; }
              }
            `}</style>
          </motion.div>

          {/* RIGHT — text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: SWATCH.slate.fg,
                }}
              />
              <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>Ask your data</span>
            </div>

            <h2 style={{ ...TYPE.displayM, color: T.textPrimary, margin: 0, marginBottom: 24 }}>
              Every question,
              <br />
              <span style={{ color: T.textSecondary, fontStyle: "italic" }}>
                answered by your traffic.
              </span>
            </h2>

            <p style={{ ...TYPE.bodyLg, color: T.textSecondary, margin: 0, maxWidth: 480 }}>
              No more SQL, no more dashboards. Ask Arc anything about your AI spend, latency,
              or quality — and get an answer grounded in your actual requests.
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .arc-feature-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
