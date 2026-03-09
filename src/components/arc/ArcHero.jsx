"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   ARC DARK-MODE DESIGN TOKENS (hardcoded — this is a marketing site)
   ═══════════════════════════════════════════════════════════════════ */

const T = {
  surfacePage: "#0A0A0A",
  surfaceCard: "#141414",
  surfaceRaised: "#1A1A1A",
  textPrimary: "#EBEBEB",
  textSecondary: "#5A5A5A",
  textTertiary: "#333333",
  borderSubtle: "#1E1E1E",
  borderDefault: "#2C2C2C",
  statusHealthy: "#5BBF80",
  statusWarning: "#E5A84D",
  statusError: "#E74C3C",
  providerOpenai: "#D0D0D0",
  providerAnthropic: "#C0392B",
  providerGoogle: "#70AAA8",
};

/* Earthy palette — dark mode values from Arc */
const SWATCH = {
  clay:  { bg: "rgba(139, 94, 60, 0.18)",  fg: "#C08860" },
  moss:  { bg: "rgba(74, 103, 65, 0.18)",  fg: "#7AAA6A" },
  ochre: { bg: "rgba(122, 98, 48, 0.18)",  fg: "#BCA060" },
  dusk:  { bg: "rgba(107, 79, 79, 0.18)",  fg: "#B08080" },
  slate: { bg: "rgba(77, 98, 96, 0.18)",   fg: "#70AAA8" },
  mauve: { bg: "rgba(107, 85, 112, 0.18)", fg: "#B090B8" },
  pine:  { bg: "rgba(74, 103, 65, 0.18)",  fg: "#80B890" },
  stone: { bg: "rgba(100, 100, 95, 0.15)", fg: "#909088" },
  sand:  { bg: "rgba(122, 110, 90, 0.18)", fg: "#B0A080" },
};

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const ROUTE_DEFS = [
  { name: "classify", color: "clay" },
  { name: "chat", color: "moss" },
  { name: "summarize", color: "ochre" },
  { name: "extract", color: "dusk" },
  { name: "embed", color: "slate" },
  { name: "search", color: "mauve" },
  { name: "generate", color: "pine" },
  { name: "analyze", color: "sand" },
  { name: "Direct", color: "stone" },
];

const MODELS = [
  { name: "gpt-4o", provider: "openai" },
  { name: "gpt-4o-mini", provider: "openai" },
  { name: "claude-sonnet-4", provider: "anthropic" },
  { name: "claude-3-haiku", provider: "anthropic" },
  { name: "gpt-4-turbo", provider: "openai" },
  { name: "claude-opus-4", provider: "anthropic" },
  { name: "gemini-2.0-flash", provider: "google" },
  { name: "gemini-1.5-pro", provider: "google" },
];

const INSIGHTS = [
  { icon: "↻", color: T.statusWarning, text: "Rerouted /classify — OpenAI latency spike detected → Anthropic (0 downtime)" },
  { icon: "◆", color: SWATCH.slate.fg, text: "Semantic cache hit on /embed — identical query detected, saved 340ms" },
  { icon: "◉", color: SWATCH.mauve.fg, text: "Shadow test: Claude Haiku scored 98.7% vs GPT-4o on /classify — recommend switch" },
  { icon: "▲", color: T.statusHealthy, text: "Recommendation: /summarize → GPT-4o-mini ($310/mo savings, 98.4% quality match)" },
  { icon: "⚡", color: T.statusWarning, text: "Provider failover: OpenAI 503 → Anthropic Claude Sonnet (automatic, 0 dropped)" },
  { icon: "◈", color: SWATCH.clay.fg, text: "Rate limit approaching on /chat (87/100 RPM) — adaptive throttling engaged" },
];

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */

let _id = 0;
const hex = () => Math.floor(Math.random() * 16).toString(16);
const fakeUuid = () => Array.from({ length: 8 }, hex).join("");

function generateRequest(ageMs = 0) {
  const model = MODELS[Math.floor(Math.random() * MODELS.length)];
  const route = ROUTE_DEFS[Math.floor(Math.random() * ROUTE_DEFS.length)];
  const tokens = Math.floor(Math.random() * 3800) + 120;
  const cost = tokens * (Math.random() * 0.004 + 0.0005);
  const latency = Math.floor(Math.random() * 480) + 60;
  const cacheHit = Math.random() < 0.22;
  const isShadow = Math.random() < 0.12;

  // status
  let statusCode = 200;
  const r = Math.random();
  if (r > 0.94) statusCode = 429;
  else if (r > 0.92) statusCode = 500;

  return {
    id: ++_id,
    reqId: fakeUuid(),
    ageMs,
    route,
    model: model.name,
    provider: model.provider,
    tokens,
    cost,
    latency,
    cacheHit,
    statusCode,
    isShadow,
  };
}

