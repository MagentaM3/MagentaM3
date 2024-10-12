import { pgTable, serial, integer, boolean, varchar, text } from "drizzle-orm/pg-core";
import { albums } from "./album";
import { relations } from "drizzle-orm";
import { artists } from "./artist";

export const tracks = pgTable("tracks", {
  id: serial("id"),
  album: integer("album").notNull().references(() => albums.id),
  duration_ms: integer("duration_ms"),
  disc_number: integer("dis_number"),
  explict: boolean("explicit"),
  name: varchar("name", { length: 256 }),
  popularity: integer("popularity"), // How to constrain integer??
  preview_url: text("preview_url"),
  track_number: integer("track_number"),
  uri: text("uri")
});

export const tracksRelations = relations(tracks, ({ many }) => ({
  artists: many(artists),
}));