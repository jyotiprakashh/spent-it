// Dev helper — migrations run automatically at app startup via runMigrations().
// To force a clean re-run: delete the app from the simulator/emulator and relaunch.
console.log('[db:migrate] Migrations run automatically via runMigrations() at app startup.');
console.log('[db:migrate] To reset: delete the app from simulator/emulator and relaunch.');
console.log('[db:migrate] For in-memory testing: import runMigrations from src/db/migrations/runner.ts.');
process.exit(0);
