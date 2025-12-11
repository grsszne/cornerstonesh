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

// Module options available for drag and drop
const MODULE_OPTIONS = [
  { id: "storage-256", label: "256GB SSD", price: 40, score: 10, type: "storage", color: "orange" },
  { id: "storage-512", label: "512GB SSD", price: 70, score: 20, type: "storage", color: "orange" },
  { id: "storage-1tb", label: "1TB SSD", price: 120, score: 40, type: "storage", color: "orange" },
  { id: "storage-2tb", label: "2TB SSD", price: 200, score: 60, type: "storage", color: "orange" },
  { id: "storage-4tb", label: "4TB SSD", price: 350, score: 100, type: "storage", color: "orange" },
  { id: "usb-hub", label: "USB Hub", price: 35, score: 15, type: "usb", color: "blue", description: "4-port USB 3.0 hub expansion" },
  { id: "ethernet", label: "2.5GbE", price: 50, score: 25, type: "ethernet", color: "green", description: "2.5 Gigabit Ethernet adapter", maxCount: 1 },
  { id: "ups", label: "UPS", price: 60, score: 30, type: "ups", color: "purple", description: "Uninterruptible Power Supply" },
  { id: "gpio", label: "GPIO", price: 20, score: 15, type: "gpio", color: "pink", description: "GPIO Revealer Module for developers" },
];

const ROOF_OPTIONS = [
  { label: "None", price: 0, id: "none" },
  { label: "Bare Aluminum", price: 0, id: "bare" },
  { label: "Nightlight", price: 40, id: "light" },
  { label: "SD Reader", price: 40, id: "sd" },
  { label: "Nightlight + SD", price: 70, id: "both" },
];

const ROOF_FAN_PRICE = 20;
const NUM_BAYS = 7;

