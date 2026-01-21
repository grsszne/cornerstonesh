"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import {
    MagnifyingGlass,
    EnvelopeSimple,
    FileText,
    CalendarBlank,
    Image as ImageIcon,
    Hash,
    Sparkle,
    ArrowRight,
    CheckCircle,
    Paperclip,
    WifiHigh,
    DeviceTabletSpeaker
} from "@phosphor-icons/react";

// --- Configuration ---

const GRAPH_WIDTH = 600;
const GRAPH_HEIGHT = 450;
const NODE_COUNT = 15; // Background nodes

const SCENARIOS = [
    {
        query: "/s:e from:Matthew \"project alpha\"",
        chips: [
            { type: "search", label: "search", icon: MagnifyingGlass },
            { type: "filter", label: "emails", icon: EnvelopeSimple },
            { type: "user", label: "from Matthew", icon: ArrowRight },
            { type: "semantic", label: "semantically", icon: Sparkle },
            { type: "text", label: "for \"project alpha\"" }
        ],
        topic: "Project Alpha",
        results: [
            {
                title: "Re: Project Alpha Kickoff",
                sender: "Matthew Aito",
                preview: "I've attached the initial timeline for Alpha. Let's review...",
                type: "email",
                date: "2 days ago"
            },
            {
                title: "Alpha_Timeline_v1.pdf",
                sender: "Matthew Aito",
                preview: "Attached file",
                type: "file",
                date: "2 days ago"
            }
        ],
        relatedNodes: [
            { id: "s1-n1", type: "email", x: 50, y: 50, label: "Kickoff Email" },
            { id: "s1-n2", type: "file", x: 45, y: 55, label: "Timeline.pdf" },
            { id: "s1-n3", type: "calendar", x: 55, y: 45, label: "Review Mtg" },
            { id: "s1-n4", type: "note", x: 60, y: 60, label: "Alpha Notes" }
        ]
    },
    {
        query: "find the presentation deck for q4",
        chips: [
             { type: "semantic", label: "intent: find", icon: Sparkle },
             { type: "filter", label: "type: presentation", icon: FileText },
             { type: "text", label: "topic: q4" }
        ],
        topic: "Q4 Presentation",
        results: [
            {
                title: "Q4_All_Hands.pptx",
                sender: "Design Team",
                preview: "Final deck for the all hands meeting.",
                type: "file",
                date: "Oct 12"
            },
            {
                title: "Q4 Planning Invite",
                sender: "Calendar",
                preview: "Strategy session for Q4 goals.",
                type: "calendar",
                date: "Sep 28"
            },
            {
                title: "Executive Summary Q4",
                sender: "Sarah Jenkins",
                preview: "Here are the key points for the slides.",
                type: "email",
                date: "Oct 10"
            }
        ],
        relatedNodes: [
            { id: "s2-n1", type: "file", x: 40, y: 40, label: "Q4 Deck" },
            { id: "s2-n2", type: "calendar", x: 50, y: 35, label: "Planning Mtg" },
            { id: "s2-n3", type: "email", x: 30, y: 45, label: "Exec Summary" }
        ]
    },
    {
        query: "/s:f type:pdf \"client dinner\"",
        chips: [
            { type: "search", label: "search", icon: MagnifyingGlass },
            { type: "filter", label: "files", icon: FileText },
            { type: "filter", label: "type: pdf", icon: Hash },
            { type: "semantic", label: "semantically", icon: Sparkle },
            { type: "text", label: "for \"client dinner\"" }
        ],
        topic: "Expenses",
        results: [
            {
                title: "Receipt_3920.pdf",
                sender: "Expensify",
                preview: "Golden Gate Grill - $142.50. Processed on...",
                type: "file",
                date: "Yesterday"
            }
        ],
        relatedNodes: [
            { id: "s3-n1", type: "file", x: 30, y: 40, label: "Receipt.pdf" },
            { id: "s3-n2", type: "image", x: 35, y: 35, label: "Dinner Photo" },
            { id: "s3-n3", type: "calendar", x: 25, y: 45, label: "Dinner w/ Client" },
            { id: "s3-n4", type: "email", x: 40, y: 30, label: "Expense Approval" }
        ]
    },
    {
        query: "what is the wifi password",
        chips: [
            { type: "semantic", label: "question", icon: Sparkle },
            { type: "text", label: "topic: wifi password" }
        ],
        topic: "Home Info",
        results: [
            {
                title: "Home Network Info",
                sender: "Apple Notes",
                preview: "SSID: Skynet_5G / Pass: P4ssw0rd123!",
                type: "note",
                date: "Last Week"
            },
             {
                title: "Router Config",
                sender: "192.168.1.1",
                preview: "Admin backup settings.",
                type: "file",
                date: "Aug 15"
            }
        ],
        relatedNodes: [
             { id: "s4-n1", type: "note", x: 65, y: 65, label: "Wifi Note" },
             { id: "s4-n2", type: "file", x: 70, y: 60, label: "Router Backup" }
        ]
    }
];

