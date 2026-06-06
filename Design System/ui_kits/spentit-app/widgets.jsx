/* SpentIt UI kit — shared widgets: status bar, month selector, charts. */
const DS = window.SpentItDesignSystem_767bfa;
const { Icon, Money, SectionTitle, Card } = DS;

function StatusBar({ dark }) {
  const fg = dark ? '#EFEFEF' : '#0C0C0C';
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: fg, letterSpacing: -0.2 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: fg }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill={fg}><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={fg}><path d="M8 2.2c2 0 3.9.8 5.3 2.1l1.2-1.3C12.8 1.2 10.5.3 8 .3S3.2 1.2 1.5 3l1.2 1.3C4.1 3 6 2.2 8 2.2z"/><path d="M8 5.6c1.1 0 2.1.4 2.8 1.2l1.2-1.3C10.9 4.4 9.5 3.8 8 3.8s-2.9.6-4 1.7l1.2 1.3C5.9 6 6.9 5.6 8 5.6z"/><circle cx="8" cy="9" r="1.6"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={fg} opacity="0.4"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill={fg}/><rect x="23" y="4" width="1.5" height="4" rx="0.75" fill={fg} opacity="0.4"/></svg>
      </div>
    </div>
  );
}

function MonthSelector({ label = 'June 2026', onPrev, onNext, nextDisabled }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '8px 16px' }}>
      <button onClick={onPrev} aria-label="Previous month" style={{ background:'none', border:'none', cursor:'pointer', padding:6, display:'flex' }}>
        <Icon name="chevron-left" size={22} color="var(--text-primary)" />
      </button>
      <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: -0.2, minWidth: 130, textAlign: 'center' }}>{label}</span>
      <button onClick={onNext} disabled={nextDisabled} aria-label="Next month" style={{ background:'none', border:'none', cursor: nextDisabled?'default':'pointer', padding:6, display:'flex' }}>
        <Icon name="next" size={22} color={nextDisabled ? 'var(--text-secondary)' : 'var(--text-primary)'} />
      </button>
    </div>
  );
}

// Donut via conic-gradient + center hole.
function Donut({ slices, total, currency = 'INR', size = 168 }) {
  let acc = 0;
  const stops = slices.map((s) => {
    const start = (acc / total) * 360;
    acc += s.value;
    const end = (acc / total) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  }).join(', ');
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{ width: size, height: size, borderRadius: '50%', background: `conic-gradient(${stops})` }} />
      <div style={{ position: 'absolute', inset: '21%', borderRadius: '50%', background: 'var(--surface-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-secondary)' }}>Total</span>
        <Money value={total} currency={currency} size={16} weight={700} />
      </div>
    </div>
  );
}

// Simple vertical bar chart.
function BarChart({ data, max, height = 150, highlight }) {
  const peak = max || Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: 30, height: `${(d.v / peak) * 100}%`, background: (highlight === i) ? 'var(--color-primary)' : 'var(--green-subtle)', borderRadius: 8, transition: 'height 400ms cubic-bezier(0.2,0.8,0.2,1)' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: (highlight === i) ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{d.m}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { StatusBar, MonthSelector, Donut, BarChart });
