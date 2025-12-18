"use client";

import { useState, useEffect, useRef } from "react";
import {
  HardDrive,
  Usb,
  Lightning,
  WifiHigh,
  BatteryCharging,
  SimCard,
  Broadcast,
  CaretLeft,
  CaretRight
} from "@phosphor-icons/react";

// Helper to keep 'b' lowercase in network speed labels (GbE, Gbps, Mbps)
const formatNetworkLabel = (label) => {
  if (typeof label !== 'string') return label;
  if (label.includes('GbE')) {
    const parts = label.split('GbE');
    return <>{parts[0]}G<span className="lowercase">b</span>E{parts[1]}</>;
  }
  return label;
};

// Module types with their properties
const MODULE_TYPES = {
  STORAGE: {
    label: "SSD",
    color: "bg-blue-500",
    Icon: HardDrive,
    abbr: "SSD"
  },
  USB_A: {
    label: "USB-A 3.0",
    color: "bg-purple-500",
    Icon: Usb,
    abbr: "USB"
  },
  USB_C: {
    label: "USB-C 3.0",
    color: "bg-indigo-500",
    Icon: Lightning,
    abbr: "USC"
  },
  ETHERNET_2_5: {
    label: "2.5GbE",
    color: "bg-green-500",
    Icon: WifiHigh,
    abbr: "2.5G"
  },
  ETHERNET_5: {
    label: "5GbE",
    color: "bg-emerald-500",
    Icon: WifiHigh,
    abbr: "5GbE"
  },
  ETHERNET_10: {
    label: "10GbE",
    color: "bg-teal-500",
    Icon: Broadcast,
    abbr: "10GB"
  },
  OCULINK: {
    label: "Oculink Port",
    color: "bg-cyan-500",
    Icon: Lightning,
    abbr: "OCU"
  },
  UPS: {
    label: "UPS Battery",
    color: "bg-yellow-500",
    Icon: BatteryCharging,
    abbr: "UPS"
  },
  SD_CARD: {
    label: "SD Card",
    color: "bg-pink-500",
    Icon: SimCard,
    abbr: "SDC"
  },
  EMPTY: {
    label: "Empty",
    color: "bg-black/5 dark:bg-white/5",
    Icon: null,
    abbr: "---"
  }
};

// Predefined configurations showcasing different use cases
const CONFIGURATIONS = [
  {
    name: "Media Server",
    description: "High-capacity storage for Plex/Jellyfin",
    bays: [
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.EMPTY,
      MODULE_TYPES.EMPTY
    ]
  },
  {
    name: "Creator Workstation",
    description: "Fast offload + network transfer",
    bays: [
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.SD_CARD,
      MODULE_TYPES.USB_C,
      MODULE_TYPES.USB_A,
      MODULE_TYPES.ETHERNET_5,
      MODULE_TYPES.UPS
    ]
  },
  {
    name: "Home Lab",
    description: "Docker containers + high-speed networking",
    bays: [
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.ETHERNET_10,
      MODULE_TYPES.USB_C,
      MODULE_TYPES.OCULINK,
      MODULE_TYPES.EMPTY,
      MODULE_TYPES.EMPTY
    ]
  },
  {
    name: "Backup Station",
    description: "Redundant storage with power protection",
    bays: [
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.STORAGE,
      MODULE_TYPES.UPS,
      MODULE_TYPES.EMPTY,
      MODULE_TYPES.EMPTY
    ]
  }
];

