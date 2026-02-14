"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const ease = [0.25, 0.4, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

// ─── Code Animation ─────────────────────────────────────────────

function CodeStage() {
  // before → highlight → typing → alive → pause → (loop)
  const [phase, setPhase] = useState("before");
  const [typedUrl, setTypedUrl] = useState("");
  const [throughput, setThroughput] = useState(0);
  const throughputRef = useRef(null);

  const targetUrl = "api.yourcompany.com/v1/";

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        // Before — code sits, cursor blinks
        setPhase("before");
        setTypedUrl("");
        setThroughput(0);
        await delay(3200);
        if (cancelled) return;

        // Highlight the old URL
        setPhase("highlight");
        await delay(1200);
        if (cancelled) return;

        // Type the new URL character by character
        setPhase("typing");
        let text = "";
        for (let i = 0; i < targetUrl.length; i++) {
          if (cancelled) return;
          text += targetUrl[i];
          setTypedUrl(text);
          await delay(50);
        }
        await delay(400);
        if (cancelled) return;

        // Alive — metrics light up
        setPhase("alive");
        await delay(4500);
        if (cancelled) return;

        // Brief pause before looping
        setPhase("pause");
        await delay(1800);
        if (cancelled) return;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Throughput counter when alive
  useEffect(() => {
    if (phase === "alive") {
      let count = 0;
      const tick = () => {
        count += Math.random() * 40 + 15;
        setThroughput(Math.round(count));
        if (count < 1247) {
          throughputRef.current = requestAnimationFrame(tick);
        }
      };
      // small initial delay so it doesn't snap
      const t = setTimeout(() => {
        throughputRef.current = requestAnimationFrame(tick);
      }, 200);
      return () => {
        clearTimeout(t);
        if (throughputRef.current) cancelAnimationFrame(throughputRef.current);
      };
    }
  }, [phase]);

  const isSwapped = phase === "alive" || phase === "pause";

  const codeLine = (text, opts = {}) => {
    const { dim, indent = 0 } = opts;
    const pad = "\u00A0".repeat(indent * 4);
    return (
      <div
        className={`${dim ? "text-foreground/25" : "text-foreground/50"} whitespace-pre`}
      >
        {pad}
        {text}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Code container */}
      <div className="border border-foreground/[0.08] bg-foreground/[0.02] overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-foreground/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-foreground/10" />
            <div className="w-2 h-2 rounded-full bg-foreground/10" />
            <div className="w-2 h-2 rounded-full bg-foreground/10" />
          </div>
          <span className="font-mono text-[10px] text-foreground/20 ml-2 tracking-wide">
            main.py
          </span>
        </div>

        {/* Code body */}
        <div className="px-5 md:px-8 py-6 md:py-8 font-mono text-[12px] md:text-[14px] leading-[1.85] select-none">
          {codeLine("from openai import OpenAI", { dim: true })}
          {codeLine("")}
          {codeLine("client = OpenAI(")}

          {/* ─── The Line ─── */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {phase === "before" && (
                <motion.div
                  key="before"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-pre text-foreground/50"
                >
                  {"    "}base_url=
                  <span className="text-foreground/70">
                    &quot;https://api.openai.com/v1&quot;
                  </span>
                  <span className="inline-block w-[2px] h-[1em] bg-foreground/40 ml-0.5 animate-pulse align-middle" />
                </motion.div>
              )}

              {phase === "highlight" && (
                <motion.div
                  key="highlight"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="whitespace-pre relative"
                >
                  <span className="text-foreground/30 line-through decoration-foreground/40 decoration-[1.5px]">
                    {"    "}base_url=
                    <span className="text-foreground/50">
                      &quot;https://api.openai.com/v1&quot;
                    </span>
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease }}
                    className="absolute inset-0 bg-foreground/[0.04] origin-left -mx-2 px-2 rounded-sm"
                    style={{ zIndex: -1 }}
                  />
                </motion.div>
              )}

              {(phase === "typing" ||
                phase === "alive" ||
                phase === "pause") && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`whitespace-pre transition-colors duration-700 -mx-2 px-2 rounded-sm ${
                    isSwapped ? "bg-foreground/[0.05]" : "bg-transparent"
                  }`}
                >
                  <span className="text-foreground/50">{"    "}base_url=</span>
                  <span className="text-foreground">
                    &quot;
                    {phase === "typing" ? typedUrl : targetUrl}
                    {(phase === "alive" || phase === "pause") && <>&quot;</>}
                  </span>
                  {phase === "typing" && (
                    <span className="inline-block w-[2px] h-[1em] bg-foreground ml-[1px] animate-pulse align-middle" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {codeLine(")", {})}
          {codeLine("")}
          {codeLine("# Everything else stays the same", { dim: true })}
          {codeLine("response = client.chat.completions.create(", {
            dim: true,
          })}
          {codeLine('model="gpt-4o",', { dim: true, indent: 1 })}
          {codeLine("messages=[...]", { dim: true, indent: 1 })}
          {codeLine(")", { dim: true })}
        </div>

        {/* ─── Ambient Status Bar ─── */}
        <div className="border-t border-foreground/[0.06] px-5 md:px-8 py-3 flex items-center justify-between">
          {/* Status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-700 ${
                isSwapped ? "bg-green-500/70" : "bg-foreground/20"
              }`}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={isSwapped ? "local" : "cloud"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[10px] md:text-[11px] text-foreground/30 tracking-wide"
              >
                {isSwapped ? "api.yourcompany.com" : "api.openai.com"}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Latency */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[9px] text-foreground/20 uppercase tracking-wider hidden sm:inline">
                Latency
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={isSwapped ? "fast" : "slow"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`font-mono text-[11px] tabular-nums ${
                    isSwapped ? "text-foreground/60" : "text-foreground/25"
                  }`}
                >
                  {isSwapped ? "~12ms" : "~847ms"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Throughput */}
            <div className="flex items-center gap-2">
              <span className="font-sans text-[9px] text-foreground/20 uppercase tracking-wider hidden sm:inline">
                Throughput
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={isSwapped ? "reqs" : "metered"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`font-mono text-[11px] tabular-nums ${
                    isSwapped ? "text-foreground/60" : "text-foreground/25"
                  }`}
                >
                  {isSwapped
                    ? `${throughput.toLocaleString()} req/s`
                    : "pay-per-token"}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────

export default function VectorHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.025,
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <div className="container-swiss relative z-10 pt-32 pb-20 md:pb-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          {/* Headline */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease }}
            className="text-center mb-6"
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-foreground leading-[1.05] tracking-tight">
              Your AI. Your hardware.
            </h1>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease }}
            className="text-center mb-10 md:mb-14"
          >
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground/35 leading-[1.2] tracking-tight">
              One line of code.
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 1, ease }}
            className="font-sans text-base md:text-lg text-foreground/40 max-w-xl mx-auto mb-14 md:mb-20 leading-relaxed text-center"
          >
            Vector is a plug-and-play inference server.
            <br className="hidden sm:inline" /> Change your{" "}
            <span className="font-mono text-foreground/55 text-[0.9em]">
              base_url
            </span>
            . Keep everything else.
          </motion.p>

          {/* Code Stage */}
          <motion.div variants={fadeUp} transition={{ duration: 1.2, ease }}>
            <CodeStage />
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 md:mt-20"
          >
            <a
              href="#stack"
              className="bg-foreground text-background rounded-full px-8 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity"
            >
              See the Stack
            </a>
            <Link
              href="/preorder"
              className="border border-foreground/20 text-foreground rounded-full px-8 py-3 font-sans text-sm hover:border-foreground/40 transition-colors"
            >
              Reserve Your Vector
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
