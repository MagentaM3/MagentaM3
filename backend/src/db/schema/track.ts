import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, primaryKey, text, varchar } from "drizzle-orm/pg-core";
import { albums } from "./album";
import { artists } from "./artist";

export const tracks = pgTable("tracks", {
  id: varchar("id", { length: 36 }).primaryKey(),
  albumId: varchar("album_id").references(() => albums.id),
  durationMs: integer("duration_ms"),
  discNumber: integer("disc_number"),
  explict: boolean("explicit"),
  name: varchar("name", { length: 256 }),
  popularity: integer("popularity"),
  previewUrl: text("preview_url"),
  trackNumber: integer("track_number"),
  uri: text("link"),
});

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
  artists: many(tracksToArtists),
}));

export const tracksToArtists = pgTable(
  'tracks_to_artists',
  {
    trackId: varchar('track_id')
      .notNull()
      .references(() => tracks.id),
    artistId: varchar('artist_id')
      .notNull()
      .references(() => artists.id)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.artistId, t.trackId]})
  }),
);

export const tracksToArtistsRelations = relations(tracksToArtists, ({ one }) => ({
  tracks: one(tracks, {
    fields: [tracksToArtists.trackId],
    references: [tracks.id],
  }),
  artists: one(artists, {
    fields: [tracksToArtists.artistId],
    references: [artists.id]
  }),
}));