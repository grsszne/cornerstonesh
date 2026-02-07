"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

// ─── Shared Constants ────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// ─── Feature 0: Smart Routing Demo ─────────────────────────────

function SmartRoutingDemo() {
  const [queries, setQueries] = useState([]);
  const [currentQuery, setCurrentQuery] = useState(null);
  const [phase, setPhase] = useState("idle");

  const queryScenarios = [
    {
      text: "Hi",
      complexity: "trivial",
      tokens: 2,
      route: "Llama 3.2 1B",
      color: "low",
      analysis: ["Token count: 2", "Sentiment: greeting", "→ Tier 1"],
      time: "12ms",
    },
    {
      text: "What's the capital of France?",
      complexity: "simple",
      tokens: 8,
      route: "Mistral 7B",
      color: "low",
      analysis: ["Factual lookup", "No reasoning needed", "→ Tier 1"],
      time: "34ms",
    },
    {
      text: "Explain the Byzantine Generals Problem and its relevance to distributed consensus algorithms",
      complexity: "complex",
      tokens: 18,
      route: "Llama 3.1 70B",
      color: "high",
      analysis: ["Multi-step reasoning", "Domain expertise", "→ Tier 3"],
      time: "287ms",
    },
    {
      text: "Write a Python function to find all prime numbers up to N using the Sieve of Eratosthenes",
      complexity: "coding",
      tokens: 21,
      route: "CodeLlama 34B",
      color: "medium",
      analysis: ["Code generation", "Algorithm implementation", "→ Tier 2"],
      time: "156ms",
    },
    {
      text: "Compare Keynesian vs Austrian economics in context of 2008 crisis",
      complexity: "analysis",
      tokens: 16,
      route: "Qwen 72B",
      color: "high",
      analysis: ["Deep analysis", "Multi-domain synthesis", "→ Tier 3"],
      time: "312ms",
    },
    {
      text: "Thanks!",
      complexity: "trivial",
      tokens: 3,
      route: "Llama 3.2 1B",
      color: "low",
      analysis: ["Sentiment: positive", "No computation needed", "→ Tier 1"],
      time: "9ms",
    },
  ];

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    const run = async () => {
      while (!cancelled) {
        const scenario = queryScenarios[idx % queryScenarios.length];

        setPhase("analyzing");
        setCurrentQuery(scenario);
        await delay(800);
        if (cancelled) return;

        setPhase("routing");
        await delay(1000);
        if (cancelled) return;

        setPhase("processing");
        await delay(1200);
        if (cancelled) return;

        setQueries((prev) => [...prev.slice(-4), { ...scenario, id: idx }]);
        await delay(1800);
        if (cancelled) return;

        setPhase("idle");
        setCurrentQuery(null);
        await delay(600);
        if (cancelled) return;

        idx++;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const getTierColor = (color) => {
    if (color === "low") return "text-foreground/40 border-foreground/15";
    if (color === "medium") return "text-foreground/60 border-foreground/20";
    return "text-foreground border-foreground/30";
  };

  return (
    <div className="relative w-full h-full flex flex-col p-6 overflow-hidden select-none">
      {currentQuery && (
        <div className="mb-4 space-y-3">
          <div className="border border-foreground/10 px-3 py-2">
            <div className="text-[9px] font-sans text-foreground/30 uppercase tracking-wider mb-1">
              Incoming Query
            </div>
            <div className="text-[11px] font-sans text-foreground/70">
              &ldquo;{currentQuery.text}&rdquo;
            </div>
          </div>

          <AnimatePresence mode="wait">
            {phase === "analyzing" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-foreground/15 px-3 py-2 bg-foreground/[0.02]"
              >
                <div className="text-[9px] font-sans text-foreground/40 uppercase tracking-wider mb-2">
                  Analyzing...
                </div>
                <div className="space-y-1">
                  {currentQuery.analysis.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="text-[10px] font-mono text-foreground/50"
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {(phase === "routing" || phase === "processing") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`border px-3 py-2 ${getTierColor(currentQuery.color)}`}
              >
                <div className="text-[9px] font-sans uppercase tracking-wider mb-1 opacity-60">
                  Routed To
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[12px] font-sans font-medium">
                    {currentQuery.route}
                  </div>
                  {phase === "processing" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-sans opacity-60"
                    >
                      Processing...
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-end">
        <div className="text-[10px] font-sans text-foreground/30 uppercase tracking-wider mb-2">
          Routing Log
        </div>
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {queries.map((q) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 border border-foreground/10 px-3 py-1.5"
              >
                <div className="flex-1 truncate text-[10px] font-sans text-foreground/50">
                  {q.text}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className={`text-[9px] font-sans ${
                      q.color === "low"
                        ? "text-foreground/30"
                        : q.color === "medium"
                          ? "text-foreground/50"
                          : "text-foreground/70"
                    }`}
                  >
                    {q.route}
                  </div>
                  <div className="text-[10px] font-serif text-foreground/40 tabular-nums">
                    {q.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-foreground/10 flex justify-between">
        <div>
          <div className="text-[9px] font-sans text-foreground/30 uppercase tracking-wider">
            Models Active
          </div>
          <div className="text-sm font-serif text-foreground">4 concurrent</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-sans text-foreground/30 uppercase tracking-wider">
            Cost Saved
          </div>
          <div className="text-sm font-serif text-foreground">~73%</div>
        </div>
      </div>
    </div>
  );
}

// ─── Feature 1: RAG Pipeline Demo ───────────────────────────────
// Shows B2B2C use case: SMB uploads domain-specific docs so their
// end customers get expert-level answers base models can't provide.

function RAGDemo() {
  const [phase, setPhase] = useState("idle");
  const [activeChunks, setActiveChunks] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [scenarioIdx, setScenarioIdx] = useState(0);

  const scenarios = [
    {
      label: "LegalAI Corp",
      domain: "California Tenant Law",
      docs: [
        "Cal. Civ. Code §1942.5 — Landlord may not retaliate against tenant for exercising rights.",
        "Cal. Civ. Code §1950.5(g) — Security deposit must be returned within 21 days of move-out.",
        "Cal. Civ. Code §827(b) — 30-day notice required for rent increases under 10%.",
        "Cal. Civ. Code §1946.2 — Just cause required for eviction in buildings 15+ years old.",
        "Cal. Civ. Code §1942.4 — Tenant may withhold rent if unit has substantial habitability defects.",
      ],
      query: "Can my landlord raise rent 15% with 30 days notice?",
      matchIdx: 2,
      similarity: ".96",
      baseAnswer: "Generally, landlords can raise rent with proper notice...",
      ragAnswer:
        "No. Under Cal. Civ. Code §827(b), increases over 10% require 90 days written notice. A 15% increase with only 30 days notice is not valid.",
    },
    {
      label: "MedChart SaaS",
      domain: "Pediatric Dosing Guidelines",
      docs: [
        "Amoxicillin pediatric: 25mg/kg/day divided q12h for mild infections.",
        "Ibuprofen pediatric: 10mg/kg/dose q6-8h, max 40mg/kg/day.",
        "Azithromycin pediatric: 10mg/kg day 1, then 5mg/kg days 2-5.",
        "Acetaminophen pediatric: 15mg/kg/dose q4-6h, max 75mg/kg/day.",
        "Cefalexin pediatric: 25-50mg/kg/day divided q6-8h.",
      ],
      query: "Amoxicillin dose for a 20kg child with ear infection?",
      matchIdx: 0,
      similarity: ".99",
      baseAnswer: "The typical dose for amoxicillin varies by condition...",
      ragAnswer:
        "500mg/day (25mg/kg × 20kg), given as 250mg every 12 hours for a mild ear infection.",
    },
    {
      label: "PropTech AI",
      domain: "NYC Zoning Code",
      docs: [
        "ZR §23-00 — R1/R2 districts permit only single- and two-family detached residences.",
        "ZR §33-12 — C4 districts allow commercial uses up to 10.0 FAR with community facility bonus.",
        "ZR §73-622 — BSA may grant variance for physical condition hardship, not self-created.",
        "ZR §62-341 — Waterfront areas require public access along the shoreline.",
        "ZR §81-21 — Special Midtown District: max base FAR 15.0 with transit bonus.",
      ],
      query: "Max FAR for a commercial project in a C4 zone?",
      matchIdx: 1,
      similarity: ".97",
      baseAnswer: "FAR limits depend on the specific zoning district...",
      ragAnswer:
        "10.0 FAR per ZR §33-12, with potential community facility bonus. C4 districts are intended for high-density commercial use.",
    },
  ];

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        const s = scenarios[scenarioIdx % scenarios.length];

        // Reset
        setPhase("idle");
        setActiveChunks([]);
        setQueryText("");
        await delay(1400);
        if (cancelled) return;

        // Upload / index docs
        setPhase("indexing");
        for (let i = 0; i < s.docs.length; i++) {
          if (cancelled) return;
          setActiveChunks((prev) => [...prev, i]);
          await delay(250);
        }
        await delay(500);
        if (cancelled) return;

        // Embedding sweep
        setPhase("embedding");
        await delay(1200);
        if (cancelled) return;

        // End user query arrives
        setPhase("querying");
        let currentText = "";
        for (let i = 0; i < s.query.length; i++) {
          if (cancelled) return;
          currentText += s.query[i];
          setQueryText(currentText);
          await delay(30);
        }
        await delay(500);
        if (cancelled) return;

        // Base model answer (generic)
        setPhase("base-answer");
        await delay(2200);
        if (cancelled) return;

        // RAG retrieval — relevant doc lights up
        setPhase("retrieving");
        setActiveChunks([s.matchIdx]);
        await delay(1400);
        if (cancelled) return;

        // RAG-grounded answer (specific)
        setPhase("rag-answer");
        await delay(4000);
        if (cancelled) return;

        setScenarioIdx((prev) => prev + 1);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [scenarioIdx]);

  const s = scenarios[scenarioIdx % scenarios.length];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 overflow-hidden select-none">
      {/* Header — the SMB and their product */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-sans text-[10px] text-foreground/30 uppercase tracking-wider">
            {s.label} &middot; Vector Dashboard
          </div>
          <div className="font-sans text-[11px] text-foreground/50 mt-0.5">
            Domain context: {s.domain}
          </div>
        </div>
        <div
          className={`text-[9px] font-sans uppercase tracking-wider px-2 py-1 border transition-colors duration-500 ${
            phase === "indexing" || phase === "embedding"
              ? "border-foreground/30 text-foreground/60"
              : "border-foreground/10 text-foreground/30"
          }`}
        >
          {phase === "indexing"
            ? "Uploading..."
            : phase === "embedding"
              ? "Indexing"
              : s.docs.length + " docs indexed"}
        </div>
      </div>

      {/* Domain documents */}
      <div className="flex-1 flex flex-col gap-1 overflow-hidden">
        {s.docs.map((doc, i) => (
          <motion.div
            key={`${scenarioIdx}-${i}`}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity:
                phase === "idle"
                  ? 0.2
                  : phase === "indexing" && activeChunks.includes(i)
                    ? 0.9
                    : phase === "embedding"
                      ? 0.7
                      : phase === "retrieving" && activeChunks.includes(i)
                        ? 1
                        : phase === "rag-answer" && activeChunks.includes(i)
                          ? 1
                          : 0.25,
              scale:
                phase === "retrieving" && activeChunks.includes(i) ? 1.01 : 1,
            }}
            transition={{ duration: 0.4 }}
            className={`
              relative px-3 py-1.5 border text-[10px] font-sans leading-snug transition-colors duration-500
              ${
                (phase === "retrieving" || phase === "rag-answer") &&
                activeChunks.includes(i)
                  ? "border-foreground/40 text-foreground bg-foreground/5"
                  : phase === "embedding"
                    ? "border-foreground/15 text-foreground/50"
                    : "border-foreground/8 text-foreground/35"
              }
            `}
          >
            {doc}
            {phase === "embedding" && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="absolute bottom-0 left-0 h-[1px] bg-foreground/25"
              />
            )}
            {(phase === "retrieving" || phase === "rag-answer") &&
              activeChunks.includes(i) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -right-1 -top-1 w-5 h-5 flex items-center justify-center bg-foreground text-background text-[8px] font-sans font-medium"
                >
                  {s.similarity}
                </motion.div>
              )}
          </motion.div>
        ))}
      </div>

      {/* End user query + answers */}
      <div className="mt-3 space-y-1.5">
        {/* Query */}
        <div
          className={`border px-3 py-2 flex items-center gap-2 transition-colors duration-500 ${
            phase === "querying" ||
            phase === "base-answer" ||
            phase === "retrieving" ||
            phase === "rag-answer"
              ? "border-foreground/25"
              : "border-foreground/8"
          }`}
        >
          <span className="text-foreground/25 text-[10px] font-sans shrink-0">
            Their User
          </span>
          <span className="text-foreground/70 text-[11px] font-sans flex-1">
            {queryText}
            {phase === "querying" && (
              <span className="inline-block w-[1px] h-3 bg-foreground/60 ml-0.5 animate-pulse" />
            )}
          </span>
        </div>

        {/* Base model answer — generic */}
        <AnimatePresence>
          {phase === "base-answer" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-foreground/10 px-3 py-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-sans text-foreground/30 uppercase tracking-wider">
                  Without RAG
                </span>
              </div>
              <span className="text-foreground/40 text-[11px] font-sans italic">
                {s.baseAnswer}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RAG-grounded answer — specific */}
        <AnimatePresence>
          {phase === "rag-answer" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-foreground/30 bg-foreground/5 px-3 py-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-sans text-foreground/50 uppercase tracking-wider">
                  With RAG
                </span>
              </div>
              <span className="text-foreground text-[11px] font-sans font-medium">
                {s.ragAnswer}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Feature 2: Shadow Mode Demo ────────────────────────────────

function ShadowModeDemo() {
  const [phase, setPhase] = useState("cloud"); // cloud, shadow, comparing, switching, local
  const [requests, setRequests] = useState([]);
  const requestId = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setPhase("cloud");
        setRequests([]);
        requestId.current = 0;

        // Phase 1: Cloud-only requests
        for (let i = 0; i < 3; i++) {
          if (cancelled) return;
          requestId.current++;
          setRequests((prev) => [
            ...prev,
            {
              id: requestId.current,
              cloud: true,
              local: false,
              status: "cloud-only",
            },
          ]);
          await delay(700);
        }
        await delay(400);
        if (cancelled) return;

        // Phase 2: Shadow mode — both respond
        setPhase("shadow");
        for (let i = 0; i < 3; i++) {
          if (cancelled) return;
          requestId.current++;
          setRequests((prev) => [
            ...prev,
            {
              id: requestId.current,
              cloud: true,
              local: true,
              status: "shadow",
            },
          ]);
          await delay(700);
        }
        await delay(600);
        if (cancelled) return;

        // Phase 3: Comparing
        setPhase("comparing");
        await delay(1800);
        if (cancelled) return;

        // Phase 4: Switch
        setPhase("switching");
        await delay(1200);
        if (cancelled) return;

        // Phase 5: Local-only
        setPhase("local");
        for (let i = 0; i < 3; i++) {
          if (cancelled) return;
          requestId.current++;
          setRequests((prev) => [
            ...prev.slice(-5),
            {
              id: requestId.current,
              cloud: false,
              local: true,
              status: "local-only",
            },
          ]);
          await delay(700);
        }
        await delay(3000);
        if (cancelled) return;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleRequests = requests.slice(-6);

  return (
    <div className="relative w-full h-full flex flex-col p-6 overflow-hidden select-none">
      {/* Two endpoints */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 transition-colors duration-500 ${
              phase === "local" || phase === "switching"
                ? "bg-foreground/20"
                : "bg-foreground"
            }`}
          />
          <span className="font-sans text-[11px] text-foreground/50">
            Cloud API
          </span>
        </div>
        <div
          className={`font-sans text-[10px] uppercase tracking-wider px-3 py-1 border transition-all duration-500 ${
            phase === "shadow"
              ? "border-foreground/30 text-foreground/60"
              : phase === "comparing"
                ? "border-foreground/50 text-foreground"
                : "border-foreground/10 text-foreground/30"
          }`}
        >
          {phase === "cloud"
            ? "Cloud Only"
            : phase === "shadow"
              ? "Shadow Active"
              : phase === "comparing"
                ? "Comparing..."
                : phase === "switching"
                  ? "Switching"
                  : "Vector Only"}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-sans text-[11px] text-foreground/50">
            Vector
          </span>
          <div
            className={`w-2 h-2 transition-colors duration-500 ${
              phase === "cloud" ? "bg-foreground/20" : "bg-foreground"
            }`}
          />
        </div>
      </div>

      {/* Request stream */}
      <div className="flex-1 flex flex-col gap-1.5 justify-end">
        <AnimatePresence mode="popLayout">
          {visibleRequests.map((req) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              {/* Cloud side */}
              <div className="flex-1 flex justify-end">
                {req.cloud && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                    className={`h-6 border flex items-center justify-end px-2 ${
                      req.status === "cloud-only"
                        ? "border-foreground/20 bg-foreground/5"
                        : "border-foreground/10 bg-foreground/[0.02]"
                    }`}
                  >
                    <span className="text-[9px] font-sans text-foreground/40">
                      {req.status === "cloud-only" ? "200 OK" : "200"}
                    </span>
                  </motion.div>
                )}
              </div>
              {/* Center dot */}
              <div className="w-1 h-1 bg-foreground/20 flex-shrink-0" />
              {/* Local side */}
              <div className="flex-1">
                {req.local && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 0.4,
                      delay: req.status === "shadow" ? 0.15 : 0,
                    }}
                    className={`h-6 border flex items-center px-2 ${
                      req.status === "local-only"
                        ? "border-foreground/20 bg-foreground/5"
                        : req.status === "shadow"
                          ? "border-foreground/10 border-dashed bg-transparent"
                          : "border-foreground/10 bg-foreground/[0.02]"
                    }`}
                  >
                    <span className="text-[9px] font-sans text-foreground/40">
                      {req.status === "local-only"
                        ? "200 OK"
                        : req.status === "shadow"
                          ? "shadow"
                          : "200"}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Comparison result */}
      <AnimatePresence>
        {(phase === "comparing" || phase === "switching") && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 border border-foreground/20 px-3 py-2 text-center"
          >
            <span className="text-[11px] font-sans text-foreground/60">
              {phase === "comparing"
                ? "Quality match: 99.2% — latency 3× faster"
                : "Migrating traffic to Vector..."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Feature 3: Semantic Cache Demo ─────────────────────────────

function CacheDemo() {
  const [entries, setEntries] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [phase, setPhase] = useState("idle"); // idle, querying, processing, cached, result

  const queries = [
    {
      text: "Summarize Q4 earnings report",
      time: "1,247ms",
      cached: false,
    },
    {
      text: "What were the Q4 earnings?",
      time: "8ms",
      cached: true,
      similarity: "0.94",
    },
    {
      text: "Translate onboarding doc to Spanish",
      time: "2,103ms",
      cached: false,
    },
    {
      text: "Spanish version of the onboarding guide",
      time: "6ms",
      cached: true,
      similarity: "0.97",
    },
    {
      text: "Draft email to investor re: Series B",
      time: "1,891ms",
      cached: false,
    },
    {
      text: "Write an investor email about Series B",
      time: "11ms",
      cached: true,
      similarity: "0.91",
    },
  ];

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    const run = async () => {
      while (!cancelled) {
        const q = queries[idx % queries.length];

        // Type query
        setPhase("querying");
        let text = "";
        for (let i = 0; i < q.text.length; i++) {
          if (cancelled) return;
          text += q.text[i];
          setCurrentQuery(text);
          await delay(25);
        }
        await delay(300);
        if (cancelled) return;

        // Processing or cache hit
        if (q.cached) {
          setPhase("cached");
          await delay(200);
        } else {
          setPhase("processing");
          await delay(1400);
        }
        if (cancelled) return;

        // Result
        setPhase("result");
        setEntries((prev) => [
          ...prev.slice(-4),
          {
            query: q.text,
            time: q.time,
            cached: q.cached,
            similarity: q.similarity,
          },
        ]);
        await delay(2000);
        if (cancelled) return;

        setCurrentQuery("");
        setPhase("idle");
        await delay(600);
        idx++;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col p-6 overflow-hidden select-none">
      {/* Query input */}
      <div
        className={`border px-3 py-2 mb-4 flex items-center gap-2 transition-colors duration-300 ${
          phase === "querying"
            ? "border-foreground/30"
            : phase === "cached"
              ? "border-foreground/40"
              : "border-foreground/10"
        }`}
      >
        <span className="text-foreground/30 text-[10px] font-sans shrink-0">
          QUERY
        </span>
        <span className="text-foreground/80 text-[11px] font-sans flex-1 truncate">
          {currentQuery}
          {phase === "querying" && (
            <span className="inline-block w-[1px] h-3 bg-foreground/60 ml-0.5 animate-pulse" />
          )}
        </span>
        {phase === "cached" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-sans text-foreground/70 bg-foreground/10 px-2 py-0.5 shrink-0"
          >
            CACHE HIT
          </motion.span>
        )}
        {phase === "processing" && (
          <span className="text-[9px] font-sans text-foreground/40 shrink-0">
            Processing...
          </span>
        )}
      </div>

      {/* Log entries */}
      <div className="flex-1 flex flex-col gap-1 justify-end">
        <div className="font-sans text-[10px] text-foreground/30 uppercase tracking-wider mb-2">
          Request Log
        </div>
        <AnimatePresence mode="popLayout">
          {entries.map((entry, i) => (
            <motion.div
              key={`${entry.query}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between border px-3 py-1.5 ${
                entry.cached
                  ? "border-foreground/20 bg-foreground/5"
                  : "border-foreground/10"
              }`}
            >
              <span className="text-[10px] font-sans text-foreground/50 truncate flex-1 mr-3">
                {entry.query}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                {entry.cached && (
                  <span className="text-[9px] font-sans text-foreground/40">
                    sim {entry.similarity}
                  </span>
                )}
                <span
                  className={`text-[10px] font-serif tabular-nums ${
                    entry.cached ? "text-foreground" : "text-foreground/40"
                  }`}
                >
                  {entry.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats bar */}
      <div className="mt-4 flex justify-between border-t border-foreground/10 pt-3">
        <div>
          <div className="text-[9px] font-sans text-foreground/30 uppercase tracking-wider">
            Cache Hit Rate
          </div>
          <div className="text-sm font-serif text-foreground">
            {entries.length > 0
              ? Math.round(
                  (entries.filter((e) => e.cached).length / entries.length) *
                    100,
                )
              : 0}
            %
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-sans text-foreground/30 uppercase tracking-wider">
            Avg Saved
          </div>
          <div className="text-sm font-serif text-foreground">
            {entries.filter((e) => e.cached).length > 0 ? "~150×" : "—"} faster
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Feature 4: Model Arena Demo ────────────────────────────────

function ArenaDemo() {
  const [battles, setBattles] = useState([]);
  const [currentBattle, setCurrentBattle] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle, racing, scoring, result

  const matchups = [
    {
      prompt: "Explain quantum computing simply",
      modelA: "Llama 3.1 70B",
      modelB: "Mistral Large",
      speedA: 42,
      speedB: 38,
      scoreA: 8.4,
      scoreB: 7.9,
      winner: "A",
    },
    {
      prompt: "Write a SQL query for top customers",
      modelA: "CodeLlama 34B",
      modelB: "DeepSeek Coder",
      speedA: 31,
      speedB: 29,
      scoreA: 9.1,
      scoreB: 9.3,
      winner: "B",
    },
    {
      prompt: "Summarize this legal contract",
      modelA: "Qwen 72B",
      modelB: "Llama 3.1 70B",
      speedA: 55,
      speedB: 48,
      scoreA: 8.7,
      scoreB: 9.0,
      winner: "B",
    },
    {
      prompt: "Draft a marketing email for SaaS launch",
      modelA: "Mistral Large",
      modelB: "Qwen 72B",
      speedA: 36,
      speedB: 44,
      scoreA: 8.8,
      scoreB: 8.2,
      winner: "A",
    },
  ];

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    const run = async () => {
      while (!cancelled) {
        const match = matchups[idx % matchups.length];
        setCurrentBattle(match);
        setPhase("racing");
        await delay(2500);
        if (cancelled) return;

        setPhase("scoring");
        await delay(1500);
        if (cancelled) return;

        setPhase("result");
        setBattles((prev) => [
          ...prev.slice(-3),
          {
            ...match,
            id: idx,
          },
        ]);
        await delay(2500);
        if (cancelled) return;

        setPhase("idle");
        await delay(600);
        idx++;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col p-6 overflow-hidden select-none">
      {/* Current battle */}
      {currentBattle &&
        (phase === "racing" || phase === "scoring" || phase === "result") && (
          <div className="mb-4">
            <div className="font-sans text-[10px] text-foreground/30 uppercase tracking-wider mb-2">
              Current Match
            </div>
            <div className="border border-foreground/10 px-3 py-2 mb-3">
              <span className="text-[11px] font-sans text-foreground/60 italic">
                &ldquo;{currentBattle.prompt}&rdquo;
              </span>
            </div>

            {/* Race bars */}
            <div className="space-y-2">
              {["A", "B"].map((side) => {
                const model =
                  side === "A" ? currentBattle.modelA : currentBattle.modelB;
                const speed =
                  side === "A" ? currentBattle.speedA : currentBattle.speedB;
                const score =
                  side === "A" ? currentBattle.scoreA : currentBattle.scoreB;
                const isWinner = currentBattle.winner === side;

                return (
                  <div key={side} className="flex items-center gap-3">
                    <span className="text-[10px] font-sans text-foreground/50 w-24 truncate">
                      {model}
                    </span>
                    <div className="flex-1 h-5 border border-foreground/10 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            phase === "racing"
                              ? "70%"
                              : phase === "scoring" || phase === "result"
                                ? `${(score / 10) * 100}%`
                                : 0,
                        }}
                        transition={{
                          duration: phase === "racing" ? 2 : 0.6,
                          ease: "easeOut",
                        }}
                        className={`h-full ${
                          phase === "result" && isWinner
                            ? "bg-foreground/20"
                            : "bg-foreground/8"
                        }`}
                      />
                      {(phase === "scoring" || phase === "result") && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-serif text-foreground/60"
                        >
                          {score} · {speed}tok/s
                        </motion.span>
                      )}
                    </div>
                    {phase === "result" && isWinner && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-sans text-foreground bg-foreground/10 px-2 py-0.5"
                      >
                        PROMOTED
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {/* Battle history */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="font-sans text-[10px] text-foreground/30 uppercase tracking-wider mb-2">
          History
        </div>
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {battles.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between border border-foreground/10 px-3 py-1.5"
              >
                <span className="text-[10px] font-sans text-foreground/40 truncate flex-1 mr-2">
                  {b.prompt}
                </span>
                <span className="text-[10px] font-sans text-foreground/60 shrink-0">
                  {b.winner === "A" ? b.modelA : b.modelB}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Feature 5: One-Line Swap Demo ──────────────────────────────

function SwapDemo() {
  const [phase, setPhase] = useState("before"); // before, highlight, typing, after, done
  const [typedUrl, setTypedUrl] = useState("");

  const targetUrl = "http://vector.local/v1";
  const lines = {
    before: [
      { text: "from openai import OpenAI", dim: true },
      { text: "" },
      { text: "client = OpenAI(", dim: false },
      { text: '    api_key="sk-...",', dim: true },
      { text: '    base_url="https://api.openai.com/v1"', active: true },
      { text: ")", dim: false },
      { text: "" },
      { text: "response = client.chat.completions.create(", dim: true },
      { text: '    model="gpt-4o",', dim: true },
      { text: "    messages=[...]", dim: true },
      { text: ")", dim: true },
    ],
    after: [
      { text: "from openai import OpenAI", dim: true },
      { text: "" },
      { text: "client = OpenAI(", dim: false },
      { text: '    api_key="sk-...",', dim: true },
      { text: "", active: true, special: true },
      { text: ")", dim: false },
      { text: "" },
      { text: "response = client.chat.completions.create(", dim: true },
      { text: '    model="gpt-4o",', dim: true },
      { text: "    messages=[...]", dim: true },
      { text: ")", dim: true },
    ],
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setPhase("before");
        setTypedUrl("");
        await delay(2500);
        if (cancelled) return;

        // Highlight the line
        setPhase("highlight");
        await delay(1000);
        if (cancelled) return;

        // Type new URL
        setPhase("typing");
        let text = "";
        for (let i = 0; i < targetUrl.length; i++) {
          if (cancelled) return;
          text += targetUrl[i];
          setTypedUrl(text);
          await delay(45);
        }
        await delay(300);
        if (cancelled) return;

        setPhase("after");
        await delay(800);
        if (cancelled) return;

        setPhase("done");
        await delay(3500);
        if (cancelled) return;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentLines =
    phase === "before" || phase === "highlight" ? lines.before : lines.after;

  return (
    <div className="relative w-full h-full flex flex-col p-6 overflow-hidden select-none">
      <div className="font-sans text-[10px] text-foreground/30 uppercase tracking-wider mb-3">
        Your existing code
      </div>

      {/* Code block */}
      <div className="flex-1 border border-foreground/10 p-4 font-mono text-[11px] leading-relaxed overflow-hidden">
        {currentLines.map((line, i) => {
          if (line.special) {
            // This is the active line being rewritten
            const displayUrl =
              phase === "typing"
                ? typedUrl
                : phase === "after" || phase === "done"
                  ? targetUrl
                  : "";
            return (
              <div key={i} className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${
                    phase === "done"
                      ? "text-foreground bg-foreground/5 -mx-2 px-2"
                      : "text-foreground"
                  }`}
                >
                  <span className="text-foreground/40">{"    base_url="}</span>
                  <span className="text-foreground">&quot;{displayUrl}</span>
                  {phase === "typing" && (
                    <span className="inline-block w-[1px] h-3 bg-foreground ml-0.5 animate-pulse" />
                  )}
                  {(phase === "after" || phase === "done") && (
                    <span className="text-foreground">&quot;</span>
                  )}
                </motion.div>
              </div>
            );
          }

          if (line.active) {
            return (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  phase === "highlight"
                    ? "bg-foreground/10 -mx-2 px-2 text-foreground line-through decoration-foreground/30"
                    : "text-foreground/70"
                }`}
              >
                {line.text}
              </div>
            );
          }

          return (
            <div
              key={i}
              className={line.dim ? "text-foreground/30" : "text-foreground/60"}
            >
              {line.text || "\u00A0"}
            </div>
          );
        })}
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] font-sans text-foreground/30">
          {phase === "done"
            ? "That's it. Same SDK. Same code. Local inference."
            : phase === "typing"
              ? "Changing one line..."
              : phase === "highlight"
                ? "Find the base_url..."
                : "Your existing OpenAI integration"}
        </span>
        {phase === "done" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-sans text-foreground/60"
          >
            0 other changes needed
          </motion.span>
        )}
      </div>
    </div>
  );
}

// ─── Main Section Component ─────────────────────────────────────

const features = [
  {
    title: "Smart Routing",
    subtitle: "Right model, right cost, every time.",
    description:
      "Vector analyzes each query in real-time — complexity, domain, and token count — then routes it to the optimal model. Simple questions hit fast 7B models. Complex reasoning goes to 70B+. Code generation uses specialized models. You get the best answer at the lowest cost, automatically.",
    Demo: SmartRoutingDemo,
  },
  {
    title: "Built-In RAG Pipelines",
    subtitle: "Give your product domain expertise that base models don't have.",
    description:
      "You know your niche — California tenant law, pediatric dosing tables, municipal zoning codes. Upload your domain documents to Vector and every API call your app makes automatically retrieves the most relevant context before generating a response. No vector database to manage, no pipeline to build. Your users get expert-level answers instead of generic ones.",
    Demo: RAGDemo,
  },
  {
    title: "Shadow Mode",
    subtitle: "Migrate from cloud AI without any risk.",
    description:
      "Shadow Mode runs Vector in parallel with your existing cloud API. Every request gets answered by both — Vector compares quality and latency silently. When confidence is high, flip one switch to cut over. Zero downtime migration.",
    Demo: ShadowModeDemo,
  },
  {
    title: "Semantic Cache",
    subtitle: "Same question twice? Instant answer.",
    description:
      "Vector recognizes semantically similar queries and serves cached responses in single-digit milliseconds instead of running full inference again. Your most common requests become near-instant — saving GPU cycles for work that actually needs them.",
    Demo: CacheDemo,
  },
  {
    title: "Model Arena",
    subtitle: "Let your models compete. Promote the winner.",
    description:
      "Run multiple models side-by-side on real production traffic. Arena scores quality, speed, and cost for each — then auto-promotes the best performer to primary. Continuous improvement without guesswork.",
    Demo: ArenaDemo,
  },
  {
    title: "One-Line Integration",
    subtitle: "Change your base_url. Keep everything else.",
    description:
      "Vector exposes a fully OpenAI-compatible API. Your existing code, SDKs, and tools work immediately — point them to vector.local instead of api.openai.com. That's the entire migration.",
    Demo: SwapDemo,
  },
];

export default function VectorStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(features.length - 1) * 100}%`],
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-muted"
      style={{ height: `${features.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container-swiss h-full flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center pt-32 pb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Intelligence, built in.
            </h2>
            <p className="font-sans text-lg text-foreground/50 max-w-2xl mx-auto leading-relaxed">
              Vector isn&apos;t just hardware. It&apos;s a complete AI platform
              — with features that cloud providers charge extra for, included
              from day one.
            </p>
          </motion.div>

          {/* Horizontal scrolling cards */}
          <div className="flex-1 relative overflow-hidden">
            <motion.div style={{ x }} className="absolute inset-0 flex h-full">
              {features.map((feature, i) => (
                <HorizontalFeatureCard
                  key={feature.title}
                  feature={feature}
                  index={i}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HorizontalFeatureCard({ feature, index, scrollProgress }) {
  const isEven = index % 2 === 0;

  const cardStart = index / features.length;
  const cardEnd = (index + 1) / features.length;

  const opacity = useTransform(
    scrollProgress,
    [cardStart - 0.1, cardStart, cardEnd, cardEnd + 0.1],
    [0.3, 1, 1, 0.3],
  );

  const scale = useTransform(
    scrollProgress,
    [cardStart - 0.1, cardStart, cardEnd, cardEnd + 0.1],
    [0.9, 1, 1, 0.9],
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="min-w-full h-full flex items-center justify-center px-8"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 border border-foreground/10 h-[500px]">
        {/* Text side */}
        <div
          className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${
            isEven ? "" : "lg:order-2"
          }`}
        >
          <span className="font-sans text-[10px] text-foreground/30 uppercase tracking-widest mb-4">
            0{index + 1}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3 leading-tight">
            {feature.title}
          </h3>
          <p className="font-sans text-sm text-foreground/60 mb-4 leading-relaxed">
            {feature.subtitle}
          </p>
          <p className="font-sans text-sm text-foreground/40 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Demo side */}
        <div
          className={`relative bg-foreground/[0.02] border-t lg:border-t-0 ${
            isEven ? "lg:border-l" : "lg:border-r lg:order-1"
          } border-foreground/10`}
        >
          <feature.Demo />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Utility ─────────────────────────────────────────────────────

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
