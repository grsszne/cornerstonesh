"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SUFFIX = "-foundation.cornerstone.sh";
const VALID_RE = /^[a-z0-9][a-z0-9-]{2,61}[a-z0-9]$/;

function generateSuggestions(name) {
  const candidates = [];
  const numMatch = name.match(/^(.*?)(\d+)$/);
  if (numMatch) {
    const base = numMatch[1];
    const num = parseInt(numMatch[2], 10);
    candidates.push(`${base}${num + 1}`, `${base}${num + 2}`);
  } else {
    candidates.push(`${name}2`, `${name}3`);
  }
  candidates.push(`${name}-hq`, `${name}-home`, `my${name}`);
  return candidates.filter((s) => VALID_RE.test(s)).slice(0, 4);
}

async function checkSubdomain(subdomain) {
  const res = await fetch(`/api/tunnels?subdomain=${encodeURIComponent(subdomain)}`);
  if (!res.ok) return { available: false, reason: "error" };
  return res.json();
}

function StatusDot({ state }) {
  if (state === "idle") return null;
  if (state === "checking") {
    return (
      <span className="inline-block w-2 h-2 rounded-full bg-foreground/30 animate-pulse" />
    );
  }
  if (state === "available") {
    return <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e]" />;
  }
  return <span className="inline-block w-2 h-2 rounded-full bg-accent" />;
}

function SuggestionRow({ subdomain, onClick }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;
    checkSubdomain(subdomain).then((r) => {
      if (!cancelled) setStatus(r.available ? "available" : "taken");
    });
    return () => { cancelled = true; };
  }, [subdomain]);

  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => status === "available" && onClick(subdomain)}
      disabled={status !== "available"}
      className={`flex items-center justify-between w-full py-3 border-b border-foreground/10 text-left group transition-opacity ${
        status === "available" ? "cursor-pointer hover:opacity-70" : "cursor-default opacity-40"
      }`}
    >
      <span className="font-mono text-sm text-foreground">
        {subdomain}
        <span className="text-foreground/40">{SUFFIX}</span>
      </span>
      <span className="flex items-center gap-2 font-sans text-xs text-foreground/50 uppercase tracking-wider">
        <StatusDot state={status} />
        {status === "checking" ? "—" : status === "available" ? "Available" : "Taken"}
      </span>
    </motion.button>
  );
}

export default function CheckPage() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | checking | available | taken | invalid
  const [reason, setReason] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);

  const normalized = input.toLowerCase().replace(/\s+/g, "-");

  const runCheck = useCallback(async (value) => {
    if (!value || value.length < 4) {
      setStatus("idle");
      setSuggestions([]);
      return;
    }
    if (!VALID_RE.test(value)) {
      setStatus("invalid");
      setReason("Use 4–63 lowercase letters, numbers, or hyphens.");
      setSuggestions([]);
      return;
    }
    setStatus("checking");
    setSuggestions([]);
    const result = await checkSubdomain(value);
    if (result.available) {
      setStatus("available");
      setReason("");
      setSuggestions([]);
    } else {
      setStatus("taken");
      setReason(result.reason || "This subdomain is already registered.");
      setSuggestions(generateSuggestions(value));
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!normalized) {
      setStatus("idle");
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(() => runCheck(normalized), 480);
    return () => clearTimeout(debounceRef.current);
  }, [normalized, runCheck]);

  const handleSuggestionClick = (name) => {
    setInput(name);
  };

  const statusLabel = {
    idle: null,
    checking: { text: "Checking…", color: "text-foreground/50" },
    available: { text: "Available", color: "text-[#22c55e]" },
    taken: { text: "Taken", color: "text-accent" },
    invalid: { text: "Invalid", color: "text-foreground/50" },
  }[status];

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="container-swiss">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-6">
              Remote Access
            </p>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-foreground mb-6">
              Claim Your<br />Address
            </h1>
            <p className="font-sans text-lg text-foreground/60 leading-relaxed max-w-lg">
              Your Foundation server, accessible from anywhere.
              Choose a name and reach your data at{" "}
              <span className="font-mono text-foreground/80">
                you{SUFFIX}
              </span>
            </p>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-4"
          >
            <div className="flex items-stretch border border-foreground/20 focus-within:border-foreground transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="yourname"
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent px-5 py-4 font-mono text-lg text-foreground placeholder:text-foreground/25 outline-none min-w-0"
              />
              <span className="flex items-center px-5 font-mono text-sm text-foreground/35 border-l border-foreground/10 whitespace-nowrap bg-muted">
                {SUFFIX}
              </span>
            </div>

            {/* Status line */}
            <div className="h-7 flex items-center mt-2 px-1">
              <AnimatePresence mode="wait">
                {statusLabel && (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-center gap-2 font-sans text-sm ${statusLabel.color}`}
                  >
                    <StatusDot state={status} />
                    <span>{statusLabel.text}</span>
                    {(status === "taken" || status === "invalid") && reason && (
                      <span className="text-foreground/40">— {reason}</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Available: full URL preview + CTA */}
          <AnimatePresence>
            {status === "available" && normalized && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-6 p-6 border border-foreground/10 bg-muted"
              >
                <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-3">
                  Your URL
                </p>
                <p className="font-mono text-xl text-foreground mb-6 break-all">
                  https://{normalized}{SUFFIX}
                </p>
                <p className="font-sans text-sm text-foreground/60 mb-6 leading-relaxed">
                  Run the setup script on your Foundation server to claim this address
                  and make it live in under a minute.
                </p>
                <Link
                  href="/foundation/guide#remote-access"
                  className="inline-block bg-foreground text-background px-6 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Set Up Remote Access
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Taken: suggestions */}
          <AnimatePresence>
            {status === "taken" && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                <p className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-4">
                  Suggestions
                </p>
                <div>
                  {suggestions.map((s) => (
                    <SuggestionRow
                      key={s}
                      subdomain={s}
                      onClick={handleSuggestionClick}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}
