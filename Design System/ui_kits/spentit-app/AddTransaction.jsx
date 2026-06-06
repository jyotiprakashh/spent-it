/* SpentIt UI kit — Add Transaction modal (amount, type, category, keypad). */
const _dsA = window.SpentItDesignSystem_767bfa;

function AddTransaction({ onClose, onSave }) {
  const { SegmentedControl, Icon, IconButton, Button, Input } = _dsA;
  const { CATEGORIES } = window.SpentItData;
  const [type, setType] = React.useState('expense');
  const [amount, setAmount] = React.useState('0');
  const [cat, setCat] = React.useState('groceries');
  const [account, setAccount] = React.useState('HDFC');
  const [note, setNote] = React.useState('');

  const catKeys = type === 'income'
    ? ['salary']
    : ['groceries', 'dining', 'transport', 'rent', 'shopping', 'health', 'entertainment', 'bills'];
  React.useEffect(() => { setCat(catKeys[0]); }, [type]);

  const press = (k) => {
    setAmount((cur) => {
      if (k === 'back') return cur.length <= 1 ? '0' : cur.slice(0, -1);
      if (k === '.') return cur.includes('.') ? cur : cur + '.';
      if (cur === '0') return k;
      if (cur.includes('.') && cur.split('.')[1].length >= 2) return cur;
      return cur + k;
    });
  };
  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];
  const amountColor = type === 'income' ? 'var(--income)' : 'var(--text-primary)';

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--surface-page)', display: 'flex', flexDirection: 'column', zIndex: 50 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
        <IconButton icon="close" aria-label="Cancel" onClick={onClose} />
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>New transaction</span>
        <div style={{ width: 40 }} />
      </div>

      {/* type toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 10px' }}>
        <SegmentedControl value={type} onChange={setType}
          options={[{ value: 'expense', label: 'Expense', tone: 'expense' }, { value: 'income', label: 'Income', tone: 'income' }]} />
      </div>

      {/* amount */}
      <div style={{ textAlign: 'center', padding: '6px 0 14px' }}>
        <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1, color: amountColor }}>
          ₹{amount}
        </span>
      </div>

      {/* category grid */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 6 }} className="noscroll">
          {catKeys.map((k) => {
            const c = CATEGORIES[k];
            const sel = cat === k;
            return (
              <button key={k} onClick={() => setCat(k)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, width: 58 }}>
                <span style={{ width: 48, height: 48, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: sel ? c.color : `color-mix(in srgb, ${c.color} 13%, transparent)`, transition: 'background 140ms ease' }}>
                  <Icon name={c.icon} size={22} color={sel ? '#fff' : c.color} />
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: sel ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* note + account */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 8px' }}>
        <div style={{ flex: 1 }}>
          <Input leadingIcon="pencil" placeholder="Add a note" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <button onClick={() => setAccount(account === 'HDFC' ? 'Cash' : 'HDFC')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', height: 48, borderRadius: 12, border: 'none', background: 'var(--surface-card)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
          <Icon name="wallet" size={16} color="var(--text-secondary)" />{account}
        </button>
      </div>

      {/* keypad */}
      <div style={{ marginTop: 'auto', padding: '0 16px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {KEYS.map((k) => (
            <button key={k} onClick={() => press(k)} style={{ height: 52, borderRadius: 14, border: 'none', background: 'var(--surface-card)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)' }}>
              {k === 'back' ? <Icon name="delete" size={22} color="var(--text-primary)" /> : k}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button variant="primary" fullWidth size="lg" onClick={() => onSave({ type, amount, cat, account, note })}>
            {type === 'income' ? 'Add income' : 'Add expense'}
          </Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AddTransaction });
