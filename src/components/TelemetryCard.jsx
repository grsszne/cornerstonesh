"use client";

import { useState, useEffect, useRef } from "react";
import { useTelemetry } from "./TelemetryContext";

export default function TelemetryCard({ label, metricKey, unit, icon }) {
  const metrics = useTelemetry();
  const displayValue = metrics[metricKey];
  const [history, setHistory] = useState([displayValue]);
  const canvasRef = useRef(null);
  const maxHistoryLength = 20;

  // Update history when value changes
  useEffect(() => {
    setHistory(prev => {
      const updated = [...prev, displayValue];
      return updated.slice(-maxHistoryLength);
    });
  }, [displayValue]);

  // Draw sparkline
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate min/max for scaling
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1; // Avoid division by zero

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.3)'; // Orange with transparency
    ctx.lineWidth = 1.5;

    history.forEach((value, index) => {
      const x = (index / (maxHistoryLength - 1)) * width;
      const y = height - ((value - min) / range) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw filled area
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = 'rgba(249, 115, 22, 0.05)';
    ctx.fill();
  }, [history]);

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/5 dark:border-white/5 flex flex-col justify-between aspect-square relative overflow-hidden">
      {/* Sparkline background */}
      <canvas 
        ref={canvasRef}
        width={200}
        height={200}
        className="absolute inset-0 w-full h-full opacity-60"
      />
      
      {/* Content */}
      <div className="relative z-10 text-orange-500 text-xl mb-2">{icon}</div>
      <div className="relative z-10">
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
