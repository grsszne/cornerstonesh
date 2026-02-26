"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };
const springSubtle = { type: "spring", stiffness: 60, damping: 24, mass: 1.2 };

export default function CortexHero() {
  const [bgReady, setBgReady] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBgReady(true), 100);
    const t2 = setTimeout(() => setShowScrollCue(true), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background transition: pure black → dark theme bg */}
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundColor: "#000000" }}
        animate={{ backgroundColor: bgReady ? "var(--background)" : "#000000" }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      />

      {/* Bioluminescent radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(204,34,34,0.03) 0%, transparent 70%)",
            animation: "cortexPulse 6s ease-in-out infinite",
          }}
        />
      </motion.div>

      <div className="container-swiss relative z-10 text-center">
        {/* First headline line */}
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          Your AI gets better every week.
        </motion.h1>

        {/* Second headline line */}
        <motion.p
          className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-foreground/35 leading-[1.05] tracking-tight mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.6 }}
        >
          You do nothing.
        </motion.p>

        {/* Subheadline */}
        <motion.p
          className="font-sans text-base md:text-lg text-foreground/40 max-w-md mx-auto mt-12 md:mt-16 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          One line of code. Cortex handles everything else.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-sans text-sm font-medium transition-all hover:brightness-110 active:brightness-95 active:translate-y-[0.5px]"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 90%, white), var(--foreground))",
              color: "var(--background)",
              borderTop:
                "1px solid color-mix(in srgb, var(--foreground) 70%, white)",
              borderLeft:
                "1px solid color-mix(in srgb, var(--foreground) 80%, white)",
              borderRight:
                "1px solid color-mix(in srgb, var(--foreground) 95%, black)",
              borderBottom:
                "1px solid color-mix(in srgb, var(--foreground) 85%, black)",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            Start free
            <span className="text-xs">&#8594;</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll cue — thin line */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollCue ? 0.3 : 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-[2px] h-[40px] bg-foreground rounded-full"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes cortexPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes cortexPulse {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.7;
            }
          }
        }
      `}</style>
    </section>
  );
}
