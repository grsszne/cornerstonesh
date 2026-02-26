"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

const scenarios = [
  {
    title: "Tuesday, 3:14 PM",
    lines: [
      { text: "OpenAI latency spikes to 4.2 seconds.", dim: false },
      { text: "Cortex detects the anomaly in 12 seconds.", dim: false },
      { text: "Auto-failover routes to Anthropic.", dim: false },
      { text: "47 minutes of degradation.", dim: true },
      { text: "Zero failed requests on your end.", dim: false },
      { text: "", dim: true },
      { text: "You find out from the briefing, not from your users.", dim: true, italic: true },
    ],
  },
  {
    title: "Thursday, overnight",
    lines: [
      { text: "Provider pushes a model update.", dim: false },
      { text: "Your extraction accuracy drops from 96% to 84%.", dim: false },
      { text: "No announcement. No changelog.", dim: true },
      { text: "", dim: true },
      { text: "Cortex catches the quality drift by morning.", dim: false },
      { text: "Reverts to the previous routing.", dim: false },
      { text: "Flags it in your briefing with evidence.", dim: false },
    ],
  },
  {
    title: "Always",
    lines: [
      { text: "78% of your classification requests", dim: false },
      { text: "return one of 5 labels.", dim: false },
      { text: "", dim: true },
      { text: "Same prompt. Same output. Every time.", dim: true },
      { text: "", dim: true },
      { text: "Cortex caches them.", dim: false },
      { text: "Your classification costs drop 80%.", dim: false },
      { text: "Latency drops to 0ms for cached responses.", dim: false },
    ],
  },
];

function ScenarioCard({ scenario, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="border border-foreground/[0.08] bg-foreground/[0.02] p-6 md:p-8"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.12 }}
    >
      <div className="font-mono text-[10px] text-foreground/25 uppercase tracking-[0.15em] mb-4">
        {scenario.title}
      </div>
      <div className="space-y-1">
        {scenario.lines.map((line, i) => {
          if (line.text === "") return <div key={i} className="h-3" />;
          return (
            <p
              key={i}
              className={`font-sans text-sm leading-relaxed ${
                line.italic
                  ? "text-foreground/25 italic"
                  : line.dim
                    ? "text-foreground/25"
                    : "text-foreground/45"
              }`}
            >
              {line.text}
            </p>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function CortexCatches() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        {/* Headline */}
        <motion.h2
          ref={headerRef}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring }}
        >
          Things you&apos;d miss.
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {scenarios.map((scenario, i) => (
            <ScenarioCard key={scenario.title} scenario={scenario} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
