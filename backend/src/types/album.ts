import { z } from 'zod';
import { Artist } from './artist.ts';
import { Image } from './image.ts';

export const Album = z.object({
    id: z.number(),
    album_type: z.enum(["album", "single", "compilation"]),
    total_tracks: z.number(),
    images: z.array(Image),
    name: z.string(),
    release_date: z.date(),
    release_date_precision: z.enum(["year", "month", "day"]),
    uri: z.string(),
    artists: z.array(Artist)
});

export type AlbumZ = z.input<typeof Album>;