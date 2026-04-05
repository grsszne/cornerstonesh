"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";

export default function ArcProblemSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section style={SECTION.wrap}>
      <div style={SECTION.inner} ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            ...TYPE.displayL,
            color: T.textPrimary,
            margin: "0 auto 48px",
            maxWidth: 820,
          }}
        >
          You&apos;re flying blind.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            ...TYPE.bodyLg,
            margin: "0 auto 28px",
            maxWidth: 620,
          }}
        >
          You picked a model, wrote a prompt, and shipped. Maybe it&apos;s working.
          Maybe you&apos;re paying four times what you should be. Maybe a faster
          model would do the job just as well.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            ...TYPE.bodyLg,
            color: T.textPrimary,
            margin: "0 auto",
            maxWidth: 620,
          }}
        >
          You don&apos;t know, because you have no data.
        </motion.p>
      </div>
    </section>
  );
}
