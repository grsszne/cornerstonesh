"use client";

import { motion } from "framer-motion";

export default function StudioTechStack() {
    return (
        <section className="container-swiss py-32 overflow-hidden">
            <div className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">Inside the Machine</h2>
                <p className="text-gray-500">Full stack sovereignty. From silicon to software.</p>
            </div>

            <div className="max-w-5xl mx-auto relative">
                
                {/* Visual Connector Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-white/10 to-transparent -translate-x-1/2"></div>
                
                {/* Stack Layers */}
                <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-1 relative">
                    
                    {/* Layer 1: Software */}
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white dark:bg-[#111] rounded-[24px] p-8 md:p-10 shadow-2xl border border-black/5 dark:border-white/5 md:w-[60%] md:ml-auto z-30 relative"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-serif mb-2">CornerstoneOS</h3>
                                <p className="text-sm text-gray-400">Layer 03 • Application</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-gray-500">v1.2.0</div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-sm text-gray-500">
                             <div>
                                <strong className="block text-foreground mb-1">Model Server</strong>
                                Open-source vLLM engine pre-configured for throughput.
                             </div>
                             <div>
                                <strong className="block text-foreground mb-1">API Compatibility</strong>
                                Drop-in replacement for OpenAI endpoints.
                             </div>
                        </div>
                    </motion.div>

                    {/* Layer 2: Firmware/OS */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 dark:bg-[#161616] rounded-[24px] p-8 md:p-10 shadow-xl border border-black/5 dark:border-white/5 md:w-[60%] md:mx-auto z-20 relative md:-mt-12"
                    >
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-serif mb-2">Debian Kernel</h3>
                                <p className="text-sm text-gray-400">Layer 02 • System</p>
                            </div>
                        </div>
                         <div className="grid grid-cols-2 gap-8 text-sm text-gray-500">
                             <div>
                                <strong className="block text-foreground mb-1">Security</strong>
                                Hardened Linux kernel with ZFS encryption.
                             </div>
                             <div>
                                <strong className="block text-foreground mb-1">Updates</strong>
                                Over-the-air security patches.
                             </div>
                        </div>
                    </motion.div>

                    {/* Layer 3: Hardware */}
                    <motion.div 
                        whileHover={{ y: 10 }}
                        className="bg-black text-white rounded-[24px] p-8 md:p-10 shadow-xl md:w-[60%] md:mr-auto z-10 relative md:-mt-12"
                    >
                         <div className="flex items-start justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-serif mb-2">Blackwell GPU</h3>
                                <p className="text-white/40 text-sm">Layer 01 • Silicon</p>
                            </div>
                            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-mono text-white/80">96GB VRAM</div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-sm text-white/60">
                             <div>
                                <strong className="block text-white mb-1">Processing</strong>
                                NVIDIA RTX 6000 Ada Generation.
                             </div>
                             <div>
                                <strong className="block text-white mb-1">Architecture</strong>
                                4nm Process Technology.
                             </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
