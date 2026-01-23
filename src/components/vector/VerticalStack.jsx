"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const layers = [
  {
    id: "intelligence",
    label: "Intelligence",
    description: "Universal Context Engine — semantic search, workflow analysis, resource optimization",
    connections: ["software"]
  },
  {
    id: "software",
    label: "VectorOS",
    description: "Unified infrastructure management, job scheduling, monitoring",
    connections: ["intelligence", "thermal"]
  },
  {
    id: "thermal",
    label: "Thermal",
    description: "Active cooling architecture, sustained load management, predictive fan control",
    connections: ["software", "power"]
  },
  {
    id: "power",
    label: "Power",
    description: "Redundant PSU, hot-swap capable, server-grade delivery",
    connections: ["thermal", "hardware"]
  },
  {
    id: "hardware",
    label: "Hardware",
    description: "CNC-machined chassis, modular panels, RTX Pro 6000 GPUs",
    connections: ["power"]
  }
];

export default function VerticalStack() {
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="max-w-lg mx-auto">
      <div className="space-y-0">
        {layers.map((layer, i) => {
          const isHovered = hoveredLayer === layer.id;
          const isConnected = hoveredLayer && layers.find(l => l.id === hoveredLayer)?.connections.includes(layer.id);
          const dimmed = hoveredLayer && !isHovered && !isConnected;

          return (
            <div key={layer.id}>
              <motion.div
                className={`relative border border-foreground/10 p-5 md:p-6 cursor-default transition-all duration-300 ${
                  isHovered ? "bg-foreground/5 border-foreground/25" :
                  isConnected ? "bg-foreground/3 border-foreground/15" :
                  dimmed ? "opacity-30" : ""
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: dimmed ? 0.3 : 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: (layers.length - 1 - i) * 0.15 }}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[10px] text-foreground/25 uppercase tracking-widest w-6">
                      L{layers.length - i}
                    </span>
                    <span className="font-serif text-lg text-foreground">{layer.label}</span>
                  </div>
                  {/* Connection indicator */}
                  {(isHovered || isConnected) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-foreground/40"
                    />
                  )}
                </div>
                {/* Description on hover */}
                <motion.div
                  initial={false}
                  animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="font-sans text-xs text-foreground/50 mt-3 pl-10 leading-relaxed">
                    {layer.description}
                  </p>
                </motion.div>
              </motion.div>

              {/* Connection line between layers */}
              {i < layers.length - 1 && (
                <div className="flex justify-center">
                  <motion.div
                    className={`w-px h-4 transition-colors duration-300 ${
                      (isHovered && layer.connections.includes(layers[i + 1]?.id)) ||
                      (hoveredLayer === layers[i + 1]?.id && layers[i + 1]?.connections.includes(layer.id))
                        ? "bg-foreground/40"
                        : "bg-foreground/10"
                    }`}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.3, delay: (layers.length - 1 - i) * 0.15 + 0.1 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
