"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AsciiArt from "@/components/AsciiArt";

const MEMORY_OPTIONS = [
  { label: "4GB", price: 0, score: 20 },
  { label: "8GB", price: 40, score: 40 },
  { label: "16GB", price: 80, score: 80 },
];

const BASE_STORAGE_OPTIONS = [
  { label: "256GB", price: 0, score: 10 },
  { label: "512GB", price: 50, score: 20 },
  { label: "1TB", price: 100, score: 40 },
];

const EXPANSION_OPTIONS = [
  { label: "None", price: 0, score: 0 },
  { label: "256GB", price: 40, score: 10 },
  { label: "512GB", price: 70, score: 20 },
  { label: "1TB", price: 120, score: 40 },
  { label: "2TB", price: 200, score: 60 },
  { label: "4TB", price: 350, score: 100 },
];

export default function FoundationBuilder() {
  const [memory, setMemory] = useState(MEMORY_OPTIONS[0]);
  const [baseStorage, setBaseStorage] = useState(BASE_STORAGE_OPTIONS[0]);
  const [expansion, setExpansion] = useState(EXPANSION_OPTIONS[0]);

  const basePrice = 299;
  const totalPrice = basePrice + memory.price + baseStorage.price + expansion.price;
  
  const hasExpansion = expansion.label !== "None";

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-16 text-center">
          Build Your Foundation.
        </h2>

        <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl shadow-black/5 dark:shadow-white/5 overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Visualizer */}
            <div className="lg:col-span-5 space-y-8 sticky top-8">
              <div className="aspect-square bg-gray-100 dark:bg-zinc-900 rounded-2xl border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center relative overflow-hidden group transition-all duration-500">
                <div className={`absolute inset-0 transition-opacity duration-500 ${hasExpansion ? 'opacity-30' : 'opacity-20'}`}>
                  {/* Dynamic ASCII Art based on stack height */}
                  <AsciiArt 
                    width={60} 
                    height={hasExpansion ? 80 : 50} 
                    numCircles={hasExpansion ? 45 : 30} 
                  />
                </div>
                
                <div className="relative z-10 text-center space-y-2">
                  <div className="text-3xl font-medium tracking-tight">
                    {hasExpansion ? "Foundation + Stack" : "Foundation"}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest opacity-50">
                    {hasExpansion ? "Expanded Configuration" : "Base Configuration"}
                  </div>
                </div>
              </div>

              {/* Summary List */}
              <div className="space-y-4 font-mono text-sm border-t border-black/10 dark:border-white/10 pt-6">
                <div className="flex justify-between">
                  <span className="opacity-60">Core</span>
                  <span>Raspberry Pi CM5</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Memory</span>
                  <span className={memory.price > 0 ? "text-orange-500" : ""}>{memory.label} LPDDR4</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Base Storage</span>
                  <span className={baseStorage.price > 0 ? "text-orange-500" : ""}>{baseStorage.label} NVMe</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Expansion</span>
                  <span className={expansion.price > 0 ? "text-orange-500" : ""}>{expansion.label === "None" ? "Empty Slot" : `${expansion.label} SSD`}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Configurator */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Memory Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xl font-medium">Memory</label>
                  <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">Unified LPDDR4</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {MEMORY_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setMemory(opt)}
                      className={`
                        relative border rounded-xl py-4 px-4 text-center font-mono text-sm transition-all duration-200
                        flex flex-col items-center justify-center gap-1
                        ${memory.label === opt.label
                          ? 'border-orange-500 bg-orange-500/5 text-orange-500 ring-1 ring-orange-500 shadow-lg shadow-orange-500/10 scale-[1.02]' 
                          : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5'}
                      `}
                    >
                      <span className="font-bold text-base">{opt.label}</span>
                      {opt.price > 0 && <span className="text-[10px] opacity-70">+{opt.price}</span>}
                    </button>
                  ))}
                </div>
                <p className="text-xs opacity-50 font-mono">
                  Higher memory improves multitasking and container performance.
                </p>
              </div>

              {/* Base Storage Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xl font-medium">Base Storage</label>
                  <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">CM5 NVMe</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {BASE_STORAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setBaseStorage(opt)}
                      className={`
                        relative border rounded-xl py-4 px-4 text-center font-mono text-sm transition-all duration-200
                        flex flex-col items-center justify-center gap-1
                        ${baseStorage.label === opt.label
                          ? 'border-orange-500 bg-orange-500/5 text-orange-500 ring-1 ring-orange-500 shadow-lg shadow-orange-500/10 scale-[1.02]' 
                          : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5'}
                      `}
                    >
                      <span className="font-bold text-base">{opt.label}</span>
                      {opt.price > 0 && <span className="text-[10px] opacity-70">+{opt.price}</span>}
                    </button>
                  ))}
                </div>
                <p className="text-xs opacity-50 font-mono">
                  Primary OS and application storage. Fast NVMe speeds.
                </p>
              </div>

              {/* Expansion Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xl font-medium">Expansion Module</label>
                  <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">SATA SSD Sled</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {EXPANSION_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setExpansion(opt)}
                      className={`
                        relative border rounded-xl py-4 px-4 text-center font-mono text-sm transition-all duration-200
                        flex flex-col items-center justify-center gap-1
                        ${expansion.label === opt.label
                          ? 'border-orange-500 bg-orange-500/5 text-orange-500 ring-1 ring-orange-500 shadow-lg shadow-orange-500/10 scale-[1.02]' 
                          : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5'}
                      `}
                    >
                      <span className="font-bold text-base">{opt.label}</span>
                      {opt.price > 0 && <span className="text-[10px] opacity-70">+{opt.price}</span>}
                    </button>
                  ))}
                </div>
                <p className="text-xs opacity-50 font-mono">
                  Mass storage for media, backups, and data.
                </p>
              </div>

              {/* Total & CTA */}
              <div className="pt-8 border-t border-black/10 dark:border-white/10">
                <div className="flex justify-between items-end mb-8">
                  <div className="space-y-1">
                    <span className="block font-mono text-xs uppercase tracking-widest opacity-60">Estimated Total</span>
                    <span className="block text-sm opacity-50">Free Shipping</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-4xl font-medium tracking-tight">${totalPrice}</span>
                    <span className="block text-xs text-orange-500 font-mono mt-1">Ready to Ship</span>
                  </div>
                </div>
                <Link
                  href="/#preorder"
                  className="block w-full py-5 text-center text-lg font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white hover:border-orange-500 transition-all duration-300 rounded-2xl"
                >
                  Reserve Configuration
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
