import { relations } from 'drizzle-orm';
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { images } from './images';
import { playlists } from './playlist';

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  displayName: varchar("display_name", { length: 256 }).notNull(),
  country: varchar("country", { length: 2 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  uri: text("link")
});

export const usersRelations = relations(users, ({ many }) => ({
  playlists: many(playlists),
  images: many(images),
}));