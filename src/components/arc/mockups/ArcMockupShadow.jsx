export default function ArcMockupShadow() {
  const evaluateScores = [
    { metric: 'Accuracy', pWidth: '85%', sWidth: '82%', highlight: true },
    { metric: 'Conciseness', pWidth: '60%', sWidth: '94%', highlight: false },
    { metric: 'Completeness', pWidth: '91%', sWidth: '88%', highlight: true },
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col pt-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="text-xl text-[var(--arc-text-primary)] font-sans flex items-center gap-3" style={{ fontWeight: 400 }}>
            Shadow Evaluation
            <span className="font-mono flex items-center gap-2" style={{
              fontSize: '10px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--arc-status-warning)',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: 'currentColor' }}></span>
              Testing
            </span>
          </h3>
          <p className="text-[13px] text-[var(--arc-text-secondary)] font-sans mt-2 max-w-sm">
            Routing 10% of <span className="text-[var(--arc-text-primary)]">Customer Support</span> traffic to alternative model for quality comparison.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col items-end">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-text-tertiary)] mb-1">Primary</span>
            <span className="font-mono text-[11px] text-[var(--arc-provider-openai)]">gpt-4o</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--arc-text-tertiary)] mt-4">vs</span>
          <div className="flex flex-col items-start">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-status-warning)] mb-1">Shadow</span>
            <span className="font-mono text-[11px] text-[var(--arc-text-primary)]">claude-3-5-sonnet</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 p-4 rounded-lg bg-[var(--arc-surface-raised)] border border-[var(--arc-border-subtle)]">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-text-tertiary)] block mb-2">Primary Win Rate</span>
          <div className="text-2xl font-light text-[var(--arc-text-primary)]">42%</div>
        </div>
        <div className="flex-1 p-4 rounded-lg bg-[var(--arc-surface-raised)] border border-[var(--arc-border-warning-subtle)]" style={{ borderColor: 'var(--arc-status-warning)' }}>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-status-warning)] block mb-2">Shadow Win Rate</span>
          <div className="text-2xl font-light text-[var(--arc-status-warning)]">51%</div>
        </div>
        <div className="flex-1 p-4 rounded-lg bg-[var(--arc-surface-raised)] border border-[var(--arc-border-subtle)]">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-text-tertiary)] block mb-2">Tie Rate</span>
          <div className="text-2xl font-light text-[var(--arc-text-secondary)]">7%</div>
        </div>
      </div>

      <div className="flex-1 border border-[var(--arc-border-default)] rounded-lg bg-[var(--arc-surface-card)] p-5">
        <h4 className="font-mono text-[9px] uppercase tracking-widest text-[var(--arc-text-secondary)] mb-6 border-b border-[var(--arc-border-subtle)] pb-2">Latest Request Evaluation</h4>
        
        <div className="space-y-6">
          {evaluateScores.map((score, idx) => (
            <div key={idx} className="flex items-center gap-6" style={{ 
              opacity: 0,
              animation: `fade-slide-up 300ms ease-out ${idx * 100 + 400}ms forwards`
            }}>
              <div className="w-24 font-mono text-[11px] text-[var(--arc-text-secondary)]">{score.metric}</div>
              
              <div className="flex-1 relative h-6 rounded bg-[var(--arc-surface-raised)] overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 left-0 h-1/2 bg-[var(--arc-border-strong)] transition-all duration-1000" style={{ width: score.pWidth }}></div>
                <div className="absolute bottom-0 left-0 h-1/2 bg-[var(--arc-status-warning)] transition-all duration-1000" style={{ width: score.sWidth }}></div>
              </div>

              <div className="w-20 font-mono text-[10px] text-right">
                <div className={score.highlight ? 'text-[var(--arc-text-tertiary)]' : 'text-[var(--arc-text-primary)]'}>Primary</div>
                <div className={!score.highlight ? 'text-[var(--arc-text-tertiary)]' : 'text-[var(--arc-status-warning)]'}>Shadow</div>
              </div>
            </div>
          ))}

          <div className="mt-8 p-4 bg-[var(--arc-surface-raised)] rounded font-sans text-[13px] leading-relaxed text-[var(--arc-text-secondary)]" style={{
            opacity: 0,
            animation: `fade-slide-up 300ms ease-out 800ms forwards`
          }}>
            <strong className="text-[var(--arc-text-primary)] font-medium">Auto-Evaluation:</strong> claude-3-5-sonnet provided an equally accurate response but dramatically cut unnecessary exposition, resulting in a much higher conciseness score. It is recommended for this route.
          </div>
        </div>
      </div>
    </div>
  );
}
