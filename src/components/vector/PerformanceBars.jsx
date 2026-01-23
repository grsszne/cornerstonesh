"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benchmarks = [
  {
    category: "Render",
    label: "Blender BMW (render time)",
    items: [
      { name: "Cloud Instance", value: 165, unit: "s", max: 165 },
      { name: "Local Workstation", value: 112, unit: "s", max: 165 },
      { name: "Vector", value: 38, unit: "s", max: 165, highlight: true }
    ]
  },
  {
    category: "Training",
    label: "ResNet-50 (images/sec)",
    items: [
      { name: "Cloud Instance", value: 820, unit: "img/s", max: 2400 },
      { name: "Local Workstation", value: 1200, unit: "img/s", max: 2400 },
      { name: "Vector (3x GPU)", value: 2400, unit: "img/s", max: 2400, highlight: true }
    ],
    invert: true
  },
  {
    category: "Inference",
    label: "LLM Token Generation (tok/s)",
    items: [
      { name: "Cloud API", value: 45, unit: "tok/s", max: 180 },
      { name: "Local (1x GPU)", value: 95, unit: "tok/s", max: 180 },
      { name: "Vector (3x GPU)", value: 180, unit: "tok/s", max: 180, highlight: true }
    ],
    invert: true
  }
];

export default function PerformanceBars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-12">
      {benchmarks.map((bench, bIdx) => (
        <div key={bench.category}>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-sans text-xs text-foreground/30 uppercase tracking-widest">{bench.category}</span>
            <span className="font-sans text-sm text-foreground/50">{bench.label}</span>
          </div>
          <div className="space-y-3">
            {bench.items.map((item, iIdx) => {
              const percent = bench.invert
                ? (item.value / item.max) * 100
                : ((item.max - item.value) / item.max) * 100 + 15;
              // For render time, shorter is better, so invert the bar
              const barWidth = bench.invert
                ? (item.value / item.max) * 100
                : Math.max(15, (1 - item.value / item.max) * 100 + 20);

              return (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="w-32 md:w-40 shrink-0 text-right">
                    <span className={`font-sans text-xs ${item.highlight ? "text-foreground/70" : "text-foreground/40"}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex-1 h-5 bg-foreground/5 rounded-sm overflow-hidden relative">
                    <motion.div
                      className={`h-full rounded-sm ${item.highlight ? "bg-foreground/30" : "bg-foreground/10"}`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${barWidth}%` } : { width: 0 }}
                      transition={{
                        duration: 1.2,
                        delay: bIdx * 0.3 + iIdx * 0.15,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                  <div className="w-20 shrink-0">
                    <motion.span
                      className={`font-mono text-xs tabular-nums ${item.highlight ? "text-foreground/80" : "text-foreground/40"}`}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: bIdx * 0.3 + iIdx * 0.15 + 0.8 }}
                    >
                      {item.value}{item.unit}
                    </motion.span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
