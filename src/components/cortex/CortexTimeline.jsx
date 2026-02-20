"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

function CountUp({ target, prefix = "", suffix = "", active }) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [active, target]);

  return <>{prefix}{Math.round(value).toLocaleString()}{suffix}</>;
}

const months = [
  {
    label: "Month 1",
    title: "First optimizations live",
    metric: "$780",
    metricSuffix: " saved this month",
    metricNum: 780,
  },
  {
    label: "Month 3",
    title: "Workflows mapped",
    description: "Your classify \u2192 extract \u2192 reason pipeline is now optimized end-to-end",
    metric: "34%",
    metricSuffix: " faster",
    metricNum: 34,
  },
  {
    label: "Month 6",
    title: "Cross-provider intelligence",
    description: "Cortex routes each task to the best provider. 3 providers. Zero configuration changes.",
    metric: "$3,100",
    metricSuffix: " saved this month",
    metricNum: 3100,
  },
  {
    label: "Month 12",
    title: "Unrecognizable from where you started",
    description: "Semantic caching tuned to your data. Adaptive routing calibrated to your patterns. Anomaly detection that catches provider regressions before your users notice.",
    metric: "41%",
    metricSuffix: " total cost reduction",
    metricNum: 41,
    featured: true,
  },
];

function TimelineCard({ item, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isOdd = index % 2 === 1;

  return (
    <div ref={ref} className="relative flex items-start gap-6 md:gap-10">
      {/* Timeline dot */}
      <div className="relative flex-shrink-0 w-6 flex flex-col items-center">
        <motion.div
          className={`w-2.5 h-2.5 rounded-full border ${
            item.featured
              ? "border-foreground/40 bg-foreground/20"
              : "border-foreground/20 bg-foreground/[0.06]"
          }`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ ...spring, delay: 0.1 }}
        />
        {!isLast && (
          <motion.div
            className="w-px bg-foreground/[0.08] flex-1 mt-2"
            style={{ minHeight: "40px" }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}
      </div>

      {/* Card content */}
      <motion.div
        className={`pb-12 md:pb-16 ${item.featured ? "max-w-lg" : "max-w-md"}`}
        initial={{ opacity: 0, x: isOdd ? 15 : -15 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ ...spring, delay: 0.15 }}
      >
        <div className="font-mono text-[10px] text-foreground/25 uppercase tracking-[0.15em] mb-2">
          {item.label}
        </div>
        <div className={`font-sans ${item.featured ? "text-base" : "text-sm"} text-foreground/60 font-medium mb-2`}>
          {item.title}
        </div>
        {item.description && (
          <p className="font-sans text-sm text-foreground/30 leading-relaxed mb-3">
            {item.description}
          </p>
        )}
        <div className={`font-mono tabular-nums ${item.featured ? "text-2xl md:text-3xl" : "text-lg"} text-foreground`}>
          {item.metric.startsWith("$") ? (
            <><CountUp target={item.metricNum} prefix="$" active={isInView} />{item.metricSuffix}</>
          ) : (
            <><CountUp target={item.metricNum} suffix="%" active={isInView} />{item.metricSuffix.replace(/^\d+%/, "")}</>
          )}
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
