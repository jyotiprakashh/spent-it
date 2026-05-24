💸

**SpentIt**

Sprint-by-Sprint Build Plan

_Phase-wise implementation guide for an AI-assisted, offline-first mobile expense tracker_

| **Property**         | **Value**                                        |
| -------------------- | ------------------------------------------------ |
| Total sprints        | 8 sprints across 6 phases                        |
| Total duration       | 10 weeks (2 weeks buffer built in)               |
| Stack                | React Native · Expo SDK 51 · SQLite · TypeScript |
| Claude Code workflow | /feature → /db → /review → /test → /security     |
| Version              | 1.0 · May 2025                                   |

**How to use this document**

Each sprint section contains: a sprint goal, a full task table with acceptance criteria and effort estimates, a definition of done, and the exact Claude Code slash commands to run. Feed this document to Claude Code at the start of each sprint and work through tasks in the order listed.

# **Effort & Layer Legend**

## **Effort sizing**

| **Size** | **Hours** | **What it usually means**                                    |
| -------- | --------- | ------------------------------------------------------------ |
| S        | 1-2 h     | Single function, config change, or type definition           |
| M        | 2-4 h     | One repository method + tests, or one simple component       |
| L        | 4-8 h     | Full feature slice: repo + service + hook, or complex screen |
| XL       | 8-16 h    | Cross-layer feature with auth, encryption, or external API   |

## **Layer colour key**

| **Colour** | **Layer** | **Files it covers**                         |
| ---------- | --------- | ------------------------------------------- |
| Red        | DB        | src/db/init.ts, src/db/migrations/\*.sql    |
| Purple     | Repo      | src/db/repositories/\*.ts                   |
| Amber      | Service   | src/services/\*.ts                          |
| Blue       | Hook      | src/hooks/\*.ts                             |
| Teal       | UI        | app/\*\*/\*.tsx, src/components/\*\*/\*.tsx |
| Green      | Test      | \*\*/\*.test.ts, \*\*/\*.test.tsx           |
| Gray       | Config    | app.json, tsconfig, eslint, eas.json        |
| Navy       | Infra     | scripts/, .github/, .claude/                |

# **Release Plan Overview**

Ten weeks, eight sprints, six phases. Each phase ships a working vertical slice - the app is always runnable at the end of any sprint.

| **Phase** | **Sprints** | **Weeks** | **Theme**                       | **Deliverable**                                                   |
| --------- | ----------- | --------- | ------------------------------- | ----------------------------------------------------------------- |
| 1         | 1           | Wk 1-2    | Foundation                      | Encrypted SQLite DB + biometric auth gate + accounts schema       |
| 2         | 2           | Wk 2-3    | Core CRUD                       | Add / edit / delete transactions, FlashList, account picker       |
| 3         | 3           | Wk 4      | Dashboard                       | Net worth card, per-account balances, recent transactions, FAB    |
| 4         | 4           | Wk 5-6    | Analytics                       | All 5 charts, month picker, per-account filter, drill-down        |
| 5         | 5-6         | Wk 7-8    | Budgets + Categories + Accounts | Category manager, budgets, alerts, accounts manager               |
| 6         | 7-8         | Wk 9-10   | Backup + Polish                 | Export / import (accounts included), settings, dark mode, release |

## **What "done" means for a sprint**

- All tasks in the sprint table are merged to main
- yarn type-check passes with zero errors
- yarn lint passes with zero warnings
- yarn test --coverage meets layer minimums (repos ≥ 90%, services ≥ 80%)
- App runs on both iOS simulator and Android emulator
- No console.error or unhandled promise rejections during manual smoke test

# **Phase 1 - Foundation**

**Sprint 1** · Project Scaffold + Database Layer + Accounts

Duration: Week 1 (5 days)

**Sprint goal:** _The app opens, authenticates with biometrics, and a WAL-mode AES-256-encrypted SQLite database is ready with the full v1 schema including the accounts table with opening balances._

### **Context for Claude Code**

Feed this section to Claude Code at the start of Sprint 1. Run: /feature "Sprint 1 - project scaffold and database layer"

### **Tasks**

| **ID**     | **Task**                                                                                                                                       | **Layer**   | **Acceptance criteria**                                                                                                        | **Effort** |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| **S1-01**  | Initialise Expo SDK 51 project with TypeScript strict, Expo Router, EAS config                                                                 | **Config**  | _yarn start runs; tsc --noEmit passes; app.json has correct bundle IDs_                                                        | **M**      |
| **S1-02**  | Configure ESLint (airbnb-typescript), Prettier, and Husky pre-commit hook                                                                      | **Config**  | _yarn lint passes on empty project; git commit triggers lint + type-check_                                                     | **S**      |
| **S1-03**  | Install and configure expo-sqlite with WAL mode and all required PRAGMAs                                                                       | **DB**      | _PRAGMA journal_mode returns WAL; foreign_keys returns 1; cache_size returns -8000_                                            | **M**      |
| **S1-04**  | Write v001_initial_schema.sql migration (all 6 tables + all indexes) including accounts table                                                  | **DB**      | _Migration applies cleanly; PRAGMA user_version returns 1; all indexes exist; accounts table present_                          | **L**      |
| **S1-05**  | Build migration runner (reads user_version, applies missing files in order)                                                                    | **DB**      | _Running runner twice is idempotent; adding v002 applies only v002_                                                            | **M**      |
| **S1-06**  | Seed default categories (15 rows), default payment methods (Cash, Card), and one default account ("Cash Wallet", type=cash, opening_balance=0) | **DB**      | _SELECT COUNT(\*) FROM categories returns 15; accounts has 1 default row_                                                      | **S**      |
| **S1-07**  | Implement BaseRepository class with typed db reference and error wrapping                                                                      | **Repo**    | _DatabaseError is thrown with code on SQLite failure; never crashes silently_                                                  | **M**      |
| **S1-07b** | Implement AccountRepository: create, getAll, getById, update, archive; getRunningBalance (opening_balance + SQL aggregation)                   | **Repo**    | _getRunningBalance = opening_balance + SUM(income) - SUM(expense) for that account; correct for accounts with no transactions_ | **L**      |
| **S1-08**  | Install expo-secure-store + expo-crypto; write AuthService.generateAndStoreKey()                                                               | **Service** | _Key is 32 bytes; stored in SecureStore; retrievable across app restarts_                                                      | **M**      |
| **S1-09**  | Integrate SQLCipher via expo-sqlite-encrypted; open DB with stored key                                                                         | **DB**      | _DB file is not readable as plain text; correct key opens it; wrong key throws_                                                | **L**      |
| **S1-10**  | Build biometric auth gate screen - blocks all UI until authenticated                                                                           | **UI**      | _Dashboard never renders before auth; Face ID / PIN tested on device_                                                          | **L**      |
| **S1-11**  | Wire AuthService into app startup: generate key on first launch, retrieve on subsequent                                                        | **Service** | _First launch: key generated + stored. Subsequent: key retrieved, DB opened_                                                   | **M**      |
| **S1-12**  | Write tests for migration runner (in-memory SQLite)                                                                                            | **Test**    | _Runner applies migrations in order; idempotent; handles missing files gracefully_                                             | **M**      |
| **S1-13**  | Write tests for AuthService (mock SecureStore)                                                                                                 | **Test**    | _generateAndStoreKey and retrieveKey tested; error paths covered_                                                              | **M**      |
| **S1-14**  | Add .claude/ agents + commands from project config zip                                                                                         | **Infra**   | _/agents shows 6 agents in Claude Code; /feature /db /review /test /security all load_                                         | **S**      |

