"use client";

import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { useState } from "react";

const devlogPosts = [
  {
    id: 2,
    date: "2025-12-02",
    title: "What is Foundation?",
    type: "Product Deep Dive",
    content: (
      <>
        <p className="mb-4">
          Alright, let's talk about what we're actually building here. Foundation is a home server that doesn't suck. We got tired of the usual options: cheap plastic boxes that can barely handle basic tasks, or massive enterprise gear that sounds like a jet engine and costs more than your rent.
        </p>

        <h3 className="text-xl font-medium mb-3 mt-6">The Universal Bay Thing</h3>
        <p className="mb-4">
          Here's the core idea: 6 universal bays (with 3 highspeed) that can take whatever you throw at them. Need storage? Grab some NVMe drives (you can max out at 48TB if you're crazy). Need faster networking? Pop in a 10GbE module. WiFi 6? Sure. More USB ports? Yeah. Want to design your own custom module? Go for it. Connectors are PCIe x1 based.
        </p>
        <p className="mb-4">
          Everything connects through what we're calling the Mortimer backplane—basically a zero-cable PCIe x1 Gen3 setup. No rats nest of SATA cables, no weird power splitters, none of that nonsense. Slide stuff in, it works.
        </p>

        <h3 className="text-xl font-medium mb-3 mt-6">Why NVMe Everything?</h3>
        <p className="mb-4">
          We went all-in on NVMe. No spinning hard drives, no SATA SSDs. Just M.2 NVMe drives running at full PCIe Gen3 speed. We're talking 3,500 MB/s reads and 3,000 MB/s writes. At those speeds, your network is the bottleneck, not the drives. Using M.2 form factor SSDs are also better for future proofing. As Samsung supposedly plans to quit making SATA SSDs and Crucial quit making consumer memory and storage, NVME SSDs should remain more accesible as they still remain the standard in most desktops and laptops. Also, you can use your own drives. No need to buy drives from us if you have your own. 
        </p>
        <p className="mb-4">
          Speaking of network: you get 1 Gigabit Ethernet standard (which is fine for most people), but if you're moving huge files around, throw in a 2.5, 5, or 10 Gig module. At 10GbE, you're pushing data faster than most USB drives.
        </p>

        <h3 className="text-xl font-medium mb-3 mt-6">The Chips Inside</h3>
        <p className="mb-4">
          You can pick between Intel's N100 (4 cores, 3.4GHz) or N305 (8 cores, 3.8GHz). Both come with either 8GB or 16GB of LPDDR5X memory. These aren't gimped mobile chips—the aluminum chassis is basically one giant heatsink, so they can run full speed 24/7 without thermal throttling.
        </p>
        <p className="mb-4">
          The N100 is plenty for most people. It'll handle Plex (2 simultaneous 4K transcodes), Docker containers, file serving—all while using about 8-15W. The N305 is for the power users running Kubernetes, heavy transcoding, or multiple VMs. Still only pulls around 30W max.
        </p>

        <h3 className="text-xl font-medium mb-3 mt-6">About That Aluminum Case</h3>
        <p className="mb-4">
          The chassis is CNC-milled from a solid block of 6061-T6 aluminum. Not stamped sheet metal, not plastic, not extruded—actually milled. Yeah, it's more expensive to make, but aluminum is an incredible heatsink. The whole case pulls heat away passively, so it runs cool and dead silent.
        </p>
        <p className="mb-4">
          And somehow we packed all this into a 3.5" × 3.5" footprint—about the size of a Mac Mini. This is a server you can actually put on your desk without feeling embarrassed.
        </p>

        <h3 className="text-xl font-medium mb-3 mt-6">The Software Side</h3>
        <p className="mb-4">
          Foundation runs Cornerstone OS—our own Linux distro built on solid open-source foundations. If you want hand-holding, the web UI makes everything easy. If you're comfortable in a terminal, you've got full root access. Install whatever you want, configure it however you want, we won't stop you.
        </p>
        <p className="mb-4">
          Oh, and it's Matter-native. That means your server shows up in HomeKit, Google Home, Alexa—wherever. You can see CPU temps, fan speeds, storage health, network activity, all from your phone. It's honestly pretty cool seeing your server sitting right next to your smart lights.
        </p>

        <h3 className="text-xl font-medium mb-3 mt-6">Who's This Actually For?</h3>
        <p className="mb-4">
          Honestly? Anyone who's looked at the home server market and felt frustrated. Creators who need fast storage for offloading footage. Developers building home labs. Privacy-minded folks who want their data off someone else's cloud. People who just want a server that doesn't look or sound terrible.
        </p>
        <p className="mb-4">
          We're not trying to be everything to everyone. We're trying to make the best modular home server for people who actually care about this stuff. That's it.
        </p>

        <p className="mt-6 text-sm opacity-60">
          Want more details? Check out the <a href="/foundation" className="text-orange-500 hover:underline">full specs</a> or browse the <a href="/foundation/guide" className="text-orange-500 hover:underline">hardware guide</a> to figure out your build.
        </p>
      </>
    ),
  },
  {
    id: 1,
    date: "2025-11-29",
    title: "Hello, World.",
    type: "Announcement",
    content: (
      <>
        <p className="mb-4">
          Welcome to the Cornerstone devlog. This is where we'll document the journey of building the Foundation—from initial sketches to the final shipping product.
        </p>
        <p className="mb-4">
          We believe in building in public. That means sharing our wins, our failures, and the nitty-gritty engineering details that usually get hidden behind marketing fluff.
        </p>
        <p>
          Stay tuned for updates on thermal testing, the manufacturing process of our aluminum chassis, and deep dives into the modular bay system.
        </p>
      </>
    ),
  },
];

