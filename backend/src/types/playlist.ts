import { z } from 'zod';
import { Image } from './image';
import { PlaylistTrack } from './playlistTrack';
import { User } from './user';

// A playlist
export const Playlist = z.object({
    id: z.string(),
    collaborative: z.boolean(),
    description: z.string().nullable(),
    images: z.array(Image),
    name: z.string(),
    owner: z.string(),
    tracks: z.array(PlaylistTrack),
    // snapshotId: z.string(),
    // uri: z.string()
});

// simplified playlist
export const SimplifiedPlaylist = z.object({
    id: z.string(),
    // collaborative: z.boolean(),
    description: z.string(),
    images: z.array(Image),
    name: z.string(),
    owner: User,
    uri: z.string()
});

export type PlaylistZ = z.input<typeof Playlist>;
export type SimplifiedPlaylistZ = z.input<typeof SimplifiedPlaylist>;