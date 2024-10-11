import { z } from 'zod';
import { Image } from './image.ts';
import { PlaylistTrack } from './playlistTrack.ts';
import { User } from './user.ts';

export const SimplifiedPlaylist = z.object({
    id: z.number(),
    // collaborative: z.boolean(),
    description: z.string(),
    images: z.array(Image),
    name: z.string(),
    owner: User,
    uri: z.string()
});

export const Playlist = z.object({
    id: z.number(),
    // collaborative: z.boolean(),
    description: z.string(),
    images: z.array(Image),
    name: z.string(),
    owner: User,
    tracks: z.array(PlaylistTrack),
    // snapshotId: z.string(),
    uri: z.string()
});

export type SimplifiedPlaylistZ = z.input<typeof SimplifiedPlaylist>;
export type NotSimplifiedPlaylistZ = z.input<typeof Playlist>;
