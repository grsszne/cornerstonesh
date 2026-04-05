"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION, SWATCH, pillStyle, dotStyle } from "./arcTokens";

function ShadowPanel({ active }) {
  const [wins, setWins] = useState(0);
  const [bars, setBars] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const target = 847;
    const start = performance.now();
    const tick = () => {
      if (cancelled) return;
      const t = Math.min((performance.now() - start) / 1500, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setWins(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    const to = setTimeout(() => requestAnimationFrame(tick), 400);

    const barTargets = [62, 71, 68, 74, 69, 73, 66, 72];
    barTargets.forEach((v, i) => {
      setTimeout(() => {
        if (cancelled) return;
        setBars((prev) => {
          const next = [...prev];
          next[i] = v;
          return next;
        });
      }, 550 + i * 90);
    });

    return () => {
      cancelled = true;
      clearTimeout(to);
    };
  }, [active]);

  return (
    <div
      style={{
        background: T.surfaceCard,
        border: `1px solid ${T.borderDefault}`,
        borderRadius: 6,
        overflow: "hidden",
        fontFamily: "'Ronzino', Georgia, serif",
      }}
    >
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
          <span style={pillStyle("mauve")}>
            <span style={dotStyle("mauve")} />
            summarize
          </span>
          <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>shadow test</span>
        </div>
        <span style={{ ...TYPE.metaLabel, color: T.statusWarning }}>● running</span>
      </div>

      <div
        style={{
          padding: "22px 18px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          borderBottom: `1px solid ${T.borderSubtle}`,
        }}
      >
        <div>
          <div style={{ ...TYPE.metaLabel, color: T.textTertiary, marginBottom: 6 }}>
            Comparisons
          </div>
          <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.02em", color: T.textPrimary }}>
            1,204
          </div>
        </div>
        <div>
          <div style={{ ...TYPE.metaLabel, color: T.textTertiary, marginBottom: 6 }}>
            Candidate wins
          </div>
          <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.02em", color: T.statusHealthy }}>
            {wins.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ ...TYPE.metaLabel, color: T.textTertiary, marginBottom: 6 }}>
            Win rate
          </div>
          <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.02em", color: T.textPrimary }}>
            70.4%
          </div>
        </div>
      </div>

      <div style={{ padding: "18px 18px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.providerOpenai }} />
            <span style={{ fontSize: 12, color: T.textSecondary }}>gpt-4o</span>
          </div>
          <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>vs</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.providerAnthropic }} />
            <span style={{ fontSize: 12, color: T.textSecondary }}>claude-haiku-4.5</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, marginBottom: 10 }}>
          {bars.map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${v}%`,
                background: v > 68 ? SWATCH.moss.fg : v > 60 ? SWATCH.sand.fg : SWATCH.dusk.fg,
                opacity: 0.85,
                borderRadius: 1,
                transition: "height 600ms cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>8 batches</span>
          <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>last 48h</span>
        </div>
      </div>

      <div
        style={{
          padding: "12px 18px",
          background: T.surfaceRaised,
          borderTop: `1px solid ${T.borderSubtle}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 14, color: T.statusHealthy }}>▲</span>
        <span style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.4 }}>
          Recommend switch to <span style={{ color: T.textPrimary }}>haiku-4.5</span>{" "}
          — saves <span style={{ color: T.textPrimary }}>$310/mo</span>
        </span>
      </div>
    </div>
  );
}

export default function ArcShadowMode() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        <div
          className="arc-feature-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: SWATCH.mauve.fg,
                }}
              />
              <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>Shadow mode</span>
            </div>

            <h2 style={{ ...TYPE.displayM, color: T.textPrimary, margin: 0, marginBottom: 24 }}>
              Test cheaper models
              <br />
              against production,{" "}
              <span style={{ color: T.textSecondary, fontStyle: "italic" }}>silently.</span>
            </h2>

            <p style={{ ...TYPE.bodyLg, color: T.textSecondary, margin: 0, marginBottom: 28, maxWidth: 480 }}>
              Arc routes a copy of every live request to a candidate model. You see the comparison,
              users only see the original response. Switch with confidence — or don&apos;t.
            </p>

            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {[
                "Zero risk — users only see the primary response",
                "Automatic quality scoring on every comparison",
                "Win-rate tracked per route, per batch",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 0",
                    borderTop: i === 0 ? `1px solid ${T.borderSubtle}` : undefined,
                    borderBottom: `1px solid ${T.borderSubtle}`,
                  }}
                >
                  <span
                    style={{
                      marginTop: 7,
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: T.textPrimary,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.55 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <ShadowPanel active={isInView} />
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
