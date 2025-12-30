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
                             The OS boots off an internal 2230 M.2 NVMe SSD, and we're more than willing to install it for you. Just know it hasn't been extensively tested on different operating systems yet.
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
