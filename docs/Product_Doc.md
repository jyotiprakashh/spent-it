💸

**SpentIt**

Offline-First Mobile Expense Tracker

_Software Requirements Specification | Software Design Specification_

_Feature Documentation | System Architecture_

| **Version**  | 1.0.0                        |
| ------------ | ---------------------------- |
| **Date**     | May 2025                     |
| ---          | ---                          |
| **Status**   | Draft - Internal Review      |
| ---          | ---                          |
| **Platform** | React Native (iOS & Android) |
| ---          | ---                          |
| **License**  | Free & Open Source (MIT)     |
| ---          | ---                          |

# **1\. Project Overview**

SpentIt is a 100% offline, privacy-first personal finance and expense tracking application for iOS and Android, built with React Native and SQLite. No server, no cloud database, no account registration - all financial data stays on the user's device.

## **1.1 Problem Statement**

Modern expense-tracking apps force users into subscription models, require cloud accounts, and store sensitive financial data on third-party servers. Users who prioritize privacy have no polished, feature-rich alternative that works entirely offline.

## **1.2 Vision**

"A beautifully simple, blazing-fast expense tracker that respects your privacy by never sending a single byte of your financial data off your device."

## **1.3 Core Principles**

| **Principle**  | **Description**                                        |
| -------------- | ------------------------------------------------------ |
| Privacy First  | Zero telemetry, zero cloud sync - all data stays local |
| ---            | ---                                                    |
| Offline Native | Full functionality without any network connection      |
| ---            | ---                                                    |
| Free Forever   | No subscription, no ads, no freemium gates             |
| ---            | ---                                                    |
| Performance    | Sub-50ms query response via WAL mode + indexed SQLite  |
| ---            | ---                                                    |
| Open Source    | MIT licensed, auditable, forkable                      |
| ---            | ---                                                    |
| User Ownership | Full data export / import - users own their data       |
| ---            | ---                                                    |

## **1.4 Technology Stack**

| **Layer**        | **Technology**                      | **Purpose**                         |
| ---------------- | ----------------------------------- | ----------------------------------- |
| UI Framework     | React Native 0.74+                  | Cross-platform iOS & Android        |
| ---              | ---                                 | ---                                 |
| Navigation       | React Navigation 6                  | Stack + Bottom Tab navigation       |
| ---              | ---                                 | ---                                 |
| State Management | Zustand + React Query               | UI state + async data layer         |
| ---              | ---                                 | ---                                 |
| Database         | expo-sqlite (SQLite 3.x)            | Local persistent storage (WAL mode) |
| ---              | ---                                 | ---                                 |
| Encryption       | SQLCipher via expo-sqlite-encrypted | At-rest AES-256 encryption          |
| ---              | ---                                 | ---                                 |
| Biometrics       | expo-local-authentication           | Face ID / Touch ID app lock         |
| ---              | ---                                 | ---                                 |
| Charts           | Victory Native XL                   | Performance-first SVG charting      |
| ---              | ---                                 | ---                                 |
| Icons            | react-native-vector-icons           | Material / Ionicons                 |
| ---              | ---                                 | ---                                 |
| Styling          | StyleSheet API + Reanimated 3       | Native-thread animations            |
| ---              | ---                                 | ---                                 |
| Date/Time        | date-fns                            | Lightweight date manipulation       |
| ---              | ---                                 | ---                                 |
| File I/O         | expo-file-system + expo-sharing     | Backup export / import              |
| ---              | ---                                 | ---                                 |
| Document Picker  | expo-document-picker                | Import from iCloud / Google Drive   |
| ---              | ---                                 | ---                                 |
| Build Tool       | Expo SDK 51 (EAS Build)             | Managed workflow + OTA updates      |
| ---              | ---                                 | ---                                 |

# **2\. Software Requirements Specification (SRS)**

## **2.1 Scope**

SpentIt covers personal expense entry, income tracking, multi-currency support, category management, monthly/annual budgeting, analytics dashboards, and secure backup/restore. It does not include bill payment, bank sync, investments, or multi-user collaboration.

## **2.2 Functional Requirements**

### **2.2.1 Transaction Management**

| **ID**    | **Requirement**                                                               | **Priority** |
| --------- | ----------------------------------------------------------------------------- | ------------ |
| FR-TXN-01 | User can add an expense with amount, category, date, note, and payment method | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-TXN-02 | User can add income with source, amount, date, and note                       | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-TXN-03 | User can edit any previously entered transaction                              | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-TXN-04 | User can delete a transaction with an undo snackbar (5-second window)         | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-TXN-05 | User can attach a photo receipt to any transaction                            | Should Have  |
| ---       | ---                                                                           | ---          |
| FR-TXN-06 | User can mark transactions as recurring (daily/weekly/monthly)                | Should Have  |
| ---       | ---                                                                           | ---          |
| FR-TXN-07 | User can split a transaction across multiple categories                       | Could Have   |
| ---       | ---                                                                           | ---          |

