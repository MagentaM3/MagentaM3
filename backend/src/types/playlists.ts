import { z } from 'zod';
import { Image } from './image.ts';
import { PlaylistTrack } from './playlistTrack.ts';
import { User } from './user.ts';

// A collection of playlists
export const Playlists = z.object({
    id: z.number(),
    // collaborative: z.boolean(),
    description: z.string(),
    images: z.array(Image),
    name: z.string(),
    owner: User,
    // TODO:
    // PlaylistTracksReference
    // https://spotify-api.js.org/apiTypes/interface/PlaylistTracksReference
    tracks: z.array(PlaylistTrack),
    // snapshotId: z.string(),
    uri: z.string()
});

export type NotSimplifiedPlaylistZ = z.input<typeof Playlists>;
