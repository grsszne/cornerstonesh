"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function VectorUpgrade() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-40 bg-muted">
      <div className="container-swiss">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
            We&apos;ll Tell You When to Move On
          </h2>

          <p className="font-sans text-foreground/50 text-lg leading-relaxed mb-6">
            Vector scales with you — add nodes, and they automatically cluster
            and load balance. But we&apos;re honest about limits. When your
            fleet reaches 3–4 nodes, our dashboard will tell you it&apos;s time
            to consider rack-scale infrastructure.
          </p>

          <p className="font-sans text-foreground/70 text-lg leading-relaxed mb-16">
            We&apos;d rather you outgrow us and tell everyone how honest we were
            than stay too long and resent us for it.
          </p>

          {/* Growth path */}
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {["1 node", "2 nodes", "3 nodes", "Migrate"].map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                className="flex flex-col items-center relative"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    i === 3 ? "bg-foreground" : "bg-foreground/30"
                  }`}
                />
                <span className="font-sans text-xs text-foreground/40 mt-3 whitespace-nowrap">
                  {label}
                </span>
                {i < 3 && (
                  <div className="absolute top-1 left-full w-16 md:w-24 h-px bg-foreground/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