### **2.2.2 Category & Budget Management**

| **ID**    | **Requirement**                                                          | **Priority** |
| --------- | ------------------------------------------------------------------------ | ------------ |
| FR-CAT-01 | System ships with 15 default categories (Food, Transport, Housing, etc.) | Must Have    |
| ---       | ---                                                                      | ---          |
| FR-CAT-02 | User can create custom categories with name, icon, and color             | Must Have    |
| ---       | ---                                                                      | ---          |
| FR-CAT-03 | User can set a monthly spending budget per category                      | Must Have    |
| ---       | ---                                                                      | ---          |
| FR-CAT-04 | System alerts user at 80% and 100% of category budget consumption        | Must Have    |
| ---       | ---                                                                      | ---          |
| FR-CAT-05 | User can archive (soft-delete) categories                                | Should Have  |
| ---       | ---                                                                      | ---          |
| FR-CAT-06 | User can set a total monthly budget across all categories                | Should Have  |
| ---       | ---                                                                      | ---          |

### **2.2.3 Analytics & Reporting**

| **ID**    | **Requirement**                                                               | **Priority** |
| --------- | ----------------------------------------------------------------------------- | ------------ |
| FR-RPT-01 | Dashboard shows current month: total spent, total income, net balance         | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-RPT-02 | Pie / donut chart of spending by category for selected month                  | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-RPT-03 | Line chart of daily spending over selected month                              | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-RPT-04 | Bar chart comparing monthly spending across last 6 months                     | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-RPT-05 | Category drill-down: tap a chart segment to see transactions in that category | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-RPT-06 | Top spending categories ranked list                                           | Should Have  |
| ---       | ---                                                                           | ---          |
| FR-RPT-07 | Year-to-date income vs expense summary                                        | Should Have  |
| ---       | ---                                                                           | ---          |
| FR-RPT-08 | Exportable PDF/CSV report for selected date range                             | Could Have   |
| ---       | ---                                                                           | ---          |

### **2.2.4 Security & Biometrics**

| **ID**    | **Requirement**                                                               | **Priority** |
| --------- | ----------------------------------------------------------------------------- | ------------ |
| FR-SEC-01 | App requests biometric/PIN authentication on every cold launch                | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-SEC-02 | App locks after returning from background for more than 30 seconds            | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-SEC-03 | Database encrypted at rest with AES-256 (SQLCipher)                           | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-SEC-04 | Encryption key derived from device secure enclave, never stored in plain text | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-SEC-05 | Biometric lock can be disabled by user via settings                           | Must Have    |
| ---       | ---                                                                           | ---          |
| FR-SEC-06 | Failed biometric falls back to system PIN/passcode                            | Must Have    |
| ---       | ---                                                                           | ---          |

### **2.2.5 Backup & Restore**

| **ID**    | **Requirement**                                                                     | **Priority** |
| --------- | ----------------------------------------------------------------------------------- | ------------ |
| FR-BCK-01 | User can export all data as encrypted .spentit backup file                          | Must Have    |
| ---       | ---                                                                                 | ---          |
| FR-BCK-02 | User can export data as human-readable JSON file                                    | Must Have    |
| ---       | ---                                                                                 | ---          |
| FR-BCK-03 | User can export data as CSV (one file per: transactions, categories, budgets)       | Should Have  |
| ---       | ---                                                                                 | ---          |
| FR-BCK-04 | Export hands off to native OS share sheet (iCloud Drive, Google Drive, email, etc.) | Must Have    |
| ---       | ---                                                                                 | ---          |
| FR-BCK-05 | User can import a .spentit backup file via document picker to restore all data      | Must Have    |
| ---       | ---                                                                                 | ---          |
| FR-BCK-06 | Import validates file integrity before overwriting existing data                    | Must Have    |
| ---       | ---                                                                                 | ---          |
| FR-BCK-07 | Auto-backup reminder after 7 days of no backup                                      | Should Have  |
| ---       | ---                                                                                 | ---          |

## **2.3 Non-Functional Requirements**

