"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { T, TYPE, SECTION, BUTTON } from "./arcTokens";
import ArcVideoPlaceholder from "./ArcVideoPlaceholder";

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function ArcFeatureDetail({ feature }) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });

  return (
    <main
      style={{
        background: T.surfacePage,
        color: T.textPrimary,
        fontFamily: "'Ronzino', Georgia, serif",
        minHeight: "100vh",
      }}
    >
      {/* ── Back link ── */}
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "clamp(120px, 16vw, 180px) clamp(24px, 5vw, 56px) 0",
        }}
      >
        <Link
          href="/arc"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: T.textTertiary,
            textDecoration: "none",
            transition: "color 150ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.textPrimary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.textTertiary)}
        >
          ← Back to Arc
        </Link>
      </div>

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "56px clamp(24px, 5vw, 56px) 0",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 13,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: T.textTertiary,
            marginBottom: 24,
          }}
        >
          {feature.title}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08 }}
          style={{
            ...TYPE.displayL,
            color: T.textPrimary,
            margin: "0 auto 28px",
            maxWidth: 780,
          }}
        >
          {feature.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.16 }}
          style={{
            ...TYPE.bodyLg,
            margin: "0 auto 0",
            maxWidth: 620,
          }}
        >
          {feature.subtitle}
        </motion.p>
      </div>

      {/* ── Video ── */}
      <Reveal delay={0.1} style={{ maxWidth: 920, margin: "0 auto", padding: "64px clamp(24px, 5vw, 56px) 0" }}>
        <ArcVideoPlaceholder label={feature.video} />
      </Reveal>

      {/* ── Content sections ── */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "clamp(80px, 12vw, 140px) clamp(24px, 5vw, 56px)",
        }}
      >
        {feature.sections.map((section, i) => (
          <Reveal key={i} delay={0.08 * i}>
            <div
              style={{
                borderTop: `1px solid ${T.borderSubtle}`,
                padding: "48px 0",
              }}
            >
              <h2
                style={{
                  fontSize: 13,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: T.textTertiary,
                  marginBottom: 20,
                  fontWeight: 500,
                }}
              >
                {section.heading}
              </h2>
              <p
                style={{
                  ...TYPE.bodyLg,
                  color: T.textSecondary,
                  margin: 0,
                  maxWidth: 640,
                }}
              >
                {section.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div
        style={{
          borderTop: `1px solid ${T.borderSubtle}`,
          padding: "clamp(100px, 14vw, 180px) clamp(24px, 5vw, 56px)",
          textAlign: "center",
        }}
      >
        <Reveal>
          <h2
            style={{
              ...TYPE.displayM,
              color: T.textPrimary,
              margin: "0 auto 40px",
              maxWidth: 600,
            }}
          >
            Ready to try it?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="https://arc.cornerstone.sh"
              style={BUTTON.primary}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Start free
            </Link>
            <Link
              href="/arc"
              style={BUTTON.ghost}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.textSecondary)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.borderDefault)}
            >
              Back to Arc
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
