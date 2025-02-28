import { eq, isNull, sql } from 'drizzle-orm';
import { db } from "../db/connection";
import { albums } from '../db/schema/album';
import { images } from '../db/schema/images';
import { playlists } from '../db/schema/playlist';
import { playlistTracks } from '../db/schema/playlistTrack';
import { tracks, tracksToArtists } from '../db/schema/track';
import { AlbumZ } from '../types/album';
import { ImageZ } from '../types/image';
import { PlaylistZ } from "../types/playlist";
import { PlaylistTrackZ } from '../types/playlistTrack';
import { TrackZ } from '../types/track';

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

    // console.log(allPlaylists)
    return allPlaylists
}

export const getUserPlaylist = async (userId: string, playlistId: string): Promise<PlaylistZ> => {
    const playlist = await db
        .select({
            id: playlists.id,
            collaborative: playlists.collaborative,
            description: playlists.description,
            name: playlists.name,
            owner: playlists.ownerId,
            snapshotId: playlists.snapshotId,
            uri: playlists.uri
        })
        .from(playlists)
        .where(eq(playlists.id, playlistId))

    return {
        ...playlist[0],
        tracks: await getPlaylistTracks(playlistId),
        // TODO!
        images: []
    }
}

export const getPlaylistTracks = async (playlistId: string): Promise<PlaylistTrackZ[]> => {
    const tracks = await db
        .select({
            id: playlistTracks.id,
            addedAt: playlistTracks.addedAt,
            addedBy: playlistTracks.addedById,
            trackId: playlistTracks.trackId
        })
        .from(playlistTracks)
        .where(eq(playlistTracks.playlistId, playlistId))

    const resolvedTracks = await Promise.all(
        tracks.map(async track => ({
            id: track.id,
            addedAt: new Date(track.addedAt),
            addedBy: track.addedBy,
            track: await getTrack(track.trackId)
        }))
    );

    return resolvedTracks;
}

export const getTrack = async (trackId: string): Promise<TrackZ> => {
    const track = await db
        .select({
            id: tracks.id,
            albumId: tracks.albumId,
            durationMs: tracks.durationMs,
            discNumber: tracks.discNumber,
            explicit: tracks.explict,
            // artists: sql`array_agg(${tracksToArtists.artistId})`.as('artists'),
            name: tracks.name,
            popularity: tracks.popularity,
            previewUrl: tracks.previewUrl,
            trackNumber: tracks.trackNumber,
            uri: tracks.uri,
        })
        .from(tracks)
        .innerJoin(tracksToArtists, eq(tracksToArtists.trackId, tracks.id))
        .where(eq(tracks.id, trackId))

    const res = {
        ...track[0],
        album: await getAlbum(track[0].albumId),
        // TODO!
        artists: [],
        images: await getImages(track[0].albumId)
    }
    // console.log("A")
    // console.log(res)
    // console.log("b")
    return res
}

export const getAlbum = async (albumId: string): Promise<AlbumZ> => {
    const album = await db
        .select({
            id: albums.id,
            albumType: albums.albumType,
            totalTracks: albums.totalTracks,
            name: albums.name,
            releaseDate: albums.releaseDate,
            releaseDatePrecision: albums.releaseDatePrecision,
            uri: albums.uri,
        })
        .from(albums)
        .where(eq(albums.id, albumId))

    return {
        ...album[0],
        // TODO!
        releaseDate: new Date(album[0].releaseDate),
        images: await getImages(album[0].id)
    }
}

export const getImages = async (albumId: string): Promise<ImageZ[]> => {
    const image = await db
        .select({
            url: images.url,
            height: images.height,
            width: images.width
        })
        .from(images)
        .where(eq(images.albumId, albumId))
    return image
}

// export const getArtists = async (trackId: string): Promise<ArtistZ> => {
//     const track = await db
//         .select({
//             id: tracks.id,
//             albumId: tracks.albumId,
//             durationMs: tracks.durationMs,
//             discNumber: tracks.discNumber,
//             explicit: tracks.explict,
//             // artists: sql`array_agg(${tracksToArtists.artistId})`.as('artists'),
//             name: tracks.name,
//             popularity: tracks.popularity,
//             previewUrl: tracks.previewUrl,
//             trackNumber: tracks.trackNumber,
//             uri: tracks.uri,
//         })
//         .from(tracks)
//         .innerJoin(tracksToArtists, eq(tracksToArtists.trackId, tracks.id))
//         .where(eq(tracks.id, trackId))

//     return {
//         ...track[0],
//         album: await getAlbum(track[0].albumId),
//         // TODO!
//         artists: [],
//         images: []
//     }
// }







// id: tracks.id,
//                 album: tracks.albumId,
//                 artists: z.array(Artist),
//                 durationMs: z.number(),
//                 discNumber: z.number(),
//                 explicit: z.boolean(),
//                 name: z.string(),
//                 popularity: z.number().int().min(0).max(100),
//                 previewUrl: z.string(),
//                 trackNumber: z.number(),
//                 uri: z.string(),
//                 images: z.array(Image),
//                 //             }

// const allTracks = await db
//         .select({
//             id: playlistTracks.id,
//             addedAt: playlistTracks.addedAt,
//             addedBy: playlistTracks.addedById,
//             // title: tracks.name,
//             // album: albums.id,
//             // artist: sql`array_agg(${tracksToArtists.artistId})`.as('artists'),
//             // duration: tracks.durationMs,
//             // image: images.albumId,
//             track: { 
//                 id: tracks.id,
//                 album: tracks.albumId,
//                 artists: z.array(Artist),
//                 durationMs: z.number(),
//                 discNumber: z.number(),
//                 explicit: z.boolean(),
//                 name: z.string(),
//                 popularity: z.number().int().min(0).max(100),
//                 previewUrl: z.string(),
//                 trackNumber: z.number(),
//                 uri: z.string(),
//                 images: z.array(Image),
//             }
//         })
//         .from(tracks)
//         .innerJoin(playlistTracks, eq(playlistTracks.trackId, tracks.id))
//         .innerJoin(tracksToArtists, eq(tracksToArtists.trackId, tracks.id))
//         .innerJoin(albums, eq(albums.id, tracks.albumId))
//         .innerJoin(images, eq(images.albumId, tracks.albumId))
//         .where(eq(playlistTracks.playlistId, playlistId))
//         .groupBy(tracks.id, albums.id, tracks.name, tracks.durationMs, images.albumId);


//     return {
//         ...playlist[0], tracks: allTracks, images: []
//     }


// id: z.number(),
// collaborative: z.boolean(),
// description: z.string(),
// images: z.array(Image),
// name: z.string(),
// owner: User,
// tracks: z.array(PlaylistTrack),
// snapshotId: z.string(),
// uri: z.string()