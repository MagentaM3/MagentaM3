import { z } from 'zod';
import { Album } from './album.ts';
import { Artist } from './artist.ts';

export const Track = z.object({
    id: z.number(),
    album: Album,
    artists: z.array(Artist),
    duration_ms: z.number(),
    disc_number: z.number(),
    explicit: z.boolean(),
    name: z.string(),
    popularity: z.number().int().min(0).max(100),
    preview_url: z.string(),
    track_number: z.number(),
    uri: z.string()
});

export type TrackZ = z.input<typeof Track>;