| **ID** | **Requirement**                            | **Metric**                                    |
| ------ | ------------------------------------------ | --------------------------------------------- |
| NFR-01 | Cold launch time (biometric to dashboard)  | < 2 seconds on mid-range device               |
| ---    | ---                                        | ---                                           |
| NFR-02 | Transaction list scroll frame rate         | 60 fps constant (FlashList)                   |
| ---    | ---                                        | ---                                           |
| NFR-03 | Dashboard chart load time (1-year data)    | < 300ms (SQL aggregation)                     |
| ---    | ---                                        | ---                                           |
| NFR-04 | Database query response (indexed)          | < 50ms for any read                           |
| ---    | ---                                        | ---                                           |
| NFR-05 | Export file generation (5000 transactions) | < 2 seconds                                   |
| ---    | ---                                        | ---                                           |
| NFR-06 | App bundle size                            | < 35MB (no native ML libs)                    |
| ---    | ---                                        | ---                                           |
| NFR-07 | Minimum iOS version                        | iOS 15.0+                                     |
| ---    | ---                                        | ---                                           |
| NFR-08 | Minimum Android version                    | Android 8.0 (API 26)+                         |
| ---    | ---                                        | ---                                           |
| NFR-09 | Accessibility                              | WCAG 2.1 AA - VoiceOver & TalkBack support    |
| ---    | ---                                        | ---                                           |
| NFR-10 | Crash-free sessions                        | \> 99.5% (monitored via local error boundary) |
| ---    | ---                                        | ---                                           |

## **2.4 Constraints**

- No internet connection required or used at any point in normal operation
- No third-party analytics SDKs (Firebase, Amplitude, Mixpanel, etc.)
- No advertising SDKs
- No background network calls - Expo permissions will reflect zero network access
- All computation must run on the device (no serverless functions)

# **3\. Data Model & Database Design**

## **3.1 Entity Relationship Overview**

The schema follows 3NF normalization. Analytics queries aggregate at the SQL layer to avoid pulling raw rows into JavaScript memory.

## **3.2 Schema Definitions**

### **3.2.1 categories**

CREATE TABLE categories (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL UNIQUE,

icon TEXT NOT NULL DEFAULT 'tag',

color TEXT NOT NULL DEFAULT '#6C63FF',

is_income INTEGER NOT NULL DEFAULT 0, -- 0: expense, 1: income

is_system INTEGER NOT NULL DEFAULT 0, -- 1: cannot be deleted

is_archived INTEGER NOT NULL DEFAULT 0,

sort_order INTEGER NOT NULL DEFAULT 0,

created_at TEXT NOT NULL DEFAULT (datetime('now')),

updated_at TEXT NOT NULL DEFAULT (datetime('now'))

);

CREATE INDEX idx_cat_archived ON categories(is_archived);

### **3.2.2 payment_methods**

CREATE TABLE payment_methods (

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT NOT NULL UNIQUE, -- e.g. "Cash", "Visa", "PhonePe"

icon TEXT NOT NULL DEFAULT 'card',

is_default INTEGER NOT NULL DEFAULT 0

);

### **3.2.3 transactions (core table)**

CREATE TABLE transactions (

id INTEGER PRIMARY KEY AUTOINCREMENT,

amount REAL NOT NULL CHECK(amount > 0),

type TEXT NOT NULL CHECK(type IN ('expense', 'income')),

category_id INTEGER NOT NULL REFERENCES categories(id),

payment_method_id INTEGER REFERENCES payment_methods(id),

note TEXT,

date TEXT NOT NULL, -- ISO 8601: '2025-05-22'

time TEXT NOT NULL DEFAULT '00:00', -- 'HH:MM'

currency TEXT NOT NULL DEFAULT 'INR',

receipt_uri TEXT, -- local file:// path

is_recurring INTEGER NOT NULL DEFAULT 0,

recurrence_rule TEXT, -- 'daily'|'weekly'|'monthly'

created_at TEXT NOT NULL DEFAULT (datetime('now')),

updated_at TEXT NOT NULL DEFAULT (datetime('now'))

);

\-- Performance-critical indexes for dashboard queries

CREATE INDEX idx_txn_date ON transactions(date);

CREATE INDEX idx_txn_category ON transactions(category_id);

CREATE INDEX idx_txn_type_date ON transactions(type, date);

CREATE INDEX idx_txn_cat_date ON transactions(category_id, date);

### **3.2.4 budgets**

CREATE TABLE budgets (

id INTEGER PRIMARY KEY AUTOINCREMENT,

category_id INTEGER REFERENCES categories(id), -- NULL = total budget

amount REAL NOT NULL CHECK(amount > 0),

period TEXT NOT NULL DEFAULT 'monthly', -- 'monthly'|'yearly'

year INTEGER NOT NULL,

month INTEGER, -- NULL for yearly budgets

UNIQUE(category_id, year, month)

);

### **3.2.5 app_settings**

CREATE TABLE app_settings (

key TEXT PRIMARY KEY,

value TEXT NOT NULL

);

\-- Default seeds

INSERT INTO app_settings VALUES ('currency', 'INR');

INSERT INTO app_settings VALUES ('biometric_lock', '1');

INSERT INTO app_settings VALUES ('theme', 'system');

INSERT INTO app_settings VALUES ('last_backup', '');

## **3.3 Key Analytics Queries**

