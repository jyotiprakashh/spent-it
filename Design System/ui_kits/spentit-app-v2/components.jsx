/* SpentIt v2 — standalone design primitives (no DS bundle dependency).
   Key v2 changes: white cards on #F8F8F8 page, stroke-1.5 icons, monochrome
   category icons, slimmer buttons (40px), tighter rows (56px), hairline borders. */

// ===== ICON SET (Lucide outline, inlined for offline/static rendering) =====
const PATHS = {
  "shopping-cart": '<circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>',
  "utensils": '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>',
  "car": '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle>',
  "house": '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
  "wallet": '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>',
  "gift": '<path d="M12 7v14"></path><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"></path><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"></path><rect x="3" y="7" width="18" height="4" rx="1"></rect>',
  "heart-pulse": '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>',
  "plus": '<path d="M5 12h14"></path><path d="M12 5v14"></path>',
  "search": '<path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle>',
  "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
  "chevron-left": '<path d="m15 18-6-6 6-6"></path>',
  "x": '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  "lock": '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
  "scan-face": '<path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path>',
  "cloud-upload": '<path d="M12 13v8"></path><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="m8 17 4-4 4 4"></path>',
  "cloud-download": '<path d="M12 13v8l-4-4"></path><path d="m12 21 4-4"></path><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"></path>',
  "layout-grid": '<rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>',
  "chart-pie": '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"></path><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>',
  "banknote": '<rect width="20" height="12" x="2" y="6" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path>',
  "moon": '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>',
  "bug": '<path d="M12 20v-9"></path><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"></path><path d="M21 21a4 4 0 0 0-3.81-4"></path><path d="M21 5a4 4 0 0 1-3.55 3.97"></path><path d="M22 13h-4"></path><path d="M3 21a4 4 0 0 1 3.81-4"></path><path d="M3 5a4 4 0 0 0 3.55 3.97"></path><path d="M6 13H2"></path>',
  "info": '<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>',
  "settings": '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle>',
  "chart-column": '<path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path>',
  "trending-up": '<path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path>',
  "receipt": '<path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"></path>',
  "arrow-left": '<path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>',
  "ellipsis": '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',
  "check": '<path d="M20 6 9 17l-5-5"></path>',
  "delete": '<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path><path d="m12 9 6 6"></path><path d="m18 9-6 6"></path>',
  "calendar": '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>',
  "pencil": '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path>',
  "trash-2": '<path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
  "bus": '<path d="M8 6v6"></path><path d="M15 6v6"></path><path d="M2 12h19.6"></path><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"></path><circle cx="7" cy="18" r="2"></circle><path d="M9 18h5"></path><circle cx="16" cy="18" r="2"></circle>',
  "film": '<rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M7 3v18"></path><path d="M3 7.5h4"></path><path d="M3 12h18"></path><path d="M3 16.5h4"></path><path d="M17 3v18"></path><path d="M17 7.5h4"></path><path d="M17 16.5h4"></path>',
  "shopping-bag": '<path d="M16 10a4 4 0 0 1-8 0"></path><path d="M3.103 6.034h17.794"></path><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path>',
  "zap": '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>',
  "smartphone": '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path>',
  "coffee": '<path d="M10 2v2"></path><path d="M14 2v2"></path><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path><path d="M6 2v2"></path>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path>',
};
const ALIASES = {
  groceries:'shopping-cart', food:'utensils', dining:'coffee', transport:'bus', car:'car',
  rent:'house', home:'house', salary:'banknote', income:'trending-up', shopping:'shopping-bag',
  gifts:'gift', health:'heart-pulse', bills:'zap', phone:'smartphone', entertainment:'film',
  add:'plus', back:'arrow-left', next:'chevron-right', prev:'chevron-left', close:'x', more:'ellipsis',
  biometric:'scan-face', backup:'cloud-upload', restore:'cloud-download', categories:'layout-grid',
  budgets:'chart-pie', analytics:'chart-column', currency:'banknote', theme:'moon',
  accounts:'wallet', edit:'pencil', trash:'trash-2', secure:'shield-check',
};

