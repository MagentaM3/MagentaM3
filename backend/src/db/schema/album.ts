import { relations } from "drizzle-orm";
import { timestamp, varchar, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { images } from "./images";
import { artists } from "./artist";

export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  album_type: varchar("album_type", { enum: ["album", "single", "compilation"] }),
  total_tracks: integer("total_tracks"),
  name: varchar("name", { length: 256 }),
  release_date: timestamp("release_date"),
  release_date_precision: varchar("release_date_precision", { enum: ["year", "month", "day"] }),
  uri: text("uri"),
});

export const albumsRelations = relations(albums, ({ many }) => ({
  images: many(images),
  artists:many(artists),
}));

