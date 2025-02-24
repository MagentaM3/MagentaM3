import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, primaryKey, text, varchar } from "drizzle-orm/pg-core";
import { albums } from "./album";
import { artists } from "./artist";

export const tracks = pgTable("tracks", {
  id: varchar("id", { length: 36 }).primaryKey(),
  albumId: varchar("album_id").references(() => albums.id).notNull(),
  durationMs: integer("duration_ms").notNull(),
  discNumber: integer("disc_number").notNull(),
  explict: boolean("explicit").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  popularity: integer("popularity").notNull(),
  previewUrl: text("preview_url"),
  trackNumber: integer("track_number").notNull(),
  uri: text("link").notNull(),
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
    pk: primaryKey({ columns: [t.artistId, t.trackId] })
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