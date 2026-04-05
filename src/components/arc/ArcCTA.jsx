"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { T, TYPE, BUTTON } from "./arcTokens";

export default function ArcCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      style={{
        background: T.surfacePage,
        color: T.textPrimary,
        fontFamily: "'Ronzino', Georgia, serif",
        padding: "clamp(160px, 20vw, 260px) clamp(24px, 5vw, 56px)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{
            ...TYPE.displayXL,
            color: T.textPrimary,
            margin: "0 auto 48px",
            maxWidth: 860,
          }}
        >
          Stop managing providers. Start managing AI.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="https://arc.cornerstone.sh"
            style={BUTTON.primary}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start free
          </Link>
          <Link
            href="/contact"
            style={BUTTON.ghost}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.textSecondary)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.borderDefault)}
          >
            Talk to us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