### **Definition of done - Sprint 1**

- App cold-launches, shows biometric prompt, unlocks, and reaches a blank tab bar
- SQLite is encrypted, in WAL mode, schema v1 applied (including accounts table), default data seeded
- AccountRepository.getRunningBalance() returns correct balance for account with and without transactions
- yarn test --coverage: migration runner and AuthService ≥ 90%
- No hardcoded colours, no any types, no raw SQL outside repositories

### **Claude Code commands for this sprint**

/feature "set up expo-sqlite with WAL mode, PRAGMAs, and v001 migration including accounts table"

/db "review v001_initial_schema.sql - accounts table, opening_balance, getRunningBalance query"

/security "review AuthService key generation and SQLCipher integration"

/test "write tests for migration runner, AuthService, and AccountRepository.getRunningBalance"

/review "Sprint 1 complete - review all files before marking done"

# **Phase 2 - Core Transaction CRUD**

**Sprint 2** · Transaction Repository + Add/Edit Modal + Account Picker

Duration: Week 2 (5 days)

**Sprint goal:** _Users can add, view, edit, and delete transactions linked to a specific account. The transaction list renders at 60fps with FlashList._

### **Tasks**

| **ID**    | **Task**                                                                                                                    | **Layer** | **Acceptance criteria**                                                                                      | **Effort** |
| --------- | --------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ | ---------- |
| **S2-01** | Implement TransactionRepository: create, findById, update, softDelete, getPaginated - transactions now reference account_id | **Repo**  | _All methods return typed results; parameterised SQL; account_id FK enforced; cursor pagination works_       | **L**      |
| **S2-02** | Implement CategoryRepository: getAll, getById, getActive (excludes archived)                                                | **Repo**  | _Archived categories excluded from getActive; is_system categories cannot be deleted_                        | **M**      |
| **S2-03** | Implement PaymentMethodRepository: getAll, getDefault, upsert (kept for legacy/optional tagging)                            | **Repo**  | _Default payment method flagged correctly; upsert is idempotent_                                             | **S**      |
| **S2-04** | Implement SettingsRepository: get, set, getAll                                                                              | **Repo**  | _get returns null for missing keys (not throw); set is atomic_                                               | **S**      |
| **S2-05** | Build useTransactions hook (React Query) with filter params: yearMonth, type, category_id, account_id, search               | **Hook**  | _Changing any filter rerenders list; account_id filter narrows to that account; staleTime 60s_               | **M**      |
| **S2-06** | Build useAccounts hook: returns all non-archived accounts with running balance computed                                     | **Hook**  | _Running balance = opening_balance + SQL aggregation; updates immediately after any transaction write_       | **M**      |
| **S2-07** | Build useCategories hook (React Query)                                                                                      | **Hook**  | _Categories load on mount; cache invalidated after create/edit/archive_                                      | **S**      |
| **S2-08** | Build AddTransactionModal screen (Expo Router modal) - includes account picker                                              | **UI**    | _All fields present including account selector; defaults to last-used account; Save invalidates query cache_ | **XL**     |
| **S2-09** | Account picker in modal: horizontal chip list of active accounts; tapping opens full account list if > 4 accounts           | **UI**    | _Selected account highlighted; at least one account always selected; defaults to first if only one_          | **M**      |
| **S2-10** | Amount field: numeric custom keypad, 2 decimal places, max 10 digits                                                        | **UI**    | _Cannot enter more than 10 digits; decimal handled correctly on both platforms_                              | **M**      |
| **S2-11** | Category picker: horizontal scrolling icon grid filtered by transaction type                                                | **UI**    | _Expense categories shown for expense, income for income; + opens create flow_                               | **M**      |
| **S2-12** | Date picker: native DateTimePicker, defaults to today                                                                       | **UI**    | _Future dates allowed; date stored as ISO 8601 string (YYYY-MM-DD)_                                          | **S**      |
| **S2-13** | Edit mode: pre-populate all form fields including account from existing transaction                                         | **UI**    | _Editing preserves all original values including account; Save updates, not inserts_                         | **M**      |
| **S2-14** | Build TransactionsScreen with FlashList: grouped by date, swipe-to-delete with undo toast                                   | **UI**    | _List scrolls at 60fps with 1000+ items; undo cancels delete within 5s_                                      | **XL**     |
| **S2-15** | Account filter chip in TransactionsScreen: "All accounts" default + individual account chips                                | **UI**    | _Selecting an account chip filters list to that account only; "All accounts" resets_                         | **M**      |
| **S2-16** | Search bar: full-text search on note + category name (SQL LIKE)                                                             | **UI**    | _Results update as user types with 300ms debounce; empty state shown_                                        | **M**      |
| **S2-17** | Write repository tests: TransactionRepository, CategoryRepository, AccountRepository (in-memory SQLite)                     | **Test**  | _CRUD paths, account_id FK violation, running balance accuracy, and pagination tested_                       | **L**      |

