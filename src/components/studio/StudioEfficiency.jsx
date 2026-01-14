"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Buildings, Gavel, Code, Crosshair } from "@phosphor-icons/react";

const INDUSTRIES = [
    { id: "healthcare", label: "Healthcare", icon: Buildings },
    { id: "legal", label: "Legal", icon: Gavel },
    { id: "tech", label: "Technology", icon: Code },
    { id: "defense", label: "Defense", icon: Crosshair },
];

export default function StudioEfficiency() {
    const [activeTab, setActiveTab] = useState(INDUSTRIES[2]);

    return (
        <section className="container-swiss py-32 bg-gray-50 dark:bg-[#0A0A0A] border-y border-black/5 dark:border-white/5">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">Efficiency by Design</h2>
                    <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                        Cornerstone adapts to your industry's specific compliance and cost profiles.
                    </p>
                </div>

                {/* Apple-style Segmented Control */}
                <div className="flex justify-center mb-20">
                    <div className="bg-gray-200 dark:bg-white/10 p-1 rounded-full inline-flex relative">
                        {INDUSTRIES.map((ind) => (
                            <button
                                key={ind.id}
                                onClick={() => setActiveTab(ind)}
                                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 ${
                                    activeTab.id === ind.id ? "text-foreground" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                            >
                                {activeTab.id === ind.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-black rounded-full shadow-sm"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <ind.icon weight="fill" className={activeTab.id === ind.id ? "text-foreground" : "opacity-50"} />
                                    {ind.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Minimalist Visualization */}
                <div className="bg-white dark:bg-[#111] rounded-[32px] p-12 shadow-xl border border-black/5 dark:border-white/5">
                    <div className="grid md:grid-cols-2 gap-16 md:gap-24">
                        
                        {/* Left: Compliance Checklist */}
                        <div>
                            <h3 className="text-lg font-medium mb-8">Compliance Report</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                            <Check weight="bold" size={12} />
                                        </div>
                                        <div className="flex-1 border-b border-gray-100 dark:border-white/5 pb-4 group-last:border-0">
                                            <div className="text-sm font-medium text-foreground">
                                                {activeTab.id === 'healthcare' && i === 0 ? 'HIPAA Complaint' : 
                                                 activeTab.id === 'defense' && i === 0 ? 'IL6 Isolation' : 'SOC2 Type II'}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5">Verified Audit Log</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Cost Comparison (Clean Bars) */}
                        <div>
                            <h3 className="text-lg font-medium mb-8">Cost Projection</h3>
                            <div className="space-y-8">
                                {/* Cloud */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-gray-500">
                                        <span>Public Cloud</span>
                                        <span className="text-red-500 font-medium">+184%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            key={activeTab.id}
                                            initial={{ width: 0 }}
                                            animate={{ width: "80%" }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className="h-full bg-gray-300 dark:bg-gray-600 rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Cornerstone */}
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-gray-500">
                                        <span>Cornerstone</span>
                                        <span className="text-green-600 dark:text-green-400 font-medium">Fixed</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "20%" }}
                                            className="h-full bg-foreground rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
