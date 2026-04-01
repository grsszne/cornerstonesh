import ArcMockupRoutes from "./mockups/ArcMockupRoutes";
import { Sparkle, TrendDown, RocketLaunch } from "@phosphor-icons/react/dist/ssr";

export default function ArcStartupEconomics() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[var(--arc-surface-page)] border-t border-[var(--arc-border-subtle)] z-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--arc-slate-bg)] text-[var(--arc-slate-fg)] rounded-full font-mono text-[10px] uppercase tracking-wider mb-6">
            <RocketLaunch weight="fill" /> Build fast, scale cheap
          </div>
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight leading-tight text-[var(--arc-text-primary)] mb-6 font-light">
            Don&apos;t get locked into a massive OpenAI bill.
          </h2>
          <p className="text-lg md:text-xl text-[var(--arc-text-secondary)] font-sans font-light leading-relaxed">
            When building an MVP, you need the smartest model available to prove the concept. <span className="text-[var(--arc-text-primary)]">But when thousands of users hit your app, GPT-4o will bankrupt you.</span>
            <br/><br/>
            With Arc, you simply use Auto-Tune to gracefully degrade your internal routes to faster, cheaper models—saving 90% on inference without pushing a single code change.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="p-6 rounded-xl border border-[var(--arc-border-default)] bg-[var(--arc-surface-card)] transition-colors hover:border-[var(--arc-text-tertiary)] group">
              <div className="w-10 h-10 rounded bg-[var(--arc-surface-raised)] border border-[var(--arc-border-default)] flex items-center justify-center mb-4 text-[var(--arc-text-primary)]">
                <Sparkle weight="duotone" size={20} />
              </div>
              <h4 className="text-lg font-sans text-[var(--arc-text-primary)] mb-2">Build with the Best</h4>
              <p className="text-[14px] text-[var(--arc-text-secondary)] font-sans">Start your prompt engineering with frontier models like Claude 3 Opus and GPT-4o. Get the product working perfectly first.</p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--arc-status-healthy)] bg-[var(--arc-surface-card)] shadow-[0_0_30px_var(--arc-status-healthy)]/5 relative group cursor-default">
              <div className="absolute right-6 top-6 text-xs font-mono text-[var(--arc-status-healthy)] opacity-0 group-hover:opacity-100 transition-opacity">Active Strategy</div>
              <div className="w-10 h-10 rounded bg-[var(--arc-moss-bg)] flex items-center justify-center mb-4 text-[var(--arc-status-healthy)] border border-[var(--arc-moss-fg)]/20">
                <TrendDown weight="duotone" size={20} />
              </div>
              <h4 className="text-lg font-sans text-[var(--arc-text-primary)] mb-2">Scale with the Cheapest</h4>
              <p className="text-[14px] text-[var(--arc-text-secondary)] font-sans">Use Arc Auto-Tune to identify routes where GPT-4o Mini performs just as well. Execute the route swap instantly in the dashboard.</p>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 h-[450px] relative rounded-xl border border-[var(--arc-border-subtle)] bg-[var(--arc-surface-card)] overflow-hidden shadow-2xl flex flex-col group hover:border-[var(--arc-border-default)] transition-all">
            <div className="w-full h-12 shrink-0 flex items-center px-4 gap-2 border-b border-[var(--arc-border-default)] bg-[var(--arc-surface-card)]">
              <div className="font-mono text-[10px] text-[var(--arc-text-secondary)] mr-auto">Arc Routing Engine</div>
              <div className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-[var(--arc-status-healthy)]/20 text-[var(--arc-status-healthy)]">Live Config</div>
            </div>
            <div className="flex-1 relative bg-[var(--arc-surface-page)] group-hover:scale-[1.02] transition-transform duration-700 ease-out origin-top">
              <ArcMockupRoutes />
            </div>
            
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[var(--arc-surface-page)] to-transparent pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
