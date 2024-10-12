import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { images } from './images';
import { playlists } from './playlist';


/**
 * User Schema:
 * 
 * {
 *  id: id,
 *  display_name: string,
 *  country: string (ISO 3166-1 alpha-2 code),
 *  email: string,
 *  playlists: [Playlist],
 *  images: [Image],
 *  uri: string (link)
 * }
 * 
 */

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  display_name: varchar("display_name", { length: 256 }),
  country: text("country"),
  email: text("email"),
  uri: text("link")
});

export const userRelations = relations(users, ({ many }) => ({
  playlists: many(playlists),
  images: many(images),
}));

// export const users = pgTable("users", 
//   {
//     id: serial("id").primaryKey().notNull(),
//     display_name: varchar("display_name", { length: 256 })),
//     country: text("country"),
//     email: text("email"),
//     images: many(images),
//     uri: text("link")
//   // },
//   // (table) => {
//   //   return {
//   //     emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(lower(table.email)),
//   //   }
//   // }
// );

// // Lower Function
// export function lower(email: AnyPgColumn): SQL {
//   return sql`loser(${email})`;
// }

export type IAdminAccount = typeof users.$inferInsert;
export type SAdminAccount = typeof users.$inferSelect;