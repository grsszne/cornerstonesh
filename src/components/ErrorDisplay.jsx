"use client";

import Link from "next/link";

export default function ErrorDisplay({ code, title, description, action = { label: "Return Home", href: "/" } }) {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-8 bg-background text-foreground">
            <div className="max-w-2xl mx-auto w-full text-center">
                {/* Error Code */}
                <h1 className="font-serif text-[120px] sm:text-[180px] md:text-[220px] leading-none text-foreground/10 select-none">
                    {code}
                </h1>

                {/* Title */}
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground -mt-8 sm:-mt-12 md:-mt-16 mb-6">
                    {title}
                </h2>

                {/* Description */}
                <p className="font-sans text-base sm:text-lg text-foreground/60 max-w-md mx-auto mb-12 leading-relaxed">
                    {description || "The page you're looking for doesn't exist or has been moved."}
                </p>

                {/* Action Button */}
                <div className="flex justify-center">
                    {action.onClick ? (
                        <button
                            onClick={action.onClick}
                            className="font-sans text-sm border-b border-foreground text-foreground pb-1 hover:opacity-50 transition-opacity"
                        >
                            {action.label}
                        </button>
                    ) : (
                        <Link
                            href={action.href}
                            className="font-sans text-sm border-b border-foreground text-foreground pb-1 hover:opacity-50 transition-opacity"
                        >
                            {action.label}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
