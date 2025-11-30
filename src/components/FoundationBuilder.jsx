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

const STORAGE_OPTIONS = [
  { label: "256GB", price: 40, score: 10, type: "storage" },
  { label: "512GB", price: 70, score: 20, type: "storage" },
  { label: "1TB", price: 120, score: 40, type: "storage" },
  { label: "2TB", price: 200, score: 60, type: "storage" },
  { label: "4TB", price: 350, score: 100, type: "storage" },
];

const PERIPHERAL_OPTIONS = [
  { label: "UPS", price: 60, score: 30, type: "peripheral", description: "Uninterruptible Power Supply. Provides backup power for the foundation." },
  { label: "2.5GbE", price: 50, score: 25, type: "peripheral", description: "2.5 Gigabit Ethernet. Provides high-speed ethernet connection upgrades for the foundation." },
  { label: "GPIO", price: 20, score: 15, type: "peripheral", description: "GPIO Revealer Module. Intended for developers. Reveals GPIO pins for custom development." },
];

const ROOF_OPTIONS = [
  { label: "None", price: 0, id: "none" },
  { label: "Bare Aluminum", price: 0, id: "bare" },
  { label: "Nightlight", price: 40, id: "light" },
  { label: "SD Reader", price: 40, id: "sd" },
  { label: "Nightlight + SD", price: 70, id: "both" },
];

const ROOF_FAN_PRICE = 20;

