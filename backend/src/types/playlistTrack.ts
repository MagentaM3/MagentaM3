import { z } from 'zod';
import { Playlist } from './playlist.ts';
import { Track } from './track.ts';
import { User } from './user.ts';

export const PlaylistTrack = z.object({
    id: z.number(),
    added_at: z.date(),
    added_by: User,
    track: Track,
    playlist: Playlist
});

export type PlaylistTrackZ = z.input<typeof PlaylistTrack>;