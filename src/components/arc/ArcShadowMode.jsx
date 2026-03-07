"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function ShadowAnimation({ active }) {
  const [phase, setPhase] = useState("idle");
  const [winCount, setWinCount] = useState(0);

  useEffect(() => {
    if (!active) { setPhase("idle"); setWinCount(0); return; }
    let cancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await delay(600);
      if (cancelled) return;
      setPhase("enter");
      await delay(1000);
      if (cancelled) return;
      setPhase("fork");
      await delay(1200);
      if (cancelled) return;
      setPhase("respond");
      await delay(1000);
      if (cancelled) return;
      setPhase("score");
      await delay(600);
      if (cancelled) return;
      setPhase("count");

      const target = 847;
      const duration = 1200;
      const start = performance.now();
      const tick = () => {
        if (cancelled) return;
        const elapsed = performance.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setWinCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    run();
    return () => { cancelled = true; };
  }, [active]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <svg viewBox="0 0 700 200" className="w-full" fill="none">
        {/* Request pill */}
        <motion.g
          initial={{ x: -120 }}
          animate={phase !== "idle" ? { x: 0 } : { x: -120 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <rect x="20" y="80" width="150" height="36" rx="18"
            fill="var(--foreground)" fillOpacity="0.05"
            stroke="var(--foreground)" strokeOpacity="0.15" />
          <text x="95" y="103" textAnchor="middle" fill="var(--foreground)" fillOpacity="0.5" fontSize="9" fontFamily="monospace">
            &quot;Summarize this contract...&quot;
          </text>
        </motion.g>

        {/* Fork lines */}
        {(phase === "fork" || phase === "respond" || phase === "score" || phase === "count") && (
          <>
            <motion.path d="M 170 98 Q 260 98 290 55"
              stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }} />
            <motion.path d="M 170 98 Q 260 98 290 145"
              stroke="var(--foreground)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }} />
          </>
        )}

        {/* Model A node */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={(phase === "fork" || phase === "respond" || phase === "score" || phase === "count") ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <rect x="290" y="35" width="100" height="36" rx="4"
            fill="var(--foreground)" fillOpacity="0.04"
            stroke="var(--foreground)" strokeOpacity="0.15" />
          <text x="340" y="57" textAnchor="middle" fill="var(--foreground)" fillOpacity="0.55" fontSize="10" fontFamily="monospace">gpt-4o</text>
        </motion.g>

        {/* Model B node */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={(phase === "fork" || phase === "respond" || phase === "score" || phase === "count") ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <rect x="290" y="125" width="100" height="36" rx="4"
            fill="var(--foreground)" fillOpacity="0.04"
            stroke="var(--foreground)" strokeOpacity="0.15" />
          <text x="340" y="147" textAnchor="middle" fill="var(--foreground)" fillOpacity="0.55" fontSize="10" fontFamily="monospace">haiku-4.5</text>
        </motion.g>

        {/* Response lines */}
        {(phase === "respond" || phase === "score" || phase === "count") && (
          <>
            <motion.path d="M 390 53 Q 430 53 460 90"
              stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4 }} />
            <motion.path d="M 390 143 Q 430 143 460 106"
              stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 4"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }} />
          </>
        )}

        {/* Scoring node */}
        {(phase === "score" || phase === "count") && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect x="460" y="72" width="220" height="56" rx="4"
              fill="var(--foreground)" fillOpacity="0.03"
              stroke="var(--foreground)" strokeOpacity="0.12" />
            <rect x="480" y="88" width="140" height="5" rx="2.5"
              fill="var(--foreground)" fillOpacity="0.08" />
            <motion.rect x="480" y="88" height="5" rx="2.5"
              fill="#cc2222" fillOpacity="0.5"
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} />
            <motion.rect x="580" y="88" height="5" rx="2.5"
              fill="var(--foreground)" fillOpacity="0.15"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }} />
            <text x="480" y="113" fill="var(--foreground)" fillOpacity="0.4" fontSize="9" fontFamily="monospace">haiku wins</text>
            <text x="620" y="113" textAnchor="end" fill="var(--foreground)" fillOpacity="0.4" fontSize="9" fontFamily="monospace">gpt-4o</text>
          </motion.g>
        )}

        {/* Win rate */}
        {phase === "count" && (
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <text x="570" y="78" textAnchor="middle" fill="var(--foreground)" fillOpacity="0.6" fontSize="10" fontFamily="monospace">
              71% haiku wins
            </text>
          </motion.g>
        )}
      </svg>

      {phase === "count" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center font-mono text-xs text-foreground/25 mt-2"
        >
          {winCount.toLocaleString()} of 847 comparisons
        </motion.p>
      )}
    </div>
  );
}

export default function ArcShadowMode() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 bg-muted relative overflow-hidden">
      {/* Accent left rule — visual distinction without breaking the theme */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, #cc2222, transparent)", opacity: 0.25 }}
      />

      <div className="container-swiss relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-2 leading-tight">
            Test models against each other.
          </h2>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground/35 leading-tight">
            On your actual traffic.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <ShadowAnimation active={isInView} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <p className="font-sans text-foreground/45 leading-relaxed">
            Shadow Mode silently runs a second model alongside your primary — same prompts, real requests, zero impact on your users. Arc scores each comparison blind. Over hundreds of requests, a clear picture emerges.
          </p>
          <p className="font-sans text-foreground/60 mt-4 leading-relaxed">
            Not a benchmark. Not a synthetic test.
            <br />
            Your prompts. Your users. Real results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-lg mx-auto space-y-4"
        >
          {[
            "Blind evaluation — neither model knows it's being scored.",
            "Zero user impact — shadow requests are fully async.",
            "Bayesian confidence — Arc waits until the signal is real.",
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.15 }}
              className="flex items-start gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc2222] mt-[0.45rem] shrink-0" />
              <span className="font-sans text-sm text-foreground/50">{line}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
