"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import { MODULE_CATEGORIES } from "@/lib/modules";

export default function ModulesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans">
            <Navigation />
            
            <main className="pt-32 pb-48">
                {/* Hero Section */}
                <header className="container-swiss mb-32">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[1px] w-8 bg-foreground/20"></div>
                        <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
                            Ecosystem
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-8">Modules.</h1>
                    <p className="text-xl md:text-2xl font-sans text-foreground/60 max-w-2xl text-balance leading-relaxed">
                        Expand your Foundation with a growing ecosystem of snap-in modules. From high-speed storage to specialized connectivity.
                    </p>
                </header>

                {/* Categories and Modules */}
                <div className="container-swiss space-y-32">
                    {Object.entries(MODULE_CATEGORIES).map(([key, category]) => (
                        <section key={key} id={key} className="scroll-mt-32">
                            <div className="border-b border-foreground/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="max-w-xl">
                                    <h2 className="text-3xl md:text-5xl font-serif mb-4">{category.label}</h2>
                                    <p className="text-lg text-foreground/60 leading-relaxed">{category.description}</p>
                                </div>
                                <div className="text-xs font-medium uppercase tracking-widest text-foreground/30">
                                    {category.modules.length} Available
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.modules.map((module) => (
                                    <div 
                                        key={module.id}
                                        className="group p-8 border border-foreground/10 rounded-2xl bg-muted/30 hover:bg-muted transition-all duration-500 flex flex-col h-full"
                                    >
                                        <div className="mb-auto">
                                            <div className="flex justify-between items-start mb-6">
                                                <h3 className="text-2xl font-serif leading-tight group-hover:text-foreground transition-colors">
                                                    {module.label}
                                                </h3>
                                                <span className="text-sm font-medium text-foreground/40">
                                                    ${module.price}
                                                </span>
                                            </div>
                                            
                                            <p className="text-sm text-foreground/60 mb-8 leading-relaxed line-clamp-2">
                                                {module.description}
                                            </p>

                                            <div className="space-y-3">
                                                {module.specs.slice(0, 4).map((spec, i) => (
                                                    <div key={i} className="flex justify-between text-[11px] uppercase tracking-wider">
                                                        <span className="text-foreground/30">{spec.label}</span>
                                                        <span className="text-foreground/60 group-hover:text-foreground transition-colors">{spec.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="mt-12 pt-6 border-t border-foreground/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/40">
                                                Compatible with v1/v2
                                            </span>
                                            <span className="text-xs font-medium uppercase tracking-widest">
                                                Learn More →
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Footer CTA */}
                <section className="container-swiss mt-48">
                    <div className="p-24 bg-foreground text-background rounded-[3rem] text-center overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-6xl font-serif mb-8 tracking-tight">Ready to build?</h3>
                            <p className="text-xl font-sans opacity-60 mb-12 max-w-lg mx-auto leading-relaxed">
                                Use the Foundation Builder to configure your custom machine with the modules that matter to you.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link 
                                  href="/foundation#builder"
                                  className="bg-background text-foreground px-10 py-4 rounded-full font-sans font-medium hover:opacity-90 transition-opacity min-w-[200px]"
                                >
                                  Open Builder
                                </Link>
                                <Link 
                                  href="/preorder"
                                  className="text-background border-b border-background/20 py-2 hover:border-background transition-colors font-sans font-medium"
                                >
                                  Reserve Edition 01
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}
