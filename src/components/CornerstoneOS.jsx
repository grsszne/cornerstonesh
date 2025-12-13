"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";

// --- Icons ---
const Icons = {
  Overview: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Apps: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  System: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/></svg>,
  Storage: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Network: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Terminal: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  Logs: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
};

// --- Helper Components ---

function StatusDot({ status = "good", pulse = false }) {
  const color = status === "good" ? "bg-green-500" : status === "warn" ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className={`w-1.5 h-1.5 rounded-full ${color} shadow-[0_0_8px_rgba(34,197,94,0.4)] ${pulse ? 'animate-pulse' : ''}`} />
  );
}

function Card({ children, title, className = "", rightContent }) {
  return (
    <div className={`bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex flex-col ${className}`}>
      {(title || rightContent) && (
         <div className="flex justify-between items-center mb-6">
            {title && <div className="text-[10px] uppercase tracking-widest text-white/40 font-medium">{title}</div>}
            {rightContent}
         </div>
      )}
      {children}
    </div>
  );
}

// --- Animated Graph Component ---
function LiveGraph({ color = "#3b82f6", min = 20, max = 80 }) {
   const [path, setPath] = useState("");
   const [areaPath, setAreaPath] = useState("");
   
   useEffect(() => {
      const generateData = () => {
         const points = 20;
         const width = 100;
         const height = 100;
         const step = width / (points - 1);
         
         let data = [];
         let prevY = 50;
         
         for (let i = 0; i < points; i++) {
            const y = Math.min(Math.max(prevY + (Math.random() - 0.5) * 40, min), max); 
            data.push({ x: i * step, y: height - y });
            prevY = y;
         }
         
         let d = `M ${data[0].x} ${data[0].y}`;
         for (let i = 1; i < data.length - 1; i++) {
            const p1 = data[i];
            d += ` L ${p1.x} ${p1.y}`;
         }
         d += ` L ${data[data.length-1].x} ${data[data.length-1].y}`;

         setPath(d);
         setAreaPath(`${d} V 100 H 0 Z`);
      };

      generateData();
      const interval = setInterval(generateData, 2000); 
      return () => clearInterval(interval);
   }, [min, max]);

   return (
      <div className="h-full w-full relative">
         <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
               d={path}
               fill="none" 
               stroke={color} 
               strokeWidth="1.5" 
               vectorEffect="non-scaling-stroke"
               animate={{ d: path }}
               transition={{ duration: 2, ease: "linear" }}
            />
            <motion.path 
               d={areaPath}
               fill={`url(#gradient-${color})`} 
               opacity="0.2" 
               stroke="none"
               animate={{ d: areaPath }}
               transition={{ duration: 2, ease: "linear" }}
            />
            <defs>
               <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.5"/>
                  <stop offset="100%" stopColor={color} stopOpacity="0"/>
               </linearGradient>
            </defs>
         </svg>
      </div>
   )
}


// --- Views ---

