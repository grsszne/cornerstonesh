"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const models = ["gpt-4o", "sonnet-4", "haiku-4.5", "gpt-4o-mini"];

const tasks = [
  { name: "Summarization", scores: [1580, 1620, 1595, 1510], best: 1 },
  { name: "Classification", scores: [1540, 1530, 1570, 1555], best: 2 },
  { name: "Code Generation", scores: [1610, 1640, 1480, 1520], best: 1 },
  { name: "Customer Support", scores: [1550, 1580, 1600, 1490], best: 2 },
  { name: "Data Extraction", scores: [1590, 1560, 1550, 1570], best: 0 },
  { name: "Translation", scores: [1530, 1570, 1520, 1545], best: 1 },
];

function AnimatedNumber({ value, active, delay = 0 }) {
  const [display, setDisplay] = useState(1400);

  useEffect(() => {
    if (!active) { setDisplay(1400); return; }
    let cancelled = false;
    const timeout = setTimeout(() => {
      const duration = 600;
      const start = performance.now();
      const tick = () => {
        if (cancelled) return;
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(1400 + (value - 1400) * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [active, value, delay]);

  return <>{display}</>;
}

export default function ArcBenchmarks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [revealedCols, setRevealedCols] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const intervals = models.map((_, i) => {
      return setTimeout(() => {
        setRevealedCols(i + 1);
      }, 600 + i * 300);
    });
    return () => intervals.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Real benchmarks. Real workloads.
          </h2>
          <p className="font-sans text-foreground/40 max-w-xl mx-auto leading-relaxed">
            Arc&apos;s benchmarks come from production traffic across hundreds of real applications — classified by task type, scored blind, updated continuously.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="text-left font-sans text-xs text-foreground/25 uppercase tracking-wider py-3 pr-4 w-40">
                  Task
                </th>
                {models.map((model, i) => (
                  <th
                    key={model}
                    className="text-center font-mono text-[10px] text-foreground/30 uppercase tracking-wider py-3 px-3"
                    style={{ opacity: revealedCols > i ? 1 : 0, transition: "opacity 0.3s" }}
                  >
                    {model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.name} className="border-b border-foreground/[0.06]">
                  <td className="font-sans text-sm text-foreground/50 py-3 pr-4">
                    {task.name}
                  </td>
                  {task.scores.map((score, i) => {
                    const isBest = i === task.best;
                    return (
                      <td
                        key={i}
                        className="text-center py-3 px-3"
                        style={{
                          opacity: revealedCols > i ? 1 : 0,
                          transition: "opacity 0.4s",
                          background: isBest && revealedCols > i ? "rgba(204,34,34,0.04)" : "transparent",
                        }}
                      >
                        <span className={`font-mono text-sm tabular-nums ${isBest ? "text-foreground/70" : "text-foreground/35"}`}>
                          <AnimatedNumber value={score} active={revealedCols > i} delay={i * 100} />
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="text-center mt-8"
        >
          <p className="font-mono text-xs text-foreground/20">
            847,000 requests analyzed &middot; 23 workspaces &middot; updated continuously
          </p>
        </motion.div>
      </div>
    </section>
  );
}
