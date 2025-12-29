"use client";

import { useState, useEffect } from "react";
import {
  MODULE_CATEGORIES,
  MODULE_OPTIONS
} from "@/lib/modules";

const MEMORY_OPTIONS = [
  { label: "Intel N100 + 8GB RAM", price: 0 },
  { label: "Intel N100 + 16GB RAM", price: 120 },
  { label: "Intel N305 + 16GB RAM", price: 220 },
];

const BOOT_STORAGE_OPTIONS = [
  { label: "256GB NVMe", price: 0 },
  { label: "512GB NVMe", price: 100 },
  { label: "1TB NVMe", price: 130 },
  { label: "2TB NVMe", price: 200 },
  { label: "4TB NVMe", price: 400 },
];

export default function FoundationBuilder() {
  const [memory, setMemory] = useState(MEMORY_OPTIONS[0]);
  const [bootStorage, setBootStorage] = useState(BOOT_STORAGE_OPTIONS[0]);
  const [modules, setModules] = useState({}); // { moduleId: count }

  const MAX_BAYS = 6;
  const totalModules = Object.values(modules).reduce((a, b) => a + b, 0);

  const handleModuleChange = (moduleId, delta) => {
    setModules(prev => {
      const current = prev[moduleId] || 0;
      const next = Math.max(0, current + delta);
      
      // Check limits
      if (delta > 0 && totalModules >= MAX_BAYS) return prev;
      
      const updated = { ...prev, [moduleId]: next };
      if (next === 0) delete updated[moduleId];
      return updated;
    });
  };

  // Calculate Price
  const basePrice = 399;
  let modulePrice = 0;
  
  // Custom logic for Ethernet pricing (first one 'free' if it was logic from before, 
  // but let's simplify for this minimalist version or keep logic if needed. 
  // Previous logic: "first 1GbE is free". I'll keep it simple: just sum prices.)
  
  Object.entries(modules).forEach(([id, count]) => {
    const mod = MODULE_OPTIONS.find(m => m.id === id);
    if (!mod) return;
    
    // Legacy pricing logic port
    if (id === 'ethernet-1') {
        // If we want to keep the "First one free" logic:
        // modulePrice += (count > 0 ? (count - 1) * 65 : 0); 
        // Or just simplify. Let's assume standard pricing for maturity.
        modulePrice += count * mod.price;
    } else {
        modulePrice += count * mod.price;
    }
  });

  const totalPrice = basePrice + memory.price + bootStorage.price + modulePrice;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      
      {/* Left Column: Configurator */}
      <div className="lg:col-span-7 space-y-16">
        
        {/* Core Specs */}
        <section>
          <h3 className="font-serif text-2xl mb-8 border-b border-foreground/10 pb-4">Core System</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-sans font-medium mb-3">Processor & Memory</label>
              <div className="grid grid-cols-1 gap-2">
                {MEMORY_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setMemory(opt)}
                    className={`text-left px-4 py-3 text-sm border transition-colors ${
                      memory.label === opt.label
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/20 hover:border-foreground"
                    }`}
                  >
                    <div className="flex justify-between">
                        <span>{opt.label}</span>
                        <span>{opt.price > 0 ? `+$${opt.price}` : "Included"}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium mb-3">Boot Storage</label>
              <div className="grid grid-cols-1 gap-2">
                {BOOT_STORAGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setBootStorage(opt)}
                    className={`text-left px-4 py-3 text-sm border transition-colors ${
                      bootStorage.label === opt.label
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/20 hover:border-foreground"
                    }`}
                  >
                    <div className="flex justify-between">
                        <span>{opt.label}</span>
                        <span>{opt.price > 0 ? `+$${opt.price}` : "Included"}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section>
           <div className="flex justify-between items-baseline mb-8 border-b border-foreground/10 pb-4">
              <h3 className="font-serif text-2xl">Expansion Modules</h3>
              <span className="font-sans text-sm text-foreground/60">{totalModules} / {MAX_BAYS} Slots Used</span>
           </div>
           
           <div className="space-y-8">
              {Object.entries(MODULE_CATEGORIES).map(([catKey, category]) => {
                  if (catKey === 'accessories') return null; // Skip accessories for simplicity
                  return (
                      <div key={catKey}>
                          <h4 className="font-sans font-medium text-sm text-foreground/50 uppercase tracking-widest mb-4">{category.label}</h4>
                          <div className="space-y-4">
                              {category.modules.map(mod => {
                                  const count = modules[mod.id] || 0;
                                  return (
                                      <div key={mod.id} className="flex justify-between items-center py-2">
                                          <div>
                                              <div className="font-serif text-lg">{mod.label}</div>
                                              <div className="font-sans text-sm text-foreground/60">${mod.price}</div>
                                          </div>
                                          <div className="flex items-center gap-4">
                                              <button 
                                                onClick={() => handleModuleChange(mod.id, -1)}
                                                disabled={count === 0}
                                                className="w-8 h-8 flex items-center justify-center border border-foreground/20 hover:border-foreground disabled:opacity-20 disabled:hover:border-foreground/20 rounded-full transition-colors"
                                              >
                                                -
                                              </button>
                                              <span className="w-4 text-center font-sans">{count}</span>
                                              <button 
                                                onClick={() => handleModuleChange(mod.id, 1)}
                                                disabled={totalModules >= MAX_BAYS}
                                                className="w-8 h-8 flex items-center justify-center border border-foreground/20 hover:border-foreground disabled:opacity-20 disabled:hover:border-foreground/20 rounded-full transition-colors"
                                              >
                                                +
                                              </button>
                                          </div>
                                      </div>
                                  )
                              })}
                          </div>
                      </div>
                  )
              })}
           </div>
        </section>

      </div>

      {/* Right Column: Summary Sticky */}
      <div className="lg:col-span-5 sticky top-32">
          <div className="bg-muted p-8">
              <h3 className="font-serif text-2xl mb-6">Configuration</h3>
              
              <div className="space-y-4 mb-8 text-sm font-sans">
                  <div className="flex justify-between pb-2 border-b border-foreground/10">
                      <span className="text-foreground/70">Base System</span>
                      <span>${basePrice}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-foreground/10">
                      <span className="text-foreground/70">{memory.label}</span>
                      <span>{memory.price > 0 ? `+$${memory.price}` : 'Incl'}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-foreground/10">
                      <span className="text-foreground/70">{bootStorage.label}</span>
                      <span>{bootStorage.price > 0 ? `+$${bootStorage.price}` : 'Incl'}</span>
                  </div>
                  
                  {Object.entries(modules).map(([id, count]) => {
                      const mod = MODULE_OPTIONS.find(m => m.id === id);
                      if (!mod) return null;
                      return (
                          <div key={id} className="flex justify-between pb-2 border-b border-foreground/10">
                              <span className="text-foreground/70">{count}x {mod.label}</span>
                              <span>+${count * mod.price}</span>
                          </div>
                      )
                  })}
                  
                  <div className="flex justify-between pt-4 text-xl font-serif">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                  </div>
              </div>

              <button className="w-full bg-foreground text-background py-4 text-sm font-medium hover:opacity-90 transition-opacity">
                  Proceed to Checkout
              </button>
              <p className="text-xs text-center mt-4 text-foreground/50">
                  Estimated shipping: Q3 2024
              </p>
          </div>
      </div>

    </div>
  );
}
