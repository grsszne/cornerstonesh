"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

const tiers = [
  {
    name: "Observer",
    price: "$0",
    period: "/ month",
    cta: "Start free",
    primary: false,
    features: [
      "Up to 10,000 requests",
      "Traffic dashboard",
      "Cost breakdown by model",
      "Task classification",
      "7-day data retention",
    ],
  },
  {
    name: "Autopilot",
    price: "$249",
    period: "/ month",
    cta: "Start 14-day trial",
    primary: true,
    features: [
      "Unlimited requests",
      "Everything in Observer",
      "Smart routing & caching",
      "Shadow testing & experiments",
      "Weekly briefings",
      "Anomaly detection & auto-failover",
      "Multi-provider optimization",
      "90-day data retention",
    ],
  },
];

export default function CortexPricing() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <section id="pricing" className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        {/* Headline */}
        <motion.h2
          ref={headerRef}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16 md:mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring }}
        >
          Start free. Upgrade when Cortex saves you money.
        </motion.h2>

        {/* Pricing cards */}
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/[0.06] border border-foreground/[0.06] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring }}
        >
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-background p-8 md:p-10">
              <div className="font-sans text-sm text-foreground/40 uppercase tracking-wider mb-4">
                {tier.name}
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-serif text-4xl md:text-5xl text-foreground">
                  {tier.price}
                </span>
                <span className="font-sans text-sm text-foreground/25">
                  {tier.period}
                </span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="font-sans text-sm text-foreground/40 leading-relaxed"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 px-6 font-sans text-sm font-medium rounded transition-all hover:brightness-110 active:brightness-95 active:translate-y-[0.5px]"
                style={
                  tier.primary
                    ? {
                        background:
                          "linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 90%, white), var(--foreground))",
                        color: "var(--background)",
                        borderTop:
                          "1px solid color-mix(in srgb, var(--foreground) 70%, white)",
                        borderLeft:
                          "1px solid color-mix(in srgb, var(--foreground) 80%, white)",
                        borderRight:
                          "1px solid color-mix(in srgb, var(--foreground) 95%, black)",
                        borderBottom:
                          "1px solid color-mix(in srgb, var(--foreground) 85%, black)",
                        boxShadow:
                          "0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
                      }
                    : {
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                        color:
                          "color-mix(in srgb, var(--foreground) 60%, transparent)",
                        borderTop:
                          "1px solid color-mix(in srgb, var(--foreground) 18%, transparent)",
                        borderLeft:
                          "1px solid color-mix(in srgb, var(--foreground) 12%, transparent)",
                        borderRight:
                          "1px solid color-mix(in srgb, var(--foreground) 8%, transparent)",
                        borderBottom:
                          "1px solid color-mix(in srgb, var(--foreground) 6%, transparent)",
                        boxShadow:
                          "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.03)",
                      }
                }
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </motion.div>

        {/* Footer notes */}
        <motion.div
          className="text-center mt-10 space-y-3"
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-sans text-sm text-foreground/35">
            Cortex typically saves 3&ndash;5&times; its cost in the first month.
          </p>
          <p className="font-sans text-xs text-foreground/20">
            Need custom deployment, SLA, or longer retention?{" "}
            <a
              href="mailto:hello@cornerstone.sh"
              className="border-b border-foreground/10 hover:border-foreground/30 transition-colors"
            >
              Talk to us
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
