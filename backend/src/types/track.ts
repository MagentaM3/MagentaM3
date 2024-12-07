// track.ts
import { z } from 'zod';
import { Album } from './album.ts';
import { Artist } from './artist.ts';
import { User } from './user.ts'; // Import User for PlaylistTrack

export const Track = z.object({
    id: z.number(),
    album: Album,
    artists: z.array(Artist),
    durationMs: z.number(),
    discNumber: z.number(),
    explicit: z.boolean(),
    name: z.string(),
    popularity: z.number().int().min(0).max(100),
    previewUrl: z.string(),
    trackNumber: z.number(),
    uri: z.string(),
});

export type TrackZ = z.input<typeof Track>;

// PlaylistTrack definition moved here
export const PlaylistTrack = z.object({
    id: z.number(),
    addedAt: z.date(),
    addedBy: User,
    track: Track,
    // Removed playlist since it's not needed
    // playlist: Playlist
});

export type PlaylistTrackZ = z.input<typeof PlaylistTrack>;
