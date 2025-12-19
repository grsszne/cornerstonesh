"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

// Storage capacity data
const STORAGE_SIZES = [
  {
    size: "256GB",
    capacity: 256,
    data: [
      { label: "iPhone photos", value: "~62,500" },
      { label: "HD movies (2hr)", value: "~64" },
      { label: "4K movies (2hr)", value: "~10" },
      { label: "PowerPoint decks", value: "~5,000" },
      { label: "Small VMs (20GB)", value: "~12" },
    ]
  },
  {
    size: "512GB",
    capacity: 512,
    data: [
      { label: "iPhone photos", value: "~125,000" },
      { label: "HD movies (2hr)", value: "~128" },
      { label: "4K movies (2hr)", value: "~20" },
      { label: "PowerPoint decks", value: "~10,000" },
      { label: "Small VMs (20GB)", value: "~25" },
    ]
  },
  {
    size: "1TB",
    capacity: 1000,
    data: [
      { label: "iPhone photos", value: "~250,000" },
      { label: "HD movies (2hr)", value: "~250" },
      { label: "4K movies (2hr)", value: "~40" },
      { label: "PowerPoint decks", value: "~20,000" },
      { label: "Small VMs (20GB)", value: "~50" },
    ]
  },
  {
    size: "2TB",
    capacity: 2000,
    data: [
      { label: "iPhone photos", value: "~500,000" },
      { label: "HD movies (2hr)", value: "~500" },
      { label: "4K movies (2hr)", value: "~80" },
      { label: "RAW photos (50MB)", value: "~40,000" },
      { label: "Medium VMs (40GB)", value: "~50" },
    ]
  },
  {
    size: "4TB",
    capacity: 4000,
    data: [
      { label: "iPhone photos", value: "~1 million" },
      { label: "HD movies (2hr)", value: "~1,000" },
      { label: "4K movies (2hr)", value: "~160" },
      { label: "RAW photos (50MB)", value: "~80,000" },
      { label: "Medium VMs (40GB)", value: "~100" },
    ]
  },
  {
    size: "8TB",
    capacity: 8000,
    data: [
      { label: "iPhone photos", value: "~2 million" },
      { label: "HD movies (2hr)", value: "~2,000" },
      { label: "4K movies (2hr)", value: "~320" },
      { label: "8K movies (2hr)", value: "~25" },
      { label: "Large VMs (80GB)", value: "~100" },
    ]
  },
  {
    size: "16TB",
    capacity: 16000,
    data: [
      { label: "iPhone photos", value: "~4 million" },
      { label: "HD movies (2hr)", value: "~4,000" },
      { label: "4K movies (2hr)", value: "~640" },
      { label: "8K movies (2hr)", value: "~50" },
      { label: "Large VMs (80GB)", value: "~200" },
    ]
  },
  {
    size: "32TB",
    capacity: 32000,
    data: [
      { label: "iPhone photos", value: "~8 million" },
      { label: "HD movies (2hr)", value: "~8,000" },
      { label: "4K movies (2hr)", value: "~1,280" },
      { label: "8K movies (2hr)", value: "~100" },
      { label: "Enterprise VMs", value: "~400" },
    ]
  },
  {
    size: "64TB",
    capacity: 64000,
    highlight: true,
    data: [
      { label: "iPhone photos", value: "~16 million" },
      { label: "HD movies (2hr)", value: "~16,000" },
      { label: "4K movies (2hr)", value: "~2,560" },
      { label: "8K movies (2hr)", value: "~200" },
      { label: "Enterprise VMs", value: "~800" },
    ]
  },
];


