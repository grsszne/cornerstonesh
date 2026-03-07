"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const items = [
  "Your prompts never touch our database. Metadata only.",
  "Provider keys encrypted at rest.",
  "Automatic fallback if your primary provider fails.",
];

export default function ArcReliability() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-muted">
      <div className="container-swiss" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12"
        >
          Built to stay out of your way.
        </motion.h2>

        <div className="max-w-md mx-auto space-y-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="flex items-start gap-3"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-1 shrink-0">
                <path d="M2 6l3 3 5-5" stroke="#cc2222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-sans text-sm text-foreground/50">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
