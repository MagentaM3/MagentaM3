import z from 'zod';
import { db } from '../db/connection';
import { users } from '../db/schema/user';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { User } from '../types/user';

export const userRouter = createTRPCRouter({
	// TODO: update or remove following route
  user: publicProcedure
    .input(z.void())
    .output(User)
    .query(async () => {
			const result = await db.select().from(users);
      return result[0];
    }),
});
