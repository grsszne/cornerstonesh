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
  // Start with no expansion modules
  const [expansionModules, setExpansionModules] = useState([]);

  const basePrice = 299;
  
  // Calculate total price
  const modulesPrice = expansionModules.reduce((sum, mod) => sum + mod.price, 0);
  const totalPrice = basePrice + memory.price + baseStorage.price + modulesPrice;
  
  const hasExpansion = expansionModules.length > 0;
  
  // Calculate visualizer props based on stack height
  const stackHeight = 50 + (expansionModules.length * 15);
  const stackCircles = 2 + (expansionModules.length * 10);

  // Filter out "None" for the individual module selectors
  const MODULE_OPTIONS = EXPANSION_OPTIONS.filter(opt => opt.label !== "None");

  const addModule = () => {
    if (expansionModules.length < 6) {
      // Default to 1TB for new modules
      const defaultOption = MODULE_OPTIONS.find(opt => opt.label === "1TB") || MODULE_OPTIONS[0];
      setExpansionModules([...expansionModules, { ...defaultOption, id: Date.now() }]);
    }
  };

  const removeModule = (index) => {
    const newModules = [...expansionModules];
    newModules.splice(index, 1);
    setExpansionModules(newModules);
  };

  const updateModule = (index, option) => {
    const newModules = [...expansionModules];
    newModules[index] = { ...option, id: newModules[index].id };
    setExpansionModules(newModules);
  };

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
                    width={125} 
                    height={125} 
                    numCircles={stackCircles} 
                  />
                </div>
                
                <div className="relative z-10 text-center space-y-2">
                  <div className="text-3xl font-medium tracking-tight">
                    {hasExpansion ? `Foundation + ${expansionModules.length}` : "Foundation"}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest opacity-50">
                    {hasExpansion ? `${expansionModules.length}x Expansion Stack` : "Base Configuration"}
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
                
                {/* Expansion Summary */}
                <div className="border-t border-black/5 dark:border-white/5 pt-2 mt-2">
                  <span className="block opacity-60 mb-2">Expansion Stack</span>
                  {expansionModules.length === 0 ? (
                    <span className="opacity-40 italic">No modules added</span>
                  ) : (
                    <div className="space-y-1">
                      {expansionModules.map((mod, i) => (
                        <div key={mod.id} className="flex justify-between pl-2 border-l-2 border-orange-500/20">
                          <span>Module {i + 1}</span>
                          <span className="text-orange-500">{mod.label} SSD</span>
                        </div>
                      ))}
                    </div>
                  )}
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

              {/* Expansion Modules Section */}
              <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
                <div className="flex justify-between items-end">
                  <label className="text-xl font-medium">Expansion Stack</label>
                  <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">
                    {expansionModules.length}/6 Modules
                  </span>
                </div>

                {/* Module List */}
                <div className="space-y-6">
                  {expansionModules.map((module, index) => (
                    <div key={module.id} className="animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-sm font-medium">Module {index + 1}</span>
                        <button 
                          onClick={() => removeModule(index)}
                          className="text-xs text-red-500 hover:text-red-600 font-mono uppercase tracking-wider hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {MODULE_OPTIONS.map((opt) => (
                          <button
                            key={opt.label}
                            onClick={() => updateModule(index, opt)}
                            className={`
                              relative border rounded-lg py-2 px-1 text-center font-mono text-xs transition-all duration-200
                              ${module.label === opt.label
                                ? 'border-orange-500 bg-orange-500/5 text-orange-500 ring-1 ring-orange-500' 
                                : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5'}
                            `}
                          >
                            <span className="font-bold block">{opt.label}</span>
                            {opt.price > 0 && <span className="text-[9px] opacity-70 block">+{opt.price}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Module Button */}
                {expansionModules.length < 6 && (
                  <button
                    onClick={addModule}
                    className="w-full py-4 border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl flex items-center justify-center gap-2 text-black/40 dark:text-white/40 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/5 transition-all duration-200 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-200">+</span>
                    <span className="font-mono text-sm uppercase tracking-wider">Add Storage Module</span>
                  </button>
                )}
                
                <p className="text-xs opacity-50 font-mono">
                  Mix and match up to 6 modules. Each module adds physical height to your Foundation.
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
