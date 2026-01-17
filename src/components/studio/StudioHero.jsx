"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;
    
    // Start delay
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex];
          setDisplayText(currentText);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Speed of typing
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayText}</span>;
}

export default function StudioHero() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

    return (
        <motion.section 
            style={{ opacity, scale }}
            className="container-swiss pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center relative min-h-[80vh] justify-center"
        >
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-foreground mb-8 tracking-tight leading-[0.9] h-[1.1em]">
                <TypewriterText text="Cornerstone Studio" />
                <motion.span 
                    animate={{ opacity: [0, 1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-[0.8em] bg-foreground ml-2 align-middle"
                ></motion.span>
            </h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-xl md:text-2xl text-foreground/70 font-sans font-light max-w-3xl mx-auto leading-relaxed mb-12"
            >
                The future of enterprise AI infrastructure. What if you could run GPT-4 class models on your hardware, with unlimited inference and complete data control? We're building it.
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 items-center mb-16"
            >
                <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 w-full sm:w-auto relative overflow-hidden group">
                    <span className="relative z-10">Join Waitlist</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
                <button className="px-8 py-4 rounded-full font-medium text-lg border border-foreground/20 hover:border-foreground transition-colors w-full sm:w-auto hover:bg-foreground/5">
                    Learn More
                </button>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="text-sm text-foreground/40 font-sans tracking-widest flex items-center gap-2"
            >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                PREVIEW PRE-ALPHA
            </motion.div>
        </motion.section>
    );
}