function formatAge(ms) {
  if (ms < 5000) return "just now";
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

function providerDotColor(provider) {
  if (provider === "anthropic") return T.providerAnthropic;
  if (provider === "google") return T.providerGoogle;
  return T.providerOpenai;
}

function statusColor(code) {
  if (code === 200) return T.statusHealthy;
  if (code === 429) return T.statusWarning;
  return T.statusError;
}

/* ═══════════════════════════════════════════════════════════════════
   SMOOTH COUNTER
   ═══════════════════════════════════════════════════════════════════ */

function SmoothCounter({ value, prefix = "", suffix = "", decimals = 0 }) {
  const cur = useRef(0);
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const step = () => {
      const diff = value - cur.current;
      if (Math.abs(diff) < (decimals > 0 ? 0.01 : 0.5)) {
        cur.current = value;
        setDisplay(value);
        return;
      }
      cur.current += diff * 0.08;
      setDisplay(cur.current);
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [value, decimals]);

  return (
    <span>
      {prefix}
      {display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROUTE PILL — replicates Arc's UseCasePill exactly
   ═══════════════════════════════════════════════════════════════════ */

function RoutePill({ name, color }) {
  const s = SWATCH[color] || SWATCH.stone;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 7px",
        borderRadius: 4,
        background: s.bg,
        fontSize: 10,
        letterSpacing: "0.02em",
        color: s.fg,
        whiteSpace: "nowrap",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: s.fg,
          flexShrink: 0,
        }}
      />
      {name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TABLE ROW — matches Arc's real log table
   ═══════════════════════════════════════════════════════════════════ */

const COL_TEMPLATE = "68px 56px auto 1fr 42px 42px 56px 56px 56px";
const CELL = { padding: "9px 12px" };
const SANS = { fontFamily: "'Inter', sans-serif" };
// Monospace only for actual code-like data: hashes, costs, token counts
const MONO = { fontFamily: "'JetBrains Mono', monospace" };

function LogRow({ req, elapsed }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: COL_TEMPLATE,
        alignItems: "center",
        borderBottom: `1px solid ${T.borderSubtle}`,
        cursor: "pointer",
        transition: "background 60ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.surfaceRaised)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Request ID — monospace because it's a hash */}
      <div style={{ ...CELL, ...MONO, fontSize: 11, color: T.textTertiary, whiteSpace: "nowrap", overflow: "hidden" }}>
        {req.reqId}…
        {req.isShadow && (
          <span
            style={{
              marginLeft: 5,
              fontSize: 8.5,
              letterSpacing: "0.06em",
              padding: "1px 5px",
              borderRadius: 3,
              color: T.statusWarning,
              border: `1px solid rgba(229, 168, 77, 0.35)`,
              background: "rgba(229, 168, 77, 0.08)",
              verticalAlign: "middle",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            shadow
          </span>
        )}
      </div>

      {/* Time — regular text */}
      <div style={{ ...CELL, ...SANS, fontSize: 11, color: T.textTertiary }}>
        {formatAge(elapsed + req.ageMs)}
      </div>

      {/* Route */}
      <div style={CELL}>
        <RoutePill name={req.route.name} color={req.route.color} />
      </div>

      {/* Model — regular text */}
      <div style={{ ...CELL, display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: providerDotColor(req.provider), flexShrink: 0 }} />
        <span style={{ ...SANS, fontSize: 11, color: T.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {req.model}
        </span>
      </div>

      {/* Cache — regular text */}
      <div style={{ ...CELL, textAlign: "center" }}>
        <span style={{ ...SANS, fontSize: 11, color: req.cacheHit ? T.statusHealthy : T.textTertiary }}>
          {req.cacheHit ? "Hit" : "Miss"}
        </span>
      </div>

      {/* Status — regular text */}
      <div style={{ ...CELL, textAlign: "center" }}>
        <span style={{ ...SANS, fontSize: 11, fontWeight: 500, color: statusColor(req.statusCode) }}>
          {req.statusCode}
        </span>
      </div>

      {/* Latency — monospace, it's a measurement */}
      <div style={{ ...CELL, ...MONO, fontSize: 11, color: T.textSecondary, textAlign: "right" }}>
        {req.latency}ms
      </div>

      {/* Tokens — monospace, it's a count */}
      <div style={{ ...CELL, ...MONO, fontSize: 11, color: T.textTertiary, textAlign: "right" }}>
        {req.tokens.toLocaleString()}
      </div>

      {/* Cost — monospace, it's a precise number */}
      <div style={{ ...CELL, ...MONO, fontSize: 11, color: T.textSecondary, textAlign: "right" }}>
        ${req.cost.toFixed(4)}
      </div>
    </motion.div>
  );
}

/* Mobile row — compact */
function LogRowMobile({ req, elapsed }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr 36px 48px",
        alignItems: "center",
        gap: 0,
        borderBottom: `1px solid ${T.borderSubtle}`,
      }}
    >
      <div style={{ padding: "8px 10px" }}>
        <RoutePill name={req.route.name} color={req.route.color} />
      </div>
      <div style={{ padding: "8px 6px", display: "flex", alignItems: "center", gap: 5, overflow: "hidden" }}>
        <span style={{ width: 4, height: 4, borderRadius: "50%", background: providerDotColor(req.provider), flexShrink: 0 }} />
        <span style={{ ...MONO, fontSize: 10, color: T.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {req.model}
        </span>
      </div>
      <div style={{ ...MONO, fontSize: 9.5, fontWeight: 500, color: statusColor(req.statusCode), textAlign: "center", padding: "8px 4px" }}>
        {req.statusCode}
      </div>
      <div style={{ ...MONO, fontSize: 10, color: T.textSecondary, textAlign: "right", padding: "8px 10px" }}>
        ${req.cost.toFixed(3)}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OPERATIONS PANEL
   ═══════════════════════════════════════════════════════════════════ */

function OperationsPanel({ reqCount, cacheRate, latencyOverhead, providerCount }) {
  const [feed, setFeed] = useState([]);
  const [insightIdx, setInsightIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Seed initial rows with staggered ages
  useEffect(() => {
    const initial = [];
    for (let i = 0; i < 7; i++) {
      initial.push(generateRequest(i * 8000 + Math.random() * 4000));
    }
    setFeed(initial);
  }, []);

  // Feed ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed((prev) => {
        const next = [generateRequest(0), ...prev];
        return next.slice(0, 9);
      });
    }, 1400 + Math.random() * 800);
    return () => clearInterval(interval);
  }, []);

  // Insight cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIdx((i) => (i + 1) % INSIGHTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Elapsed time for relative timestamps
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setElapsed(Date.now() - startRef.current), 1000);
    return () => clearInterval(interval);
  }, []);

  const insight = INSIGHTS[insightIdx];
  const Row = isMobile ? LogRowMobile : LogRow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: [0.23, 1, 0.32, 1] }}
      style={{
        width: "100%",
        maxWidth: 880,
        borderRadius: 6,
        border: `1px solid ${T.borderDefault}`,
        background: T.surfaceCard,
        overflow: "hidden",
      }}
    >
      {/* ── Header bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: `1px solid ${T.borderDefault}`,
          background: T.surfaceCard,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.statusHealthy,
              boxShadow: `0 0 8px rgba(91, 191, 128, 0.4)`,
              animation: "arc-pulse 2s ease-in-out infinite",
            }}
          />
          <span style={{ fontFamily: "'Ronzino', serif", fontSize: 15, fontWeight: 400, letterSpacing: "-0.02em", color: T.textPrimary }}>
            Logs
          </span>
          <span style={{ ...SANS, fontSize: 11, color: T.textTertiary, marginLeft: 2 }}>
            <SmoothCounter value={reqCount} /> requests
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              ...SANS,
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "5px 12px",
              background: "transparent",
              border: `1px solid ${T.borderDefault}`,
              borderRadius: 4,
              color: T.textSecondary,
            }}
          >
            Export CSV
          </span>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: `1px solid ${T.borderDefault}`,
        }}
      >
        {[
          { label: "Requests", value: <SmoothCounter value={reqCount} />, color: T.textPrimary },
          { label: "Cache Hit Rate", value: <SmoothCounter value={cacheRate} suffix="%" decimals={1} />, color: SWATCH.slate.fg },
          { label: "Latency Overhead", value: <SmoothCounter value={latencyOverhead} suffix="ms" decimals={1} />, color: T.textPrimary },
          { label: "Providers", value: <span>{providerCount}</span>, color: T.textPrimary },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: isMobile ? "10px 8px" : "12px 14px",
              borderRight: i < 3 ? `1px solid ${T.borderSubtle}` : "none",
            }}
          >
            <div style={{ ...SANS, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: T.textTertiary, marginBottom: 4 }}>
              {s.label}
            </div>
            <div style={{ ...SANS, fontSize: isMobile ? 15 : 18, color: s.color, fontWeight: 400, fontVariantNumeric: "tabular-nums" }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Column headers (desktop) ── */}
      {!isMobile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: COL_TEMPLATE,
            borderBottom: `1px solid ${T.borderDefault}`,
            background: T.surfaceCard,
          }}
        >
          {[
            { label: "Request ID", align: "left" },
            { label: "Time", align: "left" },
            { label: "Route", align: "left" },
            { label: "Model", align: "left" },
            { label: "Cache", align: "center" },
            { label: "Status", align: "center" },
            { label: "Latency", align: "right" },
            { label: "Tokens", align: "right" },
            { label: "Cost", align: "right" },
          ].map((h) => (
            <div
              key={h.label}
              style={{
                ...SANS,
                padding: "10px 12px",
                textAlign: h.align,
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: T.textTertiary,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {h.label}
            </div>
          ))}
        </div>
      )}

      {/* ── Request feed ── */}
      <div
        style={{
          height: isMobile ? 200 : 270,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Fade at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            background: `linear-gradient(to top, ${T.surfaceCard}, transparent)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
        <AnimatePresence initial={false}>
          {feed.map((req) => (
            <Row key={req.id} req={req} elapsed={elapsed} />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Insight bar ── */}
      <div
        style={{
          borderTop: `1px solid ${T.borderDefault}`,
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
              ...SANS,
              fontSize: isMobile ? 10 : 11,
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: insight.color, fontSize: 11, flexShrink: 0 }}>{insight.icon}</span>
            <span style={{ color: T.textSecondary }}>{insight.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GRID BACKGROUND
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
      const cy = h * 0.5;

      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.sqrt(cx * cx + cy * cy);
          const falloff = 1 - Math.min(dist / maxDist, 1);
          const pulse = Math.sin(now * 0.0008 - dist * 0.006) * 0.5 + 0.5;
          const alpha = (0.012 + pulse * 0.02) * falloff;
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
        border: `1px solid ${T.borderDefault}`,
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          background: "rgba(192, 57, 43, 0.04)",
          borderBottom: `1px solid ${T.borderSubtle}`,
          ...MONO,
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "rgba(192, 57, 43, 0.45)", fontWeight: 700, flexShrink: 0 }}>−</span>
        <span style={{ color: T.textTertiary }}>
          base_url:{" "}
          <span style={{ color: T.textSecondary, textDecoration: "line-through" }}>
            &quot;api.openai.com/v1&quot;
          </span>
        </span>
      </div>
      <div
        style={{
          padding: "10px 14px",
          background: "rgba(91, 191, 128, 0.03)",
          ...MONO,
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "rgba(91, 191, 128, 0.6)", fontWeight: 700, flexShrink: 0 }}>+</span>
        <span style={{ color: T.textTertiary }}>
          base_url:{" "}
          <span style={{ color: T.textPrimary }}>&quot;arc.cornerstone.sh/v1&quot;</span>
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

  useEffect(() => setMounted(true), []);

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
        background: T.surfacePage,
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
          background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(192, 57, 43, 0.035) 0%, transparent 70%)",
        }}
      />

      {mounted && <GridBackground />}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 920,
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
            color: T.textPrimary,
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            marginBottom: 20,
            maxWidth: 720,
          }}
        >
          We watch every
          <br />
          <span style={{ color: T.textTertiary }}>AI call. Then we fix it.</span>
        </motion.h1>

        {/* ── Subhead ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(13px, 1.6vw, 15px)",
            color: T.textSecondary,
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
          style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link
            href="https://arc.cornerstone.sh"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 28px",
              background: T.textPrimary,
              color: T.surfacePage,
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
              border: `1px solid ${T.borderDefault}`,
              color: T.textSecondary,
              borderRadius: 999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.borderDefault;
              e.currentTarget.style.color = T.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.borderDefault;
              e.currentTarget.style.color = T.textSecondary;
            }}
          >
            See it in action ↓
          </a>
        </motion.div>

        {/* ── Operations panel ── */}
        {mounted && (
          <OperationsPanel
            reqCount={requests}
            cacheRate={cacheRate}
            latencyOverhead={latency}
            providerCount={3}
          />
        )}

        <div style={{ height: 32 }} />

        <CodeDiffStrip />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: T.textTertiary,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          That&apos;s it. One line.
        </motion.p>
      </div>

      {/* Scroll chevron */}
      <motion.div
        style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)" }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke={T.textSecondary} strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 2l6 6 6-6" />
        </svg>
      </motion.div>

      <style>{`@keyframes arc-pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }`}</style>
    </section>
  );
}
