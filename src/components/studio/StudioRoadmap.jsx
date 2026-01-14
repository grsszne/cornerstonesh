"use client";

import { motion } from "framer-motion";

export default function StudioRoadmap() {
    return (
        <section className="container-swiss py-32 mb-20">
             <div className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">The Path Forward</h2>
            </div>
            
            <div className="max-w-2xl mx-auto relative pl-8 md:pl-0 border-l border-gray-100 dark:border-white/5 md:border-0">
                
                {/* 2026 */}
                <div className="md:flex gap-12 items-baseline mb-20 relative">
                    <div className="hidden md:block w-32 text-right text-gray-400 font-serif text-lg shrink-0">Spring 2026</div>
                    <div className="relative pb-12">
                        {/* Dot */}
                        <div className="absolute -left-[37px] md:-left-[29px] top-2 w-3 h-3 rounded-full bg-foreground border-4 border-white dark:border-black"></div>
                        
                        <h3 className="text-2xl font-medium mb-4">Foundation Launch</h3>
                        <p className="text-gray-500 leading-relaxed max-w-md">
                            The journey begins with our consumer release. A beautiful, silent NAS designed for the home, establishing our manufacturing capability.
                        </p>
                    </div>
                </div>

                {/* 2027 */}
                <div className="md:flex gap-12 items-baseline relative">
                     <div className="hidden md:block w-32 text-right text-foreground font-serif text-lg shrink-0">2027</div>
                    <div>
                         {/* Dot */}
                        <div className="absolute -left-[37px] md:-left-[29px] top-2 w-3 h-3 rounded-full bg-white border-4 border-foreground"></div>
                        
                        <h3 className="text-2xl font-medium mb-4 text-foreground">Cornerstone Studio</h3>
                        <p className="text-gray-500 leading-relaxed max-w-md">
                            Enterprise infrastructure rollout. We bring the privacy and power of Foundation to the scale of the modern SaaS enterprise.
                        </p>
                        
                        <div className="mt-8 flex gap-4">
                            <button className="text-sm font-medium border-b border-foreground pb-0.5 hover:opacity-50 transition-opacity">
                                Join Beta Waitlist
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
