"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  "You picked a model, wrote a prompt, and shipped.",
  "Maybe it's working. Maybe you're overpaying by 80%.",
  "Maybe a faster model would do the job just as well.",
  "",
  "You don't know, because you have no data.",
  "",
  "Most teams only find out something's wrong",
  "when a bill lands or a user complains.",
];

export default function ArcProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 md:py-44 bg-background">
      <div className="container-swiss">
        <div ref={ref} className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl text-foreground mb-16"
          >
            You&apos;re flying blind.
          </motion.h2>

          <div className="space-y-1">
            {lines.map((line, i) => {
              if (line === "") {
                return <div key={i} className="h-6" />;
              }

              const isEmphasis = line === "You don't know, because you have no data.";

              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  className={`font-sans leading-relaxed ${
                    isEmphasis
                      ? "text-lg md:text-xl text-foreground/70 mt-2"
                      : "text-base md:text-lg text-foreground/45"
                  }`}
                >
                  {line}
                </motion.p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
