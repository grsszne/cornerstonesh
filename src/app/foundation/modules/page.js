import Link from "next/link";
import AsciiArt from "@/components/AsciiArt";
import { MODULE_CATEGORIES, getModuleColorClass, formatNetworkLabel } from "@/lib/modules";

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
                        <p className="text-xl font-mono opacity-60 leading-relaxed max-w-2xl">
                            Expand your Foundation with our growing ecosystem of snap-in modules.
                            From high-speed storage to specialized connectivity.
                        </p>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.modules.map((module) => (
                                <div
                                    key={module.id}
                                    className="group relative bg-gray-50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5"
                                >
                                    <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${getModuleColorClass(module, 'bg')}`}></div>

                                    <div className="mb-8">
                                        <div className="font-mono text-xs uppercase tracking-widest opacity-40 mb-1">
                                            {module.type}
                                        </div>
                                        <h3 className="text-2xl font-medium tracking-tight group-hover:text-orange-500 transition-colors">
                                            {formatNetworkLabel(module.label)}
                                        </h3>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="font-mono text-sm opacity-70 min-h-[3em]">
                                            {module.description || `${module.label} module for your Foundation.`}
                                        </p>

                                        <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                                            <div className="font-mono text-lg font-medium">
                                                ${module.price}
                                            </div>
                                            <Link
                                                href="/foundation"
                                                className={`
                           px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider
                           ${getModuleColorClass(module, 'bg')}/10 
                           ${getModuleColorClass(module, 'text')}
                           hover:${getModuleColorClass(module, 'bg')}/20
                           transition-colors
                         `}
                                            >
                                                Add to Build
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/devlog"
                            className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-mono font-medium hover:opacity-80 transition-opacity"
                        >
                            View Roadmap
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
