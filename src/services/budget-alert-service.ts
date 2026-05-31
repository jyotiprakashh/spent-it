import type { BudgetRepository } from '@/db/repositories/budget-repository';
import type { CategoryRepository } from '@/db/repositories/category-repository';
import type { TransactionRepository } from '@/db/repositories/transaction-repository';
import type { AlertLevel, BudgetAlertResult, NewTransaction } from '@/types';

const WARN_THRESHOLD = 0.8;
const EXCEED_THRESHOLD = 1.0;

function levelFor(pct: number): AlertLevel {
  if (pct >= EXCEED_THRESHOLD) return 'EXCEEDED';
  if (pct >= WARN_THRESHOLD) return 'WARNING';
  return 'OK';
}

export class BudgetAlertService {
  private readonly budgets: BudgetRepository;
  private readonly txns: TransactionRepository;
  private readonly categories: CategoryRepository;

  constructor(
    budgets: BudgetRepository,
    txns: TransactionRepository,
    categories: CategoryRepository,
  ) {
    this.budgets = budgets;
    this.txns = txns;
    this.categories = categories;
  }

  async checkAfterTransaction(tx: NewTransaction): Promise<BudgetAlertResult[]> {
    if (tx.type !== 'expense') return [];
    const yearMonth = tx.date.slice(0, 7);
    const year = parseInt(yearMonth.slice(0, 4), 10);
    const month = parseInt(yearMonth.slice(5, 7), 10);
    if (!Number.isFinite(year) || !Number.isFinite(month)) return [];

    const results: BudgetAlertResult[] = [];

    const categoryBudget = await this.budgets.getForCategory(tx.category_id, year, month);
    if (categoryBudget !== null && categoryBudget.amount > 0) {
      const byCategory = await this.txns.getSpendingByCategory(yearMonth);
      const row = byCategory.find((c) => c.category_id === tx.category_id);
      const spent = row?.total ?? 0;
      const pct = spent / categoryBudget.amount;
      const level = levelFor(pct);
      if (level !== 'OK') {
        const category = await this.categories.getById(tx.category_id);
        results.push({
          id: `cat-${tx.category_id}-${yearMonth}`,
          level,
          category_id: tx.category_id,
          category_name: category?.name ?? 'Category',
          spent,
          budget: categoryBudget.amount,
          pct,
        });
      }
    }

    const totalBudget = await this.budgets.getForCategory(null, year, month);
    if (totalBudget !== null && totalBudget.amount > 0) {
      const summary = await this.txns.getMonthlySummary(yearMonth);
      const pct = summary.expense / totalBudget.amount;
      const level = levelFor(pct);
      if (level !== 'OK') {
        results.push({
          id: `total-${yearMonth}`,
          level,
          category_id: null,
          category_name: 'Total monthly',
          spent: summary.expense,
          budget: totalBudget.amount,
          pct,
        });
      }
    }

    return results;
  }
}
