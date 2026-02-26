"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

const items = [
  {
    text: "Cortex never stores your prompts or responses.",
    sub: "Only metadata: model, tokens, latency, cost.",
  },
  {
    text: "Your API keys are encrypted at rest",
    sub: "and never leave your environment.",
  },
  {
    text: "All traffic encrypted in transit.",
    sub: "TLS 1.3.",
  },
  {
    text: "Full audit log of every decision.",
    sub: "Export or delete anytime.",
  },
  {
    text: "Self-host option for teams",
    sub: "that need it on their infrastructure.",
  },
  {
    text: "SOC 2 Type II in progress.",
    sub: null,
  },
];

export default function CortexSecurity() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });

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
          Your data stays yours.
        </motion.h2>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/[0.06] border border-foreground/[0.06] max-w-4xl mx-auto"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-background p-6 md:p-8"
              initial={{ opacity: 0 }}
              animate={gridInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <p className="font-sans text-sm text-foreground/50 leading-relaxed">
                {item.text}
              </p>
              {item.sub && (
                <p className="font-sans text-sm text-foreground/25 leading-relaxed mt-1">
                  {item.sub}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
