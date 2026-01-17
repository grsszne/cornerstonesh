"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value }) {
    const spring = useSpring(0, { bounce: 0, duration: 1000 });
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    
    // Create a transformer to format the currency 
    // We can't apply to locale string directly in the spring, so we use a derived value
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (inView) {
            spring.set(value);
        }
    }, [inView, value, spring]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            setDisplayValue(Math.floor(latest).toLocaleString());
        });
    }, [spring]);

    return <span ref={ref}>{displayValue}</span>;
}

export default function StudioEconomics() {
    const [apiSpend, setApiSpend] = useState(50000);
    // Hypothetical math: Foundation/Studio cost is fixed hardware cost (approx $15k for entry workstation) 
    // vs Annual API Spend.
    // Payback period = (Hardware Cost / Monthly API Spend)
    // Savings 5 Year = (Monthly * 12 * 5) - Hardware Cost - (Energy/Maintenance ~ 100/mo * 60)
    
    const hardwareCost = 15000;
    const monthlySpend = apiSpend / 12;
    const paybackMonths = hardwareCost / monthlySpend;
    const fiveYearSavings = (apiSpend * 5) - hardwareCost - (200 * 12 * 5); // Assuming $200/mo electricity/setup

    return (
        <section className="py-24 md:py-32 container-swiss border-y border-foreground/5 bg-background relative overflow-hidden">
             
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
                <div className="w-96 h-96 border border-foreground rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
             </div>

             <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                 <div>
                     <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif mb-8"
                     >
                         The Economic Engine
                     </motion.h2>
                     <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
                         Stop renting your intelligence. Own the infrastructure.
                     </p>

                     {/* Calculator Inputs */}
                     <div className="space-y-8 max-w-md">
                         <div>
                             <label className="flex justify-between text-sm font-sans font-medium text-foreground/60 mb-4">
                                 <span>Annual API Spend</span>
                                 <span>${apiSpend.toLocaleString()}</span>
                             </label>
                             <input 
                                type="range" 
                                min="10000" 
                                max="500000" 
                                step="5000" 
                                value={apiSpend}
                                onChange={(e) => setApiSpend(parseInt(e.target.value))}
                                className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-foreground"
                             />
                             <div className="flex justify-between text-xs text-foreground/40 mt-2 font-mono">
                                 <span>$10k</span>
                                 <span>$500k+</span>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-foreground/5 relative backdrop-blur-sm">
                     <div className="grid gap-12">
                         <div>
                             <div className="text-sm font-sans uppercase tracking-widest text-foreground/50 mb-2">Payback Period</div>
                             <div className="text-5xl md:text-6xl font-serif text-foreground">
                                 <Counter value={paybackMonths} /> <span className="text-2xl text-foreground/50 font-sans">months</span>
                             </div>
                             <div className="w-full bg-foreground/10 h-1 mt-6 rounded-full overflow-hidden">
                                 <motion.div 
                                    className="bg-green-500 h-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((12 / paybackMonths) * 100, 100)}%` }}
                                    transition={{ duration: 0.5 }}
                                 ></motion.div>
                             </div>
                         </div>

                         <div>
                             <div className="text-sm font-sans uppercase tracking-widest text-foreground/50 mb-2">5-Year Savings</div>
                             <div className="text-5xl md:text-6xl font-serif text-foreground tabular-nums text-green-600 dark:text-green-400">
                                 $<Counter value={fiveYearSavings} />
                             </div>
                             <p className="text-sm text-foreground/40 mt-4 leading-relaxed">
                                 Assuming $15k hardware cost + $200/mo operating costs vs. current API spend. Unlimited inference included.
                             </p>
                         </div>
                     </div>
                 </div>
             </div>
        </section>
    );
}