export default function FoundationBuilder() {
  const [memory, setMemory] = useState(MEMORY_OPTIONS[0]);
  const [baseStorage, setBaseStorage] = useState(BASE_STORAGE_OPTIONS[0]);
  
  // Separate state for storage and peripherals
  const [storageModules, setStorageModules] = useState([]);
  const [peripheralModules, setPeripheralModules] = useState([]);
  
  const [roof, setRoof] = useState(ROOF_OPTIONS[1]); // Default to Bare Aluminum
  const [roofFan, setRoofFan] = useState(false);
  
  // UI State
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState({
    storage: false,
    peripherals: false,
    roof: false
  });

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const basePrice = 299;
  
  // Calculate total price
  const storagePrice = storageModules.reduce((sum, mod) => sum + mod.price, 0);
  const peripheralPrice = peripheralModules.reduce((sum, mod) => sum + mod.price, 0);
  const roofPrice = roof.price + (roofFan ? ROOF_FAN_PRICE : 0);
  const totalPrice = basePrice + memory.price + baseStorage.price + storagePrice + peripheralPrice + roofPrice;
  
  const totalModules = storageModules.length + peripheralModules.length;
  const hasExpansion = totalModules > 0;
  
  // Calculate visualizer props based on stack height
  const stackHeight = 50 + (totalModules * 15);
  const stackCircles = 2 + (totalModules * 10);

  const addStorageModule = (option) => {
    if (storageModules.length < 6) {
      setStorageModules([...storageModules, { ...option, id: Date.now() }]);
    }
  };

  const removeStorageModule = (index) => {
    const newModules = [...storageModules];
    newModules.splice(index, 1);
    setStorageModules(newModules);
  };

  const updateStorageModule = (index, option) => {
    const newModules = [...storageModules];
    newModules[index] = { ...option, id: newModules[index].id };
    setStorageModules(newModules);
  };

  const addPeripheralModule = (option) => {
    setPeripheralModules([...peripheralModules, { ...option, id: Date.now() }]);
  };

  const removePeripheralModule = (index) => {
    const newModules = [...peripheralModules];
    newModules.splice(index, 1);
    setPeripheralModules(newModules);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
            Build Your Foundation.
          </h2>
          <p className="text-sm font-mono opacity-50">
            Not sure what specs you need?{" "}
            <Link href="/foundation/guide" className="text-orange-500 hover:underline">
              View Hardware Guide →
            </Link>
          </p>
        </div>

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
                    {hasExpansion ? `Foundation + ${totalModules}` : "Foundation"}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest opacity-50">
                    {hasExpansion ? `${totalModules}x Expansion Stack` : "Base Configuration"}
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
                
                {/* Storage Summary */}
                {storageModules.length > 0 && (
                  <div className="border-t border-black/5 dark:border-white/5 pt-2 mt-2">
                    <span className="block opacity-60 mb-2">Storage Stack</span>
                    <div className="space-y-1">
                      {storageModules.map((mod, i) => (
                        <div key={mod.id} className="flex justify-between pl-2 border-l-2 border-orange-500/20">
                          <span>Storage {i + 1}</span>
                          <span className="text-orange-500">{mod.label} SSD</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Peripheral Summary */}
                {peripheralModules.length > 0 && (
                  <div className="border-t border-black/5 dark:border-white/5 pt-2 mt-2">
                    <span className="block opacity-60 mb-2">Peripherals</span>
                    <div className="space-y-1">
                      {peripheralModules.map((mod, i) => (
                        <div key={mod.id} className="flex justify-between pl-2 border-l-2 border-blue-500/20">
                          <span>{mod.label}</span>
                          <span className="text-orange-500">Included</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Roof Summary */}
                <div className="border-t border-black/5 dark:border-white/5 pt-2 mt-2">
                   <div className="flex justify-between">
                    <span className="opacity-60">Roof</span>
                    <span className={roof.price > 0 ? "text-orange-500" : ""}>{roof.label}</span>
                  </div>
                  {roofFan && (
                    <div className="flex justify-between pl-2 border-l-2 border-orange-500/20 mt-1">
                      <span>Cooling</span>
                      <span className="text-orange-500">Active Fan</span>
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

              {/* Storage Expansion Section */}
              <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
                <button 
                  onClick={() => toggleSection('storage')}
                  className="w-full flex justify-between items-center group"
                >
                  <div className="flex items-end gap-4">
                    <label className="text-xl font-medium cursor-pointer">Storage Expansion</label>
                    <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">
                      {storageModules.length}/6 Modules
                    </span>
                  </div>
                  <span className={`transform transition-transform duration-200 ${collapsed.storage ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {!collapsed.storage && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Storage Module List */}
                    <div className="space-y-3">
                      {storageModules.map((module, index) => (
                        <div key={module.id} className="animate-in fade-in slide-in-from-top-4 duration-300">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-mono text-xs font-medium opacity-70">Storage Module {index + 1}</span>
                            <button 
                              onClick={() => removeStorageModule(index)}
                              className="text-[10px] text-red-500 hover:text-red-600 font-mono uppercase tracking-wider hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {STORAGE_OPTIONS.map((opt) => (
                              <button
                                key={opt.label}
                                onClick={() => updateStorageModule(index, opt)}
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

                    {/* Add Storage Button */}
                    {storageModules.length < 6 && (
                      <button
                        onClick={() => addStorageModule(STORAGE_OPTIONS.find(opt => opt.label === "1TB"))}
                        className="w-full py-4 border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl flex items-center justify-center gap-2 text-black/40 dark:text-white/40 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/5 transition-all duration-200 group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">+</span>
                        <span className="font-mono text-sm uppercase tracking-wider">Add Storage Module</span>
                      </button>
                    )}
                    
                    <p className="text-xs opacity-50 font-mono">
                      Add up to 6 NVMe storage modules for massive capacity.
                    </p>
                  </div>
                )}
              </div>

              {/* Peripheral Modules Section */}
              <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
                <button 
                  onClick={() => toggleSection('peripherals')}
                  className="w-full flex justify-between items-center group"
                >
                  <div className="flex items-end gap-4">
                    <label className="text-xl font-medium cursor-pointer">Peripheral Modules</label>
                    <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">
                      Functionality
                    </span>
                  </div>
                  <span className={`transform transition-transform duration-200 ${collapsed.peripherals ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {!collapsed.peripherals && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Peripheral List */}
                    <div className="space-y-2">
                      {peripheralModules.map((module, index) => (
                        <div key={module.id} className="animate-in fade-in slide-in-from-top-4 duration-300 p-3 border border-black/10 dark:border-white/10 rounded-xl flex justify-between items-center bg-white dark:bg-zinc-900">
                          <div>
                            <span className="font-bold font-mono text-sm block">{module.label} Module</span>
                            <span className="text-xs opacity-60 line-clamp-1">{module.description}</span>
                          </div>
                          <button 
                            onClick={() => removePeripheralModule(index)}
                            className="text-xs text-red-500 hover:text-red-600 font-mono uppercase tracking-wider hover:underline whitespace-nowrap ml-4"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Peripheral Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {PERIPHERAL_OPTIONS.filter(opt => !peripheralModules.some(m => m.label === opt.label)).map(opt => (
                            <button
                                key={opt.label}
                                onClick={() => addPeripheralModule(opt)}
                                className="py-3 border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl flex flex-col items-center justify-center gap-1 text-black/40 dark:text-white/40 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/5 transition-all duration-200 group"
                            >
                                <span className="font-mono text-xs uppercase tracking-wider text-center">Add {opt.label}</span>
                                <span className="text-[10px] opacity-60">+${opt.price}</span>
                            </button>
                        ))}
                    </div>
                    
                    <p className="text-xs opacity-50 font-mono">
                      Add functionality modules. These stack with your storage modules.
                    </p>
                  </div>
                )}
              </div>

              {/* Roof Configuration */}
              <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
                <button 
                  onClick={() => toggleSection('roof')}
                  className="w-full flex justify-between items-center group"
                >
                  <div className="flex items-end gap-4">
                    <label className="text-xl font-medium cursor-pointer">Roof Configuration</label>
                    <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">Top Cap</span>
                  </div>
                  <span className={`transform transition-transform duration-200 ${collapsed.roof ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {!collapsed.roof && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {ROOF_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setRoof(opt)}
                          className={`
                            relative border rounded-xl py-3 px-2 text-center font-mono text-xs transition-all duration-200
                            flex flex-col items-center justify-center gap-1 h-20
                            ${roof.id === opt.id
                              ? 'border-orange-500 bg-orange-500/5 text-orange-500 ring-1 ring-orange-500 shadow-lg shadow-orange-500/10 scale-[1.02]' 
                              : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5'}
                          `}
                        >
                          <span className="font-bold leading-tight">{opt.label}</span>
                          {opt.price > 0 && <span className="text-[9px] opacity-70">+{opt.price}</span>}
                        </button>
                      ))}
                    </div>

                    {/* Roof Fan Toggle */}
                    <button
                        onClick={() => setRoofFan(!roofFan)}
                        className={`
                            w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200
                            ${roofFan 
                                ? 'border-orange-500 bg-orange-500/5 text-orange-500 ring-1 ring-orange-500' 
                                : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'}
                        `}
                    >
                        <div className="flex flex-col items-start">
                            <span className="font-bold font-mono text-sm">Active Cooling Fan</span>
                            <span className="text-xs opacity-60 text-left">Improves convection and thermals</span>
                        </div>
                        <div className="flex items-center gap-3">
                             <span className="text-xs font-mono opacity-70">+{ROOF_FAN_PRICE}</span>
                             <div className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${roofFan ? 'bg-orange-500' : 'bg-gray-200 dark:bg-zinc-800'}`}>
                                 <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${roofFan ? 'translate-x-4' : 'translate-x-0'}`} />
                             </div>
                        </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Total & CTA */}
              <div className="pt-8 border-t border-black/10 dark:border-white/10">
                <div className="flex justify-between items-end mb-8">
                  <div className="space-y-1">
                    <span className="block font-mono text-xs uppercase tracking-widest opacity-60">Estimated Total</span>
                    <span className="block text-sm opacity-50">Additional shipping charges may apply.</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-4xl font-medium tracking-tight">${totalPrice}</span>
                    <span className="block text-xs text-orange-500 font-mono mt-1">Ready to Ship</span>
                  </div>
                </div>
                <Link
                  href="/preorder"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 rounded-full w-full sm:w-auto"
                >
                  Reserve Configuration
                </Link>
              </div>

              {/* Configuration Key Section */}
              <div className="pt-8 border-t border-black/10 dark:border-white/10 space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium opacity-70">Configuration Key</label>
                  <span className="font-mono text-[10px] text-orange-500 uppercase tracking-wider">Share or Load</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {/* Share Key */}
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            readOnly 
                            value={(() => {
                                // Bit Packing Logic
                                // Memory (2 bits) | Base Storage (2 bits) | Roof (3 bits) | Fan (1 bit) | Peripherals (3 bits) | Storage (18 bits)
                                let val = 0;
                                
                                // Memory: 0-2
                                val |= MEMORY_OPTIONS.findIndex(o => o.label === memory.label);
                                
                                // Base Storage: 0-2
                                val |= (BASE_STORAGE_OPTIONS.findIndex(o => o.label === baseStorage.label) << 2);
                                
                                // Roof: 0-4
                                val |= (ROOF_OPTIONS.findIndex(o => o.id === roof.id) << 4);
                                
                                // Fan: 0-1
                                if (roofFan) val |= (1 << 7);
                                
                                // Peripherals: 3 bits (Bitmask: UPS=1, 2.5G=2, GPIO=4)
                                let pMask = 0;
                                if (peripheralModules.some(m => m.label === "UPS")) pMask |= 1;
                                if (peripheralModules.some(m => m.label === "2.5GbE")) pMask |= 2;
                                if (peripheralModules.some(m => m.label === "GPIO")) pMask |= 4;
                                val |= (pMask << 8);
                                
                                // Storage Modules: 6 slots * 3 bits each
                                // Mapping: 0=None, 1=256, 2=512, 3=1TB, 4=2TB, 5=4TB
                                storageModules.forEach((mod, i) => {
                                    if (i < 6) {
                                        const typeIdx = STORAGE_OPTIONS.findIndex(o => o.label === mod.label) + 1; // +1 because 0 is None
                                        if (typeIdx > 0) {
                                            val |= (typeIdx << (11 + (i * 3)));
                                        }
                                    }
                                });
                                
                                // Encode to Base64
                                const bytes = new Uint8Array([
                                    (val >>> 24) & 255,
                                    (val >>> 16) & 255,
                                    (val >>> 8) & 255,
                                    val & 255
                                ]);
                                let binary = '';
                                bytes.forEach(b => binary += String.fromCharCode(b));
                                return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
                            })()}
                            className="flex-1 bg-gray-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 font-mono text-xs text-opacity-60 truncate"
                        />
                        <button 
                            onClick={() => {
                                const input = document.querySelector('input[readonly]');
                                if (input) {
                                    navigator.clipboard.writeText(input.value);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }
                            }}
                            className={`
                                px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200
                                ${copied 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'}
                            `}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    {/* Load Key */}
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Paste configuration key..."
                            id="load-config-input"
                            className="flex-1 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 font-mono text-xs"
                        />
                        <button 
                            onClick={() => {
                                try {
                                    const input = document.getElementById('load-config-input');
                                    let key = input.value.replace(/-/g, '+').replace(/_/g, '/');
                                    // Add padding back if needed
                                    while (key.length % 4) key += '=';
                                    
                                    const binary = atob(key);
                                    let val = 0;
                                    for (let i = 0; i < 4; i++) {
                                        val = (val << 8) | binary.charCodeAt(i);
                                    }
                                    
                                    // Unpack
                                    // Memory
                                    const memIdx = val & 0x3;
                                    if (MEMORY_OPTIONS[memIdx]) setMemory(MEMORY_OPTIONS[memIdx]);
                                    
                                    // Base Storage
                                    const storeIdx = (val >>> 2) & 0x3;
                                    if (BASE_STORAGE_OPTIONS[storeIdx]) setBaseStorage(BASE_STORAGE_OPTIONS[storeIdx]);
                                    
                                    // Roof
                                    const roofIdx = (val >>> 4) & 0x7;
                                    if (ROOF_OPTIONS[roofIdx]) setRoof(ROOF_OPTIONS[roofIdx]);
                                    
                                    // Fan
                                    setRoofFan(Boolean((val >>> 7) & 0x1));
                                    
                                    // Peripherals
                                    const pMask = (val >>> 8) & 0x7;
                                    const newPeripherals = [];
                                    if (pMask & 1) newPeripherals.push({ ...PERIPHERAL_OPTIONS.find(o => o.label === "UPS"), id: Date.now() });
                                    if (pMask & 2) newPeripherals.push({ ...PERIPHERAL_OPTIONS.find(o => o.label === "2.5GbE"), id: Date.now() + 1 });
                                    if (pMask & 4) newPeripherals.push({ ...PERIPHERAL_OPTIONS.find(o => o.label === "GPIO"), id: Date.now() + 2 });
                                    setPeripheralModules(newPeripherals);
                                    
                                    // Storage Modules
                                    const newStorage = [];
                                    for (let i = 0; i < 6; i++) {
                                        const typeIdx = (val >>> (11 + (i * 3))) & 0x7;
                                        if (typeIdx > 0 && STORAGE_OPTIONS[typeIdx - 1]) {
                                            newStorage.push({ ...STORAGE_OPTIONS[typeIdx - 1], id: Date.now() + 10 + i });
                                        }
                                    }
                                    setStorageModules(newStorage);
                                    
                                    input.value = ''; // Clear input on success
                                } catch (e) {
                                    console.error("Invalid configuration key", e);
                                    alert("Invalid configuration key");
                                }
                            }}
                            className="px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                            Load
                        </button>
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
