"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

export default function CortexSetup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [highlightLine, setHighlightLine] = useState(false);
  const [typedComment, setTypedComment] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const fullComment = "// That's it. Ship it.";

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setHighlightLine(true), 800);
    return () => clearTimeout(t);
  }, [isInView]);

  useEffect(() => {
    if (!highlightLine) return;
    setShowCursor(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullComment.length) {
        setTypedComment(fullComment.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTypingDone(true);
          setTimeout(() => setShowCursor(false), 1200);
        }, 400);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [highlightLine]);

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <motion.div
          ref={ref}
          className="max-w-[520px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring }}
        >
          {/* Label */}
          <div className="font-sans text-[11px] text-foreground/30 uppercase tracking-[0.15em] mb-6">
            Setup
          </div>

          {/* Code block */}
          <div className="border border-foreground/[0.08] bg-foreground/[0.02] overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-foreground/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
              </div>
              <span className="font-mono text-[10px] text-foreground/20 ml-2 tracking-wide">
                index.js
              </span>
            </div>

            {/* Code body */}
            <div className="px-5 md:px-8 py-6 md:py-8 font-mono text-[12px] md:text-[14px] leading-[1.85] select-none">
              <div className="text-foreground/40">
                <span className="text-foreground/60">import</span> OpenAI{" "}
                <span className="text-foreground/60">from</span>{" "}
                <span className="text-foreground/70">&quot;openai&quot;</span>;
              </div>
              <div className="h-[1.85em]" />
              <div className="text-foreground/40">
                <span className="text-foreground/60">const</span> client ={" "}
                <span className="text-foreground/60">new</span>{" "}
                <span className="text-foreground/70">OpenAI</span>({"{"}
              </div>

              {/* The key line */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 -mx-2 px-2 rounded-sm bg-foreground/[0.05]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: highlightLine ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ zIndex: 0 }}
                />
                <div className="relative z-10 pl-8 text-foreground/40">
                  baseURL:{" "}
                  <span className="text-foreground/80">
                    &quot;https://cortex.cornerstone.sh/v1&quot;
                  </span>
                </div>
                {highlightLine && (
                  <motion.div
                    className="absolute inset-0 -mx-2 px-2 rounded-sm"
                    initial={{ boxShadow: "0 0 0 0 rgba(204,34,34,0)" }}
                    animate={{
                      boxShadow: [
                        "0 0 20px 2px rgba(204,34,34,0.08)",
                        "0 0 0 0 rgba(204,34,34,0)",
                      ],
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                )}
              </div>

              <div className="text-foreground/40">{"}"});</div>
              <div className="h-[1.85em]" />

              {/* Typing comment */}
              <div className="text-foreground/25 h-[1.85em]">
                {typedComment}
                {showCursor && !typingDone && (
                  <span className="inline-block w-[2px] h-[1em] bg-foreground/40 ml-0.5 animate-pulse align-middle" />
                )}
                {showCursor && typingDone && (
                  <motion.span
                    className="inline-block w-[2px] h-[1em] bg-foreground/40 ml-0.5 align-middle"
                    animate={{ opacity: [1, 0, 1, 0] }}
                    transition={{ duration: 1.2, times: [0, 0.25, 0.5, 0.75] }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Caption */}
          <motion.p
            className="font-sans text-sm text-foreground/35 text-center mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Same SDK. Same code. One new line. Cortex is now watching.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
