"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function StatCard({ value, prefix = "", suffix = "", description, format }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || value === 0) return;
    const start = Date.now();
    const animate = () => {
      const p = Math.min((Date.now() - start) / 2000, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(value * eased));
      if (p < 1) requestAnimationFrame(animate);
      else setDisplay(value);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  const formatted = format === "currency" ? display.toLocaleString() : display;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="border border-foreground/10 p-8 md:p-10"
    >
      <div className="font-serif text-5xl md:text-6xl text-foreground tracking-tight mb-4 tabular-nums">
        {prefix}
        {formatted}
        {suffix}
      </div>
      <p className="font-sans text-foreground/50 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function VectorProblem() {
  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 mb-20">
          <StatCard
            value={8400}
            prefix="$"
            suffix="/mo"
            description="Average cloud AI spend for a 50-person SaaS company"
            format="currency"
          />
          <StatCard
            value={73}
            suffix="%"
            description="of AI costs go to inference, not training — you're paying rent on GPUs someone else owns"
          />
          <StatCard
            value={0}
            suffix="%"
            description="of your data stays private when processed on multi-tenant cloud infrastructure"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-sans text-lg text-foreground/50 leading-relaxed text-center max-w-3xl mx-auto"
        >
          Every API call to OpenAI, Anthropic, or Google sends your
          customers&apos; data to shared infrastructure you don&apos;t control,
          adds unpredictable line items to your burn rate, and creates a
          dependency you can&apos;t negotiate around. You wouldn&apos;t rent
          your database server per-query.{" "}
          <span className="text-foreground">Why rent your AI?</span>
        </motion.p>
      </div>
    </section>
  );
}
