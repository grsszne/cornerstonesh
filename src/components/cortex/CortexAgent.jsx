"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

function CountUp({ target, prefix = "", suffix = "", decimals = 0, active, duration = 1200 }) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [active, target, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
  return <>{prefix}{formatted}{suffix}</>;
}

function FrameChrome({ title, children }) {
  return (
    <div className="border border-foreground/[0.08] bg-foreground/[0.02] overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-foreground/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-foreground/10" />
          <div className="w-2 h-2 rounded-full bg-foreground/10" />
          <div className="w-2 h-2 rounded-full bg-foreground/10" />
        </div>
        <span className="font-mono text-[10px] text-foreground/20 ml-2 tracking-wide">
          {title}
        </span>
      </div>
      <div className="p-5 md:p-8">{children}</div>
    </div>
  );
}

/* ─── Frame 1: Observe ─── */
function ObserveFrame() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShowAnalysis(true), 600);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  const analysisLines = [
    { label: "Task type", value: "Formatting", extra: "(94% confidence)" },
    { label: "Complexity", value: "Low" },
    { label: "Similar to", value: "847 previous requests" },
    { label: "Cache eligible", value: "Yes (92% similarity)" },
    { label: "Overprovisioned", value: "Yes \u2014 this task doesn\u2019t need a frontier model" },
  ];

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring }}
      >
        <FrameChrome title="cortex \u2014 observe">
          {/* Request metadata */}
          <div className="mb-6">
            <div className="font-sans text-sm text-foreground/50 font-medium mb-4">Request #4,847</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Model", value: "GPT-4o" },
                { label: "Tokens", value: "284 in \u00B7 156 out" },
                { label: "Latency", value: "312ms" },
                { label: "Cost", value: "$0.008" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="font-mono text-[13px] text-foreground/50">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cortex analysis box */}
          <motion.div
            className="border border-foreground/[0.06] bg-foreground/[0.02] p-4 md:p-5"
            initial={{ opacity: 0, y: 8 }}
            animate={showAnalysis ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring }}
          >
            <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-4">
              Cortex analysis
            </div>
            <div className="space-y-2.5">
              {analysisLines.map((line, i) => (
                <motion.div
                  key={line.label}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={showAnalysis ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 * i }}
                >
                  <span className="font-mono text-[12px] text-foreground/30 w-32 md:w-36 flex-shrink-0">
                    {line.label}
                  </span>
                  <span className="font-mono text-[12px] text-foreground/50">
                    {line.value}
                    {line.extra && (
                      <span className="text-foreground/25 ml-1">{line.extra}</span>
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </FrameChrome>
      </motion.div>
    </div>
  );
}

/* ─── Frame 2: Experiment ─── */
function ExperimentFrame() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setActive(true), 300);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring }}
      >
        <FrameChrome title="cortex \u2014 experiment">
          {/* Test header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-sans text-sm text-foreground/50 font-medium">Shadow Test #12</div>
              <div className="font-mono text-[11px] text-foreground/25 mt-1">
                Formatting tasks &middot; GPT-4o vs GPT-4o-mini
              </div>
            </div>
            <motion.div
              className="flex items-center gap-1.5"
              animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
              <span className="font-mono text-[10px] text-green-500/50 uppercase tracking-wider">Running</span>
            </motion.div>
          </div>

          {/* Two-panel comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Primary */}
            <div className="border border-foreground/[0.06] p-4">
              <div className="font-sans text-xs text-foreground/25 uppercase tracking-wider mb-1">Primary</div>
              <div className="font-mono text-sm text-foreground/50 mb-4">GPT-4o</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-foreground/25">Avg latency</span>
                  <span className="font-mono text-[12px] text-foreground/40 tabular-nums">
                    <CountUp target={310} suffix="ms" active={active} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-foreground/25">Avg cost</span>
                  <span className="font-mono text-[12px] text-foreground/40 tabular-nums">$0.008</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-foreground/25">Quality</span>
                  <span className="font-mono text-[12px] text-foreground/25">&mdash;</span>
                </div>
              </div>
            </div>
            {/* Shadow */}
            <div className="border border-foreground/[0.06] p-4">
              <div className="font-sans text-xs text-foreground/25 uppercase tracking-wider mb-1">Shadow</div>
              <div className="font-mono text-sm text-foreground/50 mb-4">GPT-4o-mini</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-foreground/25">Avg latency</span>
                  <span className="font-mono text-[12px] text-foreground/40 tabular-nums">
                    <CountUp target={140} suffix="ms" active={active} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-foreground/25">Avg cost</span>
                  <span className="font-mono text-[12px] text-foreground/40 tabular-nums">$0.0003</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-foreground/25">Quality match</span>
                  <span className="font-mono text-[12px] text-foreground/50 tabular-nums">
                    <CountUp target={98.7} suffix="%" decimals={1} active={active} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider">Progress</span>
              <span className="font-mono text-[11px] text-foreground/25 tabular-nums">
                <CountUp target={847} active={active} duration={2000} /> / 1,000
              </span>
            </div>
            <div className="w-full h-1 bg-foreground/[0.04] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-foreground/20 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: active ? "84.7%" : 0 }}
                transition={{ duration: 2.5, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </div>
          </div>

          <p className="font-sans text-xs text-foreground/20 leading-relaxed">
            Your application only sees the primary response.
            The shadow test is invisible to your users.
          </p>
        </FrameChrome>
      </motion.div>
    </div>
  );
}

