// Sprint 5 + 6 migration: seeds the system Transfer category used by
// account-to-account transfers, and creates the app_errors table used by
// the local error logger (no network — all errors stay on device).
export const V002_SQL = `
INSERT INTO categories (name, icon, color, is_income, is_system, sort_order)
VALUES ('Transfer', 'swap-horizontal', '#8E8E93', 0, 1, 100);

CREATE TABLE app_errors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT NOT NULL,
  stack TEXT,
  context TEXT,
  occurred_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_app_errors_occurred ON app_errors(occurred_at DESC);
`;
