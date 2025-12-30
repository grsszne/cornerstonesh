"use client";

import { motion } from "framer-motion";

export default function ScribbleUnderline({ children, className = "", delay = 0, color = "currentColor" }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full h-2 overflow-visible pointer-events-none"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 2,4 Q 25,2 50,4 Q 75,6 98,4"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay,
            ease: "easeOut",
          }}
        />
      </svg>
    </span>
  );
}
