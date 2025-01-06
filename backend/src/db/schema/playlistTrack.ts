import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { playlists } from "./playlist";
import { tracks } from "./track";
import { users } from "./user";



export const playlistTracks = pgTable("playlist_tracks", {
  id: varchar("id", { length: 36 }).primaryKey(),
  addedAt: timestamp("added_at", { mode: 'string' }).defaultNow(),
	// TODO: there is a chance for the playlist to be collaborative and be added by
	// someone who hasn't added themselves to the app so this constraint needs to be weekend?
  addedById: varchar("added_by_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
  trackId: varchar("track_id").notNull().references(() => tracks.id, {onDelete: 'cascade'}),
  playlistId: varchar("playlist_id").notNull().references(() => playlists.id, {onDelete: 'cascade'})
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