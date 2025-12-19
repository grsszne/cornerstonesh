import Link from "next/link";
import AsciiArt from "@/components/AsciiArt";
import { MODULE_CATEGORIES } from "@/lib/modules";
import ModuleMasonryGrid from "@/components/ModuleMasonryGrid";

export const metadata = {
    title: "Modules - Cornerstone",
    description: "Explore the complete catalog of modules for your Foundation server.",
};

export default function ModulesPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20">
            {/* Hero Section */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10 overflow-hidden">
                {/* Background ASCII */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]">
                    <AsciiArt width={200} height={100} numCircles={60} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-orange-500"></div>
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-orange-500">Catalog</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6">
                            Module <span className="text-orange-500">Ecosystem</span>
                        </h1>
                        <p className="text-xl font-mono opacity-60 leading-relaxed max-w-2xl mb-6">
                            Expand your Foundation with our growing ecosystem of snap-in modules.
                            From high-speed storage to specialized connectivity.
                        </p>
                        <Link
                            href="/foundation/guide"
                            className="inline-flex items-center gap-2 text-sm font-mono text-orange-500 hover:opacity-70 transition-opacity"
                        >
                            <span>Need help choosing?</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Modules Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
                {Object.entries(MODULE_CATEGORIES).map(([key, category]) => (
                    <section key={key} id={key} className="scroll-mt-32">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div>
                                <h2 className="text-3xl font-medium tracking-tight mb-2">{category.label}</h2>
                                <p className="font-mono text-sm opacity-60 max-w-xl">{category.description}</p>
                            </div>
                            <div className="h-px flex-1 bg-black/10 dark:bg-white/10 ml-8 hidden md:block"></div>
                        </div>

                        <ModuleMasonryGrid modules={category.modules} />
                    </section>
                ))}
            </div>

            {/* CTA */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-950 border-t border-black/5 dark:border-white/5">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
                        Don't see what you need?
                    </h2>
                    <p className="text-xl font-mono opacity-60 max-w-2xl mx-auto">
                        The Foundation roadmap is community-driven. Vote for the next module.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            href="/devlog"
                            className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-mono font-medium hover:opacity-80 transition-opacity"
                        >
                            View Roadmap
                        </Link>
                        <Link
                            href="/foundation/guide"
                            className="px-8 py-4 bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white rounded-full font-mono font-medium hover:border-orange-500 transition-colors"
                        >
                            Hardware Guide
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
