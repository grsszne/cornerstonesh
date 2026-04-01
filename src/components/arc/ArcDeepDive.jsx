import ArcMockupAgents from "./mockups/ArcMockupAgents";
import { TreeStructure } from "@phosphor-icons/react/dist/ssr";

export default function ArcDeepDive() {
  return (
    <section className="relative w-full py-32 bg-[var(--arc-surface-page)] border-t border-[var(--arc-border-subtle)] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--arc-mauve-bg)] opacity-30 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <div className="w-16 h-16 rounded-2xl bg-[var(--arc-surface-card)] border border-[var(--arc-border-default)] flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(107,85,112,0.15)] text-[var(--arc-mauve-fg)]">
          <TreeStructure size={32} weight="duotone" />
        </div>

        <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-[var(--arc-text-primary)] mb-6 font-light text-center max-w-2xl">
          Tame the runaway agent wrapper.
        </h2>
        <p className="text-lg md:text-xl text-[var(--arc-text-secondary)] font-sans font-light text-center max-w-3xl mb-16 leading-relaxed">
          Agentic loops are incredibly powerful. They can also cost $45 in three minutes if a model gets stuck in an infinite tool-call loop. 
          <br/><br/>
          Arc <strong>Workflows</strong> let you group these frantic API calls into unbreachable limits. Set a hard $2.00 cap per trace, and Arc will silently sever the connection the moment reality misbehaves.
        </p>

        <div className="w-full max-w-[900px] h-[550px] relative rounded-2xl border border-[var(--arc-border-strong)] bg-[var(--arc-surface-page)] overflow-hidden shadow-2xl flex flex-col">
          <div className="w-full h-12 shrink-0 flex items-center px-4 gap-2 border-b border-[var(--arc-border-default)] bg-[var(--arc-surface-card)]">
            <div className="w-3 h-3 rounded-full bg-[var(--arc-border-strong)]"></div>
            <div className="w-3 h-3 rounded-full bg-[var(--arc-border-strong)]"></div>
            <div className="w-3 h-3 rounded-full bg-[var(--arc-border-strong)]"></div>
            <div className="font-mono text-[10px] text-[var(--arc-text-secondary)] ml-auto pr-4">Trace Inspector</div>
          </div>
          <div className="flex-1 bg-[var(--arc-surface-page)] relative">
            <ArcMockupAgents />
          </div>
        </div>

      </div>
    </section>
  );
}
