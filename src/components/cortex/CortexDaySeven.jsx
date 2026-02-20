"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

function CountUp({
  target,
  duration = 1500,
  prefix = "",
  suffix = "",
  decimals = 0,
  active,
  onComplete,
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
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else if (onComplete) {
        onComplete();
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, target, duration, onComplete]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <>
      {prefix}
      {formatted}
      {suffix}
    </>
  );
}

export default function CortexDaySeven() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState(false);
  const [savingsPulse, setSavingsPulse] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setActive(true), 300);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <div className="max-w-2xl mx-auto" ref={ref}>
          {/* Label */}
          <motion.div
            className="font-sans text-[11px] text-foreground/30 uppercase tracking-[0.15em] mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Day 7
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.1 }}
          >
            Your first briefing.
          </motion.h2>

          {/* Briefing card with glow */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...spring, delay: 0.3 }}
          >
            {/* Subtle glow behind */}
            <div
              className="absolute -inset-4 rounded-lg opacity-[0.06] blur-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--foreground), transparent 70%)",
              }}
            />

            <div className="relative border border-foreground/[0.08] bg-foreground/[0.02] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-foreground/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-foreground/10" />
                  <div className="w-2 h-2 rounded-full bg-foreground/10" />
                  <div className="w-2 h-2 rounded-full bg-foreground/10" />
                </div>
                <span className="font-mono text-[10px] text-foreground/20 ml-2 tracking-wide">
                  cortex &mdash; briefing
                </span>
              </div>

              <div className="p-5 md:p-8">
                {/* Briefing header */}
                <motion.div
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-accent text-sm">&#9670;</span>
                    <span className="font-sans text-sm text-foreground/60 font-medium">
                      Weekly Briefing
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-foreground/25">
                    Feb 17
                  </span>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="h-px bg-foreground/[0.06] mb-6 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={active ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />

                {/* Week summary */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="font-sans text-xs text-foreground/30 mb-2">
                    This week
                  </div>
                  <div className="font-mono text-[12px] text-foreground/40">
                    $4,218 spent &middot; 12,847 requests &middot; 97.2% quality
                  </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="h-px bg-foreground/[0.06] mb-6 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={active ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />

                {/* Experiment result */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className="font-sans text-sm text-foreground/60 font-medium mb-3">
                    Experiment complete
                  </div>
                  <p className="font-sans text-sm text-foreground/35 leading-relaxed mb-5">
                    I tested GPT-4o-mini on 847 of your formatting requests over
                    3 days.
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-1">
                        Quality match
                      </div>
                      <div className="font-mono text-lg text-foreground tabular-nums">
                        <CountUp
                          target={98.7}
                          suffix="%"
                          decimals={1}
                          active={active}
                          duration={1200}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-1">
                        Latency
                      </div>
                      <div className="font-mono text-lg text-foreground tabular-nums">
                        <CountUp
                          target={52}
                          suffix="% faster"
                          active={active}
                          duration={1200}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-sans text-[10px] text-foreground/25 uppercase tracking-wider mb-1">
                        Monthly savings
                      </div>
                      <motion.div
                        className="font-mono text-lg text-foreground tabular-nums"
                        animate={savingsPulse ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <CountUp
                          target={1640}
                          prefix="$"
                          active={active}
                          duration={1800}
                          onComplete={() => setSavingsPulse(true)}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="h-px bg-foreground/[0.06] mb-6 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={active ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 }}
                />

                {/* Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <button
                    className="px-5 py-2.5 font-sans text-sm font-medium rounded transition-all hover:brightness-110 active:brightness-95 active:translate-y-[0.5px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 90%, white), var(--foreground))",
                      color: "var(--background)",
                      borderTop:
                        "1px solid color-mix(in srgb, var(--foreground) 70%, white)",
                      borderLeft:
                        "1px solid color-mix(in srgb, var(--foreground) 80%, white)",
                      borderRight:
                        "1px solid color-mix(in srgb, var(--foreground) 95%, black)",
                      borderBottom:
                        "1px solid color-mix(in srgb, var(--foreground) 85%, black)",
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    Enable routing
                  </button>
                  <button
                    className="px-5 py-2.5 font-sans text-sm rounded transition-all hover:brightness-110 active:brightness-95 active:translate-y-[0.5px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      color:
                        "color-mix(in srgb, var(--foreground) 50%, transparent)",
                      borderTop:
                        "1px solid color-mix(in srgb, var(--foreground) 18%, transparent)",
                      borderLeft:
                        "1px solid color-mix(in srgb, var(--foreground) 12%, transparent)",
                      borderRight:
                        "1px solid color-mix(in srgb, var(--foreground) 8%, transparent)",
                      borderBottom:
                        "1px solid color-mix(in srgb, var(--foreground) 6%, transparent)",
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.03)",
                    }}
                  >
                    View full details &#8594;
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Caption */}
          <motion.div
            className="text-center mt-10 space-y-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="font-sans text-sm text-foreground/35 leading-relaxed">
              Cortex ran the experiment. Validated the results. Wrote the
              report.
            </p>
            <p className="font-sans text-sm text-foreground/50 leading-relaxed">
              You read it in 30 seconds and clicked a button.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
