import { timestamp, pgTable, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user";
import { playlists } from "./playlist";
import { tracks } from "./track"

export const playlistTracks = pgTable("playlistTrack", {
	id: serial("id").primaryKey(),
	added_at: timestamp("added_at").defaultNow(),
	added_by_id: integer("added_by_id").notNull().references(() => users.id),
	track_id: integer("track_id").notNull().references(() => tracks.id),
	playlist_id: integer("playlist_id").notNull().references(() => playlists.id)
});

export const playlistTracksRelations = relations(playlistTracks, ({ one }) => ({
	added_by: one(users, {
		fields: [playlistTracks.added_by_id],
		references: [users.id],
	}),
	track: one(tracks, {
		fields: [playlistTracks.track_id],
		references: [tracks.id],
	}),
	playlist: one(playlists, {
		fields: [playlistTracks.playlist_id],
		references: [playlists.id]
	}),
})); 