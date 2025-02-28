import { z } from 'zod';

export const Image = z.object({
    url: z.string(),
    height: z.number().nullable(),
    width: z.number().nullable()
});

export type ImageZ = z.input<typeof Image>;