/* ─── Frame 3: Act ─── */
function ActFrame() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setActive(true), 300);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring }}
      >
        <FrameChrome title="cortex \u2014 routing">
          {/* Enabled header */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-green-500/70 text-sm">&#10003;</span>
            <div>
              <div className="font-sans text-sm text-foreground/60 font-medium">
                Smart routing enabled for Formatting
              </div>
              <div className="font-mono text-[11px] text-foreground/25 mt-0.5">
                Since Feb 11 &middot; GPT-4o-mini
              </div>
            </div>
          </div>

          {/* Before / After */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-2">Before</div>
              <motion.div
                className="font-mono text-2xl md:text-3xl text-foreground/30 tabular-nums"
                initial={{ opacity: 1 }}
                animate={active ? { opacity: 0.3 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              >
                $1,729<span className="text-sm text-foreground/15">/mo</span>
              </motion.div>
              <div className="font-mono text-[12px] text-foreground/20 mt-1">312ms avg</div>
            </div>
            <div>
              <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-2">After</div>
              <motion.div
                className="font-mono text-2xl md:text-3xl text-foreground tabular-nums"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                $89<span className="text-sm text-foreground/40">/mo</span>
              </motion.div>
              <div className="font-mono text-[12px] text-foreground/35 mt-1">140ms avg</div>
            </div>
          </div>

          {/* Quality bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider">Quality</span>
              <span className="font-mono text-[12px] text-foreground/40 tabular-nums">
                <CountUp target={98.7} suffix="%" decimals={1} active={active} />
              </span>
            </div>
            <div className="w-full h-1.5 bg-foreground/[0.04] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-foreground/25 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: active ? "98.7%" : 0 }}
                transition={{ ...spring, delay: 0.3 }}
              />
            </div>
          </div>

          <motion.p
            className="font-sans text-xs text-foreground/20 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Cortex continues monitoring. If quality drifts below your threshold, routing reverts automatically.
          </motion.p>
        </FrameChrome>
      </motion.div>
    </div>
  );
}

/* ─── Section ─── */
export default function CortexAgent() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const frames = [
    { label: "Observe", subhead: "Every request becomes signal.", Component: ObserveFrame },
    { label: "Experiment", subhead: "Cortex tests before it recommends.", Component: ExperimentFrame },
    { label: "Act", subhead: "One click. Cortex handles the rest.", Component: ActFrame },
  ];

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <div className="max-w-3xl mx-auto">
          {frames.map((frame, i) => (
            <div key={frame.label} className="mb-24 md:mb-32 last:mb-0">
              {/* Frame label */}
              <div className="mb-8 md:mb-10">
                <div className="font-sans text-[11px] text-foreground/30 uppercase tracking-[0.15em] mb-3">
                  {frame.label}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                  {frame.subhead}
                </h3>
              </div>
              <frame.Component />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
