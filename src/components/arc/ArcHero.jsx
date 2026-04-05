"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { T, SWATCH, TYPE, pillStyle, dotStyle } from "./arcTokens";

/* ═══════════════════════════════════════════════════════════════════
   DATA — mirrors Arc's real dashboard
   ═══════════════════════════════════════════════════════════════════ */

const ROUTE_POOL = [
  { name: "classify",  color: "clay",  model: "gpt-4o-mini",      prov: "openai" },
  { name: "chat",      color: "moss",  model: "claude-sonnet-4",  prov: "anthropic" },
  { name: "summarize", color: "ochre", model: "gpt-4o",           prov: "openai" },
  { name: "extract",   color: "dusk",  model: "claude-haiku",     prov: "anthropic" },
  { name: "embed",     color: "slate", model: "text-embed-3",     prov: "openai" },
  { name: "search",    color: "mauve", model: "gemini-2.0-flash", prov: "google" },
  { name: "generate",  color: "pine",  model: "claude-opus-4",    prov: "anthropic" },
  { name: "analyze",   color: "sand",  model: "gpt-4-turbo",      prov: "openai" },
];

function providerDot(prov) {
  if (prov === "anthropic") return T.providerAnthropic;
  if (prov === "google")    return T.providerGoogle;
  return T.providerOpenai;
}

const hex = () => Math.floor(Math.random() * 16).toString(16);
const shortId = () => Array.from({ length: 6 }, hex).join("");

let _seq = 0;
function makeReq() {
  const r = ROUTE_POOL[Math.floor(Math.random() * ROUTE_POOL.length)];
  const tokens = Math.floor(Math.random() * 3600) + 140;
  const latency = Math.floor(Math.random() * 420) + 70;
  const cost = tokens * (Math.random() * 0.003 + 0.0006);
  const rand = Math.random();
  const status = rand > 0.95 ? 429 : rand > 0.93 ? 500 : 200;
  return {
    id: ++_seq,
    reqId: shortId(),
    route: r,
    tokens,
    latency,
    cost,
    status,
    cacheHit: Math.random() < 0.24,
  };
}

/* ═══════════════════════════════════════════════════════════════════
   LIVE LOG PANEL — mini Arc dashboard card
   ═══════════════════════════════════════════════════════════════════ */

function LiveLogPanel() {
  const [rows, setRows] = useState(() => Array.from({ length: 7 }, makeReq));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prev) => [makeReq(), ...prev].slice(0, 7));
      setTick((t) => t + 1);
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  const statusColor = (s) =>
    s === 200 ? T.statusHealthy : s === 429 ? T.statusWarning : T.statusError;

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
      {/* Card header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: `1px solid ${T.borderSubtle}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.statusHealthy,
              boxShadow: `0 0 0 3px color-mix(in srgb, var(--arc-status-healthy) 18%, transparent)`,
              animation: "arc-pulse 2s ease-in-out infinite",
            }}
          />
          <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>Live requests</span>
        </div>
        <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>
          arc.cornerstone.sh/v1
        </span>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "54px 1fr 82px 54px 64px",
          alignItems: "center",
          padding: "9px 18px",
          borderBottom: `1px solid ${T.borderSubtle}`,
          background: T.surfaceCard,
        }}
      >
        {["id", "route", "model", "lat", "cost"].map((h, i) => (
          <span
            key={h}
            style={{
              ...TYPE.metaLabel,
              color: T.textTertiary,
              textAlign: i >= 3 ? "right" : "left",
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ minHeight: 350 }}>
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, x: -6, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "54px 1fr 82px 54px 64px",
                alignItems: "center",
                padding: "11px 18px",
                borderBottom: `1px solid ${T.borderSubtle}`,
              }}
            >
              {/* id */}
              <span style={{ fontSize: 10.5, color: T.textTertiary, letterSpacing: "0.02em" }}>
                {r.reqId}
              </span>

              {/* route pill */}
              <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                <span style={pillStyle(r.route.color)}>
                  <span style={{ ...dotStyle(r.route.color) }} />
                  {r.route.name}
                </span>
                {r.cacheHit && (
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: T.statusHealthy,
                    }}
                  >
                    cache
                  </span>
                )}
              </div>

              {/* model */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: providerDot(r.route.prov),
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 10.5,
                    color: T.textSecondary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.route.model}
                </span>
              </div>

              {/* latency */}
              <span
                style={{
                  fontSize: 10.5,
                  color: T.textSecondary,
                  textAlign: "right",
                }}
              >
                {r.latency}ms
              </span>

              {/* cost */}
              <span
                style={{
                  fontSize: 10.5,
                  color: r.status === 200 ? T.textSecondary : statusColor(r.status),
                  textAlign: "right",
                }}
              >
                ${r.cost.toFixed(3)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          background: T.surfaceRaised,
          borderTop: `1px solid ${T.borderSubtle}`,
        }}
      >
        <span style={{ ...TYPE.metaLabel, color: T.textTertiary }}>
          12,847 req/min · 7 routes
        </span>
        <span style={{ ...TYPE.metaLabel, color: T.statusHealthy }}>● healthy</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════ */

