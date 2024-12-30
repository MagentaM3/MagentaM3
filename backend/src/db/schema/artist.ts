import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { artistsToAlbums } from "./album";
import { tracksToArtists } from "./track";

export const artists = pgTable("artists", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  uri: text("link").notNull(),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  tracks: many(tracksToArtists),
  albums: many(artistsToAlbums)
}));