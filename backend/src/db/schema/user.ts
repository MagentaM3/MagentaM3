import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { images } from './images';
import { playlists } from './playlist';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  display_name: varchar("display_name", { length: 256 }).notNull(),
  country: varchar("country", { length: 2 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  uri: text("link")
});

export const userRelations = relations(users, ({ many }) => ({
  playlists: many(playlists),
  images: many(images),
}));

// export const usersToPlaylists = pgTable(
//   'users_to_playlists',
//   {
//     userId: integer('user_id')
//       .notNull()
//       .references(() => users.id),
//     playlistId: integer('playlist_id')
//       .notNull()
//       .references(() => playlists.id),
//   },
//   (t) => ({
//     pk: primaryKey({columns: [t.userId, t.playlistId]})
//   })
// );

// export const usersToPlaylistsRelations = relations(usersToPlaylists, ({ one }) => ({
//   users: one(users, {
//     fields: [usersToPlaylists.userId],
//     references: [users.id]
//   }),
//   playlist: one(playlists, {
//     fields: [usersToPlaylists.playlistId],
//     references: [playlists.id],
//   }),
// }));

// export type IAdminAccount = typeof users.$inferInsert;
// export type SAdminAccount = typeof users.$inferSelect;