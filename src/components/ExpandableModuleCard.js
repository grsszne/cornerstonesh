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
                group relative bg-gray-50 dark:bg-zinc-900/50
                border border-black/5 dark:border-white/5
                rounded-2xl overflow-hidden
                ${isExpanded ? 'shadow-2xl shadow-orange-500/10' : ''}
            `}
            initial={false}
            animate={
                isExpanded
                    ? { scale: 1.02, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.1)' }
                    : { scale: 1, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' }
            }
            whileHover={
                !isExpanded
                    ? {
                          y: -8,
                          borderColor: 'rgba(249, 115, 22, 0.5)',
                          boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.05), 0 10px 10px -5px rgba(249, 115, 22, 0.04)',
                      }
                    : {}
            }
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }}
        >
            {/* Collapsed Card Content */}
            <div className="p-6">
                <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${getModuleColorClass(module, 'bg')} transition-all duration-300 ${isExpanded ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></div>

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
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`
                                px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider
                                ${getModuleColorClass(module, 'bg')}/10
                                ${getModuleColorClass(module, 'text')}
                                hover:${getModuleColorClass(module, 'bg')}/20
                                transition-all duration-300
                                flex items-center gap-2
                            `}
                        >
                            <span>Specs</span>
                            <svg
                                className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Technical Details */}
            <div
                className={`
                    overflow-hidden transition-all duration-700 ease-in-out
                    ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="px-6 pb-6 border-t border-black/5 dark:border-white/5 relative">
                    {/* Blueprint Grid Background */}
                    <div
                        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, currentColor 1px, transparent 1px),
                                linear-gradient(to bottom, currentColor 1px, transparent 1px)
                            `,
                            backgroundSize: '16px 16px'
                        }}
                    ></div>

                    {/* Technical Specs Grid */}
                    <div className="relative pt-6 space-y-6">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                            <div className={`h-px flex-1 ${getModuleColorClass(module, 'bg')}/30`}></div>
                            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-40">
                                Technical Specifications
                            </div>
                            <div className={`h-px flex-1 ${getModuleColorClass(module, 'bg')}/30`}></div>
                        </div>

                        {/* Specifications Grid */}
                        <div
                            className="grid grid-cols-2 gap-4"
                            style={{
                                animation: isExpanded ? 'fadeInUp 0.6s ease-out 0.1s backwards' : 'none'
                            }}
                        >
                            {module.specs?.map((spec, idx) => (
                                <div
                                    key={idx}
                                    className="space-y-1 font-mono"
                                    style={{
                                        animation: isExpanded ? `fadeInUp 0.5s ease-out ${0.15 + idx * 0.05}s backwards` : 'none'
                                    }}
                                >
                                    <div className="text-xs uppercase tracking-wider opacity-40">
                                        {spec.label}
                                    </div>
                                    <div className="text-sm font-medium flex items-center gap-2">
                                        <div className={`w-1 h-1 rounded-full ${getModuleColorClass(module, 'bg')}`}></div>
                                        {spec.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Compatibility */}
                        {module.compatibility && (
                            <div
                                className="pt-4 border-t border-black/5 dark:border-white/5"
                                style={{
                                    animation: isExpanded ? 'fadeInUp 0.6s ease-out 0.3s backwards' : 'none'
                                }}
                            >
                                <div className="font-mono text-xs uppercase tracking-wider opacity-40 mb-3">
                                    Compatibility
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {module.compatibility.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className={`
                                                px-3 py-1 rounded-full font-mono text-xs
                                                ${getModuleColorClass(module, 'bg')}/10
                                                ${getModuleColorClass(module, 'text')}
                                                border border-current/20
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
                            style={{
                                animation: isExpanded ? 'fadeInUp 0.6s ease-out 0.4s backwards' : 'none'
                            }}
                        >
                            <Link
                                href={`/foundation?add=${module.id}&ref=builder`}
                                className={`
                                    w-full block text-center px-6 py-3 rounded-xl font-mono text-sm uppercase tracking-wider
                                    ${getModuleColorClass(module, 'bg')}
                                    text-white
                                    hover:opacity-90
                                    transition-all duration-300
                                    shadow-lg shadow-current/20
                                `}
                            >
                                Add to Build → ${module.price}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </motion.div>
    );
}
