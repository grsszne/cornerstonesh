"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import InteractiveCard from "@/components/InteractiveCard";
import Link from "next/link";

export default function StyleguidePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="font-mono text-xs text-cornerstone uppercase tracking-widest mb-4">
                Design System v1.0
              </div>
              <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-6">
                Style<span className="text-cornerstone">guide</span>
              </h1>
              <p className="text-xl md:text-2xl font-mono opacity-70 leading-relaxed mb-8">
                Reference for typography, colors, components, and spacing.
                Headers use <span className="text-cornerstone">tight tracking</span> and <span className="text-cornerstone">medium weight</span>.
                Body text is <span className="font-mono text-cyan-500">monospace</span> throughout.
              </p>
              <div className="flex flex-wrap gap-3">
                {["overview", "typography", "colors", "components", "spacing"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                      activeTab === tab
                        ? "bg-cornerstone text-white"
                        : "bg-transparent border border-black dark:border-white hover:border-cornerstone"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Overview */}
      {activeTab === "overview" && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <FadeIn>
              <div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-4">
                  Design Philosophy
                </h2>
                <p className="text-lg font-mono opacity-60 mb-12">
                  Brutalist aesthetics balanced with modernist grid systems.
                </p>

                {/* Core Principles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="border-l-4 border-cornerstone pl-6">
                    <h3 className="text-3xl font-medium mb-4">Brutalist Foundation</h3>
                    <p className="font-mono text-sm opacity-80 leading-relaxed mb-4">
                      Heavy borders (<code className="text-cornerstone">border-2</code>),
                      black-and-white contrast (<code className="text-cornerstone">bg-black dark:bg-white</code>),
                      and monospace fonts (<code className="text-cornerstone">font-mono</code>).
                      We don't try to soften the edges—the rawness is the point.
                    </p>
                    <ul className="space-y-2 font-mono text-xs opacity-70">
                      <li className="flex items-start gap-2">
                        <span className="text-cornerstone font-bold">[+]</span>
                        <span>Thick borders, geometric shapes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cornerstone font-bold">[+]</span>
                        <span>Monospace typography throughout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cornerstone font-bold">[+]</span>
                        <span>High contrast, no gradients</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cornerstone font-bold">[+]</span>
                        <span>Functional before pretty</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-cyan-500 pl-6">
                    <h3 className="text-3xl font-medium mb-4">Grid Structure</h3>
                    <p className="font-mono text-sm opacity-80 leading-relaxed mb-4">
                      Consistent spacing (<code className="text-cyan-500">gap-6, gap-8, gap-12</code>),
                      grid layouts (<code className="text-cyan-500">grid-cols-2, grid-cols-3</code>),
                      and type scale (<code className="text-cyan-500">tracking-tighter, tracking-tight</code>)
                      keep everything organized. The brutalism gives it character, but the grid keeps it usable.
                    </p>
                    <ul className="space-y-2 font-mono text-xs opacity-70">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500 font-bold">[+]</span>
                        <span>Grid layouts throughout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500 font-bold">[+]</span>
                        <span>8px-based spacing scale</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500 font-bold">[+]</span>
                        <span>Clear type hierarchy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500 font-bold">[+]</span>
                        <span>Readable first</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Color Philosophy */}
                <div className="border-t border-black/10 dark:border-white/10 pt-12 mb-16">
                  <h3 className="text-2xl font-medium mb-6">Color Usage</h3>
                  <p className="text-base font-mono opacity-70 leading-relaxed mb-8">
                    Each color has a job. Cornerstone for primary actions, cyan for storage,
                    green for networking, purple for compute. No decoration—just communication.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-6 bg-cornerstone/10 border-l-4 border-cornerstone">
                      <div className="font-mono text-xs uppercase tracking-widest mb-2 text-cornerstone font-bold">
                        Cornerstone
                      </div>
                      <div className="font-mono text-xs opacity-70 mb-2">
                        <code className="bg-black/5 dark:bg-white/5 px-1 py-0.5">text-cornerstone</code>
                      </div>
                      <p className="text-xs opacity-60 leading-relaxed">
                        Primary actions, brand emphasis, CTAs
                      </p>
                    </div>
                    <div className="p-6 bg-cyan-500/10 border-l-4 border-cyan-500">
                      <div className="font-mono text-xs uppercase tracking-widest mb-2 text-cyan-500 font-bold">
                        Cyan-500
                      </div>
                      <div className="font-mono text-xs opacity-70 mb-2">
                        <code className="bg-black/5 dark:bg-white/5 px-1 py-0.5">text-cyan-500</code>
                      </div>
                      <p className="text-xs opacity-60 leading-relaxed">
                        Storage, data, resources
                      </p>
                    </div>
                    <div className="p-6 bg-green-500/10 border-l-4 border-green-500">
                      <div className="font-mono text-xs uppercase tracking-widest mb-2 text-green-500 font-bold">
                        Green-500
                      </div>
                      <div className="font-mono text-xs opacity-70 mb-2">
                        <code className="bg-black/5 dark:bg-white/5 px-1 py-0.5">text-green-500</code>
                      </div>
                      <p className="text-xs opacity-60 leading-relaxed">
                        Network, automation, success
                      </p>
                    </div>
                    <div className="p-6 bg-purple-500/10 border-l-4 border-purple-500">
                      <div className="font-mono text-xs uppercase tracking-widest mb-2 text-purple-500 font-bold">
                        Purple-500
                      </div>
                      <div className="font-mono text-xs opacity-70 mb-2">
                        <code className="bg-black/5 dark:bg-white/5 px-1 py-0.5">text-purple-500</code>
                      </div>
                      <p className="text-xs opacity-60 leading-relaxed">
                        Compute, processing, media
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Approach */}
                <div className="border-t border-black/10 dark:border-white/10 pt-12">
                  <h3 className="text-2xl font-medium mb-6">Implementation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-mono text-sm uppercase tracking-wider text-green-500 mb-4">
                        Tailwind CSS v4
                      </h4>
                      <p className="text-sm font-mono opacity-70 leading-relaxed mb-4">
                        Built on Tailwind with custom CSS variables for our brand color.
                        The <code className="text-green-500 bg-green-500/10 px-1">--color-cornerstone</code> variable
                        defines our orange (#F7821B) so it works consistently across the site.
                      </p>
                      <div className="bg-gray-50 dark:bg-zinc-900 p-4 border border-black/10 dark:border-white/10 font-mono text-xs">
                        <div className="opacity-50">// globals.css</div>
                        <div><span className="text-purple-500">@theme</span> inline {"{"}</div>
                        <div className="pl-4"><span className="text-cyan-500">--color-cornerstone</span>: #F7821B;</div>
                        <div>{"}"}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-sm uppercase tracking-wider text-purple-500 mb-4">
                        Opacity Levels
                      </h4>
                      <p className="text-sm font-mono opacity-70 leading-relaxed mb-4">
                        We use opacity instead of multiple color shades. Simpler to maintain,
                        easier to apply consistently.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-cornerstone opacity-100 border border-black/20"></div>
                          <code className="text-cornerstone">opacity-100</code>
                          <span className="opacity-50">Primary emphasis</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-cornerstone opacity-80 border border-black/20"></div>
                          <code className="text-cornerstone">opacity-80</code>
                          <span className="opacity-50">Body text</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-cornerstone opacity-60 border border-black/20"></div>
                          <code className="text-cornerstone">opacity-60</code>
                          <span className="opacity-50">Labels, metadata</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-cornerstone opacity-40 border border-black/20"></div>
                          <code className="text-cornerstone">opacity-40</code>
                          <span className="opacity-50">Subtle hints</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Typography */}
      {activeTab === "typography" && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <FadeIn>
              <div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-4">
                  Typography System
                </h2>
                <p className="text-lg font-mono opacity-60 mb-12">
                  We use <span className="text-cyan-500">Overused Grotesk</span> for display text and{" "}
                  <span className="text-green-500">DM Mono</span> for technical content.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Display Headings */}
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest opacity-40 mb-6">
                      Display Headings
                    </div>
                    <div className="space-y-6 border-l-2 border-cornerstone pl-6">
                      <div>
                        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter">
                          Hero/H1
                        </h1>
                        <code className="text-xs font-mono opacity-40">
                          text-6xl md:text-8xl font-medium tracking-tighter
                        </code>
                      </div>
                      <div>
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
                          Section/H2
                        </h2>
                        <code className="text-xs font-mono opacity-40">
                          text-4xl md:text-6xl font-medium tracking-tight
                        </code>
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-4xl font-medium">Subsection/H3</h3>
                        <code className="text-xs font-mono opacity-40">
                          text-2xl md:text-4xl font-medium
                        </code>
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-medium">Component/H4</h4>
                        <code className="text-xs font-mono opacity-40">
                          text-xl md:text-2xl font-medium
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest opacity-40 mb-6">
                      Body Text
                    </div>
                    <div className="space-y-6">
                      <div>
                        <p className="text-xl md:text-2xl font-mono leading-relaxed opacity-70">
                          Large body text for introductions and emphasis. Notice the relaxed
                          line-height and 70% opacity for hierarchy.
                        </p>
                        <code className="text-xs font-mono opacity-40 mt-2 block">
                          text-xl md:text-2xl font-mono leading-relaxed opacity-70
                        </code>
                      </div>
                      <div>
                        <p className="text-base font-mono leading-relaxed opacity-80">
                          Standard body copy at base size with 80% opacity. This is your
                          workhorse paragraph style for most content blocks.
                        </p>
                        <code className="text-xs font-mono opacity-40 mt-2 block">
                          text-base font-mono leading-relaxed opacity-80
                        </code>
                      </div>
                      <div>
                        <p className="text-sm font-mono opacity-60 uppercase tracking-widest">
                          Small caps for labels and metadata
                        </p>
                        <code className="text-xs font-mono opacity-40 mt-2 block">
                          text-sm font-mono opacity-60 uppercase tracking-widest
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Font Weights */}
            <FadeIn delay={0.1}>
              <div className="border-t border-black/10 dark:border-white/10 pt-12">
                <h3 className="text-3xl font-medium tracking-tight mb-8">Font Weights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-black/10 dark:border-white/10 hover:border-cyan-500 transition-colors">
                    <div className="text-4xl font-light mb-2">Light (300)</div>
                    <p className="text-xs font-mono opacity-60">
                      Rarely used. Reserved for very large display text.
                    </p>
                  </div>
                  <div className="p-6 border border-black/10 dark:border-white/10 hover:border-green-500 transition-colors">
                    <div className="text-4xl font-medium mb-2">Medium (500)</div>
                    <p className="text-xs font-mono opacity-60">
                      Primary weight for all headings and emphasis.
                    </p>
                  </div>
                  <div className="p-6 border border-black/10 dark:border-white/10 hover:border-purple-500 transition-colors">
                    <div className="text-4xl font-bold mb-2">Bold (700)</div>
                    <p className="text-xs font-mono opacity-60">
                      Used sparingly for critical UI elements only.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Colors */}
      {activeTab === "colors" && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <FadeIn>
              <div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-4">
                  Color Palette
                </h2>
                <p className="text-lg font-mono opacity-60 mb-12">
                  <span className="text-cornerstone">Orange</span> as the primary,
                  with <span className="text-cyan-500">cyan</span>,{" "}
                  <span className="text-green-500">green</span>, and{" "}
                  <span className="text-purple-500">purple</span> for different feature types.
                </p>

                {/* Primary Brand Color */}
                <div className="mb-12">
                  <h3 className="text-2xl font-medium mb-6">Primary Brand Color</h3>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <InteractiveCard className="p-8 bg-cornerstone text-white">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-4xl font-medium mb-2">Cornerstone</div>
                          <div className="font-mono text-sm opacity-90 mb-1">#F7821B</div>
                          <div className="font-mono text-sm opacity-90">rgb(247, 130, 27)</div>
                        </div>
                        <div className="w-24 h-24 bg-white/20 rounded-lg border-2 border-white/40"></div>
                      </div>
                      <p className="font-mono text-sm opacity-90 leading-relaxed mb-6">
                        Primary brand color. Used for CTAs, buttons, and interactive elements.
                        A warm orange that's more muted than standard Tailwind orange-500.
                      </p>

                      {/* Tailwind Classes */}
                      <div className="border-t border-white/20 pt-6 mb-6">
                        <div className="font-mono text-xs uppercase tracking-wider opacity-75 mb-3">
                          Tailwind Classes
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <code className="bg-white/10 px-2 py-1 rounded block mb-1">bg-cornerstone</code>
                            <span className="opacity-75">Background</span>
                          </div>
                          <div>
                            <code className="bg-white/10 px-2 py-1 rounded block mb-1">text-cornerstone</code>
                            <span className="opacity-75">Text color</span>
                          </div>
                          <div>
                            <code className="bg-white/10 px-2 py-1 rounded block mb-1">border-cornerstone</code>
                            <span className="opacity-75">Border</span>
                          </div>
                        </div>
                      </div>

                      {/* Opacity Scale */}
                      <div className="border-t border-white/20 pt-6">
                        <div className="font-mono text-xs uppercase tracking-wider opacity-75 mb-3">
                          Opacity Scale
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          <div>
                            <div className="h-12 bg-cornerstone/20 rounded mb-2"></div>
                            <code className="text-xs opacity-75">/20</code>
                          </div>
                          <div>
                            <div className="h-12 bg-cornerstone/40 rounded mb-2"></div>
                            <code className="text-xs opacity-75">/40</code>
                          </div>
                          <div>
                            <div className="h-12 bg-cornerstone/60 rounded mb-2"></div>
                            <code className="text-xs opacity-75">/60</code>
                          </div>
                          <div>
                            <div className="h-12 bg-cornerstone/80 rounded mb-2"></div>
                            <code className="text-xs opacity-75">/80</code>
                          </div>
                          <div>
                            <div className="h-12 bg-cornerstone rounded mb-2"></div>
                            <code className="text-xs opacity-75">/100</code>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                </div>

                {/* Secondary Accents */}
                <div>
                  <h3 className="text-2xl font-medium mb-6">Secondary Accent Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Cyan */}
                    <InteractiveCard className="p-6 bg-cyan-500 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-medium mb-1">Cyan-500</div>
                          <div className="font-mono text-xs opacity-90">#06b6d4</div>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded border border-white/40"></div>
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-75 mb-3">
                        Storage • Resources
                      </div>
                      <p className="font-mono text-xs opacity-90 leading-relaxed mb-4">
                        Storage and data-related features.
                      </p>
                      <div className="border-t border-white/20 pt-4">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">bg-cyan-500</code>
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">text-cyan-500</code>
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">border-cyan-500</code>
                        </div>
                      </div>
                    </InteractiveCard>

                    {/* Green */}
                    <InteractiveCard className="p-6 bg-green-500 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-medium mb-1">Green-500</div>
                          <div className="font-mono text-xs opacity-90">#22c55e</div>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded border border-white/40"></div>
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-75 mb-3">
                        Network • Automation
                      </div>
                      <p className="font-mono text-xs opacity-90 leading-relaxed mb-4">
                        Networking and automation. Also for success states.
                      </p>
                      <div className="border-t border-white/20 pt-4">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">bg-green-500</code>
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">text-green-500</code>
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">border-green-500</code>
                        </div>
                      </div>
                    </InteractiveCard>

                    {/* Purple */}
                    <InteractiveCard className="p-6 bg-purple-500 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-medium mb-1">Purple-500</div>
                          <div className="font-mono text-xs opacity-90">#a855f7</div>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded border border-white/40"></div>
                      </div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-75 mb-3">
                        Compute • Media
                      </div>
                      <p className="font-mono text-xs opacity-90 leading-relaxed mb-4">
                        CPU and media-related features.
                      </p>
                      <div className="border-t border-white/20 pt-4">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">bg-purple-500</code>
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">text-purple-500</code>
                          <code className="bg-white/10 px-1.5 py-1 rounded text-center">border-purple-500</code>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                </div>

                {/* System Colors */}
                <div className="mt-12">
                  <h3 className="text-2xl font-medium mb-6">System Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 border-2 border-red-500 bg-red-500/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-red-500 rounded"></div>
                        <div>
                          <div className="font-medium">Red</div>
                          <div className="font-mono text-xs opacity-60">#ef4444</div>
                        </div>
                      </div>
                      <p className="font-mono text-xs opacity-70">Error states and alerts</p>
                    </div>
                    <div className="p-6 border-2 border-yellow-500 bg-yellow-500/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded"></div>
                        <div>
                          <div className="font-medium">Yellow</div>
                          <div className="font-mono text-xs opacity-60">#eab308</div>
                        </div>
                      </div>
                      <p className="font-mono text-xs opacity-70">Warning states</p>
                    </div>
                    <div className="p-6 border-2 border-gray-500 bg-gray-500/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gray-500 rounded"></div>
                        <div>
                          <div className="font-medium">Gray</div>
                          <div className="font-mono text-xs opacity-60">#6b7280</div>
                        </div>
                      </div>
                      <p className="font-mono text-xs opacity-70">Neutral elements</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Components */}
      {activeTab === "components" && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <FadeIn>
              <div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-4">
                  Components
                </h2>
                <p className="text-lg font-mono opacity-60 mb-12">
                  Buttons, cards, lists, and form elements.
                </p>

                {/* Buttons */}
                <div className="mb-16">
                  <h3 className="text-2xl font-medium mb-6">Buttons & CTAs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-4">
                        Primary Actions
                      </div>
                      <button className="w-full btn-shine lift-on-hover bg-cornerstone text-white px-8 py-4 font-mono font-medium uppercase tracking-wider hover:bg-black transition-all">
                        Cornerstone Primary
                      </button>
                      <button className="w-full bg-black text-white dark:bg-white dark:text-black px-8 py-4 font-mono font-medium uppercase tracking-wider hover:bg-cornerstone hover:text-white dark:hover:bg-cornerstone transition-all">
                        Black Primary
                      </button>
                      <code className="block text-xs font-mono opacity-40 mt-2">
                        bg-cornerstone hover:bg-black
                      </code>
                    </div>

                    <div className="space-y-4">
                      <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-4">
                        Secondary Actions
                      </div>
                      <button className="w-full border-2 border-black dark:border-white px-8 py-4 font-mono font-medium uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                        Outlined
                      </button>
                      <button className="w-full border border-cyan-500 text-cyan-500 px-8 py-4 font-mono font-medium uppercase tracking-wider hover:bg-cyan-500 hover:text-white transition-all">
                        Cyan Accent
                      </button>
                      <code className="block text-xs font-mono opacity-40 mt-2">
                        border-2 border-black hover:bg-black hover:text-white
                      </code>
                    </div>
                  </div>
                </div>

                {/* Cards */}
                <div className="mb-16">
                  <h3 className="text-2xl font-medium mb-6">Cards & Containers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InteractiveCard className="p-6 border border-black/20 dark:border-white/20 hover:border-cornerstone transition-colors">
                      <div className="font-mono text-xs text-cornerstone uppercase tracking-widest mb-2">
                        Standard
                      </div>
                      <h4 className="text-xl font-medium mb-3">Default Card</h4>
                      <p className="text-sm font-mono opacity-60 leading-relaxed">
                        Basic container with subtle border. Hover reveals cornerstone accent.
                      </p>
                    </InteractiveCard>

                    <div className="p-6 bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5">
                      <div className="font-mono text-xs text-cyan-500 uppercase tracking-widest mb-2">
                        Elevated
                      </div>
                      <h4 className="text-xl font-medium mb-3">Surface Card</h4>
                      <p className="text-sm font-mono opacity-60 leading-relaxed">
                        Elevated surface for content hierarchy. Uses gray-50/zinc-900.
                      </p>
                    </div>

                    <div className="p-6 bg-cornerstone/5 border border-cornerstone/20">
                      <div className="font-mono text-xs text-cornerstone uppercase tracking-widest mb-2">
                        Accent
                      </div>
                      <h4 className="text-xl font-medium mb-3">Tinted Card</h4>
                      <p className="text-sm font-mono opacity-60 leading-relaxed">
                        Subtle brand tint at 5% opacity with matching border.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lists */}
                <div className="mb-16">
                  <h3 className="text-2xl font-medium mb-6">Lists & Bullets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-4">
                        Feature Lists
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <span className="text-cornerstone font-bold">[+]</span>
                          <span className="font-mono text-sm">Bracket-style bullets</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-cyan-500 font-bold">→</span>
                          <span className="font-mono text-sm">Arrow-style indicators</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                          <span className="font-mono text-sm">Dot-style minimal</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-4">
                        Spec Lists
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
                          <span className="opacity-60">Processor</span>
                          <span className="font-mono">Intel N305</span>
                        </div>
                        <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
                          <span className="opacity-60">Memory</span>
                          <span className="font-mono">16GB LPDDR5X</span>
                        </div>
                        <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
                          <span className="opacity-60">Storage</span>
                          <span className="font-mono">Up to 64TB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Elements */}
                <div>
                  <h3 className="text-2xl font-medium mb-6">Form Elements</h3>
                  <div className="max-w-2xl space-y-4">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider opacity-60 mb-2">
                        Text Input
                      </label>
                      <input
                        type="text"
                        placeholder="Enter text..."
                        className="w-full bg-transparent border border-black dark:border-white px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cornerstone"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider opacity-60 mb-2">
                        Email Input
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-transparent border border-black dark:border-white px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Spacing */}
      {activeTab === "spacing" && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <FadeIn>
              <div>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-4">
                  Spacing & Layout
                </h2>
                <p className="text-lg font-mono opacity-60 mb-12">
                  Using Tailwind's spacing scale, mostly multiples of 4 and 8.
                </p>

                {/* Spacing Scale */}
                <div className="mb-16">
                  <h3 className="text-2xl font-medium mb-6">Spacing Scale</h3>
                  <div className="space-y-4">
                    {[
                      { size: "2", px: "8px", usage: "Tight internal spacing" },
                      { size: "4", px: "16px", usage: "Component padding" },
                      { size: "6", px: "24px", usage: "Card padding, gaps" },
                      { size: "8", px: "32px", usage: "Section spacing" },
                      { size: "12", px: "48px", usage: "Component margins" },
                      { size: "16", px: "64px", usage: "Section padding" },
                      { size: "24", px: "96px", usage: "Large section gaps" },
                    ].map((space) => (
                      <div
                        key={space.size}
                        className="flex items-center gap-6 border-b border-black/10 dark:border-white/10 pb-4"
                      >
                        <div className="w-24 flex items-center">
                          <div
                            className="h-8 bg-cornerstone"
                            style={{ width: space.px }}
                          ></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-mono text-sm font-medium">
                            {space.size} ({space.px})
                          </div>
                          <div className="font-mono text-xs opacity-60">{space.usage}</div>
                        </div>
                        <code className="font-mono text-xs opacity-40">
                          p-{space.size} / m-{space.size} / gap-{space.size}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid Examples */}
                <div className="mb-16">
                  <h3 className="text-2xl font-medium mb-6">Grid Layouts</h3>
                  <div className="space-y-8">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-4">
                        2-Column Grid (gap-6)
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="h-24 bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-mono text-sm">
                          Col 1
                        </div>
                        <div className="h-24 bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-mono text-sm">
                          Col 2
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-4">
                        3-Column Grid (gap-8)
                      </div>
                      <div className="grid grid-cols-3 gap-8">
                        <div className="h-24 bg-green-500/20 border border-green-500/40 flex items-center justify-center font-mono text-sm">
                          Col 1
                        </div>
                        <div className="h-24 bg-green-500/20 border border-green-500/40 flex items-center justify-center font-mono text-sm">
                          Col 2
                        </div>
                        <div className="h-24 bg-green-500/20 border border-green-500/40 flex items-center justify-center font-mono text-sm">
                          Col 3
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-4">
                        Asymmetric Grid (gap-6)
                      </div>
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-8 h-24 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center font-mono text-sm">
                          8 Columns
                        </div>
                        <div className="col-span-4 h-24 bg-purple-500/20 border border-purple-500/40 flex items-center justify-center font-mono text-sm">
                          4 Columns
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Border Styles */}
                <div>
                  <h3 className="text-2xl font-medium mb-6">Border Treatments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 border border-black/10 dark:border-white/10">
                      <div className="font-mono text-xs mb-2">Subtle (10% opacity)</div>
                      <code className="text-xs opacity-40">border-black/10</code>
                    </div>
                    <div className="p-6 border border-black/20 dark:border-white/20">
                      <div className="font-mono text-xs mb-2">Default (20% opacity)</div>
                      <code className="text-xs opacity-40">border-black/20</code>
                    </div>
                    <div className="p-6 border-2 border-cornerstone">
                      <div className="font-mono text-xs mb-2">Accent (2px)</div>
                      <code className="text-xs opacity-40">border-2 border-cornerstone</code>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </main>
  );
}
