"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
};

export default function VectorHero() {
  const [cloudCost, setCloudCost] = useState(0);
  const [userSpend, setUserSpend] = useState("");
  const [monthlySpend, setMonthlySpend] = useState(4000);
  const animationRef = useRef(null);
  const lastRef = useRef(Date.now());

  const vectorCost = 483;
  const hardwareCost = 15000;

  useEffect(() => {
    lastRef.current = Date.now();
    const tick = () => {
      const now = Date.now();
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setCloudCost((prev) => prev + (monthlySpend / 2592000) * dt);
      animationRef.current = requestAnimationFrame(tick);
    };
    animationRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationRef.current);
  }, [monthlySpend]);

  const handleChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setUserSpend(val);
    if (val && parseInt(val) > 0) {
      setMonthlySpend(parseInt(val));
      setCloudCost(0);
      lastRef.current = Date.now();
    } else {
      setMonthlySpend(4000);
    }
  };

  const savings = Math.max(0, cloudCost - vectorCost);
  const monthlySavings = monthlySpend - vectorCost;
  const payback =
    monthlySavings > 0 ? Math.ceil(hardwareCost / monthlySavings) : null;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      <div className="container-swiss relative z-10 pt-32 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.05] tracking-tight mb-8"
          >
            Stop renting AI.
            <br />
            Start owning it.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-sans text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto mb-20 leading-relaxed"
          >
            Vector is a plug-and-play inference server that replaces your cloud
            AI spend with hardware you control. Change one line of code. Keep
            everything else.
          </motion.p>

          {/* Cost comparison — clean, minimal */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="border border-foreground/10 p-8 md:p-12 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
              {/* Cloud cost */}
              <div className="text-center">
                <div className="font-sans text-sm text-foreground/40 uppercase tracking-wider mb-4">
                  Cloud cost
                </div>
                <div className="font-serif text-4xl md:text-5xl text-foreground tabular-nums">
                  $
                  {cloudCost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="font-sans text-xs text-foreground/30 mt-2">
                  and climbing
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:flex flex-col items-center gap-4">
                <div className="w-px h-8 bg-foreground/10" />
                <div className="font-sans text-sm text-foreground/30">vs</div>
                <div className="w-px h-8 bg-foreground/10" />
              </div>

              {/* Vector cost */}
              <div className="text-center">
                <div className="font-sans text-sm text-foreground/40 uppercase tracking-wider mb-4">
                  Vector cost
                </div>
                <div className="font-serif text-4xl md:text-5xl text-foreground tabular-nums">
                  ${vectorCost}
                </div>
                <div className="font-sans text-xs text-foreground/30 mt-2">
                  fixed per month
                </div>
              </div>
            </div>

            {/* Input + payback */}
            <div className="mt-10 pt-8 border-t border-foreground/10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-sm text-foreground/40">
                    Your monthly spend
                  </span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30 font-sans">
                      $
                    </span>
                    <input
                      type="text"
                      value={userSpend}
                      onChange={handleChange}
                      placeholder="4,000"
                      className="w-32 bg-muted border border-foreground/10 px-3 pl-7 py-2 text-foreground font-sans text-sm text-center focus:outline-none focus:border-foreground/30 transition-colors placeholder:text-foreground/20"
                    />
                  </div>
                </div>

                {payback && monthlySavings > 0 && (
                  <span className="font-sans text-sm text-foreground/60">
                    Pays for itself in{" "}
                    <span className="text-foreground font-medium">
                      {payback} months
                    </span>
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#how-it-works"
              className="bg-foreground text-background rounded-full px-8 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity"
            >
              See how it works
            </a>
            <Link
              href="/preorder"
              className="border border-foreground/20 text-foreground rounded-full px-8 py-3 font-sans text-sm hover:border-foreground/40 transition-colors"
            >
              Reserve your Vector
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