### **Definition of done - Sprint 2**

- User can add expense, add income, edit, and delete with undo
- Transaction list scrolls 60fps with 1000 seeded rows (Flipper verified)
- User can add expense, add income (both linked to an account), edit, and delete with undo
- Account picker shows in the modal; account filter chip works in the transaction list
- Transaction list scrolls 60fps with 1000 seeded rows (Flipper verified)
- TransactionRepository ≥ 90% coverage; AccountRepository ≥ 90%
- Running balance is correct for accounts with mixed income/expense transactions

### **Claude Code commands**

/feature "implement TransactionRepository with account_id FK, cursor pagination, and all CRUD methods"

/feature "build AddTransactionModal with account picker, category picker, and numeric keypad"

/feature "build TransactionsScreen with FlashList, account filter chip, date grouping, swipe-to-delete"

/test "write TransactionRepository and AccountRepository tests with in-memory SQLite"

/review

# **Phase 3 - Dashboard**

**Sprint 3** · Dashboard Screen + Net Worth + SQL Aggregations

Duration: Week 3 (3 days)

**Sprint goal:** _The dashboard loads in under 300ms, shows total net worth across all accounts, per-account balance cards, spending donut, and recent transactions._

### **Tasks**

| **ID**    | **Task**                                                                                                              | **Layer** | **Acceptance criteria**                                                                                              | **Effort** |
| --------- | --------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| **S3-01** | Write getMonthlySummary SQL query in TransactionRepository (income, expense, net) - optionally filtered by account_id | **Repo**  | _Single query, no JS aggregation; account_id=null returns all accounts; returns 0s for months with no data_          | **S**      |
| **S3-02** | Write getNetWorth SQL in AccountRepository: SUM of all running balances across all active accounts                    | **Repo**  | _net_worth = SUM(opening_balance + income - expense) per account, summed; correct for accounts with no transactions_ | **M**      |
| **S3-03** | Write getAllAccountBalances SQL: per-account running balance for the AccountBalanceList                               | **Repo**  | _Returns one row per active account with current_balance; ordered by balance DESC_                                   | **S**      |
| **S3-04** | Write getSpendingByCategory SQL (GROUP BY category_id with JOIN) - optionally filtered by account_id                  | **Repo**  | _Returns category id, name, color, total; ordered by total DESC; account filter works_                               | **S**      |
| **S3-05** | Write getDailyTrend SQL (GROUP BY strftime day)                                                                       | **Repo**  | _Returns 28-31 rows; days with no spending return 0 via LEFT JOIN on calendar CTE_                                   | **M**      |
| **S3-06** | Build useDashboard hook: fetches netWorth, allAccountBalances, monthlySummary, byCategory, recent in parallel         | **Hook**  | _All queries fire in parallel; single loading state; cache key includes yearMonth and selectedAccountId_             | **M**      |
| **S3-07** | Build NetWorthCard component: total net worth (sum of all account balances) in large display                          | **UI**    | _Negative net worth shown in red; positive in green; updates after any transaction_                                  | **M**      |
| **S3-08** | Build AccountBalanceList: horizontal scroll row of account cards - name, icon, current balance                        | **UI**    | _Tapping an account card filters the dashboard to that account; "All" chip resets; negative balance shown in red_    | **L**      |
| **S3-09** | Build BalanceCard component: income vs expense for selected month and selected account                                | **UI**    | _Updates correctly when account filter changes; "All accounts" aggregates correctly_                                 | **M**      |
| **S3-10** | Build SpendingDonutChart component (Victory Native XL) with top-5 + Other rollup                                      | **UI**    | _Renders from SQL data; respects account filter; empty state when no spending; tap to drill down_                    | **L**      |
| **S3-11** | Build RecentTransactions component: last 5, with category icon, account name badge, amount, date                      | **UI**    | _Shows account name badge on each row; tapping navigates to edit modal_                                              | **M**      |
| **S3-12** | Build Month selector: left/right arrow navigation, resets to current month on double-tap                              | **UI**    | _Cannot navigate to future months; all hooks requery when month changes_                                             | **M**      |
| **S3-13** | Build FAB (Floating Action Button): opens AddTransactionModal                                                         | **UI**    | _FAB stays above keyboard; Reanimated press animation; accessible label set_                                         | **S**      |
| **S3-14** | Build BudgetRing component: circular progress for total monthly budget                                                | **UI**    | _Fills based on spent/budget ratio; hidden if no total budget set_                                                   | **M**      |
| **S3-15** | Dashboard performance: verify all queries < 300ms with 2-year seed data and 5 accounts                                | **Test**  | _Seed 730 days across 5 accounts; measure query time; all under 300ms_                                               | **M**      |

### **Definition of done - Sprint 3**

- Net worth card shows correct total across all 5 seeded accounts
- Account balance list filters dashboard correctly when tapping an account
- Dashboard cold loads in < 300ms (measured with 2-year, 5-account seed data)
- All SQL aggregates verified: no JS-side summation anywhere
- Donut chart shows correct proportions and "Other" rollup for > 5 categories

### **Claude Code commands**

/feature "build dashboard with net worth card, account balance list, donut chart, and month selector"

