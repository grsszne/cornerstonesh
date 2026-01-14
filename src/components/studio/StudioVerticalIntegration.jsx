"use client";

import { motion } from "framer-motion";

export default function StudioVerticalIntegration() {
    return (
        <section className="container-swiss py-32 space-y-48">
            
            {/* Section 1: The Monolith (Hardware/Chassis) */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                <div className="order-2 lg:order-1">
                     {/* Visual Placeholder: Abstract Aluminum Block */}
                     <div className="bg-gradient-to-br from-gray-200 to-gray-400 dark:from-[#333] dark:to-black aspect-square rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-30 mix-blend-overlay"></div>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                        
                        {/* Lighting Effect */}
                        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-white/5 rotate-45 group-hover:rotate-180 transition-transform duration-[3s] ease-in-out"></div>
                     </div>
                </div>
                <div className="order-1 lg:order-2">
                    <h3 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Milled from <br />the solid.</h3>
                    <p className="text-xl text-gray-500 font-light leading-relaxed mb-8">
                        The chassis is machined from a single block of aerospace-grade aluminum. It is not just a container; it is a thermal sink, a Faraday cage, and a statement of permanence.
                    </p>
                    <div className="flex gap-12 font-mono text-xs text-gray-400 uppercase tracking-widest">
                        <div>
                            <span className="block text-foreground mb-1">Material</span>
                            6061-T6 Aluminum
                        </div>
                        <div>
                            <span className="block text-foreground mb-1">Process</span>
                            5-Axis CNC
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Thermals (Silence) */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                <div>
                    <h3 className="text-4xl md:text-6xl font-serif text-foreground mb-6">High Performance. <br />Zero Decibels.</h3>
                    <p className="text-xl text-gray-500 font-light leading-relaxed mb-8">
                        Traditional servers belong in a closet. Studio belongs on your desk. A custom vapor chamber cooling system moves 300W of heat without a whisper.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>
                        <div className="flex justify-between items-end">
                            <span className="text-gray-400 font-mono text-sm uppercase tracking-wider">Rack Server</span>
                            <span className="text-4xl font-serif text-gray-300">72 dBA</span>
                        </div>
                        <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>
                        <div className="flex justify-between items-end">
                            <span className="text-foreground font-mono text-sm uppercase tracking-wider">Studio</span>
                            <span className="text-6xl font-serif text-foreground">18 dBA</span>
                        </div>
                         <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>
                    </div>
                </div>
                <div>
                     {/* Visual Placeholder: Airflow / Vapor */}
                     <div className="bg-black/5 dark:bg-white/5 aspect-square rounded-[40px] relative overflow-hidden flex items-center justify-center">
                        <div className="w-[80%] h-[80%] rounded-full border border-gray-400/20 animate-[spin_10s_linear_infinite]"></div>
                        <div className="w-[60%] h-[60%] rounded-full border border-gray-400/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                        <div className="w-[40%] h-[40%] rounded-full border border-gray-400/20 animate-[spin_20s_linear_infinite]"></div>
                        
                        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-t from-blue-500/10 to-purple-500/10"></div>
                     </div>
                </div>
            </div>

            {/* Section 3: Kernel (Software Harmony) */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                <div className="order-2 lg:order-1">
                     {/* Visual Placeholder: Silicon / Code */}
                     <div className="bg-[#050505] aspect-square rounded-[40px] shadow-2xl relative overflow-hidden p-8 flex flex-col justify-center">
                        <div className="text-green-500/80 font-mono text-xs leading-relaxed opacity-50 blur-[1px]">
                             0x0045A: MOV RAX, [RDI + 0x20]<br/>
                             0x0045E: XOR RBX, RBX<br/>
                             0x00461: JMP 0x00480<br/>
                             ...
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]"></div>
                        
                        <div className="relative z-10 text-center">
                            <div className="text-white text-5xl font-serif mb-2">0.2ms</div>
                            <div className="text-gray-500 font-mono text-sm uppercase tracking-widest">Inference Latency</div>
                        </div>
                     </div>
                </div>
                <div className="order-1 lg:order-2">
                    <h3 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Software that knows<br />its hardware.</h3>
                    <p className="text-xl text-gray-500 font-light leading-relaxed mb-8">
                        We don't use generic Linux distros. We built a custom kernel with zero-copy memory access and GPU-direct storage, stripping away 90% of the OS overhead.
                    </p>
                    <ul className="space-y-4 font-mono text-sm text-gray-500">
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>
                            NO-BLOAT KERNEL
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>
                            DIRECT-IO STORAGE
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>
                            PRE-COMPILED CUDA BINARIES
                        </li>
                    </ul>
                </div>
            </div>

        </section>
    );
}
