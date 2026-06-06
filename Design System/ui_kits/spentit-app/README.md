# SpentIt App — UI Kit

An interactive, high-fidelity recreation of the SpentIt mobile app, rendered inside an iPhone frame. It composes the design system's component primitives (`window.SpentItDesignSystem_767bfa`) — it does not re-implement them.

Open `index.html` for the full click-through:

1. **Onboarding** — three privacy-first intro slides → _Get started_.
2. **Dashboard** — month selector, net-worth card, horizontally-scrolled account balances, this-month summary, spending donut (tap a slice → drills into Transactions), recent list, FAB.
3. **Add transaction** (FAB) — expense/income segmented toggle, live amount, category strip, note + account, numeric keypad, save → toast.
4. **Transactions** — date-grouped list, account filter chips, search, category drill-down chip.
5. **Analytics** — insight tiles, 6-month bar chart, category donut.
6. **Settings** — grouped rows (General, Security, Manage, Data, About) with a biometric switch.

## Files

- `index.html` — loads React + Babel + the design-system bundle, then the screens; mounts `App` in the phone frame.
- `App.jsx` — phone shell, tab bar, routing, add-transaction modal, toast.
- `Onboarding.jsx`, `Dashboard.jsx`, `Transactions.jsx`, `AddTransaction.jsx`, `Analytics.jsx`, `Settings.jsx` — the screens.
- `widgets.jsx` — status bar, month selector, conic-gradient donut, bar chart.
- `data.jsx` — local mock data (categories, accounts, transactions, budgets, monthly totals).

## Notes

- All data is local and fake — true to a 100%-offline product.
- Charts are lightweight (CSS conic-gradient donut, flex bars) rather than the app's Victory Native — visually faithful, dependency-free.
- Source of truth for layouts: `jyotiprakashh/spent-it@dev`, `src/app/(tabs)/` and `src/components/`.
