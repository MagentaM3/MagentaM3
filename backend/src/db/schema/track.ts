import { relations } from "drizzle-orm";
import { pgTable, serial, integer, boolean, varchar, text, primaryKey } from "drizzle-orm/pg-core";
import { albums } from "./album";
import { artists } from "./artist";

export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").notNull().references(() => albums.id),
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
    trackId: integer('track_id')
      .notNull()
      .references(() => tracks.id),
    artistId: integer('artist_id')
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