import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { images } from './images';
import { playlists } from './playlist';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  display_name: varchar("display_name", { length: 256 }),
  country: varchar("country", { length: 2 }),
  email: text("email"),
  uri: text("link")
});

export const userRelations = relations(users, ({ many }) => ({
  playlists: many(playlists),
  images: many(images),
}));

// export type IAdminAccount = typeof users.$inferInsert;
// export type SAdminAccount = typeof users.$inferSelect;