"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const devlogPosts = [
  {
    id: 2,
    date: "Dec 02, 2025",
    title: "What is Foundation?",
    category: "Product",
    excerpt: "Alright, let's talk about what we're actually building here. Foundation is a home server that doesn't suck.",
    content: (
      <>
        <p className="mb-6">
          Alright, let's talk about what we're actually building here. Foundation is a home server that doesn't suck. We got tired of the usual options: cheap plastic boxes that can barely handle basic tasks, or massive enterprise gear that sounds like a jet engine and costs more than your rent.
        </p>

        <h3 className="text-xl font-serif mb-4 mt-8">The Universal Bay Thing</h3>
        <p className="mb-6">
          Here's the core idea: 6 universal bays (with 3 highspeed) that can take whatever you throw at them. Need storage? Grab some NVMe drives (you can max out at 48TB if you're crazy). Need faster networking? Pop in a 10GbE module. WiFi 6? Sure. More USB ports? Yeah. Want to design your own custom module? Go for it. Connectors are PCIe x1 based.
        </p>
        <p className="mb-6">
          Everything connects through what we're calling the Mortimer backplane—basically a zero-cable PCIe x1 Gen3 setup. No rats nest of SATA cables, no weird power splitters, none of that nonsense. Slide stuff in, it works.
        </p>

        <h3 className="text-xl font-serif mb-4 mt-8">Why NVMe Everything?</h3>
        <p className="mb-6">
          We went all-in on NVMe. No spinning hard drives, no SATA SSDs. Just M.2 NVMe drives running at full PCIe Gen3 speed. We're talking 3,500 MB/s reads and 3,000 MB/s writes. At those speeds, your network is the bottleneck, not the drives. Using M.2 form factor SSDs are also better for future proofing. As Samsung supposedly plans to quit making SATA SSDs and Crucial quit making consumer memory and storage, NVME SSDs should remain more accesible as they still remain the standard in most desktops and laptops. Also, you can use your own drives. No need to buy drives from us if you have your own.
        </p>
        <p className="mb-6">
          Speaking of network: you get 1 Gigabit Ethernet standard (which is fine for most people), but if you're moving huge files around, throw in a 2.5, 5, or 10 Gig module. At 10GbE, you're pushing data faster than most USB drives.
        </p>

        <h3 className="text-xl font-serif mb-4 mt-8">The Chips Inside</h3>
        <p className="mb-6">
          You can pick between Intel's N100 (4 cores, 3.4GHz) or N305 (8 cores, 3.8GHz). Both come with either 8GB or 16GB of LPDDR5X memory. These aren't gimped mobile chips—the aluminum chassis is basically one giant heatsink, so they can run full speed 24/7 without thermal throttling.
        </p>
        <p className="mb-6">
          The N100 is plenty for most people. It'll handle Plex (2 simultaneous 4K transcodes), Docker containers, file serving—all while using about 8-15W. The N305 is for the power users running Kubernetes, heavy transcoding, or multiple VMs. Still only pulls around 30W max.
        </p>

        <h3 className="text-xl font-serif mb-4 mt-8">About That Aluminum Case</h3>
        <p className="mb-6">
          The chassis is CNC-milled from a solid block of 6061-T6 aluminum. Not stamped sheet metal, not plastic, not extruded—actually milled. Yeah, it's more expensive to make, but aluminum is an incredible heatsink. The whole case pulls heat away passively, so it runs cool and dead silent.
        </p>
        <p className="mb-6">
          And somehow we packed all this into a 3.5" × 3.5" footprint—about the size of a Mac Mini. This is a server you can actually put on your desk without feeling embarrassed.
        </p>

        <h3 className="text-xl font-serif mb-4 mt-8">The Software Side</h3>
        <p className="mb-6">
          Foundation runs Cornerstone OS—our own Linux distro built on solid open-source foundations. If you want hand-holding, the web UI makes everything easy. If you're comfortable in a terminal, you've got full root access. Install whatever you want, configure it however you want, we won't stop you.
        </p>
        <p className="mb-6">
          Oh, and it's Matter-native. That means your server shows up in HomeKit, Google Home, Alexa—wherever. You can see CPU temps, fan speeds, storage health, network activity, all from your phone. It's honestly pretty cool seeing your server sitting right next to your smart lights.
        </p>

        <h3 className="text-xl font-serif mb-4 mt-8">Who's This Actually For?</h3>
        <p>
          Honestly? Anyone who's looked at the home server market and felt frustrated. Creators who need fast storage for offloading footage. Developers building home labs. Privacy-minded folks who want their data off someone else's cloud. People who just want a server that doesn't look or sound terrible.
        </p>
        <p className="mt-6">
          We're not trying to be everything to everyone. We're trying to make the best modular home server for people who actually care about this stuff. That's it.
        </p>
      </>
    )
  },
  {
    id: 1,
    date: "Nov 29, 2025",
    title: "Hello, world.",
    category: "Announcement",
    excerpt: "Welcome to the Cornerstone devlog. This is where we'll document the journey of building the Foundation—from initial sketches to the final shipping product.",
    content: (
      <>
        <p className="mb-6">
          Welcome to the Cornerstone devlog. This is where we'll document the journey of building the Foundation—from initial sketches to the final shipping product.
        </p>
        <p className="mb-6">
          We believe in building in public. That means sharing our wins, our failures, and the nitty-gritty engineering details that usually get hidden behind marketing fluff.
        </p>
        <p>
          Stay tuned for updates on thermal testing, the manufacturing process of our aluminum chassis, and deep dives into the modular bay system.
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

    </div>
  );
}
