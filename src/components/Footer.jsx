"use client";

import { useState } from "react";
import Link from "next/link";
import AsciiArt from "./AsciiArt";

export default function Footer() {
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
        setMessage("Subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Error");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed");
    }
  };

  return (
    <footer className="font-mono text-sm border-t border-black dark:border-white">
      {/* Newsletter Section */}
      <div className="bg-black text-white px-4 py-8 relative overflow-hidden">
        {/* ASCII Background */}
        <div className="absolute top-0 right-0 pointer-events-none opacity-10">
          <AsciiArt width={300} height={60} numCircles={50} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-sans capitalize font-medium text-xl tracking-tight mb-1">Newsletter</h2>
              <p className="opacity-60 text-xs">Stay updated on Foundation launch and modules.</p>
            </div>
            <form className="flex gap-2" onSubmit={subscribe}>
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="bg-transparent border border-white px-4 py-2 placeholder:text-white/40 focus:outline-none focus:bg-white/10 disabled:opacity-50 min-w-[200px]"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-white uppercase text-black px-6 py-2 font-medium capitalize hover:bg-cornerstone hover:text-white transition-colors disabled:opacity-50"
              >
                {status === "success" ? "OK" : "subscribe"}
              </button>
            </form>
          </div>
          {message && (
            <p className={`mt-2 text-xs ${status === "error" ? "text-red-400" : "text-green-400"}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Resources Section - Cyan */}
      <div className="bg-cyan-500 text-black px-4 py-6 border-t border-black">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-x-8 gap-y-2">
          <span className="font-bold uppercase w-full md:w-auto">Resources:</span>
          <Link href="/foundation" className="hover:underline">Foundation</Link>
          <Link href="/foundation/modules" className="hover:underline">Modules</Link>
          <Link href="/foundation/configurator" className="hover:underline">Configurator</Link>
          <Link href="/foundation/guide" className="hover:underline">Guide</Link>
          <Link href="/devlog" className="hover:underline">Devlog</Link>
        </div>
      </div>

      {/* Social Section - Green */}
      <div className="bg-green-500 text-black px-4 py-6 border-t border-black">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-x-8 gap-y-2">
          <span className="font-bold uppercase w-full md:w-auto">Social:</span>
          <a href="https://x.com/cornerstone_sh" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
          <a href="https://www.instagram.com/cornerstone_sh/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          <a href="https://www.reddit.com/user/cornerstone_sh/" target="_blank" rel="noopener noreferrer" className="hover:underline">Reddit</a>
          <a href="mailto:cornerstone@cornerstone.sh" className="hover:underline">Email</a>
        </div>
      </div>

      {/* Legal Section - Purple */}
      <div className="bg-purple-500 text-white px-4 py-6 border-t border-black">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-x-8 gap-y-2">
          <span className="font-bold uppercase w-full md:w-auto">Legal:</span>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/sitemap" className="hover:underline">Sitemap</Link>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black text-white px-4 py-6 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-medium tracking-tight">Cornerstone</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs opacity-60">
            <span>© {new Date().getFullYear()} Cornerstone. All rights reserved.</span>
            <span className="font-mono uppercase tracking-wider">Designed for You.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
