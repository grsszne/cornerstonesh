"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";

export default function ArcDeepDive() {
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
            maxWidth: 900,
          }}
        >
          Tame the runaway agent.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            ...TYPE.bodyLg,
            margin: "0 auto 28px",
            maxWidth: 640,
          }}
        >
          Agentic loops are powerful. They can also burn $45 in three minutes if a
          model gets stuck in a tool-call loop.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            ...TYPE.bodyLg,
            color: T.textPrimary,
            margin: "0 auto",
            maxWidth: 640,
          }}
        >
          Arc Workflows let you set a hard cap per trace. The moment reality
          misbehaves, Arc severs the connection.
        </motion.p>
      </div>
    </section>
  );
}