export default function FoundationBuilder() {
  const [memory, setMemory] = useState(MEMORY_OPTIONS[0]);
  const [baseStorage, setBaseStorage] = useState(BASE_STORAGE_OPTIONS[0]);

  // Bays state - array of 7 slots, each can hold a module or null
  const [bays, setBays] = useState(Array(NUM_BAYS).fill(null));

  const [roof, setRoof] = useState(ROOF_OPTIONS[1]); // Default to Bare Aluminum
  const [roofFan, setRoofFan] = useState(false);

  // UI State
  const [copied, setCopied] = useState(false);
  const [draggedModule, setDraggedModule] = useState(null);
  const [dragOverBay, setDragOverBay] = useState(null);
  const [draggedBayIndex, setDraggedBayIndex] = useState(null);
  const [deleteZoneHover, setDeleteZoneHover] = useState(false);
  const [collapsed, setCollapsed] = useState({
    modules: false,
    roof: false
  });

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Count modules of each type currently in bays
  const getModuleCount = (moduleId) => {
    return bays.filter(b => b?.id === moduleId).length;
  };

  // Check if a module can be added (respects maxCount)
  const canAddModule = (module) => {
    if (!module.maxCount) return true;
    return getModuleCount(module.id) < module.maxCount;
  };

  const basePrice = 299;

  const bayPrice = bays.reduce((sum, mod) => sum + (mod?.price || 0), 0);
  const roofPrice = roof.price + (roofFan ? ROOF_FAN_PRICE : 0);
  const totalPrice = basePrice + memory.price + baseStorage.price + bayPrice + roofPrice;

  const occupiedBays = bays.filter(b => b !== null).length;
  const hasExpansion = occupiedBays > 0;

  const stackHeight = 50 + (occupiedBays * 15);
  const stackCircles = 2 + (occupiedBays * 10);

  // Drag handlers for module options
  const handleDragStart = (e, module) => {
    if (!canAddModule(module)) {
      e.preventDefault();
      return;
    }
    setDraggedModule(module);
    e.dataTransfer.effectAllowed = "copy";
  };

  // Drag handlers for bay modules (to delete)
  const handleBayDragStart = (e, bayIndex) => {
    setDraggedBayIndex(bayIndex);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedModule(null);
    setDragOverBay(null);
    setDraggedBayIndex(null);
    setDeleteZoneHover(false);
  };

  const handleDragOver = (e, bayIndex) => {
    e.preventDefault();
    if (bays[bayIndex] === null && draggedModule) {
      setDragOverBay(bayIndex);
    }
  };

  const handleDragLeave = () => {
    setDragOverBay(null);
  };

  const handleDrop = (e, bayIndex) => {
    e.preventDefault();
    if (draggedModule && bays[bayIndex] === null && canAddModule(draggedModule)) {
      const newBays = [...bays];
      newBays[bayIndex] = { ...draggedModule, instanceId: Date.now() };
      setBays(newBays);
    }
    setDraggedModule(null);
    setDragOverBay(null);
  };

  // Delete zone handlers
  const handleDeleteDragOver = (e) => {
    e.preventDefault();
    if (draggedBayIndex !== null) {
      setDeleteZoneHover(true);
    }
  };

  const handleDeleteDragLeave = () => {
    setDeleteZoneHover(false);
  };

  const handleDeleteDrop = (e) => {
    e.preventDefault();
    if (draggedBayIndex !== null) {
      const newBays = [...bays];
      newBays[draggedBayIndex] = null;
      setBays(newBays);
    }
    setDraggedBayIndex(null);
    setDeleteZoneHover(false);
  };

  const removeFromBay = (bayIndex) => {
    const newBays = [...bays];
    newBays[bayIndex] = null;
    setBays(newBays);
  };

  // Get color class based on module type
  const getModuleColorClass = (module, variant = "bg") => {
    const colors = {
      orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-500" },
      blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-500" },
      green: { bg: "bg-green-500", border: "border-green-500", text: "text-green-500" },
      purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500" },
      pink: { bg: "bg-pink-500", border: "border-pink-500", text: "text-pink-500" },
    };
    return colors[module.color]?.[variant] || colors.orange[variant];
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">

            {/* Left column - Preview and Summary */}
            <div className="xl:col-span-4 space-y-8 sticky top-8">
              <div className="aspect-square bg-gray-100 dark:bg-zinc-900 rounded-2xl border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center relative overflow-hidden group transition-all duration-500">
                <div className={`absolute inset-0 transition-opacity duration-500 ${hasExpansion ? 'opacity-30' : 'opacity-20'}`}>
                  <AsciiArt
                    width={125}
                    height={125}
                    numCircles={stackCircles}
                  />
                </div>

                <div className="relative z-10 text-center space-y-2">
                  <div className="text-3xl font-medium tracking-tight">
                    {hasExpansion ? `Foundation + ${occupiedBays}` : "Foundation"}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest opacity-50">
                    {hasExpansion ? `${occupiedBays}x Modules Installed` : "Base Configuration"}
                  </div>
                </div>
              </div>

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

                {occupiedBays > 0 && (
                  <div className="border-t border-black/5 dark:border-white/5 pt-2 mt-2">
                    <span className="block opacity-60 mb-2">Installed Modules</span>
                    <div className="space-y-1">
                      {bays.map((mod, i) => mod && (
                        <div key={i} className={`flex justify-between pl-2 border-l-2 ${getModuleColorClass(mod, 'border')}/20`}>
                          <span>Bay {i + 1}</span>
                          <span className={getModuleColorClass(mod, 'text')}>{mod.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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

            {/* Right column - Configuration */}
            <div className="xl:col-span-8 space-y-10">

              {/* Memory Selection */}
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

              {/* Base Storage Selection */}
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

              {/* Expansion Bays Section */}
              <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => toggleSection('modules')}
                  className="w-full flex justify-between items-center group"
                >
                  <div className="flex items-end gap-4">
                    <label className="text-xl font-medium cursor-pointer">Expansion Bays</label>
                    <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">
                      {occupiedBays}/{NUM_BAYS} Occupied
                    </span>
                  </div>
                  <span className={`transform transition-transform duration-200 ${collapsed.modules ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {!collapsed.modules && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">

                    {/* Module Options - Draggable */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs opacity-60 uppercase tracking-wider">Available Modules</span>
                        <span className="font-mono text-[10px] opacity-40">Drag to bays below</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {MODULE_OPTIONS.map((module) => {
                          const isAtLimit = module.maxCount && getModuleCount(module.id) >= module.maxCount;
                          return (
                            <div
                              key={module.id}
                              draggable={!isAtLimit}
                              onDragStart={(e) => handleDragStart(e, module)}
                              onDragEnd={handleDragEnd}
                              className={`
                                px-3 py-2 rounded-lg border font-mono text-xs transition-all duration-200
                                flex items-center gap-2 select-none
                                ${isAtLimit
                                  ? 'opacity-40 cursor-not-allowed border-black/10 dark:border-white/10 bg-gray-100 dark:bg-zinc-800'
                                  : `cursor-grab active:cursor-grabbing ${getModuleColorClass(module, 'border')} ${getModuleColorClass(module, 'bg')}/10 hover:${getModuleColorClass(module, 'bg')}/20`
                                }
                              `}
                              title={module.description || module.label}
                            >
                              <span className={`w-2 h-2 rounded-full ${getModuleColorClass(module, 'bg')}`}></span>
                              <span className="font-medium">{module.label}</span>
                              <span className="opacity-60">+${module.price}</span>
                              {isAtLimit && <span className="text-[9px] text-red-500">(max)</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bay Slots - 7 vertical columns */}
                    <div className="space-y-3">
                      <span className="font-mono text-xs opacity-60 uppercase tracking-wider block">Drop Zones</span>
                      <div className="grid grid-cols-7 gap-2">
                        {bays.map((bay, index) => (
                          <div
                            key={index}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, index)}
                            className={`
                              relative aspect-[1/2] min-h-[140px] rounded-xl border-2 transition-all duration-200
                              flex flex-col items-center justify-center text-center
                              ${bay
                                ? `${getModuleColorClass(bay, 'border')} ${getModuleColorClass(bay, 'bg')}/10`
                                : dragOverBay === index
                                  ? 'border-orange-500 bg-orange-500/10 border-solid scale-[1.02]'
                                  : 'border-dashed border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40'
                              }
                            `}
                          >
                            {bay ? (
                              <div
                                className="p-2 w-full h-full flex flex-col cursor-grab active:cursor-grabbing"
                                draggable
                                onDragStart={(e) => handleBayDragStart(e, index)}
                                onDragEnd={handleDragEnd}
                              >
                                <div className="flex-1 flex flex-col items-center justify-center">
                                  <div className={`w-4 h-4 rounded-full ${getModuleColorClass(bay, 'bg')} mb-2`}></div>
                                  <span className="font-mono text-[10px] font-bold leading-tight">{bay.label}</span>
                                  <span className="font-mono text-[9px] opacity-50 mt-1">+${bay.price}</span>
                                </div>
                                <span className="mt-auto text-[8px] text-black/30 dark:text-white/30 font-mono uppercase">
                                  Drag to remove
                                </span>
                              </div>
                            ) : (
                              <div className="p-2">
                                <div className="font-mono text-[10px] opacity-30 uppercase">Bay {index + 1}</div>
                                <div className="text-lg opacity-20 mt-1">+</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delete Zone - appears when dragging from a bay */}
                    <div
                      onDragOver={handleDeleteDragOver}
                      onDragLeave={handleDeleteDragLeave}
                      onDrop={handleDeleteDrop}
                      className={`
                        py-4 rounded-xl border-2 border-dashed transition-all duration-200
                        flex items-center justify-center gap-2 font-mono text-sm
                        ${draggedBayIndex !== null
                          ? deleteZoneHover
                            ? 'border-red-500 bg-red-500/20 text-red-500 scale-[1.02]'
                            : 'border-red-500/50 bg-red-500/5 text-red-500/70'
                          : 'border-black/10 dark:border-white/10 text-black/20 dark:text-white/20'
                        }
                      `}
                    >
                      <span className="text-lg">🗑️</span>
                      <span className="uppercase tracking-wider text-xs">
                        {draggedBayIndex !== null ? 'Drop here to remove' : 'Drag module here to delete'}
                      </span>
                    </div>

                    <p className="text-xs opacity-50 font-mono">
                      Drag modules into bays. Drag from bays to the trash to remove. Ethernet limited to 1.
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
                        <span className="font-bold font-mono text-sm">Additional Cooling Fan</span>
                        <span className="text-xs opacity-60 text-left">Improves convection and thermals by expelling heat from the top of the stack.</span>
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

              {/* Price and CTA */}
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
                        // Memory (2 bits) | Base Storage (2 bits) | Roof (3 bits) | Fan (1 bit) | Bays (7 slots * 4 bits each = 28 bits)
                        let val = BigInt(0);

                        // Memory: 0-2
                        val |= BigInt(MEMORY_OPTIONS.findIndex(o => o.label === memory.label));

                        // Base Storage: 0-2
                        val |= BigInt(BASE_STORAGE_OPTIONS.findIndex(o => o.label === baseStorage.label)) << BigInt(2);

                        // Roof: 0-4
                        val |= BigInt(ROOF_OPTIONS.findIndex(o => o.id === roof.id)) << BigInt(4);

                        // Fan: 0-1
                        if (roofFan) val |= BigInt(1) << BigInt(7);

                        // Bays: 7 slots * 4 bits each (0-15, where 0=empty, 1-9=module types)
                        bays.forEach((bay, i) => {
                          if (bay) {
                            const moduleIdx = MODULE_OPTIONS.findIndex(o => o.id === bay.id) + 1; // +1 because 0 is empty
                            val |= BigInt(moduleIdx) << BigInt(8 + (i * 4));
                          }
                        });

                        // Encode to Base36
                        return val.toString(36).toUpperCase();
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
                      placeholder="Paste configuration key... (No case sensitivity)"
                      id="load-config-input"
                      className="flex-1 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 font-mono text-xs"
                    />
                    <button
                      onClick={() => {
                        try {
                          const input = document.getElementById('load-config-input');
                          const key = input.value.trim();
                          if (!key) return;

                          const val = BigInt(parseInt(key, 36));
                          if (isNaN(Number(val))) throw new Error("Invalid key");

                          // Unpack
                          // Memory
                          const memIdx = Number(val & BigInt(0x3));
                          if (MEMORY_OPTIONS[memIdx]) setMemory(MEMORY_OPTIONS[memIdx]);

                          // Base Storage
                          const storeIdx = Number((val >> BigInt(2)) & BigInt(0x3));
                          if (BASE_STORAGE_OPTIONS[storeIdx]) setBaseStorage(BASE_STORAGE_OPTIONS[storeIdx]);

                          // Roof
                          const roofIdx = Number((val >> BigInt(4)) & BigInt(0x7));
                          if (ROOF_OPTIONS[roofIdx]) setRoof(ROOF_OPTIONS[roofIdx]);

                          // Fan
                          setRoofFan(Boolean((val >> BigInt(7)) & BigInt(0x1)));

                          // Bays
                          const newBays = [];
                          for (let i = 0; i < NUM_BAYS; i++) {
                            const moduleIdx = Number((val >> BigInt(8 + (i * 4))) & BigInt(0xF));
                            if (moduleIdx > 0 && MODULE_OPTIONS[moduleIdx - 1]) {
                              newBays.push({ ...MODULE_OPTIONS[moduleIdx - 1], instanceId: Date.now() + i });
                            } else {
                              newBays.push(null);
                            }
                          }
                          setBays(newBays);

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
