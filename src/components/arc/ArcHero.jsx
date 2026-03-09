"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════════════════════════════ */

const MODELS = [
  { name: "gpt-4o", provider: "OpenAI", color: "#EBEBEB" },
  { name: "gpt-4o-mini", provider: "OpenAI", color: "#EBEBEB" },
  { name: "claude-3.5-sonnet", provider: "Anthropic", color: "#D4A27F" },
  { name: "claude-3-haiku", provider: "Anthropic", color: "#D4A27F" },
  { name: "gpt-4-turbo", provider: "OpenAI", color: "#EBEBEB" },
  { name: "claude-opus-4", provider: "Anthropic", color: "#D4A27F" },
  { name: "gemini-1.5-pro", provider: "Google", color: "#8BAAA8" },
  { name: "gemini-2.0-flash", provider: "Google", color: "#8BAAA8" },
];

const PROVIDERS = [
  { name: "OpenAI", y: 0.22, color: "#EBEBEB" },
  { name: "Anthropic", y: 0.50, color: "#D4A27F" },
  { name: "Google", y: 0.78, color: "#8BAAA8" },
];

const ROUTES = ["/chat", "/classify", "/summarize", "/extract", "/embed", "/search", "/generate", "/analyze"];

const RECOMMENDATIONS = [
  {
    route: "/classify",
    from: "GPT-4o",
    to: "Claude 3 Haiku",
    savings: "$420/mo",
    quality: "99.2%",
  },
  {
    route: "/summarize",
    from: "Claude 3.5 Sonnet",
    to: "GPT-4o-mini",
    savings: "$310/mo",
    quality: "98.7%",
  },
  {
    route: "/extract",
    from: "GPT-4 Turbo",
    to: "Gemini 2.0 Flash",
    savings: "$580/mo",
    quality: "99.5%",
  },
  {
    route: "/embed",
    from: "GPT-4o",
    to: "Claude 3 Haiku",
    savings: "$195/mo",
    quality: "97.9%",
  },
  {
    route: "/search",
    from: "Claude 3.5 Sonnet",
    to: "GPT-4o-mini",
    savings: "$260/mo",
    quality: "98.3%",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SMOOTH COUNTER — interpolated count-up
   ═══════════════════════════════════════════════════════════════════ */

function SmoothCounter({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    targetRef.current = value;
    const step = () => {
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) < (decimals > 0 ? 0.01 : 0.5)) {
        currentRef.current = targetRef.current;
        setDisplay(targetRef.current);
        return;
      }
      currentRef.current += diff * 0.08;
      setDisplay(currentRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, decimals]);

  return (
    <span className="font-mono tabular-nums">
      {prefix}
      {display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RECOMMENDATION CARD — slides in from right
   ═══════════════════════════════════════════════════════════════════ */

function RecommendationCard({ rec }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: "rgba(20, 20, 20, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(235, 235, 235, 0.08)",
        borderRadius: 8,
        padding: "14px 18px",
        maxWidth: 340,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#5BBF80",
            boxShadow: "0 0 8px rgba(91, 191, 128, 0.4)",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#5BBF80",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Optimization detected
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: "rgba(235, 235, 235, 0.7)",
          lineHeight: 1.5,
          margin: 0,
          marginBottom: 10,
        }}
      >
        Your <span style={{ color: "#EBEBEB", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{rec.route}</span> route
        could switch from {rec.from} to {rec.to}.
      </p>
      <div style={{ display: "flex", gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(235,235,235,0.35)", marginBottom: 2 }}>
            Savings
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#5BBF80" }}>{rec.savings}</div>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(235,235,235,0.35)", marginBottom: 2 }}>
            Quality match
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#EBEBEB" }}>{rec.quality}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CANVAS FLOW — request capsules via requestAnimationFrame
   ═══════════════════════════════════════════════════════════════════ */

function useRequestFlow(canvasRef, containerRef) {
  const capsulesRef = useRef([]);
  const frameRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const dprRef = useRef(1);

  // Pulse ripples from the Arc node
  const ripplesRef = useRef([]);

  const spawnCapsule = useCallback(() => {
    const model = MODELS[Math.floor(Math.random() * MODELS.length)];
    const provider = PROVIDERS.find((p) => p.name === model.provider);
    const route = ROUTES[Math.floor(Math.random() * ROUTES.length)];
    const tokens = Math.floor(Math.random() * 3000) + 200;
    const cost = (tokens * (Math.random() * 0.003 + 0.001)).toFixed(4);
    const isRateLimit = Math.random() < 0.06;
    const speed = 0.3 + Math.random() * 0.5;

    capsulesRef.current.push({
      model: model.name,
      route,
      tokens,
      cost,
      color: isRateLimit ? "#E5A84D" : model.color,
      status: isRateLimit ? 429 : 200,
      providerY: provider.y,
      providerColor: provider.color,
      // Phase: 0 = moving right to arc, 1 = at arc, 2 = fanning to provider
      phase: 0,
      x: 0,
      y: 0.5,
      speed,
      arcX: 0.42,
      arcPause: 0,
      opacity: 0,
      targetY: provider.y + (Math.random() - 0.5) * 0.06,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    dprRef.current = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now) => {
      const w = canvas.width / dprRef.current;
      const h = canvas.height / dprRef.current;
      ctx.clearRect(0, 0, w, h);

      // ── Draw grid dots ──
      const spacing = 40;
      const arcCx = w * 0.42;
      const arcCy = h * 0.5;
      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          const dx = x - arcCx;
          const dy = y - arcCy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pulse = Math.sin(now * 0.001 - dist * 0.008) * 0.5 + 0.5;
          const alpha = 0.03 + pulse * 0.04;
          ctx.fillStyle = `rgba(235, 235, 235, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Draw node labels ──
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // "Your App" — left side
      const appX = w * 0.08;
      const appY = h * 0.5;
      ctx.fillStyle = "rgba(235, 235, 235, 0.25)";
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.fillText("Your App", appX, appY - 24);
      // App node box
      ctx.strokeStyle = "rgba(235, 235, 235, 0.1)";
      ctx.lineWidth = 1;
      roundRect(ctx, appX - 36, appY - 14, 72, 28, 4);
      ctx.stroke();
      ctx.fillStyle = "rgba(235, 235, 235, 0.03)";
      ctx.fill();
      ctx.fillStyle = "rgba(235, 235, 235, 0.5)";
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillText("POST /v1", appX, appY);

      // "Arc" — center node
      const arcR = 28;
      // Glow rings
      const ringPulse = Math.sin(now * 0.002) * 0.5 + 0.5;
      ctx.strokeStyle = `rgba(192, 57, 43, ${0.08 + ringPulse * 0.06})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, arcR + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(192, 57, 43, ${0.04 + ringPulse * 0.03})`;
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, arcR + 16, 0, Math.PI * 2);
      ctx.stroke();

      // Arc circle
      ctx.beginPath();
      ctx.arc(arcCx, arcCy, arcR, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(192, 57, 43, 0.08)";
      ctx.fill();
      ctx.strokeStyle = "rgba(192, 57, 43, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#EBEBEB";
      ctx.font = "400 16px 'Ronzino', serif";
      ctx.fillText("Arc", arcCx, arcCy + 1);

      // Provider nodes — right side
      PROVIDERS.forEach((p) => {
        const px = w * 0.82;
        const py = h * p.y;
        ctx.strokeStyle = `${p.color}15`;
        ctx.lineWidth = 1;
        roundRect(ctx, px - 48, py - 14, 96, 28, 4);
        ctx.stroke();
        ctx.fillStyle = `${p.color}08`;
        ctx.fill();
        ctx.fillStyle = `${p.color}80`;
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillText(p.name, px, py + 1);
      });

      // ── Draw connection lines (dashed, faint) ──
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = "rgba(235, 235, 235, 0.06)";
      ctx.lineWidth = 1;

      // App → Arc
      ctx.beginPath();
      ctx.moveTo(appX + 36, appY);
      ctx.lineTo(arcCx - arcR, arcCy);
      ctx.stroke();

      // Arc → Providers
      PROVIDERS.forEach((p) => {
        const px = w * 0.82;
        const py = h * p.y;
        ctx.beginPath();
        ctx.moveTo(arcCx + arcR, arcCy);
        ctx.lineTo(px - 48, py);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // ── Ripples from arc ──
      ripplesRef.current = ripplesRef.current.filter((r) => r.opacity > 0.01);
      ripplesRef.current.forEach((r) => {
        r.radius += 0.8;
        r.opacity *= 0.985;
        ctx.beginPath();
        ctx.arc(arcCx, arcCy, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 57, 43, ${r.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ── Spawn new capsules ──
      if (now - lastSpawnRef.current > 300 + Math.random() * 400) {
        spawnCapsule();
        lastSpawnRef.current = now;
      }

      // ── Update & draw capsules ──
      capsulesRef.current = capsulesRef.current.filter((c) => c.opacity > -0.5);

      capsulesRef.current.forEach((c) => {
        const dt = 1;

        if (c.phase === 0) {
          // Moving toward Arc node
          c.x += c.speed * 0.008 * dt;
          c.opacity = Math.min(1, c.opacity + 0.06);
          if (c.x >= c.arcX - 0.04) {
            c.phase = 1;
            c.arcPause = 0;
            // Spawn a ripple
            ripplesRef.current.push({ radius: arcR, opacity: 0.15 });
          }
        } else if (c.phase === 1) {
          // Brief pause at Arc
          c.arcPause += 1;
          c.x = c.arcX;
          if (c.arcPause > 12) {
            c.phase = 2;
          }
        } else if (c.phase === 2) {
          // Fan out to provider
          c.x += c.speed * 0.008 * dt;
          // Lerp y toward target
          c.y += (c.targetY - c.y) * 0.06;
          if (c.x > 1.05) {
            c.opacity -= 0.1;
          }
        }

        if (c.opacity <= 0) return;

        const cx = c.x * w;
        const cy = c.y * h;

        // Capsule glow trail
        const grad = ctx.createLinearGradient(cx - 30, cy, cx, cy);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, c.status === 429 ? "rgba(229, 168, 77, 0.15)" : `rgba(235, 235, 235, 0.06)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(cx - 30, cy - 3);
        ctx.lineTo(cx, cy - 3);
        ctx.lineTo(cx, cy + 3);
        ctx.lineTo(cx - 30, cy + 3);
        ctx.fill();

        // Capsule dot
        ctx.beginPath();
        ctx.arc(cx, cy, c.status === 429 ? 3 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = c.color + (c.status === 429 ? "cc" : "88");
        ctx.globalAlpha = c.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Label — only show for phase 0 & 1, large screens
        if (w > 600 && c.phase < 2 && c.opacity > 0.5) {
          ctx.globalAlpha = c.opacity * 0.6;
          ctx.fillStyle = c.color;
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.textAlign = "left";

          // Model name
          const labelParts = c.model.length > 12 ? c.model.slice(0, 12) + "…" : c.model;
          ctx.fillText(labelParts, cx + 8, cy - 2);

          // Token + cost
          ctx.fillStyle = "rgba(235, 235, 235, 0.3)";
          ctx.fillText(`${c.tokens}tk · $${c.cost}`, cx + 8, cy + 9);

          ctx.textAlign = "center";
          ctx.globalAlpha = 1;
        }

        // Rate-limit flash
        if (c.status === 429 && c.phase === 1) {
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = "#E5A84D";
          ctx.font = "bold 8px 'JetBrains Mono', monospace";
          ctx.fillText("429 → reroute", cx, cy - 14);
          ctx.globalAlpha = 1;
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [spawnCapsule]);
}

/* helper: rounded rect path */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/* ═══════════════════════════════════════════════════════════════════
   CODE DIFF STRIP
   ═══════════════════════════════════════════════════════════════════ */

function CodeDiffStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.4 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        width: "100%",
        maxWidth: 720,
        margin: "0 auto",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid rgba(235, 235, 235, 0.06)",
      }}
    >
      {/* Old */}
      <div
        style={{
          flex: 1,
          padding: "12px 16px",
          background: "rgba(192, 57, 43, 0.04)",
          borderRight: "1px solid rgba(235, 235, 235, 0.06)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "rgba(192, 57, 43, 0.5)", fontWeight: 700 }}>−</span>
        <span style={{ color: "rgba(235, 235, 235, 0.25)" }}>
          base_url: <span style={{ color: "rgba(235, 235, 235, 0.35)", textDecoration: "line-through" }}>"api.openai.com/v1"</span>
        </span>
      </div>
      {/* New */}
      <div
        style={{
          flex: 1,
          padding: "12px 16px",
          background: "rgba(91, 191, 128, 0.04)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "rgba(91, 191, 128, 0.7)", fontWeight: 700 }}>+</span>
        <span style={{ color: "rgba(235, 235, 235, 0.35)" }}>
          base_url: <span style={{ color: "#EBEBEB" }}>"arc.cornerstone.sh/v1"</span>
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO — main export
   ═══════════════════════════════════════════════════════════════════ */

export default function ArcHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [recIdx, setRecIdx] = useState(-1);
  const [showRec, setShowRec] = useState(false);

  // Live counters
  const [requests, setRequests] = useState(0);
  const [costSaved, setCostSaved] = useState(0);
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Canvas flow
  useRequestFlow(canvasRef, containerRef);

  // Counter tick
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setRequests((r) => r + Math.floor(Math.random() * 4) + 1);
      setCostSaved((c) => c + Math.random() * 0.08 + 0.01);
      setLatency(() => 8 + Math.random() * 9);
    }, 800);
    return () => clearInterval(interval);
  }, [mounted]);

  // Recommendation cycle: show for 5s every 9s
  useEffect(() => {
    if (!mounted) return;
    let timeout;
    const cycle = () => {
      setRecIdx((i) => (i + 1) % RECOMMENDATIONS.length);
      setShowRec(true);
      timeout = setTimeout(() => {
        setShowRec(false);
        timeout = setTimeout(cycle, 4000);
      }, 5000);
    };
    timeout = setTimeout(cycle, 6000);
    return () => clearTimeout(timeout);
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
        padding: "0 24px",
      }}
    >
      {/* ── Radial glow from Arc center ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 42% 55%, rgba(192, 57, 43, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Canvas: flow viz + grid ── */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {mounted && (
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </div>

      {/* ── Content layer ── */}
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
          paddingBottom: 48,
        }}
      >
        {/* ── Live counters ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            gap: 32,
            marginBottom: 40,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "Requests routed", val: <SmoothCounter value={requests} />, mono: true },
            { label: "Cost saved", val: <SmoothCounter value={costSaved} prefix="$" decimals={2} />, green: true },
            { label: "Latency added", val: <SmoothCounter value={latency} suffix="ms" decimals={1} />, mono: true },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: 120 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "rgba(235, 235, 235, 0.3)",
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
                  fontSize: 22,
                  color: s.green ? "#5BBF80" : "#EBEBEB",
                  fontWeight: 500,
                }}
              >
                {s.val}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: "'Ronzino', serif",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 400,
            color: "#EBEBEB",
            textAlign: "center",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: 16,
            maxWidth: 700,
          }}
        >
          Your AI calls are expensive.
          <br />
          <span style={{ color: "rgba(235, 235, 235, 0.3)" }}>We fix that.</span>
        </motion.h1>

        {/* ── Subhead ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: "rgba(235, 235, 235, 0.35)",
            textAlign: "center",
            maxWidth: 520,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Arc is a managed proxy for LLM APIs. One endpoint. Every provider.
          Proactive optimization.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
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
              gap: 6,
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
            Start 14-day trial →
          </Link>
          <a
            href="#how-it-works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 28px",
              border: "1px solid rgba(235, 235, 235, 0.15)",
              color: "rgba(235, 235, 235, 0.6)",
              borderRadius: 999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(235, 235, 235, 0.3)";
              e.currentTarget.style.color = "rgba(235, 235, 235, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(235, 235, 235, 0.15)";
              e.currentTarget.style.color = "rgba(235, 235, 235, 0.6)";
            }}
          >
            See it in action ↓
          </a>
        </motion.div>

        {/* ── Recommendation card — absolute overlay on right ── */}
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 32,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <AnimatePresence mode="wait">
            {showRec && recIdx >= 0 && (
              <RecommendationCard key={recIdx} rec={RECOMMENDATIONS[recIdx]} />
            )}
          </AnimatePresence>
        </div>

        {/* ── Code diff strip ── */}
        <CodeDiffStrip />

        {/* ── "That's it. One line." ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.8 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "rgba(235, 235, 235, 0.25)",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          That&apos;s it. One line.
        </motion.p>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          stroke="rgba(235, 235, 235, 0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 2l6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
