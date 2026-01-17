"use client";

import { motion } from "framer-motion";

export default function StudioRoadmap() {
    return (
        <section className="container-swiss py-32 mb-20">
             <div className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">How we're getting there</h2>
            </div>
            
            <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
                {/* Timeline Line */}
                <div className="absolute left-[7px] md:left-0 top-0 bottom-0 w-px bg-foreground/10 md:hidden"></div>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 hidden md:block md:left-[200px]"></div>

                {/* Animated Progress Line (Mobile) */}
                <motion.div 
                    className="absolute left-[7px] top-0 w-px bg-foreground md:hidden"
                    initial={{ height: "0%" }}
                    whileInView={{ height: "40%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                ></motion.div>

                 {/* Animated Progress Line (Desktop) */}
                <motion.div 
                    className="absolute hidden md:block left-[200px] top-0 w-px bg-foregroundOrigin"
                    style={{ background: "linear-gradient(to bottom, currentColor 50%, transparent 100%)" }} 
                    initial={{ height: "0%" }}
                    whileInView={{ height: "50%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                ></motion.div>
                
                {/* Phase 1 */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="md:flex gap-12 items-baseline mb-24 relative group"
                >
                    <div className="hidden md:block w-48 text-right font-serif text-lg shrink-0 text-foreground/50 group-hover:text-foreground transition-colors">Spring 2026</div>
                    <div className="relative pb-4 md:pl-8 border-l border-transparent md:border-l-0 pl-8">
                        {/* Dot */}
                        <div className="absolute -left-[5px] md:-left-[5px] top-2 w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_rgba(0,0,0,0.2)]"></div>
                        
                        <h3 className="text-xl font-medium mb-2 text-foreground">Phase 1: Foundation</h3>
                        <p className="leading-relaxed max-w-md text-foreground/70">
                            Proving the integrated software stack works. Launching our personal server to establish the hardware and software ecosystem.
                        </p>
                    </div>
                </motion.div>

                {/* Phase 2 */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="md:flex gap-12 items-baseline mb-24 relative group"
                >
                     <div className="hidden md:block w-48 text-right font-serif text-lg shrink-0 text-foreground group-hover:text-green-500 transition-colors">2026 — 2027</div>
                    <div className="relative pb-4 md:pl-8 pl-8">
                        {/* Dot */}
                        <div className="absolute -left-[5px] md:-left-[5px] top-2 w-3 h-3 rounded-full bg-background border-2 border-foreground relative">
                            <div className="absolute inset-0 rounded-full bg-foreground animate-ping opacity-20"></div>
                        </div>

                        <h3 className="text-xl font-medium mb-2 text-foreground">Phase 2: Studio Development</h3>
                        <p className="leading-relaxed max-w-md text-foreground/70">
                             Scaling Foundation's software for enterprise. Building hardware partnerships and pilot programs with select design partners.
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-xs font-mono text-foreground/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            IN PROGRESS
                        </div>
                    </div>
                </motion.div>

                {/* Phase 3 */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="md:flex gap-12 items-baseline relative opacity-50 hover:opacity-100 transition-opacity duration-500"
                >
                     <div className="hidden md:block w-48 text-right font-serif text-lg shrink-0">2027</div>
                    <div className="relative md:pl-8 pl-8">
                        <div className="absolute -left-[5px] md:-left-[5px] top-2 w-3 h-3 rounded-full bg-background border border-foreground/40"></div>
                        <h3 className="text-2xl font-serif mb-4">Phase 3: Studio Launch</h3>
                        <p className="leading-relaxed max-w-md">
                            First enterprise deployments. Limited initial availability for waitlisted partners.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