/db "review getNetWorth, getAllAccountBalances, getMonthlySummary queries for correctness and performance"

/performance "verify dashboard loads under 300ms with 2-year seed data across 5 accounts"

/review

# **Phase 4 - Analytics**

**Sprint 4** · Full Analytics Screen + All Charts

Duration: Week 4-5 (5 days)

**Sprint goal:** _Five chart types render from SQL data. Category drill-down navigation works. All charts update on month change._

### **Tasks**

| **ID**    | **Task**                                                                                | **Layer** | **Acceptance criteria**                                                                  | **Effort** |
| --------- | --------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------- | ---------- |
| **S4-01** | Write getMonthlyComparison SQL: GROUP BY YYYY-MM for last 6 months                      | **Repo**  | _Returns exactly 6 rows; months with no data return 0; ordered ASC_                      | **M**      |
| **S4-02** | Write getBudgetVsActual SQL: JOIN budgets + transactions, percent used computed in SQL  | **Repo**  | _pct_used correctly computed; returns rows for budgets with zero spending_               | **M**      |
| **S4-03** | Write getYearToDate SQL: cumulative income vs expense by month for current year         | **Repo**  | _Returns 12 rows (Jan-Dec); future months return 0_                                      | **M**      |
| **S4-04** | Build useAnalytics hook: fetches all 5 datasets in parallel for selected month          | **Hook**  | _Single stale-while-revalidate state; all queries use same yearMonth key_                | **M**      |
| **S4-05** | Build DailyTrendLine chart (Victory Native XL Area/Line)                                | **UI**    | _X axis shows day numbers; Y axis auto-scales; data points tappable_                     | **L**      |
| **S4-06** | Build MonthlyBar chart: 6-month side-by-side income vs expense bars                     | **UI**    | _Bar colours consistent with theme; month labels abbreviated; current month highlighted_ | **L**      |
| **S4-07** | Build BudgetProgressList: category name, progress bar, spent/budget amounts             | **UI**    | _\> 80% turns amber; > 100% turns red; sorted by pct_used DESC_                          | **M**      |
| **S4-08** | Build IncomeExpenseArea chart (YTD cumulative)                                          | **UI**    | _Two overlapping area curves; legend; correct for months not yet started_                | **M**      |
| **S4-09** | Category drill-down: tapping donut/bar segment navigates to filtered TransactionsScreen | **UI**    | _Navigation passes category_id; TransactionsScreen pre-filters correctly; back works_    | **M**      |
| **S4-10** | Analytics screen layout: scrollable, month selector sticky at top, all 5 charts stacked | **UI**    | _Smooth scroll; no layout jank; charts render in order without blocking scroll_          | **M**      |
| **S4-11** | Chart skeleton loading states (animated placeholders while data fetches)                | **UI**    | _Skeletons show during initial load; no layout shift when data arrives_                  | **S**      |
| **S4-12** | Empty state components for each chart (shown when no data for selected month)           | **UI**    | _Each chart has a distinct empty state with call-to-action text_                         | **S**      |

### **Definition of done - Sprint 4**

- All 5 charts render correctly with real data and edge cases (no data, single category, max budget exceeded)
- Category drill-down navigation works in both directions
- Charts show skeleton on load, empty state on no-data - never blank or errored
- All chart data sourced from SQL aggregates - zero JS-side math

### **Claude Code commands**

/feature "build analytics screen with daily trend, monthly bar, budget progress, and YTD area charts"

/db "review getMonthlyComparison and getBudgetVsActual queries for correctness"

/feature "implement category drill-down navigation from analytics to transactions list"

/performance "verify all analytics queries under 300ms with 2-year seed data"

/review

# **Phase 5 - Budgets & Categories**

**Sprint 5** · Budget Management + Category Manager

Duration: Week 6-7 (5 days)

**Sprint goal:** _Users can create custom categories with icons and colours, set monthly budgets, and receive in-app budget alerts._

### **Tasks**