function OverviewView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6 h-full overflow-y-auto custom-scrollbar content-start">
      {/* Cards - Top Row */}
      <Card title="System Status" className="h-48">
         <div className="space-y-4 font-mono text-xs text-white/90">
            <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">UPTIME</span>
               <span>8h 1m</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">PLATFORM</span>
               <span>Darwin</span>
            </div>
            <div className="flex justify-between items-center pt-2">
               <span className="text-white/40 uppercase tracking-widest text-[10px]">STATUS</span>
               <div className="flex items-center gap-2 text-green-500 bg-green-900/10 px-2 py-0.5 rounded border border-green-500/20">
                  <StatusDot pulse />
                  <span className="font-bold tracking-wider text-[10px]">ONLINE</span>
               </div>
            </div>
         </div>
      </Card>

      <Card title="Thermal & Power" className="h-48">
         <div className="space-y-4 font-mono text-xs text-white/90">
            <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">CPU DIE</span>
               <span>47.6 °C</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-white/40">CPU LOAD</span>
               <span>25.8 %</span>
            </div>
            <div className="flex justify-between pt-2">
               <span className="text-white/40">MEMORY</span>
               <span>75.1 %</span>
            </div>
         </div>
      </Card>

      <Card title="Services" className="h-48">
         <div className="space-y-4 font-mono text-xs">
            {['FILESYSTEM', 'DOCKER', 'NETWORK'].map((service, i) => (
                <div key={service} className="flex justify-between items-center">
                   <div className="text-white/90">{service}</div>
                   <div className="flex items-center gap-2 text-[10px] text-green-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {i === 0 ? 'MOUNTED' : i === 1 ? 'RUNNING' : 'ACTIVE'}
                   </div>
                </div>
            ))}
         </div>
      </Card>

      {/* Graphs - Bottom Row */}
      <Card title="Network Activity" className="col-span-1 lg:col-span-1 h-64">
         <div className="flex items-center gap-4 mb-4 font-mono text-xs">
            <div className="text-3xl text-white font-light">0.05 <span className="text-xs text-white/40">MBPS</span></div>
            <div className="flex flex-col gap-1 text-[10px]">
               <span className="flex items-center gap-1 text-green-500">↓ 29.2 Kbps</span>
               <span className="flex items-center gap-1 text-orange-500">↑ 21.3 Kbps</span>
            </div>
         </div>
         <div className="flex-1 min-h-0">
             <LiveGraph color="#f97316" min={5} max={40} />
         </div>
      </Card>

      <Card title="CPU Load" className="col-span-1 lg:col-span-1 h-64">
         <div className="mb-4 font-mono text-xs">
            <div className="text-3xl text-white font-light">25.8 <span className="text-xs text-white/40">%</span></div>
         </div>
         <div className="flex-1 min-h-0">
             <LiveGraph color="#3b82f6" min={20} max={60} />
         </div>
      </Card>

      <Card title="Memory Usage" className="col-span-1 lg:col-span-1 h-64">
         <div className="mb-4 font-mono text-xs">
            <div className="text-3xl text-white font-light">75.1 <span className="text-xs text-white/40">%</span></div>
         </div>
         <div className="flex-1 min-h-0">
             <LiveGraph color="#a855f7" min={70} max={80} />
         </div>
      </Card>
    </div>
  );
}

function NetworkView() {
   return (
      <div className="p-6 h-full overflow-y-auto custom-scrollbar space-y-4">
         {/* Main Traffic Graph */}
         <Card className="h-64" rightContent={
             <div className="flex gap-4 text-[10px] items-center">
                 <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"/> <span className="text-white/60">1500.0 Kbps</span></div>
                 <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"/> <span className="text-white/60">106.1 Kbps</span></div>
             </div>
         }>
             <div className="text-3xl font-light text-white mb-4">1.58 <span className="text-sm text-white/40">MBPS</span></div>
             <div className="flex-1 min-h-0">
                 <LiveGraph color="#f97316" min={10} max={90} /> 
             </div>
         </Card>

         {/* Stats Row */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="h-28">
               <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Sent</div>
               <div className="text-2xl text-white">3.51 <span className="text-sm text-white/40">GB</span></div>
            </Card>
             <Card className="h-28">
               <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Received</div>
               <div className="text-2xl text-white">3.98 <span className="text-sm text-white/40">GB</span></div>
            </Card>
             <Card className="h-28">
               <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Packets Sent</div>
               <div className="text-2xl text-white">8.30 <span className="text-sm text-white/40">M</span></div>
            </Card>
             <Card className="h-28">
               <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Packets Received</div>
               <div className="text-2xl text-white">42.11 <span className="text-sm text-white/40">M</span></div>
            </Card>
         </div>

         {/* Interfaces */}
         <div className="space-y-1">
             <div className="text-[10px] uppercase tracking-widest text-white/40 ml-1 mt-4 mb-2">Network Interfaces</div>
             
             <Card className="flex-row justify-between items-center py-4">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded flex items-center justify-center text-orange-500 text-[10px] font-bold">EN0</div>
                    <div>
                       <div className="text-white text-sm font-medium">EN0</div>
                       <div className="text-[10px] text-white/40 font-mono">32:7B:43:28:CD:B2</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-8 text-right">
                     <div className="hidden md:block">
                        <div className="text-[10px] text-white/30 uppercase">IP Address</div>
                        <div className="text-white/80 text-xs font-mono">10.0.0.58</div>
                     </div>
                     <div className="hidden md:block">
                        <div className="text-[10px] text-white/30 uppercase">Netmask</div>
                        <div className="text-white/80 text-xs font-mono">255.255.255.0</div>
                     </div>
                     <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold rounded">UP</div>
                 </div>
             </Card>
             <Card className="flex-row justify-between items-center py-4 opacity-50">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded flex items-center justify-center text-orange-500 text-[10px] font-bold">ANP</div>
                    <div>
                       <div className="text-white text-sm font-medium">ANPI1</div>
                       <div className="text-[10px] text-white/40 font-mono">86:34:B7:D9:0F:28</div>
                    </div>
                 </div>
                 <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold rounded">UP</div>
             </Card>
         </div>
      </div>
   )
}

function SystemView() {
    return (
       <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Software */}
             <div className="space-y-4">
                 <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-medium">Software</div>
                 <div className="rounded-xl border border-white/5 bg-[#0A0A0A] overflow-hidden divide-y divide-white/5 font-mono text-xs">
                    <div className="flex justify-between p-4"><span className="text-white/30">HOSTNAME</span><span>foundation-dev</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">OS</span><span>CornerstoneOS v1.0.4</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">KERNEL</span><span>Linux 6.1.0-rpi7-rpi-v8</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">ARCHITECTURE</span><span>aarch64</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">UPTIME</span><span>24d 03h 15m 42s</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">LOAD AVERAGE</span><span>0.42, 0.38, 0.35</span></div>
                 </div>
             </div>
             
             {/* Hardware */}
             <div className="space-y-4">
                 <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-medium">Hardware</div>
                 <div className="rounded-xl border border-white/5 bg-[#0A0A0A] overflow-hidden divide-y divide-white/5 font-mono text-xs">
                    <div className="flex justify-between p-4"><span className="text-white/30">MODEL</span><span>Foundation Dev Kit</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">PROCESSOR</span><span>Broadcom BCM2712</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">MEMORY</span><span>8GB LPDDR4X-4266</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">STORAGE</span><span>512GB NVMe</span></div>
                 </div>
             </div>
          </div>
       </div>
    );
 }

