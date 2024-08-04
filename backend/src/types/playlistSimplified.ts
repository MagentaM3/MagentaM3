// getPlaylists will be used to display what playlists the user has e.g. on the
// sidebar. stuff like the playlist name/images is important but we won't need
// the full list of the tracks in the playlist

import { z } from 'zod';
import { Image } from './image.ts';
import { User } from './user.ts';

export const PlaylistSimplified = z.object({
    id: z.number(),
    // collaborative: z.boolean(),
    description: z.string(),
    images: z.array(Image),
    name: z.string(),
    owner: User,
    uri: z.string()
});

export type PlaylistSimplifiedZ = z.input<typeof PlaylistSimplified>;