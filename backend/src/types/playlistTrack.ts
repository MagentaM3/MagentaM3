import { z } from 'zod';
import { Track } from './track';

// Required as a standalone function
export const PlaylistTrack = z.object({
    id: z.string(),
    addedAt: z.date(),
    addedBy: z.string(),
    track: Track,
    // Removed since we dont need access to the playlist
    // Also this will lead to circular dependency so dont use it
    // playlist: Playlist
});

export type PlaylistTrackZ = z.input<typeof PlaylistTrack>;