"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// ─── Step 1: Connect ─────────────────────────────────────────────

function ConnectDemo({ active }) {
  const [phase, setPhase] = useState("idle");
  const [typed, setTyped] = useState("");
  const target = 'https://arc.cornerstone.sh/v1/...';

  useEffect(() => {
    if (!active) { setPhase("idle"); setTyped(""); return; }
    let cancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await delay(600);
      if (cancelled) return;
      setPhase("strike");
      await delay(800);
      if (cancelled) return;
      setPhase("typing");

      let text = "";
      for (let i = 0; i < target.length; i++) {
        if (cancelled) return;
        text += target[i];
        setTyped(text);
        await delay(35);
      }
      setPhase("done");
    };
    run();
    return () => { cancelled = true; };
  }, [active]);

  return (
    <div className="border border-foreground/[0.08] bg-foreground/[0.02] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-foreground/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-foreground/10" />
          <div className="w-2 h-2 rounded-full bg-foreground/10" />
          <div className="w-2 h-2 rounded-full bg-foreground/10" />
        </div>
        <span className="font-mono text-[10px] text-foreground/20 ml-2 tracking-wide">main.py</span>
      </div>
      <div className="px-4 md:px-6 py-5 font-mono text-[12px] md:text-[13px] leading-[1.9] select-none">
        <div className="text-foreground/25">from openai import OpenAI</div>
        <div className="h-2" />
        <div className="text-foreground/40">client = OpenAI(</div>
        <div className="relative">
          {phase === "idle" && (
            <div className="text-foreground/40 whitespace-pre">
              {"  "}base_url=<span className="text-foreground/60">&quot;https://api.openai.com/v1&quot;</span>
              <span className="inline-block w-[2px] h-[1em] bg-foreground/30 ml-0.5 animate-pulse align-middle" />
            </div>
          )}
          {phase === "strike" && (
            <div className="whitespace-pre">
              <span className="text-foreground/25 line-through decoration-foreground/30 decoration-[1.5px]">
                {"  "}base_url=<span className="text-foreground/40">&quot;https://api.openai.com/v1&quot;</span>
              </span>
            </div>
          )}
          {(phase === "typing" || phase === "done") && (
            <div className="whitespace-pre">
              <span className="text-foreground/40">{"  "}base_url=</span>
              <span className="text-foreground">&quot;{typed}{phase === "done" && <>&quot;</>}</span>
              {phase === "typing" && (
                <span className="inline-block w-[2px] h-[1em] bg-foreground ml-[1px] animate-pulse align-middle" />
              )}
            </div>
          )}
        </div>
        <div className="text-foreground/40">)</div>
        <div className="h-2" />
        <div className="text-foreground/20"># Everything else stays the same</div>
      </div>
    </div>
  );
}

// ─── Step 2: Observe ─────────────────────────────────────────────

const LOG_ROWS = [
  { method: "POST", path: "/v1/chat", model: "gpt-4o", status: 200, ms: 312, cost: "$0.0041" },
  { method: "POST", path: "/v1/chat", model: "gpt-4o", status: 200, ms: 298, cost: "$0.0039" },
  { method: "POST", path: "/v1/chat", model: "haiku-4.5", status: 200, ms: 180, cost: "$0.0003" },
  { method: "POST", path: "/v1/chat", model: "gpt-4o-mini", status: 200, ms: 245, cost: "$0.0008" },
  { method: "POST", path: "/v1/chat", model: "sonnet-4", status: 200, ms: 410, cost: "$0.0052" },
  { method: "POST", path: "/v1/chat", model: "haiku-4.5", status: 200, ms: 165, cost: "$0.0003" },
  { method: "POST", path: "/v1/embed", model: "text-embed-3", status: 200, ms: 89, cost: "$0.0001" },
  { method: "POST", path: "/v1/chat", model: "gpt-4o", status: 200, ms: 335, cost: "$0.0044" },
];

