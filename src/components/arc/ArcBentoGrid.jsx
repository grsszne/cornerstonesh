import ArcMockupLogs from "./mockups/ArcMockupLogs";
import ArcMockupShadow from "./mockups/ArcMockupShadow";

export default function ArcBentoGrid() {
  return (
    <section className="relative w-full py-24 bg-[var(--arc-surface-page)] border-t border-[var(--arc-border-subtle)] z-10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-[var(--arc-text-primary)] mb-6 font-light">
            Absolute Control. Zero Overhead.
          </h2>
          <p className="text-lg text-[var(--arc-text-secondary)] font-sans font-light max-w-2xl mx-auto">
            Arc is designed like a professional intelligence tool, not a fluffy SaaS app. Dense, data-rich, and built for speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[420px]">
          
          {/* Main Logs View (2 columns wide) */}
          <div className="md:col-span-2 rounded-2xl border border-[var(--arc-border-subtle)] bg-[var(--arc-surface-card)] overflow-hidden flex flex-col group relative hover:border-[var(--arc-border-default)] transition-colors">
            <div className="p-8 pb-4 border-b border-[var(--arc-border-subtle)] z-10 bg-[var(--arc-surface-card)] drop-shadow-sm">
              <h3 className="text-xl text-[var(--arc-text-primary)] font-sans font-medium mb-2">The Universal Ledger</h3>
              <p className="text-[14px] text-[var(--arc-text-secondary)] font-sans">
                Every prompt, every token, every cent across OpenAI, Anthropic, and Together—unified in one dense, searchable log. You never have to stitch together billing CSVs again.
              </p>
            </div>
            <div className="flex-1 relative bg-[var(--arc-surface-page)] pointer-events-none scale-95 origin-top opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 rounded-b-xl overflow-hidden mt-4 border border-[var(--arc-border-subtle)] shadow-xl ml-8 -mr-8 -mb-8">
              <ArcMockupLogs />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--arc-surface-page)] to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Caching Feature */}
          <div className="md:col-span-1 rounded-2xl border border-[var(--arc-border-subtle)] bg-[var(--arc-moss-bg)] overflow-hidden flex flex-col group hover:border-[var(--arc-moss-fg)] transition-colors relative">
            <div className="p-8 pb-4 z-10">
              <h3 className="text-xl text-[var(--arc-status-healthy)] font-sans font-medium mb-2">Semantic Caching</h3>
              <p className="text-[14px] text-[var(--arc-text-secondary)] font-sans">
                Why pay for the same answer twice? Arc detects semantically identical prompts and serves them directly from memory, slashing your latency to 20ms and your cost to $0.
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-end p-8 gap-3 relative pb-12">
              <div className="w-[85%] bg-[var(--arc-surface-card)] border border-[var(--arc-border-subtle)] p-4 rounded text-[13px] font-mono text-[var(--arc-status-healthy)] translate-y-4 opacity-70 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                &quot;How do I reset my password?&quot;<br/>
                <span className="text-[var(--arc-moss-fg)] mt-2 block">Cost: $0.0051 • Latency: 840ms</span>
              </div>
              <div className="w-[85%] self-end bg-[var(--arc-surface-card)] border border-[var(--arc-border-default)] p-4 rounded text-[13px] font-mono text-[var(--arc-status-healthy)] translate-y-4 shadow-[0_0_30px_var(--arc-status-healthy)]/20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                &quot;I forgot my pass, how to reset?&quot;<br/>
                <span className="text-[var(--arc-status-healthy)] font-bold mt-2 block">CACHE HIT • Cost: $0.00 • 12ms</span>
              </div>
            </div>
          </div>

          {/* Shadow Testing */}
          <div className="md:col-span-3 rounded-2xl border border-[var(--arc-border-subtle)] bg-[var(--arc-surface-card)] overflow-hidden flex flex-col md:flex-row group hover:border-[var(--arc-border-default)] transition-colors">
            <div className="p-8 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[var(--arc-border-subtle)] bg-[var(--arc-surface-card)] z-10">
              <h3 className="text-xl text-[var(--arc-status-warning)] font-sans font-medium mb-2">Risk-Free Shadow Testing</h3>
              <p className="text-[14px] text-[var(--arc-text-secondary)] font-sans mb-6">
                Anthropic drops a cheaper model that claims GPT-4 level intelligence. Don&apos;t guess. Prove it.<br/><br/>
                Route 10% of your real production traffic to the new model invisibly. Arc evaluates the responses in parallel for accuracy and length, giving you a definitive win-rate before you flip the switch.
              </p>
            </div>
            <div className="md:w-2/3 relative bg-[var(--arc-surface-page)] pointer-events-none p-4 pb-0 pl-8 overflow-hidden">
               <div className="origin-top-left scale-[0.85] opacity-80 group-hover:opacity-100 group-hover:scale-[0.9] transition-all duration-700 ease-out h-[500px] border border-[var(--arc-border-subtle)] rounded-xl mt-4 bg-[var(--arc-surface-card)]">
                  <ArcMockupShadow />
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
