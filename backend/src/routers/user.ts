import z from 'zod';
import { db } from '../db/connection';
import { users } from '../db/schema/user';
import { publicProcedure, router } from '../trpc';
import { User } from '../types/user';

export const userRouter = router({
  user: publicProcedure
    .input(z.void())
    .output(User)
    .query(async () => {
			const result = await db.select().from(users);
      return result[0];
    }),
});
