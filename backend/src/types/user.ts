import { z } from 'zod';

export const User = z.object({
  id: z.number(),
  displayName: z.string(),
  country: z.string(),
  email: z.string().email(),
  uri: z.string().nullable(),
});

export type UserZ = z.input<typeof User>;
