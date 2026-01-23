"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const gpuConfigs = [
  {
    gpus: 1,
    label: "1x GPU",
    vram: "96GB",
    epochRate: 20,
    renderSpeed: 1,
    inference: 60,
    power: 420,
  },
  {
    gpus: 2,
    label: "2x GPU",
    vram: "192GB",
    epochRate: 38,
    renderSpeed: 1.85,
    inference: 120,
    power: 780,
  },
  {
    gpus: 3,
    label: "3x GPU",
    vram: "288GB",
    epochRate: 56,
    renderSpeed: 2.7,
    inference: 180,
    power: 1140,
  }
];

export default function MagnitudeSlider() {
  const [gpuIndex, setGpuIndex] = useState(0);
  const config = gpuConfigs[gpuIndex];

  return (
    <div className="w-full">
      {/* Slider */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-sans text-xs text-foreground/40 uppercase tracking-widest">Compute Magnitude</span>
          <span className="font-serif text-lg text-foreground">{config.label}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={gpuIndex}
            onChange={(e) => setGpuIndex(parseInt(e.target.value))}
            className="w-full h-1 appearance-none bg-foreground/10 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
          />
          <div className="flex justify-between mt-2">
            {gpuConfigs.map((c, i) => (
              <span
                key={i}
                className={`font-mono text-[10px] transition-colors duration-300 ${i === gpuIndex ? "text-foreground/70" : "text-foreground/20"}`}
              >
                {c.gpus}x
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vector Arrow Visualization */}
      <div className="flex items-center justify-center mb-10 h-16 relative overflow-hidden">
        <motion.div
          className="flex items-center"
          animate={{ width: `${30 + gpuIndex * 30}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/40 to-foreground/60" />
          <div className="w-0 h-0 border-l-[8px] border-l-foreground/60 border-y-[4px] border-y-transparent" />
        </motion.div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-sans text-[10px] text-foreground/30 uppercase tracking-widest">
          Same direction. Scaled magnitude.
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
        <div className="bg-background p-4 md:p-6 text-center">
          <motion.div
            key={config.vram}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl text-foreground mb-1"
          >
            {config.vram}
          </motion.div>
          <div className="font-sans text-[10px] text-foreground/40 uppercase tracking-wider">VRAM</div>
        </div>
        <div className="bg-background p-4 md:p-6 text-center">
          <motion.div
            key={config.epochRate}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl text-foreground mb-1"
          >
            {config.epochRate}
          </motion.div>
          <div className="font-sans text-[10px] text-foreground/40 uppercase tracking-wider">epochs/hr</div>
        </div>
        <div className="bg-background p-4 md:p-6 text-center">
          <motion.div
            key={config.inference}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl text-foreground mb-1"
          >
            {config.inference}
          </motion.div>
          <div className="font-sans text-[10px] text-foreground/40 uppercase tracking-wider">tok/s</div>
        </div>
        <div className="bg-background p-4 md:p-6 text-center">
          <motion.div
            key={config.renderSpeed}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl text-foreground mb-1"
          >
            {config.renderSpeed}x
          </motion.div>
          <div className="font-sans text-[10px] text-foreground/40 uppercase tracking-wider">render speed</div>
        </div>
      </div>
    </div>
  );
}
