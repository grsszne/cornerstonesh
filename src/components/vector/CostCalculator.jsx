"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const presets = {
  small: { label: "Small Team", cloudMonthly: 23000, vectorCost: 36000 },
  full: { label: "Full Lab", cloudMonthly: 42000, vectorCost: 39000 },
  enterprise: { label: "Enterprise", cloudMonthly: 60000, vectorCost: 42000 }
};

export default function CostCalculator() {
  const [activePreset, setActivePreset] = useState("full");
  const [hoverMonth, setHoverMonth] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const preset = presets[activePreset];
  const months = 36;

  // Calculate break-even month
  const breakEvenMonth = Math.ceil(preset.vectorCost / preset.cloudMonthly);

  // Chart dimensions
  const chartW = 700;
  const chartH = 300;
  const padL = 60;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;

  const maxCost = preset.cloudMonthly * months;

  const getCloudY = (month) => padT + innerH - (((preset.cloudMonthly * month) / maxCost) * innerH);
  const getVectorY = (month) => padT + innerH - ((preset.vectorCost / maxCost) * innerH);
  const getX = (month) => padL + (month / months) * innerW;

  // Generate path strings
  const cloudPath = Array.from({ length: months + 1 }, (_, i) => {
    const x = getX(i);
    const y = getCloudY(i);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  const vectorPath = `M ${getX(0)} ${getVectorY(0)} L ${getX(months)} ${getVectorY(0)}`;

  // Savings area (between lines after break-even)
  const savingsPath = (() => {
    const points = [];
    for (let i = breakEvenMonth; i <= months; i++) {
      points.push(`${getX(i)},${getCloudY(i)}`);
    }
    for (let i = months; i >= breakEvenMonth; i--) {
      points.push(`${getX(i)},${getVectorY(i)}`);
    }
    return points.join(" ");
  })();

  const totalSavings = (preset.cloudMonthly * months) - preset.vectorCost;

  return (
    <div ref={containerRef} className="w-full">
      {/* Preset Tabs */}
      <div className="flex gap-2 mb-8">
        {Object.entries(presets).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActivePreset(key)}
            className={`font-sans text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
              activePreset === key
                ? "border-foreground/40 text-foreground bg-foreground/5"
                : "border-foreground/10 text-foreground/40 hover:border-foreground/20 hover:text-foreground/60"
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative overflow-hidden">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full h-auto"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * chartW;
            const month = Math.round(((x - padL) / innerW) * months);
            if (month >= 0 && month <= months) setHoverMonth(month);
          }}
          onMouseLeave={() => setHoverMonth(null)}
        >
          {/* Grid lines */}
          {[0, 6, 12, 18, 24, 30, 36].map(m => (
            <line
              key={m}
              x1={getX(m)}
              y1={padT}
              x2={getX(m)}
              y2={chartH - padB}
              stroke="currentColor"
              strokeOpacity={0.05}
              strokeWidth={1}
            />
          ))}

          {/* X-axis labels */}
          {[0, 6, 12, 18, 24, 30, 36].map(m => (
            <text
              key={`label-${m}`}
              x={getX(m)}
              y={chartH - 10}
              textAnchor="middle"
              className="fill-foreground/30 text-[10px] font-sans"
            >
              {m}mo
            </text>
          ))}

          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(frac => (
            <text
              key={`y-${frac}`}
              x={padL - 8}
              y={padT + innerH - frac * innerH + 3}
              textAnchor="end"
              className="fill-foreground/25 text-[9px] font-sans"
            >
              ${Math.round((maxCost * frac) / 1000)}K
            </text>
          ))}

          {/* Savings area */}
          {isInView && (
            <motion.polygon
              points={savingsPath}
              fill="currentColor"
              fillOpacity={0.04}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            />
          )}

          {/* Cloud cost line */}
          <motion.path
            d={cloudPath}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Vector cost line */}
          <motion.path
            d={vectorPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeOpacity={0.7}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />

          {/* Break-even point */}
          {isInView && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
            >
              <circle
                cx={getX(breakEvenMonth)}
                cy={getVectorY(breakEvenMonth)}
                r={5}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeOpacity={0.6}
              />
              <circle
                cx={getX(breakEvenMonth)}
                cy={getVectorY(breakEvenMonth)}
                r={2}
                fill="currentColor"
                fillOpacity={0.8}
              />
            </motion.g>
          )}

          {/* Hover indicator */}
          {hoverMonth !== null && (
            <>
              <line
                x1={getX(hoverMonth)}
                y1={padT}
                x2={getX(hoverMonth)}
                y2={chartH - padB}
                stroke="currentColor"
                strokeOpacity={0.15}
                strokeWidth={1}
                strokeDasharray="3,3"
              />
              <circle cx={getX(hoverMonth)} cy={getCloudY(hoverMonth)} r={3} fill="#ef4444" />
              <circle cx={getX(hoverMonth)} cy={getVectorY(hoverMonth)} r={3} fill="currentColor" fillOpacity={0.7} />
            </>
          )}
        </svg>

        {/* Hover tooltip */}
        {hoverMonth !== null && (
          <div
            className="absolute top-4 bg-[#0D0D0D] border border-foreground/10 px-3 py-2 pointer-events-none font-mono text-[10px] z-10"
            style={{ left: `${((getX(hoverMonth)) / chartW) * 100}%`, transform: "translateX(-50%)" }}
          >
            <div className="text-foreground/50 mb-1">Month {hoverMonth}</div>
            <div className="text-red-400">Cloud: ${(preset.cloudMonthly * hoverMonth).toLocaleString()}</div>
            <div className="text-foreground/70">Vector: ${preset.vectorCost.toLocaleString()}</div>
            {hoverMonth > breakEvenMonth && (
              <div className="text-green-400/70 mt-1 border-t border-foreground/5 pt-1">
                Saved: ${((preset.cloudMonthly * hoverMonth) - preset.vectorCost).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend & Stats */}
      <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
        <div className="flex items-center gap-6 font-sans text-xs">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-red-500 rounded-full" />
            <span className="text-foreground/50">Cloud (monthly)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-foreground/70 rounded-full" />
            <span className="text-foreground/50">Vector (one-time)</span>
          </div>
        </div>
        <div className="font-sans text-xs text-foreground/40">
          Break-even: <span className="text-foreground/70">{breakEvenMonth} {breakEvenMonth === 1 ? "month" : "months"}</span>
          {" "}&middot;{" "}
          36-month savings: <span className="text-green-400/70">${(totalSavings / 1000).toFixed(0)}K</span>
        </div>
      </div>
    </div>
  );
}
