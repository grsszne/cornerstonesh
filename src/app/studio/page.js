"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import StudioHero from "@/components/studio/StudioHero";
import StudioVision from "@/components/studio/StudioVision";
import StudioEconomics from "@/components/studio/StudioEconomics";
import StudioApiDemo from "@/components/studio/StudioApiDemo";
import StudioTechPreview from "@/components/studio/StudioTechPreview";
import StudioHardware from "@/components/studio/StudioHardware";
import StudioFeatures from "@/components/studio/StudioFeatures";
import StudioRoadmap from "@/components/studio/StudioRoadmap";
import StudioFounder from "@/components/studio/StudioFounder";
import StudioWaitlist from "@/components/studio/StudioWaitlist";
import StudioUseCases from "@/components/studio/StudioUseCases";
import Link from "next/link";

export default function StudioPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative selection:bg-foreground selection:text-background">
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-50"
        style={{ scaleX }}
      />

      <StudioHero />
      
      <StudioVision />

      <StudioEconomics />

      <StudioApiDemo />

      <StudioTechPreview />

      <StudioHardware />

      <section className="py-24 md:py-32 border-y border-foreground/5 bg-muted/20">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container-swiss max-w-4xl mx-auto md:text-center"
        >
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Why we're building this</h2>
            <p className="text-xl text-foreground/80 leading-relaxed text-balance">
                Cloud AI made sense when models were experimental. Now they're production infrastructure. But you can't build a business on rented compute you don't control. The RAM shortage is making cloud even more expensive. Open source models are approaching GPT-4 quality. The technology exists to run this on-premise. Someone needs to make it actually work.
            </p>
        </motion.div>
      </section>

      <StudioFeatures />

      <StudioUseCases />

      <StudioRoadmap />

      {/* Technical Credibility */}
      <section className="py-24 md:py-32 container-swiss border-t border-foreground/5">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">The technology is real</h2>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                Foundation already runs local LLMs for semantic search and intelligence. The software stack is proven. Studio expands this with enterprise-grade hardware and features designed for teams.
            </p>
             <Link href="/foundation#specs" className="inline-block border-b border-foreground pb-1 text-lg hover:opacity-70 transition-opacity">
                See Foundation's technical specifications
            </Link>
        </div>
      </section>

      <StudioWaitlist />

      {/* Skepticism */}
      <section className="py-24 md:py-32 container-swiss">
         <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">Why believe us</h2>
         <div className="grid md:grid-cols-3 gap-12">
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-xl font-medium mb-4">We're shipping Foundation in 2026</h3>
                <p className="text-foreground/70 leading-relaxed">
                    That's the same software, smaller scale. You can see it works.
                </p>
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <h3 className="text-xl font-medium mb-4">The hardware exists</h3>
                <p className="text-foreground/70 leading-relaxed">
                    We're not inventing new chips. We're integrating available components intelligently.
                </p>
             </motion.div>
             <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <h3 className="text-xl font-medium mb-4">The market timing is right</h3>
                <p className="text-foreground/70 leading-relaxed">
                    RAM prices are spiking. Open source models are maturing. Cloud costs are rising. 2027 is when this needs to exist.
                </p>
             </motion.div>
         </div>
      </section>

      <StudioFounder />

      {/* Bridge to Foundation */}
      <section className="py-24 md:py-32 bg-muted/50 border-y border-foreground/5">
        <div className="container-swiss max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Try the technology today</h2>
             <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
                Want to experience what Studio will feel like? Foundation launches Spring 2026. It runs the same CornerStoneOS software. Same integrated email, files, calendar, and local AI. Smaller scale, personal use. Foundation buyers get priority access to Studio pilots.
             </p>
              <Link href="/preorder" className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:opacity-90 transition-opacity inline-block">
                Reserve Foundation
            </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 container-swiss text-center">
        <h2 className="text-5xl md:text-7xl font-serif mb-8">Ready for the future?</h2>
        <p className="text-xl md:text-2xl text-foreground/70 font-sans font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Studio launches in 2027 with limited initial availability. Join the waitlist to be notified when we're ready for pilot partners. Or reserve Foundation today to experience the technology firsthand.
        </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
             <button className="bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:opacity-90 transition-opacity">
                Join Studio Waitlist
             </button>
             <Link href="/preorder" className="px-8 py-4 rounded-full font-medium text-lg border border-foreground/20 hover:border-foreground transition-colors">
                Reserve Foundation
             </Link>
         </div>
         
         <div className="text-center font-mono text-sm text-foreground/40 max-w-2xl mx-auto">
             <p className="mb-4">Questions? Email studio@cornerstone.sh</p>
             <p>Studio is a planned product launching 2027. Specifications and availability subject to change. Foundation is available for preorder Spring 2026.</p>
         </div>
      </section>
    </main>
  );
}
