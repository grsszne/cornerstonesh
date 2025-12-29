"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  EnvelopeSimple, 
  CalendarBlank, 
  Files, 
  Note, 
  Globe, 
  Key, 
  LockKey,
  ShieldCheck,
  Cpu,
  ChartLineUp
} from "@phosphor-icons/react";

export default function CornerstoneOSHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center justify-center py-24 border-t border-foreground/5">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/[0.02] rounded-full blur-3xl"></div>
      </div>

      <div className="container-swiss relative z-20 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        
        {/* Left Content */}
        <div className="md:col-span-12 lg:col-span-5 text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
              The heart of your<br/>
              <span className="text-foreground/40 font-serif italic">sovereign home.</span>
            </h2>
            
            <p className="font-sans text-lg text-foreground/60 max-w-md mb-12 leading-relaxed">
              CornerstoneOS is a calm, dashboard-centric operating system. Built for privacy, optimized for local intelligence, and designed to bring order to your digital life.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/cornerstoneos" 
                className="bg-foreground text-background px-8 py-4 font-sans font-medium text-sm hover:opacity-90 transition-opacity inline-block"
              >
                Discover CornerstoneOS
              </Link>
            </div>
          </motion.div>

          {/* Feature List */}
          <div className="mt-16 grid grid-cols-2 gap-8">
            <FeatureSmall 
              icon={LockKey} 
              title="Local Execution" 
              desc="Your data never leaves the chassis."
            />
            <FeatureSmall 
              icon={ShieldCheck} 
              title="Matter-Native" 
              desc="Total home automation, locally."
            />
          </div>
        </div>

        {/* Right Visual (Dashboard View) */}
        <div className="md:col-span-12 lg:col-span-7 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative perspective-2000"
          >
            {/* Main Window */}
            <div className="bg-background border-2 border-foreground/10 rounded-2xl shadow-2xl overflow-hidden glass-effect relative">
              {/* Window Header */}
              <div className="bg-foreground/[0.03] border-b border-foreground/5 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-foreground/10"></div>
                  <div className="w-3 h-3 rounded-full bg-foreground/10"></div>
                  <div className="w-3 h-3 rounded-full bg-foreground/10"></div>
                </div>
                <div className="text-[10px] uppercase tracking-widest font-sans font-medium opacity-40">foundation-01.local</div>
                <div className="w-12"></div>
              </div>

              {/* Dashboard Content Mock */}
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-12 gap-8">
                  {/* Sidebar Hint */}
                  <div className="col-span-3 space-y-6 opacity-40 hidden md:block">
                    <div className="h-4 w-full bg-foreground/10 rounded"></div>
                    <div className="h-4 w-3/4 bg-foreground/10 rounded"></div>
                    <div className="h-4 w-5/6 bg-foreground/10 rounded"></div>
                    <div className="h-4 w-2/3 bg-foreground/10 rounded"></div>
                  </div>

                  {/* Main Grid */}
                  <div className="col-span-12 md:col-span-9 space-y-8">
                    {/* Hero Stat Cards */}
                    <div className="grid grid-cols-3 gap-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-foreground/[0.02] border border-foreground/5 rounded-xl p-4 flex flex-col justify-end">
                           <div className="h-2 w-12 bg-foreground/10 rounded mb-2"></div>
                           <div className="h-4 w-20 bg-foreground/20 rounded"></div>
                        </div>
                      ))}
                    </div>

                    {/* Content Blocks */}
                    <div className="grid grid-cols-2 gap-6 pb-4">
                      <div className="h-40 bg-foreground/[0.02] border border-foreground/5 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                              <EnvelopeSimple className="w-4 h-4 opacity-40" />
                           </div>
                           <div className="h-3 w-16 bg-foreground/10 rounded"></div>
                        </div>
                        <div className="space-y-3">
                           <div className="h-2 w-full bg-foreground/5 rounded"></div>
                           <div className="h-2 w-5/6 bg-foreground/5 rounded"></div>
                           <div className="h-2 w-4/6 bg-foreground/5 rounded"></div>
                        </div>
                      </div>
                      <div className="h-40 bg-foreground/[0.02] border border-foreground/5 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                              <CalendarBlank className="w-4 h-4 opacity-40" />
                           </div>
                           <div className="h-3 w-20 bg-foreground/10 rounded"></div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center text-[10px] font-sans opacity-40">29</div>
                           <div className="space-y-2 flex-1">
                              <div className="h-2 w-full bg-foreground/5 rounded"></div>
                              <div className="h-1 w-1/2 bg-foreground/5 rounded"></div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floaties - App Icons */}
              <FloatingIcon icon={Files} delay={0.1} position="top-1/4 -left-8" />
              <FloatingIcon icon={Note} delay={0.3} position="bottom-1/4 -right-8" />
              <FloatingIcon icon={Globe} delay={0.5} position="-top-4 right-1/4" />
              <FloatingIcon icon={Key} delay={0.7} position="-bottom-4 left-1/3" />
            </div>

            {/* Reflection / Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent pointer-events-none rounded-2xl"></div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}

function FeatureSmall({ icon: Icon, title, desc }) {
  return (
    <div className="space-y-3">
      <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
        <Icon className="w-5 h-5 text-foreground/60" />
      </div>
      <div>
        <h4 className="font-sans font-medium text-sm text-foreground">{title}</h4>
        <p className="font-sans text-xs text-foreground/40 leading-relaxed mt-1">{desc}</p>
      </div>
    </div>
  );
}

function FloatingIcon({ icon: Icon, delay, position }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ 
        initial: { duration: 0.5, delay },
        animate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
      }}
      className={`absolute ${position} w-16 h-16 bg-background border border-foreground/10 rounded-2xl shadow-xl flex items-center justify-center z-30 hidden md:flex`}
    >
      <Icon className="w-6 h-6 text-foreground/40" />
    </motion.div>
  );
}
