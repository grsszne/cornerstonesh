"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function ArcFooterCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [typed, setTyped] = useState("");
  const line = "Connect in under five minutes.\nNo credit card. No lock-in.";

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await delay(1200);
      for (let i = 0; i <= line.length; i++) {
        if (cancelled) return;
        setTyped(line.slice(0, i));
        await delay(30);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [isInView]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-background" ref={ref}>
      <div className="container-swiss text-center py-32">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.05] tracking-tight mb-10"
        >
          Your first insight
          <br />
          <span className="text-foreground/40">is free.</span>
        </motion.h2>

        <div className="min-h-[60px] mb-10">
          <p className="font-sans text-base md:text-lg text-foreground/35 leading-relaxed whitespace-pre-line">
            {typed}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.5 }}
        >
          <Link
            href="https://arc.cornerstone.sh"
            className="inline-block bg-foreground text-background rounded-full px-10 py-4 font-sans text-base font-medium hover:opacity-90 transition-opacity"
          >
            Start free &rarr;
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 3.0 }}
          className="font-sans text-xs text-foreground/20 mt-8"
        >
          If Arc doesn&apos;t find something worth acting on in your first week, it probably wasn&apos;t there.
        </motion.p>
      </div>
    </section>
  );
}
