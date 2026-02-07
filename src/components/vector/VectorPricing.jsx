"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

const configs = {
  one: {
    name: "Vector One",
    price: 14500,
    gpu: "RTX 5090",
    ram: "64GB DDR5",
    storage: "2TB NVMe",
    req: "2M",
    range: "$2–5K",
  },
  pro: {
    name: "Vector Pro",
    price: 24500,
    gpu: "RTX 5090 ×2",
    ram: "128GB DDR5 ECC",
    storage: "4TB NVMe",
    req: "6M",
    range: "$5–15K",
  },
  max: {
    name: "Vector Max",
    price: 42000,
    gpu: "A6000 Ada ×2",
    ram: "256GB DDR5 ECC",
    storage: "8TB NVMe",
    req: "15M+",
    range: "$15K+",
  },
};

export default function VectorPricing() {
  const [spend, setSpend] = useState(5000);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const calc = useMemo(() => {
    const tier = spend <= 5000 ? "one" : spend <= 15000 ? "pro" : "max";
    const c = configs[tier];
    const amortized = Math.round(c.price / 36);
    const savings = spend - amortized;
    const payback = savings > 0 ? Math.ceil(c.price / savings) : null;
    const total = spend * 36 - c.price;
    return { tier, config: c, amortized, savings, payback, total };
  }, [spend]);

  return (
    <section id="pricing" className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Math, Not Marketing
          </h2>
          <p className="font-sans text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            You&apos;ll do this math anyway. We did it for you.
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-3xl mx-auto border border-foreground/10 p-8 md:p-12 mb-20"
        >
          {/* Slider */}
          <div className="text-center mb-12">
            <div className="font-sans text-sm text-foreground/40 uppercase tracking-wider mb-4">
              Your monthly cloud AI spend
            </div>
            <div className="font-serif text-5xl text-foreground tabular-nums mb-6">
              ${spend.toLocaleString()}
            </div>
            <input
              type="range"
              min={1000}
              max={50000}
              step={500}
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="w-full max-w-md h-px bg-foreground/20 appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--foreground) 0%, var(--foreground) ${((spend - 1000) / 49000) * 100}%, color-mix(in srgb, var(--foreground) 20%, transparent) ${((spend - 1000) / 49000) * 100}%, color-mix(in srgb, var(--foreground) 20%, transparent) 100%)`,
              }}
            />
            <div className="flex justify-between max-w-md mx-auto mt-2">
              <span className="font-sans text-xs text-foreground/20">$1K</span>
              <span className="font-sans text-xs text-foreground/20">$50K</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
            <div className="bg-background p-6">
              <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-2">
                Hardware
              </div>
              <div className="font-serif text-xl text-foreground">
                ${calc.config.price.toLocaleString()}
              </div>
              <div className="font-sans text-xs text-foreground/20 mt-1">
                one-time
              </div>
            </div>
            <div className="bg-background p-6">
              <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-2">
                Amortized
              </div>
              <div className="font-serif text-xl text-foreground">
                ${calc.amortized}/mo
              </div>
              <div className="font-sans text-xs text-foreground/20 mt-1">
                over 3 years
              </div>
            </div>
            <div className="bg-background p-6">
              <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-2">
                Monthly savings
              </div>
              <div className="font-serif text-xl text-foreground">
                {calc.savings > 0 ? `$${calc.savings.toLocaleString()}` : "—"}
              </div>
              <div className="font-sans text-xs text-foreground/20 mt-1">
                vs cloud
              </div>
            </div>
            <div className="bg-background p-6">
              <div className="font-sans text-xs text-foreground/30 uppercase tracking-wider mb-2">
                Payback
              </div>
              <div className="font-serif text-xl text-foreground">
                {calc.payback ? `${calc.payback} mo` : "—"}
              </div>
              <div className="font-sans text-xs text-foreground/20 mt-1">
                to break even
              </div>
            </div>
          </div>

          {/* 3-year total */}
          {calc.total > 0 && (
            <div className="mt-8 text-center">
              <div className="font-sans text-sm text-foreground/30 mb-2">
                3-year total savings
              </div>
              <div className="font-serif text-4xl md:text-5xl text-foreground tracking-tight tabular-nums">
                ${calc.total.toLocaleString()}
              </div>
            </div>
          )}

          <p className="text-center text-foreground/30 text-sm mt-8">
            No per-token fees. No usage tiers. No surprise invoices. You buy the
            hardware. The software is included.
          </p>
        </motion.div>

        {/* Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 max-w-4xl mx-auto"
        >
          {Object.entries(configs).map(([key, c]) => (
            <div key={key} className="bg-background p-8 md:p-10">
              <h3 className="font-serif text-xl text-foreground mb-1">
                {c.name}
              </h3>
              <div className="font-serif text-3xl text-foreground mb-4">
                ${c.price.toLocaleString()}
              </div>
              <p className="font-sans text-sm text-foreground/50 mb-6">
                For teams spending {c.range}/month. Up to {c.req}{" "}
                requests/month.
              </p>
              <div className="border-t border-foreground/10 pt-4 space-y-1">
                <div className="font-sans text-xs text-foreground/40">
                  {c.gpu}
                </div>
                <div className="font-sans text-xs text-foreground/40">
                  {c.ram}
                </div>
                <div className="font-sans text-xs text-foreground/40">
                  {c.storage}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--foreground);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--foreground);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
}
