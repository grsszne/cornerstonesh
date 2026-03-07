"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

function AnimatedPrice({ active }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    let cancelled = false;
    const timeout = setTimeout(() => {
      const duration = 600;
      const start = performance.now();
      const tick = () => {
        if (cancelled) return;
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * 29));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 400);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [active]);

  return <>${value}</>;
}

export default function ArcPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-32 md:py-40 bg-background">
      <div className="container-swiss" ref={ref}>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="border border-foreground/10 p-8 md:p-10"
            >
              <h3 className="font-serif text-2xl text-foreground mb-2">Free</h3>
              <div className="font-serif text-4xl text-foreground mb-6">$0</div>
              <ul className="space-y-3 font-sans text-sm text-foreground/45 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  1,000 requests/month
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Full logging and analytics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Shadow mode
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Auto-Tune suggestions
                </li>
              </ul>
              <Link
                href="https://arc.cornerstone.sh"
                className="inline-block font-sans text-sm text-foreground border border-foreground/15 rounded-full px-6 py-2.5 hover:border-foreground/30 transition-colors"
              >
                Get started
              </Link>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="border border-[#cc2222]/20 p-8 md:p-10 relative"
              style={{
                boxShadow: "0 0 40px rgba(204,34,34,0.03)",
              }}
            >
              <h3 className="font-serif text-2xl text-foreground mb-2">Arc Pro</h3>
              <div className="font-serif text-4xl text-foreground mb-1">
                <AnimatedPrice active={isInView} />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.0 }}
                  className="font-sans text-lg text-foreground/40"
                >
                  /mo
                </motion.span>
              </div>
              <div className="h-4" />
              <ul className="space-y-3 font-sans text-sm text-foreground/45 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Unlimited requests
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Everything in free
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Auto-Tune with one-click apply
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Chat with your data
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Benchmark access
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground/20 mt-0.5">—</span>
                  Priority support
                </li>
              </ul>
              <Link
                href="https://arc.cornerstone.sh"
                className="inline-block font-sans text-sm font-medium text-background bg-foreground rounded-full px-6 py-2.5 hover:opacity-90 transition-opacity"
              >
                Start free &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center font-sans text-sm text-foreground/30 mt-10"
          >
            Start free, upgrade when it earns its keep.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
