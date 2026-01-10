"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LockKey,
  ShieldCheck,
} from "@phosphor-icons/react";
import IntegrationsDemo from "./IntegrationsDemo";
import ScribbleUnderline from "./ScribbleUnderline";

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
        <div className="md:col-span-12 lg:col-span-5 text-left order-1 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
              The heart of your<br/>
              <span className="text-foreground/40 font-serif italic">
                <ScribbleUnderline delay={0.8} color="rgba(255,255,255,0.5)">digital</ScribbleUnderline>
                <ScribbleUnderline delay={1.0} color="rgba(255,255,255,0.5)">workspace.</ScribbleUnderline>
              </span>
            </h2>

            <p className="font-sans text-lg text-foreground/60 max-w-md mb-12 leading-relaxed">
            CornerstoneOS is a calm, dashboard-centric interface. Optimized for cross-app intelligence, designed to connect your email, files, and calendar in ways traditional systems can't. A software suite that runs locally on your Foundation.
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
              title="Local Intelligence"
              desc="Cross-app intelligence runs locally on your Foundation."
            />
            <FeatureSmall
              icon={ShieldCheck}
              title="Matter-Native"
              desc="Total home automation, locally."
            />
          </div>
        </div>

        {/* Right Visual (Integrations Demo) */}
        <div className="md:col-span-12 lg:col-span-7 order-2 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <IntegrationsDemo />
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
