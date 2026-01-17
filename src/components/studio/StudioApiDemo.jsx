"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CaretDown, Gear, Lightning, Check, Code } from "@phosphor-icons/react";

export default function StudioApiDemo() {
  return (
    <section className="py-24 md:py-32 container-swiss overflow-hidden">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Drop-in compatible</h2>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed max-w-2xl mx-auto">
                Switching to Studio is as simple as changing the `baseUrl`. No code rewrites. Complete compatibility with the OpenAI API standard.
            </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <CodeWindow />
            <UiWindow />
        </div>
    </section>
  );
}

function CodeWindow() {
    const [step, setStep] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((s) => (s + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const codeStep1 = `import openai

client = openai.OpenAI(
    base_url="https://studio.local/v1",
    api_key="sk-studio-local-key"
)

response = client.chat.completions.create(
    model="llama-3-70b",
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)`;

    const codeStep2 = `print(response.choices[0].message.content)`;

    return (
        <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-white/10 font-mono text-sm h-[400px] flex flex-col text-gray-300">
            {/* Window Controls */}
            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-[#2d2d2d]/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 text-xs text-white/30 flex items-center gap-2">
                    <Code size={14} />
                    <span>main.py</span>
                </div>
            </div>

            {/* Code Content */}
            <div className="p-6 flex-1 overflow-auto">
                <div className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="text-white/20 text-right select-none">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>
                    <div className="relative">
                        <pre className="text-blue-300 font-medium">import <span className="text-white">openai</span></pre>
                        <pre className="mt-4">
                            <span className="text-blue-300">client</span> = openai.OpenAI(<br/>
                            {'    '}base_url=<span className="text-green-400">"https://studio.local/v1"</span>,<br/>
                            {'    '}api_key=<span className="text-green-400">"sk-studio-..."</span><br/>
                            )
                        </pre>
                        <pre className="mt-4">
                            <span className="text-blue-300">response</span> = client.chat.completions.create(<br/>
                            {'    '}model=<span className="text-green-400">"llama-3-70b"</span>,<br/>
                            {'    '}messages=[&#123;<span className="text-green-400">"role"</span>: <span className="text-green-400">"user"</span>, <span className="text-green-400">"content"</span>: <span className="text-green-400">"..."</span>&#125;]<br/>
                            )
                        </pre>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 0.8 }} 
                            className="bg-white w-2 h-4 absolute top-[200px] left-0 mt-1"
                        ></motion.div>
                    </div>
                </div>

                {/* Simulated Terminal Output */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 border-t border-white/10 pt-4 text-green-400"
                >
                    <div className="flex items-center gap-2 mb-2 text-white/50 text-xs">
                        <Terminal size={14} /> TERMINAL
                    </div>
                    {step >= 2 && (
                         <Typewriter text='Quantum computing is a multidisciplinary field comprising aspects of computer science, physics, and mathematics that utilizes quantum mechanics to solve complex problems faster than classical computers.' />
                    )}
                </motion.div>
            </div>
        </div>
    );
}


function UiWindow() {
    const [cursor, setCursor] = useState({ x: 50, y: 50 });
    const [clicking, setClicking] = useState(false);
    const [model, setModel] = useState("Llama-3-70B");
    const [temp, setTemp] = useState(0.7);

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // 1. Move to Model Dropdown
                setCursor({ x: 280, y: 80 });
                await wait(1000);
                setClicking(true);
                await wait(200);
                setClicking(false);
                
                // 2. Select Mistral (Simulated dropdown open)
                setCursor({ x: 280, y: 150 });
                await wait(500);
                setClicking(true);
                setModel("Mistral Large");
                await wait(200);
                setClicking(false);

                // 3. Move to Temp Slider
                setCursor({ x: 180, y: 220 });
                await wait(800);
                setClicking(true);
                setTemp(0.2); // Snap for simple demo
                await wait(200);
                setClicking(false);
                
                // 4. Reset after delay
                await wait(3000);
                // Reset State
                setModel("Llama-3-70B");
                setTemp(0.7);
            }
        };
        sequence();
    }, []);

    return (
        <div className="relative rounded-xl overflow-hidden shadow-2xl bg-muted/80 backdrop-blur-md border border-foreground/10 h-[400px] flex flex-col pointer-events-none select-none">
            {/* Animated Cursor */}
             <motion.div
                animate={{ x: cursor.x, y: cursor.y }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="absolute z-50 top-0 left-0"
            >
                <div className={`relative ${clicking ? "scale-90" : "scale-100"} transition-transform duration-100`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                        <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="currentColor" className="text-foreground" stroke="white" strokeWidth="2"/>
                    </svg>
                </div>
            </motion.div>


            {/* UI Content */}
            <div className="p-8 space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-foreground/5">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center">
                            <Lightning weight="fill" />
                         </div>
                         <div className="font-serif text-lg">Model Settings</div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
                        <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
                    </div>
                </div>

                {/* Model Selector */}
                <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-widest text-foreground/50">Active Model</label>
                    <div className="relative p-4 rounded-lg bg-background border border-foreground/10 flex items-center justify-between shadow-sm">
                        <span className="font-medium">{model}</span>
                        <CaretDown className="text-foreground/50" />
                        
                        {/* Simulation of open dropdown */}
                        {model === "Mistral Large" && <motion.div 
                             initial={{ opacity: 0, y: -10 }}
                             animate={{ opacity: 0, y: -10 }} // Keep hidden, just showing state change logic
                             className="absolute top-full left-0 right-0 mt-2 bg-background border border-foreground/10 p-2 rounded-lg shadow-xl z-10"
                        >
                            <div className="p-2 hover:bg-foreground/5 rounded">Llama-3-70B</div>
                            <div className="p-2 hover:bg-foreground/5 rounded bg-foreground/5">Mistral Large</div>
                        </motion.div>}
                    </div>
                </div>

                {/* Temperature Slider */}
                <div className="space-y-3">
                     <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-foreground/50">
                        <span>Temperature</span>
                        <span>{temp}</span>
                    </div>
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden relative">
                        <motion.div 
                            animate={{ width: `${temp * 100}%` }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-0 left-0 bottom-0 bg-foreground"
                        ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-foreground/30">
                        <span>Precise</span>
                        <span>Creative</span>
                    </div>
                </div>
                
                 {/* System Prompt Toggle */}
                 <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-foreground/10">
                    <div className="flex items-center gap-3">
                        <Gear className="text-foreground/50" />
                        <span className="font-medium text-sm">System Prompt Optimization</span>
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-colors relative ${model === "Mistral Large" ? "bg-green-500" : "bg-foreground/20"}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${model === "Mistral Large" ? "translate-x-4" : ""}`}></div>
                    </div>
                 </div>

            </div>
        </div>
    );
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState("");
  
    useEffect(() => {
        let currentText = "";
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
            currentText += text[currentIndex];
            setDisplayText(currentText);
            currentIndex++;
            } else {
            clearInterval(interval);
            }
        }, 15);
        return () => clearInterval(interval);
    }, [text]);

  return <p className="leading-relaxed font-mono text-xs md:text-sm">{displayText}</p>;
}
