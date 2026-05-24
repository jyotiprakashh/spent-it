export const V001_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS accounts (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  name            TEXT    NOT NULL UNIQUE,
  type            TEXT    NOT NULL CHECK(type IN ('cash','bank','credit_card','savings','investment','wallet')),
  icon            TEXT    NOT NULL DEFAULT 'wallet',
  color           TEXT    NOT NULL DEFAULT '#6C63FF',
  opening_balance REAL    NOT NULL DEFAULT 0,
  currency        TEXT    NOT NULL DEFAULT 'INR',
  is_default      INTEGER NOT NULL DEFAULT 0,
  is_archived     INTEGER NOT NULL DEFAULT 0,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_acc_archived ON accounts(is_archived);

CREATE TABLE IF NOT EXISTS categories (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL UNIQUE,
  icon        TEXT    NOT NULL DEFAULT 'tag',
  color       TEXT    NOT NULL DEFAULT '#6C63FF',
  is_income   INTEGER NOT NULL DEFAULT 0,
  is_system   INTEGER NOT NULL DEFAULT 1,
  is_archived INTEGER NOT NULL DEFAULT 0,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS payment_methods (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL UNIQUE,
  icon       TEXT    NOT NULL DEFAULT 'card',
  is_default INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS transactions (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  amount            REAL    NOT NULL CHECK(amount > 0),
  type              TEXT    NOT NULL CHECK(type IN ('expense','income')),
  category_id       INTEGER NOT NULL REFERENCES categories(id),
  account_id        INTEGER NOT NULL REFERENCES accounts(id),
  payment_method_id INTEGER REFERENCES payment_methods(id),
  note              TEXT,
  date              TEXT    NOT NULL,
  time              TEXT    NOT NULL DEFAULT '00:00',
  currency          TEXT    NOT NULL DEFAULT 'INR',
  receipt_uri       TEXT,
  is_recurring      INTEGER NOT NULL DEFAULT 0,
  recurrence_rule   TEXT,
  is_transfer       INTEGER NOT NULL DEFAULT 0,
  transfer_pair_id  INTEGER,
  created_at        TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_txn_date     ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_txn_category ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_txn_account  ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_txn_type_date ON transactions(type, date);
CREATE INDEX IF NOT EXISTS idx_txn_cat_date  ON transactions(category_id, date);
CREATE INDEX IF NOT EXISTS idx_txn_acc_date  ON transactions(account_id, date);

CREATE TABLE IF NOT EXISTS budgets (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER REFERENCES categories(id),
  amount      REAL    NOT NULL CHECK(amount > 0),
  period      TEXT    NOT NULL DEFAULT 'monthly',
  year        INTEGER NOT NULL,
  month       INTEGER,
  UNIQUE(category_id, year, month)
);

CREATE TABLE IF NOT EXISTS app_settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Default account
INSERT OR IGNORE INTO accounts (name, type, icon, opening_balance, is_default)
VALUES ('Cash Wallet', 'cash', 'wallet', 0, 1);

-- Payment methods
INSERT OR IGNORE INTO payment_methods (name, icon, is_default) VALUES ('Cash', 'cash-outline', 1);
INSERT OR IGNORE INTO payment_methods (name, icon, is_default) VALUES ('Card', 'card-outline', 0);

-- Expense categories (13)
INSERT OR IGNORE INTO categories (name, icon, color, is_income, is_system, sort_order) VALUES
  ('Food & Dining',     'restaurant-outline',          '#FF6B6B', 0, 1, 1),
  ('Transportation',    'car-outline',                 '#4ECDC4', 0, 1, 2),
  ('Shopping',          'bag-outline',                 '#45B7D1', 0, 1, 3),
  ('Entertainment',     'game-controller-outline',     '#96CEB4', 0, 1, 4),
  ('Health',            'medical-outline',             '#FFEAA7', 0, 1, 5),
  ('Housing',           'home-outline',                '#DDA0DD', 0, 1, 6),
  ('Education',         'school-outline',              '#98D8C8', 0, 1, 7),
  ('Bills & Utilities', 'receipt-outline',             '#F7DC6F', 0, 1, 8),
  ('Personal Care',     'person-outline',              '#BB8FCE', 0, 1, 9),
  ('Travel',            'airplane-outline',            '#85C1E9', 0, 1, 10),
  ('Gifts & Donations', 'gift-outline',                '#F1948A', 0, 1, 11),
  ('Business',          'briefcase-outline',           '#82E0AA', 0, 1, 12),
  ('Other',             'ellipsis-horizontal-outline', '#AEB6BF', 0, 1, 13);

-- Income categories (2)
INSERT OR IGNORE INTO categories (name, icon, color, is_income, is_system, sort_order) VALUES
  ('Salary',    'wallet-outline', '#00D09C', 1, 1, 1),
  ('Freelance', 'laptop-outline', '#5367F5', 1, 1, 2);

-- App settings defaults
INSERT OR IGNORE INTO app_settings VALUES ('currency',              'INR');
INSERT OR IGNORE INTO app_settings VALUES ('biometric_lock',        '1');
INSERT OR IGNORE INTO app_settings VALUES ('lock_timeout_seconds',  '30');
INSERT OR IGNORE INTO app_settings VALUES ('theme',                 'system');
INSERT OR IGNORE INTO app_settings VALUES ('last_backup',           '');
INSERT OR IGNORE INTO app_settings VALUES ('onboarding_done',       '0');
`;
