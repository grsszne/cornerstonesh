"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Log Entry Definitions Per App ─────────────────────────────────────────────

const appDemos = [
  {
    id: "fintech",
    label: "Fintech",
    title: "FinGuard",
    subtitle: "Fraud Detection",
    logs: [
      { time: "14:32:18.243", level: "INFO", msg: "Fraud detection request received" },
      { time: "14:32:18.247", level: "PROCESSING", msg: "Loading model: fraud-classifier-v3" },
      { time: "14:32:18.891", level: "PROCESSING", msg: "Tokenizing transaction data: 247 features" },
      { time: "14:32:19.124", level: "PROCESSING", msg: "Analyzing: location, amount, merchant" },
      { time: "14:32:19.876", level: "PROCESSING", msg: "Comparing to user history (847 transactions)" },
      { time: "14:32:20.234", level: "PROCESSING", msg: "Risk factors identified: 3" },
      { time: "14:32:21.456", level: "METRIC", msg: "Classification complete: HIGH_RISK (0.87)" },
      { time: "14:32:21.458", level: "SUCCESS", msg: "Analysis delivered \u2022 3.21s total" },
    ],
    gpu: { util: 68, temp: 74, power: 267, vram: "34.2/48", model: "fraud-classifier-v3" },
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "MedView EMR",
    subtitle: "Clinical Analysis",
    logs: [
      { time: "14:33:04.112", level: "INFO", msg: "Medical analysis request received" },
      { time: "14:33:04.247", level: "PROCESSING", msg: "Loading model: clinical-llama-70b-med" },
      { time: "14:33:04.891", level: "PROCESSING", msg: "Loading patient context: 127 records, 8 years" },
      { time: "14:33:05.124", level: "PROCESSING", msg: "Extracting relevant history" },
      { time: "14:33:05.876", level: "PROCESSING", msg: "Analyzing symptom patterns" },
      { time: "14:33:06.234", level: "PROCESSING", msg: "Generating differential diagnosis" },
      { time: "14:33:07.456", level: "METRIC", msg: "Generated 412 tokens in 3.21s (128 tok/s)" },
      { time: "14:33:07.458", level: "SUCCESS", msg: "Clinical summary ready \u2022 3.35s total" },
    ],
    gpu: { util: 82, temp: 78, power: 312, vram: "41.8/48", model: "clinical-llama-70b-med" },
  },
  {
    id: "support",
    label: "Support",
    title: "SupportHub",
    subtitle: "Ticket Analysis",
    logs: [
      { time: "14:34:11.033", level: "INFO", msg: "Support ticket analysis request" },
      { time: "14:34:11.247", level: "PROCESSING", msg: "Loading model: support-assistant-v2" },
      { time: "14:34:11.891", level: "PROCESSING", msg: "Analyzing ticket context and history" },
      { time: "14:34:12.124", level: "PROCESSING", msg: "Searching knowledge base (2,847 articles)" },
      { time: "14:34:12.876", level: "PROCESSING", msg: "Found relevant solution: Article #472" },
      { time: "14:34:13.234", level: "PROCESSING", msg: "Generating personalized response" },
      { time: "14:34:14.456", level: "METRIC", msg: "Generated 156 tokens in 1.89s (83 tok/s)" },
      { time: "14:34:14.458", level: "SUCCESS", msg: "Draft response ready \u2022 3.42s total" },
    ],
    gpu: { util: 54, temp: 68, power: 234, vram: "28.6/48", model: "support-assistant-v2" },
  },
  {
    id: "commerce",
    label: "Commerce",
    title: "ShopAI Admin",
    subtitle: "Recommendations",
    logs: [
      { time: "14:35:22.187", level: "INFO", msg: "Product recommendation request" },
      { time: "14:35:22.247", level: "PROCESSING", msg: "Loading model: commerce-recommender-v3" },
      { time: "14:35:22.891", level: "PROCESSING", msg: "Analyzing customer: purchase history, browsing" },
      { time: "14:35:23.124", level: "PROCESSING", msg: "Collaborative filtering: 847 similar customers" },
      { time: "14:35:23.876", level: "PROCESSING", msg: "Content-based analysis: product features" },
      { time: "14:35:24.234", level: "PROCESSING", msg: "Generating personalized bundle" },
      { time: "14:35:25.456", level: "METRIC", msg: "Analyzed 847 products in 2.91s" },
      { time: "14:35:25.458", level: "SUCCESS", msg: "Recommendations ready \u2022 3.27s total" },
    ],
    gpu: { util: 72, temp: 72, power: 278, vram: "36.4/48", model: "commerce-recommender-v3" },
  },
];

