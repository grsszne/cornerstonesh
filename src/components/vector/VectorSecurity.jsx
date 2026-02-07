"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cloudSteps = [
  "Your App",
  "Public Internet",
  "Cloud Provider Load Balancer",
  "Shared GPU Cluster",
  "Cloud Logs & Retention",
  "Response Returns",
];

const vectorSteps = [
  "Your App",
  "Encrypted Tunnel",
  "Vector (Your Office)",
  "Response Stays Local",
];

const points = [
  "Inference runs on hardware in your office",
  "No multi-tenant GPU sharing",
  "No third-party data retention",
  "End-to-end TLS encryption",
  "Full audit trail stored locally",
];

export default function VectorSecurity() {
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
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Your Data. Your Hardware.
          </h2>
          <p className="font-sans text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            Not a lecture on security. Just the architecture.
          </p>
        </motion.div>

        {/* Flow comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10 max-w-4xl mx-auto mb-20"
        >
          {/* Cloud AI */}
          <div className="bg-background p-8 md:p-10">
            <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-8">
              Cloud AI — Current State
            </div>
            <div className="space-y-3">
              {cloudSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="font-sans text-xs text-foreground/20 w-4 text-right">
                    {i + 1}
                  </div>
                  <div className="font-sans text-sm text-foreground/40">
                    {step}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-foreground/10">
              <span className="font-sans text-xs text-foreground/20">
                6 trust dependencies
              </span>
            </div>
          </div>

          {/* Vector */}
          <div className="bg-background p-8 md:p-10">
            <div className="font-sans text-xs text-foreground/40 uppercase tracking-wider mb-8">
              Vector
            </div>
            <div className="space-y-3">
              {vectorSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="font-sans text-xs text-foreground/30 w-4 text-right">
                    {i + 1}
                  </div>
                  <div className="font-sans text-sm text-foreground/70">
                    {step}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-foreground/10">
              <span className="font-sans text-xs text-foreground/40">
                0 trust dependencies
              </span>
            </div>
          </div>
        </motion.div>

        {/* Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {points.map((point, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <span className="text-foreground/20">—</span>
                <span className="font-sans text-sm text-foreground/60">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center text-foreground/30 text-sm max-w-2xl mx-auto"
        >
          The comparison isn&apos;t Vector vs. air-gapped network. It&apos;s
          Vector vs. sending your customers&apos; data to shared infrastructure
          alongside thousands of other companies&apos; requests.
        </motion.p>
      </div>
    </section>
  );
}