function Icon({ name, size = 20, color = 'currentColor', sw = 1.5, style }) {
  const k = ALIASES[name] || name;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0, ...style }} dangerouslySetInnerHTML={{ __html: PATHS[k] || PATHS['receipt'] }} />;
}

function Btn({ children, variant = 'primary', size = 'md', icon, fullWidth, disabled, onClick, style }) {
  const [p, setP] = React.useState(false);
  const S = { sm: { h: 32, px: 12, fs: 12 }, md: { h: 40, px: 16, fs: 14 }, lg: { h: 48, px: 20, fs: 15 } }[size];
  const V = { primary:{bg:'#00D09C',fg:'#fff',pb:'#00B88A'}, secondary:{bg:'#F0F0F0',fg:'#0C0C0C',pb:'#E4E4E4'}, ghost:{bg:'transparent',fg:'#00D09C',pb:'#E0FAF3'}, danger:{bg:'transparent',fg:'#F45B69',pb:'#FEF2F3'} }[variant];
  return (
    <button type="button" disabled={disabled} onClick={onClick} onPointerDown={() => setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: fullWidth ? '100%' : 'auto', height: S.h, padding: `0 ${S.px}px`, fontFamily: 'var(--font-display)', fontSize: S.fs, fontWeight: 600, color: V.fg, background: p && !disabled ? V.pb : V.bg, border: 'none', borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, transform: p && !disabled ? 'scale(0.97)' : 'scale(1)', transition: 'transform 120ms ease, background 100ms ease', outline: 'none', ...style }}>
      {icon ? <Icon name={icon} size={S.h < 44 ? 14 : 16} sw={2} /> : null}
      <span>{children}</span>
    </button>
  );
}

function Card({ children, pad = true, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #EBEBEB', padding: pad ? 14 : 0, overflow: 'hidden', ...style }}>{children}</div>;
}

const fmtMoney = (v, cur = 'INR') => ({ INR: '₹', USD: '$', EUR: '€', GBP: '£' }[cur] ?? '') + Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: 2 });

function Money({ value, currency = 'INR', tone = 'default', size = 15, weight = 600, signed = false, style }) {
  const color = { default: '#0C0C0C', income: '#00D09C', expense: '#0C0C0C', muted: '#8A8A8A' }[tone];
  const pre = signed ? (value > 0 ? '+ ' : value < 0 ? '− ' : '') : value < 0 ? '− ' : '';
  return <span style={{ fontFamily: 'var(--font-display)', fontSize: size, fontWeight: weight, letterSpacing: '-0.2px', color, whiteSpace: 'nowrap', ...style }}>{pre}{fmtMoney(value, currency)}</span>;
}

function Label({ children, style }) {
  return <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#8A8A8A', ...style }}>{children}</span>;
}

