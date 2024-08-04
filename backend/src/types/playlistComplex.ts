// getPlaylist is for getting the tracks and putting them as rows in the table.
// Info about each track's album is important but I don't think we need to go
// to the extent of knowing the album's artists (we alr have the song's artists)

import { z } from 'zod';
import { Image } from './image.ts';
import { PlaylistTrack } from './playlistTrack.ts';
import { User } from './user.ts';

export const PlaylistComplex = z.object({
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

export type PlaylistComplexZ = z.input<typeof PlaylistComplex>;