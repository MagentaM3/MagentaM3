import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { LogModule, Logger } from '../logging';
import { db } from './connection';
import "dotenv/config"
// import { Pool } from "pg";
// import { drizzle } from 'drizzle-orm';

const LM = new LogModule('MIGRATOR');

void (async () => {
  Logger.Info(LM, 'Begin database migration');
  await migrate(db, { migrationsFolder: 'src/db/migrations' });
  Logger.Info(LM, 'Database migration has been completed');

  process.exit(0);
})();

// const pool = new Pool({
//   connectionString:process.env.DB_URL
// })

// const db = await drizzle("node-postgres", process.env.DB_URL)