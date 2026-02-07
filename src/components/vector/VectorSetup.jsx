"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  { time: "0:00", title: "Plug in power and ethernet." },
  {
    time: "0:30",
    title: "Open your browser. Vector found itself on your network.",
  },
  { time: "1:00", title: "Create your admin account." },
  { time: "2:00", title: "Vector provisions your API endpoint. TLS included." },
  { time: "3:00", title: "Add one DNS record to your domain." },
  {
    time: "5:00",
    title: "Choose your models. Downloads begin in the background.",
  },
  {
    time: "6:00",
    title: "Swap one line of code.",
    detail: (
      <div className="mt-3 font-sans text-sm">
        <div className="text-foreground/30 line-through">
          base_url = &quot;https://api.openai.com/v1&quot;
        </div>
        <div className="text-foreground/70 mt-1">
          base_url = &quot;https://ai.yourcompany.com/v1&quot;
        </div>
      </div>
    ),
  },
  { time: "6:30", title: "Your app is now running on AI you own." },
];

const comparisons = [
  { label: "Setup time", old: "2–6 weeks", vector: "< 10 minutes" },
  {
    label: "Requires",
    old: "DevOps team, Kubernetes, Docker, NVIDIA drivers",
    vector: "Power outlet, ethernet cable",
  },
  {
    label: "Configuration",
    old: "40-page deployment guide",
    vector: "Browser-based wizard",
  },
  {
    label: "API compatibility",
    old: "Custom integration",
    vector: "Drop-in OpenAI replacement",
  },
  {
    label: "TLS",
    old: "Manual certificate management",
    vector: "Automatic via Cloudflare",
  },
];

function TimelineStep({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08 }}
      className="relative flex gap-8 pb-8 last:pb-0"
    >
      {/* Line and dot */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2" />
        {index < steps.length - 1 && (
          <div className="absolute top-4 w-px h-full bg-foreground/10" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 -mt-0.5">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-sm text-foreground/30 w-10 flex-shrink-0">
            {step.time}
          </span>
          <div>
            <p className="font-sans text-foreground/70">{step.title}</p>
            {step.detail}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VectorSetup() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-32 md:py-40 bg-muted">
      <div className="container-swiss">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            10 Minutes. Not 10 Days.
          </h2>
          <p className="font-sans text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            From unboxing to production inference. No DevOps team required.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto mb-24">
          {steps.map((step, i) => (
            <TimelineStep key={i} step={step} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center text-foreground/30 text-sm mb-20"
        >
          Your DevOps team can keep doing whatever they were doing. They
          won&apos;t be needed for this.
        </motion.p>

        {/* Comparison */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto border border-foreground/10"
        >
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-foreground/10">
            <div className="p-4" />
            <div className="p-4 font-sans text-xs text-foreground/30 uppercase tracking-wider">
              Traditional
            </div>
            <div className="p-4 font-sans text-xs text-foreground/40 uppercase tracking-wider">
              Vector
            </div>
          </div>
          {comparisons.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-b border-foreground/10 last:border-b-0"
            >
              <div className="p-4 font-sans text-sm text-foreground/70">
                {row.label}
              </div>
              <div className="p-4 font-sans text-sm text-foreground/30">
                {row.old}
              </div>
              <div className="p-4 font-sans text-sm text-foreground/60">
                {row.vector}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
