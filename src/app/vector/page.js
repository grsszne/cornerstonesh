"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import SlopeField from "@/components/vector/SlopeField";
import SystemMonitor from "@/components/vector/SystemMonitor";
import PerformanceBars from "@/components/vector/PerformanceBars";
import MagnitudeSlider from "@/components/vector/MagnitudeSlider";
import VerticalStack from "@/components/vector/VerticalStack";
import UseCaseSwitcher from "@/components/vector/UseCaseSwitcher";
import LiveWorkloads from "@/components/vector/LiveWorkloads";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const architecturePillars = [
  {
    label: "Hardware",
    description: "Engineered from first principles with modular aluminum extrusion chassis and CNC-machined components. Vector integrates professional RTX workstation GPUs, server-grade power delivery, and advanced thermal management in a compact form factor. Available in tower or rack-mount configurations\u2014swap panel kits without changing the underlying architecture."
  },
  {
    label: "Compute",
    description: "Powered by professional NVIDIA RTX Pro 6000 Blackwell GPUs with 96GB VRAM per card. Scalable configurations from single-GPU rendering workstations to triple-GPU AI development systems. Industrial server motherboards with ECC memory support and PCIe Gen 5.0 ensure reliability for production environments."
  },
  {
    label: "Software",
    description: "VectorOS provides unified infrastructure management across all workloads. Real-time resource monitoring, automated thermal optimization, and intelligent job scheduling built into the system. Native support for PyTorch, TensorFlow, DaVinci Resolve, Blender, and other professional applications."
  },
  {
    label: "Intelligence",
    description: "Same Universal Context Engine as Foundation, scaled for professional workloads. Track training runs, manage render farms, and search across project files with semantic understanding. Contextual insights for resource optimization and workflow analysis\u2014all processing locally on your hardware."
  }
];

