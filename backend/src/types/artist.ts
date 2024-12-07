import { z } from 'zod';

export const Artist = z.object({
    id: z.number(),
    name: z.string(),
    uri: z.string(),
});

export type ArtistZ = z.input<typeof Artist>;