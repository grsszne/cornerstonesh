"use client";

import { useState } from "react";
import Link from "next/link";
import AsciiArt from "./AsciiArt";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
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
        setMessage("Thanks for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white border-t border-black dark:border-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Mailing List Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight font-medium">
              Stay in the Loop
            </h3>
            <p className="font-mono text-sm max-w-md">
              Join the newsletter for updates on the Foundation launch and future modules.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={subscribe}>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="ENTER EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-transparent border border-black dark:border-white px-4 py-3 font-mono text-sm placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white rounded-none disabled:opacity-50"
                />
                {message && (
                  <p className={`mt-2 font-mono text-xs ${status === "error" ? "text-red-500" : "text-green-500"}`}>
                    {message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 font-mono text-sm font-medium uppercase tracking-wider border border-black dark:border-white hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-orange-500 dark:hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-[46px]"
              >
                {status === "loading" ? "..." : status === "success" ? "Joined" : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Links Section */}
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              <div>
                <h4 className="text-sm font-bold uppercase mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  Socials
                </h4>
                <ul className="space-y-3 font-mono text-sm">
                  <li>
                    <a href="#" className="hover:opacity-70 transition-opacity">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:opacity-70 transition-opacity">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:opacity-70 transition-opacity">
                      Reddit
                    </a>
                  </li>
                  <li>
                    <a href="mailto:cornerstone@cornerstone.sh" className="hover:opacity-70 transition-opacity">
                      cornerstone@cornerstone.sh
                    </a>
                  </li>

                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase mb-4 underline decoration-2 decoration-orange-500 underline-offset-4">
                  Legal
                </h4>
                <ul className="space-y-3 font-mono text-sm">
                  <li>
                    <Link href="/privacy" className="hover:opacity-70 transition-opacity">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:opacity-70 transition-opacity">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>


        <div className="mt-12 pt-8 border-t border-black dark:border-white flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs uppercase">
            &copy; {new Date().getFullYear()} Cornerstone. All rights reserved.
          </p>
          <p className="font-mono text-xs">
            <Link href="/" className="hover:opacity-70 transition-opacity">
              https://cornerstone.sh
            </Link>
          </p>
          <p className="font-mono text-xs uppercase">
            Designed for You.
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 pointer-events-none">
        <AsciiArt width={300} height={40} numCircles={65}/>
      </div>
    </footer>
  );
}