export default function VectorPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.8], [1, 0.96]);
  const progressScaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-foreground selection:text-background">

      {/* Scroll Progress — Vertical line on left */}
      <motion.div
        className="fixed left-4 top-0 bottom-0 w-px bg-foreground/10 z-40 origin-top hidden lg:block"
        style={{ scaleY: progressScaleY }}
      />
      <div className="fixed left-4 top-0 bottom-0 w-px bg-foreground/5 z-30 hidden lg:block" />

      {/* ========================================= */}
      {/* HERO SECTION — Slope Field Background    */}
      {/* ========================================= */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex flex-col items-center justify-center text-center relative pt-32 pb-24 bg-[#0A0A0A]"
      >
        {/* Living Slope Field Background */}
        <div className="absolute inset-0">
          <SlopeField interactive={true} spacing={45} lineLength={20} speed={1.2} />
        </div>

        {/* Content over slope field */}
        <div className="relative z-10 container-swiss">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-serif tracking-tight text-[#F5F5F7] mb-8 leading-[0.9]">
              Vector
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl font-sans font-light text-[#F5F5F7]/70 max-w-3xl mx-auto leading-relaxed mb-6 text-balance"
          >
          Professional compute infrastructure you own outright.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl font-serif italic text-[#F5F5F7]/45 mb-12"
          >
            Same direction. Infinite magnitude.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex items-center gap-3 text-sm font-sans text-[#F5F5F7]/35 tracking-widest uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-accent/80 animate-pulse" />
            Currently in development &mdash; Expected 2027
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================= */}
      {/* LIVE WORKLOADS — Production AI Demo       */}
      {/* ========================================= */}
      <LiveWorkloads />

      {/* ========================================= */}
      {/* ARCHITECTURE + SYSTEM MONITOR            */}
      {/* ========================================= */}
      <section className="bg-muted py-32 md:py-40 relative overflow-hidden">
        {/* Subtle slope field in background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <SlopeField interactive={false} spacing={50} lineLength={16} speed={0.4} />
        </div>

        <div className="container-swiss relative z-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Architecture Overview</h2>
            <p className="font-sans text-foreground/55 text-lg max-w-2xl">
              Four layers, one system. Each designed to reinforce the others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Architecture Cards */}
            <div className="lg:col-span-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {architecturePillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.label}
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                    className="bg-muted p-7 md:p-9 group hover:bg-background/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
                  >
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-sans text-xs text-foreground/25 uppercase tracking-widest">
                        0{index + 1}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground">{pillar.label}</h3>
                    </div>
                    <p className="font-sans text-sm text-foreground/55 leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* System Monitor */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <SystemMonitor />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* KEY SPECS STRIP                          */}
      {/* ========================================= */}
      <section className="border-b border-foreground/10 py-16">
        <div className="container-swiss">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {[
              { value: "96GB", label: "VRAM per GPU" },
              { value: "3x", label: "GPU Scaling" },
              { value: "Gen 5", label: "PCIe Interface" },
              { value: "ECC", label: "Memory Support" }
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-default"
              >
                <div className="font-serif text-3xl md:text-4xl text-foreground mb-2 group-hover:scale-110 transition-transform duration-300">{spec.value}</div>
                <div className="font-sans text-sm text-foreground/45 uppercase tracking-wider">{spec.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================= */}
      {/* PERFORMANCE BENCHMARKS                   */}
      {/* ========================================= */}
      <section className="py-32 md:py-40">
        <div className="container-swiss">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Performance</h2>
            <p className="font-sans text-foreground/55 text-lg max-w-2xl">
              Real-world benchmarks. Not synthetic scores.
            </p>
          </motion.div>

          <div className="max-w-4xl">
            <PerformanceBars />
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* USE CASES — Interactive Switcher         */}
      {/* ========================================= */}
      <section className="bg-muted py-32 md:py-40">
        <div className="container-swiss">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Use Cases</h2>
            <p className="font-sans text-foreground/55 text-lg max-w-2xl">
              Purpose-built configurations for professional workflows.
            </p>
          </motion.div>

          <UseCaseSwitcher />
        </div>
      </section>

      {/* ========================================= */}
      {/* MAGNITUDE SLIDER — Interactive Demo      */}
      {/* ========================================= */}
      <section className="py-32 md:py-40 border-b border-foreground/10">
        <div className="container-swiss">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Scale Without Changing Direction</h2>
            <p className="font-sans text-foreground/55 text-lg max-w-2xl">
              Add GPUs without changing your workflow. Same tools, same code, same direction&mdash;just more compute.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <MagnitudeSlider />
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* VERTICAL INTEGRATION — Animated Stack    */}
      {/* ========================================= */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 border border-foreground/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 hidden lg:block" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-foreground/[0.03] rounded-full translate-y-1/2 -translate-x-1/2 hidden lg:block" />

        <div className="container-swiss relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">Vertical Integration</h2>
              <p className="font-sans text-xl text-foreground/65 leading-relaxed mb-6">
                Complete control from silicon to software. Vector&rsquo;s hardware, thermal architecture, power delivery, OS, and intelligence layer are designed together&mdash;not assembled from off-the-shelf components.
              </p>
              <p className="font-sans text-foreground/50 leading-relaxed">
                This integration enables performance optimization, reliability, and features impossible with traditional workstation builds. One company responsible for the entire stack.
              </p>
            </motion.div>

            <VerticalStack />
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* CONFIGURATIONS                           */}
      {/* ========================================= */}
      <section className="bg-muted py-32 md:py-40">
        <div className="container-swiss">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Configurations</h2>
            <p className="font-sans text-foreground/55 text-lg max-w-2xl">
              Purpose-matched hardware for specific workflows. Tower or rack-mount.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: "Vector AI", gpus: "2\u20133x RTX Pro 6000", use: "Model training & inference", range: "$36K\u2013$42K" },
              { name: "Vector Render", gpus: "1\u20132x RTX Pro 6000", use: "3D rendering & VFX", range: "$18K\u2013$28K" },
              { name: "Vector Edit", gpus: "1x RTX Pro 6000", use: "Video production", range: "$12K\u2013$18K" }
            ].map((config) => (
              <motion.div
                key={config.name}
                variants={fadeUp}
                transition={{ duration: 0.8 }}
                className="bg-muted p-8 md:p-10 group hover:bg-background/40 hover:-translate-y-1 transition-all duration-500 hover:shadow-lg hover:shadow-foreground/5"
              >
                <h3 className="font-serif text-2xl text-foreground mb-6 group-hover:text-accent transition-colors duration-500">{config.name}</h3>
                <dl className="space-y-4 font-sans text-sm">
                  <div className="flex justify-between items-baseline border-b border-foreground/5 pb-3">
                    <dt className="text-foreground/45 uppercase tracking-wider text-xs">GPUs</dt>
                    <dd className="text-foreground font-medium">{config.gpus}</dd>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-foreground/5 pb-3">
                    <dt className="text-foreground/45 uppercase tracking-wider text-xs">Primary Use</dt>
                    <dd className="text-foreground font-medium">{config.use}</dd>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <dt className="text-foreground/45 uppercase tracking-wider text-xs">Range</dt>
                    <dd className="text-foreground font-medium">{config.range}</dd>
                  </div>
                </dl>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================= */}
      {/* FINAL CTA — With Slope Field             */}
      {/* ========================================= */}
      <section className="py-32 md:py-40 relative overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-30">
          <SlopeField interactive={false} spacing={35} lineLength={14} speed={0.6} />
        </div>

        <motion.div
          className="container-swiss text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
        >
          <h2 className="text-5xl md:text-7xl font-serif mb-8 text-[#F5F5F7]">Same direction.</h2>
          <p className="text-xl md:text-2xl text-[#F5F5F7]/55 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-16">
            Vector launches 2027. Professional compute infrastructure designed as a complete system.
          </p>

          <div className="text-center font-sans text-sm text-[#F5F5F7]/35 max-w-xl mx-auto">
            <p className="mb-2">Inquiries: vector@cornerstone.sh</p>
            <p>Vector is a planned product launching 2027. Specifications subject to change.</p>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
