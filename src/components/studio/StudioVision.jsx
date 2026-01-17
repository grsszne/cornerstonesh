"use client";

import { motion } from "framer-motion";

export default function StudioVision() {
  const problems = [
    { title: "Unpredictable OpEx", desc: "Companies are spending tens of thousands monthly on OpenAI APIs with no cap." },
    { title: "Data Leakage", desc: "Every prompt leaves your network. Regulatory compliance becomes impossible." },
    { title: "Vendor Lock-in", desc: "You're renting intelligence. Only they own the weights. You own nothing." }
  ];
  
  const solutions = [
     { title: "Fixed CapEx", desc: "One-time hardware investment. Amortize intelligence over 5 years." },
     { title: "Total Sovereignty", desc: "Your network. Your weights. Your data. Zero external signals." },
     { title: "Unlimited Inference", desc: "Run models 24/7. No rate limits. No token counts. Just compute." }
  ];

  return (
    <section className="py-24 md:py-32 container-swiss relative">
      
      {/* Problem Section */}
      <div className="mb-32">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-16 text-center"
          >
            The Cloud Trap
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                 className="p-8 border border-foreground/10 rounded-2xl hover:bg-foreground/5 transition-colors group relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <h3 className="text-xl font-serif mb-4 group-hover:text-red-500 transition-colors">{item.title}</h3>
                 <p className="text-foreground/70 leading-relaxed group-hover:text-foreground transition-colors">
                    {item.desc}
                 </p>
               </motion.div>
            ))}
          </div>
      </div>

      {/* Divider Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mb-32"
      ></motion.div>

      {/* Solution Section */}
      <div>
         <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-16 text-center"
          >
            The Studio Model
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                 className="p-8 border border-foreground/10 rounded-2xl bg-muted/20 backdrop-blur-sm group hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl"
               >
                 <h3 className="text-xl font-serif mb-4 group-hover:text-green-500 transition-colors">{item.title}</h3>
                 <p className="text-foreground/70 leading-relaxed text-lg">
                    {item.desc}
                 </p>
               </motion.div>
            ))}
          </div>
      </div>

    </section>
  );
}
