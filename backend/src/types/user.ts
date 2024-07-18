import { z } from 'zod';

export const User = z.object({
  id: z.number(),
  name: z.string().nullable(),
});

export type UserZ = z.input<typeof User>;
