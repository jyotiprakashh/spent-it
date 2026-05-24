@AGENTS.md

# SpentIt

> 100% offline, privacy-first mobile expense tracker.
> React Native · Expo SDK 51 · SQLite (WAL) · SQLCipher · TypeScript strict

---

## 🏗️ Project Architecture

```
spentit/
├── app/                        # Expo Router screens
│   ├── (auth)/                 # Biometric lock gate
│   ├── (tabs)/                 # Bottom tab navigator
│   │   ├── index.tsx           # Dashboard
│   │   ├── transactions.tsx    # Transaction list
│   │   ├── analytics.tsx       # Charts & insights
│   │   └── settings.tsx        # Settings & backup
│   └── modals/                 # Add/Edit transaction
├── src/
│   ├── components/             # Reusable UI only — no business logic
│   │   ├── charts/             # Victory Native XL wrappers
│   │   ├── forms/              # TransactionForm, CategoryPicker
│   │   └── common/             # Button, Card, Badge, ProgressBar, etc.
│   ├── db/
│   │   ├── init.ts             # openDatabase(), WAL config, pragma setup
│   │   ├── migrations/         # v001.sql, v002.sql ... run in order
│   │   └── repositories/       # ONE file per entity — all SQL lives here
│   ├── services/               # Business logic — orchestrates repositories
│   │   ├── AuthService.ts
│   │   ├── ExportService.ts
│   │   ├── ImportService.ts
│   │   └── BudgetAlertService.ts
│   ├── stores/                 # Zustand UI state (non-async)
│   ├── hooks/                  # React Query hooks wrapping repositories
│   ├── types/                  # TypeScript interfaces & enums
│   └── utils/                  # Pure functions — currency, date, format
├── assets/
├── .claude/
│   ├── agents/                 # Project sub-agents (checked into git)
│   └── commands/               # Custom slash commands
└── CLAUDE.md                   # ← You are here
```

---

## 🔒 Immutable Rules — Never Violate These

1. **Zero network calls.** The app never imports or calls any networking library at runtime. No fetch(), no axios, no WebSocket. Expo permissions must reflect zero `INTERNET` usage on Android.

2. **No raw SQL outside repositories.** Every SQL statement lives in `src/db/repositories/`. Services and hooks call repository methods — never `db.runAsync()` directly.

3. **No analytics / telemetry SDKs.** No Firebase, Amplitude, Mixpanel, Sentry cloud, or any SDK that phones home. Local-only error logging via a `src/utils/logger.ts` file that writes to SQLite.

4. **TypeScript strict mode.** `tsconfig.json` has `"strict": true`. No `any` types — use `unknown` and narrow. No `@ts-ignore` or `@ts-expect-error` except in `*.test.ts` files.

5. **Parameterized SQL always.** Never string-interpolate user input into SQL. Always use `?` placeholders via the `db.runAsync(sql, [...params])` API.

6. **Encryption key never in plain storage.** The AES-256 key lives in `expo-secure-store` only. Never in `AsyncStorage`, env vars, console logs, or committed to git.

7. **WAL mode on every db open.** `PRAGMA journal_mode = WAL` must be the first statement run after `openDatabaseAsync`. No exceptions.

8. **One concern per file.** Repositories only do SQL. Services only orchestrate. Hooks only bridge React Query ↔ services. Components only render.

---

## 📐 Coding Standards

### TypeScript

```ts
// ✅ Explicit return types on all exported functions
export async function getTransactions(filters: TransactionFilters): Promise<Transaction[]> {}

// ✅ Prefer type aliases for domain objects, interfaces for structural contracts
type Transaction = { id: number; amount: number; type: TxnType; ... };
interface ITransactionRepository { create(tx: NewTransaction): Promise<number>; ... }

// ✅ Enums for fixed sets
enum TxnType { Expense = 'expense', Income = 'income' }

// ❌ Never
const doThing = (data: any) => data.whatever;
```

### React Native Components

```tsx
// ✅ Functional components only, explicit prop types
type BalanceCardProps = { income: number; expense: number; currency: string };
export function BalanceCard({ income, expense, currency }: BalanceCardProps) { ... }

// ✅ StyleSheet.create() always — never inline style objects
const styles = StyleSheet.create({ card: { ... } });

// ✅ Memoize expensive list renders
const renderItem = useCallback(({ item }: { item: Transaction }) => <TxnRow item={item} />, []);

// ❌ Never use FlatList for transaction lists — use @shopify/flash-list
```

### Repository Pattern

```ts
// ✅ Every repository extends BaseRepository
export class TransactionRepository extends BaseRepository {
  async create(tx: NewTransaction): Promise<number> {
    const result = await this.db.runAsync(
      `INSERT INTO transactions (amount, type, category_id, note, date) VALUES (?, ?, ?, ?, ?)`,
      [tx.amount, tx.type, tx.category_id, tx.note ?? null, tx.date],
    );
    return result.lastInsertRowId;
  }
}

// ✅ Return typed results — never return raw SQLResultSet
```

### Error Handling

