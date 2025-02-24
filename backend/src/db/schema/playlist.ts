import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { images } from "./images";
import { playlistTracks } from "./playlistTrack";
import { users } from "./user";

export const playlists = pgTable("playlists", {
  id: varchar("id", { length: 36 }).primaryKey(),
  collaborative: boolean("collaborative").notNull(),
  description: text("description"),
  name: varchar("name", { length: 256 }).notNull(),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  snapshotId: text("snapshot_id"),
  uri: text("link")
});

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  owner: one(users, {
    fields: [playlists.ownerId],
    references: [users.id],
  }),
  images: many(images),
  tracks: many(playlistTracks),
}));
