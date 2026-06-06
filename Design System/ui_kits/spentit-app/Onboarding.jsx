/* SpentIt UI kit — Onboarding (privacy-first intro). */
const _dsO = window.SpentItDesignSystem_767bfa;

const SLIDES = [
  { icon: 'lock', title: 'Your money stays here', body: 'No accounts. No cloud sync. No tracking. SpentIt is 100% offline — your data never leaves your phone.' },
  { icon: 'add', title: 'Log expenses in seconds', body: 'Tap +, pick a category and account, type an amount. That\u2019s it.' },
  { icon: 'backup', title: 'Back up regularly', body: 'Create an encrypted backup file you control. We\u2019ll nudge you weekly.' },
];

function Onboarding({ onFinish }) {
  const { Button, Icon } = _dsO;
  const [i, setI] = React.useState(0);
  const slide = SLIDES[i];
  const next = () => (i === SLIDES.length - 1 ? onFinish() : setI(i + 1));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--surface-page)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 20px' }}>
        <button onClick={onFinish} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Skip</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 36px', gap: 8 }}>
        <div style={{ width: 96, height: 96, borderRadius: 28, background: 'var(--color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <Icon name={slide.icon} size={42} color="var(--color-primary)" strokeWidth={2} />
        </div>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: -0.5, color: 'var(--text-primary)' }}>{slide.title}</h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: 300 }}>{slide.body}</p>
      </div>

      <div style={{ padding: '16px 24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {SLIDES.map((_, k) => (
            <span key={k} style={{ width: k === i ? 22 : 8, height: 8, borderRadius: 4, background: k === i ? 'var(--color-primary)' : 'var(--line)', transition: 'all 220ms ease' }} />
          ))}
        </div>
        <Button variant="primary" fullWidth size="lg" onClick={next}>{i === SLIDES.length - 1 ? 'Get started' : 'Next'}</Button>
      </div>
    </div>
  );
}

Object.assign(window, { Onboarding });
