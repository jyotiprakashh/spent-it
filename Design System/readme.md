# SpentIt — Design System

> **The expense tracker that never phones home.** A 100% offline, privacy-first mobile expense tracker for iOS and Android. Financial data lives entirely on the device — encrypted, indexed, fast — with no accounts, no subscriptions, no ads, and no cloud of any kind.

This repository is the **design system** for SpentIt: brand foundations (color, type, spacing), reusable React UI primitives, a full interactive recreation of the mobile app, and the prose guidelines that hold it all together. It exists so any agent or designer can produce on-brand SpentIt screens, mocks, and marketing without re-deriving the rules each time.

The aesthetic, in one line: **monochrome and calm, with a single spring-green accent and one signature press-shrink motion.** Simple by conviction — no bloat, no decoration that doesn't earn its place.

---

## Sources

Everything here was reverse-engineered from the product's own code. If you have access, explore these to design with higher fidelity:

- **App codebase (source of truth):** [`github.com/jyotiprakashh/spent-it`](https://github.com/jyotiprakashh/spent-it) — branch **`dev`**. React Native 0.74 + Expo SDK 51 + SQLite (WAL) + SQLCipher, TypeScript strict.
  - Color & spacing tokens: `src/constants/theme.ts`
  - Web font variables: `src/global.css`
  - Component primitives: `src/components/common/`, `src/components/dashboard/`, `src/components/transactions/`, `src/components/add-transaction/`
  - Screens: `src/app/(tabs)/` (dashboard, transactions, analytics, settings), `src/app/onboarding.tsx`, `src/app/add-transaction.tsx`
- **Brand assets provided by the user:** `uploads/icon.png` (app icon), `uploads/logo-trabns.png` (wallet mark) → copied into `assets/`.
- **Icon set:** [Lucide](https://lucide.dev) outline glyphs, inlined as SVG (see _Iconography_). The app itself uses Ionicons (`@expo/vector-icons`); Lucide is a near-identical visual substitute chosen because it inlines cleanly and renders offline. **Flagged for review** — swap to Ionicons paths if exact parity is required.

> Reading the repo above will let you reproduce screens far more faithfully than working from this doc alone — start there for anything pixel-critical.

---

## Content Fundamentals — how SpentIt talks

The voice is **plain, calm, and reassuring**, built around one promise: your data is yours. It never oversells.

- **Person:** Second person, warm. "Your money stays here." "We'll nudge you weekly." The product is "we"; the user is "you/your."
- **Casing:** Sentence case for body and most buttons ("Get started", "Add expense"). Screen titles are sentence-case headlines ("Settings", "New transaction"). Overlines/section labels are UPPERCASE with wide tracking ("THIS MONTH", "RECENT", "SPENDING").
- **Tone:** Direct and concrete, never hype. Privacy stated as fact, not fear: _"No accounts. No cloud sync. No tracking. SpentIt is 100% offline — your data never leaves your phone."_
- **Length:** Short. Onboarding bodies are one or two sentences. Microcopy favors verbs: "Tap +, pick a category and account, type an amount. That's it."
- **Numbers & money:** Indian Rupee (₹) by default, `en-IN` grouping (₹84,320). Signed where direction matters (`+`, `−`). Money is always rendered through the `Money` component — never a raw string.
- **Emoji:** Used lightly in _marketing/README_ surfaces (💸, 💜) but **never inside the product UI** — the app speaks entirely in Lucide/Ionicons outline glyphs.
- **Taglines:** "Your money. Your device. Your data." / "Zero bytes of your financial data ever leave your device."

**Do:** "Back up regularly." · "Require Face ID to open." · "No recent activity — tap + to add a transaction."
**Don't:** exclamation-heavy hype, jargon, growth-speak, or anything implying a server exists.

---

## Visual Foundations

**Color.** A monochrome system with exactly one accent. The neutral ramp runs warm-charcoal `#0C0C0C` → grey `#6B6B6B` → card fill `#F4F4F4` → white. The single brand accent is **spring green `#00D09C`** (income, primary actions, FAB, active tab, links). Semantics are used _sparingly_: expense/error red `#F45B69`, warning amber `#F5A623`. Income reuses the brand green. Tints are pale washes (`#E0FAF3` primary-subtle, `#E8FBF5` selected). A full dark theme mirrors every token on a `#0C0C0C` canvas (`[data-theme="dark"]`).

**Type.** One typeface — **Spline Sans** (the app's `--font-display`) — across the whole system; Spline Sans Mono for the rare monospace need. Weights 400–800. Restrained size ramp: 11px uppercase overlines → 15px body → 17px callout → 22px keypad → 28px screen headings → 30px hero balances. Money uses tabular numerals with **−0.2px tracking** for a tight, ledger-like feel. Headings tighten further (−0.5 to −1px). No serifs, no second display face.

**Spacing & layout.** A 4px base scale with named steps (`half 2 · one 4 · two 8 · three 16 · four 24 · five 32 · six 64`). 16px (`three`) is the workhorse — card padding and screen gutters. Content is a single scrolling column inside the phone; sections are stacked Cards with 16px gaps. A sticky month selector sits above the dashboard scroll; the FAB is fixed bottom-right.

**Surfaces & cards.** Cards are **flat** — a `#F4F4F4` fill, **14px radius**, no border, no shadow. They clip their contents (full-bleed row lists set `padded={false}`). Settings groups are white with a hairline border + hairline dividers between rows. The system is deliberately shadow-light.

**Elevation.** Essentially one shadow in the entire product: the **FAB** (`0 4px 8px rgba(0,0,0,0.15)`). Bottom sheets get a soft top shadow. Everything else is flat — depth comes from fill contrast, not elevation.

**Corner radii.** Soft but not uniformly pill: cards/buttons/keys **14px**, inputs/toggles **12px**, segmented options/small chips **10px**, modals/sheets **20px**, and **fully round** (999px) for filter chips, the FAB, swatches, dots, and tinted icon circles.

**Iconography color.** Category icons live in a circle **tinted to 13% of the category color** (`color-mix(... 13%, transparent)`), with the glyph in the full color. Solid/filled marks appear only inside the green FAB and on selected category chips; everywhere else is outline.

**Motion.** Elegant and minimal. The signature is a **press-shrink**: buttons scale to 0.97, the FAB and icon buttons to 0.92, on a soft spring (`cubic-bezier(0.2,0.8,0.2,1)`, ~120–180ms). Switch thumbs slide, progress bars grow with the same easing, toasts fade up 12px. No bounces, no parallax, no infinite/decorative loops. Respect `prefers-reduced-motion`.

**States.**

- _Hover/press (neutral):_ background lifts to the warm `#F1EFE8` accent-subtle wash.
- _Press (primary):_ fills darker green `#00B88A` + scale 0.97.
- _Selected:_ primary-subtle wash + green label/border (chips, category circles, account cards get a 2px accent border).
- _Focus (inputs):_ border lifts to green.
- _Disabled:_ 40–45% opacity.

**Imagery.** The product is essentially image-free — it's a tool, not a feed. No photography, no gradients-as-decoration, no illustration inside the app. The one gradient permitted is a faint green radial glow behind the device frame in presentation contexts. Brand imagery = the wallet mark on green.

**Backgrounds.** Pure surfaces: white (light) / near-black (dark). No textures, patterns, or protection gradients. Transparency/blur appears only on the bottom tab bar (an 86%-opacity surface with `backdrop-filter: blur(18px)`).

---

## Iconography

- **System:** [Lucide](https://lucide.dev) outline icons, **inlined as SVG** in `components/core/Icon.jsx`. Stroke width 2, round caps/joins, 24×24 viewBox, `currentColor`. ~40 glyphs cover the app's vocabulary.
- **Why inline, not a font/CDN:** runtime-fetched icon systems (Ionicons web component, Lucide ESM) don't render in static export or offline preview. Inlining guarantees they always paint. Add a glyph by dropping its inner SVG into the `PATHS` map.
- **Semantic aliases:** `Icon` accepts product aliases as well as raw Lucide stems — e.g. `groceries`, `salary`, `biometric`, `backup`, `restore`, `budgets`, `analytics`, `add`, `close`, `next`. See `ICON_ALIASES`.
- **Relationship to the app:** SpentIt ships Ionicons via `@expo/vector-icons` (Ionicons names like `cart-outline`, `wallet-outline`). Lucide is a deliberate, near-identical substitute. **If you need exact app parity, replace the Lucide paths with Ionicons SVGs** — the component API stays the same.
- **No emoji, no unicode-as-icon** anywhere in product UI. Emoji appear only in marketing copy.
- **Logo:** `assets/icon.png` (rounded-square app icon, white wallet on green) and `assets/logo.png` (the wallet mark). The wordmark is **SpentIt** set in Spline Sans Heavy with the "It" in brand green.

---

## What's in here (manifest)

**Root**

- `styles.css` — the single entry point consumers link. Imports the four token files below.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills-compatible front-matter so this system can be used as a downloadable skill.
- `assets/` — `icon.png`, `logo.png`.

**Tokens** (`tokens/`) — all `@import`ed by `styles.css`

- `colors.css` — neutral ramp, green accent + states, semantics, tints, dark theme, the FAB shadow.
- `typography.css` — Spline Sans families, weights, size ramp, tracking.
- `spacing.css` — spacing scale, radii, icon-container & control sizes.
- `fonts.css` — Spline Sans / Spline Sans Mono via Google Fonts.

**Foundation cards** (`guidelines/`) — specimens rendered in the Design System tab

- Colors: primary, neutrals, semantic, dark theme · Type: Spline Sans, scale, money · Spacing: scale, radii & elevation · Brand: logo & app icon, iconography.

**Components** (`components/core/`) — React primitives, each with `.jsx` + `.d.ts` + `.prompt.md`, exposed on `window.SpentItDesignSystem_767bfa`

- _Core:_ `Icon`, `Button`, `IconButton`, `Card`, `Money` (+`formatCurrency`), `SectionTitle`, `Badge`, `Chip`
- _Forms:_ `Input`, `SearchBar`, `Switch`, `SegmentedControl`
- _Data & lists:_ `ListRow`, `SwitchRow`, `TransactionRow`, `AccountCard`, `ProgressBar`
- _Feedback:_ `Fab`, `EmptyState`
- Card files (`*.card.html`) demo each cluster: `buttons`, `money`, `forms`, `rows`, `data`.

**UI kit** (`ui_kits/spentit-app/`) — interactive recreation of the mobile app in a phone frame

- `index.html` — the click-through (onboarding → dashboard → add transaction → transactions → analytics → settings).
- Screens: `Onboarding.jsx`, `Dashboard.jsx`, `Transactions.jsx`, `AddTransaction.jsx`, `Analytics.jsx`, `Settings.jsx`, plus `App.jsx` (shell/tab bar), `widgets.jsx` (status bar, month selector, donut, bar chart), `data.jsx` (mock data).
- `README.md` — kit-specific notes.

**Starting points** (for consuming projects): `Button`, `ListRow`, `TransactionRow` (components).

---

## Using the tokens

```html
<link rel="stylesheet" href="styles.css" />
```

```css
.amount {
  color: var(--income);
  font: 700 var(--text-amount)/1 var(--font-display);
  letter-spacing: var(--tracking-money);
}
.card {
  background: var(--surface-card);
  border-radius: var(--radius-lg);
  padding: var(--space-three);
}
```

For dark mode, set `data-theme="dark"` on a wrapping element. Components read these variables directly, so they retheme automatically.

---

_Built from the SpentIt app codebase (`jyotiprakashh/spent-it@dev`). Your money. Your device. Your data._
