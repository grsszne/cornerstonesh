"use client";

import { motion } from "framer-motion";
import { Flask, Buildings, Cpu, ArrowRight } from "@phosphor-icons/react";

export default function StudioUseCases() {
  const cases = [
    { 
        title: "Research Labs",
        icon: Flask,
        headline: "Unconstrained Experimentation",
        desc: "Run 70B+ param models with full weight access. No safety filters, no rate limits, no API bills. Perfect for synthetic data generation and fine-tuning experiments.",
        color: "blue"
    },
    { 
        title: "High-Compute Workflows",
        icon: Cpu,
        headline: "Zero Marginal Cost",
        desc: "Process millions of documents or run autonomous agents in infinite loops. When you own the compute, 'expensive' queries become free. reliable batch processing 24/7.",
        color: "indigo"
    },
    { 
        title: "SMBs & Startups",
        icon: Buildings,
        headline: "Predictable Economics",
        desc: "Stop bleeding cash on API calls. Convert variable OpEx into fixed CapEx. One investment gives you years of unlimited intelligence to build your product on.",
        color: "green"
    }
  ];

  return (
    <section className="py-24 md:py-32 container-swiss overflow-hidden">
        <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Who is Studio for?</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Designed for workflows that break the cloud model.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto perspective-[2000px]">
            {cases.map((item, i) => (
                <Card key={i} item={item} index={i} />
            ))}
        </div>
    </section>
  );
}

function Card({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100, rotateX: -10, scale: 0.9 }}
            whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 0, 
                scale: 1,
                transition: {
                    delay: index * 0.1,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.3
                }
            }}
            whileHover={{ y: -10, scale: 1.02, zIndex: 10 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative h-full bg-muted/30 border border-foreground/10 rounded-2xl p-8 flex flex-col justify-between hover:bg-background hover:border-foreground/30 hover:shadow-2xl transition-all duration-500"
        >
            {/* Hover Glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-${item.color}-500/5 to-transparent pointer-events-none rounded-2xl`}></div>

            <div>
                <div className="mb-8 flex items-center justify-between">
                     <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                        <item.icon weight="duotone" className="w-6 h-6" />
                     </div>
                     <div className="text-xs font-mono uppercase tracking-widest text-foreground/40">{item.title}</div>
                </div>
                
                <h3 className="text-2xl font-serif mb-4 group-hover:translate-x-1 transition-transform">{item.headline}</h3>
                <p className="text-foreground/70 leading-relaxed">
                    {item.desc}
                </p>
            </div>

            <div className="mt-8 pt-8 border-t border-foreground/5 flex items-center text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors">
                <span>Learn more</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </motion.div>
    );
}
