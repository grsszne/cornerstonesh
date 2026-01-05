"use client";

import { useState } from "react";
import Link from "next/link";
import LogoIcon from "./LogoIcon";

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
        setMessage("Subscribed");
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
    <footer className="bg-background text-foreground pt-24 pb-12 border-t border-muted">
      <div className="container-swiss">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 transition-opacity hover:opacity-70 text-foreground">
              <LogoIcon className="h-5 w-auto" />
              <span className="text-xl font-serif font-medium tracking-tight">
                Cornerstone
              </span>
            </Link>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
              Cornerstone builds integrated hardware & software systems for individuals.
            </p>
          </div>

          {/* Site Map */}
          <div>
            <h3 className="text-sm font-sans font-medium mb-6 text-foreground">Index</h3>
            <ul className="space-y-4">
              <li><Link href="/foundation" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Foundation</Link></li>
              <li><Link href="/foundation/modules" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Modules</Link></li>
              <li><Link href="/devlog" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Devlog</Link></li>
              <li><Link href="/about" className="text-sm text-foreground/60 hover:text-foreground transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-sm font-sans font-medium mb-6 text-foreground">Connect</h3>
            <ul className="space-y-4">
              <li><a href="https://instagram.com/cornerstone_sh" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="https://github.com/cornerstonesh" className="text-sm text-foreground/60 hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="https://reddit.com/u/cornerstone_sh" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Reddit</a></li>
              <li><a href="https://x.com/cornerstone_sh" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="mailto:cornerstonecomputingservices@gmail.com" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Email</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-sans font-medium mb-6 text-foreground">Updates</h3>
            <form onSubmit={subscribe} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b border-foreground/20 py-2 text-sm focus:border-foreground focus:outline-none transition-colors placeholder:text-foreground/30"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="text-sm font-medium text-left text-foreground hover:opacity-70 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? "Processing..." : status === "success" ? "Subscribed" : "Subscribe →"}
              </button>
              {message && (
                <p className={`text-xs ${status === "error" ? "text-red-600" : "text-foreground/60"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-foreground/5 text-xs text-foreground/40">
          <p>© {new Date().getFullYear()} Cornerstone Integrated.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
