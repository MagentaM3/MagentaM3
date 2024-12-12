import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { tracksToArtists } from "./track";
import { artistsToAlbums } from "./album";

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  uri: text("link").notNull(),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  tracks: many(tracksToArtists),
  albums: many(artistsToAlbums)
}));