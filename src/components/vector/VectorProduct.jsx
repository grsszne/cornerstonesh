"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const callouts = [
  {
    label: "Cooling",
    text: "Noctua industrial. Silent enough for your office.",
    delay: 0.3,
  },
  {
    label: "Expansion",
    text: "Tool-free NVMe. Add storage without downtime.",
    delay: 0.5,
  },
  {
    label: "Networking",
    text: "Dual 10GbE. Plug into your existing network.",
    delay: 0.7,
  },
  {
    label: "Compute",
    text: "Up to 1,600 TFLOPS of local inference.",
    delay: 0.9,
  },
];

const specs = [
  { label: "GPU", value: "NVIDIA RTX 5090" },
  { label: "Memory", value: "128GB DDR5 ECC" },
  { label: "Storage", value: "4TB NVMe" },
  { label: "Cooling", value: "Noctua Industrial" },
  { label: "Power", value: "Mean Well 850W" },
  { label: "Noise", value: "<30dB" },
];

export default function VectorProduct() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="meet-vector" className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Meet Vector
          </h2>
          <p className="font-sans text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            A purpose-built inference appliance. Not a repurposed gaming PC.
          </p>
        </motion.div>

        {/* Product visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div
            className="relative aspect-[5/3]"
            style={{
              background:
                "linear-gradient(135deg, var(--muted) 0%, var(--background) 100%)",
            }}
          >
            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-foreground/10" />
            <div className="absolute top-0 left-0 bottom-0 w-px bg-foreground/5" />

            {/* Ventilation lines */}
            <div className="absolute inset-0 flex flex-col justify-center gap-3 px-12">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-px bg-foreground/5"
                  style={{ width: `${90 - i * 3}%`, marginLeft: `${i * 1.5}%` }}
                />
              ))}
            </div>

            {/* Status indicator */}
            <div className="absolute bottom-6 left-8 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              <span className="font-sans text-xs text-foreground/30 uppercase tracking-wider">
                Vector
              </span>
            </div>

            {/* Port details */}
            <div className="absolute bottom-6 right-8 flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-3 border border-foreground/10 bg-background"
                />
              ))}
            </div>

            {/* Corner accents */}
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-foreground/10" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-foreground/10" />
          </div>
        </motion.div>

        {/* Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 max-w-3xl mx-auto mb-20">
          {callouts.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: c.delay }}
              className="bg-background p-8"
            >
              <span className="font-sans text-xs text-foreground/30 uppercase tracking-wider">
                {c.label}
              </span>
              <p className="font-sans text-foreground/70 mt-2">{c.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Spec strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="border-t border-foreground/10 pt-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {specs.map((spec) => (
              <div key={spec.label}>
                <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-1">
                  {spec.label}
                </div>
                <div className="font-sans text-sm text-foreground/70">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
