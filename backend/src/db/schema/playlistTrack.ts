import { timestamp, pgTable, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user";
import { playlists } from "./playlist";
import { tracks } from "./track"

export const playlist_tracks = pgTable("playlist_tracks", {
  id: serial("id").primaryKey(),
  added_at: timestamp("added_at").defaultNow(),
  added_by_id: integer("added_by_id").notNull().references(() => users.id, {onDelete: 'cascade'}),
  track_id: integer("track_id").notNull().references(() => tracks.id, {onDelete: 'cascade'}),
  playlist_id: integer("playlist_id").notNull().references(() => playlists.id, {onDelete: 'cascade'})
});

export const playlist_tracksRelations = relations(playlist_tracks, ({ one }) => ({
  added_by: one(users, {
    fields: [playlist_tracks.added_by_id],
    references: [users.id],
  }),
  track: one(tracks, {
    fields: [playlist_tracks.track_id],
    references: [tracks.id],
  }),
  playlist: one(playlists, {
    fields: [playlist_tracks.playlist_id],
    references: [playlists.id]
  }),
})); 