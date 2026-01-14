"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConsoleTab = () => {
    return (
        <div className="font-mono text-sm p-6 overflow-hidden">
            <div className="text-gray-400 mb-2">$ curl https://studio.local/v1/chat/completions \</div>
            <div className="text-gray-400 mb-2">&nbsp;&nbsp;-H "Content-Type: application/json" \</div>
            <div className="text-gray-400 mb-2">&nbsp;&nbsp;-d '{"{"}</div>
            <div className="text-emerald-400 mb-1">&nbsp;&nbsp;&nbsp;&nbsp;"model": "gpt-4-local",</div>
            <div className="text-emerald-400 mb-1">&nbsp;&nbsp;&nbsp;&nbsp;"messages": [{"{"}"role": "user", "content": "Analyze Q3 SaaS metrics"{"}"}]</div>
            <div className="text-gray-400 mb-4">&nbsp;&nbsp;{"}"}'</div>
            
            <div className="text-gray-500 animate-pulse">Processing request...</div>
            <div className="mt-4 text-emerald-500">
                {`{`}
                <br />
                &nbsp;&nbsp;"id": "chatcmpl-local-123",
                <br />
                &nbsp;&nbsp;"object": "chat.completion",
                <br />
                &nbsp;&nbsp;"choices": [{`{`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;"message": {`{`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"role": "assistant",
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content": "Based on the Q3 data, recurring revenue uptake..."
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{`}`}
                <br />
                &nbsp;&nbsp;{`}`}]
                <br />
                {`}`}
            </div>
        </div>
    );
};

const CodeTab = () => {
    return (
        <div className="font-mono text-sm p-6">
             <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                 <span className="text-xs text-white/40">main.py</span>
            </div>
            <div className="space-y-1 text-gray-300">
                <div><span className="text-purple-400">import</span> openai</div>
                <div className="h-2"></div>
                <div>client = openai.OpenAI(</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;base_url=<span className="text-emerald-400">"http://studio.local/v1"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;api_key=<span className="text-emerald-400">"sk-local-dev"</span></div>
                <div>)</div>
                <div className="h-2"></div>
                <div>response = client.chat.completions.create(</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;model=<span className="text-emerald-400">"gpt-4"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;messages=[</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}<span className="text-emerald-400">"role"</span>: <span className="text-emerald-400">"user"</span>, <span className="text-emerald-400">"content"</span>: <span className="text-emerald-400">"Summarize this legal doc"</span>{"}"}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;]</div>
                <div>)</div>
                <div className="h-2"></div>
                <div><span className="text-purple-400">print</span>(response.choices[0].message.content)</div>
            </div>
        </div>
    );
};

const WebTab = () => {
    return (
        <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium">Cornerstone Studio</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">v2.1.0 • Connected</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tokens / Sec</div>
                    <div className="text-2xl font-serif">142.5</div>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Latency</div>
                    <div className="text-2xl font-serif">12ms</div>
                </div>
            </div>

            <div className="flex-grow bg-gray-50 dark:bg-white/5 rounded-lg p-4 font-mono text-xs text-gray-600 dark:text-gray-300 overflow-hidden">
                <div className="mb-2 opacity-50">[SYSTEM] Model loaded: llama-3-70b-instruct</div>
                <div className="mb-2 opacity-50">[SYSTEM] Context window: 128k</div>
                <div className="mb-2 text-emerald-600 dark:text-emerald-400">[Incoming Request] POST /v1/chat/completions</div>
                <div className="mb-2 ml-2">From: 192.168.1.42</div>
                <div className="mb-2 text-emerald-600 dark:text-emerald-400">[Completed] 200 OK - 420 tokens generated</div>
            </div>
        </div>
    );
};

export default function StudioDemos() {
    const [activeTab, setActiveTab] = useState("console");

    const tabs = [
        { id: "console", label: "Console", component: ConsoleTab },
        { id: "code", label: "Code", component: CodeTab },
        { id: "web", label: "Dashboard", component: WebTab },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto my-20">
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl">
                {/* Window Controls & Tabs */}
                <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 dark:bg-[#151515] border-b border-gray-200 dark:border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    </div>
                    
                    <div className="flex gap-1 bg-gray-200 dark:bg-white/5 p-1 rounded-lg">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-1 text-xs font-medium rounded-md transition-all ${
                                    activeTab === tab.id
                                        ? "bg-white dark:bg-white/10 text-black dark:text-white shadow-sm"
                                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="h-[400px] bg-[#0A0A0A] text-white overflow-hidden relative">
                    <div className={`h-full w-full ${activeTab === 'web' ? 'bg-white dark:bg-[#0A0A0A] text-black dark:text-white' : 'bg-[#0A0A0A] text-white'}`}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="h-full"
                            >
                                {tabs.find((t) => t.id === activeTab)?.component()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