// ─── Level Colors ──────────────────────────────────────────────────────────────

const levelColors = {
  INFO: "text-blue-400",
  PROCESSING: "text-amber-400",
  SUCCESS: "text-emerald-400",
  METRIC: "text-purple-400",
};

const levelBg = {
  INFO: "bg-blue-400/10",
  PROCESSING: "bg-amber-400/10",
  SUCCESS: "bg-emerald-400/10",
  METRIC: "bg-purple-400/10",
};

// ─── Mini SVG Icons ────────────────────────────────────────────────────────────

const Icons = {
  home: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 6l6-4.5L14 6v7.5a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" />
      <path d="M6 14.5V8h4v6.5" />
    </svg>
  ),
  chart: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="8" width="3" height="6" rx="0.5" />
      <rect x="6.5" y="4" width="3" height="10" rx="0.5" />
      <rect x="11" y="6" width="3" height="8" rx="0.5" />
    </svg>
  ),
  shield: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5l5.5 2v4.5c0 3.5-2.5 5.5-5.5 7-3-1.5-5.5-3.5-5.5-7V3.5L8 1.5z" />
    </svg>
  ),
  users: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1.5 14c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" />
      <circle cx="11.5" cy="5.5" r="1.8" />
      <path d="M11.5 9.5c1.8 0 3.2 1.1 3.2 2.8" />
    </svg>
  ),
  card: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
      <path d="M1.5 7h13" />
    </svg>
  ),
  settings: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8L3.4 3.4" />
    </svg>
  ),
  patient: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="5" r="3" />
      <path d="M2.5 14.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    </svg>
  ),
  clipboard: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="2.5" width="10" height="12" rx="1.5" />
      <path d="M6 2.5V2a2 2 0 014 0v.5" />
      <path d="M6 7h4M6 9.5h3" />
    </svg>
  ),
  pill: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5.5" y="1.5" width="5" height="13" rx="2.5" />
      <path d="M5.5 8h5" />
    </svg>
  ),
  calendar: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M2 6.5h12M5 1.5v3M11 1.5v3" />
    </svg>
  ),
  inbox: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 10l2.5-7h7L14 10v3.5a1 1 0 01-1 1H3a1 1 0 01-1-1V10z" />
      <path d="M2 10h3.5a1 1 0 011 1v.5a1 1 0 001 1h1a1 1 0 001-1V11a1 1 0 011-1H14" />
    </svg>
  ),
  tag: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1.5 8.8V2.5a1 1 0 011-1h6.3a1 1 0 01.7.3l5 5a1 1 0 010 1.4l-6.3 6.3a1 1 0 01-1.4 0l-5-5a1 1 0 01-.3-.7z" />
      <circle cx="5" cy="5" r="1" fill="currentColor" />
    </svg>
  ),
  message: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 3h11a1 1 0 011 1v7a1 1 0 01-1 1h-3l-2.5 2.5L5.5 12h-3a1 1 0 01-1-1V4a1 1 0 011-1z" />
    </svg>
  ),
  store: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 6l1-4h10l1 4" />
      <path d="M2 6v8h12V6" />
      <path d="M6 14V9h4v5" />
      <path d="M2 6c0 1.1.9 2 2 2s2-.9 2-2c0 1.1.9 2 2 2s2-.9 2-2c0 1.1.9 2 2 2s2-.9 2-2" />
    </svg>
  ),
  package: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 4.5L8 1.5l5.5 3v7L8 14.5l-5.5-3v-7z" />
      <path d="M8 8v6.5M2.5 4.5L8 8l5.5-3.5" />
    </svg>
  ),
  people: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="5.5" cy="4.5" r="2" />
      <circle cx="10.5" cy="4.5" r="2" />
      <path d="M1.5 12c0-2 1.5-3.5 4-3.5M14.5 12c0-2-1.5-3.5-4-3.5" />
    </svg>
  ),
  spark: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5v3M8 11.5v3M14.5 8h-3M4.5 8h-3M12.2 3.8l-2.1 2.1M5.9 10.1l-2.1 2.1M12.2 12.2l-2.1-2.1M5.9 5.9L3.8 3.8" />
    </svg>
  ),
};

