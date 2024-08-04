import { z } from 'zod';
import { Image } from './image.ts';
import { PlaylistTrack } from './playlistTrack.ts';
import { User } from './user.ts';


export const Playlist = z.object({
    id: z.number(),
    collaborative: z.boolean(),
    description: z.string(),
    images: z.array(Image),
    name: z.string(),
    owner: User,
    tracks: z.array(PlaylistTrack),
    snapshotId: z.string(),
    uri: z.string()
});

export type PlaylistZ = z.input<typeof Playlist>;