**Monthly Balance Summary (Dashboard)**

SELECT

SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,

SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense

FROM transactions

WHERE strftime('%Y-%m', date) = '2025-05' -- parameterized

;

**Spending by Category (Pie Chart data)**

SELECT c.id, c.name, c.color, SUM(t.amount) AS total

FROM transactions t

JOIN categories c ON c.id = t.category_id

WHERE t.type = 'expense'

AND strftime('%Y-%m', t.date) = ?

GROUP BY t.category_id

ORDER BY total DESC;

**Daily Spending Trend (Line Chart)**

SELECT strftime('%d', date) AS day, SUM(amount) AS total

FROM transactions

WHERE type = 'expense'

AND strftime('%Y-%m', date) = ?

GROUP BY day

ORDER BY day ASC;

**Budget vs Actual (Category Budgets)**

SELECT

b.category_id, c.name, c.color, b.amount AS budget,

COALESCE(SUM(t.amount), 0) AS spent,

(COALESCE(SUM(t.amount), 0) / b.amount \* 100) AS pct_used

FROM budgets b

JOIN categories c ON c.id = b.category_id

LEFT JOIN transactions t

ON t.category_id = b.category_id

AND t.type = 'expense'

AND strftime('%Y-%m', t.date) = ?

WHERE b.year = ? AND b.month = ?

GROUP BY b.category_id;

## **3.4 WAL Mode Configuration**

Database is opened in WAL (Write-Ahead Logging) mode on first launch. This allows concurrent reads during writes, preventing UI jank.

// db/init.ts

import \* as SQLite from 'expo-sqlite';

export async function openDatabase() {

const db = await SQLite.openDatabaseAsync('spentit.db');

await db.execAsync('PRAGMA journal_mode = WAL;');

await db.execAsync('PRAGMA foreign_keys = ON;');

await db.execAsync('PRAGMA cache_size = -8000; -- 8MB page cache');

await db.execAsync('PRAGMA synchronous = NORMAL;');

return db;

}

# **4\. System Architecture**

## **4.1 Architecture Overview**

SpentIt follows a layered architecture pattern with strict separation of concerns. The UI layer never touches the database directly - all data flows through a repository layer.

### **4.1.1 Layer Diagram**

| **PRESENTATION LAYER - React Native Screens & Components**                     |
| ------------------------------------------------------------------------------ |
| **STATE LAYER - Zustand Stores + React Query (TanStack)**                      |
| ---                                                                            |
| **SERVICE LAYER - Business Logic (BudgetService, ExportService, AuthService)** |
| ---                                                                            |
| **REPOSITORY LAYER - TransactionRepo, CategoryRepo, BudgetRepo, SettingsRepo** |
| ---                                                                            |
| **DATABASE LAYER - SQLite (WAL mode) + SQLCipher Encryption + expo-sqlite**    |
| ---                                                                            |

## **4.2 Directory Structure**

spentit/

├── app/ # Expo Router screens

│ ├── (auth)/ # Biometric lock screen

│ ├── (tabs)/ # Main bottom tab navigator

│ │ ├── index.tsx # Dashboard

│ │ ├── transactions.tsx

│ │ ├── analytics.tsx

│ │ └── settings.tsx

│ └── modals/ # Add/Edit transaction modal

├── src/

│ ├── components/ # Reusable UI components

│ │ ├── charts/ # Victory Native chart wrappers

│ │ ├── forms/ # TransactionForm, CategoryPicker

│ │ └── common/ # Button, Card, Badge, ProgressBar

│ ├── db/

│ │ ├── init.ts # openDatabase(), runMigrations()

│ │ ├── migrations/ # v1.sql, v2.sql, ...

│ │ └── repositories/

│ │ ├── TransactionRepository.ts

│ │ ├── CategoryRepository.ts

│ │ ├── BudgetRepository.ts

│ │ └── SettingsRepository.ts

│ ├── services/

│ │ ├── AuthService.ts # Biometric + key management

│ │ ├── ExportService.ts # JSON / CSV / .spentit export

│ │ ├── ImportService.ts # File validation + restore

│ │ └── BudgetAlertService.ts

│ ├── stores/

│ │ ├── useTransactionStore.ts

│ │ ├── useCategoryStore.ts

│ │ └── useSettingsStore.ts

│ ├── hooks/ # useTransactions, useAnalytics, useBudgets

│ ├── types/ # TypeScript interfaces

│ └── utils/ # currency, date, format helpers

├── assets/

└── app.json

## **4.3 Startup & Authentication Flow**

The following sequence runs on every cold launch and background resume:

