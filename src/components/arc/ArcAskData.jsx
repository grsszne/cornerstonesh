"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";

export default function ArcAskData() {
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
          Every question, answered by your traffic.
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
          No more SQL, no more dashboards. Ask Arc anything about your AI spend,
          latency, or quality, and get an answer grounded in your actual requests.
        </motion.p>
      </div>
    </section>
  );
}
