"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import InteractiveCard from "@/components/InteractiveCard";

export default function PreorderPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("REGISTERED - CHECK_INBOX");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "ERROR");
      }
    } catch (error) {
      setStatus("error");
      setMessage("SYSTEM_FAILURE");
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-20 flex flex-col">
      <div className="flex-grow flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-2xl mx-auto w-full">

            {/* Header / Status Block */}
            <InteractiveCard className="border-2 border-black dark:border-white hover:border-orange-500/50 mb-12 group transition-all">
              <div className="grid grid-cols-2 border-b-2 border-black dark:border-white group-hover:border-orange-500/50 transition-colors">
                <div className="p-4 border-r-2 border-black dark:border-white group-hover:border-orange-500/50 font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-80 transition-all">
                  Status
                </div>
                <div className="p-4 font-mono text-xs uppercase tracking-widest text-orange-500">
                  Pre-Production
                </div>
              </div>
              <div className="p-8 md:p-12">
                <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6 group-hover:text-orange-500 transition-colors">
                  Production Status
                </h1>
                <p className="font-mono text-sm md:text-base opacity-70 group-hover:opacity-90 leading-relaxed max-w-md transition-opacity">
                  We are currently in the design stages of Foundation. Currently, pre-orders are not open to the general public.
                  In the meantime, join the waitlist or follow our <a href="/devlog" className="underline decoration-orange-500 hover:text-orange-500 decoration-2">devlog</a> for updates.
                </p>
              </div>
            </InteractiveCard>

            {/* Signup Form */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-mono text-xs uppercase tracking-widest opacity-60">
                  Waitlist Access
                </h2>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-mono text-xs uppercase tracking-widest">Open</span>
                </div>
              </div>

              <form onSubmit={subscribe} className="relative">
                <div className="flex flex-col sm:flex-row gap-0">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className="flex-grow bg-transparent border border-black dark:border-white px-6 py-4 font-mono text-sm placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white disabled:opacity-50 rounded-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="btn-shine lift-on-hover bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white px-8 py-4 font-mono text-sm font-medium uppercase tracking-wider hover:bg-orange-500 hover:border-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:border-orange-500 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed sm:border-l-0"
                  >
                    {status === "loading" ? "..." : status === "success" ? "Done" : "Notify Me"}
                  </button>
                </div>
                {message && (
                  <div className={`mt-2 font-mono text-xs uppercase tracking-widest ${status === "error" ? "text-red-500" : "text-green-500"}`}>
                    &gt; {message}
                  </div>
                )}
              </form>
              
              <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest text-center sm:text-left">
                Est. Launch: Q2 2026
              </p>
            </div>

          </div>
        </FadeIn>
      </div>
      
    </main>
  );
}
