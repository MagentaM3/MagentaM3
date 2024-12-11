import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { tracksToArtists } from "./track";

export const artists = pgTable("artists", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  uri: text("link").notNull(),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  tracksToArtists: many(tracksToArtists),
}));