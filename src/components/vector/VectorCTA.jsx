"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function VectorCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-40 md:py-52 bg-background">
      <div className="container-swiss">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
            One box. One purchase.
            <br />
            No more per-token bills.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/preorder"
              className="bg-foreground text-background rounded-full px-8 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Reserve Your Vector
            </Link>
            <a
              href="#pricing"
              className="border border-foreground/20 text-foreground rounded-full px-8 py-3 font-sans text-sm hover:border-foreground/40 transition-colors"
            >
              Calculate Your Savings
            </a>
          </div>

          <a
            href="#"
            className="font-sans text-sm text-foreground/40 border-b border-foreground/10 pb-0.5 hover:text-foreground/60 transition-colors"
          >
            Read the Technical Docs
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-foreground/10 text-center">
          <p className="font-sans text-xs text-foreground/20 mb-4">
            Cornerstone &middot; McKinney, TX &middot; Built in a garage,
            engineered for production.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/foundation"
              className="font-sans text-xs text-foreground/30 hover:text-foreground/50 transition-colors"
            >
              Foundation
            </Link>
            <a
              href="#"
              className="font-sans text-xs text-foreground/30 hover:text-foreground/50 transition-colors"
            >
              Documentation
            </a>
            <Link
              href="/about"
              className="font-sans text-xs text-foreground/30 hover:text-foreground/50 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
