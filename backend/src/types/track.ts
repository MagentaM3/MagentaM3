import { z } from 'zod';
import { Album } from './album.ts';
import { Artist } from './artist.ts';

export const Track = z.object({
    id: z.number(),
    album: Album,
    artists: z.array(Artist),
    durationMs: z.number(),
    discNumber: z.number(),
    explicit: z.boolean(),
    name: z.string(),
    popularity: z.number().int().min(0).max(100),
    previewUrl: z.string(),
    trackNumber: z.number(),
    uri: z.string()
});

export type TrackZ = z.input<typeof Track>;