```ts
// ✅ Custom error classes
class DatabaseError extends Error {
  constructor(
    msg: string,
    public readonly code: string,
  ) {
    super(msg);
  }
}
class ImportValidationError extends Error {
  constructor(
    msg: string,
    public readonly reason: ImportErrorReason,
  ) {
    super(msg);
  }
}

// ✅ Try/catch at service boundaries — repositories may throw
// ✅ React Query error state drives UI — never silent failures
```

### Naming Conventions

| Thing            | Convention              | Example                           |
| ---------------- | ----------------------- | --------------------------------- |
| Files            | kebab-case              | `transaction-repository.ts`       |
| React components | PascalCase              | `BalanceCard.tsx`                 |
| Hooks            | camelCase, `use` prefix | `useTransactions.ts`              |
| Stores           | camelCase, `use` prefix | `useSettingsStore.ts`             |
| Constants        | SCREAMING_SNAKE         | `DEFAULT_CURRENCY`                |
| DB tables        | snake_case              | `transactions`, `payment_methods` |
| SQL columns      | snake_case              | `category_id`, `created_at`       |
| TypeScript types | PascalCase              | `Transaction`, `NewTransaction`   |

---

## 🗄️ Database Rules

- **WAL mode** — always. Set on every `openDatabaseAsync` call.
- **foreign_keys = ON** — always.
- **Migrations** — numbered SQL files in `src/db/migrations/`. Never alter an existing migration. Add a new one.
- **Indexes** — `date`, `category_id`, and `(type, date)` are indexed on `transactions`. Check query plans before adding new indexes.
- **No ORM** — raw SQL via expo-sqlite. Keeps bundle lean and queries explicit.
- **Transactions** — wrap multi-statement writes in `db.withTransactionAsync()`.

---

## 🎨 UI / Design Rules

- **Theme** — follow system (light/dark). Use `useColorScheme()`. No hardcoded hex colors in components — consume from `src/constants/theme.ts` tokens.
- **Animations** — Reanimated 3 only. Never `Animated` from react-native core (deprecated pattern).
- **Lists** — `FlashList` from `@shopify/flash-list` for any scrollable list > 20 items.
- **Charts** — `victory-native-xl` only. SQL aggregates feed charts — never map raw rows.
- **Icons** — `@expo/vector-icons` (Ionicons set). Consistent icon names documented in `src/utils/icons.ts`.

---

## 🧪 Testing Standards

- **Unit tests** — Jest + `@testing-library/react-native`. One `*.test.ts` per source file.
- **Repository tests** — use in-memory SQLite (`:memory:`). Seed with fixtures.
- **Service tests** — mock repositories via `jest.fn()`.
- **No snapshot tests** — they break constantly and add no value.
- **Coverage gates** — repositories ≥ 90%, services ≥ 80%, components ≥ 60%.
- Run: `npx expo test` or `yarn test`.

---

## 🔄 Git Workflow

- **Branch names** — `feat/`, `fix/`, `chore/`, `docs/` prefixes. Example: `feat/add-receipt-photo`
- **Commits** — Conventional Commits: `feat(transactions): add swipe-to-delete with undo`
- **Never commit** — `.env`, `*.spentit`, SQLite db files, `node_modules`, `*.log`
- **PR size** — keep PRs under 400 lines diff. Split large features.

---

## 📦 Dependency Rules

Before adding any npm package, verify:

1. Does it need network access? → Reject.
2. Does it contain telemetry? → Reject.
3. Is it maintained (last commit < 6 months)? → Prefer.
4. Does Expo SDK 51 support it? → Check `npx expo install` compatibility.

Approved packages are listed in `package.json`. Do not add unlisted packages without team review.

---

## 🚀 Dev Commands

```bash
yarn start              # Start Expo dev server
yarn ios                # Run on iOS simulator
yarn android            # Run on Android emulator
yarn test               # Run test suite
yarn test:coverage      # Coverage report
yarn lint               # ESLint
yarn type-check         # tsc --noEmit
yarn db:migrate         # Run pending migrations (dev helper script)
yarn export:ios         # EAS build for iOS
yarn export:android     # EAS build for Android
```

---

## 🤖 Sub-Agent Roster

| Agent file                    | When Claude auto-delegates                          |
| ----------------------------- | --------------------------------------------------- |
| `db-architect.md`             | Schema changes, new migrations, query optimization  |
| `security-auditor.md`         | Any crypto, keychain, export/import, or auth code   |
| `rn-component-builder.md`     | New UI screens, components, or style work           |
| `test-writer.md`              | After any new function, class, or repository method |
| `performance-profiler.md`     | Slow queries, render bottlenecks, bundle size       |
| `export-import-specialist.md` | ExportService, ImportService, backup/restore flows  |

---

## 📋 Current Sprint Focus

> Update this section at the start of each sprint.

**Phase:** Foundation (Phase 1)
**Active work:** Database layer + Auth gate
**Blocked by:** —
**Next up:** Transaction CRUD + FlashList

---

_Last updated: May 2025 | Maintained by the SpentIt team_