export default function ArcHero() {
  return (
    <section
      style={{
        background: T.surfacePage,
        color: T.textPrimary,
        fontFamily: "'Ronzino', Georgia, serif",
        paddingTop: 120,
        paddingBottom: "clamp(80px, 10vw, 140px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* pulse keyframes */}
      <style>{`
        @keyframes arc-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes arc-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 56px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
          gap: "clamp(40px, 6vw, 88px)",
          alignItems: "center",
        }}
        className="arc-hero-grid"
      >
        {/* LEFT — text */}
        <div style={{ animation: "arc-fade-up 0.9s ease-out both" }}>
          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: T.textPrimary,
                display: "inline-block",
              }}
            />
            <span style={{ ...TYPE.eyebrow, color: T.textSecondary }}>
              Arc — AI operations proxy
            </span>
          </div>

          {/* headline */}
          <h1
            style={{
              ...TYPE.displayXL,
              color: T.textPrimary,
              margin: 0,
              marginBottom: 28,
            }}
          >
            Your AI stack,
            <br />
            <span style={{ color: T.textSecondary, fontStyle: "italic" }}>observed.</span>
          </h1>

          {/* body */}
          <p
            style={{
              ...TYPE.bodyLg,
              color: T.textSecondary,
              maxWidth: 520,
              margin: 0,
              marginBottom: 40,
            }}
          >
            Arc sits between your app and your AI providers. One endpoint for every model.
            Every request logged, routed, and tuned — without a line of infrastructure code.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="https://arc.cornerstone.sh"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 22px",
                background: T.textPrimary,
                color: T.surfacePage,
                border: "none",
                borderRadius: 4,
                fontFamily: "'Ronzino', Georgia, serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                cursor: "pointer",
                transition: "opacity 120ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Start free
              <span style={{ opacity: 0.6 }}>→</span>
            </Link>

            <Link
              href="#how-it-works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 22px",
                background: "transparent",
                color: T.textPrimary,
                border: `1px solid ${T.borderDefault}`,
                borderRadius: 4,
                fontFamily: "'Ronzino', Georgia, serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "border-color 120ms ease, background 120ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--arc-text-secondary)";
                e.currentTarget.style.background = T.surfaceRaised;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--arc-border-default)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              See how it works
            </Link>
          </div>

          {/* stats strip */}
          <div
            style={{
              marginTop: 56,
              paddingTop: 24,
              borderTop: `1px solid ${T.borderSubtle}`,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {[
              { value: "<2ms", label: "Proxy overhead" },
              { value: "9", label: "Providers" },
              { value: "$0", label: "Dev tier" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: T.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ ...TYPE.metaLabel, color: T.textTertiary }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — live log panel */}
        <div style={{ animation: "arc-fade-up 1.1s ease-out 0.15s both" }}>
          <LiveLogPanel />
        </div>
      </div>

      {/* mobile layout adjustment */}
      <style>{`
        @media (max-width: 900px) {
          .arc-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