| **ID**    | **Task**                                                                                                                    | **Layer**   | **Acceptance criteria**                                                                                                                 | **Effort** |
| --------- | --------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **S5-01** | Implement BudgetRepository: upsert, getForCategory, getAll for month, deleteForCategory                                     | **Repo**    | _Upsert is idempotent; UNIQUE(category_id, year, month) enforced; returns 0 for unset budgets_                                          | **M**      |
| **S5-02** | Implement BudgetAlertService: checkCategory returns alert level (OK/WARNING/EXCEEDED)                                       | **Service** | _WARNING at ≥ 80%; EXCEEDED at ≥ 100%; runs after every expense write_                                                                  | **M**      |
| **S5-03** | Wire BudgetAlertService into AddTransaction save flow                                                                       | **Service** | _After save, alert service runs; in-app banner appears if WARNING or EXCEEDED_                                                          | **M**      |
| **S5-04** | Build BudgetAlert banner component: amber for WARNING, red for EXCEEDED, auto-dismisses after 4s                            | **UI**      | _Banner appears above FAB; does not block interaction; correct colour per level_                                                        | **S**      |
| **S5-05** | Build BudgetScreen: total monthly budget input + per-category budget list                                                   | **UI**      | _Saving total budget persists to budgets table with null category_id_                                                                   | **L**      |
| **S5-06** | Build CategoryScreen: grid of expense categories + income categories tabs                                                   | **UI**      | _Archived categories hidden from grid; system categories show lock icon (cannot delete)_                                                | **M**      |
| **S5-07** | Create Category flow: name input + icon picker (100+ Ionicons) + colour wheel (12 preset colours)                           | **UI**      | _New category appears in transaction form immediately; persists across restarts_                                                        | **L**      |
| **S5-08** | Edit Category: update name, icon, colour; long-press on grid item to open                                                   | **UI**      | _Changes reflect immediately in all screens using that category_                                                                        | **M**      |
| **S5-09** | Archive Category: soft-delete; existing transactions retain category reference                                              | **UI**      | _Archived category invisible in pickers; still visible in historical transactions_                                                      | **M**      |
| **S5-10** | CategoryRepository: create, update, archive (set is_archived=1), cannot delete system categories                            | **Repo**    | _Deleting system category throws OperationNotPermittedError; archive is reversible_                                                     | **M**      |
| **S5-11** | Write tests for BudgetRepository and BudgetAlertService                                                                     | **Test**    | _Alert levels at exactly 79%, 80%, 99%, 100%, 101% tested; repo upsert idempotency tested_                                              | **M**      |
| **S5-12** | Build AccountsScreen: list of all accounts with current balance, type icon, and colour indicator                            | **UI**      | _Archived accounts hidden by default; "Show archived" toggle; net worth total shown at top_                                             | **L**      |
| **S5-13** | Create Account flow: name + account type (cash/bank/credit card/savings/investment/wallet) + colour + opening balance input | **UI**      | _Opening balance can be 0 or any positive amount; negative opening balance rejected; account appears in transaction picker immediately_ | **L**      |
| **S5-14** | Edit Account: update name, type, colour; opening_balance editable with recalculation warning if transactions exist          | **UI**      | _Warning shown if editing opening_balance when transactions exist; balance recalculates immediately_                                    | **M**      |
| **S5-15** | Archive Account: soft-delete; existing transactions retain account_id reference; archived account hidden from pickers       | **UI**      | _Archived account invisible in transaction modal picker; still shows in historical transaction rows_                                    | **M**      |
| **S5-16** | Account detail screen: tap an account to see its full transaction history filtered to that account                          | **UI**      | _Navigates to TransactionsScreen pre-filtered by account_id; back returns to AccountsScreen_                                            | **M**      |
| **S5-17** | Transfer between accounts: special transaction type "transfer" that creates a matched expense + income pair on two accounts | **UI**      | _Transfer does not appear in spending analytics; both account balances update atomically; cancel transfer deletes both rows_            | **XL**     |
| **S5-18** | Write AccountRepository tests: getRunningBalance accuracy, archive behaviour, cannot delete account with transactions       | **Test**    | _Balance correct after adding/editing/deleting transactions; archive is reversible; delete blocked when transactions exist_             | **M**      |

### **Definition of done - Sprint 5**

- User can create, edit, and archive custom categories with icons and colours
- User can create, edit, and archive accounts with opening balances and account types
- Transfer between accounts creates atomic paired transactions; does not affect spending analytics
- Budget alerts appear correctly at 80% and 100% of category budget
- Archived accounts and categories invisible in pickers but preserved in historical data
- BudgetAlertService ≥ 80% coverage; BudgetRepository ≥ 90%; AccountRepository ≥ 90%

### **Claude Code commands**

/feature "implement BudgetAlertService with WARNING and EXCEEDED levels"

/feature "build category manager screen with icon picker and colour selector"

/feature "build budget screen with total and per-category budget inputs"

/feature "build accounts manager screen with create, edit, archive, and account detail view"

/feature "build transfer between accounts as atomic paired expense+income transactions"

/test "write BudgetRepository, BudgetAlertService, and AccountRepository tests"

/review

# **Phase 5 continued - Settings & Security Hardening**

**Sprint 6** · Settings Screen + Security Hardening

Duration: Week 7 (3 days)

**Sprint goal:** _Settings screen complete. Biometric lock timeout configurable. All security checklist items pass._

### **Tasks**

| **ID**    | **Task**                                                                                | **Layer**   | **Acceptance criteria**                                                                      | **Effort** |
| --------- | --------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------- | ---------- |
| **S6-01** | Build Settings screen: all preference sections with navigation to sub-screens           | **UI**      | _All settings from spec present; values load from app_settings on mount_                     | **L**      |
| **S6-02** | Biometric lock toggle: enable/disable; stores preference in app_settings                | **UI**      | _Disabling asks for system passcode confirmation; preference persists_                       | **M**      |
| **S6-03** | Lock timeout selector: 15s / 30s / 60s / 5min / Never                                   | **UI**      | _AppState listener triggers lock after correct duration; tests use jest fake timers_         | **M**      |
| **S6-04** | Currency selector: searchable list of 30 common currencies; stores code in app_settings | **UI**      | _Currency change reflects immediately in all money-formatted strings across the app_         | **M**      |
| **S6-05** | Theme selector: Light / Dark / System; uses Appearance API                              | **UI**      | _System follows device; manual overrides persist; all screens respond immediately_           | **M**      |
| **S6-06** | Run full security audit using security-auditor agent                                    | **Test**    | _All 19 checklist items PASS; no FAIL items remain; risk rating LOW or better_               | **L**      |
| **S6-07** | Verify no network calls: audit package.json and all imports for networking libs         | **Infra**   | _grep for fetch, axios, XMLHttpRequest, WebSocket returns zero results in src/_              | **S**      |
| **S6-08** | Verify no telemetry: audit for Firebase, Amplitude, Mixpanel, Sentry cloud              | **Infra**   | _No analytics SDKs in package.json; android INTERNET permission not present_                 | **S**      |
| **S6-09** | Implement local error logger (writes to app_errors SQLite table, not cloud)             | **Service** | _Unhandled errors caught by ErrorBoundary and written to app_errors; readable from settings_ | **M**      |

### **Definition of done - Sprint 6**

- All settings persist correctly across app restarts
- Security audit: all 19 checklist items PASS
- Zero networking imports anywhere in src/
- Android manifest has no INTERNET permission

### **Claude Code commands**

/feature "build settings screen with biometric toggle, lock timeout, currency selector, and theme"

/security "full audit before Phase 6 backup work begins"

/review

# **Phase 6 - Backup, Export & Import**

**Sprint 7** · ExportService + ImportService + Settings Integration

Duration: Week 8-9 (5 days)

**Sprint goal:** _Users can export encrypted .spentit backups, plain JSON, and CSV. Full restore from any backup file via document picker._