| **Step** | **Actor**       | **Action**                                                        | **Failure Path**                       |
| -------- | --------------- | ----------------------------------------------------------------- | -------------------------------------- |
| 1        | App             | Render &lt;AuthGate&gt; - core UI is not mounted yet              |                                        |
| ---      | ---             | ---                                                               | ---                                    |
| 2        | AuthService     | Check if biometric lock is enabled in app_settings                |                                        |
| ---      | ---             | ---                                                               | ---                                    |
| 3        | AuthService     | Request biometric / PIN from expo-local-authentication            | Offer retry + system passcode fallback |
| ---      | ---             | ---                                                               | ---                                    |
| 4        | AuthService     | Read AES-256 key from SecureStore (hardware secure enclave)       | Show "corrupted keychain" error        |
| ---      | ---             | ---                                                               | ---                                    |
| 5        | DatabaseService | Open encrypted SQLite with the retrieved key                      | Show "database unlock failed"          |
| ---      | ---             | ---                                                               | ---                                    |
| 6        | DatabaseService | Run pending migrations (schema versioning)                        | Show migration error screen            |
| ---      | ---             | ---                                                               | ---                                    |
| 7        | App             | Mount core UI, initialize Zustand stores, prefetch dashboard data |                                        |
| ---      | ---             | ---                                                               | ---                                    |

## **4.4 State Management Strategy**

| **State Type**            | **Tool**               | **Rationale**                                        |
| ------------------------- | ---------------------- | ---------------------------------------------------- |
| Server/DB async state     | React Query (TanStack) | Handles loading/error/cache for SQLite queries       |
| ---                       | ---                    | ---                                                  |
| UI global state           | Zustand                | Lightweight, no boilerplate, persists across screens |
| ---                       | ---                    | ---                                                  |
| Form state                | React Hook Form        | Performant, uncontrolled inputs                      |
| ---                       | ---                    | ---                                                  |
| Navigation state          | React Navigation       | Native screen lifecycle management                   |
| ---                       | ---                    | ---                                                  |
| Secure/persisted settings | expo-secure-store      | Encrypted device keychain for the DB key             |
| ---                       | ---                    | ---                                                  |

# **5\. Feature Specifications**

## **5.1 Dashboard (Home Screen)**

### **Overview**

The Dashboard is the first screen post-authentication. It shows the financial health of the current month at a glance and provides one-tap access to add a new transaction.

### **Components**

- Balance Card - net balance (income − expense) with income/expense breakdown
- Budget Ring - circular progress indicator for total monthly budget
- Spending Donut Chart - top 5 categories with "Other" rollup
- Recent Transactions - last 5 entries with category icon, amount, date
- FAB (Floating Action Button) - opens Add Transaction modal

### **Performance Requirement**

All dashboard data is fetched via a single SQL query per card - no in-memory JavaScript aggregation. Charts render from grouped SQL results, not raw row sets.

## **5.2 Add / Edit Transaction Modal**

### **Form Fields**

| **Field**      | **Type**                           | **Validation**                  |
| -------------- | ---------------------------------- | ------------------------------- |
| Amount         | Numeric keypad                     | Required; > 0; max 10 digits    |
| ---            | ---                                | ---                             |
| Type toggle    | Expense / Income segmented control | Required                        |
| ---            | ---                                | ---                             |
| Category       | Scrollable icon grid               | Required; filtered by type      |
| ---            | ---                                | ---                             |
| Date           | Date picker (native)               | Required; defaults to today     |
| ---            | ---                                | ---                             |
| Payment method | Chip selector                      | Optional; defaults to last used |
| ---            | ---                                | ---                             |
| Note           | Text input (1 line)                | Optional; max 200 chars         |
| ---            | ---                                | ---                             |
| Receipt photo  | Camera / gallery picker            | Optional; stored locally        |
| ---            | ---                                | ---                             |
| Recurring      | Toggle + frequency picker          | Optional                        |
| ---            | ---                                | ---                             |

### **Behaviour**

- Amount field is focused automatically on modal open
- Category list scrolls horizontally; "+" at end opens Create Category
- Save triggers a React Query invalidation which refreshes all cached screens
- Edit pre-populates all fields from existing transaction

## **5.3 Transactions List Screen**

- Virtualised list via Shopify FlashList (replaces FlatList) for 60fps on large datasets
- Grouped by date (Today, Yesterday, then calendar headers)
- Swipe left to delete (with undo toast); swipe right to edit
- Search bar: full-text search on note + category name
- Filter chip bar: filter by date range, category, type, payment method
- Infinite scroll - 50 rows per page from SQLite with cursor pagination

## **5.4 Analytics Screen**

