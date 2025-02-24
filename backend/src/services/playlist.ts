import { eq, isNull, sql } from 'drizzle-orm';
import { db } from "../db/connection";
import { images } from '../db/schema/images';
import { playlists } from '../db/schema/playlist';

export const getUserPlaylists = async (userId: string) => {
    const allPlaylists = await db
        .select({
            id: playlists.id,
            name: playlists.name,
            url: images.url,
        })
        .from(playlists)
        .innerJoin(images, eq(playlists.id, images.playlistId))
        .where(sql`${userId} = ${playlists.ownerId} and (${images.width} = 640 or ${isNull(images.width)})`)

    return allPlaylists
}