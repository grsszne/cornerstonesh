"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { T, TYPE, SECTION, BUTTON } from "./arcTokens";

const PLANS = [
  {
    name: "Developer",
    price: "$19",
    period: "/ month",
    description: "For solo builders and serious side projects. Includes core Arc functionality for one user: projects, routes, logs, routing/fallbacks, and the essentials needed to run AI features through Arc without extra team collaboration or advanced production controls.",
    cta: "Start free trial",
    primary: false,
  },
  {
    name: "Pro",
    price: "$35",
    period: "/ month",
    description: "For small teams and more serious production use. Includes everything in Developer, plus up to 4 members, advanced capabilities like memory, smarter routing, richer trace views, and stronger operational tooling for managing and evolving AI features with more control.",
    cta: "Upgrade to Pro",
    primary: true,
  },
];

export default function ArcPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="pricing" style={SECTION.wrap}>
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
          Start free. Upgrade when it pays for itself.
        </motion.h2>

        <div
          className="arc-pricing-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 0,
            borderTop: `1px solid ${T.borderSubtle}`,
            borderBottom: `1px solid ${T.borderSubtle}`,
          }}
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              style={{
                padding: "56px 48px",
                borderLeft: i === 0 ? "none" : `1px solid ${T.borderSubtle}`,
                fontFamily: "'Ronzino', Georgia, serif",
                textAlign: "center",
              }}
              className="arc-pricing-cell"
            >
              <div
                style={{
                  fontSize: 15,
                  color: T.textSecondary,
                  marginBottom: 20,
                }}
              >
                {plan.name}
              </div>

              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 48 }}>
                <span
                  style={{
                    fontSize: 72,
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: T.textPrimary,
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: 16, color: T.textTertiary }}>{plan.period}</span>
                )}
              </div>

              <div
                style={{
                  marginBottom: 48,
                  fontSize: 15,
                  color: T.textSecondary,
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                {plan.description}
              </div>

              <Link
                href="https://arc.cornerstone.sh"
                style={plan.primary ? BUTTON.primary : BUTTON.ghost}
                onMouseEnter={(e) => {
                  if (plan.primary) e.currentTarget.style.opacity = "0.88";
                  else e.currentTarget.style.borderColor = T.textSecondary;
                }}
                onMouseLeave={(e) => {
                  if (plan.primary) e.currentTarget.style.opacity = "1";
                  else e.currentTarget.style.borderColor = T.borderDefault;
                }}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .arc-pricing-grid {
            grid-template-columns: 1fr !important;
          }
          .arc-pricing-cell {
            border-left: none !important;
            border-top: 1px solid var(--arc-border-subtle);
          }
          .arc-pricing-cell:first-child {
            border-top: none !important;
          }
        }
      `}</style>
    </section>
  );
}
