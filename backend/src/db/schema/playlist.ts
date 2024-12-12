import { pgTable, serial, text, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { users } from "./user"
import { images } from "./images"
import { playlist_tracks } from "./playlistTrack";

export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  collaborative: boolean("collaborative"),
  description: text("description"),
  name: varchar("name", { length: 256 }),
  owner_Id: integer("owner_Id").notNull().references(() => users.id),
  snapshot_id: text("snapshot_id"),
  uri: text("link")
});

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  owner: one(users, {
    fields: [playlists.owner_Id],
    references: [users.id], 
  }),
  images: many(images),
  tracks: many(playlist_tracks),
}));
