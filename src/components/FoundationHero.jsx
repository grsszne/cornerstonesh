"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, Image, FileText, EnvelopeSimple, CalendarBlank, LockKey } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScribbleUnderline from "./ScribbleUnderline";
import ScribbleCircle from "./ScribbleCircle";

export default function FoundationHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-12">
      
      {/* --- Typography Grid --- */}
      <div className="container-swiss relative z-20 grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center pointer-events-none">
          <div className="md:col-span-6 md:col-start-1 text-left pointer-events-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8"
              >
                  Modular hardware.<br/>
                  <span className="text-foreground/60">Integrated software.</span><br/>
                  <span className="text-foreground/30">
                    <ScribbleCircle delay={1.5} color="rgba(255,255,255,0.5)">Completely</ScribbleCircle><br/>
                    <ScribbleCircle delay={1.7} color="rgba(255,255,255,0.5)">yours.</ScribbleCircle>
                  </span>
              </motion.h1>

              <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1 }}
                 className="font-sans text-lg text-foreground/60 max-w-md mb-8"
              >
                  Premium personal server combined with a local software suite that evolves with you.
              </motion.p>
              
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.2 }}
              >
                  <Link href="/foundation" className="bg-foreground text-background px-8 py-4 font-sans font-medium text-sm hover:opacity-90 transition-opacity inline-block">
                      Learn More
                  </Link>
              </motion.div>
          </div>
      </div>

      {/* --- 2.5D Exploded Assembly Animation --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 md:left-[25%] top-48 opacity-40 md:opacity-100">
          <motion.div 
            initial={{ rotateX: 60, rotateZ: 45, scale: 1.0 }}
            animate={{ rotateX: 60, rotateZ: 45, scale: 1.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-[350px] h-[350px] perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
          >
              {/* Layer 1: Base Chassis */}
              <motion.div
                initial={{ z: 0 }}
                animate={{ z: 0 }}
                className="absolute inset-0 border-4 border-foreground bg-background shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                  {/* Clean, no extra schematic lines */}
                 <span className="absolute -left-32 top-0 text-xs font-sans text-foreground/70 text-right w-24">01. Aluminum Unibody</span>
              </motion.div>

              {/* Layer 2: Mainboard + Networking */}
              <motion.div
                initial={{ z: 0 }}
                animate={{ z: 60 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="absolute inset-4 border-2 border-foreground bg-background"
                style={{ transformStyle: "preserve-3d" }}
              >
                  {/* Subtle Tech Pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--foreground)_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
                  <span className="absolute -right-40 top-10 text-xs font-sans text-foreground/70 text-left w-32">02. Intel Core i3 N305</span>
              </motion.div>

              {/* Layer 3: Universal Bays (Cycling Configurations) - Now the TOP visible layer */}
              <ModuleCycler />

              {/* Layer 4 (Top Shield) REMOVED - Bays are now the top visible layer */}

          </motion.div>
      </div>

      {/* --- AI SEARCH SIMULATION --- */}
      {/* Styled as a monitor/display with perspective */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 1.0, ease: "easeOut" }}
        className="absolute bottom-16 right-16 w-[340px] z-20 hidden md:block"
        style={{ 
          perspective: "1000px",
          transformStyle: "preserve-3d"
        }}
      >
          {/* Monitor Frame */}
          <div 
            className="bg-foreground/5 border-2 border-foreground/20 rounded-lg p-1 shadow-2xl"
            style={{ 
              transform: "rotateY(-8deg) rotateX(4deg)",
              transformStyle: "preserve-3d"
            }}
          >
              {/* Screen Bezel */}
              <div className="bg-background border border-foreground/10 rounded overflow-hidden">
                  {/* Screen Glare Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10 rounded"></div>
                  <AiSearchSimulation />
              </div>
              {/* Monitor Stand Hint */}
              <div className="h-1 bg-foreground/10 mx-auto w-16 mt-1 rounded-full"></div>
          </div>
      </motion.div>

      {/* --- Background Schematic Lines --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" style={{ zIndex: 0 }}>
         <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
         </defs>
         <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
    </section>
  );
}

// Cycling module configurations to showcase modularity
const MODULE_CONFIGS = [
  { name: "Media Server", modules: [
    { label: "8TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "8TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "2.5GbE", color: "bg-emerald-500/15", border: "border-emerald-500/50" },
    { label: "USB-C", color: "bg-blue-500/15", border: "border-blue-500/50" },
    { label: "Empty", color: "bg-foreground/5", border: "border-foreground/10" },
    { label: "Empty", color: "bg-foreground/5", border: "border-foreground/10" },
  ]},
  { name: "AI Workstation", modules: [
    { label: "10GbE", color: "bg-emerald-500/15", border: "border-emerald-500/50" },
    { label: "4TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "4TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "GPIO", color: "bg-pink-500/15", border: "border-pink-500/50" },
    { label: "UPS", color: "bg-purple-500/15", border: "border-purple-500/50" },
    { label: "Fan", color: "bg-gray-500/15", border: "border-gray-500/50" },
  ]},
  { name: "NAS Build", modules: [
    { label: "4TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "4TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "4TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "4TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "10GbE", color: "bg-emerald-500/15", border: "border-emerald-500/50" },
    { label: "UPS", color: "bg-purple-500/15", border: "border-purple-500/50" },
  ]},
  { name: "Dev Station", modules: [
    { label: "2TB NVMe", color: "bg-orange-500/15", border: "border-orange-500/50" },
    { label: "2.5GbE", color: "bg-emerald-500/15", border: "border-emerald-500/50" },
    { label: "Dual SD", color: "bg-yellow-500/15", border: "border-yellow-500/50" },
    { label: "USB-A", color: "bg-blue-500/15", border: "border-blue-500/50" },
    { label: "GPIO", color: "bg-pink-500/15", border: "border-pink-500/50" },
    { label: "Ambient", color: "bg-cyan-500/15", border: "border-cyan-500/50" },
  ]},
];

function ModuleCycler() {
  const [configIndex, setConfigIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfigIndex(i => (i + 1) % MODULE_CONFIGS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const config = MODULE_CONFIGS[configIndex];

  return (
    <motion.div
      initial={{ z: 0 }}
      animate={{ z: 120 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      className="absolute inset-8 border-2 border-foreground bg-background"
      style={{ transformStyle: "preserve-3d" }}
    >
        <div className="grid grid-cols-2 grid-rows-3 gap-1.5 p-2.5 h-full">
            <AnimatePresence mode="wait">
                {config.modules.map((mod, i) => (
                    <motion.div 
                      key={`${configIndex}-${i}`}
                      initial={{ opacity: 0, y: -15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.9 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={`border ${mod.border} ${mod.color} flex items-center justify-center relative`}
                    >
                        <span className="text-[8px] font-sans font-medium uppercase tracking-wide opacity-80">{mod.label}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
         <span className="absolute -left-32 bottom-0 text-xs font-sans text-foreground/70 text-right w-24">03. Universal Bays</span>
    </motion.div>
  );
}

function AiSearchSimulation() {
  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const SCENARIOS = [
    {
      query: "Photos from Jake's birthday",
      results: [
        { type: "image", icon: Image, title: "Jake_Birthday_Cake.jpg", meta: "Photos • Dec 2024" },
        { type: "image", icon: Image, title: "Group_Photo_Party.jpg", meta: "Photos • Dec 2024" },
        { type: "file", icon: FileText, title: "Party Guest List", meta: "Notes • Dec 10" },
      ]
    },
    {
      query: "Email thread with Emma",
      results: [
        { type: "mail", icon: EnvelopeSimple, title: "Re: Project Update", meta: "Mail • Today" },
        { type: "mail", icon: EnvelopeSimple, title: "Fwd: Design Assets", meta: "Mail • Yesterday" },
        { type: "file", icon: FileText, title: "Emma_Feedback.docx", meta: "Drive • Shared" },
      ]
    },
    {
      query: "Meeting with Zane next week",
      results: [
        { type: "event", icon: CalendarBlank, title: "Sync with Zane", meta: "Calendar • Wed 2pm" },
        { type: "mail", icon: EnvelopeSimple, title: "Re: Agenda Items", meta: "Mail • 2 days ago" },
        { type: "file", icon: FileText, title: "Zane_Deck_v2.key", meta: "Drive • Shared" },
      ]
    },
    {
      query: "Files Matthew shared",
      results: [
        { type: "file", icon: FileText, title: "Q4_Budget_Draft.xlsx", meta: "Drive • Shared by Matthew" },
        { type: "file", icon: FileText, title: "Team_Roadmap.pdf", meta: "Drive • Shared by Matthew" },
      ]
    },
    {
      query: "Recipe Fatima sent me",
      results: [
        { type: "mail", icon: EnvelopeSimple, title: "Best Hummus Recipe!", meta: "Mail • Last week" },
        { type: "file", icon: FileText, title: "Fatima's Recipes", meta: "Bookmarks • Saved" },
        { type: "image", icon: Image, title: "Hummus_Attempt.jpg", meta: "Photos • Saturday" },
      ]
    },
    {
      query: "Paul's contact info",
      results: [
        { type: "file", icon: FileText, title: "Paul Henderson", meta: "Contacts • Work" },
        { type: "mail", icon: EnvelopeSimple, title: "Intro: Paul / You", meta: "Mail • Nov 15" },
      ]
    },
    {
      query: "Edgar's presentation notes",
      results: [
        { type: "file", icon: FileText, title: "Edgar_Pitch_Notes.md", meta: "Notes • Yesterday" },
        { type: "file", icon: FileText, title: "Pitch_Deck_Final.key", meta: "Drive • Edgar" },
        { type: "event", icon: CalendarBlank, title: "Pitch Practice", meta: "Calendar • Thu" },
      ]
    },
    {
      query: "Maya's design files",
      results: [
        { type: "file", icon: FileText, title: "Mobile_Redesign_v2.fig", meta: "Drive • Shared by Maya" },
        { type: "mail", icon: EnvelopeSimple, title: "Design Handoff", meta: "Mail • Dec 21" },
        { type: "image", icon: Image, title: "Component_Library.png", meta: "Photos • Maya" },
      ]
    },
    {
      query: "Chris infrastructure docs",
      results: [
        { type: "file", icon: FileText, title: "AWS_Migration_Plan.pdf", meta: "Drive • Chris" },
        { type: "mail", icon: EnvelopeSimple, title: "Re: Migration Timeline", meta: "Mail • Dec 22" },
      ]
    },
    {
      query: "Priya's marketing report",
      results: [
        { type: "file", icon: FileText, title: "Q4_Campaign_Results.pptx", meta: "Drive • Priya" },
        { type: "mail", icon: EnvelopeSimple, title: "Campaign Performance", meta: "Mail • Dec 20" },
      ]
    },
    {
      query: "Alex code review",
      results: [
        { type: "file", icon: FileText, title: "Auth_Module_PR.md", meta: "Notes • Alex" },
        { type: "mail", icon: EnvelopeSimple, title: "Code Review Request", meta: "Mail • Dec 23" },
      ]
    },
    {
      query: "Zara customer feedback",
      results: [
        { type: "file", icon: FileText, title: "Customer_Feedback_Dec.xlsx", meta: "Drive • Zara" },
        { type: "mail", icon: EnvelopeSimple, title: "Feedback Summary", meta: "Mail • Dec 19" },
      ]
    },
  ];

  useEffect(() => {
    let currentScenario = SCENARIOS[step % SCENARIOS.length];
    let charIndex = 0;
    
    // Type out query
    const typeInterval = setInterval(() => {
        setDisplayText(currentScenario.query.substring(0, charIndex));
        charIndex++;
        if (charIndex > currentScenario.query.length) {
            clearInterval(typeInterval);
            // Wait then switch
            setTimeout(() => {
                setDisplayText("");
                setStep(s => s + 1);
            }, 4000);
        }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [step]);

  const currentScenario = SCENARIOS[step % SCENARIOS.length];
  const showResults = displayText === currentScenario.query;

  return (
      <div className="w-full h-full flex flex-col justify-end">
          {/* Search Bar Input - Compact */}
          <div className="bg-background border border-foreground/15 rounded-xl p-2.5 flex items-center gap-2 shadow-xl mb-3">
               <MagnifyingGlass className="w-4 h-4 text-foreground/60 shrink-0" />
               
               {/* Growing Text Container */}
               <div className="flex-1 overflow-hidden h-5 flex items-center justify-end">
                   <div className="font-sans text-sm text-foreground whitespace-nowrap border-r border-accent pr-1 leading-none">
                       {displayText}
                   </div>
               </div>
               
               {/* Privacy Badge - Small */}
               <div className="bg-foreground/5 px-2 py-1 rounded-md flex items-center gap-1.5 shrink-0">
                   <LockKey className="w-3 h-3 text-emerald-500" />
                   <span className="text-[8px] font-sans uppercase tracking-wider opacity-70">Local AI</span>
               </div>
          </div>

          {/* Results Grid - Compact */}
          <div className="h-40 relative">
            <AnimatePresence mode="wait">
                {showResults && (
                    <motion.div 
                        key={step}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 gap-2"
                    >
                        {currentScenario.results.map((result, i) => (
                            <motion.div
                                key={result.title}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-background border border-foreground/10 p-2.5 rounded-lg flex items-center gap-3 shadow-md"
                            >
                                <div className="p-1.5 rounded-md bg-foreground/5">
                                    <result.icon className="w-4 h-4 text-foreground/70" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate text-foreground">{result.title}</div>
                                    <div className="text-[10px] text-foreground/50">{result.meta}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
      </div>
  );
}
