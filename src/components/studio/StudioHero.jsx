"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "@phosphor-icons/react";

export default function StudioHero() {
    const [monthlySpend, setMonthlySpend] = useState(6000);
    const [isRunning, setIsRunning] = useState(false);

    // ROI Calc
    const fiveYearSavings = ((monthlySpend * 12 * 5) - (12000 + (300 * 12 * 5)));

    return (
        <section className="container-swiss pt-24 md:pt-32 pb-32">
            
            {/* Header: Centered, Elegant, Serif */}
            <div className="text-center max-w-4xl mx-auto mb-24">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-8 tracking-tight">
                    Your Intelligence. <br />
                    <span className="italic text-gray-400">Boxed.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 font-sans font-light max-w-2xl mx-auto leading-relaxed">
                    The privacy of air-gapped infrastructure. <br className="hidden md:block" />
                    The simplicity of a consumer appliance.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                
                {/* 1. ROI: The "Magic" Card */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/5 dark:to-white/0 rounded-[40px] -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    
                    <div className="bg-white dark:bg-[#111] rounded-[32px] p-8 md:p-12 shadow-2xl border border-black/5 dark:border-white/10 relative overflow-hidden">
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-xs font-sans uppercase tracking-[0.2em] text-gray-400 mb-6">Annual Savings</span>
                            
                            <div className="text-5xl md:text-6xl font-serif text-foreground mb-2">
                                ${(fiveYearSavings / 5).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-sm text-gray-400 font-light mb-12">per year</div>

                            {/* Slider */}
                            <div className="w-full max-w-xs relative mb-8">
                                <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                                    <span>Scale</span>
                                    <span>${monthlySpend.toLocaleString()}/mo</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="1000" 
                                    max="50000" 
                                    step="500" 
                                    value={monthlySpend}
                                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                                    className="w-full appearance-none h-1 bg-gray-200 dark:bg-white/20 rounded-full outline-none cursor-pointer accent-black dark:accent-white"
                                />
                            </div>

                            <button className="bg-foreground text-background rounded-full px-8 py-4 font-medium hover:scale-105 transition-transform duration-300">
                                Reserve Foundation
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Terminal: Floating Glass */}
                <div className="relative">
                    {/* Glass Pane */}
                    <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-[24px] border border-white/20 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
                        
                        {/* Traffic Lights */}
                        <div className="flex items-center gap-2 px-6 py-5 border-b border-black/5 dark:border-white/5">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner"></div>
                        </div>

                        {/* Minimal Code */}
                        <div className="p-8 font-mono text-sm leading-loose">
                            <div className="text-gray-400"># Connect to local inference engine</div>
                            <div className="flex gap-2 text-foreground">
                                <span className="text-purple-500">const</span>
                                <span>foundation</span>
                                <span className="text-gray-400">=</span>
                                <span className="text-blue-500">new</span>
                                <span>Cornerstone</span>();
                            </div>
                            <div className="h-4"></div>
                            <div className="flex gap-2">
                                <span className="text-purple-500">await</span>
                                <span>foundation.chat({`{`}</span>
                            </div>
                            <div className="pl-6 text-gray-500">
                                model: <span className="text-green-600 dark:text-green-400">"gpt-4-local"</span>,
                            </div>
                            <div className="pl-6 text-gray-500">
                                secure: <span className="text-blue-500">true</span>
                            </div>
                            <div>{`}`});</div>
                            
                            <div className="h-8"></div>
                            
                            {/* Result Pill */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-full text-xs animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-500">Connected • 18ms latency</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
