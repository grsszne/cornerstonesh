"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T, TYPE, SECTION } from "./arcTokens";
import ArcVideoPlaceholder from "./ArcVideoPlaceholder";

export default function ArcStartupEconomics() {
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
          Build with the best. Scale with the cheapest.
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
          Start with a frontier model and ship the product. Arc reads your traffic
          and tells you which routes can quietly move to a faster, cheaper model
          without anyone noticing.
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
          Swap with one click. Roll back with another.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: 80 }}
        >
          <ArcVideoPlaceholder label="auto-tune" />
        </motion.div>
      </div>
    </section>
  );
}
