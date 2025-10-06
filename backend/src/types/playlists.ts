import { z } from 'zod';
import { Image } from './image';
import { User } from './user';
import { PlaylistTrack } from './playlistTrack';

// A collection of playlists
export const Playlists = z.object({
    id: z.number(),
    // collaborative: z.boolean(),
    description: z.string(),
    images: z.array(Image),
    name: z.string(),
    owner: User,
    tracks: z.array(PlaylistTrack),
    // snapshotId: z.string(),
    uri: z.string(),
});

export type PlaylistZ = z.input<typeof Playlists>;
