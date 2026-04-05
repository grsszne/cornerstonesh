"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";

export default function ArcShadowMode() {
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
            margin: 0,
            marginBottom: 40,
            maxWidth: 900,
          }}
        >
          Test cheaper models against production, silently.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            ...TYPE.bodyLg,
            margin: 0,
            maxWidth: 620,
          }}
        >
          Arc routes a copy of every live request to a candidate model. You see the
          comparison. Users only see the original response. Switch with confidence,
          or don&apos;t.
        </motion.p>
      </div>
    </section>
  );
}
