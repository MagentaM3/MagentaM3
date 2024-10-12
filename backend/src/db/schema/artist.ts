import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const artists = pgTable("artist", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  uri: text("uri")
});