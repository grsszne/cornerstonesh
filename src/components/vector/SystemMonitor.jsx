"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default function SystemMonitor() {
  const [paused, setPaused] = useState(false);
  const [stats, setStats] = useState({
    gpus: [
      { util: 72, temp: 68, mem: 84, power: 320 },
      { util: 68, temp: 66, mem: 79, power: 305 },
      { util: 75, temp: 70, mem: 88, power: 335 }
    ],
    totalPower: 960,
    fanRpm: [2100, 1950, 2050],
    epochProgress: 0,
    epochCount: 147,
    batchesPerSec: 12.4,
    trainingLoss: 0.0342
  });
  const intervalRef = useRef(null);
  const epochTimerRef = useRef(0);

  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setStats(prev => {
        epochTimerRef.current += 1;
        const epoching = epochTimerRef.current > 40 && epochTimerRef.current < 50;
        const epochComplete = epochTimerRef.current >= 50;

        if (epochComplete) {
          epochTimerRef.current = 0;
        }

        const gpus = prev.gpus.map(gpu => {
          const targetUtil = epoching ? randomInRange(95, 100) : randomInRange(60, 88);
          const targetTemp = epoching ? randomInRange(74, 80) : randomInRange(64, 72);
          return {
            util: Math.round(lerp(gpu.util, targetUtil, 0.15)),
            temp: Math.round(lerp(gpu.temp, targetTemp, 0.08)),
            mem: Math.round(lerp(gpu.mem, randomInRange(75, 92), 0.05)),
            power: Math.round(lerp(gpu.power, epoching ? randomInRange(380, 420) : randomInRange(280, 350), 0.1))
          };
        });

        const totalPower = gpus.reduce((sum, g) => sum + g.power, 0) + 180;

        return {
          gpus,
          totalPower,
          fanRpm: prev.fanRpm.map(rpm => Math.round(lerp(rpm, randomInRange(1800, 2400), 0.1))),
          epochProgress: epochComplete ? 0 : Math.min((epochTimerRef.current / 50) * 100, 100),
          epochCount: epochComplete ? prev.epochCount + 1 : prev.epochCount,
          batchesPerSec: parseFloat(lerp(prev.batchesPerSec, randomInRange(11, 14), 0.1).toFixed(1)),
          trainingLoss: parseFloat(lerp(prev.trainingLoss, Math.max(0.001, prev.trainingLoss - randomInRange(0, 0.0005)), 0.05).toFixed(4))
        };
      });
    }, 300);

    return () => clearInterval(intervalRef.current);
  }, [paused]);

  return (
    <motion.div
      className="bg-[#0D0D0D] border border-foreground/10 rounded-lg p-5 font-mono text-xs max-w-sm w-full cursor-default select-none"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${paused ? "bg-yellow-500" : "bg-green-500 animate-pulse"}`} />
          <span className="text-foreground/60 uppercase tracking-widest text-[10px]">Vector System Monitor</span>
        </div>
        <span className="text-foreground/30 text-[10px]">{paused ? "PAUSED" : "LIVE"}</span>
      </div>

      {/* GPU Bars */}
      <div className="space-y-2.5 mb-4">
        {stats.gpus.map((gpu, i) => (
          <div key={i}>
            <div className="flex justify-between text-foreground/40 mb-1">
              <span>GPU {i} — RTX Pro 6000</span>
              <span className="text-foreground/60">{gpu.temp}°C</span>
            </div>
            <div className="h-1.5 bg-foreground/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${gpu.util}%`,
                  background: gpu.util > 90
                    ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                    : "linear-gradient(90deg, rgba(245,245,247,0.3), rgba(245,245,247,0.6))"
                }}
              />
            </div>
            <div className="flex justify-between text-foreground/25 mt-0.5">
              <span>{gpu.util}% util</span>
              <span>{gpu.mem}% VRAM</span>
              <span>{gpu.power}W</span>
            </div>
          </div>
        ))}
      </div>

      {/* Training Progress */}
      <div className="border-t border-foreground/5 pt-3 mb-3">
        <div className="flex justify-between text-foreground/40 mb-1.5">
          <span>Training — Epoch {stats.epochCount}</span>
          <span className="text-foreground/60">{Math.round(stats.epochProgress)}%</span>
        </div>
        <div className="h-1 bg-foreground/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent/60 rounded-full transition-all duration-300"
            style={{ width: `${stats.epochProgress}%` }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 text-center border-t border-foreground/5 pt-3">
        <div>
          <div className="text-foreground/60 text-[11px] tabular-nums">{stats.batchesPerSec}</div>
          <div className="text-foreground/25 text-[9px] uppercase">batch/s</div>
        </div>
        <div>
          <div className="text-foreground/60 text-[11px] tabular-nums">{stats.trainingLoss}</div>
          <div className="text-foreground/25 text-[9px] uppercase">loss</div>
        </div>
        <div>
          <div className="text-foreground/60 text-[11px] tabular-nums">{stats.totalPower}W</div>
          <div className="text-foreground/25 text-[9px] uppercase">total</div>
        </div>
      </div>
    </motion.div>
  );
}
