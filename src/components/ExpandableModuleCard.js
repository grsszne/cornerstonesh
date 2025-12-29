'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getModuleColorClass, formatNetworkLabel } from '@/lib/modules';

export default function ExpandableModuleCard({ module }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className={`
                group relative bg-background
                border border-border-tech
                overflow-hidden
                ${isExpanded ? 'ring-1 ring-border-tech' : ''}
            `}
            initial={false}
            animate={
                isExpanded
                    ? {  }
                    : {  }
            }
            whileHover={
                !isExpanded
                    ? {
                          borderColor: 'var(--foreground)',
                      }
                    : {}
            }
            transition={{
                duration: 0.2,
                ease: "linear",
            }}
        >
            {/* Collapsed Card Content */}
            <div className="p-6">
                <div className={`absolute top-0 right-0 p-2 text-[10px] font-mono uppercase bg-foreground text-background opacity-0 group-hover:opacity-100 transition-opacity`}>
                   [ IDX: {module.id || '00'} ]
                </div>

                <div className="mb-8 border-l-2 border-accent pl-4">
                    <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-1">
                        {module.type}
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tighter group-hover:text-accent transition-colors">
                        {formatNetworkLabel(module.label)}
                    </h3>
                </div>

                <div className="space-y-6">
                    <p className="font-mono text-sm opacity-80 min-h-[3em] uppercase leading-relaxed">
                        {module.description || `${module.label} module for your Foundation.`}
                    </p>

                    <div className="pt-6 border-t border-border-tech flex items-center justify-between">
                        <div className="font-mono text-lg font-bold">
                            // ${module.price}
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`
                                px-4 py-2 border border-foreground font-mono text-xs uppercase tracking-wider
                                hover:bg-foreground hover:text-background
                                transition-all duration-200
                                flex items-center gap-2
                            `}
                        >
                            <span>[ SPECS ]</span>
                            <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Technical Details */}
            <div
                className={`
                    overflow-hidden transition-all duration-300 ease-linear
                    ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="px-6 pb-6 border-t border-border-tech relative bg-foreground/5">
                    {/* Technical Specs Grid */}
                    <div className="relative pt-6 space-y-6">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-border-tech"></div>
                            <div className="font-mono text-xs uppercase tracking-[0.3em] font-bold">
                                Technical Specifications
                            </div>
                            <div className="h-px flex-1 bg-border-tech"></div>
                        </div>

                        {/* Specifications Grid */}
                        <div
                            className="grid grid-cols-2 gap-4 border border-border-tech p-4 bg-background"
                        >
                            {module.specs?.map((spec, idx) => (
                                <div
                                    key={idx}
                                    className="space-y-1 font-mono"
                                >
                                    <div className="text-[10px] uppercase tracking-wider opacity-60 border-b border-border-tech pb-1">
                                        {spec.label}
                                    </div>
                                    <div className="text-sm font-bold flex items-center gap-2 mt-1">
                                        <div className={`w-1 h-1 bg-accent`}></div>
                                        {spec.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Compatibility */}
                        {module.compatibility && (
                            <div
                                className="pt-4"
                            >
                                <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-3">
                                    Compatibility
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {module.compatibility.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className={`
                                                px-2 py-1 border border-border-tech font-mono text-[10px] uppercase
                                                bg-background
                                            `}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Build CTA */}
                        <div
                            className="pt-4"
                        >
                            <Link
                                href={`/foundation?add=${module.id}&ref=builder`}
                                className={`
                                    w-full block text-center px-6 py-4 border border-foreground font-mono text-sm uppercase tracking-wider
                                    bg-foreground text-background
                                    hover:bg-accent hover:border-accent hover:text-white
                                    transition-all duration-200
                                `}
                            >
                                Add to Build &rarr; ${module.price}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
