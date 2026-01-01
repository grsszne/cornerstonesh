"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TABS = ['Overview', 'Mail', 'Calendar', 'Files', 'Notes', 'Network'];

export default function IntegrationsDemo() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [step, setStep] = useState(0);
  const containerRef = useRef(null);
  const tabRefs = useRef([]);

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      await wait(2000);

      // Click through tabs
      for (let i = 0; i < TABS.length; i++) {
        const tabButton = tabRefs.current[i];
        const container = containerRef.current;

        if (tabButton && container) {
          const containerRect = container.getBoundingClientRect();
          const tabRect = tabButton.getBoundingClientRect();

          const relativeX = tabRect.left - containerRect.left + tabRect.width / 2;
          const relativeY = tabRect.top - containerRect.top + tabRect.height / 2;

          moveCursorTo(relativeX, relativeY);
        }

        await wait(600);
        click();
        setActiveTab(TABS[i]);
        await wait(2500);
      }

      // Reset
      setStep(s => s + 1);
    };

    sequence();
  }, [step]);

  const moveCursorTo = (x, y) => {
    setCursorPosition({ x, y });
  };

  const click = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div
      ref={containerRef}
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
          <div className="p-4 sm:p-6 md:p-10">
            {/* Header / Tabs */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 border-b border-foreground/10 pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="font-serif text-sm sm:text-lg">foundation-01.local</span>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-6 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
                {TABS.map((tab, index) => (
                  <button
                    key={tab}
                    ref={(el) => (tabRefs.current[index] = el)}
                    className={`text-xs sm:text-sm font-sans transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab
                        ? 'text-foreground font-medium border-b-2 border-foreground pb-1'
                        : 'text-foreground/40 hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Fixed Height Content Container */}
            <div className="h-[350px] sm:h-[400px] md:h-[500px] overflow-y-auto pr-1 sm:pr-2">
        {activeTab === 'Overview' && (
          <div className="space-y-6 sm:space-y-10">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              <Stat label="Drive Usage" value="234 GB" sub="/ 2TB" />
              <Stat label="Inbox" value="4" sub="unread" />
              <Stat label="Events Today" value="2" sub="remaining" />
              <Stat label="System" value="Healthy" color="emerald" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Recent Files */}
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  <h3 className="font-serif text-base sm:text-lg">Recent Files</h3>
                  <span className="text-[10px] sm:text-xs font-sans text-foreground/40 uppercase tracking-widest">Drive</span>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <FileItem name="Project_Alpha_Q3.pdf" size="2.4 MB" date="Just now" />
                  <FileItem name="Site_Assets_Final.zip" size="142 MB" date="2h ago" />
                  <FileItem name="contracts_signed_v2.docx" size="45 KB" date="Yesterday" />
                </div>
              </div>

              {/* Up Next */}
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  <h3 className="font-serif text-base sm:text-lg">Up Next</h3>
                  <span className="text-[10px] sm:text-xs font-sans text-foreground/40 uppercase tracking-widest">Calendar</span>
                </div>
                <div className="border border-foreground/10 bg-foreground/[0.02] p-3 sm:p-6 rounded-lg">
                  <div className="text-center mb-3 sm:mb-6 pb-3 sm:pb-6 border-b border-foreground/5">
                    <div className="text-2xl sm:text-4xl font-serif">28</div>
                    <div className="text-xs sm:text-sm font-sans text-foreground/40 uppercase tracking-widest">December, Sunday</div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <Event time="11:00 AM" title="Design Review" desc="with Engineering Team" />
                    <div className="flex gap-2 sm:gap-4">
                      <div className="w-12 sm:w-20 text-right text-[10px] sm:text-xs text-foreground/40 pt-1">02:00 PM</div>
                      <div className="text-xs sm:text-sm text-foreground/40 italic">No events</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unread Mail */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="font-serif text-base sm:text-lg">Unread Mail</h3>
                <span className="text-[10px] sm:text-xs font-sans text-foreground/40 uppercase tracking-widest">Mail</span>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <MailItem from="Stripe" subject="Payout scheduled for Dec 29" time="10:42 AM" />
                <MailItem from="GitHub" subject="[cornerstone] Security alert" time="09:15 AM" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Mail' && (
          <div className="space-y-6 sm:space-y-10">
            {/* Mail Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              <Stat label="Inbox" value="27" sub="total" />
              <Stat label="Unread" value="4" sub="new" />
              <Stat label="Flagged" value="12" sub="items" />
              <Stat label="Drafts" value="3" sub="saved" />
            </div>

            {/* Unread Section */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="font-serif text-base sm:text-lg">Unread</h3>
                <span className="text-[10px] sm:text-xs font-sans text-foreground/40 uppercase tracking-widest">4 Messages</span>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <MailItemDetailed
                  from="GitHub"
                  subject="New pull request #432"
                  preview="Zane has opened a new pull request that adds user authentication to the dashboard component..."
                  time="10:42 AM"
                  hasAttachment={false}
                />
                <MailItemDetailed
                  from="Stripe"
                  subject="Payment succeeded"
                  preview="Your payout of $2,847.00 has been initiated and will arrive in 2-3 business days..."
                  time="10:15 AM"
                  hasAttachment={true}
                />
                <MailItemDetailed
                  from="Emma Chen"
                  subject="Design feedback on new dashboard"
                  preview="I've reviewed the latest mockups and overall they look great. Few notes on the spacing..."
                  time="09:30 AM"
                  hasAttachment={false}
                />
                <MailItemDetailed
                  from="Notion"
                  subject="Your weekly digest"
                  preview="Here's what happened in your workspace this week: 12 pages created, 8 comments..."
                  time="08:00 AM"
                  hasAttachment={false}
                />
              </div>
            </div>

            {/* Recent Section */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="font-serif text-base sm:text-lg">Recent</h3>
                <span className="text-[10px] sm:text-xs font-sans text-foreground/40 uppercase tracking-widest">Today</span>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <MailItem from="Zane" subject="Q4 Launch Deck - Final Review" time="Yesterday" />
                <MailItem from="Linear" subject="Issue assigned: Fix navbar z-index" time="Yesterday" />
                <MailItem from="Figma" subject="You were mentioned in a comment" time="2 days ago" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Calendar' && (
          <div className="space-y-6">
            <Event time="11:00 AM" title="Design Review" desc="with Zane, Emma" />
            <Event time="02:00 PM" title="1:1 with Matthew" desc="Q4 Planning" />
            <Event time="04:30 PM" title="Edgar's Pitch Practice" desc="Conference Room A" />
          </div>
        )}

        {activeTab === 'Files' && (
          <div className="space-y-2">
            <FileItem name="Q4_Launch_Deck.key" size="12.4 MB" date="Just now" />
            <FileItem name="Design_System_v2.fig" size="8.2 MB" date="1h ago" />
            <FileItem name="Product_Roadmap.xlsx" size="245 KB" date="Today" />
            <FileItem name="contracts_signed.docx" size="45 KB" date="Yesterday" />
          </div>
        )}

        {activeTab === 'Notes' && (
          <div className="space-y-6 sm:space-y-10">
            {/* Notes Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              <Stat label="Total Notes" value="142" />
              <Stat label="Edited Today" value="8" />
              <Stat label="Notebooks" value="12" />
              <Stat label="Tags" value="34" />
            </div>

            {/* Recent Notes */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="font-serif text-base sm:text-lg">Recently Edited</h3>
                <span className="text-[10px] sm:text-xs font-sans text-foreground/40 uppercase tracking-widest">Last 7 Days</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <NoteCardDetailed
                  title="Product Strategy 2025"
                  preview="Focus areas: local-first architecture, privacy-centric features, modular hardware ecosystem. Key insights from customer interviews..."
                  date="2 hours ago"
                  wordCount="1,247"
                  tags={["Strategy", "Product"]}
                />
                <NoteCardDetailed
                  title="Design System Guidelines"
                  preview="Typography hierarchy, spacing scale, color tokens, and component patterns. Updated to match new brand direction..."
                  date="Today"
                  wordCount="892"
                  tags={["Design", "Documentation"]}
                />
                <NoteCardDetailed
                  title="Meeting: Q4 Planning"
                  preview="Attendees: Zane, Emma, Matthew. Key decisions: Launch timeline moved to early Q1, focus on stability over features..."
                  date="Yesterday"
                  wordCount="634"
                  tags={["Meeting", "Planning"]}
                />
                <NoteCardDetailed
                  title="Technical Architecture"
                  preview="System design for distributed data sync. Evaluating CRDTs vs operational transform. Pros and cons of each approach..."
                  date="Yesterday"
                  wordCount="2,103"
                  tags={["Engineering", "Architecture"]}
                />
                <NoteCardDetailed
                  title="Weekend Project Ideas"
                  preview="Build a habit tracker with local-first sync, explore WebRTC for peer-to-peer collaboration, experiment with..."
                  date="3 days ago"
                  wordCount="421"
                  tags={["Personal", "Ideas"]}
                />
                <NoteCardDetailed
                  title="Customer Feedback Log"
                  preview="Recurring themes: need for better mobile experience, request for offline mode, concerns about data privacy..."
                  date="5 days ago"
                  wordCount="1,856"
                  tags={["Feedback", "Research"]}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Network' && (
          <div className="space-y-6 sm:space-y-10">
            {/* Network Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              <Stat label="Devices" value="12" sub="online" />
              <Stat label="Bandwidth" value="2.4 GB" sub="today" />
              <Stat label="Latency" value="12ms" sub="avg" />
              <Stat label="Uptime" value="99.8%" color="emerald" />
            </div>

            {/* Connection Status */}
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-6">
                <h3 className="font-serif text-base sm:text-lg">Active Connections</h3>
                <span className="text-[10px] sm:text-xs font-sans text-foreground/40 uppercase tracking-widest">12 Devices</span>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <NetworkDevice
                  name="MacBook Pro"
                  type="Computer"
                  ip="192.168.1.42"
                  connection="WiFi 6E"
                  status="active"
                />
                <NetworkDevice
                  name="iPhone 15 Pro"
                  type="Mobile"
                  ip="192.168.1.38"
                  connection="WiFi 6E"
                  status="active"
                />
                <NetworkDevice
                  name="iPad Air"
                  type="Tablet"
                  ip="192.168.1.51"
                  connection="WiFi 6"
                  status="active"
                />
                <NetworkDevice
                  name="Foundation-02"
                  type="Server"
                  ip="192.168.1.100"
                  connection="10GbE"
                  status="active"
                />
                <NetworkDevice
                  name="Living Room TV"
                  type="Smart Home"
                  ip="192.168.1.67"
                  connection="Ethernet"
                  status="idle"
                />
                <NetworkDevice
                  name="Philips Hue Bridge"
                  type="Smart Home"
                  ip="192.168.1.12"
                  connection="Ethernet"
                  status="active"
                />
              </div>
            </div>

            {/* Network Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  <h3 className="font-serif text-base sm:text-lg">Network Info</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-foreground/5">
                    <span className="text-foreground/60">Network Name</span>
                    <span className="font-medium font-mono text-[10px] sm:text-sm">cornerstone-main</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-foreground/5">
                    <span className="text-foreground/60">Gateway</span>
                    <span className="font-medium font-mono text-[10px] sm:text-sm">192.168.1.1</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-foreground/5">
                    <span className="text-foreground/60">DNS</span>
                    <span className="font-medium font-mono text-[10px] sm:text-sm">1.1.1.1</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  <h3 className="font-serif text-base sm:text-lg">Security</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-foreground/5">
                    <span className="text-foreground/60">Firewall</span>
                    <span className="font-medium text-emerald-600">Active</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-foreground/5">
                    <span className="text-foreground/60">VPN</span>
                    <span className="font-medium text-emerald-600">Connected</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-foreground/5">
                    <span className="text-foreground/60">Encryption</span>
                    <span className="font-medium">WPA3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
            </div>
          </div>

          {/* Animated Cursor */}
          <motion.div
            className="absolute pointer-events-none z-50"
            animate={{
              x: cursorPosition.x,
              y: cursorPosition.y,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.5
            }}
            style={{
              left: -12,
              top: -12
            }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                scale: isClicking ? 0.85 : 1
              }}
              transition={{ duration: 0.1 }}
            >
              <path
                d="M5 3L19 12L12 13L9 21L5 3Z"
                fill="currentColor"
                className="text-foreground"
                stroke="white"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="12"
                cy="12"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-500"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isClicking ? [0, 2] : 0,
                  opacity: isClicking ? [0.8, 0] : 0
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>

      {/* Monitor Stand */}
      <div className="flex justify-center mt-2">
        <div className="h-2 bg-foreground/10 rounded-full w-24"></div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, color }) {
  return (
    <div>
      <div className="text-[10px] sm:text-xs font-sans text-foreground/40 uppercase tracking-widest mb-1 sm:mb-2">{label}</div>
      <div className={`text-lg sm:text-2xl font-serif ${color ? `text-${color}-600` : ''}`}>
        {value}
        {sub && <span className="text-xs sm:text-sm font-sans text-foreground/40 ml-1">{sub}</span>}
      </div>
    </div>
  );
}

function FileItem({ name, size, date }) {
  return (
    <div className="flex justify-between items-center py-2 sm:py-3 border-b border-foreground/5 hover:bg-foreground/5 px-2 -mx-2 transition-colors cursor-pointer">
      <span className="text-xs sm:text-sm font-sans truncate mr-2">{name}</span>
      <div className="flex gap-2 sm:gap-4 text-[10px] sm:text-xs font-sans text-foreground/40 tabular-nums flex-shrink-0">
        <span className="hidden sm:inline">{size}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}

function MailItem({ from, subject, time }) {
  return (
    <div className="py-2 sm:py-3 border-b border-foreground/5 hover:bg-foreground/5 px-2 -mx-2 transition-colors cursor-pointer">
      <div className="flex justify-between mb-1">
        <span className="text-xs sm:text-sm font-medium">{from}</span>
        <span className="text-[10px] sm:text-xs text-foreground/40">{time}</span>
      </div>
      <div className="text-xs sm:text-sm text-foreground/70 truncate">{subject}</div>
    </div>
  );
}

function Event({ time, title, desc }) {
  return (
    <div className="flex gap-2 sm:gap-4">
      <div className="w-12 sm:w-20 text-right text-[10px] sm:text-xs text-foreground/40 pt-1">{time}</div>
      <div className="flex-1 bg-blue-500/10 border-l-2 border-blue-500 p-2 sm:p-3 rounded-r">
        <div className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">{title}</div>
        <div className="text-[10px] sm:text-xs opacity-60">{desc}</div>
      </div>
    </div>
  );
}

function NoteCard({ title, preview }) {
  return (
    <div className="p-3 sm:p-4 border border-foreground/10 rounded-lg hover:border-foreground/30 transition-all cursor-pointer bg-background">
      <div className="font-medium mb-2 text-xs sm:text-sm">{title}</div>
      <div className="text-[10px] sm:text-xs text-foreground/50">{preview}</div>
    </div>
  );
}

function MailItemDetailed({ from, subject, preview, time, hasAttachment }) {
  return (
    <div className="py-2 sm:py-4 border-b border-foreground/5 hover:bg-foreground/5 px-2 -mx-2 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-1 sm:mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-medium">{from}</span>
          {hasAttachment && (
            <span className="text-[10px] sm:text-xs text-foreground/40">📎</span>
          )}
        </div>
        <span className="text-[10px] sm:text-xs text-foreground/40 tabular-nums">{time}</span>
      </div>
      <div className="text-xs sm:text-sm text-foreground mb-1 truncate">{subject}</div>
      <div className="text-[10px] sm:text-xs text-foreground/50 leading-relaxed line-clamp-2 hidden sm:block">{preview}</div>
    </div>
  );
}

function NoteCardDetailed({ title, preview, date, wordCount, tags }) {
  return (
    <div className="p-3 sm:p-4 border border-foreground/10 rounded-lg hover:border-foreground/30 transition-all cursor-pointer bg-background">
      <div className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm">{title}</div>
      <div className="text-[10px] sm:text-xs text-foreground/50 leading-relaxed mb-2 sm:mb-3 line-clamp-2">{preview}</div>
      <div className="flex items-center justify-between text-[10px] sm:text-xs text-foreground/40">
        <div className="flex gap-1 sm:gap-2">
          {tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="bg-foreground/5 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-xs">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-3 tabular-nums">
          <span className="hidden sm:inline">{wordCount} words</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

function NetworkDevice({ name, type, ip, connection, status }) {
  return (
    <div className="flex items-center justify-between py-2 sm:py-3 px-3 sm:px-4 bg-foreground/[0.02] border border-foreground/5 rounded-lg hover:border-foreground/10 transition-colors">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-foreground/20'}`}></div>
        <div>
          <div className="text-xs sm:text-sm font-medium">{name}</div>
          <div className="text-[10px] sm:text-xs text-foreground/40">{type}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px] sm:text-xs font-mono text-foreground/60">{ip}</div>
        <div className="text-[10px] sm:text-xs text-foreground/40">{connection}</div>
      </div>
    </div>
  );
}
