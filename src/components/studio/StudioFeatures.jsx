"use client";

import { motion } from "framer-motion";
import { Check, X } from "@phosphor-icons/react";

const features = [
  { name: "Data Privacy", studio: true, openai: false, desc: "Data never leaves your local network." },
  { name: "Cost Model", studio: "Fixed CapEx", openai: "Variable OpEx", desc: "One-time hardware purchase vs monthly API bills." },
  { name: "Inference Limits", studio: "Unlimited", openai: "Rate Limited", desc: "Run as many tokens as your hardware can handle." },
  { name: "Model Fine-tuning", studio: true, openai: "Restricted", desc: "Full access to weights and fine-tuning." },
  { name: "Latency", studio: "< 20ms", openai: "~ 500ms", desc: "No network round-trips for inference." },
  { name: "Offline Capable", studio: true, openai: false, desc: "Works without an internet connection." },
];

export default function StudioFeatures() {
  return (
    <section className="py-24 md:py-32 container-swiss">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">A Better Model</h2>
        
        <div className="overflow-hidden rounded-2xl border border-foreground/10">
            <div className="grid grid-cols-3 bg-muted/50 p-6 border-b border-foreground/10 font-medium font-sans">
                <div className="text-foreground/50">Feature</div>
                <div className="text-center text-foreground">Cornerstone Studio</div>
                <div className="text-center text-foreground/50">Public APIs</div>
            </div>
            
            <div className="bg-background">
                {features.map((feature, i) => (
                    <motion.div 
                        key={feature.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1 }}
                        className="grid grid-cols-3 p-6 border-b border-foreground/5 hover:bg-foreground/5 transition-colors group relative"
                    >
                        {/* Tooltip on hover */}
                        <div className="absolute left-0 top-0 h-full w-1 bg-foreground opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex items-center text-foreground/80 font-medium">
                            {feature.name}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-xs text-foreground/40 font-normal hidden sm:block">
                                {feature.desc}
                            </div>
                        </div>
                        
                        <div className="flex justify-center items-center font-sans text-lg">
                            {feature.studio === true ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 + (i * 0.1) }}
                                    className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center"
                                >
                                    <Check weight="bold" />
                                </motion.div>
                            ) : (
                                <span className="font-semibold text-foreground">{feature.studio}</span>
                            )}
                        </div>
                        
                        <div className="flex justify-center items-center font-sans text-foreground/40">
                             {feature.openai === false ? (
                                <X weight="bold" className="text-red-400" />
                            ) : (
                                <span>{feature.openai}</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
