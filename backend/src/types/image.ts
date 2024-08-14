import { z } from 'zod';


export const Image = z.object({
	url: z.string(),
	height: z.number(),
	width: z.number()
});

export type ImageZ = z.input<typeof Image>;

export const TrackListImage = z.object({
  name: z.string(),
	value: z.string(),
	url: z.string(),
});

export type TrackListImageZ = z.input<typeof TrackListImage>;