// ─── App Content Definitions ───────────────────────────────────────────────────

function FintechApp({ phase }) {
  const transactions = [
    { id: 1, name: "Whole Foods Market", location: "Seattle, WA", amount: "-$127.43", time: "2:34 PM", status: "approved" },
    { id: 2, name: "AWS Services", location: "Online", amount: "-$1,247.00", time: "1:15 PM", status: "approved" },
    { id: 3, name: "Delta Airlines", location: "Atlanta, GA", amount: "-$489.00", time: "11:02 AM", status: "approved" },
  ];

  return (
    <div className="h-full flex bg-white text-[#1a1a1a] rounded-r-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[52px] bg-[#0f1728] flex flex-col items-center py-4 gap-1 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4">
          <span className="text-white text-[9px] font-bold tracking-tight">FG</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">{Icons.home}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white/70">{Icons.card}</div>
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">{Icons.shield}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.chart}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.users}</div>
        <div className="mt-auto w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.settings}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-gray-900">Fraud Monitor</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-gray-400 mr-2">Apr 15, 2025</div>
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-600 to-slate-800" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-px bg-gray-100 border-b border-gray-100">
          {[
            { label: "Transactions", value: "12,847", change: "+3.2%" },
            { label: "Flagged", value: "23", change: "+2" },
            { label: "Blocked", value: "7", change: null },
            { label: "Accuracy", value: "99.2%", change: null },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-3 py-2.5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">{stat.label}</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
                {stat.change && <span className="text-[9px] text-emerald-600 font-medium">{stat.change}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Transaction list */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Today&apos;s Activity</span>
              <span className="text-[10px] text-gray-400">847 transactions</span>
            </div>

            <div className="space-y-1.5">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-medium">
                      {tx.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800">{tx.name}</div>
                      <div className="text-[10px] text-gray-400">{tx.location} \u2022 {tx.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-gray-800">{tx.amount}</div>
                    <span className="text-[9px] text-emerald-600">\u2713 Approved</span>
                  </div>
                </div>
              ))}

              {/* Flagged transaction */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-orange-50 border border-orange-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-[10px] font-bold">!</div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">Electronics Hub Intl</div>
                    <div className="text-[10px] text-gray-500">Mumbai, IN \u2022 3:12 PM</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-gray-900">-$2,847.99</div>
                  <AnimatePresence mode="wait">
                    {phase < 6 ? (
                      <motion.span key="a" exit={{ opacity: 0 }} className="text-[9px] text-orange-600 font-medium flex items-center gap-1 justify-end">
                        <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
                        Analyzing
                      </motion.span>
                    ) : (
                      <motion.span key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-red-600 font-medium">
                        \u2717 Blocked
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>

          {/* AI Analysis Panel */}
          <AnimatePresence>
            {phase >= 3 && phase < 7 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mx-4 mb-3 overflow-hidden"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Risk Analysis</span>
                    {phase >= 5 && <span className="ml-auto text-[10px] font-bold text-orange-600">87% confidence</span>}
                  </div>
                  <div className="p-3 space-y-2">
                    {phase >= 4 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                        {[
                          { label: "Location anomaly", desc: "8,247 mi from home base", severity: "high" },
                          ...(phase >= 5 ? [
                            { label: "Amount deviation", desc: "4.2x above avg purchase", severity: "high" },
                            { label: "Merchant category", desc: "First interaction with vendor", severity: "medium" },
                          ] : []),
                        ].map((factor, i) => (
                          <motion.div
                            key={factor.label}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${factor.severity === "high" ? "bg-red-400" : "bg-amber-400"}`} />
                            <span className="text-[11px] font-medium text-gray-700">{factor.label}</span>
                            <span className="text-[10px] text-gray-400">{factor.desc}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success notification */}
          <AnimatePresence>
            {phase >= 7 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-4 mb-3 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-50 border border-emerald-100"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-white text-[8px]">\u2713</span>
                </div>
                <span className="text-[11px] text-emerald-800 font-medium">Transaction blocked \u2022 Customer notified via SMS</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function HealthcareApp({ phase }) {
  const summaryLines = [
    { section: "RELEVANT HISTORY", delay: 0 },
    { text: "Smoker (30 pack-years), quit 2018", delay: 0.1 },
    { text: "Hypertension (controlled, lisinopril 10mg)", delay: 0.2 },
    { text: "Father: lung cancer at age 72", delay: 0.3 },
    { section: "DIFFERENTIAL DIAGNOSIS", delay: 0.5 },
    { text: "1. Chronic bronchitis (most likely)", delay: 0.6 },
    { text: "2. Early-stage COPD", delay: 0.7 },
    { text: "3. Cardiac etiology (less likely)", delay: 0.8 },
    { section: "RECOMMENDED WORKUP", delay: 1.0 },
    { text: "Chest X-ray (PA & lateral)", delay: 1.1 },
    { text: "Pulmonary function tests (spirometry)", delay: 1.2 },
    { text: "Low-dose CT (family hx + smoking)", delay: 1.3 },
  ];

  return (
    <div className="h-full flex bg-[#f8fafb] text-[#1a1a1a] rounded-r-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[52px] bg-[#0d3b3f] flex flex-col items-center py-4 gap-1 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-300 to-teal-500 flex items-center justify-center mb-4">
          <span className="text-[#0d3b3f] text-[10px] font-bold">+</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">{Icons.patient}</div>
        <div className="w-8 h-8 rounded-lg bg-teal-400/20 flex items-center justify-center text-teal-300">{Icons.clipboard}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.pill}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.calendar}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.chart}</div>
        <div className="mt-auto w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.settings}</div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">Encounter</span>
            <span className="text-[10px] text-gray-300">/</span>
            <span className="text-[10px] text-gray-600 font-medium">New Visit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">Dr. S. Chen, MD</span>
            <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-[9px] font-bold text-teal-700">SC</div>
          </div>
        </div>

        {/* Patient header */}
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">MJ</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">Johnson, Michael</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">M, 57yo</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">DOB: 04/12/1967 \u2022 MRN: 4729103 \u2022 Blue Cross PPO</div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Vitals strip */}
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { label: "BP", value: "142/88", alert: true },
              { label: "HR", value: "78 bpm", alert: false },
              { label: "Temp", value: "98.9\u00b0F", alert: false },
              { label: "SpO2", value: "96%", alert: false },
              { label: "RR", value: "18", alert: false },
            ].map((v) => (
              <div key={v.label} className={`rounded-md p-1.5 text-center ${v.alert ? "bg-amber-50 border border-amber-200" : "bg-white border border-gray-100"}`}>
                <div className="text-[9px] text-gray-400 uppercase">{v.label}</div>
                <div className={`text-[11px] font-semibold ${v.alert ? "text-amber-700" : "text-gray-700"}`}>{v.value}</div>
              </div>
            ))}
          </div>

          {/* Chief complaint */}
          <div className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1.5">Chief Complaint</div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Persistent cough \u00d7 3 weeks, fatigue, occasional chest tightness. Non-productive. No hemoptysis. Worse with exertion.
            </p>
          </div>

          {/* Current medications mini-list */}
          <div className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Active Medications</div>
              <span className="text-[9px] text-gray-400">3 active</span>
            </div>
            <div className="space-y-1">
              {["Lisinopril 10mg daily", "Atorvastatin 20mg daily", "Aspirin 81mg daily"].map((med) => (
                <div key={med} className="text-[11px] text-gray-600 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-teal-400" />
                  {med}
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary panel */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-lg border border-teal-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 border-b border-teal-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[10px] font-semibold text-teal-800 uppercase tracking-wider">AI Clinical Analysis</span>
                    {phase >= 6 && <span className="ml-auto text-[9px] text-teal-600">412 tokens \u2022 3.21s</span>}
                  </div>
                  <div className="p-3">
                    {phase < 5 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[11px] text-gray-500">Analyzing 127 encounters, 8 years of records...</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {summaryLines.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: line.delay * 0.4 }}
                          >
                            {line.section ? (
                              <div className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mt-2 first:mt-0 mb-0.5">{line.section}</div>
                            ) : (
                              <div className="text-[11px] text-gray-600 ml-2 flex items-start gap-1.5">
                                <span className="text-gray-300 shrink-0">\u203a</span>
                                {line.text}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {phase >= 7 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2"
                      >
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <span className="text-white text-[8px]">\u2713</span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-medium">Clinical note saved to chart</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SupportApp({ phase }) {
  const responseLines = [
    "Hi Alex,",
    "",
    "I can help with the permission issue you\u2019re experiencing.",
    "",
    "This appears related to yesterday\u2019s role sync update (v2.4.1).",
    "To resolve:",
    "",
    "1. Sign out completely (all sessions)",
    "2. Clear browser cache & cookies for our domain",
    "3. Sign back in \u2014 permissions will refresh from LDAP",
    "",
    "If the issue persists, I\u2019ll escalate to Platform Engineering",
    "with your account details pre-attached.",
  ];

  const queueTickets = [
    { id: "#8470", subject: "SSO loop on mobile", priority: "high", time: "2h ago" },
    { id: "#8471", subject: "Billing invoice missing", priority: "medium", time: "1h ago" },
    { id: "#8472", subject: "Can\u2019t access dashboard", priority: "medium", time: "34m ago", active: true },
    { id: "#8473", subject: "API rate limit question", priority: "low", time: "12m ago" },
  ];

  return (
    <div className="h-full flex bg-[#fafafa] text-[#1a1a1a] rounded-r-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[52px] bg-[#1e1b4b] flex flex-col items-center py-4 gap-1 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-300 to-indigo-500 flex items-center justify-center mb-4">
          <span className="text-white text-[9px] font-bold">SH</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-400/20 flex items-center justify-center text-indigo-300">{Icons.inbox}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.message}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.people}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.tag}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.chart}</div>
        <div className="mt-auto w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.settings}</div>
      </div>

      {/* Ticket list panel */}
      <div className="w-[160px] bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-3 py-2.5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-800">Queue</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold">23</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {queueTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`px-3 py-2 border-b border-gray-50 cursor-default ${ticket.active ? "bg-indigo-50 border-l-2 border-l-indigo-400" : "hover:bg-gray-50"}`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-[9px] font-mono text-gray-400">{ticket.id}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  ticket.priority === "high" ? "bg-red-400" :
                  ticket.priority === "medium" ? "bg-amber-400" : "bg-gray-300"
                }`} />
              </div>
              <div className="text-[10px] text-gray-700 truncate leading-tight">{ticket.subject}</div>
              <div className="text-[9px] text-gray-400 mt-0.5">{ticket.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticket detail */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Ticket header */}
        <div className="px-4 py-2.5 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-gray-400">#8472</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">Medium</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">Permissions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-gray-400">SLA: 2h 14m</span>
              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-700">JD</div>
            </div>
          </div>
          <div className="text-xs font-semibold text-gray-800 mt-1.5">Can&apos;t access team dashboard</div>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Customer message */}
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600 shrink-0 mt-0.5">AR</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-medium text-gray-800">Alex Rivera</span>
                <span className="text-[9px] text-gray-400">34m ago</span>
              </div>
              <div className="bg-gray-100 rounded-lg rounded-tl-sm px-3 py-2.5 text-[11px] text-gray-700 leading-relaxed">
                I&apos;ve been trying to access our team dashboard since this morning but keep getting a &quot;Permission Denied&quot; error. My role is Team Admin and this worked fine yesterday. I&apos;ve already tried logging out and back in. Can someone help?
              </div>
              <div className="mt-1.5 flex gap-2">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">alex.rivera@company.com</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">Team Admin</span>
              </div>
            </div>
          </div>

          {/* AI Response */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-indigo-600 text-[8px]">{Icons.spark}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-medium text-indigo-700">AI Draft</span>
                    {phase < 5 && <span className="text-[9px] text-gray-400">Generating...</span>}
                    {phase >= 5 && <span className="text-[9px] text-gray-400">Ready for review</span>}
                  </div>
                  <div className="bg-indigo-50 rounded-lg rounded-tl-sm px-3 py-2.5 border border-indigo-100">
                    {phase < 5 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 border-[1.5px] border-indigo-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[11px] text-gray-500">Searching knowledge base...</span>
                      </div>
                    ) : (
                      <div className="space-y-0">
                        {responseLines.map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.04 }}
                            className={`text-[11px] leading-relaxed ${line === "" ? "h-2" : "text-gray-700"}`}
                          >
                            {line}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {phase >= 7 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 flex items-center gap-2"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-white text-[7px]">\u2713</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium">Sent to alex.rivera@company.com</span>
                      <span className="text-[9px] text-gray-400 ml-auto">Ticket \u2192 Resolved</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CommerceApp({ phase }) {
  const products = [
    { name: "Performance Running Socks", price: "$18.99", fit: 89, img: "from-rose-200 to-rose-100" },
    { name: "Dri-Fit Training Shirt", price: "$42.99", fit: 84, img: "from-sky-200 to-sky-100" },
    { name: "GPS Sports Watch", price: "$179.99", fit: 76, img: "from-amber-200 to-amber-100" },
  ];

  return (
    <div className="h-full flex bg-[#fafafa] text-[#1a1a1a] rounded-r-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[52px] bg-[#2d1b69] flex flex-col items-center py-4 gap-1 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-300 to-fuchsia-400 flex items-center justify-center mb-4">
          <span className="text-white text-[9px] font-bold">S</span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">{Icons.home}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.package}</div>
        <div className="w-8 h-8 rounded-lg bg-violet-400/20 flex items-center justify-center text-violet-300">{Icons.people}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.chart}</div>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.store}</div>
        <div className="mt-auto w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">{Icons.settings}</div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">Customers</span>
            <span className="text-[10px] text-gray-300">/</span>
            <span className="text-[10px] text-gray-600 font-medium">Sarah Morrison</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 font-medium">VIP</span>
            <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-[9px] font-bold text-violet-700">SM</div>
          </div>
        </div>

        {/* Customer profile section */}
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-300 to-fuchsia-300 flex items-center justify-center text-white text-xs font-bold">SM</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900">Sarah Morrison</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Customer since 2022 \u2022 23 orders \u2022 LTV: $2,847</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-gray-400">Last active</div>
              <div className="text-[11px] text-gray-600 font-medium">Now</div>
            </div>
          </div>
          {/* Mini stats */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[
              { label: "Orders", value: "23" },
              { label: "Avg. Order", value: "$124" },
              { label: "Returns", value: "2%" },
              { label: "NPS", value: "9/10" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[11px] font-semibold text-gray-800">{s.value}</div>
                <div className="text-[9px] text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Current session */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Live Session</span>
              <span className="flex items-center gap-1 text-[9px] text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active now
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { action: "Viewed", item: "Nike Air Zoom Pegasus 40", time: "2m ago" },
                { action: "Added to cart", item: "Nike Air Zoom Pegasus 40", time: "1m ago" },
                { action: "Viewing", item: "Women\u2019s Running Accessories", time: "Now" },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px]">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 2 ? "bg-emerald-400" : "bg-gray-200"}`} />
                  <span className="text-gray-500">{event.action}</span>
                  <span className="text-gray-800 font-medium truncate">{event.item}</span>
                  <span className="text-gray-400 ml-auto text-[9px] shrink-0">{event.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations panel */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-lg border border-violet-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-violet-50 border-b border-violet-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    <span className="text-[10px] font-semibold text-violet-800 uppercase tracking-wider">AI Bundle</span>
                    {phase >= 6 && <span className="ml-auto text-[9px] text-violet-600">87% conversion prob.</span>}
                  </div>
                  <div className="p-3">
                    {phase < 5 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[11px] text-gray-500">Analyzing 847 similar customers...</span>
                      </div>
                    ) : (
                      <>
                        <div className="text-[10px] text-gray-500 mb-2">Recommended with current cart:</div>
                        <div className="space-y-2">
                          {products.map((p, i) => (
                            <motion.div
                              key={p.name}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.12 }}
                              className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-gray-50"
                            >
                              <div className={`w-8 h-8 rounded bg-gradient-to-br ${p.img} shrink-0`} />
                              <div className="flex-1 min-w-0">
                                <div className="text-[11px] font-medium text-gray-800 truncate">{p.name}</div>
                                <div className="text-[10px] text-gray-500">{p.price}</div>
                              </div>
                              <div className="shrink-0">
                                <div className="w-8 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                  <div className="h-full rounded-full bg-violet-400" style={{ width: `${p.fit}%` }} />
                                </div>
                                <div className="text-[8px] text-violet-600 text-center mt-0.5">{p.fit}%</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] text-gray-500">Bundle value: <span className="font-semibold text-gray-800">$241.97</span></span>
                          <span className="text-[9px] text-violet-600">+34% conv. rate</span>
                        </div>
                      </>
                    )}

                    {phase >= 7 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2"
                      >
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <span className="text-white text-[7px]">\u2713</span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-medium">Recommendation email queued</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LiveWorkloads() {
  const [activeApp, setActiveApp] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const phaseTimerRef = useRef(null);
  const autoRotateRef = useRef(null);
  const logScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-200px" });

  const app = appDemos[activeApp];

  const advancePhase = useCallback(() => {
    setPhase((prev) => {
      if (prev >= 8) return prev;
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    const logCount = Math.min(phase, app.logs.length);
    setVisibleLogs(app.logs.slice(0, logCount));
  }, [phase, app.logs]);

  useEffect(() => {
    if (logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  useEffect(() => {
    if (!isInView) return;

    if (phase < 8) {
      const delays = [500, 800, 700, 900, 600, 800, 1200, 1500, 2000];
      phaseTimerRef.current = setTimeout(advancePhase, delays[phase] || 800);
    }

    return () => clearTimeout(phaseTimerRef.current);
  }, [phase, isInView, advancePhase]);

  useEffect(() => {
    if (!isInView) return;

    if (phase >= 8) {
      autoRotateRef.current = setTimeout(() => {
        switchApp((activeApp + 1) % appDemos.length);
      }, 3000);
    }

    return () => clearTimeout(autoRotateRef.current);
  }, [phase, isInView, activeApp]);

  const switchApp = useCallback((index) => {
    setIsTransitioning(true);
    clearTimeout(phaseTimerRef.current);
    clearTimeout(autoRotateRef.current);

    setTimeout(() => {
      setActiveApp(index);
      setPhase(0);
      setVisibleLogs([]);
      setIsTransitioning(false);
    }, 400);
  }, []);

  useEffect(() => {
    setPhase(0);
    setVisibleLogs([]);
  }, [activeApp]);

  const AppComponent = [FintechApp, HealthcareApp, SupportApp, CommerceApp][activeApp];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-[56px] font-serif text-[#F5F5F7] mb-4 leading-tight">
            Production AI. Running Locally.
          </h2>
          <p className="text-lg md:text-xl font-sans text-[#F5F5F7]/50 max-w-3xl mx-auto leading-relaxed mb-8">
            Watch Vector power real customer applications. Same features. Your infrastructure. Zero API costs.
          </p>

          {/* App tabs */}
          <div className="flex items-center justify-center gap-2">
            {appDemos.map((demo, i) => (
              <button
                key={demo.id}
                onClick={() => switchApp(i)}
                className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-300 ${
                  activeApp === i
                    ? "bg-[#F5F5F7] text-[#0A0A0A] font-medium scale-105"
                    : "bg-[#F5F5F7]/8 text-[#F5F5F7]/50 hover:bg-[#F5F5F7]/15 hover:text-[#F5F5F7]/70"
                }`}
              >
                {demo.label}
              </button>
            ))}
          </div>

          <p className="text-xs font-sans text-[#F5F5F7]/30 mt-4 tracking-wide">
            Live simulations \u2022 Actual response times \u2022 Real model performance
          </p>
        </motion.div>

        {/* Split Panes */}
        <motion.div
          className="relative flex flex-col lg:flex-row rounded-xl overflow-hidden border border-[#222] shadow-2xl shadow-black/50"
          style={{ minHeight: "580px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Pane — Terminal Logs */}
          <div className="w-full lg:w-[45%] flex flex-col bg-[#0F0F0F] overflow-hidden relative">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e1e1e] bg-[#0C0C0C]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-[#F5F5F7]/40 font-mono ml-2">vector-prod-01</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-[#F5F5F7]/30 font-mono">live</span>
              </div>
            </div>

            {/* System info banner */}
            <div className="px-4 py-2 border-b border-[#1a1a1a] bg-[#0d0d0d]">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-[10px]">\u26a1</span>
                <span className="text-[10px] text-[#F5F5F7]/35 font-mono">VectorOS v2.4.1 \u2022 Production \u2022 GPU 2 Active</span>
              </div>
            </div>

            {/* Log area */}
            <div ref={logScrollRef} className="flex-1 p-3 overflow-y-auto font-mono text-[12px] leading-[1.7] space-y-0.5">
              <AnimatePresence mode="sync">
                {!isTransitioning && visibleLogs.map((log, i) => (
                  <motion.div
                    key={`${activeApp}-${i}`}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-[#F5F5F7]/15 shrink-0 text-[10px] w-[85px]">[{log.time}]</span>
                    <span className={`shrink-0 text-[9px] w-[72px] px-1.5 py-0.5 rounded ${levelBg[log.level]} ${levelColors[log.level]} font-medium uppercase text-center`}>
                      {log.level}
                    </span>
                    <span className={`${log.level === "SUCCESS" ? "text-emerald-300/90" : "text-[#F5F5F7]/60"}`}>
                      {log.msg}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {!isTransitioning && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[#F5F5F7]/15 text-[10px] font-mono">$</span>
                  <span className="w-[6px] h-3.5 bg-[#F5F5F7]/30 animate-pulse" />
                </div>
              )}

              {isTransitioning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-[#F5F5F7]/20 font-mono">
                  context switch...
                </motion.div>
              )}
            </div>

            {/* GPU Status widget */}
            <div className="border-t border-[#1e1e1e] px-4 py-2.5 bg-[#0C0C0C]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-[#F5F5F7]/25 font-mono uppercase tracking-widest">GPU 2 \u2022 RTX Pro 6000</span>
                <span className={`text-[9px] font-mono ${phase >= 2 ? "text-emerald-400" : "text-[#F5F5F7]/20"}`}>
                  {phase >= 2 ? "ACTIVE" : "IDLE"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    animate={{ width: `${phase >= 2 ? app.gpu.util : 8}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-[10px] text-[#F5F5F7]/40 font-mono w-7 text-right">
                  {phase >= 2 ? app.gpu.util : 8}%
                </span>
              </div>
              <div className="flex gap-4 text-[9px] font-mono text-[#F5F5F7]/25">
                <span>{phase >= 2 ? app.gpu.temp : 38}\u00b0C</span>
                <span>{phase >= 2 ? app.gpu.power : 65}W</span>
                <span>{phase >= 2 ? app.gpu.vram : "2.1/48"}GB</span>
                <span className="ml-auto text-[#F5F5F7]/15">{phase >= 1 ? app.gpu.model : "idle"}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-[#222] relative">
            <AnimatePresence>
              {phase >= 1 && phase <= 6 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: [0, 0.5, 0], scaleY: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.3 }}
                  className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Right Pane — App Demo */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isTransitioning && (
                <motion.div
                  key={activeApp}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <AppComponent phase={phase} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer — Cost comparison */}
        <motion.div
          className="mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <p className="text-sm font-sans text-[#F5F5F7]/40">Run these workloads on your infrastructure</p>
          </div>

          <div className="border border-[#1e1e1e] rounded-xl overflow-hidden font-mono text-xs bg-[#0C0C0C]">
            <div className="grid grid-cols-3 border-b border-[#1e1e1e]">
              <div className="p-3 text-[#F5F5F7]/25 text-[10px]" />
              <div className="p-3 text-[#F5F5F7]/40 text-center text-[10px] uppercase tracking-wider">Cloud API</div>
              <div className="p-3 text-[#F5F5F7]/40 text-center text-[10px] uppercase tracking-wider">Vector</div>
            </div>
            {[
              { label: "Per Request", cloud: "$0.002", vector: "$0.000" },
              { label: "Daily (10K)", cloud: "$20.00", vector: "$0.83*" },
              { label: "Monthly", cloud: "$600", vector: "$25*" },
              { label: "Annual", cloud: "$7,200", vector: "$300*" },
            ].map((row, i) => (
              <div key={row.label} className={`grid grid-cols-3 ${i < 3 ? "border-b border-[#151515]" : ""}`}>
                <div className="p-3 text-[#F5F5F7]/35 text-[11px]">{row.label}</div>
                <div className="p-3 text-[#F5F5F7]/40 text-center text-[11px]">{row.cloud}</div>
                <div className="p-3 text-emerald-400/80 text-center text-[11px] font-medium">{row.vector}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-sans text-[#F5F5F7]/15 text-center mt-2">*Electricity cost only</p>
        </motion.div>
      </div>
    </section>
  );
}
