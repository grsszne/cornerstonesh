"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Typing Headline ────────────────────────────────────────────

function TypingHeadline({ onComplete }) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [phase, setPhase] = useState("wait");
  const [showCursor, setShowCursor] = useState(true);

  const text1 = "Your AI stack,";
  const text2 = "optimized.";

  useEffect(() => {
    let cancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await delay(400);
      if (cancelled) return;

      // Type line 1
      setPhase("typing1");
      for (let i = 0; i <= text1.length; i++) {
        if (cancelled) return;
        setLine1(text1.slice(0, i));
        await delay(40);
      }

      await delay(300);
      if (cancelled) return;

      // Type line 2
      setPhase("typing2");
      for (let i = 0; i <= text2.length; i++) {
        if (cancelled) return;
        setLine2(text2.slice(0, i));
        await delay(40);
      }

      await delay(600);
      if (cancelled) return;

      // Blink cursor twice then hide
      setShowCursor(false);
      await delay(400);
      setShowCursor(true);
      await delay(400);
      setShowCursor(false);

      setPhase("done");
      onComplete?.();
    };

    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.05] tracking-tight text-center">
      <span>{line1}</span>
      {phase === "typing1" && showCursor && (
        <span className="inline-block w-[3px] h-[0.85em] bg-foreground/60 ml-1 align-middle animate-pulse" />
      )}
      <br />
      <span className="text-foreground/35">{line2}</span>
      {(phase === "typing2" || (phase === "done" && showCursor)) && (
        <span className="inline-block w-[3px] h-[0.85em] bg-foreground/30 ml-1 align-middle animate-pulse" />
      )}
    </h1>
  );
}

// ─── Word-by-word Subhead ───────────────────────────────────────

function StaggeredSubhead({ show }) {
  const words = "Arc sits between your app and your AI providers. It watches every request, runs silent experiments, and tells you exactly what to change.".split(" ");

  if (!show) return null;

  return (
    <p className="font-sans text-base md:text-lg text-foreground/40 max-w-xl mx-auto leading-relaxed text-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// ─── Flow Diagram ───────────────────────────────────────────────

function FlowDiagram({ show }) {
  const providers = ["OpenAI", "Anthropic", "Gemini"];

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full max-w-2xl mx-auto mt-16 md:mt-20"
    >
      <svg viewBox="0 0 600 120" className="w-full" fill="none">
        {/* Your App node */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <rect x="20" y="40" width="100" height="40" rx="4" stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="1" fill="var(--foreground)" fillOpacity="0.03" />
          <text x="70" y="64" textAnchor="middle" className="font-mono" fill="var(--foreground)" fillOpacity="0.5" fontSize="11">Your App</text>
        </motion.g>

        {/* Arc node — accent ring */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <rect x="230" y="35" width="90" height="50" rx="6" stroke="#cc2222" strokeOpacity="0.5" strokeWidth="1.5" fill="#cc2222" fillOpacity="0.04" />
          {/* Pulse ring */}
          <motion.rect
            x="226" y="31" width="98" height="58" rx="9"
            stroke="#cc2222" strokeWidth="1" fill="none"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x="275" y="64" textAnchor="middle" className="font-serif" fill="var(--foreground)" fillOpacity="0.9" fontSize="16" fontWeight="400">Arc</text>
        </motion.g>

        {/* Provider nodes */}
        {providers.map((p, i) => (
          <motion.g
            key={p}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 + i * 0.15 }}
          >
            <rect x="440" y={15 + i * 38} width="120" height="30" rx="4" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="1" fill="var(--foreground)" fillOpacity="0.02" />
            <text x="500" y={34 + i * 38} textAnchor="middle" className="font-mono" fill="var(--foreground)" fillOpacity="0.35" fontSize="10">{p}</text>
          </motion.g>
        ))}

        {/* Lines: App → Arc */}
        <motion.line
          x1="120" y1="60" x2="230" y2="60"
          stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        />

        {/* Lines: Arc → Providers */}
        {providers.map((_, i) => (
          <motion.line
            key={i}
            x1="320" y1="60"
            x2="440" y2={30 + i * 38}
            stroke="var(--foreground)" strokeOpacity="0.1" strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
          />
        ))}

        {/* Pulsing dots along App → Arc line */}
        <motion.circle
          r="2" fill="#cc2222" fillOpacity="0.6"
          initial={{ cx: 120, cy: 60 }}
          animate={{ cx: [120, 230], cy: [60, 60] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2 }}
        />

        {/* Pulsing dots along Arc → Provider lines */}
        {providers.map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            r="1.5" fill="var(--foreground)" fillOpacity="0.2"
            initial={{ cx: 320, cy: 60 }}
            animate={{ cx: [320, 440], cy: [60, 30 + i * 38] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 2.5 + i * 0.6 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────

export default function ArcHero() {
  const [headlineDone, setHeadlineDone] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Breathing radial gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(204,34,34,0.04) 0%, transparent 60%)",
        }}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.02,
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 65%)",
        }}
      />

      <div className="container-swiss relative z-10 pt-32 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto">
          {/* Headline */}
          <div className="mb-8">
            <TypingHeadline onComplete={() => setHeadlineDone(true)} />
          </div>

          {/* Subhead */}
          <div className="mb-12 md:mb-14">
            <StaggeredSubhead show={headlineDone} />
          </div>

          {/* CTAs */}
          <AnimatePresence>
            {headlineDone && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="https://arc.cornerstone.sh"
                  className="bg-foreground text-background rounded-full px-8 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Start free &rarr;
                </Link>
                <a
                  href="#how-it-works"
                  className="border border-foreground/20 text-foreground rounded-full px-8 py-3 font-sans text-sm hover:border-foreground/40 transition-colors"
                >
                  See it in action &darr;
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flow diagram */}
          <FlowDiagram show={headlineDone} />
        </div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 2l8 8 8-8" />
        </svg>
      </motion.div>
    </section>
  );
}
