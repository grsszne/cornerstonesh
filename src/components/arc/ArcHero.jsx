"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const MODELS = [
  { name: "gpt-4o", provider: "OpenAI" },
  { name: "gpt-4o-mini", provider: "OpenAI" },
  { name: "claude-sonnet-4", provider: "Anthropic" },
  { name: "claude-3-haiku", provider: "Anthropic" },
  { name: "gpt-4-turbo", provider: "OpenAI" },
  { name: "claude-opus-4", provider: "Anthropic" },
  { name: "gemini-2.0-flash", provider: "Google" },
  { name: "gemini-1.5-pro", provider: "Google" },
];

const ROUTES = ["/chat", "/classify", "/summarize", "/extract", "/embed", "/search", "/generate", "/analyze"];

const STATUS_TYPES = [
  { label: "200", color: "#5BBF80", weight: 55 },
  { label: "CACHED", color: "#70AAA8", weight: 18 },
  { label: "REROUTED", color: "#E5A84D", weight: 10 },
  { label: "SHADOW", color: "#B090B8", weight: 8 },
  { label: "FAILOVER", color: "#E5A84D", weight: 5 },
  { label: "200", color: "#5BBF80", weight: 4 },
];

const INSIGHTS = [
  {
    type: "reroute",
    icon: "↻",
    color: "#E5A84D",
    text: "Rerouted /classify — OpenAI latency spike detected → Anthropic (0 downtime)",
  },
  {
    type: "cache",
    icon: "◆",
    color: "#70AAA8",
    text: "Semantic cache hit on /embed — identical query detected, saved 340ms",
  },
  {
    type: "shadow",
    icon: "◉",
    color: "#B090B8",
    text: "Shadow test: Claude Haiku scored 98.7% vs GPT-4o on /classify — recommend switch",
  },
  {
    type: "optimize",
    icon: "▲",
    color: "#5BBF80",
    text: "Recommendation: /summarize → GPT-4o-mini ($310/mo savings, 98.4% quality match)",
  },
  {
    type: "failover",
    icon: "⚡",
    color: "#E5A84D",
    text: "Provider failover: OpenAI 503 → Anthropic Claude Sonnet (automatic, 0 dropped)",
  },
  {
    type: "rate-limit",
    icon: "◈",
    color: "#C08860",
    text: "Rate limit approaching on /chat (87/100 RPM) — adaptive throttling engaged",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */

let _id = 0;

function pickWeighted(items) {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return items[0];
}

function generateRequest() {
  const model = MODELS[Math.floor(Math.random() * MODELS.length)];
  const route = ROUTES[Math.floor(Math.random() * ROUTES.length)];
  const status = pickWeighted(STATUS_TYPES);
  const tokens = Math.floor(Math.random() * 3800) + 120;
  const cost = tokens * (Math.random() * 0.004 + 0.0005);
  const latency = Math.floor(Math.random() * 450) + 60;
  const now = new Date();
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");

  return {
    id: ++_id,
    time,
    route,
    model: model.name,
    provider: model.provider,
    tokens,
    cost: cost.toFixed(4),
    latency,
    statusLabel: status.label,
    statusColor: status.color,
  };
}

/* ═══════════════════════════════════════════════════════════════════
   SMOOTH COUNTER
   ═══════════════════════════════════════════════════════════════════ */

function SmoothCounter({ value, prefix = "", suffix = "", decimals = 0 }) {
  const displayRef = useRef(0);
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const step = () => {
      const diff = value - displayRef.current;
      if (Math.abs(diff) < (decimals > 0 ? 0.01 : 0.5)) {
        displayRef.current = value;
        setDisplay(value);
        return;
      }
      displayRef.current += diff * 0.08;
      setDisplay(displayRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, decimals]);

  const formatted = display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return <span>{prefix}{formatted}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════════
   REQUEST FEED ROW
   ═══════════════════════════════════════════════════════════════════ */

function FeedRow({ req }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "54px 72px 1fr 52px 58px 48px 68px",
        alignItems: "center",
        gap: 0,
        padding: "6px 12px",
        borderBottom: "1px solid rgba(235, 235, 235, 0.03)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10.5,
        lineHeight: 1,
      }}
    >
      {/* Time */}
      <span style={{ color: "rgba(235, 235, 235, 0.2)" }}>{req.time}</span>
      {/* Route */}
      <span style={{ color: "rgba(235, 235, 235, 0.55)", fontWeight: 500 }}>{req.route}</span>
      {/* Model */}
      <span style={{ color: "rgba(235, 235, 235, 0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {req.model}
      </span>
      {/* Tokens */}
      <span style={{ color: "rgba(235, 235, 235, 0.2)", textAlign: "right" }}>
        {req.tokens.toLocaleString()}
      </span>
      {/* Cost */}
      <span style={{ color: "rgba(235, 235, 235, 0.25)", textAlign: "right" }}>
        ${req.cost}
      </span>
      {/* Latency */}
      <span style={{ color: "rgba(235, 235, 235, 0.2)", textAlign: "right" }}>
        {req.latency}ms
      </span>
      {/* Status */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: req.statusColor,
            opacity: 0.8,
            flexShrink: 0,
          }}
        />
        <span style={{ color: req.statusColor, opacity: 0.7, fontSize: 9, letterSpacing: "0.03em" }}>
          {req.statusLabel}
        </span>
      </span>
    </motion.div>
  );
}

/* Mobile-friendly minimal row */
function FeedRowMobile({ req }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: "6px 10px",
        borderBottom: "1px solid rgba(235, 235, 235, 0.03)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        lineHeight: 1,
      }}
    >
      <span style={{ color: "rgba(235, 235, 235, 0.5)", fontWeight: 500, minWidth: 56 }}>{req.route}</span>
      <span style={{ color: "rgba(235, 235, 235, 0.3)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {req.model}
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
        <span style={{ width: 4, height: 4, borderRadius: "50%", background: req.statusColor, opacity: 0.8 }} />
        <span style={{ color: req.statusColor, opacity: 0.7, fontSize: 8.5 }}>{req.statusLabel}</span>
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OPERATIONS PANEL
   ═══════════════════════════════════════════════════════════════════ */

function OperationsPanel({ requests: reqCount, cacheRate, latencyOverhead, providers }) {
  const [feed, setFeed] = useState([]);
  const [insightIdx, setInsightIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Feed ticker
  useEffect(() => {
    // Seed initial rows
    const initial = Array.from({ length: 6 }, () => generateRequest());
    setFeed(initial);

    const interval = setInterval(() => {
      setFeed((prev) => {
        const next = [generateRequest(), ...prev];
        return next.slice(0, 9);
      });
    }, 1200 + Math.random() * 600);

    return () => clearInterval(interval);
  }, []);

  // Insight cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIdx((i) => (i + 1) % INSIGHTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const insight = INSIGHTS[insightIdx];
  const Row = isMobile ? FeedRowMobile : FeedRow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: [0.23, 1, 0.32, 1] }}
      style={{
        width: "100%",
        maxWidth: 780,
        borderRadius: 10,
        border: "1px solid rgba(235, 235, 235, 0.06)",
        background: "rgba(20, 20, 20, 0.7)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid rgba(235, 235, 235, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#5BBF80",
              boxShadow: "0 0 8px rgba(91, 191, 128, 0.4)",
              animation: "arc-pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5,
              color: "rgba(235, 235, 235, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Live — Arc Operations
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "rgba(235, 235, 235, 0.15)",
          }}
        >
          arc.cornerstone.sh
        </span>
      </div>

      {/* ── Stats row ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: "1px solid rgba(235, 235, 235, 0.05)",
        }}
      >
        {[
          { label: "Requests", value: <SmoothCounter value={reqCount} />, color: "#EBEBEB" },
          { label: "Cache hit", value: <SmoothCounter value={cacheRate} suffix="%" decimals={1} />, color: "#70AAA8" },
          { label: "Overhead", value: <SmoothCounter value={latencyOverhead} suffix="ms" decimals={1} />, color: "#EBEBEB" },
          { label: "Providers", value: <span>{providers}</span>, color: "#EBEBEB" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: isMobile ? "10px 8px" : "12px 14px",
              borderRight: i < 3 ? "1px solid rgba(235, 235, 235, 0.04)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5,
                color: "rgba(235, 235, 235, 0.25)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: isMobile ? 15 : 18,
                color: s.color,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Column headers (desktop only) ── */}
      {!isMobile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "54px 72px 1fr 52px 58px 48px 68px",
            padding: "6px 12px",
            borderBottom: "1px solid rgba(235, 235, 235, 0.04)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8.5,
            color: "rgba(235, 235, 235, 0.15)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span>Time</span>
          <span>Route</span>
          <span>Model</span>
          <span style={{ textAlign: "right" }}>Tokens</span>
          <span style={{ textAlign: "right" }}>Cost</span>
          <span style={{ textAlign: "right" }}>Latency</span>
          <span style={{ textAlign: "right" }}>Status</span>
        </div>
      )}

      {/* ── Request feed ── */}
      <div
        style={{
          height: isMobile ? 180 : 230,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Fade-out gradient at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            background: "linear-gradient(to top, rgba(20, 20, 20, 0.95), transparent)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <AnimatePresence initial={false}>
          {feed.map((req) => (
            <Row key={req.id} req={req} />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Insight bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(235, 235, 235, 0.05)",
          padding: "9px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          minHeight: 36,
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={insightIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? 9 : 10,
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: insight.color, fontSize: 11, flexShrink: 0 }}>
              {insight.icon}
            </span>
            <span style={{ color: "rgba(235, 235, 235, 0.4)" }}>
              {insight.text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GRID BACKGROUND — subtle drifting dots
   ═══════════════════════════════════════════════════════════════════ */

function GridBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    let raf;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const spacing = 48;
      const cx = w * 0.5;
      const cy = h * 0.55;

      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.sqrt(cx * cx + cy * cy);
          const falloff = 1 - Math.min(dist / maxDist, 1);
          const pulse = Math.sin(now * 0.0008 - dist * 0.006) * 0.5 + 0.5;
          const alpha = (0.015 + pulse * 0.025) * falloff;

          ctx.fillStyle = `rgba(235, 235, 235, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CODE DIFF STRIP
   ═══════════════════════════════════════════════════════════════════ */

function CodeDiffStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.6 }}
      style={{
        width: "100%",
        maxWidth: 620,
        margin: "0 auto",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid rgba(235, 235, 235, 0.05)",
      }}
    >
      {/* Old line */}
      <div
        style={{
          padding: "10px 14px",
          background: "rgba(192, 57, 43, 0.04)",
          borderBottom: "1px solid rgba(235, 235, 235, 0.04)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "rgba(192, 57, 43, 0.45)", fontWeight: 700, flexShrink: 0 }}>−</span>
        <span style={{ color: "rgba(235, 235, 235, 0.2)" }}>
          base_url:{" "}
          <span style={{ color: "rgba(235, 235, 235, 0.3)", textDecoration: "line-through" }}>
            &quot;api.openai.com/v1&quot;
          </span>
        </span>
      </div>
      {/* New line */}
      <div
        style={{
          padding: "10px 14px",
          background: "rgba(91, 191, 128, 0.03)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "rgba(91, 191, 128, 0.6)", fontWeight: 700, flexShrink: 0 }}>+</span>
        <span style={{ color: "rgba(235, 235, 235, 0.2)" }}>
          base_url:{" "}
          <span style={{ color: "#EBEBEB" }}>&quot;arc.cornerstone.sh/v1&quot;</span>
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════ */

export default function ArcHero() {
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState(0);
  const [cacheRate, setCacheRate] = useState(0);
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Counter tick
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setRequests((r) => r + Math.floor(Math.random() * 5) + 1);
      setCacheRate(() => 28 + Math.random() * 14);
      setLatency(() => 8 + Math.random() * 9);
    }, 900);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0A",
        overflow: "hidden",
        padding: "0 20px",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(192, 57, 43, 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Grid dots */}
      {mounted && <GridBackground />}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 120,
          paddingBottom: 56,
        }}
      >
        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "'Ronzino', serif",
            fontSize: "clamp(2.6rem, 7vw, 5rem)",
            fontWeight: 400,
            color: "#EBEBEB",
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            marginBottom: 20,
            maxWidth: 720,
          }}
        >
          One endpoint.
          <br />
          <span style={{ color: "rgba(235, 235, 235, 0.25)" }}>Every provider.</span>
        </motion.h1>

        {/* ── Subhead ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(13px, 1.6vw, 15px)",
            color: "rgba(235, 235, 235, 0.35)",
            textAlign: "center",
            maxWidth: 540,
            lineHeight: 1.65,
            marginBottom: 36,
          }}
        >
          Arc is a managed proxy for LLM APIs that doesn&apos;t just observe — it optimizes.
          Change one line of code to get cost tracking, multi-provider routing,
          and proactive recommendations that cut your inference bill.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 48,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="https://arc.cornerstone.sh"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 28px",
              background: "#EBEBEB",
              color: "#0A0A0A",
              borderRadius: 999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start free →
          </Link>
          <a
            href="#how-it-works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 28px",
              border: "1px solid rgba(235, 235, 235, 0.12)",
              color: "rgba(235, 235, 235, 0.5)",
              borderRadius: 999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(235, 235, 235, 0.25)";
              e.currentTarget.style.color = "rgba(235, 235, 235, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(235, 235, 235, 0.12)";
              e.currentTarget.style.color = "rgba(235, 235, 235, 0.5)";
            }}
          >
            See it in action ↓
          </a>
        </motion.div>

        {/* ── Operations panel ── */}
        {mounted && (
          <OperationsPanel
            requests={requests}
            cacheRate={cacheRate}
            latencyOverhead={latency}
            providers={3}
          />
        )}

        {/* ── Spacer ── */}
        <div style={{ height: 32 }} />

        {/* ── Code diff ── */}
        <CodeDiffStrip />

        {/* ── Label ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "rgba(235, 235, 235, 0.2)",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          That&apos;s it. One line.
        </motion.p>
      </div>

      {/* ── Scroll chevron ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="rgba(235,235,235,0.5)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 2l6 6 6-6" />
        </svg>
      </motion.div>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes arc-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
