"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const question = "why did costs spike on tuesday?";
const answer = `Route \`customer-support\` jumped from 340 to 890 requests between 2–6am. Average prompt tokens also increased from 420 to 1,840 — likely a context window change in your app.`;

export default function ArcAskData() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState("idle");
  const [typedQ, setTypedQ] = useState("");
  const [typedA, setTypedA] = useState("");
  const [showGhost, setShowGhost] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await delay(800);
      if (cancelled) return;
      setPhase("typing-q");

      // Type question
      for (let i = 0; i <= question.length; i++) {
        if (cancelled) return;
        setTypedQ(question.slice(0, i));
        await delay(45);
      }

      await delay(300);
      if (cancelled) return;
      setPhase("enter");
      await delay(400);
      if (cancelled) return;
      setPhase("drawer");
      await delay(400);
      if (cancelled) return;
      setPhase("typing-a");

      // Type answer
      for (let i = 0; i <= answer.length; i++) {
        if (cancelled) return;
        setTypedA(answer.slice(0, i));
        await delay(15);
      }

      await delay(600);
      if (cancelled) return;
      setPhase("done");
      setShowGhost(true);
    };
    run();
    return () => { cancelled = true; };
  }, [isInView]);

  return (
    <section className="py-32 md:py-40 bg-muted">
      <div className="container-swiss" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-foreground/60">
            Just ask.
          </h2>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg mx-auto text-center mb-12"
        >
          <p className="font-sans text-foreground/35 leading-relaxed text-sm">
            Why did costs spike on Tuesday?
            <br />
            Should I switch my summarization route to Haiku?
            <br />
            Which route is performing worst this week?
          </p>
          <p className="font-sans text-foreground/50 mt-4 text-sm">
            Arc knows your data. Ask in plain English, get a specific answer.
          </p>
        </motion.div>

        {/* Chat mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-lg mx-auto"
        >
          <div className="border border-foreground/[0.08] bg-background overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-foreground/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
              </div>
              <span className="font-mono text-[10px] text-foreground/15 ml-2">arc.cornerstone.sh</span>
            </div>

            {/* Drawer area */}
            <AnimatePresence>
              {(phase === "drawer" || phase === "typing-a" || phase === "done") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="border-b border-foreground/[0.06] overflow-hidden"
                >
                  <div className="px-5 py-5">
                    <div className="font-mono text-[10px] text-foreground/20 uppercase tracking-wider mb-3">Arc</div>
                    <div className="font-sans text-sm text-foreground/60 leading-relaxed whitespace-pre-wrap">
                      {typedA}
                      {phase === "typing-a" && (
                        <span className="inline-block w-[2px] h-[1em] bg-foreground/40 ml-0.5 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input bar */}
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1 relative">
                <div className={`font-sans text-sm ${typedQ ? "text-foreground/70" : "text-foreground/20"} min-h-[20px]`}>
                  {typedQ || "Ask Arc anything..."}
                  {phase === "typing-q" && (
                    <span className="inline-block w-[2px] h-[1em] bg-foreground/50 ml-0.5 animate-pulse align-middle" />
                  )}
                </div>
                {/* Ghost suggestion */}
                {showGhost && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="font-sans text-xs text-foreground/15 mt-1"
                  >
                    should I switch summarization to haiku?
                  </motion.div>
                )}
              </div>
              <motion.div
                animate={phase === "enter" ? { scale: [1, 0.95, 1], borderColor: ["rgba(204,34,34,0.3)", "rgba(204,34,34,0)"] } : {}}
                transition={{ duration: 0.3 }}
                className="w-6 h-6 border border-foreground/10 rounded flex items-center justify-center"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="1.2">
                  <path d="M5 1v8M1 5l4 4 4-4" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