export default function BayConfigurator() {
  const [currentConfig, setCurrentConfig] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentConfig((prev) => (prev + 1) % CONFIGURATIONS.length);
        setIsTransitioning(false);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Cleanup pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const handleDotClick = (index) => {
    // Clear any existing pause timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Navigate to clicked configuration
    setCurrentConfig(index);
    setIsTransitioning(false);

    // Pause the auto-animation
    setIsPaused(true);

    // Resume after 30 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 30000);
  };

  const handlePrev = () => {
    const newIndex = currentConfig === 0 ? CONFIGURATIONS.length - 1 : currentConfig - 1;
    handleDotClick(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentConfig === CONFIGURATIONS.length - 1 ? 0 : currentConfig + 1;
    handleDotClick(newIndex);
  };

  const config = CONFIGURATIONS[currentConfig];

  return (
    <div className="relative h-full flex flex-col">
      {/* Configuration Info Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-1">
              Configuration_{String(currentConfig + 1).padStart(2, '0')}
            </div>
            <h4 className="text-xl md:text-2xl font-medium text-black dark:text-white">
              {config.name}
            </h4>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={handlePrev}
              className="p-1.5 sm:p-2 text-black/40 dark:text-white/40 hover:text-orange-500 transition-colors cursor-pointer focus:outline-none shrink-0"
              aria-label="Previous configuration"
            >
              <CaretLeft size={14} weight="bold" className="sm:w-4 sm:h-4" />
            </button>

            <div className="flex items-center gap-0 sm:gap-0.5 mx-0.5 sm:mx-1">
              {CONFIGURATIONS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className="p-1 sm:p-1.5 group cursor-pointer focus:outline-none"
                  aria-label={`Go to ${CONFIGURATIONS[idx].name}`}
                >
                  <div
                    className={`h-1 sm:h-1.5 transition-all duration-500 rounded-full ${idx === currentConfig
                      ? 'w-6 sm:w-8 bg-orange-500'
                      : 'w-1 sm:w-1.5 bg-black/20 dark:bg-white/20 group-hover:bg-orange-500/50'
                      }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-1.5 sm:p-2 text-black/40 dark:text-white/40 hover:text-orange-500 transition-colors cursor-pointer focus:outline-none shrink-0"
              aria-label="Next configuration"
            >
              <CaretRight size={14} weight="bold" className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
        <p className={`font-mono text-xs text-black/50 dark:text-white/50 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {config.description}
        </p>
      </div>

      {/* Bay Grid Visualization */}
      <div className="grid grid-cols-7 gap-2 flex-1">
        {config.bays.map((module, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] group/bay"
          >
            {/* Bay Container */}
            <div
              className={`absolute inset-0 border transition-all duration-500 ${module === MODULE_TYPES.EMPTY
                ? 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5'
                : 'border-orange-500/50 bg-gray-100 dark:bg-zinc-900'
                }`}
              style={{
                transitionDelay: `${i * 50}ms`,
                transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
                opacity: isTransitioning ? 0.3 : 1
              }}
            >
              {/* Module Indicator Bar */}
              {module !== MODULE_TYPES.EMPTY && (
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${module.color} transition-all duration-300`}
                  style={{ transitionDelay: `${i * 50 + 200}ms` }}
                />
              )}

              {/* Module Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                {module !== MODULE_TYPES.EMPTY && module.Icon && (
                  <>
                    <module.Icon
                      size={16}
                      weight="duotone"
                      className="text-black/60 dark:text-white/60 mb-1"
                    />
                    <span className="font-mono text-[7px] md:text-[8px] text-black/60 dark:text-white/60 text-center leading-tight">
                      {formatNetworkLabel(module.abbr)}
                    </span>
                  </>
                )}

                {/* Bay Number */}
                <div className="absolute bottom-0.5 right-0.5 font-mono text-[7px] text-black/30 dark:text-white/30">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-orange-500/0 group-hover/bay:bg-orange-500/10 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Connection Indicator */}
            {module !== MODULE_TYPES.EMPTY && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-px h-2 bg-orange-500/30"
                style={{
                  transitionDelay: `${i * 50 + 300}ms`,
                  opacity: isTransitioning ? 0 : 1,
                  transition: 'opacity 300ms'
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Backplane Connection Visualization */}
      <div className="mt-4 relative">
        <div className="h-px bg-black/10 dark:bg-white/10 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            style={{
              animation: 'slideRight 3s ease-in-out infinite',
              opacity: 0.5
            }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[9px] text-black/30 dark:text-white/30 uppercase tracking-wider">
            Zero-Cable Backplane
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[9px] text-black/30 dark:text-white/30">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          {Object.values(MODULE_TYPES)
            .filter(m => m !== MODULE_TYPES.EMPTY)
            .map((module, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 ${module.color} shrink-0`} />
                <span className="font-mono text-[9px] text-black/40 dark:text-white/40 truncate">
                  {formatNetworkLabel(module.label)}
                </span>
              </div>
            ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
