
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
            {
                id: "storage-256",
                label: "256GB NVMe",
                price: 40,
                score: 10,
                type: "storage",
                color: "orange",
                description: "Entry-level NVMe storage with 3200 MB/s read speeds.",
                specs: [
                    { label: "Capacity", value: "256GB" },
                    { label: "Interface", value: "PCIe Gen 3 x4" },
                    { label: "Read Speed", value: "3200 MB/s" },
                    { label: "Write Speed", value: "1800 MB/s" },
                    { label: "IOPS (Read)", value: "400K" },
                    { label: "Form Factor", value: "M.2 2280" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows"]
            },
            {
                id: "storage-512",
                label: "512GB NVMe",
                price: 100,
                score: 20,
                type: "storage",
                color: "orange",
                description: "High-performance NVMe with enhanced endurance.",
                specs: [
                    { label: "Capacity", value: "512GB" },
                    { label: "Interface", value: "PCIe Gen 3 x4" },
                    { label: "Read Speed", value: "3500 MB/s" },
                    { label: "Write Speed", value: "2500 MB/s" },
                    { label: "IOPS (Read)", value: "600K" },
                    { label: "Form Factor", value: "M.2 2280" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows"]
            },
            {
                id: "storage-1tb",
                label: "1TB NVMe",
                price: 130,
                score: 40,
                type: "storage",
                color: "orange",
                description: "1TB of blazing-fast NVMe storage for intensive workloads.",
                specs: [
                    { label: "Capacity", value: "1TB" },
                    { label: "Interface", value: "PCIe Gen 3 x4" },
                    { label: "Read Speed", value: "3500 MB/s" },
                    { label: "Write Speed", value: "3000 MB/s" },
                    { label: "IOPS (Read)", value: "680K" },
                    { label: "Form Factor", value: "M.2 2280" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows"]
            },
            {
                id: "storage-2tb",
                label: "2TB NVMe",
                price: 200,
                score: 60,
                type: "storage",
                color: "orange",
                description: "Enterprise-grade 2TB NVMe with superior reliability.",
                specs: [
                    { label: "Capacity", value: "2TB" },
                    { label: "Interface", value: "PCIe Gen 3 x4" },
                    { label: "Read Speed", value: "3500 MB/s" },
                    { label: "Write Speed", value: "3200 MB/s" },
                    { label: "IOPS (Read)", value: "700K" },
                    { label: "Form Factor", value: "M.2 2280" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows"]
            },
            {
                id: "storage-4tb",
                label: "4TB NVMe",
                price: 400,
                score: 100,
                type: "storage",
                color: "orange",
                description: "Massive 4TB capacity for data-intensive applications.",
                specs: [
                    { label: "Capacity", value: "4TB" },
                    { label: "Interface", value: "PCIe Gen 3 x4" },
                    { label: "Read Speed", value: "3500 MB/s" },
                    { label: "Write Speed", value: "3300 MB/s" },
                    { label: "IOPS (Read)", value: "750K" },
                    { label: "Form Factor", value: "M.2 2280" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows"]
            },
            {
                id: "storage-8tb",
                label: "8TB NVMe",
                price: 950,
                score: 150,
                type: "storage",
                color: "orange",
                description: "Maximum capacity NVMe storage for professional workflows.",
                specs: [
                    { label: "Capacity", value: "8TB" },
                    { label: "Interface", value: "PCIe Gen 3 x4" },
                    { label: "Read Speed", value: "3500 MB/s" },
                    { label: "Write Speed", value: "3300 MB/s" },
                    { label: "IOPS (Read)", value: "800K" },
                    { label: "Form Factor", value: "M.2 2280" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows"]
            },
        ]
    },
    networking: {
        label: "Networking",
        description: "Network connectivity options for your Foundation. Wired Ethernet strongly recommended over wifi for reliable server operation.",
        modules: [
            {
                id: "ethernet-1",
                label: "1GbE",
                price: 0,
                score: 10,
                type: "ethernet",
                color: "green",
                description: "1 Gigabit Ethernet adapter with RJ45 connector. First one included, additional ports $65 each.",
                specs: [
                    { label: "Speed", value: "1 Gbps" },
                    { label: "Interface", value: "PCIe Gen 2 x1" },
                    { label: "Connector", value: "RJ45" },
                    { label: "Standards", value: "IEEE 802.3ab" },
                    { label: "Power", value: "2W" },
                    { label: "Latency", value: "<1ms" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows", "macOS"]
            },
            {
                id: "ethernet-2.5",
                label: "2.5GbE",
                price: 80,
                score: 25,
                type: "ethernet",
                color: "green",
                description: "2.5 Gigabit Ethernet adapter with RJ45 connector.",
                specs: [
                    { label: "Speed", value: "2.5 Gbps" },
                    { label: "Interface", value: "PCIe Gen 2 x1" },
                    { label: "Connector", value: "RJ45" },
                    { label: "Standards", value: "IEEE 802.3bz" },
                    { label: "Power", value: "3W" },
                    { label: "Latency", value: "<1ms" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows", "macOS"]
            },
            {
                id: "ethernet-5",
                label: "5GbE",
                price: 120,
                score: 40,
                type: "ethernet",
                color: "green",
                description: "5 Gigabit Ethernet adapter for high-bandwidth networks.",
                specs: [
                    { label: "Speed", value: "5 Gbps" },
                    { label: "Interface", value: "PCIe Gen 3 x1" },
                    { label: "Connector", value: "RJ45" },
                    { label: "Standards", value: "IEEE 802.3bz" },
                    { label: "Power", value: "4W" },
                    { label: "Latency", value: "<1ms" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows", "macOS"]
            },
            {
                id: "ethernet-10",
                label: "10GbE",
                price: 200,
                score: 60,
                type: "ethernet",
                color: "green",
                description: "10 Gigabit Ethernet for professional networking.",
                specs: [
                    { label: "Speed", value: "10 Gbps" },
                    { label: "Interface", value: "PCIe Gen 3 x4" },
                    { label: "Connector", value: "SFP+" },
                    { label: "Standards", value: "IEEE 802.3ae" },
                    { label: "Power", value: "8W" },
                    { label: "Latency", value: "<0.5ms" },
                ],
                compatibility: ["Foundation v2", "Linux", "Windows", "macOS"]
            },
            {
                id: "wifi-6",
                label: "Wi-Fi 6",
                price: 60,
                score: 30,
                type: "wifi",
                color: "green",
                description: "Wi-Fi 6 (802.11ax) wireless adapter with dual-band support. Note: Wired connections strongly recommended for server reliability.",
                specs: [
                    { label: "Standard", value: "Wi-Fi 6 (802.11ax)" },
                    { label: "Bands", value: "2.4GHz + 5GHz" },
                    { label: "Speed", value: "Up to 2.4 Gbps" },
                    { label: "Interface", value: "M.2 Key E" },
                    { label: "Antenna", value: "2x2 MIMO" },
                    { label: "Power", value: "3W" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows", "macOS"]
            },
        ]
    },
    connectivity: {
        label: "Connectivity",
        description: "Expand your peripheral connections.",
        modules: [
            {
                id: "usb-c",
                label: "USB-C 3.0",
                price: 60,
                score: 20,
                type: "usb",
                color: "blue",
                description: "Single-port USB-C 3.0 expansion module.",
                specs: [
                    { label: "Speed", value: "5 Gbps" },
                    { label: "Standard", value: "USB 3.2 Gen 1" },
                    { label: "Power Delivery", value: "15W" },
                    { label: "Display Support", value: "DP Alt Mode" },
                    { label: "Data + Video", value: "Simultaneous" },
                    { label: "Ports", value: "1x USB-C" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Universal"]
            },
            {
                id: "usb-a",
                label: "USB-A 3.0",
                price: 50,
                score: 15,
                type: "usb",
                color: "blue",
                description: "Single-port USB-A 3.0 expansion module.",
                specs: [
                    { label: "Speed", value: "5 Gbps" },
                    { label: "Standard", value: "USB 3.2 Gen 1" },
                    { label: "Power Output", value: "900mA" },
                    { label: "Backward Compat.", value: "USB 2.0" },
                    { label: "Hot-Plug", value: "Supported" },
                    { label: "Ports", value: "1x USB-A" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Universal"]
            },
            {
                id: "sd-reader",
                label: "Dual SD",
                price: 60,
                score: 20,
                type: "reader",
                color: "yellow",
                description: "Dual UHS-II SD and Micro SD card reader.",
                specs: [
                    { label: "Speed", value: "312 MB/s" },
                    { label: "Standard", value: "UHS-II" },
                    { label: "Slots", value: "SD + MicroSD" },
                    { label: "Simultaneous", value: "Yes" },
                    { label: "Formats", value: "SD/SDHC/SDXC" },
                    { label: "Hot-Swap", value: "Supported" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Universal"]
            },
        ]
    },
    utility: {
        label: "Utility",
        description: "Power protection and hardware development tools.",
        modules: [
            {
                id: "ups",
                label: "UPS",
                price: 220,
                score: 30,
                type: "ups",
                color: "purple",
                description: "Integrated UPS with intelligent power management.",
                specs: [
                    { label: "Capacity", value: "50Wh Li-Ion" },
                    { label: "Runtime", value: "~45min @ 65W" },
                    { label: "Recharge Time", value: "90 minutes" },
                    { label: "Pass-Through", value: "85W max" },
                    { label: "Communication", value: "USB-C + I²C" },
                    { label: "Monitoring", value: "Real-time" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Linux", "Windows"]
            },
            {
                id: "gpio",
                label: "GPIO",
                price: 40,
                score: 15,
                type: "gpio",
                color: "pink",
                description: "40-pin GPIO revealer for hardware development.",
                specs: [
                    { label: "Pins", value: "40-pin Header" },
                    { label: "Voltage", value: "3.3V Logic" },
                    { label: "GPIO Count", value: "28 pins" },
                    { label: "Protocols", value: "I²C, SPI, UART" },
                    { label: "PWM Channels", value: "4" },
                    { label: "Max Current", value: "16mA per pin" },
                ],
                compatibility: ["Foundation v2", "Linux", "Raspberry Pi HATs"]
            },
        ]
    },
    accessories: {
        label: "Accessories",
        description: "Optional add-ons for your Foundation.",
        modules: [
            {
                id: "nightlight",
                label: "Ambient Light",
                price: 25,
                score: 5,
                type: "light",
                color: "cyan",
                description: "Dimmable RGB LED ambient lighting module.",
                specs: [
                    { label: "LEDs", value: "16 RGB LEDs" },
                    { label: "Colors", value: "16.7M colors" },
                    { label: "Brightness", value: "0-100% PWM" },
                    { label: "Control", value: "Software API" },
                    { label: "Power", value: "<3W" },
                    { label: "Lifespan", value: "50,000 hours" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Software Control"]
            },
            {
                id: "fan",
                label: "Cooling Fan",
                price: 20,
                score: 5,
                type: "fan",
                color: "gray",
                description: "Whisper-quiet 40mm PWM cooling fan.",
                specs: [
                    { label: "Size", value: "40mm x 10mm" },
                    { label: "Speed", value: "2000-6000 RPM" },
                    { label: "Airflow", value: "12.5 CFM" },
                    { label: "Noise", value: "18-28 dBA" },
                    { label: "Control", value: "4-pin PWM" },
                    { label: "Bearing", value: "Fluid Dynamic" },
                ],
                compatibility: ["Foundation v1", "Foundation v2", "Auto-Control"]
            },
        ]
    }
};

export const MODULE_OPTIONS = [
    ...MODULE_CATEGORIES.storage.modules,
    ...MODULE_CATEGORIES.networking.modules,
    ...MODULE_CATEGORIES.connectivity.modules,
    ...MODULE_CATEGORIES.utility.modules,
    ...MODULE_CATEGORIES.accessories.modules
];

export const getModuleColorClass = (module, variant = "bg") => {
    const colors = {
        orange: { bg: "bg-cornerstone", border: "border-cornerstone", text: "text-cornerstone" },
        blue: { bg: "bg-cyan-500", border: "border-cyan-500", text: "text-cyan-500" },
        green: { bg: "bg-green-500", border: "border-green-500", text: "text-green-500" },
        purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500" },
        pink: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500" },
        yellow: { bg: "bg-cornerstone", border: "border-cornerstone", text: "text-cornerstone" },
        cyan: { bg: "bg-cyan-500", border: "border-cyan-500", text: "text-cyan-500" },
        gray: { bg: "bg-gray-500", border: "border-gray-500", text: "text-gray-500" },
        // Map legacy colors to our cohesive palette
        emerald: { bg: "bg-green-500", border: "border-green-500", text: "text-green-500" },
        teal: { bg: "bg-cyan-500", border: "border-cyan-500", text: "text-cyan-500" },
        indigo: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500" },
    };
    return colors[module.color]?.[variant] || colors.orange[variant];
};
