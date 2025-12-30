"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlass, 
  LockKey, 
  Image, 
  FileText, 
  EnvelopeSimple, 
  CalendarBlank,
  MapPin,
  Clock,
  Users,
  Tag,
  HardDrive,
  CloudSlash
} from "@phosphor-icons/react";

const DETAILED_SCENARIOS = [
  {
    query: "Photos of Edgar and Emma from the beach trip",
    thinking: "Searching Photos... Analyzing faces... Cross-referencing locations...",
    results: [
      { 
        icon: Image, 
        title: "IMG_4521.HEIC", 
        tags: ["Edgar", "Beach", "Sunset"],
        metadata: [
          { icon: MapPin, value: "Santa Monica, CA" },
          { icon: Clock, value: "Jul 14, 2024 6:42 PM" },
          { icon: Users, value: "Edgar, Jake, You" },
          { icon: HardDrive, value: "4.2 MB • Local" },
        ]
      },
      { 
        icon: Image, 
        title: "Beach_Sunset_Raw.dng", 
        tags: ["Raw", "Edited"],
        metadata: [
          { icon: MapPin, value: "Santa Monica, CA" },
          { icon: Clock, value: "Jul 14, 2024 6:45 PM" },
          { icon: HardDrive, value: "28.1 MB • Local" },
        ]
      },
      { 
        icon: Image, 
        title: "Group_Selfie.jpg", 
        tags: ["Edgar", "Emma", "Group"],
        metadata: [
          { icon: Users, value: "5 people detected" },
          { icon: Clock, value: "Jul 14, 2024 4:12 PM" },
          { icon: HardDrive, value: "2.8 MB • Local" },
        ]
      },
    ]
  },
  {
    query: "Meeting notes with Zane about Q4",
    thinking: "Searching Notes... Checking Calendar... Scanning Mail...",
    results: [
      { 
        icon: FileText, 
        title: "Q4 Planning - Zane Sync.md", 
        tags: ["Q4", "Planning", "Zane"],
        metadata: [
          { icon: Clock, value: "Modified 2 days ago" },
          { icon: Tag, value: "Work • Strategy" },
          { icon: HardDrive, value: "12 KB • Local" },
        ]
      },
      { 
        icon: CalendarBlank, 
        title: "Q4 Kickoff Meeting", 
        tags: ["Zane", "Team"],
        metadata: [
          { icon: Clock, value: "Oct 1, 2024 10:00 AM" },
          { icon: Users, value: "Zane, Matthew, You" },
          { icon: MapPin, value: "Conference Room A" },
        ]
      },
      { 
        icon: EnvelopeSimple, 
        title: "Re: Q4 Budget Approval", 
        tags: ["Budget"],
        metadata: [
          { icon: Clock, value: "Sep 28, 2024" },
          { icon: Users, value: "From: Zane" },
          { icon: HardDrive, value: "2 attachments" },
        ]
      },
    ]
  },
  {
    query: "Maya's design files from last week",
    thinking: "Searching Drive... Filtering by Maya... Checking recent files...",
    results: [
      { 
        icon: FileText, 
        title: "Mobile_Redesign_v2.fig", 
        tags: ["Design", "Mobile", "Maya"],
        metadata: [
          { icon: Users, value: "Shared by Maya" },
          { icon: Clock, value: "Dec 21, 2024" },
          { icon: HardDrive, value: "45.2 MB • Local copy" },
        ]
      },
      { 
        icon: Image, 
        title: "Component_Library.png", 
        tags: ["UI", "Components"],
        metadata: [
          { icon: Users, value: "Created by Maya" },
          { icon: Clock, value: "Dec 20, 2024" },
          { icon: HardDrive, value: "3.1 MB • Local" },
        ]
      },
    ]
  },
  {
    query: "Chris infrastructure migration plan",
    thinking: "Searching Documents... Filtering by author...",
    results: [
      { 
        icon: FileText, 
        title: "AWS_Migration_Timeline.pdf", 
        tags: ["Infrastructure", "AWS"],
        metadata: [
          { icon: Users, value: "Authored by Chris" },
          { icon: Clock, value: "Dec 22, 2024" },
          { icon: HardDrive, value: "1.8 MB • Local" },
        ]
      },
      { 
        icon: EnvelopeSimple, 
        title: "Re: Migration Discussion", 
        tags: ["Infrastructure"],
        metadata: [
          { icon: Users, value: "From: Chris" },
          { icon: Clock, value: "Dec 22, 2024" },
          { icon: HardDrive, value: "Local • Starred" },
        ]
      },
    ]
  },
  {
    query: "Priya marketing campaign results",
    thinking: "Searching Drive... Checking presentations...",
    results: [
      { 
        icon: FileText, 
        title: "Q4_Campaign_Results.pptx", 
        tags: ["Marketing", "Q4", "Results"],
        metadata: [
          { icon: Users, value: "Created by Priya" },
          { icon: Clock, value: "Dec 20, 2024" },
          { icon: HardDrive, value: "8.4 MB • Local" },
        ]
      },
      { 
        icon: EnvelopeSimple, 
        title: "Campaign Performance Update", 
        tags: ["Marketing"],
        metadata: [
          { icon: Users, value: "From: Priya" },
          { icon: Clock, value: "Dec 20, 2024" },
          { icon: HardDrive, value: "Local • Important" },
        ]
      },
    ]
  },
];

