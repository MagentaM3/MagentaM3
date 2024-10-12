// import { boolean } from "drizzle-orm/mysql-core";
import { timestamp, pgTable, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user";
import { playlists } from "./playlist";
import { tracks } from "./track"

export const playlistTracks = pgTable("playlistTrack", {
	id: serial("id").primaryKey(),
	added_at: timestamp("added_at").defaultNow(),
	added_by: integer("added_by").notNull().references(() => users.id),
	track: integer("track").notNull().references(() => tracks.id),
	playlist: integer("playlist").notNull().references(() => playlists.id)
});

// export const playlistTracksRelations = relations(playlistTracks, ({ one }) => ({
// 	track: one(

// 	)
// })); 