"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const devlogPosts = [
  {
    id: 3,
    date: "Dec 15, 2024",
    title: "Thermal Architecture & Passive Cooling",
    category: "Engineering",
    excerpt: "We've finalized the internal heat dissipation system. By utilizing the 6061-T6 aluminum chassis as a direct-contact heatsink, we've achieved silent operation even under sustained load.",
    content: (
      <>
        <p className="mb-6">
          One of the biggest challenges in building a high-performance home server in such a small footprint (3.5" x 3.5") is heat management. Standard fans are noisy and eventually fail. Our solution was to turn the entire device into a radiator.
        </p>
        <p className="mb-6">
          The Intel N100 and N305 processors are efficient, but to maintain peak boost clocks indefinitely, we needed more than just a small fan. The internal copper heat-spreader now makes direct contact with the CNC-milled aluminum chassis via a custom vapor chamber.
        </p>
        <p>
          Testing results show a 22% improvement in thermal efficiency compared to our previous prototype, meaning Foundation remains cool to the touch and completely silent even during 4K transcoding sessions.
        </p>
      </>
    )
  },
  {
    id: 2,
    date: "Dec 02, 2024",
    title: "What is Foundation?",
    category: "Product",
    excerpt: "A deep dive into the sovereign compute module. Designed for privacy, engineered for longevity, and built to be truly yours.",
    content: (
      <>
        <p className="mb-6">
          Foundation is a home server that doesn't compromise. We got tired of the usual options: cheap plastic boxes or massive enterprise gear that sounds like a jet engine.
        </p>
        <h3 className="text-xl font-serif mb-4 mt-8">The Universal Bay System</h3>
        <p className="mb-6">
          Foundation features 6 universal bays (3 of which are high-speed) that can take whatever modules you require. Need 48TB of NVMe storage? High-speed 10GbE networking? A Zigbee antenna for home automation? Everything connects through the Mortimer backplane—a zero-cable PCIe Gen3 setup.
        </p>
        <p className="mb-6">
          Everything moves through what we're calling the Mortimer backplane—basically a zero-cable PCIe x1 Gen3 setup. No rats nest of SATA cables, no weird power splitters. Slide stuff in, it works.
        </p>
        <h3 className="text-xl font-serif mb-4 mt-8">Privacy First</h3>
        <p>
          Foundation ships with CornerstoneOS, a Matter-native environment focused on local execution. Your data never leaves the device unless you want it to. It's the ultimate hub for the private cloud.
        </p>
      </>
    )
  },
  {
    id: 1,
    date: "Nov 29, 2024",
    title: "Project Kickoff: The Foundation Concept",
    category: "Announcement",
    excerpt: "The first entry in our journey to build a better way to own your data. Documenting the process from initial sketches to shipping product.",
    content: (
      <>
        <p className="mb-6">
          Welcome to the Cornerstone devlog. This is where we'll document the journey of building the Foundation—from initial sketches to the final shipping product.
        </p>
        <p>
          We believe in building in public. That means sharing our wins, our failures, and the nitty-gritty engineering details that usually get hidden behind marketing fluff. Stay tuned for updates on thermal testing, the manufacturing process, and deep dives into the modular bay system.
        </p>
      </>
    )
  }
];

export default function DevlogPage() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navigation />
      
      <main className="pt-32 pb-48">
        <header className="container-swiss mb-32">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-8">Devlog.</h1>
          <p className="text-xl md:text-2xl font-sans text-foreground/60 max-w-2xl text-balance">
            The documentation of our progress. Engineering the future of personal compute, one entry at a time.
          </p>
        </header>

        <section className="container-swiss">
          <div className="grid grid-cols-1 divide-y divide-foreground/10">
            {devlogPosts.map((post) => (
              <article key={post.id} className="py-12 group">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="flex flex-col gap-2">
                    <time className="font-sans text-sm text-foreground/40 font-medium uppercase tracking-widest">
                      {post.date}
                    </time>
                    <span className="font-sans text-xs text-foreground/30 uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="md:col-span-3">
                    <button 
                      onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                      className="text-left w-full group"
                    >
                      <h2 className="text-2xl md:text-4xl font-serif mb-6 group-hover:text-foreground/70 transition-colors">
                        {post.title}
                      </h2>
                      {!expandedId || expandedId !== post.id ? (
                        <p className="text-lg font-sans text-foreground/60 leading-relaxed line-clamp-2 max-w-2xl">
                          {post.excerpt}
                        </p>
                      ) : null}
                    </button>

                    {expandedId === post.id && (
                      <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="max-w-2xl font-sans text-lg text-foreground/80 leading-relaxed prose prose-neutral prose-invert">
                          {post.content}
                        </div>
                        <button 
                          onClick={() => setExpandedId(null)}
                          className="mt-12 text-sm font-sans font-medium uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors"
                        >
                          Close Update
                        </button>
                      </div>
                    )}
                    
                    {expandedId !== post.id && (
                       <button 
                         onClick={() => setExpandedId(post.id)}
                         className="mt-8 text-sm font-sans font-medium uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors"
                       >
                         Read Full Entry →
                       </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="container-swiss mt-48 text-center">
            <div className="p-24 bg-muted rounded-3xl">
                <h3 className="text-3xl font-serif mb-6">Stay updated.</h3>
                <p className="text-lg font-sans text-foreground/60 mb-10 max-w-md mx-auto">
                    Receive technical updates and production milestones directly in your inbox.
                </p>
                <Link 
                  href="/preorder"
                  className="inline-block bg-foreground text-background px-10 py-4 rounded-full font-sans font-medium hover:opacity-90 transition-opacity"
                >
                  Join the Waitlist
                </Link>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
