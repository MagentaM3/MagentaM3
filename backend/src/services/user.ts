import { and, eq } from 'drizzle-orm';
import { db } from "../db/connection";
import { images } from '../db/schema/images';
import { playlists } from '../db/schema/playlist';
import { users } from "../db/schema/user";

export const getProfile = async (userId: string) => {
	return await db.select().from(users).where(eq(users.id, userId)).limit(1);
}

export const getUserPlaylists = async (userId: string) => {
	const allImages = await db.select().from(images);
	const allPlaylists = await db
		.select({
			id: playlists.id,
			name: playlists.name,
			url: images.url,
		})
		.from(playlists)
		.innerJoin(images, eq(playlists.id, images.playlistId))
		.where(and(eq(images.width, 640), eq(playlists.ownerId, userId)));

	// console.log({ allUsers });
	console.log({ allImages })

	return allPlaylists
}