export default function GuidePage() {
  const [currentStorageIndex, setCurrentStorageIndex] = useState(2); // Start at 1TB

  const handleSliderChange = (e) => {
    setCurrentStorageIndex(parseInt(e.target.value));
  };

  const currentStorage = STORAGE_SIZES[currentStorageIndex];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6">
                Choose Your <span className="text-orange-500">Hardware.</span>
              </h1>
              <p className="text-xl md:text-2xl font-mono opacity-70 leading-relaxed">
                Not sure what specs you need? We'll break it down for you.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Processor & Memory */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Processor & Memory
            </h2>
            <p className="text-lg font-mono opacity-60 mb-16 max-w-2xl">
              N100 vs N305 — Which one do you need?
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* N100 8GB */}
            <FadeIn delay={0.1}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Entry</div>
                  <h3 className="text-3xl font-medium mb-2">N100 8GB</h3>
                  <div className="font-mono text-sm opacity-60">4-core x86 @ 3.4GHz</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Technical Specs</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li className="flex justify-between"><span>TDP:</span><span className="font-mono">6W</span></li>
                      <li className="flex justify-between"><span>Cache:</span><span className="font-mono">6MB L3</span></li>
                      <li className="flex justify-between"><span>iGPU:</span><span className="font-mono">Intel UHD 24EU</span></li>
                      <li className="flex justify-between"><span>Transcode:</span><span className="font-mono">2x 4K streams</span></li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Perfect for most home server tasks. Handles media streaming, file storage, and light Docker containers with ease. The 6W TDP means silent operation and minimal power draw — expect 8-15W total system power under typical loads.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Plex/Jellyfin (1-2 4K transcodes)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> File storage (NAS, SMB, NFS)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Pi-hole / AdGuard / Unbound</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 3-5 light containers</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Nextcloud (personal use)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Reverse proxy (Nginx, Caddy)</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Power Estimate</div>
                    <div className="text-sm font-medium">
                      Idle: <span className="text-orange-500">~8W</span> | Load: <span className="text-orange-500">~15W</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* N100 16GB */}
            <FadeIn delay={0.2}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Popular</div>
                  <h3 className="text-3xl font-medium mb-2">N100 16GB</h3>
                  <div className="font-mono text-sm opacity-60">4-core x86 @ 3.4GHz</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Technical Specs</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li className="flex justify-between"><span>TDP:</span><span className="font-mono">6W</span></li>
                      <li className="flex justify-between"><span>Cache:</span><span className="font-mono">6MB L3</span></li>
                      <li className="flex justify-between"><span>iGPU:</span><span className="font-mono">Intel UHD 24EU</span></li>
                      <li className="flex justify-between"><span>Transcode:</span><span className="font-mono">2x 4K streams</span></li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Same processor as 8GB, but double the RAM. Great for running more containers or VMs simultaneously without slowdowns. The extra 8GB lets you run memory-hungry apps like databases, caching layers, and multiple VMs without hitting swap.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 10+ Docker containers</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 1-2 lightweight VMs (Proxmox)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Home Assistant + addons</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Development environments</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> PostgreSQL / MySQL / Redis</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Gitea / GitLab (small teams)</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Power Estimate</div>
                    <div className="text-sm font-medium">
                      Idle: <span className="text-orange-500">~9W</span> | Load: <span className="text-orange-500">~18W</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* N305 16GB */}
            <FadeIn delay={0.3}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Performance</div>
                  <h3 className="text-3xl font-medium mb-2">N305 16GB</h3>
                  <div className="font-mono text-sm opacity-60">8-core x86 @ 3.8GHz</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Technical Specs</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li className="flex justify-between"><span>TDP:</span><span className="font-mono">15W</span></li>
                      <li className="flex justify-between"><span>Cache:</span><span className="font-mono">8MB L3</span></li>
                      <li className="flex justify-between"><span>iGPU:</span><span className="font-mono">Intel UHD 32EU</span></li>
                      <li className="flex justify-between"><span>Transcode:</span><span className="font-mono">4-5x 4K streams</span></li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Double the cores, higher clock speed, and 33% more cache. For power users running Kubernetes clusters, heavy transcoding, or compute-intensive workloads. The 8 efficiency cores handle parallel tasks excellently while keeping thermals in check.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Kubernetes (K3s/K8s) clusters</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 4-5 simultaneous 4K transcodes</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 20+ Docker containers</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 3-4 concurrent VMs</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> CI/CD pipelines (Jenkins, Drone)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Machine learning inference</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Power Estimate</div>
                    <div className="text-sm font-medium">
                      Idle: <span className="text-orange-500">~12W</span> | Load: <span className="text-orange-500">~28W</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-8">
              <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-3">Quick Guide</div>
              <h3 className="text-2xl font-medium mb-4">Which should I choose?</h3>
              <div className="space-y-3 font-mono text-sm opacity-80">
                <p><span className="text-orange-500 font-bold">N100 8GB:</span> You're new to home servers or just want simple file storage and media streaming.</p>
                <p><span className="text-orange-500 font-bold">N100 16GB:</span> You plan to run 10+ services/containers or want room to experiment.</p>
                <p><span className="text-orange-500 font-bold">N305 16GB:</span> You're running production workloads, Kubernetes, or need maximum performance.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Network Speed */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Network Speed
            </h2>
            <p className="text-lg font-mono opacity-60 mb-16 max-w-2xl">
              From 1G<span className="lowercase">b</span>E to 10G<span className="lowercase">b</span>E — What do you need?
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1GbE */}
            <FadeIn delay={0.1}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Standard</div>
                  <h3 className="text-3xl font-medium mb-2">1GbE</h3>
                  <div className="font-mono text-sm opacity-60">125 MB/s max</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Technical Details</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li className="flex justify-between"><span>Bandwidth:</span><span className="font-mono">1,000 M<span className="lowercase">b</span>ps</span></li>
                      <li className="flex justify-between"><span>Real-world:</span><span className="font-mono">~940 M<span className="lowercase">b</span>ps</span></li>
                      <li className="flex justify-between"><span>Cable:</span><span className="font-mono">Cat5e / Cat6</span></li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      The standard for home networks. Handles 4K streaming (25 Mbps) with 40x headroom. Most routers, switches, and devices are 1GbE, making it universally compatible.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Streaming 4K video (multiple streams)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> File browsing & document access</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Photo library access</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Cloud sync & backups</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Standard home networking</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Transfer Examples</div>
                    <div className="space-y-1 text-sm font-medium">
                      <div>100GB video: <span className="text-orange-500">~13 min</span></div>
                      <div>1TB backup: <span className="text-orange-500">~2.2 hours</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 2.5GbE */}
            <FadeIn delay={0.2}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Upgrade</div>
                  <h3 className="text-3xl font-medium mb-2">2.5GbE</h3>
                  <div className="font-mono text-sm opacity-60">312 MB/s max</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Technical Details</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li className="flex justify-between"><span>Bandwidth:</span><span className="font-mono">2,500 M<span className="lowercase">b</span>ps</span></li>
                      <li className="flex justify-between"><span>Real-world:</span><span className="font-mono">~2,350 M<span className="lowercase">b</span>ps</span></li>
                      <li className="flex justify-between"><span>Cable:</span><span className="font-mono">Cat5e / Cat6</span></li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      The sweet spot upgrade. Uses existing Cat5e/Cat6 cables but delivers 2.5x the speed. Many newer motherboards and laptops now include 2.5GbE natively.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Video editing (1080p/4K projects)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Large file transfers</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Camera footage offload</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Multi-user home networks</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Time Machine backups</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Transfer Examples</div>
                    <div className="space-y-1 text-sm font-medium">
                      <div>100GB video: <span className="text-orange-500">~5 min</span></div>
                      <div>1TB backup: <span className="text-orange-500">~53 min</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 5GbE */}
            <FadeIn delay={0.3}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Fast</div>
                  <h3 className="text-3xl font-medium mb-2">5GbE</h3>
                  <div className="font-mono text-sm opacity-60">625 MB/s max</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Technical Details</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li className="flex justify-between"><span>Bandwidth:</span><span className="font-mono">5,000 M<span className="lowercase">b</span>ps</span></li>
                      <li className="flex justify-between"><span>Real-world:</span><span className="font-mono">~4,700 M<span className="lowercase">b</span>ps</span></li>
                      <li className="flex justify-between"><span>Cable:</span><span className="font-mono">Cat6 / Cat6a</span></li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      5x faster than 1GbE while still affordable. Ideal balance of speed and cost for prosumers and small teams working with large media files.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 4K/6K video editing</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> RAW photo workflows (50+ MB files)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Rapid backup & restore</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Small creative teams (2-4 users)</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> VM storage over network</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Transfer Examples</div>
                    <div className="space-y-1 text-sm font-medium">
                      <div>100GB video: <span className="text-orange-500">~2.5 min</span></div>
                      <div>1TB backup: <span className="text-orange-500">~27 min</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 10GbE */}
            <FadeIn delay={0.4}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Maximum</div>
                  <h3 className="text-3xl font-medium mb-2">10GbE</h3>
                  <div className="font-mono text-sm opacity-60">1,250 MB/s max</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Technical Details</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li className="flex justify-between"><span>Bandwidth:</span><span className="font-mono">10,000 M<span className="lowercase">b</span>ps</span></li>
                      <li className="flex justify-between"><span>Real-world:</span><span className="font-mono">~9,400 M<span className="lowercase">b</span>ps</span></li>
                      <li className="flex justify-between"><span>Cable:</span><span className="font-mono">Cat6a / Cat7</span></li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Professional-grade speed. Approaches local SSD performance over the network. Essential for production environments where time is money.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 8K video production</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Multiple simultaneous editors</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> VM/container cluster storage</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Database servers & analytics</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> iSCSI / NVMe-oF targets</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Transfer Examples</div>
                    <div className="space-y-1 text-sm font-medium">
                      <div>100GB video: <span className="text-orange-500">~80 sec</span></div>
                      <div>1TB backup: <span className="text-orange-500">~13 min</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Storage */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Storage Planning
            </h2>
            <p className="text-lg font-mono opacity-60 mb-16 max-w-2xl">
              How much NVMe storage do you need?
            </p>
          </FadeIn>

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Boot Storage */}
              <FadeIn delay={0.1}>
                <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl hover:border-orange-500 transition-colors duration-300">
                  <div className="mb-6">
                    <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">System Drive</div>
                    <h3 className="text-3xl font-medium mb-2">Boot NVMe</h3>
                    <div className="font-mono text-sm opacity-60">256GB - 8TB PCIe Gen3</div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-mono uppercase opacity-40 mb-3">Drive Specs</div>
                      <ul className="space-y-1 text-sm opacity-80">
                        <li className="flex justify-between"><span>Interface:</span><span className="font-mono">M.2 2280 NVMe</span></li>
                        <li className="flex justify-between"><span>Read Speed:</span><span className="font-mono">~3,500 MB/s</span></li>
                        <li className="flex justify-between"><span>Write Speed:</span><span className="font-mono">~3,000 MB/s</span></li>
                        <li className="flex justify-between"><span>Endurance:</span><span className="font-mono">600+ TBW</span></li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's For</div>
                      <p className="text-sm opacity-80 leading-relaxed">
                        Your operating system, applications, and Docker containers live here. Fast NVMe ensures snappy boot times and responsive container startup. This is separate from your modular storage bays.
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase opacity-40 mb-3">Size Recommendations</div>
                      <ul className="space-y-2 text-sm opacity-80">
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">256GB:</span> Minimal OS + 3-5 containers</li>
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">512GB:</span> Most users — room for 10+ containers</li>
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">1TB:</span> Heavy Docker + VM images</li>
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">2-4TB:</span> Local databases + container volumes</li>
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">8TB:</span> Maximum — all workloads on fast storage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Modular Storage */}
              <FadeIn delay={0.2}>
                <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl hover:border-orange-500 transition-colors duration-300">
                  <div className="mb-6">
                    <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Modular Bays</div>
                    <h3 className="text-3xl font-medium mb-2">Module Storage</h3>
                    <div className="font-mono text-sm opacity-60">Up to 8x NVMe drives (64TB max)</div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-mono uppercase opacity-40 mb-3">Bay Specs</div>
                      <ul className="space-y-1 text-sm opacity-80">
                        <li className="flex justify-between"><span>Bays:</span><span className="font-mono">8x M.2 2280</span></li>
                        <li className="flex justify-between"><span>Per-bay max:</span><span className="font-mono">8TB each</span></li>
                        <li className="flex justify-between"><span>Hot-swap:</span><span className="font-mono">Yes</span></li>
                        <li className="flex justify-between"><span>RAID support:</span><span className="font-mono">Software RAID</span></li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's For</div>
                      <p className="text-sm opacity-80 leading-relaxed">
                        Your media, files, backups, and datasets. Hot-swappable bays let you expand or swap drives without downtime. Use ZFS, Btrfs, or mdadm for RAID configurations.
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase opacity-40 mb-3">Example Configurations</div>
                      <ul className="space-y-2 text-sm opacity-80">
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">2× 2TB mirror:</span> 2TB redundant storage</li>
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">4× 4TB RAID5:</span> 12TB with parity</li>
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">6× 4TB RAID6:</span> 16TB with 2-disk fault tolerance</li>
                        <li className="flex gap-2"><span className="text-orange-500">→</span> <span className="font-bold">7× 8TB JBOD:</span> 64TB maximum raw</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.3}>
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-8">
                <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-3">Storage Guide</div>
                <h3 className="text-2xl font-medium mb-6">How much storage do you need?</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <div className="font-mono text-sm font-bold mb-2">Light Use (1-4TB)</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li>• Photo backup (100K+ photos)</li>
                      <li>• Document storage</li>
                      <li>• Small media library (50-100 HD movies)</li>
                      <li>• Personal cloud (Nextcloud)</li>
                      <li>• Home Assistant backups</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-mono text-sm font-bold mb-2">Medium Use (8-16TB)</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li>• 4K movie collection (200+ films)</li>
                      <li>• Photography RAW archives</li>
                      <li>• Multi-device backups</li>
                      <li>• Security camera footage</li>
                      <li>• Music production projects</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-mono text-sm font-bold mb-2">Heavy Use (32-64TB)</div>
                    <ul className="space-y-1 text-sm opacity-80">
                      <li>• 8K video production & archives</li>
                      <li>• Complete media libraries</li>
                      <li>• Machine learning datasets</li>
                      <li>• Enterprise backups</li>
                      <li>• Multi-year security footage</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-orange-500/20">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-3">Pro Tip</div>
                  <p className="text-sm opacity-80">
                    Plan for 2-3x your current needs. Storage fills up faster than expected, and NVMe prices drop over time. You can always add more drives to empty bays later.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-12 border border-black/10 dark:border-white/10 rounded-2xl p-8 md:p-12">
                {/* Storage Size Display */}
                <div className="text-center mb-8">
                  <div className="font-mono text-sm text-orange-500 uppercase tracking-widest mb-2">Storage Capacity</div>
                  <div className={`text-6xl md:text-8xl font-bold mb-4 transition-all duration-300 ${currentStorage.highlight ? 'text-orange-500' : ''}`}>
                    {currentStorage.size}
                  </div>
                  <div className="text-sm opacity-60 font-mono">
                    {currentStorage.highlight && "Maximum Capacity"}
                  </div>
                </div>

                {/* Slider */}
                <div className="mb-12 px-4">
                  <input
                    type="range"
                    min="0"
                    max={STORAGE_SIZES.length - 1}
                    value={currentStorageIndex}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, rgb(249, 115, 22) 0%, rgb(249, 115, 22) ${(currentStorageIndex / (STORAGE_SIZES.length - 1)) * 100}%, rgba(0,0,0,0.1) ${(currentStorageIndex / (STORAGE_SIZES.length - 1)) * 100}%, rgba(0,0,0,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2 text-xs font-mono opacity-40">
                    <span>256GB</span>
                    <span>64TB</span>
                  </div>
                </div>

                {/* Capacity Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl mx-auto">
                  {currentStorage.data.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-3 border-b border-black/10 dark:border-white/10 transition-all duration-300"
                      style={{
                        opacity: 0,
                        animation: `fadeIn 0.3s ease-out ${idx * 0.05}s forwards`
                      }}
                    >
                      <span className="opacity-70">{item.label}</span>
                      <span className="font-mono font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Navigation Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mt-8">
                  {STORAGE_SIZES.map((storage, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStorageIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all duration-200 ${
                        currentStorageIndex === idx
                          ? 'bg-orange-500 text-white'
                          : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
                      }`}
                    >
                      {storage.size}
                    </button>
                  ))}
                </div>
              </div>

              <style jsx>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                .slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: rgb(249, 115, 22);
                  cursor: pointer;
                  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
                  transition: all 0.2s;
                }

                .slider::-webkit-slider-thumb:hover {
                  transform: scale(1.2);
                  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.5);
                }

                .slider::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border: none;
                  border-radius: 50%;
                  background: rgb(249, 115, 22);
                  cursor: pointer;
                  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
                  transition: all 0.2s;
                }

                .slider::-moz-range-thumb:hover {
                  transform: scale(1.2);
                  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.5);
                }
              `}</style>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
              Ready to <span className="text-orange-500">Build?</span>
            </h2>
            <p className="text-lg font-mono opacity-60 mb-12 max-w-2xl mx-auto">
              Start configuring your Foundation with the specs that match your needs.
            </p>
            <Link
              href="/foundation#builder"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-colors duration-300"
            >
              Configure Your Build
            </Link>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