| **Chart**            | **Library**              | **Data Source Query**                          |
| -------------------- | ------------------------ | ---------------------------------------------- |
| Spending Donut       | Victory Native XL - Pie  | Spending by Category query (§3.3)              |
| ---                  | ---                      | ---                                            |
| Daily Trend Line     | Victory Native XL - Line | Daily Spending Trend query (§3.3)              |
| ---                  | ---                      | ---                                            |
| Monthly Bar          | Victory Native XL - Bar  | GROUP BY strftime('%Y-%m', date) last 6 months |
| ---                  | ---                      | ---                                            |
| Category Budget Bars | Custom ProgressBar       | Budget vs Actual query (§3.3)                  |
| ---                  | ---                      | ---                                            |
| Income vs Expense    | Victory Native XL - Area | Monthly Balance Summary (§3.3)                 |
| ---                  | ---                      | ---                                            |

Month selector at top; all charts update reactively when month changes (React Query key includes selected month).

## **5.5 Categories Screen**

- Grid view of all expense categories, then income categories
- Tap to view transactions in that category
- Long-press to edit (name, icon, color) or archive
- Create Category: name input + icon picker (100+ Material icons) + color wheel
- Budget tab: set monthly budget per category with visual allocation bars

## **5.6 Settings Screen**

| **Section** | **Setting**                        | **Default**             |
| ----------- | ---------------------------------- | ----------------------- |
| Security    | Biometric / PIN lock               | Enabled                 |
| ---         | ---                                | ---                     |
| Security    | Lock timeout                       | 30 seconds              |
| ---         | ---                                | ---                     |
| Appearance  | Theme                              | System (follows device) |
| ---         | ---                                | ---                     |
| Preferences | Default currency                   | INR                     |
| ---         | ---                                | ---                     |
| Preferences | Week start day                     | Monday                  |
| ---         | ---                                | ---                     |
| Preferences | Date format                        | DD/MM/YYYY              |
| ---         | ---                                | ---                     |
| Data        | Export as .spentit (encrypted)     | -                       |
| ---         | ---                                | ---                     |
| Data        | Export as JSON                     | -                       |
| ---         | ---                                | ---                     |
| Data        | Export as CSV                      | -                       |
| ---         | ---                                | ---                     |
| Data        | Import / Restore                   | -                       |
| ---         | ---                                | ---                     |
| Data        | Clear all data (with confirmation) | -                       |
| ---         | ---                                | ---                     |
| About       | App version, open source licenses  | -                       |
| ---         | ---                                | ---                     |

# **6\. Security Design**

## **6.1 Threat Model**

| **Threat**            | **Attack Vector**                                  | **Mitigation**                                                                            |
| --------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Physical device theft | Attacker boots device, pulls app data              | SQLCipher AES-256 + OS full-disk encryption                                               |
| ---                   | ---                                                | ---                                                                                       |
| Key extraction        | Read key from app storage                          | Key stored in hardware-backed SecureStore, never in plain AsyncStorage                    |
| ---                   | ---                                                | ---                                                                                       |
| Backup snooping       | Intercept exported .spentit file                   | File is AES-256 encrypted before export; key derived from user passphrase (PBKDF2 + salt) |
| ---                   | ---                                                | ---                                                                                       |
| Shoulder surfing      | Observe screen in public                           | Biometric gate + auto-lock on background                                                  |
| ---                   | ---                                                | ---                                                                                       |
| Malicious import      | Import crafted .spentit with XSS/injection payload | JSON schema validation + parameterized SQL inserts on all import paths                    |
| ---                   | ---                                                | ---                                                                                       |

## **6.2 Encryption Key Lifecycle**

- On first install: generate 256-bit random AES key via expo-crypto
- Store key in expo-secure-store (maps to iOS Keychain / Android Keystore)
- On launch: biometric auth unlocks Keychain, retrieve key
- Pass key to SQLCipher via PRAGMA key = '...' immediately after db.open()
- Key is never written to AsyncStorage, SQLite plain text, or logs
- On "Clear All Data": key is regenerated; old encrypted database is deleted

## **6.3 Export File Encryption (.spentit format)**

// ExportService.ts (simplified)

async function exportEncrypted(passphrase: string): Promise&lt;string&gt; {

const salt = await Crypto.getRandomBytesAsync(16);

const key = await PBKDF2(passphrase, salt, 100_000, 32); // SHA-256

const iv = await Crypto.getRandomBytesAsync(12);

const json = await buildFullExportJSON(); // all tables

const ciphertext = await AES_GCM_encrypt(json, key, iv);

const file = JSON.stringify({ v: 1, salt, iv, data: ciphertext });

const path = FileSystem.cacheDirectory + 'spentit_backup.spentit';

await FileSystem.writeAsStringAsync(path, file);

await Sharing.shareAsync(path); // hands off to OS share sheet

}

# **7\. Backup, Export & Restore Strategy**

## **7.1 The No-Cloud Philosophy**

SpentIt delegates cloud storage entirely to the user. The app writes a local backup file and hands it to the OS native share sheet. The user may then save it to iCloud Drive, Google Drive, email, Dropbox, or any destination of their choosing. SpentIt incurs zero server costs and zero privacy liability.

