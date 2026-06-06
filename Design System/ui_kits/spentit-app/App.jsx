/* SpentIt UI kit — App shell: phone frame, tab bar, routing, toast. */
const _dsApp = window.SpentItDesignSystem_767bfa;

function TabBar({ active, onChange }) {
  const { Icon } = _dsApp;
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: 'house' },
    { key: 'transactions', label: 'Transactions', icon: 'receipt' },
    { key: 'analytics', label: 'Analytics', icon: 'chart-column' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, paddingBottom: 18, background: 'color-mix(in srgb, var(--surface-page) 86%, transparent)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'flex-start', paddingTop: 8, zIndex: 30 }}>
      {tabs.map((t) => {
        const on = active === t.key;
        return (
          <button key={t.key} onClick={() => onChange(t.key)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
            <Icon name={t.icon} size={23} color={on ? 'var(--color-primary)' : 'var(--text-secondary)'} strokeWidth={on ? 2.4 : 2} />
            <span style={{ fontSize: 10, fontWeight: 600, color: on ? 'var(--color-primary)' : 'var(--text-secondary)' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Toast({ message }) {
  return (
    <div style={{ position: 'absolute', left: 16, right: 16, bottom: 100, background: 'var(--ink-900)', color: 'var(--surface-0)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, zIndex: 60, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', animation: 'toastIn 240ms cubic-bezier(0.2,0.8,0.2,1)' }}>
      <_dsApp.Icon name="check" size={18} color="var(--color-primary)" />
      <span style={{ fontSize: 14, fontWeight: 600 }}>{message}</span>
    </div>
  );
}

function App() {
  const [stage, setStage] = React.useState('onboarding'); // onboarding | app
  const [tab, setTab] = React.useState('dashboard');
  const [adding, setAdding] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [drillCat, setDrillCat] = React.useState(null);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 2200); };

  const goTxns = (cat) => { setDrillCat(cat || null); setTab('transactions'); };

  let screen = null;
  if (tab === 'dashboard') screen = <window.Dashboard onAdd={() => setAdding(true)} onSeeAll={() => goTxns(null)} onCategory={(c) => goTxns(c)} />;
  else if (tab === 'transactions') screen = <window.Transactions key={drillCat || 'all'} initialCategory={drillCat} onAdd={() => setAdding(true)} onOpen={() => setAdding(true)} />;
  else if (tab === 'analytics') screen = <window.Analytics />;
  else if (tab === 'settings') screen = <window.Settings />;

  return (
    <div className="phone">
      <div className="phone-screen">
        <window.StatusBar />
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          {stage === 'onboarding' ? (
            <window.Onboarding onFinish={() => setStage('app')} />
          ) : (
            <React.Fragment>
              <div style={{ position: 'absolute', inset: 0, paddingBottom: 0 }}>{screen}</div>
              <TabBar active={tab} onChange={(t) => { setDrillCat(null); setTab(t); }} />
              {adding && (
                <window.AddTransaction
                  onClose={() => setAdding(false)}
                  onSave={() => { setAdding(false); showToast('Transaction added'); }}
                />
              )}
              {toast && <Toast message={toast} />}
            </React.Fragment>
          )}
        </div>
        <div className="home-indicator" />
      </div>
    </div>
  );
}

Object.assign(window, { App });
