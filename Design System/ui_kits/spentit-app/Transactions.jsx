/* SpentIt UI kit — Transactions list screen (grouped by date, search, filters). */
const _dsT = window.SpentItDesignSystem_767bfa;

function Transactions({ onAdd, onOpen, initialCategory }) {
  const { Card, TransactionRow, SearchBar, Chip, IconButton, Fab, Icon, EmptyState } = _dsT;
  const { TXNS, CATEGORIES, ACCOUNTS } = window.SpentItData;
  const [account, setAccount] = React.useState(null);
  const [category, setCategory] = React.useState(initialCategory || null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [q, setQ] = React.useState('');

  const filtered = TXNS.filter((t) => {
    if (account && t.account !== account) return false;
    if (category && t.cat !== category) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      if (!t.note.toLowerCase().includes(s) && !CATEGORIES[t.cat].name.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  // group by date label preserving order
  const groups = [];
  filtered.forEach((t) => {
    let g = groups.find((x) => x.date === t.date);
    if (!g) { g = { date: t.date, items: [] }; groups.push(g); }
    g.items.push(t);
  });

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ padding: '4px 16px 8px' }}>
        {category && (
          <div style={{ marginBottom: 8 }}>
            <button onClick={() => setCategory(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, border: 'none', cursor: 'pointer', background: `color-mix(in srgb, ${CATEGORIES[category].color} 13%, transparent)` }}>
              <Icon name={CATEGORIES[category].icon} size={14} color={CATEGORIES[category].color} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{CATEGORIES[category].name}</span>
              <Icon name="close" size={14} color="var(--text-secondary)" />
            </button>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', gap: 8, overflowX: 'auto' }} className="noscroll">
            <Chip label="All" selected={account === null} onClick={() => setAccount(null)} />
            {ACCOUNTS.map((a) => (
              <Chip key={a.id} label={a.name} icon={a.icon} selected={account === a.name} onClick={() => setAccount(a.name)} />
            ))}
          </div>
          <IconButton icon={searchOpen ? 'close' : 'search'} aria-label="Search" onClick={() => { setSearchOpen(!searchOpen); setQ(''); }} />
        </div>
        {searchOpen && (
          <div style={{ marginTop: 8 }}>
            <SearchBar value={q} onChange={(e) => setQ(e.target.value)} onClose={() => { setSearchOpen(false); setQ(''); }} />
          </div>
        )}
      </div>

      <div style={{ overflowY: 'auto', height: searchOpen ? 'calc(100% - 116px)' : 'calc(100% - 60px)', paddingBottom: 120 }} className="noscroll">
        {groups.length === 0 ? (
          <div style={{ marginTop: 60 }}><EmptyState icon="receipt" title="No transactions" subtitle="Try clearing filters or tap + to add one" /></div>
        ) : groups.map((g) => (
          <div key={g.date}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px 6px' }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-secondary)' }}>{g.date}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                {(() => { const net = g.items.reduce((a, t) => a + (t.type === 'income' ? t.amount : -t.amount), 0); return (net < 0 ? '− ₹' : '₹') + Math.abs(net).toLocaleString('en-IN'); })()}
              </span>
            </div>
            {g.items.map((t) => (
              <TransactionRow key={t.id} tx={{ category: CATEGORIES[t.cat].name, icon: CATEGORIES[t.cat].icon, color: CATEGORIES[t.cat].color, note: t.note, account: t.account, amount: t.amount, type: t.type }} onClick={onOpen} />
            ))}
          </div>
        ))}
      </div>

      <Fab aria-label="Add transaction" onClick={onAdd} style={{ position: 'absolute', right: 16, bottom: 24 }} />
    </div>
  );
}

Object.assign(window, { Transactions });
