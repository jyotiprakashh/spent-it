/* SpentIt UI kit — Settings screen. */
const _dsS = window.SpentItDesignSystem_767bfa;

function SettingsGroup({ title, children }) {
  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--text-secondary)', padding: '0 4px 6px' }}>{title}</div>
      <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden' }}>
        {React.Children.map(children, (c, i) => (
          <div style={i > 0 ? { borderTop: '1px solid var(--border-subtle)' } : undefined}>{c}</div>
        ))}
      </div>
    </div>
  );
}

function Settings() {
  const { ListRow, SwitchRow } = _dsS;
  const [bio, setBio] = React.useState(true);
  return (
    <div style={{ height: '100%' }}>
      <div style={{ padding: '8px 16px 8px' }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)' }}>Settings</span>
      </div>
      <div style={{ overflowY: 'auto', height: 'calc(100% - 56px)', paddingBottom: 110, display: 'flex', flexDirection: 'column', gap: 18 }} className="noscroll">
        <SettingsGroup title="General">
          <ListRow leadingIcon="currency" leadingIconColor="#00d09c" title="Currency" trailingText="INR (₹)" onClick={() => {}} />
          <ListRow leadingIcon="theme" leadingIconColor="#7e57c2" title="Theme" trailingText="Light" onClick={() => {}} />
        </SettingsGroup>
        <SettingsGroup title="Security">
          <SwitchRow leadingIcon="biometric" leadingIconColor="#00d09c" title="Biometric lock" subtitle="Require Face ID to open" checked={bio} onChange={setBio} />
          <ListRow leadingIcon="lock" leadingIconColor="#5c6bc0" title="Auto-lock" trailingText="30s" onClick={() => {}} disabled={!bio} />
        </SettingsGroup>
        <SettingsGroup title="Manage">
          <ListRow leadingIcon="accounts" leadingIconColor="#00d09c" title="Accounts" onClick={() => {}} />
          <ListRow leadingIcon="categories" leadingIconColor="#f5a623" title="Categories" onClick={() => {}} />
          <ListRow leadingIcon="budgets" leadingIconColor="#ec407a" title="Budgets" onClick={() => {}} />
        </SettingsGroup>
        <SettingsGroup title="Data">
          <ListRow leadingIcon="backup" leadingIconColor="#00d09c" title="Backup" subtitle="Encrypted .spentit file" onClick={() => {}} />
          <ListRow leadingIcon="restore" leadingIconColor="#5c6bc0" title="Restore" onClick={() => {}} />
        </SettingsGroup>
        <SettingsGroup title="About">
          <ListRow leadingIcon="secure" leadingIconColor="#00d09c" title="100% offline" subtitle="No accounts · no cloud · no tracking" showChevron={false} />
          <ListRow leadingIcon="info" leadingIconColor="#6b6b6b" title="Version" trailingText="1.0.0" showChevron={false} />
        </SettingsGroup>
      </div>
    </div>
  );
}

Object.assign(window, { Settings });
