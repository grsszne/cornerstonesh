"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AsciiArt from "@/components/AsciiArt";

import {
  MODULE_CATEGORIES,
  MODULE_OPTIONS,
  formatNetworkLabel,
  getModuleColorClass
} from "@/lib/modules";

const STORAGE_KEY = "foundation-builder-config";

const MEMORY_OPTIONS = [
  { label: "Intel N100 8GB", price: 0, score: 40, },
  { label: "Intel N100 16GB", price: 120, score: 60, },
  { label: "Intel N305 16GB", price: 220, score: 80, },
];

const BOOT_STORAGE_OPTIONS = [
  { label: "256GB", price: 0, score: 10 },
  { label: "512GB", price: 100, score: 20 },
  { label: "1TB", price: 130, score: 40 },
  { label: "2TB", price: 200, score: 60 },
  { label: "4TB", price: 400, score: 80 },
  { label: "8TB", price: 950, score: 100 },
];

// Module options available for drag and drop


const NUM_BAYS = 8;

// Networking options (from modules.js)
const NETWORKING_OPTIONS = MODULE_CATEGORIES.networking.modules;

export default function FoundationBuilder() {
  const searchParams = useSearchParams();

  const [memory, setMemory] = useState(MEMORY_OPTIONS[0]);
  const [bootStorage, setBootStorage] = useState(BOOT_STORAGE_OPTIONS[0]);
  const [networking, setNetworking] = useState(null); // null = not selected yet
  // Removed global accessories state
  // const [accessories, setAccessories] = useState([]);

  // Bays state - fixed 8 slots. Each slot is { ...module, instanceId, accessories: [] }
  const [bays, setBays] = useState(Array(NUM_BAYS).fill(null));
  const [isLoaded, setIsLoaded] = useState(false);

  // UI State
  const [copied, setCopied] = useState(false);
  const [draggedModule, setDraggedModule] = useState(null);
  const [dragOverBay, setDragOverBay] = useState(null);
  const [draggedBayIndex, setDraggedBayIndex] = useState(null);
  const [deleteZoneHover, setDeleteZoneHover] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [hoveredModule, setHoveredModule] = useState(null);
  // Multi-select state: Array of indices
  const [selectedBayIndices, setSelectedBayIndices] = useState([]);
  const [collapsed, setCollapsed] = useState({
    modules: false
  });

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const config = JSON.parse(saved);
        if (config.memory) {
          const mem = MEMORY_OPTIONS.find(o => o.label === config.memory);
          if (mem) setMemory(mem);
        }
        if (config.bootStorage) {
          const storage = BOOT_STORAGE_OPTIONS.find(o => o.label === config.bootStorage);
          if (storage) setBootStorage(storage);
        }
        if (config.networking) {
          const net = NETWORKING_OPTIONS.find(o => o.id === config.networking);
          if (net) setNetworking(net);
        }
        if (config.bays && Array.isArray(config.bays)) {
          const loadedBays = config.bays.map(bay => {
            if (!bay) return null;
            const module = MODULE_OPTIONS.find(m => m.id === bay.id);
            if (!module) return null;
            return { ...module, instanceId: bay.instanceId || Date.now(), accessories: bay.accessories || [] };
          });
          setBays(loadedBays);
        }
      }
    } catch (e) {
      console.error("Failed to load config from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when config changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const config = {
        memory: memory.label,
        bootStorage: bootStorage.label,
        networking: networking?.id || null,
        bays: bays.map(bay => bay ? { id: bay.id, instanceId: bay.instanceId, accessories: bay.accessories || [] } : null)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error("Failed to save config to localStorage", e);
    }
  }, [memory, bootStorage, networking, bays, isLoaded]);

  // Handle loading configuration from URL params (from configurator via key)
  useEffect(() => {
    if (!isLoaded) return;

    const configKey = searchParams.get("key");

    if (configKey) {
      try {
        const val = BigInt(parseInt(configKey, 36));
        if (isNaN(Number(val))) throw new Error("Invalid key");

        // Unpack - Memory
        const memIdx = Number(val & BigInt(0x3));
        if (MEMORY_OPTIONS[memIdx]) setMemory(MEMORY_OPTIONS[memIdx]);

        // Boot Storage
        const storeIdx = Number((val >> BigInt(2)) & BigInt(0x3));
        if (BOOT_STORAGE_OPTIONS[storeIdx]) setBootStorage(BOOT_STORAGE_OPTIONS[storeIdx]);

        // Networking: 3 bits (position 4) - 0 = none, 1-4 = options
        const netIdx = Number((val >> BigInt(4)) & BigInt(0x7));
        if (netIdx > 0 && NETWORKING_OPTIONS[netIdx - 1]) {
          setNetworking(NETWORKING_OPTIONS[netIdx - 1]);
        } else {
          setNetworking(null);
        }

        // Bays
        const newBays = [];
        for (let i = 0; i < NUM_BAYS; i++) {
          const shift = BigInt(7 + (i * 6));
          const moduleIdx = Number((val >> shift) & BigInt(0xF)); // 4 bits for module

          if (moduleIdx > 0 && MODULE_OPTIONS[moduleIdx - 1]) {
            // Extract accessories (2 bits after module)
            const accMask = Number((val >> (shift + BigInt(4))) & BigInt(0x3));
            const bayAccessories = [];
            if (accMask & 1) bayAccessories.push('nightlight');
            if (accMask & 2) bayAccessories.push('fan');

            newBays.push({ ...MODULE_OPTIONS[moduleIdx - 1], instanceId: Date.now() + i, accessories: bayAccessories });
          } else {
            newBays.push(null);
          }
        }
        setBays(newBays);

        // Clear the key param after loading, but keep ref for scrolling
        const ref = searchParams.get("ref");
        const newUrl = ref ? `/foundation?ref=${ref}` : '/foundation';
        window.history.replaceState({}, '', newUrl);
      } catch (e) {
        console.error("Failed to load config from key", e);
      }
    }
  }, [isLoaded, searchParams]);

  // Handle adding module from URL param
  useEffect(() => {
    if (!isLoaded) return;
    const addModuleId = searchParams.get("add");
    if (addModuleId) {
      // Check if it's a networking module or regular module
      const netModule = NETWORKING_OPTIONS.find(m => m.id === addModuleId);
      const module = netModule || MODULE_OPTIONS.find(m => m.id === addModuleId);

      if (module) {
        // Find first empty bay
        const emptyBayIndex = bays.findIndex(b => b === null);
        if (emptyBayIndex !== -1) {
          // Check if module can be added (respects maxCount)
          const currentCount = bays.filter(b => b?.id === module.id).length;
          if (!module.maxCount || currentCount < module.maxCount) {
            const newBays = [...bays];
            newBays[emptyBayIndex] = { ...module, instanceId: Date.now(), accessories: [] };
            setBays(newBays);
          }
        }
      }
      // Clear the add param after adding, but keep ref param for scrolling
      const ref = searchParams.get("ref");
      const newUrl = ref ? `/foundation?ref=${ref}` : '/foundation';
      window.history.replaceState({}, '', newUrl);
    }
  }, [isLoaded, searchParams]);

  // Count modules of each type currently in bays
  const getModuleCount = (moduleId) => {
    return bays.filter(b => b?.id === moduleId).length;
  };

  // Check if a module can be added (respects maxCount)
  const canAddModule = (module) => {
    if (!module.maxCount) return true;
    return getModuleCount(module.id) < module.maxCount;
  };


  const basePrice = 399;

  // Count 1GbE modules for pricing (first one is free, rest are $65 each)
  let gigEthCount = 0;

  const bayPrice = bays.reduce((sum, mod) => {
    if (!mod) return sum;

    let modPrice = mod.price || 0;

    // Special pricing for 1GbE: first one free, $65 for each additional
    if (mod.id === 'ethernet-1') {
      gigEthCount++;
      modPrice = gigEthCount > 1 ? 65 : 0;
    }

    const accPrice = (mod.accessories || []).reduce((accSum, accId) => {
      const accOption = MODULE_CATEGORIES.accessories.modules.find(m => m.id === accId);
      return accSum + (accOption?.price || 0);
    }, 0);
    return sum + modPrice + accPrice;
  }, 0);

  const networkingPrice = networking?.price || 0;
  const totalPrice = basePrice + memory.price + bootStorage.price + networkingPrice + bayPrice;

  const occupiedBays = bays.filter(b => b !== null).length;
  const hasExpansion = occupiedBays > 0;

  // Check if there's a networking module in the bays
  const networkingModuleInBay = bays.find(bay =>
    bay && NETWORKING_OPTIONS.some(netMod => netMod.id === bay.id)
  );

  // Determine which networking module to display (bay takes precedence over dedicated networking)
  const effectiveNetworking = networkingModuleInBay || networking;
  const hasNetworking = effectiveNetworking !== null;

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

    // Case 1: Dragging a new module from the list
    if (draggedModule && bays[bayIndex] === null && canAddModule(draggedModule)) {
      // Don't allow dropping accessories into empty bays
      if (MODULE_CATEGORIES.accessories.modules.some(m => m.id === draggedModule.id)) {
        setDraggedModule(null);
        setDragOverBay(null);
        return;
      }
      const newBays = [...bays];
      newBays[bayIndex] = { ...draggedModule, instanceId: Date.now(), accessories: [] };
      setBays(newBays);

      setSelectedModule(null); // Lose focus after placement
      setSelectedBayIndices([]); // Clear selection after placement
    }
    // Case 1.5: Dragging an accessory onto an existing module
    else if (draggedModule && bays[bayIndex] && MODULE_CATEGORIES.accessories.modules.some(m => m.id === draggedModule.id)) {
      const newBays = [...bays];
      const currentBay = { ...newBays[bayIndex] };
      const currentAccessories = currentBay.accessories || [];

      if (!currentAccessories.includes(draggedModule.id)) {
        currentBay.accessories = [...currentAccessories, draggedModule.id];
        newBays[bayIndex] = currentBay;
        setBays(newBays);
      }
      // If already exists, do nothing (idempotent)
    }
    // Case 2: Moving/Swapping a module from another bay
    else if (draggedBayIndex !== null && draggedBayIndex !== bayIndex) {
      const newBays = [...bays];
      const sourceBay = newBays[draggedBayIndex];
      const targetBay = newBays[bayIndex];

      // Move source to target
      newBays[bayIndex] = sourceBay;

      // If target was occupied, move it to source (Swap)
      // If target was empty, source becomes empty (Move)
      newBays[draggedBayIndex] = targetBay;

      setBays(newBays);

      // If we moved a selected bay, we might want to update selection indices, 
      // but clearing them is safer/simpler to avoid confusion.
      setSelectedBayIndices([]);
    }

    setDraggedModule(null);
    setDragOverBay(null);
    setDraggedBayIndex(null);
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



  const toggleAccessory = (moduleId) => {
    if (selectedBayIndices.length === 0) return;

    // Logic: If ALL selected bays have the accessory, remove it from all.
    // Otherwise, add it to all (that don't have it).

    const allSelectedHaveIt = selectedBayIndices.every(idx =>
      bays[idx] && bays[idx].accessories && bays[idx].accessories.includes(moduleId)
    );

    const newBays = [...bays];

    selectedBayIndices.forEach(idx => {
      if (!newBays[idx]) return;
      const currentBay = { ...newBays[idx] };
      const currentAccessories = currentBay.accessories || [];

      if (allSelectedHaveIt) {
        // Remove
        currentBay.accessories = currentAccessories.filter(id => id !== moduleId);
      } else {
        // Add if missing
        if (!currentAccessories.includes(moduleId)) {
          currentBay.accessories = [...currentAccessories, moduleId];
        }
      }
      newBays[idx] = currentBay;
    });

    setBays(newBays);
  };

  return (
    <section id="builder" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
            Build Your Foundation.
          </h2>
          <p className="text-sm font-mono">
            Not sure what specs you need?{" "}
            <Link href="/foundation/guide" className="text-orange-500 hover:underline">
              View Hardware Guide →
            </Link>
            {" "}or{" "}
            <Link href="/foundation/modules" className="text-orange-500 hover:underline">
              Browse Modules →
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
                  <span className="opacity-60">Processor</span>
                  <span className={memory.price > 0 ? "text-orange-500" : ""}>{memory.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Boot Storage</span>
                  <span className={bootStorage.price > 0 ? "text-orange-500" : ""}>{bootStorage.label} NVMe</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Networking</span>
                  <span className={effectiveNetworking?.price > 0 ? "text-green-500" : effectiveNetworking ? "" : "text-red-500"}>
                    {effectiveNetworking ? effectiveNetworking.label : "Not Selected"}
                  </span>
                </div>

                {occupiedBays > 0 && (
                  <div className="border-t border-black/5 dark:border-white/5 pt-2 mt-2">
                    <span className="block opacity-60 mb-2">Installed Modules</span>
                    <div className="space-y-1">
                      {(() => {
                        let gigEthDisplayCount = 0;
                        return bays.map((mod, i) => {
                          if (!mod) return null;

                          // Calculate display price for 1GbE modules
                          let displayPrice = mod.price;
                          if (mod.id === 'ethernet-1') {
                            gigEthDisplayCount++;
                            displayPrice = gigEthDisplayCount > 1 ? 65 : 0;
                          }

                          return (
                            <div key={i} className="space-y-1">
                              <div className={`flex justify-between pl-2 border-l-2 ${getModuleColorClass(mod, 'border')}/20`}>
                                <span>Bay {i + 1}</span>
                                <span className={getModuleColorClass(mod, 'text')}>
                                  {mod.label}
                                  {displayPrice > 0 && ` +$${displayPrice}`}
                                  {displayPrice === 0 && mod.id === 'ethernet-1' && ' (included)'}
                                </span>
                              </div>
                              {/* List accessories for this bay */}
                              {mod.accessories?.map(accId => {
                                const acc = MODULE_CATEGORIES.accessories.modules.find(m => m.id === accId);
                                if (!acc) return null;
                                return (
                                  <div key={accId} className="flex justify-between pl-4 text-xs opacity-70">
                                    <span>+ {acc.label}</span>
                                    <span>${acc.price}</span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right column - Configuration */}
            <div className="xl:col-span-8 space-y-10">

              {/* Processor & Memory Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xl font-medium">Processor & Memory</label>
                  <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">Unified LPDDR5X</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                      {opt.price > 0 && <span className="text-[10px] opacity-70">+${opt.price}</span>}
                      {opt.description && <span className="text-[9px] opacity-50 mt-1">{opt.description}</span>}
                    </button>
                  ))}
                </div>
                <p className="text-xs opacity-50 font-mono">
                  N100 is a 4-core processor suitable for most home server tasks. N305 is an 8-core processor for demanding workloads and heavy containerization.
                </p>
              </div>

              {/* Boot Storage Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xl font-medium">Boot Storage</label>
                  <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">System NVMe</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {BOOT_STORAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setBootStorage(opt)}
                      className={`
                        relative border rounded-xl py-4 px-4 text-center font-mono text-sm transition-all duration-200
                        flex flex-col items-center justify-center gap-1
                        ${bootStorage.label === opt.label
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



              {/* Modular Bays Section */}
              <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={() => toggleSection('modules')}
                  className="w-full flex justify-between items-center group"
                >
                  <div className="flex items-end gap-4">
                    <label className="text-xl font-medium cursor-pointer">Modular Bays</label>
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

                    <div className="space-y-6">
                      {Object.entries(MODULE_CATEGORIES).map(([key, category]) => (
                        <div key={key} className="space-y-3">
                          <div className="px-1">
                            <h4 className="text-sm font-medium">{category.label}</h4>
                            <p className="text-[10px] opacity-60 font-mono">{category.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-3 p-4 bg-gray-50 dark:bg-zinc-900/50 rounded-xl border border-black/5 dark:border-white/5">
                            {category.modules.map((module) => {
                              const isAtLimit = module.maxCount && getModuleCount(module.id) >= module.maxCount;
                              const isSelected = selectedModule?.id === module.id;

                              // Calculate display price for 1GbE modules
                              let displayPrice = module.price;
                              let priceLabel = `+$${displayPrice}`;
                              if (module.id === 'ethernet-1') {
                                const gigEthInBays = bays.filter(b => b?.id === 'ethernet-1').length;
                                if (gigEthInBays === 0) {
                                  priceLabel = 'included';
                                } else {
                                  priceLabel = '+$65';
                                }
                              }

                              return (
                                <div
                                  key={module.id}
                                  draggable={!isAtLimit || key === 'accessories'}
                                  onDragStart={(e) => handleDragStart(e, module)}
                                  onDragEnd={handleDragEnd}
                                  onMouseEnter={() => setHoveredModule(module)}
                                  onMouseLeave={() => setHoveredModule(null)}
                                  onClick={() => {
                                    if (key === 'accessories') {
                                      toggleAccessory(module.id);
                                    } else if (!isAtLimit) {
                                      setSelectedModule(isSelected ? null : module);
                                      setSelectedBayIndices([]); // Deselect bays if selecting module
                                    }
                                  }}
                                  className={`
                                                px-3 py-2 rounded-lg border font-mono text-xs transition-all duration-200
                                                flex items-center gap-2 select-none
                                                ${key === 'accessories'
                                      ? selectedBayIndices.length > 0
                                        ? selectedBayIndices.every(idx => bays[idx]?.accessories?.includes(module.id))
                                          ? `cursor-pointer ring-2 ring-offset-2 ${getModuleColorClass(module, 'border')} ${getModuleColorClass(module, 'bg')}/20 ring-offset-white dark:ring-offset-black ${getModuleColorClass(module, 'border').replace('border-', 'ring-')}`
                                          : `cursor-pointer ${getModuleColorClass(module, 'border')} ${getModuleColorClass(module, 'bg')}/5 hover:${getModuleColorClass(module, 'bg')}/10`
                                        : 'opacity-30 cursor-not-allowed border-black/10 dark:border-white/10' // Disabled if no bay selected
                                      : isAtLimit
                                        ? 'opacity-40 cursor-not-allowed border-black/10 dark:border-white/10 bg-gray-100 dark:bg-zinc-800'
                                        : isSelected
                                          ? `cursor-pointer ring-2 ring-offset-2 ${getModuleColorClass(module, 'border')} ${getModuleColorClass(module, 'bg')}/20 ring-offset-white dark:ring-offset-black ${getModuleColorClass(module, 'border').replace('border-', 'ring-')}`
                                          : `cursor-pointer ${getModuleColorClass(module, 'border')} ${getModuleColorClass(module, 'bg')}/10 hover:${getModuleColorClass(module, 'bg')}/20`
                                    }
                                            `}
                                  title={key === 'accessories' && selectedBayIndices.length === 0 ? "Select a module in a bay to add accessories" : module.description || module.label}
                                >
                                  <span className={`w-2 h-2 rounded-full ${getModuleColorClass(module, 'bg')}`}></span>
                                  <span className="font-medium">{module.label}</span>
                                  <span className="opacity-60">{priceLabel}</span>
                                  {isAtLimit && <span className="text-[9px] text-red-500">(max)</span>}
                                  {key === 'accessories'
                                    ? selectedBayIndices.length > 0 && selectedBayIndices.every(idx => bays[idx]?.accessories?.includes(module.id)) && <span className="text-[9px] opacity-70">✓</span>
                                    : isSelected && <span className="text-[9px] opacity-70">✓</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Bay Slots - Dynamic columns based on visibleSlots */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] bg-orange-500/10 text-orange-500 px-1.5 py-0.5 rounded border border-orange-500/20 font-mono">
                      Universal Bay
                    </span>
                    {occupiedBays > 0 && (
                      <button
                        onClick={() => {
                          setBays(Array(NUM_BAYS).fill(null));
                          setSelectedBayIndices([]);
                        }}
                        className="text-[10px] px-2 py-0.5 rounded border border-red-500/30 text-red-500 hover:bg-red-500/10 font-mono uppercase tracking-wider transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className={`grid grid-cols-2 md:grid-cols-4 gap-3`}>
                    {(() => {
                      let gigEthBayCount = 0;
                      return bays.map((bay, index) => {
                        // Calculate display price for this bay's module
                        let bayDisplayPrice = bay?.price || 0;
                        if (bay?.id === 'ethernet-1') {
                          gigEthBayCount++;
                          bayDisplayPrice = gigEthBayCount > 1 ? 65 : 0;
                        }

                        return (
                          <div
                            key={index}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, index)}
                            onClick={() => {
                              if (!bay && selectedModule && canAddModule(selectedModule)) {
                                const newBays = [...bays];
                                newBays[index] = { ...selectedModule, instanceId: Date.now(), accessories: [] };
                                setBays(newBays);
                                // Clear selection if module is at limit after placing
                                if (selectedModule.maxCount && getModuleCount(selectedModule.id) + 1 >= selectedModule.maxCount) {
                                  setSelectedModule(null);
                                } else {
                                  // Lose focus after placement regardless of limit
                                  setSelectedModule(null);
                                }
                              } else if (bay) {
                                // Toggle selection for multi-select
                                setSelectedBayIndices(prev => {
                                  if (prev.includes(index)) {
                                    return prev.filter(i => i !== index);
                                  } else {
                                    return [...prev, index];
                                  }
                                });
                                setSelectedModule(null); // Deselect module list if selecting bay
                              }
                            }}
                            className={`
                                  relative h-[120px] rounded-xl border-2 transition-all duration-200
                                  flex flex-col items-center justify-center text-center
                                        ${bay
                                ? selectedBayIndices.includes(index)
                                  ? `ring-1 ring-orange-500/50 bg-orange-500/5 scale-[1.02] shadow-lg shadow-orange-500/5` // Active Selection (Edit Mode) - Dimmed
                                  : `${getModuleColorClass(bay, 'border')} ${getModuleColorClass(bay, 'bg')}/10`
                                : selectedModule && !bay
                                  ? 'border-dashed border-orange-500 bg-orange-500/5 cursor-pointer hover:bg-orange-500/10 hover:scale-[1.02]'
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
                                  <span className="font-mono text-[10px] font-bold leading-tight">{formatNetworkLabel(bay.label)}</span>
                                  <span className="font-mono text-[9px] opacity-50 mt-1">
                                    {bayDisplayPrice === 0 && bay.id === 'ethernet-1' ? 'included' : `+$${bayDisplayPrice}`}
                                  </span>
                              {/* Accessory Indicators */}
                              {bay.accessories && bay.accessories.length > 0 && (
                                <div className="flex gap-1 mt-1 justify-center">
                                  {bay.accessories.map(accId => {
                                    const acc = MODULE_CATEGORIES.accessories.modules.find(m => m.id === accId);
                                    return (
                                      <span key={accId} className={`block w-1.5 h-1.5 rounded-full ${getModuleColorClass(acc, 'bg')}`} title={acc?.label} />
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            <span className="mt-auto text-[8px] text-black/30 dark:text-white/30 font-mono uppercase">
                              {selectedBayIndices.includes(index) ? 'Selected' : 'Drag to remove'}
                            </span>
                          </div>
                        ) : (
                          <div className="p-2">
                            <div className="font-mono text-[10px] opacity-30 uppercase">Bay {index + 1}</div>
                            <div className="text-lg opacity-20 mt-1">+</div>
                          </div>
                        )}
                      </div>
                        );
                      });
                    })()}
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
                        ${draggedBayIndex !== null || selectedBayIndices.length > 0
                      ? deleteZoneHover
                        ? 'border-red-500 bg-red-500/20 text-red-500 scale-[1.02] cursor-pointer'
                        : 'border-red-500/50 bg-red-500/5 text-red-500/70 cursor-pointer'
                      : 'border-black/10 dark:border-white/10 text-black/20 dark:text-white/20'
                    }
                      `}
                  onClick={() => {
                    if (selectedBayIndices.length > 0) {
                      const newBays = [...bays];
                      selectedBayIndices.forEach(idx => {
                        newBays[idx] = null;
                      });
                      setBays(newBays);
                      setSelectedBayIndices([]);
                    }
                  }}
                >
                  <span className="text-lg">🗑️</span>
                  <span className="uppercase tracking-wider text-xs">
                    {draggedBayIndex !== null
                      ? 'Drop here to remove'
                      : selectedBayIndices.length > 0
                        ? `Tap here to remove`
                        : 'Drag bay here to delete'
                    }
                  </span>
                </div>

                <p className="text-xs opacity-50 font-mono">
                  Drag modules into bays. Drag from bays to the trash to remove.
                </p>


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
                  </div>
                </div>
                <Link
                  href="/preorder"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 rounded-full w-full sm:w-auto"
                >
                  Reserve Configuration
                </Link>
              </div>

              {/* Configuration Key Section - Only show when networking is present */}
              {hasNetworking && (
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
                        // Memory (2 bits) | Boot Storage (2 bits) | Networking (3 bits) | Bays (8 slots * 6 bits each)
                        let val = BigInt(0);

                        // Memory: 2 bits (position 0)
                        val |= BigInt(MEMORY_OPTIONS.findIndex(o => o.label === memory.label));

                        // Boot Storage: 2 bits (position 2)
                        val |= BigInt(BOOT_STORAGE_OPTIONS.findIndex(o => o.label === bootStorage.label)) << BigInt(2);

                        // Networking: 3 bits (position 4) - 0 = none, 1-4 = options
                        const netIdx = networking ? NETWORKING_OPTIONS.findIndex(o => o.id === networking.id) + 1 : 0;
                        val |= BigInt(netIdx) << BigInt(4);

                        // Bays: 8 slots * 6 bits each (4 bits for module type, 2 bits for accessories)
                        // Total bits per bay = 6.
                        // Start bit = 7.

                        bays.forEach((bay, i) => {
                          const shift = BigInt(7 + (i * 6));
                          if (bay) {
                            const moduleIdx = MODULE_OPTIONS.findIndex(o => o.id === bay.id) + 1;
                            val |= BigInt(moduleIdx) << shift;

                            // Accessories: 2 bits (Bit 0: Nightlight, Bit 1: Fan)
                            // We need a stable mapping.
                            // nightlight -> 0
                            // fan -> 1
                            let accMask = 0;
                            if (bay.accessories?.includes('nightlight')) accMask |= 1;
                            if (bay.accessories?.includes('fan')) accMask |= 2;

                            val |= BigInt(accMask) << (shift + BigInt(4));
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

                          // Boot Storage
                          const storeIdx = Number((val >> BigInt(2)) & BigInt(0x3));
                          if (BOOT_STORAGE_OPTIONS[storeIdx]) setBootStorage(BOOT_STORAGE_OPTIONS[storeIdx]);

                          // Networking: 3 bits (position 4) - 0 = none, 1-4 = options
                          const netIdx = Number((val >> BigInt(4)) & BigInt(0x7));
                          if (netIdx > 0 && NETWORKING_OPTIONS[netIdx - 1]) {
                            setNetworking(NETWORKING_OPTIONS[netIdx - 1]);
                          } else {
                            setNetworking(null);
                          }

                          // Bays
                          const newBays = [];
                          for (let i = 0; i < NUM_BAYS; i++) {
                            const shift = BigInt(7 + (i * 6));
                            const moduleIdx = Number((val >> shift) & BigInt(0xF)); // 4 bits for module

                            if (moduleIdx > 0 && MODULE_OPTIONS[moduleIdx - 1]) {
                              // Extract accessories (2 bits after module)
                              const accMask = Number((val >> (shift + BigInt(4))) & BigInt(0x3));
                              const bayAccessories = [];
                              if (accMask & 1) bayAccessories.push('nightlight');
                              if (accMask & 2) bayAccessories.push('fan');

                              newBays.push({
                                ...MODULE_OPTIONS[moduleIdx - 1],
                                instanceId: Date.now() + i,
                                accessories: bayAccessories
                              });
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
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
