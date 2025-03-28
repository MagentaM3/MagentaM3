import dotenv from 'dotenv';
import { defineConfig } from "drizzle-kit";
import { env } from '../env';

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "src/db/schema/*",
  out: 'src/db/migrations',
  dbCredentials: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: 'localhost',
    port: env.DB_PORT,
    database: env.DB_NAME,
		ssl: false
  },
  strict: true,
});