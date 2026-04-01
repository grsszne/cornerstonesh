export default function ArcMockupLogs() {
  const logs = [
    { id: 'req_a9f2b1', time: '1m ago', route: 'Customer Support', color: 'clay', model: 'gpt-4o', status: 200, latency: '840ms', tokens: '532', cost: '$0.0051' },
    { id: 'req_b3c4d5', time: '2m ago', route: 'PDF Analysis', color: 'slate', model: 'claude-3-5-sonnet', status: 200, latency: '1,240ms', tokens: '12,450', cost: '$0.0373' },
    { id: 'req_e5f6g7', time: '5m ago', route: 'Internal Tools', color: 'stone', model: 'gpt-4o-mini', status: 200, latency: '320ms', tokens: '145', cost: '$0.0001' },
    { id: 'req_h7i8j9', time: '12m ago', route: 'Customer Support', color: 'clay', model: 'gpt-4o', status: 200, latency: '910ms', tokens: '612', cost: '$0.0058' },
    { id: 'req_k1l2m3', time: '15m ago', route: 'PDF Analysis', color: 'slate', model: 'claude-3-5-sonnet', status: 200, latency: '1,450ms', tokens: '18,200', cost: '$0.0546' },
    { id: 'req_n4o5p6', time: '22m ago', route: 'Customer Support', color: 'clay', model: 'gpt-4o-mini', status: 200, latency: '410ms', tokens: '290', cost: '$0.0002' },
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col pt-8">
      <div className="mb-8">
        <h3 className="text-xl text-[var(--arc-text-primary)] font-sans" style={{ fontWeight: 400 }}>Logs</h3>
        <p className="text-[13px] text-[var(--arc-text-secondary)] font-sans mt-1">14,204 requests • live</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-transparent border border-[var(--arc-border-default)] rounded px-3 py-2 flex items-center text-[13px] text-[var(--arc-text-secondary)]">
          Search by ID, model...
        </div>
        <div className="border border-[var(--arc-border-default)] rounded px-3 py-2 flex items-center text-[13px] text-[var(--arc-text-secondary)]">All Routes</div>
        <div className="border border-[var(--arc-border-default)] rounded px-3 py-2 flex items-center text-[13px] text-[var(--arc-text-secondary)]">All Models</div>
      </div>

      <div className="flex-1 overflow-hidden" style={{ border: '1px solid var(--arc-border-default)', borderRadius: '8px', background: 'var(--arc-surface-card)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '620px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--arc-border-default)', background: 'var(--arc-surface-card)' }}>
              {['Request ID', 'Time', 'Route', 'Model', 'Status', 'Latency', 'Tokens', 'Cost'].map(h => (
                <th key={h} className="font-mono" style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--arc-text-tertiary)',
                  fontWeight: 400,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr 
                key={log.id} 
                className="group transition-colors duration-150 relative truncate"
                style={{ 
                  borderBottom: '1px solid var(--arc-border-subtle)', 
                  opacity: 0,
                  animation: `fade-slide-up 300ms ease-out ${idx * 60 + 200}ms forwards`
                }}
              >
                <td className="font-mono" style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--arc-text-secondary)' }}>{log.id}</td>
                <td className="font-mono" style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--arc-text-tertiary)' }}>{log.time}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span className="font-mono inline-flex items-center gap-1.5" style={{
                    fontSize: '10px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: `var(--arc-${log.color}-bg)`,
                    color: `var(--arc-${log.color}-fg)`,
                  }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }}></span>
                    {log.route}
                  </span>
                </td>
                <td className="font-mono" style={{ padding: '12px 16px', fontSize: '11px', color: 'var(--arc-text-primary)' }}>{log.model}</td>
                <td className="font-mono" style={{ padding: '12px 16px', fontSize: '11px', color: 'var(--arc-status-healthy)' }}>{log.status}</td>
                <td className="font-mono" style={{ padding: '12px 16px', fontSize: '11px', color: 'var(--arc-text-primary)' }}>{log.latency}</td>
                <td className="font-mono" style={{ padding: '12px 16px', fontSize: '11px', color: 'var(--arc-text-secondary)' }}>{log.tokens}</td>
                <td className="font-mono" style={{ padding: '12px 16px', fontSize: '11px', color: 'var(--arc-text-primary)' }}>{log.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