export default function AiSearchDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing, thinking, results

  useEffect(() => {
    const scenario = DETAILED_SCENARIOS[scenarioIndex];
    let charIndex = 0;
    
    setPhase("typing");
    setDisplayText("");

    const typeInterval = setInterval(() => {
      setDisplayText(scenario.query.substring(0, charIndex));
      charIndex++;
      if (charIndex > scenario.query.length) {
        clearInterval(typeInterval);
        setPhase("thinking");
        
        setTimeout(() => {
          setPhase("results");
          
          setTimeout(() => {
            setScenarioIndex(i => (i + 1) % DETAILED_SCENARIOS.length);
          }, 5000);
        }, 1500);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [scenarioIndex]);

  const scenario = DETAILED_SCENARIOS[scenarioIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="bg-background border border-foreground/15 rounded-xl p-3 flex items-center gap-3 shadow-lg mb-4">
        <MagnifyingGlass className="w-5 h-5 text-foreground/50 shrink-0" />
        <div className="flex-1 overflow-hidden h-6 flex items-center">
          <div className="font-sans text-base text-foreground whitespace-nowrap border-r border-accent pr-1">
            {displayText}
          </div>
        </div>
        <div className="bg-emerald-500/10 px-2 py-1 rounded flex items-center gap-1.5 shrink-0 border border-emerald-500/20">
          <LockKey className="w-3 h-3 text-emerald-500" />
          <span className="text-[9px] font-sans uppercase tracking-wider text-emerald-600">Local AI</span>
        </div>
      </div>

      {/* Thinking State - Fixed Height Container */}
      <div className="h-8 mb-4 flex items-center">
        <AnimatePresence mode="wait">
          {phase === "thinking" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm font-sans text-foreground/50 flex items-center gap-2"
            >
              <div className="w-3 h-3 border border-accent/50 border-t-accent rounded-full animate-spin"></div>
              {scenario.thinking}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <motion.div
        className="h-[420px]"
        animate={{
          y: phase === "results" ? -48 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "results" && (
            <motion.div
              key={scenarioIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              {scenario.results.map((result, i) => (
                <motion.div
                  key={result.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background border border-foreground/10 rounded-lg p-3 shadow-sm hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-foreground/5 shrink-0">
                      <result.icon className="w-4 h-4 text-foreground/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground truncate">{result.title}</span>
                      </div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {result.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-sans uppercase tracking-wider bg-foreground/5 text-foreground/60 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Metadata Grid */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {result.metadata.map((meta, j) => (
                          <div key={j} className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                            <meta.icon className="w-3 h-3 shrink-0" />
                            <span className="truncate">{meta.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Privacy Footer */}
      <div className="mt-6 pt-4 border-t border-foreground/5 flex items-center justify-center gap-2 text-[10px] text-foreground/40">
        <CloudSlash className="w-3 h-3" />
        <span>All processing happens locally on your Foundation. Nothing leaves your device.</span>
      </div>
    </div>
  );
}