// --- Components ---

function ConnectionLine({ p1, p2, active }) {
    return (
        <motion.line
            x1={`${p1.x}%`}
            y1={`${p1.y}%`}
            x2={`${p2.x}%`}
            y2={`${p2.y}%`}
            stroke="currentColor"
            strokeWidth={active ? 1.5 : 0.5}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
                opacity: active ? 0.4 : 0.05,
                pathLength: 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={active ? "text-blue-500" : "text-foreground"}
        />
    );
}

function Node({ x, y, type, active, label, delay = 0, isResultHovered }) {
    const Icon = {
        email: EnvelopeSimple,
        file: FileText,
        calendar: CalendarBlank,
        image: ImageIcon,
        note: Paperclip,
    }[type] || Hash;

    return (
        <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: active ? (isResultHovered ? 1.4 : 1.2) : 0.8,
                x: active ? 0 : [0, 10, -10, 0], // Drift effect
                y: active ? 0 : [0, -10, 10, 0],
            }}
            transition={{
                opacity: { duration: 0.5, delay },
                scale: { duration: 0.3 },
                x: { duration: 20, repeat: Infinity, ease: "linear", repeatType: "mirror" },
                y: { duration: 25, repeat: Infinity, ease: "linear", repeatType: "mirror", delay: 2 }
            }}
        >
            <div className={`
                relative flex items-center justify-center w-8 h-8 rounded-full 
                ${active ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-foreground/5 text-foreground/40 border border-foreground/10'}
                transition-colors duration-500
            `}>
                <Icon weight={active ? "fill" : "regular"} className="w-4 h-4" />
                
                {/* Ripple effect for active nodes */}
                {active && (
                    <motion.div
                        className="absolute inset-0 rounded-full border border-blue-500"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </div>
            
            {/* Label (only active) */}
            <AnimatePresence>
                {active && label && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-sans font-medium border border-foreground/10 shadow-sm z-20"
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function AiSearchDemo() {
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [phase, setPhase] = useState("idle"); // idle, typing, thinking, results
    const [displayText, setDisplayText] = useState("");
    const [isResultHovered, setIsResultHovered] = useState(false);
    
    // Background nodes state - static for stability but could be randomized
    const [bgNodes, setBgNodes] = useState([]);

    useEffect(() => {
        setBgNodes(Array.from({ length: NODE_COUNT }).map((_, i) => ({
            id: `bg-${i}`,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            type: ["email", "file", "calendar", "image", "note"][Math.floor(Math.random() * 5)]
        })));
    }, []);

    const scenario = SCENARIOS[scenarioIndex];

    // Cycle through scenarios
    useEffect(() => {
        let timeout;
        
        const runScenario = async () => {
            // Reset
            setPhase("idle");
            setDisplayText("");
            await new Promise(r => setTimeout(r, 1000));
            
            // Start Typing
            setPhase("typing");
            const text = scenario.query;
            let currentText = "";
            for (let i = 0; i < text.length; i++) {
                currentText += text[i];
                setDisplayText(currentText);
                await new Promise(r => setTimeout(r, Math.random() * 30 + 20)); // Faster typing
            }
            
            // Thinking
            setPhase("thinking");
            await new Promise(r => setTimeout(r, 1200));
            
            // Results
            setPhase("results");
            await new Promise(r => setTimeout(r, 6000)); // Longer display for multiple results
            
            // Next Scenario
            setScenarioIndex(prev => (prev + 1) % SCENARIOS.length);
        };

        runScenario();

        return () => clearTimeout(timeout);
    }, [scenarioIndex]); // Depend on index to restart loop

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden rounded-2xl bg-muted/30 border border-foreground/5 dark:bg-black/20">
            {/* --- Background Graph --- */}
            <div className="absolute inset-0 interactive-graph-container select-none pointer-events-none">
                <svg className="absolute inset-0 w-full h-full opacity-30">
                     {/* Connect background nodes with faint lines */}
                     {bgNodes.map((node, i) => {
                         // Connect to nearest 2 neighbors for a mesh look
                         // Simple logic: connect to next 2 in array for randomness
                         const next = bgNodes[(i + 1) % bgNodes.length];
                         const next2 = bgNodes[(i + 2) % bgNodes.length];
                         return (
                             <g key={i}>
                                 <line x1={`${node.x}%`} y1={`${node.y}%`} x2={`${next.x}%`} y2={`${next.y}%`} stroke="currentColor" strokeWidth="0.5" className="text-foreground/20" />
                                 {i % 2 === 0 && <line x1={`${node.x}%`} y1={`${node.y}%`} x2={`${next2.x}%`} y2={`${next2.y}%`} stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />}
                             </g>
                         );
                     })}
                </svg>

                {/* Render nodes */}
                {bgNodes.map(node => (
                    <Node key={node.id} {...node} />
                ))}

                {/* Active Scenario Nodes (Overlay) */}
                <AnimatePresence>
                    {(phase === "thinking" || phase === "results") && (
                        <div className="absolute inset-0">
                            {/* Connect active nodes to each other */}
                            <svg className="absolute inset-0 w-full h-full z-0">
                                {scenario.relatedNodes.map((node, i) => (
                                    scenario.relatedNodes.map((target, j) => {
                                        if (i < j) { // precise unique pairs
                                           return <ConnectionLine key={`${i}-${j}`} p1={node} p2={target} active={phase === "results"} />
                                        }
                                        return null;
                                    })
                                ))}
                            </svg>

                            {scenario.relatedNodes.map((node, i) => (
                                <Node 
                                    key={node.id} 
                                    {...node} 
                                    active={phase === "results"} 
                                    delay={i * 0.1}
                                    isResultHovered={isResultHovered}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>


            {/* --- Foreground UI --- */}
            <div className="relative z-20 w-full max-w-lg px-6 flex flex-col gap-6">
                
                {/* Search Bar */}
                <motion.div 
                    layout
                    className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="p-4 flex items-center gap-4">
                        <MagnifyingGlass className="w-5 h-5 text-foreground/40 shrink-0" />
                        <div className="flex-1 font-sans text-lg text-foreground flex items-center">
                            {displayText}
                            {phase === "typing" && (
                                <span className="ml-0.5 w-[2px] h-5 bg-blue-500 animate-pulse" />
                            )}
                            {displayText === "" && phase === "idle" && (
                                <span className="text-foreground/30">Ask Foundation anything...</span>
                            )}
                        </div>
                        {phase === "thinking" && (
                            <div className="bg-foreground/5 px-3 py-1 rounded-full flex items-center gap-2">
                                <Sparkle className="w-3 h-3 text-purple-500 animate-pulse" />
                                <span className="text-xs font-medium text-foreground/50">Computing</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Command Chips (Thinking/Results Phase) */}
                    <AnimatePresence>
                        {(phase === "thinking" || phase === "results") && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-foreground/[0.02] border-t border-foreground/5 px-4 py-3 flex flex-wrap gap-2"
                            >
                                {scenario.chips.map((chip, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`
                                            flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium border
                                            ${chip.type === 'search' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' : ''}
                                            ${chip.type === 'filter' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : ''}
                                            ${chip.type === 'user' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' : ''}
                                            ${chip.type === 'semantic' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' : ''}
                                            ${chip.type === 'text' ? 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20' : ''}
                                        `}
                                    >
                                        {chip.icon && <chip.icon className="w-3 h-3" />}
                                        {chip.label}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>


                {/* Results Card Stack */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {phase === "results" && scenario.results.map((result, index) => (
                            <motion.div
                                key={`${scenario.topic}-${index}`}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                transition={{ 
                                    type: "spring", 
                                    bounce: 0.3,
                                    delay: index * 0.15 // Staggered entry
                                }}
                                className="bg-background/90 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-xl overflow-hidden"
                            >
                                <div 
                                    className="p-3 hover:bg-foreground/5 transition-colors cursor-pointer group"
                                    onMouseEnter={() => setIsResultHovered(true)}
                                    onMouseLeave={() => setIsResultHovered(false)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-500">
                                            {result.type === 'email' && <EnvelopeSimple className="w-5 h-5" />}
                                            {result.type === 'file' && <FileText className="w-5 h-5" />}
                                            {result.type === 'calendar' && <CalendarBlank className="w-5 h-5" />}
                                            {result.type === 'note' && <Paperclip className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-serif text-lg leading-none">{result.title}</h4>
                                                <span className="text-[10px] text-foreground/40 font-mono">{result.date}</span>
                                            </div>
                                            <div className="text-sm text-foreground/70 mb-1">{result.sender}</div>
                                            <p className="text-xs text-foreground/50 line-clamp-1">{result.preview}</p>
                                        </div>
                                        <div className="self-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                            <ArrowRight className="w-4 h-4 text-foreground/40" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Verification Footer (Only show when results present) */}
                <AnimatePresence>
                    {phase === "results" && (
                         <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-1.5 text-[10px] text-foreground/40"
                         >
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Verified by Semantic Index • Found in 0.04s</span>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
