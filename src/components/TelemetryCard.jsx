"use client";

import { useState, useEffect, useRef } from "react";
import { useTelemetry } from "./TelemetryContext";

// Generate initial history for smooth startup
const generateInitialHistory = (metricKey, currentValue) => {
  const history = [];
  const count = 20;
  
  for (let i = 0; i < count; i++) {
    // Generate values with small variations around current value
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const value = currentValue * (1 + variation);
    history.push(value);
  }
  
  return history;
};

export default function TelemetryCard({ label, metricKey, unit, icon }) {
  const metrics = useTelemetry();
  const displayValue = metrics[metricKey];
  const [history, setHistory] = useState(() => generateInitialHistory(metricKey, displayValue));
  const canvasRef = useRef(null);
  const maxHistoryLength = 20;
  const animationRef = useRef(null);
  const lastUpdateTime = useRef(Date.now());
  const scrollOffset = useRef(0);
  const smoothMin = useRef(displayValue * 0.95);
  const smoothMax = useRef(displayValue * 1.05);

  // Update history when value changes
  useEffect(() => {
    setHistory(prev => {
      // Only add new value if it's different from the last one
      if (prev.length > 0 && prev[prev.length - 1] === displayValue) {
        return prev;
      }
      const updated = [...prev, displayValue];
      return updated.slice(-maxHistoryLength);
    });
    lastUpdateTime.current = Date.now();
    // Reset scroll offset when new value arrives
    scrollOffset.current = 0;
  }, [displayValue]);

  // Draw sparkline with smooth animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate actual min/max from history
      const actualMin = Math.min(...history);
      const actualMax = Math.max(...history);
      
      // Smoothly interpolate towards actual min/max (exponential smoothing)
      const smoothingFactor = 0.1;
      smoothMin.current = smoothMin.current + (actualMin - smoothMin.current) * smoothingFactor;
      smoothMax.current = smoothMax.current + (actualMax - smoothMax.current) * smoothingFactor;
      
      const range = smoothMax.current - smoothMin.current || 1;
      
      // Add 20% padding to top and bottom
      const padding = range * 0.2;
      const paddedMin = smoothMin.current - padding;
      const paddedMax = smoothMax.current + padding;
      const paddedRange = paddedMax - paddedMin;

      // Calculate interpolation progress (0-1) based on time since last update
      const timeSinceUpdate = Date.now() - lastUpdateTime.current;
      const interpolationDuration = 800; // Match the telemetry update interval
      const progress = Math.min(timeSinceUpdate / interpolationDuration, 1);

      // Update scroll offset for smooth horizontal movement
      scrollOffset.current = progress;

      // Create interpolated history for smooth animation
      const interpolatedHistory = [...history];
      if (progress < 1 && history.length >= 2) {
        // Interpolate the last value
        const prevValue = history[history.length - 2];
        const currentValue = history[history.length - 1];
        interpolatedHistory[history.length - 1] = prevValue + (currentValue - prevValue) * progress;
      }

      // Calculate point spacing
      const pointSpacing = width / (maxHistoryLength - 1);
      const horizontalOffset = scrollOffset.current * pointSpacing;

      // Convert values to points with horizontal scroll offset
      const points = interpolatedHistory.map((value, index) => ({
        x: (index / (maxHistoryLength - 1)) * width - horizontalOffset,
        y: height - ((value - paddedMin) / paddedRange) * height
      }));

      // Add an extra interpolated point on the right if we're mid-transition
      if (progress < 1 && history.length >= 2) {
        const lastValue = interpolatedHistory[interpolatedHistory.length - 1];
        points.push({
          x: width,
          y: height - ((lastValue - paddedMin) / paddedRange) * height
        });
      }

      // Draw smooth curve using quadratic bezier curves
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.3)';
      ctx.lineWidth = 1.5;

      // Filter points that are visible on canvas
      const visiblePoints = points.filter(p => p.x >= -10 && p.x <= width + 10);
      
      if (visiblePoints.length > 0) {
        // Start at first visible point
        ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);

        // Draw smooth curve through points
        for (let i = 0; i < visiblePoints.length - 1; i++) {
          const current = visiblePoints[i];
          const next = visiblePoints[i + 1];
          
          // Calculate control point for smooth curve
          const controlX = (current.x + next.x) / 2;
          const controlY = (current.y + next.y) / 2;
          
          ctx.quadraticCurveTo(current.x, current.y, controlX, controlY);
        }
        
        // Draw to last point
        const lastPoint = visiblePoints[visiblePoints.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);
        ctx.stroke();

        // Draw filled area
        ctx.lineTo(lastPoint.x, height);
        ctx.lineTo(visiblePoints[0].x, height);
        ctx.closePath();
        ctx.fillStyle = 'rgba(249, 115, 22, 0.05)';
        ctx.fill();
      }

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
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
