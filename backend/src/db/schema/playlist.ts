import { pgTable, serial, text, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { users } from "./user"
import { images } from "./images"
import { playlistTracks } from "./playlistTrack";

export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  collaborative: boolean("collaborative"),
  description: text("description"),
  name: varchar("name", { length: 256 }),
  ownerId: integer("owner_id").notNull().references(() => users.id),
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
