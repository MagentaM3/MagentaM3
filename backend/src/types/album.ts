import { z } from 'zod';
import { Image } from './image';

export const AlbumType = z.enum(["album", "single", "compilation"])
export const ReleaseDatePrecision = z.enum(["year", "month", "day"])

export const Album = z.object({
    id: z.string(),
    albumType: AlbumType,
    totalTracks: z.number(),
    images: z.array(Image),
    name: z.string(),
    releaseDate: z.date(),
    releaseDatePrecision: ReleaseDatePrecision,
    uri: z.string(),
    // Dont need the artist for now
    // artists: z.array(Artist)
});

export type AlbumZ = z.input<typeof Album>;
export type AlbumTypeZ = z.input<typeof AlbumType>;
export type ReleaseDatePrecisionZ = z.input<typeof ReleaseDatePrecision>;