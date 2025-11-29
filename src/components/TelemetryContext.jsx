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
        // Increased range: 35-65°C
        const targetTemp = 35 + (newCpuLoad * 30);
        let cpuTemp = prev.cpuTemp + (targetTemp - prev.cpuTemp) * 0.3;
        // Ensure temperature always changes by at least 0.1°C
        if (Math.abs(cpuTemp - prev.cpuTemp) < 0.1) {
          cpuTemp = prev.cpuTemp + (Math.random() > 0.5 ? 0.1 : -0.1);
        }
        
        // Fan speed responds to temperature
        const targetFanSpeed = 600 + (cpuTemp - 35) * 13.33; // 600-1000 RPM range
        let fanSpeed = prev.fanSpeed + (targetFanSpeed - prev.fanSpeed) * 0.25;
        // Ensure fan speed always changes by at least 1 RPM
        if (Math.abs(fanSpeed - prev.fanSpeed) < 1) {
          fanSpeed = prev.fanSpeed + (Math.random() > 0.5 ? 1 : -1);
        }
        
        // Power draw correlates with CPU load and fan speed
        const basePower = 8 + (newCpuLoad * 10); // 8-18W from CPU
        const fanPower = (fanSpeed - 600) / 400 * 2; // 0-2W from fan
        let powerDraw = basePower + fanPower + (Math.random() - 0.5) * 0.5;
        // Ensure power draw always changes by at least 0.1W
        if (Math.abs(powerDraw - prev.powerDraw) < 0.1) {
          powerDraw = prev.powerDraw + (Math.random() > 0.5 ? 0.1 : -0.1);
        }
        
        // Network has independent smooth variation
        const networkChange = (Math.random() - 0.5) * 0.15;
        let network = Math.max(0.8, Math.min(2.0, prev.network + networkChange));
        // Ensure network always changes by at least 0.1 Gbps
        if (Math.abs(network - prev.network) < 0.1) {
          network = prev.network + (Math.random() > 0.5 ? 0.1 : -0.1);
          network = Math.max(0.8, Math.min(2.0, network));
        }
        
        // Humidity has very slow, smooth variation
        const humidityChange = (Math.random() - 0.5) * 0.3;
        let humidity = Math.max(40, Math.min(50, prev.humidity + humidityChange));
        // Ensure humidity always changes by at least 1%
        if (Math.abs(humidity - prev.humidity) < 1) {
          humidity = prev.humidity + (Math.random() > 0.5 ? 1 : -1);
          humidity = Math.max(40, Math.min(50, humidity));
        }

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
