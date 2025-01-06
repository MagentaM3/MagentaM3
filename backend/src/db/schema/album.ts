import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { artists } from "./artist";
import { images } from "./images";

export const albums = pgTable("albums", {
  id: varchar("id", { length: 36 }).primaryKey(),
  albumType: varchar("album_type", { enum: ["album", "single", "compilation"] }),
  totalTracks: integer("total_tracks"),
  name: varchar("name", { length: 256 }),
  releaseDate: timestamp("release_date", { mode: 'string' }),
  releaseDatePrecision: varchar("release_date_precision", { enum: ["year", "month", "day"] }),
  uri: text("link"),
});

export const albumsRelations = relations(albums, ({ many }) => ({
  images: many(images),
  artists: many(artistsToAlbums),
}));


export const artistsToAlbums = pgTable(
  'artists_to_albums',
  {
    artistId: varchar('artist_id')
      .notNull()
      .references(() => artists.id),
    albumId: varchar('album_id')
      .notNull()
      .references(() => albums.id)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.artistId, t.albumId] })
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
