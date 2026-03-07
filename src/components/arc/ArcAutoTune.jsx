"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const suggestions = [
  {
    title: "Switch summarization route to haiku-4.5",
    detail: "71% win rate over 847 comparisons · $18/mo savings",
    confidence: 94,
  },
  {
    title: "Enable caching on classification route",
    detail: "Low variance responses, high repeat rate",
    confidence: 87,
  },
  {
    title: "Add fallback to search route",
    detail: "Error rate 2.3%, above 1% threshold",
    confidence: 91,
  },
];

function SuggestionCard({ suggestion, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.12 }}
      className="border border-foreground/10 bg-foreground/[0.02] p-5 md:p-6 hover:translate-y-[-2px] hover:shadow-sm transition-all duration-150"
    >
      <div className="font-sans text-sm text-foreground/80 mb-3">
        {suggestion.title}
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-wider">
          Confidence
        </span>
        <span className="font-mono text-[11px] text-foreground/50">
          {suggestion.confidence}%
        </span>
      </div>

      <div className="h-1 bg-foreground/[0.06] rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full bg-foreground/20 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${suggestion.confidence}%` } : {}}
          transition={{ duration: 0.6, delay: 0.9 + index * 0.15, ease: "easeOut" }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-sans text-xs text-foreground/25">
          {suggestion.detail}
        </span>
        <button className="font-sans text-xs font-medium text-foreground/60 border border-foreground/12 px-3 py-1.5 rounded-full hover:border-foreground/25 hover:scale-[1.02] transition-all duration-150 cursor-default">
          Apply &rarr;
        </button>
      </div>
    </motion.div>
  );
}

export default function ArcAutoTune() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-44 bg-background">
      <div className="container-swiss" ref={ref}>
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            <span className="text-foreground/35">Other tools tell you what happened.</span>
            <br />
            Arc tells you what to do.
          </h2>
        </motion.div>

        {/* Before / After */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/[0.06]">
            {/* Left: generic dashboard (blurry) */}
            <div className="bg-background p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-[1px]" />
              <div className="relative z-10">
                <div className="font-sans text-xs text-foreground/20 uppercase tracking-wider mb-4">Every other tool</div>
                <div className="space-y-3 opacity-30">
                  <div className="h-2 bg-foreground/10 rounded w-full" />
                  <div className="h-2 bg-foreground/10 rounded w-3/4" />
                  <div className="h-8 bg-foreground/[0.06] rounded mt-4" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-6 bg-foreground/[0.05] rounded flex-1" />
                    <div className="h-6 bg-foreground/[0.05] rounded flex-1" />
                    <div className="h-6 bg-foreground/[0.05] rounded flex-1" />
                  </div>
                  <div className="h-2 bg-foreground/10 rounded w-1/2 mx-auto mt-3" />
                </div>
                <p className="font-sans text-xs text-foreground/20 mt-4 italic">Charts. Dashboards. Now what?</p>
              </div>
            </div>

            {/* Right: Arc suggestion (sharp) */}
            <motion.div
              className="bg-background p-8 text-center"
              animate={isInView ? { scale: 1.02 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="font-sans text-xs text-foreground/40 uppercase tracking-wider mb-4">Arc</div>
              <div className="border border-foreground/10 p-4 text-left">
                <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-1">Suggestion</div>
                <div className="font-sans text-sm text-foreground/80 mb-2">Switch to haiku-4.5</div>
                <div className="h-1 bg-foreground/[0.06] rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-[#cc2222]/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "94%" } : {}}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  />
                </div>
                <div className="font-mono text-[10px] text-foreground/25">94% confidence · one click</div>
              </div>
              <p className="font-sans text-xs text-foreground/35 mt-4">Specific. Actionable. Done.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto text-center font-sans text-foreground/45 leading-relaxed mb-16"
        >
          Arc analyzes your usage patterns continuously and surfaces specific, actionable suggestions. Each one shows the confidence level, the expected impact, and the reasoning. You decide whether to act. Arc does the work.
        </motion.p>

        {/* Suggestion cards */}
        <div className="max-w-2xl mx-auto space-y-4">
          {suggestions.map((s, i) => (
            <SuggestionCard key={i} suggestion={s} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
