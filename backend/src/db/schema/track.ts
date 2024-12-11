import { pgTable, serial, integer, boolean, varchar, text, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { albums } from "./album";
import { artists } from "./artist";

export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  album_id: integer("album_id").notNull().references(() => albums.id),
  duration_ms: integer("duration_ms"),
  disc_number: integer("disc_number"),
  explict: boolean("explicit"),
  name: varchar("name", { length: 256 }),
  popularity: integer("popularity"), // Can you constrain the integer??
  preview_url: text("preview_url"),
  track_number: integer("track_number"),
  uri: text("link")
});

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  album: one(albums, {
    fields: [tracks.album_id],
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