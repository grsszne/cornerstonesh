"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

function CountUp({ target, prefix = "", suffix = "", active }) {
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
      const progress = Math.min(elapsed / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, target]);

  return (
    <>
      {prefix}
      {Math.round(value).toLocaleString()}
      {suffix}
    </>
  );
}

const months = [
  {
    label: "Month 1",
    title: "First optimizations live",
    metricPrefix: "$",
    metricNum: 780,
    metricSuffix: "",
    metricLabel: "saved this month",
    metricSize: "text-2xl md:text-3xl",
  },
  {
    label: "Month 3",
    title: "Workflows mapped",
    description:
      "Your classify \u2192 extract \u2192 reason pipeline is now optimized end-to-end.",
    metricPrefix: "",
    metricNum: 34,
    metricSuffix: "%",
    metricLabel: "faster",
    metricSize: "text-3xl md:text-4xl",
  },
  {
    label: "Month 6",
    title: "Cross-provider intelligence",
    description:
      "Cortex routes each task to the best provider. 3 providers. Zero configuration changes.",
    metricPrefix: "$",
    metricNum: 3100,
    metricSuffix: "",
    metricLabel: "saved this month",
    metricSize: "text-4xl md:text-5xl",
  },
  {
    label: "Month 12",
    title: "Unrecognizable from where you started",
    description:
      "Semantic caching tuned to your data. Adaptive routing calibrated to your patterns. Anomaly detection that catches provider regressions before your users notice.",
    metricPrefix: "",
    metricNum: 41,
    metricSuffix: "%",
    metricLabel: "total cost reduction",
    metricSize: "text-5xl md:text-6xl",
    featured: true,
  },
];

function TimelineCard({ item, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative flex items-start gap-6 md:gap-10">
      {/* Timeline rail */}
      <div className="relative flex-shrink-0 w-8 flex flex-col items-center">
        {/* Dot */}
        <motion.div
          className={`relative z-10 rounded-full ${
            item.featured
              ? "w-4 h-4 bg-accent"
              : "w-3 h-3 border-2 border-foreground/30 bg-background"
          }`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ ...spring, delay: 0.1 }}
        />
        {/* Connecting line segment */}
        {!isLast && (
          <motion.div
            className="w-[2px] bg-foreground/[0.12] flex-1 mt-1"
            style={{ minHeight: "60px" }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          />
        )}
      </div>

      {/* Card content */}
      <motion.div
        className={`pb-16 md:pb-20 ${item.featured ? "max-w-lg" : "max-w-md"}`}
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ ...spring, delay: 0.15 }}
      >
        <div className="font-mono text-[10px] text-foreground/25 uppercase tracking-[0.15em] mb-2">
          {item.label}
        </div>
        <div
          className={`font-sans ${item.featured ? "text-base" : "text-sm"} text-foreground/60 font-medium mb-3`}
        >
          {item.title}
        </div>
        {item.description && (
          <p className="font-sans text-sm text-foreground/30 leading-relaxed mb-4">
            {item.description}
          </p>
        )}
        {/* Big metric */}
        <div className="flex items-baseline gap-2">
          <span
            className={`font-mono tabular-nums ${item.metricSize} text-accent font-medium tracking-tight`}
          >
            <CountUp
              target={item.metricNum}
              prefix={item.metricPrefix}
              suffix={item.metricSuffix}
              active={isInView}
            />
          </span>
          <span className="font-sans text-sm text-foreground/30">
            {item.metricLabel}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function CortexTimeline() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <div className="max-w-2xl mx-auto">
          {/* Headline */}
          <motion.h2
            ref={headerRef}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring }}
          >
            It never stops getting smarter.
          </motion.h2>

          {/* Timeline */}
          <div className="pl-2 md:pl-8">
            {months.map((item, i) => (
              <TimelineCard
                key={item.label}
                item={item}
                index={i}
                isLast={i === months.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
