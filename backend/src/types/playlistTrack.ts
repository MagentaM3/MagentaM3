import { z } from 'zod';
import { Track } from './track.ts';
import { User } from './user.ts';

// Required as a standalone function
export const PlaylistTrack = z.object({
    id: z.number(),
    addedAt: z.date(),
    addedBy: User,
    track: Track,
    // Removed since we dont need access to the playlist
    // Also this will lead to circular dependency so dont use it
    // playlist: Playlist
});

export type PlaylistTrackZ = z.input<typeof PlaylistTrack>;