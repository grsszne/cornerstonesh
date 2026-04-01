'use client';

export default function ArcProblemSolution() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[var(--arc-surface-page)] border-t border-[var(--arc-border-subtle)] z-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="mb-16 md:mb-24 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight leading-tight text-[var(--arc-text-primary)] mb-6 font-light">
            Building an MVP shouldn&apos;t mean battling SDKs.
          </h2>
          <p className="text-lg md:text-xl text-[var(--arc-text-secondary)] font-sans font-light leading-relaxed">
            Every startup begins with a simple OpenAI call. But as you scale, you inevitably need Anthropic for reasoning, Together AI for open-source speed, and fallback logic for when APIs go down. <br/><br/>
            <span className="text-[var(--arc-text-primary)]">Suddenly, your lean MVP is buried under routing logic.</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-center">
          
          {/* BEFORE: The Mess */}
          <div className="w-full justify-start relative p-8 rounded-2xl bg-[var(--arc-surface-card)] border border-[var(--arc-border-default)] opacity-60">
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EC6A5E]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#F3BF4F]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#61C554]"></div>
            </div>
            <div className="absolute top-3 left-0 right-0 text-center font-mono text-[10px] text-[var(--arc-text-tertiary)] uppercase tracking-wider">The Old Way</div>
            
            <pre className="mt-6 font-mono text-[11px] md:text-[13px] leading-[1.8] overflow-x-auto text-[var(--arc-text-secondary)]">
              <code dangerouslySetInnerHTML={{__html: `import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import Together from 'together-ai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

export async function generate(prompt, model) {
  <span class="text-[var(--arc-text-tertiary)]">// Hardcoded routing mess</span>
  if (model === 'gpt-4o') {
    try {
      return await openai.chat.completions.create({...});
    } catch (e) {
      <span class="text-[var(--arc-text-tertiary)]">// Manual fallback logic</span>
      return await anthropic.messages.create({...}); 
    }
  } else if (model === 'claude-3-opus') {
    return await anthropic.messages.create({...});
  } 
  <span class="text-[var(--arc-text-tertiary)]">// ... 150 more lines</span>
}`}} />
            </pre>
          </div>

          <div className="hidden lg:flex items-center justify-center -mx-4 z-20">
            <div className="w-12 h-12 rounded-full bg-[var(--arc-surface-page)] border border-[var(--arc-border-strong)] flex items-center justify-center shadow-xl">
              <span className="font-mono text-[10px] text-[var(--arc-text-primary)]">VS</span>
            </div>
          </div>

          {/* AFTER: Arc */}
          <div className="w-full relative p-8 rounded-2xl bg-[var(--arc-surface-card)] border border-[var(--arc-status-healthy)] shadow-2xl shadow-[var(--arc-status-healthy)]/5">
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--arc-border-strong)]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--arc-border-strong)]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--arc-border-strong)]"></div>
            </div>
            <div className="absolute top-3 left-0 right-0 text-center font-mono text-[10px] text-[var(--arc-status-healthy)] uppercase tracking-wider font-bold">The Arc Way</div>
            
            <pre className="mt-6 font-mono text-[11px] md:text-[13px] leading-[1.8] overflow-x-auto text-[var(--arc-text-primary)]">
              <code dangerouslySetInnerHTML={{__html: `import OpenAI from 'openai';

<span class="text-[var(--arc-text-tertiary)]">// 1. Drop in your Arc key.</span>
<span class="text-[var(--arc-text-tertiary)]">// 2. Point to the Arc proxy.</span>
<span class="text-[var(--arc-text-tertiary)]">// 3. That's literally it.</span>
const arc = new OpenAI({ 
  apiKey: process.env.ARC_API_KEY,
  baseURL: 'https://arc.cornerstone.sh/v1' 
});

export async function generate(prompt) {
  return await arc.chat.completions.create({
    model: 'gpt-4o', <span class="text-[var(--arc-text-tertiary)]">// Ignored by Arc</span>
    messages: [{ role: 'user', content: prompt }]
  }, {
    headers: { 'X-Arc-Route': 'my-startup-mvp' }
  });
}`}} />
            </pre>

            <div className="mt-8 pt-6 border-t border-[var(--arc-border-subtle)] flex gap-4 text-[12px] font-mono text-[var(--arc-text-secondary)]">
              <div className="flex items-center gap-2"><span className="text-[var(--arc-status-healthy)]">✓</span> UI-driven Fallbacks</div>
              <div className="flex items-center gap-2"><span className="text-[var(--arc-status-healthy)]">✓</span> Centralized Spend</div>
              <div className="flex items-center gap-2"><span className="text-[var(--arc-status-healthy)]">✓</span> Zero Code Changes</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