export default function DevlogPage() {
  const [expandedPosts, setExpandedPosts] = useState({});

  const togglePost = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <header className="mb-24">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8">
              Devlog
            </h1>
            <p className="text-xl md:text-2xl font-mono text-black/60 dark:text-white/60 leading-relaxed">
              Building your <span className="text-orange-500">Foundation</span>.
              <br />
              One commit at a time.
            </p>
          </header>
        </FadeIn>

        <div className="space-y-2">
          {devlogPosts.map((post, index) => (
            <FadeIn key={post.id} delay={index * 0.05}>
              <article className="border border-black/10 dark:border-white/10 rounded-lg overflow-hidden hover:border-orange-500/30 transition-colors duration-300">
                <button
                  onClick={() => togglePost(post.id)}
                  className="w-full px-6 py-5 flex items-center gap-6 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  <time className="font-mono text-sm text-orange-500 uppercase tracking-widest shrink-0 min-w-[110px]">
                    {post.date}
                  </time>

                  <h2 className="text-xl md:text-2xl font-medium tracking-tight flex-1 min-w-0">
                    {post.title}
                  </h2>

                  <span className="font-mono text-sm text-black/50 dark:text-white/50 uppercase tracking-wider shrink-0 min-w-[140px] text-center">
                    {post.type}
                  </span>

                  <span className="font-mono text-lg text-black/70 dark:text-white/70 shrink-0 w-8 text-center transition-transform duration-300" style={{ transform: expandedPosts[post.id] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    {expandedPosts[post.id] ? "−" : "+"}
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: expandedPosts[post.id] ? '3000px' : '0px',
                    opacity: expandedPosts[post.id] ? 1 : 0,
                  }}
                >
                  <div className="px-6 py-6 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="prose prose-lg dark:prose-invert prose-neutral text-base md:text-lg opacity-90 leading-relaxed max-w-none">
                      {post.content}
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-32 pt-16 border-t border-black/10 dark:border-white/10 text-center">
            <p className="font-mono text-sm opacity-50 mb-6">
              Want to get notified of new updates?
            </p>
            <Link
              href="/preorder"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 rounded-full"
            >
              Join the Waitlist
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
