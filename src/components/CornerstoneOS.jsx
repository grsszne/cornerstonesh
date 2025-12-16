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
                    <div className="flex justify-between p-4"><span className="text-white/30">PROCESSOR</span><span>Intel N100 (4-core x86)</span></div>
                    <div className="flex justify-between p-4"><span className="text-white/30">MEMORY</span><span>8GB LPDDR5X-6400</span></div>
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
       { text: "Linux foundation 6.1.0-rpi7-rpi-v8 #1 SMP PREEMPT Debian 1:6.1.21-1+rpt1 (2025-10-24) aarch64", color: "text-white/60" },
       { text: "", type: "break" },
       { text: "The programs included with the Debian GNU/Linux system are free software;", color: "text-white/60" },
       { text: "the exact distribution terms for each program are described in the", color: "text-white/60" },
       { text: "individual files in /usr/share/doc/*/copyright.", color: "text-white/60" },
       { text: "", type: "break" },
       { text: "jakeh@foundation:~$", color: "text-green-500", suffix: " " }, // Prompt start
   ]);

   useEffect(() => {
       const initialDelay = 800;
       
       const commands = [
           { 
               cmd: "docker ps", 
               output: [
                   "CONTAINER ID   IMAGE                    COMMAND                  CREATED        STATUS        PORTS                                       NAMES",
                   "a1b2c3d4e5f6   homeassistant/home-assistant   \"/init\"                  2 weeks ago    Up 2 weeks    0.0.0.0:8123->8123/tcp                      homeassistant",
                   "f5e4d3c2b1a0   plexinc/pms-docker             \"/init\"                  2 weeks ago    Up 2 weeks    0.0.0.0:32400->32400/tcp                    plex",
                   "9a8b7c6d5e4f   pihole/pihole                  \"/s6-init\"               2 weeks ago    Up 2 weeks    0.0.0.0:53->53/tcp, 0.0.0.0:80->80/tcp      pihole"
               ]
           },
           {
               cmd: "free -h",
               output: [
                   "               total        used        free      shared  buff/cache   available",
                   "Mem:           7.6Gi       1.2Gi       2.1Gi       121Mi       4.3Gi       6.2Gi",
                   "Swap:          1.0Gi          0B       1.0Gi"
               ]
           },
           {
               cmd: "uptime",
               output: [" 11:42:01 up 14 days,  3:22,  1 user,  load average: 0.12, 0.08, 0.05"]
           },
           {
               cmd: "git pull",
               output: [
                   "remote: Enumerating objects: 15, done.",
                   "remote: Counting objects: 100% (15/15), done.",
                   "remote: Compressing objects: 100% (4/4), done.",
                   "Unpacking objects: 100% (15/15), 4.21 KiB | 2.15 MiB/s, done.",
                   "From github.com:cornerstone/foundation",
                   "   8a2b3c...9d8e7f  main       -> origin/main",
                   "Updating 8a2b3c...9d8e7f",
                   "Fast-forward",
                   " src/components/Dashboard.jsx | 45 +++++++++++++++++++++++++++",
                   " 1 file changed, 45 insertions(+)"
               ]
           },
           {
               cmd: "tail -n 5 /var/log/syslog",
               output: [
                   "Dec 13 11:30:01 foundation CRON[1234]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)",
                   "Dec 13 11:35:42 foundation systemd[1]: Starting Daily apt upgrade and clean activities...",
                   "Dec 13 11:35:44 foundation systemd[1]: apt-daily-upgrade.service: Succeeded.",
                   "Dec 13 11:35:44 foundation systemd[1]: Finished Daily apt upgrade and clean activities.",
                   "Dec 13 11:40:01 foundation CRON[1356]: (root) CMD (   [ -x /opt/rsync_backup.sh ] && /opt/rsync_backup.sh)"
               ]
           },
           {
               cmd: "ls -la",
               output: [
                   "total 48",
                   "drwxr-xr-x 6 jakeh jakeh 4096 Dec 12 09:21 .",
                   "drwxr-xr-x 3 root root 4096 Oct 24 10:00 ..",
                   "-rw------- 1 jakeh jakeh 1234 Dec 13 08:00 .bash_history",
                   "-rw-r--r-- 1 jakeh jakeh  220 Oct 24 10:00 .bash_logout",
                   "-rw-r--r-- 1 jakeh jakeh 3526 Oct 24 10:00 .bashrc",
                   "drwxr-xr-x 3 jakeh jakeh 4096 Nov 01 14:22 .config",
                   "drwxr-xr-x 2 jakeh jakeh 4096 Dec 10 11:15 docker-compose",
                   "-rw-r--r-- 1 jakeh jakeh  807 Oct 24 10:00 .profile"
               ]
           },
           {
               cmd: "neofetch",
               output: [
                   "Foundation",
                   "OS: Debian GNU/Linux 12 (bookworm)"
               ]
           },
           {
               cmd: "ping cornerstone.sh",
               output: [
                "PING cornerstone.sh (34.121.172.232) 56(84) bytes of data.",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=1 ttl=53 time=123 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=2 ttl=53 time=124 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=3 ttl=53 time=125 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=4 ttl=53 time=126 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=5 ttl=53 time=127 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=6 ttl=53 time=128 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=7 ttl=53 time=129 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=8 ttl=53 time=130 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=9 ttl=53 time=131 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=10 ttl=53 time=132 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=11 ttl=53 time=133 ms",
                "64 bytes from cornerstone.sh (34.121.172.232): icmp_seq=12 ttl=53 time=134 ms",
               ]
           }
       ];

       let isMounted = true;

       const typeCommand = async (text) => {
           for (let i = 0; i < text.length; i++) {
               if (!isMounted) return;
               await new Promise(r => setTimeout(r, Math.random() * 50 + 30)); // Random typing speed equivalent to 30-80ms
               setLines(prev => {
                   const newLines = [...prev];
                   // Append char to the last line (which is the active prompt)
                   const lastLine = newLines[newLines.length - 1];
                   newLines[newLines.length - 1] = { 
                       ...lastLine, 
                       text: lastLine.text + text[i],
                       color: "text-white" // Ensure typing color is white
                   };
                   return newLines;
               });
           }
       };

       const runTerminal = async () => {
           // Initial start delay
           await new Promise(r => setTimeout(r, initialDelay));

           while (isMounted) {
               // Pick a random command
               const randomCommand = commands[Math.floor(Math.random() * commands.length)];
               
               // Type the command
               await typeCommand(randomCommand.cmd);
               
               // Delay before execution (simulating enter key/processing)
               await new Promise(r => setTimeout(r, 400));
               
               if (!isMounted) return;

               // Show output
               // Add output lines
               setLines(prev => [
                   ...prev,
                   ...randomCommand.output.map(line => ({ text: line, color: "text-white/80" })),
                   { text: "", type: "break" }, // Spacer
                   { text: "jakeh@foundation:~$ ", color: "text-green-500", suffix: "" } // New Prompt
               ]);

               // Wait before starting next command
               await new Promise(r => setTimeout(r, Math.random() * 2000 + 1000));
           }
       };

       runTerminal();

       return () => { isMounted = false; };
   }, []);

   const containerRef = useRef(null);
   useEffect(() => {
       if (containerRef.current) {
           containerRef.current.scrollTop = containerRef.current.scrollHeight;
       }
   }, [lines]);

   return (
      <div ref={containerRef} className="p-6 h-full font-mono text-[11px] md:text-xs text-white/80 bg-[#0A0A0A] overflow-y-auto custom-scrollbar">
         {lines.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap mb-1 break-all ${line.color || "text-white/80"}`}>
                {line.text}
                {i === lines.length - 1 && (
                    <motion.span 
                       animate={{ opacity: [1, 1, 0, 0] }}
                       transition={{ 
                         duration: 1, 
                         repeat: Infinity, 
                         times: [0, 0.5, 0.5, 1],
                         ease: "linear" 
                       }}
                       className="w-2 h-4 bg-white/50 inline-block align-middle ml-0.5"
                    />
                )}
            </div>
         ))}
         
         <div className="mt-12 pt-4 border-t border-white/10 text-white/30 text-[10px]">
             <div>TERMINAL SESSION: SSH</div>
             <ul className="list-disc pl-4 mt-2 space-y-1">
                 <li>Connected to foundation.local (192.168.1.100)</li>
                 <li>Port 22 (SSH)</li>
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
               An interface that gives you control.
            </h2>
            <p className="text-lg text-black/60 dark:text-white/60 font-mono">
               The control you expect from a server. The polish you expect from us.
            </p>
         </FadeIn>

         <FadeIn delay={0.2}>
            {/* Desktop Environment Container */}
            <div className="relative w-full h-[700px] md:h-[900px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black select-none">
               
               {/* Realistic Wallpaper */}
               <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ duration: 1, ease: "easeOut" }}
                   className="absolute inset-0 bg-white dark:bg-black transition-colors duration-500"
               >
                   {/* Dark Mode Wallpaper */}
                   <img 
                       src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       className="w-full h-full object-cover opacity-80 hidden dark:block"
                       alt="Wallpaper Dark" 
                   />
                   <div className="absolute inset-0 bg-black/20 hidden dark:block" /> 

                    {/* Light Mode Wallpaper */}
                   <img 
                       src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                       className="w-full h-full object-cover opacity-90 dark:hidden"
                       alt="Wallpaper Light" 
                   />
               </motion.div>

               {/* macOS-like Menu Bar */}
               <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  className="relative z-20 h-8 bg-white/40 dark:bg-black/40 backdrop-blur-md border-b border-black/5 dark:border-white/5 flex items-center justify-between px-4 text-[13px] font-medium text-black dark:text-white shadow-sm shrink-0 transition-colors duration-300"
               >
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
               </motion.div>

               {/* The Window Container - Fixed Layout */}
               <div className="relative z-10 w-full h-full">
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="absolute inset-4 md:inset-12 md:bottom-28 bottom-24 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col ring-1 ring-white/5"
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
                       <div className="flex-1 flex flex-col md:flex-row bg-black overflow-hidden relative min-h-0">
                       
                           {/* Sidebar */}
                           <div className="w-full md:w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col pt-6 pb-6 relative shrink-0">
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
                           <div className="flex-1 flex flex-col bg-black overflow-hidden relative min-h-0">
                              {/* Top Bar */}
                              <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0A0A] shrink-0">
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
                              <div className="flex-1 overflow-hidden relative bg-black min-h-0">
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
                        initial={{ y: 60, opacity: 0, x: "-50%" }}
                        animate={{ y: 0, opacity: 1, x: "-50%" }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 18 }}
                        className="absolute bottom-6 left-1/2 h-16 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center gap-3 px-4 mx-auto shadow-2xl z-50 origin-center"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Finder_Icon_macOS_Tahoe.png" className="w-10 h-10 hover:-translate-y-2 transition-transform duration-200" alt="Finder" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/2057px-Safari_browser_logo.svg.png" className="w-10 h-10 hover:-translate-y-2 transition-transform duration-200" alt="Safari" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/1024px-Apple_Music_icon.svg.png" className="w-10 h-10 hover:-translate-y-2 transition-transform duration-200" alt="Music" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png" className="w-10 h-10 hover:-translate-y-2 transition-transform duration-200" alt="VS Code" />
                        <img src="https://github.com/kicad.png" className="w-10 h-10 hover:-translate-y-2 transition-transform duration-200 rounded-lg" alt="KiCad" />
                        
                        <div className="w-px h-10 bg-white/10 mx-1"></div>
                        
                        <img src="https://upload.wikimedia.org/wikipedia/en/2/23/System_Preferences_icon.png" className="w-10 h-10 hover:-translate-y-2 transition-transform duration-200" alt="Settings" />

                         {/* Active Dot under Safari since we are in a browser frame */}
                        <div className="absolute bottom-1 left-[70px] w-1 h-1 bg-white/80 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
                    </motion.div>
               </div>
            </div>
         </FadeIn>

         {/* Security & Open Source Section */}
         <FadeIn delay={0.4} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Open Source Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/10 p-8 h-[320px] flex flex-col justify-between hover:border-white/20 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                     </div>
                     <h3 className="text-2xl font-medium text-white mb-3">Truly Open Source.</h3>
                     <p className="text-white/60 font-mono text-sm leading-relaxed">
                        No black boxes. Verify the code yourself on GitHub. Trust is earned through transparency, not promises.
                     </p>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-2 text-white/40 text-xs font-mono group-hover:text-white transition-colors cursor-pointer w-fit">
                     <span>VIEW REPOSITORY</span>
                     <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
            </div>

            {/* Security Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/10 p-8 h-[320px] flex flex-col justify-between hover:border-white/20 transition-colors">
               <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               {/* Background Animated Lock */}
               <div className="absolute -top-6 -right-6 text-white/[0.03] group-hover:text-white/[0.05] transition-colors">
                   <motion.div
                       animate={{ 
                           rotate: [0, 10, 0],
                           scale: [1, 1.05, 1]
                       }}
                       transition={{ 
                           duration: 5, 
                           repeat: Infinity, 
                           ease: "easeInOut" 
                       }}
                   >
                       <svg viewBox="0 0 24 24" fill="currentColor" className="w-64 h-64">
                           <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 0 1 .567-3.677A2.001 2.001 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723z" />
                       </svg>
                   </motion.div>
               </div>

               <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-green-500 group-hover:text-green-400 transition-colors">
                     <motion.svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        initial={false}
                        whileHover={{ scale: 1.1 }}
                     >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                     </motion.svg>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3">Uncompromising security.</h3>
                  <p className="text-white/60 font-mono text-sm leading-relaxed max-w-[95%]">
                     Cornerstone is designed with a privacy-first architecture. Your data never leaves your local network, giving you the convenience of the cloud, without the compromise.
                  </p>
               </div>
               
               <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-green-500 bg-green-500/10 px-3 py-1.5 rounded border border-green-500/20 w-fit">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Privacy Focused
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded border border-blue-500/20 w-fit">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      Local Network
                  </div>
               </div>
            </div>
         </FadeIn>
      </div>
    </section>
  );
}
