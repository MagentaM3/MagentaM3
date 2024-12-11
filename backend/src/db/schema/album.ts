import { relations } from "drizzle-orm";
import { timestamp, varchar, integer, pgTable, serial, text, primaryKey } from "drizzle-orm/pg-core";
import { images } from "./images";
import { artists } from "./artist";

export const albums = pgTable("albums", {
  id: serial("id").primaryKey().notNull(),
  album_type: varchar("album_type", { enum: ["album", "single", "compilation"] }),
  total_tracks: integer("total_tracks"),
  name: varchar("name", { length: 256 }),
  release_date: timestamp("release_date"),
  release_date_precision: varchar("release_date_precision", { enum: ["year", "month", "day"] }),
  uri: text("link"),
});

export const albumsRelations = relations(albums, ({ many }) => ({
  images: many(images),
  artists :many(artistsToAlbums),
}));

export const artistsToAlbums = pgTable(
  'artists_to_albums',
  {
    artistId: integer('artist_id')
      .notNull()
      .references(() => artists.id),
    albumId: integer('album_id')
      .notNull()
      .references(() => albums.id)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.artistId, t.albumId]})
  }),
)

export const artistsToAlbumsRelations = relations(artistsToAlbums, ({ one }) => ({
  artist: one(artists, {
    fields: [artistsToAlbums.artistId],
    references: [artists.id],
  }),
  albums: one(albums, {
    fields: [artistsToAlbums.albumId],
    references: [albums.id],
  }),
}));