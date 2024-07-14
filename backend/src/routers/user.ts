import z from 'zod';
import { publicProcedure, router } from '../trpc';
import { User } from '../types/user';

export const userRouter = router({
  user: publicProcedure
    .input(z.void())
    .output(User)
    .query(async () => {
      const user = { id: 0, name: 'J9' };
      return user;
    }),
});