## **7.2 Export Formats**

| **Format**       | **File Extension** | **Use Case**                                             | **Encrypted**              |
| ---------------- | ------------------ | -------------------------------------------------------- | -------------------------- |
| SpentIt Native   | .spentit           | Full restore to SpentIt on new device                    | Yes (AES-256 + passphrase) |
| ---              | ---                | ---                                                      | ---                        |
| JSON             | .json              | Developer use, data portability, migration to other apps | No                         |
| ---              | ---                | ---                                                      | ---                        |
| CSV (multi-file) | .zip of 3 CSVs     | Spreadsheet analysis in Excel / Google Sheets            | No                         |
| ---              | ---                | ---                                                      | ---                        |

## **7.3 JSON Export Schema**

{

"meta": {

"version": "1.0.0",

"exported_at": "2025-05-22T14:30:00Z",

"transaction_count": 1247,

"currency": "INR"

},

"categories": \[ { "id": 1, "name": "Food", "color": "#6C63FF", ... } \],

"payment_methods": \[ { "id": 1, "name": "Cash", ... } \],

"transactions": \[ { "id": 1, "amount": 250.00, "type": "expense", ... } \],

"budgets": \[ { "category_id": 1, "amount": 5000, "year": 2025, ... } \],

"settings": { "currency": "INR", "theme": "dark" }

}

## **7.4 Import / Restore Flow**

- User taps Settings → Import / Restore
- expo-document-picker opens native file browser (iCloud Drive, Google Drive, Files app)
- User selects a .spentit or .json file
- ImportService reads and validates file magic bytes / JSON schema
- For .spentit: prompt for passphrase → PBKDF2 derive key → AES-GCM decrypt
- Schema migration check: if backup is older version, run upgrade transforms
- Show preview: "1,247 transactions, 18 categories - this will replace current data"
- User confirms → atomic SQLite transaction replaces all tables
- On success: show "Restore complete" and navigate to Dashboard

## **7.5 Auto-Backup Reminder**

If more than 7 days pass since last_backup in app_settings is updated, SpentIt shows a non-intrusive banner on the Dashboard reminding the user to back up. The reminder links directly to the Export screen.

# **8\. Software Design Specification (SDS)**

## **8.1 Repository Pattern**

Each entity has a typed repository class that wraps all SQL. No raw SQL appears outside of repository files.

// repositories/TransactionRepository.ts

