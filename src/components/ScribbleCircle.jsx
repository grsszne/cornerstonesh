"use client";

import { motion } from "framer-motion";

export default function ScribbleCircle({ children, className = "", delay = 0, color = "currentColor" }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full h-3 overflow-visible pointer-events-none"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        {/* Multiple overlapping underline strokes for realistic hand-drawn effect */}
        <motion.path
          /* First stroke - main underline with natural wobble */
          d="M 2,5 Q 15,3.5 30,4.5 Q 45,5.5 60,4 Q 75,2.5 90,4.5 Q 95,5 98,5"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        />
        <motion.path
          /* Second stroke - slight variation for depth */
          d="M 1,6 Q 12,4.5 28,5.5 Q 44,6.5 62,5 Q 78,3.5 92,5.5 Q 96,6 99,6"
          fill="none"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.0,
            delay: delay + 0.1,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        />
        <motion.path
          /* Third stroke - adds texture and handwritten feel */
          d="M 3,4.5 Q 18,3 32,4 Q 48,5 64,3.5 Q 80,2 94,4 Q 97,4.5 99,4.5"
          fill="none"
          stroke={color}
          strokeWidth="1.0"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.35 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.1,
            delay: delay + 0.2,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        />
      </svg>
    </span>
  );
}
