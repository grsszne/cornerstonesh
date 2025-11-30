import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export const metadata = {
  title: "Hardware Guide - Foundation by Cornerstone",
  description: "Understand what hardware you need for your Foundation server.",
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6">
                Choose Your <span className="text-orange-500">Hardware.</span>
              </h1>
              <p className="text-xl md:text-2xl font-mono opacity-70 leading-relaxed">
                Not sure what specs you need? We'll break it down in plain English.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Network Speed */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Network Speed
            </h2>
            <p className="text-lg font-mono opacity-60 mb-16 max-w-2xl">
              1GbE vs 2.5GbE — What's the difference?
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1GbE */}
            <FadeIn delay={0.1}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Standard</div>
                  <h3 className="text-3xl font-medium mb-2">1GbE</h3>
                  <div className="font-mono text-sm opacity-60">125 MB/s max</div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Drinking from a standard straw. It's perfectly fine for most tasks. Most home networks and devices are only able to handle 1GbE, so 1GbE is more than enough for almost all users and general storage needs.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Streaming 4K video</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> File browsing</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Web browsing</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Cloud backups</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Transfer Time Example</div>
                    <div className="text-sm font-medium">
                      100GB video file: <span className="text-orange-500">~13 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 2.5GbE */}
            <FadeIn delay={0.2}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300">
                <div className="mb-6">
                  <div className="font-mono text-xs text-orange-500 uppercase tracking-widest mb-2">Upgrade</div>
                  <h3 className="text-3xl font-medium mb-2">2.5GbE</h3>
                  <div className="font-mono text-sm opacity-60">312 MB/s max</div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">What It's Like</div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Drinking from a fire hose. 2.5x faster than standard ethernet.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase opacity-40 mb-3">Best For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Video editing workflows</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Large file transfers</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Camera footage offload</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Multi-user access</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-xs font-mono uppercase opacity-40 mb-2">Transfer Time Example</div>
                    <div className="text-sm font-medium">
                      100GB video file: <span className="text-orange-500">~5 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* RAM / Memory */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Memory (RAM)
            </h2>
            <p className="text-lg font-mono opacity-60 mb-16 max-w-2xl">
              How much do you actually need?
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 4GB */}
            <FadeIn delay={0.1}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300 font-mono">
                <div className="mb-8">
                  <div className="text-xs text-orange-500 uppercase tracking-widest mb-2">Starter</div>
                  <h3 className="text-3xl font-medium">4GB</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase opacity-40 mb-3">Perfect For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> File storage</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Media streaming</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Basic web apps</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 3-5 Docker containers</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-sm font-medium opacity-60">
                      "I just need network storage."
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 8GB */}
            <FadeIn delay={0.2}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300 font-mono">
                <div className="mb-8">
                  <div className="text-xs text-orange-500 uppercase tracking-widest mb-2">Balanced</div>
                  <h3 className="text-3xl font-medium">8GB</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase opacity-40 mb-3">Perfect For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Home Assistant</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Plex/Jellyfin</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 10-15 containers</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Photo management</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-sm font-medium opacity-60">
                      "I want to run multiple services."
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 16GB */}
            <FadeIn delay={0.3}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full hover:border-orange-500 transition-colors duration-300 font-mono">
                <div className="mb-8">
                  <div className="text-xs text-orange-500 uppercase tracking-widest mb-2">Power User</div>
                  <h3 className="text-3xl font-medium">16GB</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase opacity-40 mb-3">Perfect For</div>
                    <ul className="space-y-2 text-sm opacity-80">
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Virtual Machines</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Local LLMs</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> Kubernetes</li>
                      <li className="flex gap-2"><span className="text-orange-500">→</span> 20+ containers</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="text-sm font-medium opacity-60">
                      "I want to run everything."
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Storage */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Storage
            </h2>
            <p className="text-lg font-mono opacity-60 mb-16 max-w-2xl">
              How big is a Terabyte, really?
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 256GB */}
            <FadeIn delay={0.1}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full font-mono">
                <div className="mb-8">
                  <h3 className="text-3xl font-medium mb-2">256GB</h3>
                  <div className="text-xs uppercase opacity-40">Base Option</div>
                </div>
                
                <div className="space-y-4 text-sm opacity-80">
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">iPhone Photos</span>
                    <span className="font-medium">~64,000</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">HD Movies (2hr)</span>
                    <span className="font-medium">~64</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">Music (MP3)</span>
                    <span className="font-medium">~51,000 songs</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="opacity-60">Documents</span>
                    <span className="font-medium">~2.5 million pages</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 512GB */}
            <FadeIn delay={0.2}>
              <div className="border border-black/20 dark:border-white/20 p-8 rounded-2xl h-full font-mono">
                <div className="mb-8">
                  <h3 className="text-3xl font-medium mb-2">512GB</h3>
                  <div className="text-xs uppercase opacity-40">Mid Tier</div>
                </div>
                
                <div className="space-y-4 text-sm opacity-80">
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">iPhone Photos</span>
                    <span className="font-medium">~128,000</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">HD Movies (2hr)</span>
                    <span className="font-medium">~128</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">Music (MP3)</span>
                    <span className="font-medium">~102,000 songs</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="opacity-60">Documents</span>
                    <span className="font-medium">~5 million pages</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 1TB */}
            <FadeIn delay={0.3}>
              <div className="border border-orange-500 p-8 rounded-2xl h-full font-mono">
                <div className="mb-8">
                  <h3 className="text-3xl font-medium mb-2">1TB</h3>
                  <div className="text-xs uppercase text-orange-500">Recommended</div>
                </div>
                
                <div className="space-y-4 text-sm opacity-80">
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">iPhone Photos</span>
                    <span className="font-medium">~250,000</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">HD Movies (2hr)</span>
                    <span className="font-medium">~250</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/10 dark:border-white/10">
                    <span className="opacity-60">Music (MP3)</span>
                    <span className="font-medium">~200,000 songs</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="opacity-60">Documents</span>
                    <span className="font-medium">~10 million pages</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
              Ready to <span className="text-orange-500">Build?</span>
            </h2>
            <p className="text-lg font-mono opacity-60 mb-12 max-w-2xl mx-auto">
              Start configuring your Foundation with the specs that match your needs.
            </p>
            <Link
              href="/foundation#builder"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-colors duration-300"
            >
              Configure Your Build
            </Link>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
