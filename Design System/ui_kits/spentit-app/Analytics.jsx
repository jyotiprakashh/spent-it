/* SpentIt UI kit — Analytics screen (charts & insights). */
const _dsAn = window.SpentItDesignSystem_767bfa;

function Analytics() {
  const { Card, SectionTitle, Money, Icon } = _dsAn;
  const { MONTHLY, SPENDING, CATEGORIES, SUMMARY } = window.SpentItData;

  const slices = SPENDING.slice(0, 5).map((s) => ({ value: s.total, color: CATEGORIES[s.cat].color, label: CATEGORIES[s.cat].name, icon: CATEGORIES[s.cat].icon }));
  const total = slices.reduce((a, s) => a + s.value, 0);
  const avg = Math.round(MONTHLY.reduce((a, m) => a + m.v, 0) / MONTHLY.length);

  return (
    <div style={{ height: '100%' }}>
      <div style={{ padding: '8px 16px 4px' }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)' }}>Analytics</span>
      </div>
      <div style={{ overflowY: 'auto', height: 'calc(100% - 52px)', paddingBottom: 110, display: 'flex', flexDirection: 'column', gap: 16, padding: '8px 16px 110px' }} className="noscroll">
        {/* insight tiles */}
        <div style={{ display: 'flex', gap: 12 }}>
          <Card style={{ flex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-secondary)' }}>Avg / month</span>
            <div style={{ marginTop: 6 }}><Money value={avg} size={20} weight={700} /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, color: 'var(--income)', fontSize: 12, fontWeight: 600 }}>
              <Icon name="trending-up" size={14} color="var(--income)" /> 5.4% lower
            </div>
          </Card>
          <Card style={{ flex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-secondary)' }}>Net saved</span>
            <div style={{ marginTop: 6 }}><Money value={SUMMARY.net} size={20} weight={700} tone="income" signed /></div>
            <div style={{ marginTop: 4, fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>33% of income</div>
          </Card>
        </div>

        {/* 6-month bars */}
        <Card>
          <SectionTitle>Last 6 Months</SectionTitle>
          <div style={{ marginTop: 16 }}>
            <window.BarChart data={MONTHLY} highlight={5} />
          </div>
        </Card>

        {/* category donut */}
        <Card>
          <SectionTitle>By Category</SectionTitle>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <window.Donut slices={slices} total={total} size={150} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {slices.map((s) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 5, background: s.color }} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{s.label}</span>
                <Money value={s.value} size={13} tone="muted" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { Analytics });
