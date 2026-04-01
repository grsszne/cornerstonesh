'use client';

import { Brain, GitMerge, TreeStructure, ArrowArcLeft } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

function tokenize() {
  const tokens = [];
  
  const addString = (str) => {
    str.split(' ').forEach(w => {
      if (w) tokens.push(w);
    });
  };

  addString("Every feature of your app that calls an LLM maps to a");
  tokens.push({ 
    type: 'pill', 
    label: 'Route', 
    icon: GitMerge, 
    color: '#5C9DF5',
    stickers: [
      { id: 'r1', text: 'chatbot', top: '-1.3em', left: '-5%', rotate: '-6deg', delay: 0, origin: 'bottom right' },
      { id: 'r2', text: 'summarizer', top: '1.2em', left: '30%', rotate: '4deg', delay: 150, origin: 'top left' },
      { id: 'r3', text: 'customer-support', top: '-1.4em', right: '-35%', rotate: '12deg', delay: 300, origin: 'bottom left' }
    ]
  });
  addString("— a named, versioned proxy that owns the model, temperature, and fallback logic for that feature. When you chain multiple routes together into an autonomous agent loop, you wrap that chain in a");
  tokens.push({ 
    type: 'pill', 
    label: 'Workflow', 
    icon: TreeStructure, 
    color: 'var(--arc-mauve-fg)',
    stickers: [
      { id: 'w1', text: 'research-agent', top: '-1.4em', left: '-25%', rotate: '-8deg', delay: 0, origin: 'bottom right' },
      { id: 'w2', text: 'code-review', top: '1.2em', right: '-25%', rotate: '8deg', delay: 200, origin: 'top left' }
    ]
  });
  addString("so you can set hard cost and time caps on the entire run. Every individual LLM call inside that workflow is recorded as a");
  tokens.push({ type: 'pill', label: 'Trace', icon: ArrowArcLeft, color: 'var(--arc-status-warning)' });
  addString("— a millisecond waterfall you can inspect and replay. And across all of it, Arc maintains session");
  tokens.push({ type: 'pill', label: 'Memory', icon: Brain, color: 'var(--arc-status-healthy)' });
  addString("so your models always have the right context without you bloating every request with history.");

  return tokens;
}

const tokens = tokenize();

