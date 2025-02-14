import { eq, sql } from 'drizzle-orm';
import { db } from "../db/connection";
import { albums } from '../db/schema/album';
import { images } from "../db/schema/images";
import { playlistTracks } from "../db/schema/playlistTrack";
import { tracks, tracksToArtists } from "../db/schema/track";

export async function getTracksByPlaylist(playlistId: string) {
    const result = await db
        .select({
            id: tracks.id,
            title: tracks.name,
            album: albums.id,
            artist: sql`array_agg(${tracksToArtists.artistId})`.as('artists'),
            duration: tracks.durationMs,
            image: images.albumId,
        })
        .from(tracks)
        .innerJoin(playlistTracks, eq(playlistTracks.trackId, tracks.id))
        .innerJoin(tracksToArtists, eq(tracksToArtists.trackId, tracks.id))
        .innerJoin(albums, eq(albums.id, tracks.albumId))
        .innerJoin(images, eq(images.albumId, tracks.albumId))
        .where(eq(playlistTracks.playlistId, "6TQ5jTvSWkZ3fgcjmZ3zcK"))
        .groupBy(tracks.id, albums.id, tracks.name, tracks.durationMs, images.albumId);

    return result;
}
