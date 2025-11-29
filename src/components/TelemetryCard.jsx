"use client";

import { useState, useEffect } from "react";

export default function TelemetryCard({ label, baseValue, unit, icon, range = 0.1 }) {
  const [displayValue, setDisplayValue] = useState(baseValue);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random fluctuation within the range
      const fluctuation = (Math.random() - 0.5) * 2 * range;
      const newValue = baseValue * (1 + fluctuation);
      
      // Round to appropriate decimal places based on value size
      const rounded = baseValue >= 10 
        ? Math.round(newValue * 10) / 10 
        : Math.round(newValue * 100) / 100;
      
      setDisplayValue(rounded);
    }, 1500 + Math.random() * 1000); // Random interval between 1.5-2.5s

    return () => clearInterval(interval);
  }, [baseValue, range]);

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/5 dark:border-white/5 flex flex-col justify-between aspect-square">
      <div className="text-orange-500 text-xl mb-2">{icon}</div>
      <div>
        <div className="text-lg font-bold font-mono tracking-tight transition-all duration-300">
          {displayValue}{unit}
        </div>
        <div className="text-[10px] uppercase tracking-wider opacity-60 font-mono mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}
