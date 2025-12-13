"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.7, // Smoother, longer
  className = "",
  scale = 0.95, 
  blur = 8, 
  y = 20,      
  threshold = 0.2
}) {
  const ref = useRef(null);
  // once: false allows it to work in reverse/reset
  const isInView = useInView(ref, { once: false, amount: threshold, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { 
          opacity: 0, 
          scale: scale, 
          filter: `blur(${blur}px) brightness(0.9)`, // Removed heavy contrast/brightness shift for smoother look
          y: y
        },
        visible: { 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px) brightness(1)",
          y: 0 
        }
      }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.4, 0.25, 1], // Standard "ease-out" feel, smoother than the snappy one
      }}
      className={className}
    >
      {/* Noise Overlay for Grain Effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opactiy='0.5'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat',
             backgroundSize: '100px'
        }}
        variants={{
           hidden: { opacity: 0.3 },
           visible: { opacity: 0 }
        }}
      />
      {children}
    </motion.div>
  );
}
