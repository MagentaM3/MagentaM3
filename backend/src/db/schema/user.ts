import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id"),
  name: text("name"),
});

export type IAdminAccount = typeof users.$inferInsert;
export type SAdminAccount = typeof users.$inferSelect;