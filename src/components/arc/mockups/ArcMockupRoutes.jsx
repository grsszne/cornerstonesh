export default function ArcMockupRoutes() {
  const routes = [
    { id: 'rt_customer', name: 'Customer Support', key: 'customer-support', color: 'clay', primary: 'gpt-4o', fallback: 'claude-3-5-sonnet', cache: 'Semantic', status: 'active' },
    { id: 'rt_pdf', name: 'PDF Analysis', key: 'pdf-extraction', color: 'slate', primary: 'claude-3-5-sonnet', fallback: 'None', cache: 'Exact', status: 'active' },
    { id: 'rt_internal', name: 'Internal Tools', key: 'internal-tools', color: 'stone', primary: 'gpt-4o-mini', fallback: 'gpt-3.5-turbo', cache: 'Off', status: 'paused' },
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col pt-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h3 className="text-xl text-[var(--arc-text-primary)] font-sans" style={{ fontWeight: 400 }}>Routes</h3>
          <p className="text-[13px] text-[var(--arc-text-secondary)] font-sans mt-1">3 endpoints configured</p>
        </div>
        <button className="font-mono" style={{
          fontSize: '10.5px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '8px 16px',
          background: 'var(--arc-text-primary)',
          color: 'var(--arc-surface-page)',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 500,
        }}>
          + Add Route
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '620px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--arc-border-default)' }}>
              {['Route', 'Status', 'Primary Model', 'Fallback Chain', 'Cache', ''].map(h => (
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
            {/* The Direct Route */}
            <tr style={{ borderBottom: '1px solid var(--arc-border-subtle)', background: 'var(--arc-surface-raised)', opacity: 0.75 }}>
              <td style={{ padding: '16px' }}>
                <span className="font-mono inline-flex items-center gap-1.5" style={{
                  fontSize: '10px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: `var(--arc-stone-bg)`,
                  color: `var(--arc-stone-fg)`,
                }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }}></span>
                  Direct
                </span>
                <p style={{ fontSize: '11px', color: 'var(--arc-text-tertiary)', fontStyle: 'italic', marginTop: '4px' }}>
                  Default — used when no route is matched
                </p>
              </td>
              <td style={{ padding: '16px' }}>
                <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--arc-text-tertiary)' }}>System</span>
              </td>
              <td className="font-mono" style={{ padding: '16px', fontSize: '11px', color: 'var(--arc-text-tertiary)' }}>—</td>
              <td className="font-mono" style={{ padding: '16px', fontSize: '11px', color: 'var(--arc-text-tertiary)' }}>—</td>
              <td className="font-mono" style={{ padding: '16px', fontSize: '11px', color: 'var(--arc-text-tertiary)' }}>—</td>
              <td style={{ padding: '16px' }}></td>
            </tr>

            {routes.map((rt, idx) => (
              <tr 
                key={rt.id} 
                style={{ 
                  borderBottom: '1px solid var(--arc-border-subtle)',
                  opacity: 0,
                  animation: `fade-slide-up 300ms ease-out ${idx * 60 + 200}ms forwards`
                }}
                className="hover:bg-[var(--arc-surface-raised)] transition-colors"
              >
                <td style={{ padding: '16px' }}>
                  <span className="font-mono inline-flex items-center gap-1.5" style={{
                    fontSize: '10px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: `var(--arc-${rt.color}-bg)`,
                    color: `var(--arc-${rt.color}-fg)`,
                  }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }}></span>
                    {rt.name}
                  </span>
                  <p className="font-mono" style={{ fontSize: '11px', color: 'var(--arc-text-secondary)', marginTop: '4px', letterSpacing: '0.04em' }}>
                    {rt.key}
                  </p>
                </td>
                <td style={{ padding: '16px' }}>
                  <span className="font-mono flex items-center gap-2" style={{
                    fontSize: '10px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: rt.status === 'active' ? 'var(--arc-status-healthy)' : 'var(--arc-text-tertiary)',
                  }}>
                    <span style={{
                      width: '6px', height: '6px', 
                      borderRadius: rt.status === 'active' ? '50%' : '1px', 
                      background: 'currentColor'
                    }}></span>
                    {rt.status}
                  </span>
                </td>
                <td className="font-mono" style={{ padding: '16px', fontSize: '11px', color: 'var(--arc-text-primary)' }}>{rt.primary}</td>
                <td className="font-mono" style={{ padding: '16px', fontSize: '11px', color: 'var(--arc-text-secondary)' }}>
                  {rt.fallback !== 'None' ? <span className="opacity-50 line-through mr-2">{rt.primary}</span> : ''}
                  {rt.fallback}
                </td>
                <td className="font-mono" style={{ padding: '16px', fontSize: '11px', color: rt.cache !== 'Off' ? 'var(--arc-status-healthy)' : 'var(--arc-text-tertiary)' }}>{rt.cache}</td>
                <td className="font-mono text-[var(--arc-text-tertiary)]" style={{ padding: '16px', fontSize: '11px', textAlign: 'right' }}>→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
