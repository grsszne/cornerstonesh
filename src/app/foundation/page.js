"use client";

import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FoundationBuilder from "@/components/FoundationBuilder";
import CornerstoneOS from "@/components/CornerstoneOS";
import AiSearchDemo from "@/components/AiSearchDemo";
import ScrollToRef from "@/components/ScrollToRef";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export default function FoundationPage() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToRef />
      </Suspense>
      <main className="min-h-screen bg-background text-foreground pt-32">

        {/* Hero Section */}
        <section className="container-swiss mb-32 flex flex-col items-center justify-center text-center min-h-screen">
            <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-foreground mb-8">
              Foundation
            </h1>
            <p className="text-xl md:text-2xl font-sans text-foreground/70 max-w-2xl text-balance mb-12 leading-relaxed">
              The sovereign home server and software suite. Designed for privacy, engineered for longevity, built for you.
            </p>
            <div className="flex gap-4">
              <Link
                href="/preorder"
                className="bg-foreground text-background px-8 py-3 text-sm font-sans font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                Preorder
              </Link>
              <a
                href="#specs"
                className="px-8 py-3 text-sm font-sans font-medium text-foreground border border-foreground/20 rounded-full hover:border-foreground transition-colors"
              >
                Technical Specifications
              </a>
            </div>
        </section>

        {/* Product Imagery + Architecture */}
        <section className="bg-muted min-h-screen flex flex-col">
            <motion.div
              className="flex-1 flex items-center justify-center py-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1 }}
            >
                <span className="font-serif italic text-foreground/30">Figure 01. Foundation Chassis</span>
            </motion.div>
            <div className="container-swiss py-16">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div variants={fadeUp} transition={{ duration: 1 }}>
                   <h3 className="font-serif text-2xl mb-4 text-foreground">Physical</h3>
                   <p className="font-sans text-foreground/70 leading-relaxed">
                     Milled from a single block of 6061-T6 aluminum. The unibody chassis acts as a passive heatsink, eliminating fan noise and dust accumulation.
                   </p>
                </motion.div>
                <motion.div variants={fadeUp} transition={{ duration: 1 }}>
                   <h3 className="font-serif text-2xl mb-4 text-foreground">Compute</h3>
                   <p className="font-sans text-foreground/70 leading-relaxed">
                     Powered by efficient x86 architecture using Intel N100 series processors. Expandable LPDDR5X memory and PCIe Gen 3.0 backplane for future-proofing.
                   </p>
                </motion.div>
                <motion.div variants={fadeUp} transition={{ duration: 1 }}>
                   <h3 className="font-serif text-2xl mb-4 text-foreground">Logic</h3>
                   <p className="font-sans text-foreground/70 leading-relaxed">
                     Shipping with CornerstoneOS, a Matter-native environment for total home automation. Local execution ensures your data never leaves the device.
                   </p>
                </motion.div>
              </motion.div>
            </div>
        </section>

        {/* Hardware Modularity */}
        <section className="bg-muted py-32">
          <div className="container-swiss">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="font-serif text-4xl mb-6 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                Universal Architecture
              </motion.h2>
              <motion.p
                className="font-sans text-xl text-foreground/70 mb-16 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                Six identical bays. Infinite configurations.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeUp} transition={{ duration: 1 }}>
                  <h3 className="font-sans font-medium text-foreground mb-4 uppercase tracking-wider text-sm">The System</h3>
                  <p className="font-sans text-foreground/70 leading-relaxed mb-4">
                    Each Foundation unit features six universal module bays, accessible from the chassis front. Hot-swappable by design, these bays accept standardized modules that communicate directly with the PCIe Gen 3.0 backplane.
                  </p>
                  <p className="font-sans text-foreground/70 leading-relaxed">
                    No tools. No reboots. Reconfigure your system as your needs evolve—swap a storage module for network expansion in seconds.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} transition={{ duration: 1 }}>
                  <h3 className="font-sans font-medium text-foreground mb-4 uppercase tracking-wider text-sm">Available Modules</h3>
                  <ul className="space-y-3 font-sans text-foreground/70">
                    <li className="flex items-start">
                      <span className="text-foreground/40 mr-3">—</span>
                      <div>
                        <span className="text-foreground font-medium">NVMe Storage</span>
                        <span className="block text-sm mt-1">M.2 2280, up to 8TB per module</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-foreground/40 mr-3">—</span>
                      <div>
                        <span className="text-foreground font-medium">Network</span>
                        <span className="block text-sm mt-1">1GbE, 2.5GbE, 5GbE, 10GbE, WiFi 6E</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-foreground/40 mr-3">—</span>
                      <div>
                        <span className="text-foreground font-medium">I/O Expansion</span>
                        <span className="block text-sm mt-1">USB-C, USB-A, Thunderbolt 4</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-foreground/40 mr-3">—</span>
                      <div>
                        <span className="text-foreground font-medium">Future Modules</span>
                        <span className="block text-sm mt-1">Extensible platform for new capabilities</span>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div
                className="border-t border-foreground/10 pt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="font-serif text-4xl text-foreground mb-2">6</div>
                    <div className="font-sans text-sm text-foreground/60 uppercase tracking-wider">Universal Bays</div>
                  </div>
                  <div>
                    <div className="font-serif text-4xl text-foreground mb-2">48TB</div>
                    <div className="font-sans text-sm text-foreground/60 uppercase tracking-wider">Maximum Storage</div>
                  </div>
                  <div>
                    <div className="font-serif text-4xl text-foreground mb-2">0s</div>
                    <div className="font-sans text-sm text-foreground/60 uppercase tracking-wider">Downtime to Swap</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specs Table */}
        <section id="specs" className="min-h-screen flex items-center scroll-mt-24">
           <div className="container-swiss py-24">
             <motion.h2
               className="font-serif text-4xl mb-12 text-center"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
             >
               Specifications
             </motion.h2>
             <div className="max-w-3xl mx-auto">
                <motion.div
                  className="grid grid-cols-1 divide-y divide-foreground/10"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                   {[
                      { label: "Processor", value: "Intel N100 / N305" },
                      { label: "Memory", value: "8GB / 16GB LPDDR5X" },
                      { label: "Storage", value: "1x NVMe (Boot) + 6x Universal Modules" },
                      { label: "Connectivity", value: "1, 2.5, 5, 10GbE, WiFi 6E modules" },
                      { label: "Dimensions", value: "180mm x 89mm x 89mm" },
                      { label: "Weight", value: "1.2kg (Chassis Only)" },
                      { label: "Materials", value: "Anodized Aluminum" },
                   ].map((spec) => (
                      <motion.div
                        key={spec.label}
                        className="grid grid-cols-2 py-4"
                        variants={fadeUp}
                        transition={{ duration: 1 }}
                      >
                         <dt className="font-sans font-medium text-foreground/60">{spec.label}</dt>
                         <dd className="font-sans text-foreground">{spec.value}</dd>
                      </motion.div>
                   ))}
                </motion.div>
             </div>
           </div>
        </section>

        {/* Builder Section */}
        <motion.section
          className="bg-muted py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1 }}
        >
             <div className="container-swiss">
                 <FoundationBuilder />
             </div>
        </motion.section>

        {/* OS Section */}
        <section className="py-24">
             <div className="container-swiss">
               <motion.div
                 className="text-center mb-16"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               >
                   <h2 className="font-serif text-4xl mb-6">Cornerstone OS</h2>
                   <p className="font-sans text-foreground/70 max-w-xl mx-auto mb-6">
                      A calm, dashboard-centric operating system. No terminals required.
                   </p>
                   <Link
                      href="/cornerstoneos"
                      className="inline-block border-b border-foreground text-foreground pb-1 hover:opacity-50 transition-opacity font-sans text-sm"
                   >
                      Learn more about CornerstoneOS
                   </Link>
               </motion.div>
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.1, delay: 0.2 }}
               >
                 <CornerstoneOS />
               </motion.div>
             </div>
        </section>

        {/* AI-Powered Search Section */}
        <section className="bg-muted h-screen flex items-center overflow-hidden">
             <div className="container-swiss w-full py-24">
                 <motion.div
                   className="text-center mb-12"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1 }}
                 >
                     <h2 className="font-serif text-4xl mb-4">Unified Intelligence</h2>
                     <p className="font-sans text-foreground/70 max-w-xl mx-auto">
                        One search. Every file, email, photo, and password—indexed locally and never leaving your device. Powered by on-device AI that understands context, faces, and relationships.
                     </p>
                 </motion.div>
                 <motion.div
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.1, delay: 0.2 }}
                 >
                   <AiSearchDemo />
                 </motion.div>
             </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
             <motion.div
               className="container-swiss text-center"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.1 }}
             >
               <h2 className="font-serif text-5xl mb-8 text-foreground">Begin</h2>
               <Link
                  href="/preorder"
                  className="inline-block border-b border-foreground text-foreground pb-1 hover:opacity-50 transition-opacity font-sans"
               >
                  Reserve your Foundation
               </Link>
             </motion.div>
        </section>

      </main>
    </>
  );
}
