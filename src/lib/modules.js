
import React from 'react';

// Helper to keep 'b' lowercase in network speed labels (GbE, Gbps, Mbps)
export const formatNetworkLabel = (label) => {
    if (typeof label !== 'string') return label;
    if (label.includes('GbE')) {
        const parts = label.split('GbE');
        return <>{parts[0]}G<span className="lowercase">b</span>E{parts[1]}</>;
    }
    return label;
};

export const MODULE_CATEGORIES = {
    storage: {
        label: "Storage",
        description: "High-speed NVMe storage for your data. PCIe Gen 3.",
        modules: [
            { id: "storage-256", label: "256GB NVMe", price: 40, score: 10, type: "storage", color: "orange" },
            { id: "storage-512", label: "512GB NVMe", price: 100, score: 20, type: "storage", color: "orange" },
            { id: "storage-1tb", label: "1TB NVMe", price: 130, score: 40, type: "storage", color: "orange" },
            { id: "storage-2tb", label: "2TB NVMe", price: 200, score: 60, type: "storage", color: "orange" },
            { id: "storage-4tb", label: "4TB NVMe", price: 400, score: 100, type: "storage", color: "orange" },
            { id: "storage-8tb", label: "8TB NVMe", price: 950, score: 150, type: "storage", color: "orange" },
        ]
    },
    connectivity: {
        label: "Connectivity",
        description: "Expand your network and peripheral connections.",
        modules: [
            { id: "ethernet-2.5", label: "2.5GbE", price: 80, score: 25, type: "ethernet", color: "green", description: "2.5 Gigabit Ethernet adapter" },
            { id: "ethernet-5", label: "5GbE", price: 120, score: 40, type: "ethernet", color: "emerald", description: "5 Gigabit Ethernet adapter" },
            { id: "ethernet-10", label: "10GbE", price: 200, score: 60, type: "ethernet", color: "teal", description: "10 Gigabit Ethernet adapter" },
            { id: "oculink", label: "Oculink", price: 80, score: 35, type: "oculink", color: "cyan", description: "Oculink PCIe expansion port" },
            { id: "usb-c", label: "USB-C 3.0", price: 60, score: 20, type: "usb", color: "blue", description: "Single-port USB-C 3.0 expansion" },
            { id: "usb-a", label: "USB-A 3.0", price: 50, score: 15, type: "usb", color: "blue", description: "Single-port USB-A 3.0 expansion" },
            { id: "sd-reader", label: "Dual SD", price: 60, score: 20, type: "reader", color: "yellow", description: "Dual UHS-II SD / Micro SD Reader" },
        ]
    },
    utility: {
        label: "Utility",
        description: "Power protection and hardware development tools.",
        modules: [
            { id: "ups", label: "UPS", price: 220, score: 30, type: "ups", color: "purple", description: "Uninterruptible Power Supply" },
            { id: "gpio", label: "GPIO", price: 40, score: 15, type: "gpio", color: "pink", description: "GPIO Revealer Module for developers" },
        ]
    },
    accessories: {
        label: "Accessories",
        description: "Optional add-ons for your Foundation.",
        modules: [
            { id: "nightlight", label: "Ambient Light", price: 25, score: 5, type: "light", color: "cyan", description: "Dimmable ambient LED module" },
            { id: "fan", label: "Cooling Fan", price: 20, score: 5, type: "fan", color: "gray", description: "High-performance silent cooling fan" },
        ]
    }
};

export const MODULE_OPTIONS = [
    ...MODULE_CATEGORIES.storage.modules,
    ...MODULE_CATEGORIES.connectivity.modules,
    ...MODULE_CATEGORIES.utility.modules,
    ...MODULE_CATEGORIES.accessories.modules
];

export const getModuleColorClass = (module, variant = "bg") => {
    const colors = {
        orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-500" },
        blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-500" },
        green: { bg: "bg-green-500", border: "border-green-500", text: "text-green-500" },
        purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500" },
        pink: { bg: "bg-pink-500", border: "border-pink-500", text: "text-pink-500" },
        yellow: { bg: "bg-yellow-500", border: "border-yellow-500", text: "text-yellow-500" },
        cyan: { bg: "bg-cyan-500", border: "border-cyan-500", text: "text-cyan-500" },
        gray: { bg: "bg-gray-500", border: "border-gray-500", text: "text-gray-500" },
        // Adding emerald and teal support as they appear in the data
        emerald: { bg: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-500" },
        teal: { bg: "bg-teal-500", border: "border-teal-500", text: "text-teal-500" },
    };
    return colors[module.color]?.[variant] || colors.orange[variant];
};