export class TransactionRepository {

constructor(private db: SQLiteDatabase) {}

async create(tx: NewTransaction): Promise&lt;number&gt; {

const result = await this.db.runAsync(

\`INSERT INTO transactions

(amount, type, category_id, payment_method_id, note, date, time, currency)

VALUES (?, ?, ?, ?, ?, ?, ?, ?)\`,

\[tx.amount, tx.type, tx.category_id, tx.payment_method_id,

tx.note ?? null, tx.date, tx.time, tx.currency\]

);

return result.lastInsertRowId;

}

async getMonthlySummary(yearMonth: string) {

return this.db.getFirstAsync&lt;MonthSummary&gt;(

\`SELECT

SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS income,

SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS expense

FROM transactions WHERE strftime('%Y-%m', date) = ?\`,

\[yearMonth\]

);

}

}

## **8.2 Custom Hooks**

// hooks/useTransactions.ts

export function useTransactions(filters: TransactionFilters) {

const repo = useTransactionRepository();

return useQuery({

queryKey: \['transactions', filters\],

queryFn: () => repo.getPaginated(filters),

staleTime: 1000 \* 60, // 1 minute

});

}

export function useDashboard(yearMonth: string) {

const repo = useTransactionRepository();

return useQuery({

queryKey: \['dashboard', yearMonth\],

queryFn: async () => ({

summary: await repo.getMonthlySummary(yearMonth),

byCategory: await repo.getByCategory(yearMonth),

dailyTrend: await repo.getDailyTrend(yearMonth),

}),

});

}

## **8.3 Migration System**

Schema versions are tracked in a user_version PRAGMA. On each app launch, the migration runner compares user_version against the latest migration index and runs any missing SQL files in order.

// db/migrations/runner.ts

const MIGRATIONS = \[

require('./v001_initial_schema.sql'),

require('./v002_add_receipt_uri.sql'),

require('./v003_add_payment_methods.sql'),

\];

export async function runMigrations(db: SQLiteDatabase) {

const { user_version } = await db.getFirstAsync&lt;{user_version: number}&gt;('PRAGMA user_version');

for (let i = user_version; i < MIGRATIONS.length; i++) {

await db.execAsync(MIGRATIONS\[i\]);

await db.execAsync(\`PRAGMA user_version = \${i + 1};\`);

}

}

## **8.4 Error Handling Strategy**

| **Layer**                 | **Strategy**                                                      | **User Facing**                                |
| ------------------------- | ----------------------------------------------------------------- | ---------------------------------------------- |
| Database write failure    | Wrap in try/catch; rollback transaction; log to local error store | Toast: "Could not save. Please try again."     |
| ---                       | ---                                                               | ---                                            |
| Biometric failure         | Retry loop (3 attempts), then fall back to system PIN             | Biometric prompt with fallback button          |
| ---                       | ---                                                               | ---                                            |
| Import validation failure | Throw typed ImportError with reason code                          | "Invalid file format" dialog with details      |
| ---                       | ---                                                               | ---                                            |
| Budget alert              | BudgetAlertService checks after each expense write                | Push notification or in-app banner             |
| ---                       | ---                                                               | ---                                            |
| Migration failure         | Log SQL error; show recovery screen with export option            | "Database error - please export and reinstall" |
| ---                       | ---                                                               | ---                                            |

# **9\. Implementation Roadmap**

## **9.1 Phase 1 - Foundation (Weeks 1-2)**

- Expo SDK 51 project init with TypeScript strict mode
- expo-sqlite + WAL mode + migration runner
- SQLCipher encryption integration
- expo-local-authentication biometric gate
- Core schema: transactions, categories, payment_methods, budgets, app_settings
- Seed data: 15 default categories
- Zustand store scaffolding + React Query setup

## **9.2 Phase 2 - Core Features (Weeks 3-5)**

- Add/Edit Transaction modal with all form fields
- Transactions List with FlashList + date grouping
- Swipe-to-delete with undo toast
- Search + filter functionality
- Dashboard: balance card + recent transactions

## **9.3 Phase 3 - Analytics (Week 6)**

- Victory Native XL chart integration
- Donut chart + line chart + bar chart + budget progress bars
- Month selector with reactive query key
- Category drill-down navigation

## **9.4 Phase 4 - Budgets & Categories (Week 7)**

- Category manager (create, edit, archive)
- Icon picker (100+ icons) + color wheel
- Monthly budget per category
- Budget alert service + notification

## **9.5 Phase 5 - Backup & Settings (Week 8)**

- ExportService: .spentit (encrypted) + JSON + CSV
- ImportService: validation + atomic restore
- Native share sheet integration + document picker
- Settings screen: all preferences + security settings
- Auto-backup reminder logic

## **9.6 Phase 6 - Polish & Release (Week 9-10)**

- Dark mode + system theme following
- Accessibility audit (VoiceOver, TalkBack)
- Performance profiling (Flipper + Hermes profiler)
- EAS Build configuration for App Store + Play Store
- App Store Connect submission + Play Store submission

## **9.7 v2.0 Backlog**

- Receipt photo capture + local storage
- Recurring transactions automation
- Widgets (iOS Lock Screen / Android Home Screen)
- Multi-currency with offline exchange rates (bundled JSON table)
- PDF report generation
- iCloud / Google Drive auto-backup (user-configured)
- Apple Watch / WearOS companion for quick entry

# **10\. Glossary**

| **Term**     | **Definition**                                                                         |
| ------------ | -------------------------------------------------------------------------------------- |
| WAL          | Write-Ahead Logging - SQLite journal mode enabling concurrent reads during writes      |
| ---          | ---                                                                                    |
| SQLCipher    | Open-source SQLite extension providing transparent AES-256 full-database encryption    |
| ---          | ---                                                                                    |
| SecureStore  | expo-secure-store API that maps to iOS Keychain / Android Keystore hardware security   |
| ---          | ---                                                                                    |
| PBKDF2       | Password-Based Key Derivation Function 2 - used to derive AES key from user passphrase |
| ---          | ---                                                                                    |
| AES-GCM      | AES cipher in Galois/Counter Mode - authenticated encryption used for .spentit files   |
| ---          | ---                                                                                    |
| FlashList    | Shopify's high-performance RecyclerView-backed list for React Native                   |
| ---          | ---                                                                                    |
| React Query  | TanStack Query - async state management with caching and invalidation                  |
| ---          | ---                                                                                    |
| Zustand      | Minimal React state management library using hooks (replaces Redux)                    |
| ---          | ---                                                                                    |
| EAS Build    | Expo Application Services - cloud build service for React Native app binaries          |
| ---          | ---                                                                                    |
| Repo Pattern | Repository pattern - data access layer that abstracts SQL from business logic          |
| ---          | ---                                                                                    |
| .spentit     | SpentIt native backup format: AES-256 encrypted JSON, identified by .spentit extension |
| ---          | ---                                                                                    |
| FAB          | Floating Action Button - primary action button fixed in corner of a screen             |
| ---          | ---                                                                                    |