### **Tasks**

| **ID**    | **Task**                                                                                                                             | **Layer**   | **Acceptance criteria**                                                                                                                                 | **Effort** |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **S7-01** | Build ExportService.buildPayload(): serialises all tables to ExportPayload type including accounts                                   | **Service** | _transaction_count in meta matches transactions.length; all 6 tables included (accounts, categories, payment_methods, transactions, budgets, settings)_ | **M**      |
| **S7-02** | Build ExportService.exportEncrypted(passphrase): PBKDF2 key derivation + AES-256-GCM encrypt + write to cache + share                | **Service** | _Output is valid SpentItFile JSON; wrong passphrase cannot decrypt; temp file deleted after share_                                                      | **XL**     |
| **S7-03** | Build ExportService.exportJSON(): pretty-print payload + share sheet                                                                 | **Service** | _Output is valid JSON matching ExportPayload schema; readable by any JSON parser_                                                                       | **M**      |
| **S7-04** | Build ExportService.exportCSV(): 3 CSV files zipped, share sheet                                                                     | **Service** | _transactions.csv has correct headers and all rows; amounts are plain numbers; dates ISO 8601_                                                          | **L**      |
| **S7-05** | Build ImportService.validateFile(): checks version field, JSON schema, referential integrity (account_id and category_id references) | **Service** | _Throws typed ImportValidationError with correct reason; validates that every transaction.account_id exists in payload.accounts_                        | **L**      |
| **S7-06** | Build ImportService.importEncrypted(uri, passphrase): decrypt + validate + atomic DB restore                                         | **Service** | _Wrong passphrase: ImportValidationError DECRYPTION_FAILED. Invalid schema: SCHEMA_INVALID. DB failure: rolls back, data intact_                        | **XL**     |
| **S7-07** | Build ImportService.importJSON(uri): validate + atomic DB restore                                                                    | **Service** | _Atomic: either all-or-nothing restore; on failure existing data preserved_                                                                             | **L**      |
| **S7-08** | Build Export screen in Settings: three export format buttons with format descriptions                                                | **UI**      | _Each button shows correct description; passphrase modal appears for .spentit export_                                                                   | **M**      |
| **S7-09** | Build Import screen: document picker → file type detection → passphrase modal if needed → preview → confirm → restore                | **UI**      | _Preview shows transaction count and date range before overwriting; confirm dialog required_                                                            | **L**      |
| **S7-10** | Auto-backup reminder: check last_backup in app_settings; show banner if > 7 days                                                     | **Service** | _Banner shows on Dashboard after 7 days; tapping navigates to Export screen; dismissable_                                                               | **M**      |
| **S7-11** | Update last_backup timestamp in app_settings after successful export                                                                 | **Service** | _last_backup updated for all three export formats; timestamp is ISO 8601_                                                                               | **S**      |
| **S7-12** | Write ExportService and ImportService tests                                                                                          | **Test**    | _Happy path, wrong passphrase, corrupt file, schema violation, and DB failure tested for each_                                                          | **L**      |

### **Definition of done - Sprint 7**

- Export → share sheet → iCloud Drive workflow tested end-to-end on device
- Import → restore replaces all data atomically; rollback on any failure
- ExportService and ImportService each ≥ 80% coverage
- Security audit passed for all crypto code (PBKDF2, AES-GCM, temp file cleanup)

### **Claude Code commands**

/feature "implement ExportService: encrypted .spentit, JSON, and CSV export with OS share sheet"

/feature "implement ImportService: validate, decrypt, and atomic DB restore"

/export-import-specialist "review .spentit file format, PBKDF2 params, and AES-GCM usage"

/security "audit ExportService and ImportService before Sprint 7 review"

/test "write ExportService and ImportService tests covering all failure modes"

/review

# **Phase 6 continued - Polish, Performance & Release**

**Sprint 8** · Dark Mode · Accessibility · Performance · App Store

Duration: Week 9-10 (5 days)

**Sprint goal:** _App is production-ready: dark mode, accessibility, 60fps verified, App Store + Play Store submitted._

### **Tasks**

| **ID**    | **Task**                                                                                                  | **Layer**  | **Acceptance criteria**                                                                          | **Effort** |
| --------- | --------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ | ---------- |
| **S8-01** | Full dark mode audit: every screen, component, and chart in dark mode                                     | **UI**     | _No hardcoded hex colours anywhere; all text readable in both modes; charts adapt_               | **L**      |
| **S8-02** | Accessibility audit: VoiceOver (iOS) and TalkBack (Android) full walkthrough                              | **UI**     | _Every interactive element has accessibilityLabel + accessibilityRole; charts have descriptions_ | **L**      |
| **S8-03** | Performance profiling: cold launch, dashboard load, list scroll (Flipper / Hermes profiler)               | **Test**   | _Cold launch < 2s; dashboard queries < 300ms; list scroll 60fps; export < 2s for 5k txns_        | **L**      |
| **S8-04** | Bundle size audit: identify and remove unused imports and large dependencies                              | **Infra**  | _Bundle < 35MB; no unused packages in node_modules contributing to bundle_                       | **M**      |
| **S8-05** | Onboarding flow: first-launch walkthrough (3 slides: privacy promise, add first expense, backup reminder) | **UI**     | _Shown only on first launch (checked via app_settings); skippable_                               | **M**      |
| **S8-06** | App icon + splash screen: designed, exported at all required resolutions                                  | **Config** | _expo prebuild generates correct icon sizes; no placeholder icons_                               | **M**      |
| **S8-07** | EAS Build configuration: iOS + Android profiles (development, preview, production)                        | **Config** | _eas build --profile production succeeds for both platforms_                                     | **M**      |
| **S8-08** | App Store metadata: description, keywords, screenshots (6.5", 5.5", iPad), privacy nutrition label        | **Infra**  | _Privacy nutrition label declares: No data collected. All screenshot devices covered._           | **L**      |
| **S8-09** | Google Play metadata: description, feature graphic, screenshots, privacy policy URL                       | **Infra**  | _Privacy policy hosted (GitHub Pages acceptable); app passes Google Play data safety form_       | **M**      |
| **S8-10** | Final security audit before submission                                                                    | **Test**   | _All 18 security checklist items PASS; overall risk rating LOW_                                  | **M**      |
| **S8-11** | Final full test suite run with coverage report                                                            | **Test**   | _All layers meet minimums; zero test failures; zero type errors; zero lint warnings_             | **M**      |
| **S8-12** | Submit to TestFlight and Google Play Internal Track                                                       | **Infra**  | _Both builds approved for testing; at least 3 testers complete full flow on real devices_        | **M**      |

