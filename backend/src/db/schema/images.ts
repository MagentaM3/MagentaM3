import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
// import { users } from "./user";
import { playlists } from "./playlist";
import { albums } from "./album";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("link"),
  height: integer("height"),
  width: integer("width"),
  // user_id: integer("user_id").references(() => users.id, {onDelete: 'cascade'}),
  playlist_id: integer("playlist_id").references(() => playlists.id, {onDelete: 'cascade'}),
  album_id: integer("album_id").references(() => albums.id, {onDelete: 'cascade'})
});

export const imageRelations = relations(images, ({ one }) => ({
  // users: one(users, {
  //   fields: [images.user_id],
  //   references: [users.id]
  // }),
  playlists: one(playlists, {
    fields: [images.playlist_id],
    references: [playlists.id]
  }),
  albums: one(albums, {
    fields: [images.album_id],
    references: [albums.id]
  })
}));