function LogsView() {
    const logs = [
        { time: "12/13/2025, 11:01:12", level: "INFO", src: "websocket", msg: "Client connected to telemetry WebSocket (total: 8)" },
        { time: "12/13/2025, 11:01:12", level: "INFO", src: "websocket", msg: "Client connected to telemetry WebSocket (total: 7)" },
        { time: "12/13/2025, 11:01:12", level: "INFO", src: "websocket", msg: "Client connected to telemetry WebSocket (total: 6)" },
        { time: "12/13/2025, 11:01:12", level: "INFO", src: "websocket", msg: "Client connected to telemetry WebSocket (total: 5)" },
        { time: "12/13/2025, 11:01:10", level: "INFO", src: "websocket", msg: "Client connected to telemetry WebSocket (total: 4)" },
        { time: "12/13/2025, 11:01:03", level: "INFO", src: "websocket", msg: "Client connected to telemetry WebSocket (total: 1)" },
        { time: "12/13/2025, 11:00:32", level: "INFO", src: "system", msg: "CornerstoneOS Backend API started successfully" },
        { time: "12/13/2025, 11:00:32", level: "WARNING", src: "docker", msg: "Docker service unavailable: 'NoneType' object has no attribute 'ping'" },
        { time: "12/13/2025, 11:00:32", level: "INFO", src: "telemetry", msg: "Telemetry broadcast service started" },
        { time: "12/13/2025, 11:00:32", level: "INFO", src: "system", msg: "CornerstoneOS Backend API starting" },
        { time: "12/13/2025, 11:00:32", level: "INFO", src: "system", msg: "Starting CornerstoneOS Backend API..." },
        { time: "12/13/2025, 11:00:32", level: "INFO", src: "system", msg: "CORS allowed origins: ['http://localhost:3000', 'http://localhost:3001']" },
        { time: "12/13/2025, 11:00:32", level: "INFO", src: "system", msg: "Server hostname: Zanes-MacBook-Air.local" },
        { time: "12/13/2025, 11:00:32", level: "INFO", src: "system", msg: "Logging service initialized" },
    ];
 
    return (
       <div className="flex flex-col h-full bg-[#0A0A0A]">
          {/* Controls */}
          <div className="flex justify-between items-center p-4 border-b border-white/5">
              <div className="flex gap-1">
                 {['All', 'Info', 'Warning', 'Error'].map((tab, i) => (
                    <button key={tab} className={`px-3 py-1 rounded text-xs transition-colors ${i === 0 ? "bg-white text-black font-bold" : "text-white/60 hover:text-white bg-white/5"}`}>
                       {tab}
                    </button>
                 ))}
              </div>
              <button className="px-3 py-1 rounded text-xs bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors">Clear Logs</button>
          </div>
          
          {/* Log Table */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 font-mono text-[10px] space-y-3">
             {logs.map((log, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 border-b border-white/5 pb-2 last:border-0 hover:bg-white/5 transition-colors p-1 rounded">
                   <div className="col-span-3 text-white/40">{log.time}</div>
                   <div className={`col-span-1 font-bold ${log.level === 'INFO' ? 'text-green-500' : log.level === 'WARNING' ? 'text-orange-500' : 'text-red-500'}`}>
                      {log.level}
                   </div>
                   <div className="col-span-2 text-blue-400">{log.src}</div>
                   <div className="col-span-6 text-white/80 whitespace-nowrap overflow-hidden text-ellipsis">{log.msg}</div>
                </div>
             ))}
          </div>
       </div>
    );
 }

function TerminalView() {
   const [lines, setLines] = useState([
       { text: "# zane @ Zanes-MacBook-Air in ~/Desktop/cornerstoneos/backend/src [23:33:28]", color: "text-blue-400" },
       { text: "$", color: "text-orange-500" },
       { text: "# zane @ Zanes-MacBook-Air in ~/Desktop/cornerstoneos/backend/src on git:main o [23:33:28]", color: "text-blue-400" },
       { text: "$ ping google", color: "text-white" },
   ]);

   useEffect(() => {
       const initialDelay = 1000;
       
       const pingSequence = [
           { text: "", type: "break" }, 
           { text: "# zane @ Zanes-MacBook-Air in ~/Desktop/cornerstoneos/backend/src on git:main o [23:33:35] C:130", color: "text-blue-400" },
           { text: "$ ping cornerstone.sh", color: "text-white", typing: true },
           { text: "PING cornerstone.sh (216.198.79.1): 56 data bytes", delay: 800 },
           { text: "64 bytes from 216.198.79.1: icmp_seq=0 ttl=247 time=8.149 ms", delay: 1200 },
           { text: "64 bytes from 216.198.79.1: icmp_seq=1 ttl=247 time=9.916 ms", delay: 2200 },
           { text: "64 bytes from 216.198.79.1: icmp_seq=2 ttl=247 time=10.083 ms", delay: 3200 },
           { text: "64 bytes from 216.198.79.1: icmp_seq=3 ttl=247 time=8.803 ms", delay: 4200 },
           { text: "64 bytes from 216.198.79.1: icmp_seq=4 ttl=247 time=9.825 ms", delay: 5200 },
       ];

       let timeouts = [];
       let accDelay = initialDelay;

       pingSequence.forEach((step) => {
           if (step.typing) {
             accDelay += 500;
             timeouts.push(setTimeout(() => {
                 setLines(prev => [...prev, { text: step.text, color: step.color }]);
             }, accDelay));
           } else {
             accDelay += step.delay || 100;
             timeouts.push(setTimeout(() => {
                 setLines(prev => [...prev, { text: step.text, color: "text-white/80" }]);
             }, accDelay));
           }
       });

       return () => timeouts.forEach(clearTimeout);
   }, []);

   return (
      <div className="p-6 h-full font-mono text-[11px] md:text-xs text-white/80 bg-[#0A0A0A] overflow-y-auto custom-scrollbar">
         {lines.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap mb-1 break-all ${line.color || "text-white/80"}`}>
                {line.text}
            </div>
         ))}
         <div className="flex items-center">
            <motion.div 
               animate={{ opacity: [1, 1, 0, 0] }}
               transition={{ 
                 duration: 1, 
                 repeat: Infinity, 
                 times: [0, 0.5, 0.5, 1],
                 ease: "linear" 
               }}
               className="w-2 h-4 bg-orange-500"
            />
         </div>
         
         <div className="mt-12 pt-4 border-t border-white/10 text-white/30 text-[10px]">
             <div>TERMINAL INSTRUCTIONS</div>
             <ul className="list-disc pl-4 mt-2 space-y-1">
                 <li>This is a real shell running on the server</li>
                 <li>Full bash/zsh command support</li>
             </ul>
         </div>
      </div>
   )
}


export default function CornerstoneOS() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [date, setDate] = useState(null); // Client-side only to prevent hydration mismatch

  useEffect(() => {
     setDate(new Date());
     const timer = setInterval(() => setDate(new Date()), 1000);
     return () => clearInterval(timer);
  }, []);

  // Formatters
  const formatTime = (d) => d ? d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : "11:05 AM";
  const formatDate = (d) => d ? d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) : "Fri 12 Dec";

  const views = {
     Overview: OverviewView,
     Apps: () => <div className="p-12 text-center text-white/40 font-mono">App Store Module Loaded...</div>,
     System: SystemView,
     Storage: () => <div className="p-12 text-center text-white/40 font-mono">ZFS Pool Manager Loaded...</div>,
     Network: NetworkView,
     Terminal: TerminalView,
     Logs: LogsView
  };

  const ActiveView = views[activeTab];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-black border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
               Server-grade software.
            </h2>
            <p className="text-lg text-black/60 dark:text-white/60 font-mono">
               The control you expect from a server. The polish you expect from us.
            </p>
         </FadeIn>

         <FadeIn delay={0.2}>
            {/* Desktop Environment Container */}
            <div className="relative w-full h-[700px] md:h-[900px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black select-none">
               
               {/* Realistic Wallpaper */}
               <div className="absolute inset-0 bg-black">
                   <img 
                       src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       className="w-full h-full object-cover"
                       alt="Wallpaper" 
                   />
                   <div className="absolute inset-0 bg-black/10" /> 
               </div>

               {/* macOS-like Menu Bar */}
               <div className="relative z-20 h-8 bg-black/20 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 text-[13px] font-medium text-white shadow-sm">
                  <div className="flex items-center gap-5">
                     <span className="text-base"></span>
                     <span className="font-bold">Safari</span>
                     <span className="hidden sm:inline opacity-90">File</span>
                     <span className="hidden sm:inline opacity-90">Edit</span>
                     <span className="hidden sm:inline opacity-90">View</span>
                     <span className="hidden sm:inline opacity-90">History</span>
                     <span className="hidden sm:inline opacity-90">Bookmarks</span>
                     <span className="hidden sm:inline opacity-90">Window</span>
                     <span className="hidden sm:inline opacity-90">Help</span>
                  </div>
                  <div className="flex items-center gap-4 opacity-90">
                      {/* Status Icons */}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      <span>100%</span>
                      <span className="hidden sm:inline">{formatDate(date)}</span>
                      <span>{formatTime(date)}</span>
                  </div>
               </div>

               {/* The Window Container - Centered on Desktop */}
               <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-12 pb-28">
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="w-full h-full max-w-[1248px] bg-[#1e1e1e] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col ring-1 ring-white/5"
                    >
                       {/* Safari Toolbar */}
                       <div className="h-10 bg-[#323232] border-b border-black flex items-center px-4 gap-4 shrink-0">
                          {/* Traffic Lights */}
                          <div className="flex gap-2 group mr-2">
                              <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]/50 shadow-inner"></div>
                              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]/50 shadow-inner"></div>
                              <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]/50 shadow-inner"></div>
                          </div>
                          
                          {/* Sidebar Toggle & Nav */}
                          <div className="flex gap-4 text-white/30 hidden sm:flex">
                             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4ZM5 6H19V18H5V6ZM7 8H9V16H7V8Z" /></svg>
                             <div className="flex gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                             </div>
                          </div>

                          {/* Address Bar */}
                          <div className="flex-1 max-w-xl mx-auto bg-[#242424] h-7 rounded-lg flex items-center justify-center text-xs text-white/50 font-normal border border-white/5 shadow-inner group hover:bg-[#2a2a2a] transition-colors cursor-text">
                             <svg className="w-3 h-3 mr-2 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 17L17 12H13V8H11V12H7L12 17Z" style={{transform:'rotate(-90deg)'}} /></svg>
                             http://foundation.local:9999
                          </div>
                          
                          {/* Toolbar Actions */}
                           <div className="w-20 flex justify-end gap-3 text-white/30 hidden sm:flex">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                           </div>
                       </div>

                       {/* Main Content (The Web App) */}
                       <div className="flex-1 flex flex-col md:flex-row bg-black overflow-hidden relative">
                       
                           {/* Sidebar */}
                           <div className="w-full md:w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col pt-6 pb-6 relative">
                              {/* Header/Logo Area */}
                              <div className="px-6 mb-8 mt-2">
                                 <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                    <div className="text-xs font-bold text-white tracking-widest uppercase">Cornerstone<span className="opacity-50">OS</span></div>
                                 </div>
                                 <div className="text-[10px] text-white/30 font-mono mt-2 pl-5">FOUNDATION v1.0.4</div>
                              </div>

                              {/* Nav */}
                              <div className="flex-1 px-4 space-y-0.5">
                                 {Object.keys(views).map(tab => (
                                    <button
                                       key={tab}
                                       onClick={() => setActiveTab(tab)}
                                       className={`w-full text-left px-3 py-2.5 rounded-md text-[11px] font-medium tracking-wide uppercase transition-all flex items-center gap-3 group
                                          ${activeTab === tab ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"}`}
                                    >
                                       <span className={activeTab === tab ? "text-orange-500" : "opacity-30 group-hover:opacity-100 transition-opacity"}>
                                          {Icons[tab] ? Icons[tab]() : <Icons.System />}
                                       </span>
                                       {tab}
                                    </button>
                                 ))}
                              </div>

                              {/* Bottom User Profile */}
                              <div className="px-6 pt-6 border-t border-white/5">
                                 <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                                     <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">N</div>
                                     <div>
                                        <div className="text-[10px] font-bold text-white uppercase tracking-wider">System Status</div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                                           <div className="text-[10px] text-white/50 uppercase">Operational</div>
                                        </div>
                                     </div>
                                 </div>
                              </div>
                           </div>

                           {/* Main Content Area */}
                           <div className="flex-1 flex flex-col bg-black overflow-hidden relative">
                              {/* Top Bar */}
                              <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0A0A]">
                                 <h2 className="text-lg font-medium text-white tracking-wide">{activeTab}</h2>
                                 <div className="hidden md:flex gap-8 text-[10px] font-mono text-white/40">
                                    <div>
                                       <div className="text-right">LOAD AVG</div>
                                       <div className="text-white text-base font-light text-right">0.42</div>
                                    </div>
                                    <div>
                                       <div className="text-right">MEMORY</div>
                                       <div className="text-white text-base font-light text-right">32%</div>
                                    </div>
                                 </div>
                              </div>

                              {/* View Container */}
                              <div className="flex-1 overflow-hidden relative bg-black">
                                 <motion.div 
                                    key={activeTab}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                 >
                                    <ActiveView />
                                 </motion.div>
                              </div>
                           </div>

                       </div>
                    </motion.div>

                    {/* Dock */}
                    <motion.div 
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                        className="absolute bottom-6 h-14 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center gap-3 px-3 mx-auto shadow-2xl z-30"
                    >
                        {/* Fake App Icons with tooltips/hover effect implied */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#007AFF] to-[#0055BB] shadow-lg flex items-center justify-center text-white text-xl">
                             <div className="text-2xl pt-1">☺</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white to-gray-200 shadow-lg flex items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                             <div className="text-blue-500 font-bold text-xs transform -rotate-45">S</div>
                        </div>
                        
                        <div className="w-10 h-10 rounded-xl bg-[#1e1e1e] shadow-lg flex items-center justify-center border border-white/10 relative">
                           <div className="w-4 h-4 rounded-full border-2 border-orange-500"></div>
                        </div>
                        
                        <div className="w-px h-8 bg-white/10 mx-1"></div>
                        
                        <div className="w-10 h-10 rounded-xl bg-[#222] shadow-lg flex items-center justify-center text-white font-mono text-[10px] border border-white/10">
                            Create
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-black text-xs">
                           <div className="w-6 h-1 bg-black rounded-full"></div>
                        </div>
                         {/* Active Dot */}
                        <div className="absolute -bottom-1 left-[111px] w-1 h-1 bg-white/80 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
                    </motion.div>
               </div>
            </div>
         </FadeIn>
      </div>
    </section>
  );
}
