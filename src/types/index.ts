export type TxnType = 'expense' | 'income';
export type AccountType = 'cash' | 'bank' | 'credit_card' | 'savings' | 'investment' | 'wallet';
export type AlertLevel = 'OK' | 'WARNING' | 'EXCEEDED';
export type ExportFormat = 'spentit' | 'json' | 'csv';
export type ImportErrorReason =
  | 'UNSUPPORTED_VERSION'
  | 'DECRYPTION_FAILED'
  | 'SCHEMA_INVALID'
  | 'REFERENTIAL_INTEGRITY'
  | 'DB_WRITE_FAILED';

export interface Account {
  id: number;
  name: string;
  type: AccountType;
  icon: string;
  color: string;
  opening_balance: number;
  currency: string;
  is_default: boolean;
  is_archived: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type NewAccount = Omit<Account, 'id' | 'created_at' | 'updated_at'>;
export type AccountWithBalance = Account & { current_balance: number };

export interface Transaction {
  id: number;
  amount: number;
  type: TxnType;
  category_id: number;
  account_id: number;
  payment_method_id: number | null;
  note: string | null;
  date: string;
  time: string;
  currency: string;
  receipt_uri: string | null;
  is_recurring: boolean;
  recurrence_rule: string | null;
  is_transfer: boolean;
  transfer_pair_id: number | null;
  created_at: string;
  updated_at: string;
}

export type NewTransaction = Omit<Transaction, 'id' | 'created_at' | 'updated_at'>;

export interface TransactionWithCategory extends Transaction {
  category_name: string;
  category_icon: string;
  category_color: string;
  account_name: string;
  account_color: string;
}

export interface TxnFilters {
  yearMonth?: string;
  type?: TxnType;
  category_id?: number;
  account_id?: number;
  search?: string;
}

export type TxnCursor = { date: string; id: number } | null;

export interface TxnPage {
  rows: TransactionWithCategory[];
  nextCursor: TxnCursor;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  is_income: boolean;
  is_system: boolean;
  is_archived: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type NewCategory = Omit<Category, 'id' | 'created_at' | 'updated_at'>;

export interface PaymentMethod {
  id: number;
  name: string;
  icon: string;
  is_default: boolean;
}

export interface Budget {
  id: number;
  category_id: number | null;
  amount: number;
  period: string;
  year: number;
  month: number | null;
}

export type NewBudget = Omit<Budget, 'id'>;

export interface ExportPayload {
  meta: {
    version: string;
    exported_at: string;
    transaction_count: number;
    currency: string;
  };
  accounts: Account[];
  categories: Category[];
  payment_methods: PaymentMethod[];
  transactions: Transaction[];
  budgets: Budget[];
  settings: Record<string, string>;
}

export interface SpentItFile {
  v: 1;
  salt: string;
  iv: string;
  data: string;
}

export interface MonthlySummary {
  income: number;
  expense: number;
  net: number;
}

export interface CategorySpend {
  category_id: number;
  category_name: string;
  category_icon: string;
  category_color: string;
  total: number;
}

export interface DailyTrendPoint {
  date: string;
  total: number;
}

export interface MonthlyComparisonPoint {
  year_month: string;
  income: number;
  expense: number;
}

export interface YtdPoint {
  month: number;
  cum_income: number;
  cum_expense: number;
}

export interface BudgetAlertResult {
  id: string;
  level: AlertLevel;
  category_id: number | null;
  category_name: string;
  spent: number;
  budget: number;
  pct: number;
}

export interface AccountErrorRow {
  id: number;
  message: string;
  stack: string | null;
  context: string | null;
  occurred_at: string;
}

export type ThemePreference = 'system' | 'light' | 'dark';
export type LockTimeoutSeconds = 15 | 30 | 60 | 300 | -1;

export interface NewAppError {
  message: string;
  stack?: string | null;
  context?: string | null;
}