### **Definition of done - Sprint 8 (= Release)**

- Dark mode works on every screen with zero hardcoded colours
- VoiceOver and TalkBack can navigate the entire app
- Performance budget met: cold launch < 2s, queries < 300ms, 60fps scroll
- Bundle < 35MB; no unused dependencies
- Security audit: 19/19 PASS, risk rating LOW
- App Store and Play Store builds submitted and in review

### **Claude Code commands**

/security "final pre-release security audit - full checklist"

/performance "verify all performance budgets before submission"

/test "final full suite run with coverage report"

/review "Sprint 8 complete - final review before App Store submission"

# **v2.0 Backlog**

Items not in the v1.0 scope. Prioritise based on user feedback after launch.

| **Feature**                           | **Effort** | **Value** | **Notes**                                                                  |
| ------------------------------------- | ---------- | --------- | -------------------------------------------------------------------------- |
| Receipt photo capture + local storage | L          | High      | expo-camera + expo-image-picker; store in FileSystem.documentDirectory     |
| Recurring transaction automation      | XL         | High      | Background task checks on app open; creates due transactions automatically |
| iOS Lock Screen widget                | L          | Medium    | WidgetKit via expo-widget-kit; quick-add amount and category               |
| Android Home Screen widget            | L          | Medium    | Glance API; monthly spend summary                                          |
| Multi-currency with offline rates     | M          | Medium    | Bundle a yearly exchange-rate JSON; user sets base currency                |
| PDF report generation                 | L          | Medium    | react-native-pdf-lib; one-page monthly summary                             |
| Apple Watch quick-entry               | XL         | Low       | WatchKit companion; amount + category, synced via WatchConnectivity        |
| Debt / split tracking                 | XL         | Medium    | Track IOUs between contacts; local contacts access                         |
| Investment portfolio                  | XL         | Low       | Manual entry only; no market data API (keeps offline)                      |
| Bank statement CSV import             | L          | High      | Parse common bank export formats; map columns to SpentIt schema            |

# **Appendix - Reference**

## **A. Full SQL schema (v001)**

PRAGMA journal_mode = WAL;

PRAGMA foreign_keys = ON;

PRAGMA cache_size = -8000;

PRAGMA synchronous = NORMAL;

CREATE TABLE accounts (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL UNIQUE,

type TEXT NOT NULL CHECK(type IN (

'cash','bank','credit_card','savings','investment','wallet')),

icon TEXT NOT NULL DEFAULT 'wallet',

color TEXT NOT NULL DEFAULT '#6C63FF',

opening_balance REAL NOT NULL DEFAULT 0,

currency TEXT NOT NULL DEFAULT 'INR',

is_default INTEGER NOT NULL DEFAULT 0,

is_archived INTEGER NOT NULL DEFAULT 0,

sort_order INTEGER NOT NULL DEFAULT 0,

created_at TEXT NOT NULL DEFAULT (datetime('now')),

updated_at TEXT NOT NULL DEFAULT (datetime('now'))

);

CREATE INDEX idx_acc_archived ON accounts(is_archived);

\-- Default account seeded on first launch

INSERT INTO accounts (name, type, icon, opening_balance, is_default)

VALUES ('Cash Wallet', 'cash', 'wallet', 0, 1);

\-- Running balance query (used by AccountRepository.getRunningBalance):

\-- SELECT

\-- a.opening_balance

\-- + COALESCE(SUM(CASE WHEN t.type='income' THEN t.amount ELSE 0 END), 0)

\-- - COALESCE(SUM(CASE WHEN t.type='expense' THEN t.amount ELSE 0 END), 0)

\-- AS current_balance

\-- FROM accounts a

\-- LEFT JOIN transactions t ON t.account_id = a.id AND t.is_transfer = 0

\-- WHERE a.id = ?

\-- GROUP BY a.id;

CREATE TABLE categories (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL UNIQUE,

icon TEXT NOT NULL DEFAULT 'tag',

color TEXT NOT NULL DEFAULT '#6C63FF',

is_income INTEGER NOT NULL DEFAULT 0,

is_system INTEGER NOT NULL DEFAULT 0,

is_archived INTEGER NOT NULL DEFAULT 0,

sort_order INTEGER NOT NULL DEFAULT 0,

created_at TEXT NOT NULL DEFAULT (datetime('now')),

updated_at TEXT NOT NULL DEFAULT (datetime('now'))

);

CREATE TABLE payment_methods (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL UNIQUE,

icon TEXT NOT NULL DEFAULT 'card',

is_default INTEGER NOT NULL DEFAULT 0

);

CREATE TABLE transactions (

id INTEGER PRIMARY KEY AUTOINCREMENT,

amount REAL NOT NULL CHECK(amount > 0),

type TEXT NOT NULL CHECK(type IN ('expense','income')),

category_id INTEGER NOT NULL REFERENCES categories(id),

account_id INTEGER NOT NULL REFERENCES accounts(id),

payment_method_id INTEGER REFERENCES payment_methods(id),

note TEXT,

date TEXT NOT NULL,

time TEXT NOT NULL DEFAULT '00:00',

currency TEXT NOT NULL DEFAULT 'INR',

receipt_uri TEXT,

is_recurring INTEGER NOT NULL DEFAULT 0,

recurrence_rule TEXT,

is_transfer INTEGER NOT NULL DEFAULT 0, -- 1 = part of transfer pair

transfer_pair_id INTEGER, -- id of paired transaction

created_at TEXT NOT NULL DEFAULT (datetime('now')),

updated_at TEXT NOT NULL DEFAULT (datetime('now'))

);

