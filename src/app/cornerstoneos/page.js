"use client";

import { Suspense } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CornerstoneOS from "@/components/CornerstoneOS";
import AiSearchDemo from "@/components/AiSearchDemo";
import ScrollToRef from "@/components/ScrollToRef";
import ScribbleUnderline from "@/components/ScribbleUnderline";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Cpu, 
  LockKey, 
  Brain, 
  MagicWand, 
  CirclesThreePlus,
  ArrowRight
} from "@phosphor-icons/react";

export default function CornerstoneOSPage() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToRef />
      </Suspense>
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
        
        {/* Hero Section */}
        <section className="container-swiss mb-32 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-foreground mb-8">
                The OS for the<br/>
                <span className="italic">Individual.</span>
              </h1>
              <p className="text-xl md:text-2xl font-sans text-foreground/70 max-w-2xl text-balance mb-12 leading-relaxed">
                A calm, dashboard-centric operating system that prioritizes local intelligence over cloud convenience.
              </p>
            </motion.div>
        </section>

        {/* Live Demo Section */}
        <section className="container-swiss mb-48">
             <div className="text-center mb-16">
                 <h2 className="font-serif text-4xl mb-6">Experience the Dashboard</h2>
                 <p className="font-sans text-foreground/70 max-w-xl mx-auto">
                    A single interface for your entire digital life. Mail, Files, Calendar, and Home Automation—all in one place.
                 </p>
             </div>
             <CornerstoneOS />
        </section>

        {/* Intelligence Section */}
        <section className="bg-muted py-32 mb-48">
             <div className="container-swiss grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                 <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 rounded-full text-[10px] font-sans font-medium uppercase tracking-widest mb-8 border border-foreground/5">
                        <Brain className="w-3 h-3 text-foreground/60" />
                        On-Device Intelligence
                     </div>
                     <h2 className="font-serif text-4xl md:text-5xl mb-8">Unified Search.<br/>Local Brain.</h2>
                     <p className="font-sans text-lg text-foreground/70 mb-8 leading-relaxed">
                        CornerstoneOS indexes every file, email, photo, and message locally on your Foundation chassis. Our on-device AI understands context, recognizes faces, and builds relationships between your data—without a single byte ever leaving your home.
                     </p>
                     
                     <div className="space-y-6">
                        <FeatureItem 
                          icon={ShieldCheck} 
                          title="Privacy First" 
                          desc="No telemetry. No tracking. No cloud training. Your data is yours alone."
                        />
                        <FeatureItem 
                          icon={MagicWand} 
                          title="Semantic Search" 
                          desc="Search for 'the receipt from that Greek place' instead of keywords."
                        />
                     </div>
                 </div>
                 
                 <div className="relative">
                    <div className="absolute inset-0 bg-foreground/[0.02] blur-3xl -z-10 rounded-full"></div>
                    <AiSearchDemo />
                 </div>
             </div>
        </section>

        {/* Architecture Section */}
        <section className="container-swiss mb-48">
            <h2 className="font-serif text-4xl text-center mb-24">Built on Sovereignty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center">
                        <LockKey className="w-6 h-6 opacity-40" />
                    </div>
                    <h3 className="font-serif text-2xl">Absolute Privacy</h3>
                    <p className="font-sans text-foreground/60 leading-relaxed">
                        By running applications locally, you eliminate the middleman. Your communications and documents stay where they belong: in your home.
                    </p>
                </div>
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center">
                        <CirclesThreePlus className="w-6 h-6 opacity-40" />
                    </div>
                    <h3 className="font-serif text-2xl">Matter-Native</h3>
                    <p className="font-sans text-foreground/60 leading-relaxed">
                        Total home automation without the cloud. CornerstoneOS acts as a local bridge for all your smart devices, ensuring your home works even if the internet goes out.
                    </p>
                </div>
                <div className="space-y-6">
                    <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center">
                        <Cpu className="w-6 h-6 opacity-40" />
                    </div>
                    <h3 className="font-serif text-2xl">Open Core</h3>
                    <p className="font-sans text-foreground/60 leading-relaxed">
                        Built on a hardened Linux foundation with a custom application sandbox. Transparent, auditable, and engineered for long-term stability.
                    </p>
                </div>
            </div>
        </section>

        {/* Community Marketplace Section */}
        <section className="container-swiss mb-48">
            <div className="text-center mb-20">
                <h2 className="font-serif text-4xl md:text-5xl mb-6">Community Driven</h2>
                <p className="font-sans text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                    Open SDK. Open marketplace. Build integrations and share with the community.
                </p>
            </div>

            {/* Marketplace Explanation */}
            <div className="max-w-3xl mx-auto mb-20">
                <div className="space-y-8">
                    <div className="text-center">
                        <p className="font-sans text-foreground/70 leading-relaxed">
                            Foundation's open architecture means anyone can build integrations that extend what your system can do. From media servers to home automation, photo backup to developer tools—if you can think it, you can build it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-foreground/10">
                        <div className="text-center">
                            <div className="font-serif text-2xl mb-2">Open SDK</div>
                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                                Modern TypeScript SDK with full documentation and examples
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="font-serif text-2xl mb-2">Curated</div>
                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                                Every integration reviewed for security and quality standards
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="font-serif text-2xl mb-2">Community First</div>
                            <p className="font-sans text-sm text-foreground/60 leading-relaxed">
                                Built by users, for users—no vendor lock-in or proprietary restrictions
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Integrations - Single Monitor */}
            <div className="mb-20">
                <h3 className="font-serif text-2xl mb-8 text-center">Popular Integrations</h3>

                {/* Monitor Frame */}
                <div className="relative" style={{ perspective: "1200px" }}>
                    <div
                        className="bg-foreground/5 border-2 border-foreground/20 rounded-xl p-2 shadow-2xl"
                        style={{
                            transform: "rotateX(2deg)",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        {/* Screen Bezel */}
                        <div className="bg-muted border border-foreground/10 rounded-lg overflow-hidden">
                            {/* Screen Content */}
                            <div className="p-8 md:p-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <IntegrationCard
                                        name="Immich Photos"
                                        description="Self-hosted photo backup with facial recognition and smart albums"
                                        downloads="8.9K"
                                        category="Media"
                                        rating="4.8"
                                    />
                                    <IntegrationCard
                                        name="Home Security Hub"
                                        description="UniFi Protect integration with AI motion detection"
                                        downloads="6.2K"
                                        category="Home Automation"
                                        rating="4.7"
                                    />
                                    <IntegrationCard
                                        name="Weather Station"
                                        description="Local weather data from personal sensors"
                                        downloads="4.1K"
                                        category="Home Automation"
                                        rating="4.6"
                                    />
                                    <IntegrationCard
                                        name="Document Scanner"
                                        description="OCR and organize paper documents automatically"
                                        downloads="3.8K"
                                        category="Productivity"
                                        rating="4.8"
                                    />
                                    <IntegrationCard
                                        name="Energy Monitor"
                                        description="Track home power usage in real-time"
                                        downloads="2.9K"
                                        category="Home Automation"
                                        rating="4.5"
                                    />
                                    <IntegrationCard
                                        name="Git Server"
                                        description="Host private repositories with web interface"
                                        downloads="5.3K"
                                        category="Developer Tools"
                                        rating="4.9"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monitor Stand */}
                    <div className="flex justify-center mt-2">
                        <div className="h-2 bg-foreground/10 rounded-full w-24"></div>
                    </div>
                </div>
            </div>

            {/* Developer Section with Code Example */}
            <div className="border-t border-foreground/10 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left - Developer Info */}
                    <div>
                        <h3 className="font-serif text-3xl mb-6">Build for Foundation</h3>
                        <p className="font-sans text-lg text-foreground/70 mb-8 leading-relaxed">
                            The Foundation SDK makes it ridiculously simple to build integrations. Write once, deploy to thousands of devices.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div>
                                <h4 className="font-sans font-medium text-foreground mb-2">Open SDK with TypeScript</h4>
                                <p className="font-sans text-sm text-foreground/60">Modern development experience with full type safety and excellent docs</p>
                            </div>
                            <div>
                                <h4 className="font-sans font-medium text-foreground mb-2">Sandboxed Execution</h4>
                                <p className="font-sans text-sm text-foreground/60">Secure runtime environment with granular permission controls</p>
                            </div>
                            <div>
                                <h4 className="font-sans font-medium text-foreground mb-2">Community Marketplace</h4>
                                <p className="font-sans text-sm text-foreground/60">Share your integrations with thousands of Foundation users</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-foreground text-background px-8 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity">
                                View SDK Docs
                            </button>
                            <button className="border border-foreground/20 px-8 py-3 font-sans text-sm font-medium hover:bg-foreground/5 transition-colors">
                                Browse Marketplace
                            </button>
                        </div>
                    </div>

                    {/* Right - Code Example */}
                    <div>
                        <div className="bg-foreground/[0.03] border border-foreground/10 rounded-lg overflow-hidden">
                            <div className="border-b border-foreground/10 px-4 py-3 flex items-center justify-between">
                                <span className="font-mono text-xs text-foreground/50">photo-backup.ts</span>
                                <span className="font-sans text-xs text-foreground/40">Foundation SDK Example</span>
                            </div>
                            <div className="p-6 font-mono text-sm leading-relaxed">
                                <div className="text-foreground/50">
                                    <span className="text-purple-400">import</span> {"{"} Foundation {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'@foundation/sdk'</span>;
                                </div>
                                <div className="text-foreground/50 mt-4">
                                    <span className="text-purple-400">const</span> <span className="text-blue-400">app</span> = <span className="text-purple-400">new</span> <span className="text-yellow-400">Foundation</span>.<span className="text-blue-400">App</span>({"{"});
                                </div>
                                <div className="text-foreground/50 ml-4">
                                    name: <span className="text-green-400">'Photo Backup'</span>,
                                </div>
                                <div className="text-foreground/50 ml-4">
                                    permissions: [<span className="text-green-400">'files.read'</span>]
                                </div>
                                <div className="text-foreground/50">
                                    {"}"});
                                </div>
                                <div className="text-foreground/50 mt-4">
                                    app.<span className="text-blue-400">on</span>(<span className="text-green-400">'file.created'</span>, <span className="text-purple-400">async</span> (file) {"=>"} {"{"}
                                </div>
                                <div className="text-foreground/50 ml-4">
                                    <span className="text-purple-400">if</span> (file.<span className="text-blue-400">isPhoto</span>()) {"{"}
                                </div>
                                <div className="text-foreground/50 ml-8">
                                    <span className="text-purple-400">await</span> app.storage.<span className="text-blue-400">backup</span>(file);
                                </div>
                                <div className="text-foreground/50 ml-8">
                                    app.<span className="text-blue-400">notify</span>(<span className="text-green-400">'Photo backed up!'</span>);
                                </div>
                                <div className="text-foreground/50 ml-4">
                                    {"}"}
                                </div>
                                <div className="text-foreground/50">
                                    {"}"});
                                </div>
                            </div>
                            <div className="border-t border-foreground/10 px-4 py-2 bg-foreground/[0.02]">
                                <p className="font-sans text-xs text-foreground/50">That's it. 10 lines to create a photo backup automation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Alternative OS Options Section */}
        <section className="bg-muted py-32 mb-32">
             <div className="container-swiss">
                 <div className="max-w-4xl mx-auto">
                     <h2 className="font-serif text-4xl mb-6 text-foreground">Not for you?</h2>
                     <p className="font-sans text-lg text-foreground/70 mb-16 leading-relaxed">
                        Foundation is hardware-first. While CornerstoneOS ships as the default experience, you're free to bring your own operating system. Here are some popular alternatives that work well with Foundation's architecture:
                     </p>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                             <h3 className="font-sans text-sm font-medium text-foreground uppercase tracking-wider">NAS-Focused</h3>
                             <div className="space-y-6">
                                 <div>
                                     <h4 className="font-sans font-medium text-foreground mb-1">Unraid</h4>
                                     <p className="font-sans text-sm text-foreground/60 leading-relaxed">Flexible storage pooling with Docker and VM support.</p>
                                 </div>
                                 <div>
                                     <h4 className="font-sans font-medium text-foreground mb-1">TrueNAS</h4>
                                     <p className="font-sans text-sm text-foreground/60 leading-relaxed">Enterprise-grade ZFS storage with extensive plugin ecosystem.</p>
                                 </div>
                                 <div>
                                     <h4 className="font-sans font-medium text-foreground mb-1">OpenMediaVault</h4>
                                     <p className="font-sans text-sm text-foreground/60 leading-relaxed">Lightweight Debian-based NAS solution with web UI.</p>
                                 </div>
                             </div>
                         </div>

                         <div className="space-y-4">
                             <h3 className="font-sans text-sm font-medium text-foreground uppercase tracking-wider">General Purpose</h3>
                             <div className="space-y-6">
                                 <div>
                                     <h4 className="font-sans font-medium text-foreground mb-1">Proxmox VE</h4>
                                     <p className="font-sans text-sm text-foreground/60 leading-relaxed">Virtualization platform for running multiple OS instances.</p>
                                 </div>
                                 <div>
                                     <h4 className="font-sans font-medium text-foreground mb-1">Ubuntu Server</h4>
                                     <p className="font-sans text-sm text-foreground/60 leading-relaxed">Standard Linux server with wide hardware support.</p>
                                 </div>
                                 <div>
                                     <h4 className="font-sans font-medium text-foreground mb-1">Debian</h4>
                                     <p className="font-sans text-sm text-foreground/60 leading-relaxed">Stable, minimal foundation for custom configurations.</p>
                                 </div>
                             </div>
                         </div>
                     </div>

                     <div className="mt-12 pt-8 border-t border-foreground/10">
                         <p className="font-sans text-sm text-foreground/50 italic">
                             Foundation's open architecture means you're never locked in. <ScribbleUnderline delay={0.3} color="rgba(255,255,255,0.5)">Install what works for you.</ScribbleUnderline>
                         </p>
                         <p className="font-sans text-sm text-foreground/40 mt-4">
                             The OS boots off an internal 2230 M.2 NVMe SSD, and we're more than willing to install an OS of your choice for you. Just know it hasn't been extensively tested on different operating systems yet.
                         </p>
                     </div>
                 </div>
             </div>
        </section>

        {/* Final CTA */}
        <section className="container-swiss pt-32 border-t border-foreground/5 text-center">
             <div className="max-w-2xl mx-auto">
                 <h2 className="font-serif text-5xl mb-8">Ready to take control?</h2>
                 <p className="font-sans text-lg text-foreground/60 mb-12">
                    CornerstoneOS comes pre-installed on every Foundation chassis. Reserve yours in the next production run.
                 </p>
                 <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link
                        href="/preorder"
                        className="bg-foreground text-background px-12 py-4 font-sans font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                        Preorder Edition 01
                    </Link>
                    <Link
                        href="/foundation"
                        className="font-sans text-sm font-medium flex items-center gap-2 hover:opacity-60 transition-opacity"
                    >
                        Explore Foundation Hardware <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>
             </div>
        </section>

      </main>
    </>
  );
}

function IntegrationCard({ name, description, downloads, category, rating }) {
  return (
    <div className="border border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all p-5 rounded-lg flex flex-col h-full">
      <div className="mb-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-foreground/5 border border-foreground/10 font-sans text-[10px] text-foreground/60 rounded uppercase tracking-wider">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-xs">★</span>
            <span className="font-sans text-xs text-foreground/60">{rating}</span>
          </div>
        </div>
        <h3 className="font-serif text-xl text-foreground mb-2 leading-tight">{name}</h3>
        <p className="font-sans text-sm text-foreground/60 leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-foreground/10">
        <span className="font-sans text-xs text-foreground/50">
          {downloads} installs
        </span>
        <button className="px-4 py-1.5 bg-foreground/10 hover:bg-foreground/20 font-sans text-xs font-medium transition-colors rounded">
          Install
        </button>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-1">
        <Icon className="w-5 h-5 text-foreground/40" />
      </div>
      <div>
        <h4 className="font-sans font-medium text-foreground">{title}</h4>
        <p className="font-sans text-sm text-foreground/60 mt-1">{desc}</p>
      </div>
    </div>
  );
}