function Toggle({ on = false, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange?.(!on)}
      style={{ width: 46, height: 28, borderRadius: 14, border: 'none', padding: 2, background: on ? '#00D09C' : '#DCDCDC', cursor: 'pointer', display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start', alignItems: 'center', transition: 'background 180ms ease' }}>
      <span style={{ width: 24, height: 24, borderRadius: 12, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

function Segment({ options, value, onChange }) {
  return (
    <div style={{ display: 'inline-flex', padding: 3, background: '#F0F0F0', borderRadius: 10 }}>
      {options.map(o => {
        const s = o.value === value;
        const fg = s ? (o.tone === 'income' ? '#00D09C' : o.tone === 'expense' ? '#F45B69' : '#0C0C0C') : '#8A8A8A';
        return <button key={o.value} onClick={() => onChange?.(o.value)} style={{ minWidth: 96, padding: '8px 18px', border: 'none', borderRadius: 8, background: s ? '#fff' : 'transparent', boxShadow: s ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: fg, cursor: 'pointer', transition: 'all 140ms ease' }}>{o.label}</button>;
      })}
    </div>
  );
}

function Row({ icon, iconColor = '#00D09C', title, sub, trailText, trail, chevron = true, onClick, disabled, style }) {
  const [p, setP] = React.useState(false);
  return (
    <div onClick={!disabled && onClick} onPointerDown={() => !disabled && onClick && setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: p ? '#FAFAFA' : 'transparent', cursor: onClick && !disabled ? 'pointer' : 'default', opacity: disabled ? 0.45 : 1, transition: 'background 100ms ease', ...style }}>
      {icon && <span style={{ width: 34, height: 34, borderRadius: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${iconColor}18`, flexShrink: 0 }}><Icon name={icon} size={17} color={iconColor} /></span>}
      <span style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: '#0C0C0C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        {sub && <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: '#8A8A8A', marginTop: 1 }}>{sub}</div>}
      </span>
      {trail || (trailText && <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: '#8A8A8A' }}>{trailText}</span>)}
      {onClick && !disabled && chevron && <Icon name="next" size={16} color="#C8C8C8" />}
    </div>
  );
}

function TxnRow({ tx, onClick }) {
  const [p, setP] = React.useState(false);
  const signed = tx.type === 'income' ? tx.amount : -tx.amount;
  return (
    <div onClick={onClick} onPointerDown={() => setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, height: 56, padding: '0 16px', background: p ? '#FAFAFA' : '#fff', cursor: onClick ? 'pointer' : 'default', transition: 'background 100ms ease' }}>
      <span style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F2F2', flexShrink: 0 }}><Icon name={tx.icon} size={18} color="#6B6B6B" /></span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: '#0C0C0C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.category}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: '#8A8A8A', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note || tx.account}</div>
      </span>
      <Money value={signed} tone={tx.type === 'income' ? 'income' : 'default'} size={14} weight={600} signed />
    </div>
  );
}

function Chip({ label, icon, sel = false, onClick }) {
  return <button onClick={onClick} type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 32, padding: '0 12px', border: sel ? '1.5px solid #00D09C' : '1px solid #E4E4E4', borderRadius: 16, background: sel ? '#E8FBF5' : '#fff', fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: sel ? '#00D09C' : '#6B6B6B', cursor: 'pointer', whiteSpace: 'nowrap' }}>{icon && <Icon name={icon} size={12} color={sel ? '#00D09C' : '#8A8A8A'} />}{label}</button>;
}

function Fab({ onClick, style }) {
  const [p, setP] = React.useState(false);
  return <button type="button" aria-label="Add" onClick={onClick} onPointerDown={() => setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)} style={{ position: 'absolute', right: 16, bottom: 24, width: 52, height: 52, borderRadius: 26, background: '#00D09C', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,208,156,0.4)', transform: p ? 'scale(0.92)' : 'scale(1)', transition: 'transform 140ms ease', ...style }}><Icon name="plus" size={24} color="#fff" sw={2.5} /></button>;
}

function Bar({ v = 0, max = 100, color }) {
  const pct = Math.min(100, max > 0 ? v / max * 100 : 0);
  const r = max > 0 ? v / max : 0;
  const fill = color || (r >= 1 ? '#F45B69' : r >= 0.8 ? '#F5A623' : '#00D09C');
  return <div style={{ width: '100%', height: 4, background: '#EFEFEF', borderRadius: 2 }}><div style={{ width: `${pct}%`, height: '100%', background: fill, borderRadius: 2, transition: 'width 300ms ease' }} /></div>;
}

function Empty({ icon, title, sub }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 32, textAlign: 'center' }}>
      <span style={{ width: 60, height: 60, borderRadius: 30, background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}><Icon name={icon} size={26} color="#A0A0A0" /></span>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#0C0C0C' }}>{title}</div>
      {sub && <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: '#8A8A8A', maxWidth: 240, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

Object.assign(window, { Icon, Btn, Card, Money, fmtMoney, Label, Toggle, Segment, Row, TxnRow, Chip, Fab, Bar, Empty });
