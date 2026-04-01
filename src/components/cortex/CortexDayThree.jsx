"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

function CountUp({
  target,
  duration = 1500,
  prefix = "",
  suffix = "",
  active,
}) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, target, duration]);

  return (
    <>
      {prefix}
      {Math.round(value).toLocaleString()}
      {suffix}
    </>
  );
}

const workloads = [
  { name: "Formatting", pct: 41, cost: 1729, color: "var(--accent)" },
  { name: "Extraction", pct: 23, cost: 967, color: "rgba(204,34,34,0.75)" },
  { name: "Reasoning", pct: 18, cost: 756, color: "rgba(204,34,34,0.55)" },
  { name: "Classification", pct: 12, cost: 504, color: "rgba(204,34,34,0.40)" },
  { name: "Translation", pct: 6, cost: 252, color: "rgba(204,34,34,0.28)" },
];

export default function CortexDayThree() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setActive(true), 300);
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
            Day 3
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.1 }}
          >
            Cortex understands your workload.
          </motion.h2>

          {/* Dashboard UI */}
          <motion.div
            className="border border-foreground/[0.08] overflow-hidden rounded-lg"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(0,0,0,0.15) 100%)",
              boxShadow:
                "inset 0 1px 3px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.02)",
            }}
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
                cortex &mdash; workload profile
              </span>
            </div>

            <div className="p-5 md:p-8">
              {/* Header */}
              <div className="mb-1">
                <div className="font-sans text-sm text-foreground/50">
                  Workload Profile
                </div>
              </div>
              <div className="font-mono text-[11px] text-foreground/25 mb-8">
                <CountUp target={12847} active={active} /> requests analyzed
              </div>

              {/* Workload bars */}
              <div className="space-y-5 mb-8">
                {workloads.map((w, i) => (
                  <div key={w.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans text-sm text-foreground/50">
                        {w.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[12px] text-foreground/30 tabular-nums">
                          {w.pct}%
                        </span>
                        <span className="font-mono text-[12px] text-foreground/25 tabular-nums w-16 text-right">
                          $
                          <CountUp
                            target={w.cost}
                            active={active}
                            duration={1200}
                          />
                        </span>
                      </div>
                    </div>
                    <div
                      className="w-full bg-foreground/[0.04] rounded overflow-hidden"
                      style={{ height: "24px" }}
                    >
                      <motion.div
                        className="h-full rounded flex items-center px-3"
                        style={{ backgroundColor: w.color }}
                        initial={{ width: 0 }}
                        animate={{ width: active ? `${w.pct}%` : 0 }}
                        transition={{ ...spring, delay: 0.4 + i * 0.15 }}
                      >
                        {w.pct >= 15 && (
                          <motion.span
                            className="font-mono text-[10px] text-background/60 whitespace-nowrap font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: active ? 1 : 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.8 + i * 0.15,
                            }}
                          >
                            {w.pct}%
                          </motion.span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <motion.div
                className="border-t border-foreground/[0.06] pt-5"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <p className="font-sans text-xs text-foreground/25 leading-relaxed">
                  No configuration required.
                  <br />
                  Cortex inferred these categories from your traffic patterns.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Caption */}
          <motion.p
            className="font-sans text-sm text-foreground/35 text-center mt-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            You didn&apos;t define these categories. Cortex found them.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
