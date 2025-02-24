import { createTRPCRouter } from '../trpc';
import { playlistRouter } from './playlist';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  user: userRouter,
  playlist: playlistRouter,
});

export type AppRouter = typeof appRouter;
