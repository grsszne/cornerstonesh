"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FoundationHero() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-white dark:bg-black text-black dark:text-white overflow-hidden relative">
      {/* Animated Technical Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Static base grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }}
          />
        </div>

        {/* Moving grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        />

        {/* Secondary fine grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.2) 1px, transparent 1px)',
            backgroundSize: '25px 25px',
            transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`
          }}
        />

        {/* Complex circuit traces */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.08]" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Main traces */}
              <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="1" className="text-orange-500" />
              <line x1="0" y1="150" x2="200" y2="150" stroke="currentColor" strokeWidth="1" className="text-orange-500" />
              <line x1="50" y1="0" x2="50" y2="200" stroke="currentColor" strokeWidth="1" className="text-orange-500" />
              <line x1="150" y1="0" x2="150" y2="200" stroke="currentColor" strokeWidth="1" className="text-orange-500" />

              {/* Diagonal connections */}
              <line x1="50" y1="50" x2="150" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" opacity="0.5" />
              <line x1="150" y1="50" x2="50" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" opacity="0.5" />

              {/* Corner L-shapes (like circuit bends) */}
              <path d="M 50 30 L 50 50 L 70 50" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-orange-500" opacity="0.6" />
              <path d="M 150 130 L 150 150 L 130 150" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-orange-500" opacity="0.6" />

              {/* Connection nodes with rings */}
              <circle cx="50" cy="50" r="3" fill="currentColor" className="text-orange-500" />
              <circle cx="50" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" opacity="0.4" />

              <circle cx="150" cy="50" r="3" fill="currentColor" className="text-orange-500" />
              <circle cx="150" cy="50" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" opacity="0.4" />

              <circle cx="50" cy="150" r="3" fill="currentColor" className="text-orange-500" />
              <circle cx="50" cy="150" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" opacity="0.4" />

              <circle cx="150" cy="150" r="3" fill="currentColor" className="text-orange-500" />
              <circle cx="150" cy="150" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" opacity="0.4" />

              {/* Small connection points */}
              <circle cx="100" cy="50" r="1.5" fill="currentColor" className="text-orange-500" opacity="0.7" />
              <circle cx="50" cy="100" r="1.5" fill="currentColor" className="text-orange-500" opacity="0.7" />
              <circle cx="150" cy="100" r="1.5" fill="currentColor" className="text-orange-500" opacity="0.7" />
              <circle cx="100" cy="150" r="1.5" fill="currentColor" className="text-orange-500" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>

        {/* Animated data flow lines - horizontal */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20 dark:opacity-30"
          style={{
            transform: `translateY(${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse" />
        </div>

        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20 dark:opacity-30"
          style={{
            transform: `translateY(${-mousePosition.y * 0.3}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Vertical data traces */}
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-15 dark:opacity-25"
          style={{
            transform: `translateX(${mousePosition.x * 0.4}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-15 dark:opacity-25"
          style={{
            transform: `translateX(${-mousePosition.x * 0.4}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Floating connection nodes - increased count */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-orange-500 opacity-20 dark:opacity-30"
            style={{
              left: `${15 + (i * 6)}%`,
              top: `${25 + (i % 4) * 18}%`,
              transform: `translate(${Math.sin(mousePosition.x / 20 + i) * 20}px, ${Math.cos(mousePosition.y / 20 + i) * 20}px)`,
              transition: 'transform 0.5s ease-out',
              animation: `pulse 3s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}

        {/* Larger orbital nodes */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`orbital-${i}`}
            className="absolute opacity-15 dark:opacity-25"
            style={{
              left: `${25 + (i * 20)}%`,
              top: `${35 + (i % 2) * 30}%`,
              transform: `translate(${Math.cos(mousePosition.x / 15 + i * 2) * 30}px, ${Math.sin(mousePosition.y / 15 + i * 2) * 30}px)`,
              transition: 'transform 0.6s ease-out',
            }}
          >
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <div className="absolute inset-0 w-8 h-8 -translate-x-2.5 -translate-y-2.5 rounded-full border border-orange-500 opacity-30 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </div>
        ))}

        {/* Diagonal sweep lines */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            background: `linear-gradient(45deg, transparent 48%, rgba(249, 115, 22, 0.4) 49%, rgba(249, 115, 22, 0.4) 51%, transparent 52%)`,
            backgroundSize: '150px 150px',
            transform: `rotate(${mousePosition.x * 0.02}deg) translateX(${mousePosition.x * 0.2}px)`
          }}
        />

        {/* Layered tech noise */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="space-y-2">
          <h2 className="text-sm md:text-base font-mono uppercase tracking-widest mb-4">
          Cornerstone &gt; Foundation
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
              Meet <a href="/foundation" className="underline decoration-orange-500 decoration-2">Foundation</a>: the modular home server system built for you. Start with the essentials, then expand your storage, networking, and compute as you grow.
            </p>
            
            <ul className="mt-8 space-y-2 font-mono text-sm md:text-base opacity-80">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">[+]</span> Up to 64TB NVMe Storage
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">[+]</span> Up to 10G<span className="lowercase">b</span>E Networking
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">[+]</span> Intel N305 x86 Processor
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">[+]</span> PCIe Gen 3 Backplane
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-bold">[+]</span> Up to 3.5 Quadrillion Unique Configurations
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/foundation/guide"
                className="inline-flex items-center gap-2 text-sm font-mono text-orange-500 hover:opacity-70 transition-opacity"
              >
                <span>→ Hardware guide</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
            <Link
              href="/preorder"
              className="btn-shine lift-on-hover inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-all duration-300"
            >
              Pre-order Now
            </Link>
            <Link
              href="/foundation"
              className="btn-shine lift-on-hover inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
