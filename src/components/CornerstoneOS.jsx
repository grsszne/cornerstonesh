"use client";

import { useState, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import { motion } from "framer-motion";

// Mock Data
const SYSTEM_METRICS = [
  { label: "CPU Load", value: "12%", trend: "stable" },
  { label: "Memory", value: "6.4 GB", sub: "/ 16 GB", trend: "stable" },
  { label: "Network Down", value: "450 Mbps", trend: "up" },
  { label: "Network Up", value: "22 Mbps", trend: "down" },
  { label: "Storage Array", value: "Healthy", sub: "RAID 5", trend: "good" },
  { label: "Active Containers", value: "14", trend: "stable" },
];

const PROCESSES = [
  { pid: 8821, user: "root", cpu: "1.2%", mem: "240M", command: "dockerd" },
  { pid: 1102, user: "admin", cpu: "0.8%", mem: "120M", command: "node api-server" },
  { pid: 3321, user: "system", cpu: "0.1%", mem: "44M", command: "journald" },
  { pid: 4002, user: "postgres", cpu: "0.0%", mem: "800M", command: "postgres: worker" },
  { pid: 5501, user: "root", cpu: "0.0%", mem: "12M", command: "cron" },
];

const EMAILS = [
  { 
    from: "Zane", 
    subject: "Q4 Launch Deck - Final Review", 
    time: "10:42 AM", 
    unread: true,
    starred: true,
    preview: "Hey team, I've finished the final pass on the Q4 launch deck...",
    body: "Hey team,\n\nI've finished the final pass on the Q4 launch deck. Can you review slides 12-18? I updated the revenue projections based on Matthew's feedback and added the new product timeline.\n\nLet me know if you have any concerns before we present to the board on Friday.\n\nThanks,\nZane"
  },
  { 
    from: "Emma", 
    subject: "Re: Design System Updates", 
    time: "09:30 AM", 
    unread: true,
    starred: false,
    preview: "Hi! I love the new component library! The button variants...",
    body: "Hi!\n\nI love the new component library! The button variants look great and the spacing tokens are much more consistent now.\n\nOne question - should we update the color palette documentation to reflect the new accent colors? I noticed we're using a different shade of blue in the mockups.\n\nAlso attaching the Figma file with the updated designs.\n\nBest,\nEmma"
  },
  { 
    from: "Stripe", 
    subject: "Payout scheduled for Dec 29", 
    time: "09:15 AM", 
    unread: true,
    starred: false,
    preview: "Your payout of $12,450.00 has been scheduled and will arrive...",
    body: "Your payout of $12,450.00 has been scheduled and will arrive in your bank account on December 29, 2024.\n\nPayout details:\n- Period: Dec 1 - Dec 28, 2024\n- Gross volume: $15,200.00\n- Fees: $2,750.00\n- Net: $12,450.00\n\nView full details in your Stripe Dashboard."
  },
  {
    from: "Matthew",
    subject: "Budget Approval - Q1 2025",
    time: "Yesterday",
    unread: false,
    starred: true,
    preview: "Good news! The board approved our Q1 budget with a 15%...",
    body: "Good news! The board approved our Q1 budget with a 15% increase.\n\nKey highlights:\n- Engineering: +20% for new hires\n- Marketing: +25% for product launch\n- Operations: +10% for infrastructure\n\nLet's schedule a team meeting next week to discuss allocation priorities.\n\nBest,\nMatthew"
  },
  {
    from: "Jake",
    subject: "Why would the Falcons do that?",
    time : "Yesterday",
    unread: false,
    starred: false,
    preview: "Seriously? Michael Penix Jr? Why would the Falcons...",
    body: "Seriously? Michael Penix Jr? Why would the Falcons do that? And they really think he'll be the next Stafford?"
  },

  {
    from: "Paul",
    subject: "Intro: Paul Henderson / Team",
    time: "Yesterday",
    unread: false,
    starred: false,
    preview: "Hi everyone, I wanted to introduce myself as the new VP of...",
    body: "Hi everyone,\n\nI wanted to introduce myself as the new VP of Product. I'm excited to be joining the team and working with all of you.\n\nI come from a background in enterprise SaaS and have spent the last 8 years building developer tools. Looking forward to learning about your workflows and how I can support the team.\n\nLet's grab coffee sometime this week!\n\nCheers,\nPaul"
  },
  {
    from: "Fatima",
    subject: "Team Lunch - Friday 12:30pm",
    time: "Dec 27",
    unread: false,
    starred: false,
    preview: "Hey team! I'm organizing a team lunch this Friday at 12:30pm...",
    body: "Hey team!\n\nI'm organizing a team lunch this Friday at 12:30pm at the new Mediterranean place downtown. They have amazing hummus and falafel!\n\nPlease RSVP by Thursday so I can make a reservation.\n\nLooking forward to it!\nFatima"
  },
  {
    from: "GitHub",
    subject: "[cornerstone/foundation] Security alert: Dependency vulnerability",
    time: "Dec 27",
    unread: false,
    starred: false,
    preview: "A security vulnerability was detected in one of your dependencies...",
    body: "A security vulnerability was detected in one of your dependencies.\n\nAffected package: axios@0.21.1\nSeverity: High\nCVE: CVE-2021-3749\n\nRecommended action: Update to axios@1.6.0 or later\n\nView details: https://github.com/cornerstone/foundation/security/dependabot/1\n\n---\nYou're receiving this because you're watching this repository."
  },
  {
    from: "Jake",
    subject: "Thanks for the birthday wishes!",
    time: "Dec 26",
    unread: false,
    starred: false,
    preview: "Hey everyone! Thank you so much for the birthday surprise...",
    body: "Hey everyone!\n\nThank you so much for the birthday surprise yesterday! I was completely caught off guard. The cake was delicious and I really appreciate all of you taking the time to celebrate with me.\n\nI uploaded all the photos to the shared drive if you want to grab any.\n\nThanks again!\nJake"
  },
  {
    from: "Edgar",
    subject: "Investor Pitch - Practice Session Notes",
    time: "Dec 25",
    unread: false,
    starred: true,
    preview: "Thanks everyone for the feedback on yesterday's practice session...",
    body: "Thanks everyone for the feedback on yesterday's practice session.\n\nKey takeaways:\n1. Shorten the market analysis section (slides 4-6)\n2. Add more concrete metrics to the traction slide\n3. Emphasize the competitive moat more clearly\n4. Practice the demo transition - it felt rushed\n\nI've updated the deck based on your notes. Let's do one more run-through on Thursday before the real pitch on Friday.\n\nEdgar"
  },
  {
    from: "LinkedIn",
    subject: "Your weekly job matches",
    time: "Dec 24",
    unread: false,
    starred: false,
    preview: "Based on your profile, here are 12 jobs you might be interested in...",
    body: "Based on your profile, here are 12 jobs you might be interested in:\n\n• Senior Product Manager at Stripe\n• VP of Engineering at Notion\n• Technical Lead at Figma\n\nView all recommendations: https://linkedin.com/jobs/recommendations\n\n---\nUnsubscribe | Update preferences"
  },
  {
    from: "Alex",
    subject: "Code Review Request - Auth Module",
    time: "Dec 23",
    unread: false,
    starred: false,
    preview: "Hey! I've finished implementing the new authentication flow...",
    body: "Hey!\n\nI've finished implementing the new authentication flow with OAuth2 support. Could you review the PR when you get a chance?\n\nKey changes:\n- Added social login (Google, GitHub)\n- Implemented refresh token rotation\n- Updated session management\n\nPR: https://github.com/cornerstone/foundation/pull/142\n\nThanks!\nAlex"
  },
  {
    from: "Chris",
    subject: "Re: Infrastructure Migration Timeline",
    time: "Dec 22",
    unread: false,
    starred: true,
    preview: "Following up on our discussion about the AWS migration...",
    body: "Following up on our discussion about the AWS migration.\n\nProposed timeline:\n- Week 1: Set up staging environment\n- Week 2-3: Migrate databases with zero downtime\n- Week 4: Switch DNS and monitor\n\nI've allocated extra budget for parallel running both environments during the transition. Let me know if you have concerns.\n\nChris"
  },
  {
    from: "Maya",
    subject: "Design Handoff - Mobile App Redesign",
    time: "Dec 21",
    unread: false,
    starred: false,
    preview: "Hi team! The mobile app redesign is ready for development...",
    body: "Hi team!\n\nThe mobile app redesign is ready for development. I've updated all the Figma files with the final specs.\n\nHighlights:\n- New onboarding flow (3 screens instead of 5)\n- Simplified navigation with bottom tabs\n- Dark mode support throughout\n- Updated component library\n\nFigma: https://figma.com/file/mobile-redesign-v2\n\nLet's sync tomorrow to walk through the flows!\n\nMaya"
  },
  {
    from: "Priya",
    subject: "Q4 Marketing Campaign Results",
    time: "Dec 20",
    unread: false,
    starred: true,
    preview: "Wow! Our Q4 campaign exceeded all expectations...",
    body: "Wow! Our Q4 campaign exceeded all expectations.\n\nKey metrics:\n- 45% increase in signups (target was 30%)\n- CAC down to $42 (from $67)\n- Email open rate: 38% (industry avg: 21%)\n- Social engagement up 120%\n\nThe product launch video hit 100K views in the first week. I'll share the full deck in tomorrow's all-hands.\n\nGreat work everyone!\nPriya"
  },
  {
    from: "Zara",
    subject: "Customer Feedback Summary - December",
    time: "Dec 19",
    unread: false,
    starred: false,
    preview: "Here's the monthly customer feedback roundup...",
    body: "Here's the monthly customer feedback roundup.\n\nTop requests:\n1. Bulk export feature (mentioned by 23 customers)\n2. Mobile app improvements (18 customers)\n3. Advanced filtering options (15 customers)\n\nNPS Score: 68 (up from 62 last month!)\n\nI've created tickets for the top 3 requests and assigned them to the product team.\n\nFull report: https://docs.google.com/customer-feedback-dec\n\nZara"
  },
];

const FILE_STRUCTURE = [
  {
    name: "Documents",
    type: "folder",
    children: [
      { name: "Q4_Launch_Deck_Final.key", size: "12.4 MB", date: "Just now", type: "file" },
      { name: "Project_Alpha_Q3.pdf", size: "2.4 MB", date: "2h ago", type: "file" },
      { name: "contracts_signed_v2.docx", size: "45 KB", date: "Dec 10", type: "file" },
    ]
  },
  {
    name: "Projects",
    type: "folder",
    children: [
      { name: "Site_Assets_Final.zip", size: "142 MB", date: "Yesterday", type: "file" },
      { name: "Emma_Feedback.docx", size: "45 KB", date: "Yesterday", type: "file" },
    ]
  },
  {
    name: "Personal",
    type: "folder",
    children: [
      {
        name: "Photos",
        type: "folder",
        children: [
          { name: "Jake_Birthday_2024/", type: "folder", children: [] },
          { name: "Beach_Trip_July/", type: "folder", children: [] },
        ]
      },
      { name: "Fatimas_Recipes.md", size: "8 KB", date: "Dec 15", type: "file" },
    ]
  },
  {
    name: "Work",
    type: "folder",
    children: [
      { name: "Team_Roadmap_2025.xlsx", size: "156 KB", date: "Dec 26", type: "file" },
    ]
  },
];

export default function CornerstoneOS() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [windowPosition, setWindowPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [expandedFolders, setExpandedFolders] = useState(["Documents", "Personal"]);
  const [hasDiscoveredTabs, setHasDiscoveredTabs] = useState(false);

  useEffect(() => {
    const discovered = localStorage.getItem('cornerstone-tabs-discovered');
    if (discovered) {
      setHasDiscoveredTabs(true);
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (!hasDiscoveredTabs) {
      setHasDiscoveredTabs(true);
      localStorage.setItem('cornerstone-tabs-discovered', 'true');
    }
  };

  return (
    <div 
      className="relative"
      style={{ perspective: "1200px" }}
    >
      {/* Monitor Frame */}
      <div 
        className="bg-foreground/5 border-2 border-foreground/20 rounded-xl p-2 shadow-2xl"
        style={{ 
          transform: "rotateX(2deg)",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Screen Bezel */}
        <div className="bg-muted border border-foreground/10 rounded-lg overflow-hidden">
          {/* Screen Content */}
          <div className="p-6 md:p-10">
            {/* Header / Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-foreground/10 pb-4 gap-4">
              <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="font-serif text-lg">foundation-01.local</span>
              </div>
              
              <div className="flex gap-6 overflow-x-auto">
                  {['Overview', 'Mail', 'Calendar', 'Files', 'Processes'].map((tab, i) => (
                      <motion.button
                          key={tab}
                          onClick={() => handleTabClick(tab)}
                          animate={!hasDiscoveredTabs ? {
                              y: [0, -4, 0],
                          } : {}}
                          transition={{
                              duration: 0.6,
                              repeat: hasDiscoveredTabs ? 0 : Infinity,
                              repeatDelay: 2,
                              delay: i * 0.1
                          }}
                          className={`text-sm font-sans transition-colors whitespace-nowrap ${
                              activeTab === tab 
                              ? "text-foreground font-medium border-b-2 border-foreground pb-1" 
                              : "text-foreground/40 hover:text-foreground"
                          }`}
                      >
                          {tab}
                      </motion.button>
                  ))}
              </div>
            </div>

            {/* Fixed Height Content Container */}
            <div className="h-[500px] overflow-y-auto pr-2">

      {/* Suite Overview Grid */}
      {activeTab === 'Overview' && (
        <div className="space-y-12">
            
            {/* KPI Row - Suite Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                     <div className="text-xs font-sans text-foreground/40 uppercase tracking-widest mb-2">Drive Usage</div>
                     <div className="text-2xl font-serif">234 GB <span className="text-sm font-sans text-foreground/40 ml-1">/ 2TB</span></div>
                </div>
                 <div>
                     <div className="text-xs font-sans text-foreground/40 uppercase tracking-widest mb-2">Inbox</div>
                     <div className="text-2xl font-serif">4 <span className="text-sm font-sans text-foreground/40 ml-1">unread</span></div>
                </div>
                 <div>
                     <div className="text-xs font-sans text-foreground/40 uppercase tracking-widest mb-2">Events Today</div>
                     <div className="text-2xl font-serif">2 <span className="text-sm font-sans text-foreground/40 ml-1">remaining</span></div>
                </div>
                 <div>
                     <div className="text-xs font-sans text-foreground/40 uppercase tracking-widest mb-2">System</div>
                     <div className="text-2xl font-serif text-emerald-600">Healthy</div>
                </div>
            </div>

            {/* Main Content Area - Suite App Previews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Left: Files & Mail */}
                <div className="space-y-12">
                    {/* Files Widget */}
                    <div>
                        <h3 className="font-serif text-lg mb-6 flex items-center justify-between">
                            <span>Recent Files</span>
                            <span className="text-xs font-sans text-foreground/40 uppercase tracking-widest">Drive</span>
                        </h3>
                        <div className="space-y-2">
                             {[
                                { name: "Project_Alpha_Q3.pdf", size: "2.4 MB", date: "Just now" },
                                { name: "Site_Assets_Final.zip", size: "142 MB", date: "2h ago" },
                                { name: "contracts_signed_v2.docx", size: "45 KB", date: "Yesterday" },
                             ].map((file, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-foreground/5 hover:bg-foreground/5 px-2 -mx-2 transition-colors cursor-pointer group">
                                    <span className="text-sm font-sans group-hover:text-foreground/80">{file.name}</span>
                                    <div className="flex gap-4 text-xs font-sans text-foreground/40 tabular-nums">
                                        <span>{file.size}</span>
                                        <span>{file.date}</span>
                                    </div>
                                </div>
                             ))}
                        </div>
                    </div>

                    {/* Mail Widget */}
                    <div>
                         <h3 className="font-serif text-lg mb-6 flex items-center justify-between">
                            <span>Unread Mail</span>
                            <span className="text-xs font-sans text-foreground/40 uppercase tracking-widest">Mail</span>
                        </h3>
                        <div className="space-y-2">
                             {[
                                { from: "Stripe", subject: "Payout scheduled for Dec 29", time: "10:42 AM" },
                                { from: "GitHub", subject: "[cornerstone] Security alert", time: "09:15 AM" },
                             ].map((mail, i) => (
                                <div key={i} className="py-3 border-b border-foreground/5 hover:bg-foreground/5 px-2 -mx-2 transition-colors cursor-pointer group">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">{mail.from}</span>
                                        <span className="text-xs text-foreground/40">{mail.time}</span>
                                    </div>
                                    <div className="text-sm text-foreground/70 group-hover:text-foreground">{mail.subject}</div>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

                 {/* Right: Calendar & Network */}
                 <div className="space-y-12">
                     {/* Calendar Widget */}
                     <div>
                        <h3 className="font-serif text-lg mb-6 flex items-center justify-between">
                            <span>Up Next</span>
                            <span className="text-xs font-sans text-foreground/40 uppercase tracking-widest">Calendar</span>
                        </h3>
                         <div className="border border-foreground/10 bg-background p-6">
                             {/* Mock Day View */}
                             <div className="text-center mb-6 pb-6 border-b border-foreground/5">
                                 <div className="text-4xl font-serif">28</div>
                                 <div className="text-sm font-sans text-foreground/40 uppercase tracking-widest">December, Sunday</div>
                             </div>
                             
                             <div className="space-y-6">
                                 <div className="flex gap-4">
                                     <div className="w-16 text-right text-xs text-foreground/40 pt-1">11:00 AM</div>
                                     <div className="flex-1 bg-blue-500/10 border-l-2 border-blue-500 p-3">
                                         <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Design Review</div>
                                         <div className="text-xs opacity-60">with Engineering Team</div>
                                     </div>
                                 </div>
                                  <div className="flex gap-4">
                                     <div className="w-16 text-right text-xs text-foreground/40 pt-1">02:00 PM</div>
                                     <div className="p-3">
                                         <div className="text-sm font-medium text-foreground/40 italic">No events</div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
      )}

      {/* Processes View (Example of dense data) */}
      {activeTab === 'Processes' && (
          <div>
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="border-b border-foreground/10 text-xs text-foreground/40 uppercase tracking-widest font-sans">
                          <th className="font-normal py-4">PID</th>
                          <th className="font-normal py-4">User</th>
                          <th className="font-normal py-4">CPU</th>
                          <th className="font-normal py-4">Mem</th>
                          <th className="font-normal py-4">Command</th>
                      </tr>
                  </thead>
                  <tbody className="font-sans text-sm">
                      {PROCESSES.map((proc) => (
                          <tr key={proc.pid} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                              <td className="py-3 tabular-nums text-foreground/60">{proc.pid}</td>
                              <td className="py-3">{proc.user}</td>
                              <td className="py-3 tabular-nums">{proc.cpu}</td>
                              <td className="py-3 tabular-nums">{proc.mem}</td>
                              <td className="py-3 font-sans text-xs">{proc.command}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      )}

      {/* Mail View */}
      {activeTab === 'Mail' && (
          <div className="overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg">Inbox</h3>
                  <span className="text-xs font-sans text-foreground/40">{EMAILS.filter(e => e.unread).length} unread</span>
              </div>
              <div className="space-y-0">
                  {EMAILS.map((mail, i) => (
                      <div 
                          key={i} 
                          onClick={() => setSelectedEmail(mail)}
                          className={`py-3 px-3 -mx-3 border-b border-foreground/5 hover:bg-foreground/5 transition-colors cursor-pointer ${mail.unread ? 'bg-foreground/[0.02]' : ''}`}
                      >
                          <div className="flex items-start gap-3 min-w-0">
                              {/* Star Icon */}
                              <div className="pt-0.5 shrink-0">
                                  <span className={`text-sm ${mail.starred ? 'text-yellow-500' : 'text-foreground/20'}`}>
                                      {mail.starred ? '★' : '☆'}
                                  </span>
                              </div>
                              
                              {/* Email Content */}
                              <div className="flex-1 min-w-0 overflow-hidden">
                                  <div className="flex items-baseline justify-between gap-4 mb-1 min-w-0">
                                      <span className={`text-sm truncate flex-1 ${mail.unread ? 'font-semibold' : 'text-foreground/80'}`}>
                                          {mail.from}
                                      </span>
                                      <span className="text-xs text-foreground/40 shrink-0 whitespace-nowrap">{mail.time}</span>
                                  </div>
                                  <div className={`text-sm mb-1 truncate ${mail.unread ? 'font-medium' : 'text-foreground/70'}`}>
                                      {mail.subject}
                                  </div>
                                  <div className="text-xs text-foreground/50 truncate">
                                      {mail.preview}
                                  </div>
                              </div>
                              
                              {/* Unread Indicator */}
                              {mail.unread && (
                                  <div className="pt-1.5 shrink-0">
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                  </div>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Email Window (Draggable) */}
      {selectedEmail && (
          <div 
              className="fixed bg-background border-2 border-foreground/20 rounded-lg shadow-2xl z-50"
              style={{
                  left: `${windowPosition.x}px`,
                  top: `${windowPosition.y}px`,
                  width: '500px',
                  maxWidth: '90vw'
              }}
          >
              {/* Window Title Bar (Draggable) */}
              <div 
                  className="bg-foreground/5 border-b border-foreground/10 px-4 py-3 flex items-center justify-between cursor-move select-none"
                  onMouseDown={(e) => {
                      setIsDragging(true);
                      setDragStart({
                          x: e.clientX - windowPosition.x,
                          y: e.clientY - windowPosition.y
                      });
                  }}
                  onMouseMove={(e) => {
                      if (isDragging) {
                          setWindowPosition({
                              x: e.clientX - dragStart.x,
                              y: e.clientY - dragStart.y
                          });
                      }
                  }}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
              >
                  <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm font-sans font-medium">Mail</span>
                  <button 
                      onClick={() => setSelectedEmail(null)}
                      className="hover:bg-foreground/10 p-1 rounded transition-colors"
                  >
                      <X className="w-4 h-4" />
                  </button>
              </div>

              {/* Email Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                  <div className="mb-4 pb-4 border-b border-foreground/10">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-lg">{selectedEmail.subject}</h3>
                      </div>
                      <div className="flex justify-between text-sm text-foreground/60">
                          <span>From: {selectedEmail.from}</span>
                          <span>{selectedEmail.time}</span>
                      </div>
                  </div>
                  <div className="font-sans text-sm whitespace-pre-wrap leading-relaxed">
                      {selectedEmail.body}
                  </div>
              </div>
          </div>
      )}

      {/* Calendar View */}
      {activeTab === 'Calendar' && (
          <div>
              <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg">December 2024</h3>
                  <div className="flex gap-4 text-sm font-sans">
                      <button className="text-foreground/40 hover:text-foreground">‹ Prev</button>
                      <button className="text-foreground/40 hover:text-foreground">Next ›</button>
                  </div>
              </div>
              {/* Week View */}
              <div className="grid grid-cols-7 gap-1 mb-8">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <div key={i} className="text-center text-xs font-sans text-foreground/40 py-2">{d}</div>
                  ))}
                  {[22, 23, 24, 25, 26, 27, 28].map((day, i) => (
                      <div key={i} className={`text-center py-3 text-sm ${day === 28 ? 'bg-foreground text-background rounded' : 'hover:bg-foreground/5 cursor-pointer rounded'}`}>
                          {day}
                      </div>
                  ))}
              </div>
              {/* Today's Events */}
              <div className="space-y-3">
                  <div className="text-xs font-sans text-foreground/40 uppercase tracking-widest mb-4">Today's Events</div>
                  <div className="flex gap-4">
                      <div className="w-20 text-right text-xs text-foreground/40 pt-1">11:00 AM</div>
                      <div className="flex-1 bg-blue-500/10 border-l-2 border-blue-500 p-3 rounded-r">
                          <div className="text-sm font-medium">Design Review</div>
                          <div className="text-xs text-foreground/60">with Zane, Emma</div>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <div className="w-20 text-right text-xs text-foreground/40 pt-1">02:00 PM</div>
                      <div className="flex-1 bg-purple-500/10 border-l-2 border-purple-500 p-3 rounded-r">
                          <div className="text-sm font-medium">1:1 with Matthew</div>
                          <div className="text-xs text-foreground/60">Q4 Planning</div>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <div className="w-20 text-right text-xs text-foreground/40 pt-1">04:30 PM</div>
                      <div className="flex-1 bg-emerald-500/10 border-l-2 border-emerald-500 p-3 rounded-r">
                          <div className="text-sm font-medium">Edgar's Pitch Practice</div>
                          <div className="text-xs text-foreground/60">Conference Room A</div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Files View */}
      {activeTab === 'Files' && (
          <div>
              <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-lg">Files</h3>
                  <span className="text-xs font-sans text-foreground/40">234 GB / 2 TB used</span>
              </div>
              <div className="space-y-1">
                  {FILE_STRUCTURE.map((item, i) => (
                      <FileTreeItem 
                          key={i} 
                          item={item} 
                          level={0}
                          expandedFolders={expandedFolders}
                          setExpandedFolders={setExpandedFolders}
                      />
                  ))}
              </div>
          </div>
      )}

            </div>
          </div>
        </div>
      </div>
      {/* Monitor Stand */}
      <div className="flex justify-center mt-2">
          <div className="h-2 bg-foreground/10 rounded-full w-24"></div>
      </div>
    </div>
  );
}

// Recursive File Tree Component
function FileTreeItem({ item, level, expandedFolders, setExpandedFolders }) {
  const isExpanded = expandedFolders.includes(item.name);
  const indent = level * 20;

  const toggleFolder = () => {
    if (item.type === 'folder') {
      setExpandedFolders(prev => 
        prev.includes(item.name) 
          ? prev.filter(f => f !== item.name)
          : [...prev, item.name]
      );
    }
  };

  return (
    <>
      <div 
        className="flex justify-between items-center py-2 border-b border-foreground/5 hover:bg-foreground/5 px-3 -mx-3 transition-colors cursor-pointer"
        style={{ paddingLeft: `${indent + 12}px` }}
        onClick={toggleFolder}
      >
        <div className="flex items-center gap-2">
          {item.type === 'folder' && (
            <span className="text-xs text-foreground/40 w-4">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
          {item.type === 'file' && <span className="w-4"></span>}
          <span className="text-sm font-sans">{item.name}</span>
        </div>
        {item.size && (
          <div className="flex gap-6 text-xs font-sans text-foreground/40 tabular-nums">
            <span className="w-16 text-right">{item.size}</span>
            <span className="w-20 text-right">{item.date}</span>
          </div>
        )}
      </div>
      
      {item.type === 'folder' && isExpanded && item.children && (
        <>
          {item.children.map((child, i) => (
            <FileTreeItem 
              key={i}
              item={child}
              level={level + 1}
              expandedFolders={expandedFolders}
              setExpandedFolders={setExpandedFolders}
            />
          ))}
        </>
      )}
    </>
  );
}
