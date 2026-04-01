export default function ArcMockupAgents() {
  const steps = [
    { id: 1, type: 'LLM Call', model: 'gpt-4o', tokens: '1,204', cost: '$0.0120', status: '✓', time: '1.2s' },
    { id: 2, type: 'Tool Call', name: 'search_database', tokens: '—', cost: '—', status: '✓', time: '0.4s' },
    { id: 3, type: 'Memory Load', name: 'ticket_context', tokens: '—', cost: '—', status: '✓', time: '0.1s' },
    { id: 4, type: 'LLM Call', model: 'gpt-4o', tokens: '3,450', cost: '$0.0345', status: '✓', time: '2.8s' },
    { id: 5, type: 'LLM Call', model: 'gpt-4o', tokens: '890', cost: '$0.0089', status: '✓', time: '0.9s' },
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col pt-8">
      <div className="mb-6">
        <h3 className="text-xl text-[var(--arc-text-primary)] font-sans" style={{ fontWeight: 400 }}>Workflow Traces</h3>
        <p className="text-[13px] text-[var(--arc-text-secondary)] font-sans mt-1">
          <span className="font-mono inline-flex items-center gap-1.5" style={{
            fontSize: '10px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '2px 6px',
            borderRadius: '4px',
            background: `var(--arc-mauve-bg)`,
            color: `var(--arc-mauve-fg)`,
            marginRight: '8px'
          }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }}></span>
            Customer Resolution Agent
          </span>
          Trace #89201A
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="p-3 border border-[var(--arc-border-default)] rounded-lg bg-[var(--arc-surface-card)] flex-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-text-tertiary)] block mb-1">Total Cost (Cap: $2.00)</span>
          <div className="text-xl font-mono text-[var(--arc-text-primary)]">$0.0554</div>
          <div className="w-full h-1 bg-[var(--arc-surface-raised)] mt-2 rounded overflow-hidden">
            <div className="h-full bg-[var(--arc-status-healthy)]" style={{ width: '3%' }}></div>
          </div>
        </div>
        <div className="p-3 border border-[var(--arc-border-default)] rounded-lg bg-[var(--arc-surface-card)] flex-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-text-tertiary)] block mb-1">Duration (Cap: 30s)</span>
          <div className="text-xl font-mono text-[var(--arc-text-primary)]">5.4s</div>
          <div className="w-full h-1 bg-[var(--arc-surface-raised)] mt-2 rounded overflow-hidden">
            <div className="h-full bg-[var(--arc-text-secondary)]" style={{ width: '18%' }}></div>
          </div>
        </div>
        <div className="p-3 border border-[var(--arc-border-default)] rounded-lg bg-[var(--arc-surface-card)] flex-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-text-tertiary)] block mb-1">Status</span>
          <div className="text-xl font-sans text-[var(--arc-status-healthy)] flex items-center gap-2 mt-1" style={{ fontWeight: 400 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }}></span>
            Completed
          </div>
        </div>
      </div>

      <div className="flex-1 border border-[var(--arc-border-default)] rounded-lg bg-[var(--arc-surface-card)] p-5 overflow-hidden flex flex-col">
        <h4 className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-text-secondary)] mb-4 border-b border-[var(--arc-border-subtle)] pb-2 flex justify-between">
          <span>Execution Waterfall</span>
          <span className="text-[var(--arc-text-tertiary)]">5 items</span>
        </h4>
        
        <div className="flex-1 overflow-y-auto space-y-1 pr-2">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 py-2 px-3 rounded hover:bg-[var(--arc-surface-raised)] transition-colors group"
              style={{ 
                opacity: 0,
                borderLeft: '2px solid var(--arc-border-subtle)',
                animation: `fade-slide-up 300ms ease-out ${idx * 100 + 300}ms forwards`
              }}
            >
              <div className="w-20 font-mono text-[10px] uppercase text-[var(--arc-text-tertiary)] flex items-center gap-2">
                <span className="text-[var(--arc-status-healthy)]">{step.status}</span>
                {step.time}
              </div>
              <div className="w-24">
                <span className="font-mono text-[10px] text-[var(--arc-text-primary)] px-2 py-1 rounded bg-[var(--arc-surface-page)] border border-[var(--arc-border-subtle)]">
                  {step.type}
                </span>
              </div>
              <div className="flex-1 font-mono text-[11px] text-[var(--arc-text-secondary)]">
                {step.model || step.name}
              </div>
              <div className="w-16 font-mono text-[11px] text-[var(--arc-text-tertiary)] text-right">
                {step.tokens}
              </div>
              <div className="w-16 font-mono text-[11px] text-[var(--arc-text-primary)] text-right">
                {step.cost}
              </div>
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t border-[var(--arc-border-subtle)] flex items-center gap-4 py-2 px-3 opacity-0" style={{ animation: `fade-slide-up 300ms ease-out 900ms forwards` }}>
            <div className="font-sans text-[13px] text-[var(--arc-text-secondary)]">Agent loop terminated successfully. Output generated.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
