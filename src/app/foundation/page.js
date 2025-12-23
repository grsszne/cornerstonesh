import { Suspense } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AsciiArt from "@/components/AsciiArt";
import FoundationBuilder from "@/components/FoundationBuilder";
import TelemetryCard from "@/components/TelemetryCard";
import { TelemetryProvider } from "@/components/TelemetryContext";
import FadeIn from "@/components/FadeIn";
import ScrollIndicator from "@/components/ScrollIndicator";
import InteractiveCard from "@/components/InteractiveCard";
import BayConfigurator from "@/components/BayConfigurator";
import ScrollToRef from "@/components/ScrollToRef";

import CornerstoneOS from "@/components/CornerstoneOS";
export const metadata = {
  title: "Foundation - Cornerstone",
  description: "The modular home server system built for you.",
};

export default function FoundationPage() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToRef />
      </Suspense>
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Large Animated ASCII Background - MORE VISIBLE */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]">
            <AsciiArt width={250} height={150} numCircles={80} />
          </div>

          {/* Secondary ASCII Layer for Depth */}
          <div className="absolute top-1/4 left-0 pointer-events-none opacity-[0.06] dark:opacity-[0.10]">
            <AsciiArt width={150} height={100} numCircles={40} />
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter">
              Foundation
            </h1>
            <p className="text-xl md:text-3xl font-mono text-black/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
              Your seamless, compact, modular home server.
            </p>
            <div className="pt-8">
              <Link
                href="/preorder"
                className="btn-shine lift-on-hover group inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-cornerstone text-white border-2 border-cornerstone hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-300 rounded-full relative overflow-hidden shadow-lg hover:shadow-2xl"
              >
                <span className="relative z-10">Pre-order Now</span>
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
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter">
                  It's a computer that <span className="text-cornerstone">works for you.</span>
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FadeIn delay={0.1}>
                <div className="group">
                  <div className="font-mono text-xs text-cyan-500 mb-4 uppercase tracking-widest">01 / Storage</div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-cyan-500 transition-colors">Like iCloud, but yours.</h3>
                  <p className="font-mono text-sm opacity-60 leading-relaxed">
                    Backup photos, videos, and documents. Your drives, your data, no monthly fees.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="group">
                  <div className="font-mono text-xs text-green-500 mb-4 uppercase tracking-widest">02 / Automation</div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-green-500 transition-colors">A 24/7 Digital Butler.</h3>
                  <p className="font-mono text-sm opacity-60 leading-relaxed">
                    Always on. Block ads network-wide, auto-download shows, manage smart home without the cloud.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="group">
                  <div className="font-mono text-xs text-purple-500 mb-4 uppercase tracking-widest">03 / Media</div>
                  <h3 className="text-2xl font-medium mb-4 group-hover:text-purple-500 transition-colors">Your Private Netflix.</h3>
                  <p className="font-mono text-sm opacity-60 leading-relaxed">
                    Stream movies and music to any device. High quality, no buffering, titles never disappear.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>


        {/* Who is Foundation for? - System Configurations */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 text-black dark:text-white relative overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <FadeIn>
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-cornerstone"></div>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-cornerstone">Use Cases</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-black dark:text-white mb-6">
                  Built for <span className="text-cornerstone">You</span>
                </h2>
                <Link
                  href="/foundation/guide"
                  className="inline-flex items-center gap-2 text-sm font-mono text-cornerstone hover:opacity-70 transition-opacity"
                >
                  <span>Not sure what specs you need?</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Configuration 1: Creator */}
              <FadeIn delay={0.1}>
                <div className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="relative bg-gray-50 dark:bg-black border border-black/10 dark:border-white/10 group-hover:border-cyan-500/50 transition-all duration-500 p-8 h-full flex flex-col">

                    {/* Header */}
                    <div className="mb-6 pb-4 border-b border-black/10 dark:border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-cyan-500">Config_01</span>
                        <span className="font-mono text-xs text-black/30 dark:text-white/30">INGEST</span>
                      </div>
                      <h3 className="text-2xl font-medium text-black dark:text-white group-hover:text-cyan-500 transition-colors">
                        The Creator
                      </h3>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-3">Requirements</div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-cyan-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">Rapid footage offloading</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-cyan-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">High-speed 2.5GbE workflow</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-cyan-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">Zero monthly cloud fees</span>
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-auto pt-6 border-t border-black/10 dark:border-white/10">
                      <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-4">System Spec</div>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">CPU</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">N100 16GB</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">SYS</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">1TB NVMe</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">EXP</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">4× 4TB (16TB)</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">MOD</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-cornerstone">SD + 5G<span className="lowercase">b</span>E</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Configuration 2: Advocate */}
              <FadeIn delay={0.2}>
                <div className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="relative bg-gray-50 dark:bg-black border border-black/10 dark:border-white/10 group-hover:border-green-500/50 transition-all duration-500 p-8 h-full flex flex-col">

                    {/* Header */}
                    <div className="mb-6 pb-4 border-b border-black/10 dark:border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-green-500">Config_02</span>
                        <span className="font-mono text-xs text-black/30 dark:text-white/30">SOVEREIGNTY</span>
                      </div>
                      <h3 className="text-2xl font-medium text-black dark:text-white group-hover:text-green-500 transition-colors">
                        The Advocate
                      </h3>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-3">Requirements</div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">Complete data ownership</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">Power outage protection</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">Self-hosted services</span>
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-auto pt-6 border-t border-black/10 dark:border-white/10">
                      <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-4">System Spec</div>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">CPU</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">N100 8GB</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">SYS</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">512GB NVMe</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">EXP</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">2× 2TB RAID1</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">MOD</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-cornerstone">UPS Backup</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Configuration 3: Developer */}
              <FadeIn delay={0.3}>
                <div className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="relative bg-gray-50 dark:bg-black border border-black/10 dark:border-white/10 group-hover:border-purple-500/50 transition-all duration-500 p-8 h-full flex flex-col">

                    {/* Header */}
                    <div className="mb-6 pb-4 border-b border-black/10 dark:border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-purple-500">Config_03</span>
                        <span className="font-mono text-xs text-black/30 dark:text-white/30">HACKING</span>
                      </div>
                      <h3 className="text-2xl font-medium text-black dark:text-white group-hover:text-purple-500 transition-colors">
                        The Developer
                      </h3>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-3">Requirements</div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">Docker & K8s environment</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">Hardware experimentation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 mt-1.5 shrink-0"></div>
                          <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">Custom automation</span>
                        </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-auto pt-6 border-t border-black/10 dark:border-white/10">
                      <div className="font-mono text-xs uppercase tracking-wider text-black/40 dark:text-white/40 mb-4">System Spec</div>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">CPU</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">N305 16GB</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">SYS</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">512GB NVMe</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">EXP</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-black/80 dark:text-white/80">1× 1TB Lab</span>
                        </div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-black/40 dark:text-white/40">MOD</span>
                          <div className="flex-1 mx-3 border-b border-dashed border-black/10 dark:border-white/10"></div>
                          <span className="text-cornerstone">USB-C 3.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Hardware Guide CTA */}
            <FadeIn delay={0.4}>
              <div className="mt-16 flex items-center justify-center gap-6">
                <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-xs"></div>
                <Link
                  href="/foundation/guide"
                  className="btn-shine lift-on-hover inline-flex items-center justify-center px-6 py-3 text-sm font-mono font-medium uppercase tracking-wider bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-cornerstone hover:text-cornerstone transition-all duration-300"
                >
                  View Hardware Guide →
                </Link>
                <div className="h-px flex-1 bg-black/10 dark:bg-white/10 max-w-xs"></div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Bento Grid Features - Technical Noir Design */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-black dark:text-white relative overflow-hidden">
          {/* Animated grid background - light mode */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
          {/* Animated grid background - dark mode */}
          <div className="absolute inset-0 opacity-0 dark:opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <FadeIn>
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-cornerstone"></div>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-cornerstone">Technical Specifications</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-black dark:text-white">
                  Engineered for <span className="text-cornerstone">You</span>
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

                {/* Universal Bays - Large Feature */}
                <div className="md:col-span-8 group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cornerstone/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-none"></div>
                  <div className="relative bg-gray-50 dark:bg-zinc-950 border border-black/10 dark:border-white/10 group-hover:border-cornerstone/50 transition-all duration-500 p-8 md:p-10 h-full">

                    <BayConfigurator />
                  </div>
                </div>

                {/* Hardware Guide Preview - Tall Feature */}
                <div className="md:col-span-4 md:row-span-2 group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cornerstone/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-none"></div>
                  <div className="relative bg-white dark:bg-black border border-black/10 dark:border-white/10 group-hover:border-cornerstone/50 transition-all duration-500 p-8 h-full flex flex-col">

                    <div className="flex flex-col h-full">
                      <div className="font-mono text-xs uppercase tracking-widest text-cornerstone mb-3">Configuration_Guide</div>
                      <Link href="/foundation/guide" className="block group/link">
                        <h3 className="text-3xl md:text-4xl font-medium text-black dark:text-white mb-4 group-hover/link:text-cornerstone transition-colors duration-300">
                          Hardware<br/>Guide
                          <svg className="inline-block w-6 h-6 ml-2 opacity-0 group-hover/link:opacity-100 transition-all duration-300 -translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </h3>
                      </Link>

                      <p className="text-black/60 dark:text-white/60 font-mono text-sm leading-relaxed mb-8 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                        Not sure what specs you need? We break it down for you.
                      </p>

                      {/* Quick Stats Grid */}
                      <div className="flex-1 space-y-15">
                        {/* Processor */}
                        <div className="border-l-2 border-purple-500/20 group-hover:border-purple-500 transition-colors duration-300 pl-4">
                          <div className="font-mono text-sm text-black/40 dark:text-white/40 uppercase tracking-wider mb-3">Processor</div>
                          <div className="space-y-2">
                            <div className="text-base font-medium text-black dark:text-white">N100 (4-core) → Basic tasks</div>
                            <div className="text-base font-medium text-black dark:text-white">N305 (8-core) → Heavy workloads</div>
                          </div>
                        </div>

                        {/* Network */}
                        <div className="border-l-2 border-green-500/20 group-hover:border-green-500 transition-colors duration-300 pl-4">
                          <div className="font-mono text-sm text-black/40 dark:text-white/40 uppercase tracking-wider mb-3">Network Speed</div>
                          <div className="space-y-2">
                            <div className="text-base font-medium text-black dark:text-white">1GbE → Standard (most users)</div>
                            <div className="text-base font-medium text-black dark:text-white">10GbE → Pro workflows</div>
                          </div>
                        </div>

                        {/* Storage */}
                        <div className="border-l-2 border-cyan-500/20 group-hover:border-cyan-500 transition-colors duration-300 pl-4">
                          <div className="font-mono text-sm text-black/40 dark:text-white/40 uppercase tracking-wider mb-3">Storage</div>
                          <div className="space-y-2">
                            <div className="text-base font-medium text-black dark:text-white">256GB → 48TB NVMe</div>
                            <div className="text-base font-medium text-black dark:text-white">6 modular bays (3 highspeed)</div>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href="/foundation/guide"
                        className="mt-6 flex items-center justify-between px-4 py-3 border border-black/10 dark:border-white/10 group-hover:border-cornerstone group-hover:bg-cornerstone/5 transition-all duration-300 font-mono text-xs uppercase tracking-wider text-black dark:text-white group-hover:text-cornerstone"
                      >
                        <span>View Full Guide</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Aluminum Chassis */}
                <div className="md:col-span-4 group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cornerstone/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-none"></div>
                  <div className="relative bg-gray-50 dark:bg-zinc-950 border border-black/10 dark:border-white/10 group-hover:border-cornerstone/50 transition-all duration-500 p-8 h-full flex flex-col justify-between text-black dark:text-white">

                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-cornerstone mb-3">Material_Spec.6061-T6</div>
                      <h3 className="text-2xl md:text-3xl font-medium text-black dark:text-white mb-4 group-hover:text-cornerstone transition-colors duration-300">
                        Machined<br/>Aluminum
                      </h3>

                      <p className="text-black/60 dark:text-white/60 font-mono text-sm leading-relaxed group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                        CNC-milled aerospace-grade aluminum. Structural rigidity with integrated thermal management.
                      </p>
                    </div>

                    <div className="space-y-3 mt-8">
                      <div className="flex items-center gap-3">
                        <div className="w-full h-1 bg-black/10 dark:bg-white/10 relative overflow-hidden">
                          <div className="absolute inset-0 bg-cornerstone origin-left scale-x-90 group-hover:scale-x-100 transition-transform duration-700"></div>
                        </div>
                        <span className="font-mono text-xs text-black/40 dark:text-white/40 whitespace-nowrap">TENSILE: 310 MPa</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-full h-1 bg-black/10 dark:bg-white/10 relative overflow-hidden">
                          <div className="absolute inset-0 bg-cornerstone origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-700 delay-75"></div>
                        </div>
                        <span className="font-mono text-xs text-black/40 dark:text-white/40 whitespace-nowrap">YIELD: 276 MPa</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compute Power */}
                <div className="md:col-span-4 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cornerstone to-cornerstone"></div>
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>

                  <div className="relative border border-cornerstone group-hover:border-white transition-all duration-500 p-8 h-full flex flex-col justify-between">

                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-white/80 mb-3">Compute_Core.x86</div>
                      <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 group-hover:scale-105 transition-transform duration-300 origin-top-left">
                        Intel N100<br/>or N305
                      </h3>

                      <p className="text-white/90 font-mono text-sm leading-relaxed">
                        4-core or 8-core x86<br/>
                        Up to 3.8GHz Boost<br/>
                        LPDDR5X | PCIe Gen 3
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-8 bg-white/30 group-hover:bg-white transition-all duration-300"
                            style={{
                              animationDelay: `${i * 100}ms`,
                              height: `${(i + 1) * 8}px`
                            }}
                          ></div>
                        ))}
                      </div>
                      <span className="font-mono text-xs text-white/60 group-hover:text-white transition-colors ml-2">
                        UP TO 8 CORES
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </section>

        {/* The Cornerstone Difference */}
        <section id="story" className="min-h-screen flex flex-col justify-center py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-black dark:text-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <h2 className="text-4xl md:text-7xl font-medium tracking-tighter max-w-2xl">
                  Why choose <span className="text-cornerstone">Foundation</span>?
                </h2>
                <p className="font-mono text-sm md:text-base opacity-60 max-w-md mb-2">
                  Tired of choosing between underpowered toys and ugly enterprise gear. We made a third option.
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
                    desc: "Don't get locked into a fixed number of bays or ports. The Foundation grows with you. Add networking, compute, or storage with our modular bay system."
                  },
                  {
                    id: "03",
                    title: "Build Quality",
                    vs: "Plastic Enclosures",
                    desc: "Precision CNC-milled 6061-T6 aluminum. Active heat dissipation. A server that looks as good as it performs, designed to be displayed, not hidden."
                  }
                ].map((item) => (
                  <InteractiveCard key={item.id} className="group relative border-t-2 border-black/20 dark:border-white/20 pt-8 hover:border-cornerstone transition-all duration-500">
                    <div className="font-mono text-xs text-cornerstone mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute -top-2.5 bg-white dark:bg-black px-2">
                      POINT {item.id}
                    </div>
                    <div className="text-6xl font-medium opacity-20 mb-8 group-hover:opacity-100 group-hover:text-cornerstone transition-all duration-500">
                      {item.id}
                    </div>
                    <h3 className="text-3xl font-medium mb-2 group-hover:text-cornerstone transition-colors">{item.title}</h3>
                    <div className="font-mono text-xs uppercase tracking-widest opacity-50 mb-6 group-hover:opacity-80 transition-opacity">
                      vs. {item.vs}
                    </div>
                    <p className="font-mono text-sm opacity-70 leading-relaxed group-hover:opacity-90 transition-opacity">
                      {item.desc}
                    </p>
                  </InteractiveCard>
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
                      <InteractiveCard className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-cornerstone/50 flex flex-col justify-between aspect-square group transition-all">
                        <div className="text-cornerstone text-xl mb-2 group-hover:scale-110 transition-transform">🍃</div>
                        <div>
                          <div className="text-lg font-bold font-mono tracking-tight group-hover:text-cornerstone transition-colors">Good</div>
                          <div className="text-[10px] uppercase tracking-wider opacity-60 font-mono mt-1 group-hover:opacity-80 transition-opacity">Air Quality</div>
                        </div>
                      </InteractiveCard>
                      <InteractiveCard className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-cornerstone/50 flex flex-col justify-between aspect-square group transition-all">
                        <div className="text-cornerstone text-xl mb-2 group-hover:scale-110 transition-transform">💾</div>
                        <div>
                          <div className="text-lg font-bold font-mono tracking-tight group-hover:text-cornerstone transition-colors">Healthy</div>
                          <div className="text-[10px] uppercase tracking-wider opacity-60 font-mono mt-1 group-hover:opacity-80 transition-opacity">Storage</div>
                        </div>
                      </InteractiveCard>
                      <InteractiveCard className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-cornerstone/50 flex flex-col justify-between aspect-square group transition-all">
                        <div className="text-cornerstone text-xl mb-2 group-hover:scale-110 transition-transform">⏱</div>
                        <div>
                          <div className="text-lg font-bold font-mono tracking-tight group-hover:text-cornerstone transition-colors">24d 3h</div>
                          <div className="text-[10px] uppercase tracking-wider opacity-60 font-mono mt-1 group-hover:opacity-80 transition-opacity">Uptime</div>
                        </div>
                      </InteractiveCard>
                    </div>
                  </TelemetryProvider>
                </div>

                <InteractiveCard className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-8 border-2 border-black/10 dark:border-white/10 hover:border-cornerstone/50 aspect-square flex items-center justify-center relative overflow-hidden group transition-all">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                    <AsciiArt width={125} height={125} numCircles={100} />
                  </div>
                  <div className="relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-2xl shadow-cornerstone/20 group-hover:shadow-cornerstone/40 group-hover:scale-110 transition-all duration-300">
                      <svg className="w-12 h-12 text-cornerstone" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-lg group-hover:text-cornerstone transition-colors">Smart Home Bridge</div>
                      <div className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-80 transition-opacity">
                        Works with<br />Apple Homekit • Google • Alexa
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              </div>
            </div>
          </FadeIn>
        </section>


        {/* Build Your Foundation UI */}
        <Suspense fallback={null}>
          <FoundationBuilder />
        </Suspense>

        {/* --- CORNERSTONE OS --- */}
        <CornerstoneOS />

        {/* Technical Specs */}
        <section id="specs" className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
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
                      <span className="opacity-70 sm:opacity-100">Processor Options</span>
                      <span className="sm:text-right">Intel N100 (4-core) / N305 (8-core)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Clock Speed</span>
                      <span className="sm:text-right">N100: 3.4GHz / N305: 3.8GHz</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Memory</span>
                      <span className="sm:text-right">8GB or 16GB LPDDR5X</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Boot Storage</span>
                      <span className="sm:text-right">256GB to 8TB NVMe</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-sm uppercase tracking-widest opacity-50">Universal Expansion</div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Bay Slots</span>
                      <span className="sm:text-right">6x Universal Bay Internal Mounts (3x Highspeed)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Storage Support</span>
                      <span className="sm:text-right">NVMe only, up to 8TB per drive (48TB max)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Architecture</span>
                      <span className="sm:text-right">Zero-cable PCIe backplane</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-sm uppercase tracking-widest opacity-50">I/O & Connectivity</div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Ethernet</span>
                      <span className="sm:text-right">1 G<span className="lowercase">b</span>ps (Standard) / 2.5/5/10 G<span className="lowercase">b</span>ps (Optional Bays)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">USB</span>
                      <span className="sm:text-right">USB-C PD (Power), USB-A (Peripherals)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-black/10 dark:border-white/10 pb-2 gap-1 sm:gap-4">
                      <span className="opacity-70 sm:opacity-100">Expansion</span>
                      <span className="sm:text-right">Modular Bays</span>
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

              <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 text-center">
                <Link
                  href="/foundation/configurator"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black hover:bg-cornerstone hover:text-white dark:hover:bg-cornerstone dark:hover:text-white transition-all duration-300 rounded-full"
                >
                  Build Your Configuration →
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cornerstone text-white text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
                Ready to build?
              </h2>
              <p className="text-xl font-mono opacity-90">
                Join the future of home computing.
              </p>
              <div className="pt-8">
                <Link
                  href="/preorder"
                  className="btn-shine lift-on-hover inline-flex items-center justify-center px-12 py-5 text-lg font-mono font-medium uppercase tracking-wider bg-black text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/50"
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
