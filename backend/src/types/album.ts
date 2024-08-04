import { z } from 'zod';
import { Artist } from './artist.ts';
import { Image } from './image.ts';

export const Album = z.object({
    id: z.number(),
    albumType: z.enum(["album", "single", "compilation"]),
    totalTracks: z.number(),
    images: z.array(Image),
    name: z.string(),
    releaseDate: z.date(),
    releaseDatePrecision: z.enum(["year", "month", "day"]),
    uri: z.string(),
    artists: z.array(Artist)
});

export type AlbumZ = z.input<typeof Album>;