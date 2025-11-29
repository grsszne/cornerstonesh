"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TelemetryContext = createContext(null);

export function TelemetryProvider({ children }) {
  const [metrics, setMetrics] = useState({
    cpuLoad: 0.3, // 0-1 scale representing CPU load
    fanSpeed: 800,
    cpuTemp: 42,
    powerDraw: 12,
    network: 1.2,
    humidity: 45,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        // Smooth random walk for CPU load (this drives other metrics)
        const cpuLoadChange = (Math.random() - 0.5) * 0.05;
        const newCpuLoad = Math.max(0.2, Math.min(0.8, prev.cpuLoad + cpuLoadChange));
        
        // CPU temp correlates with CPU load (with some lag/smoothing)
        const targetTemp = 38 + (newCpuLoad * 20); // 38-58°C range
        const cpuTemp = prev.cpuTemp + (targetTemp - prev.cpuTemp) * 0.3;
        
        // Fan speed responds to temperature
        const targetFanSpeed = 600 + (cpuTemp - 38) * 20; // 600-1000 RPM range
        const fanSpeed = prev.fanSpeed + (targetFanSpeed - prev.fanSpeed) * 0.25;
        
        // Power draw correlates with CPU load and fan speed
        const basePower = 8 + (newCpuLoad * 10); // 8-18W from CPU
        const fanPower = (fanSpeed - 600) / 400 * 2; // 0-2W from fan
        const powerDraw = basePower + fanPower + (Math.random() - 0.5) * 0.5;
        
        // Network has independent smooth variation
        const networkChange = (Math.random() - 0.5) * 0.15;
        const network = Math.max(0.8, Math.min(2.0, prev.network + networkChange));
        
        // Humidity has very slow, smooth variation
        const humidityChange = (Math.random() - 0.5) * 0.3;
        const humidity = Math.max(40, Math.min(50, prev.humidity + humidityChange));

        return {
          cpuLoad: newCpuLoad,
          fanSpeed: Math.round(fanSpeed),
          cpuTemp: Math.round(cpuTemp * 10) / 10,
          powerDraw: Math.round(powerDraw * 10) / 10,
          network: Math.round(network * 10) / 10,
          humidity: Math.round(humidity),
        };
      });
    }, 800); // Update every 800ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <TelemetryContext.Provider value={metrics}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error("useTelemetry must be used within TelemetryProvider");
  }
  return context;
}
