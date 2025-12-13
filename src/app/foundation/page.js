import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AsciiArt from "@/components/AsciiArt";
import FoundationBuilder from "@/components/FoundationBuilder";
import TelemetryCard from "@/components/TelemetryCard";
import { TelemetryProvider } from "@/components/TelemetryContext";
import FadeIn from "@/components/FadeIn";
import ScrollIndicator from "@/components/ScrollIndicator";

import CornerstoneOS from "@/components/CornerstoneOS";
export const metadata = {
  title: "Foundation - Cornerstone",
  description: "The modular home server system built for you.",
};

export default function FoundationPage() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter">
              Foundation
            </h1>
            <p className="text-xl md:text-3xl font-mono text-black/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
              Your compact, modular, seamless home server.
            </p>
            <div className="pt-8">
              <Link
                href="/preorder"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-orange-500 text-white border border-orange-500 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-300 rounded-full"
              >
                Pre-order Now
              </Link>
            </div>
          </div>

          <ScrollIndicator />
        </section>


        {/* What is a Home Server? - Educational Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black border-b border-black/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="mb-20 max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8">
                  It's a computer that <span className="text-orange-500">works for you.</span>
                </h2>
                <p className="text-xl md:text-2xl font-mono opacity-70 leading-relaxed">
                  Think of it like iCloud or Google Drive, but physically sitting in your home. You own the box, you own the data, and no one can take it away or charge you a monthly fee.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FadeIn delay={0.1}>
                <div className="group">
                  <div className="font-mono text-xs text-orange-500 mb-4 uppercase tracking-widest">01 / Storage</div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-orange-500 transition-colors">Like iCloud, but yours.</h3>
                  <p className="font-mono text-sm opacity-60 leading-relaxed">
                    Back up every photo, video, and document from your phone automatically. But instead of paying Apple or Google every month, you store it on your own drives, forever.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="group">
                  <div className="font-mono text-xs text-orange-500 mb-4 uppercase tracking-widest">02 / Automation</div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-orange-500 transition-colors">A 24/7 Digital Butler.</h3>
                  <p className="font-mono text-sm opacity-60 leading-relaxed">
                    It never sleeps. It can block ads on your whole network, download your favorite shows automatically, or manage your smart home devices without sending data to the cloud.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="group">
                  <div className="font-mono text-xs text-orange-500 mb-4 uppercase tracking-widest">03 / Media</div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-orange-500 transition-colors">Your Private Netflix.</h3>
                  <p className="font-mono text-sm opacity-60 leading-relaxed">
                    Stream your own collection of movies and music to your TV, phone, or tablet. Highest quality, no buffering, and titles never "leave the platform" because you own them.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* Who is Foundation for? - User Personas */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white dark:bg-white dark:text-black border-b border-white/10 dark:border-black/10">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-16 text-center">
                Built with <span className="text-orange-500">Purpose.</span>
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Persona 1: The Creator */}
              <FadeIn delay={0.1}>
                <div className="border border-white/20 dark:border-black/20 p-8 rounded-2xl h-full flex flex-col hover:border-orange-500 transition-colors duration-300 font-mono group">
                  <div className="mb-8">
                    <div className="text-xs text-orange-500 uppercase tracking-widest mb-2">01 / Ingest</div>
                    <h3 className="text-2xl font-medium group-hover:text-orange-500 transition-colors">The Creator</h3>
                  </div>

                  <div className="space-y-8 flex-1">
                    <div>
                      <div className="text-xs uppercase opacity-40 mb-3 tracking-wider">The Need</div>
                      <ul className="text-sm opacity-80 space-y-3 leading-relaxed">
                        <li className="flex gap-3"><span className="text-orange-500">→</span> Rapid footage offloading</li>
                        <li className="flex gap-3"><span className="text-orange-500">→</span> High-speed 2.5GbE workflow</li>
                        <li className="flex gap-3"><span className="text-orange-500">→</span> Zero monthly cloud fees</li>
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-white/10 dark:border-black/10">
                      <div className="text-xs uppercase opacity-40 mb-3 tracking-wider">The Build</div>
                      <div className="space-y-2 text-sm font-medium">
                        <div className="flex justify-between">
                          <span className="opacity-60">RAM</span>
                          <span>16GB LPDDR5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Base Storage</span>
                          <span>1TB NVMe</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Expansion</span>
                          <span>4x 4TB (16TB Total)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Modules</span>
                          <span className="text-orange-500">SD Card IO + 2.5GbE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Persona 2: The Privacy Advocate */}
              <FadeIn delay={0.2}>
                <div className="border border-white/20 dark:border-black/20 p-8 rounded-2xl h-full flex flex-col hover:border-orange-500 transition-colors duration-300 font-mono group">
                  <div className="mb-8">
                    <div className="text-xs text-orange-500 uppercase tracking-widest mb-2">02 / Sovereignty</div>
                    <h3 className="text-2xl font-medium group-hover:text-orange-500 transition-colors">The Advocate</h3>
                  </div>

                  <div className="space-y-8 flex-1">
                    <div>
                      <div className="text-xs uppercase opacity-40 mb-3 tracking-wider">The Need</div>
                      <ul className="text-sm opacity-80 space-y-3 leading-relaxed">
                        <li className="flex gap-3"><span className="text-orange-500">→</span> Complete data ownership</li>
                        <li className="flex gap-3"><span className="text-orange-500">→</span> Power outage protection</li>
                        <li className="flex gap-3"><span className="text-orange-500">→</span> Self-hosted services</li>
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-white/10 dark:border-black/10">
                      <div className="text-xs uppercase opacity-40 mb-3 tracking-wider">The Build</div>
                      <div className="space-y-2 text-sm font-medium">
                        <div className="flex justify-between">
                          <span className="opacity-60">RAM</span>
                          <span>4GB LPDDR5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Base Storage</span>
                          <span>512GB NVMe</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Expansion</span>
                          <span>2x 2TB (RAID 1)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Modules</span>
                          <span className="text-orange-500">UPS Backup</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Persona 3: The Developer */}
              <FadeIn delay={0.3}>
                <div className="border border-white/20 dark:border-black/20 p-8 rounded-2xl h-full flex flex-col hover:border-orange-500 transition-colors duration-300 font-mono group">
                  <div className="mb-8">
                    <div className="text-xs text-orange-500 uppercase tracking-widest mb-2">03 / Hacking</div>
                    <h3 className="text-2xl font-medium group-hover:text-orange-500 transition-colors">The Developer</h3>
                  </div>

                  <div className="space-y-8 flex-1">
                    <div>
                      <div className="text-xs uppercase opacity-40 mb-3 tracking-wider">The Need</div>
                      <ul className="text-sm opacity-80 space-y-3 leading-relaxed">
                        <li className="flex gap-3"><span className="text-orange-500">→</span> Docker & K8s environment</li>
                        <li className="flex gap-3"><span className="text-orange-500">→</span> Hardware experimentation</li>
                        <li className="flex gap-3"><span className="text-orange-500">→</span> Custom automation</li>
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-white/10 dark:border-black/10">
                      <div className="text-xs uppercase opacity-40 mb-3 tracking-wider">The Build</div>
                      <div className="space-y-2 text-sm font-medium">
                        <div className="flex justify-between">
                          <span className="opacity-60">RAM</span>
                          <span>16GB LPDDR5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Base Storage</span>
                          <span>512GB NVMe</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Expansion</span>
                          <span>1x 1TB (Lab Storage)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">Modules</span>
                          <span className="text-orange-500">GPIO Revealer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Hardware Guide CTA */}
            <FadeIn delay={0.4}>
              <div className="mt-16 text-center">
                <p className="text-sm font-mono opacity-50 mb-4">Not sure what specs you need?</p>
                <Link
                  href="/foundation/guide"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-mono font-medium uppercase tracking-wider bg-transparent text-white dark:text-black border border-white/20 dark:border-black/20 hover:border-orange-500 hover:text-orange-500 transition-colors duration-300"
                >
                  View Hardware Guide →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-16 text-center">
                Designed for <span className="text-orange-500">You.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[400px]">
                {/* Large Feature - Storage */}
                <div className="md:col-span-2 row-span-1 bg-white dark:bg-black border border-black/10 dark:border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-medium mb-4">7x Universal Bays</h3>
                      <p className="text-black/60 dark:text-white/60 font-mono text-sm md:text-base max-w-md">
                        Modular expansion for 3.5" footprint. Zero-cable backplane architecture. Supports standard SSDs, 2.5GbE Networking, AI Accelerators, and UPS modules.
                      </p>
                    </div>
                    <div className="w-full h-48 bg-gray-100 dark:bg-zinc-900 rounded-2xl mt-8 border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center">
                      <span className="font-mono text-xs uppercase tracking-widest opacity-50">Module Sled Visualization</span>
                    </div>
                  </div>
                </div>

                {/* Tall Feature - Mortimer Interface */}
                <div className="md:col-span-1 row-span-1 md:row-span-2 bg-black text-white dark:bg-white dark:text-black p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-medium mb-4">Mortimer Interface</h3>
                    <p className="opacity-70 font-mono text-sm">
                      Our custom modular standard. Expand with networking modules, AI accelerators, or displays.
                      <br /><br />
                      Includes PWR+, I2C discovery, and presence detection.
                    </p>
                  </div>
                  <div className="mt-8 flex-1 relative">
                    <AsciiArt width={40} height={60} numCircles={15} />
                  </div>
                </div>

                {/* Small Feature - Chassis */}
                <div className="md:col-span-1 row-span-1 bg-white dark:bg-black border border-black/10 dark:border-white/10 p-8 rounded-3xl flex flex-col justify-end relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                    <img
                      src="/img/corner.png"
                      alt="CNC Aluminum Detail"
                      className="absolute top-0 right-0 w-[120%] h-auto object-contain opacity-90 dark:opacity-80"
                    />
                  </div>
                  <div className="relative z-10 bg-white/80 backdrop-blur-md  dark:bg-black/80">
                    <h3 className="text-xl font-medium mb-2">Machined Aluminum</h3>
                    <p className="text-black/60 dark:text-white/60 font-mono text-sm">
                      CNC milled from 6061-T6 aluminum. Structural rigidity protecting your data. Active cooling across modules.
                    </p>
                  </div>
                </div>

                {/* Small Feature - Compute */}
                <div className="md:col-span-1 row-span-1 bg-orange-500 text-white p-8 rounded-3xl flex flex-col justify-end">
                  <h3 className="text-xl font-medium mb-2">Quad-Core Power</h3>
                  <p className="opacity-90 font-mono text-sm">
                    Broadcom BCM2712 Cortex-A76 @ 2.4GHz. LPDDR5 Memory. PCIe Gen 3 expansion.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* The Cornerstone Difference */}
        <section id="story" className="min-h-screen flex flex-col justify-center py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-white text-black dark:text-black overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <h2 className="text-4xl md:text-7xl font-medium tracking-tighter max-w-2xl">
                  Why choose <span className="text-orange-500">Foundation</span>?
                </h2>
                <p className="font-mono text-sm md:text-base opacity-60 max-w-md mb-2">
                  We were tired of choosing between underpowered toys and ugly enterprise gear. So we made a third option.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    id: "01",
                    title: "Accessibility",
                    vs: "DIY Home Server",
                    desc: "No 3D printing, no cable management nightmares, no hardware sourcing headaches. We've done the engineering so you can focus on your software."
                  },
                  {
                    id: "02",
                    title: "Modularity",
                    vs: "Traditional Consumer NAS",
                    desc: "Don't get locked into a fixed number of bays or ports. The Foundation grows with you. Add networking, compute, or storage modules via the Mortimer interface."
                  },
                  {
                    id: "03",
                    title: "Build Quality",
                    vs: "Plastic Enclosures",
                    desc: "Precision CNC-milled 6061-T6 aluminum. Active heat dissipation. A server that looks as good as it performs, designed to be displayed, not hidden."
                  }
                ].map((item) => (
                  <div key={item.id} className="group relative border-t border-black/20 dark:border-black/20 pt-8 hover:border-orange-500 transition-colors duration-500">
                    <div className="font-mono text-xs text-orange-500 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute -top-2.5 bg-white dark:bg-white px-2">
                      POINT {item.id}
                    </div>
                    <div className="text-6xl font-medium opacity-20 mb-8 group-hover:opacity-100 group-hover:text-orange-500 transition-all duration-500">
                      {item.id}
                    </div>
                    <h3 className="text-3xl font-medium mb-2">{item.title}</h3>
                    <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-6">
                      vs. {item.vs}
                    </div>
                    <p className="font-mono text-sm opacity-70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Matter Native Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black border-t border-black/10 dark:border-white/10">
          <FadeIn>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
                    Smart Home Integration
                  </h2>
                  <p className="text-xl font-mono opacity-70 mb-10 leading-relaxed">
                    Your server shouldn't be a black box. Foundation integrates directly with your smart home, exposing real-time telemetry and control to your favorite platforms via Matter.
                  </p>

                  <TelemetryProvider>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <TelemetryCard label="Fan Speed" metricKey="fanSpeed" unit=" RPM" icon="❆" />
                      <TelemetryCard label="CPU Temp" metricKey="cpuTemp" unit="°C" icon="🌡" />
                      <TelemetryCard label="Power Draw" metricKey="powerDraw" unit="W" icon="⚡" />
                      <TelemetryCard label="Network Activity" metricKey="network" unit=" Gbps" icon="🌐" />
                      <TelemetryCard label="Humidity" metricKey="humidity" unit="%" icon="💧" />
                      <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/5 dark:border-white/5 flex flex-col justify-between aspect-square">
                        <div className="text-orange-500 text-xl mb-2">🍃</div>
                        <div>
                          <div className="text-lg font-bold font-mono tracking-tight">Good</div>
                          <div className="text-[10px] uppercase tracking-wider opacity-60 font-mono mt-1">Air Quality</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/5 dark:border-white/5 flex flex-col justify-between aspect-square">
                        <div className="text-orange-500 text-xl mb-2">💾</div>
                        <div>
                          <div className="text-lg font-bold font-mono tracking-tight">Healthy</div>
                          <div className="text-[10px] uppercase tracking-wider opacity-60 font-mono mt-1">Storage</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/5 dark:border-white/5 flex flex-col justify-between aspect-square">
                        <div className="text-orange-500 text-xl mb-2">⏱</div>
                        <div>
                          <div className="text-lg font-bold font-mono tracking-tight">24d 3h</div>
                          <div className="text-[10px] uppercase tracking-wider opacity-60 font-mono mt-1">Uptime</div>
                        </div>
                      </div>
                    </div>
                  </TelemetryProvider>
                </div>

                <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-8 border border-black/10 dark:border-white/10 aspect-square flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <AsciiArt width={125} height={125} numCircles={100} />
                  </div>
                  <div className="relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-2xl shadow-orange-500/20">
                      <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-lg">Smart Home Bridge</div>
                      <div className="font-mono text-xs uppercase tracking-widest opacity-60">
                        Works with<br />Apple Homekit • Google • Alexa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>


        {/* Build Your Foundation UI */}
        <FoundationBuilder />

        {/* --- CORNERSTONE OS --- */}
        <CornerstoneOS />

        {/* Technical Specs */}
        <section id="specs" className="py-24 px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16 border-b border-black/10 dark:border-white/10 pb-8">
                Technical Specifications
              </h2>

              <div className="space-y-12 font-mono">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-sm uppercase tracking-widest opacity-50">Core Compute</div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Module</span>
                      <span className="sm:text-right">Raspberry Pi CM5</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Processor</span>
                      <span className="sm:text-right">Broadcom BCM2712 Quad-core A76 @ 2.4GHz</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Memory</span>
                      <span className="sm:text-right">LPDDR4 (4GB, 8GB, 16GB)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Base Storage</span>
                      <span className="sm:text-right">256GB, 512GB, 1TB NVMe</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Wireless</span>
                      <span className="sm:text-right">Wi-Fi 6 / Bluetooth 5.x (Optional)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-sm uppercase tracking-widest opacity-50">Universal Expansion</div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Module Slots</span>
                      <span className="sm:text-right">7x Universal Bay Internal Mounts</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Storage Support</span>
                      <span className="sm:text-right">Supports 256GB - 4TB per drive</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Architecture</span>
                      <span className="sm:text-right">Zero-cable Mortimer backplane</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-sm uppercase tracking-widest opacity-50">I/O & Connectivity</div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Ethernet</span>
                      <span className="sm:text-right">1 Gbps (Standard) / 2.5 Gbps (Optional Module)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">USB</span>
                      <span className="sm:text-right">USB-C PD (Power), USB-A (Peripherals)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Expansion</span>
                      <span className="sm:text-right">Mortimer Interface</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-sm uppercase tracking-widest opacity-50">Physical</div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Dimensions</span>
                      <span className="sm:text-right">3.5" x 3.5" (≈ 89mm x 89mm)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Material</span>
                      <span className="sm:text-right">CNC-milled 6061-T6 Aluminum</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Finish</span>
                      <span className="sm:text-right">Black or Natural Anodized</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-sm uppercase tracking-widest opacity-50">Software</div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">OS</span>
                      <span className="sm:text-right">Cornerstone OS</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Management</span>
                      <span className="sm:text-right">Custom Web UI, OpenMediaVault</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white dark:bg-white dark:text-black text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
                Ready to build?
              </h2>
              <p className="text-xl font-mono opacity-70">
                Join the future of home computing.
              </p>
              <div className="pt-8">
                <Link
                  href="/preorder"
                  className="inline-flex items-center justify-center px-12 py-5 text-lg font-mono font-medium uppercase tracking-wider bg-orange-500 text-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300 rounded-full"
                >
                  Reserve Yours
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
    </>
  );
}
