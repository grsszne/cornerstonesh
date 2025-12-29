"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function PreorderPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navigation />
      
      <main className="pt-48 pb-64">
        <section className="container-swiss max-w-4xl">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-foreground/40 mb-8 px-4 py-1 border border-foreground/10 rounded-full">
               Reservation Open
            </span>
            <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-8">
               Reserve Foundation.
            </h1>
            <p className="text-xl md:text-2xl font-sans text-foreground/60 max-w-2xl text-balance leading-relaxed">
               Join the priority list for Edition 01. We're currently in pre-production, with manufacturing scheduled for late 2026.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {status === "success" ? (
              <div className="p-12 bg-muted rounded-3xl text-center animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-serif mb-4">You're on the list.</h3>
                <p className="text-foreground/60 font-sans leading-relaxed mb-8">
                  We'll notify you the moment Edition 01 becomes available for purchase. Check your inbox for a confirmation.
                </p>
                <Link 
                  href="/foundation"
                  className="text-sm font-sans font-medium uppercase tracking-widest border-b border-foreground/20 hover:border-foreground transition-colors"
                >
                  Return to Foundation
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="relative group">
                  <label htmlFor="email" className="block font-serif text-lg mb-4 text-foreground/80 group-focus-within:text-foreground transition-colors">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-transparent border-b-2 border-foreground/10 py-6 text-2xl font-sans focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/10"
                  />
                </div>

                <div className="flex flex-col items-center gap-8">
                    <button 
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-foreground text-background py-6 rounded-2xl font-sans font-medium text-lg hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {status === "loading" ? "Processing..." : "Reserve Edition 01"}
                    </button>
                    
                    <p className="text-xs text-foreground/40 font-sans tracking-wide">
                        No payment required now. You'll be notified when orders open.
                    </p>
                </div>
              </form>
            )}
          </div>

          {/* Logistics / Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-48 border-t border-foreground/10 pt-24">
             <div>
                <h4 className="font-serif text-xl mb-4">Edition 01</h4>
                <p className="text-sm text-foreground/60 leading-relaxed font-sans">
                  The initial production run of Foundation. Each unit is laser-etched with its unique serial number and includes an exclusive Edition 01 badge.
                </p>
             </div>
             <div>
                <h4 className="font-serif text-xl mb-4">Availability</h4>
                <p className="text-sm text-foreground/60 leading-relaxed font-sans">
                  Planned for Q4 2026. Global shipping available. Initial quantities are strictly limited to ensure manufacturing quality.
                </p>
             </div>
             <div>
                <h4 className="font-serif text-xl mb-4">Next Steps</h4>
                <p className="text-sm text-foreground/60 leading-relaxed font-sans">
                  After reserving, you'll receive monthly updates through our devlog. You can cancel your reservation at any time before production begins.
                </p>
             </div>
          </div>
        </section>
      </main>

    </div>
  );
}
