"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { T, TYPE, SECTION, SWATCH } from "./arcTokens";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: null,
    tagline: "For evaluating Arc on a real workload.",
    features: [
      "1,000 requests / month",
      "Full logging & analytics",
      "Shadow mode",
      "Auto-tune suggestions",
      "Community support",
    ],
    cta: "Get started",
    ctaStyle: "ghost",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    tagline: "For teams shipping AI features in production.",
    features: [
      "Unlimited requests",
      "Everything in Free",
      "One-click auto-tune apply",
      "Ask-your-data chat",
      "Benchmark access",
      "Priority support",
    ],
    cta: "Start free",
    ctaStyle: "primary",
    highlighted: true,
  },
];

export default function ArcPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="pricing" style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        {/* Header */}
        <div style={{ maxWidth: 720, marginBottom: 72, textAlign: "center", margin: "0 auto 72px" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: SWATCH.ochre.fg }} />
            <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ ...TYPE.displayL, color: T.textPrimary, margin: 0, marginBottom: 20 }}
          >
            Start free.{" "}
            <span style={{ color: T.textSecondary, fontStyle: "italic" }}>
              Upgrade when it pays for itself.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ ...TYPE.bodyLg, color: T.textSecondary, margin: "0 auto", maxWidth: 540 }}
          >
            No credit card for Free. No lock-in at any tier. Cancel in one click.
          </motion.p>
        </div>

        {/* Plans */}
        <div
          className="arc-pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 18,
            maxWidth: 820,
            margin: "0 auto",
          }}
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              style={{
                background: plan.highlighted ? T.surfaceCard : T.surfaceCard,
                border: `1px solid ${plan.highlighted ? T.textPrimary : T.borderDefault}`,
                borderRadius: 6,
                padding: "36px 32px",
                fontFamily: "'Ronzino', Georgia, serif",
                position: "relative",
              }}
            >
              {plan.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    right: 18,
                    transform: "translateY(-50%)",
                    background: T.textPrimary,
                    color: T.surfacePage,
                    padding: "4px 10px",
                    borderRadius: 3,
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Most popular
                </div>
              )}

              {/* Plan name */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: plan.highlighted ? T.textPrimary : T.textTertiary,
                  }}
                />
                <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>{plan.name}</span>
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 56,
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: T.textPrimary,
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: 14, color: T.textTertiary }}>{plan.period}</span>
                )}
              </div>
              <div style={{ fontSize: 13, color: T.textSecondary, marginBottom: 28, lineHeight: 1.5 }}>
                {plan.tagline}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: T.borderSubtle, marginBottom: 24 }} />

              {/* Features */}
              <ul style={{ margin: 0, marginBottom: 32, padding: 0, listStyle: "none" }}>
                {plan.features.map((f, fi) => (
                  <li
                    key={fi}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "9px 0",
                      fontSize: 13,
                      color: T.textSecondary,
                      lineHeight: 1.5,
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke={T.textPrimary}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginTop: 5, flexShrink: 0 }}
                    >
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="https://arc.cornerstone.sh"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "13px 20px",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontFamily: "'Ronzino', Georgia, serif",
                  transition: "opacity 120ms ease, background 120ms ease",
                  ...(plan.ctaStyle === "primary"
                    ? {
                        background: T.textPrimary,
                        color: T.surfacePage,
                        border: "none",
                      }
                    : {
                        background: "transparent",
                        color: T.textPrimary,
                        border: `1px solid ${T.borderDefault}`,
                      }),
                }}
              >
                {plan.cta} →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            textAlign: "center",
            fontSize: 12,
            color: T.textTertiary,
            marginTop: 40,
            fontStyle: "italic",
          }}
        >
          Scale & Enterprise tiers available — <Link href="mailto:hi@cornerstone.sh" style={{ color: T.textSecondary, textDecoration: "underline", textDecorationColor: T.borderDefault, textUnderlineOffset: 3 }}>talk to us</Link>.
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .arc-pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
