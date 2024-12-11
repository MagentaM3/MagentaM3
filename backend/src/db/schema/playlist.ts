import { pgTable, serial, text, integer, boolean, varchar, primaryKey } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { users } from "./user"
import { images } from "./images"
import { tracks } from "./track";

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
  playlistsToTracks: many(playlistsToTracks),
}));

export const playlistsToTracks = pgTable( 
  "playlists_to_tracks", 
  {
    playlistId: integer('playlist_id')
      .notNull()
      .references(() => playlists.id),
    trackId: integer('track_id')
      .notNull()
      .references(() => tracks.id)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.playlistId, t.trackId]})
  })
);

export const playlistsToTracksRelations = relations(playlistsToTracks, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistsToTracks.playlistId],
    references: [playlists.id],
  }),
  tracks: one(tracks, {
    fields: [playlistsToTracks.trackId],
    references: [tracks.id]
  }),
}));