CREATE INDEX idx_txn_date ON transactions(date);

CREATE INDEX idx_txn_category ON transactions(category_id);

CREATE INDEX idx_txn_account ON transactions(account_id);

CREATE INDEX idx_txn_type_date ON transactions(type, date);

CREATE INDEX idx_txn_cat_date ON transactions(category_id, date);

CREATE INDEX idx_txn_acc_date ON transactions(account_id, date);

CREATE TABLE budgets (

id INTEGER PRIMARY KEY AUTOINCREMENT,

category_id INTEGER REFERENCES categories(id),

amount REAL NOT NULL CHECK(amount > 0),

period TEXT NOT NULL DEFAULT 'monthly',

year INTEGER NOT NULL,

month INTEGER,

UNIQUE(category_id, year, month)

);

CREATE TABLE app_settings (

key TEXT PRIMARY KEY,

value TEXT NOT NULL

);

INSERT INTO app_settings VALUES ('currency', 'INR');

INSERT INTO app_settings VALUES ('biometric_lock', '1');

INSERT INTO app_settings VALUES ('lock_timeout_seconds', '30');

INSERT INTO app_settings VALUES ('theme', 'system');

INSERT INTO app_settings VALUES ('last_backup', '');

INSERT INTO app_settings VALUES ('onboarding_done', '0');

PRAGMA user_version = 1;

## **B. TypeScript core types**

type TxnType = 'expense' | 'income';

type AccountType = 'cash' | 'bank' | 'credit_card' | 'savings' | 'investment' | 'wallet';

type AlertLevel = 'OK' | 'WARNING' | 'EXCEEDED';

type ExportFormat = 'spentit' | 'json' | 'csv';

type ImportErrorReason = 'UNSUPPORTED_VERSION' | 'DECRYPTION_FAILED'

| 'SCHEMA_INVALID' | 'REFERENTIAL_INTEGRITY' | 'DB_WRITE_FAILED';

interface Account {

id: number; name: string; type: AccountType;

icon: string; color: string;

opening_balance: number; currency: string;

is_default: boolean; is_archived: boolean; sort_order: number;

created_at: string; updated_at: string;

}

type NewAccount = Omit&lt;Account, 'id' | 'created_at' | 'updated_at'&gt;;

// Running balance is computed, not stored - always derived from SQL

type AccountWithBalance = Account & { current_balance: number };

interface Transaction {

id: number; amount: number; type: TxnType;

category_id: number;

account_id: number; // required - every transaction belongs to an account

payment_method_id: number | null; // optional extra tag

note: string | null; date: string; time: string;

currency: string; receipt_uri: string | null;

is_recurring: boolean; recurrence_rule: string | null;

is_transfer: boolean; // true = part of account-to-account transfer pair

transfer_pair_id: number | null; // id of the paired transaction

created_at: string; updated_at: string;

}

type NewTransaction = Omit&lt;Transaction, 'id' | 'created_at' | 'updated_at'&gt;;

interface Category {

id: number; name: string; icon: string; color: string;

is_income: boolean; is_system: boolean; is_archived: boolean; sort_order: number;

}

interface Budget {

id: number; category_id: number | null; amount: number;

period: string; year: number; month: number | null;

}

interface ExportPayload {

meta: { version: string; exported_at: string; transaction_count: number; currency: string };

accounts: Account\[\];

categories: Category\[\];

payment_methods: PaymentMethod\[\];

transactions: Transaction\[\];

budgets: Budget\[\];

settings: Record&lt;string, string&gt;;

}

interface SpentItFile {

v: 1;

salt: string;

iv: string;

data: string;

}

## **C. Coverage minimums (CI gate)**

| **Layer**    | **Path**             | **Minimum** |
| ------------ | -------------------- | ----------- |
| Repositories | src/db/repositories/ | 90%         |
| Services     | src/services/        | 80%         |
| Hooks        | src/hooks/           | 70%         |
| Utils        | src/utils/           | 90%         |
| Components   | src/components/      | 60%         |

## **D. Performance budget**

| **Metric**                 | **Target** | **Block release if** |
| -------------------------- | ---------- | -------------------- |
| Cold launch to dashboard   | < 2000ms   | \> 2500ms            |
| Dashboard query (1yr data) | < 300ms    | \> 500ms             |
| Any SQLite read            | < 50ms     | \> 100ms             |
| Transaction list scroll    | 60fps      | Any dropped frame    |
| Export (5k transactions)   | < 2s       | \> 3s                |
| JS bundle size             | < 35MB     | \> 40MB              |

## **E. Security checklist (19 items)**

- Key is 32 bytes (AES-256)
- Key stored in expo-secure-store, not AsyncStorage
- Key never in logs, error messages, or console output
- SQLCipher PRAGMA key set immediately after db.open()
- PBKDF2 iterations ≥ 100,000
- Salt is randomly generated per export (never reused)
- IV is randomly generated per encrypt call (never reused)
- AES-GCM tag verified on decrypt (authenticated encryption)
- Biometric prompt blocks all UI before first render
- App locks on AppState background after configured timeout
- Failed auth retries bounded (max 3 before system fallback)
- All SQL uses parameterised placeholders (no string interpolation)
- Import validates account_id references exist before any DB write
- Import validates JSON schema before any DB write
- Import runs in single withTransactionAsync (atomic)
- Export temp file deleted from cache after share sheet handed URI
- No fetch, axios, XMLHttpRequest, or WebSocket in src/
- Android manifest: no INTERNET permission
- No analytics or telemetry SDK in package.json
