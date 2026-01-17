"use client";

import { motion } from "framer-motion";

export default function StudioHardware() {
  const configs = [
    {
      name: "Studio Workstation",
      capacity: "10-50 users",
      spec: "Single high-end GPU running 70B parameter models in real-time.",
      price: "Estimated $15,000",
      delay: 0,
       details: ["1x NVIDIA A6000 Ada", "128GB DDR5 ECC", "4TB NVMe Gen5"]
    },
    {
      name: "Studio Server",
      capacity: "50-200 users",
      spec: "Multi-GPU setup for 405B parameter models.",
      price: "Estimated $45,000",
      delay: 0.1,
       details: ["4x NVIDIA L40S", "512GB DDR5 ECC", "16TB NVMe Gen5"]
    },
    {
      name: "Studio Cluster",
      capacity: "200+ users",
      spec: "Distributed inference and high availability for large organizations.",
      price: "Custom Pricing",
      delay: 0.2,
       details: ["Scalable Nodes", "Infiniband Interconnect", "Petabyte Storage"]
    }
  ];

  return (
    <section className="py-24 md:py-32 container-swiss bg-background relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">Three configurations planned</h2>
        <p className="text-foreground/60 font-sans text-sm uppercase tracking-widest">
            Final specifications and pricing subject to change
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {configs.map((config) => (
          <motion.div 
            key={config.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: config.delay, duration: 0.6, ease: "easeOut" }}
            className="group border border-foreground/10 rounded-2xl p-8 flex flex-col justify-between bg-muted/20 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-background"
          >
            {/* Tech Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-foreground/30">
                STATUS: ONLINE<br/>
                TEMP: 42°C
            </div>

            <div>
                <h3 className="text-2xl font-serif mb-2 group-hover:text-foreground transition-colors">{config.name}</h3>
                <div className="text-sm font-sans font-medium text-foreground/50 mb-6 uppercase tracking-wider">{config.capacity}</div>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                    {config.spec}
                </p>
                
                {/* Tech Details Reveal */}
                <div className="space-y-2 mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
                    {config.details.map((detail, i) => (
                         <div key={i} className="flex items-center text-xs font-mono text-foreground/70 border-b border-foreground/5 pb-1">
                             <span className="w-2 h-2 rounded-full bg-foreground/20 mr-2 group-hover:bg-green-500 transition-colors"></span>
                             {detail}
                         </div>
                    ))}
                </div>
            </div>
            <div className="pt-8 border-t border-foreground/5 group-hover:border-foreground/20 transition-colors">
                <span className="font-mono text-sm text-foreground/60 group-hover:text-foreground transition-colors">{config.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
