import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { albums } from "./album";
import { playlists } from "./playlist";
import { users } from "./user";

export const images = pgTable("images", {
  url: text("link").primaryKey(),
  height: integer("height"),
  width: integer("width"),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }),
  albumId: varchar("album_id").references(() => albums.id, { onDelete: 'cascade' }),
  playlistId: varchar("playlist_id").references(() => playlists.id, { onDelete: 'cascade' }),
});

export const imageRelations = relations(images, ({ one }) => ({
  user: one(users, {
    fields: [images.userId],
    references: [users.id]
  }),
  album: one(albums, {
    fields: [images.albumId],
    references: [albums.id]
  }),
  playlist: one(playlists, {
    fields: [images.playlistId],
    references: [playlists.id]
  }),
}));