<div align="center">

# 💸 SpentIt

**The expense tracker that never phones home.**

[![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactnative.dev)
[![Expo SDK](https://img.shields.io/badge/Expo_SDK-51-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![SQLite](https://img.shields.io/badge/SQLite-WAL_Mode-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://www.sqlite.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](#license)
[![Platform](https://img.shields.io/badge/Platform-iOS_·_Android-6C63FF?style=flat-square)](#)

[Features](#-features) · [Screenshots](#-screenshots) · [Getting Started](#-getting-started) · [Architecture](#-architecture) · [Data Model](#-data-model) · [Backup Strategy](#-backup--restore) · [Contributing](#-contributing)

</div>

---

## What is SpentIt?

SpentIt is a **100% offline**, privacy-first mobile expense tracker for iOS and Android. Your financial data lives entirely on your device — encrypted, indexed, and fast — with no accounts, no subscriptions, no ads, and no cloud dependency of any kind.

> **Zero bytes of your financial data ever leave your device.** No server, no analytics SDK, no telemetry. Auditable, open-source MIT license.

---

## ✨ Features

### Core Tracking

- Add expenses and income with category, payment method, date, and notes
- Swipe to delete with a 5-second undo window
- Full-text search across notes and category names
- Filter by date range, category, type, or payment method
- Recurring transactions (daily / weekly / monthly)

### Budgets

- Set monthly spending budgets per category
- Visual progress bars with alerts at 80% and 100% consumption
- Overall monthly budget ceiling with net balance tracking

### Analytics

- Spending donut chart broken down by category
- Daily spending trend line for any month
- 6-month bar chart comparison
- Category drill-down — tap any chart segment to see its transactions
- Year-to-date income vs expense area chart

### Security & Privacy

- Face ID / Touch ID / PIN lock on every launch
- Auto-locks after 30 seconds in background (configurable)
- AES-256 database encryption via SQLCipher
- Encryption key stored in hardware secure enclave (iOS Keychain / Android Keystore)

### Backup & Restore

- Export as encrypted `.spentit` file (AES-256 + passphrase)
- Export as plain JSON or CSV
- Native OS share sheet — save to iCloud Drive, Google Drive, email, USB
- Full restore from any backup file via document picker
- 7-day backup reminder if no recent export

---

## 📱 Screenshots

> _Screenshots coming after first TestFlight build_

---

## 🛠 Tech Stack

| Layer          | Technology                      | Why                                           |
| -------------- | ------------------------------- | --------------------------------------------- |
| UI Framework   | React Native 0.74 + Expo SDK 51 | Cross-platform, Expo managed workflow         |
| Navigation     | Expo Router (file-based)        | Typed routes, deep-link ready                 |
| Database       | expo-sqlite + SQLCipher         | Local WAL-mode SQLite with AES-256 encryption |
| State          | Zustand + TanStack Query        | UI state + async data layer with caching      |
| Charts         | Victory Native XL               | Skia-backed, 60fps SVG charts                 |
| Lists          | @shopify/flash-list             | RecyclerView-backed, 60fps on large datasets  |
| Animations     | Reanimated 3                    | UI-thread animations, no JS bridge stutter    |
| Biometrics     | expo-local-authentication       | Face ID / Touch ID / system PIN               |
| Secure storage | expo-secure-store               | Hardware-backed keychain                      |
| File I/O       | expo-file-system + expo-sharing | Local file write + OS share sheet             |
| Backup import  | expo-document-picker            | iCloud Drive / Google Drive / Files picker    |
| Build          | EAS Build                       | App Store + Play Store CI/CD                  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Yarn 1.x
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode 15+ (macOS only)
- Android: Android Studio Hedgehog+

### Install

```bash
git clone https://github.com/your-org/spentit.git
cd spentit
yarn install
```

### Run

```bash
# Start Expo dev server
yarn start

# Run on iOS simulator
yarn ios

# Run on Android emulator
yarn android
```

### Common Commands

```bash
yarn test              # Jest test suite
yarn test:coverage     # Coverage report (repositories ≥ 90%, services ≥ 80%)
yarn lint              # ESLint
yarn type-check        # tsc --noEmit (strict mode, zero errors required)
yarn db:migrate        # Apply pending migrations (dev helper)
```

### Build for release

```bash
# Requires EAS account (free tier works)
yarn export:ios        # EAS Build → .ipa
yarn export:android    # EAS Build → .aab
```

---

## 🏗 Architecture

SpentIt follows a strict layered architecture. Each layer has one job and never reaches past its neighbours.

```
┌──────────────────────────────────────────────────┐
│          Presentation Layer                      │
│    Expo Router Screens + React Components        │
│    (renders data, fires events — no SQL, no      │
│     business logic)                              │
├──────────────────────────────────────────────────┤
│          State Layer                             │
│    Zustand (UI state) + TanStack Query           │
│    (async cache, loading/error states)           │
├──────────────────────────────────────────────────┤
│          Service Layer                           │
│    AuthService · ExportService · ImportService   │
│    BudgetAlertService                            │
│    (business rules, orchestrates repositories)   │
├──────────────────────────────────────────────────┤
│          Repository Layer                        │
│    TransactionRepository · CategoryRepository    │
│    BudgetRepository · SettingsRepository         │
│    (all SQL lives here — nowhere else)           │
├──────────────────────────────────────────────────┤
│          Database Layer                          │
│    SQLite (WAL mode) · SQLCipher AES-256         │
│    expo-sqlite async API                         │
└──────────────────────────────────────────────────┘
```

### Directory Structure

```
spentit/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Biometric gate — renders before all UI
│   ├── (tabs)/
│   │   ├── index.tsx             # Dashboard
│   │   ├── transactions.tsx      # Transaction list
│   │   ├── analytics.tsx         # Charts
│   │   └── settings.tsx          # Settings & backup
│   └── modals/add-transaction.tsx
├── src/
│   ├── components/               # Pure UI — no business logic
│   │   ├── charts/               # Victory Native XL wrappers
│   │   ├── forms/                # TransactionForm, CategoryPicker
│   │   └── common/               # Button, Card, Badge, ProgressBar
│   ├── db/
│   │   ├── init.ts               # openDatabase(), WAL + PRAGMA setup
│   │   ├── migrations/           # v001.sql, v002.sql, ... (never edited after commit)
│   │   └── repositories/         # One file per entity — all SQL here
│   ├── services/                 # Business logic
│   ├── stores/                   # Zustand slices
│   ├── hooks/                    # React Query wrappers
│   ├── types/                    # TypeScript interfaces & enums
│   └── utils/                    # Pure functions — currency, date, theme
├── .claude/
│   ├── agents/                   # Claude Code sub-agents (6)
│   └── commands/                 # Custom slash commands (/feature, /review, /db ...)
└── CLAUDE.md                     # Claude Code project memory
```

---

## 🗄 Data Model

The schema is normalised to 3NF. All analytics aggregate at the SQL layer — no row-pulling into JavaScript memory.

```sql
-- Core tables
categories        (id, name, icon, color, is_income, is_archived, sort_order)
payment_methods   (id, name, icon, is_default)
transactions      (id, amount, type, category_id, payment_method_id,
                   note, date, time, currency, receipt_uri,
                   is_recurring, recurrence_rule)
budgets           (id, category_id, amount, period, year, month)
app_settings      (key, value)

-- Performance indexes on transactions
idx_txn_date        ON transactions(date)
idx_txn_category    ON transactions(category_id)
idx_txn_type_date   ON transactions(type, date)
idx_txn_cat_date    ON transactions(category_id, date)
```

### Database configuration

Every database open runs these pragmas:

```sql
PRAGMA journal_mode = WAL;       -- concurrent reads during writes
PRAGMA foreign_keys = ON;
PRAGMA cache_size    = -8000;    -- 8MB page cache
PRAGMA synchronous   = NORMAL;
```

### Migrations

Schema changes are additive-only numbered SQL files. They never drop or modify existing columns.

```bash
src/db/migrations/
├── v001_initial_schema.sql
├── v002_add_receipt_uri.sql
└── v003_add_payment_methods.sql
```

---

## 🔒 Security Design

### Encryption Key Lifecycle

```
1. First install → generate 256-bit random key via expo-crypto
2. Store key in expo-secure-store (iOS Keychain / Android Keystore)
3. On launch → biometric unlocks secure enclave → retrieve key
4. Pass key to SQLCipher: PRAGMA key = '...' immediately after db.open()
5. Key never written to AsyncStorage, logs, or plain SQLite
6. "Clear all data" → regenerate key, delete old encrypted db
```

### Threat Model

| Threat                      | Mitigation                                                                    |
| --------------------------- | ----------------------------------------------------------------------------- |
| Physical device theft       | SQLCipher AES-256 + OS full-disk encryption                                   |
| Key extraction from storage | Hardware-backed SecureStore, never AsyncStorage                               |
| Backup file interception    | `.spentit` files encrypted with user passphrase (PBKDF2-SHA256 + AES-256-GCM) |
| Malicious import file       | JSON schema validation + parameterised SQL inserts on all import paths        |
| SQL injection               | Parameterised queries (`?` placeholders) enforced by code review and linting  |

---

## 💾 Backup & Restore

SpentIt delegates cloud storage entirely to the user — zero server costs, zero privacy liability.

### Export formats

| Format         | Extension  | Encrypted               | Use case                        |
| -------------- | ---------- | ----------------------- | ------------------------------- |
| SpentIt Native | `.spentit` | ✅ AES-256 + passphrase | Full restore on new device      |
| JSON           | `.json`    | ❌                      | Data portability, developer use |
| CSV (zipped)   | `.zip`     | ❌                      | Spreadsheet analysis            |

### How it works

```
App → writes local file → hands to OS share sheet
User → saves to iCloud Drive / Google Drive / email / USB
                          ↕
New device: user opens SpentIt → taps Import → picks file from Files app
App → validates → decrypts → atomic SQLite restore
```

No servers. No API keys. No monthly bill.

### Restore flow

1. Tap **Settings → Import / Restore**
2. Pick a `.spentit` or `.json` file from any location (iCloud, Google Drive, local)
3. Enter passphrase (`.spentit` only)
4. Preview: _"1,247 transactions, 18 categories — this will replace current data"_
5. Confirm → atomic restore → navigate to Dashboard

---

## 🧪 Testing

```bash
yarn test                  # Full suite
yarn test src/db/          # Repository layer only
yarn test:coverage         # Coverage report
```

### Coverage gates (CI-enforced)

| Layer                  | Minimum |
| ---------------------- | ------- |
| `src/db/repositories/` | 90%     |
| `src/services/`        | 80%     |
| `src/hooks/`           | 70%     |
| `src/utils/`           | 90%     |
| `src/components/`      | 60%     |

Repository tests use in-memory SQLite (`:memory:`) — fast, isolated, no cleanup.  
Service tests use `jest.fn()` mocked repositories.

---

## 🤖 Claude Code Setup

This project ships with a full Claude Code configuration for AI-assisted development.

### Sub-agents (`.claude/agents/`)

Claude Code automatically delegates tasks to the right specialist:

| Agent                      | Auto-triggers on                               |
| -------------------------- | ---------------------------------------------- |
| `db-architect`             | Schema changes, migrations, query optimisation |
| `security-auditor`         | Crypto, auth, export/import, keychain code     |
| `rn-component-builder`     | Screens, components, animations, dark mode     |
| `test-writer`              | After any new function, class, or repository   |
| `performance-profiler`     | Slow queries, render stutters, bundle size     |
| `export-import-specialist` | Backup formats, share sheet, restore flow      |

### Slash commands (`.claude/commands/`)

```bash
/feature add category budgets   # Full end-to-end implementation (types → db → service → UI → tests)
/db add receipt_uri column      # Migration + EXPLAIN analysis via db-architect agent
/review                         # Multi-dimension PR review (correctness, security, perf, tests)
/test --coverage                # Run, fix failures, fill coverage gaps
/security                       # Full AES/auth/import checklist before any release
```

---

## 🤝 Contributing

1. Fork the repo and create a branch: `feat/your-feature-name`
2. Read `CLAUDE.md` — it defines all coding standards and immutable rules
3. Follow the layered architecture (no raw SQL outside repositories)
4. Run `yarn type-check && yarn lint && yarn test` before pushing
5. Keep PRs under 400 lines diff — split large features
6. Use Conventional Commits: `feat(transactions): add swipe-to-delete with undo`

### Before adding a dependency

- Does it make network calls at runtime? → **Reject**
- Does it include telemetry? → **Reject**
- Is Expo SDK 51 compatible? → Run `npx expo install package-name` to verify
- Last commit < 6 months ago? → Prefer

---

## 📋 Roadmap

**v1.0 — Foundation**

- [x] Database layer (WAL + SQLCipher + migrations)
- [x] Biometric auth gate
- [ ] Transaction CRUD
- [ ] Dashboard + analytics
- [ ] Category budgets
- [ ] Backup & restore

**v2.0 — Backlog**

- [ ] Receipt photo capture (local storage)
- [ ] Recurring transaction automation
- [ ] iOS Lock Screen / Android Home Screen widgets
- [ ] Multi-currency with offline exchange rates
- [ ] PDF report export
- [ ] Apple Watch / WearOS quick-entry companion

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

<div align="center">

Made with 💜 by Jyotiprakash and a healthy distrust of cloud services.

**Your money. Your device. Your data.**

</div>
