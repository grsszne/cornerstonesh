"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

const statements = [
  "Every experiment Cortex runs is logged and explained.",
  "Every change requires your approval \u2014 or doesn\u2019t,\ndepending on what you choose.",
  "Every action is reversible with one click.",
];

export default function CortexAutonomy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <div className="max-w-xl mx-auto text-center" ref={ref}>
          {/* Headline */}
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring }}
          >
            You set the boundaries.
          </motion.h2>

          {/* Three statements */}
          <div className="space-y-8 md:space-y-10 mb-16 md:mb-20">
            {statements.map((text, i) => (
              <motion.p
                key={i}
                className="font-sans text-base md:text-lg text-foreground/50 leading-relaxed whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Aside */}
          <motion.p
            className="font-sans text-sm text-foreground/25 leading-relaxed max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Most teams start with approval required for everything.
            Within a month, they trust Cortex to handle routine optimizations.
            Within three months, they forget it&apos;s running.
            That&apos;s the point.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
