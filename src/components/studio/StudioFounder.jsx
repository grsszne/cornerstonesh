"use client";

import Image from "next/image";

export default function StudioFounder() {
  return (
    <section className="py-24 md:py-32 container-swiss border-t border-foreground/5">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative aspect-[4/5] bg-muted rounded-2xl overflow-hidden">
                {/* Placeholder for Founder/Team Image */}
                <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-serif italic text-xl">
                    Team Photo
                </div>
            </div>
            <div className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-serif mb-8">Built by people who felt this pain</h2>
                <div className="text-xl text-foreground/80 leading-relaxed space-y-6 font-sans">
                    <p>
                        We started Cornerstone because personal computing shouldn't mean renting from big companies. Foundation proves individuals want integrated, local-first systems.
                    </p>
                    <p>
                        Enterprises need this even more. We're seventeen, building hardware in Texas, and shipping real products. Studio is the natural evolution.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
}
