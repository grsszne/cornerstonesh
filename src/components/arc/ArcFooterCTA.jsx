"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { T, TYPE, BUTTON } from "./arcTokens";

export default function ArcFooterCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      style={{
        background: T.surfacePage,
        color: T.textPrimary,
        fontFamily: "'Ronzino', Georgia, serif",
        padding: "clamp(140px, 18vw, 240px) clamp(24px, 5vw, 56px)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{
            ...TYPE.displayXL,
            color: T.textPrimary,
            margin: 0,
            marginBottom: 48,
            maxWidth: 900,
          }}
        >
          Your first insight is free.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link
            href="https://arc.cornerstone.sh"
            style={BUTTON.primary}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start free
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
