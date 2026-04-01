'use client';

import { useEffect, useRef, useState } from 'react';
import ArcMockupLogs from './mockups/ArcMockupLogs';
import ArcMockupRoutes from './mockups/ArcMockupRoutes';
import ArcMockupShadow from './mockups/ArcMockupShadow';
import ArcMockupAgents from './mockups/ArcMockupAgents';

export default function ArcShowcase() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    {
      title: "The Log Ledger",
      description: "Every request through Arc is cataloged. See exactly which model served the request, how many tokens were used, latency, and real-time cost. Arc only logs metadata, never your raw inputs or outputs, keeping your data completely private.",
      mockup: <ArcMockupLogs />
    },
    {
      title: "Intelligent Routing",
      description: "Stop hardcoding provider logic. Define 'Routes' in Arc. Assign a primary model, set up fallback chains (e.g., GPT-4o fails to Claude Sonnet), and enable exact or semantic caching to drastically cut your API bill.",
      mockup: <ArcMockupRoutes />
    },
    {
      title: "Shadow Mode",
      description: "Thinking about switching models? Deploy a new model in Shadow Mode. Arc routes a percentage of real traffic to the new model in parallel, evaluating its responses for accuracy and conciseness without ever exposing it to your users.",
      mockup: <ArcMockupShadow />
    },
    {
      title: "Agent Orchestration",
      description: "Tame runaway agent loops. Define strict budgets, maximum durations, and call limits per workflow. Traces give you a beautiful waterfall view of every tool call, reasoning step, and the exact cost of a full agentic run.",
      mockup: <ArcMockupAgents />
    }
  ];

  return (
    <section className="relative w-full bg-[var(--arc-surface-page)] z-10 py-12" ref={containerRef}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row relative">
        
        {/* Left column: Text sections */}
        <div className="w-full lg:w-[40%] relative z-20 pb-[50vh]">
          {sections.map((section, idx) => (
            <ShowcaseText 
              key={idx} 
              index={idx} 
              section={section} 
              isActive={activeIndex === idx}
              onActive={() => setActiveIndex(idx)} 
            />
          ))}
        </div>

        {/* Right column: Sticky Mockup Viewer */}
        <div className="hidden lg:block w-full lg:w-[60%] lg:sticky lg:top-0 lg:h-screen pt-24 pb-24 lg:pl-16">
          <div className="w-full h-full max-h-[800px] relative rounded-xl border border-[var(--arc-border-subtle)] bg-[var(--arc-surface-page)] overflow-hidden shadow-2xl flex flex-col p-1.5 pt-0">
            {/* Fake browser/dashboard header */}
            <div className="w-full h-12 shrink-0 flex items-center px-4 gap-2 border-b border-[var(--arc-border-default)]">
              <div className="w-3 h-3 rounded-full bg-[var(--arc-border-strong)]"></div>
              <div className="w-3 h-3 rounded-full bg-[var(--arc-border-strong)]"></div>
              <div className="w-3 h-3 rounded-full bg-[var(--arc-border-strong)]"></div>
              <div className="mx-auto w-64 h-6 rounded bg-[var(--arc-surface-raised)] border border-[var(--arc-border-default)] flex items-center justify-center">
                 <span className="font-mono text-[9px] text-[var(--arc-text-tertiary)] tracking-widest uppercase">Arc Intelligence</span>
              </div>
            </div>

            {/* Mockup Content inside the dashboard window */}
            <div className="flex-1 w-full bg-[var(--arc-surface-page)] overflow-hidden relative">
              {sections.map((section, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-500 ease-out ${activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                  {section.mockup}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ShowcaseText({ index, section, isActive, onActive }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActive();
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [onActive]);

  return (
    <div 
      ref={ref} 
      className="min-h-[70vh] flex flex-col justify-center transition-opacity duration-500"
      style={{ opacity: isActive ? 1 : 0.3 }}
    >
      <div>
        <h3 className="text-3xl lg:text-4xl font-sans tracking-tight text-[var(--arc-text-primary)] mb-6 font-light">
          {section.title}
        </h3>
        <p className="text-lg text-[var(--arc-text-secondary)] font-sans font-light leading-relaxed max-w-lg">
          {section.description}
        </p>
      </div>
    </div>
  );
}