export default function ArcCorePrimitives() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // For a sticky section, the total scrollable distance is container height minus viewport height.
      // We start revealing when the top of the container hits the top of the viewport (rect.top <= 0).
      const totalScroll = rect.height - windowHeight;
      
      // Adding a buffer so it doesn't start revealing exactly at 0 to give user a moment to pause.
      const buffer = windowHeight * 0.2; 
      const scrolled = -rect.top - buffer;
      const effectiveTotal = totalScroll - buffer * 2;
      
      if (scrolled < 0) {
        setProgress(0);
      } else if (scrolled > effectiveTotal) {
        setProgress(1);
      } else {
        setProgress(scrolled / effectiveTotal);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[250vh] bg-[var(--arc-surface-page)] border-t border-[var(--arc-border-subtle)] z-10"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
          
          <div className="mb-12 flex justify-between items-end">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--arc-text-tertiary)] hidden md:block">The Arc Abstractions</p>
            <a href="https://arc.cornerstone.sh/docs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-8 px-4 rounded bg-[var(--arc-surface-raised)] border border-[var(--arc-border-default)] text-[var(--arc-text-primary)] text-xs font-mono uppercase tracking-wider hover:bg-[var(--arc-surface-hover)] transition-colors whitespace-nowrap">
              Read Docs →
            </a>
          </div>

          <div className="text-xl md:text-3xl lg:text-4xl font-sans tracking-tight leading-[1.6] md:leading-[1.6] text-[var(--arc-text-primary)] font-light">
            {tokens.map((token, index) => {
              // We divide tokens across the 0..1 progress spectrum
              // Using a small window rather than a hard cut-off allows for smooth per-word fading.
              const threshold = index / tokens.length;
              // Add a smooth fading window (e.g., each word takes 5% of scroll progress to fully transition color)
              const fadeWindow = 0.05;
              const wordProgress = Math.max(0, Math.min(1, (progress - threshold) / fadeWindow));
              
              // Standard word
              if (typeof token === 'string') {
                return (
                  <span 
                    key={index}
                    // Mix the color manually, or let CSS transition handle it based on a threshold
                  >
                    <span 
                      className="transition-colors duration-[50ms]"
                      style={{ color: wordProgress > 0 ? 'var(--arc-text-primary)' : 'var(--arc-text-tertiary)' }}
                    >
                      {token}{" "}
                    </span>
                  </span>
                );
              }
              
              // Pill token
              const Icon = token.icon;
              const hasStickers = token.stickers && token.stickers.length > 0;
              
              return (
                <span key={index}>
                  <span className="relative inline-block whitespace-nowrap z-20">
                    <span 
                      className="inline-flex items-center gap-[0.2em] px-[0.4em] py-[0.1em] rounded-full bg-[var(--arc-surface-card)] border relative shadow-sm align-middle -translate-y-[0.1em] transition-all duration-[50ms]"
                      style={{ 
                        borderColor: wordProgress > 0 ? token.color : 'var(--arc-border-default)',
                        boxShadow: wordProgress > 0 ? "0 0 20px " + token.color + "20" : 'none'
                      }}
                    >
                      <Icon weight="duotone" className="w-[0.8em] h-[0.8em] transition-colors duration-[50ms]" style={{ color: wordProgress > 0 ? token.color : 'var(--arc-text-tertiary)' }} />
                      <span className="text-[0.65em] tracking-tight font-medium mt-[0.1em] transition-colors duration-[50ms]" style={{ color: wordProgress > 0 ? token.color : 'var(--arc-text-tertiary)' }}>
                        {token.label}
                      </span>
                    </span>
                    
                    {hasStickers && token.stickers.map((st) => {
                      const isActive = wordProgress > 0.5;
                      const isBottom = st.origin.includes('bottom');
                      const isRight = st.origin.includes('right');
                      
                      // Softened base rotation since the wings do the bending heavily
                      const rX = isBottom ? "-15deg" : "15deg";
                      const rY = isRight ? "-10deg" : "10deg";
                      
                      const peeledTransform = `perspective(800px) translateZ(80px) rotateX(${rX}) rotateY(${rY}) rotate(${st.rotate}) scale(0.6)`;
                      const flatTransform = `perspective(800px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotate(${st.rotate}) scale(1)`;

                      const peeledShadow = `${isRight ? '-10px' : '10px'} ${isBottom ? '-10px' : '10px'} 25px rgba(0,0,0,0.6), 0 10px 15px rgba(0,0,0,0.4)`;
                      const flatShadow = `0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)`;

                      const baseStyles = {
                        backgroundColor: `color-mix(in srgb, ${token.color} 15%, var(--arc-surface-card))`,
                        color: `color-mix(in srgb, ${token.color} 90%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${token.color} 30%, transparent)`,
                      };

                      // Abstracting identical content to clone into wings
                      const innerContent = (
                        <div 
                          className="relative px-2 py-0.5 rounded-sm font-mono text-[10px] tracking-tight whitespace-nowrap w-full h-full flex items-center justify-center"
                          style={baseStyles}
                        >
                          <span className="relative z-10">{st.text}</span>
                          
                          {/* Restored Glare Sweep safely clipped by native wing bounds */}
                          <div 
                            className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-[300%] -left-[100%]"
                            style={{
                              transform: isActive ? "skewX(-20deg) translateX(100%)" : "skewX(-20deg) translateX(0%)",
                              transition: `transform 1200ms cubic-bezier(0.25, 1, 0.3, 1) ${st.delay}ms`
                            }}
                          />
                        </div>
                      );

                      return (
                        <span 
                          key={st.id}
                          className="absolute pointer-events-none"
                          style={{
                            top: st.top, left: st.left, right: st.right, bottom: st.bottom,
                            transformOrigin: st.origin,
                            transformStyle: "preserve-3d", // CRITICAL: enables 3D nesting for wings
                            transform: isActive ? flatTransform : peeledTransform,
                            opacity: isActive ? 1 : 0,
                            transition: `transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) ${st.delay}ms, opacity 40ms linear ${st.delay}ms`,
                            zIndex: 30
                          }}
                        >
                          {/* 2D Flat shadow caster mapped loosely below the wings */}
                          <div 
                            className="absolute inset-0 rounded-sm"
                            style={{
                              boxShadow: isActive ? flatShadow : peeledShadow,
                              transition: `box-shadow 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) ${st.delay}ms`
                            }}
                          />

                          {/* Invisible placeholder strictly for natural layout dimensions */}
                          <div className="opacity-0 px-2 py-0.5 font-mono text-[10px] tracking-tight whitespace-nowrap pointer-events-none border border-transparent">
                            {st.text}
                          </div>
                          
                          {/* Left Wing (0-33%) with subpixel overlap masking */}
                          <div 
                            className="absolute inset-0"
                            style={{ 
                              clipPath: "inset(0 66% 0 0)", // overlap slightly past 66.6% to seal cracks
                              transformOrigin: "33.33% center", 
                              transform: isActive ? "rotateY(0deg)" : "rotateY(50deg)", 
                              transition: `transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) ${st.delay}ms`
                            }}
                          >
                            {innerContent}
                            {/* Cylindrical shading illusion */}
                            <div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 pointer-events-none"
                              style={{ opacity: isActive ? 0 : 1, transition: `opacity 1200ms ease ${st.delay}ms` }}
                            />
                          </div>

                          {/* Center Body (33-66%) */}
                          <div 
                            className="absolute inset-0"
                            style={{ 
                              clipPath: "inset(0 33% 0 33%)", // overlap slightly to seal cracks
                              transformOrigin: "center center",
                              transform: "rotateY(0deg)", 
                              transition: `transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) ${st.delay}ms`
                            }}
                          >
                            {innerContent}
                            {/* Ambient occlusion base shadow */}
                            <div 
                              className="absolute inset-0 bg-black/10 pointer-events-none"
                              style={{ opacity: isActive ? 0 : 1, transition: `opacity 1200ms ease ${st.delay}ms` }}
                            />
                          </div>

                          {/* Right Wing (66-100%) with subpixel overlap masking */}
                          <div 
                            className="absolute inset-0"
                            style={{ 
                              clipPath: "inset(0 0 0 66%)", 
                              transformOrigin: "66.66% center", 
                              transform: isActive ? "rotateY(0deg)" : "rotateY(-50deg)", 
                              transition: `transform 1200ms cubic-bezier(0.34, 1.56, 0.64, 1) ${st.delay}ms`
                            }}
                          >
                            {innerContent}
                            {/* Cylindrical shading illusion */}
                            <div 
                              className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/30 pointer-events-none"
                              style={{ opacity: isActive ? 0 : 1, transition: `opacity 1200ms ease ${st.delay}ms` }}
                            />
                          </div>
                        </span>
                      );
                    })}
                  </span>
                  {" "}
                </span>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
