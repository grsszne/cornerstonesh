"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ParticleText from "./ParticleText";

export default function ErrorDisplay({ code, title, description, action = { label: "Return to Base", href: "/" } }) {
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

    // Text cycling logic
    const [displayText, setDisplayText] = useState(code);
    const textOptions = ["404", "Not Found"];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % textOptions.length;
            setDisplayText(textOptions[index]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-black text-black dark:text-white overflow-hidden relative selection:bg-orange-500 selection:text-white">

            {/* Animated Technical Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)',
                            backgroundSize: '100px 100px'
                        }}
                    />
                </div>

                <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)',
                        backgroundSize: '100px 100px',
                        transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                    }}
                />

                {/* Diagonal sweep lines */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
                    style={{
                        background: `linear-gradient(45deg, transparent 48%, rgba(249, 115, 22, 0.4) 49%, rgba(249, 115, 22, 0.4) 51%, transparent 52%)`,
                        backgroundSize: '150px 150px',
                        transform: `rotate(${mousePosition.x * 0.05}deg) translateX(${mousePosition.x * 0.2}px)`
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
                <div className="space-y-8">
                    <div className="relative w-full h-[200px] md:h-[300px]">
                        <ParticleText text={displayText} />
                    </div>

                    <div className="space-y-4 relative z-20">
                        <h2 className="text-xl md:text-2xl font-mono text-orange-500">
                            {title}
                        </h2>
                        <p className="text-lg md:text-xl font-mono leading-relaxed opacity-80 max-w-lg mx-auto">
                            {description || "The file you are looking for cannot be found."}
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center gap-4 relative z-20">
                        {action.onClick ? (
                            <button
                                onClick={action.onClick}
                                className="btn-shine lift-on-hover inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-all duration-300 cursor-pointer rounded-full"
                            >
                                {action.label}
                            </button>
                        ) : (
                            <Link
                                href={action.href}
                                className="btn-shine lift-on-hover inline-flex items-center justify-center px-8 py-4 text-base font-mono font-medium uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-all duration-300 rounded-full"
                            >
                                {action.label}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
