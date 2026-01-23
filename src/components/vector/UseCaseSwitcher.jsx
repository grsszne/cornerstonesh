"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const useCases = [
  {
    id: "ai",
    tab: "AI Development",
    title: "AI Infrastructure",
    subtitle: "On-premise. Sovereign. Scalable.",
    description: "Train and deploy models on-premise with complete data sovereignty. End cloud dependency for development workflows. Vector AI configurations deliver $12K\u2013$42K of compute that would cost $50K+ monthly in AWS equivalent costs. Own your infrastructure, control your timeline, scale at marginal cost.",
    specs: [
      { label: "VRAM", value: "288GB" },
      { label: "Precision", value: "FP16/BF16" },
      { label: "NVLink", value: "Supported" },
      { label: "Batch Size", value: "Unlimited" }
    ],
    software: ["PyTorch", "TensorFlow", "JAX", "Hugging Face"],
    config: "Vector AI"
  },
  {
    id: "render",
    tab: "3D & VFX",
    title: "3D Rendering & VFX",
    subtitle: "Professional RTX compute.",
    description: "Accelerate Blender, Cinema 4D, and Houdini workflows with professional RTX compute. Vector Render configurations optimize for viewport performance and final frame rendering. Expandable storage supports large asset libraries and cache files.",
    specs: [
      { label: "CUDA Cores", value: "36,864" },
      { label: "RT Cores", value: "288" },
      { label: "Viewport", value: "Real-time" },
      { label: "Storage", value: "48TB+" }
    ],
    software: ["Blender", "Cinema 4D", "Houdini", "Maya"],
    config: "Vector Render"
  },
  {
    id: "video",
    tab: "Video",
    title: "Video Production",
    subtitle: "Real-time 8K timelines.",
    description: "Real-time 8K timelines in DaVinci Resolve and Premiere Pro. Hardware-accelerated encoding for delivery. Vector Edit configurations balance GPU compute with high-bandwidth storage for smooth editing workflows.",
    specs: [
      { label: "Timeline", value: "8K Real-time" },
      { label: "Encode", value: "HW Accel" },
      { label: "I/O", value: "PCIe 5.0" },
      { label: "Bandwidth", value: "128GB/s" }
    ],
    software: ["DaVinci Resolve", "Premiere Pro", "After Effects", "Nuke"],
    config: "Vector Edit"
  },
  {
    id: "gamedev",
    tab: "Game Dev",
    title: "Creative Development",
    subtitle: "Instant iteration.",
    description: "Unity and Unreal Engine development with instant iteration. Professional viewport performance and light baking. Configurations tailored for real-time rendering and interactive experiences.",
    specs: [
      { label: "Nanite", value: "Full Support" },
      { label: "Lumen", value: "Real-time" },
      { label: "RT Cores", value: "288" },
      { label: "DLSS", value: "4.0" }
    ],
    software: ["Unreal Engine", "Unity", "Godot", "Custom Engine"],
    config: "Vector Render"
  }
];

export default function UseCaseSwitcher() {
  const [active, setActive] = useState(0);
  const current = useCases[active];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0 border-b border-foreground/10 mb-10 overflow-x-auto scrollbar-hide">
        {useCases.map((uc, i) => (
          <button
            key={uc.id}
            onClick={() => setActive(i)}
            className={`relative font-sans text-sm px-5 py-3 whitespace-nowrap transition-colors duration-300 ${
              active === i ? "text-foreground" : "text-foreground/35 hover:text-foreground/60"
            }`}
          >
            {uc.tab}
            {active === i && (
              <motion.div
                layoutId="useCaseTab"
                className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left - Description */}
            <div className="lg:col-span-7">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-sans text-xs text-accent uppercase tracking-widest">{current.config}</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-2">{current.title}</h3>
              <p className="font-sans text-sm text-foreground/50 mb-5 uppercase tracking-wider">{current.subtitle}</p>
              <p className="font-sans text-foreground/65 leading-relaxed mb-8">{current.description}</p>

              {/* Software tags */}
              <div className="flex flex-wrap gap-2">
                {current.software.map((sw, i) => (
                  <motion.span
                    key={sw}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="font-mono text-[11px] text-foreground/50 border border-foreground/10 px-3 py-1.5"
                  >
                    {sw}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right - Specs */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
                {current.specs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-background p-5 text-center"
                  >
                    <div className="font-serif text-xl text-foreground mb-1">{spec.value}</div>
                    <div className="font-sans text-[10px] text-foreground/35 uppercase tracking-widest">{spec.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
