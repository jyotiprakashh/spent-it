import type { ErrorRepository } from '@/db/repositories/error-repository';

let repoSingleton: ErrorRepository | null = null;

export function configureErrorLogger(repo: ErrorRepository | null): void {
  repoSingleton = repo;
}

function describe(error: unknown): { message: string; stack: string | null } {
  if (error instanceof Error) {
    return { message: error.message, stack: error.stack ?? null };
  }
  if (typeof error === 'string') return { message: error, stack: null };
  try {
    return { message: JSON.stringify(error), stack: null };
  } catch {
    return { message: 'Unknown error', stack: null };
  }
}

// Fire-and-forget. Never throws, never returns a rejected promise.
export function logError(error: unknown, context?: string): void {
  if (repoSingleton === null) return;
  const { message, stack } = describe(error);
  void repoSingleton.log({ message, stack, context: context ?? null }).catch(() => {
    // Logger must never propagate.
  });
}
