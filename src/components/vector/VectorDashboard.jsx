"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    name: "Shadow Mode",
    headline: "Test without touching production.",
    description:
      "Mirror every API call to Vector in parallel with your cloud provider. Compare quality, latency, and cost side-by-side — then switch when you're ready.",
    stat: "97.2%",
    statLabel: "average quality match across shadow tests",
  },
  {
    name: "Auto-Tune",
    headline: "It gets faster every week.",
    description:
      "Vector learns your traffic patterns and continuously optimizes batch sizes, model routing, cache policies, and resource allocation. No manual tuning required.",
    stat: "-34%",
    statLabel: "latency improvement after 4 weeks of auto-tuning",
  },
  {
    name: "Semantic Cache",
    headline: "Similar questions, instant answers.",
    description:
      "Vector builds a semantic index of every request and serves near-instant responses for similar queries. For SaaS workloads with repetitive patterns, cache hit rates above 40% are common.",
    stat: "3ms",
    statLabel: "average cache hit response time",
  },
  {
    name: "Model Arena",
    headline: "Stop guessing. Start measuring.",
    description:
      "Run A/B tests between models against your actual production traffic. Arena picks the winner based on your metrics — quality, latency, throughput — not internet benchmarks.",
    stat: "A/B",
    statLabel: "tested on your workload, not synthetic benchmarks",
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="border border-foreground/10 p-8 md:p-12"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
        {/* Left — stat */}
        <div className="md:w-48 flex-shrink-0">
          <span className="font-sans text-xs text-foreground/30 uppercase tracking-wider">
            {feature.name}
          </span>
          <div className="font-serif text-5xl md:text-6xl text-foreground mt-2 tracking-tight">
            {feature.stat}
          </div>
          <div className="font-sans text-xs text-foreground/30 mt-2">
            {feature.statLabel}
          </div>
        </div>

        {/* Right — content */}
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-foreground mb-4">
            {feature.headline}
          </h3>
          <p className="font-sans text-foreground/50 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function VectorDashboard() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Infrastructure That Manages Itself
          </h2>
          <p className="font-sans text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            The dashboard isn&apos;t an afterthought. It&apos;s half the
            product.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-px bg-foreground/10">
          {features.map((feature, i) => (
            <FeatureCard key={feature.name} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
