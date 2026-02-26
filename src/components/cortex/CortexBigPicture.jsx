"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const spring = { type: "spring", stiffness: 80, damping: 20, mass: 1 };

const nodes = [
  {
    name: "Foundation",
    tagline: "Personal AI\nat home.",
    href: "/foundation",
    active: false,
  },
  {
    name: "Cortex",
    tagline: "Managed AI\noperations.",
    href: "/cortex",
    active: true,
  },
  {
    name: "Vector",
    tagline: "Owned compute\non-premise.",
    href: "/vector",
    active: false,
  },
];

export default function CortexBigPicture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32 md:py-40 bg-background">
      <div className="container-swiss">
        <div className="max-w-3xl mx-auto" ref={ref}>
          {/* Product family — horizontal on desktop, vertical on mobile */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {nodes.map((node, i) => (
              <div key={node.name} className="flex flex-col md:flex-row items-center">
                {/* Connecting line before (not first) */}
                {i > 0 && (
                  <motion.div
                    className="hidden md:block w-12 lg:w-20 h-px bg-foreground/[0.08]"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                  />
                )}
                {i > 0 && (
                  <motion.div
                    className="md:hidden h-8 w-px bg-foreground/[0.08]"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                  />
                )}

                {/* Node */}
                <motion.div
                  className="text-center py-4 md:py-0 group"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.2 }}
                >
                  <Link href={node.href}>
                    <div
                      className={`font-serif text-xl md:text-2xl mb-2 transition-colors ${
                        node.active
                          ? "text-foreground"
                          : "text-foreground/30 group-hover:text-foreground/50"
                      }`}
                    >
                      {node.name}
                    </div>
                    <div
                      className={`font-sans text-xs leading-relaxed whitespace-pre-line transition-colors ${
                        node.active
                          ? "text-foreground/40"
                          : "text-foreground/20 group-hover:text-foreground/30"
                      }`}
                    >
                      {node.tagline}
                    </div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Description */}
          <motion.p
            className="font-sans text-sm text-foreground/30 text-center max-w-lg mx-auto leading-relaxed mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Cortex manages your AI in the cloud today.
            When your workload justifies running locally,
            Cortex will tell you &mdash; with the data to prove it.
            That&apos;s Vector. Same intelligence. Your hardware.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
