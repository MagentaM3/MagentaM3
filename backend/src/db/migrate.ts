import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { LogModule, Logger } from '../logging';
import { db } from './connection';

const LM = new LogModule('MIGRATOR');

void (async () => {
  Logger.Info(LM, 'Begin database migration');
  await migrate(db, { migrationsFolder: 'src/db/migrations' });
  Logger.Info(LM, 'Database migration has been completed');

  process.exit(0);
})();