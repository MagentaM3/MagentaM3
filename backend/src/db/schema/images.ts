import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { users } from "./user";
import { playlists } from "./playlist";
import { albums } from "./album";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("link"),
  height: integer("height"),
  width: integer("width"),
  userId: integer("user_id").references(() => users.id, {onDelete: 'cascade'}),
  albumId: integer("album_id").references(() => albums.id, {onDelete: 'cascade'}),
  playlistId: integer("playlist_id").references(() => playlists.id, {onDelete: 'cascade'}),
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