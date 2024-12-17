import { timestamp, pgTable, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user";
import { playlists } from "./playlist";
import { tracks } from "./track"

export const playlistTracks = pgTable("playlist_tracks", {
  id: serial("id").primaryKey(),
  addedAt: timestamp("added_at").defaultNow(),
  addedById: integer("added_by_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
  trackId: integer("track_id").notNull().references(() => tracks.id, {onDelete: 'cascade'}),
  playlistId: integer("playlist_id").notNull().references(() => playlists.id, {onDelete: 'cascade'})
});

export const playlistTracksRelations = relations(playlistTracks, ({ one }) => ({
  addedBy: one(users, {
    fields: [playlistTracks.addedById],
    references: [users.id],
  }),
  track: one(tracks, {
    fields: [playlistTracks.trackId],
    references: [tracks.id],
  }),
  playlist: one(playlists, {
    fields: [playlistTracks.playlistId],
    references: [playlists.id]
  }),
})); 