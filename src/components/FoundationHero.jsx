import Link from "next/link";
import AsciiArt from "./AsciiArt";

export default function FoundationHero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-white dark:bg-black text-black dark:text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="space-y-2">
          <h2 className="text-sm md:text-base font-mono uppercase tracking-widest mb-4">
            The Cornerstone Foundation
          </h2>
          <h1 className="text-[12vw] leading-[0.8] font-medium tracking-tighter break-words">
            Build Your
            <br />
            Server.
          </h1>
          <h1 className="text-[12vw] leading-[0.8] font-medium tracking-tighter break-words text-stroke-foreground text-transparent" style={{WebkitTextStroke: '2px rgb(249 115 22)'}}>
            Your Way.
          </h1>
        </div>

        <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="max-w-lg">
            <p className="text-lg md:text-xl font-mono leading-relaxed">
              The modular home server system built for you. Start with the essentials, then expand your storage, networking, and compute as you grow.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
            <Link
              href="#preorder"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-colors duration-300"
            >
              Pre-order Now
            </Link>
            <Link
              href="#learn-more"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* ASCII Art in top right */}
      <div className="absolute top-20 right-0 pointer-events-none ">
      </div>
      
      {/* Decorative Grid Lines - Brutalist Touch */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-px bg-black dark:bg-white"></div>
        <div className="absolute right-4 sm:right-6 lg:right-8 top-0 bottom-0 w-px bg-black dark:bg-white"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-orange-500 hidden md:block"></div>
      </div>
    </section>
  );
}
