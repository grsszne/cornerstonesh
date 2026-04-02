export default function ArcPricing() {
  return (
    <section className="relative w-full py-24 bg-[var(--arc-surface-page)] border-t border-[var(--arc-border-subtle)] z-10 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[var(--arc-text-primary)] mb-4 font-light">
            Simple, predictable pricing.
          </h2>
          <p className="text-lg text-[var(--arc-text-secondary)] font-serif font-light">
            Never pay a variable tax on your AI inference. Just a flat monthly rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          
          {/* Developer Tier */}
          <div className="flex flex-col p-8 rounded-2xl border border-[var(--arc-border-subtle)] bg-[var(--arc-surface-card)] hover:border-[var(--arc-border-default)] transition-all">
            <h3 className="text-xl font-sans font-medium text-[var(--arc-text-primary)] mb-2">Developer</h3>
            <p className="text-sm text-[var(--arc-text-secondary)] mb-8">Perfect for single founders and side projects.</p>
            <div className="mb-8">
              <span className="text-5xl font-sans tracking-tight text-[var(--arc-text-primary)] font-light">$9</span>
              <span className="text-[var(--arc-text-secondary)] ml-2">/ month</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center text-[15px] text-[var(--arc-text-secondary)] font-sans">
                <span className="text-[var(--arc-status-healthy)] mr-3">✓</span> Up to 100,000 requests/month
              </li>
              <li className="flex items-center text-[15px] text-[var(--arc-text-secondary)] font-sans">
                <span className="text-[var(--arc-status-healthy)] mr-3">✓</span> Standard Routing & Fallbacks
              </li>
              <li className="flex items-center text-[15px] text-[var(--arc-text-secondary)] font-sans">
                <span className="text-[var(--arc-status-healthy)] mr-3">✓</span> 7-day Log Retention
              </li>
              <li className="flex items-center text-[15px] text-[var(--arc-text-secondary)] font-sans">
                <span className="text-[var(--arc-status-healthy)] mr-3">✓</span> Community Support
              </li>
            </ul>
            
            <button className="w-full h-11 rounded-lg border border-[var(--arc-border-strong)] bg-[var(--arc-surface-raised)] text-[var(--arc-text-primary)] font-sans font-medium transition-colors hover:bg-[var(--arc-surface-hover)]">
              Start Free Trial
            </button>
          </div>

          {/* Pro Tier */}
          <div className="flex flex-col p-8 rounded-2xl border border-[var(--arc-text-primary)] bg-[var(--arc-surface-card)] shadow-2xl relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--arc-text-primary)] text-[var(--arc-surface-page)] rounded-full text-xs font-sans font-medium uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-xl font-sans font-medium text-[var(--arc-text-primary)] mb-2">Pro</h3>
            <p className="text-sm text-[var(--arc-text-secondary)] mb-8">For scaling startups and production agentic loops.</p>
            <div className="mb-8">
              <span className="text-5xl font-sans tracking-tight text-[var(--arc-text-primary)] font-light">$35</span>
              <span className="text-[var(--arc-text-secondary)] ml-2">/ month</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center text-[15px] text-[var(--arc-text-secondary)] font-sans">
                <span className="text-[var(--arc-text-primary)] mr-3">✓</span> Unlimited requests
              </li>
              <li className="flex items-center text-[15px] text-[var(--arc-text-secondary)] font-sans">
                <span className="text-[var(--arc-text-primary)] mr-3">✓</span> Agent Workflows & Traces
              </li>
              <li className="flex items-center text-[15px] text-[var(--arc-text-secondary)] font-sans">
                <span className="text-[var(--arc-text-primary)] mr-3">✓</span> Semantic Caching & Shadow Mode
              </li>
              <li className="flex items-center text-[15px] text-[var(--arc-text-secondary)] font-sans">
                <span className="text-[var(--arc-text-primary)] mr-3">✓</span> 90-day Log Retention
              </li>
            </ul>
            
            <button className="w-full h-11 rounded-lg bg-[var(--arc-text-primary)] text-[var(--arc-surface-page)] font-sans font-medium transition-opacity hover:opacity-90">
              Upgrade to Pro
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
