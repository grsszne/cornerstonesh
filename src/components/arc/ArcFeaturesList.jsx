"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";
import ArcVideoPlaceholder from "./ArcVideoPlaceholder";

/* ─── Tier 1: Must-show features ─── */
const TIER_1 = [
  {
    headline: "One endpoint for every model provider.",
    body: "Swap your base URL, keep your app code the same, and route requests through Arc. OpenAI, Anthropic, Together, Mistral — one integration for all of them.",
    why: "No migration. No vendor lock-in. Works with your stack today.",
    video: "proxy endpoint",
  },
  {
    headline: "Give each AI feature its own controls.",
    body: "Chat, extraction, support replies, search answers — each one gets its own route with its own models, fallbacks, memory, and rollout strategy.",
    why: "Stop hardcoding model choices in random places. Treat every AI feature like a managed product surface.",
    video: "routes",
  },
  {
    headline: "See every request in one place.",
    body: "Track which route ran, which model handled it, what it cost, how long it took, and what happened — across every provider.",
    why: "No more flying blind. Debug failures, compare providers, and understand costs without stitching together five dashboards.",
    video: "request log",
  },
  {
    headline: "Roll out model changes gradually.",
    body: "Shift traffic from one model to another over hours or days instead of flipping everything at once. Pause, adjust, or roll back whenever you want.",
    why: "Changing live model behavior is scary. Gradual rollouts make experimentation safer and migration controllable.",
    video: "gradual rollout",
  },
  {
    headline: "Try a new model without risking production.",
    body: "Mirror live traffic to a candidate model and compare behavior, latency, and cost — before you switch over.",
    why: "Improve your AI without gambling on real users. See the win rate before you commit.",
    video: "shadow testing",
  },
  {
    headline: "Keep AI workflows from running away.",
    body: "Set hard limits on multi-step workflows so agents cannot burn time, tokens, or money without control. Inspect traces step by step when something goes wrong.",
    why: "Agentic loops are powerful — and expensive when they loop. Arc cuts the connection before reality misbehaves.",
    video: "workflow controls",
  },
];

/* ─── Tier 2: Strong secondary features ─── */
const TIER_2 = [
  {
    headline: "Give your app shared long-term memory.",
    body: "Attach multiple routes to a memory pool and fetch relevant user context by end-user ID. Control when memory is written, summarized, and compacted.",
  },
  {
    headline: "Avoid paying twice for the same intent.",
    body: "Cache repeated or semantically similar requests to cut latency and inference cost automatically.",
  },
  {
    headline: "Use the expensive model only when you need it.",
    body: "Route simple work to cheaper models and reserve stronger models for harder requests — automatically.",
  },
  {
    headline: "Set a primary model — and never stop at one.",
    body: "Define fallback chains and routing rules so a route stays available when a provider fails or a model underperforms.",
  },
];

/* ─── Animation helper ─── */
function Reveal({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Tier 1 Feature Block ─── */
function FeatureBlock({ feature, index }) {
  const isEven = index % 2 === 0;
  return (
    <div
      style={{
        borderTop: `1px solid ${T.borderSubtle}`,
        padding: "clamp(100px, 14vw, 180px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 56px)",
          display: "flex",
          flexDirection: "column",
          alignItems: isEven ? "flex-start" : "flex-end",
          textAlign: isEven ? "left" : "right",
        }}
        className="arc-feature-block"
      >
        <Reveal>
          <h3
            style={{
              ...TYPE.displayM,
              color: T.textPrimary,
              margin: "0 0 20px",
              maxWidth: 700,
            }}
          >
            {feature.headline}
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            style={{
              ...TYPE.bodyLg,
              margin: "0 0 16px",
              maxWidth: 620,
            }}
          >
            {feature.body}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <p
            style={{
              fontSize: 15,
              color: T.textTertiary,
              lineHeight: 1.5,
              margin: "0 0 56px",
              maxWidth: 560,
              fontStyle: "italic",
            }}
          >
            {feature.why}
          </p>
        </Reveal>

        <Reveal delay={0.25} style={{ width: "100%" }}>
          <ArcVideoPlaceholder label={feature.video} />
        </Reveal>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export default function ArcFeaturesList() {
  const umbrellaRef = useRef(null);
  const umbrellaInView = useInView(umbrellaRef, { once: true, margin: "-120px" });

  return (
    <section
      style={{
        background: T.surfacePage,
        color: T.textPrimary,
        fontFamily: "'Ronzino', Georgia, serif",
      }}
    >
      {/* ── Umbrella framing ── */}
      <div
        ref={umbrellaRef}
        style={{
          ...SECTION.inner,
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={umbrellaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            ...TYPE.displayL,
            color: T.textPrimary,
            margin: "0 auto 40px",
            maxWidth: 820,
          }}
        >
          One place to operate AI in production.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={umbrellaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            ...TYPE.bodyLg,
            margin: "0 auto",
            maxWidth: 660,
          }}
        >
          Model routing, logs, safer rollouts, memory, and workflow controls —
          without building your own AI infrastructure layer.
        </motion.p>
      </div>

      {/* ── Tier 1: large feature blocks ── */}
      {TIER_1.map((feature, i) => (
        <FeatureBlock key={i} feature={feature} index={i} />
      ))}

      {/* ── Tier 2: secondary grid ── */}
      <div
        style={{
          borderTop: `1px solid ${T.borderSubtle}`,
          padding: "clamp(100px, 14vw, 180px) clamp(24px, 5vw, 56px)",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <Reveal>
            <p
              style={{
                fontSize: 13,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: T.textTertiary,
                marginBottom: 56,
                textAlign: "center",
              }}
            >
              Also included
            </p>
          </Reveal>

          <div
            className="arc-tier2-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 0,
            }}
          >
            {TIER_2.map((item, i) => (
              <Reveal
                key={i}
                delay={0.08 * i}
                style={{
                  padding: "40px 36px",
                  borderTop: `1px solid ${T.borderSubtle}`,
                  borderLeft: i % 2 === 1 ? `1px solid ${T.borderSubtle}` : "none",
                  textAlign: "left",
                }}
                className="arc-tier2-cell"
              >
                <h4
                  style={{
                    fontSize: 22,
                    fontWeight: 300,
                    letterSpacing: "-0.015em",
                    color: T.textPrimary,
                    margin: "0 0 14px",
                    lineHeight: 1.25,
                  }}
                >
                  {item.headline}
                </h4>
                <p
                  style={{
                    fontSize: 15,
                    color: T.textSecondary,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Tier 3: small callout */}
          <Reveal delay={0.1}>
            <p
              style={{
                fontSize: 15,
                color: T.textTertiary,
                lineHeight: 1.55,
                textAlign: "center",
                marginTop: 64,
                maxWidth: 540,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Built for teams, not just one dashboard login. Invite teammates to your
              org, assign access by project, and keep each app organized.
            </p>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .arc-feature-block {
            align-items: flex-start !important;
            text-align: left !important;
          }
          .arc-tier2-grid {
            grid-template-columns: 1fr !important;
          }
          .arc-tier2-cell {
            border-left: none !important;
          }
        }
      `}</style>
    </section>
  );
}
