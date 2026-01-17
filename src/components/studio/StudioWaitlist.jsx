"use client";

import { motion, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value }) {
    const spring = useSpring(0, { bounce: 0, duration: 2000 });
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (inView) {
            spring.set(value);
        }
    }, [inView, value, spring]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            setDisplayValue(Math.floor(latest).toLocaleString());
        });
    }, [spring]);

    return <span ref={ref}>{displayValue}</span>;
}

export default function StudioWaitlist() {
  return (
      <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
        {/* Animated Background Particles would go here */}
        
        <div className="container-swiss max-w-4xl mx-auto text-center relative z-10">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-6 py-2 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-md text-sm font-sans mb-8"
             >
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="font-mono font-medium"><Counter value={347} /></span> 
                    <span className="text-foreground/60">companies on waitlist</span>
                </div>
             </motion.div>

             <h2 className="text-4xl md:text-6xl font-serif mb-8 text-foreground">Be first</h2>
             <p className="text-xl text-foreground/70 mb-12 leading-relaxed max-w-2xl mx-auto">
                Studio will launch with limited initial capacity. We're selecting design partners now for pilot deployments.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:opacity-90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    Join Enterprise Waitlist
                 </button>
                 <button className="px-8 py-4 rounded-full font-medium text-lg border border-foreground/20 hover:border-foreground hover:bg-background transition-all duration-300">
                    Nominate Your Company
                 </button>
             </div>
        </div>
      </section>
  );
}
