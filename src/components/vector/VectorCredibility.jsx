"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

function CountUp({ target }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / 2000, 1);
      setValue(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
    </span>
  );
}

const badges = [
  "Built on vLLM",
  "OpenAI-compatible API",
  "Cloudflare Tunnel",
  "Debian-based OS",
];

export default function VectorCredibility() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto"
        >
          {/* Waitlist */}
          <div className="text-center mb-20">
            <div className="font-serif text-6xl md:text-7xl text-foreground mb-3">
              <CountUp target={847} />
            </div>
            <div className="font-sans text-lg text-foreground/50 mb-4">
              companies on the waitlist
            </div>
            <Link
              href="/preorder"
              className="font-sans text-sm text-foreground/60 border-b border-foreground/20 pb-0.5 hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              Join them
            </Link>
          </div>

          {/* Founder */}
          <div className="border border-foreground/10 p-8 md:p-12 mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 flex-shrink-0 bg-muted border border-foreground/10 flex items-center justify-center">
                <span className="font-sans text-[10px] text-foreground/20">
                  Photo
                </span>
              </div>
              <div>
                <p className="font-serif text-xl text-foreground leading-relaxed mb-4">
                  &ldquo;Built by a 17-year-old in McKinney, Texas who thought
                  SaaS companies shouldn&apos;t have to rent GPUs.&rdquo;
                </p>
                <span className="font-sans text-sm text-foreground/30">
                  Cornerstone &middot; McKinney, TX
                </span>
              </div>
            </div>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {badges.map((b) => (
              <span
                key={b}
                className="font-sans text-xs text-foreground/40 border border-foreground/10 px-4 py-2"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Foundation link */}
          <p className="text-center font-sans text-sm text-foreground/40">
            Vector is built by Cornerstone, makers of{" "}
            <Link
              href="/foundation"
              className="text-foreground/60 border-b border-foreground/20 pb-0.5 hover:text-foreground transition-colors"
            >
              Foundation
            </Link>
            . We know how to build hardware that just works.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
