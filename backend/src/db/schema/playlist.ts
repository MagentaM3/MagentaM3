import { pgTable, serial, text, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { users } from "./user"
import { images } from "./images"
import { playlistTracks } from "./playlistTrack";
/**
 * Playlist Schema:
 * 
 * {
 *  id: id,
 *  collaborative: boolean,
 *  images: [Image],
 *  name: string,
 *  owner: User,
 *  tracks: [PlaylistTrack]
 *  snapshot_id: string,
 *  uri: string(link)
 * }
 * 
 */
export const playlists = pgTable("playlist", {
	id: serial("id").primaryKey(),
	collaborative: boolean("collaborative"),
	description: text("description"),
	name: varchar("name", { length: 256 }),
	owner_Id: integer("owner").notNull().references(() => users.id),
	snapshot_id: text("snapshot_id"),
	uri: text("link")
});

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
	owner: one(users, {
		fields: [playlists.owner_Id],
		references: [users.id], 
	}),
	images: many(images),
	tracks: many(playlistTracks),
}));