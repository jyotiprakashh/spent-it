/* SpentIt UI kit — Dashboard screen. */
const _ds = window.SpentItDesignSystem_767bfa;

function Dashboard({ onAdd, onSeeAll, onCategory }) {
  const { Card, Money, SectionTitle, AccountCard, TransactionRow, Fab } = _ds;
  const { ACCOUNTS, TXNS, SPENDING, SUMMARY, CATEGORIES } = window.SpentItData;
  const [account, setAccount] = React.useState(null);

  const slices = SPENDING.slice(0, 5).map((s) => ({
    value: s.total, color: CATEGORIES[s.cat].color, label: CATEGORIES[s.cat].name, icon: CATEGORIES[s.cat].icon, cat: s.cat,
  }));
  const otherTotal = SPENDING.slice(5).reduce((a, s) => a + s.total, 0);
  if (otherTotal > 0) slices.push({ value: otherTotal, color: '#AEB6BF', label: 'Other', icon: 'more', cat: null });
  const total = slices.reduce((a, s) => a + s.value, 0);
  const recent = TXNS.slice(0, 4);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ paddingTop: 4 }}>
        <window.MonthSelector />
      </div>
      <div style={{ overflowY: 'auto', height: 'calc(100% - 52px)', paddingBottom: 120 }} className="noscroll">
        {/* Net worth */}
        <div style={{ padding: '4px 16px 0' }}>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <SectionTitle>Net Worth</SectionTitle>
              <Money value={SUMMARY.netWorth} size={30} weight={700} />
            </div>
          </Card>
        </div>

        {/* Account chips */}
        <div style={{ display: 'flex', gap: 8, padding: '16px 16px 0', overflowX: 'auto' }} className="noscroll">
          <window.SpentItDS_AccountAll account={account} setAccount={setAccount} />
        </div>

        {/* This month */}
        <div style={{ padding: '16px 16px 0' }}>
          <Card>
            <SectionTitle>This Month</SectionTitle>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {[['Income', SUMMARY.income, 'income'], ['Expense', SUMMARY.expense, 'expense'], ['Net', SUMMARY.net, 'income']].map(([l, v, t]) => (
                <div key={l} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>{l}</span>
                  <Money value={v} size={17} tone={t} signed={l === 'Net'} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Spending donut */}
        <div style={{ padding: '16px 16px 0' }}>
          <Card>
            <SectionTitle>Spending</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
              <window.Donut slices={slices} total={total} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {slices.map((s) => {
                const pct = Math.round((s.value / total) * 100);
                return (
                  <div key={s.label} onClick={() => s.cat && onCategory(s.cat)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', cursor: s.cat ? 'pointer' : 'default' }}>
                    <span style={{ width: 10, height: 10, borderRadius: 5, background: s.color, flexShrink: 0 }} />
                    <_ds.Icon name={s.icon} size={14} color="var(--text-secondary)" />
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{s.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', minWidth: 34, textAlign: 'right' }}>{pct}%</span>
                    <Money value={s.value} size={13} tone="muted" />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Recent */}
        <div style={{ padding: '16px 16px 0' }}>
          <Card padded={false}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 4px' }}>
              <SectionTitle>Recent</SectionTitle>
              <button onClick={onSeeAll} style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                See all <_ds.Icon name="next" size={14} color="var(--color-primary)" />
              </button>
            </div>
            {recent.map((t) => (
              <TransactionRow key={t.id} tx={{ category: window.SpentItData.CATEGORIES[t.cat].name, icon: window.SpentItData.CATEGORIES[t.cat].icon, color: window.SpentItData.CATEGORIES[t.cat].color, note: t.note, account: t.account, amount: t.amount, type: t.type }} onClick={onSeeAll} />
            ))}
          </Card>
        </div>
      </div>

      <Fab aria-label="Add transaction" onClick={onAdd} style={{ position: 'absolute', right: 16, bottom: 24 }} />
    </div>
  );
}

// Horizontal account selector row
function SpentItDS_AccountAll({ account, setAccount }) {
  const { AccountCard } = _ds;
  const { ACCOUNTS, SUMMARY } = window.SpentItData;
  return (
    <React.Fragment>
      <AccountCard account={null} totalNetWorth={SUMMARY.netWorth} selected={account === null} onClick={() => setAccount(null)} />
      {ACCOUNTS.map((a) => (
        <AccountCard key={a.id} account={a} selected={account === a.id} onClick={() => setAccount(a.id)} />
      ))}
    </React.Fragment>
  );
}

Object.assign(window, { Dashboard, SpentItDS_AccountAll });
