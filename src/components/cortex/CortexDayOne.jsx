"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

function CountUp({ target, duration = 1500, prefix = "", suffix = "", decimals = 0, active }) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [active, target, duration]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString();

  return <>{prefix}{formatted}{suffix}</>;
}

function AnimatedBar({ width, color, delay, active }) {
  return (
    <motion.div
      className="h-2 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ width: 0 }}
      animate={{ width: active ? `${width}%` : 0 }}
      transition={{ ...spring, delay }}
    />
  );
}

const requestLog = [
  { time: "2:41pm", model: "GPT-4o", tokens: "284 tok", cost: "$0.008" },
  { time: "2:41pm", model: "Claude", tokens: "1.2k tok", cost: "$0.014" },
  { time: "2:40pm", model: "GPT-4o", tokens: "156 tok", cost: "$0.004" },
  { time: "2:40pm", model: "GPT-4o", tokens: "891 tok", cost: "$0.012" },
  { time: "2:39pm", model: "GPT-4o-mini", tokens: "43 tok", cost: "$0.0001" },
];

export default function CortexDayOne() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [dashboardActive, setDashboardActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setDashboardActive(true), 400);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <div className="max-w-3xl mx-auto" ref={ref}>
          {/* Label */}
          <motion.div
            className="font-sans text-[11px] text-foreground/30 uppercase tracking-[0.15em] mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Day 1
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.1 }}
          >
            Cortex starts listening.
          </motion.h2>

          {/* Dashboard UI */}
          <motion.div
            className="border border-foreground/[0.08] bg-foreground/[0.02] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...spring, delay: 0.2 }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-foreground/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
              </div>
              <span className="font-mono text-[10px] text-foreground/20 ml-2 tracking-wide">
                cortex &mdash; dashboard
              </span>
            </div>

            <div className="p-5 md:p-8">
              {/* Header */}
              <div className="font-sans text-sm text-foreground/40 mb-6">Today</div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8">
                <div>
                  <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-1">
                    Requests
                  </div>
                  <div className="font-mono text-xl md:text-2xl text-foreground tabular-nums">
                    <CountUp target={4847} active={dashboardActive} />
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-1">
                    Total cost
                  </div>
                  <div className="font-mono text-xl md:text-2xl text-foreground tabular-nums">
                    <CountUp target={187.40} prefix="$" decimals={2} active={dashboardActive} />
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-1">
                    Avg latency
                  </div>
                  <div className="font-mono text-xl md:text-2xl text-foreground tabular-nums">
                    <CountUp target={312} suffix="ms" active={dashboardActive} />
                  </div>
                </div>
              </div>

              {/* Model usage bars */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-full max-w-[280px]">
                    <AnimatedBar width={78} color="rgba(245,245,247,0.3)" delay={0.6} active={dashboardActive} />
                  </div>
                  <span className="font-mono text-[11px] text-foreground/30 whitespace-nowrap">GPT-4o</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full max-w-[280px]">
                    <AnimatedBar width={45} color="rgba(245,245,247,0.2)" delay={0.7} active={dashboardActive} />
                  </div>
                  <span className="font-mono text-[11px] text-foreground/30 whitespace-nowrap">Claude Sonnet</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full max-w-[280px]">
                    <AnimatedBar width={22} color="rgba(245,245,247,0.12)" delay={0.8} active={dashboardActive} />
                  </div>
                  <span className="font-mono text-[11px] text-foreground/30 whitespace-nowrap">GPT-4o-mini</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-foreground/[0.06] mb-6" />

              {/* Recent requests */}
              <div className="font-sans text-xs text-foreground/30 mb-4">Recent requests</div>
              <div className="space-y-0">
                {requestLog.map((row, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-foreground/[0.04] last:border-0 font-mono text-[11px] md:text-[12px]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={dashboardActive ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...spring, delay: 0.9 + i * 0.08 }}
                  >
                    <span className="text-foreground/25 w-16">{row.time}</span>
                    <span className="text-foreground/40 w-24">{row.model}</span>
                    <span className="text-foreground/25 w-20 text-right">{row.tokens}</span>
                    <span className="text-foreground/35 w-16 text-right tabular-nums">{row.cost}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Caption */}
          <motion.p
            className="font-sans text-sm text-foreground/35 text-center mt-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Every request. Every token. Every dollar. Visible for the first time.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
