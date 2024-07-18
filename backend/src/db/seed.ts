import { sql } from "drizzle-orm";
import { Logger, LogModule } from "../logging";
import { db } from "./connection";
import { users } from "./schema/user";

const LM = new LogModule('SEEDER');

export const seedDB = async () => {
  Logger.Info(LM, 'Begin clearing the database');

  // select all tables in the database and delete every row
  const query = sql<string>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE'
;`;
  const tables = await db.execute(query);
  for (const table of tables) {
    const query = sql.raw(`TRUNCATE TABLE ${table.table_name as string} RESTART IDENTITY CASCADE;`);
    await db.execute(query);
  }

  Logger.Info(LM, 'Database has been cleared');

  Logger.Info(LM, 'Begin seeding the database');

  Logger.Info(LM, 'Seeding user');

  await db.insert(users).values({
		id: 0,
    name: 'justin@email.com',
  });
	
  Logger.Info(LM, 'Database has been seeded');
};