function ObserveDemo({ active }) {
  const [rows, setRows] = useState([]);
  const rowIndex = useRef(0);

  useEffect(() => {
    if (!active) { setRows([]); rowIndex.current = 0; return; }

    const interval = setInterval(() => {
      const row = LOG_ROWS[rowIndex.current % LOG_ROWS.length];
      rowIndex.current++;
      setRows((prev) => [{ ...row, id: rowIndex.current }, ...prev].slice(0, 5));
    }, 600);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="border border-foreground/[0.08] bg-foreground/[0.02] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-foreground/[0.06]">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        <span className="font-mono text-[10px] text-foreground/20 tracking-wide">live feed</span>
      </div>
      <div className="px-3 md:px-4 py-3 font-mono text-[11px] md:text-[12px] leading-[1.8] select-none min-h-[160px]">
        {rows.map((row) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 text-foreground/40"
          >
            <span className="text-foreground/20">&rarr;</span>
            <span className="text-foreground/30 w-8">{row.method}</span>
            <span className="text-foreground/40 w-16">{row.path}</span>
            <span className="text-foreground/50 w-20">{row.model}</span>
            <span className="text-green-500/60 w-6">{row.status}</span>
            <span className="text-foreground/30 w-12 text-right">{row.ms}ms</span>
            <span className="text-foreground/25 w-14 text-right">{row.cost}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 3: Optimize ────────────────────────────────────────────

function OptimizeDemo({ active }) {
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    if (!active) { setPhase("idle"); return; }
    let cancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await delay(800);
      if (cancelled) return;
      setPhase("border");
      await delay(600);
      if (cancelled) return;
      setPhase("title");
      await delay(400);
      if (cancelled) return;
      setPhase("bar");
      await delay(500);
      if (cancelled) return;
      setPhase("button");
    };
    run();
    return () => { cancelled = true; };
  }, [active]);

  if (phase === "idle") return <div className="min-h-[140px]" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-foreground/10 bg-foreground/[0.02] p-5 md:p-6 relative overflow-hidden"
    >
      {/* Card border drawing effect */}
      <motion.div
        className="absolute inset-0 border border-foreground/15 pointer-events-none"
        initial={{ clipPath: "inset(0 100% 100% 0)" }}
        animate={{ clipPath: "inset(0 0% 0% 0)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {phase !== "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-1">Suggestion</div>
          <div className="font-sans text-sm text-foreground/80 mb-4">
            Switch summarization route to haiku-4.5
          </div>
        </motion.div>
      )}

      {(phase === "bar" || phase === "button") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-wider">Confidence</span>
            <span className="font-mono text-[11px] text-foreground/50">94%</span>
          </div>
          <div className="h-1 bg-foreground/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-foreground/20 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "94%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="font-sans text-xs text-foreground/25 mt-2">
            71% win rate over 847 comparisons &middot; $18/mo savings
          </div>
        </motion.div>
      )}

      {phase === "button" && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button className="font-sans text-xs font-medium text-foreground/70 border border-foreground/15 px-4 py-2 rounded-full hover:border-foreground/30 transition-colors cursor-default">
            Apply &rarr;
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Connect",
    desc: "Point your app at Arc instead of OpenAI directly. One line change. Supports every provider. Your app doesn't know the difference.",
    Demo: ConnectDemo,
  },
  {
    num: "02",
    title: "Observe",
    desc: "Every request is logged. Latency, cost, tokens, errors, model performance. Not sampled — everything. The full picture of what your AI stack is actually doing.",
    Demo: ObserveDemo,
  },
  {
    num: "03",
    title: "Optimize",
    desc: "Arc doesn't just show you data. It reads it, finds the inefficiencies, and tells you what to do. One click to apply. Instant rollback if you change your mind.",
    Demo: OptimizeDemo,
  },
];

export default function ArcHowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { threshold: 0.6 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section id="how-it-works" className="bg-muted py-32 md:py-40">
      <div className="container-swiss">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Drop in one endpoint.
          </h2>
          <p className="font-sans text-lg text-foreground/40">
            Arc handles the rest.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-24 md:space-y-32">
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
            >
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={activeStep >= i ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-[11px] text-foreground/20 tracking-wider">{step.num}</span>
                  <h3 className="font-serif text-2xl text-foreground">{step.title}</h3>
                </div>
                <p className="font-sans text-foreground/50 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>

              {/* Demo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={activeStep >= i ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <step.Demo active={activeStep >= i} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
