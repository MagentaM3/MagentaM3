import { z } from 'zod';

export const Image = z.object({
    id: z.number(),
    url: z.string(),
    height: z.number(),
    width: z.number()
});

export type ImageZ = z.input<typeof Image>;