"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

export default function CortexFinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [typedCode, setTypedCode] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const fullCode = 'baseURL: "https://cortex.cornerstone.sh/v1"';

  useEffect(() => {
    if (!isInView) return;

    // Start typing after headline is visible
    const startDelay = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullCode.length) {
          setTypedCode(fullCode.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTypingDone(true);
          // Blink cursor, then hide, then show CTA
          setTimeout(() => {
            setShowCursor(false);
            setShowCTA(true);
          }, 1200);
        }
      }, 35);
      return () => clearInterval(interval);
    }, 600);

    return () => clearTimeout(startDelay);
  }, [isInView]);

  return (
    <section className="py-40 md:py-52 bg-background relative overflow-hidden">
      {/* Radial glow — mirrors hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(204,34,34,0.03) 0%, transparent 70%)",
            animation: "cortexPulse 6s ease-in-out infinite",
          }}
        />
      </div>

      <div className="container-swiss relative z-10" ref={ref}>
        <div className="max-w-2xl mx-auto text-center">
          {/* Headline */}
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-[4.5rem] text-foreground leading-[1.1] tracking-tight mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring }}
          >
            One line of code.
          </motion.h2>

          {/* Code line */}
          <div className="mb-12 md:mb-16">
            <div className="inline-block font-mono text-sm md:text-base text-foreground/60">
              {typedCode}
              {showCursor && !typingDone && (
                <span className="inline-block w-[2px] h-[1em] bg-foreground/50 ml-0.5 animate-pulse align-middle" />
              )}
              {showCursor && typingDone && (
                <motion.span
                  className="inline-block w-[2px] h-[1em] bg-foreground/50 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0, 1, 0] }}
                  transition={{ duration: 1.2, times: [0, 0.25, 0.5, 0.75] }}
                />
              )}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showCTA ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
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

            <p className="font-sans text-xs text-foreground/20 mt-6">
              No credit card. No setup call. Deploy in 2 minutes.
            </p>
          </motion.div>
        </div>
      </div>

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
