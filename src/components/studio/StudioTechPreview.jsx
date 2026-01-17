"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cube } from "@phosphor-icons/react";
import Link from "next/link";

export default function StudioTechPreview() {
  return (
    <section className="py-32 container-swiss overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            
            {/* Animation Side */}
            <div className="relative h-64 md:h-96 flex items-center justify-center">
                
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-foreground/10"></div>
                
                {/* Moving Particles */}
                 <motion.div 
                    animate={{ x: [0, 400], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-foreground to-transparent"
                 ></motion.div>


                <div className="flex justify-between w-full max-w-lg relative z-10">
                    {/* Foundation Node */}
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-foreground/20 bg-background flex flex-col items-center justify-center shadow-2xl relative"
                    >
                        <div className="w-8 h-8 md:w-12 md:h-12 border border-foreground/30 rounded flex items-center justify-center mb-2">
                            <div className="w-full h-px bg-foreground/30"></div>
                        </div>
                        <span className="text-xs font-mono uppercase tracking-widest text-foreground/50">Foundation</span>
                        {/* Pulse */}
                        <div className="absolute -inset-4 border border-foreground/5 rounded-3xl animate-[ping_3s_infinite]"></div>
                    </motion.div>

                    {/* Studio Node */}
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-foreground bg-foreground text-background flex flex-col items-center justify-center shadow-2xl relative"
                    >
                        <Cube weight="fill" className="text-3xl md:text-4xl mb-2" />
                        <span className="text-xs font-mono uppercase tracking-widest opacity-80">Studio</span>
                         {/* Glow */}
                        <div className="absolute -inset-4 bg-foreground/10 rounded-3xl blur-xl"></div>
                    </motion.div>
                </div>
            </div>

            {/* Text Side */}
            <div>
                 <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                 >
                    <h2 className="text-4xl md:text-5xl font-serif mb-8">Built on Foundation</h2>
                    <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                        Studio runs the same integrated software stack that powers Foundation. Email, files, calendar, and notes—connected by local intelligence.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 mr-4"></div>
                            <p className="text-foreground/80">Foundation proves the software works today.</p>
                        </div>
                        <div className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 mr-4"></div>
                            <p className="text-foreground/80">Studio scales that software for the enterprise.</p>
                        </div>
                        <div className="flex items-start">
                             <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 mr-4"></div>
                            <p className="text-foreground/80">Look at Foundation to see what Studio will feel like.</p>
                        </div>
                    </div>

                    <div className="mt-12">
                         <Link href="/foundation" className="group inline-flex items-center text-lg font-medium border-b border-foreground/30 pb-1 hover:border-foreground transition-colors">
                            Explore Foundation Architecture
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                         </Link>
                    </div>
                 </motion.div>
            </div>
        </div>
    </section>
  );
}
