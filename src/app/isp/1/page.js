"use client";

import { motion } from "framer-motion";
import LogoIcon from "@/components/LogoIcon";

const slides = [
  {
    id: "overview",
    title: "What is this thing?",
    subtitle: "The Project",
    content: (
      <div className="flex flex-col gap-6 h-full">
        <div className="grid grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-xl mb-2 text-foreground">The Big Idea</h3>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                   <span className="text-accent">•</span>
                   <span>Ditching Cloud services (Bye bye Google Drive & Dropbox)</span>
                </li>
                <li className="flex items-start gap-2">
                   <span className="text-accent">•</span>
                   <span>Owning my own data (and my own bugs)</span>
                </li>
                <li className="flex items-start gap-2">
                   <span className="text-accent">•</span>
                   <span>Hardware + Software built together, like Apple but small</span>
                </li>
              </ul>
            </div>
             <div>
              <h3 className="font-medium text-xl mb-2 text-foreground">The Vibe</h3>
               <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                   <span className="text-accent">•</span>
                   <span>Think "Bloomberg Terminal" but for my personal life</span>
                </li>
                 <li className="flex items-start gap-2">
                   <span className="text-accent">•</span>
                   <span>One-time purchase because subscriptions are annoying</span>
                </li>
                <li className="flex items-start gap-2">
                   <span className="text-accent">•</span>
                   <span>For power users who care about privacy</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-6">
             <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg flex-grow border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400">
                Cool Hero Image Here
             </div>
             <div>
                <h3 className="font-medium text-xl mb-2 text-foreground">The Goons</h3>
                 <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                     <span className="text-accent">•</span>
                     <span>Just three of us building this</span>
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-accent">•</span>
                     <span>Planning to Kickstarter this after graduation (Spring 2026)</span>
                  </li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "hardware",
    title: "The Metal Box",
    subtitle: "Hardware",
    content: (
      <div className="flex flex-col gap-6 h-full">
         <div className="grid grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                 <div>
                    <h3 className="font-medium text-xl mb-2 text-foreground">The Specs</h3>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li className="flex items-start gap-2">
                           <span className="text-accent">•</span>
                           <span><strong>Brain:</strong> Up to Intel Core i3 (N100 Base)</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <span className="text-accent">•</span>
                           <span><strong>Memory:</strong> Up to 16GB RAM (Chrome loves this)</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <span className="text-accent">•</span>
                           <span>Tower layout with swappable drive sleds</span>
                        </li>
                         <li className="flex items-start gap-2">
                           <span className="text-accent">•</span>
                           <span><strong>Expansion:</strong> 6 Bays for Networking, USB, NVMe, etc.</span>
                        </li>
                    </ul>
                 </div>
                 <div>
                    <h3 className="font-medium text-xl mb-2 text-foreground">Why it's fancy</h3>
                    <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li className="flex items-start gap-2">
                           <span className="text-accent">•</span>
                           <span><strong>Build:</strong> Heavy aluminum so it feels expensive</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <span className="text-accent">•</span>
                           <span><strong>Cooling:</strong> Noctua fans (Silent & Brown)</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <span className="text-accent">•</span>
                           <span><strong>Power:</strong> Industrial supplies that won't explode</span>
                        </li>
                    </ul>
                 </div>
            </div>
            <div className="flex flex-col gap-4">
                 <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg flex-grow border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400">
                    Exploded View Diagram
                 </div>
                 <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500">
                    <strong>Plan:</strong> Build in garage → Sell a few → Manufacture properly.
                 </div>
            </div>
         </div>
      </div>
    ),
  },
  {
    id: "software",
    title: "The Code",
    subtitle: "Full-Stack Soup",
    content: (
       <div className="grid grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
             <div className="p-5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-serif text-2xl mb-3 text-foreground">The Backend</h3>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li><span className="font-medium text-foreground">Framework:</span> FastAPI (Python is great)</li>
                    <li><span className="font-medium text-foreground">Database:</span> PostgreSQL + Migrations</li>
                    <li><span className="font-medium text-foreground">Speed:</span> Redis + ARQ Background Workers</li>
                    <li><span className="font-medium text-foreground">API:</span> RESTful (mostly)</li>
                </ul>
             </div>
             <div className="p-5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-serif text-2xl mb-3 text-foreground">Security Stuff</h3>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li><span className="font-medium text-foreground">Passwords:</span> Argon2id (GPU-resistant hashing)</li>
                    <li><span className="font-medium text-foreground">Logins:</span> JWT Tokens</li>
                    <li><span className="font-medium text-foreground">Safety:</span> SQL Injection protection</li>
                </ul>
             </div>
          </div>
          <div className="flex flex-col h-full gap-6">
             <div className="p-5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex-grow">
                <h3 className="font-serif text-2xl mb-3 text-foreground">The Frontend</h3>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li><span className="font-medium text-foreground">Stack:</span> Next.js 14 + TypeScript (Strict mode hurts)</li>
                    <li><span className="font-medium text-foreground">State:</span> React Hooks + Context</li>
                    <li><span className="font-medium text-foreground">Live Updates:</span> WebSockets everywhere</li>
                    <li><span className="font-medium text-foreground">Files:</span> Drag-and-drop uploads</li>
                </ul>
             </div>
             <div className="h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                Stack Diagram
             </div>
          </div>
       </div>
    ),
  },
  {
    id: "files",
    title: "Files & Stuff",
    subtitle: "Storage",
    content: (
      <div className="h-full flex flex-col gap-6">
         <div className="grid grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div>
                    <h3 className="font-medium text-xl mb-2 text-foreground">The Web App</h3>
                     <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li className="flex items-start gap-2"><span className="text-accent">•</span><span>Drag-and-drop works just like Finder</span></li>
                        <li className="flex items-start gap-2"><span className="text-accent">•</span><span>Can pause and resume uploads</span></li>
                        <li className="flex items-start gap-2"><span className="text-accent">•</span><span>Shows thumbnails for everything</span></li>
                        <li className="flex items-start gap-2"><span className="text-accent">•</span><span>Keeps users' files separate</span></li>
                    </ul>
                </div>
                <div>
                     <h3 className="font-medium text-xl mb-2 text-foreground">Network Drives</h3>
                     <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li className="flex items-start gap-2"><span className="text-accent">•</span><span>SMB/CIFS (Works on Mac, Windows, Linux)</span></li>
                        <li className="flex items-start gap-2"><span className="text-accent">•</span><span>Auto-creates folders for new users</span></li>
                        <li className="flex items-start gap-2"><span className="text-accent">•</span><span><strong>Magic:</strong> Upload on web, appears on desktop instantly</span></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                 <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg flex-grow border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400">
                    File Manager Screenshot
                 </div>
                 <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                     <h4 className="font-semibold text-sm mb-1">Live Stats</h4>
                     <p className="text-sm text-neutral-500">Shows CPU usage and Network speed in real-time so you know if it's crashing.</p>
                 </div>
            </div>
         </div>
      </div>
    ),
  },
  {
    id: "search",
    title: "Smart Search",
    subtitle: "Local AI",
    content: (
       <div className="h-full flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-12 items-center h-full">
            <div className="space-y-8">
                <div>
                    <h3 className="font-medium text-xl mb-3 text-foreground">The Tech</h3>
                     <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li><strong>Model:</strong> nomic-embed-text (It's smart)</li>
                        <li><strong>Database:</strong> FAISS (Facebook's vector search)</li>
                        <li><strong>Speed:</strong> Super fast (&lt;100ms)</li>
                        <li><strong>Privacy:</strong> All local. No sending data to OpenAI.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-medium text-xl mb-3 text-foreground">How it works</h3>
                     <div className="text-neutral-600 dark:text-neutral-400 text-sm space-y-2 font-mono bg-neutral-50 dark:bg-neutral-900 p-4 rounded border border-neutral-200 dark:border-neutral-800">
                        <p>1. Open file (PDF, Doc, txt)</p>
                        <p>2. Chop it up into pieces</p>
                        <p>3. Turn text into number vectors</p>
                        <p>4. Save for math magic later</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 h-full justify-center">
                 <div className="h-48 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400">
                    RAG Diagram
                 </div>
                 <div className="space-y-2">
                     <h4 className="font-medium text-foreground">What it does</h4>
                     <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        You can search "money problems" and it finds documents about "budget analysis".
                        It actually understands meaning, not just keywords.
                     </p>
                 </div>
            </div>
          </div>
       </div>
    ),
  },
  {
    id: "email",
    title: "Email Client",
    subtitle: "Communication",
    content: (
       <div className="grid grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
             <div>
                 <h3 className="font-medium text-xl mb-2 text-foreground">Cool Features</h3>
                 <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                     <li className="flex items-start gap-2"><span className="text-accent">•</span><span><strong>OAuth:</strong> Log in with Gmail/Outlook securely</span></li>
                     <li className="flex items-start gap-2"><span className="text-accent">•</span><span><strong>Smarts:</strong> Sorts important emails automatically</span></li>
                     <li className="flex items-start gap-2"><span className="text-accent">•</span><span><strong>UI:</strong> Threads, Brand Icons (BIMI), Rich Text</span></li>
                     <li className="flex items-start gap-2"><span className="text-accent">•</span><span><strong>Privacy:</strong> Emails stay on the box, not shared</span></li>
                 </ul>
             </div>
             <div className="p-5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                 <h3 className="font-serif text-lg mb-2 text-foreground">Context Engine</h3>
                 <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                     Email is the biggest data source. We use it to link messages to files and calendar events automatically.
                 </p>
             </div>
          </div>
          <div className="flex flex-col gap-4 h-full">
             <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg flex-grow border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400">
                Email Interface
             </div>
          </div>
       </div>
    ),
  },
  {
    id: "website-dev",
    title: "Making This Site",
    subtitle: "Web Dev",
    content: (
       <div className="grid grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
             <div className="p-5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-serif text-2xl mb-3 text-foreground">The Stack</h3>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li><span className="font-medium text-foreground">Frontend:</span> Next.js 16 (React 19)</li>
                    <li><span className="font-medium text-foreground">Style:</span> Tailwind CSS v4</li>
                    <li><span className="font-medium text-foreground">Motion:</span> Framer Motion (for the smooth feels)</li>
                    <li><span className="font-medium text-foreground">Icons:</span> Phosphor Icons</li>
                </ul>
             </div>
             <div className="p-5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-serif text-2xl mb-3 text-foreground">Design Vibe</h3>
                 <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                     Going for a "Mature Minimalism" look.
                     Lots of serif fonts, whitespace, and scrolling animations.
                     Dark mode matches system settings.
                 </p>
             </div>
          </div>
           <div className="flex flex-col gap-6 h-full">
             <div className="p-5 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex-grow">
                <h3 className="font-serif text-2xl mb-3 text-foreground">Cool Features</h3>
                 <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li><span className="font-medium text-foreground">Interactive:</span> Cursor glow, scribble effects</li>
                    <li><span className="font-medium text-foreground">Layouts:</span> Masonry grids that adjust to screen size</li>
                    <li><span className="font-medium text-foreground">Speed:</span> Optimized images and Server Actions</li>
                </ul>
             </div>
              <div className="h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                Website Hero Visual
             </div>
          </div>
       </div>
    ),
  },
  {
    id: "dev-infra",
    title: "How We Build It",
    subtitle: "Production",
    content: (
       <div className="h-full flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-8 h-full">
             <div className="space-y-6">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-medium text-lg mb-2 text-foreground">Setup & Deploy</h3>
                    <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• One script sets up everything (Debian → Prod)</li>
                        <li>• Systemd keeps services running</li>
                        <li>• Auto-configures all the confusing Linux stuff</li>
                        <li>• Env variables for secrets</li>
                    </ul>
                </div>
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-medium text-lg mb-2 text-foreground">QA (aka Testing)</h3>
                    <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                         <li>• <strong>Linting:</strong> Ruff & ESLint shout at us for bad code</li>
                         <li>• <strong>Typing:</strong> Strict checking to prevent bugs</li>
                         <li>• <strong>Metrics:</strong> We track how fast search/indexing is</li>
                         <li>• <strong>Logs:</strong> Giant error traces when things break</li>
                    </ul>
                </div>
             </div>
             <div className="space-y-6">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-medium text-lg mb-2 text-foreground">Database Ops</h3>
                    <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• Alembic handles database changes</li>
                        <li>• Fake data generators for testing</li>
                        <li>• Reset scripts to nuke it and start over</li>
                    </ul>
                </div>
                 <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-medium text-lg mb-2 text-foreground">Git / Version Control</h3>
                    <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• Feature Branches (don't break main!)</li>
                        <li>• Atomic commits so we can revert easily</li>
                        <li>• Code reviews before merging</li>
                    </ul>
                </div>
             </div>
          </div>
       </div>
    ),
  },
];

export default function SlideDeck() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black py-12 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto space-y-12">
        <div className="flex items-center justify-between px-4">
             <div className="flex items-center gap-2 text-sm font-mono text-neutral-500">
                <LogoIcon className="h-4 w-auto text-foreground opacity-80" />
                <span>CORNERSTONE ISP / {new Date().toLocaleDateString()}</span>
             </div>
             <div className="text-sm font-mono text-neutral-500">{slides.length} SLIDES</div>
        </div>

        <div className="flex flex-col items-center gap-16 pb-32">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="w-full aspect-video bg-white dark:bg-neutral-900 shadow-xl rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col relative"
            >
              <div className="absolute top-6 right-8 text-neutral-300 dark:text-neutral-700 font-mono text-4xl font-bold opacity-20 pointer-events-none">
                0{index + 1}
              </div>
              <div className="absolute top-6 left-8 opacity-10 pointer-events-none text-neutral-900 dark:text-white">
                <LogoIcon className="h-12 w-auto" />
              </div>
              
              <div className="p-8 md:p-12 flex flex-col h-full relative z-10">
                <div className="mb-8 border-b border-neutral-100 dark:border-neutral-800 pb-6 pl-16">
                  <span className="text-accent text-xs md:text-sm tracking-widest uppercase font-semibold mb-2 block">
                    {slide.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif text-foreground tracking-tight">
                    {slide.title}
                  </h2>
                </div>
                
                <div className="flex-grow overflow-hidden pl-16">
                    {slide.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
